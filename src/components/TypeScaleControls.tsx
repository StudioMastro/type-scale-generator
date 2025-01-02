import React from 'react';
import { Platform } from '../types';
import { PlatformSelector } from './PlatformSelector';
import { FontControls } from './FontControls';
import { ScaleSelector } from './ScaleSelector';
import { FontSettings } from '../types/font';
import { BaseSizeInput } from './BaseSizeInput';

interface TypeScaleControlsProps {
  platform: Platform;
  bodySettings: FontSettings;
  headingSettings: FontSettings;
  baseSize: number;
  scaleRatio: number;
  onPlatformChange: (platform: Platform) => void;
  onBodySettingsChange: (settings: Partial<FontSettings>) => void;
  onHeadingSettingsChange: (settings: Partial<FontSettings>) => void;
  onBaseSizeChange: (size: number) => void;
  onScaleChange: (ratio: number) => void;
}

export function TypeScaleControls({
  platform,
  bodySettings,
  headingSettings,
  baseSize,
  scaleRatio,
  onPlatformChange,
  onBodySettingsChange,
  onHeadingSettingsChange,
  onBaseSizeChange,
  onScaleChange,
}: TypeScaleControlsProps) {
  return (
    <div className="space-y-8 p-6">
      <div>
        <PlatformSelector
          platform={platform}
          onPlatformChange={onPlatformChange}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Base Settings</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base Size
            </label>
            <BaseSizeInput
              value={baseSize}
              onChange={onBaseSizeChange}
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scale Ratio
            </label>
            <ScaleSelector
              selectedScale={scaleRatio}
              onScaleChange={onScaleChange}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Body</h3>
          <FontControls 
            settings={bodySettings}
            onSettingsChange={onBodySettingsChange}
          />
        </div>

        {platform === 'desktop' && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Headings</h3>
            <FontControls 
              settings={headingSettings}
              onSettingsChange={onHeadingSettingsChange}
              allowInherit
            />
          </div>
        )}
      </div>
    </div>
  );
}