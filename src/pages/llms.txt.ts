import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';

export const GET: APIRoute = () => {
  const body = `# ${siteConfig.siteName} llms.txt
# Optional machine-readable site summary (Google Search ignores this file)
Name: ${siteConfig.siteName}
Description: ${siteConfig.tagline}
Homepage: ${siteConfig.siteUrl}/
Tools: ${siteConfig.siteUrl}/tools/
Guides: ${siteConfig.siteUrl}/guides/
Contact: ${siteConfig.siteUrl}/contact/
Sitemap: ${siteConfig.siteUrl}/sitemap-index.xml
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
