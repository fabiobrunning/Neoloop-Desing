import React, { useState, useMemo, useCallback } from 'react';
import {
  LayoutGrid,
  Check,
  X,
  AlertTriangle,
  Copy,
  Lightbulb,
  FileText,
  Sparkles,
  Settings2,
  BarChart3,
  Eye,
  Ruler,
  Grid3X3,
  ArrowRight
} from 'lucide-react';
import { SpacingToken } from '../types';

// ============================================================================
// SPACING GRID DEFINITIONS
// ============================================================================

interface SpacingGridConfig {
  name: string;
  baseUnit: number;
  description: string;
  commonUses: string;
}

const SPACING_GRIDS: SpacingGridConfig[] = [
  { name: '4px Grid', baseUnit: 4, description: 'Industry standard, most flexible', commonUses: 'iOS, Android, Material Design, Tailwind' },
  { name: '5px Grid', baseUnit: 5, description: 'Alternative for certain designs', commonUses: 'Custom systems' },
  { name: '6px Grid', baseUnit: 6, description: 'Used in some legacy systems', commonUses: 'Older enterprise apps' },
  { name: '8px Grid', baseUnit: 8, description: 'Larger grid, less granularity', commonUses: 'Simple interfaces' },
];

// Standard spacing scale (multiples of 4px)
const STANDARD_4PX_SCALE = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 72, 80, 96, 112, 128];

