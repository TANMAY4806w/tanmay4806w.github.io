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
const maxAnswerWords = 280;

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
  if (!response.ok) return true; // Fail open to preserve UX
  return await response.json() === true;
}

// Transform OpenRouter stream into Synapse standard SSE
function streamOpenRouter(upstreamBody: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const reader = upstreamBody.getReader();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = '';
      const send = (event: string, data: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
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
              send('done', { finishReason: 'stop', provider: 'openrouter' });
              controller.close();
              return;
            }
            try {
              const payload = JSON.parse(data);
              const chunk = payload.choices?.[0]?.delta?.content || '';
              if (chunk) send('delta', { text: chunk });
            } catch {}
          }
          if (done) break;
        }
        send('done', { finishReason: 'stop', provider: 'openrouter' });
        controller.close();
      } catch {
        try { controller.close(); } catch {}
      } finally {
        reader.releaseLock();
      }
    }
  });
}

// Transform Google Gemini SSE stream into Synapse standard SSE
function streamGemini(upstreamBody: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const reader = upstreamBody.getReader();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = '';
      const send = (event: string, data: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
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
            try {
              const payload = JSON.parse(data);
              const text = payload.candidates?.[0]?.content?.parts?.[0]?.text || '';
              if (text) send('delta', { text });
              if (payload.candidates?.[0]?.finishReason) {
                send('done', { finishReason: payload.candidates[0].finishReason, provider: 'gemini' });
                controller.close();
                return;
              }
            } catch {}
          }
          if (done) break;
        }
        send('done', { finishReason: 'stop', provider: 'gemini' });
        controller.close();
      } catch {
        try { controller.close(); } catch {}
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
  const geminiKey = Deno.env.get('GEMINI_API_KEY');
  const projectUrl = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const salt = Deno.env.get('PORTFOLIO_RATE_LIMIT_SALT') || 'default-salt-tanmay-ai';

  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
  const ipHash = await hashClientIp(clientIp, salt);

  if (projectUrl && serviceKey) {
    try {
      const allowed = await checkRateLimit(ipHash, projectUrl, serviceKey);
      if (!allowed) {
        return jsonResponse({ error: 'Daily request limit reached', code: 'RATE_LIMITED' }, 429, origin);
      }
    } catch {}
  }

  const systemPrompt = `You are ⚡ Synapse, the intelligent AI portfolio assistant for Tanmay Patil, an Applied AI / Machine Learning Engineer.
Answer visitors' questions clearly, accurately, and with pristine structure using ONLY the verified portfolio reference below.

CRITICAL FORMATTING GUIDELINES:
1. Always structure multi-point answers with clean Markdown headings: Use "### Section Name" or "### Project Name" for section headers. Never output top-level "#" or plain unstyled walls of text.
2. Put EVERY bullet point on its own separate line starting with "- ".
   - NEVER combine multiple bullet points into one run-on paragraph or use inline hyphens as bullets.
   - Each distinct achievement, system responsibility, or technical specification must have its own line with a bullet.
3. Highlight key technologies, tools, metrics, and models in bold (e.g. **Gemini 2.5 Flash**, **FastAPI**, **Next.js**, **YOLOv8**, **93% accuracy**, **Deepgram**, **OpenRouter**, **n8n**).
4. If asked about Tanmay's role at American Hairline:
   - State his title: **AI Trainee (Full-time)** (Mar 2026 – Present | Mumbai, India).
   - Break down his systems into distinct subsections (### Hair Visualizer, ### Employee Knowledge OS, ### Meeting Assistant V2, ### WhatsApp Order Bot) with clean bullet points for what each system does and its architecture.
5. If asked for salary or undisclosed personal info, state professionally: "Salary and compensation are not publicly disclosed in the portfolio. You can connect with Tanmay directly via [contact.md] or LinkedIn."
6. If asked for a resume or CV, mention that his resume is available to download directly as a PDF on this page.

Verified Portfolio Reference:
${context}`;

  const responseHeaders = {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': origin,
    'Vary': 'Origin',
  };

  // --- ATTEMPT 1: OpenRouter Free ---
  if (openRouterKey) {
    try {
      const openRouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
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
          max_tokens: 650,
        }),
      });

      if (openRouterRes.ok && openRouterRes.body) {
        return new Response(streamOpenRouter(openRouterRes.body), { headers: responseHeaders });
      }
      console.warn('OpenRouter returned non-200. Status:', openRouterRes.status, 'Failing over to Gemini...');
    } catch (e) {
      console.warn('OpenRouter request failed. Failing over to Gemini...', e);
    }
  }

  // --- ATTEMPT 2: Google Gemini Flash (Failover) ---
  if (geminiKey) {
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${geminiKey}&alt=sse`;
      const geminiRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: 'user', parts: [{ text: question }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 650,
          },
        }),
      });

      if (geminiRes.ok && geminiRes.body) {
        return new Response(streamGemini(geminiRes.body), { headers: responseHeaders });
      }
      console.warn('Gemini returned non-200. Status:', geminiRes.status);
    } catch (e) {
      console.warn('Gemini request failed:', e);
    }
  }

  // --- ATTEMPT 3: If both fail, return fallback signal ---
  return jsonResponse({
    error: 'All cloud LLM providers are currently rate-limited or unavailable',
    code: 'PROVIDERS_RATE_LIMITED',
  }, 429, origin);
});
