# Per-page SEO / AEO checklist

Use for every new or reworked page: tool, calculator, guide, hub, or reference.
Automated checks: `npm run audit:checklist` (also runs inside `npm run audit`).

## 1. Before you write: keyword and intent
- [ ] One primary query. Check volume/trend (Search Console, Keyword Planner, or autocomplete / PAA).
- [ ] Name the intent: do (tool), know (answer), compare (X vs Y), or navigate. Match the page type.
- [ ] Look at the top 5 results. Note format and gaps; plan one thing they lack.
- [ ] Check the site for a page on the same query (cannibalization). Extend or differentiate.
- [ ] List 3–6 secondary questions (PAA) → H2s and FAQ.

## 2. Structure
- [ ] One H1 matching the query in plain words.
- [ ] Answer first: opening 40–60 words answer the query with a number or verdict.
- [ ] Tool above the fold on mobile (390×844); cookie bar ≤56px.
- [ ] H2/H3 in order; phrase H2s as questions where people search that way.
- [ ] Worked example with real numbers; at least one table/chart you made.
- [ ] Page-specific content; keep sitewide boilerplate short or link `/methodology/` / `/terms/`.
- [ ] Visible Published / Last updated dates matching schema and sitemap lastmod.

## 3. Metadata
- [ ] Title 30–60 characters unique (rendered with brand 25–65); primary query near the start.
- [ ] Meta description 70–155 characters, unique, answer or benefit.
- [ ] Canonical absolute, self-referencing, https, trailing slash matching sitemap.
- [ ] Robots: index,follow for real pages; noindex for embeds.
- [ ] Open Graph / Twitter via BaseLayout; og:image without trailing slash.
- [ ] `<html lang>` and viewport set.

## 4. Schema (JSON-LD)
- [ ] Valid JSON; BreadcrumbList (except home); WebApplication on tools; Article on guides; FAQPage only for visible FAQs.
- [ ] Dates/author/prices match visible text.

## 5. Internal links
- [ ] Guide ↔ matching tool; hub links the page; descriptive anchors; trailing-slash URLs.
- [ ] No raw `(/tools/...)` visible text—use real `<a>` (guide linkify) or markdown-free HTML in Astro.
- [ ] No off-topic sister-site links on tool pages.

## 6. Trust and sources
- [ ] Numbers/formulas cite primary sources; re-check URLs return 200.
- [ ] No claims beyond cited sources; label FiberCalc heuristics honestly.

## 7. Mobile (390×844)
- [ ] No horizontal overflow; 44×44+ targets; 16px inputs; tool not covered by cookie banner.

## 8. Ship
- [ ] In sitemap; `npm test && npm run audit` green.
