import { getYarnWeight } from '../../data/yarn-weights';
import { ceilTo, round, toCm, type LengthUnit } from '../units';

export interface RectYarnInput {
  width: number;
  length: number;
  unit: LengthUnit;
  yarnCategory: string;
  /** Extra yarn percent for swatch, ends, seaming (default 10) */
  wastePercent?: number;
  craft?: 'knit' | 'crochet';
}

export interface YarnEstimate {
  areaSqM: number;
  metersNeeded: number;
  gramsNeeded: number;
  ballsNeeded: number;
  typicalBallMeters: number;
  typicalBallGrams: number;
  yarnName: string;
  wastePercent: number;
}

/** Estimate yarn for a rectangular project from CYC weight meters/m² */
export function estimateRectYarn(input: RectYarnInput): YarnEstimate {
  const yarn = getYarnWeight(input.yarnCategory);
  const waste = input.wastePercent ?? 10;
  const wCm = toCm(input.width, input.unit);
  const lCm = toCm(input.length, input.unit);
  const areaSqM = (wCm / 100) * (lCm / 100);
  // Crochet typically uses ~15–25% more yarn than stockinette for same area
  const craftFactor = input.craft === 'crochet' ? 1.2 : 1;
  const metersNeeded = areaSqM * yarn.metersPerSqMeter * craftFactor * (1 + waste / 100);
  const gramsNeeded = metersNeeded * yarn.gramsPerMeter;
  const ballsNeeded = Math.max(1, Math.ceil(metersNeeded / yarn.typicalBallMeters));
  return {
    areaSqM: round(areaSqM, 3),
    metersNeeded: round(metersNeeded, 1),
    gramsNeeded: round(gramsNeeded, 1),
    ballsNeeded,
    typicalBallMeters: yarn.typicalBallMeters,
    typicalBallGrams: yarn.typicalBallGrams,
    yarnName: yarn.name,
    wastePercent: waste,
  };
}

export interface SweaterYarnInput {
  chestIn: number;
  lengthIn: number;
  sleeveLengthIn: number;
  yarnCategory: string;
  wastePercent?: number;
}

/**
 * Sweater estimate: approximate body as a cylinder unrolled to rectangle
 * plus two sleeve rectangles. Rough planner — patterns vary widely.
 */
export function estimateSweaterYarn(input: SweaterYarnInput): YarnEstimate {
  const bodyW = input.chestIn; // circumference ≈ width when knit flat as front+back
  const bodyL = input.lengthIn;
  const sleeveW = input.chestIn * 0.35; // approx upper arm circumference
  const sleeveL = input.sleeveLengthIn;
  // Front + back ≈ chest × length; two sleeves
  const bodyAreaIn2 = bodyW * bodyL;
  const sleeveAreaIn2 = 2 * sleeveW * sleeveL;
  const totalAreaIn2 = bodyAreaIn2 + sleeveAreaIn2;
  const side = Math.sqrt(totalAreaIn2);
  return estimateRectYarn({
    width: side,
    length: side,
    unit: 'in',
    yarnCategory: input.yarnCategory,
    wastePercent: input.wastePercent ?? 15,
    craft: 'knit',
  });
}

export interface HatYarnInput {
  circumferenceIn: number;
  depthIn: number;
  yarnCategory: string;
  wastePercent?: number;
}

export function estimateHatYarn(input: HatYarnInput): YarnEstimate {
  // Surface ≈ circumference × depth (cylinder approx for beanie)
  return estimateRectYarn({
    width: input.circumferenceIn,
    length: input.depthIn,
    unit: 'in',
    yarnCategory: input.yarnCategory,
    wastePercent: input.wastePercent ?? 12,
    craft: 'knit',
  });
}

export interface ScarfYarnInput {
  widthIn: number;
  lengthIn: number;
  yarnCategory: string;
  wastePercent?: number;
  craft?: 'knit' | 'crochet';
}

export function estimateScarfYarn(input: ScarfYarnInput): YarnEstimate {
  return estimateRectYarn({
    width: input.widthIn,
    length: input.lengthIn,
    unit: 'in',
    yarnCategory: input.yarnCategory,
    wastePercent: input.wastePercent ?? 10,
    craft: input.craft ?? 'knit',
  });
}

export interface AmigurumiYarnInput {
  /** Approximate finished height in inches */
  heightIn: number;
  yarnCategory: string;
  /** Density factor 0.8 (loose) to 1.4 (tight stuffed) */
  density?: number;
}

/**
 * Amigurumi yarn: rough sphere-like volume scaled to height.
 * Small toys typically use 20–80 g of sport/DK; formula scales by volume.
 */
export function estimateAmigurumiYarn(input: AmigurumiYarnInput): YarnEstimate {
  const density = input.density ?? 1;
  // Treat as sphere diameter = height; surface area ≈ 4πr² worked in dense SC
  const r = input.heightIn / 2;
  const surfaceIn2 = 4 * Math.PI * r * r;
  const side = Math.sqrt(surfaceIn2);
  const base = estimateRectYarn({
    width: side,
    length: side,
    unit: 'in',
    yarnCategory: input.yarnCategory,
    wastePercent: 20,
    craft: 'crochet',
  });
  return {
    ...base,
    metersNeeded: round(base.metersNeeded * density, 1),
    gramsNeeded: round(base.gramsNeeded * density, 1),
    ballsNeeded: Math.max(1, Math.ceil((base.metersNeeded * density) / base.typicalBallMeters)),
  };
}

export interface SubstitutionInput {
  originalCategory: string;
  substituteCategory: string;
  originalMeters: number;
  originalGrams?: number;
}

export interface SubstitutionResult {
  recommendedMeters: number;
  recommendedGrams: number;
  gaugeRatio: number;
  note: string;
}

/** Convert yarn amount between CYC weight categories using meters/m² ratio */
export function substituteYarn(input: SubstitutionInput): SubstitutionResult {
  const orig = getYarnWeight(input.originalCategory);
  const sub = getYarnWeight(input.substituteCategory);
  const gaugeRatio = sub.metersPerSqMeter / orig.metersPerSqMeter;
  const recommendedMeters = round(input.originalMeters * gaugeRatio, 1);
  const gramsFromMeters = recommendedMeters * sub.gramsPerMeter;
  const recommendedGrams = round(
    input.originalGrams != null
      ? input.originalGrams * (sub.gramsPerMeter / orig.gramsPerMeter) * gaugeRatio
      : gramsFromMeters,
    1,
  );
  const same = input.originalCategory === input.substituteCategory;
  return {
    recommendedMeters,
    recommendedGrams,
    gaugeRatio: round(gaugeRatio, 3),
    note: same
      ? 'Same weight category — buy matching meterage.'
      : 'Always swatch. Substitution changes drape, stitch definition, and yardage.',
  };
}

export function ballsFromMeters(meters: number, ballMeters: number): number {
  return ceilTo(meters / ballMeters, 1);
}
