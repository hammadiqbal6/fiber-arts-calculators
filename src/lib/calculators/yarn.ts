import { midYardsPer100g, type YarnWeightId } from '../reference/yarn-weights';
import { fromGrams, fromYards, round, toInches, type FabricLengthUnit, type LengthUnit, type WeightUnit } from '../units';

export type CraftMethod = 'knit' | 'crochet';

/**
 * Surface-area based yarn estimate.
 * yards ≈ (width_in * length_in * densityFactor) / yardsPerSqInFactor
 * densityFactor accounts for stitch density by weight + craft method.
 * Calibrated as planning averages; always buy an extra skein for color-lot matching.
 */
function densityFactor(weightId: YarnWeightId, method: CraftMethod): number {
  // Approximate yards of yarn per square inch of fabric (planning averages).
  // Calibrated so a 50×60" worsted knit throw ≈ 1,100–1,400 yd and a
  // medium worsted sweater ≈ 1,000–1,400 yd before skein rounding.
  const knitBase: Record<YarnWeightId, number> = {
    0: 1.35,
    1: 1.05,
    2: 0.85,
    3: 0.7,
    4: 0.55,
    5: 0.4,
    6: 0.28,
    7: 0.18,
  };
  const base = knitBase[weightId];
  // Crochet typically uses ~25–30% more yarn than knitting for the same area
  return method === 'crochet' ? base * 1.28 : base;
}

export interface RectangleYarnInput {
  width: number;
  length: number;
  unit: LengthUnit;
  yarnWeight: YarnWeightId;
  method: CraftMethod;
  /** Skeins: yards (or meters) per skein */
  skeinLength: number;
  skeinLengthUnit: FabricLengthUnit;
  /** Optional grams per skein for weight estimate */
  skeinGrams?: number;
  wastePercent?: number;
}

export interface YarnEstimate {
  areaSqIn: number;
  yardsNeeded: number;
  metersNeeded: number;
  skeinsNeeded: number;
  gramsNeeded: number | null;
  ozNeeded: number | null;
}

export function estimateRectangleYarn(input: RectangleYarnInput): YarnEstimate {
  const widthIn = toInches(input.width, input.unit);
  const lengthIn = toInches(input.length, input.unit);
  const areaSqIn = widthIn * lengthIn;
  const waste = 1 + (input.wastePercent ?? 10) / 100;
  const yardsNeeded = round(areaSqIn * densityFactor(input.yarnWeight, input.method) * waste, 1);
  const metersNeeded = round(fromYards(yardsNeeded, 'm'), 1);
  const skeinYards = input.skeinLengthUnit === 'yd' ? input.skeinLength : fromYards(input.skeinLength, 'yd');
  const skeinsNeeded = Math.max(1, Math.ceil(yardsNeeded / Math.max(skeinYards, 0.01)));
  let gramsNeeded: number | null = null;
  let ozNeeded: number | null = null;
  if (input.skeinGrams && input.skeinGrams > 0) {
    gramsNeeded = round(skeinsNeeded * input.skeinGrams, 0);
    ozNeeded = round(fromGrams(gramsNeeded, 'oz'), 1);
  } else {
    // Fallback from mid yards/100g
    const ydsPer100 = midYardsPer100g(input.yarnWeight);
    gramsNeeded = round((yardsNeeded / ydsPer100) * 100, 0);
    ozNeeded = round(fromGrams(gramsNeeded, 'oz'), 1);
  }
  return { areaSqIn: round(areaSqIn, 1), yardsNeeded, metersNeeded, skeinsNeeded, gramsNeeded, ozNeeded };
}

/** Preset multipliers / dimensions for common projects (inches). */
export const SWEATER_SIZES: Record<string, { chestIn: number; lengthIn: number; sleeveIn: number }> = {
  xs: { chestIn: 32, lengthIn: 24, sleeveIn: 17 },
  s: { chestIn: 36, lengthIn: 25, sleeveIn: 17.5 },
  m: { chestIn: 40, lengthIn: 26, sleeveIn: 18 },
  l: { chestIn: 44, lengthIn: 27, sleeveIn: 18.5 },
  xl: { chestIn: 48, lengthIn: 28, sleeveIn: 19 },
  '2xl': { chestIn: 52, lengthIn: 29, sleeveIn: 19.5 },
};

/**
 * Sweater yarn: approximate as body tube + 2 sleeves.
 * Body area ≈ chest * length; each sleeve ≈ (chest/4 + ease) * sleeve length.
 */
