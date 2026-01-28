import React from 'react';

interface BorderRadiusViewProps {
  radii: number[];
}

const BorderRadiusView: React.FC<BorderRadiusViewProps> = ({ radii }) => {
  const radiusLabels = ['Pequeno', 'Médio', 'Grande', 'Extra Grande', 'Circular'];

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {radii.map((radius, index) => (
            <div key={index} className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <div
                  className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 transition-all duration-500"
                  style={{ borderRadius: `${radius}px` }}
                ></div>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-800">{radiusLabels[index]}</p>
                <p className="text-xs text-slate-400 font-mono mt-1">{radius}px</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Examples Grid */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-12 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-8 text-center">Exemplos de Uso</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {radii.slice(0, -1).map((radius, index) => (
            <div
              key={index}
              className="bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              style={{ borderRadius: `${radius}px` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 bg-blue-500"
                  style={{ borderRadius: `${radius}px` }}
                ></div>
                <div>
                  <p className="font-bold text-slate-900">{radiusLabels[index]}</p>
                  <p className="text-sm text-slate-500">{radius}px</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Border radius de {radius}px aplicado a este card
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Circular Example */}
      <div className="bg-white p-12 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-8 text-center">Exemplo Circular (999px)</h3>
        <div className="flex justify-center gap-8 flex-wrap">
          <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors">
            Botão Circular
          </button>
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
            99+
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full"></div>
        </div>
      </div>

      {/* CSS Reference */}
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">CSS Variables</h3>
        <pre className="text-blue-400 text-sm font-mono leading-relaxed">
          {radii.map((radius, index) => `--radius-${index + 1}: ${radius}px;`).join('\n')}
        </pre>
      </div>
    </div>
  );
};

export default BorderRadiusView;
