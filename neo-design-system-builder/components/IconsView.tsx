import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { Search, Copy, Check, X, Code, ChevronDown } from 'lucide-react';

// Type for Lucide icon component
type LucideIcon = React.FC<LucideIcons.LucideProps>;

// Get all icon names from lucide-react (excluding non-icon exports)
const getAllIconNames = (): string[] => {
  return Object.keys(LucideIcons).filter(key => {
    // Filter out utility functions and duplicates (Icon suffix versions)
    if (key.endsWith('Icon')) return false;
    if (key === 'default' || key === 'createLucideIcon' || key === 'icons') return false;
    // Check if it's a valid component (starts with uppercase)
    if (key[0] !== key[0].toUpperCase()) return false;
    // Check if the export is a function (React component)
    const component = (LucideIcons as Record<string, unknown>)[key];
    return typeof component === 'function' || typeof component === 'object';
  });
};

// Get icon component by name
const getIconComponent = (name: string): LucideIcon | null => {
  const component = (LucideIcons as Record<string, unknown>)[name];
  if (typeof component === 'function' || typeof component === 'object') {
    return component as LucideIcon;
  }
  return null;
};

// Icon categories based on common naming patterns
const categorizeIcon = (name: string): string => {
  const lowerName = name.toLowerCase();

  if (/arrow|chevron|corner|move|navigation|compass|map|locate|route/.test(lowerName)) return 'Navigation';
  if (/user|users|person|contact|profile/.test(lowerName)) return 'Users';
  if (/mail|message|inbox|send|at|phone|bell|notification/.test(lowerName)) return 'Communication';
  if (/file|folder|document|archive|clipboard|book|note/.test(lowerName)) return 'Files';
  if (/edit|pen|pencil|eraser|highlight|brush|paint|palette/.test(lowerName)) return 'Editing';
  if (/search|filter|zoom/.test(lowerName)) return 'Search';
  if (/setting|gear|tool|wrench|hammer|screwdriver|config/.test(lowerName)) return 'Settings';
  if (/play|pause|stop|skip|rewind|forward|volume|music|video|camera|mic|headphone/.test(lowerName)) return 'Media';
  if (/chart|graph|bar|line|pie|trend|analytics|statistic/.test(lowerName)) return 'Charts';
  if (/cart|shop|bag|store|credit|card|wallet|dollar|coin|receipt/.test(lowerName)) return 'E-commerce';
  if (/calendar|clock|timer|watch|alarm|schedule/.test(lowerName)) return 'Time';
  if (/sun|moon|cloud|rain|snow|wind|thermometer|weather|droplet/.test(lowerName)) return 'Weather';
  if (/lock|unlock|shield|key|eye|fingerprint|scan/.test(lowerName)) return 'Security';
  if (/heart|star|thumb|bookmark|flag|award|trophy/.test(lowerName)) return 'Feedback';
  if (/plus|minus|x|check|alert|info|help|question|circle|square|triangle/.test(lowerName)) return 'Shapes & Status';
  if (/home|building|house|store|hospital|school|church|factory/.test(lowerName)) return 'Buildings';
  if (/car|bus|train|plane|ship|bike|truck|rocket/.test(lowerName)) return 'Transport';
  if (/wifi|bluetooth|signal|globe|network|server|database|cloud|download|upload/.test(lowerName)) return 'Connectivity';
  if (/code|terminal|git|github|laptop|monitor|cpu|chip|hard|memory/.test(lowerName)) return 'Development';
  if (/table|grid|layout|panel|sidebar|columns|rows/.test(lowerName)) return 'Layout';
  if (/text|type|font|bold|italic|underline|align|list|heading/.test(lowerName)) return 'Typography';
  if (/image|picture|photo|gallery|aperture|scan/.test(lowerName)) return 'Images';
  if (/share|link|external|copy|clipboard|qr/.test(lowerName)) return 'Sharing';
  if (/trash|delete|remove|ban|block|slash/.test(lowerName)) return 'Destructive';
  if (/save|download|export|import|refresh|sync|rotate/.test(lowerName)) return 'Actions';
  if (/log|login|logout|door|exit|entry/.test(lowerName)) return 'Authentication';
  if (/battery|power|zap|bolt|plug|charge/.test(lowerName)) return 'Power';
  if (/smile|frown|meh|angry|laugh|emoji|face/.test(lowerName)) return 'Emoji';
  if (/tree|leaf|flower|plant|sprout|seedling/.test(lowerName)) return 'Nature';
  if (/food|coffee|pizza|cake|wine|beer|utensils|fork|knife/.test(lowerName)) return 'Food';
  if (/health|heart|activity|pill|syringe|stethoscope/.test(lowerName)) return 'Health';

  return 'Other';
};

