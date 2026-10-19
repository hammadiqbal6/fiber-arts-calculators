import { round, toCm, type LengthUnit } from '../units';

export interface GaugeInput {
  stitchesInSwatch: number;
  rowsInSwatch: number;
  swatchWidth: number;
  swatchHeight: number;
  unit: LengthUnit;
}

export interface GaugeResult {
  stitchesPerUnit: number;
  rowsPerUnit: number;
  stitchesPer4in: number;
  rowsPer4in: number;
  stitchesPer10cm: number;
  rowsPer10cm: number;
}

export function calculateGauge(input: GaugeInput): GaugeResult {
  const wCm = toCm(input.swatchWidth, input.unit);
  const hCm = toCm(input.swatchHeight, input.unit);
  if (wCm <= 0 || hCm <= 0) throw new Error('Swatch dimensions must be positive');
  const stitchesPerCm = input.stitchesInSwatch / wCm;
  const rowsPerCm = input.rowsInSwatch / hCm;
  return {
    stitchesPerUnit: round(input.unit === 'in' ? stitchesPerCm * 2.54 : stitchesPerCm, 3),
    rowsPerUnit: round(input.unit === 'in' ? rowsPerCm * 2.54 : rowsPerCm, 3),
    stitchesPer4in: round(stitchesPerCm * 2.54 * 4, 2),
    rowsPer4in: round(rowsPerCm * 2.54 * 4, 2),
    stitchesPer10cm: round(stitchesPerCm * 10, 2),
    rowsPer10cm: round(rowsPerCm * 10, 2),
  };
}

export interface StitchesToSizeInput {
  stitches: number;
  rows: number;
  stitchesPer4in: number;
  rowsPer4in: number;
}

export interface SizeFromStitches {
  widthIn: number;
  heightIn: number;
  widthCm: number;
  heightCm: number;
}

export function stitchesToSize(input: StitchesToSizeInput): SizeFromStitches {
  const widthIn = (input.stitches / input.stitchesPer4in) * 4;
  const heightIn = (input.rows / input.rowsPer4in) * 4;
  return {
    widthIn: round(widthIn, 2),
    heightIn: round(heightIn, 2),
    widthCm: round(widthIn * 2.54, 2),
    heightCm: round(heightIn * 2.54, 2),
  };
}

export interface ResizePatternInput {
  patternStitchesPer4in: number;
  patternRowsPer4in: number;
  yourStitchesPer4in: number;
  yourRowsPer4in: number;
  patternStitchCount: number;
  patternRowCount: number;
}

export interface ResizeResult {
  newStitchCount: number;
  newRowCount: number;
  stitchFactor: number;
  rowFactor: number;
}

/** Resize a pattern when your gauge differs from the pattern gauge */
export function resizePattern(input: ResizePatternInput): ResizeResult {
  const stitchFactor = input.yourStitchesPer4in / input.patternStitchesPer4in;
  const rowFactor = input.yourRowsPer4in / input.patternRowsPer4in;
  return {
    newStitchCount: Math.round(input.patternStitchCount * stitchFactor),
    newRowCount: Math.round(input.patternRowCount * rowFactor),
    stitchFactor: round(stitchFactor, 4),
    rowFactor: round(rowFactor, 4),
  };
}

export interface CastOnInput {
  desiredWidth: number;
  unit: LengthUnit;
  stitchesPer4in: number;
  /** Extra stitches for seams/edges */
  edgeStitches?: number;
}

export function castOnStitches(input: CastOnInput): number {
  const widthIn = input.unit === 'in' ? input.desiredWidth : input.desiredWidth / 2.54;
  const sts = (widthIn / 4) * input.stitchesPer4in + (input.edgeStitches ?? 0);
  return Math.max(1, Math.round(sts));
}
