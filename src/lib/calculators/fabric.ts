import { fromYards, round, toInches, type FabricLengthUnit, type LengthUnit } from '../units';

export type FabricProject =
  | 'garment'
  | 'curtains'
  | 'upholstery'
  | 'tablecloth';

export interface FabricYardageInput {
  project: FabricProject;
  /** Finished width of item (or window width for curtains) */
  width: number;
  /** Finished length / drop */
  length: number;
  unit: LengthUnit;
  /** Bolt / fabric width */
  fabricWidth: number;
  fabricWidthUnit: LengthUnit;
  /** Pattern repeat length along grain (0 if none) */
  patternRepeat?: number;
  patternRepeatUnit?: LengthUnit;
  /** Extra for seams/hem/shrink (percent) */
  wastePercent?: number;
  /** Curtains: number of panels / fullness multiplier (e.g. 2 = 2× fullness) */
  fullness?: number;
  /** Garment: number of main pattern pieces estimated as coverage factor 1–2 */
  garmentFactor?: number;
}

export interface FabricYardageResult {
  yards: number;
  meters: number;
  panelsNeeded: number;
  cutLengthIn: number;
  notes: string;
}

export function fabricYardage(input: FabricYardageInput): FabricYardageResult {
  const itemW = toInches(input.width, input.unit);
  const itemL = toInches(input.length, input.unit);
  const fabW = toInches(input.fabricWidth, input.fabricWidthUnit);
  const waste = 1 + (input.wastePercent ?? 10) / 100;
  const repeat = input.patternRepeat
    ? toInches(input.patternRepeat, input.patternRepeatUnit ?? input.unit)
    : 0;

  let cutLengthIn = 0;
  let panelsNeeded = 1;
  let notes = '';

  switch (input.project) {
    case 'curtains': {
      const fullness = input.fullness ?? 2;
      const totalWidth = itemW * fullness;
      panelsNeeded = Math.max(1, Math.ceil(totalWidth / fabW));
      // Hem + header: +8–12"
      let drop = itemL + 10;
      if (repeat > 0) drop = Math.ceil(drop / repeat) * repeat;
      cutLengthIn = drop * panelsNeeded;
      notes = `${panelsNeeded} panel(s) at ${fullness}× fullness; includes ~10" for hem/header.`;
      break;
    }
    case 'upholstery': {
      // Simple rectangular cover with wrap
      const wrap = 6; // inches wrap/tuck each side
      const needW = itemW + wrap * 2;
      const needL = itemL + wrap * 2;
      panelsNeeded = Math.max(1, Math.ceil(needW / fabW));
      let len = needL;
      if (repeat > 0) len = Math.ceil(len / repeat) * repeat;
      cutLengthIn = len * panelsNeeded;
      notes = 'Includes 6" wrap on each side; match repeats if patterned.';
      break;
    }
    case 'tablecloth': {
      const overhang = 10;
      const needW = itemW + overhang * 2;
      const needL = itemL + overhang * 2;
      panelsNeeded = Math.max(1, Math.ceil(needW / fabW));
      let len = needL;
      if (repeat > 0) len = Math.ceil(len / repeat) * repeat;
      cutLengthIn = len * (panelsNeeded > 1 ? panelsNeeded : 1);
      // If fabric wider than needed, just one length
      if (needW <= fabW) {
        panelsNeeded = 1;
        cutLengthIn = len;
      }
      notes = 'Includes ~10" overhang per side.';
      break;
    }
    case 'garment':
    default: {
      const factor = input.garmentFactor ?? 1.5;
      // Approximate: length × factor, with possible second panel if piece wider than fabric
      panelsNeeded = itemW * 0.6 > fabW ? 2 : 1;
      let len = itemL * factor;
      if (repeat > 0) len = Math.ceil(len / repeat) * repeat;
      cutLengthIn = len * panelsNeeded;
      notes = 'Planning estimate only — always check your pattern’s yardage chart.';
      break;
    }
  }

  cutLengthIn *= waste;
  const yards = round(cutLengthIn / 36, 2);
  const meters = round(fromYards(yards, 'm'), 2);
  return { yards, meters, panelsNeeded, cutLengthIn: round(cutLengthIn, 1), notes };
}

/** Seam allowance helpers and simple grade between sizes. */
export function cutSizeFromFinished(
  finished: number,
  seamAllowance: number,
  unit: LengthUnit,
  seams = 2,
): number {
  // finished + seamAllowance * seams (each seam adds SA once per edge counted)
  const f = toInches(finished, unit);
  const sa = toInches(seamAllowance, unit);
  return round(f + sa * seams, 3);
}

export function gradeMeasurement(
  baseMeasurement: number,
  fromSizeIndex: number,
  toSizeIndex: number,
  gradePerSize: number,
): number {
  return round(baseMeasurement + (toSizeIndex - fromSizeIndex) * gradePerSize, 3);
}

export function addEase(bodyMeasurement: number, ease: number): number {
  return round(bodyMeasurement + ease, 3);
}