// Tailwind spacing reference
const TAILWIND_SPACING: Record<string, number> = {
  '0': 0, 'px': 1, '0.5': 2, '1': 4, '1.5': 6, '2': 8, '2.5': 10, '3': 12,
  '3.5': 14, '4': 16, '5': 20, '6': 24, '7': 28, '8': 32, '9': 36, '10': 40,
  '11': 44, '12': 48, '14': 56, '16': 64, '20': 80, '24': 96, '28': 112,
  '32': 128, '36': 144, '40': 160, '44': 176, '48': 192, '52': 208,
  '56': 224, '60': 240, '64': 256, '72': 288, '80': 320, '96': 384
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if a value is a multiple of the base unit
 */
function isMultipleOf(value: number, baseUnit: number): boolean {
  return value % baseUnit === 0;
}

/**
 * Get the closest valid value in the grid
 */
function getClosestGridValue(value: number, baseUnit: number): number {
  return Math.round(value / baseUnit) * baseUnit;
}

/**
 * Get deviation from grid
 */
function getGridDeviation(value: number, baseUnit: number): number {
  const closest = getClosestGridValue(value, baseUnit);
  return Math.abs(value - closest);
}

/**
 * Find Tailwind equivalent
 */
function findTailwindEquivalent(value: number): string | null {
  for (const [key, val] of Object.entries(TAILWIND_SPACING)) {
    if (val === value) return key;
  }
  return null;
}

/**
 * Suggest nearest Tailwind values
 */
function suggestTailwindValues(value: number): { smaller: string | null; larger: string | null; closest: string } {
  const entries = Object.entries(TAILWIND_SPACING).sort((a, b) => a[1] - b[1]);

  let smaller: string | null = null;
  let larger: string | null = null;
  let closest = entries[0][0];
  let closestDiff = Math.abs(value - entries[0][1]);

  for (const [key, val] of entries) {
    const diff = Math.abs(value - val);
    if (diff < closestDiff) {
      closestDiff = diff;
      closest = key;
    }
    if (val < value) smaller = key;
    if (val > value && !larger) larger = key;
  }

  return { smaller, larger, closest };
}

// ============================================================================
// VALIDATION RESULT TYPES
// ============================================================================

interface ValidationResult {
  token: SpacingToken;
  isValid: boolean;
  deviation: number;
  closestGridValue: number;
  tailwindEquivalent: string | null;
  tailwindSuggestions: { smaller: string | null; larger: string | null; closest: string };
  recommendations: string[];
  category: 'conformant' | 'minor-deviation' | 'arbitrary';
}

// ============================================================================
// COMPONENT
// ============================================================================

interface SpacingValidatorViewProps {
  tokens: SpacingToken[];
}

const SpacingValidatorView: React.FC<SpacingValidatorViewProps> = ({ tokens }) => {
  const [selectedGrid, setSelectedGrid] = useState<SpacingGridConfig>(SPACING_GRIDS[0]); // 4px default
  const [activeTab, setActiveTab] = useState<'validator' | 'scale' | 'report'>('validator');
  const [copied, setCopied] = useState<string | null>(null);
  const [showTailwindRef, setShowTailwindRef] = useState(true);

  // Validate all tokens
  const validationResults = useMemo((): ValidationResult[] => {
    return tokens.map(token => {
      const value = token.value;
      const isValid = isMultipleOf(value, selectedGrid.baseUnit);
      const deviation = getGridDeviation(value, selectedGrid.baseUnit);
      const closestGridValue = getClosestGridValue(value, selectedGrid.baseUnit);
      const tailwindEquivalent = findTailwindEquivalent(value);
      const tailwindSuggestions = suggestTailwindValues(value);

      // Determine category
      let category: 'conformant' | 'minor-deviation' | 'arbitrary';
      if (isValid) {
        category = 'conformant';
      } else if (deviation <= 2) {
        category = 'minor-deviation';
      } else {
        category = 'arbitrary';
      }

      // Generate recommendations
      const recommendations: string[] = [];

      if (!isValid) {
        recommendations.push(
          `Adjust from ${value}px to ${closestGridValue}px to align with ${selectedGrid.baseUnit}px grid`
        );

        if (!tailwindEquivalent && tailwindSuggestions.closest) {
          recommendations.push(
            `Use Tailwind class "${tailwindSuggestions.closest}" (${TAILWIND_SPACING[tailwindSuggestions.closest]}px) instead`
          );
        }
      }

      return {
        token,
        isValid,
        deviation,
        closestGridValue,
        tailwindEquivalent,
        tailwindSuggestions,
        recommendations,
        category
      };
    });
  }, [tokens, selectedGrid.baseUnit]);

  // Summary stats
  const summary = useMemo(() => {
    const conformant = validationResults.filter(r => r.category === 'conformant').length;
    const minorDeviation = validationResults.filter(r => r.category === 'minor-deviation').length;
    const arbitrary = validationResults.filter(r => r.category === 'arbitrary').length;
    const total = validationResults.length;

    const conformantPercent = total > 0 ? Math.round((conformant / total) * 100) : 0;
    const hasTailwind = validationResults.filter(r => r.tailwindEquivalent !== null).length;
    const tailwindPercent = total > 0 ? Math.round((hasTailwind / total) * 100) : 0;

    // Overall score calculation
    const overallScore = total > 0
      ? Math.round(((conformant * 100 + minorDeviation * 50) / (total * 100)) * 100)
      : 0;

    return {
      conformant,
      minorDeviation,
      arbitrary,
      total,
      conformantPercent,
      hasTailwind,
      tailwindPercent,
      overallScore
    };
  }, [validationResults]);

  // Copy to clipboard
  const handleCopy = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  // Tab component
  const Tab = ({ label, id }: { label: string; id: typeof activeTab }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`pb-4 px-1 text-sm font-medium transition-all relative ${
        activeTab === id ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
      }`}
    >
      {label}
      {activeTab === id && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full" />
      )}
    </button>
  );

  // Status badge component
  const StatusBadge = ({
    status,
    label
  }: {
    status: 'pass' | 'warning' | 'fail';
    label: string
  }) => {
    const styles = {
      pass: 'bg-emerald-100 text-emerald-700',
      warning: 'bg-amber-100 text-amber-700',
      fail: 'bg-red-100 text-red-700'
    };

    const icons = {
      pass: <Check size={12} />,
      warning: <AlertTriangle size={12} />,
      fail: <X size={12} />
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${styles[status]}`}>
        {icons[status]}
        {label}
      </span>
    );
  };

  // Generate standard scale for selected grid
  const standardScale = useMemo(() => {
    const scale: number[] = [];
    for (let i = 0; i <= 32; i++) {
      scale.push(i * selectedGrid.baseUnit);
    }
    return scale.slice(0, 20); // First 20 values
  }, [selectedGrid.baseUnit]);

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-slate-200">
        <Tab label="Spacing Validator" id="validator" />
        <Tab label="Scale Explorer" id="scale" />
        <Tab label="Full Report" id="report" />
      </div>

      {activeTab === 'validator' && (
        <>
          {/* Configuration Panel */}
          <div className="grid grid-cols-3 gap-6">
            {/* Grid Selector */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Grid3X3 size={18} className="text-slate-400" />
                <label className="text-sm font-bold text-slate-700">Spacing Grid</label>
              </div>
              <select
                value={selectedGrid.baseUnit}
                onChange={(e) => {
                  const grid = SPACING_GRIDS.find(g => g.baseUnit === parseInt(e.target.value));
                  if (grid) setSelectedGrid(grid);
                }}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {SPACING_GRIDS.map(grid => (
                  <option key={grid.baseUnit} value={grid.baseUnit}>
                    {grid.name} (multiples of {grid.baseUnit}px)
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500 mt-2">{selectedGrid.description}</p>
              <p className="text-xs text-slate-400 mt-1">Used by: {selectedGrid.commonUses}</p>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 size={18} className="text-slate-400" />
                <label className="text-sm font-bold text-slate-700">Token Analysis</label>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Total Tokens</span>
                  <span className="text-sm font-bold text-slate-800">{summary.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Grid Conformant</span>
                  <span className="text-sm font-bold text-emerald-600">{summary.conformant}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Arbitrary Values</span>
                  <span className="text-sm font-bold text-red-600">{summary.arbitrary}</span>
                </div>
              </div>
            </div>

            {/* Tailwind Compatibility */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Ruler size={18} className="text-slate-400" />
                <label className="text-sm font-bold text-slate-700">Tailwind Compatibility</label>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-3xl font-black text-slate-800">{summary.tailwindPercent}%</div>
                  <p className="text-xs text-slate-500">matching Tailwind classes</p>
                </div>
                <div className="w-20 h-20 relative">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="30"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="8"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="30"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      strokeDasharray={`${summary.tailwindPercent * 1.885} 188.5`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-slate-600">{summary.hasTailwind}/{summary.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-blue-600">Overall Score</span>
                <Sparkles size={20} className="text-blue-400" />
              </div>
              <div className="text-4xl font-black text-blue-700 mb-1">{summary.overallScore}%</div>
              <p className="text-sm text-blue-600">Spacing consistency</p>
            </div>

            <div className={`rounded-2xl p-6 border ${
              summary.conformantPercent === 100
                ? 'bg-emerald-50 border-emerald-100'
                : summary.conformantPercent >= 70
                  ? 'bg-amber-50 border-amber-100'
                  : 'bg-red-50 border-red-100'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-sm font-medium ${
                  summary.conformantPercent === 100 ? 'text-emerald-600' :
                  summary.conformantPercent >= 70 ? 'text-amber-600' : 'text-red-600'
                }`}>Grid Compliance</span>
                <LayoutGrid size={20} className={
                  summary.conformantPercent === 100 ? 'text-emerald-400' :
                  summary.conformantPercent >= 70 ? 'text-amber-400' : 'text-red-400'
                } />
              </div>
              <div className={`text-4xl font-black mb-1 ${
                summary.conformantPercent === 100 ? 'text-emerald-700' :
                summary.conformantPercent >= 70 ? 'text-amber-700' : 'text-red-700'
              }`}>
                {summary.conformant}/{summary.total}
              </div>
              <p className={`text-sm ${
                summary.conformantPercent === 100 ? 'text-emerald-600' :
                summary.conformantPercent >= 70 ? 'text-amber-600' : 'text-red-600'
              }`}>
                {summary.conformantPercent}% following {selectedGrid.baseUnit}px grid
              </p>
            </div>

            <div className={`rounded-2xl p-6 border ${
              summary.arbitrary === 0
                ? 'bg-emerald-50 border-emerald-100'
                : summary.arbitrary <= 2
                  ? 'bg-amber-50 border-amber-100'
                  : 'bg-red-50 border-red-100'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-sm font-medium ${
                  summary.arbitrary === 0 ? 'text-emerald-600' :
                  summary.arbitrary <= 2 ? 'text-amber-600' : 'text-red-600'
                }`}>Arbitrary Values</span>
                <AlertTriangle size={20} className={
                  summary.arbitrary === 0 ? 'text-emerald-400' :
                  summary.arbitrary <= 2 ? 'text-amber-400' : 'text-red-400'
                } />
              </div>
              <div className={`text-4xl font-black mb-1 ${
                summary.arbitrary === 0 ? 'text-emerald-700' :
                summary.arbitrary <= 2 ? 'text-amber-700' : 'text-red-700'
              }`}>
                {summary.arbitrary}
              </div>
              <p className={`text-sm ${
                summary.arbitrary === 0 ? 'text-emerald-600' :
                summary.arbitrary <= 2 ? 'text-amber-600' : 'text-red-600'
              }`}>
                {summary.arbitrary === 0 ? 'No off-grid values' : `${summary.arbitrary} values need adjustment`}
              </p>
            </div>
          </div>

          {/* Validation Results Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Eye size={20} />
                Token Validation Results
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Token</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Value</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Grid Status</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Suggested</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Tailwind</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Preview</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {validationResults.map((result) => (
                    <tr key={result.token.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-800">{result.token.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono text-slate-600">{result.token.value}px</span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge
                          status={
                            result.category === 'conformant' ? 'pass' :
                            result.category === 'minor-deviation' ? 'warning' : 'fail'
                          }
                          label={
                            result.category === 'conformant' ? `${selectedGrid.baseUnit}px OK` :
                            result.category === 'minor-deviation' ? `${result.deviation}px off` : 'Arbitrary'
                          }
                        />
                      </td>
                      <td className="px-6 py-4">
                        {!result.isValid && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500">{result.token.value}px</span>
                            <ArrowRight size={14} className="text-slate-400" />
                            <span className="text-sm font-mono font-bold text-blue-600">{result.closestGridValue}px</span>
                          </div>
                        )}
                        {result.isValid && (
                          <span className="text-sm text-slate-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {result.tailwindEquivalent ? (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-mono rounded">
                            {result.tailwindEquivalent}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">
                            try: {result.tailwindSuggestions.closest}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="bg-blue-500 rounded"
                            style={{
                              width: `${Math.min(result.token.value, 48)}px`,
                              height: '16px'
                            }}
                          />
                          <span className="text-xs text-slate-400">
                            {result.token.value > 48 ? `(${result.token.value}px)` : ''}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations */}
          {validationResults.some(r => r.recommendations.length > 0) && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="text-amber-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-amber-800">Recommendations</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Suggested adjustments to improve spacing consistency.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {validationResults
                  .filter(r => r.recommendations.length > 0)
                  .map((result) => (
                    <div key={result.token.id} className="bg-white rounded-xl p-4 border border-amber-200">
                      <p className="text-sm font-bold text-slate-800 mb-2">{result.token.name}</p>
                      <ul className="space-y-1">
                        {result.recommendations.map((rec, i) => (
                          <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                            <AlertTriangle size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'scale' && (
        <div className="space-y-8">
          {/* Scale Configuration */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Grid Configuration</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600 mb-2 block">Select Grid System</label>
                  <div className="grid grid-cols-2 gap-2">
                    {SPACING_GRIDS.map(grid => (
                      <button
                        key={grid.baseUnit}
                        onClick={() => setSelectedGrid(grid)}
                        className={`p-3 rounded-xl text-left transition-all ${
                          selectedGrid.baseUnit === grid.baseUnit
                            ? 'bg-blue-50 border-2 border-blue-500'
                            : 'bg-slate-50 border-2 border-transparent hover:border-slate-200'
                        }`}
                      >
                        <p className={`text-sm font-bold ${
                          selectedGrid.baseUnit === grid.baseUnit ? 'text-blue-700' : 'text-slate-700'
                        }`}>
                          {grid.name}
                        </p>
                        <p className={`text-xs ${
                          selectedGrid.baseUnit === grid.baseUnit ? 'text-blue-500' : 'text-slate-400'
                        }`}>
                          Base: {grid.baseUnit}px
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm font-bold text-slate-700 mb-1">{selectedGrid.name}</p>
                  <p className="text-xs text-slate-500">{selectedGrid.description}</p>
                  <p className="text-xs text-slate-400 mt-2">Common uses: {selectedGrid.commonUses}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Standard Scale</h3>
              <p className="text-sm text-slate-500 mb-4">
                Recommended spacing values for {selectedGrid.name}.
              </p>

              <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                {standardScale.map((size, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center p-2 rounded-lg ${
                      validationResults.some(r => r.token.value === size)
                        ? 'bg-blue-50 border border-blue-200'
                        : 'bg-slate-50'
                    }`}
                  >
                    <div
                      className="bg-blue-500 rounded mb-2"
                      style={{
                        width: `${Math.min(size, 32)}px`,
                        height: '8px',
                        minWidth: '4px'
                      }}
                    />
                    <span className="text-xs font-mono font-bold text-slate-700">{size}px</span>
                    <span className="text-[10px] text-slate-400">{(size / 16).toFixed(2)}rem</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleCopy(
                  standardScale.map(s => `${s}px`).join(', '),
                  'scale'
                )}
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
              >
                {copied === 'scale' ? <Check size={16} /> : <Copy size={16} />}
                {copied === 'scale' ? 'Copied!' : 'Copy Scale Values'}
              </button>
            </div>
          </div>

          {/* Tailwind Reference */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Tailwind Spacing Reference</h3>
              <button
                onClick={() => setShowTailwindRef(!showTailwindRef)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                {showTailwindRef ? 'Hide' : 'Show'}
              </button>
            </div>

            {showTailwindRef && (
              <div className="grid grid-cols-6 gap-2">
                {Object.entries(TAILWIND_SPACING).slice(0, 24).map(([key, value]) => (
                  <div
                    key={key}
                    className={`p-2 rounded-lg text-center ${
                      validationResults.some(r => r.token.value === value)
                        ? 'bg-emerald-50 border border-emerald-200'
                        : 'bg-slate-50'
                    }`}
                  >
                    <span className="text-xs font-mono font-bold text-slate-700">{key}</span>
                    <p className="text-[10px] text-slate-400">{value}px</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Current vs Ideal Comparison */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Your Tokens vs Grid</h3>
            <p className="text-sm text-slate-500 mb-6">
              Visual comparison of your spacing tokens against the {selectedGrid.baseUnit}px grid.
            </p>

            <div className="space-y-4">
              {validationResults.map((result) => (
                <div
                  key={result.token.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border ${
                    result.isValid
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">{result.token.name}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-slate-500">
                        Value: <span className="font-mono font-bold">{result.token.value}px</span>
                      </span>
                      {!result.isValid && (
                        <span className="text-xs text-slate-500">
                          Closest: <span className="font-mono font-bold">{result.closestGridValue}px</span>
                        </span>
                      )}
                      {result.tailwindEquivalent && (
                        <span className="text-xs text-slate-500">
                          Tailwind: <span className="font-mono font-bold">{result.tailwindEquivalent}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Visual bar comparison */}
                  <div className="w-48">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-4 rounded ${result.isValid ? 'bg-emerald-500' : 'bg-red-400'}`}
                        style={{ width: `${Math.min(result.token.value, 128)}px` }}
                      />
                      {!result.isValid && (
                        <div
                          className="h-4 rounded bg-slate-300 opacity-50"
                          style={{ width: `${Math.min(result.closestGridValue, 128)}px` }}
                        />
                      )}
                    </div>
                  </div>

                  <StatusBadge
                    status={result.isValid ? 'pass' : 'fail'}
                    label={result.isValid ? 'On Grid' : 'Off Grid'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'report' && (
        <div className="space-y-6">
          {/* Full Report */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Spacing Validation Report</h3>
              <button
                onClick={() => handleCopy(
                  `Spacing Validation Report
${'='.repeat(50)}

Configuration:
  Grid System: ${selectedGrid.name} (${selectedGrid.baseUnit}px base)

Summary:
  Overall Score: ${summary.overallScore}%
  Grid Compliance: ${summary.conformant}/${summary.total} (${summary.conformantPercent}%)
  Tailwind Compatible: ${summary.hasTailwind}/${summary.total} (${summary.tailwindPercent}%)
  Arbitrary Values: ${summary.arbitrary}

Token Details:
${validationResults.map(r => `
  ${r.token.name}:
    Value: ${r.token.value}px
    Grid Status: ${r.isValid ? 'PASS' : 'FAIL'}
    ${!r.isValid ? `Suggested: ${r.closestGridValue}px` : ''}
    Tailwind: ${r.tailwindEquivalent || 'None (try: ' + r.tailwindSuggestions.closest + ')'}
    ${r.recommendations.length > 0 ? 'Recommendations: ' + r.recommendations.join('; ') : ''}
`).join('')}

Standard ${selectedGrid.baseUnit}px Scale:
${standardScale.map(s => `  ${s}px`).join('\n')}
`,
                  'report'
                )}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
              >
                {copied === 'report' ? <Check size={16} /> : <Copy size={16} />}
                Copy Report
              </button>
            </div>

            {/* Configuration Summary */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Grid System</p>
                <p className="text-sm font-bold text-slate-800">{selectedGrid.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Base Unit</p>
                <p className="text-sm font-bold text-slate-800">{selectedGrid.baseUnit}px</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Tokens Analyzed</p>
                <p className="text-sm font-bold text-slate-800">{summary.total}</p>
              </div>
            </div>

            {/* Detailed Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 text-slate-500 font-medium">Token</th>
                    <th className="text-left py-3 text-slate-500 font-medium">Value</th>
                    <th className="text-left py-3 text-slate-500 font-medium">Suggested</th>
                    <th className="text-left py-3 text-slate-500 font-medium">Deviation</th>
                    <th className="text-left py-3 text-slate-500 font-medium">Tailwind</th>
                    <th className="text-left py-3 text-slate-500 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {validationResults.map((result) => (
                    <tr key={result.token.id}>
                      <td className="py-3 font-medium text-slate-800">{result.token.name}</td>
                      <td className="py-3 font-mono text-slate-600">{result.token.value}px</td>
                      <td className="py-3 font-mono text-slate-500">
                        {result.isValid ? '-' : `${result.closestGridValue}px`}
                      </td>
                      <td className="py-3 font-mono text-slate-600">
                        {result.isValid ? '0' : `${result.deviation}px`}
                      </td>
                      <td className="py-3 font-mono text-slate-600">
                        {result.tailwindEquivalent || '-'}
                      </td>
                      <td className="py-3">
                        <StatusBadge
                          status={
                            result.category === 'conformant' ? 'pass' :
                            result.category === 'minor-deviation' ? 'warning' : 'fail'
                          }
                          label={
                            result.category === 'conformant' ? 'Valid' :
                            result.category === 'minor-deviation' ? 'Minor' : 'Invalid'
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Score Summary */}
            <div className={`p-4 rounded-xl ${
              summary.overallScore >= 90 ? 'bg-emerald-50' :
              summary.overallScore >= 70 ? 'bg-amber-50' : 'bg-red-50'
            }`}>
              <div className="flex items-center gap-3">
                <Sparkles className={
                  summary.overallScore >= 90 ? 'text-emerald-500' :
                  summary.overallScore >= 70 ? 'text-amber-500' : 'text-red-500'
                } size={24} />
                <div>
                  <p className={`font-bold ${
                    summary.overallScore >= 90 ? 'text-emerald-700' :
                    summary.overallScore >= 70 ? 'text-amber-700' : 'text-red-700'
                  }`}>
                    Overall Score: {summary.overallScore}%
                  </p>
                  <p className="text-sm text-slate-600">
                    {summary.overallScore >= 90
                      ? 'Excellent! Your spacing follows a consistent grid.'
                      : summary.overallScore >= 70
                        ? 'Good, but some adjustments recommended for better consistency.'
                        : 'Needs improvement. Review the recommendations above.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CSS Export */}
          <div className="bg-slate-900 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-bold">Suggested CSS Variables</h4>
              <button
                onClick={() => handleCopy(
                  `:root {
  /* Spacing Scale (${selectedGrid.baseUnit}px Grid) */
${standardScale.slice(0, 16).map((s, i) => `  --space-${i}: ${s}px; /* ${(s / 16).toFixed(3)}rem */`).join('\n')}

  /* Semantic Spacing */
  --space-xs: ${selectedGrid.baseUnit}px;
  --space-sm: ${selectedGrid.baseUnit * 2}px;
  --space-md: ${selectedGrid.baseUnit * 4}px;
  --space-lg: ${selectedGrid.baseUnit * 6}px;
  --space-xl: ${selectedGrid.baseUnit * 8}px;
  --space-2xl: ${selectedGrid.baseUnit * 12}px;
  --space-3xl: ${selectedGrid.baseUnit * 16}px;
}`,
                  'css'
                )}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm hover:bg-slate-700 transition-colors"
              >
                {copied === 'css' ? <Check size={14} /> : <Copy size={14} />}
                {copied === 'css' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="text-blue-400 text-sm font-mono overflow-x-auto">
{`:root {
  /* Spacing Scale (${selectedGrid.baseUnit}px Grid) */
${standardScale.slice(0, 16).map((s, i) => `  --space-${i}: ${s}px; /* ${(s / 16).toFixed(3)}rem */`).join('\n')}

  /* Semantic Spacing */
  --space-xs: ${selectedGrid.baseUnit}px;
  --space-sm: ${selectedGrid.baseUnit * 2}px;
  --space-md: ${selectedGrid.baseUnit * 4}px;
  --space-lg: ${selectedGrid.baseUnit * 6}px;
  --space-xl: ${selectedGrid.baseUnit * 8}px;
  --space-2xl: ${selectedGrid.baseUnit * 12}px;
  --space-3xl: ${selectedGrid.baseUnit * 16}px;
}`}
            </pre>
          </div>

          {/* Best Practices */}
          <div className="bg-slate-50 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <FileText size={18} />
              Spacing Best Practices
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <p className="text-sm font-bold text-slate-800">Use Consistent Grid</p>
                <p className="text-xs text-slate-500 mt-1">
                  Stick to {selectedGrid.baseUnit}px multiples for all spacing values to maintain visual harmony.
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <p className="text-sm font-bold text-slate-800">Semantic Naming</p>
                <p className="text-xs text-slate-500 mt-1">
                  Use names like "sm", "md", "lg" instead of pixel values for easier maintenance.
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <p className="text-sm font-bold text-slate-800">Limit Variations</p>
                <p className="text-xs text-slate-500 mt-1">
                  Use 8-12 spacing values max. Too many options lead to inconsistency.
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <p className="text-sm font-bold text-slate-800">Document Usage</p>
                <p className="text-xs text-slate-500 mt-1">
                  Define when to use each spacing value (e.g., "md" for component padding).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpacingValidatorView;
