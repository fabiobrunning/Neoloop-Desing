import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, Search } from 'lucide-react';
import iconsLibrary from '../src/data/icons-library.json';

type IconStyle = 'line' | 'dual' | 'solid';

interface Icon {
  id: string;
  name: string;
  filename: string;
  path: string;
  url: string;
  extension: string;
  category: string;
}

const IconsLibraryView: React.FC = () => {
  const [activeStyle, setActiveStyle] = useState<IconStyle>('line');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null);

  const icons = (iconsLibrary.styles[activeStyle].sample as Icon[]) || [];

  const filteredIcons = useMemo(() => {
    return icons.filter(icon =>
      icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.filename.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [icons, searchTerm]);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadIcon = (icon: Icon) => {
    const a = document.createElement('a');
    a.href = icon.url;
    a.download = icon.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Header Stats */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-3xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black mb-2">Professional Icons Library</h2>
            <p className="text-indigo-100">
              {iconsLibrary.total.toLocaleString()} icons in 3 professional styles
            </p>
            <p className="text-sm text-indigo-200 mt-2">
              Showing 200 sample icons per style • {iconsLibrary.note}
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-black">{iconsLibrary.total.toLocaleString()}</div>
            <div className="text-sm text-indigo-200">Total Icons</div>
          </div>
        </div>
      </div>

      {/* Style Selector */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 inline-flex gap-2 w-fit">
        <button
          onClick={() => {
            setActiveStyle('line');
            setSearchTerm('');
          }}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeStyle === 'line'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Line ({iconsLibrary.styles.line.total.toLocaleString()})
        </button>
        <button
          onClick={() => {
            setActiveStyle('dual');
            setSearchTerm('');
          }}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeStyle === 'dual'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Dual Tone ({iconsLibrary.styles.dual.total.toLocaleString()})
        </button>
        <button
          onClick={() => {
            setActiveStyle('solid');
            setSearchTerm('');
          }}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeStyle === 'solid'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Solid ({iconsLibrary.styles.solid.total.toLocaleString()})
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search icons... (showing 200 samples)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Found: {filteredIcons.length} / {icons.length} sample icons
        </p>
      </div>

      {/* Icons Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
        {filteredIcons.map((icon) => (
          <div
            key={icon.id}
            className="bg-white rounded-xl border border-slate-200 p-3 hover:shadow-lg hover:border-indigo-300 transition-all group cursor-pointer relative"
            onClick={() => setSelectedIcon(icon)}
          >
            <div className="aspect-square bg-slate-50 rounded-lg flex items-center justify-center p-2 mb-2 group-hover:bg-indigo-50 transition-colors">
              <img
                src={icon.url}
                alt={icon.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <p className="text-[10px] text-slate-600 truncate text-center">{icon.name}</p>

            {/* Quick Copy Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(icon.url, icon.id);
              }}
              className="absolute top-1 right-1 p-1.5 bg-white/90 backdrop-blur rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-indigo-600 hover:text-white"
            >
              {copiedId === icon.id ? (
                <Check size={12} />
              ) : (
                <Copy size={12} />
              )}
            </button>
          </div>
        ))}
      </div>

      {filteredIcons.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-3xl">
          <p className="text-slate-400 text-lg">No icons found</p>
          <p className="text-sm text-slate-400 mt-2">Try a different search term</p>
        </div>
      )}

      {/* Usage Guide */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-4">How to Use</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-slate-700 mb-2">Access All Icons</h4>
            <div className="bg-slate-900 p-4 rounded-xl">
              <pre className="text-indigo-400 text-xs font-mono leading-relaxed overflow-x-auto">
{`// All icons are in public/assets/icons/library/

// Line style (1,310 icons)
/assets/icons/library/line/icon-name.svg

// Dual tone (1,295 icons)
/assets/icons/library/dual/icon-name.svg

// Solid (1,278 icons)
/assets/icons/library/solid/icon-name.svg`}
              </pre>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-700 mb-2">React Usage</h4>
            <div className="bg-slate-900 p-4 rounded-xl">
              <pre className="text-indigo-400 text-xs font-mono leading-relaxed overflow-x-auto">
{`import HomeIcon from '/assets/icons/library/line/home.svg';

<img
  src="/assets/icons/library/line/home.svg"
  alt="Home"
  className="w-6 h-6"
/>`}
              </pre>
            </div>
          </div>
        </div>
        <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
          <p className="text-sm text-indigo-900">
            <strong>Note:</strong> This catalog shows 200 sample icons per style for performance.
            All {iconsLibrary.total.toLocaleString()} icons are available in the /public/assets/icons/library/ directory.
          </p>
        </div>
      </div>

      {/* Icon Detail Modal */}
      {selectedIcon && (
        <div
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedIcon(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-80 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-16">
              <img
                src={selectedIcon.url}
                alt={selectedIcon.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-black text-slate-900 mb-2">
                {selectedIcon.name}
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Style</p>
                  <p className="text-lg font-bold text-slate-900 capitalize">
                    {activeStyle}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Format</p>
                  <p className="text-lg font-bold text-slate-900 uppercase">
                    {selectedIcon.extension}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Filename</p>
                  <p className="text-xs font-mono text-slate-700 truncate">
                    {selectedIcon.filename}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => copyToClipboard(selectedIcon.url, selectedIcon.id)}
                  className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  {copiedId === selectedIcon.id ? (
                    <>
                      <Check size={20} /> Copiado!
                    </>
                  ) : (
                    <>
                      <Copy size={20} /> Copy URL
                    </>
                  )}
                </button>
                <button
                  onClick={() => downloadIcon(selectedIcon)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Download size={20} /> Download
                </button>
                <button
                  onClick={() => setSelectedIcon(null)}
                  className="px-6 py-3 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconsLibraryView;
