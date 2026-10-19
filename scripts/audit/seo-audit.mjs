import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, '../../dist');
const errors = [];
const warnings = [];

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.name === 'index.html' || ent.name === '404.html') out.push(p);
  }
  return out;
}

function textBetween(html, re) {
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

const pages = walk(dist).filter((p) => !p.includes(`${path.sep}embed${path.sep}`));
if (pages.length < 20) errors.push(`Expected >=20 HTML pages, found ${pages.length}`);

const titles = new Map();
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(dist, file);
  const title = textBetween(html, /<title>([^<]*)<\/title>/i);
  const desc = textBetween(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonical = textBetween(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  const og = /property="og:title"/i.test(html);
  const jsonld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];

  if (!title) errors.push(`${rel}: missing title`);
  else {
    const plain = title.replace(/\s+/g, ' ');
    if (plain.length > 65) warnings.push(`${rel}: title length ${plain.length} > 60–65`);
    if (titles.has(plain)) errors.push(`${rel}: duplicate title with ${titles.get(plain)}`);
    titles.set(plain, rel);
  }
  if (!desc) errors.push(`${rel}: missing meta description`);
  else if (desc.length > 160) warnings.push(`${rel}: description length ${desc.length}`);
  if (!canonical) errors.push(`${rel}: missing canonical`);
  if (h1s.length !== 1 && !rel.endsWith('404.html')) errors.push(`${rel}: expected 1 H1, found ${h1s.length}`);
  if (!og) errors.push(`${rel}: missing og:title`);
  for (const [, raw] of jsonld) {
    try {
      JSON.parse(raw);
    } catch {
      errors.push(`${rel}: invalid JSON-LD`);
    }
  }

  // Tool pages: rough word count in main
  if (rel.includes(`${path.sep}tools${path.sep}`)) {
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ');
    const words = text.split(' ').filter(Boolean).length;
    if (words < 400) errors.push(`${rel}: tool page word count too low (${words})`);
  }

  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)];
  for (const [tag] of imgs) {
    if (!/\balt=/i.test(tag)) errors.push(`${rel}: img missing alt`);
  }
}

const robots = path.join(dist, 'robots.txt');
if (!fs.existsSync(robots)) errors.push('missing robots.txt');
else {
  const r = fs.readFileSync(robots, 'utf8');
  for (const bot of ['OAI-SearchBot', 'PerplexityBot', 'Claude-SearchBot']) {
    if (!r.includes(bot)) errors.push(`robots.txt missing ${bot}`);
  }
  if (!/Sitemap:/i.test(r)) errors.push('robots.txt missing Sitemap');
}

const sm = ['sitemap-index.xml', 'sitemap-0.xml'].map((f) => path.join(dist, f));
if (!sm.some((f) => fs.existsSync(f))) errors.push('missing sitemap xml');

// orphan check: collect internal hrefs
const hrefs = new Set();
const pageUrls = new Set();
for (const file of pages) {
  const rel = path.relative(dist, file).replace(/index\.html$/, '').replace(/\\/g, '/');
  const url = '/' + (rel === '404.html' ? '404' : rel);
  pageUrls.add(url.endsWith('/') || url === '/404' ? url : url + '/');
  if (rel === '') pageUrls.add('/');
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) hrefs.add(m[1]);
}

for (const file of pages) {
  const rel = path.relative(dist, file);
  if (rel === '404.html' || rel.includes('embed')) continue;
  const url =
    '/' +
    rel
      .replace(/index\.html$/, '')
      .replace(/\\/g, '/');
  const normalized = url === '/' ? '/' : url.endsWith('/') ? url : url + '/';
  // skip orphan detection for homepage
}

console.log(`SEO audit: ${pages.length} pages, ${errors.length} errors, ${warnings.length} warnings`);
for (const w of warnings) console.warn('WARN', w);
if (errors.length) {
  for (const e of errors) console.error('ERR', e);
  process.exit(1);
}
console.log('SEO audit passed');
