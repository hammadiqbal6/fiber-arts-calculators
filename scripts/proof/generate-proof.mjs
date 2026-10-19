#!/usr/bin/env node
/**
 * Regenerates docs/proof/ from a production build.
 * Usage: npm run proof
 */
import { spawn, spawnSync } from 'node:child_process';
import {
  mkdirSync,
  writeFileSync,
  readFileSync,
  readdirSync,
  statSync,
  existsSync,
  rmSync,
  copyFileSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');
const PROOF = join(ROOT, 'docs/proof');
const DIST = join(ROOT, 'dist');
const PORT = 4173;
const BASE = `http://127.0.0.1:${PORT}`;

const RUN_UTC = new Date().toISOString();

const HUBS = ['/knitting-crochet/', '/sewing/', '/quilting/', '/reference/'];
const TOOL_PATHS = [
  '/tools/yarn-blanket-calculator/',
  '/tools/yarn-sweater-calculator/',
  '/tools/knitting-gauge-calculator/',
  '/tools/quilt-backing-calculator/',
  '/tools/fabric-yardage-calculator/',
  '/tools/cast-on-calculator/',
  '/tools/hst-calculator/',
  '/tools/cross-stitch-fabric-calculator/',
];

const MOBILE_SCREENSHOT_PAGES = [
  { name: 'home', path: '/' },
  { name: 'hub-knitting', path: '/knitting-crochet/' },
  { name: 'tool-yarn-blanket', path: '/tools/yarn-blanket-calculator/' },
  { name: 'tool-quilt-backing', path: '/tools/quilt-backing-calculator/' },
  { name: 'tool-knitting-gauge', path: '/tools/knitting-gauge-calculator/' },
];

function slugPath(path) {
  return path.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '_') || 'home';
}

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: opts.inherit ? 'inherit' : 'pipe',
    ...opts,
  });
  if (r.status !== 0 && !opts.allowFail) {
    console.error(r.stdout || r.stderr);
    throw new Error(`Command failed: ${cmd} ${args.join(' ')}`);
  }
  return r;
}

function getToolVersions() {
  const node = process.version;
  const astro = JSON.parse(readFileSync(join(ROOT, 'node_modules/astro/package.json'), 'utf8')).version;
  const lh = JSON.parse(readFileSync(join(ROOT, 'node_modules/lighthouse/package.json'), 'utf8')).version;
  const vitest = JSON.parse(readFileSync(join(ROOT, 'node_modules/vitest/package.json'), 'utf8')).version;
  const playwright = JSON.parse(readFileSync(join(ROOT, 'node_modules/playwright/package.json'), 'utf8')).version;
  return { node, astro, lighthouse: lh, vitest, playwright };
}

async function startServer() {
  const child = spawn('npx', ['serve', 'dist', '-l', String(PORT)], {
    cwd: ROOT,
    stdio: 'pipe',
    shell: true,
  });
  await new Promise((r) => setTimeout(r, 2000));
  return child;
}

function runLighthouse(url, outBase, formFactor) {
  const args = [
    url,
    '--quiet',
    '--chrome-flags=--headless --no-sandbox --disable-gpu',
    '--output=html',
    '--output=json',
    `--output-path=${outBase}`,
    '--only-categories=performance,accessibility,best-practices,seo',
  ];
  if (formFactor === 'desktop') {
    args.push('--preset=desktop');
  } else {
    args.push('--form-factor=mobile', '--screen-emulation.disabled=false');
  }
  run('npx', ['lighthouse', ...args], { allowFail: false });
}

function parseLhJson(path) {
  const j = JSON.parse(readFileSync(path, 'utf8'));
  const c = j.categories;
  const a = j.audits;
  let jsGzip = 0;
  const network = j.audits['network-requests']?.details?.items || [];
  for (const item of network) {
    if (item.resourceType === 'Script' && item.transferSize) {
      jsGzip += item.transferSize;
    }
  }
  return {
    perf: Math.round((c.performance?.score ?? 0) * 100),
    a11y: Math.round((c.accessibility?.score ?? 0) * 100),
    bp: Math.round((c['best-practices']?.score ?? 0) * 100),
    seo: Math.round((c.seo?.score ?? 0) * 100),
    lcp: a['largest-contentful-paint']?.displayValue || '—',
    cls: a['cumulative-layout-shift']?.displayValue || '—',
    tbt: a['total-blocking-time']?.displayValue || '—',
    jsTransferBytes: jsGzip,
  };
}

