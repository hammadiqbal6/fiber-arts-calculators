---
name: performance-cwv-audit
description: Enforce mobile performance budgets with JS audit and Lighthouse CI.
---
Run node scripts/audit/js-budget.mjs and npx lhci autorun. Targets: perf≥95, CLS≤0.05, TBT≤150ms, JS≤50KB gz/page. Fix ad-slot CLS and heavy imports.
