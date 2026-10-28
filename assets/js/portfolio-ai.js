(() => {
  const inputOptions = [{ type: 'text', languages: ['en'] }];
  const outputOptions = [{ type: 'text', languages: ['en'] }];

  function plainText(content) {
    return String(content)
      .replace(/<img\b[^>]*\balt=["']([^"']*)["'][^>]*>/gi, '$1')
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  function buildPortfolioContext(files, selectedFiles) {
    const selected = Array.isArray(selectedFiles) ? new Set(selectedFiles) : null;
    return Object.entries(files)
      .filter(([name]) => !selected || name === 'portfolio-profile.md' || selected.has(name))
      .map(([name, content]) => `### ${name}\n${plainText(content)}`)
      .join('\n\n');
  }

  function createTextStreamer(onText) {
    return {
      push(text) { if (text) onText(String(text)); },
      finish() { return Promise.resolve(); },
      reset() {}
    };
  }

  function buildSystemPrompt(files) {
    const context = buildPortfolioContext(files);
    return `You are ⚡ Synapse, the intelligent portfolio assistant for Tanmay Patil, an AI / Machine Learning Engineer.

Grounding rules:
- Ground all responses strictly in the verified portfolio reference below. Do not invent details, past employers, or fake metrics.
- Tanmay is an AI Trainee (Full-time) at American Hairline in Mumbai (Mar 2026–Present), previously an AI Developer Intern at Arkham Archives.
- Highlight key projects when asked: Hair Visualizer (4-angle multimodal clinical GenAI with Gemini/OpenRouter), Employee Knowledge OS (agentic SOP platform with Next.js & Supabase), Meeting Assistant V2, WhatsApp Order Bot (80-node n8n), FraudGuard AI (93% accuracy ML scam detector), AI Resume Architect, and TreeSense Imaging (YOLOv8).
- If the visitor asks for a resume or CV, say that the resume PDF is available to download directly on the page.
- Keep answers structured, technical, and concise with bullet points where appropriate.

Portfolio Reference:
${context}`;
  }

  async function requestCloudAnswer(endpoint, question, context, fetchImpl = globalThis.fetch, onDelta) {
    if (!endpoint || typeof fetchImpl !== 'function') return null;
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, context }),
      signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(35000) : undefined
    });
    if (!response.ok) {
      let payload = {};
      try { if (typeof response.json === 'function') payload = await response.json(); } catch {}
      const error = new Error(`Synapse AI request failed (${response.status})`);
      error.status = response.status;
      error.code = typeof payload.code === 'string' ? payload.code : null;
      throw error;
    }
    if (!response.body || typeof response.body.getReader !== 'function') throw new Error('Stream unavailable');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '', answer = '', eventName = 'message';

    function dispatch(block) {
      let data = '';
      eventName = 'message';
      for (const line of block.split(/\r?\n/)) {
        if (line.startsWith('event:')) eventName = line.slice(6).trim();
        else if (line.startsWith('data:')) data += (data ? '\n' : '') + line.slice(5).trimStart();
      }
      if (!data) return;
      let payload;
      try { payload = JSON.parse(data); } catch { return; }
      if (eventName === 'error') {
        const error = new Error('Stream failed');
        error.code = payload.code || 'UPSTREAM_FAILED';
        throw error;
      }
      if (eventName === 'delta' && typeof payload.text === 'string') {
        answer += payload.text;
        if (typeof onDelta === 'function') onDelta(payload.text);
      }
    }

    try {
      while (true) {
        const { value, done } = await reader.read();
        buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
        let separator;
        while ((separator = buffer.search(/\r?\n\r?\n/)) !== -1) {
          const block = buffer.slice(0, separator);
          const match = buffer.slice(separator).match(/^\r?\n\r?\n/);
          buffer = buffer.slice(separator + (match ? match[0].length : 2));
          dispatch(block);
          if (eventName === 'done') return answer.trim() || null;
        }
        if (done) break;
      }
      if (buffer.trim()) dispatch(buffer);
      if (eventName === 'done' && answer.trim()) return answer.trim();
      return answer.trim() || null;
    } finally {
      reader.releaseLock();
    }
  }

  function escapeHtml(val) {
    return String(val).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function renderInline(md, sectionNames, allowedLinks) {
    return escapeHtml(md)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, label, target) => {
        if (sectionNames.has(target)) return `<a href="#${target}" class="ai-section-link" data-file="${target}" style="color:var(--accent); font-weight:600;">${label}</a>`;
        if (allowedLinks.has(target)) return `<a href="${target}" target="_blank" rel="noreferrer" style="color:var(--accent-cyan);">${label} ↗</a>`;
        return label;
      })
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code style="background:#161B22; border:1px solid #30363D; color:var(--accent); padding:1px 5px; border-radius:4px;">$1</code>');
  }

  function renderAnswer(md, sectionNames = [], allowedLinks = []) {
    const sections = new Set(sectionNames);
    const links = new Set(allowedLinks);
    return String(md || '').trim().split(/\n\s*\n/).filter(Boolean).map(block => {
      const lines = block.split('\n');
      if (lines.every(line => /^\s*[-*]\s+/.test(line))) {
        return `<ul style="margin:8px 0 12px 18px; line-height:1.65;">${lines.map(l => `<li>${renderInline(l.replace(/^\s*[-*]\s+/, ''), sections, links)}</li>`).join('')}</ul>`;
      }
      return `<p style="margin:8px 0 10px;">${renderInline(block, sections, links)}</p>`;
    }).join('');
  }

  window.PortfolioAI = {
    buildPortfolioContext,
    buildSystemPrompt,
    createTextStreamer,
    requestCloudAnswer,
    renderAnswer
  };
})();
