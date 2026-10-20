/**
 * Topical sister-site links only. Hosts follow the workers.dev pattern used by PUBLIC_SITE_URL.
 */
const host = (repo: string) => `https://${repo}.hammadiqbal117.workers.dev`;

export type SisterLink = { href: string; label: string; note: string };

/** Map tool slug → optional sister links (0–2 max). */
export const SISTER_BY_TOOL: Record<string, SisterLink[]> = {
  'fabric-yardage-calculator': [
    {
      href: `${host('home-garden-calculators')}/calculators/concrete-calculator/`,
      label: 'Concrete calculator (YardCalc)',
      note: 'when your sewing room project turns into a patio pour',
    },
  ],
  'seam-allowance-calculator': [
    {
      href: `${host('business-document-generators')}/tools/construction-estimate-template/`,
      label: 'Construction estimate template',
      note: 'line-item estimates if you bill sewing or alteration work',
    },
  ],
  'quilt-size-calculator': [
    {
      href: `${host('home-garden-calculators')}/`,
      label: 'Home & garden calculators',
      note: 'room and material planners for spaces that hold the quilt',
    },
  ],
  'yarn-sweater-calculator': [
    {
      href: `${host('payment-fee-calculators')}/tools/stripe-fee-calculator/`,
      label: 'Stripe fee calculator',
      note: 'if you sell finished knits online and need net payout math',
    },
  ],
  'amigurumi-yarn-calculator': [
    {
      href: `${host('pet-calculators')}/`,
      label: 'PetCalc Tools',
      note: 'unrelated craft-wise—skip unless you also make pet toys; prefer yarn tools above',
    },
  ],
};

/** Drop weak/joke links — keep only genuinely topical ones. */
delete SISTER_BY_TOOL['amigurumi-yarn-calculator'];

export function sisterLinksFor(slug: string): SisterLink[] {
  return SISTER_BY_TOOL[slug] ?? [];
}
