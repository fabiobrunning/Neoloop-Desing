
import React from 'react';
import { ColorToken } from '../types';
import { Code, Download, Info } from 'lucide-react';

interface PropertyInspectorProps {
  token: ColorToken | null;
  onUpdate: (token: ColorToken) => void;
  onExport: () => void;
}

const PropertyInspector: React.FC<PropertyInspectorProps> = ({ token, onUpdate, onExport }) => {
  if (!token) {
    return (
      <div className="w-80 border-l border-slate-200 bg-white p-6 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
          <Info size={32} />
        </div>
        <h3 className="font-bold text-slate-800 mb-2">No selection</h3>
        <p className="text-sm text-slate-500">Select a token from the canvas to view and edit its properties.</p>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-slate-200 bg-white flex flex-col shrink-0 overflow-y-auto">
      <div className="p-6 border-b border-slate-100">
        <h3 className="font-bold text-slate-900">Property Inspector</h3>
        <p className="text-xs text-slate-400 mt-1">{token.name} selected</p>
      </div>

      <div className="p-6 flex-1 space-y-8">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Token Name</label>
          <input 
            type="text" 
            value={`$color-${token.name.toLowerCase().replace(' ', '-')}`}
            readOnly
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 font-mono focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Hex Value</label>
          <div className="flex gap-2">
            <div 
              className="w-11 h-11 rounded-lg border border-slate-200 shrink-0 shadow-sm"
              style={{ backgroundColor: token.hex }}
            />
            <input 
              type="text" 
              value={token.hex}
              onChange={(e) => onUpdate({ ...token, hex: e.target.value })}
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 font-mono uppercase focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Accessibility</label>
          <div className="space-y-2 mt-3">
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-xs text-slate-600">On White Background</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded-full">AAA PASS</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-xs text-slate-600">On Dark Background</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">AA FAIL</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-slate-100 space-y-3">
        <button 
          onClick={onExport}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all active:scale-95"
        >
          <Code size={18} />
          Preview JSON
        </button>
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95">
          <Download size={18} />
          Export JSON
        </button>
        
        <div className="flex gap-3 items-start mt-6 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
          <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-blue-900">Pro Tip</p>
            <p className="text-[10px] text-blue-700/80 leading-relaxed">
              Use <code className="bg-blue-100 px-1 rounded">CMD + E</code> to quickly export all active tokens to your style-dictionary config.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInspector;
