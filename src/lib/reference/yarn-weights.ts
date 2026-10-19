/**
 * Craft Yarn Council Standard Yarn Weight System (categories 0–7).
 * Source: https://www.craftyarncouncil.com/standards/yarn-weight-system
 * Wraps/inch and gauge ranges are CYC published standards; yardage per project
 * estimates below are planning averages used by our calculators (documented on tool pages).
 */

export type YarnWeightId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface YarnWeightStandard {
  id: YarnWeightId;
  name: string;
  aliases: string[];
  /** Typical wraps per inch */
  wpi: [number, number];
  /** Knitting gauge: stitches in 4" / 10cm on recommended needles */
  knitGaugeSts4in: [number, number];
  needleMetricMm: [number, number];
  /** Crochet gauge: single crochet stitches in 4" */
  crochetGaugeSc4in: [number, number];
  hookMetricMm: [number, number];
  /** Approximate meters per 100g skein (planning average) */
  metersPer100g: [number, number];
  /** Approximate yards per 100g skein */
  yardsPer100g: [number, number];
}

export const YARN_WEIGHTS: YarnWeightStandard[] = [
  {
    id: 0,
    name: 'Lace',
    aliases: ['lace', 'cobweb', 'thread'],
    wpi: [30, 40],
    knitGaugeSts4in: [33, 40],
    needleMetricMm: [1.5, 2.25],
    crochetGaugeSc4in: [32, 42],
    hookMetricMm: [1.4, 2.25],
    metersPer100g: [600, 800],
    yardsPer100g: [656, 875],
  },
  {
    id: 1,
    name: 'Super Fine',
    aliases: ['fingering', 'sock', 'baby'],
    wpi: [14, 30],
    knitGaugeSts4in: [27, 32],
    needleMetricMm: [2.25, 3.25],
    crochetGaugeSc4in: [21, 32],
    hookMetricMm: [2.25, 3.5],
    metersPer100g: [350, 450],
    yardsPer100g: [383, 492],
  },
  {
    id: 2,
    name: 'Fine',
    aliases: ['sport', 'baby'],
    wpi: [12, 18],
    knitGaugeSts4in: [23, 26],
    needleMetricMm: [3.25, 3.75],
    crochetGaugeSc4in: [16, 20],
    hookMetricMm: [3.5, 4.5],
    metersPer100g: [280, 350],
    yardsPer100g: [306, 383],
  },
  {
    id: 3,
    name: 'Light',
    aliases: ['DK', 'light worsted'],
    wpi: [11, 15],
    knitGaugeSts4in: [21, 24],
    needleMetricMm: [3.75, 4.5],
    crochetGaugeSc4in: [12, 17],
    hookMetricMm: [4.5, 5.5],
    metersPer100g: [200, 280],
    yardsPer100g: [219, 306],
  },
  {
    id: 4,
    name: 'Medium',
    aliases: ['worsted', 'afghan', 'aran'],
    wpi: [9, 12],
    knitGaugeSts4in: [16, 20],
    needleMetricMm: [4.5, 5.5],
    crochetGaugeSc4in: [11, 14],
    hookMetricMm: [5.5, 6.5],
    metersPer100g: [160, 220],
    yardsPer100g: [175, 241],
  },
  {
    id: 5,
    name: 'Bulky',
    aliases: ['chunky', 'craft', 'rug'],
    wpi: [6, 9],
    knitGaugeSts4in: [12, 15],
    needleMetricMm: [5.5, 8],
    crochetGaugeSc4in: [8, 11],
    hookMetricMm: [6.5, 9],
    metersPer100g: [100, 160],
    yardsPer100g: [109, 175],
  },
  {
    id: 6,
    name: 'Super Bulky',
    aliases: ['roving', 'super chunky'],
    wpi: [5, 6],
    knitGaugeSts4in: [7, 11],
    needleMetricMm: [8, 12.75],
    crochetGaugeSc4in: [7, 9],
    hookMetricMm: [9, 15],
    metersPer100g: [60, 100],
    yardsPer100g: [66, 109],
  },
  {
    id: 7,
    name: 'Jumbo',
    aliases: ['jumbo', 'roving'],
    wpi: [1, 4],
    knitGaugeSts4in: [1, 6],
    needleMetricMm: [12.75, 25],
    crochetGaugeSc4in: [1, 6],
    hookMetricMm: [15, 25],
    metersPer100g: [20, 60],
    yardsPer100g: [22, 66],
  },
];

export function getYarnWeight(id: YarnWeightId): YarnWeightStandard {
  const found = YARN_WEIGHTS.find((y) => y.id === id);
  if (!found) throw new Error(`Unknown yarn weight ${id}`);
  return found;
}

/** Midpoint yards per 100g for planning estimates. */
export function midYardsPer100g(id: YarnWeightId): number {
  const y = getYarnWeight(id);
  return (y.yardsPer100g[0] + y.yardsPer100g[1]) / 2;
}
