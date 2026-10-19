/**
 * Evenly space increases or decreases across a round/row.
 * Classic method: divide stitches into groups.
 */

export interface EvenShapingInput {
  currentStitches: number;
  /** Positive = increase, negative not used — use target instead */
  changeBy: number;
  mode: 'increase' | 'decrease';
}

export interface EvenShapingResult {
  groups: number;
  /** Stitches to work plain between shaping stitches */
  plainBetween: number;
  remainder: number;
  instructions: string;
  /** Alternate phrasing when remainder forces uneven groups */
  detailed: string[];
}

export function evenIncreaseDecrease(input: EvenShapingInput): EvenShapingResult {
  const { currentStitches, changeBy, mode } = input;
  if (currentStitches < 1) throw new Error('Stitch count must be at least 1');
  if (changeBy < 1) throw new Error('Change count must be at least 1');
  if (mode === 'decrease' && changeBy >= currentStitches) {
    throw new Error('Cannot decrease more stitches than you have');
  }

  const n = changeBy;
  const base = Math.floor(currentStitches / n);
  const rem = currentStitches % n;

  if (mode === 'increase') {
    // Work (base) sts, M1 — rem groups get one extra plain stitch
    const plainBetween = Math.max(0, base - 0);
    const instructions =
      rem === 0
        ? `*K${base}, M1; repeat from * ${n} times. (${currentStitches + n} sts)`
        : `Increase ${n} stitches evenly: work approximately every ${base} stitches, placing ${rem} larger group(s) of ${base + 1}.`;
    const detailed: string[] = [];
    if (rem === 0) {
      detailed.push(`Repeat ${n} times: knit ${base}, make 1.`);
    } else {
      detailed.push(`${rem} sections: work ${base + 1} stitches, then increase 1.`);
      detailed.push(`${n - rem} sections: work ${base} stitches, then increase 1.`);
    }
    return { groups: n, plainBetween, remainder: rem, instructions, detailed };
  }

  // Decrease: k2tog (or similar) spaced evenly
  const workBefore = Math.floor((currentStitches - n) / n);
  const remDec = (currentStitches - n) % n;
  const instructions =
    remDec === 0
      ? `*K${workBefore}, k2tog; repeat from * ${n} times. (${currentStitches - n} sts)`
      : `Decrease ${n} stitches evenly across ${currentStitches} stitches.`;
  const detailed: string[] = [];
  if (remDec === 0) {
    detailed.push(`Repeat ${n} times: knit ${workBefore}, knit 2 together.`);
  } else {
    detailed.push(`${remDec} sections: work ${workBefore + 1} stitches, then k2tog.`);
    detailed.push(`${n - remDec} sections: work ${workBefore} stitches, then k2tog.`);
  }
  return {
    groups: n,
    plainBetween: workBefore,
    remainder: remDec,
    instructions,
    detailed,
  };
}

export function targetStitchChange(
  current: number,
  target: number,
): { mode: 'increase' | 'decrease'; changeBy: number } | { mode: 'none'; changeBy: 0 } {
  if (target === current) return { mode: 'none', changeBy: 0 };
  if (target > current) return { mode: 'increase', changeBy: target - current };
  return { mode: 'decrease', changeBy: current - target };
}
