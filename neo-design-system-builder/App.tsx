
import React, { useState, useMemo } from 'react';
import {
  Palette, Type, LayoutGrid, Layers, Wind, Settings, HelpCircle, Search,
  Bell, Moon, ChevronRight, Plus, History, Code, Download, Info,
  MousePointer2, Box, CreditCard, CheckSquare, LogIn, PanelLeft,
  Smile, Share2, BarChart3, Image as ImageIcon, Zap, Laptop, TrendingUp
} from 'lucide-react';
import { ViewType } from './src/types/design-system';
import type { ColorToken } from './src/types/design-system';
import ColorTokensView from './components/ColorTokensView';
import PropertyInspector from './components/PropertyInspector';
import TypographyView from './components/TypographyView';
import SpacingView from './components/SpacingView';
import ShadowsView from './components/ShadowsView';
import BorderRadiusView from './components/BorderRadiusView';
import BreakpointsView from './components/BreakpointsView';
import IconsView from './components/IconsView';
import CustomIconsView from './components/CustomIconsView';
import IconsLibraryView from './components/IconsLibraryView';
import SocialLogosView from './components/SocialLogosView';
import PaymentMethodsView from './components/PaymentMethodsView';
import ChartsView from './components/ChartsView';
import ChartsLibraryView from './components/ChartsLibraryView';
import BackgroundsView from './components/BackgroundsView';
import AnimationsView from './components/AnimationsView';
import UIComponentsView from './components/UIComponentsView';
import { useDesignSystem } from './src/context/DesignSystemContext';
import { useAutoSave } from './src/hooks/useAutoSave';
import { useExport } from './src/hooks/useExport';

