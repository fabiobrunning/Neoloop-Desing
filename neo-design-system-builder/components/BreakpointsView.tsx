import React from 'react';
import { Smartphone, Tablet, Laptop, Monitor } from 'lucide-react';

interface BreakpointsViewProps {
  breakpoints: Record<string, string>;
}

const BreakpointsView: React.FC<BreakpointsViewProps> = ({ breakpoints }) => {
  const breakpointIcons: Record<string, any> = {
    sm: Smartphone,
    md: Tablet,
    lg: Laptop,
    xl: Monitor,
  };

  const breakpointLabels: Record<string, string> = {
    sm: 'Mobile',
    md: 'Tablet',
    lg: 'Laptop',
    xl: 'Desktop',
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(breakpoints).map(([key, value]) => {
            const Icon = breakpointIcons[key] || Monitor;
            return (
              <div
                key={key}
                className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Icon className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 uppercase">{key}</p>
                    <p className="text-xs text-slate-500">{breakpointLabels[key]}</p>
                  </div>
                </div>
                <p className="text-2xl font-black text-slate-900">{value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Responsive Visualization */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-12 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-8 text-center">Visualização Responsiva</h3>
        <div className="space-y-4">
          {Object.entries(breakpoints).map(([key, value]) => {
            const Icon = breakpointIcons[key] || Monitor;
            const widthInPx = parseInt(value);
            const maxWidth = 1280;
            const percentage = (widthInPx / maxWidth) * 100;

            return (
              <div key={key} className="flex items-center gap-4">
                <div className="w-24 flex items-center gap-2">
                  <Icon size={16} className="text-slate-600" />
                  <span className="text-sm font-bold text-slate-800 uppercase">{key}</span>
                </div>
                <div className="flex-1 bg-white rounded-lg h-12 overflow-hidden border border-slate-200 relative">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-end pr-4 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  >
                    <span className="text-white font-bold text-sm">{value}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Media Query Examples */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Media Queries CSS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(breakpoints).map(([key, value]) => (
            <div key={key} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <p className="text-sm font-bold text-slate-800 mb-2 uppercase">{key} - {breakpointLabels[key]}</p>
              <pre className="text-blue-600 text-sm font-mono">
                {`@media (min-width: ${value}) {\n  /* styles */\n}`}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind Reference */}
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">Tailwind CSS Classes</h3>
        <pre className="text-blue-400 text-sm font-mono leading-relaxed">
          {Object.entries(breakpoints).map(([key]) => `${key}:flex ${key}:hidden ${key}:block`).join('\n')}
        </pre>
      </div>
    </div>
  );
};

export default BreakpointsView;
