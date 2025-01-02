import React from 'react';
import { TypeScale } from '../types';
import { FontSettings } from '../types/font';

interface TypeScaleDisplayProps {
  scales: TypeScale[];
  fontSettings: FontSettings;
  previewText: string;
}

export function TypeScaleDisplay({ scales, fontSettings, previewText }: TypeScaleDisplayProps) {
  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-8 grid gap-2">
      {scales.map((scale) => (
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
              fontFamily: fontSettings.family,
              fontSize: `${scale.size}px`,
              fontWeight: fontSettings.weight,
              letterSpacing: fontSettings.letterSpacing,
              lineHeight: fontSettings.lineHeight,
              color: fontSettings.color,
              backgroundColor: fontSettings.backgroundColor,
              height: 'auto',
              minHeight: `${scale.size}px`
            }}
            className="transition-colors hover:text-indigo-600 truncate py-1 px-2 rounded"
          >
            {previewText}
          </div>
        </div>
      ))}
    </div>
  );
}