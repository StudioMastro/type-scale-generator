import { create } from 'zustand';
import { Platform } from '../types';
import { PROGRESSIVE_SCALES } from '../types';

interface FontSettings {
  family: string;
  weight: string;
  lineHeight: string;
  letterSpacing: string;
  color: string;
  backgroundColor: string;
}

interface TypographyState {
  platform: Platform;
  baseSize: number;
  scaleRatio: number;
  bodySettings: FontSettings;
  headingSettings: FontSettings;
  previewText: string;
  setPlatform: (platform: Platform) => void;
  setBaseSize: (size: number) => void;
  setScaleRatio: (ratio: number) => void;
  setBodySettings: (settings: Partial<FontSettings>) => void;
  setHeadingSettings: (settings: Partial<FontSettings>) => void;
  setPreviewText: (text: string) => void;
}

export const useTypographyStore = create<TypographyState>((set) => ({
  platform: 'desktop',
  baseSize: 16,
  scaleRatio: PROGRESSIVE_SCALES[2].value,
  bodySettings: {
    family: 'Inter',
    weight: '400',
    letterSpacing: '0em',
    lineHeight: '1.6',
    color: '#222222',
    backgroundColor: '#FFFFFF'
  },
  headingSettings: {
    family: 'inherit',
    weight: '700',
    letterSpacing: '-0.022em',
    lineHeight: '1.15',
    color: 'inherit',
    backgroundColor: 'inherit'
  },
  previewText: '',

  setPlatform: (platform) => set({ platform }),
  setBaseSize: (baseSize) => set({ baseSize }),
  setScaleRatio: (scaleRatio) => set({ scaleRatio }),
  setBodySettings: (settings) => 
    set((state) => ({ 
      bodySettings: { ...state.bodySettings, ...settings } 
    })),
  setHeadingSettings: (settings) =>
    set((state) => ({
      headingSettings: { ...state.headingSettings, ...settings }
    })),
  setPreviewText: (previewText) => set({ previewText })
})); 