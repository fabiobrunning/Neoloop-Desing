import React from 'react';
import { ShadowToken } from '../src/types/design-system';

interface ShadowsViewProps {
  tokens: ShadowToken[];
}

const ShadowsView: React.FC<ShadowsViewProps> = ({ tokens }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {tokens.map((token) => (
            <div key={token.id} className="flex flex-col items-center gap-4">
              <div
                className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center transition-shadow duration-300"
                style={{ boxShadow: token.value }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl"></div>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-800">{token.name}</p>
                <p className="text-xs text-slate-400 font-mono mt-1">{token.id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-12 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-8 text-center">Demonstração Interativa</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tokens.map((token) => (
            <div
              key={token.id}
              className="bg-white p-8 rounded-2xl cursor-pointer hover:scale-105 transition-all duration-300"
              style={{ boxShadow: token.value }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl"></div>
                <div>
                  <p className="font-bold text-slate-900">{token.name}</p>
                  <p className="text-sm text-slate-500">Elevação {token.id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Reference */}
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">CSS Variables</h3>
        <pre className="text-blue-400 text-sm font-mono leading-relaxed overflow-x-auto">
          {tokens.map((token) => `--shadow-${token.id}: ${token.value};`).join('\n')}
        </pre>
      </div>
    </div>
  );
};

export default ShadowsView;
