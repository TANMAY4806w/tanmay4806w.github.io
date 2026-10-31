(() => {
  const resumePath = 'assets/files/Tanmay_Patil_Resume.pdf';

  const files = {
    'README.md': `# Tanmay Patil\n\n<div class="meta">AI / ML ENGINEER · MUMBAI, INDIA</div>\n\nI build **production Generative AI, multimodal pipelines, and autonomous agentic workflows.**\n\nFrom clinical multi-angle computer vision to long-transcript intelligence and 80-node automated conversational pipelines, I design, ship, and operate reliable AI systems end-to-end.\n\n<div class="callout"><span class="metric">Production Impact</span> Shipping multimodal LLMs, agentic SOP synthesis, and automated business workflows into daily operations.</div>\n\n## Featured Highlights\n\n- [Hair Visualizer](american-hairline.md) — Multimodal GenAI consultation platform generating 4 synchronized camera angles with zero drift.\n- [Employee Knowledge OS](american-hairline.md) — Agentic SOP extraction platform built with Next.js, Supabase, Deepgram, and OpenRouter.\n- [FraudGuard AI](fraudguard-ai.md) — Multilingual financial scam and Ponzi scheme detector achieving 93% accuracy with XGBoost & XLM-RoBERTa.\n- [AI Resume Architect](resume-architect.md) — ATS optimization engine with Gemini API and automated LaTeX generation.\n- [TreeSense Imaging](treesense.md) — Aerial tree detection, green-cover analysis, and pathfinding with YOLOv8.\n\n## Explore the Workspace\n\nExplore [American Hairline](american-hairline.md), [Arkham Archives](arkham-archives.md), [all projects](projects.md), [my toolkit](toolkit.md), or [my career timeline](experience.md).`,

    'about.md': `# About Me\n\n<img class="portrait" src="images/tanmay-profile.png?v=3" alt="Tanmay Patil">\n\n<div class="meta">AI / ML ENGINEER · MUMBAI, INDIA</div>\n\nI’m Tanmay Patil, an AI Engineer focused on turning advanced machine learning models into robust, real-world products.\n\nCurrently, I work as an **AI Trainee (Full-time)** at **American Hairline** in Mumbai, where I engineer multimodal diffusion pipelines, speech-to-text systems, agentic workflows, and internal automation. Previously, I was an **AI Developer Intern** at **Arkham Archives**.\n\n## Engineering Principles\n\n- **Solve Real Operational Bottlenecks:** AI is only as useful as the business friction it eliminates.\n- **Grounded & Deterministic Workflows:** Tame stochastic LLMs with schema enforcement, visual anchors, and guardrails.\n- **Multimodal by Design:** Integrate vision, voice (Deepgram, AssemblyAI), and structured database memory.\n- **Resilient Operations:** Build failover model chains and error-tolerant webhook pipelines.\n\n## Education\n\n**Bachelor of Technology in Artificial Intelligence & Machine Learning** (Nov 2022 – Jun 2026)\nALDEL Institute’s St. John’s College of Engineering and Management, Mumbai · **CGPA: 7.68 / 10**`,

    'american-hairline.md': `# American Hairline\n\n<div class="meta">AI TRAINEE (FULL-TIME) · MARCH 2026—PRESENT · MUMBAI, INDIA</div>\n\nLeading development of multimodal Generative AI systems, internal automation, and intelligent operational workflows.\n\n## 1. Hair Visualizer (Multimodal 4-Angle Clinical Synthesis)\n- Built a clinical GenAI consultation platform generating photorealistic hairstyle previews across **4 synchronized angles** (Front, Back, Side, Crown).\n- Engineered a **two-pass architecture** to eliminate diffusion angle drift: Pass 1 locks a 10-point technical hair spec; Pass 2 generates the master front view with Gemini Flash and anchors it into parallel requests for the other angles.\n- Built a multi-model failover vision chain across **Gemini 2.5 Flash, Qwen 2.5 VL, and LLaMA 4** with negative constraint enforcement.\n\n## 2. Employee Knowledge OS\n- Architected an agentic knowledge-extraction system using **Next.js, Supabase, OpenRouter, and Deepgram**.\n- Systematically captures spoken operational audio, extracts step-by-step procedures, and synthesizes structured corporate SOPs.\n\n## 3. Meeting Assistant V2\n- Developed an AI meeting intelligence engine using **AssemblyAI & OpenRouter**.\n- Implemented long-transcript chunking, parallel LLM summarization, action-item extraction, and automated WhatsApp delivery. Deployed on a **Webyne VPS**.\n\n## 4. WhatsApp Order Bot (n8n Pipeline)\n- Built a production **80-node n8n conversational workflow** integrating WAHA, Deepgram audio transcription, LLaMA 3.1, Google Sheets, Google Drive, and automated HTML-to-PDF order generation.\n\n## 5. Enterprise Integrations\n- Engineered automations with **Model Context Protocol (MCP)**, Google Apps Script, Service Accounts, Firebase, and Supabase.\n\n<div class="callout">Gemini · OpenRouter · LangChain · Next.js · Supabase · n8n · Deepgram · AssemblyAI</div>`,

    'arkham-archives.md': `# Arkham Archives\n\n<div class="meta">AI DEVELOPER INTERN · JUNE 2025—SEPTEMBER 2025 · REMOTE</div>\n\nDeveloped conversational AI and NLP systems for customer inquiry automation and support workflows.\n\n## Key Contributions\n\n- **Transformer-Powered Chatbots:** Built automated query resolution chatbots using Hugging Face Transformers, reducing repetitive support tickets.\n- **Prompt Engineering & Context Optimization:** Designed prompt strategies, few-shot examples, and memory handling to improve response consistency across multi-turn dialogues.\n- **Evaluation & Benchmarking:** Tested response latency and precision against domain-specific Q&A benchmarks.\n\n<div class="callout">Hugging Face · PyTorch · NLP · Transformers · Prompt Engineering</div>`,

    'fraudguard-ai.md': `# FraudGuard AI (Financial Scam Detector)\n\n<div class="meta">CAPSTONE PROJECT · FASTAPI / REACT / XGBOOST / XLM-ROBERTA</div>\n\nAn end-to-end machine learning system designed to detect multilingual financial scams, Ponzi schemes, and fraudulent offers on social media.\n\n## Architecture & Performance\n\n- **Hybrid NLP Pipeline:** Combined **XLM-RoBERTa** embeddings for multilingual semantic understanding with an optimized **XGBoost** classifier for tabular behavioral features.\n- **Accuracy & Evaluation:** Achieved **93% classification accuracy**, evaluated with precision-recall curves, confusion matrices, and ROC-AUC metrics.\n- **Full-Stack Application:** Built a real-time **FastAPI** backend with REST endpoints and an interactive **React** dashboard displaying risk scores and scam highlight tags.\n\n<div class="callout">XGBoost · XLM-RoBERTa · FastAPI · React · Python · NLP</div>`,

    'resume-architect.md': `# AI Resume Architect\n\n<div class="meta">GENERATIVE AI / GEMINI API / STREAMLIT / LATEX · DEC 2025—JAN 2026</div>\n\nAn intelligent resume tailoring and ATS optimization platform that aligns candidate profiles against target job descriptions.\n\n## Core Capabilities\n\n- **ATS Keyword Matching:** Analyzes job descriptions using **Gemini API** to identify missing technical competencies, keywords, and role expectations.\n- **Automated Document Synthesis:** Compiles tailored PDF and DOCX resumes dynamically using clean LaTeX templates and Python document workflows.\n- **Interactive UI:** Built an intuitive **Streamlit** interface with side-by-side match scoring and instant compilation preview.\n\n<div class="callout">Gemini API · LaTeX · Streamlit · Python · ATS Optimization</div>`,

    'treesense.md': `# TreeSense Imaging\n\n<div class="meta">COMPUTER VISION / YOLOV8 / STREAMLIT · SEP 2025—OCT 2025</div>\n\nAn aerial computer-vision system for environmental monitoring, canopy density estimation, and route planning.\n\n## Highlights\n\n- **YOLOv8 Detection:** Trained a custom YOLOv8 model on aerial imagery to accurately detect and count individual trees across varying topographies.\n- **Vegetation Density Analysis:** Computed green-cover percentages and spatial distribution maps.\n- **Pathfinding Integration:** Implemented pathfinding algorithms on top of detected foliage maps to evaluate accessible routes in dense regions.\n- **Dashboard:** Interactive Streamlit web app for uploading drone orthomosaics and inspecting live bounding-box detections.\n\n<div class="callout">YOLOv8 · OpenCV · Streamlit · Python · Computer Vision</div>`,

    'projects.md': `# Open-Source & Selected Projects\n\n<div class="meta">PRODUCTION AI · REPOSITORIES · EXPERIMENTS</div>\n\n- [FraudGuard AI](https://github.com/TANMAY4806w) — Multilingual financial scam and Ponzi scheme detector with XGBoost and XLM-RoBERTa (93% accuracy).\n- [AI Resume Architect](https://github.com/TANMAY4806w) — Generative AI ATS resume tailoring tool with Gemini API and LaTeX engine.\n- [TreeSense Imaging](https://github.com/TANMAY4806w) — Aerial tree detection and green-cover analysis powered by YOLOv8.\n- [Hair Visualizer](https://github.com/ahl-official/ahl-hair-visualizer) — Multimodal 4-camera angle hairstyle consultation platform (American Hairline).\n- [Meeting Assistant V2](https://github.com/ahl-official/Meeting-Assistant-V2) — AI meeting intelligence with long-transcript chunking and WhatsApp delivery.\n- [Employee Knowledge OS](https://github.com/ahl-official/employee-knowledge-os) — Agentic SOP extraction platform with Next.js, Supabase, and Deepgram.\n- [WhatsApp Order Bot](https://github.com/ahl-official) — 80-node n8n conversational pipeline with WAHA and LLaMA 3.1.\n\n## GitHub Profile\n\nExplore all code and contributions at [github.com/TANMAY4806w](https://github.com/TANMAY4806w).`,

    'toolkit.md': `# Technical Toolkit\n\n<div class="meta">LANGUAGES · MODELS · INFRASTRUCTURE</div>\n\n## Languages & Core\n**Python · SQL · JavaScript · Google Apps Script**\n\n## Generative AI & Agentic Systems\n**LangChain · LangGraph · OpenRouter · Gemini API · Hugging Face · MCP (Model Context Protocol) · RAG · LLaMA 3.1 · Prompt Engineering**\n\n## Machine Learning & Computer Vision\n**PyTorch · TensorFlow · Scikit-learn · YOLOv8 · XGBoost · XLM-RoBERTa · OpenCV · Embeddings**\n\n## Backend & Web Frameworks\n**FastAPI · Flask · REST APIs · React · Next.js · Streamlit**\n\n## Databases & Storage\n**PostgreSQL · Supabase · pgvector · Firebase · Google Sheets · Pandas · NumPy**\n\n## Voice, Audio & Automation\n**n8n · WAHA (WhatsApp HTTP API) · Deepgram · AssemblyAI**\n\n## Deployment & Tools\n**Docker · AWS · Webyne VPS · Vercel · Git · GitHub · Linux**`,

    'experience.md': `# Experience & Career Timeline\n\n<div class="meta">AI ENGINEERING · 2022—PRESENT</div>\n\n## American Hairline · AI Trainee (Full-Time)\n**March 2026—Present · Mumbai, India**\n- Built the **Hair Visualizer** multimodal GenAI platform (4-angle synchronized image generation with Gemini & failover vision models).\n- Architected **Employee Knowledge OS** for agentic operational SOP synthesis using Next.js, Supabase, Deepgram, and OpenRouter.\n- Developed **Meeting Assistant V2** with AssemblyAI, transcript chunking, and automated WhatsApp delivery on Webyne VPS.\n- Built an **80-node n8n conversational workflow** for WhatsApp order processing with LLaMA 3.1 and automated PDF invoices.\n- Implemented internal data integrations with MCP, Google Apps Script, Firebase, and Supabase.\n\n## Arkham Archives · AI Developer Intern\n**June 2025—September 2025 · Remote**\n- Built LLM-powered chatbot systems using Hugging Face Transformers for automated customer query resolution.\n- Engineered prompt optimization strategies to ensure contextual accuracy across multi-turn chats.\n\n## St. John’s College of Engineering & Management · B.Tech AI & ML\n**November 2022—June 2026 · Mumbai, India**\n- Studied Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, and Advanced Mathematics. CGPA: 7.68/10.`,

    'resume.md': `# Resume\n\nDownload my complete AI Engineer resume below. It contains my work at American Hairline, Arkham Archives, capstone ML projects, and full technical proficiencies.`,

    'contact.md': `# Contact & Connect\n\n<div class="meta">OPEN TO AI / ML ROLES & INNOVATIVE PROJECTS</div>\n\nFeel free to reach out if you're looking for an AI Engineer with production experience in Generative AI, agentic systems, or computer vision.\n\n- **Email:** [patiltanmay019@gmail.com](mailto:patiltanmay019@gmail.com)\n- **Phone:** [+91 8308695986](tel:+918308695986)\n- **LinkedIn:** [linkedin.com/in/tanmay-patil-805049250](https://www.linkedin.com/in/tanmay-patil-805049250/)\n- **GitHub:** [github.com/TANMAY4806w](https://github.com/TANMAY4806w)\n- **Location:** Mumbai, Maharashtra, India`
  };

  files['portfolio-profile.md'] = `# Tanmay Patil — Verified AI Profile Reference

Use this reference to accurately answer all questions about Tanmay. Only use facts stated below.

## Summary
AI Engineer with hands-on experience building production Generative AI and automation systems using Python, SQL, LLMs, Agentic AI, RAG, FastAPI, Supabase, n8n, and MCP. Experienced in designing AI workflows, multimodal applications, conversational systems, API integrations, and deploying internal products.

## Experience
1. American Hairline (Mumbai, India) — AI Trainee (Full-time), March 2026–Present
- Hair Visualizer: Multimodal Generative AI system using OpenRouter and Gemini models generating photorealistic hairstyle previews across 4 synchronized camera angles (Front, Back, Side, Crown) with visual grounding and negative constraint clamping. Multi-model vision failover chain across Gemini 2.5 Flash, Qwen 2.5 VL, and LLaMA 4.
- Employee Knowledge OS: Agentic knowledge-extraction platform using Next.js, Supabase, OpenRouter, and Deepgram to systematically capture operational workflows and synthesize detailed SOPs.
- Meeting Assistant V2: AI meeting intelligence system using AssemblyAI and OpenRouter with long-transcript chunking, parallel LLM processing, action-item extraction, and WhatsApp delivery; deployed on a Webyne VPS.
- WhatsApp Order Bot: 80-node n8n conversational workflow integrating WAHA, Deepgram, LLaMA 3.1, Google Sheets, Google Drive, and automated HTML-to-PDF order generation.
- Internal automation and integrations using MCP (Model Context Protocol), Google Apps Script, Service Accounts, Google Sheets, Google Drive, Firebase, and Supabase.

2. Arkham Archives (Remote) — AI Developer Intern, June 2025–September 2025
- Built LLM-powered chatbot systems using Hugging Face Transformers for automated query resolution.
- Engineered prompt optimization strategies to improve contextual relevance across multi-turn conversations.

## Projects
- FraudGuard AI (Capstone Project): Multilingual ML scam & Ponzi detector using XGBoost and XLM-RoBERTa with FastAPI and React. Achieved 93% accuracy.
- AI Resume Architect: Generative AI ATS optimization tool using Gemini API, Streamlit, and LaTeX compilation.
- TreeSense Imaging: Aerial tree detection and green-cover analysis using YOLOv8, OpenCV, and Streamlit with route pathfinding algorithms.

## Education
- ALDEL Institute’s St. John’s College of Engineering and Management, Mumbai, India.
- Bachelor of Technology in Artificial Intelligence & Machine Learning (Nov 2022–Jun 2026). CGPA: 7.68 / 10.

## Contact Information
- Email: patiltanmay019@gmail.com
- Phone: +91 8308695986
- Location: Mumbai, Maharashtra, India
- LinkedIn: https://www.linkedin.com/in/tanmay-patil-805049250
- GitHub: https://github.com/TANMAY4806w
- Resume PDF: assets/files/Tanmay_Patil_Resume.pdf`;

  function render(md) {
    let raw = md
      .replace(/^### (.*)$/gm, '<h3>$1</h3>')
      .replace(/^## (.*)$/gm, '<h2>$1</h2>')
      .replace(/^# (.*)$/gm, '<h1>$1</h1>')
      .replace(/^<div class="meta">(.*?)<\/div>$/gm, '<div class="meta">$1</div>')
      .replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>')
      .replace(/^- (.*)$/gm, '<li>$1</li>');

    raw = raw.split(/\n\n+/).map(block => {
      if (/^<(h[1-3]|div|blockquote|li|img)/.test(block)) return block;
      if (block.startsWith('<li>')) return `<ul>${block}</ul>`;
      return `<p>${block}</p>`;
    }).join('\n');

    return raw
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, target) => {
        return files[target]
          ? `<a href="#${target}" data-file="${target}">${label}</a>`
          : `<a href="${target}" target="_blank" rel="noreferrer">${label} ↗</a>`;
      });
  }

  const tree = [...document.querySelectorAll('.tree-file')];
  const response = document.getElementById('response');
  const welcome = document.querySelector('.welcome');
  let chatGeneration = 0;
  let lastCloudFailure = null;

  const approvedExternalLinks = [...new Set(
    Object.values(files).flatMap(content =>
      [...content.matchAll(/\]\((https:\/\/[^)\s]+)\)/g)].map(m => m[1])
    )
  )];

  function renderResourceLinks(sectionNames, excludedUrls = []) {
    const relevant = ['projects.md', 'american-hairline.md', 'fraudguard-ai.md'].filter(n => sectionNames.includes(n));
    if (!relevant.length) return '';
    const excluded = new Set(excludedUrls);
    const links = relevant.flatMap(name =>
      [...files[name].matchAll(/^- \[([^\]]+)\]\((https:\/\/[^)\s]+)\)/gm)]
        .filter(([, , url]) => !excluded.has(url))
        .map(([, label, url]) => `- [${label}](${url})`)
    );
    return links.length
      ? `<div class="portfolio-resource-links" style="margin-top:14px; padding-top:10px; border-top:1px solid #30363D;"><p><strong style="color:var(--accent);">Explore Related Links</strong></p>${window.PortfolioAI.renderAnswer(links.join('\n'), Object.keys(files), approvedExternalLinks)}</div>`
      : '';
  }

  function buildStaticTopicAnswer(topicsList) {
    return topicsList.map(topic => render(files[topic.key])).join('<hr style="border:0; border-top:1px solid #30363D; margin:20px 0;">');
  }

  const resumeCard = () => `
    <a class="attachment-card" href="${resumePath}" download="Tanmay_Patil_AI_Engineer_Resume.pdf">
      <span class="pdf-badge">PDF</span>
      <span class="attachment-name">
        <strong>Tanmay_Patil_AI_Engineer_Resume.pdf</strong>
        <small>AI / ML Engineer · Mumbai · 1 Page</small>
      </span>
      <span class="download-icon" aria-hidden="true">↓</span>
    </a>
  `;

  const sectionPrompts = {
    'README.md': 'Give me an overview of Tanmay',
    'about.md': 'Tell me about Tanmay Patil',
    'american-hairline.md': 'Tell me about Tanmay’s work at American Hairline',
    'arkham-archives.md': 'What did Tanmay do at Arkham Archives?',
    'fraudguard-ai.md': 'Explain the FraudGuard AI project',
    'resume-architect.md': 'Tell me about the AI Resume Architect',
    'treesense.md': 'Explain the TreeSense Imaging project',
    'projects.md': 'Show me Tanmay’s projects and GitHub repos',
    'toolkit.md': 'What is Tanmay’s technical stack and toolkit?',
    'experience.md': 'Show me Tanmay’s career timeline',
    'resume.md': 'Can I download Tanmay’s resume?',
    'contact.md': 'How do I contact Tanmay?'
  };

  // Web Audio Mechanical Switch Synthesizer
  const SoundFX = (() => {
    let ctx = null;
    let isMuted = localStorage.getItem('synapse_sound') === 'muted';
    let lastPlay = 0;

    function initCtx() {
      if (!ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) ctx = new AudioCtx();
      }
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }
    }

    function playKeyClick() {
      if (isMuted) return;
      const nowMs = performance.now();
      // Natural typing cadence throttle: ~95ms minimum interval (~10 keystrokes/sec max)
      // Eliminates the machine-gun buzzing vibration completely!
      if (nowMs - lastPlay < 95) return;
      lastPlay = nowMs;
      initCtx();
      if (!ctx) return;

      try {
        const now = ctx.currentTime;

        // 1. Transient click (subtle high-frequency tick of keycap contact)
        const oscClick = ctx.createOscillator();
        const gainClick = ctx.createGain();
        oscClick.type = 'triangle';
        const clickPitch = 780 + (Math.random() * 160 - 80);
        oscClick.frequency.setValueAtTime(clickPitch, now);
        oscClick.frequency.exponentialRampToValueAtTime(320, now + 0.015);

        gainClick.gain.setValueAtTime(0.016, now);
        gainClick.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

        oscClick.connect(gainClick);
        gainClick.connect(ctx.destination);
        oscClick.start(now);
        oscClick.stop(now + 0.016);

        // 2. Body thud (warm bottom-out switch resonance)
        const oscThud = ctx.createOscillator();
        const gainThud = ctx.createGain();
        oscThud.type = 'sine';
        const thudPitch = 210 + (Math.random() * 30 - 15);
        oscThud.frequency.setValueAtTime(thudPitch, now);
        oscThud.frequency.exponentialRampToValueAtTime(80, now + 0.032);

        gainThud.gain.setValueAtTime(0.02, now);
        gainThud.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);

        oscThud.connect(gainThud);
        gainThud.connect(ctx.destination);
        oscThud.start(now);
        oscThud.stop(now + 0.035);
      } catch (_) {}
    }

    function toggleMute() {
      isMuted = !isMuted;
      localStorage.setItem('synapse_sound', isMuted ? 'muted' : 'enabled');
      return isMuted;
    }

    return { playKeyClick, toggleMute, isMuted: () => isMuted, init: initCtx };
  })();

  async function typeRichContent(content, generation) {
    const deferredCards = [...content.querySelectorAll('.attachment-card')];
    deferredCards.forEach(c => c.remove());
    const restoreCards = () => deferredCards.forEach(c => content.append(c));

    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let node = walker.nextNode();
    while (node) {
      textNodes.push({ node, characters: Array.from(node.nodeValue || '') });
      node = walker.nextNode();
    }
    const totalCharacters = textNodes.reduce((t, item) => t + item.characters.length, 0);
    if (!totalCharacters) { restoreCards(); return true; }

    textNodes.forEach(item => { item.node.nodeValue = ''; });

    // Readable, steady typewriter speed:
    // Short answers: 1 char every 26ms (very readable and authentic)
    // Medium content: 2 chars every 22ms
    // Long sections: 3-4 chars every 18ms
    const chunkSize = totalCharacters > 900 ? 4 : totalCharacters > 400 ? 2 : 1;
    const delay = totalCharacters > 900 ? 18 : totalCharacters > 400 ? 22 : 26;

    const chatScroll = document.querySelector('.chat-scroll');

    for (const item of textNodes) {
      const chars = item.characters;
      for (let i = 0; i < chars.length; i += chunkSize) {
        if (generation !== chatGeneration) return false;
        const slice = chars.slice(i, i + chunkSize).join('');
        item.node.appendData(slice);
        if (slice.trim()) SoundFX.playKeyClick();
        await new Promise(r => setTimeout(r, delay));

        if (chatScroll && (chatScroll.scrollHeight - chatScroll.scrollTop - chatScroll.clientHeight < 140)) {
          chatScroll.scrollTop = chatScroll.scrollHeight;
        }
      }
    }
    if (generation !== chatGeneration) return false;
    restoreCards();
    if (chatScroll) chatScroll.scrollTop = chatScroll.scrollHeight;
    return true;
  }

  function showFile(name) {
    if (!files[name]) return;
    const generation = ++chatGeneration;
    chatInput.disabled = false;
    updateSendButton();
    tree.forEach(b => b.classList.toggle('selected', b.dataset.file === name));
    welcome.hidden = true;
    response.hidden = false;

    const body = render(files[name]) + (name === 'resume.md' ? resumeCard() : '');
    response.innerHTML = `
      <div class="user-message">${sectionPrompts[name] || 'Tell me about this'}</div>
      <div class="assistant-message">
        <div class="assistant-avatar">⚡</div>
        <div class="assistant-content">${body}</div>
      </div>
    `;
    if (innerWidth <= 768) setSidebarOpen(false);
    document.querySelector('.chat-scroll').scrollTop = document.querySelector('.chat-scroll').scrollHeight;
    void typeRichContent(response.querySelector('.assistant-content'), generation);
  }

  tree.forEach(b => b.addEventListener('click', () => {
    showFile(b.dataset.file);
    if (innerWidth <= 768) setSidebarOpen(false);
  }));

  const chatInput = document.getElementById('chatInput');
  const sendButton = document.getElementById('sendButton');

  function resizeComposer() {
    const maxH = innerWidth <= 640 ? 95 : 130;
    chatInput.style.height = 'auto';
    chatInput.style.height = `${Math.min(chatInput.scrollHeight, maxH)}px`;
    chatInput.style.overflowY = chatInput.scrollHeight > maxH ? 'auto' : 'hidden';
  }

  function updateSendButton() {
    sendButton.disabled = chatInput.disabled || !chatInput.value.trim();
  }

  chatInput.addEventListener('input', () => { resizeComposer(); updateSendButton(); });
  window.addEventListener('resize', resizeComposer);
  resizeComposer();

  function startNewChat() {
    chatGeneration++;
    response.hidden = true;
    response.replaceChildren();
    welcome.hidden = false;
    tree.forEach(b => b.classList.remove('selected'));
    chatInput.value = '';
    chatInput.disabled = false;
    resizeComposer();
    updateSendButton();
    resetAiStatus();
    chatInput.focus();
    if (innerWidth <= 768) setSidebarOpen(false);
  }

  document.getElementById('newChatButton').addEventListener('click', startNewChat);
  document.querySelector('.codex-brand').addEventListener('click', () => {
    showFile('README.md');
    if (innerWidth <= 768) setSidebarOpen(false);
  });

  // Search Dialog
  const searchButton = document.getElementById('searchButton');
  const searchDialog = document.getElementById('searchDialog');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  function normalizeText(v) {
    return v.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9+#%]+/g, ' ').trim().replace(/\s+/g, ' ');
  }

  function renderSearchResults(query = '') {
    const norm = normalizeText(query);
    searchResults.replaceChildren();
    const matches = tree.filter(b => !norm || normalizeText(`${b.textContent} ${files[b.dataset.file]}`).includes(norm));

    if (!matches.length) {
      const empty = document.createElement('p');
      empty.className = 'search-empty';
      empty.style.color = '#8B949E';
      empty.style.padding = '10px';
      empty.textContent = `No sections found for “${query.trim()}”. Try American Hairline, FraudGuard, Python, or RAG.`;
      searchResults.append(empty);
      return;
    }
    matches.forEach(b => {
      const res = document.createElement('button');
      res.type = 'button';
      res.className = 'search-result';
      res.textContent = b.textContent.replace('◌', '').trim();
      res.addEventListener('click', () => { showFile(b.dataset.file); searchDialog.close(); });
      searchResults.append(res);
    });
  }

  function openSearch() {
    renderSearchResults();
    searchDialog.showModal();
    searchInput.value = '';
    searchInput.focus();
  }

  document.getElementById('closeSearchButton').addEventListener('click', () => searchDialog.close());
  searchButton.addEventListener('click', openSearch);
  searchInput.addEventListener('input', () => renderSearchResults(searchInput.value));
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const first = searchResults.querySelector('.search-result');
      if (first) { e.preventDefault(); first.click(); }
    }
  });
  searchDialog.addEventListener('click', e => { if (e.target === searchDialog) searchDialog.close(); });

  // Share Dialog
  const toast = document.getElementById('toast');
  const shareDialog = document.getElementById('shareDialog');
  const shareInput = document.getElementById('shareLinkInput');
  const portfolioUrl = 'https://tanmay4806w.github.io/';
  shareInput.value = portfolioUrl;
  let toastTimer;

  function showToast(msg) {
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2600);
  }

  function openShareDialog() {
    shareDialog.showModal();
    shareInput.focus();
    shareInput.select();
  }

  async function copyPortfolioLink() {
    try {
      await navigator.clipboard.writeText(shareInput.value);
      showToast('⚡ Synapse portfolio link copied!');
      return true;
    } catch { return false; }
  }

  document.getElementById('shareButton').addEventListener('click', async () => {
    SoundFX.init();
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: document.title, text: 'Tanmay Patil — AI Engineer Portfolio', url: shareInput.value });
        return;
      } catch (e) { if (e?.name === 'AbortError') return; }
    }
    openShareDialog();
  });
  document.getElementById('closeShareButton').addEventListener('click', () => shareDialog.close());
  document.getElementById('copyShareLinkButton').addEventListener('click', async () => {
    if (await copyPortfolioLink()) shareDialog.close();
  });

  // Sound Toggle Button
  const soundBtn = document.getElementById('soundToggleBtn');
  function updateSoundBtn() {
    if (!soundBtn) return;
    const muted = SoundFX.isMuted();
    soundBtn.textContent = muted ? '🔇' : '🔊';
    soundBtn.classList.toggle('muted', muted);
    soundBtn.title = muted ? 'Mechanical keyboard sound: Muted (Click to enable)' : 'Mechanical keyboard sound: Active (Click to mute)';
  }
  if (soundBtn) {
    updateSoundBtn();
    soundBtn.addEventListener('click', () => {
      SoundFX.init();
      const muted = SoundFX.toggleMute();
      updateSoundBtn();
      if (!muted) SoundFX.playKeyClick();
      showToast(muted ? '🔇 Typewriter sound muted' : '🔊 Mechanical keyboard sound enabled');
    });
  }

  // More Menu
  const moreButton = document.getElementById('moreButton');
  const moreMenu = document.getElementById('moreMenu');
  moreButton.addEventListener('click', () => {
    const op = moreMenu.hidden;
    moreMenu.hidden = !op;
    moreButton.setAttribute('aria-expanded', String(op));
  });
  moreMenu.addEventListener('click', async e => {
    const item = e.target.closest('[role="menuitem"]');
    if (!item) return;
    moreMenu.hidden = true;
    if (item.dataset.menuAction === 'copy-link') {
      await copyPortfolioLink();
    }
  });
  document.addEventListener('click', e => { if (!e.target.closest('.more-wrap')) moreMenu.hidden = true; });

  // Suggestions & Sidebar
  document.querySelectorAll('.suggestions button').forEach(b => b.addEventListener('click', () => {
    showFile(b.dataset.file);
    if (innerWidth <= 768) setSidebarOpen(false);
  }));
  const explorer = document.getElementById('explorer');
  const explorerToggle = document.getElementById('explorerToggle');
  const sidebarCollapseToggle = document.getElementById('sidebarCollapseToggle');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');

  function setSidebarOpen(isOpen) {
    explorer.classList.toggle('closed', !isOpen);
    document.body.classList.toggle('sidebar-open', isOpen);
    for (const b of [explorerToggle, sidebarCollapseToggle]) {
      if (b) {
        b.setAttribute('aria-expanded', String(isOpen));
        b.textContent = isOpen ? '◧' : '☰';
      }
    }
  }
  if (explorerToggle) explorerToggle.addEventListener('click', () => setSidebarOpen(explorer.classList.contains('closed')));
  if (sidebarCollapseToggle) sidebarCollapseToggle.addEventListener('click', () => setSidebarOpen(false));
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', () => setSidebarOpen(false));

  // Topics Matching
  const topics = [
    { key: 'american-hairline.md', aliases: ['american hairline', 'ahl', 'hairline', 'hair visualizer', 'knowledge os', 'meeting assistant', 'whatsapp bot', 'order bot'], keywords: ['gemini', 'openrouter', 'webyne', 'vps', 'deepgram', 'assemblyai', 'n8n', 'waha', 'sop', 'angle', 'camera'] },
    { key: 'arkham-archives.md', aliases: ['arkham', 'arkham archives', 'internship', 'intern'], keywords: ['hugging face', 'transformers', 'chatbot', 'nlp', 'support', 'prompt'] },
    { key: 'fraudguard-ai.md', aliases: ['fraudguard', 'fraud', 'scam', 'ponzi', 'capstone'], keywords: ['xgboost', 'xlm-roberta', 'fastapi', 'react', '93%', 'classifier'] },
    { key: 'resume-architect.md', aliases: ['resume architect', 'ats', 'latex resume', 'resume optimizer'], keywords: ['gemini api', 'streamlit', 'ats', 'latex', 'keyword'] },
    { key: 'treesense.md', aliases: ['treesense', 'tree', 'aerial', 'drone', 'yolo', 'foliage'], keywords: ['yolov8', 'computer vision', 'streamlit', 'canopy', 'pathfinding'] },
    { key: 'projects.md', aliases: ['project', 'projects', 'github', 'repos', 'repositories', 'code', 'open source'], keywords: ['fraudguard', 'resume architect', 'treesense', 'hair visualizer'] },
    { key: 'experience.md', aliases: ['experience', 'work', 'career', 'employment', 'timeline', 'companies'], keywords: ['american hairline', 'arkham archives', 'trainee', 'engineer', '2026'] },
    { key: 'toolkit.md', aliases: ['toolkit', 'skills', 'skill', 'tech stack', 'technologies', 'tools', 'languages', 'frameworks'], keywords: ['python', 'fastapi', 'supabase', 'langchain', 'langgraph', 'mcp', 'n8n', 'docker', 'yolo', 'postgres'] },
    { key: 'contact.md', aliases: ['contact', 'email', 'phone', 'reach', 'linkedin', 'hire'], keywords: ['patiltanmay019@gmail.com', '8308695986', 'linkedin', 'github', 'mumbai'] },
    { key: 'README.md', aliases: ['overview', 'about tanmay', 'who is tanmay', 'summary', 'introduction'], keywords: ['production ai', 'generative ai', 'agentic', 'multimodal', 'engineer'] }
  ];

  const stopWords = new Set('a an and are as at be can could did do does for from give he her his how i in is it me my of on or tell that the their them this to what when where which who why with would you your tanmay'.split(' '));

  function matchTopics(question) {
    const normalized = normalizeText(question);
    const terms = [...new Set(normalized.split(' ').filter(w => w.length > 2 && !stopWords.has(w)))];

    const ranked = topics.map(topic => {
      const aliases = topic.aliases.map(normalizeText);
      const keywords = topic.keywords.map(normalizeText);
      const aliasHits = aliases.filter(p => normalized.includes(p));
      const keywordHits = keywords.filter(p => normalized.includes(p));
      const searchable = new Set(normalizeText(topic.key + ' ' + files[topic.key]).split(' '));
      const contentHits = terms.filter(t => searchable.has(t));
      return { key: topic.key, score: aliasHits.reduce((n, p) => n + (p.includes(' ') ? 6 : 4), 0) + keywordHits.length * 3 + contentHits.length, aliasHits, keywordHits, contentHits };
    }).sort((a, b) => b.score - a.score);

    const direct = ranked.filter(t => t.aliasHits.length > 0 || t.keywordHits.length > 0);
    if (direct.length > 1 && direct.slice(0, 3).some(t => t.aliasHits.length)) return direct.slice(0, 3);
    const best = ranked[0];
    return best && (best.score >= 4 && (best.aliasHits.length || best.keywordHits.length || best.contentHits.length >= 2)) ? [best] : [];
  }

  async function send() {
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendButton');
    const question = input.value.trim();
    if (!question || sendBtn.disabled) return;

    const generation = chatGeneration;
    welcome.hidden = true;
    response.hidden = false;
    const safeQ = question.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const isResumeReq = /\b(resume|cv|curriculum vitae)\b/i.test(question);

    response.insertAdjacentHTML('beforeend', `<div class="user-message">${safeQ}</div>`);
    lastCloudFailure = null;

    const pending = document.createElement('div');
    pending.className = 'assistant-message';
    pending.innerHTML = `
      <div class="assistant-avatar">⚡</div>
      <div class="assistant-content">
        <div class="thinking-indicator"><span class="thinking-label">⚡ Synapse is analyzing…</span></div>
        <div class="assistant-answer" aria-live="polite"></div>
      </div>
    `;
    response.append(pending);

    input.value = '';
    resizeComposer();
    input.disabled = true;
    sendBtn.disabled = true;

    const pendingContent = pending.querySelector('.assistant-content');
    const answerLine = pending.querySelector('.assistant-answer');
    const thinking = pending.querySelector('.thinking-indicator');
    let answerStarted = false;

    const streamer = window.PortfolioAI.createTextStreamer(chunk => {
      if (generation !== chatGeneration) return;
      if (!answerStarted) { answerStarted = true; thinking.hidden = true; }
      answerLine.textContent += chunk;
      SoundFX.playKeyClick();
    });

    let answer = '', typeAnswer = false, resourceFiles = [];

    try {
      if (isResumeReq) {
        answer = `<p>Here is Tanmay Patil’s current AI Engineer resume. You can download the PDF below:</p>${resumeCard()}`;
        typeAnswer = true;
      } else {
        let matches = matchTopics(question);
        const asksAboutTanmay = /\b(tanmay|you|your|yourself|he|his|him|i|me|my|mine)\b/i.test(question);
        if (!matches.length && asksAboutTanmay) matches = ['about.md', 'experience.md', 'toolkit.md'].map(key => ({ key }));

        if (!matches.length) {
          answer = `<p>I’m Tanmay’s portfolio AI assistant. I can help with his experience at <strong>American Hairline</strong>, his ML projects (<strong>FraudGuard AI</strong>, <strong>TreeSense</strong>), technical skills (FastAPI, LangChain, Supabase, n8n), or his resume.</p>`;
          typeAnswer = true;
        } else if (matches.length === 1 && matches[0].key === 'contact.md') {
          setAiStatus('Synapse · direct answer');
          answer = `<p>Here are Tanmay’s contact details:</p>${render(files['contact.md'])}`;
          typeAnswer = true;
        } else {
          const relevantFiles = matches.map(t => t.key);
          resourceFiles = relevantFiles;
          const cloudAnswer = await answerWithCloud(question, relevantFiles, chunk => streamer.push(chunk));

          if (cloudAnswer) {
            await streamer.finish();
            const rendered = window.PortfolioAI.renderAnswer(cloudAnswer, Object.keys(files), approvedExternalLinks);
            answer = rendered + renderResourceLinks(resourceFiles);
          } else {
            // Local fallback from verified sections
            const staticAns = buildStaticTopicAnswer(matches);
            answer = staticAns + renderResourceLinks(resourceFiles);
            typeAnswer = true;
          }
        }
      }

      if (generation !== chatGeneration) return;
      pending.remove();
      response.insertAdjacentHTML('beforeend', `
        <div class="assistant-message">
          <div class="assistant-avatar">⚡</div>
          <div class="assistant-content">${answer}</div>
        </div>
      `);
      if (typeAnswer) await typeRichContent(response.lastElementChild.querySelector('.assistant-content'), generation);
    } catch {
      if (generation === chatGeneration) {
        pendingContent.textContent = 'I encountered a brief interruption. Please ask again or click a section from the sidebar.';
      }
    } finally {
      pending.remove();
      if (generation === chatGeneration) {
        input.disabled = false;
        updateSendButton();
        resizeComposer();
        document.querySelector('.chat-scroll').scrollTop = document.querySelector('.chat-scroll').scrollHeight;
      }
    }
  }

  const aiStatus = document.getElementById('aiStatus');
  const chatEndpoint = document.querySelector('meta[name="portfolio-chat-endpoint"]')?.content.trim() || '';

  function setAiStatus(msg) { if (aiStatus) aiStatus.textContent = msg; }
  function resetAiStatus() { setAiStatus('Synapse AI ready'); }

  async function answerWithCloud(question, relevantFiles, onDelta) {
    if (!chatEndpoint) return null;
    try {
      setAiStatus('Querying Synapse neural router…');
      const ans = await window.PortfolioAI.requestCloudAnswer(
        chatEndpoint,
        question,
        window.PortfolioAI.buildPortfolioContext(files, relevantFiles),
        globalThis.fetch,
        onDelta
      );
      if (ans) setAiStatus('Synapse AI ready');
      return ans;
    } catch (e) {
      lastCloudFailure = e;
      setAiStatus('Answering via local portfolio knowledge…');
      return null;
    }
  }

  setAiStatus('Synapse AI ready');

  response.addEventListener('click', e => {
    const link = e.target.closest('a[data-file]');
    if (link && files[link.dataset.file]) {
      e.preventDefault();
      showFile(link.dataset.file);
    }
  });

  document.getElementById('sendButton').addEventListener('click', send);
  document.getElementById('chatInput').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });

  let wasMobile = innerWidth <= 768;
  if (wasMobile) setSidebarOpen(false);
  window.addEventListener('resize', () => {
    const isM = innerWidth <= 768;
    if (isM !== wasMobile) { setSidebarOpen(!isM); wasMobile = isM; }
    resizeComposer();
  });

  const welcomeText = document.getElementById('welcomeTitleText');
  const welcomeCursor = document.getElementById('welcomeTitleCursor');

  function typeWelcomeTitle() {
    const prompt = 'What would you like to explore about Tanmay?';
    welcomeCursor.classList.add('is-active');
    let pos = 0;
    const typing = setInterval(() => {
      welcomeText.textContent = prompt.slice(0, ++pos);
      if (pos % 4 === 0) SoundFX.playKeyClick();
      if (pos === prompt.length) clearInterval(typing);
    }, 45);
  }

  setTimeout(() => {
    document.body.classList.add('ready');
    document.body.classList.remove('booting');
    typeWelcomeTitle();
  }, 700);
})();
