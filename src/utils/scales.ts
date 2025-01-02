import { Platform } from '../types';

// iOS Typography Scale based on Apple Human Interface Guidelines
export const IOS_SCALE = {
  name: 'iOS',
  ratios: [
    3.125, // Large Title (34pt)
    2.875, // Title 1 (28pt)
    2.375, // Title 2 (22pt)
    1.875, // Title 3 (20pt)
    1.5,   // Headline (17pt)
    1.375, // Body (16pt)
    1.25,  // Callout (15pt)
    1.125, // Subhead (14pt)
    1,     // Footnote (13pt)
    0.875  // Caption (12pt)
  ],
  baseSize: 16,
  elements: [
    'largeTitle',
    'title1',
    'title2',
    'title3',
    'headline',
    'body',
    'callout',
    'subhead',
    'footnote',
    'caption'
  ]
};

// Material Design 3 Typography Scale
export const ANDROID_SCALE = {
  name: 'Android',
  ratios: [
    3.5625, // Display Large (57px)
    2.75,   // Display Medium (45px)
    2.25,   // Display Small (36px)
    2,      // Headline Large (32px)
    1.75,   // Headline Medium (28px)
    1.5,    // Headline Small (24px)
    1.375,  // Title Large (22px)
    1.25,   // Title Medium (16px)
    1.125,  // Title Small (14px)
    1,      // Body Large (16px)
    0.875,  // Body Medium (14px)
    0.75    // Body Small (12px)
  ],
  baseSize: 16,
  elements: [
    'displayLarge',
    'displayMedium',
    'displaySmall',
    'headlineLarge',
    'headlineMedium',
    'headlineSmall',
    'titleLarge',
    'titleMedium',
    'titleSmall',
    'bodyLarge',
    'bodyMedium',
    'bodySmall'
  ]
};

export const generateDesktopScale = (baseSize: number, ratio: number): number[] => {
  const scales: number[] = [];
  let currentScale = 1;
  
  // Generate 6 heading sizes in descending order
  for (let i = 6; i > 0; i--) {
    currentScale *= ratio;
    scales.unshift(currentScale);
  }
  
  return scales;
};

export const DESKTOP_SCALE = {
  name: 'Desktop',
  ratios: generateDesktopScale(16, 1.2), // Default to Minor Third
  baseSize: 16,
  elements: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
};

export const calculateScale = (baseSize: number, ratio: number): number => {
  return Math.round(baseSize * ratio);
};

export const calculateLineHeight = (fontSize: number, platform: Platform): number => {
  switch (platform) {
    case 'ios':
      return Math.round((fontSize * 1.3) * 100) / 100;
    case 'android':
      return Math.round((fontSize * 1.5) * 100) / 100;
    default:
      return Math.round((fontSize * 1.4) * 100) / 100;
  }
};