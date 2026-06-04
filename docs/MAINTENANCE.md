# HMG Concepts — Maintenance & How-To Guide

Simple, copy-paste instructions for the most common edits. No coding background needed for most of
these. Files are plain text — edit them in any text editor (VS Code recommended, free) or directly
on GitHub's website.

---

## 1. Replace the logo or founder photo
The site looks for these files (keep the **same names** and it just works):

| Replace this file | With… |
|---|---|
| `assets/images/hmg-logo.png` | New logo (PNG). Also update `hmg-logo.webp` if you have one. |
| `assets/images/founder.jpg` | New founder photo (JPG). Also update `founder.webp` if you have one. |

Tip: keep images reasonably small (logo under ~300 KB, photo under ~150 KB) for speed. You can
compress for free at https://squoosh.app (export WebP + a JPG/PNG fallback).

To regenerate favicons/PWA icons from a new logo, re-create the files in `assets/icons/`
(sizes 16, 32, 48, 180, 192, 256, 512, plus `maskable-512.png` and `apple-touch-icon.png`) and
`favicon.ico`. Any free favicon generator (e.g. https://realfavicongenerator.net) works.

---

## 2. Change phone number, email, or WhatsApp
These appear in the footer and contact page of **every** file. The safest way is a global
find-and-replace across all `.html` and `.js` files:

| Find | Replace with your new value |
|---|---|
| `2348100866322` | new WhatsApp number (digits only, with country code, no `+`) |
| `+234 810 086 6322` | new display number |
| `+234 907 790 7677` | new phone |
| `hismarvellousgrace@gmail.com` | new brand email |
| `buildingmyictcareer@gmail.com` | new tech email |

The WhatsApp number also lives in `assets/js/main.js` (the form handler) — update it there too.

---

## 3. Edit the announcement bar text
Open each `.html` file and find `<div class="topbar">`. Change the text between the tags. (It's a
few files; do a find for `class="topbar"`.)

---

## 4. Add / edit a testimonial
In `index.html`, find `<div class="tcar-track">`. Copy one `.tcar-card` block and edit:
```html
<div class="tcar-card">
  <div class="stars">★★★★★</div>
  <p>“Your testimonial text here.”</p>
  <div class="tcar-who"><div class="tcar-av">AB</div><div><b>Name</b><span>Role · Place</span></div></div>
</div>
```
(`AB` are the initials shown in the avatar circle.)

---

## 5. Add / edit an FAQ
In `faq.html`, copy a `<details>` block:
```html
<details><summary>Your question?</summary><p>Your answer.</p></details>
```
For Google rich results, also add the same Q&A to the JSON-LD `<script type="application/ld+json">`
block near the top of `faq.html`.

---

## 6. Use real YouTube videos in the video strip
In `index.html`, find the `.vid` cards. Change each `href` to the specific video URL. To show a
real thumbnail, add a background image to that card's `.thumb` (inline style), e.g.:
```html
<div class="thumb" style="background-image:url('https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg');background-size:cover">
```

---

## 7. Change brand colours
All colours are CSS variables at the top of `assets/css/style.css` (`:root{ ... }`). For example,
to change the gold accent, edit `--gold`. Both light and dark themes pull from these variables.

---

## 8. Edit stats / numbers
Stat counters use `data-count`. Example:
```html
<b class="gold-text" data-count="500" data-suffix="+">0</b>
```
Change `data-count` to the new number; keep the inner text `0` (it animates up from there).

---

## 9. (Optional) Upgrade the contact form to server-side capture — still free
The form currently opens WhatsApp (no backend). If you later want submissions emailed/stored:

**Option A — Formspree (free tier):**
1. Sign up at https://formspree.io and create a form; copy your form endpoint.
2. In `contact.html`, change the `<form id="enquiryForm">` to:
   `<form action="https://formspree.io/f/XXXX" method="POST">`
3. Remove the `id="enquiryForm"` (so the JS WhatsApp handler doesn't intercept), or keep both and
   choose one behaviour.

**Option B — Cloudflare Pages Functions / Web3Forms** — both have free tiers. See their docs.

> Either way, **no AI APIs and no paid plan are required** for normal volumes.

---

## 10. Update for a custom domain
After connecting your domain (see `DEPLOYMENT.md` §D), find-and-replace
`https://hmgconcepts.pages.dev` with your new domain across all files, especially:
- `sitemap.xml`, `robots.txt`
- the `canonical`, `og:image`, `og:url`, and `twitter:image` meta tags in each page.

---

## 11. After ANY change — refresh the offline cache
Open `sw.js` and bump the version string:
```js
const CACHE='hmg-concepts-v1';  // change to v2, v3, ...
```
This ensures returning visitors download the updated files instead of the cached old ones.

---

*Need help? hismarvellousgrace@gmail.com · WhatsApp +234 810 086 6322*
