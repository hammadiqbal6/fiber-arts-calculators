# Deployment guide

Primary host: **Cloudflare Pages**. Also covered: Vercel and Netlify. The site is a static Astro build (`dist/`) with no server runtime.

## Prerequisites

1. Fill placeholders in `src/config/site.ts` or `.env` (see `.env.example`).
2. `npm ci && npm run build` succeeds locally.
3. Custom domain DNS ready (optional on day one).

## Cloudflare Pages (primary)

1. Push this repo to GitHub/GitLab.
2. Cloudflare Dashboard → Workers & Pages → Create → Connect repository.
3. Build settings:
   - Framework preset: Astro
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node version: `20` (or set `NODE_VERSION=20` env)
4. Environment variables (Production): copy from `.env.example` (`PUBLIC_*`).
5. Deploy. Note the `*.pages.dev` URL.
6. Custom domain → add domain → set Cloudflare DNS (proxied) or external CNAME to Pages.
7. SSL/TLS: Full (strict) when using Cloudflare DNS.
8. Redirects:
   - Prefer apex or `www`, not both. Use Bulk Redirects or `_redirects` rules.
   - Example: `https://www.example.com/*` → `https://example.com/:splat` (301).
9. `public/_headers` is applied automatically on Pages for security headers + long-cache `/_astro/*`.

## Vercel

1. Import the repo in Vercel.
2. Framework: Astro; output `dist`; build `npm run build`.
3. Add `PUBLIC_*` env vars.
4. `vercel.json` already sets security headers and hashed-asset cache.
5. Domains → add domain → configure DNS as instructed.
6. Enable HTTPS (automatic). Set a 301 from www ↔ apex in Domains.

## Netlify

1. New site from Git → build `npm run build` → publish `dist`.
2. Env vars: `PUBLIC_*`.
3. `public/_headers` and `public/_redirects` are picked up.
4. Domain management → HTTPS → force HTTPS.
5. Canonical host redirect under Domain settings.

## Post-deploy checklist

- [ ] Homepage loads over HTTPS
- [ ] `/robots.txt` shows your real `Sitemap:` URL
- [ ] Submit `https://YOUR_DOMAIN/sitemap-index.xml` in Google Search Console and Bing Webmaster Tools
- [ ] Set `PUBLIC_SITE_URL` to the live origin (no trailing slash) and redeploy
- [ ] Configure AdSense / GA4 only after content and privacy pages are live
- [ ] Optional: IndexNow key file at `/PUBLIC_INDEXNOW_KEY.txt` (see SEO guide)

## Rollback

Cloudflare Pages / Vercel / Netlify all keep prior deployments — restore the last green deploy from the host UI.
