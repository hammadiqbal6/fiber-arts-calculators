# Deployment guide (FiberCalc)

This is a **beginner-friendly, copy-paste** guide for shipping the FiberCalc static site built from this repository. The app is an [Astro](https://astro.build/) project: `npm run build` writes HTML/CSS/JS to **`dist/`**. There is no Node server in production—only static files.

**Primary host:** [Cloudflare Pages](https://pages.cloudflare.com/) (free tier, `public/_headers` support). **Alternatives:** Vercel and Netlify (also documented below).

Related docs: [SEO-GUIDE.md](./SEO-GUIDE.md), [ADSENSE.md](./ADSENSE.md), [proof bundle](./proof/README.md).

---

## 1. Prerequisites

### Accounts and tools

| Item | Why you need it |
|---|---|
| **GitHub** (or GitLab) repo with this code | Hosts connect to Git for automatic deploys |
| **Node.js 20+** and **npm 10+** locally | Matches CI (`engines` in `package.json`) |
| **Domain registrar** (optional at first) | Custom URL; you can start on `*.pages.dev` |
| **Google account** | Search Console, Analytics, AdSense (later) |
| **Bing Webmaster Tools** (optional) | Import from GSC + IndexNow |

Check Node:

```bash
node -v   # expect v20.x or v22.x
npm -v
```

### Clone and install

```bash
git clone https://github.com/YOUR_ORG/fiber-arts-calculators.git
cd fiber-arts-calculators
npm ci
```

### Local commands (run before every deploy)

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at `http://localhost:4321` |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serves `dist/` locally (Astro preview) |
| `npm test` | Vitest unit tests for calculator formulas |
| `npm run audit` | Build + SEO, AdSense, JS budget, link checks |
| `npm run proof` | Regenerates committed evidence in `docs/proof/` |
| `npm run lhci` | Lighthouse CI using `lighthouserc.cjs` (optional) |
| `npm run indexnow` | Post-deploy IndexNow ping from `dist/` sitemaps |
| `npm run deploy:indexnow` | `npx wrangler deploy` then IndexNow ping |

**Recommended pre-flight:**

```bash
npm ci
npm test
npm run build
npm run audit
npm run proof
```

Fix anything that fails before you point a custom domain at the site.

---

## 2. Configure the site (env + placeholders)

All owner-specific values are centralized in **`src/config/site.ts`**, overridable at build time via **`PUBLIC_*` environment variables** (see `.env.example`).

### Create local `.env` (optional but recommended)

```bash
cp .env.example .env
```

Edit `.env` with your real values. Astro exposes only variables prefixed with `PUBLIC_` to the client bundle.

| Variable | Required for launch | Purpose |
|---|---|---|
| `PUBLIC_SITE_URL` | **Yes** (before SEO) | Canonical origin, **no trailing slash**. Example: `https://www.yourdomain.com` |
| `PUBLIC_SITE_NAME` | Recommended | Nav, footer, schema (`FiberCalc` default) |
| `PUBLIC_CONTACT_EMAIL` | **Yes** (AdSense) | Contact page, footer, Privacy |
| `PUBLIC_LEGAL_NAME` | Recommended | Privacy/Terms/Organization schema |
| `PUBLIC_ADSENSE_PUBLISHER_ID` | When monetizing | `pub-XXXXXXXXXXXXXXXX` |
| `PUBLIC_ADSENSE_ENABLED` | When monetizing | Set `true` only after publisher ID + ads.txt |
| `PUBLIC_GA4_MEASUREMENT_ID` | Optional | `G-XXXXXXXXXX` |
| `PUBLIC_GSC_VERIFICATION` | Optional | Search Console HTML tag **content** value (`google-site-verification`) |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | Legacy alias for `PUBLIC_GSC_VERIFICATION` |
| `PUBLIC_BING_SITE_VERIFICATION` | Optional | Bing meta verification content |
| `INDEXNOW_KEY` | Optional | IndexNow key override for `npm run indexnow` (see §7.3; default is committed) |
| `PUBLIC_TWITTER_HANDLE` | Optional | `@handle` for Twitter cards |

**Important:** `PUBLIC_SITE_URL` is baked into the build (sitemap, canonicals, JSON-LD, `robots.txt` Sitemap line). After you know your live domain, set it in **production env vars** on your host and **redeploy**.

### Files to update for production branding

| File | What to change |
|---|---|
| `public/ads.txt` | Uncomment and set your line: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0` |
| `public/llms.txt` | Optional: replace `FiberCalc` / paths with your brand (Google ignores this file) |
| `src/pages/robots.txt.ts` | Uses `siteConfig.siteUrl` for `Sitemap:`—no edit if env is set |
| `src/config/site.ts` | Defaults only; prefer env in production |

`robots.txt` is **generated at build** from `src/pages/robots.txt.ts`. It allows Googlebot, AI search bots (OAI-SearchBot, PerplexityBot, Claude-SearchBot), and documents training bots (GPTBot, etc.)—adjust only if you have a deliberate policy change.

### Consent / CMP (EEA, UK, Switzerland)

AdSense **personalized** ads in those regions require a [Google-certified CMP](https://support.google.com/adsense/answer/13554116). This repo ships a simple cookie banner (`src/components/CookieNotice.astro`) for acknowledgment—not a certified CMP. Plan CMP integration before enabling `PUBLIC_ADSENSE_ENABLED=true` for EU traffic. Details: [ADSENSE.md](./ADSENSE.md).

---

## 3. Custom domain (DNS, www vs apex, HTTPS)

You can deploy first to a free subdomain (`your-project.pages.dev`), then add a custom domain.

### Choose canonical host

Pick **one** primary URL and stick to it:

- **Apex:** `https://yourdomain.com` (common for brands)
- **www:** `https://www.yourdomain.com` (also fine)

Redirect the other host to the canonical with a **301** (see host sections below). Set `PUBLIC_SITE_URL` to the canonical origin (no trailing slash).

### Typical DNS (Cloudflare as DNS provider)

1. Add site to Cloudflare → import or create DNS zone.
2. **Cloudflare Pages** → your project → **Custom domains** → add `yourdomain.com` and optionally `www`.
3. Cloudflare usually creates the right records automatically when the zone is on Cloudflare.
4. **SSL/TLS** → **Full (strict)** once the origin certificate is active.

### Typical DNS (external registrar, Cloudflare Pages hosting)

| Type | Name | Value |
|---|---|---|
| CNAME | `www` | `your-project.pages.dev` (or the target Pages shows) |
| A / CNAME for apex | `@` | Follow Pages wizard (often CNAME flattening or A records to Cloudflare) |

Exact records appear in the Cloudflare Pages UI—copy them verbatim.

### HTTPS

All three hosts (Cloudflare, Vercel, Netlify) provision **free TLS** automatically after DNS propagates (minutes to 48 hours). Verify:

```bash
curl -I https://yourdomain.com/
```

Expect `HTTP/2 200` and a valid certificate.

### www ↔ apex redirect examples

**Cloudflare Pages** — `public/_redirects` (also works on Netlify):

```text
https://www.yourdomain.com/* https://yourdomain.com/:splat 301
```

**Cloudflare Bulk Redirects** (dashboard) — same pattern if you prefer not to commit redirects.

**Vercel** — Project → Settings → Domains → set primary domain; Vercel redirects secondary.

---

## 4. Deploy on Cloudflare Pages (primary)

### 4.1 Connect repository

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages**.
2. **Create application** → **Pages** → **Connect to Git**.
3. Select **GitHub** / **GitLab** and authorize access.
4. Choose the `fiber-arts-calculators` repository.

### 4.2 Build settings

| Setting | Value |
|---|---|
| **Production branch** | `main` |
| **Framework preset** | Astro (or None) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (repo root) |

**Environment variables** → **Production** (and Preview if you want previews to use staging URL):

```
NODE_VERSION=20
PUBLIC_SITE_URL=https://yourdomain.com
PUBLIC_SITE_NAME=FiberCalc
PUBLIC_CONTACT_EMAIL=hammadiqbal117@gmail.com
PUBLIC_LEGAL_NAME=Your Legal Name
```

Add GA4 / Search Console / AdSense vars when ready (see §6–7).

### 4.3 Deploy

Click **Save and Deploy**. First build runs `npm install` + `npm run build`. On success you get:

`https://<project-name>.pages.dev`

### 4.4 Headers and caching

This repo includes **`public/_headers`**, copied to `dist/` on build:

- Security headers (`X-Content-Type-Options`, `Referrer-Policy`, etc.)
- Long cache for `/_astro/*` hashed assets

No extra Cloudflare configuration required for those rules.

### 4.5 Preview deployments

Every pull request can get a **preview URL** if enabled in Pages → **Builds & deployments** → **Preview deployments**. Set preview env `PUBLIC_SITE_URL` to the preview URL **or** accept that canonicals in preview builds point at production URL (usually you only care about production `PUBLIC_SITE_URL`).

### 4.6 Rollback on Cloudflare

Pages → **Deployments** → select a previous successful deployment → **Rollback to this deployment**.

---

## 5. Deploy on Vercel (alternative)

1. [vercel.com](https://vercel.com) → **Add New** → **Project** → import Git repo.
2. **Framework Preset:** Astro.
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. **Install Command:** `npm ci` (default `npm install` also works)

### Environment variables

Project → **Settings** → **Environment Variables** — add the same `PUBLIC_*` list as Cloudflare for **Production**.

### Headers

`vercel.json` in the repo root sets security headers and cache for `/_astro/*`. No manual paste required.

### Domains

**Settings** → **Domains** → add apex and www → follow DNS instructions → set **primary** domain → redirect the other.

### Preview deployments

Each PR branch gets a `*.vercel.app` URL automatically.

### Rollback

**Deployments** → previous deployment → **Promote to Production**.

---

## 6. Deploy on Netlify (alternative)

1. [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**.
2. Connect Git → select repo.
3. **Build command:** `npm run build`
4. **Publish directory:** `dist`
5. **Environment variables:** same `PUBLIC_*` as above; set **NODE_VERSION** = `20` in UI or `netlify.toml` if you add one later.

### Headers and redirects

- `public/_headers` → applied automatically.
- `public/_redirects` → uncomment/edit www redirect lines for your domain.

### Domains & HTTPS

**Domain management** → add custom domain → follow DNS → **HTTPS** → **Verify DNS** → enable **Force HTTPS**.

### Rollback

**Deploys** → **Published deploy** → **Publish deploy** on an older successful build.

---

## 7. Post-deploy SEO (Search Console, Bing, validation)

Do these **after** `PUBLIC_SITE_URL` matches the live HTTPS URL and you have redeployed.

### 7.1 Google Search Console (domain property)

1. Go to [Google Search Console](https://search.google.com/search-console).
2. **Add property** → **Domain** → enter `yourdomain.com` (no `https://`).
3. Copy the **TXT** record → add at your DNS host (Cloudflare: DNS → TXT).
4. Wait for verification → **Submit sitemap:**
   - URL: `https://yourdomain.com/sitemap-index.xml`
5. **URL Inspection** — test and **Request indexing** for key URLs:
   - `/`
   - `/knitting-crochet/`
   - `/tools/yarn-blanket-calculator/`
   - `/tools/knitting-gauge-calculator/`
   - `/guides/how-much-yarn-for-a-blanket/`

### 7.2 Bing Webmaster Tools

1. [Bing Webmaster Tools](https://www.bing.com/webmasters) → **Add a site**.
2. **Import from Google Search Console** (fastest) or verify manually.
3. Submit the same sitemap URL.

### 7.3 IndexNow (optional, not used by Google)

This repo ships a committed key at `public/9638154d8d3e54b9c2ce62eb17469c43.txt` (copied into `dist/` on build). After the key file is **live**, ping IndexNow from the built sitemap(s):

```bash
npm run build
npm run indexnow                 # or: node scripts/indexnow.mjs
node scripts/indexnow.mjs --dry-run   # print URL count + payload, no POST
```

**Cloudflare Workers Builds deploy command** (key must be live before the ping):

```bash
npx wrangler deploy && node scripts/indexnow.mjs
```

Or locally / in CI: `npm run deploy:indexnow` (runs `npx wrangler deploy` then the ping).

| Env | Purpose |
|---|---|
| `PUBLIC_SITE_URL` | Host / keyLocation origin (same as site config) |
| `INDEXNOW_KEY` | Override key (default: committed key above) |
| `INDEXNOW_DISABLE=1` | Skip the ping (always exits 0) |

Do **not** run IndexNow inside `npm run build`—deploy first so `/{key}.txt` is reachable.

### 7.4 Rich Results Test (live)

After deploy:

1. Open [Rich Results Test](https://search.google.com/test/rich-results).
2. Test: `https://yourdomain.com/tools/yarn-blanket-calculator/`
3. Confirm **WebApplication** / **BreadcrumbList** parse (no errors).

Compare with committed extracts: `docs/proof/structured-data/`.

### 7.5 PageSpeed Insights (live field + lab)

1. [PageSpeed Insights](https://pagespeed.web.dev/)
2. Test homepage and one tool URL on **mobile**.
3. Compare to committed lab runs: `docs/proof/lighthouse/SUMMARY.md`.

---

## 8. Google AdSense

Read [ADSENSE.md](./ADSENSE.md) for the full checklist. Summary:

### When to apply

- Site is **live on HTTPS** with real domain.
- **About, Contact, Privacy, Terms, Methodology** pages public (this repo includes them).
- **Substantial content** (18 tool pages + guides)—see `docs/proof/adsense-readiness.md` word counts.
- Some **organic traffic** helps approval (often 20–30+ quality pages indexed); not a hard rule but realistic.

### Setup steps

1. [AdSense](https://www.google.com/adsense/) → **Get started** → add site URL.
2. Complete **site ownership** (often overlaps with Search Console).
3. Add **ads.txt** line in `public/ads.txt` and redeploy:

   ```text
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```

4. Set production env:

   ```text
   PUBLIC_ADSENSE_PUBLISHER_ID=pub-XXXXXXXXXXXXXXXX
   PUBLIC_ADSENSE_ENABLED=true
   ```

5. Redeploy. Ads render in `src/components/AdSlot.astro` with **fixed min-height** to protect CLS.
6. **Placement:** keep slots **below the calculator** on mobile; never push the tool below the fold.
7. **EEA/UK/CH:** enable a **certified CMP** before personalized ads; see [Google AdSense CMP](https://support.google.com/adsense/answer/13554116).

### Auto ads

You can enable Auto ads in the AdSense UI in addition to reserved slots. Monitor CLS in Search Console CWV report after enabling.

---

## 9. Analytics (GA4) and weekly monitoring

### GA4 setup

1. [Google Analytics](https://analytics.google.com/) → Admin → **Create property**.
2. Add **Web** data stream → copy **Measurement ID** (`G-XXXXXXXXXX`).
3. Set `PUBLIC_GA4_MEASUREMENT_ID` in production env → redeploy.
4. `BaseLayout.astro` loads gtag only when the ID is set.

### Weekly routine (15–30 minutes)

| Source | What to check |
|---|---|
| **GSC → Performance** | New queries, average position, pages gaining impressions |
| **GSC → Pages / Indexing** | Coverage errors, soft 404s, excluded pages |
| **GSC → Core Web Vitals** | LCP, INP, CLS on real URLs |
| **GA4** | Top pages, engagement, geo (if ads targeting) |
| **AdSense** (if live) | Policy center, RPM trends, invalid traffic warnings |
| **Repo** | Re-run `npm run proof` after substantive changes; commit if budgets shift |

Document keyword opportunities in [KEYWORD-MAP.md](./KEYWORD-MAP.md) and [SEO-GUIDE.md](./SEO-GUIDE.md).

---

## 10. Updating and redeploying

### Content or code changes

```bash
git checkout main
git pull
# edit files
npm test
npm run build
npm run audit
git add -A
git commit -m "Describe change"
git push origin main
```

Connected hosts auto-build on push to `main`.

### When you must redeploy (not just content)

- Any change to **`PUBLIC_*` env vars**
- **`ads.txt`**, **`site.ts` defaults**, or **robots** policy
- **Astro config** affecting URLs or trailing slashes

### Refresh proof artifacts (optional but recommended for releases)

```bash
npm run proof
git add docs/proof
git commit -m "Refresh proof bundle"
git push
```

---

## 11. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Sitemap shows `fibercalc.example` | `PUBLIC_SITE_URL` not set in production | Set env on host → redeploy |
| `robots.txt` wrong Sitemap host | Same as above | Redeploy after fixing URL |
| 404 on tool pages | Wrong output directory | Host must publish **`dist`**, not repo root |
| Build fails on Node 18 | Engine mismatch | Set `NODE_VERSION=20` on host |
| Audit word-count fail | Thin tool page | Expand `src/data/tool-pages.ts` |
| Lighthouse / proof fail | Perf regression | Check new JS, fonts, ads; run `npm run proof` locally |
| AdSense “site not ready” | Thin traffic or missing pages | Finish checklist in `docs/proof/adsense-readiness.md` |
| CLS spike after ads | Ads enabled without reserved height | Keep `AdSlot` min-height; avoid above-fold ads |
| Canonical mismatch www/apex | Two hosts without redirect | 301 non-canonical → canonical; one `PUBLIC_SITE_URL` |
| Preview deploy wrong canonicals | Preview uses production URL | Expected; verify production deploy only |
| IndexNow 4xx | Key file missing at `/{key}.txt` | Confirm `public/<key>.txt` is deployed; ping only after deploy |

### Get help from logs

- **Cloudflare Pages:** Deployment → **View build log**
- **Vercel:** Deployment → **Building**
- **Netlify:** Deploy → **Deploy log**

---

## 12. Launch checklist

Copy this into your issue tracker and check off on go-live day.

### Build & config

- [ ] `npm ci && npm test && npm run build && npm run audit` pass locally
- [ ] `npm run proof` pass; `docs/proof/` committed or CI artifact reviewed
- [ ] `PUBLIC_SITE_URL` set to production HTTPS origin (no trailing slash)
- [ ] `PUBLIC_CONTACT_EMAIL` and `PUBLIC_LEGAL_NAME` are real
- [ ] `public/ads.txt` updated (even if ads still off)

### Deploy

- [ ] Production deploy green on Cloudflare Pages (or chosen host)
- [ ] Custom domain attached; HTTPS valid
- [ ] www → apex (or apex → www) 301 configured
- [ ] Homepage and 3 tool URLs load on mobile

### SEO

- [ ] `https://yourdomain.com/robots.txt` shows correct `Sitemap:`
- [ ] `https://yourdomain.com/sitemap-index.xml` loads
- [ ] Google Search Console domain verified; sitemap submitted
- [ ] URL Inspection requested for home + key tools
- [ ] Bing Webmaster Tools configured (import from GSC)
- [ ] Rich Results Test passed on one tool URL (live)
- [ ] PageSpeed Insights mobile checked on live URLs

### Monetization & analytics (when ready)

- [ ] Privacy Policy live and mentions AdSense/cookies
- [ ] AdSense applied only after content + some traffic
- [ ] `PUBLIC_ADSENSE_*` set; CMP for EEA if personalized ads
- [ ] `PUBLIC_GA4_MEASUREMENT_ID` set (optional)
- [ ] Weekly monitoring calendar reminder (GSC + CWV)

### Post-launch

- [ ] Monitor GSC indexing for 2 weeks; fix coverage issues
- [ ] Re-run `npm run proof` after major releases
- [ ] Document rollback path tested once (revert deploy in UI)

---

## Quick reference: production env template

```bash
NODE_VERSION=20
PUBLIC_SITE_URL=https://yourdomain.com
PUBLIC_SITE_NAME=FiberCalc
PUBLIC_CONTACT_EMAIL=hammadiqbal117@gmail.com
PUBLIC_LEGAL_NAME=Your Name or LLC
PUBLIC_GA4_MEASUREMENT_ID=
PUBLIC_GSC_VERIFICATION=
PUBLIC_BING_SITE_VERIFICATION=
# INDEXNOW_KEY=   # optional override; default is committed public key
PUBLIC_ADSENSE_PUBLISHER_ID=
PUBLIC_ADSENSE_ENABLED=false
PUBLIC_TWITTER_HANDLE=
```

**Build command:** `npm run build`  
**Output directory:** `dist`  
**Proof regeneration:** `npm run proof`
