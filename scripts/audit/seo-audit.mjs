#!/usr/bin/env node
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

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
}

const pages = walk(dist);
if (pages.length < 20) errors.push(`Expected many HTML pages, found ${pages.length}`);

const toolPages = pages.filter((p) => p.includes(`${join('tools')}${join('/')}`) || p.includes('/tools/'));
const toolPageFiles = pages.filter((p) => {
  const rel = p.replace(/\\/g, '/');
  // Individual tool pages only — not /tools/index.html
  return /\/tools\/(?!index\.html)[^/]+\/index\.html$/.test(rel);
});
const guidePageFiles = pages.filter((p) => {
  const rel = p.replace(/\\/g, '/');
  return /\/guides\/[^/]+\/index\.html$/.test(rel) && !rel.endsWith('/guides/index.html');
});

// Sitemap locs
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

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const rel = file.replace(dist, '').replace(/\\/g, '/');
  if (rel.includes('/embed/') || rel.endsWith('404.html')) continue;

  const title = textBetween(html, /<title>([^<]*)<\/title>/i);
  const desc = textBetween(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonical = textBetween(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];

  if (!title) errors.push(`${rel}: missing title`);
  else if ([...title].length > 60) errors.push(`${rel}: title length ${[...title].length} > 60`);

  if (!desc) errors.push(`${rel}: missing meta description`);
  else if (desc.length < 50 || desc.length > 165) {
    errors.push(`${rel}: description length ${desc.length} outside 50–165`);
  }

  if (!canonical) errors.push(`${rel}: missing canonical`);
  if (h1s.length !== 1) errors.push(`${rel}: expected 1 H1, found ${h1s.length}`);

  if (html.includes('application/ld+json')) {
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
    for (const b of blocks) {
      try {
        JSON.parse(b[1]);
      } catch {
        errors.push(`${rel}: invalid JSON-LD`);
      }
    }
  }

  if (!html.includes('og:title')) errors.push(`${rel}: missing og:title`);
  const ogImage = textBetween(html, /<meta\s+property="og:image"\s+content="([^"]*)"/i);
  if (ogImage && /\/$/.test(ogImage)) errors.push(`${rel}: og:image ends with /`);

  // Page must appear in sitemap (canonical path)
  if (canonical && sitemapLocs.size) {
    try {
      const path = new URL(canonical).pathname;
      if (!sitemapLocs.has(path) && !sitemapLocs.has(path.endsWith('/') ? path : path + '/')) {
        errors.push(`${rel}: canonical path ${path} missing from sitemap`);
      }
    } catch {
      /* ignore */
    }
  }
}

for (const file of toolPageFiles) {
  const html = readFileSync(file, 'utf8');
  const rel = file.replace(dist, '').replace(/\\/g, '/');
  const text = stripHtml(html);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (words < 600) errors.push(`${rel}: tool page word count ${words} < 600`);
  if (!html.includes('data-calc')) errors.push(`${rel}: missing calculator`);
  // Must link to at least one guide
  if (!/href="\/guides\/[^"]+"/.test(html)) {
    errors.push(`${rel}: tool page has no guide link`);
  }
}

for (const file of guidePageFiles) {
  const html = readFileSync(file, 'utf8');
  const rel = file.replace(dist, '').replace(/\\/g, '/');
  const text = stripHtml(html);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (words < 800) errors.push(`${rel}: guide word count ${words} < 800`);
  if (!html.includes('FAQPage') && !html.includes('"@type":"FAQPage"')) {
    // stringify may have spaces
    if (!/"@type"\s*:\s*"FAQPage"/.test(html)) {
      errors.push(`${rel}: guide missing FAQPage JSON-LD`);
    }
  }
}

const robots = join(dist, 'robots.txt');
const sitemap = join(dist, 'sitemap-index.xml');
if (!existsSync(robots)) errors.push('missing robots.txt');
else {
  const r = readFileSync(robots, 'utf8');
  for (const bot of ['OAI-SearchBot', 'PerplexityBot', 'Claude-SearchBot', 'Sitemap:']) {
    if (!r.includes(bot)) errors.push(`robots.txt missing ${bot}`);
  }
}
if (!existsSync(sitemap)) errors.push('missing sitemap-index.xml');

// Broken internal links
const defined = new Set(
  pages.map((p) => {
    let url = '/' + p.replace(dist, '').replace(/\\/g, '/').replace(/^\//, '').replace(/index\.html$/, '');
    if (!url.endsWith('/') && !url.endsWith('.html')) url += '/';
    url = url.replace(/\/+/g, '/');
    if (url.endsWith('.html')) url = url.replace(/\.html$/, '');
    return url === '' ? '/' : url;
  }),
);

const allHrefs = new Set();
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    let href = m[1];
    if (!href.endsWith('/') && !href.includes('.')) href += '/';
    allHrefs.add(href);
  }
}

for (const href of allHrefs) {
  if (href.startsWith('/embed/')) continue;
  if (href.match(/\.(xml|txt|svg|png|webmanifest|css|js|ico)$/)) continue;
  const asIndex = join(dist, href.replace(/^\//, ''), 'index.html');
  const asFile = join(dist, href.replace(/^\//, ''));
  if (!existsSync(asIndex) && !existsSync(asFile) && !defined.has(href)) {
    errors.push(`broken internal link: ${href}`);
  }
}

console.log(
  `SEO audit: ${pages.length} pages, ${toolPageFiles.length} tools, ${guidePageFiles.length} guides`,
);
if (warnings.length) {
  console.log('Warnings:');
  warnings.slice(0, 40).forEach((w) => console.log('  ⚠', w));
}
if (errors.length) {
  console.error('Errors:');
  errors.forEach((e) => console.error('  ✗', e));
  process.exit(1);
}
console.log('SEO audit passed');
