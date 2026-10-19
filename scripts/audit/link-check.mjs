#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';

const dist = new URL('../../dist/', import.meta.url).pathname;
const errors = [];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

function resolveInternal(href) {
  if (!href.startsWith('/')) return null;
  const clean = href.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return join(dist, 'index.html');
  const asDir = join(dist, clean.replace(/^\//, ''), 'index.html');
  const asFile = join(dist, clean.replace(/^\//, ''));
  if (existsSync(asDir)) return asDir;
  if (existsSync(asFile)) return asFile;
  if (existsSync(join(dist, clean.replace(/^\//, '').replace(/\/$/, '') + '.html'))) {
    return join(dist, clean.replace(/^\//, '').replace(/\/$/, '') + '.html');
  }
  return null;
}

for (const file of walk(dist)) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) continue;
    if (href.endsWith('.xml') || href.endsWith('.txt') || href.endsWith('.webmanifest')) {
      const p = join(dist, href.replace(/^\//, ''));
      if (!existsSync(p)) errors.push(`${file}: missing ${href}`);
      continue;
    }
    if (href.startsWith('/')) {
      const resolved = resolveInternal(href);
      if (!resolved) errors.push(`${file.replace(dist, '')}: broken ${href}`);
    }
  }
}

if (errors.length) {
  errors.slice(0, 50).forEach((e) => console.error('✗', e));
  console.error(`… ${errors.length} broken link(s)`);
  process.exit(1);
}
console.log('Link check passed');
