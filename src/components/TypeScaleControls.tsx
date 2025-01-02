import React from 'react';
import { Platform } from '../types';
import { PlatformSelector } from './PlatformSelector';
import { FontControls } from './FontControls';
import { ScaleSelector } from './ScaleSelector';
import { FontSettings } from '../types/font';

interface TypeScaleControlsProps {
  platform: Platform;
  fontSettings: FontSettings;
  baseSize: number;
  previewText: string;
  scaleRatio: number;
  onPlatformChange: (platform: Platform) => void;
  onFontSettingsChange: (settings: FontSettings) => void;
  onBaseSizeChange: (size: number) => void;
  onPreviewTextChange: (text: string) => void;
  onScaleChange: (ratio: number) => void;
}

export function TypeScaleControls({
  platform,
  fontSettings,
  baseSize,
  previewText,
  scaleRatio,
  onPlatformChange,
  onFontSettingsChange,
  onBaseSizeChange,
  onPreviewTextChange,
  onScaleChange,
}: TypeScaleControlsProps) {
  return (
    <div className="p-6 border-b border-gray-200 space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Platform
          </label>
          <PlatformSelector
            platform={platform}
            onPlatformChange={onPlatformChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Base Size (px)
          </label>
          <input
            type="number"
            value={baseSize}
            onChange={(e) => onBaseSizeChange(Number(e.target.value))}
            className="block w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            min="8"
            max="24"
          />
        </div>
      </div>

      <FontControls 
        settings={fontSettings}
        onSettingsChange={onFontSettingsChange}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {platform === 'desktop' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scale Ratio
            </label>
            <ScaleSelector
              selectedScale={scaleRatio}
              onScaleChange={onScaleChange}
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preview Text
          </label>
          <input
            type="text"
            value={previewText}
            onChange={(e) => onPreviewTextChange(e.target.value)}
            className="block w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter preview text..."
          />
        </div>
      </div>
    </div>
  );
}