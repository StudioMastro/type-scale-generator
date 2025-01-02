import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Combobox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import { FixedSizeList as List } from 'react-window';
import { useGoogleFonts } from '../hooks/useGoogleFonts';
import { loadGoogleFont } from '../utils/fonts';

interface FontSelectorProps {
  selectedFont: string;
  onFontChange: (font: string) => void;
  allowInherit?: boolean;
}

const ITEM_HEIGHT = 40;
const LISTBOX_HEIGHT = 300;
const LOAD_AHEAD = 10;

export function FontSelector({ selectedFont, onFontChange, allowInherit = false }: FontSelectorProps) {
  const [query, setQuery] = useState('');
  const { fonts, isLoading, error } = useGoogleFonts();
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set([selectedFont]));
  const listRef = useRef<List>(null);

  // Carica il font selezionato inizialmente
  useEffect(() => {
    if (selectedFont && selectedFont !== 'inherit') {
      loadGoogleFont(selectedFont);
    }
  }, []);

  const filteredFonts = useMemo(() => {
    const options = allowInherit ? ['inherit', ...fonts] : fonts;
    if (!query) return options;
    return options.filter((font) =>
      font.toLowerCase().includes(query.toLowerCase())
    );
  }, [fonts, query, allowInherit]);

  const loadVisibleFonts = (startIndex: number, stopIndex: number) => {
    const start = Math.max(0, startIndex - LOAD_AHEAD);
    const stop = Math.min(filteredFonts.length, stopIndex + LOAD_AHEAD);
    
    for (let i = start; i < stop; i++) {
      const font = filteredFonts[i];
      if (font && font !== 'inherit' && !loadedFonts.has(font)) {
        loadGoogleFont(font);
        setLoadedFonts(prev => new Set(prev).add(font));
      }
    }
  };

  const handleFontChange = (font: string) => {
    if (font !== selectedFont) {
      if (font !== 'inherit') {
        loadGoogleFont(font);
        setLoadedFonts(prev => new Set(prev).add(font));
      }
      onFontChange(font);
      setQuery('');
    }
  };

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const font = filteredFonts[index];
    if (!font) return null;

    const isFontLoaded = loadedFonts.has(font) || font === 'inherit';

    return (
      <div style={style} className="relative">
        <Combobox.Option
          key={font}
          value={font}
          className={({ active }) =>
            `w-full py-2 pl-10 pr-4 cursor-pointer ${
              active ? 'bg-indigo-600 text-white' : 'text-gray-900'
            }`
          }
        >
          {({ selected, active }) => (
            <div className="flex items-center">
              {selected && (
                <div
                  className={`flex items-center absolute left-0 top-0 bottom-0 pl-3 ${
                    active ? 'text-white' : 'text-indigo-600'
                  }`}
                >
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              )}
              <span
                className={`truncate ${selected ? 'font-medium' : 'font-normal'}`}
                style={{ 
                  fontFamily: font === 'inherit' ? 'inherit' : font,
                  opacity: isFontLoaded ? 1 : 0.7
                }}
              >
                {font}
              </span>
            </div>
          )}
        </Combobox.Option>
      </div>
    );
  };

  return (
    <div className="relative">
      <Combobox value={selectedFont} onChange={handleFontChange}>
        {({ open }) => (
          <>
            <div className="relative cursor-pointer">
              <Combobox.Button className="w-full">
                <div className="block w-full py-2 pl-3 pr-10 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-left">
                  <span style={{ fontFamily: selectedFont === 'inherit' ? 'inherit' : selectedFont }}>
                    {selectedFont}
                  </span>
                </div>
                <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none">
                  <div className="h-full flex items-center">
                    <div className="px-2">
                      <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Combobox.Button>

              {open && (
                <div className="absolute mt-1 w-full rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                  <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
                    <Combobox.Input
                      className="w-full py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-0 sm:text-sm"
                      placeholder="Search fonts..."
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="overflow-hidden">
                    <Combobox.Options static className="max-h-[300px]">
                      {isLoading ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Loading fonts...
                        </div>
                      ) : error ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-red-600">
                          {error}
                        </div>
                      ) : filteredFonts.length === 0 ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        <List
                          ref={listRef}
                          height={LISTBOX_HEIGHT}
                          itemCount={filteredFonts.length}
                          itemSize={ITEM_HEIGHT}
                          width="100%"
                          overscanCount={LOAD_AHEAD}
                          onItemsRendered={({ visibleStartIndex, visibleStopIndex }) => {
                            loadVisibleFonts(visibleStartIndex, visibleStopIndex);
                          }}
                          className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
                        >
                          {Row}
                        </List>
                      )}
                    </Combobox.Options>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </Combobox>
    </div>
  );
}