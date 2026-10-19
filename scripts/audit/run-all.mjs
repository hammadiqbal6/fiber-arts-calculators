#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const scripts = [
  'scripts/audit/seo-audit.mjs',
  'scripts/audit/adsense-audit.mjs',
  'scripts/audit/js-budget.mjs',
  'scripts/audit/link-check.mjs',
];

let failed = false;
for (const s of scripts) {
  console.log(`\n=== ${s} ===`);
  const r = spawnSync(process.execPath, [s], { stdio: 'inherit' });
  if (r.status !== 0) failed = true;
}
if (failed) process.exit(1);
console.log('\nAll audits passed');