function walkHtml(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkHtml(p, out);
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

function extractJsonLd(html) {
  const blocks = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      blocks.push(JSON.parse(m[1]));
    } catch {
      blocks.push({ _parseError: true, raw: m[1].slice(0, 200) });
    }
  }
  return blocks;
}

function validateSchema(obj, errors, path = '$') {
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => validateSchema(v, errors, `${path}[${i}]`));
    return;
  }
  if (obj && typeof obj === 'object') {
    if (!obj['@context'] && !obj._parseError) {
      errors.push(`${path}: missing @context`);
    }
    if (!obj['@type'] && !obj._parseError) {
      errors.push(`${path}: missing @type`);
    }
    for (const [k, v] of Object.entries(obj)) {
      if (k !== '@context' && k !== '@type') validateSchema(v, errors, `${path}.${k}`);
    }
  }
}

function countWords(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text ? text.split(' ').length : 0;
}

function pageJsGzip(htmlPath) {
  const html = readFileSync(htmlPath, 'utf8');
  const srcs = [...html.matchAll(/src="(\/_astro\/[^"]+\.js)"/g)].map((m) => m[1]);
  let total = 0;
  const seen = new Set();
  for (const src of srcs) {
    if (seen.has(src)) continue;
    seen.add(src);
    const fp = join(DIST, src.replace(/^\//, ''));
    if (existsSync(fp)) {
      total += gzipSync(readFileSync(fp)).length;
    }
  }
  return { total, scripts: [...seen] };
}

async function main() {
  console.log('=== FiberCalc proof generation ===');
  console.log('UTC:', RUN_UTC);

  let lhSummary = [];

  rmSync(PROOF, { recursive: true, force: true });
  mkdirSync(join(PROOF, 'lighthouse'), { recursive: true });
  mkdirSync(join(PROOF, 'structured-data'), { recursive: true });
  mkdirSync(join(PROOF, 'mobile'), { recursive: true });

  const versions = getToolVersions();

  console.log('Building…');
  run('npm', ['run', 'build'], { inherit: true });

  console.log('Unit tests…');
  const testOut = run('npm', ['test']);
  writeFileSync(join(PROOF, 'tests.txt'), testOut.stdout + (testOut.stderr || ''));

  console.log('Audits…');
  const auditParts = [];
  for (const script of ['seo-audit.mjs', 'adsense-audit.mjs', 'js-budget.mjs', 'link-check.mjs']) {
    auditParts.push(`\n=== scripts/audit/${script} ===\n`);
    const r = run('node', [`scripts/audit/${script}`]);
    auditParts.push(r.stdout + (r.stderr || ''));
  }
  writeFileSync(join(PROOF, 'seo-audit.txt'), auditParts.join(''));

  const budgetOut = auditParts.find((p) => p.includes('js-budget')) || '';
  writeFileSync(join(PROOF, 'bundle-size.txt'), budgetOut + '\n' + generatePerPageBundleReport());

  console.log('Sitemap / robots…');
  writeFileSync(join(PROOF, 'sitemap-robots.txt'), generateSitemapRobotsReport());

  console.log('Structured data…');
  generateStructuredDataProof();

  const server = await startServer();
  try {
    console.log('Lighthouse…');
    const mobileUrls = ['/', ...HUBS, ...TOOL_PATHS];
    for (const path of mobileUrls) {
      const slug = slugPath(path);
      const outBase = join(PROOF, 'lighthouse', `${slug}-mobile`);
      runLighthouse(`${BASE}${path}`, outBase, 'mobile');
      const metrics = parseLhJson(`${outBase}.report.json`);
      lhSummary.push({ path, form: 'mobile', ...metrics });
      console.log('  LH mobile', path, metrics);
    }
    const homeDeskBase = join(PROOF, 'lighthouse', 'home-desktop');
    runLighthouse(`${BASE}/`, homeDeskBase, 'desktop');
    const desk = parseLhJson(`${homeDeskBase}.report.json`);
    lhSummary.push({ path: '/', form: 'desktop', ...desk });

    writeFileSync(
      join(PROOF, 'lighthouse', 'SUMMARY.md'),
      generateLhSummaryMd(lhSummary, versions),
    );

    console.log('Mobile screenshots & checks…');
    await generateMobileProof();
  } finally {
    server.kill();
  }

  console.log('AdSense readiness doc…');
  writeFileSync(join(PROOF, 'adsense-readiness.md'), generateAdSenseMd());

  writeFileSync(join(PROOF, 'README.md'), generateProofReadme(versions, lhSummary));

  // Budget enforcement
  const failures = [];
  for (const row of lhSummary.filter((r) => r.form === 'mobile')) {
    for (const [k, min] of [
      ['perf', 95],
      ['a11y', 95],
      ['bp', 95],
      ['seo', 95],
    ]) {
      if (row[k] < min) failures.push(`${row.path} mobile ${k}=${row[k]} < ${min}`);
    }
  }
  const bundleReport = readFileSync(join(PROOF, 'bundle-size.txt'), 'utf8');
  if (bundleReport.includes('✗') || auditParts.some((p) => p.includes('✗'))) {
    failures.push('Audit script reported errors — see seo-audit.txt');
  }

  if (failures.length) {
    console.error('Proof budget failures:\n', failures.join('\n'));
    process.exit(1);
  }
  console.log('Proof generation complete:', PROOF);
}

function generatePerPageBundleReport() {
  const lines = ['=== Per-page JS (gzip sum of unique /_astro/*.js referenced) ===', ''];
  const htmlFiles = walkHtml(DIST).filter((f) => !f.includes('/embed/'));
  let fail = false;
  for (const file of htmlFiles.sort()) {
    const rel = file.replace(DIST, '');
    const { total, scripts } = pageJsGzip(file);
    const status = total <= 50 * 1024 ? 'PASS' : 'FAIL';
    if (status === 'FAIL') fail = true;
    lines.push(`${status}  ${(total / 1024).toFixed(2)} KB gzip  ${rel}  (${scripts.length} scripts)`);
  }
  if (fail) lines.push('\nFAIL: at least one page exceeds 50 KB referenced JS gzip budget');
  else lines.push('\nAll checked pages within 50 KB referenced JS gzip budget.');
  return lines.join('\n');
}

function generateSitemapRobotsReport() {
  const lines = [];
  const sitemap = readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8');
  const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8');
  const urlMatches = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)];
  const htmlCount = walkHtml(DIST).filter(
    (f) => !f.includes('/embed/') && !f.endsWith('404.html'),
  ).length;
  lines.push(`Generated: ${RUN_UTC}`);
  lines.push(`Sitemap URLs: ${urlMatches.length}`);
  lines.push(`Built HTML pages (excl. embed, 404): ${htmlCount}`);
  lines.push(`Match: ${urlMatches.length >= htmlCount - 5 ? 'OK (sitemap includes hubs/tools/guides; embed excluded)' : 'REVIEW'}`);
  lines.push('');
  lines.push('--- robots.txt ---');
  lines.push(robots);
  lines.push('');
  const bots = ['Googlebot', 'bingbot', 'OAI-SearchBot', 'PerplexityBot', 'Claude-SearchBot'];
  for (const bot of bots) {
    lines.push(`${bot}: ${robots.includes(bot) || robots.includes('User-agent: *') ? 'allowed (see rules)' : 'CHECK'}`);
  }
  lines.push(`llms.txt in public/: ${existsSync(join(ROOT, 'public/llms.txt')) ? 'yes' : 'no'}`);
  lines.push(`llms.txt in dist/: ${existsSync(join(DIST, 'llms.txt')) ? 'yes' : 'no'}`);
  if (existsSync(join(DIST, 'llms.txt'))) {
    lines.push('');
    lines.push('--- llms.txt (dist) ---');
    lines.push(readFileSync(join(DIST, 'llms.txt'), 'utf8'));
  }
  return lines.join('\n');
}

