import React, { useState } from 'react';
import {
  Home, Search, Settings, User, Bell, Mail, Calendar, Clock,
  Heart, Star, Trash2, Edit, Download, Upload, Share2, Link,
  ChevronRight, ChevronLeft, ChevronUp, ChevronDown, Plus, Minus,
  Check, X, AlertCircle, Info, HelpCircle, Menu, MoreVertical,
  Eye, EyeOff, Lock, Unlock, LogIn, LogOut, UserPlus, Users,
  Image, File, Folder, Save, Copy, Clipboard, Archive, Database,
  ShoppingCart, CreditCard, DollarSign, TrendingUp, TrendingDown, BarChart3,
  Zap, Wifi, Battery, Bluetooth, Volume2, VolumeX, Play, Pause,
  Globe, MapPin, Navigation, Compass, Cloud, Sun, Moon, Wind
} from 'lucide-react';

const IconsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSize, setSelectedSize] = useState(24);

  const iconCategories = {
    'Navegação': [
      { name: 'Home', icon: Home },
      { name: 'Search', icon: Search },
      { name: 'Menu', icon: Menu },
      { name: 'ChevronRight', icon: ChevronRight },
      { name: 'ChevronLeft', icon: ChevronLeft },
      { name: 'ChevronUp', icon: ChevronUp },
      { name: 'ChevronDown', icon: ChevronDown },
      { name: 'MoreVertical', icon: MoreVertical },
    ],
    'Ações': [
      { name: 'Plus', icon: Plus },
      { name: 'Minus', icon: Minus },
      { name: 'Edit', icon: Edit },
      { name: 'Trash', icon: Trash2 },
      { name: 'Download', icon: Download },
      { name: 'Upload', icon: Upload },
      { name: 'Share', icon: Share2 },
      { name: 'Link', icon: Link },
      { name: 'Copy', icon: Copy },
      { name: 'Save', icon: Save },
    ],
    'Status': [
      { name: 'Check', icon: Check },
      { name: 'X', icon: X },
      { name: 'AlertCircle', icon: AlertCircle },
      { name: 'Info', icon: Info },
      { name: 'HelpCircle', icon: HelpCircle },
    ],
    'Usuário': [
      { name: 'User', icon: User },
      { name: 'Users', icon: Users },
      { name: 'UserPlus', icon: UserPlus },
      { name: 'LogIn', icon: LogIn },
      { name: 'LogOut', icon: LogOut },
      { name: 'Lock', icon: Lock },
      { name: 'Unlock', icon: Unlock },
    ],
    'Comunicação': [
      { name: 'Mail', icon: Mail },
      { name: 'Bell', icon: Bell },
      { name: 'Calendar', icon: Calendar },
      { name: 'Clock', icon: Clock },
    ],
    'Social': [
      { name: 'Heart', icon: Heart },
      { name: 'Star', icon: Star },
      { name: 'Eye', icon: Eye },
      { name: 'EyeOff', icon: EyeOff },
    ],
    'Arquivos': [
      { name: 'File', icon: File },
      { name: 'Folder', icon: Folder },
      { name: 'Image', icon: Image },
      { name: 'Archive', icon: Archive },
      { name: 'Database', icon: Database },
      { name: 'Clipboard', icon: Clipboard },
    ],
    'E-commerce': [
      { name: 'ShoppingCart', icon: ShoppingCart },
      { name: 'CreditCard', icon: CreditCard },
      { name: 'DollarSign', icon: DollarSign },
      { name: 'TrendingUp', icon: TrendingUp },
      { name: 'TrendingDown', icon: TrendingDown },
      { name: 'BarChart', icon: BarChart3 },
    ],
    'Sistema': [
      { name: 'Settings', icon: Settings },
      { name: 'Zap', icon: Zap },
      { name: 'Wifi', icon: Wifi },
      { name: 'Battery', icon: Battery },
      { name: 'Bluetooth', icon: Bluetooth },
    ],
    'Mídia': [
      { name: 'Play', icon: Play },
      { name: 'Pause', icon: Pause },
      { name: 'Volume', icon: Volume2 },
      { name: 'Mute', icon: VolumeX },
    ],
    'Localização': [
      { name: 'Globe', icon: Globe },
      { name: 'MapPin', icon: MapPin },
      { name: 'Navigation', icon: Navigation },
      { name: 'Compass', icon: Compass },
    ],
    'Clima': [
      { name: 'Cloud', icon: Cloud },
      { name: 'Sun', icon: Sun },
      { name: 'Moon', icon: Moon },
      { name: 'Wind', icon: Wind },
    ],
  };

  const allIcons = Object.entries(iconCategories).flatMap(([category, icons]) =>
    icons.map(icon => ({ ...icon, category }))
  );

  const filteredIcons = searchTerm
    ? allIcons.filter(icon =>
        icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        icon.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allIcons;

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Search and Size Controls */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col md:flex-row gap-4">
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
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-slate-700">Tamanho:</span>
          {[16, 20, 24, 32, 40].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                selectedSize === size
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {size}px
            </button>
          ))}
        </div>
      </div>

      {/* Icons Grid */}
      {searchTerm ? (
        <div className="bg-white p-8 rounded-3xl border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Resultados da busca ({filteredIcons.length})
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {filteredIcons.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-slate-50 cursor-pointer transition-all group"
                  title={item.name}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                    <Icon size={selectedSize} className="text-blue-600" />
                  </div>
                  <p className="text-xs text-slate-600 text-center truncate w-full">{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        Object.entries(iconCategories).map(([category, icons]) => (
          <div key={category} className="bg-white p-8 rounded-3xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">{category}</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {icons.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-slate-50 cursor-pointer transition-all group"
                    title={item.name}
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                      <Icon size={selectedSize} className="text-blue-600" />
                    </div>
                    <p className="text-xs text-slate-600 text-center truncate w-full">{item.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}

      {/* Usage Examples */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-12 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-8 text-center">Exemplos de Uso</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="flex items-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
            <Plus size={20} />
            Novo Item
          </button>
          <button className="flex items-center gap-3 px-6 py-4 bg-white text-slate-900 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition-colors">
            <Download size={20} />
            Download
          </button>
          <button className="flex items-center gap-3 px-6 py-4 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors">
            <Trash2 size={20} />
            Deletar
          </button>
        </div>
      </div>

      {/* Code Reference */}
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">Uso com Lucide React</h3>
        <pre className="text-blue-400 text-sm font-mono leading-relaxed">
{`import { Home, User, Settings } from 'lucide-react';

<Home size={24} />
<User size={24} className="text-blue-600" />
<Settings size={32} strokeWidth={1.5} />`}
        </pre>
      </div>
    </div>
  );
};

export default IconsView;
