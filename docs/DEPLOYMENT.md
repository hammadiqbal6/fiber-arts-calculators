# Deployment guide

Primary target: **Cloudflare Pages**. Also covered: Vercel and Netlify. The site is static (`astro build` → `dist/`).

## Before you deploy

1. Edit `src/config/site.ts` (or set env vars):
   - `PUBLIC_SITE_URL` — canonical origin, no trailing slash (e.g. `https://stitchcalc.com`)
   - `PUBLIC_CONTACT_EMAIL`
   - `PUBLIC_ADSENSE_CLIENT` / `PUBLIC_ADSENSE_ENABLED` (keep false until approved)
   - `PUBLIC_GA4_ID`, `PUBLIC_GSC_VERIFICATION`, `PUBLIC_BING_VERIFICATION`
   - `PUBLIC_INDEXNOW_KEY` — also rename `public/<key>.txt`
2. Replace `example.com` brand placeholders in content if desired (brand name lives in config).
3. `npm run check` locally (tests + build + audits).

## Cloudflare Pages (primary)

1. Push repo to GitHub.
2. Cloudflare Dashboard → Workers & Pages → Create → Connect Git.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Environment variables: set `PUBLIC_SITE_URL` and others (must be available at build time for Astro).
6. Custom domain → add domain → set Cloudflare DNS.
7. SSL/TLS → Full (strict). Always Use HTTPS on.
8. Redirect www ↔ apex: Rules → Redirect Rules (pick one canonical host). Example: `www.example.com/*` → `https://example.com/$1` 301.
9. `public/_headers` is applied automatically on Pages for security headers and asset caching.

## Vercel

1. Import repo → Framework Preset Astro (or Other).
2. Build: `npm run build` · Output: `dist`.
3. `vercel.json` supplies headers and trailing slash.
4. Domains: add apex + www; set redirect to canonical in Domain settings.

## Netlify

1. Build: `npm run build` · Publish: `dist`.
2. `public/_redirects` and `public/_headers` are picked up when copied to `dist` (Astro copies `public/`).
3. Domain + HTTPS force in Domain management.

## IndexNow

1. Set `PUBLIC_INDEXNOW_KEY` and ensure `public/<key>.txt` contains the same key.
2. After deploy, POST changed URLs (see `scripts/indexnow.mjs`).
3. Google does **not** use IndexNow; still submit sitemap in Google Search Console.

## Post-deploy smoke test

- Homepage, one hub, three tools load on mobile width.
- `/sitemap-index.xml` and `/robots.txt` reference your real domain.
- `/ads.txt` present (template until AdSense approval).
