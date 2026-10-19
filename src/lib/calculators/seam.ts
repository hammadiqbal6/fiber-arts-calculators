import { round, toCm, type LengthUnit } from '../units';

export interface SeamAllowanceInput {
  /** Finished garment measurement */
  finished: number;
  unit: LengthUnit;
  /** Seam allowance per seam edge */
  seamAllowance: number;
  seamUnit: LengthUnit;
  /** Number of seam edges in this measurement (usually 2 for side seams) */
  seamEdges?: number;
  /** Ease to add (wearing ease) */
  ease?: number;
  easeUnit?: LengthUnit;
}

export interface SeamAllowanceResult {
  cutMeasurement: number;
  cutUnit: LengthUnit;
  cutCm: number;
  cutIn: number;
  totalSeamAdded: number;
  easeAdded: number;
}

export function cutFromFinished(input: SeamAllowanceInput): SeamAllowanceResult {
  const edges = input.seamEdges ?? 2;
  const finishedCm = toCm(input.finished, input.unit);
  const saCm = toCm(input.seamAllowance, input.seamUnit);
  const easeCm = input.ease != null ? toCm(input.ease, input.easeUnit ?? input.unit) : 0;
  const cutCm = finishedCm + edges * saCm + easeCm;
  return {
    cutMeasurement: input.unit === 'cm' ? round(cutCm, 2) : round(cutCm / 2.54, 3),
    cutUnit: input.unit,
    cutCm: round(cutCm, 2),
    cutIn: round(cutCm / 2.54, 3),
    totalSeamAdded: input.unit === 'cm' ? round(edges * saCm, 2) : round((edges * saCm) / 2.54, 3),
    easeAdded: input.unit === 'cm' ? round(easeCm, 2) : round(easeCm / 2.54, 3),
  };
}

export interface GradeInput {
  baseSizeMeasurement: number;
  unit: LengthUnit;
  /** Grade rule per size step (e.g. 1 inch across bust) */
  gradePerSize: number;
  gradeUnit: LengthUnit;
  /** How many sizes away from base (+ larger, − smaller) */
  sizesAway: number;
}

export interface GradeResult {
  newMeasurement: number;
  unit: LengthUnit;
  delta: number;
}

/** Simple linear pattern grading between sizes */
export function gradeMeasurement(input: GradeInput): GradeResult {
  const baseCm = toCm(input.baseSizeMeasurement, input.unit);
  const gradeCm = toCm(input.gradePerSize, input.gradeUnit);
  const newCm = baseCm + gradeCm * input.sizesAway;
  return {
    newMeasurement: input.unit === 'cm' ? round(newCm, 2) : round(newCm / 2.54, 3),
    unit: input.unit,
    delta: input.unit === 'cm' ? round(gradeCm * input.sizesAway, 2) : round((gradeCm * input.sizesAway) / 2.54, 3),
  };
}

/** Common seam allowances in inches */
export const COMMON_SEAM_ALLOWANCES_IN = [
  { label: '¼″ (quilting)', inches: 0.25 },
  { label: '⅜″ (knits / some EU)', inches: 0.375 },
  { label: '½″ (crafts)', inches: 0.5 },
  { label: '⅝″ (standard garment)', inches: 0.625 },
  { label: '1″ (heirloom / adjustment)', inches: 1 },
] as const;