// Virtual scrolling configuration
const ITEM_HEIGHT = 100; // Height of each icon card
const ITEMS_PER_ROW = 8; // Number of items per row (responsive)
const BUFFER_ROWS = 2; // Extra rows to render above/below viewport

interface IconItem {
  name: string;
  category: string;
}

const IconsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSize, setSelectedSize] = useState(24);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIcon, setSelectedIcon] = useState<IconItem | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Build icon list with categories
  const allIcons = useMemo((): IconItem[] => {
    const names = getAllIconNames();
    return names.map(name => ({
      name,
      category: categorizeIcon(name)
    })).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(allIcons.map(icon => icon.category));
    return ['all', ...Array.from(cats).sort()];
  }, [allIcons]);

  // Filter icons based on search and category
  const filteredIcons = useMemo(() => {
    return allIcons.filter(icon => {
      const matchesSearch = searchTerm === '' ||
        icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        icon.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || icon.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allIcons, searchTerm, selectedCategory]);

  // Calculate items per row based on container width
  const itemsPerRow = useMemo(() => {
    if (containerWidth < 640) return 3;
    if (containerWidth < 768) return 4;
    if (containerWidth < 1024) return 6;
    return 8;
  }, [containerWidth]);

  // Calculate virtual scrolling parameters
  const totalRows = Math.ceil(filteredIcons.length / itemsPerRow);
  const rowHeight = ITEM_HEIGHT;
  const totalHeight = totalRows * rowHeight;

  const visibleStartRow = Math.max(0, Math.floor(scrollTop / rowHeight) - BUFFER_ROWS);
  const visibleEndRow = Math.min(totalRows, Math.ceil((scrollTop + 600) / rowHeight) + BUFFER_ROWS);

  const visibleIcons = useMemo(() => {
    const startIndex = visibleStartRow * itemsPerRow;
    const endIndex = Math.min(visibleEndRow * itemsPerRow, filteredIcons.length);
    return filteredIcons.slice(startIndex, endIndex);
  }, [filteredIcons, visibleStartRow, visibleEndRow, itemsPerRow]);

  // Handle scroll
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Handle container resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Copy to clipboard
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Generate import code
  const getImportCode = (iconName: string) => {
    return `import { ${iconName} } from 'lucide-react';`;
  };

  // Generate usage code
  const getUsageCode = (iconName: string, size: number) => {
    return `<${iconName} size={${size}} />`;
  };

  // Generate full component code
  const getComponentCode = (iconName: string, size: number) => {
    return `import { ${iconName} } from 'lucide-react';

const MyComponent = () => {
  return <${iconName} size={${size}} className="text-blue-600" />;
};`;
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Header Stats */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-3xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black mb-2">Lucide React Icons</h2>
            <p className="text-blue-100">
              {allIcons.length.toLocaleString()} icons ready to use with full React integration
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-black">{allIcons.length.toLocaleString()}</div>
            <div className="text-sm text-blue-200">Total Icons</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search icons by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none w-full lg:w-48 px-4 py-3 pr-10 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
          </div>

          {/* Size Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-700 whitespace-nowrap">Size:</span>
            {[16, 20, 24, 32, 40, 48].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-2 rounded-lg font-bold text-sm transition-all ${
                  selectedSize === size
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-slate-500">
            Showing <span className="font-bold text-slate-700">{filteredIcons.length.toLocaleString()}</span> of {allIcons.length.toLocaleString()} icons
          </span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              <X size={14} /> Clear filter
            </button>
          )}
        </div>
      </div>

      {/* Icons Grid with Virtual Scrolling */}
      <div
        ref={containerRef}
        className="bg-white rounded-3xl border border-slate-200 overflow-hidden"
      >
        {filteredIcons.length === 0 ? (
          <div className="p-12 text-center">
            <Search size={48} className="text-slate-300 mx-auto mb-4" />
            <p className="text-xl font-bold text-slate-600">No icons found</p>
            <p className="text-slate-400 mt-2">Try a different search term or category</p>
          </div>
        ) : (
          <div
            className="overflow-y-auto p-4"
            style={{ height: '600px' }}
            onScroll={handleScroll}
          >
            <div style={{ height: totalHeight, position: 'relative' }}>
              <div
                className={`grid gap-3 absolute left-0 right-0`}
                style={{
                  top: visibleStartRow * rowHeight,
                  gridTemplateColumns: `repeat(${itemsPerRow}, minmax(0, 1fr))`
                }}
              >
                {visibleIcons.map((icon) => {
                  const IconComponent = getIconComponent(icon.name);
                  if (!IconComponent) return null;

                  return (
                    <div
                      key={icon.name}
                      onClick={() => setSelectedIcon(icon)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer transition-all group ${
                        selectedIcon?.name === icon.name
                          ? 'bg-blue-100 border-2 border-blue-500 shadow-lg'
                          : 'hover:bg-slate-50 border-2 border-transparent hover:border-slate-200'
                      }`}
                      title={`${icon.name} - ${icon.category}`}
                    >
                      <div className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors ${
                        selectedIcon?.name === icon.name
                          ? 'bg-blue-200'
                          : 'bg-slate-100 group-hover:bg-blue-50'
                      }`}>
                        <IconComponent
                          size={selectedSize}
                          className={selectedIcon?.name === icon.name ? 'text-blue-700' : 'text-slate-600 group-hover:text-blue-600'}
                        />
                      </div>
                      <p className="text-xs text-slate-600 text-center truncate w-full font-medium">
                        {icon.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Code Reference */}
      <div className="bg-slate-900 p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Code size={24} /> Usage with Lucide React
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-bold text-slate-400 mb-2">Installation</h4>
            <pre className="text-blue-400 text-sm font-mono bg-slate-800 p-4 rounded-xl overflow-x-auto">
              npm install lucide-react
            </pre>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-400 mb-2">Basic Usage</h4>
            <pre className="text-blue-400 text-sm font-mono bg-slate-800 p-4 rounded-xl overflow-x-auto leading-relaxed">
{`import { Home, User } from 'lucide-react';

<Home size={24} />
<User size={24} className="text-blue-600" />`}
            </pre>
          </div>
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
            {/* Preview Area */}
            <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center relative">
              {(() => {
                const IconComponent = getIconComponent(selectedIcon.name);
                if (!IconComponent) return null;
                return (
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-6">
                      {[24, 32, 48, 64].map(size => (
                        <div key={size} className="flex flex-col items-center gap-2">
                          <IconComponent size={size} className="text-blue-600" />
                          <span className="text-xs text-slate-400">{size}px</span>
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                      {selectedIcon.category}
                    </span>
                  </div>
                );
              })()}
              <button
                onClick={() => setSelectedIcon(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-600 hover:bg-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Details */}
            <div className="p-8">
              <h3 className="text-3xl font-black text-slate-900 mb-2">
                {selectedIcon.name}
              </h3>
              <p className="text-slate-500 mb-6">Category: {selectedIcon.category}</p>

              {/* Copy Buttons */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-700 mb-2">Import Statement</h4>
                  <div className="bg-slate-900 p-4 rounded-xl flex items-center justify-between">
                    <code className="text-blue-400 text-sm font-mono">
                      {getImportCode(selectedIcon.name)}
                    </code>
                    <button
                      onClick={() => copyToClipboard(getImportCode(selectedIcon.name), 'import')}
                      className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm"
                    >
                      {copiedText === 'import' ? <Check size={14} /> : <Copy size={14} />}
                      {copiedText === 'import' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-700 mb-2">Component Usage</h4>
                  <div className="bg-slate-900 p-4 rounded-xl flex items-center justify-between">
                    <code className="text-blue-400 text-sm font-mono">
                      {getUsageCode(selectedIcon.name, selectedSize)}
                    </code>
                    <button
                      onClick={() => copyToClipboard(getUsageCode(selectedIcon.name, selectedSize), 'usage')}
                      className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm"
                    >
                      {copiedText === 'usage' ? <Check size={14} /> : <Copy size={14} />}
                      {copiedText === 'usage' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-700 mb-2">Full Example</h4>
                  <div className="bg-slate-900 p-4 rounded-xl relative">
                    <pre className="text-blue-400 text-sm font-mono overflow-x-auto pr-20">
                      {getComponentCode(selectedIcon.name, selectedSize)}
                    </pre>
                    <button
                      onClick={() => copyToClipboard(getComponentCode(selectedIcon.name, selectedSize), 'full')}
                      className="absolute top-4 right-4 px-3 py-1 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm"
                    >
                      {copiedText === 'full' ? <Check size={14} /> : <Copy size={14} />}
                      {copiedText === 'full' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedIcon(null)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconsView;
