import { PROGRESSIVE_SCALES } from '../types';

interface ScaleSelectorProps {
  selectedScale: number;
  onScaleChange: (scale: number) => void;
}

export function ScaleSelector({ selectedScale, onScaleChange }: ScaleSelectorProps) {
  return (
    <div className="relative group">
      <select
        value={selectedScale}
        onChange={(e) => onScaleChange(Number(e.target.value))}
        className="block w-full px-4 py-2 pr-12 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none cursor-pointer"
      >
        {PROGRESSIVE_SCALES.map((scale) => (
          <option key={scale.value} value={scale.value}>
            {scale.label}
          </option>
        ))}
      </select>
      <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none">
        <div className="h-full flex items-center">
          <div className="px-2">
            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}