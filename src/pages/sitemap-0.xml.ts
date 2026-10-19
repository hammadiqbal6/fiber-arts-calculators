import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';
import { TOOLS } from '../lib/tools';
import { GUIDES } from '../data/guides';

export const GET: APIRoute = () => {
  const staticPaths = [
    '/',
    '/tools/',
    '/knitting-crochet/',
    '/sewing/',
    '/quilting/',
    '/reference/',
    '/reference/yarn-weights/',
    '/reference/quilt-sizes/',
    '/guides/',
    '/about/',
    '/contact/',
    '/privacy/',
    '/terms/',
    '/methodology/',
    '/authors/',
  ];
  const urls = [
    ...staticPaths,
    ...TOOLS.map((t) => t.path),
    ...GUIDES.map((g) => `/guides/${g.slug}/`),
  ];
  const lastmod = siteConfig.launched;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${siteConfig.siteUrl}${path}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
