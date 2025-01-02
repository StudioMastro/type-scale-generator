import { Header } from './components/Header';
import { TypeScaleControls } from './components/TypeScaleControls';
import { TypeScaleDisplay } from './components/TypeScaleDisplay';
import { useTypeScale } from './hooks/useTypeScale';
import { useTypographyStore } from './store/typography';

export default function App() {
  const { 
    platform,
    baseSize,
    scaleRatio,
    bodySettings,
    headingSettings,
    previewText,
    setPlatform,
    setBaseSize,
    setScaleRatio,
    setBodySettings,
    setHeadingSettings,
    setPreviewText
  } = useTypographyStore();

  const scales = useTypeScale(platform, baseSize, scaleRatio);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="flex">
        {/* Sidebar con i controlli */}
        <aside className="relative w-96 shrink-0 border-r border-gray-200 h-[calc(100vh-64px)]">
          <div className="absolute inset-0 overflow-y-auto scrollbar-none hover:scrollbar-thin hover:scrollbar-thumb-gray-300/50 hover:scrollbar-track-transparent">
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

        {/* Area principale con l'anteprima */}
        <main className="flex-1 overflow-y-auto scrollbar-none hover:scrollbar-thin hover:scrollbar-thumb-gray-300/50 hover:scrollbar-track-transparent">
          {/* Preview Text Input */}
          <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview Text
            </label>
            <input
              type="text"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              className="block w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter preview text..."
            />
          </div>

          {/* Scale Preview */}
          <div className="p-8">
            <TypeScaleDisplay 
              scales={scales}
              bodySettings={bodySettings}
              headingSettings={headingSettings}
              previewText={previewText}
            />
          </div>
        </main>
      </div>
    </div>
  );
}