import React from 'react';
import { PROGRESSIVE_SCALES } from '../types';

interface ScaleSelectorProps {
  selectedScale: number;
  onScaleChange: (scale: number) => void;
}

export function ScaleSelector({ selectedScale, onScaleChange }: ScaleSelectorProps) {
  return (
    <div>
      <select
        value={selectedScale}
        onChange={(e) => onScaleChange(Number(e.target.value))}
        className="block w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {PROGRESSIVE_SCALES.map((scale) => (
          <option key={scale.value} value={scale.value}>
            {scale.value} – {scale.name}
          </option>
        ))}
      </select>
    </div>
  );
}