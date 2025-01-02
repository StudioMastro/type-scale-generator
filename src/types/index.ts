export type Platform = 'desktop' | 'ios' | 'android';

export type ScalePreset = {
  name: string;
  ratios: number[];
  baseSize: number;
  elements: string[];
};

export type FontPreview = {
  family: string;
  category: string;
  variants: string[];
};

export type TypeScale = {
  element: string;
  size: number;
  lineHeight: number;
  scaleFactor: number;
};

export type ProgressiveScale = {
  value: number;
  name: string;
};

export const PROGRESSIVE_SCALES: ProgressiveScale[] = [
  { value: 1.067, name: 'Minor Second' },
  { value: 1.125, name: 'Major Second' },
  { value: 1.200, name: 'Minor Third' },
  { value: 1.250, name: 'Major Third' },
  { value: 1.333, name: 'Perfect Fourth' },
  { value: 1.414, name: 'Augmented Fourth' },
  { value: 1.500, name: 'Perfect Fifth' },
  { value: 1.618, name: 'Golden Ratio' }
];