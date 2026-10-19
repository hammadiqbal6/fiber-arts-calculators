/**
 * Owner configuration — fill these placeholders before launch.
 * All brand/domain/analytics/ads values live here (or via env overrides).
 *
 * Build-time env: see `.env.example`. Cloudflare Workers Builds should set
 * PUBLIC_SITE_URL (and optional PUBLIC_GA4_MEASUREMENT_ID) so Astro bakes them in.
 */
const DEFAULT_SITE_URL =
  'https://fiber-arts-calculators.hammadiqbal117.workers.dev';

function envString(value: string | undefined, fallback = ''): string {
  const trimmed = (value ?? '').trim();
  return trimmed || fallback;
}

export const siteConfig = {
  /** Public site origin (no trailing slash). Used for canonicals, sitemap, OG, robots, llms. */
  siteUrl: envString(import.meta.env.PUBLIC_SITE_URL, DEFAULT_SITE_URL).replace(
    /\/$/,
    '',
  ),
  /** Display name shown in nav, footer, schema. */
  siteName: envString(import.meta.env.PUBLIC_SITE_NAME, 'FiberCalc'),
  /** Short tagline for homepage and Organization schema. */
  tagline: 'Free knitting, crochet, sewing & quilting calculators',
  /** Neutral placeholder contact — replace before AdSense / launch. */
  contactEmail: envString(
    import.meta.env.PUBLIC_CONTACT_EMAIL,
    'hello@example.com',
  ),
  /** Legal entity / publisher name for Privacy, Terms, Organization. */
  legalName: envString(import.meta.env.PUBLIC_LEGAL_NAME, 'FiberCalc'),
  /** Default locale */
  locale: 'en_US',
  /** Author shown in bylines (placeholder bio on /authors/). */
  defaultAuthor: {
    name: 'FiberCalc Editorial',
    slug: 'editorial',
    role: 'Editor',
  },
  /** Google AdSense publisher ID. Leave empty to keep ads disabled. */
  adsensePublisherId: envString(import.meta.env.PUBLIC_ADSENSE_PUBLISHER_ID),
  /** Enable AdSense slots only when publisher ID is set AND this is true. */
  adsenseEnabled: envString(import.meta.env.PUBLIC_ADSENSE_ENABLED, 'false') === 'true',
  /** GA4 measurement ID, e.g. G-XXXXXXXX. Empty = no analytics script. */
  ga4MeasurementId: envString(import.meta.env.PUBLIC_GA4_MEASUREMENT_ID),
  /** Google Search Console HTML tag content value (meta name="google-site-verification"). */
  googleSiteVerification: envString(
    import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION,
  ),
  /** Bing Webmaster verification meta content. */
  bingSiteVerification: envString(import.meta.env.PUBLIC_BING_SITE_VERIFICATION),
  /** IndexNow key (also place public file at /{key}.txt). */
  indexNowKey: envString(import.meta.env.PUBLIC_INDEXNOW_KEY),
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
