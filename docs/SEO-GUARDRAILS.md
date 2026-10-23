# SEO guardrails (FiberCalc)

Hard requirements so builds never ship the indexing and AEO bugs from the Oct 2026 multi-site audit. Enforced by `npm run audit` after `npm run build`.

**Canonical origin:** controlled only by `PUBLIC_SITE_URL` → `src/config/site.ts` (`siteConfig.siteUrl`), default `src/config/defaults.mjs`.  
**Governing docs:** [SEO-PLAYBOOK.md](./SEO-PLAYBOOK.md), [SEO-GUIDE.md](./SEO-GUIDE.md), [CUSTOM-DOMAIN.md](./CUSTOM-DOMAIN.md), [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## Issues fixed (this parity pass)

| Bug | Cause | Fix |
|---|---|---|
| GA never loads | `define:vars` script contained `import` (classic script, not a module) | Pass `gaId` via inline stub / `data-ga-id`; bundled `<script>` imports analytics |
| Non-slash URLs → 307 | Assets `html_handling` alone | `src/worker.ts` run-first with **308** + `FILE_EXT` `{1,16}` (allows `.webmanifest`) |
| Tools → 0 guides | No topical links | `tool-guide-map.ts` + “Learn more” on tool pages |
| Thin guides | 272–429 words | Expand to ~1,000+ with table, worked example, FAQPage |
| Titles >60 | Brand suffix appended blindly | Short titles + BaseLayout cap at 60 |
| Titles <25 or descriptions >160 | Thin legal/hub meta | Lengthen titles with brand/topic; trim descriptions; CI enforces 25–65 / 70–160 |
| Thin `llms.txt` | 5 links | Full H1 + every tool/guide one-liner |
| Missing schema on contact/methodology/guides index | Omitted | ContactPage / WebPage / CollectionPage + BreadcrumbList |
| Single OG image | One `og-default.png` | `scripts/generate-og.mjs` → `/og/<slug>.png` |
| `og:image` trailing slash risk | URL join adding `/` | Never force slash on file assets |
| Custom domain risk | Hardcoded hosts | Single `PUBLIC_SITE_URL`; see CUSTOM-DOMAIN.md |
| Wrangler preview break | Top-level `vars` without `previews` | Assets Worker: **no** runtime `vars` for `PUBLIC_*`; require `"previews": {}` |

---

## Do / don’t checklist

### Do

- [ ] Keep `DEFAULT_SITE_URL` only in `src/config/defaults.mjs`; override with `PUBLIC_SITE_URL`.
- [ ] Set Astro `site:` from `siteConfig.siteUrl`.
- [ ] Pass page paths with trailing slash; asset paths (`og:image`, favicons) **without**.
- [ ] Keep `/sitemap.xml` → `/sitemap-index.xml` 301 in `public/_redirects`.
- [ ] Keep IndexNow key at `public/<32-hex>.txt` (not a placeholder `000…0`).
- [ ] Keep `html_handling: "force-trailing-slash"`, `run_worker_first`, and `"previews": {}` in `wrangler.jsonc`.
- [ ] Put `PUBLIC_*` in Workers Builds **dashboard** env (build-time), not wrangler `vars`.
- [ ] Titles **25–65** chars (target ~30–60 with brand); meta descriptions **70–160** (target ~120–160). Enforced by `seo-audit.mjs` + `seo-guardrails.mjs`.
- [ ] One H1; answer-first 40–60 word intro under H1 on tools/hubs/home.
- [ ] Every tool links ≥1 guide; guides ≥800 words (target ~1,000+); FAQ + FAQPage on guides.
- [ ] Production deploy: `npx wrangler deploy && node scripts/indexnow.mjs`.
- [ ] Run `npm run build && npm run audit` before merge.

### Don’t

- [ ] Don’t hardcode `fiber-arts-calculators.hammadiqbal117.workers.dev` outside allowlisted config/env/docs.
- [ ] Don’t use `https://example.com` as a site URL fallback.
- [ ] Don’t append trailing slashes to file URLs (`og:image`, `.txt` keys).
- [ ] Don’t put `import` inside `<script define:vars>` (emits a non-module classic script).
- [ ] Don’t rely on `_redirects` alone for trailing slash—Worker must 308.
- [ ] Don’t use `FILE_EXT` max length 8 (breaks `.webmanifest`).
- [ ] Don’t add wrangler top-level `vars` for `PUBLIC_*` without `previews.vars` (breaks `npx wrangler preview`).
- [ ] Don’t remove `"previews": {}`.
- [ ] Don’t change custom domains / routes in feature PRs—follow CUSTOM-DOMAIN.md when ready.
- [ ] Don’t invent statistics or studies in guides; label rules of thumb.

---

## CI / audit enforcement

| Check | Where |
|---|---|
| No `example.com` in dist SEO surfaces | `scripts/audit/seo-guardrails.mjs` |
| No `og:image` ending in `/` | same |
| Titles 25–65; meta descriptions 70–160; canonical; single H1 | `seo-audit.mjs` + guardrails |
| Tool pages link a guide; guides ≥800 words | `seo-audit.mjs` |
| Pages in sitemap; broken internal links; valid JSON-LD | `seo-audit.mjs` / `link-check.mjs` |
| Inline scripts must not contain `import` | `seo-guardrails.mjs` |
| IndexNow not placeholder | `seo-guardrails.mjs` |
| This site’s workers.dev not hardcoded outside allowlist | `site-origin.mjs` |
| Wrangler `previews` + html_handling | `seo-guardrails.mjs` |

```bash
npm test && npm run build && npm run audit
```
