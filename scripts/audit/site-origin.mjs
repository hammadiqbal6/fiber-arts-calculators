#!/usr/bin/env node
/**
 * Enforce a single canonical origin setting.
 * - DEFAULT_SITE_URL lives only in src/config/defaults.mjs
 * - This site's *.workers.dev hostname must not be hardcoded elsewhere in src/
 *   (pages, components, lib, data, scripts except indexnow which imports defaults).
 * - dist/ SEO surfaces must use siteConfig.siteUrl (whatever PUBLIC_SITE_URL was).
 *
 * See docs/CUSTOM-DOMAIN.md.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const { DEFAULT_SITE_URL } = await import('../../src/config/defaults.mjs');

const HOST = new URL(DEFAULT_SITE_URL).host; // fiber-arts-calculators....workers.dev
const errors = [];

/** Paths (repo-relative) allowed to mention this site's workers.dev host. */
const ALLOW_PREFIXES = [
  'src/config/defaults.mjs',
  'src/config/sister-sites.ts', // cross-site fallbacks; env-overridable
  '.env.example',
  '.github/workflows/',
  'docs/',
  'README.md',
  'PROGRESS.md',
  'scripts/audit/site-origin.mjs',
];

function isAllowed(rel) {
  const n = rel.replace(/\\/g, '/');
  return ALLOW_PREFIXES.some((p) => n === p || n.startsWith(p));
}

function walkFiles(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === '.git') continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walkFiles(p, out);
    else if (/\.(ts|tsx|astro|mjs|js|cjs|json|jsonc|md|txt|yml|yaml|example)$/i.test(name)) {
      out.push(p);
    }
  }
  return out;
}

// --- Source: no hardcoded THIS-site workers.dev outside allowlist ---
for (const file of walkFiles(root)) {
  const rel = relative(root, file);
  if (isAllowed(rel)) continue;
  // indexnow may only import defaults — still flag if it re-hardcodes the URL string
  const text = readFileSync(file, 'utf8');
  if (text.includes(HOST)) {
    errors.push(`${rel}: hardcoded site host ${HOST} (use siteConfig.siteUrl / PUBLIC_SITE_URL)`);
  }
}

// --- defaults.mjs must export the expected single default ---
if (!DEFAULT_SITE_URL || !DEFAULT_SITE_URL.includes(HOST)) {
  errors.push('src/config/defaults.mjs DEFAULT_SITE_URL missing or unexpected');
}

// --- When PUBLIC_SITE_URL is a non-workers host, dist must not contain workers.dev for THIS site ---
const publicSiteUrl = (process.env.PUBLIC_SITE_URL || '').trim().replace(/\/$/, '');
if (publicSiteUrl && !publicSiteUrl.includes('workers.dev')) {
  const dist = join(root, 'dist');
  if (existsSync(dist)) {
    const surfaces = ['sitemap-index.xml', 'sitemap-0.xml', 'robots.txt', 'llms.txt'];
    for (const name of surfaces) {
      const p = join(dist, name);
      if (!existsSync(p)) continue;
      const text = readFileSync(p, 'utf8');
      if (text.includes(HOST)) {
        errors.push(`dist/${name}: still contains ${HOST} but PUBLIC_SITE_URL=${publicSiteUrl}`);
      }
    }
  }
}

// --- astro.config must use siteConfig.siteUrl (not a string literal host) ---
const astroCfg = readFileSync(join(root, 'astro.config.mjs'), 'utf8');
if (!astroCfg.includes('siteConfig.siteUrl') && !astroCfg.includes('siteConfig.site')) {
  // allow site: siteConfig.siteUrl
  if (!/site:\s*siteConfig\.siteUrl/.test(astroCfg)) {
    errors.push('astro.config.mjs must set site: siteConfig.siteUrl');
  }
}
if (astroCfg.includes(HOST)) {
  errors.push('astro.config.mjs must not hardcode the site host');
}

console.log(`site-origin audit: host=${HOST}`);
if (errors.length) {
  errors.forEach((e) => console.error('  ✗', e));
  process.exit(1);
}
console.log('site-origin audit passed');
