import { GoogleFont } from '../types/font';
import WebFont from 'webfontloader';

// Lista estesa di font di Google
export const ALL_FONTS: GoogleFont[] = [
  // Sans Serif
  { family: 'Inter', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], category: 'sans-serif' },
  { family: 'Roboto', variants: ['100', '300', '400', '500', '700', '900'], category: 'sans-serif' },
  { family: 'Open Sans', variants: ['300', '400', '500', '600', '700', '800'], category: 'sans-serif' },
  { family: 'Lato', variants: ['100', '300', '400', '700', '900'], category: 'sans-serif' },
  { family: 'Poppins', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], category: 'sans-serif' },
  { family: 'Montserrat', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], category: 'sans-serif' },
  { family: 'Source Sans Pro', variants: ['200', '300', '400', '600', '700', '900'], category: 'sans-serif' },
  { family: 'Nunito', variants: ['200', '300', '400', '500', '600', '700', '800', '900'], category: 'sans-serif' },
  { family: 'Ubuntu', variants: ['300', '400', '500', '700'], category: 'sans-serif' },
  { family: 'Raleway', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], category: 'sans-serif' },
  // Serif
  { family: 'Playfair Display', variants: ['400', '500', '600', '700', '800', '900'], category: 'serif' },
  { family: 'Merriweather', variants: ['300', '400', '700', '900'], category: 'serif' },
  { family: 'Lora', variants: ['400', '500', '600', '700'], category: 'serif' },
  { family: 'PT Serif', variants: ['400', '700'], category: 'serif' },
  { family: 'Crimson Text', variants: ['400', '600', '700'], category: 'serif' },
  // Display
  { family: 'Bebas Neue', variants: ['400'], category: 'display' },
  { family: 'Pacifico', variants: ['400'], category: 'handwriting' },
  { family: 'Dancing Script', variants: ['400', '500', '600', '700'], category: 'handwriting' },
  // Monospace
  { family: 'Source Code Pro', variants: ['200', '300', '400', '500', '600', '700', '800', '900'], category: 'monospace' },
  { family: 'Fira Code', variants: ['300', '400', '500', '600', '700'], category: 'monospace' },
  { family: 'JetBrains Mono', variants: ['100', '200', '300', '400', '500', '600', '700', '800'], category: 'monospace' },
  // Material Symbols
  { family: 'Material Symbols Outlined', variants: ['400'], category: 'symbol' },
  // Popular Non-English
  { family: 'Noto Sans JP', variants: ['100', '300', '400', '500', '700', '900'], category: 'sans-serif' },
  { family: 'Noto Sans KR', variants: ['100', '300', '400', '500', '700', '900'], category: 'sans-serif' },
  { family: 'Noto Sans SC', variants: ['100', '300', '400', '500', '700', '900'], category: 'sans-serif' }
];

// Font popolari per il caricamento iniziale
export const POPULAR_FONTS: GoogleFont[] = ALL_FONTS.slice(0, 7);

const loadedFonts = new Set<string>();

export function loadGoogleFont(family: string): void {
  if (loadedFonts.has(family)) {
    return;
  }

  try {
    WebFont.load({
      google: {
        families: [family]
      },
      active: () => {
        loadedFonts.add(family);
      },
      inactive: () => {
        console.error('Failed to load font:', family);
      }
    });
  } catch (error) {
    console.error('Error loading font:', family, error);
  }
}

// Precarica i font popolari
export function preloadPopularFonts(): void {
  WebFont.load({
    google: {
      families: POPULAR_FONTS.map(font => font.family)
    }
  });
}