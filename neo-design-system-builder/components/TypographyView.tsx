
import React from 'react';
import { TypographyToken } from '../types';

interface TypographyViewProps {
  tokens: TypographyToken[];
}

const TypographyView: React.FC<TypographyViewProps> = ({ tokens }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {tokens.map((token) => (
          <div key={token.id} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-400 transition-all group flex items-center justify-between shadow-sm hover:shadow-xl hover:shadow-blue-500/5">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{token.name}</span>
              <p 
                style={{ fontSize: token.size, fontWeight: token.weight, lineHeight: token.lineHeight }}
                className="text-slate-900 group-hover:text-blue-900 transition-colors truncate max-w-2xl"
              >
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
            <div className="text-right shrink-0 ml-10">
              <p className="text-sm font-mono font-bold text-slate-800">{token.size}</p>
              <p className="text-xs text-slate-400 font-mono mt-1">Weight: {token.weight}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypographyView;
