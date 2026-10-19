import { fromInches, round, toInches, type LengthUnit } from '../units';

export interface GaugeInput {
  stitchesInSwatch: number;
  rowsInSwatch: number;
  swatchWidth: number;
  swatchHeight: number;
  swatchUnit: LengthUnit;
}

export interface GaugeResult {
  stitchesPerInch: number;
  rowsPerInch: number;
  stitchesPerCm: number;
  rowsPerCm: number;
  stitchesPer4in: number;
  rowsPer4in: number;
}

export function calculateGauge(input: GaugeInput): GaugeResult {
  const wIn = toInches(input.swatchWidth, input.swatchUnit);
  const hIn = toInches(input.swatchHeight, input.swatchUnit);
  if (wIn <= 0 || hIn <= 0) throw new Error('Swatch dimensions must be positive');
  const stitchesPerInch = input.stitchesInSwatch / wIn;
  const rowsPerInch = input.rowsInSwatch / hIn;
  return {
    stitchesPerInch: round(stitchesPerInch, 3),
    rowsPerInch: round(rowsPerInch, 3),
    stitchesPerCm: round(stitchesPerInch / 2.54, 3),
    rowsPerCm: round(rowsPerInch / 2.54, 3),
    stitchesPer4in: round(stitchesPerInch * 4, 1),
    rowsPer4in: round(rowsPerInch * 4, 1),
  };
}

/** Convert desired finished size to cast-on stitches / rows. */
export function sizeFromGauge(
  gauge: GaugeResult,
  targetWidth: number,
  targetLength: number,
  unit: LengthUnit,
): { stitches: number; rows: number; widthOut: number; lengthOut: number } {
  const wIn = toInches(targetWidth, unit);
  const lIn = toInches(targetLength, unit);
  const stitches = Math.round(wIn * gauge.stitchesPerInch);
  const rows = Math.round(lIn * gauge.rowsPerInch);
  return {
    stitches,
    rows,
    widthOut: round(fromInches(stitches / gauge.stitchesPerInch, unit), 2),
    lengthOut: round(fromInches(rows / gauge.rowsPerInch, unit), 2),
  };
}

/**
 * Resize a pattern when your gauge differs from the pattern gauge.
 * newStitches = patternStitches * (yourStsPerInch / patternStsPerInch)
 */
export function resizePattern(
  patternStitches: number,
  patternRows: number,
  patternStsPer4in: number,
  patternRowsPer4in: number,
  yourStsPer4in: number,
  yourRowsPer4in: number,
): { stitches: number; rows: number; widthRatio: number; lengthRatio: number } {
  if (patternStsPer4in <= 0 || yourStsPer4in <= 0) throw new Error('Gauge must be positive');
  const widthRatio = yourStsPer4in / patternStsPer4in;
  const lengthRatio = yourRowsPer4in / patternRowsPer4in;
  // To keep the same finished size when you have MORE sts/inch, cast on MORE stitches
  return {
    stitches: Math.round(patternStitches * (yourStsPer4in / patternStsPer4in)),
    rows: Math.round(patternRows * (yourRowsPer4in / patternRowsPer4in)),
    widthRatio: round(widthRatio, 3),
    lengthRatio: round(lengthRatio, 3),
  };
}
