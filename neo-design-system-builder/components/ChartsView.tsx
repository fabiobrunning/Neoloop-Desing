import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ChartsView: React.FC = () => {
  // Sample data
  const lineData = [
    { name: 'Jan', vendas: 4000, lucro: 2400 },
    { name: 'Fev', vendas: 3000, lucro: 1398 },
    { name: 'Mar', vendas: 2000, lucro: 9800 },
    { name: 'Abr', vendas: 2780, lucro: 3908 },
    { name: 'Mai', vendas: 1890, lucro: 4800 },
    { name: 'Jun', vendas: 2390, lucro: 3800 },
    { name: 'Jul', vendas: 3490, lucro: 4300 },
  ];

  const barData = [
    { name: 'Q1', valor: 4000 },
    { name: 'Q2', valor: 3000 },
    { name: 'Q3', valor: 2000 },
    { name: 'Q4', valor: 2780 },
  ];

  const pieData = [
    { name: 'Desktop', value: 400, color: '#2b4bee' },
    { name: 'Mobile', value: 300, color: '#22c55e' },
    { name: 'Tablet', value: 200, color: '#f59e0b' },
    { name: 'Outros', value: 100, color: '#ef4444' },
  ];

  const areaData = [
    { name: 'Jan', usuarios: 400 },
    { name: 'Fev', usuarios: 300 },
    { name: 'Mar', usuarios: 600 },
    { name: 'Abr', usuarios: 800 },
    { name: 'Mai', usuarios: 500 },
    { name: 'Jun', usuarios: 900 },
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Line Chart */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Line Chart - Vendas vs Lucro</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="vendas"
              stroke="#2b4bee"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="lucro"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Bar Chart - Quarterly Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="valor" fill="#2b4bee" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Area Chart - Usuários</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="usuarios"
                stroke="#2b4bee"
                fill="#2b4bee"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Pie Chart - Dispositivos</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Color Palette for Charts */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Paleta de Cores para Gráficos</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Primary', hex: '#2b4bee' },
            { name: 'Success', hex: '#22c55e' },
            { name: 'Warning', hex: '#f59e0b' },
            { name: 'Error', hex: '#ef4444' },
            { name: 'Info', hex: '#3b82f6' },
            { name: 'Purple', hex: '#a855f7' },
            { name: 'Pink', hex: '#ec4899' },
            { name: 'Cyan', hex: '#06b6d4' },
          ].map((color) => (
            <div key={color.name} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200">
              <div
                className="w-12 h-12 rounded-lg shadow-sm"
                style={{ backgroundColor: color.hex }}
              ></div>
              <div>
                <p className="text-sm font-bold text-slate-900">{color.name}</p>
                <p className="text-xs text-slate-500 font-mono">{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Code */}
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">Exemplo de Uso com Recharts</h3>
        <pre className="text-blue-400 text-sm font-mono leading-relaxed overflow-x-auto">
{`import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Fev', value: 300 },
  { name: 'Mar', value: 600 },
];

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="value" stroke="#2b4bee" />
  </LineChart>
</ResponsiveContainer>`}
        </pre>
      </div>
    </div>
  );
};

export default ChartsView;
