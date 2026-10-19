# SEO launch & growth guide (FiberCalc)

Governing playbook: [SEO-PLAYBOOK.md](./SEO-PLAYBOOK.md). Keyword map: [KEYWORD-MAP.md](./KEYWORD-MAP.md).

## Launch checklist (week 0)

1. Set `PUBLIC_SITE_URL` to the live HTTPS origin; redeploy.
2. Google Search Console → **Domain** property → DNS TXT verification.
3. Submit `https://YOUR_DOMAIN/sitemap-index.xml`.
4. URL Inspection on homepage + top 5 tools → Request indexing.
5. Confirm Coverage / Page indexing has no unexpected exclusions.
6. Bing Webmaster Tools → Import from GSC → enable IndexNow (optional key in `PUBLIC_INDEXNOW_KEY`, file at `/KEY.txt`).
7. GA4: create property → set `PUBLIC_GA4_MEASUREMENT_ID` → redeploy.
8. Verify robots.txt allows Googlebot + AI search bots (OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot).
9. Spot-check canonicals, titles, one H1, JSON-LD in View Source.

## Keyword research workflow (free)

1. Seed: `yarn calculator`, `knitting gauge calculator`, `quilt backing calculator`, `fabric yardage`, `half square triangle`, `aida calculator`, `crochet blanket calculator`.
2. Expand with Google Autocomplete (`seed`, `seed for`, `seed a…z`, year).
3. Mine People Also Ask + Reddit (r/knitting, r/crochet, r/quilting, r/CrossStitch).
4. Check Ahrefs free keyword generator / KD manually (captcha); prefer KD ≤30 long-tails.
5. Judge SERP: small DR sites already ranking = opportunity (fiber arts SERPs often DR 0–3).
6. After launch: GSC queries at positions 8–30 become new FAQs, guides, or tool options.

## Target keyword map

See [KEYWORD-MAP.md](./KEYWORD-MAP.md) — one primary intent per URL.

## Content calendar (next 20 articles)

1. How much yarn for a baby blanket (DK vs worsted)
2. Crochet vs knit yarn amounts for throws
3. How to read a yarn ball band (CYC icons)
4. Negative ease for hats explained
5. Cast on for toe-up vs cuff-down socks (calc companion)
6. How to measure gauge on ribbing
7. Granny square blanket size chart
8. Quilt binding corners tutorial (with calculator)
9. Wide-back vs pieced backing cost comparison
10. HST trim rulers compared
11. Curtain fullness 1.5× vs 2.5× fabric math
12. Seam allowance for bags vs garments
13. Aida 14 vs 16 design size examples
14. US vs UK needle sizes for beginners
15. Amigurumi yarn amounts by height chart
16. Substituting acrylic for wool in sweaters
17. Mattress + drop cheat sheet for quilt makers
18. How many 12" blocks for a queen
19. Increasing evenly in the round (visual guide)
20. Embeddable calculators for Ravelry/blog roundups

## Link-building plan

- Submit to tool directories and “free calculator” lists (no paid PBNs).
- Product Hunt / maker launches when embed widgets ship.
- Reddit/forums: answer with value first; link the tool when it solves the math.
- Offer embed snippet with visible credit link (already on each tool).
- Resource-page outreach to knitting guilds, quilt guilds, extension PDFs lists.
- Never buy links or use keyword-stuffed widget anchors (Google spam policies).

## AI search (GEO)

- Answer-first paragraphs and takeaway boxes on every tool/guide.
- Cite CYC and mattress standards with links.
- Allow AI search crawlers in robots.txt; training bots currently allowed (documented choice).
- Optional `llms.txt` present; Google ignores it.
- Monitor GSC Generative AI performance when available.

## 90-day plan

| Phase | Focus |
|---|---|
| Days 1–30 | Indexing, fix GSC issues, publish 4 calendar articles, gather first queries |
| Days 31–60 | Expand FAQs from GSC, add 2 long-tail tool presets if warranted, outreach embeds |
| Days 61–90 | Refresh dates/sources, compare rankings, apply AdSense if traffic + page count ready |

## Core Web Vitals

Targets: LCP < 2.5s (aim < 2.0s), INP < 200ms, CLS < 0.05. Lab budgets enforced via `lighthouserc.cjs` and `npm run audit`.
