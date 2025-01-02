import React from 'react';
import { Platform } from '../types';
import { Monitor, AppleIcon, Smartphone } from 'lucide-react';

interface PlatformSelectorProps {
  platform: Platform;
  onPlatformChange: (platform: Platform) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  platform,
  onPlatformChange,
}) => {
  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-lg w-full">
      {[
        { id: 'desktop', icon: Monitor, label: 'Desktop' },
        { id: 'ios', icon: AppleIcon, label: 'iOS' },
        { id: 'android', icon: Smartphone, label: 'Android' },
      ].map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onPlatformChange(id as Platform)}
          className={`
            flex items-center justify-center rounded-md transition-all
            ${platform === id 
              ? 'bg-white shadow-sm text-indigo-600 flex-[2] py-2'
              : 'text-gray-600 hover:text-gray-900 flex-1 p-2'
            }
          `}
          title={platform !== id ? label : undefined}
        >
          <Icon className="w-5 h-5 shrink-0" />
          {platform === id && (
            <span className="ml-2 text-sm font-medium truncate">
              {label}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};