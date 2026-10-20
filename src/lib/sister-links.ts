/**
 * Topical sister-site links only. Origins come from env-backed sisterSites config
 * (PUBLIC_SITE_URL_*), not hard-coded hosts.
 */
import { sisterSites } from '../config/sister-sites';

export type SisterLink = { href: string; label: string; note: string };

function path(origin: string, pathname = '/'): string {
  const base = origin.replace(/\/$/, '');
  const p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${p}`;
}

/** Map tool slug → optional sister links (0–2 max). */
export function sisterLinksFor(slug: string): SisterLink[] {
  const byTool: Record<string, SisterLink[]> = {
    'fabric-yardage-calculator': [
      {
        href: path(sisterSites.homeGarden, '/calculators/concrete-calculator/'),
        label: 'Concrete calculator (YardCalc)',
        note: 'when your sewing room project turns into a patio pour',
      },
    ],
    'seam-allowance-calculator': [
      {
        href: path(sisterSites.businessDocs, '/tools/construction-estimate-template/'),
        label: 'Construction estimate template',
        note: 'line-item estimates if you bill sewing or alteration work',
      },
    ],
    'quilt-size-calculator': [
      {
        href: path(sisterSites.homeGarden, '/'),
        label: 'Home & garden calculators',
        note: 'room and material planners for spaces that hold the quilt',
      },
    ],
    'yarn-sweater-calculator': [
      {
        href: path(sisterSites.paymentFees, '/tools/stripe-fee-calculator/'),
        label: 'Stripe fee calculator',
        note: 'if you sell finished knits online and need net payout math',
      },
    ],
  };
  return byTool[slug] ?? [];
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
