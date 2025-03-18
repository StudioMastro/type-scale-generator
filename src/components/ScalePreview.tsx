import React from 'react';
import { TypeScale } from '../types';

interface ScalePreviewProps {
  scales: TypeScale[];
  fontFamily: string;
}

export const ScalePreview: React.FC<ScalePreviewProps> = ({ scales, fontFamily }) => {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 p-8">
      {scales.map((scale) => (
        <div
          key={scale.element}
          className="border-l-4 border-indigo-500 pl-4 transition-all hover:border-indigo-600"
        >
          <div
            style={{
              fontFamily,
              fontSize: `${scale.size}px`,
              lineHeight: scale.lineHeight
            }}
            className="transition-colors hover:text-indigo-600"
          >
            {scale.element} - {scale.size}px
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Line-height: {scale.lineHeight}
          </div>
        </div>
      ))}
    </div>
  );
};