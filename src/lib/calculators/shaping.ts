/**
 * Evenly space increases or decreases across a row/round.
 * Classic method: divide stitches into (changeCount + 1) sections when
 * working flat between edges, or changeCount sections in the round.
 */

export interface EvenShapingInput {
  currentStitches: number;
  /** Positive = increase, conceptually same math for placement */
  changeCount: number;
  mode: 'increase' | 'decrease';
  inTheRound: boolean;
}

export interface EvenShapingResult {
  targetStitches: number;
  sectionSize: number;
  remainder: number;
  /** Human-readable instruction */
  instruction: string;
  /** Pattern of work N, then shape, repeated */
  repeatWork: number;
  markers: number[];
}

export function evenShaping(input: EvenShapingInput): EvenShapingResult {
  const { currentStitches, changeCount, mode, inTheRound } = input;
  if (currentStitches < 1 || changeCount < 1) {
    throw new Error('Stitches and change count must be positive');
  }
  if (mode === 'decrease' && changeCount >= currentStitches) {
    throw new Error('Cannot decrease more stitches than available');
  }

  const targetStitches =
    mode === 'increase' ? currentStitches + changeCount : currentStitches - changeCount;

  // Place `changeCount` shaping points as evenly as possible
  const sections = inTheRound ? changeCount : changeCount + 1;
  const base = Math.floor(currentStitches / sections);
  const remainder = currentStitches % sections;

  // For flat knitting: work floor stitches, shape, … with remainder distributed
  // Instruction: "Work kN, M1" style
  const workBetween = mode === 'increase'
    ? Math.floor(currentStitches / changeCount)
    : Math.floor(currentStitches / changeCount);

  const repeatWork = Math.max(1, workBetween - (mode === 'decrease' ? 1 : 0));

  const markers: number[] = [];
  let pos = 0;
  for (let i = 0; i < changeCount; i++) {
    const extra = i < remainder ? 1 : 0;
    const step = inTheRound
      ? base + extra
      : i === 0
        ? Math.floor((base + extra) / 1)
        : base + extra;
    pos += Math.max(1, Math.floor(currentStitches / changeCount));
    if (pos <= currentStitches) markers.push(pos);
  }
  // Normalize markers to unique sorted positions
  const uniqueMarkers = [...new Set(
    Array.from({ length: changeCount }, (_, i) =>
      Math.round(((i + 0.5) * currentStitches) / changeCount),
    ),
  )].filter((m) => m >= 1 && m <= currentStitches);

  const shapeWord = mode === 'increase' ? 'increase' : 'decrease';
  const action = mode === 'increase' ? 'M1 (or KFB)' : 'K2tog (or SSK)';
  const instruction = inTheRound
    ? `On the next round (${currentStitches} sts → ${targetStitches} sts): *work about ${repeatWork} stitch(es), ${action}; repeat from * ${changeCount} times, spacing the ${changeCount} ${shapeWord}s evenly.`
    : `On the next row (${currentStitches} sts → ${targetStitches} sts): work ${uniqueMarkers[0] ?? repeatWork} st(s), ${action}, then continue spacing the remaining ${changeCount - 1} ${shapeWord}(s) about every ${repeatWork} stitch(es) across the row.`;

  return {
    targetStitches,
    sectionSize: base,
    remainder,
    instruction,
    repeatWork,
    markers: uniqueMarkers,
  };
}

/**
 * Cast-on calculator from gauge + desired width, with optional ease and ribbing factor.
 */
export function castOnStitches(
  width: number,
  unit: 'in' | 'cm',
  stitchesPer4in: number,
  easePercent = 0,
  /** Ribbing pulls in; multiply cast-on by this (e.g. 0.9) when casting on in rib */
  ribbingFactor = 1,
): { stitches: number; effectiveWidth: number } {
  const widthIn = unit === 'in' ? width : width / 2.54;
  const eased = widthIn * (1 + easePercent / 100);
  const stsPerInch = stitchesPer4in / 4;
  const stitches = Math.max(1, Math.round(eased * stsPerInch * ribbingFactor));
  return { stitches, effectiveWidth: Math.round(eased * 100) / 100 };
}
