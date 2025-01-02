import { useState, useEffect } from 'react';
import { POPULAR_FONTS } from '../utils/fonts';

interface GoogleFontsResponse {
  items: Array<{
    family: string;
    variants: string[];
    category: string;
  }>;
}

export function useGoogleFonts() {
  const [fonts, setFonts] = useState<string[]>(POPULAR_FONTS.map(font => font.family));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_FONTS_API_KEY;
        const response = await fetch(
          `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=alpha`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch fonts');
        }

        const data: GoogleFontsResponse = await response.json();
        
        if (data.items && Array.isArray(data.items)) {
          setFonts(data.items.map(font => font.family));
          setError(null);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching fonts:', error);
        setError('Failed to load all fonts. Showing popular fonts only.');
      } finally {
        setIsLoading(false);
      }
    };

    loadFonts();
  }, []);

  return { fonts, isLoading, error };
} 