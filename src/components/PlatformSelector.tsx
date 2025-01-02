import React from 'react';
import { Platform } from '../types';
import { Monitor, Smartphone } from 'lucide-react';

interface PlatformSelectorProps {
  platform: Platform;
  onPlatformChange: (platform: Platform) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  platform,
  onPlatformChange,
}) => {
  return (
    <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
      {[
        { id: 'desktop', icon: Monitor },
        { id: 'ios', icon: Smartphone },
        { id: 'android', icon: Smartphone },
      ].map(({ id, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onPlatformChange(id as Platform)}
          className={`flex items-center px-4 py-2 rounded-md transition-colors ${
            platform === id
              ? 'bg-white shadow-sm text-indigo-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Icon className="w-4 h-4 mr-2" />
          <span className="capitalize">{id}</span>
        </button>
      ))}
    </div>
  );
};