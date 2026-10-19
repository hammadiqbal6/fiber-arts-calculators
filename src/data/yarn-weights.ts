/**
 * Craft Yarn Council (CYC) Standard Yarn Weight System.
 * Source: https://www.craftyarncouncil.com/standards/yarn-weight-system
 * Yardage estimates are approximate averages for planning; always swatch.
 */
export interface YarnWeightStandard {
  /** CYC category number as string for display */
  category: string;
  name: string;
  /** Typical knitting gauge: stitches per 4" / 10 cm in stockinette */
  knitGaugeStsPer4in: [number, number];
  /** Recommended US knitting needle range */
  usNeedles: string;
  /** Metric needle mm range */
  metricNeedlesMm: [number, number];
  /** Crochet gauge: single crochet stitches per 4" */
  crochetGaugeScPer4in: [number, number];
  /** Recommended US crochet hook */
  usHooks: string;
  metricHooksMm: [number, number];
  /**
   * Approximate meters of yarn needed per square meter of stockinette /
   * single-crochet fabric at mid-range gauge. Used for blanket/scarf estimates.
   */
  metersPerSqMeter: number;
  /** Approximate grams per meter for a typical ball of this weight */
  gramsPerMeter: number;
  /** Typical ball: meters */
  typicalBallMeters: number;
  /** Typical ball: grams */
  typicalBallGrams: number;
}

export const YARN_WEIGHTS: YarnWeightStandard[] = [
  {
    category: '0',
    name: 'Lace',
    knitGaugeStsPer4in: [33, 40],
    usNeedles: '000–1',
    metricNeedlesMm: [1.5, 2.25],
    crochetGaugeScPer4in: [32, 42],
    usHooks: 'B-1 to steel',
    metricHooksMm: [1.4, 2.25],
    metersPerSqMeter: 2800,
    gramsPerMeter: 0.12,
    typicalBallMeters: 400,
    typicalBallGrams: 50,
  },
  {
    category: '1',
    name: 'Super Fine (Fingering)',
    knitGaugeStsPer4in: [27, 32],
    usNeedles: '1–3',
    metricNeedlesMm: [2.25, 3.25],
    crochetGaugeScPer4in: [21, 32],
    usHooks: 'B-1 to E-4',
    metricHooksMm: [2.25, 3.5],
    metersPerSqMeter: 2200,
    gramsPerMeter: 0.18,
    typicalBallMeters: 366,
    typicalBallGrams: 100,
  },
  {
    category: '2',
    name: 'Fine (Sport)',
    knitGaugeStsPer4in: [23, 26],
    usNeedles: '3–5',
    metricNeedlesMm: [3.25, 3.75],
    crochetGaugeScPer4in: [16, 20],
    usHooks: 'E-4 to 7',
    metricHooksMm: [3.5, 4.5],
    metersPerSqMeter: 1700,
    gramsPerMeter: 0.22,
    typicalBallMeters: 230,
    typicalBallGrams: 50,
  },
  {
    category: '3',
    name: 'Light (DK)',
    knitGaugeStsPer4in: [21, 24],
    usNeedles: '5–7',
    metricNeedlesMm: [3.75, 4.5],
    crochetGaugeScPer4in: [12, 17],
    usHooks: '7 to I-9',
    metricHooksMm: [4.5, 5.5],
    metersPerSqMeter: 1400,
    gramsPerMeter: 0.28,
    typicalBallMeters: 200,
    typicalBallGrams: 50,
  },
  {
    category: '4',
    name: 'Medium (Worsted)',
    knitGaugeStsPer4in: [16, 20],
    usNeedles: '7–9',
    metricNeedlesMm: [4.5, 5.5],
    crochetGaugeScPer4in: [11, 14],
    usHooks: 'I-9 to K-10½',
    metricHooksMm: [5.5, 6.5],
    metersPerSqMeter: 1100,
    gramsPerMeter: 0.4,
    typicalBallMeters: 200,
    typicalBallGrams: 100,
  },
  {
    category: '5',
    name: 'Bulky',
    knitGaugeStsPer4in: [12, 15],
    usNeedles: '9–11',
    metricNeedlesMm: [5.5, 8],
    crochetGaugeScPer4in: [8, 11],
    usHooks: 'K-10½ to M-13',
    metricHooksMm: [6.5, 9],
    metersPerSqMeter: 750,
    gramsPerMeter: 0.55,
    typicalBallMeters: 120,
    typicalBallGrams: 100,
  },
  {
    category: '6',
    name: 'Super Bulky',
    knitGaugeStsPer4in: [7, 11],
    usNeedles: '11–17',
    metricNeedlesMm: [8, 12.75],
    crochetGaugeScPer4in: [7, 9],
    usHooks: 'M-13 to Q',
    metricHooksMm: [9, 15],
    metersPerSqMeter: 450,
    gramsPerMeter: 0.85,
    typicalBallMeters: 80,
    typicalBallGrams: 100,
  },
  {
    category: '7',
    name: 'Jumbo',
    knitGaugeStsPer4in: [6, 6],
    usNeedles: '17+',
    metricNeedlesMm: [12.75, 25],
    crochetGaugeScPer4in: [6, 6],
    usHooks: 'Q+',
    metricHooksMm: [15, 25],
    metersPerSqMeter: 280,
    gramsPerMeter: 1.4,
    typicalBallMeters: 40,
    typicalBallGrams: 200,
  },
];

export function getYarnWeight(category: string): YarnWeightStandard {
  const found = YARN_WEIGHTS.find((y) => y.category === category);
  if (!found) throw new Error(`Unknown yarn weight category: ${category}`);
  return found;
}
