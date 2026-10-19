#!/usr/bin/env node
/**
 * Submit URLs to IndexNow (Bing, Yandex, etc.). Google does not participate.
 * Usage: PUBLIC_SITE_URL=https://example.com PUBLIC_INDEXNOW_KEY=... node scripts/indexnow.mjs [url1 url2 ...]
 */
const siteUrl = (process.env.PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, '');
const key = process.env.PUBLIC_INDEXNOW_KEY || '00000000000000000000000000000000';
const urls = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [`${siteUrl}/`, `${siteUrl}/sitemap-index.xml`];

const body = {
  host: new URL(siteUrl).host,
  key,
  keyLocation: `${siteUrl}/${key}.txt`,
  urlList: urls,
};

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});
console.log('IndexNow status', res.status, await res.text());
