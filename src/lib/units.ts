/** Unit conversion helpers used across calculators. */

export type LengthUnit = 'in' | 'cm';
export type FabricLengthUnit = 'yd' | 'm';
export type WeightUnit = 'g' | 'oz';

export function inchesToCm(inches: number): number {
  return inches * 2.54;
}

export function cmToInches(cm: number): number {
  return cm / 2.54;
}

export function yardsToMeters(yards: number): number {
  return yards * 0.9144;
}

export function metersToYards(meters: number): number {
  return meters / 0.9144;
}

export function gramsToOz(grams: number): number {
  return grams / 28.349523125;
}

export function ozToGrams(oz: number): number {
  return oz * 28.349523125;
}

export function toInches(value: number, unit: LengthUnit): number {
  return unit === 'in' ? value : cmToInches(value);
}

export function fromInches(inches: number, unit: LengthUnit): number {
  return unit === 'in' ? inches : inchesToCm(inches);
}

export function toYards(value: number, unit: FabricLengthUnit): number {
  return unit === 'yd' ? value : metersToYards(value);
}

export function fromYards(yards: number, unit: FabricLengthUnit): number {
  return unit === 'yd' ? yards : yardsToMeters(yards);
}

export function toGrams(value: number, unit: WeightUnit): number {
  return unit === 'g' ? value : ozToGrams(value);
}

export function fromGrams(grams: number, unit: WeightUnit): number {
  return unit === 'g' ? grams : gramsToOz(grams);
}

export function round(value: number, decimals = 2): number {
  const f = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * f) / f;
}

export function ceilTo(value: number, step = 1): number {
  return Math.ceil(value / step) * step;
}
