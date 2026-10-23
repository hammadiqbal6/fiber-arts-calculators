#!/usr/bin/env node
/**
 * Hard SEO guardrails — fail the build if dist/ regresses indexing bugs
 * documented in docs/SEO-GUARDRAILS.md.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const dist = join(root, 'dist');
const errors = [];

const PLACEHOLDER_KEY = '00000000000000000000000000000000';
const FORBIDDEN_HOST = 'example.com';

function fail(msg) {
  errors.push(msg);
}

function walkHtml(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(p, files);
    else if (ent.name === 'index.html' || ent.name === '404.html') files.push(p);
  }
  return files;
}

function readIfExists(rel) {
  const p = join(dist, rel);
  return existsSync(p) ? readFileSync(p, 'utf8') : null;
}

function textBetween(html, re) {
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

if (!existsSync(dist)) {
  console.error('seo-guardrails: dist/ missing — run npm run build first');
  process.exit(1);
}

const textSurfaces = ['sitemap-index.xml', 'sitemap-0.xml', 'robots.txt', 'llms.txt', '_redirects'];
for (const rel of textSurfaces) {
  const text = readIfExists(rel);
  if (text == null) {
    if (rel.startsWith('sitemap')) fail(`missing ${rel}`);
    continue;
  }
  if (text.toLowerCase().includes(FORBIDDEN_HOST)) fail(`${rel} contains ${FORBIDDEN_HOST}`);
}

const htmlFiles = walkHtml(dist);
for (const file of htmlFiles) {
  const rel = relative(dist, file).replace(/\\/g, '/');
  const html = readFileSync(file, 'utf8');
  if (rel.includes('embed/') || rel === '404.html') continue;

  if (html.toLowerCase().includes(FORBIDDEN_HOST)) {
    fail(`${rel}: contains ${FORBIDDEN_HOST}`);
  }

  const title = textBetween(html, /<title>([^<]*)<\/title>/i);
  const desc = textBetween(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonical = textBetween(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const ogImage = textBetween(html, /<meta\s+property="og:image"\s+content="([^"]*)"/i);
  const h1s = [...html.matchAll(/<h1\b[^>]*>/gi)];

  if (!title) fail(`${rel}: missing title`);
  else if ([...title].length > 60) fail(`${rel}: title length ${[...title].length} > 60`);

  if (!desc) fail(`${rel}: missing meta description`);
  else if (desc.length < 50 || desc.length > 165) {
    fail(`${rel}: meta description length ${desc.length} outside 50–165`);
  }

  if (!canonical) fail(`${rel}: missing canonical`);
  if (h1s.length !== 1) fail(`${rel}: expected 1 H1, found ${h1s.length}`);

  if (ogImage && /\/$/.test(ogImage)) {
    fail(`${rel}: og:image ends with trailing slash (${ogImage})`);
  }

  // Inline classic scripts must not contain import (GA bug)
  const inlineScripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const block of inlineScripts) {
    const attrs = block[0].slice(0, block[0].indexOf('>') + 1);
    const body = block[1];
    const isModule = /type=["']module["']/i.test(attrs);
    const isJsonLd = /type=["']application\/ld\+json["']/i.test(attrs);
    if (isJsonLd) {
      try {
        JSON.parse(body);
      } catch {
        fail(`${rel}: invalid JSON-LD`);
      }
      continue;
    }
    if (!isModule && /^\s*import\s+/m.test(body)) {
      fail(`${rel}: inline non-module script contains import (use bundled module script)`);
    }
  }
}

// IndexNow
const placeholderPath = join(dist, `${PLACEHOLDER_KEY}.txt`);
if (existsSync(placeholderPath)) fail(`placeholder IndexNow key in dist/`);
const publicPlaceholder = join(root, 'public', `${PLACEHOLDER_KEY}.txt`);
if (existsSync(publicPlaceholder)) fail(`placeholder IndexNow key in public/`);

const keyFiles = readdirSync(dist).filter(
  (n) => /^[a-f0-9]{32}\.txt$/i.test(n) && n.toLowerCase() !== `${PLACEHOLDER_KEY}.txt`,
);
if (keyFiles.length === 0) {
  fail('no IndexNow key file in dist/ (expected public/<32-hex>.txt)');
} else {
  for (const name of keyFiles) {
    const body = readFileSync(join(dist, name), 'utf8').trim();
    const key = name.replace(/\.txt$/i, '');
    if (body !== key) fail(`IndexNow file ${name} content must equal the key`);
  }
}

const redirects = readIfExists('_redirects') || '';
if (!/\/sitemap\.xml\s+\/sitemap-index\.xml\s+30[18]\b/.test(redirects)) {
  fail('dist/_redirects missing `/sitemap.xml` → `/sitemap-index.xml` 301/308');
}

const wranglerPath = join(root, 'wrangler.jsonc');
if (existsSync(wranglerPath)) {
  const wrangler = readFileSync(wranglerPath, 'utf8');
  if (!/"html_handling"\s*:\s*"force-trailing-slash"/.test(wrangler)) {
    fail('wrangler.jsonc missing assets.html_handling: "force-trailing-slash"');
  }
  if (!/"previews"\s*:\s*\{/.test(wrangler)) {
    fail('wrangler.jsonc missing "previews": {} (required by npx wrangler preview)');
  }
  if (!/"run_worker_first"\s*:\s*true/.test(wrangler)) {
    fail('wrangler.jsonc missing assets.run_worker_first: true (308 trailing-slash worker)');
  }
  const stripped = wrangler.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
  const withoutPreviews = stripped.replace(/"previews"\s*:\s*\{[\s\S]*?\}/, '');
  if (/"vars"\s*:\s*\{/.test(withoutPreviews)) {
    fail('wrangler.jsonc has top-level vars — breaks wrangler preview; use dashboard PUBLIC_*');
  }
}

const workerPath = join(root, 'src/worker.ts');
if (!existsSync(workerPath)) fail('missing src/worker.ts (308 trailing-slash)');
else {
  const w = readFileSync(workerPath, 'utf8');
  if (!/\{1,\s*16\}/.test(w) && !/\{1,16\}/.test(w)) {
    fail('src/worker.ts FILE_EXT should allow long extensions like .webmanifest ({1,16})');
  }
  if (!/\b308\b/.test(w)) fail('src/worker.ts must redirect with 308');
}

console.log('SEO guardrails:', { pages: htmlFiles.length, errors: errors.length });
if (errors.length) {
  errors.forEach((e) => console.error('ERROR', e));
  process.exit(1);
}
console.log('SEO guardrails passed.');
