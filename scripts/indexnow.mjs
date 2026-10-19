#!/usr/bin/env node
/**
 * IndexNow ping (Bing/Yandex). Not used by Google.
 * Usage: PUBLIC_SITE_URL=https://example.com PUBLIC_INDEXNOW_KEY=yourkey node scripts/indexnow.mjs
 */
const siteUrl = process.env.PUBLIC_SITE_URL || 'https://fibercalc.example';
const key = process.env.PUBLIC_INDEXNOW_KEY;
if (!key) {
  console.error('Set PUBLIC_INDEXNOW_KEY');
  process.exit(1);
}
const host = new URL(siteUrl).host;
const urlList = [
  `${siteUrl}/`,
  `${siteUrl}/tools/yarn-blanket-calculator/`,
  `${siteUrl}/sitemap-index.xml`,
];
const body = { host, key, urlList };
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});
console.log('IndexNow status', res.status, await res.text());
