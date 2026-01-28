
import React, { useState } from 'react';
import { ColorToken } from '../types';
import { Check } from 'lucide-react';

interface ColorTokensViewProps {
  colors: ColorToken[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const ColorTokensView: React.FC<ColorTokensViewProps> = ({ colors, selectedId, onSelect }) => {
  const [activeTab, setActiveTab] = useState('Base Ramps');
  
  const groups = ['Primary', 'Neutral', 'Success', 'Warning', 'Error', 'Info', 'Indigo'];

  const Tab = ({ label }: { label: string }) => (
    <button 
      onClick={() => setActiveTab(label)}
      className={`pb-4 px-1 text-sm font-medium transition-all relative ${
        activeTab === label ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
      }`}
    >
      {label}
      {activeTab === label && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full" />
      )}
    </button>
  );

  return (
    <div>
      <div className="flex items-center gap-8 border-b border-slate-200 mb-8">
        <Tab label="Base Ramps" />
        <Tab label="Semantic" />
        <Tab label="Accessibility" />
      </div>

      <div className="grid grid-cols-7 gap-6">
        {groups.map((group) => (
          <div key={group} className="space-y-4">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{group}</h4>
            <div className="space-y-3">
              {colors
                .filter(c => c.group === group)
                .map((color) => (
                  <button
                    key={color.id}
                    onClick={() => onSelect(color.id)}
                    className={`group relative w-full aspect-square rounded-xl border-2 transition-all p-1.5 ${
                      selectedId === color.id 
                        ? 'border-blue-600 shadow-lg scale-105' 
                        : 'border-white hover:border-slate-200'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="absolute inset-x-2 bottom-2 bg-white/90 backdrop-blur-sm px-1.5 py-1 rounded-md shadow-sm border border-slate-100 flex flex-col items-start overflow-hidden">
                      <span className="text-[9px] font-bold text-slate-800 whitespace-nowrap">{color.name.split(' ')[1]}</span>
                      <span className="text-[8px] text-slate-500 uppercase">{color.hex}</span>
                    </div>
                    {selectedId === color.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white ring-2 ring-white">
                        <Check size={10} />
                      </div>
                    )}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorTokensView;
