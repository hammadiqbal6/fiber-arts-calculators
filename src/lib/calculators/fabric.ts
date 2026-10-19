import { ceilTo, fromMeters, round, toCm, toMeters, type FabricLengthUnit, type LengthUnit } from '../units';

export type GarmentType = 'garment' | 'curtains' | 'upholstery' | 'tablecloth';

export interface FabricYardageInput {
  type: GarmentType;
  /** Piece width needed (garment: pattern piece max width; curtains: rod width, etc.) */
  width: number;
  /** Piece length / drop */
  length: number;
  unit: LengthUnit;
  /** Fabric bolt width */
  fabricWidth: number;
  fabricWidthUnit: LengthUnit;
  /** Number of identical panels / repeats */
  pieces?: number;
  /** Waste / matching percent */
  wastePercent?: number;
  /** Pattern repeat length along grain (0 if none) */
  patternRepeat?: number;
  patternRepeatUnit?: LengthUnit;
  outputUnit?: FabricLengthUnit;
}

export interface FabricYardageResult {
  yards: number;
  meters: number;
  panelsNeeded: number;
  usableWidthCm: number;
  lengthPerPanelCm: number;
  notes: string[];
}

export function fabricYardage(input: FabricYardageInput): FabricYardageResult {
  const pieces = input.pieces ?? 1;
  const waste = (input.wastePercent ?? 10) / 100;
  const pieceW = toCm(input.width, input.unit);
  const pieceL = toCm(input.length, input.unit);
  const fabricW = toCm(input.fabricWidth, input.fabricWidthUnit);
  const notes: string[] = [];

  if (pieceW > fabricW) {
    notes.push('Piece is wider than fabric — you will need to seam panels or choose wider goods.');
  }

  const across = Math.max(1, Math.floor(fabricW / pieceW));
  const panelsNeeded = Math.ceil(pieces / across);
  let lengthPerPanel = pieceL;

  if (input.patternRepeat && input.patternRepeat > 0) {
    const rep = toCm(input.patternRepeat, input.patternRepeatUnit ?? input.unit);
    lengthPerPanel = ceilTo(pieceL, rep);
    notes.push(`Length rounded up to pattern repeat (${round(rep, 1)} cm).`);
  }

  // Curtains: typically pair of panels; upholstery often needs extra for welting
  if (input.type === 'curtains') {
    notes.push('Curtain math assumes flat panels. Add fullness (1.5×–3× width) before calculating if gathering.');
  }
  if (input.type === 'upholstery') {
    notes.push('Upholstery: add extra for welting, matching, and directional nap if not already in waste %.');
  }
  if (input.type === 'tablecloth') {
    notes.push('Tablecloth: length includes drop on all sides. Verify seam placement for large tables.');
  }

  const totalCm = panelsNeeded * lengthPerPanel * (1 + waste);
  const meters = totalCm / 100;
  const yards = meters / 0.9144;

  return {
    yards: round(yards, 2),
    meters: round(meters, 2),
    panelsNeeded,
    usableWidthCm: round(fabricW, 1),
    lengthPerPanelCm: round(lengthPerPanel, 1),
    notes,
  };
}

export function convertFabricLength(value: number, from: FabricLengthUnit, to: FabricLengthUnit): number {
  const m = toMeters(value, from);
  return round(fromMeters(m, to), 3);
}
