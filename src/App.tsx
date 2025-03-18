import { useState } from "react";
import { Header } from "./components/Header";
import { TypeScaleControls } from "./components/TypeScaleControls";
import { TypeScaleDisplay } from "./components/TypeScaleDisplay";
import { UnitSelector } from "./components/UnitSelector";
import { useTypeScale } from "./hooks/useTypeScale";
import { useTypographyStore } from "./store/typography";
import { SiteMockupPanel } from "./components/SiteMockupPanel";
import { Layout } from "lucide-react";

export default function App() {
  const [isSitePreviewOpen, setIsSitePreviewOpen] = useState(false);

  const {
    platform,
    baseSize,
    scaleRatio,
    bodySettings,
    headingSettings,
    previewText,
    truncateText,
    maxLines,
    unit,
    setPlatform,
    setBaseSize,
    setScaleRatio,
    setBodySettings,
    setHeadingSettings,
    setPreviewText,
    setTruncateText,
    setUnit,
  } = useTypographyStore();

  const scales = useTypeScale(platform, baseSize, scaleRatio);

  const toggleSitePreview = () => {
    setIsSitePreviewOpen(!isSitePreviewOpen);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex flex-1">
        {/* Sidebar con i controlli */}
        <aside className="relative w-96 shrink-0 border-r border-gray-200 h-[calc(100vh-64px)]">
          <div className="absolute inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300/50 scrollbar-track-transparent">
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
        </aside>

        {/* Area principale con l'anteprima o il mockup del sito */}
        <main className="flex-1 flex flex-col h-[calc(100vh-64px)]">
          {/* Barra degli strumenti */}
          <div className="flex-none bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Text Preview
                </span>
                <input
                  type="text"
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  className="block w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter preview text..."
                />
              </div>
              <UnitSelector value={unit} onChange={setUnit} />
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Truncate text</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={truncateText}
                  onClick={() => setTruncateText(!truncateText)}
                  className={`${
                    truncateText ? "bg-indigo-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  <span
                    aria-hidden="true"
                    className={`${
                      truncateText ? "translate-x-5" : "translate-x-0"
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </button>
              </div>
              <button
                onClick={toggleSitePreview}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
                  isSitePreviewOpen
                    ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Layout className="h-5 w-5" />
                <span className="text-sm">Site Preview</span>
              </button>
            </div>
          </div>

          {/* Contenuto principale: Scale o Mockup del sito */}
          {isSitePreviewOpen ? (
            <div className="flex-1 overflow-hidden">
              <SiteMockupPanel
                bodySettings={bodySettings}
                headingSettings={headingSettings}
                previewText={previewText}
                unit={unit}
              />
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-gray-300/50 scrollbar-track-transparent">
              <TypeScaleDisplay
                scales={scales}
                bodySettings={bodySettings}
                headingSettings={headingSettings}
                previewText={previewText}
                unit={unit}
                truncateText={truncateText}
                maxLines={maxLines}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
