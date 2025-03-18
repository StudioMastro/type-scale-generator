import { useState } from "react";
import { Platform } from "../types";
import { PlatformSelector } from "./PlatformSelector";
import { FontControls } from "./FontControls";
import { ScaleSelector } from "./ScaleSelector";
import { FontSettings } from "../types/font";
import { BaseSizeInput } from "./BaseSizeInput";
import { RotateCcw } from "lucide-react";
import { useTypographyStore } from "../store/typography";
import { ResetConfirmationDialog } from "./ResetConfirmationDialog";

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
  const resetAll = useTypographyStore((state) => state.resetAll);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  return (
    <div className="space-y-8 p-6">
      <div>
        <PlatformSelector
          platform={platform}
          onPlatformChange={onPlatformChange}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
          Base Settings
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base Size
            </label>
            <BaseSizeInput value={baseSize} onChange={onBaseSizeChange} />
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">BODY</h2>
            <button
              onClick={() => setIsResetDialogOpen(true)}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All
            </button>
          </div>
          <FontControls
            settings={bodySettings}
            onSettingsChange={onBodySettingsChange}
          />
        </div>

        {platform === "desktop" && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
              Headings
            </h3>
            <FontControls
              settings={headingSettings}
              onSettingsChange={onHeadingSettingsChange}
              allowInherit
            />
          </div>
        )}
      </div>

      <ResetConfirmationDialog
        open={isResetDialogOpen}
        onOpenChange={setIsResetDialogOpen}
        onConfirm={resetAll}
      />
    </div>
  );
}
