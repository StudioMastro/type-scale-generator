import { useState, useEffect, useMemo, useRef } from 'react';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { FixedSizeList as List } from 'react-window';
import { GoogleFont } from '../types/font';
import { POPULAR_FONTS, loadGoogleFont } from '../utils/fonts';

interface FontSelectorProps {
  selectedFont: string;
  onFontChange: (font: string) => void;
}

const ITEM_HEIGHT = 40;
const LISTBOX_HEIGHT = 300;
const LOAD_AHEAD = 10;

export function FontSelector({ selectedFont, onFontChange }: FontSelectorProps) {
  const [fonts, setFonts] = useState<GoogleFont[]>(
    [...POPULAR_FONTS].sort((a, b) => a.family.localeCompare(b.family))
  );
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());
  const listRef = useRef<List>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_FONTS_API_KEY;
        const response = await fetch(
          `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=alpha`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch fonts');
        }
        
        const data = await response.json();
        if (data.items && Array.isArray(data.items)) {
          setFonts(data.items);
          loadGoogleFont(selectedFont);
          setLoadedFonts(new Set([selectedFont]));
          setError(null);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching fonts:', error);
        setError('Failed to load all fonts. Showing popular fonts only.');
      } finally {
        setIsLoading(false);
      }
    };

    loadFonts();
  }, [selectedFont]);

  const filteredFonts = useMemo(() => {
    return query === ''
      ? fonts
      : fonts.filter((font) =>
          font.family.toLowerCase().includes(query.toLowerCase())
        );
  }, [fonts, query]);

  const handleFontChange = (font: string) => {
    if (font !== selectedFont) {
      loadGoogleFont(font);
      setLoadedFonts(prev => new Set(prev).add(font));
      onFontChange(font);
      setQuery('');
    }
  };

  const loadVisibleFonts = (startIndex: number, stopIndex: number) => {
    const start = Math.max(0, startIndex - LOAD_AHEAD);
    const stop = Math.min(filteredFonts.length, stopIndex + LOAD_AHEAD);
    
    for (let i = start; i < stop; i++) {
      const font = filteredFonts[i];
      if (font && !loadedFonts.has(font.family)) {
        loadGoogleFont(font.family);
        setLoadedFonts(prev => new Set(prev).add(font.family));
      }
    }
  };

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const font = filteredFonts[index];
    if (!font) return null;

    const isFontLoaded = loadedFonts.has(font.family);
    const isSelected = font.family === selectedFont;

    return (
      <Listbox.Option
        key={font.family}
        value={font.family}
        className={({ active }) =>
          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
            active ? 'bg-indigo-50' : ''
          } ${isSelected ? 'bg-indigo-50' : ''}`
        }
        style={style}
      >
        <span
          className={`block truncate ${
            isSelected ? 'font-medium' : 'font-normal'
          }`}
          style={{ 
            fontFamily: isFontLoaded ? font.family : 'system-ui',
            opacity: isFontLoaded ? 1 : 0.7
          }}
        >
          {font.family}
        </span>
        {isSelected && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
      </Listbox.Option>
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (listRef.current) {
      listRef.current.scrollTo(0);
    }
  };

  const handleItemsRendered = ({ visibleStartIndex, visibleStopIndex }: { visibleStartIndex: number; visibleStopIndex: number }) => {
    loadVisibleFonts(visibleStartIndex, visibleStopIndex);
  };

  // Effetto per gestire lo scroll quando il dropdown si apre
  useEffect(() => {
    if (isOpen && listRef.current && !query) {
      // Piccolo timeout per assicurarsi che il dropdown sia completamente renderizzato
      setTimeout(() => {
        const selectedIndex = filteredFonts.findIndex(font => font.family === selectedFont);
        if (selectedIndex !== -1) {
          const scrollPosition = selectedIndex * ITEM_HEIGHT;
          listRef.current?.scrollTo(scrollPosition);
        }
      }, 0);
    }
  }, [isOpen, selectedFont, filteredFonts, query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Previene la propagazione dell'evento spazio per evitare la chiusura del dropdown
    if (e.code === 'Space') {
      e.stopPropagation();
    }
  };

  return (
    <div className="relative w-full">
      <Listbox 
        value={selectedFont} 
        onChange={handleFontChange}
      >
        {({ open }) => {
          // Aggiorna lo stato isOpen quando cambia open
          if (open !== isOpen) {
            setIsOpen(open);
          }

          return (
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <span className="block truncate text-sm" style={{ fontFamily: selectedFont }}>
                  {selectedFont}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              {open && (
                <Listbox.Options 
                  className="absolute z-10 mt-1 w-full overflow-hidden rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  static
                >
                  <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-3 py-2">
                    <div className="relative">
                      <MagnifyingGlassIcon 
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" 
                        aria-hidden="true"
                      />
                      <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-9 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Search fonts..."
                        value={query}
                        onChange={handleSearch}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  </div>

                  {isLoading ? (
                    <div className="px-4 py-2 text-sm text-gray-700">
                      Loading fonts...
                    </div>
                  ) : filteredFonts.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-gray-700">
                      No fonts found.
                    </div>
                  ) : (
                    <div style={{ height: LISTBOX_HEIGHT }}>
                      <List
                        ref={listRef}
                        height={LISTBOX_HEIGHT}
                        itemCount={filteredFonts.length}
                        itemSize={ITEM_HEIGHT}
                        width="100%"
                        overscanCount={5}
                        onItemsRendered={handleItemsRendered}
                        className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
                      >
                        {Row}
                      </List>
                    </div>
                  )}
                </Listbox.Options>
              )}
            </div>
          );
        }}
      </Listbox>
      {error && (
        <div className="absolute -top-6 left-0 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}