/**
 * SINGLE SITE CONFIG — fill these placeholders before launch.
 * Owner-specific values only live here (or via matching env vars).
 */
export const siteConfig = {
  /** Public site name (brand) */
  brandName: 'StitchCalc',
  /** Short tagline used in OG / about */
  tagline: 'Free knitting, crochet, sewing & quilting calculators',
  /**
   * Canonical origin — no trailing slash.
   * Replace with your real domain before launch (e.g. https://stitchcalc.com).
   */
  siteUrl: process.env.PUBLIC_SITE_URL || 'https://example.com',
  /** Primary contact email shown on Contact / Privacy */
  contactEmail: process.env.PUBLIC_CONTACT_EMAIL || 'hello@example.com',
  /** Optional social / entity URLs for Organization sameAs */
  sameAs: [] as string[],
  /** ISO date for "last updated" defaults and sitemap lastmod */
  contentUpdated: '2026-10-19',
  contentPublished: '2026-10-19',
  /** Placeholder author */
  author: {
    name: 'StitchCalc Editorial',
    role: 'Fiber arts tool editors',
    bio: 'We build free, client-side craft calculators with sourced formulas and reference tables.',
  },
  reviewer: {
    name: 'Craft Methodology Reviewer',
    role: 'Pattern math reviewer (placeholder)',
  },
  /** Google AdSense — leave empty until approved; ads stay disabled */
  adsense: {
    client: process.env.PUBLIC_ADSENSE_CLIENT || '', // e.g. ca-pub-XXXXXXXXXXXXXXXX
    enabled: process.env.PUBLIC_ADSENSE_ENABLED === 'true',
    /** Slot IDs once created in AdSense */
    slots: {
      inArticle: '',
      sidebar: '',
    },
  },
  /** GA4 measurement ID — empty until configured */
  ga4MeasurementId: process.env.PUBLIC_GA4_ID || '',
  /** Search Console HTML tag content (meta verification) */
  googleSiteVerification: process.env.PUBLIC_GSC_VERIFICATION || '',
  bingSiteVerification: process.env.PUBLIC_BING_VERIFICATION || '',
  /** IndexNow key filename (also place public/<key>.txt) */
  indexNowKey: process.env.PUBLIC_INDEXNOW_KEY || '00000000000000000000000000000000',
  /** Locale */
  locale: 'en_US',
  language: 'en',
} as const;

export type SiteConfig = typeof siteConfig;
