---
name: performance-cwv-audit
description: Enforce FiberCalc performance budgets and Lighthouse CI.
---
Run npm run audit (JS budget) and npx lhci autorun with lighthouserc.cjs. Targets: perf/a11y/BP/SEO ≥95, CLS≤0.05, TBT≤150ms warn. Keep calculator JS islands small; no heavy frameworks on tool pages.
