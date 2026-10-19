/**
 * Knitting needle and crochet hook size conversion charts.
 * Sources:
 * - Craft Yarn Council Standards: https://www.craftyarncouncil.com/standards/knitting-needle-sizes
 * - Craft Yarn Council crochet hooks: https://www.craftyarncouncil.com/standards/crochet-hook-sizes
 */

export interface NeedleSize {
  metricMm: number;
  us: string;
  uk: string;
}

export interface HookSize {
  metricMm: number;
  us: string;
  uk: string;
}

export const KNITTING_NEEDLES: NeedleSize[] = [
  { metricMm: 1.5, us: '000', uk: '14' },
  { metricMm: 1.75, us: '00', uk: '13' },
  { metricMm: 2.0, us: '0', uk: '14' },
  { metricMm: 2.25, us: '1', uk: '13' },
  { metricMm: 2.75, us: '2', uk: '12' },
  { metricMm: 3.0, us: '2.5', uk: '11' },
  { metricMm: 3.25, us: '3', uk: '10' },
  { metricMm: 3.5, us: '4', uk: '—' },
  { metricMm: 3.75, us: '5', uk: '9' },
  { metricMm: 4.0, us: '6', uk: '8' },
  { metricMm: 4.5, us: '7', uk: '7' },
  { metricMm: 5.0, us: '8', uk: '6' },
  { metricMm: 5.5, us: '9', uk: '5' },
  { metricMm: 6.0, us: '10', uk: '4' },
  { metricMm: 6.5, us: '10.5', uk: '3' },
  { metricMm: 7.0, us: '—', uk: '2' },
  { metricMm: 7.5, us: '—', uk: '1' },
  { metricMm: 8.0, us: '11', uk: '0' },
  { metricMm: 9.0, us: '13', uk: '00' },
  { metricMm: 10.0, us: '15', uk: '000' },
  { metricMm: 12.0, us: '17', uk: '—' },
  { metricMm: 15.0, us: '19', uk: '—' },
  { metricMm: 19.0, us: '35', uk: '—' },
  { metricMm: 25.0, us: '50', uk: '—' },
];

export const CROCHET_HOOKS: HookSize[] = [
  { metricMm: 2.25, us: 'B-1', uk: '13' },
  { metricMm: 2.75, us: 'C-2', uk: '12' },
  { metricMm: 3.25, us: 'D-3', uk: '10' },
  { metricMm: 3.5, us: 'E-4', uk: '9' },
  { metricMm: 3.75, us: 'F-5', uk: '—' },
  { metricMm: 4.0, us: 'G-6', uk: '8' },
  { metricMm: 4.5, us: '7', uk: '7' },
  { metricMm: 5.0, us: 'H-8', uk: '6' },
  { metricMm: 5.5, us: 'I-9', uk: '5' },
  { metricMm: 6.0, us: 'J-10', uk: '4' },
  { metricMm: 6.5, us: 'K-10.5', uk: '3' },
  { metricMm: 8.0, us: 'L-11', uk: '0' },
  { metricMm: 9.0, us: 'M/N-13', uk: '00' },
  { metricMm: 10.0, us: 'N/P-15', uk: '000' },
  { metricMm: 15.0, us: 'P/Q', uk: '—' },
  { metricMm: 16.0, us: 'Q', uk: '—' },
];

export function findNeedleByMetric(mm: number): NeedleSize | undefined {
  return KNITTING_NEEDLES.find((n) => Math.abs(n.metricMm - mm) < 0.01);
}

export function findNeedleByUs(us: string): NeedleSize | undefined {
  return KNITTING_NEEDLES.find((n) => n.us.toLowerCase() === us.toLowerCase());
}

export function findHookByMetric(mm: number): HookSize | undefined {
  return CROCHET_HOOKS.find((h) => Math.abs(h.metricMm - mm) < 0.01);
}

export function findHookByUs(us: string): HookSize | undefined {
  return CROCHET_HOOKS.find((h) => h.us.toLowerCase() === us.toLowerCase());
}