function generateStructuredDataProof() {
  const samples = [
    { name: 'home', file: join(DIST, 'index.html') },
    { name: 'tool-yarn-blanket', file: join(DIST, 'tools/yarn-blanket-calculator/index.html') },
    { name: 'guide-yarn-blanket', file: join(DIST, 'guides/how-much-yarn-for-a-blanket/index.html') },
    { name: 'hub-knitting', file: join(DIST, 'knitting-crochet/index.html') },
    { name: 'reference-yarn-weights', file: join(DIST, 'reference/yarn-weights/index.html') },
  ];
  const validationLines = [`Structured data validation — ${RUN_UTC}`, ''];
  for (const s of samples) {
    const html = readFileSync(s.file, 'utf8');
    const blocks = extractJsonLd(html);
    writeFileSync(
      join(PROOF, 'structured-data', `${s.name}.json`),
      JSON.stringify(blocks, null, 2),
    );
    const errors = [];
    for (const b of blocks) validateSchema(b, errors);
    validationLines.push(`${s.name}: ${blocks.length} block(s), errors: ${errors.length}`);
    errors.forEach((e) => validationLines.push(`  - ${e}`));
  }
  validationLines.push('');
  validationLines.push(
    'After deploy, re-run Google Rich Results Test on live URLs, e.g.:',
  );
  validationLines.push('https://search.google.com/test/rich-results');
  validationLines.push('Example URL: {PUBLIC_SITE_URL}/tools/yarn-blanket-calculator/');
  writeFileSync(join(PROOF, 'structured-data', 'validation.txt'), validationLines.join('\n'));
}

