import { CANONICAL_PERSON_ID, siteConfig } from '../config/site';

const orgId = () => `${siteConfig.siteUrl}/#organization`;
const websiteId = () => `${siteConfig.siteUrl}/#website`;

export function personRef(extra: Record<string, unknown> = {}) {
  return {
    '@type': 'Person',
    '@id': CANONICAL_PERSON_ID,
    name: siteConfig.defaultAuthor.name,
    url: `${siteConfig.siteUrl}/about/`,
    sameAs: siteConfig.defaultAuthor.sameAs,
    ...extra,
  };
}

/** Home page @graph: WebSite + Organization + Person */
export function homeGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId(),
        name: siteConfig.siteName,
        alternateName: [siteConfig.siteShortName],
        url: `${siteConfig.siteUrl}/`,
        inLanguage: 'en',
        description: siteConfig.tagline,
        publisher: { '@id': orgId() },
      },
      {
        '@type': 'Organization',
        '@id': orgId(),
        name: siteConfig.siteName,
        url: `${siteConfig.siteUrl}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${siteConfig.siteUrl}/logo-512.png`,
          width: 512,
          height: 512,
        },
        email: siteConfig.contactEmail,
        founder: { '@id': CANONICAL_PERSON_ID },
        publishingPrinciples: `${siteConfig.siteUrl}/methodology/`,
      },
      personRef(),
    ],
  };
}

export function aboutProfilePage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: `${siteConfig.launched}T00:00:00+05:00`,
    dateModified: `${siteConfig.lastReviewed}T00:00:00+05:00`,
    mainEntity: personRef({
      description: siteConfig.defaultAuthor.bio,
      knowsAbout: [
        'knitting calculators',
        'crochet yardage',
        'quilt backing math',
        'Craft Yarn Council standards',
      ],
    }),
  };
}

export function toolPageGraph(opts: {
  name: string;
  description: string;
  path: string;
  pageTitle: string;
  citations: string[];
  faqs?: [string, string][];
  primaryImage?: string;
}) {
  const pageUrl = `${siteConfig.siteUrl}${opts.path}`;
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebApplication',
      '@id': `${pageUrl}#app`,
      name: opts.name,
      description: opts.description,
      url: pageUrl,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: personRef(),
      publisher: { '@id': orgId() },
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: opts.pageTitle,
      isPartOf: { '@id': websiteId() },
      mainEntity: { '@id': `${pageUrl}#app` },
      datePublished: `${siteConfig.launched}T00:00:00+05:00`,
      dateModified: `${siteConfig.lastReviewed}T00:00:00+05:00`,
      lastReviewed: siteConfig.lastReviewed,
      author: { '@id': CANONICAL_PERSON_ID },
      citation: opts.citations,
      ...(opts.primaryImage
        ? {
            primaryImageOfPage: {
              '@type': 'ImageObject',
              url: `${siteConfig.siteUrl}${opts.primaryImage}`,
              width: 1200,
              height: 900,
            },
          }
        : {}),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: `${siteConfig.siteUrl}/tools/` },
        { '@type': 'ListItem', position: 3, name: opts.name, item: pageUrl },
      ],
    },
  ];

  if (opts.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: opts.faqs.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export function collectionPageGraph(opts: {
  name: string;
  description: string;
  path: string;
  crumbs: { name: string; path: string }[];
}) {
  const pageUrl = `${siteConfig.siteUrl}${opts.path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#collection`,
        name: opts.name,
        description: opts.description,
        url: pageUrl,
        isPartOf: { '@id': websiteId() },
        author: { '@id': CANONICAL_PERSON_ID },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: opts.crumbs.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          item: `${siteConfig.siteUrl}${c.path}`,
        })),
      },
    ],
  };
}
