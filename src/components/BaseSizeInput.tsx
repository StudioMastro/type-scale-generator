import React from 'react';

interface BaseSizeInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function BaseSizeInput({ value, onChange }: BaseSizeInputProps) {
  return (
    <div className="relative group">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="block w-full py-2 pl-3 pr-10 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        step="1"
        min="0"
      />
      <div className="absolute right-0 inset-y-0 flex items-center">
        <div className="flex flex-col border-l border-gray-300 h-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={() => onChange(value + 1)}
            className="flex-1 px-1.5 hover:bg-gray-100"
          >
            <span className="sr-only">Increase</span>
            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onChange(value - 1)}
            className="flex-1 px-1.5 hover:bg-gray-100 border-t border-gray-300"
          >
            <span className="sr-only">Decrease</span>
            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="border-l border-gray-300 h-full flex items-center">
          <span className="px-2 text-sm text-gray-500">px</span>
        </div>
      </div>
    </div>
  );
} 