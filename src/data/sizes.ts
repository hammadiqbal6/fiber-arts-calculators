/**
 * Standard blanket, quilt, and mattress sizes.
 * Sources:
 * - Craft Yarn Council / common pattern sizes (blankets)
 * - The Spruce Crafts / Quilting Daily standard quilt finished sizes
 * - Mattress sizes: US Consumer Product Safety Commission / bedding industry standards
 * Values stored in inches (finished dimensions).
 */

export interface NamedSize {
  id: string;
  name: string;
  widthIn: number;
  lengthIn: number;
  notes?: string;
}

/** Common finished blanket / throw sizes used by knitters and crocheters */
export const BLANKET_SIZES: NamedSize[] = [
  { id: 'lovey', name: 'Lovey / Security', widthIn: 12, lengthIn: 12 },
  { id: 'security', name: 'Security blanket', widthIn: 14, lengthIn: 16 },
  { id: 'stroller', name: 'Stroller / Receiving', widthIn: 30, lengthIn: 36 },
  { id: 'crib', name: 'Crib', widthIn: 36, lengthIn: 54 },
  { id: 'toddler', name: 'Toddler', widthIn: 40, lengthIn: 60 },
  { id: 'throw', name: 'Throw / Lap', widthIn: 50, lengthIn: 60 },
  { id: 'afghan', name: 'Afghan', widthIn: 50, lengthIn: 65 },
  { id: 'twin', name: 'Twin blanket', widthIn: 66, lengthIn: 90 },
  { id: 'full', name: 'Full / Double blanket', widthIn: 80, lengthIn: 90 },
  { id: 'queen', name: 'Queen blanket', widthIn: 90, lengthIn: 90 },
  { id: 'king', name: 'King blanket', widthIn: 108, lengthIn: 90 },
];

/** Standard quilt finished sizes (approximate industry norms) */
export const QUILT_SIZES: NamedSize[] = [
  { id: 'baby', name: 'Baby / Crib quilt', widthIn: 36, lengthIn: 52 },
  { id: 'throw', name: 'Throw quilt', widthIn: 50, lengthIn: 65 },
  { id: 'twin', name: 'Twin quilt', widthIn: 70, lengthIn: 90 },
  { id: 'twin-xl', name: 'Twin XL quilt', widthIn: 70, lengthIn: 96 },
  { id: 'full', name: 'Full / Double quilt', widthIn: 85, lengthIn: 90 },
  { id: 'queen', name: 'Queen quilt', widthIn: 90, lengthIn: 100 },
  { id: 'king', name: 'King quilt', widthIn: 110, lengthIn: 100 },
  { id: 'cal-king', name: 'California King quilt', widthIn: 104, lengthIn: 108 },
];

/** US mattress sleeping surfaces (inches) */
export const MATTRESS_SIZES: NamedSize[] = [
  { id: 'crib', name: 'Crib mattress', widthIn: 28, lengthIn: 52, notes: 'Standard US crib' },
  { id: 'twin', name: 'Twin', widthIn: 38, lengthIn: 75 },
  { id: 'twin-xl', name: 'Twin XL', widthIn: 38, lengthIn: 80 },
  { id: 'full', name: 'Full / Double', widthIn: 54, lengthIn: 75 },
  { id: 'queen', name: 'Queen', widthIn: 60, lengthIn: 80 },
  { id: 'king', name: 'King', widthIn: 76, lengthIn: 80 },
  { id: 'cal-king', name: 'California King', widthIn: 72, lengthIn: 84 },
];

/** Adult sweater chest circumference presets (inches) for yarn estimates */
export const SWEATER_CHEST_IN: Record<string, number> = {
  xs: 32,
  s: 36,
  m: 40,
  l: 44,
  xl: 48,
  '2xl': 52,
  '3xl': 56,
};

/** Typical finished hat circumference (inches) */
export const HAT_CIRC_IN: Record<string, number> = {
  newborn: 14,
  baby: 16,
  toddler: 18,
  child: 20,
  'adult-sm': 21,
  adult: 22,
  'adult-lg': 23,
};
