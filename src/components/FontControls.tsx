import React from 'react';
import { FontSettings, GoogleFont } from '../types/font';
import { FontSelector } from './FontSelector';

interface FontControlsProps {
  settings: FontSettings;
  onSettingsChange: (settings: FontSettings) => void;
}

export function FontControls({ settings, onSettingsChange }: FontControlsProps) {
  const handleChange = (key: keyof FontSettings, value: string) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Family
        </label>
        <FontSelector
          selectedFont={settings.family}
          onFontChange={(font) => handleChange('family', font)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Weight
        </label>
        <select
          value={settings.weight}
          onChange={(e) => handleChange('weight', e.target.value)}
          className="block w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="100">100 (Thin)</option>
          <option value="200">200 (Extra Light)</option>
          <option value="300">300 (Light)</option>
          <option value="400">400 (Regular)</option>
          <option value="500">500 (Medium)</option>
          <option value="600">600 (Semi Bold)</option>
          <option value="700">700 (Bold)</option>
          <option value="800">800 (Extra Bold)</option>
          <option value="900">900 (Black)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Line Height
        </label>
        <input
          type="number"
          value={settings.lineHeight}
          onChange={(e) => handleChange('lineHeight', e.target.value)}
          step="0.1"
          min="0.5"
          max="3"
          className="block w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Letter Spacing
        </label>
        <input
          type="text"
          value={settings.letterSpacing}
          onChange={(e) => handleChange('letterSpacing', e.target.value)}
          placeholder="e.g. -0.05em"
          className="block w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color
        </label>
        <input
          type="color"
          value={settings.color}
          onChange={(e) => handleChange('color', e.target.value)}
          className="block w-full h-10 px-1 py-1 rounded-md border border-gray-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Background
        </label>
        <input
          type="color"
          value={settings.backgroundColor}
          onChange={(e) => handleChange('backgroundColor', e.target.value)}
          className="block w-full h-10 px-1 py-1 rounded-md border border-gray-300"
        />
      </div>
    </div>
  );
}