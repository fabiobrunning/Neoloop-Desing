import React, { useState, useMemo } from 'react';
import { ChevronRight, Code, History, Plus } from 'lucide-react';
import { ViewType } from './src/types/design-system';
import type { ColorToken } from './src/types/design-system';

import Navigation from './components/Navigation';
import ViewsContainer from './components/ViewsContainer';
import PropertyInspector from './components/PropertyInspector';
import ExportModal from './components/ExportModal';

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

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />

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
            <button onClick={exportBoth} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-black transition-all shadow-lg shadow-slate-900/10">
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
                    Arquitetura visual de {currentView.toLowerCase()} para garantir consistencia em toda a plataforma.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600"><History size={20} /></button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700">
                    <Plus size={18} /> Novo Token
                  </button>
                </div>
              </div>
              <ViewsContainer currentView={currentView} designSystem={designSystem} selectedId={selectedId} onSelect={setSelectedId} />
            </div>
          </div>
          <PropertyInspector token={selectedToken} onUpdate={handleUpdateToken} onExport={exportJSON} />
        </div>
      </main>

      <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} designSystem={designSystem} onExport={exportBoth} />
    </div>
  );
};

export default App;
