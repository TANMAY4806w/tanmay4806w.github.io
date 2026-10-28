# Tanmay Patil — ⚡ SYNAPSE AI Portfolio

An interactive, Codex-inspired developer workspace and AI assistant portfolio for **Tanmay Patil** (Applied AI / Machine Learning Engineer).

- **Live URL (after GitHub push):** `https://tanmay4806w.github.io/`
- **Theme:** Neural Mint & Cyan (`#2DD4BF` electric mint on `#0D1117` obsidian core)
- **Engine:** Vanilla HTML5, CSS3, ES6 JavaScript (Zero dependencies, sub-50ms load time)

---

## ⚡ Key Highlights Featured

1. **American Hairline (AI Trainee, Full-Time):**
   - **Hair Visualizer:** Multimodal GenAI consultation platform generating 4 synchronized camera angles (Front, Back, Side, Crown) with zero diffusion drift.
   - **Employee Knowledge OS:** Agentic operational SOP synthesis platform built with Next.js, Supabase, Deepgram, and OpenRouter.
   - **Meeting Assistant V2:** AI meeting intelligence with transcript chunking, action item extraction, and WhatsApp delivery on Webyne VPS.
   - **WhatsApp Order Bot:** 80-node n8n conversational pipeline with WAHA, Deepgram, and LLaMA 3.1.
2. **Arkham Archives (AI Developer Intern):**
   - Transformer-based customer support chatbots with Hugging Face.
3. **Machine Learning & Computer Vision Projects:**
   - **FraudGuard AI:** Multilingual financial scam and Ponzi scheme detector with XGBoost & XLM-RoBERTa (93% accuracy).
   - **AI Resume Architect:** ATS resume optimizer using Gemini API and LaTeX.
   - **TreeSense Imaging:** YOLOv8 aerial tree detection and green-cover analysis.
4. **Downloadable Resume:**
   - One-page AI Engineer resume PDF embedded directly in `assets/files/Tanmay_Patil_Resume.pdf`.

---

## 🚀 How to Run & Preview Locally

Simply double-click `index.html` to open it in Chrome, Edge, or Brave, or run a local static server:

```powershell
# Using Python
python -m http.server 8123

# Or with Node.js
npx serve .
```

Visit `http://localhost:8123` in your browser.

---

## 🌐 How to Deploy to GitHub Pages (2 Minutes)

1. Create a public repository on GitHub named:
   ```
   tanmay4806w.github.io
   ```
2. In your terminal inside the `tanmay4806w.github.io` directory:
   ```bash
   git init
   git add .
   git commit -m "Launch Synapse AI Portfolio"
   git branch -M main
   git remote add origin https://github.com/TANMAY4806w/tanmay4806w.github.io.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**:
   - Source: **Deploy from a branch**
   - Branch: **main** / root
   - Click **Save**.
4. Your site will be live at:
   ```
   https://tanmay4806w.github.io/
   ```

---

## 🛡️ Supabase Free Tier Keep-Alive (Automated)

Included in `.github/workflows/keep-alive.yml`:
- Runs an automated GitHub Action cron every 4 days to ping your Supabase instance.
- Prevents Supabase from pausing due to free-tier inactivity, keeping your database awake 24/7 with zero cost.
