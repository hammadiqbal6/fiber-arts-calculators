/**
 * Owner configuration — brand/domain/analytics/ads values live here
 * (or via PUBLIC_* env overrides; see `.env.example`).
 *
 * Cloudflare Workers Builds should set the PUBLIC_* vars listed in `.env.example`
 * so Astro bakes them into static HTML.
 */
const DEFAULT_SITE_URL =
  'https://fiber-arts-calculators.hammadiqbal117.workers.dev';
const DEFAULT_INDEXNOW_KEY = '9638154d8d3e54b9c2ce62eb17469c43';

function envString(value: string | undefined, fallback = ''): string {
  const trimmed = (value ?? '').trim();
  return trimmed || fallback;
}

const siteName = envString(import.meta.env.PUBLIC_SITE_NAME, 'FiberCalc');
const contactEmail = envString(
  import.meta.env.PUBLIC_CONTACT_EMAIL,
  'hammadiqbal117@gmail.com',
);

const defaultAuthorName = envString(
  import.meta.env.PUBLIC_AUTHOR_NAME,
  `${siteName} Team`,
);

const defaultAuthorBio = envString(
  import.meta.env.PUBLIC_AUTHOR_BIO,
  `${siteName} is built and maintained by an independent developer. Calculator documentation, worked examples, and reference tables are based on publicly cited sources (including Craft Yarn Council standards where noted on each page). For questions about formulas or content, email ${contactEmail}.`,
);

export const siteConfig = {
  /** Public site origin (no trailing slash). Used for canonicals, sitemap, OG, robots, llms. */
  siteUrl: envString(import.meta.env.PUBLIC_SITE_URL, DEFAULT_SITE_URL).replace(
    /\/$/,
    '',
  ),
  /** Display name shown in nav, footer, schema. */
  siteName,
  /** Short tagline for homepage and Organization schema. */
  tagline: 'Free knitting, crochet, sewing & quilting calculators',
  /** Public contact email (footer, Contact/Privacy/Terms, Organization JSON-LD). */
  contactEmail,
  /** Legal entity / publisher name for Privacy, Terms, Organization. */
  legalName: envString(import.meta.env.PUBLIC_LEGAL_NAME, 'FiberCalc'),
  /** Default locale */
  locale: 'en_US',
  /** Author shown in bylines (/authors/, tool/guide credits). */
  defaultAuthor: {
    name: defaultAuthorName,
    bio: defaultAuthorBio,
    slug: 'editorial',
    role: 'Editor',
  },
  /** Google AdSense publisher ID. Leave empty to keep ads disabled. */
  adsensePublisherId: envString(import.meta.env.PUBLIC_ADSENSE_PUBLISHER_ID),
  /** Enable AdSense slots only when publisher ID is set AND this is true. */
  adsenseEnabled:
    envString(import.meta.env.PUBLIC_ADSENSE_ENABLED, 'false') === 'true',
  /** GA4 measurement ID, e.g. G-XXXXXXXX. Empty = no analytics script. */
  ga4MeasurementId: envString(import.meta.env.PUBLIC_GA4_MEASUREMENT_ID),
  /**
   * Google Search Console HTML tag content value (meta name="google-site-verification").
   * Prefer PUBLIC_GSC_VERIFICATION; PUBLIC_GOOGLE_SITE_VERIFICATION remains as a legacy alias.
   */
  googleSiteVerification: envString(
    import.meta.env.PUBLIC_GSC_VERIFICATION ||
      import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION,
  ),
  /** Bing Webmaster verification meta content. */
  bingSiteVerification: envString(import.meta.env.PUBLIC_BING_SITE_VERIFICATION),
  /** IndexNow key (also place public file at /{key}.txt). Prefer INDEXNOW_KEY in the ping script. */
  indexNowKey: envString(
    import.meta.env.PUBLIC_INDEXNOW_KEY,
    DEFAULT_INDEXNOW_KEY,
  ),
  /** Social handles (optional). */
  twitterHandle: envString(import.meta.env.PUBLIC_TWITTER_HANDLE),
  /** Default OG image path relative to site root. */
  defaultOgImage: '/og-default.svg',
  /** Build / content dates */
  launched: '2026-10-19',
  /** Theme color for manifest / browser UI */
  themeColor: '#2f5d50',
} as const;

export type SiteConfig = typeof siteConfig;
