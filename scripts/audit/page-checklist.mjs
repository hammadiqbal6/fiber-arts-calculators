#!/usr/bin/env node
/**
 * Per-page SEO/AEO checklist audit (fails CI when broken).
 * Fast: reads dist/ HTML only. Run after `npm run build`.
 *
 * Checks: title/meta, single H1, canonical, JSON-LD parse, sitemap coverage,
 * raw link paths as visible text, placeholder/ad stubs, viewport, answer-first
 * block immediately after H1 (tools/guides/hubs).
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const dist = join(root, 'dist');
const errors = [];
const warnings = [];

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name === 'index.html' || name.endsWith('.html')) out.push(p);
  }
  return out;
}

function textBetween(html, re) {
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

const PLACEHOLDER_RE =
  /\b(lorem ipsum|TODO:|FIXME:|coming soon|ad space reserved|placeholder|Ahrefs KD\b|example\.com)\b/i;
const RAW_PATH_RE = /\(\/(?:tools|guides|reference|methodology)\/[^)\s]*\)/;
const BARE_RAW_IN_TEXT_RE = /(?<!href=["'])\/(?:tools|guides)\/[a-z0-9-]+\//i;

const pages = walk(dist);
if (pages.length < 20) errors.push(`Expected many HTML pages, found ${pages.length}`);

const sitemapPath = join(dist, 'sitemap-0.xml');
const sitemapLocs = new Set();
if (existsSync(sitemapPath)) {
  const sm = readFileSync(sitemapPath, 'utf8');
  for (const m of sm.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)) {
    try {
      sitemapLocs.add(new URL(m[1].trim()).pathname);
    } catch {
      sitemapLocs.add(m[1].trim());
    }
  }
} else {
  errors.push('missing sitemap-0.xml');
}

const skipRel = (rel) => rel.includes('/embed/') || rel.endsWith('404.html');

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const rel = file.replace(dist, '').replace(/\\/g, '/');
  if (skipRel(rel)) continue;

  const title = textBetween(html, /<title>([^<]*)<\/title>/i);
  const desc = textBetween(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonical = textBetween(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const viewport = textBetween(html, /<meta\s+name="viewport"\s+content="([^"]*)"/i);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];

  if (!title) errors.push(`${rel}: missing title`);
  else if ([...title].length < 25 || [...title].length > 65) {
    errors.push(`${rel}: title length ${[...title].length} outside 25–65`);
  }

  if (!desc) errors.push(`${rel}: missing meta description`);
  else if (desc.length < 70 || desc.length > 160) {
    errors.push(`${rel}: description length ${desc.length} outside 70–160`);
  }

  if (!canonical) errors.push(`${rel}: missing canonical`);
  if (h1s.length !== 1) errors.push(`${rel}: expected 1 H1, found ${h1s.length}`);
  if (!viewport) errors.push(`${rel}: missing viewport meta`);

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (blocks.length === 0 && !rel.includes('/404')) {
    // legal pages still have some schema; warn only if completely missing on content pages
    if (/\/(tools|guides|reference)\//.test(rel) || rel === '/index.html') {
      errors.push(`${rel}: missing JSON-LD`);
    }
  }
  for (const b of blocks) {
    try {
      JSON.parse(b[1]);
    } catch {
      errors.push(`${rel}: invalid JSON-LD`);
    }
  }

  // Sitemap coverage for indexable pages
  if (canonical && sitemapLocs.size) {
    try {
      const path = new URL(canonical).pathname;
      if (!sitemapLocs.has(path) && !html.includes('noindex')) {
        errors.push(`${rel}: canonical ${path} missing from sitemap`);
      }
    } catch {
      /* ignore */
    }
  }

  if (PLACEHOLDER_RE.test(html)) {
    errors.push(`${rel}: placeholder or ad-stub text found`);
  }

  // Raw paths in visible body (exclude script/style/json-ld)
  const bodyOnly = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ');
  if (RAW_PATH_RE.test(bodyOnly)) {
    errors.push(`${rel}: raw internal path printed as visible text (parenthetical)`);
  }
  // FAQ JSON-LD must not contain parenthetical paths
  for (const b of blocks) {
    if (RAW_PATH_RE.test(b[1])) {
      errors.push(`${rel}: raw path inside JSON-LD`);
    }
  }

  // Answer-first: first meaningful block after H1
  const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i) || [null, html];
  const main = mainMatch[1];
  const afterH1 = main.split(/<\/h1>/i)[1] || '';
  const nextBlock = afterH1.match(/<(p|div|section|article|h2)\b[^>]*class="([^"]*)"[^>]*>|<(p|div)\b[^>]*>/i);
  const isTool = /\/tools\/(?!index\.html)/.test(rel);
  const isGuide = /\/guides\/(?!index\.html)/.test(rel);
  const isHub =
    rel === '/index.html' ||
    /\/(tools|guides|sewing|quilting|knitting-crochet|reference)\/index\.html$/.test(rel);

  if (isTool || isGuide) {
    const cls = nextBlock?.[2] || '';
    const tag = (nextBlock?.[1] || nextBlock?.[3] || '').toLowerCase();
    const ok =
      /takeaway|answer-first|answer-box|hero__lead|lead/.test(cls) ||
      (tag === 'p' && /takeaway|answer-first/.test(afterH1.slice(0, 400)));
    // meta-row must not be first
    if (/class="[^"]*meta-row/.test(afterH1.slice(0, 280)) && !/takeaway/.test(afterH1.slice(0, 200))) {
      errors.push(`${rel}: meta-row appears before answer/takeaway`);
    }
    if (!ok && !/takeaway|answer-first/.test(afterH1.slice(0, 500))) {
      errors.push(`${rel}: answer/takeaway block not first after H1`);
    }
  }

  if (isHub) {
    if (!/takeaway|answer-first|hero__lead|hero__panel/.test(afterH1.slice(0, 800))) {
      warnings.push(`${rel}: hub missing answer-first/takeaway lead near H1`);
    }
  }

  // Duplicate answer paragraph on tools (same takeaway text twice early)
  if (isTool) {
    const takeaways = [...bodyOnly.matchAll(/Key takeaway:/gi)];
    if (takeaways.length > 1) {
      errors.push(`${rel}: duplicated Key takeaway`);
    }
  }
}

if (warnings.length) {
  console.log('Warnings:');
  for (const w of warnings) console.log('  -', w);
}

if (errors.length) {
  console.error(`page-checklist failed (${errors.length} errors):`);
  for (const e of errors) console.error('  -', e);
  process.exit(1);
}

console.log(`page-checklist passed (${pages.length} html files scanned)`);
