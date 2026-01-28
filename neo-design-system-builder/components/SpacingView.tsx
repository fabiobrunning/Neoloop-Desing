
import React from 'react';
import { SpacingToken } from '../types';

interface SpacingViewProps {
  tokens: SpacingToken[];
}

const SpacingView: React.FC<SpacingViewProps> = ({ tokens }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <div className="space-y-8">
          {tokens.map((token) => (
            <div key={token.id} className="flex items-center gap-10">
              <div className="w-32">
                <p className="text-sm font-bold text-slate-800">{token.name}</p>
                <p className="text-xs text-slate-400 font-mono">{token.value}px</p>
              </div>
              <div className="flex-1 bg-slate-50 h-10 rounded-lg overflow-hidden relative border border-slate-100">
                <div 
                  className="h-full bg-blue-500 transition-all duration-500 ease-out"
                  style={{ width: `${token.value * 4}px` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpacingView;
