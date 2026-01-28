import React from 'react';
import {
  Palette, Type, LayoutGrid, Layers, Wind, Settings,
  MousePointer2, Box, CreditCard, CheckSquare, LogIn, PanelLeft,
  Smile, Share2, BarChart3, Image as ImageIcon, Zap, Laptop,
  TrendingUp, Contrast, Ruler, Grid3X3
} from 'lucide-react';
import { ViewType } from '../src/types/design-system';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      active ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-slate-100'
    }`}
  >
    <Icon size={16} />
    <span className="truncate">{label}</span>
  </button>
);

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0 z-10 shadow-xl shadow-slate-200/50">
      {/* Header */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-100">
        <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30">N</div>
        <div className="flex flex-col">
          <span className="font-bold text-slate-800 tracking-tight leading-none">Neo Builder</span>
          <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1">Design System</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
        {/* Foundation */}
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-3 flex items-center gap-2">
            <div className="w-1 h-1 bg-slate-300 rounded-full" /> Foundations
          </div>
          <div className="space-y-1">
            <NavItem icon={Palette} label="Cores" active={currentView === ViewType.COLOR_TOKENS} onClick={() => onViewChange(ViewType.COLOR_TOKENS)} />
            <NavItem icon={Type} label="Tipografia" active={currentView === ViewType.TYPOGRAPHY} onClick={() => onViewChange(ViewType.TYPOGRAPHY)} />
            <NavItem icon={Ruler} label="Type Validator" active={currentView === ViewType.TYPOGRAPHY_VALIDATOR} onClick={() => onViewChange(ViewType.TYPOGRAPHY_VALIDATOR)} />
            <NavItem icon={LayoutGrid} label="Espacamento" active={currentView === ViewType.SPACING} onClick={() => onViewChange(ViewType.SPACING)} />
            <NavItem icon={Grid3X3} label="Spacing Validator" active={currentView === ViewType.SPACING_VALIDATOR} onClick={() => onViewChange(ViewType.SPACING_VALIDATOR)} />
            <NavItem icon={Layers} label="Elevacoes" active={currentView === ViewType.ELEVATIONS} onClick={() => onViewChange(ViewType.ELEVATIONS)} />
            <NavItem icon={Box} label="Border Radius" active={currentView === ViewType.BORDER_RADIUS} onClick={() => onViewChange(ViewType.BORDER_RADIUS)} />
            <NavItem icon={Laptop} label="Breakpoints" active={currentView === ViewType.BREAKPOINTS} onClick={() => onViewChange(ViewType.BREAKPOINTS)} />
            <NavItem icon={Contrast} label="Contrast Checker" active={currentView === ViewType.CONTRAST_CHECKER} onClick={() => onViewChange(ViewType.CONTRAST_CHECKER)} />
          </div>
        </div>

        {/* Visual Elements */}
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-3 flex items-center gap-2">
             <div className="w-1 h-1 bg-slate-300 rounded-full" /> Visuals
          </div>
          <div className="space-y-1">
            <NavItem icon={Smile} label="Icones" active={currentView === ViewType.ICONS} onClick={() => onViewChange(ViewType.ICONS)} />
            <NavItem icon={Box} label="UI Icons" active={currentView === ViewType.ICONS_CUSTOM} onClick={() => onViewChange(ViewType.ICONS_CUSTOM)} />
            <NavItem icon={Zap} label="Icons Library (3.8k)" active={currentView === ViewType.ICONS_LIBRARY} onClick={() => onViewChange(ViewType.ICONS_LIBRARY)} />
            <NavItem icon={Share2} label="Social Logos" active={currentView === ViewType.SOCIAL_LOGOS} onClick={() => onViewChange(ViewType.SOCIAL_LOGOS)} />
            <NavItem icon={CreditCard} label="Payment Methods" active={currentView === ViewType.PAYMENT_METHODS} onClick={() => onViewChange(ViewType.PAYMENT_METHODS)} />
            <NavItem icon={BarChart3} label="Graficos" active={currentView === ViewType.CHARTS} onClick={() => onViewChange(ViewType.CHARTS)} />
            <NavItem icon={TrendingUp} label="Charts Library" active={currentView === ViewType.CHARTS_LIBRARY} onClick={() => onViewChange(ViewType.CHARTS_LIBRARY)} />
            <NavItem icon={ImageIcon} label="Backgrounds" active={currentView === ViewType.BACKGROUNDS} onClick={() => onViewChange(ViewType.BACKGROUNDS)} />
          </div>
        </div>

        {/* UI Components */}
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-3 flex items-center gap-2">
             <div className="w-1 h-1 bg-slate-300 rounded-full" /> Components
          </div>
          <div className="space-y-1">
            <NavItem icon={MousePointer2} label="Buttons" active={currentView === ViewType.UI_BUTTONS} onClick={() => onViewChange(ViewType.UI_BUTTONS)} />
            <NavItem icon={CreditCard} label="Cards" active={currentView === ViewType.UI_CARDS} onClick={() => onViewChange(ViewType.UI_CARDS)} />
            <NavItem icon={Box} label="Forms & Inputs" active={currentView === ViewType.UI_FORMS} onClick={() => onViewChange(ViewType.UI_FORMS)} />
            <NavItem icon={CheckSquare} label="Checkbox & Toggle" />
            <NavItem icon={LogIn} label="Login Templates" />
            <NavItem icon={PanelLeft} label="Sidebars" />
          </div>
        </div>

        {/* Interactions */}
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-3 flex items-center gap-2">
             <div className="w-1 h-1 bg-slate-300 rounded-full" /> Effects
          </div>
          <div className="space-y-1">
            <NavItem icon={Wind} label="Animacoes" active={currentView === ViewType.ANIMATIONS} onClick={() => onViewChange(ViewType.ANIMATIONS)} />
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
          <img src="https://picsum.photos/seed/neo/32/32" alt="User" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-slate-800 truncate">Admin Profile</p>
          <p className="text-[10px] text-slate-500">Workspace Pro</p>
        </div>
        <Settings size={14} className="text-slate-400 cursor-pointer hover:text-slate-600" />
      </div>
    </aside>
  );
};

export default Navigation;
