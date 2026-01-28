import React, { useState } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import chartsCatalog from '../src/data/charts-catalog.json';

const ChartsLibraryView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'circle' | 'tCharts'>('circle');

  const circleCharts = chartsCatalog.categories.circle.charts;
  const tCharts = chartsCatalog.categories.tCharts.charts;

  const activeCharts = activeTab === 'circle' ? circleCharts : tCharts;

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-3xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black mb-2">Charts Library</h2>
            <p className="text-green-100">
              {chartsCatalog.total} pre-built chart components from Figma
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-black">{chartsCatalog.total}</div>
            <div className="text-sm text-green-200">Gráficos</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 inline-flex gap-2 w-fit">
        <button
          onClick={() => setActiveTab('circle')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'circle'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Circle Charts ({chartsCatalog.categories.circle.total})
        </button>
        <button
          onClick={() => setActiveTab('tCharts')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'tCharts'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          T Charts ({chartsCatalog.categories.tCharts.total})
        </button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeCharts.map((chart: any) => (
          <div
            key={chart.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all group"
          >
            <div className="h-64 bg-slate-50 flex items-center justify-center p-6">
              <img
                src={chart.url}
                alt={chart.name}
                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2 truncate">
                {chart.name}
              </h3>
              <p className="text-sm text-slate-500 mb-4 uppercase tracking-wide">
                {chart.extension} • {activeTab}
              </p>
              <a
                href={chart.url}
                download={chart.filename}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                <Download size={16} /> Download
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Integration Guide */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-6">
          Integração com Recharts
        </h3>
        <p className="text-slate-600 mb-4">
          Use estes charts como referência visual para criar gráficos com Recharts.
        </p>
        <div className="bg-slate-900 p-6 rounded-2xl">
          <pre className="text-blue-400 text-sm font-mono leading-relaxed">
{`// Exemplo: Circle Chart
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'A', value: 400 },
  { name: 'B', value: 300 }
];

<PieChart width={400} height={400}>
  <Pie data={data} dataKey="value" />
</PieChart>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ChartsLibraryView;
