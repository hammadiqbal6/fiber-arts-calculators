/**
 * Standard blanket, quilt, and mattress sizes (inches).
 * Mattress/bedding dimensions align with common US retail standards
 * (e.g. summarized by the International Sleep Products Association / industry charts).
 * Craft blanket ranges follow common knitting/crochet pattern conventions.
 */

export interface NamedSize {
  id: string;
  name: string;
  widthIn: number;
  lengthIn: number;
  category: 'blanket' | 'quilt' | 'mattress';
}

export const BLANKET_SIZES: NamedSize[] = [
  { id: 'lovey', name: 'Lovey / security', widthIn: 12, lengthIn: 12, category: 'blanket' },
  { id: 'stroller', name: 'Stroller', widthIn: 30, lengthIn: 35, category: 'blanket' },
  { id: 'receiving', name: 'Receiving / baby', widthIn: 30, lengthIn: 36, category: 'blanket' },
  { id: 'crib', name: 'Crib', widthIn: 36, lengthIn: 52, category: 'blanket' },
  { id: 'throw', name: 'Throw', widthIn: 50, lengthIn: 60, category: 'blanket' },
  { id: 'twin-blanket', name: 'Twin blanket', widthIn: 66, lengthIn: 90, category: 'blanket' },
  { id: 'full-blanket', name: 'Full / double blanket', widthIn: 80, lengthIn: 90, category: 'blanket' },
  { id: 'queen-blanket', name: 'Queen blanket', widthIn: 90, lengthIn: 100, category: 'blanket' },
  { id: 'king-blanket', name: 'King blanket', widthIn: 108, lengthIn: 100, category: 'blanket' },
];

/** Finished quilt top sizes commonly used by quilters (approx.). */
export const QUILT_SIZES: NamedSize[] = [
  { id: 'baby-quilt', name: 'Baby quilt', widthIn: 36, lengthIn: 52, category: 'quilt' },
  { id: 'crib-quilt', name: 'Crib quilt', widthIn: 36, lengthIn: 54, category: 'quilt' },
  { id: 'throw-quilt', name: 'Throw quilt', widthIn: 50, lengthIn: 65, category: 'quilt' },
  { id: 'twin-quilt', name: 'Twin quilt', widthIn: 64, lengthIn: 86, category: 'quilt' },
  { id: 'full-quilt', name: 'Full quilt', widthIn: 78, lengthIn: 88, category: 'quilt' },
  { id: 'queen-quilt', name: 'Queen quilt', widthIn: 84, lengthIn: 92, category: 'quilt' },
  { id: 'king-quilt', name: 'King quilt', widthIn: 100, lengthIn: 92, category: 'quilt' },
  { id: 'cal-king-quilt', name: 'California King quilt', widthIn: 96, lengthIn: 104, category: 'quilt' },
];

/** US mattress sizes (inches). Source: common ISPA / bedding industry chart. */
export const MATTRESS_SIZES: NamedSize[] = [
  { id: 'crib-mattress', name: 'Crib mattress', widthIn: 28, lengthIn: 52, category: 'mattress' },
  { id: 'twin-mattress', name: 'Twin', widthIn: 38, lengthIn: 75, category: 'mattress' },
  { id: 'twin-xl', name: 'Twin XL', widthIn: 38, lengthIn: 80, category: 'mattress' },
  { id: 'full-mattress', name: 'Full / Double', widthIn: 54, lengthIn: 75, category: 'mattress' },
  { id: 'queen-mattress', name: 'Queen', widthIn: 60, lengthIn: 80, category: 'mattress' },
  { id: 'king-mattress', name: 'King', widthIn: 76, lengthIn: 80, category: 'mattress' },
  { id: 'cal-king-mattress', name: 'California King', widthIn: 72, lengthIn: 84, category: 'mattress' },
];

export const ALL_SIZES = [...BLANKET_SIZES, ...QUILT_SIZES, ...MATTRESS_SIZES];

export function findSize(id: string): NamedSize | undefined {
  return ALL_SIZES.find((s) => s.id === id);
}
