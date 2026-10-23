import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';
import { TOOLS, CATEGORIES } from '../lib/tools';
import { GUIDES } from '../data/guides';

export const GET: APIRoute = () => {
  const toolLines = TOOLS.map(
    (t) => `- [${t.title}](${siteConfig.siteUrl}${t.path}): ${t.description}`,
  ).join('\n');

  const guideLines = GUIDES.map(
    (g) =>
      `- [${g.title}](${siteConfig.siteUrl}/guides/${g.slug}/): ${g.description}`,
  ).join('\n');

  const hubLines = CATEGORIES.map(
    (c) => `- [${c.name}](${siteConfig.siteUrl}${c.path}): ${c.description}`,
  ).join('\n');

  const body = `# ${siteConfig.siteName}

> ${siteConfig.tagline}. All math runs in the browser; nothing is uploaded.

Canonical origin: ${siteConfig.siteUrl}/
Contact: ${siteConfig.contactEmail}
Sitemap: ${siteConfig.siteUrl}/sitemap-index.xml
Methodology: ${siteConfig.siteUrl}/methodology/

## Hubs

${hubLines}
- [All tools](${siteConfig.siteUrl}/tools/): Full calculator index
- [Guides](${siteConfig.siteUrl}/guides/): How-to articles paired with calculators
- [Reference](${siteConfig.siteUrl}/reference/): Charts and converters
- [Yarn weights](${siteConfig.siteUrl}/reference/yarn-weights/): Craft Yarn Council categories
- [Quilt sizes](${siteConfig.siteUrl}/reference/quilt-sizes/): Common quilt and mattress sizes

## Calculators

${toolLines}

## Guides

${guideLines}

## Optional

- [About](${siteConfig.siteUrl}/about/)
- [Contact](${siteConfig.siteUrl}/contact/)
- [Privacy](${siteConfig.siteUrl}/privacy/)
- [Terms](${siteConfig.siteUrl}/terms/)
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
