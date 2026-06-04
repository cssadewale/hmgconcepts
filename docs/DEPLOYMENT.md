# HMG Concepts — Deployment Guide (Step-by-Step)

This guide explains, in clear and detailed steps, how to put the HMG Concepts website online.
Everything here uses **free** tools. **No paid services, no AI APIs, no databases.**

You have three good free options. **Cloudflare Pages is recommended** because your other HMG
sites already use it (`*.pages.dev`).

- [A. Cloudflare Pages (recommended)](#a-deploy-on-cloudflare-pages-recommended)
- [B. GitHub Pages](#b-deploy-on-github-pages)
- [C. Netlify (drag-and-drop)](#c-deploy-on-netlify-drag-and-drop)
- [D. Custom domain (optional)](#d-connect-a-custom-domain-optional)
- [E. Updating the site later](#e-updating-the-site-after-launch)
- [F. Pre-launch checklist](#f-pre-launch-checklist)
- [G. Troubleshooting](#g-troubleshooting)

> **Important folder note:** When you upload, the **contents** of the `HMG/` folder must sit at the
> root of the site, i.e. `index.html` should be at the top level — NOT inside another `HMG/`
> subfolder. (On GitHub you can either upload the contents to the repo root, or upload the whole
> `HMG` folder and set it as the publish directory — both are covered below.)

---

## Before you start (one-time, 5 minutes)

1. **Create a free GitHub account** (needed for options A & B): https://github.com/signup
2. **Download the project zip** (`HMG.zip`) and **unzip it** on your computer. You should see
   `index.html`, `about.html`, the `assets/` folder, etc.
3. (Optional but recommended) Install **Git**: https://git-scm.com/downloads — or just use the
   GitHub website's upload buttons (no command line needed).

---

## A. Deploy on Cloudflare Pages (recommended)

### Step A1 — Put the code on GitHub
**Option 1 — via the website (no command line):**
1. Go to https://github.com/new
2. Repository name: `hmgconcepts` → set to **Public** → click **Create repository**.
3. On the new repo page, click **"uploading an existing file"**.
4. Drag in **everything inside** your unzipped `HMG` folder (all the `.html` files, `assets/`,
   `manifest.webmanifest`, `sw.js`, `_headers`, etc.). Wait for them to finish uploading.
5. Click **Commit changes**.

**Option 2 — via Git (command line):**
```bash
cd HMG
git init
git add .
git commit -m "Launch HMG Concepts website"
git branch -M main
git remote add origin https://github.com/<your-username>/hmgconcepts.git
git push -u origin main
```

### Step A2 — Connect Cloudflare Pages
1. Create/log in to a free Cloudflare account: https://dash.cloudflare.com/sign-up
2. In the left sidebar choose **Workers & Pages** → **Create application** → **Pages** tab →
   **Connect to Git**.
3. Authorise GitHub and select your `hmgconcepts` repository.
4. On the build settings screen, set:
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`  (a single forward slash, meaning the repo root)
5. Click **Save and Deploy**.

### Step A3 — Done
- In ~1 minute your site is live at `https://hmgconcepts.pages.dev` (or a similar name Cloudflare
  assigns; you can rename the project in **Settings → General**).
- Every time you push changes to GitHub, Cloudflare **auto-deploys** the update.
- The included `_headers` file automatically applies security and caching rules — no extra setup.

---

## B. Deploy on GitHub Pages

### Step B1 — Create the repo and upload
Follow **Step A1** above to get the files into a public GitHub repo named `hmgconcepts`.
(The included `.nojekyll` file ensures GitHub serves all files correctly.)

### Step B2 — Turn on Pages
1. In your repo, click **Settings** (top menu).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. **Branch:** select `main` and folder **`/ (root)`** → click **Save**.

### Step B3 — Done
- After ~1 minute, your site is live at:
  `https://<your-username>.github.io/hmgconcepts/`
- ⚠️ **Note on links:** This site uses **relative links** (e.g. `index.html`, `assets/...`), so it
  works correctly inside the `/hmgconcepts/` subpath. (If you later move it to a root domain,
  no changes are needed.)

---

## C. Deploy on Netlify (drag-and-drop)

The fastest no-account-needed-first option:

1. Go to https://app.netlify.com/drop
2. **Drag your unzipped `HMG` folder** onto the page.
3. Wait a few seconds — Netlify gives you a live URL instantly (e.g. `random-name.netlify.app`).
4. (Optional) Create a free account to keep the site, rename it, and connect a custom domain.
5. The included `netlify.toml` sets the publish directory and security headers automatically.

> To update later with drag-and-drop: go to your site → **Deploys** → drag the folder again.

---

## D. Connect a custom domain (optional)

If you own a domain (e.g. `hmgconcepts.com`):

**On Cloudflare Pages:** Project → **Custom domains** → **Set up a custom domain** → enter your
domain → follow the DNS instructions (if your domain's DNS is already on Cloudflare, it's
one click).

**On GitHub Pages:** Repo → **Settings → Pages → Custom domain** → enter your domain → then at
your domain registrar add a `CNAME` record pointing to `<your-username>.github.io`.

**On Netlify:** Site → **Domain settings → Add a domain** → follow the DNS steps.

After the domain is connected, update the absolute URLs in `sitemap.xml`, `robots.txt`, and the
`og:image`/`canonical` tags (search the files for `hmgconcepts.pages.dev` and replace) so SEO and
social previews use your real domain. (See `docs/MAINTENANCE.md`.)

---

## E. Updating the site after launch

1. Edit the files locally (or directly on GitHub's website).
2. **Cloudflare Pages / GitHub Pages:** commit & push (or upload via the website) → it redeploys
   automatically.
   **Netlify drag-and-drop:** drag the folder again.
3. **Important for PWA/offline:** if you changed any page or asset, open `sw.js` and increase the
   cache version (e.g. `hmg-concepts-v1` → `hmg-concepts-v2`) so returning visitors get the new
   version instead of the cached old one.

---

## F. Pre-launch checklist

- [ ] Open the site and click through all 8 pages — every link works.
- [ ] Test on a phone (or use the browser's mobile view) — layout looks good.
- [ ] Click each subsidiary link — they open the correct live sites.
- [ ] Submit the contact form — WhatsApp opens with your details pre-filled.
- [ ] Toggle light/dark — both look correct and the choice persists on refresh.
- [ ] Confirm the logo, founder photo, and favicon all appear.
- [ ] (If using a custom domain) update absolute URLs in `sitemap.xml`, `robots.txt`, meta tags.
- [ ] Submit `sitemap.xml` to Google Search Console (free) for faster indexing.

---

## G. Troubleshooting

**Images/styles don't load.**
Make sure the `assets/` folder was uploaded and that `index.html` is at the site root (not nested
inside a second `HMG/` folder).

**Old content keeps showing after an update.**
This is the offline cache. Bump the version in `sw.js` (see section E), then in your browser do a
hard refresh (Ctrl/Cmd+Shift+R) or clear site data once.

**Fonts look different on first paint.**
The site uses Google Fonts with a system-font fallback. This is expected and harmless; the brand
font swaps in once loaded.

**GitHub Pages shows a 404 at first.**
Pages can take 1–2 minutes on the first deploy. Refresh after a moment. Confirm the branch/folder
is set to `main` / `/ (root)`.

**The contact form opens WhatsApp Web on desktop.**
That's normal. On phones it opens the WhatsApp app. Both deliver the same pre-filled message.

---

*Questions? hismarvellousgrace@gmail.com · WhatsApp +234 810 086 6322*
