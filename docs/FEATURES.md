# HMG Concepts Website — Detailed Feature Guide

This document explains **every feature** in the system: what it is, why it exists, how it
works, and where it lives in the code. It is written so that a non-developer can understand it
and a developer can maintain it. Nothing here depends on paid services or AI APIs.

---

## Table of Contents
1. [Pages overview](#1-pages-overview)
2. [Design system & branding](#2-design-system--branding)
3. [Light / Dark theme engine](#3-light--dark-theme-engine)
4. [Navigation & header](#4-navigation--header)
5. [Announcement bar](#5-announcement-bar)
6. [Hero & animated stat counters](#6-hero--animated-stat-counters)
7. [Ecosystem / subsidiary cards](#7-ecosystem--subsidiary-cards)
8. [Testimonials carousel](#8-testimonials-carousel)
9. [Video strip (YouTube)](#9-video-strip-youtube)
10. [Contact form (WhatsApp-powered)](#10-contact-form-whatsapp-powered)
11. [Newsletter capture](#11-newsletter-capture)
12. [FAQ accordion](#12-faq-accordion)
13. [Scroll reveal, progress bar, back-to-top, floating WhatsApp](#13-scroll-reveal-progress-bar-back-to-top-floating-whatsapp)
14. [PWA: installable app + offline support](#14-pwa-installable-app--offline-support)
15. [SEO suite](#15-seo-suite)
16. [Accessibility (a11y)](#16-accessibility-a11y)
17. [Performance & images](#17-performance--images)
18. [Security & privacy](#18-security--privacy)
19. [Print styles](#19-print-styles)
20. [Why no AI API / cost discipline](#20-why-no-ai-api--cost-discipline)

---

## 1. Pages overview
Eight pages, each sharing one header, one footer, one stylesheet, and one JS file:

| Page | Purpose |
|---|---|
| `index.html` | The hub — hero, stats, 4 pillars, values, video strip, testimonials, founder teaser, newsletter, CTA. |
| `about.html` | Origin story, mission & vision, the six core values, a milestones timeline. |
| `ecosystem.html` | Deep, alternating breakdown of all four subsidiaries + an at-a-glance comparison table + portfolio CTA. |
| `founder.html` | "The Visioner" — profile, three builder modes, journey timeline, technical arsenal. |
| `faq.html` | Ten common questions in an accordion, with FAQ structured data for Google. |
| `contact.html` | Full contact directory + smart enquiry form + direct routing cards to each arm. |
| `privacy.html` | Plain-language privacy & storage statement. |
| `404.html` | On-brand "page not found" with helpful links. |

**Why multi-page (not one long page)?** Each subsidiary site is already multi-page; the parent
brand should be the most authoritative node. Multi-page also improves SEO (each page targets its
own keywords) and makes the site easier to maintain.

---

## 2. Design system & branding
- **Palette** is taken directly from the official HMG logo: deep **navy** background, **gold**,
  **electric blue**, and **purple** accents, with **silver/white** text.
- All colours, gradients, spacing, radii, and shadows are defined once as **CSS variables**
  (`:root` in `assets/css/style.css`). Change a value there and it updates everywhere.
- **Typography:** "Plus Jakarta Sans" (Google Fonts) with robust system-font fallbacks, so the
  site still looks right even if fonts fail to load.
- Reusable components: `.btn`, `.card`, `.value`, `.stat`, `.quote`, `.eyebrow`, `.sub-card`,
  `.timeline`, `.cta-band`, `.news-band`, etc. This keeps the look consistent and the code small.

---

## 3. Light / Dark theme engine
**What:** A toggle (☀️/🌙) in the header switches the whole site between a dark and a light theme.

**How it works (in `assets/js/main.js` + `style.css`):**
- Two complete colour sets are defined: `:root[data-theme="dark"]` and `:root[data-theme="light"]`.
- On load, the script picks the theme in this order: **(1)** a previously saved choice in
  `localStorage`, **(2)** the visitor's operating-system preference (`prefers-color-scheme`),
  **(3)** dark as the default.
- Clicking the toggle flips `data-theme` on the `<html>` element, saves the choice, and updates
  the browser UI colour (`<meta name="theme-color">`).

**Why:** Professional, accessible, and respects user preference — with zero libraries.

---

## 4. Navigation & header
- **Sticky, frosted header** stays at the top as you scroll (`backdrop-filter: blur`).
- Contains the logo, primary links, the theme toggle, a primary CTA, and a mobile menu button.
- **Active page** is auto-highlighted (the JS reads the current filename and adds `.active`).
- **Mobile:** below 760px the links collapse into a slide-in drawer; opening it locks page scroll.
- **Breadcrumbs** (`.crumb`) appear on interior pages for orientation and SEO.

---

## 5. Announcement bar
- The thin gradient bar at the very top promotes the "four live arms" message.
- It's **dismissible** — clicking ✕ hides it and remembers the choice in `localStorage`
  (key `hmg_announce`) so it stays hidden on future visits.
- **To change the message:** edit the `.topbar` text in each HTML file.

---

## 6. Hero & animated stat counters
- The hero pairs a strong headline with the logo presented in a gradient-bordered "card" plus
  two floating status badges (e.g. "4 Live Subsidiaries").
- **Stat counters** (`data-count`) animate from 0 to their target the first time they scroll into
  view, using an `IntersectionObserver`. Add `data-suffix="+"` or `data-prefix="₦"` as needed.

---

## 7. Ecosystem / subsidiary cards
- Each of the four arms is a `.sub-card` with an icon, a **LIVE** badge, a description, a feature
  list, and an outbound link to its real site.
- On `ecosystem.html` these expand into full alternating feature blocks plus a **comparison table**
  ("Find the right arm for you") so visitors can self-route quickly.

---

## 8. Testimonials carousel
**What:** A horizontally-scrolling set of testimonial cards with previous/next arrows.

**How:** Pure CSS scroll-snap + a little JS in `main.js`:
- The arrow buttons scroll the track left/right by one card.
- It **auto-advances** every ~5.5s and loops back to the start; it **pauses on hover**.
- Fully swipeable on touch devices. No carousel library required.

**To edit:** add/remove `.tcar-card` blocks inside `.tcar-track` on `index.html`.

---

## 9. Video strip (YouTube)
- Three branded "video" cards link to the YouTube channel (`@hmgconcepts`).
- They use a CSS gradient + a play button as lightweight placeholders (no heavy embeds, so the
  page stays fast).
- **To use real videos:** replace each card's `href` with the specific video URL, and optionally
  set a real thumbnail as a background image on `.thumb`.

---

## 10. Contact form (WhatsApp-powered)
**What:** The enquiry form on `contact.html` (and the home CTA) collects name, email, phone, role,
subject, and message.

**How (no backend, no cost):** On submit, `main.js` validates the input, then builds a
pre-formatted message and opens **WhatsApp** (`https://wa.me/2348100866322?text=...`) with
everything filled in — the visitor just taps send. A success note confirms it opened.

**Why this approach:** It needs **no server, no database, and no paid form service**, yet gives
you a real, instant lead in your WhatsApp inbox. (If you ever want server-side capture, see
`docs/MAINTENANCE.md` for a free Formspree/Cloudflare option.)

---

## 11. Newsletter capture
- The "Join the HMG Community" band collects an email and opens the visitor's **email app** with a
  pre-filled subscribe message to `hismarvellousgrace@gmail.com` (via `mailto:`).
- Again: **no backend, no cost.** A WhatsApp community button sits beside it as an alternative.

---

## 12. FAQ accordion
- Built with native HTML `<details>`/`<summary>` — accessible and JS-free for the open/close.
- Includes **FAQPage JSON-LD** structured data so Google can show rich results.
- **To edit:** add/remove `<details>` blocks in `faq.html` (and mirror them in the JSON-LD if you
  want them eligible for rich results).

---

## 13. Scroll reveal, progress bar, back-to-top, floating WhatsApp
- **Scroll reveal:** elements with class `.reveal` fade/slide in as they enter the viewport
  (via `IntersectionObserver`). Honours `prefers-reduced-motion`.
- **Reading-progress bar:** the thin gradient bar at the very top fills as you scroll the page.
- **Back-to-top button:** appears after scrolling 520px; smooth-scrolls to the top.
- **Floating WhatsApp button:** always-available green bubble (bottom-left) for instant contact.

---

## 14. PWA: installable app + offline support
**What:** The site is a **Progressive Web App** — visitors can "Install" it to their phone/desktop,
and it keeps working **offline**.

**How:**
- `manifest.webmanifest` describes the app (name, icons, colours, shortcuts).
- `sw.js` is a **service worker** that caches the pages and assets on first visit
  (cache-first strategy), so repeat visits are instant and work without internet.
- Registered at the bottom of each page with a tiny inline script.

**Maintenance note:** when you change site files, bump the `CACHE` version string in `sw.js`
(e.g. `hmg-concepts-v1` → `v2`) so visitors get the update.

---

## 15. SEO suite
Everything needed to rank and to look great when shared:
- Unique **`<title>`** and **meta description** per page.
- **Canonical URLs** to avoid duplicate-content issues.
- **Open Graph** + **Twitter Card** tags so links unfurl with the custom **share image**
  (`assets/images/og-cover.jpg`, 1200×630).
- **JSON-LD structured data**: `EducationalOrganization` (home), `Person` (founder), `FAQPage` (faq).
- **`sitemap.xml`** and **`robots.txt`** for crawlers.
- Semantic HTML (`<header> <main> <section> <footer>`, headings in order) and descriptive `alt` text.

---

## 16. Accessibility (a11y)
- **Skip-to-content** link for keyboard/screen-reader users.
- Visible **focus outlines** (`:focus-visible`).
- **ARIA labels** on icon-only buttons and social links; `aria-label` on nav.
- Sufficient colour contrast in both themes.
- **Reduced-motion** support: animations are disabled for users who request it.
- Native, accessible controls (`<details>`, real `<button>`/`<a>` elements).

---

## 17. Performance & images
- **No frameworks** — one small CSS file and one small JS file.
- Images are optimised and served as **WebP with PNG/JPG fallback** via `<picture>`:
  - Logo PNG reduced from ~1.8 MB to ~150 KB (plus a ~56 KB WebP).
  - Founder photo optimised to ~48 KB (plus ~32 KB WebP).
- Fonts use `display=swap` and `preconnect` for fast, non-blocking loading.
- Long-cache headers for static assets (see `_headers`).

---

## 18. Security & privacy
- **No tracking cookies, no third-party analytics, no ad pixels.** Only essential `localStorage`
  (theme + announcement/notice dismissal) — explained in the on-page cookie notice and
  `privacy.html`.
- **Security headers** via `_headers` (Cloudflare) / `netlify.toml` (Netlify):
  `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- All external links use `rel="noopener"`.

---

## 19. Print styles
- A dedicated `@media print` block hides interactive chrome (nav, buttons, banners) and renders a
  clean, ink-friendly document — useful for sharing the brand overview on paper or as a PDF.

---

## 20. Why no AI API / cost discipline
By deliberate design, this site uses **no paid AI APIs** and **no paid backend services**:
- The contact form and newsletter use WhatsApp/`mailto:` instead of a paid form/email service.
- Offline, theming, animations, and the carousel are all done with **native browser features**.
- Hosting is on free static platforms.

**Result: ₦0 recurring cost** to run — consistent with the HMG principle that the most efficient
path to a genuinely working solution is the right one.
