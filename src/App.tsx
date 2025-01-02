import React, { useState, useEffect } from 'react';
import { Platform } from './types';
import { Header } from './components/Header';
import { TypeScaleControls } from './components/TypeScaleControls';
import { TypeScaleDisplay } from './components/TypeScaleDisplay';
import { useTypeScale } from './hooks/useTypeScale';
import { PROGRESSIVE_SCALES } from './types';
import { FontSettings } from './types/font';
import { loadGoogleFont, preloadPopularFonts } from './utils/fonts';

export function App() {
  const [platform, setPlatform] = useState<Platform>('desktop');
  const [fontSettings, setFontSettings] = useState<FontSettings>({
    family: 'Inter',
    weight: '400',
    letterSpacing: '0em',
    lineHeight: '1.2',
    color: '#222222',
    backgroundColor: '#FFFFFF'
  });
  const [baseSize, setBaseSize] = useState(16);
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog');
  const [scaleRatio, setScaleRatio] = useState(PROGRESSIVE_SCALES[2].value);
  const [isLoading, setIsLoading] = useState(true);

  const scales = useTypeScale(platform, baseSize, scaleRatio);

  // Preload popular fonts on mount
  useEffect(() => {
    preloadPopularFonts();
    setIsLoading(false);
  }, []);

  // Load selected font when it changes
  useEffect(() => {
    loadGoogleFont(fontSettings.family);
  }, [fontSettings.family]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading fonts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <TypeScaleControls
            platform={platform}
            fontSettings={fontSettings}
            baseSize={baseSize}
            previewText={previewText}
            scaleRatio={scaleRatio}
            onPlatformChange={setPlatform}
            onFontSettingsChange={setFontSettings}
            onBaseSizeChange={setBaseSize}
            onPreviewTextChange={setPreviewText}
            onScaleChange={setScaleRatio}
          />
          <TypeScaleDisplay 
            scales={scales} 
            fontSettings={fontSettings}
            previewText={previewText}
          />
        </div>
      </main>
    </div>
  );
}