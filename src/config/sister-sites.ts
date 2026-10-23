/**
 * Cross-site (sister) origins for the five tool sites.
 * Override via PUBLIC_SITE_URL_* env vars when custom domains arrive.
 * Fallbacks match current *.workers.dev deployments so builds never break.
 * This site's own origin for SEO is NOT taken from here — use PUBLIC_SITE_URL
 * / siteConfig.siteUrl (see docs/CUSTOM-DOMAIN.md).
 */
function origin(value: string | undefined, fallback: string): string {
  const trimmed = (value ?? '').trim().replace(/\/$/, '');
  return trimmed || fallback;
}

export const sisterSites = {
  paymentFees: origin(
    import.meta.env.PUBLIC_SITE_URL_PAYMENT_FEES,
    'https://payment-fee-calculators.hammadiqbal117.workers.dev',
  ),
  businessDocs: origin(
    import.meta.env.PUBLIC_SITE_URL_BUSINESS_DOCS,
    'https://business-document-generators.hammadiqbal117.workers.dev',
  ),
  homeGarden: origin(
    import.meta.env.PUBLIC_SITE_URL_HOME_GARDEN,
    'https://home-garden-calculators.hammadiqbal117.workers.dev',
  ),
  fiberArts: origin(
    import.meta.env.PUBLIC_SITE_URL_FIBER_ARTS,
    'https://fiber-arts-calculators.hammadiqbal117.workers.dev',
  ),
  pet: origin(
    import.meta.env.PUBLIC_SITE_URL_PET,
    'https://pet-calculators.hammadiqbal117.workers.dev',
  ),
} as const;

export type SisterSites = typeof sisterSites;
