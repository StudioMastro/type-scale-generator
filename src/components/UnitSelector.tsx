import { type Unit } from '../types';

interface UnitSelectorProps {
  value: Unit;
  onChange: (unit: Unit) => void;
}

export function UnitSelector({ value, onChange }: UnitSelectorProps) {
  const units: Unit[] = ['PX', 'REM', 'PT'];

  return (
    <div className="flex bg-gray-100 rounded-lg p-1 h-8">
      {units.map((unit) => (
        <button
          key={unit}
          onClick={() => onChange(unit)}
          className={`
            px-3 text-sm font-medium rounded-md transition-all
            ${value === unit 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          {unit}
        </button>
      ))}
    </div>
  );
} 