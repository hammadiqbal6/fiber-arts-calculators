/**
 * Owner configuration — brand/domain/analytics/ads values live here
 * (or via PUBLIC_* env overrides; see `.env.example`).
 *
 * Cloudflare Workers Builds should set the PUBLIC_* vars listed in `.env.example`
 * so Astro bakes them into static HTML.
 *
 * Canonical origin: PUBLIC_SITE_URL (fallback DEFAULT_SITE_URL in defaults.mjs).
 * Used for canonicals, sitemap, robots Sitemap:, llms.txt, JSON-LD, OG, IndexNow.
 * See docs/CUSTOM-DOMAIN.md before changing domains.
 */
import { DEFAULT_SITE_URL, DEFAULT_INDEXNOW_KEY } from './defaults.mjs';

/** Shared across all five tool sites so Google can resolve one Person entity. */
export const CANONICAL_PERSON_ID = 'https://github.com/hammadiqbal6#person';
export const AUTHOR_GITHUB = 'https://github.com/hammadiqbal6';

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
  'Hammad Iqbal',
);

const defaultAuthorBio = envString(
  import.meta.env.PUBLIC_AUTHOR_BIO,
  'Full-stack developer who builds free, in-browser calculators. I maintain FiberCalc as a one-person project: every formula and Craft Yarn Council citation on these pages is checked by me. I am not a professional knitting instructor, pattern designer, or textile engineer.',
);

export const siteConfig = {
  /** Public site origin (no trailing slash). Used for canonicals, sitemap, OG, robots, llms. */
  siteUrl: envString(import.meta.env.PUBLIC_SITE_URL, DEFAULT_SITE_URL).replace(
    /\/$/,
    '',
  ),
  /** Display name shown in nav, footer, schema. */
  siteName,
  /** Short name for PWA / apple-mobile-web-app-title */
  siteShortName: envString(import.meta.env.PUBLIC_SITE_SHORT_NAME, 'FiberCalc'),
  /** Short tagline for homepage and Organization schema. */
  tagline: 'Free knitting, crochet, sewing & quilting calculators',
  /** Public contact email (footer, Contact/Privacy/Terms, Organization JSON-LD). */
  contactEmail,
  /** Legal entity / publisher name for Privacy, Terms, Organization. */
  legalName: envString(import.meta.env.PUBLIC_LEGAL_NAME, 'FiberCalc'),
  /** Default locale */
  locale: 'en_US',
  /** Author shown in bylines (/about/#maintainer, tool/guide credits). */
  defaultAuthor: {
    name: defaultAuthorName,
    bio: defaultAuthorBio,
    slug: 'hammad-iqbal',
    role: 'Maintainer',
    sameAs: [AUTHOR_GITHUB] as string[],
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
  /** Default OG image path relative to site root (PNG 1200×630). */
  defaultOgImage: '/og-default.png',
  defaultOgImageWidth: 1200,
  defaultOgImageHeight: 630,
  defaultOgImageAlt:
    'FiberCalc — free knitting, crochet, sewing and quilting calculators',
  /** First public release date (YYYY-MM-DD). datePublished stays fixed. */
  launched: '2026-10-19',
  /**
   * Last content review date. Change only when formulas, sources, or tool copy
   * actually change (Google helpful-content guidance).
   */
  lastReviewed: '2026-10-23',
  /** Calculator package version shown in TrustBlock. */
  calculatorVersion: '1.0',
  /** Theme color for manifest / browser UI */
  themeColor: '#2f5d50',
} as const;

export type SiteConfig = typeof siteConfig;
