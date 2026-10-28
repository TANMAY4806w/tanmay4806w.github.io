const allowedOrigins = new Set([
  'https://tanmay4806w.github.io',
  'http://localhost:8123',
  'http://127.0.0.1:8123',
  'http://localhost:3000',
  'http://127.0.0.1:5500',
  'null',
]);

const maxQuestionLength = 1200;
const maxContextLength = 15000;
const maxRequestBytes = 17000;
const maxAnswerWords = 160;

function jsonResponse(body: Record<string, unknown>, status: number, origin: string) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Vary': 'Origin',
    },
  });
}

async function readLimitedBody(request: Request): Promise<string | null> {
  const contentLength = request.headers.get('content-length');
  if (contentLength && /^\d+$/.test(contentLength) && Number(contentLength) > maxRequestBytes) {
    return null;
  }

  const reader = request.body?.getReader();
  if (!reader) return '';

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > maxRequestBytes) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}

async function hashClientIp(ip: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(salt),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(ip));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function checkRateLimit(ipHash: string, projectUrl: string, serviceKey: string): Promise<boolean> {
  const response = await fetch(`${projectUrl}/rest/v1/rpc/consume_portfolio_chat_rate_limit`, {
    method: 'POST',
    headers: {
      'apikey': serviceKey,
      'Authorization': `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ p_ip_hash: ipHash }),
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error('Rate limit service unavailable');
  return await response.json() === true;
}

function streamAnswer(upstreamBody: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const reader = upstreamBody.getReader();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = '';
      let answer = '';
      const send = (event: string, data: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      };
      const fail = (code = 'UPSTREAM_STREAM_FAILED') => {
        try { send('error', { error: 'Synapse AI stream failed', code }); } catch {}
        try { controller.close(); } catch {}
        void reader.cancel().catch(() => {});
      };

      try {
        while (true) {
          const { value, done } = await reader.read();
          buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
          let separator: number;
          while ((separator = buffer.search(/\r?\n\r?\n/)) !== -1) {
            const block = buffer.slice(0, separator);
            const match = buffer.slice(separator).match(/^\r?\n\r?\n/);
            buffer = buffer.slice(separator + (match ? match[0].length : 2));
            const data = block.split(/\r?\n/)
              .filter(l => l.startsWith('data:'))
              .map(l => l.slice(5).trimStart())
              .join('\n');
            if (!data) continue;
            if (data === '[DONE]') {
              send('done', { finishReason: 'stop' });
              controller.close();
              return;
            }
            try {
              const payload = JSON.parse(data);
              const chunk = payload.choices?.[0]?.delta?.content || '';
              if (chunk) {
                answer += chunk;
                send('delta', { text: chunk });
              }
            } catch {
              fail('STREAM_JSON_PARSE_ERROR');
              return;
            }
          }
          if (done) break;
        }
        send('done', { finishReason: 'stop' });
        controller.close();
      } catch {
        fail();
      } finally {
        reader.releaseLock();
      }
    }
  });
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get('Origin') || 'null';
  if (!allowedOrigins.has(origin)) {
    return new Response('Forbidden origin', { status: 403 });
  }

  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Vary': 'Origin',
      },
    });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405, origin);
  }

  const rawBody = await readLimitedBody(req);
  if (!rawBody) {
    return jsonResponse({ error: 'Request body exceeds size limits' }, 413, origin);
  }

  let body: { question?: string; context?: string } = {};
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400, origin);
  }

  const question = typeof body.question === 'string' ? body.question.trim() : '';
  const context = typeof body.context === 'string' ? body.context.trim() : '';

  if (!question || question.length > maxQuestionLength || context.length > maxContextLength) {
    return jsonResponse({ error: 'Invalid question or context payload' }, 400, origin);
  }

  const openRouterKey = Deno.env.get('OPENROUTER_API_KEY');
  const projectUrl = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const salt = Deno.env.get('PORTFOLIO_RATE_LIMIT_SALT') || 'default-salt-tanmay-ai';

  if (!openRouterKey) {
    return jsonResponse({ error: 'OpenRouter API key is missing' }, 500, origin);
  }

  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
  const ipHash = await hashClientIp(clientIp, salt);

  if (projectUrl && serviceKey) {
    try {
      const allowed = await checkRateLimit(ipHash, projectUrl, serviceKey);
      if (!allowed) {
        return jsonResponse({ error: 'Daily request limit reached', code: 'RATE_LIMITED' }, 429, origin);
      }
    } catch {
      // Continue if rate limiter service is temporarily unavailable
    }
  }

  const systemPrompt = `You are ⚡ Synapse, Tanmay Patil's AI Engineer portfolio assistant.
Answer visitors' questions concisely and accurately using only the verified portfolio context below.
Tanmay is an AI Trainee (Full-time) at American Hairline in Mumbai (Mar 2026–Present).
Key systems: Hair Visualizer (4-angle multimodal clinical GenAI with Gemini/OpenRouter), Employee Knowledge OS (agentic SOP synthesis with Next.js, Supabase, Deepgram), Meeting Assistant V2, WhatsApp Order Bot (80-node n8n), FraudGuard AI (93% accuracy ML scam detector), AI Resume Architect, and TreeSense Imaging.
When asked for a resume, mention the PDF is downloadable right on the page.
Keep responses concise, formatted in markdown, and within ${maxAnswerWords} words.

Verified Portfolio Reference:
${context}`;

  const upstreamResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openRouterKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://tanmay4806w.github.io/',
      'X-Title': 'Tanmay Patil AI Portfolio',
    },
    body: JSON.stringify({
      model: 'openrouter/free',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question },
      ],
      stream: true,
      temperature: 0.2,
      max_tokens: 380,
    }),
  });

  if (!upstreamResponse.ok || !upstreamResponse.body) {
    return jsonResponse({ error: 'Upstream LLM error', code: 'UPSTREAM_ERROR' }, upstreamResponse.status || 502, origin);
  }

  return new Response(streamAnswer(upstreamResponse.body), {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': origin,
      'Vary': 'Origin',
    },
  });
});
