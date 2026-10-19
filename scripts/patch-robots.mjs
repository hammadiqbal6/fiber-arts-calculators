import fs from 'node:fs';

const siteUrl = (process.env.PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, '');
const robotsPath = 'dist/robots.txt';
if (!fs.existsSync(robotsPath)) {
  console.error('dist/robots.txt missing — run build first');
  process.exit(1);
}
let robots = fs.readFileSync(robotsPath, 'utf8');
robots = robots.replace(/Sitemap:\s*\S+/g, `Sitemap: ${siteUrl}/sitemap-index.xml`);
fs.writeFileSync(robotsPath, robots);
console.log('Patched robots.txt sitemap to', siteUrl);
