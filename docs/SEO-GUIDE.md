# SEO launch & growth guide (StitchCalc)

Governing research: [SEO-PLAYBOOK.md](./SEO-PLAYBOOK.md), [MARKET-RESEARCH.md](./MARKET-RESEARCH.md), [KEYWORD-MAP.md](./KEYWORD-MAP.md).

## Launch checklist

- [ ] Canonical HTTPS host only (apex or www, not both)
- [ ] `PUBLIC_SITE_URL` matches live origin; rebuild
- [ ] Google Search Console **domain** property → DNS TXT verification
- [ ] Submit `https://YOURDOMAIN/sitemap-index.xml`
- [ ] URL Inspection → request indexing for `/`, hubs, top 5 tools
- [ ] Coverage / Page indexing: fix excluded-by-robots or soft 404s
- [ ] Core Web Vitals report (field data) after traffic exists
- [ ] Bing Webmaster Tools → import from GSC; enable IndexNow key file
- [ ] GA4 property + `PUBLIC_GA4_ID` (consent/CMP before ads in EEA/UK/CH)
- [ ] Confirm AI search bots allowed in `robots.txt` (OAI-SearchBot, PerplexityBot, Claude-SearchBot)

## Keyword research workflow (free)

1. Seed: `yarn calculator`, `knitting gauge calculator`, `quilt backing calculator`, etc.
2. Expand with Google Autocomplete (`for`, `a–z`, year).
3. Mine PAA / Reddit phrasing for FAQs.
4. Check Ahrefs free KD / Keyword Planner CPC manually in a browser.
5. Prefer KD ≤30 where SERPs show small tool sites (fiber arts is idea #23 — weak-authority SERPs).
6. After launch: GSC queries at positions 8–30 → new FAQs, options, or guides.

## Target keyword map

See [KEYWORD-MAP.md](./KEYWORD-MAP.md) — one primary intent per URL.

## Content calendar (next 20 articles)

1. How many granny squares for a throw  
2. Sock yarn yardage by shoe size  
3. Worsted vs DK substitution examples  
4. How to measure knitting gauge without a ruler app  
5. Crochet vs knit yarn usage comparison  
6. Queen quilt backing on 108" wide fabric  
7. Bias vs straight-grain binding  
8. HST trim size unfinished chart printable  
9. Aida 14 vs 16 for the same pattern  
10. Curtain fullness explained (1.5×–3×)  
11. Standard crib blanket sizes for makers  
12. How to read a yarn ball band  
13. Casting on for circular hats  
14. Evenly space buttonholes (related shaping)  
15. Quilt batting sizes vs finished quilt  
16. Cross-stitch margin for embroidery hoops  
17. Sweater ease and yarn waste  
18. Amigurumi stuffing and yarn density  
19. Metric needle conversion printable  
20. Upholstery pattern repeat waste case study  

## Link-building plan

- Tool directories & indie maker roundups  
- Product Hunt / Show HN launch  
- r/knitting, r/crochet, r/quilting — answer first, link when truly helpful  
- Embeddable widget (`/embed/yarn-blanket/`) with visible credit link (not keyword-stuffed)  
- Resource-page outreach: “knitting resources”, “quilt calculator tools”  
- Digital PR: publish anonymized “what sizes people calculate” data story later  

## AI search (GEO)

- Keep answer-first 40–60 word intros  
- Tables with dates + sources (CYC)  
- Allow search bots; `llms.txt` optional  
- Measure Google Generative AI performance in GSC when available  

## 90-day plan

| Weeks | Focus |
|---|---|
| 1–2 | Configure domain, GSC/Bing, index top URLs, fix CWV |
| 3–4 | 4 guides from calendar; outreach to 30 resource pages |
| 5–6 | AdSense eligibility (~20–30 quality pages + traffic); CMP |
| 7–8 | Embed adoption; 50 outreach emails |
| 9–10 | Optimize titles/FAQs from GSC positions 8–30 |
| 11–12 | Add backlog tools (granny square, sock yarn); prune thin ideas |
