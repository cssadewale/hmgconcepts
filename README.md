<div align="center">

# HMG CONCEPTS — Official Website
### His Marvellous Grace Educational Consult
**Education · Technology · Media · Gospel**

*One Brand. Four Missions. — Learning Deliberately. Teaching Authentically.*

</div>

---

This repository contains the complete, production-ready website for **HMG Concepts**, the
Nigerian education & technology parent brand, rebuilt in 2026 to reflect its four live
subsidiaries: **HMG Academy, HMG Technologies, HMG Media,** and **HMG Gospel**.

It is a **100% static** website (HTML + CSS + vanilla JavaScript) — no build step, no server,
no databases, and **no paid services or AI APIs**. It is designed to be hosted for **free** on
Cloudflare Pages, GitHub Pages, or Netlify.

> 📘 **Full feature explanations:** see [`docs/FEATURES.md`](docs/FEATURES.md)
> 🚀 **Step-by-step deployment:** see [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)
> 🛠️ **Maintenance & how-to edits:** see [`docs/MAINTENANCE.md`](docs/MAINTENANCE.md)

---

## ⚡ Quick Start (view it locally in 30 seconds)

You don't need anything installed to preview it — just open `index.html` in a browser.
For full functionality (service worker / PWA), run a tiny local server:

```bash
# Option A — Python (already on most computers)
cd HMG
python3 -m http.server 8080
# then open http://localhost:8080

# Option B — Node
npx serve .
```

---

## 📁 Project Structure

```
HMG/
├── index.html             # Home — hero, ecosystem, video, testimonials, newsletter
├── about.html             # Story, mission/vision, values, milestones
├── ecosystem.html         # Deep dive into all 4 arms + comparison table
├── founder.html           # The Visioner — profile, modes, journey, skills
├── faq.html               # FAQ (with rich-result schema)
├── contact.html           # Contact info + WhatsApp-powered enquiry form
├── privacy.html           # Privacy & storage statement
├── 404.html               # Custom not-found page
│
├── manifest.webmanifest   # PWA manifest (installable app)
├── sw.js                  # Service worker (offline support)
├── robots.txt             # SEO crawler rules
├── sitemap.xml            # SEO sitemap
├── favicon.ico            # Multi-resolution favicon
├── _headers               # Cloudflare Pages security/cache headers
├── netlify.toml           # Optional Netlify config
├── .nojekyll              # Lets GitHub Pages serve files as-is
├── .gitignore
├── LICENSE
│
├── assets/
│   ├── css/style.css      # One master stylesheet (dark + light themes)
│   ├── js/main.js         # One vanilla-JS file (all interactions)
│   ├── images/            # Logo (png+webp), founder photo (jpg+webp), OG cover
│   ├── icons/             # Favicons + PWA icons (16→512, maskable, apple-touch)
│   └── docs/              # Drop PDFs here (e.g. brochure) — optional
│
└── docs/
    ├── FEATURES.md        # Detailed explanation of EVERY feature
    ├── DEPLOYMENT.md      # Clear, step-by-step deployment (3 free hosts)
    └── MAINTENANCE.md     # How to edit content, swap images, update links
```

---

## ✨ What's Inside (high level)

**Pages & content**
- 8 polished, fully responsive pages with consistent nav/footer.
- All four subsidiaries shown as **LIVE** and linked out to their real sites.

**Enterprise / pro features (all free)**
- 🌗 **Light/Dark theme** engine (remembers your choice + respects system setting)
- 📱 **PWA** — installable, works **offline** via service worker
- 🔎 **SEO suite** — meta tags, Open Graph/Twitter cards, JSON-LD structured data,
  sitemap, robots, canonical URLs, custom social share image
- 🗣️ **Testimonials carousel** (auto-advancing, swipe/scroll, arrows)
- 📊 **Animated stat counters** + scroll-reveal animations
- 📈 **Reading-progress bar**, back-to-top, floating WhatsApp button
- 📝 **Smart contact form** → opens a pre-filled WhatsApp message (no backend, no cost)
- 📰 **Newsletter capture** → opens email app (no backend, no cost)
- 🎬 YouTube **video strip**, **comparison table**, **FAQ accordion**
- ♿ **Accessibility** — skip link, focus styles, ARIA labels, reduced-motion support
- 🖨️ **Print-optimised** styles
- 🔐 **Security headers** + privacy-first (no tracking cookies, no third-party analytics)

> See [`docs/FEATURES.md`](docs/FEATURES.md) for a paragraph-by-paragraph explanation of each.

---

## 💰 Cost

**₦0 / month.** Everything here runs on free static hosting. There are **no paid APIs**,
no AI API keys, no databases, and no subscriptions required to run the site.
The only external request is Google Fonts (free), and the site degrades gracefully without it.

---

## 🔗 Ecosystem Links (wired throughout)

| Arm | URL |
|---|---|
| HMG Academy | https://hmgacademy.pages.dev/ |
| HMG Technologies | https://hmgtechnologies.pages.dev/ |
| HMG Media | https://hmgmedia.pages.dev/ |
| HMG Gospel | https://hmggospel.pages.dev/ |
| Founder Portfolio | https://cssadewale.pages.dev/ |
| YouTube | https://youtube.com/@hmgconcepts |
| WhatsApp | https://wa.me/2348100866322 |

---

© 2026 HMG Concepts · His Marvellous Grace Educational Consult · Built deliberately.