export function estimateSweaterYarn(
  sizeKey: keyof typeof SWEATER_SIZES,
  yarnWeight: YarnWeightId,
  method: CraftMethod,
  skeinLength: number,
  skeinLengthUnit: FabricLengthUnit,
  skeinGrams?: number,
  wastePercent = 15,
): YarnEstimate {
  const s = SWEATER_SIZES[sizeKey];
  const body = s.chestIn * s.lengthIn;
  const sleeveWidth = s.chestIn / 4 + 2;
  const sleeves = 2 * sleeveWidth * s.sleeveIn;
  const equivArea = body + sleeves;
  // Convert area into a square equivalent for the rectangle estimator
  const side = Math.sqrt(equivArea);
  return estimateRectangleYarn({
    width: side,
    length: side,
    unit: 'in',
    yarnWeight,
    method,
    skeinLength,
    skeinLengthUnit,
    skeinGrams,
    wastePercent,
  });
}

export function estimateHatYarn(
  circumferenceIn: number,
  depthIn: number,
  yarnWeight: YarnWeightId,
  method: CraftMethod,
  skeinLength: number,
  skeinLengthUnit: FabricLengthUnit,
  skeinGrams?: number,
): YarnEstimate {
  // Cylinder approx: circumference * depth * 0.85 (taper at crown)
  const equivWidth = circumferenceIn;
  const equivLength = depthIn * 0.85;
  return estimateRectangleYarn({
    width: equivWidth,
    length: equivLength,
    unit: 'in',
    yarnWeight,
    method,
    skeinLength,
    skeinLengthUnit,
    skeinGrams,
    wastePercent: 10,
  });
}

export function estimateScarfYarn(
  width: number,
  length: number,
  unit: LengthUnit,
  yarnWeight: YarnWeightId,
  method: CraftMethod,
  skeinLength: number,
  skeinLengthUnit: FabricLengthUnit,
  skeinGrams?: number,
): YarnEstimate {
  return estimateRectangleYarn({
    width,
    length,
    unit,
    yarnWeight,
    method,
    skeinLength,
    skeinLengthUnit,
    skeinGrams,
    wastePercent: 8,
  });
}

export function estimateAmigurumiYarn(
  height: number,
  unit: LengthUnit,
  yarnWeight: YarnWeightId,
  skeinLength: number,
  skeinLengthUnit: FabricLengthUnit,
  skeinGrams?: number,
): YarnEstimate {
  const hIn = toInches(height, unit);
  // Sphere-ish body: surface ~ 4πr² with r ≈ height/2.5, dense SC crochet
  const r = hIn / 2.5;
  const surface = 4 * Math.PI * r * r;
  return estimateRectangleYarn({
    width: Math.sqrt(surface),
    length: Math.sqrt(surface),
    unit: 'in',
    yarnWeight,
    method: 'crochet',
    skeinLength,
    skeinLengthUnit,
    skeinGrams,
    wastePercent: 15,
  });
}

/** Convert yardage between yarn weights for substitution planning. */
export function substituteYarnYardage(
  originalYards: number,
  fromWeight: YarnWeightId,
  toWeight: YarnWeightId,
): { yards: number; meters: number; ratio: number } {
  const fromMid = midYardsPer100g(fromWeight);
  const toMid = midYardsPer100g(toWeight);
  // Same fabric weight (grams) → different yardage
  const grams = (originalYards / fromMid) * 100;
  const yards = round((grams / 100) * toMid, 1);
  const ratio = round(toMid / fromMid, 3);
  return { yards, meters: round(fromYards(yards, 'm'), 1), ratio };
}

export function weightLengthConvert(
  value: number,
  from: WeightUnit | FabricLengthUnit,
  yarnWeight: YarnWeightId,
): { grams: number; oz: number; yards: number; meters: number } {
  const ydsPer100 = midYardsPer100g(yarnWeight);
  let grams: number;
  if (from === 'g' || from === 'oz') {
    grams = from === 'g' ? value : value * 28.349523125;
  } else {
    const yards = from === 'yd' ? value : value / 0.9144;
    grams = (yards / ydsPer100) * 100;
  }
  const yards = (grams / 100) * ydsPer100;
  return {
    grams: round(grams, 1),
    oz: round(fromGrams(grams, 'oz'), 2),
    yards: round(yards, 1),
    meters: round(fromYards(yards, 'm'), 1),
  };
}
