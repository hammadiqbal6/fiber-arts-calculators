/**
 * Topical sister-site links only. Origins come from env-backed sisterSites config
 * (PUBLIC_SITE_URL_*), not hard-coded hosts.
 *
 * Off-topic cross-links (construction estimates, Stripe fees, concrete) were removed
 * after the SEO audit flagged them as irrelevant to fiber-arts tool pages.
 */
import { sisterSites } from '../config/sister-sites';

export type SisterLink = { href: string; label: string; note: string };

function path(origin: string, pathname = '/'): string {
  const base = origin.replace(/\/$/, '');
  const p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${p}`;
}

/** Map tool slug → optional sister links (0–2 max). Kept empty unless topical. */
export function sisterLinksFor(_slug: string): SisterLink[] {
  return [];
}

/** Links for the About page “other sites by …” list (excludes this site). */
export function sisterSiteDirectory(): { href: string; label: string }[] {
  return [
    { href: path(sisterSites.paymentFees, '/'), label: 'Payment fee calculators' },
    { href: path(sisterSites.businessDocs, '/'), label: 'Business document generators' },
    { href: path(sisterSites.homeGarden, '/'), label: 'Home & garden calculators' },
    { href: path(sisterSites.pet, '/'), label: 'Pet calculators' },
  ];
}
