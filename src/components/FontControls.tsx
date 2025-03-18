import { FontSelector } from "./FontSelector";
import {
  FontSettings,
  FontSmoothing,
  TextAlign,
  TextDecoration,
  TextTransform,
  FontStyle,
} from "../types/font";
import { useTypographyStore } from "../store/typography";
import { Platform } from "../types";

interface FontControlsProps {
  settings: FontSettings;
  onSettingsChange: (settings: Partial<FontSettings>) => void;
  allowInherit?: boolean;
}

export function FontControls({
  settings,
  onSettingsChange,
  allowInherit = false,
}: FontControlsProps) {
  const cleanEmValue = (value: string) => value.replace("em", "");
  const isInheritEnabled = allowInherit && settings.family === "inherit";
  const bodySettings = useTypographyStore((state) => state.bodySettings);
  const platform = useTypographyStore((state) => state.platform);

  // Funzione per ottenere il valore effettivo quando è impostato su "inherit"
  const getInheritedValue = (property: keyof FontSettings) => {
    if (settings[property] === "inherit" && allowInherit) {
      return bodySettings[property];
    }
    return settings[property];
  };

  // Aggiungiamo i controlli specifici per piattaforma dopo i controlli esistenti
  const renderPlatformSpecificControls = () => {
    if (platform === "ios") {
      return (
        <>
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
              iOS Specific
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Smoothing
              </label>
              <select
                value={settings.fontSmoothing || "auto"}
                onChange={(e) =>
                  onSettingsChange({
                    fontSmoothing: e.target.value as FontSmoothing,
                  })
                }
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="auto">Auto</option>
                <option value="none">None</option>
                <option value="antialiased">Antialiased</option>
                <option value="subpixel-antialiased">
                  Subpixel Antialiased
                </option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Size Adjust
              </label>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Enable</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={settings.textSizeAdjust !== "none"}
                  onClick={() =>
                    onSettingsChange({
                      textSizeAdjust:
                        settings.textSizeAdjust === "none" ? "100%" : "none",
                    })
                  }
                  className={`${
                    settings.textSizeAdjust !== "none"
                      ? "bg-indigo-600"
                      : "bg-gray-200"
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  <span
                    aria-hidden="true"
                    className={`${
                      settings.textSizeAdjust !== "none"
                        ? "translate-x-5"
                        : "translate-x-0"
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </button>
              </div>
            </div>
          </div>
        </>
      );
    } else if (platform === "android") {
      return (
        <>
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
              Android Specific
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Feature Settings
              </label>
              <input
                type="text"
                value={settings.fontFeatureSettings || "normal"}
                onChange={(e) =>
                  onSettingsChange({ fontFeatureSettings: e.target.value })
                }
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. 'smcp', 'liga'"
              />
              <p className="mt-1 text-xs text-gray-500">
                Comma-separated OpenType features (e.g. 'smcp', 'liga')
              </p>
            </div>
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font
        </label>
        <FontSelector
          selectedFont={settings.family}
          onFontChange={(font: string) => onSettingsChange({ family: font })}
          disabled={isInheritEnabled}
        />
        {allowInherit && (
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-700">Inherit</span>
            <button
              type="button"
              role="switch"
              aria-checked={isInheritEnabled}
              onClick={() =>
                onSettingsChange({
                  family: isInheritEnabled ? "Inter" : "inherit",
                })
              }
              className={`${
                isInheritEnabled ? "bg-indigo-600" : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <span
                aria-hidden="true"
                className={`${
                  isInheritEnabled ? "translate-x-5" : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Weight
        </label>
        <div className="relative group">
          <select
            value={settings.weight}
            onChange={(e) => onSettingsChange({ weight: e.target.value })}
            className="block w-full px-4 py-2 pr-12 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none cursor-pointer"
          >
            <option value="100">Thin (100)</option>
            <option value="200">Extra Light (200)</option>
            <option value="300">Light (300)</option>
            <option value="400">Regular (400)</option>
            <option value="500">Medium (500)</option>
            <option value="600">Semi Bold (600)</option>
            <option value="700">Bold (700)</option>
            <option value="800">Extra Bold (800)</option>
            <option value="900">Black (900)</option>
          </select>
          <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none">
            <div className="h-full flex items-center">
              <div className="px-2">
                <svg
                  className="w-4 h-4 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Line Height
          </label>
          <div className="relative group">
            <input
              type="number"
              value={settings.lineHeight}
              onChange={(e) => onSettingsChange({ lineHeight: e.target.value })}
              className="block w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              step="0.1"
              min="0"
            />
            <div className="absolute right-0 inset-y-0 flex items-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
              <div className="flex flex-col border-l border-gray-300 h-full">
                <button
                  type="button"
                  onClick={() =>
                    onSettingsChange({
                      lineHeight: `${Number(settings.lineHeight) + 0.1}`,
                    })
                  }
                  className="flex-1 px-2 hover:bg-gray-100 rounded-tr-md"
                >
                  <span className="sr-only">Increase</span>
                  <svg
                    className="w-4 h-4 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onSettingsChange({
                      lineHeight: `${Number(settings.lineHeight) - 0.1}`,
                    })
                  }
                  className="flex-1 px-2 hover:bg-gray-100 rounded-br-md border-t border-gray-300"
                >
                  <span className="sr-only">Decrease</span>
                  <svg
                    className="w-4 h-4 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Letter Spacing
          </label>
          <div className="relative group">
            <input
              type="number"
              value={cleanEmValue(settings.letterSpacing)}
              onChange={(e) =>
                onSettingsChange({ letterSpacing: `${e.target.value}em` })
              }
              className="block w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              step="0.001"
            />
            <div className="absolute right-0 inset-y-0 flex items-center">
              <div className="flex flex-col border-l border-gray-300 h-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() =>
                    onSettingsChange({
                      letterSpacing: `${
                        Number(cleanEmValue(settings.letterSpacing)) + 0.001
                      }em`,
                    })
                  }
                  className="flex-1 px-2 hover:bg-gray-100 rounded-tr-md"
                >
                  <span className="sr-only">Increase</span>
                  <svg
                    className="w-4 h-4 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onSettingsChange({
                      letterSpacing: `${
                        Number(cleanEmValue(settings.letterSpacing)) - 0.001
                      }em`,
                    })
                  }
                  className="flex-1 px-2 hover:bg-gray-100 rounded-br-md border-t border-gray-300"
                >
                  <span className="sr-only">Decrease</span>
                  <svg
                    className="w-4 h-4 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="border-l border-gray-300 h-full flex items-center">
                <span className="px-2 text-sm text-gray-500">em</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={
              settings.color === "inherit"
                ? getInheritedValue("color")
                : settings.color
            }
            onChange={(e) => onSettingsChange({ color: e.target.value })}
            className={`block flex-1 py-2 pl-3 pr-10 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              settings.color === "inherit"
                ? "opacity-50 cursor-not-allowed bg-gray-50"
                : ""
            }`}
            disabled={settings.color === "inherit"}
          />
          <input
            type="color"
            value={
              settings.color === "inherit"
                ? getInheritedValue("color")
                : settings.color
            }
            onChange={(e) => onSettingsChange({ color: e.target.value })}
            className={`h-10 w-10 border border-gray-300 rounded-md cursor-pointer ${
              settings.color === "inherit"
                ? "opacity-50 cursor-not-allowed bg-gray-50"
                : ""
            }`}
            disabled={settings.color === "inherit"}
          />
        </div>
        {allowInherit && (
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-700">Inherit</span>
            <button
              type="button"
              role="switch"
              aria-checked={settings.color === "inherit"}
              onClick={() =>
                onSettingsChange({
                  color: settings.color === "inherit" ? "#222222" : "inherit",
                })
              }
              className={`${
                settings.color === "inherit" ? "bg-indigo-600" : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <span
                aria-hidden="true"
                className={`${
                  settings.color === "inherit"
                    ? "translate-x-5"
                    : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Background
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={
              settings.backgroundColor === "inherit"
                ? getInheritedValue("backgroundColor")
                : settings.backgroundColor
            }
            onChange={(e) =>
              onSettingsChange({ backgroundColor: e.target.value })
            }
            className={`block flex-1 py-2 pl-3 pr-10 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              settings.backgroundColor === "inherit"
                ? "opacity-50 cursor-not-allowed bg-gray-50"
                : ""
            }`}
            disabled={settings.backgroundColor === "inherit"}
          />
          <input
            type="color"
            value={
              settings.backgroundColor === "inherit"
                ? getInheritedValue("backgroundColor")
                : settings.backgroundColor
            }
            onChange={(e) =>
              onSettingsChange({ backgroundColor: e.target.value })
            }
            className={`h-10 w-10 border border-gray-300 rounded-md cursor-pointer ${
              settings.backgroundColor === "inherit"
                ? "opacity-50 cursor-not-allowed bg-gray-50"
                : ""
            }`}
            disabled={settings.backgroundColor === "inherit"}
          />
        </div>
        {allowInherit && (
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-700">Inherit</span>
            <button
              type="button"
              role="switch"
              aria-checked={settings.backgroundColor === "inherit"}
              onClick={() =>
                onSettingsChange({
                  backgroundColor:
                    settings.backgroundColor === "inherit"
                      ? "#FFFFFF"
                      : "inherit",
                })
              }
              className={`${
                settings.backgroundColor === "inherit"
                  ? "bg-indigo-600"
                  : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <span
                aria-hidden="true"
                className={`${
                  settings.backgroundColor === "inherit"
                    ? "translate-x-5"
                    : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Transform
        </label>
        <select
          value={settings.textTransform || "none"}
          onChange={(e) => onSettingsChange({ textTransform: e.target.value })}
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="none">None</option>
          <option value="uppercase">UPPERCASE</option>
          <option value="lowercase">lowercase</option>
          <option value="capitalize">Capitalize</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Style
        </label>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Italic</span>
          <button
            type="button"
            role="switch"
            aria-checked={settings.fontStyle === "italic"}
            onClick={() =>
              onSettingsChange({
                fontStyle:
                  settings.fontStyle === "italic" ? "normal" : "italic",
              })
            }
            className={`${
              settings.fontStyle === "italic" ? "bg-indigo-600" : "bg-gray-200"
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            <span
              aria-hidden="true"
              className={`${
                settings.fontStyle === "italic"
                  ? "translate-x-5"
                  : "translate-x-0"
              } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Decoration
        </label>
        <select
          value={settings.textDecoration || "none"}
          onChange={(e) => onSettingsChange({ textDecoration: e.target.value })}
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="none">None</option>
          <option value="underline">Underline</option>
          <option value="line-through">Line Through</option>
          <option value="overline">Overline</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Align
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onSettingsChange({ textAlign: "left" })}
            className={`flex-1 py-2 px-3 border ${
              settings.textAlign === "left"
                ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            Left
          </button>
          <button
            type="button"
            onClick={() => onSettingsChange({ textAlign: "center" })}
            className={`flex-1 py-2 px-3 border ${
              settings.textAlign === "center"
                ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            Center
          </button>
          <button
            type="button"
            onClick={() => onSettingsChange({ textAlign: "right" })}
            className={`flex-1 py-2 px-3 border ${
              settings.textAlign === "right"
                ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            Right
          </button>
        </div>
      </div>

      {renderPlatformSpecificControls()}
    </div>
  );
}
