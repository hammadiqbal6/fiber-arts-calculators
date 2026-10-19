import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const scripts = ['seo-audit.mjs', 'adsense-audit.mjs', 'js-budget.mjs', 'link-check.mjs'];
let failed = false;
for (const s of scripts) {
  console.log('\n===', s, '===');
  const r = spawnSync(process.execPath, [path.join(dir, s)], { stdio: 'inherit' });
  if (r.status !== 0) failed = true;
}
process.exit(failed ? 1 : 0);
