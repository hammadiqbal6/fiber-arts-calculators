# Proof index

Committed evidence regenerated from the production build. **Do not hand-edit scores** — run:

```bash
npm run proof
```

This runs `npm run build`, serves `dist/` on port 4173, executes Lighthouse, Playwright checks, audits, and writes this folder.

| Check | Tool + version | Date (UTC) | Budget | Reproduce |
|---|---|---|---|---|
| Unit tests | Vitest 3.2.7 | 2026-10-19T06:44:51.636Z | PASS if tests.txt shows all passed | `npm test` |
| SEO / link / JS audits | scripts/audit/*.mjs | 2026-10-19T06:44:51.636Z | PASS if seo-audit.txt has no ✗ | `npm run build && node scripts/audit/run-all.mjs` |
| Lighthouse mobile | Lighthouse 12.8.2 | 2026-10-19T06:44:51.636Z | Perf/A11y/BP/SEO ≥95 | `npm run proof` |
| Lighthouse desktop (home) | Lighthouse 12.8.2 | 2026-10-19T06:44:51.636Z | Recorded | `npm run proof` |
| Structured data | scripts/proof/generate-proof.mjs | 2026-10-19T06:44:51.636Z | PASS if validation.txt 0 errors | `npm run proof` |
| Sitemap / robots | scripts/proof/generate-proof.mjs | 2026-10-19T06:44:51.636Z | PASS if counts OK | `npm run proof` |
| Mobile screenshots | Playwright 1.64.1 | 2026-10-19T06:44:51.636Z | See mobile/checks.txt | `npm run proof` |
| Bundle per-page JS | gzip sum of script refs | 2026-10-19T06:44:51.636Z | ≤50 KB/page | `npm run proof` |
| AdSense readiness | adsense-readiness.md | 2026-10-19T06:44:51.636Z | Checklist + word counts | `npm run proof` |

## Contents

| Path | Description |
|---|---|
| `lighthouse/` | Mobile HTML/JSON for home, all hubs, 8 tool URLs; desktop home |
| `structured-data/` | Extracted JSON-LD samples + `validation.txt` |
| `seo-audit.txt` | Full audit script output |
| `sitemap-robots.txt` | Sitemap URL count vs build; robots + llms.txt |
| `mobile/` | 360px & 768px PNGs + `checks.txt` |
| `adsense-readiness.md` | Policy checklist with word counts |
| `tests.txt` | Vitest output |
| `bundle-size.txt` | Global chunk gzip + per-page JS budget |

Node v22.14.0 · Astro 5.18.2
