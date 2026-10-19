/** Unit conversion helpers — inches/cm, yards/meters, grams/oz */

export type LengthUnit = 'in' | 'cm';
export type FabricLengthUnit = 'yd' | 'm';
export type WeightUnit = 'g' | 'oz';

export const IN_TO_CM = 2.54;
export const YD_TO_M = 0.9144;
export const OZ_TO_G = 28.349523125;
export const CM_TO_IN = 1 / IN_TO_CM;
export const M_TO_YD = 1 / YD_TO_M;
export const G_TO_OZ = 1 / OZ_TO_G;

export function toCm(value: number, unit: LengthUnit): number {
  return unit === 'cm' ? value : value * IN_TO_CM;
}

export function fromCm(cm: number, unit: LengthUnit): number {
  return unit === 'cm' ? cm : cm * CM_TO_IN;
}

export function toMeters(value: number, unit: FabricLengthUnit): number {
  return unit === 'm' ? value : value * YD_TO_M;
}

export function fromMeters(m: number, unit: FabricLengthUnit): number {
  return unit === 'm' ? m : m * M_TO_YD;
}

export function toGrams(value: number, unit: WeightUnit): number {
  return unit === 'g' ? value : value * OZ_TO_G;
}

export function fromGrams(g: number, unit: WeightUnit): number {
  return unit === 'g' ? g : g * G_TO_OZ;
}

export function round(n: number, decimals = 2): number {
  const f = 10 ** decimals;
  return Math.round((n + Number.EPSILON) * f) / f;
}

export function ceilTo(n: number, step = 1): number {
  return Math.ceil(n / step) * step;
}
