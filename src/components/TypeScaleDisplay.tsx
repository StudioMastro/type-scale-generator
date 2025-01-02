import React from 'react';
import { TypeScale } from '../types';
import { FontSettings } from '../types/font';

const FALLBACK_TEXT = "The quick brown fox jumps over the lazy dog";

interface TypeScaleDisplayProps {
  scales: TypeScale[];
  bodySettings: FontSettings;
  headingSettings: FontSettings;
  previewText: string;
}

export function TypeScaleDisplay({ 
  scales, 
  bodySettings, 
  headingSettings, 
  previewText 
}: TypeScaleDisplayProps) {
  const displayText = previewText.trim() || FALLBACK_TEXT;

  return (
    <div className="w-full grid gap-2">
      {scales.map((scale) => {
        const settings = scale.type === 'heading' ? headingSettings : bodySettings;
        const fontFamily = settings.family === 'inherit' ? bodySettings.family : settings.family;
        const color = settings.color === 'inherit' ? bodySettings.color : settings.color;
        const backgroundColor = settings.backgroundColor === 'inherit' ? bodySettings.backgroundColor : settings.backgroundColor;

        return (
          <div
            key={scale.element}
            className="grid grid-cols-[200px,1fr] items-center border-l-4 border-indigo-500 pl-4 transition-all hover:border-indigo-600 min-h-[32px]"
          >
            <div className="text-sm text-gray-600 flex flex-col justify-center py-1">
              <div className="font-medium">{scale.element}</div>
              <div className="text-xs text-gray-500">
                {scale.size}px / {scale.lineHeight}
              </div>
            </div>
            <div
              style={{
                fontFamily,
                fontSize: `${scale.size}px`,
                fontWeight: settings.weight,
                letterSpacing: settings.letterSpacing,
                lineHeight: settings.lineHeight,
                color,
                backgroundColor,
                height: 'auto',
                minHeight: `${scale.size}px`
              }}
              className="transition-colors hover:text-indigo-600 truncate py-1 px-2 rounded"
            >
              {displayText}
            </div>
          </div>
        );
      })}
    </div>
  );
}