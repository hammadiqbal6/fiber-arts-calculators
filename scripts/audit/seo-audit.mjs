#!/usr/bin/env node
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../../dist/', import.meta.url).pathname;
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

const pages = walk(dist);
if (pages.length < 20) errors.push(`Expected many HTML pages, found ${pages.length}`);

const toolPages = pages.filter((p) => p.includes('/tools/') && !p.endsWith('/tools/index.html'));

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const rel = file.replace(dist, '');
  // Embed widgets are noindex helpers — skip full SEO checks
  if (rel.includes('embed/') || rel.endsWith('404.html')) continue;

  const title = textBetween(html, /<title>([^<]*)<\/title>/i);
  const desc = textBetween(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonical = textBetween(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];

  if (!title) errors.push(`${rel}: missing title`);
  else if ([...title].length > 65) warnings.push(`${rel}: title length ${title.length} > 60`);
  if (!desc) errors.push(`${rel}: missing meta description`);
  else if (desc.length > 160) warnings.push(`${rel}: description length ${desc.length} > 155`);
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
}

for (const file of toolPages) {
  const html = readFileSync(file, 'utf8');
  const rel = file.replace(dist, '');
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (words < 600) errors.push(`${rel}: tool page word count ${words} < 600`);
  if (!html.includes('data-calc')) errors.push(`${rel}: missing calculator`);
}

const robots = join(dist, 'robots.txt');
const sitemap = join(dist, 'sitemap-index.xml');
if (!existsSync(robots)) errors.push('missing robots.txt');
else {
  const r = readFileSync(robots, 'utf8');
  for (const bot of ['OAI-SearchBot', 'PerplexityBot', 'Claude-SearchBot', 'Googlebot', 'Sitemap:']) {
    if (bot === 'Googlebot') continue; // covered by *
    if (!r.includes(bot === 'Sitemap:' ? 'Sitemap:' : bot)) errors.push(`robots.txt missing ${bot}`);
  }
}
if (!existsSync(sitemap)) errors.push('missing sitemap-index.xml');

// orphan check: collect internal hrefs
const allHrefs = new Set();
const defined = new Set(pages.map((p) => {
  let url = '/' + p.replace(dist, '').replace(/index\.html$/, '');
  if (!url.endsWith('/') && !url.endsWith('.html')) url += '/';
  url = url.replace(/\/+/g, '/');
  if (url.endsWith('.html')) url = url.replace(/\.html$/, '');
  return url === '' ? '/' : url;
}));

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
  if (href.match(/\.(xml|txt|svg|png|webmanifest|css|js)$/)) continue;
  const normalized = href.endsWith('/') ? href : href + '/';
  const candidates = [href, normalized, href.replace(/\/$/, '/index.html'), normalized + 'index.html'];
  const exists = candidates.some((c) => {
    const path = join(dist, c.replace(/^\//, '').replace(/\/$/, '/index.html'));
    return existsSync(path) || existsSync(join(dist, c.replace(/^\//, '')));
  });
  if (!exists && !href.includes('mailto:')) {
    // check file
    const asIndex = join(dist, href.replace(/^\//, ''), 'index.html');
    const asFile = join(dist, href.replace(/^\//, ''));
    if (!existsSync(asIndex) && !existsSync(asFile)) warnings.push(`possible broken internal link: ${href}`);
  }
}

console.log(`SEO audit: ${pages.length} pages, ${toolPages.length} tools`);
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