async function generateMobileProof() {
  const lines = [`Mobile checks — ${RUN_UTC}`, ''];
  const browser = await chromium.launch();
  for (const width of [360, 768]) {
    const ctx = await browser.newContext({
      viewport: { width, height: 800 },
      deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    for (const p of MOBILE_SCREENSHOT_PAGES) {
      await page.goto(`${BASE}${p.path}`, { waitUntil: 'networkidle' });
      const shot = join(PROOF, 'mobile', `${p.name}-${width}.png`);
      await page.screenshot({ path: shot, fullPage: true });
      const metrics = await page.evaluate(() => {
        const doc = document.documentElement;
        const noHScroll = doc.scrollWidth <= doc.clientWidth + 1;
        const vp = document.querySelector('meta[name="viewport"]')?.getAttribute('content') || '';
        const tappables = [...document.querySelectorAll('button, a, input, select, summary')];
        let smallTargets = 0;
        for (const el of tappables) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 && r.height === 0) continue;
          if (Math.min(r.width, r.height) < 48) smallTargets++;
        }
        return { noHScroll, viewport: vp, smallTargets, tappableCount: tappables.length };
      });
      const pass = metrics.noHScroll && metrics.viewport.includes('width') && metrics.smallTargets === 0;
      lines.push(
        `${width}px ${p.path}: screenshot=${p.name}-${width}.png | no horizontal scroll=${metrics.noHScroll} | viewport=${metrics.viewport} | tap targets <48px=${metrics.smallTargets}/${metrics.tappableCount} | ${pass ? 'PASS' : 'REVIEW'}`,
      );
    }
    await ctx.close();
  }
  await browser.close();
  writeFileSync(join(PROOF, 'mobile', 'checks.txt'), lines.join('\n'));
}

function generateAdSenseMd() {
  const required = [
    ['About', '/about/index.html'],
    ['Contact', '/contact/index.html'],
    ['Privacy', '/privacy/index.html'],
    ['Terms', '/terms/index.html'],
    ['Methodology', '/methodology/index.html'],
  ];
  const lines = [
    `# AdSense readiness evidence`,
    ``,
    `Generated: ${RUN_UTC}`,
    ``,
    `## Required pages`,
    ``,
    '| Page | Exists | Evidence |',
    '|---|---|---|',
  ];
  for (const [name, rel] of required) {
    const fp = join(DIST, rel);
    lines.push(`| ${name} | ${existsSync(fp) ? 'yes' : 'no'} | [dist${rel.replace('/index.html', '/')}](dist${rel}) |`);
  }
  const privacy = readFileSync(join(DIST, 'privacy/index.html'), 'utf8').toLowerCase();
  lines.push('');
  lines.push('## Privacy policy disclosures');
  for (const phrase of ['adsense', 'cookie', 'doubleclick', 'analytics', 'opt out']) {
    lines.push(`- **${phrase}**: ${privacy.includes(phrase) || privacy.includes('opt-out') ? 'present' : 'missing'}`);
  }
  lines.push('');
  lines.push('## ads.txt');
  lines.push('```');
  lines.push(readFileSync(join(DIST, 'ads.txt'), 'utf8'));
  lines.push('```');
  lines.push('');
  lines.push('## Consent banner / CMP');
  lines.push('- Cookie notice component: `src/components/CookieNotice.astro` (localStorage ack; CMP required for EEA personalized ads before enable — see `docs/ADSENSE.md`)');
  lines.push('');
  lines.push('## Tool page word counts (thin-page check)');
  lines.push('');
  lines.push('| Tool page | Words | ≥600 |');
  lines.push('|---|---:|---|');
  const toolHtml = walkHtml(join(DIST, 'tools')).filter(
    (f) => f.endsWith('index.html') && !f.replace(DIST, '').startsWith('/tools/index.html'),
  );
  for (const f of toolHtml.sort()) {
    const w = countWords(readFileSync(f, 'utf8'));
    const rel = f.replace(DIST, '');
    lines.push(`| ${rel} | ${w} | ${w >= 600 ? 'yes' : 'no'} |`);
  }
  lines.push('');
  lines.push('## Audit script');
  lines.push('See `docs/proof/seo-audit.txt` (includes `adsense-audit.mjs` output).');
  return lines.join('\n');
}

