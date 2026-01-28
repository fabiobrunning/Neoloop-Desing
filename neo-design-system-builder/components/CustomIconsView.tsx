import React, { useState } from 'react';
import { Search, Copy, Check, Download } from 'lucide-react';
import iconsCatalog from '../src/data/ui-icons.json';

interface Icon {
  id: string;
  name: string;
  filename: string;
  url: string;
  category: string;
}

const CustomIconsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const icons = iconsCatalog.icons as Icon[];

  const categories = ['all', ...Array.from(new Set(icons.map(i => i.category)))];

  const filteredIcons = icons.filter(icon => {
    const matchesSearch = icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         icon.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || icon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-3xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black mb-2">UI Icons Library</h2>
            <p className="text-blue-100">
              {iconsCatalog.total} professional icons from Figma Community
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-black">{iconsCatalog.total}</div>
            <div className="text-sm text-blue-200">Ícones</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Buscar ícones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Todas Categorias' : cat}
              </option>
            ))}
          </select>
        </div>

        {filteredIcons.length > 0 && (
          <div className="mt-4 text-sm text-slate-500">
            Mostrando {filteredIcons.length} de {iconsCatalog.total} ícones
          </div>
        )}
      </div>

      {/* Icons Grid */}
      {filteredIcons.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
          <Search size={48} className="text-slate-300 mx-auto mb-4" />
          <p className="text-xl font-bold text-slate-600">Nenhum ícone encontrado</p>
          <p className="text-slate-400 mt-2">Tente ajustar sua busca ou filtro</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {filteredIcons.map((icon) => (
            <div
              key={icon.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg hover:border-blue-300 transition-all group cursor-pointer relative"
              title={icon.name}
            >
              <div className="aspect-square flex items-center justify-center mb-3 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                <img
                  src={icon.url}
                  alt={icon.name}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <p className="text-xs text-slate-600 text-center truncate font-medium">
                {icon.name}
              </p>
              <button
                onClick={() => copyToClipboard(icon.url, icon.id)}
                className="absolute top-2 right-2 w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-50"
              >
                {copiedId === icon.id ? (
                  <Check size={14} className="text-green-600" />
                ) : (
                  <Copy size={14} className="text-slate-600" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Usage Example */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Como Usar</h3>
        <div className="bg-slate-900 p-6 rounded-2xl">
          <pre className="text-blue-400 text-sm font-mono leading-relaxed overflow-x-auto">
{`// Importar catálogo
import iconsC catalog from '@/data/ui-icons.json';

// Usar ícone
const MyComponent = () => (
  <img
    src="/assets/icons/ui/10k-free/icon-name.svg"
    alt="Icon"
    className="w-6 h-6"
  />
);`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CustomIconsView;
