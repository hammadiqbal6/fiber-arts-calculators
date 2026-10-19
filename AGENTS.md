# AGENTS.md — StitchCalc

## Overview

Static Astro site of fiber-arts calculators. Pure TypeScript formulas in `src/lib/calculators/`, UI islands in `src/components/calculators/`, routes in `src/pages/`. One config file: `src/config/site.ts`.

## Architecture invariants

- No server runtime; no user uploads.
- Every tool page: working tool above the fold + 600–1200 words unique content + FAQ + sources + related links.
- Units: inches/cm, yards/meters, grams/oz where relevant.
- Trailing slashes on; self-canonicals; no fake review ratings in schema.
- Placeholders only for owner values (domain, brand already “StitchCalc”, AdSense, GA4, email).

## How to add a new tool page

1. Add pure functions in `src/lib/calculators/<name>.ts` + tests in `tests/`.
2. Export via `src/lib/calculators/index.ts` and `src/lib/client-calc.ts` if needed in the browser.
3. Create `src/components/calculators/<Name>Calc.astro` (form + `<script>` import from `client-calc`).
4. Register in `src/data/tools.ts` (unique primary keyword, related slugs, category).
5. Create `src/pages/tools/<slug>.astro` using `ToolLayout` with answer-first paragraph, formula, example, tips, mistakes, sources, FAQs.
6. Link from the category hub and optionally homepage/guides.
7. Add row to `docs/KEYWORD-MAP.md`.
8. Run `npm test && npm run audit`.

### Page template sketch

```astro
---
import ToolLayout from '../../layouts/ToolLayout.astro';
import MyCalc from '../../components/calculators/MyCalc.astro';
import { getTool } from '../../data/tools';
const tool = getTool('my-slug');
const faqs = [{ q: '...', a: '...' }];
---
<ToolLayout tool={tool} answerFirst="40–60 word direct answer." faqs={faqs}>
  <MyCalc slot="tool" />
  <!-- how / formula / example / tips / mistakes / sources -->
</ToolLayout>
```

## Content / SEO / AdSense rules

- Follow `docs/SEO-PLAYBOOK.md` and `.cursor/rules/*.mdc`.
- One primary keyword per URL (`docs/KEYWORD-MAP.md`).
- Cite CYC / industry sources; show last updated.
- Privacy must keep AdSense cookie disclosures.
- No thin near-duplicate long-tail pages.

## Quality bar / definition of done

- [ ] Formula unit tests pass  
- [ ] Tool works end-to-end with shareable query-string state  
- [ ] Mobile 360px: no horizontal scroll; tap targets ≥48px; tool above fold  
- [ ] `npm run audit` green  
- [ ] JSON-LD valid; single H1; title/description lengths OK  
- [ ] Internal links to hub + related tools  

## Commands

`npm run dev` · `npm test` · `npm run build` · `npm run audit` · `npm run lhci`

## Subagent roles

Mirrored in `.cursor/agents/`: `seo-auditor`, `content-writer`, `adsense-reviewer`, `performance-auditor`, `link-builder-researcher`, `fiber-arts-fact-checker`.