const App: React.FC = () => {
  const { state: designSystem, dispatch } = useDesignSystem();
  const { exportJSON, exportBoth } = useExport(designSystem);
  useAutoSave(designSystem);

  const [currentView, setCurrentView] = useState<ViewType>(ViewType.COLOR_TOKENS);
  const [selectedId, setSelectedId] = useState<string | null>('p-500');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const selectedToken = useMemo(() => {
    return designSystem.colors.find(c => c.id === selectedId) || null;
  }, [designSystem.colors, selectedId]);

  const handleUpdateToken = (updatedToken: ColorToken) => {
    dispatch({ type: 'UPDATE_COLOR', payload: updatedToken });
  };

  const NavItem = ({ icon: Icon, label, active, onClick }: any) => (
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

  const renderView = () => {
    switch (currentView) {
      case ViewType.COLOR_TOKENS:
        return <ColorTokensView colors={designSystem.colors} selectedId={selectedId} onSelect={setSelectedId} />;
      case ViewType.TYPOGRAPHY:
        return <TypographyView tokens={designSystem.typography} />;
      case ViewType.SPACING:
        return <SpacingView tokens={designSystem.spacing} />;
      case ViewType.ELEVATIONS:
        return <ShadowsView tokens={designSystem.shadows || []} />;
      case ViewType.BORDER_RADIUS:
        return <BorderRadiusView radii={designSystem.borderRadius} />;
      case ViewType.BREAKPOINTS:
        return <BreakpointsView breakpoints={designSystem.breakpoints} />;
      case ViewType.ICONS:
        return <IconsView />;
      case ViewType.ICONS_CUSTOM:
        return <CustomIconsView />;
      case ViewType.ICONS_LIBRARY:
        return <IconsLibraryView />;
      case ViewType.SOCIAL_LOGOS:
        return <SocialLogosView />;
      case ViewType.PAYMENT_METHODS:
        return <PaymentMethodsView />;
      case ViewType.CHARTS:
        return <ChartsView />;
      case ViewType.CHARTS_LIBRARY:
        return <ChartsLibraryView />;
      case ViewType.BACKGROUNDS:
        return <BackgroundsView />;
      case ViewType.ANIMATIONS:
        return <AnimationsView />;
      case ViewType.UI_BUTTONS:
      case ViewType.UI_CARDS:
      case ViewType.UI_FORMS:
        return <UIComponentsView type={currentView} colors={designSystem.colors} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-slate-200 rounded-3xl bg-white/50">
            <Zap className="text-blue-200 mb-4" size={48} />
            <h3 className="text-slate-900 font-bold text-xl">Em Construção</h3>
            <p className="text-slate-500 text-sm">A visualização para {currentView} está sendo preparada.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      {/* Sidebar - Neo Structure */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0 z-10 shadow-xl shadow-slate-200/50">
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30">N</div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-800 tracking-tight leading-none">Neo Builder</span>
            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1">Design System</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
          {/* Foundation */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-3 flex items-center gap-2">
              <div className="w-1 h-1 bg-slate-300 rounded-full" /> Foundations
            </div>
            <div className="space-y-1">
              <NavItem icon={Palette} label="Cores" active={currentView === ViewType.COLOR_TOKENS} onClick={() => setCurrentView(ViewType.COLOR_TOKENS)} />
              <NavItem icon={Type} label="Tipografia" active={currentView === ViewType.TYPOGRAPHY} onClick={() => setCurrentView(ViewType.TYPOGRAPHY)} />
              <NavItem icon={LayoutGrid} label="Espaçamento" active={currentView === ViewType.SPACING} onClick={() => setCurrentView(ViewType.SPACING)} />
              <NavItem icon={Layers} label="Elevações" active={currentView === ViewType.ELEVATIONS} onClick={() => setCurrentView(ViewType.ELEVATIONS)} />
              <NavItem icon={Box} label="Border Radius" active={currentView === ViewType.BORDER_RADIUS} onClick={() => setCurrentView(ViewType.BORDER_RADIUS)} />
              <NavItem icon={Laptop} label="Breakpoints" active={currentView === ViewType.BREAKPOINTS} onClick={() => setCurrentView(ViewType.BREAKPOINTS)} />
            </div>
          </div>

          {/* Visual Elements */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-3 flex items-center gap-2">
               <div className="w-1 h-1 bg-slate-300 rounded-full" /> Visuals
            </div>
            <div className="space-y-1">
              <NavItem icon={Smile} label="Ícones" active={currentView === ViewType.ICONS} onClick={() => setCurrentView(ViewType.ICONS)} />
              <NavItem icon={Box} label="UI Icons" active={currentView === ViewType.ICONS_CUSTOM} onClick={() => setCurrentView(ViewType.ICONS_CUSTOM)} />
              <NavItem icon={Zap} label="Icons Library (3.8k)" active={currentView === ViewType.ICONS_LIBRARY} onClick={() => setCurrentView(ViewType.ICONS_LIBRARY)} />
              <NavItem icon={Share2} label="Social Logos" active={currentView === ViewType.SOCIAL_LOGOS} onClick={() => setCurrentView(ViewType.SOCIAL_LOGOS)} />
              <NavItem icon={CreditCard} label="Payment Methods" active={currentView === ViewType.PAYMENT_METHODS} onClick={() => setCurrentView(ViewType.PAYMENT_METHODS)} />
              <NavItem icon={BarChart3} label="Gráficos" active={currentView === ViewType.CHARTS} onClick={() => setCurrentView(ViewType.CHARTS)} />
              <NavItem icon={TrendingUp} label="Charts Library" active={currentView === ViewType.CHARTS_LIBRARY} onClick={() => setCurrentView(ViewType.CHARTS_LIBRARY)} />
              <NavItem icon={ImageIcon} label="Backgrounds" active={currentView === ViewType.BACKGROUNDS} onClick={() => setCurrentView(ViewType.BACKGROUNDS)} />
            </div>
          </div>

          {/* UI Components */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-3 flex items-center gap-2">
               <div className="w-1 h-1 bg-slate-300 rounded-full" /> Components
            </div>
            <div className="space-y-1">
              <NavItem icon={MousePointer2} label="Buttons" active={currentView === ViewType.UI_BUTTONS} onClick={() => setCurrentView(ViewType.UI_BUTTONS)} />
              <NavItem icon={CreditCard} label="Cards" active={currentView === ViewType.UI_CARDS} onClick={() => setCurrentView(ViewType.UI_CARDS)} />
              <NavItem icon={Box} label="Forms & Inputs" active={currentView === ViewType.UI_FORMS} onClick={() => setCurrentView(ViewType.UI_FORMS)} />
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
              <NavItem icon={Wind} label="Animações" active={currentView === ViewType.ANIMATIONS} onClick={() => setCurrentView(ViewType.ANIMATIONS)} />
            </div>
          </div>
        </nav>

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

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-400">Design System</span>
            <ChevronRight size={14} className="text-slate-300" />
            <span className="font-semibold text-slate-800">{currentView}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2 mr-4">
              {[1,2,3].map(i => (
                <img key={i} className="w-7 h-7 rounded-full border-2 border-white" src={`https://picsum.photos/seed/${i}/28/28`} alt="" />
              ))}
              <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">+2</div>
            </div>
            <button
              onClick={exportBoth}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-black transition-all shadow-lg shadow-slate-900/10"
            >
              <Code size={16} /> Exportar JSON + CSS
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 p-10 overflow-y-auto">
            <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-10 flex justify-between items-end">
                <div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">{currentView}</h1>
                  <p className="text-slate-500 max-w-xl text-lg font-medium leading-relaxed">
                    Arquitetura visual de {currentView.toLowerCase()} para garantir consistência em toda a plataforma.
                  </p>
                </div>
                <div className="flex gap-2">
                   <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
                      <History size={20} />
                   </button>
                   <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700">
                      <Plus size={18} /> Novo Token
                   </button>
                </div>
              </div>

              {renderView()}
            </div>
          </div>

          <PropertyInspector
            token={selectedToken}
            onUpdate={handleUpdateToken}
            onExport={exportJSON}
          />
        </div>
      </main>

      {/* Export Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="font-black text-slate-900 text-2xl">Exportar Design Tokens</h3>
                <p className="text-slate-500 text-sm mt-1">Configurações prontas para uso em Tailwind, Figma ou CSS Variables.</p>
              </div>
              <button onClick={() => setIsExportModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors">×</button>
            </div>
            <div className="p-8 flex-1 overflow-auto bg-slate-900">
              <pre className="text-blue-400 text-sm font-mono leading-relaxed">
                {JSON.stringify(designSystem, null, 2)}
              </pre>
            </div>
            <div className="p-8 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
              <button 
                onClick={() => setIsExportModalOpen(false)}
                className="px-6 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-white"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  exportBoth();
                  setIsExportModalOpen(false);
                }}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-black flex items-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
              >
                <Download size={18} />
                Baixar JSON + CSS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
