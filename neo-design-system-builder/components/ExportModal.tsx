import React from 'react';
import { Download } from 'lucide-react';
import type { DesignSystem } from '../src/types/design-system';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  designSystem: DesignSystem;
  onExport: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  designSystem,
  onExport,
}) => {
  if (!isOpen) return null;

  const handleExport = () => {
    onExport();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="font-black text-slate-900 text-2xl">Exportar Design Tokens</h3>
            <p className="text-slate-500 text-sm mt-1">Configuracoes prontas para uso em Tailwind, Figma ou CSS Variables.</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
          >
            x
          </button>
        </div>
        <div className="p-8 flex-1 overflow-auto bg-slate-900">
          <pre className="text-blue-400 text-sm font-mono leading-relaxed">
            {JSON.stringify(designSystem, null, 2)}
          </pre>
        </div>
        <div className="p-8 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-white"
          >
            Cancelar
          </button>
          <button
            onClick={handleExport}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-black flex items-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
          >
            <Download size={18} />
            Baixar JSON + CSS
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
