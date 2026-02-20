# Navin Suresh — Cybersecurity Portfolio

A production-ready, Tron/terminal-themed cybersecurity portfolio with an interactive terminal.

---

## 🚀 Quick Start

1. **Unzip / clone** this folder
2. Open `config.js` and fill in your details (see below)
3. Add your CV PDF to `assets/docs/Navin_Suresh_CV.pdf`
4. Deploy to Netlify / Vercel / GitHub Pages (see below)
5. Done ✅

---

## ✏️ Customizing Your Portfolio

**All content lives in one file: `config.js`**

You never need to touch `index.html`, `style.css`, or `app.js` for content changes.

### Personal Info
```js
name:     "Navin Suresh",
tagline:  "Cybersecurity Analyst | SOC | Digital Forensics",
bio:      "Your bio here...",
email:    "you@email.com",
location: "Your City, Country",
cvPath:   "./assets/docs/Your_CV.pdf",
available: true,   // set false if not looking
```

### Adding a Project
```js
projects: [
  {
    id:     "004",
    title:  "Your New Project",
    desc:   "What it does.",
    stack:  ["Python", "Tool2"],
    repo:   "https://github.com/you/your-repo",
    live:   "https://your-project.live",   // or "" if no live demo
    terminal: [
      "> LOADING...",
      "> PROCESSING DATA...",
      "> COMPLETE ✓",
    ],
    features: ["Feature 1", "Feature 2"],
    status: "COMPLETED",  // or "IN PROGRESS"
  },
]
```

### Adding Education / Certifications
```js
education: [
  { year: "2021–2025", degree: "...", school: "...", desc: "..." },
],
certifications: [
  { year: "2024", name: "CompTIA Security+", org: "CompTIA" },
],
```

### Adding Skills
```js
skills: [
  { name: "New Skill", pct: 75 },  // pct is 0–100
],
tools: [
  { cat: "New Category", items: ["Tool1", "Tool2"] },
],
```

---

## 📬 Setting Up the Contact Form (Formspree)

1. Go to [formspree.io](https://formspree.io) → Sign up (free)
2. Click **New Form** → Name it → Copy the endpoint URL
3. In `config.js`, replace:
   ```js
   formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
   ```
   with your actual endpoint.

Emails will go directly to your inbox. Free tier: 50 submissions/month.

---

## 🌐 Deploying

### Option A: Netlify (Recommended — free, fast)
1. Go to [netlify.com](https://netlify.com) → Sign up
2. Drag & drop this entire folder onto the Netlify dashboard
3. Done! You get a live URL instantly.
4. For a custom domain: Site Settings → Domain Management

### Option B: Vercel
1. Go to [vercel.com](https://vercel.com) → Sign up
2. Install CLI: `npm i -g vercel`
3. Run `vercel` in this folder → follow prompts
4. Or connect your GitHub repo in the Vercel dashboard

### Option C: GitHub Pages
1. Create a GitHub repo (e.g. `navin-2003.github.io`)
2. Push all files to the `main` branch
3. Go to Settings → Pages → Source: `main` branch, root `/`
4. Your site is live at `https://navin-2003.github.io`

---

## 📁 File Structure

```
navin-portfolio/
├── index.html          ← Main HTML (don't edit for content)
├── config.js           ← ✏️  ALL YOUR CONTENT LIVES HERE
├── netlify.toml        ← Netlify config (security headers, caching)
├── vercel.json         ← Vercel config
├── .gitignore
├── README.md
└── assets/
    ├── css/
    │   └── style.css   ← All styles
    ├── js/
    │   └── app.js      ← All JavaScript (renders from config.js)
    ├── docs/
    │   └── Navin_Suresh_CV.pdf  ← ✏️  PUT YOUR CV HERE
    ├── img/
    │   ├── favicon.ico            ← Add your favicon
    │   ├── favicon-16x16.png
    │   ├── favicon-32x32.png
    │   ├── favicon-192x192.png
    │   ├── favicon-512x512.png
    │   ├── apple-touch-icon.png
    │   └── og-image.png           ← 1200×630px for social sharing
    └── site.webmanifest
```

---

## 🖼️ Favicon & OG Image

**Favicon**: Use [realfavicongenerator.net](https://realfavicongenerator.net) — upload a logo image, download the package, and drop the files into `assets/img/`.

**OG Image** (`og-image.png`): A 1200×630px screenshot or designed card shown when your portfolio is shared on LinkedIn, WhatsApp, etc. You can make one at [canva.com](https://canva.com).

---

## 🖥️ Terminal Commands

Open terminal: click **⌨ TERMINAL** button or press `Ctrl + \``

| Command | Description |
|---|---|
| `help` | All commands |
| `whoami` | Identity + ASCII art |
| `about` | Full bio |
| `skills` | Animated skill bars |
| `tools` | Full tech arsenal |
| `projects` | List all projects |
| `project 1` | Deep-dive on project 1 |
| `education` | Academic background |
| `certs` | Certifications |
| `experience` | Work exposure |
| `services` | Services offered |
| `contact` | Contact info |
| `social` | Clickable social links |
| `status` | Availability status |
| `cv` | Download CV |
| `open github` | Open social link |
| `hire` | Why hire Navin |
| `theme orange` | Switch color theme |
| `scan` | Fake network scan |
| `crack` | Simulated hash crack |
| `matrix` | Enter the Matrix 👾 |
| `banner` | ASCII logo |
| `clear` | Clear terminal |
| `exit` | Close terminal |

---

## 🔒 Security Headers

Security headers are pre-configured in `netlify.toml` and `vercel.json`:
- `X-Frame-Options: DENY` — prevents clickjacking
- `X-XSS-Protection` — basic XSS protection
- `X-Content-Type-Options: nosniff` — prevents MIME sniffing
- `Referrer-Policy` — controls referrer info

---

## ✅ Production Checklist

- [ ] Fill in all details in `config.js`
- [ ] Add CV PDF to `assets/docs/`
- [ ] Replace all placeholder GitHub repo links with real URLs
- [ ] Set up Formspree and update `formspreeEndpoint` in `config.js`
- [ ] Generate favicon and add to `assets/img/`
- [ ] Create `og-image.png` (1200×630) and add to `assets/img/`
- [ ] Update `seo.url` in `config.js` to your live domain
- [ ] Deploy to Netlify / Vercel / GitHub Pages
- [ ] Test on mobile
- [ ] Share the link! 🚀

---

Made with ⚡ by Navin Suresh