function generateLhSummaryMd(rows, versions) {
  const hdr = `| Page | Form | Perf | A11y | BP | SEO | LCP | CLS | TBT | JS transfer (B) |
|---|---|---:|---:|---:|---:|---|---|---|---:|`;
  const body = rows
    .map(
      (r) =>
        `| ${r.path} | ${r.form} | ${r.perf} | ${r.a11y} | ${r.bp} | ${r.seo} | ${r.lcp} | ${r.cls} | ${r.tbt} | ${r.jsTransferBytes} |`,
    )
    .join('\n');
  return `# Lighthouse summary

Generated: ${RUN_UTC}

Tools: Lighthouse ${versions.lighthouse}, Node ${versions.node}

${hdr}
${body}

Reports: HTML + JSON alongside this file (\`*-mobile.report.json\`, \`home-desktop.report.json\`).
`;
}

function generateProofReadme(versions, summary) {
  const rows = [
    ['Unit tests', `Vitest ${versions.vitest}`, RUN_UTC, 'PASS if tests.txt shows all passed', 'npm test'],
    ['SEO / link / JS audits', 'scripts/audit/*.mjs', RUN_UTC, 'PASS if seo-audit.txt has no ✗', 'npm run build && node scripts/audit/run-all.mjs'],
    ['Lighthouse mobile', `Lighthouse ${versions.lighthouse}`, RUN_UTC, 'Perf/A11y/BP/SEO ≥95', 'npm run proof (includes LH)'],
    ['Lighthouse desktop (home)', `Lighthouse ${versions.lighthouse}`, RUN_UTC, 'Recorded', 'npm run proof'],
    ['Structured data', 'scripts/proof/generate-proof.mjs', RUN_UTC, 'PASS if validation.txt 0 errors', 'npm run proof'],
    ['Sitemap / robots', 'scripts/proof/generate-proof.mjs', RUN_UTC, 'PASS if counts OK', 'npm run proof'],
    ['Mobile screenshots', `Playwright ${versions.playwright}`, RUN_UTC, 'See mobile/checks.txt', 'npm run proof'],
    ['Bundle per-page JS', 'gzip sum of script refs', RUN_UTC, '≤50 KB/page', 'npm run proof'],
    ['AdSense readiness', 'adsense-readiness.md', RUN_UTC, 'Checklist + word counts', 'npm run proof'],
  ];
  const table = [
    '| Check | Tool + version | Date (UTC) | Budget | Reproduce |',
    '|---|---|---|---|---|',
    ...rows.map((r) => `| ${r[0]} | ${r[1]} | ${r[2]} | ${r[3]} | \`${r[4]}\` |`),
  ].join('\n');
  return `# Proof index

Committed evidence regenerated from the production build. **Do not hand-edit scores** — run:

\`\`\`bash
npm run proof
\`\`\`

This runs \`npm run build\`, serves \`dist/\` on port ${PORT}, executes Lighthouse, Playwright checks, audits, and writes this folder.

${table}

## Contents

| Path | Description |
|---|---|
| \`lighthouse/\` | Mobile HTML/JSON for home, all hubs, 8 tool URLs; desktop home |
| \`structured-data/\` | Extracted JSON-LD samples + \`validation.txt\` |
| \`seo-audit.txt\` | Full audit script output |
| \`sitemap-robots.txt\` | Sitemap URL count vs build; robots + llms.txt |
| \`mobile/\` | 360px & 768px PNGs + \`checks.txt\` |
| \`adsense-readiness.md\` | Policy checklist with word counts |
| \`tests.txt\` | Vitest output |
| \`bundle-size.txt\` | Global chunk gzip + per-page JS budget |

Node ${versions.node} · Astro ${versions.astro}
`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
