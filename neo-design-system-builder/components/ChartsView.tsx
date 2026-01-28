import React, { useState, useRef, useCallback, useMemo } from 'react';
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
import {
  Download,
  Copy,
  Check,
  Plus,
  Trash2,
  RotateCcw,
  Palette,
  Type,
  Settings,
  ChevronDown,
  FileJson,
  Image,
  Code,
  TrendingUp,
  BarChart3,
  PieChartIcon,
  Activity,
  Edit3,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { useDesignSystem } from '../src/context/DesignSystemContext';
import type { ColorToken } from '../src/types/design-system';

// Chart types
type ChartType = 'line' | 'bar' | 'area' | 'pie';

// Data point interface
interface DataPoint {
  name: string;
  [key: string]: string | number;
}

// Chart configuration interface
interface ChartConfig {
  title: string;
  type: ChartType;
  showGrid: boolean;
  showLegend: boolean;
  showTooltip: boolean;
  xAxisLabel: string;
  yAxisLabel: string;
  colors: string[];
  strokeWidth: number;
  fillOpacity: number;
  animationDuration: number;
}

/**
 * Fallback colors used when design system colors are not available.
 * These should match the initial design system colors for consistency.
 */
const FALLBACK_COLORS = [
  '#2b4bee', // Primary Blue
  '#22c55e', // Success Green
  '#f59e0b', // Warning Orange
  '#ef4444', // Error Red
  '#a855f7', // Purple
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#6366f1', // Indigo
];

/**
 * Mapping of semantic color groups to their usage in charts.
 * This ensures charts use design system tokens consistently.
 */
const COLOR_GROUP_PRIORITY = ['Primary', 'Success', 'Warning', 'Error', 'Info', 'Indigo', 'Neutral'];

/**
 * Extracts chart-friendly colors from design system color tokens.
 * Prioritizes semantic colors (Primary, Success, Warning, Error) for better meaning.
 * Falls back to FALLBACK_COLORS if no design system colors are available.
 *
 * @param colors - Array of ColorToken from the design system
 * @returns Array of hex color strings for use in charts
 */
function extractChartColors(colors: ColorToken[]): string[] {
  if (!colors || colors.length === 0) {
    return FALLBACK_COLORS;
  }

  const chartColors: string[] = [];

  // First, get one color from each priority group (preferring 500 variants)
  COLOR_GROUP_PRIORITY.forEach(group => {
    const groupColors = colors.filter(c => c.group === group);
    if (groupColors.length > 0) {
      // Prefer the "500" variant if available, otherwise take the first
      const preferredColor = groupColors.find(c => c.name.includes('500')) || groupColors[0];
      chartColors.push(preferredColor.hex);
    }
  });

  // If we have fewer than 4 colors, add fallbacks
  if (chartColors.length < 4) {
    FALLBACK_COLORS.forEach(fallback => {
      if (!chartColors.includes(fallback) && chartColors.length < 8) {
        chartColors.push(fallback);
      }
    });
  }

  return chartColors.length > 0 ? chartColors : FALLBACK_COLORS;
}

// Preset data templates
const DATA_PRESETS = {
  sales: {
    name: 'Vendas Mensais',
    data: [
      { name: 'Jan', vendas: 4000, lucro: 2400 },
      { name: 'Fev', vendas: 3000, lucro: 1398 },
      { name: 'Mar', vendas: 2000, lucro: 9800 },
      { name: 'Abr', vendas: 2780, lucro: 3908 },
      { name: 'Mai', vendas: 1890, lucro: 4800 },
      { name: 'Jun', vendas: 2390, lucro: 3800 },
      { name: 'Jul', vendas: 3490, lucro: 4300 },
    ],
    dataKeys: ['vendas', 'lucro'],
  },
  users: {
    name: 'Crescimento de Usuarios',
    data: [
      { name: 'Jan', usuarios: 400 },
      { name: 'Fev', usuarios: 530 },
      { name: 'Mar', usuarios: 720 },
      { name: 'Abr', usuarios: 890 },
      { name: 'Mai', usuarios: 1250 },
      { name: 'Jun', usuarios: 1580 },
    ],
    dataKeys: ['usuarios'],
  },
  devices: {
    name: 'Dispositivos',
    data: [
      { name: 'Desktop', value: 400 },
      { name: 'Mobile', value: 300 },
      { name: 'Tablet', value: 200 },
      { name: 'Outros', value: 100 },
    ],
    dataKeys: ['value'],
  },
  quarterly: {
    name: 'Performance Trimestral',
    data: [
      { name: 'Q1', receita: 12000, despesas: 8000, lucro: 4000 },
      { name: 'Q2', receita: 15000, despesas: 9500, lucro: 5500 },
      { name: 'Q3', receita: 18000, despesas: 11000, lucro: 7000 },
      { name: 'Q4', receita: 22000, despesas: 13000, lucro: 9000 },
    ],
    dataKeys: ['receita', 'despesas', 'lucro'],
  },
};

const ChartsView: React.FC = () => {
  // Access design system context for dynamic colors
  const { state: designSystem } = useDesignSystem();

  /**
   * Extract colors from design system tokens.
   * Updates automatically when design system colors change.
   * This is the key integration point - charts will react to color changes in real-time.
   */
  const designSystemColors = useMemo(() => {
    return extractChartColors(designSystem.colors);
  }, [designSystem.colors]);

  // State
  const [chartType, setChartType] = useState<ChartType>('line');
  const [chartData, setChartData] = useState<DataPoint[]>(DATA_PRESETS.sales.data);
  const [dataKeys, setDataKeys] = useState<string[]>(DATA_PRESETS.sales.dataKeys);
  const [activePreset, setActivePreset] = useState<string>('sales');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'data' | 'config'>('preview');
  // Track if user has manually customized colors
  const [useCustomColors, setUseCustomColors] = useState<boolean>(false);

  const chartRef = useRef<HTMLDivElement>(null);

  const [config, setConfig] = useState<ChartConfig>({
    title: 'Meu Grafico',
    type: 'line',
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    xAxisLabel: '',
    yAxisLabel: '',
    colors: [...designSystemColors],
    strokeWidth: 2,
    fillOpacity: 0.3,
    animationDuration: 500,
  });

  /**
   * Sync config colors with design system when colors change,
   * unless user has manually customized colors.
   */
  React.useEffect(() => {
    if (!useCustomColors) {
      setConfig(prev => ({
        ...prev,
        colors: [...designSystemColors],
      }));
    }
  }, [designSystemColors, useCustomColors]);

  // Handle preset selection
  const handlePresetSelect = (presetKey: string) => {
    const preset = DATA_PRESETS[presetKey as keyof typeof DATA_PRESETS];
    if (preset) {
      setChartData([...preset.data]);
      setDataKeys([...preset.dataKeys]);
      setActivePreset(presetKey);
      setConfig(prev => ({ ...prev, title: preset.name }));
    }
  };

  // Handle chart type change
  const handleChartTypeChange = (type: ChartType) => {
    setChartType(type);
    setConfig(prev => ({ ...prev, type }));
  };

  // Handle data update
  const handleDataUpdate = (rowIndex: number, key: string, value: string) => {
    setChartData(prev => {
      const newData = [...prev];
      if (key === 'name') {
        newData[rowIndex] = { ...newData[rowIndex], name: value };
      } else {
        const numValue = parseFloat(value) || 0;
        newData[rowIndex] = { ...newData[rowIndex], [key]: numValue };
      }
      return newData;
    });
  };

  // Add new data row
  const handleAddRow = () => {
    const newRow: DataPoint = { name: `Item ${chartData.length + 1}` };
    dataKeys.forEach(key => {
      newRow[key] = 0;
    });
    setChartData(prev => [...prev, newRow]);
  };

  // Remove data row
  const handleRemoveRow = (index: number) => {
    if (chartData.length > 1) {
      setChartData(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Add new data key
  const handleAddDataKey = () => {
    const newKey = `serie${dataKeys.length + 1}`;
    setDataKeys(prev => [...prev, newKey]);
    setChartData(prev => prev.map(row => ({ ...row, [newKey]: 0 })));
  };

  // Remove data key
  const handleRemoveDataKey = (key: string) => {
    if (dataKeys.length > 1) {
      setDataKeys(prev => prev.filter(k => k !== key));
      setChartData(prev => prev.map(row => {
        const { [key]: _, ...rest } = row;
        return rest as DataPoint;
      }));
    }
  };

  // Update color (marks as custom colors)
  const handleColorChange = (index: number, color: string) => {
    setUseCustomColors(true); // User is manually customizing
    setConfig(prev => {
      const newColors = [...prev.colors];
      newColors[index] = color;
      return { ...prev, colors: newColors };
    });
  };

  // Sync colors back to design system tokens
  const handleSyncDesignSystemColors = () => {
    setUseCustomColors(false);
    setConfig(prev => ({
      ...prev,
      colors: [...designSystemColors],
    }));
  };

  // Reset to default (uses design system colors)
  const handleReset = () => {
    handlePresetSelect('sales');
    setChartType('line');
    setUseCustomColors(false); // Reset to design system colors
    setConfig({
      title: 'Meu Grafico',
      type: 'line',
      showGrid: true,
      showLegend: true,
      showTooltip: true,
      xAxisLabel: '',
      yAxisLabel: '',
      colors: [...designSystemColors], // Use design system colors
      strokeWidth: 2,
      fillOpacity: 0.3,
      animationDuration: 500,
    });
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Export as JSON
  const exportJSON = () => {
    const exportData = {
      type: chartType,
      config: config,
      data: chartData,
      dataKeys: dataKeys,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chart-${config.title.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Export as SVG
  const exportSVG = () => {
    if (chartRef.current) {
      const svgElement = chartRef.current.querySelector('svg');
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chart-${config.title.toLowerCase().replace(/\s+/g, '-')}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }
  };

  // Export as PNG
  const exportPNG = useCallback(() => {
    if (chartRef.current) {
      const svgElement = chartRef.current.querySelector('svg');
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
          canvas.width = img.width * 2;
          canvas.height = img.height * 2;
          ctx?.scale(2, 2);
          ctx?.drawImage(img, 0, 0);

          const pngData = canvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = pngData;
          a.download = `chart-${config.title.toLowerCase().replace(/\s+/g, '-')}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
      }
    }
  }, [config.title]);

  // Generate code snippet
  const generateCodeSnippet = () => {
    const chartComponent = chartType.charAt(0).toUpperCase() + chartType.slice(1) + 'Chart';
    const dataElement = chartType === 'pie' ? 'Pie' : chartType.charAt(0).toUpperCase() + chartType.slice(1);

    return `import { ${chartComponent}, ${dataElement}, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer${chartType !== 'pie' ? ', CartesianGrid' : ''} } from 'recharts';

const data = ${JSON.stringify(chartData, null, 2)};

<ResponsiveContainer width="100%" height={400}>
  <${chartComponent} data={data}>
    ${config.showGrid && chartType !== 'pie' ? '<CartesianGrid strokeDasharray="3 3" />' : ''}
    ${chartType !== 'pie' ? '<XAxis dataKey="name" />\n    <YAxis />' : ''}
    ${config.showTooltip ? '<Tooltip />' : ''}
    ${config.showLegend ? '<Legend />' : ''}
    ${dataKeys.map((key, i) => {
      if (chartType === 'pie') {
        return `<Pie data={data} dataKey="${key}" fill="${config.colors[i % config.colors.length]}" />`;
      }
      return `<${dataElement} type="monotone" dataKey="${key}" stroke="${config.colors[i % config.colors.length]}" ${chartType === 'area' ? `fill="${config.colors[i % config.colors.length]}" fillOpacity={0.3}` : chartType === 'bar' ? `fill="${config.colors[i % config.colors.length]}"` : ''} />`;
    }).join('\n    ')}
  </${chartComponent}>
</ResponsiveContainer>`;
  };

  // Render chart based on type
  const renderChart = () => {
    const commonProps = {
      data: chartData,
    };

    const tooltipStyle = {
      backgroundColor: '#fff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            {config.showTooltip && <Tooltip contentStyle={tooltipStyle} />}
            {config.showLegend && <Legend />}
            {dataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={config.colors[index % config.colors.length]}
                strokeWidth={config.strokeWidth}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={config.animationDuration}
              />
            ))}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            {config.showTooltip && <Tooltip contentStyle={tooltipStyle} />}
            {config.showLegend && <Legend />}
            {dataKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={config.colors[index % config.colors.length]}
                radius={[8, 8, 0, 0]}
                animationDuration={config.animationDuration}
              />
            ))}
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            {config.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />}
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            {config.showTooltip && <Tooltip contentStyle={tooltipStyle} />}
            {config.showLegend && <Legend />}
            {dataKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={config.colors[index % config.colors.length]}
                fill={config.colors[index % config.colors.length]}
                fillOpacity={config.fillOpacity}
                animationDuration={config.animationDuration}
              />
            ))}
          </AreaChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey={dataKeys[0] || 'value'}
              animationDuration={config.animationDuration}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={config.colors[index % config.colors.length]} />
              ))}
            </Pie>
            {config.showTooltip && <Tooltip contentStyle={tooltipStyle} />}
            {config.showLegend && <Legend />}
          </PieChart>
        );

      default:
        return null;
    }
  };

  // Chart type options
  const chartTypes = [
    { type: 'line' as ChartType, icon: TrendingUp, label: 'Line Chart' },
    { type: 'bar' as ChartType, icon: BarChart3, label: 'Bar Chart' },
    { type: 'area' as ChartType, icon: Activity, label: 'Area Chart' },
    { type: 'pie' as ChartType, icon: PieChartIcon, label: 'Pie Chart' },
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-3xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black mb-2">Chart Builder</h2>
            <p className="text-indigo-100">
              Crie graficos interativos com Recharts e exporte em multiplos formatos
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold transition-all"
            >
              <RotateCcw size={18} /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Chart Type Selector */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200">
        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">Tipo de Grafico</h3>
        <div className="flex flex-wrap gap-3">
          {chartTypes.map(({ type, icon: Icon, label }) => (
            <button
              key={type}
              onClick={() => handleChartTypeChange(type)}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl font-bold transition-all ${
                chartType === type
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Preview */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-200">
            {[
              { key: 'preview', label: 'Preview', icon: Eye },
              { key: 'data', label: 'Dados', icon: Edit3 },
              { key: 'config', label: 'Configuracoes', icon: Settings },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as 'preview' | 'data' | 'config')}
                className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold transition-all ${
                  activeTab === key
                    ? 'bg-slate-50 text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Preview Tab */}
            {activeTab === 'preview' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900">{config.title}</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={exportSVG}
                      className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium text-sm transition-all"
                    >
                      <Image size={16} /> SVG
                    </button>
                    <button
                      onClick={exportPNG}
                      className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium text-sm transition-all"
                    >
                      <Download size={16} /> PNG
                    </button>
                    <button
                      onClick={exportJSON}
                      className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm transition-all"
                    >
                      <FileJson size={16} /> JSON
                    </button>
                  </div>
                </div>
                <div ref={chartRef} className="bg-slate-50 rounded-2xl p-6">
                  <ResponsiveContainer width="100%" height={350}>
                    {renderChart()}
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Data Tab */}
            {activeTab === 'data' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">Editar Dados</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleAddRow}
                      className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-all"
                    >
                      <Plus size={16} /> Linha
                    </button>
                    {chartType !== 'pie' && (
                      <button
                        onClick={handleAddDataKey}
                        className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm transition-all"
                      >
                        <Plus size={16} /> Serie
                      </button>
                    )}
                  </div>
                </div>

                {/* Data Keys Header */}
                <div className="flex gap-2 mb-2">
                  <div className="w-24 text-xs font-bold text-slate-500 uppercase">Label</div>
                  {dataKeys.map((key, index) => (
                    <div key={key} className="flex-1 flex items-center gap-1">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: config.colors[index % config.colors.length] }}
                      />
                      <span className="text-xs font-bold text-slate-500 uppercase flex-1">{key}</span>
                      {dataKeys.length > 1 && (
                        <button
                          onClick={() => handleRemoveDataKey(key)}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="w-10" />
                </div>

                {/* Data Table */}
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {chartData.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={row.name}
                        onChange={(e) => handleDataUpdate(rowIndex, 'name', e.target.value)}
                        className="w-24 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      {dataKeys.map((key) => (
                        <input
                          key={key}
                          type="number"
                          value={row[key] as number}
                          onChange={(e) => handleDataUpdate(rowIndex, key, e.target.value)}
                          className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ))}
                      <button
                        onClick={() => handleRemoveRow(rowIndex)}
                        disabled={chartData.length <= 1}
                        className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Data Presets */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">Templates de Dados</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(DATA_PRESETS).map(([key, preset]) => (
                      <button
                        key={key}
                        onClick={() => handlePresetSelect(key)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                          activePreset === key
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Config Tab */}
            {activeTab === 'config' && (
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    <Type size={14} className="inline mr-2" />
                    Titulo do Grafico
                  </label>
                  <input
                    type="text"
                    value={config.title}
                    onChange={(e) => setConfig(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Toggle Options */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { key: 'showGrid', label: 'Mostrar Grid' },
                    { key: 'showLegend', label: 'Mostrar Legenda' },
                    { key: 'showTooltip', label: 'Mostrar Tooltip' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer">
                      <div
                        onClick={() => setConfig(prev => ({ ...prev, [key]: !prev[key as keyof ChartConfig] }))}
                        className={`w-12 h-7 rounded-full transition-all cursor-pointer ${
                          config[key as keyof ChartConfig] ? 'bg-indigo-600' : 'bg-slate-200'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform mt-1 ${
                            config[key as keyof ChartConfig] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{label}</span>
                    </label>
                  ))}
                </div>

                {/* Stroke Width */}
                {chartType !== 'bar' && chartType !== 'pie' && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Espessura da Linha: {config.strokeWidth}px
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={config.strokeWidth}
                      onChange={(e) => setConfig(prev => ({ ...prev, strokeWidth: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                )}

                {/* Fill Opacity */}
                {chartType === 'area' && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Opacidade do Preenchimento: {Math.round(config.fillOpacity * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={config.fillOpacity * 100}
                      onChange={(e) => setConfig(prev => ({ ...prev, fillOpacity: parseInt(e.target.value) / 100 }))}
                      className="w-full"
                    />
                  </div>
                )}

                {/* Animation Duration */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Duracao da Animacao: {config.animationDuration}ms
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="100"
                    value={config.animationDuration}
                    onChange={(e) => setConfig(prev => ({ ...prev, animationDuration: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Colors & Code */}
        <div className="space-y-6">
          {/* Colors Panel */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                <Palette size={16} /> Cores das Series
              </h3>
              {/* Design System Sync Indicator */}
              {!useCustomColors ? (
                <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <RefreshCw size={12} /> Sincronizado
                </span>
              ) : (
                <button
                  onClick={handleSyncDesignSystemColors}
                  className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-full transition-colors"
                  title="Sincronizar com cores do Design System"
                >
                  <RefreshCw size={12} /> Sincronizar DS
                </button>
              )}
            </div>

            {/* Info about design system integration */}
            <div className="mb-4 p-3 bg-slate-50 rounded-xl text-xs text-slate-600">
              <strong>Design Tokens:</strong> As cores sao extraidas automaticamente do Design System.
              Alterar cores em "Cores" atualiza os graficos em tempo real.
            </div>

            <div className="space-y-3">
              {dataKeys.map((key, index) => (
                <div key={key} className="flex items-center gap-3">
                  <input
                    type="color"
                    value={config.colors[index % config.colors.length]}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border-2 border-slate-200"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-bold text-slate-700">{key}</div>
                    <div className="text-xs text-slate-500 font-mono">
                      {config.colors[index % config.colors.length]}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Design System Colors */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Design System Colors</h4>
              <div className="flex flex-wrap gap-2">
                {designSystemColors.map((color, idx) => (
                  <button
                    key={`ds-${color}-${idx}`}
                    onClick={() => {
                      setUseCustomColors(true);
                      const newColors = dataKeys.map((_, i) => designSystemColors[(idx + i) % designSystemColors.length]);
                      setConfig(prev => ({ ...prev, colors: newColors }));
                    }}
                    className="w-8 h-8 rounded-lg border-2 border-white shadow-md hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={`Design Token: ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* Fallback Color Palette */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Paleta Adicional</h4>
              <div className="flex flex-wrap gap-2">
                {FALLBACK_COLORS.filter(c => !designSystemColors.includes(c)).map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setUseCustomColors(true);
                      const newColors = dataKeys.map((_, i) => FALLBACK_COLORS[(FALLBACK_COLORS.indexOf(color) + i) % FALLBACK_COLORS.length]);
                      setConfig(prev => ({ ...prev, colors: newColors }));
                    }}
                    className="w-8 h-8 rounded-lg border-2 border-white shadow-md hover:scale-110 transition-transform opacity-70 hover:opacity-100"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Code Snippet */}
          <div className="bg-slate-900 p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Code size={16} /> Codigo React
              </h3>
              <button
                onClick={() => copyToClipboard(generateCodeSnippet(), 'code')}
                className="flex items-center gap-2 px-3 py-1 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm"
              >
                {copiedText === 'code' ? <Check size={14} /> : <Copy size={14} />}
                {copiedText === 'code' ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            <pre className="text-blue-400 text-xs font-mono overflow-x-auto max-h-80 leading-relaxed">
              {generateCodeSnippet()}
            </pre>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="bg-gradient-to-br from-slate-50 to-indigo-50 p-8 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Referencia Rapida - Recharts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: TrendingUp, title: 'Line Chart', desc: 'Ideal para tendencias ao longo do tempo' },
            { icon: BarChart3, title: 'Bar Chart', desc: 'Comparacao de valores categoricos' },
            { icon: Activity, title: 'Area Chart', desc: 'Visualizar volumes e proporcoes' },
            { icon: PieChartIcon, title: 'Pie Chart', desc: 'Distribuicao percentual de dados' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white p-6 rounded-2xl border border-slate-200">
              <Icon className="text-indigo-600 mb-3" size={32} />
              <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
              <p className="text-sm text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Example */}
      <div className="bg-slate-900 p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Code size={24} /> Instalacao e Uso
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-bold text-slate-400 mb-2">1. Instalacao</h4>
            <pre className="text-green-400 text-sm font-mono bg-slate-800 p-4 rounded-xl overflow-x-auto">
              npm install recharts
            </pre>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-400 mb-2">2. Import</h4>
            <pre className="text-blue-400 text-sm font-mono bg-slate-800 p-4 rounded-xl overflow-x-auto">
{`import {
  LineChart, Line, XAxis, YAxis,
  Tooltip, ResponsiveContainer
} from 'recharts';`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsView;
