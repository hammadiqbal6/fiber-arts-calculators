#!/usr/bin/env node
/**
 * IndexNow ping (Bing/Yandex/etc.). Not used by Google.
 *
 * Reads built sitemap(s) from dist/, POSTs all <loc> URLs to api.indexnow.org
 * in batches of ≤10,000. Never fails the build/deploy (always exits 0).
 *
 * Usage:
 *   node scripts/indexnow.mjs
 *   node scripts/indexnow.mjs --dry-run
 *
 * Env:
 *   PUBLIC_SITE_URL   — site origin (default matches src/config/site.ts)
 *   INDEXNOW_KEY      — key override (default: committed key below)
 *   INDEXNOW_DISABLE=1 — skip entirely
 */
import { readFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_SITE_URL =
  'https://fiber-arts-calculators.hammadiqbal117.workers.dev';
const DEFAULT_KEY = '9638154d8d3e54b9c2ce62eb17469c43';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH_SIZE = 10_000;

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

const dryRun = process.argv.includes('--dry-run');

function exitOk(message) {
  if (message) console.log(message);
  process.exit(0);
}

function extractLocs(xml) {
  const locs = [];
  const re = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
  let m;
  while ((m = re.exec(xml)) !== null) {
    locs.push(m[1].trim());
  }
  return locs;
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function collectUrls() {
  const indexPath = join(DIST, 'sitemap-index.xml');
  const urls = new Set();

  if (await fileExists(indexPath)) {
    const indexXml = await readFile(indexPath, 'utf8');
    const childLocs = extractLocs(indexXml);
    for (const childUrl of childLocs) {
      let childPath;
      try {
        const pathname = new URL(childUrl).pathname.replace(/^\//, '');
        childPath = join(DIST, pathname);
      } catch {
        continue;
      }
      if (!(await fileExists(childPath))) {
        console.warn(`IndexNow: missing child sitemap ${childPath}`);
        continue;
      }
      const childXml = await readFile(childPath, 'utf8');
      for (const loc of extractLocs(childXml)) urls.add(loc);
    }
    return [...urls];
  }

  // Fallback: single sitemap.xml or sitemap-0.xml in dist/
  const candidates = ['sitemap.xml', 'sitemap-0.xml'];
  for (const name of candidates) {
    const path = join(DIST, name);
    if (await fileExists(path)) {
      const xml = await readFile(path, 'utf8');
      for (const loc of extractLocs(xml)) urls.add(loc);
    }
  }
  return [...urls];
}

async function postBatch(payload) {
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  const text = await res.text().catch(() => '');
  console.log(
    `IndexNow HTTP ${res.status}${text ? ` ${text.slice(0, 200)}` : ''}`,
  );
  return res.status;
}

async function main() {
  if (process.env.INDEXNOW_DISABLE === '1') {
    exitOk('IndexNow: skipped (INDEXNOW_DISABLE=1)');
  }

  const siteUrl = (process.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(
    /\/$/,
    '',
  );
  const key = (process.env.INDEXNOW_KEY || DEFAULT_KEY).trim();
  if (!key) {
    exitOk('IndexNow: no key; skipping');
  }

  const host = new URL(siteUrl).host;
  const keyLocation = `${siteUrl}/${key}.txt`;
  const urlList = await collectUrls();

  if (urlList.length === 0) {
    exitOk('IndexNow: no URLs found in dist/ sitemaps; skipping');
  }

  console.log(`IndexNow: ${urlList.length} URL(s) from dist/ sitemaps`);

  const batches = [];
  for (let i = 0; i < urlList.length; i += BATCH_SIZE) {
    batches.push(urlList.slice(i, i + BATCH_SIZE));
  }

  if (dryRun) {
    console.log('IndexNow: --dry-run (no POST)');
    for (let i = 0; i < batches.length; i++) {
      const payload = {
        host,
        key,
        keyLocation,
        urlList: batches[i],
      };
      console.log(
        `Batch ${i + 1}/${batches.length}: ${batches[i].length} URLs`,
      );
      console.log(JSON.stringify(payload, null, 2));
    }
    exitOk('IndexNow: dry-run complete');
  }

  for (let i = 0; i < batches.length; i++) {
    const payload = {
      host,
      key,
      keyLocation,
      urlList: batches[i],
    };
    console.log(
      `IndexNow: posting batch ${i + 1}/${batches.length} (${batches[i].length} URLs)`,
    );
    await postBatch(payload);
  }

  exitOk('IndexNow: done');
}

main().catch((err) => {
  console.error('IndexNow: error (non-fatal)', err?.message || err);
  process.exit(0);
});
