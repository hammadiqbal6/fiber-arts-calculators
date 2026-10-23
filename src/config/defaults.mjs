/**
 * Single source of truth for the canonical site origin fallback.
 * Used by Astro (`site.ts` → `astro.config` `site`) and Node scripts (IndexNow).
 * Override at build time with PUBLIC_SITE_URL — never hardcode the hostname elsewhere.
 *
 * When moving to a custom domain, change only PUBLIC_SITE_URL (and this default
 * after cutover). See docs/CUSTOM-DOMAIN.md.
 */
export const DEFAULT_SITE_URL =
  'https://fiber-arts-calculators.hammadiqbal117.workers.dev';

export const DEFAULT_INDEXNOW_KEY = '9638154d8d3e54b9c2ce62eb17469c43';
