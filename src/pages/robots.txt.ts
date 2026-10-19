import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';

export const GET: APIRoute = () => {
  const body = `# ${siteConfig.siteName} robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /*?utm_

# AI search / answer engines (allow to be cited)
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Claude-SearchBot
Allow: /

# AI model training — documented choice: allow (disallow does not affect Google Search ranking)
# To opt out of training while staying in AI search answers, set these to Disallow.
User-agent: GPTBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: CCBot
Allow: /

Sitemap: ${siteConfig.siteUrl}/sitemap-index.xml
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
