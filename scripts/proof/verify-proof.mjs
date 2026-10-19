#!/usr/bin/env node
/**
 * CI-safe proof check: validate committed docs/proof/ + run tests/audits.
 * Full regeneration (Lighthouse, Playwright): npm run proof
 */
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');
const PROOF = join(ROOT, 'docs/proof');

const MOBILE_LH_BASES = [
  'home-mobile',
  'knitting-crochet-mobile',
  'sewing-mobile',
  'quilting-mobile',
  'reference-mobile',
  'tools_yarn-blanket-calculator-mobile',
  'tools_yarn-sweater-calculator-mobile',
  'tools_knitting-gauge-calculator-mobile',
  'tools_quilt-backing-calculator-mobile',
  'tools_fabric-yardage-calculator-mobile',
  'tools_cast-on-calculator-mobile',
  'tools_hst-calculator-mobile',
  'tools_cross-stitch-fabric-calculator-mobile',
];

const STRUCTURED_JSON = [
  'home.json',
  'tool-yarn-blanket.json',
  'guide-yarn-blanket.json',
  'hub-knitting.json',
  'reference-yarn-weights.json',
];

const MOBILE_SHOTS = [
  'home-360.png',
  'home-768.png',
  'hub-knitting-360.png',
  'hub-knitting-768.png',
  'tool-yarn-blanket-360.png',
  'tool-yarn-blanket-768.png',
  'tool-quilt-backing-360.png',
  'tool-quilt-backing-768.png',
  'tool-knitting-gauge-360.png',
  'tool-knitting-gauge-768.png',
];

const REQUIRED_FILES = [
  'README.md',
  'tests.txt',
  'seo-audit.txt',
  'bundle-size.txt',
  'sitemap-robots.txt',
  'adsense-readiness.md',
  'lighthouse/SUMMARY.md',
  'lighthouse/home-desktop.report.json',
  'lighthouse/home-desktop.report.html',
  'structured-data/validation.txt',
  'mobile/checks.txt',
];

const errors = [];

function fail(msg) {
  errors.push(msg);
}

function mustExist(rel) {
  const fp = join(PROOF, rel);
  if (!existsSync(fp)) {
    fail(`missing ${rel}`);
    return;
  }
  if (statSync(fp).size === 0) fail(`empty ${rel}`);
}

function parseLhScores(jsonPath) {
  const j = JSON.parse(readFileSync(jsonPath, 'utf8'));
  const c = j.categories || {};
  return {
    perf: Math.round((c.performance?.score ?? 0) * 100),
    a11y: Math.round((c.accessibility?.score ?? 0) * 100),
    bp: Math.round((c['best-practices']?.score ?? 0) * 100),
    seo: Math.round((c.seo?.score ?? 0) * 100),
  };
}

function verifyCommittedProof() {
  console.log('=== Verify committed docs/proof/ ===');
  for (const rel of REQUIRED_FILES) mustExist(rel);
  for (const base of MOBILE_LH_BASES) {
    mustExist(`lighthouse/${base}.report.json`);
    mustExist(`lighthouse/${base}.report.html`);
  }
  for (const name of STRUCTURED_JSON) mustExist(`structured-data/${name}`);
  for (const name of MOBILE_SHOTS) mustExist(`mobile/${name}`);

  for (const name of STRUCTURED_JSON) {
    try {
      JSON.parse(readFileSync(join(PROOF, 'structured-data', name), 'utf8'));
    } catch {
      fail(`invalid JSON structured-data/${name}`);
    }
  }

  const tests = readFileSync(join(PROOF, 'tests.txt'), 'utf8');
  if (!/passed/i.test(tests) || /\bFAIL\b/.test(tests)) {
    fail('tests.txt does not show a passing Vitest run');
  }

  const bundle = readFileSync(join(PROOF, 'bundle-size.txt'), 'utf8');
  if (/\nFAIL\s/.test(bundle) || bundle.includes('FAIL: at least one page')) {
    fail('bundle-size.txt reports a per-page JS budget failure');
  }

  const sitemap = readFileSync(join(PROOF, 'sitemap-robots.txt'), 'utf8');
  if (!sitemap.includes('Match: OK')) fail('sitemap-robots.txt missing Match: OK');

  const summary = readFileSync(join(PROOF, 'lighthouse/SUMMARY.md'), 'utf8');
  if (!summary.includes('| Page | Form |')) fail('lighthouse/SUMMARY.md missing score table');
  if (!summary.includes('Generated:')) fail('lighthouse/SUMMARY.md missing Generated timestamp');

  for (const base of MOBILE_LH_BASES) {
    const scores = parseLhScores(join(PROOF, 'lighthouse', `${base}.report.json`));
    for (const [k, min] of [
      ['perf', 95],
      ['a11y', 95],
      ['bp', 95],
      ['seo', 95],
    ]) {
      if (scores[k] < min) fail(`${base} ${k}=${scores[k]} < ${min}`);
    }
  }

  const checks = readFileSync(join(PROOF, 'mobile/checks.txt'), 'utf8');
  if (checks.includes('no horizontal scroll=false')) {
    fail('mobile/checks.txt reports horizontal scroll on a page');
  }
  if (!checks.includes('viewport=width=device-width')) {
    fail('mobile/checks.txt missing viewport meta checks');
  }

  const adsense = readFileSync(join(PROOF, 'adsense-readiness.md'), 'utf8');
  for (const page of ['About', 'Contact', 'Privacy', 'Terms', 'Methodology']) {
    if (!adsense.includes(`| ${page} | yes |`)) {
      fail(`adsense-readiness.md missing required page: ${page}`);
    }
  }

  const readme = readFileSync(join(PROOF, 'README.md'), 'utf8');
  if (!readme.includes('npm run proof')) fail('docs/proof/README.md missing npm run proof');

  if (errors.length) {
    console.error('Proof artifact validation failed:');
    errors.forEach((e) => console.error('  -', e));
    process.exit(1);
  }
  console.log('Committed proof artifacts OK');
}

function runCmd(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: true });
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(' ')} exited ${code}`));
    });
  });
}

async function runLiveChecks() {
  console.log('=== Live tests + audits (parallel) ===');
  await Promise.all([runCmd('npm', ['test']), runCmd('npm', ['run', 'audit'])]);
}

async function main() {
  verifyCommittedProof();
  await runLiveChecks();
  console.log('proof:verify passed');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
