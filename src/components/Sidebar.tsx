import { FontControls } from './FontControls';
import { TypeScaleControls } from './TypeScaleControls';
import { PlatformSelector } from './PlatformSelector';
import { cn } from '../utils/cn';
import { useTypographyStore } from '../store/typography';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { 
    platform, 
    bodySettings, 
    headingSettings, 
    baseSize,
    scaleRatio,
    setPlatform,
    setBodySettings,
    setHeadingSettings,
    setBaseSize,
    setScaleRatio
  } = useTypographyStore();

  return (
    <aside 
      className={cn(
        "w-[320px] shrink-0 border-r border-gray-200 bg-gray-50/50 px-6 py-8 overflow-y-auto",
        "transition-all duration-300 ease-in-out",
        "md:relative md:translate-x-0",
        className
      )}
    >
      <div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Font Settings</h2>
          <FontControls settings={bodySettings} onSettingsChange={setBodySettings} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Scale Settings</h2>
          <TypeScaleControls 
            platform={platform}
            bodySettings={bodySettings}
            headingSettings={headingSettings}
            baseSize={baseSize}
            scaleRatio={scaleRatio}
            onPlatformChange={setPlatform}
            onBodySettingsChange={setBodySettings}
            onHeadingSettingsChange={setHeadingSettings}
            onBaseSizeChange={setBaseSize}
            onScaleChange={setScaleRatio}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform</h2>
          <PlatformSelector platform={platform} onPlatformChange={setPlatform} />
        </div>
      </div>
    </aside>
  );
} 