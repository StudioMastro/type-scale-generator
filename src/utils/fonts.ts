import { GoogleFont } from '../types/font';
import WebFont from 'webfontloader';

interface GoogleFont {
  family: string;
  category: string;
  variants: string[];
}

export const POPULAR_FONTS: GoogleFont[] = [
  { family: 'Inter', category: 'sans-serif', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
  { family: 'Roboto', category: 'sans-serif', variants: ['100', '300', '400', '500', '700', '900'] },
  { family: 'Open Sans', category: 'sans-serif', variants: ['300', '400', '500', '600', '700', '800'] },
  { family: 'Lato', category: 'sans-serif', variants: ['100', '300', '400', '700', '900'] },
  { family: 'Poppins', category: 'sans-serif', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
  { family: 'Montserrat', category: 'sans-serif', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
  { family: 'Source Sans Pro', category: 'sans-serif', variants: ['200', '300', '400', '600', '700', '900'] },
  { family: 'Playfair Display', category: 'serif', variants: ['400', '500', '600', '700', '800', '900'] },
  { family: 'Merriweather', category: 'serif', variants: ['300', '400', '700', '900'] },
  { family: 'Source Serif Pro', category: 'serif', variants: ['200', '300', '400', '600', '700', '900'] }
];

export function loadGoogleFont(family: string) {
  if (family === 'inherit') return;
  
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/\s+/g, '+')}:wght@100;200;300;400;500;600;700;800;900&display=swap`;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}