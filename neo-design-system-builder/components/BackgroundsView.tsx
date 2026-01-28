import React, { useState } from 'react';
import { Download, Eye } from 'lucide-react';
import backgroundsCatalog from '../src/data/backgrounds-catalog.json';

const BackgroundsView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'backstage' | 'blackWhite'>('backstage');
  const [selectedBg, setSelectedBg] = useState<any>(null);

  const backstage = backgroundsCatalog.categories.backstage.backgrounds;
  const blackWhite = backgroundsCatalog.categories.blackWhite.backgrounds;

  const activeBackgrounds = activeCategory === 'backstage' ? backstage : blackWhite;

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-8 rounded-3xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black mb-2">Backgrounds Library</h2>
            <p className="text-purple-100">
              {backgroundsCatalog.total} background patterns from Figma Community
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-black">{backgroundsCatalog.total}</div>
            <div className="text-sm text-purple-200">Backgrounds</div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 inline-flex gap-2 w-fit">
        <button
          onClick={() => setActiveCategory('backstage')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeCategory === 'backstage'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Backstage ({backgroundsCatalog.categories.backstage.total})
        </button>
        <button
          onClick={() => setActiveCategory('blackWhite')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeCategory === 'blackWhite'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Black & White ({backgroundsCatalog.categories.blackWhite.total})
        </button>
      </div>

      {/* Backgrounds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeBackgrounds.map((bg: any) => (
          <div
            key={bg.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all group cursor-pointer"
            onClick={() => setSelectedBg(bg)}
          >
            <div className="h-48 bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
              <img
                src={bg.url}
                alt={bg.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Eye size={32} className="text-white" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-slate-900 truncate mb-2">
                {bg.name}
              </h3>
              <div className="flex gap-2">
                <a
                  href={bg.url}
                  download={bg.filename}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors"
                >
                  <Download size={14} /> Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Usage Examples */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Como Usar Backgrounds</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-bold text-slate-700">CSS Background</h4>
            <div className="bg-slate-900 p-4 rounded-xl">
              <pre className="text-blue-400 text-xs font-mono">
{`.hero {
  background-image: url('/assets/backgrounds/...');
  background-size: cover;
  background-position: center;
}`}
              </pre>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-slate-700">React/JSX</h4>
            <div className="bg-slate-900 p-4 rounded-xl">
              <pre className="text-blue-400 text-xs font-mono">
{`<div
  style={{
    backgroundImage: 'url(...)',
    backgroundSize: 'cover'
  }}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {selectedBg && (
        <div
          className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedBg(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-96 bg-slate-50 flex items-center justify-center p-8">
              <img
                src={selectedBg.url}
                alt={selectedBg.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-black text-slate-900 mb-4">
                {selectedBg.name}
              </h3>
              <div className="flex gap-3">
                <a
                  href={selectedBg.url}
                  download={selectedBg.filename}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download size={20} /> Download
                </a>
                <button
                  onClick={() => setSelectedBg(null)}
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

export default BackgroundsView;
