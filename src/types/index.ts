export type Platform = 'desktop' | 'ios' | 'android';

export interface TypeScale {
  element: string;
  type: 'heading' | 'body';
  size: number;
  lineHeight: number;
}

export const PROGRESSIVE_SCALES = [
  { label: 'Minor Second (1.067)', value: 1.067 },
  { label: 'Major Second (1.125)', value: 1.125 },
  { label: 'Minor Third (1.2)', value: 1.2 },
  { label: 'Major Third (1.25)', value: 1.25 },
  { label: 'Perfect Fourth (1.333)', value: 1.333 },
  { label: 'Augmented Fourth (1.414)', value: 1.414 },
  { label: 'Perfect Fifth (1.5)', value: 1.5 },
  { label: 'Golden Ratio (1.618)', value: 1.618 },
];