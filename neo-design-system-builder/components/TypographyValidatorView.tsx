import React, { useState, useMemo, useCallback } from 'react';
import {
  Type,
  Check,
  X,
  AlertTriangle,
  Copy,
  Lightbulb,
  ArrowUpDown,
  FileText,
  Sparkles,
  Settings2,
  BarChart3,
  Eye,
  Ruler
} from 'lucide-react';
import { TypographyToken } from '../types';

// ============================================================================
// SCALE RATIO DEFINITIONS
// ============================================================================

interface ScaleRatio {
  name: string;
  value: number;
  description: string;
}

const SCALE_RATIOS: ScaleRatio[] = [
  { name: 'Minor Second', value: 1.067, description: 'Subtle, minimal contrast' },
  { name: 'Major Second', value: 1.125, description: 'Moderate, pleasant rhythm' },
  { name: 'Minor Third', value: 1.2, description: 'Classic, balanced scale' },
  { name: 'Major Third', value: 1.25, description: 'Strong, clear hierarchy' },
  { name: 'Perfect Fourth', value: 1.333, description: 'Bold, impactful contrast' },
  { name: 'Augmented Fourth', value: 1.414, description: 'Dramatic, attention-grabbing' },
  { name: 'Perfect Fifth', value: 1.5, description: 'Very high contrast' },
  { name: 'Golden Ratio', value: 1.618, description: 'Naturally pleasing proportions' },
];

// ============================================================================
// LINE HEIGHT RECOMMENDATIONS
// ============================================================================

interface LineHeightRecommendation {
  minSize: number;
  maxSize: number;
  minLineHeight: number;
  maxLineHeight: number;
  recommended: number;
}

const LINE_HEIGHT_RECOMMENDATIONS: LineHeightRecommendation[] = [
  { minSize: 10, maxSize: 14, minLineHeight: 1.4, maxLineHeight: 1.8, recommended: 1.6 },
  { minSize: 14, maxSize: 18, minLineHeight: 1.4, maxLineHeight: 1.7, recommended: 1.5 },
  { minSize: 18, maxSize: 24, minLineHeight: 1.3, maxLineHeight: 1.6, recommended: 1.45 },
  { minSize: 24, maxSize: 32, minLineHeight: 1.2, maxLineHeight: 1.5, recommended: 1.35 },
  { minSize: 32, maxSize: 48, minLineHeight: 1.1, maxLineHeight: 1.4, recommended: 1.25 },
  { minSize: 48, maxSize: 72, minLineHeight: 1.0, maxLineHeight: 1.3, recommended: 1.15 },
  { minSize: 72, maxSize: 999, minLineHeight: 1.0, maxLineHeight: 1.2, recommended: 1.1 },
];

// ============================================================================
// LETTER SPACING RECOMMENDATIONS
// ============================================================================

interface LetterSpacingRange {
  context: string;
  minEm: number;
  maxEm: number;
  description: string;
}

const LETTER_SPACING_RANGES: LetterSpacingRange[] = [
  { context: 'Headings', minEm: -0.05, maxEm: 0.02, description: 'Tight or neutral for large text' },
  { context: 'Body Text', minEm: 0, maxEm: 0.02, description: 'Neutral to slightly open' },
  { context: 'Small Text', minEm: 0.01, maxEm: 0.05, description: 'Slightly open for readability' },
  { context: 'All Caps', minEm: 0.05, maxEm: 0.15, description: 'Wide spacing for legibility' },
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Parse font size string to number (px)
 */
function parseFontSize(size: string): number {
  const match = size.match(/^([\d.]+)(px|rem|em)?$/i);
  if (!match) return 16;

  const value = parseFloat(match[1]);
  const unit = match[2]?.toLowerCase() || 'px';

  switch (unit) {
    case 'rem':
    case 'em':
      return value * 16;
    default:
      return value;
  }
}

/**
 * Parse line height to number
 */
function parseLineHeight(lineHeight: string): number {
  const match = lineHeight.match(/^([\d.]+)(%|px|rem|em)?$/i);
  if (!match) return 1.5;

  const value = parseFloat(match[1]);
  const unit = match[2]?.toLowerCase();

  if (unit === '%') return value / 100;
  if (unit === 'px' || unit === 'rem' || unit === 'em') {
    // Assume it's a multiplier if no unit or unitless
    return value;
  }
  return value;
}

/**
 * Get line height recommendation for a font size
 */
function getLineHeightRecommendation(sizePx: number): LineHeightRecommendation {
  return LINE_HEIGHT_RECOMMENDATIONS.find(
    r => sizePx >= r.minSize && sizePx < r.maxSize
  ) || LINE_HEIGHT_RECOMMENDATIONS[LINE_HEIGHT_RECOMMENDATIONS.length - 1];
}

/**
 * Validate if a size follows a scale
 */
function validateScaleSize(
  actualSize: number,
  baseSize: number,
  ratio: number,
  tolerance: number = 0.05
): { isValid: boolean; expectedStep: number; expectedSize: number; deviation: number } {
  // Find the closest step in the scale
  let step = 0;
  let minDeviation = Infinity;
  let closestExpected = baseSize;

  // Check steps from -5 to +10
  for (let s = -5; s <= 10; s++) {
    const expected = baseSize * Math.pow(ratio, s);
    const deviation = Math.abs(actualSize - expected) / expected;

    if (deviation < minDeviation) {
      minDeviation = deviation;
      closestExpected = expected;
      step = s;
    }
  }

  return {
    isValid: minDeviation <= tolerance,
    expectedStep: step,
    expectedSize: closestExpected,
    deviation: minDeviation
  };
}

/**
 * Generate ideal scale from base size
 */
function generateIdealScale(
  baseSize: number,
  ratio: number,
  stepsDown: number = 2,
  stepsUp: number = 8
): number[] {
  const scale: number[] = [];

  for (let i = -stepsDown; i <= stepsUp; i++) {
    scale.push(Math.round(baseSize * Math.pow(ratio, i) * 100) / 100);
  }

  return scale;
}

// ============================================================================
// VALIDATION RESULT TYPES
// ============================================================================

interface ValidationResult {
  token: TypographyToken;
  sizePx: number;
  scaleValidation: {
    isValid: boolean;
    expectedStep: number;
    expectedSize: number;
    deviation: number;
  };
  lineHeightValidation: {
    isValid: boolean;
    value: number;
    recommendation: LineHeightRecommendation;
    status: 'ok' | 'low' | 'high';
  };
  recommendations: string[];
}

// ============================================================================
// COMPONENT
// ============================================================================

interface TypographyValidatorViewProps {
  tokens: TypographyToken[];
}

const TypographyValidatorView: React.FC<TypographyValidatorViewProps> = ({ tokens }) => {
  const [selectedRatio, setSelectedRatio] = useState<ScaleRatio>(SCALE_RATIOS[2]); // Minor Third
  const [baseSize, setBaseSize] = useState(16);
  const [tolerance, setTolerance] = useState(5); // 5% tolerance
  const [activeTab, setActiveTab] = useState<'validator' | 'scale' | 'report'>('validator');
  const [copied, setCopied] = useState<string | null>(null);

  // Generate ideal scale
  const idealScale = useMemo(() => {
    return generateIdealScale(baseSize, selectedRatio.value, 2, 8);
  }, [baseSize, selectedRatio.value]);

  // Validate all tokens
  const validationResults = useMemo((): ValidationResult[] => {
    return tokens.map(token => {
      const sizePx = parseFontSize(token.size);
      const lineHeightValue = parseLineHeight(token.lineHeight);
      const lineHeightRec = getLineHeightRecommendation(sizePx);

      const scaleValidation = validateScaleSize(
        sizePx,
        baseSize,
        selectedRatio.value,
        tolerance / 100
      );

      let lineHeightStatus: 'ok' | 'low' | 'high' = 'ok';
      if (lineHeightValue < lineHeightRec.minLineHeight) {
        lineHeightStatus = 'low';
      } else if (lineHeightValue > lineHeightRec.maxLineHeight) {
        lineHeightStatus = 'high';
      }

      const lineHeightValidation = {
        isValid: lineHeightStatus === 'ok',
        value: lineHeightValue,
        recommendation: lineHeightRec,
        status: lineHeightStatus
      };

      // Generate recommendations
      const recommendations: string[] = [];

      if (!scaleValidation.isValid) {
        recommendations.push(
          `Adjust size from ${sizePx}px to ${Math.round(scaleValidation.expectedSize)}px to match scale`
        );
      }

      if (!lineHeightValidation.isValid) {
        recommendations.push(
          `Adjust line-height from ${lineHeightValue} to ${lineHeightRec.recommended} (recommended for ${sizePx}px)`
        );
      }

      return {
        token,
        sizePx,
        scaleValidation,
        lineHeightValidation,
        recommendations
      };
    });
  }, [tokens, baseSize, selectedRatio.value, tolerance]);

  // Summary stats
  const summary = useMemo(() => {
    const scaleValid = validationResults.filter(r => r.scaleValidation.isValid).length;
    const lineHeightValid = validationResults.filter(r => r.lineHeightValidation.isValid).length;
    const total = validationResults.length;

    return {
      scaleValid,
      lineHeightValid,
      total,
      scalePercent: total > 0 ? Math.round((scaleValid / total) * 100) : 0,
      lineHeightPercent: total > 0 ? Math.round((lineHeightValid / total) * 100) : 0,
      overallScore: total > 0 ? Math.round(((scaleValid + lineHeightValid) / (total * 2)) * 100) : 0
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

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-slate-200">
        <Tab label="Typography Validator" id="validator" />
        <Tab label="Scale Explorer" id="scale" />
        <Tab label="Full Report" id="report" />
      </div>

      {activeTab === 'validator' && (
        <>
          {/* Configuration Panel */}
          <div className="grid grid-cols-3 gap-6">
            {/* Scale Ratio Selector */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings2 size={18} className="text-slate-400" />
                <label className="text-sm font-bold text-slate-700">Scale Ratio</label>
              </div>
              <select
                value={selectedRatio.value}
                onChange={(e) => {
                  const ratio = SCALE_RATIOS.find(r => r.value === parseFloat(e.target.value));
                  if (ratio) setSelectedRatio(ratio);
                }}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {SCALE_RATIOS.map(ratio => (
                  <option key={ratio.value} value={ratio.value}>
                    {ratio.name} ({ratio.value})
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500 mt-2">{selectedRatio.description}</p>
            </div>

            {/* Base Size */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Type size={18} className="text-slate-400" />
                <label className="text-sm font-bold text-slate-700">Base Size</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={baseSize}
                  onChange={(e) => setBaseSize(parseInt(e.target.value) || 16)}
                  min={10}
                  max={24}
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-sm text-slate-500">px</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Base font size for calculations</p>
            </div>

            {/* Tolerance */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Ruler size={18} className="text-slate-400" />
                <label className="text-sm font-bold text-slate-700">Tolerance</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  value={tolerance}
                  onChange={(e) => setTolerance(parseInt(e.target.value))}
                  min={1}
                  max={15}
                  className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="text-sm font-mono text-slate-700 w-12 text-right">{tolerance}%</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Acceptable deviation from scale</p>
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
              <p className="text-sm text-blue-600">Typography consistency</p>
            </div>

            <div className={`rounded-2xl p-6 border ${
              summary.scalePercent === 100
                ? 'bg-emerald-50 border-emerald-100'
                : summary.scalePercent >= 70
                  ? 'bg-amber-50 border-amber-100'
                  : 'bg-red-50 border-red-100'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-sm font-medium ${
                  summary.scalePercent === 100 ? 'text-emerald-600' :
                  summary.scalePercent >= 70 ? 'text-amber-600' : 'text-red-600'
                }`}>Scale Compliance</span>
                <ArrowUpDown size={20} className={
                  summary.scalePercent === 100 ? 'text-emerald-400' :
                  summary.scalePercent >= 70 ? 'text-amber-400' : 'text-red-400'
                } />
              </div>
              <div className={`text-4xl font-black mb-1 ${
                summary.scalePercent === 100 ? 'text-emerald-700' :
                summary.scalePercent >= 70 ? 'text-amber-700' : 'text-red-700'
              }`}>
                {summary.scaleValid}/{summary.total}
              </div>
              <p className={`text-sm ${
                summary.scalePercent === 100 ? 'text-emerald-600' :
                summary.scalePercent >= 70 ? 'text-amber-600' : 'text-red-600'
              }`}>
                {summary.scalePercent}% following {selectedRatio.name}
              </p>
            </div>

            <div className={`rounded-2xl p-6 border ${
              summary.lineHeightPercent === 100
                ? 'bg-emerald-50 border-emerald-100'
                : summary.lineHeightPercent >= 70
                  ? 'bg-amber-50 border-amber-100'
                  : 'bg-red-50 border-red-100'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-sm font-medium ${
                  summary.lineHeightPercent === 100 ? 'text-emerald-600' :
                  summary.lineHeightPercent >= 70 ? 'text-amber-600' : 'text-red-600'
                }`}>Line Height</span>
                <BarChart3 size={20} className={
                  summary.lineHeightPercent === 100 ? 'text-emerald-400' :
                  summary.lineHeightPercent >= 70 ? 'text-amber-400' : 'text-red-400'
                } />
              </div>
              <div className={`text-4xl font-black mb-1 ${
                summary.lineHeightPercent === 100 ? 'text-emerald-700' :
                summary.lineHeightPercent >= 70 ? 'text-amber-700' : 'text-red-700'
              }`}>
                {summary.lineHeightValid}/{summary.total}
              </div>
              <p className={`text-sm ${
                summary.lineHeightPercent === 100 ? 'text-emerald-600' :
                summary.lineHeightPercent >= 70 ? 'text-amber-600' : 'text-red-600'
              }`}>
                {summary.lineHeightPercent}% within optimal range
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
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Size</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Expected</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Scale</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">Line Height</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wide">LH Status</th>
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
                        <span className="text-sm font-mono text-slate-600">{result.token.size}</span>
                        <span className="text-xs text-slate-400 ml-1">({result.sizePx}px)</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono text-slate-500">
                          {Math.round(result.scaleValidation.expectedSize)}px
                        </span>
                        <span className="text-xs text-slate-400 ml-1">
                          (step {result.scaleValidation.expectedStep > 0 ? '+' : ''}{result.scaleValidation.expectedStep})
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge
                          status={result.scaleValidation.isValid ? 'pass' : 'fail'}
                          label={result.scaleValidation.isValid ? 'OK' : `${Math.round(result.scaleValidation.deviation * 100)}% off`}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono text-slate-600">{result.token.lineHeight}</span>
                        <span className="text-xs text-slate-400 ml-1">
                          (rec: {result.lineHeightValidation.recommendation.recommended})
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge
                          status={
                            result.lineHeightValidation.isValid ? 'pass' :
                            result.lineHeightValidation.status === 'low' ? 'warning' : 'warning'
                          }
                          label={
                            result.lineHeightValidation.isValid ? 'OK' :
                            result.lineHeightValidation.status === 'low' ? 'Too tight' : 'Too loose'
                          }
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span
                          style={{
                            fontSize: result.token.size,
                            fontWeight: result.token.weight,
                            lineHeight: result.token.lineHeight
                          }}
                          className="text-slate-800"
                        >
                          Aa
                        </span>
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
                    Suggested adjustments to improve typographic consistency.
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
              <h3 className="text-lg font-bold text-slate-900 mb-4">Scale Configuration</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600 mb-2 block">Ratio</label>
                  <div className="grid grid-cols-2 gap-2">
                    {SCALE_RATIOS.map(ratio => (
                      <button
                        key={ratio.value}
                        onClick={() => setSelectedRatio(ratio)}
                        className={`p-3 rounded-xl text-left transition-all ${
                          selectedRatio.value === ratio.value
                            ? 'bg-blue-50 border-2 border-blue-500'
                            : 'bg-slate-50 border-2 border-transparent hover:border-slate-200'
                        }`}
                      >
                        <p className={`text-sm font-bold ${
                          selectedRatio.value === ratio.value ? 'text-blue-700' : 'text-slate-700'
                        }`}>
                          {ratio.name}
                        </p>
                        <p className={`text-xs ${
                          selectedRatio.value === ratio.value ? 'text-blue-500' : 'text-slate-400'
                        }`}>
                          {ratio.value}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-600 mb-2 block">Base Size (px)</label>
                  <input
                    type="number"
                    value={baseSize}
                    onChange={(e) => setBaseSize(parseInt(e.target.value) || 16)}
                    min={10}
                    max={24}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Generated Scale</h3>
              <p className="text-sm text-slate-500 mb-4">
                Based on {selectedRatio.name} ({selectedRatio.value}) with {baseSize}px base.
              </p>

              <div className="space-y-2">
                {idealScale.map((size, index) => {
                  const step = index - 2; // Offset for steps below base
                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        step === 0 ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-mono px-2 py-1 rounded ${
                          step === 0 ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {step > 0 ? `+${step}` : step}
                        </span>
                        <span
                          style={{ fontSize: `${Math.min(size, 48)}px` }}
                          className="text-slate-800 font-medium"
                        >
                          Aa
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-mono font-bold text-slate-700">
                          {Math.round(size)}px
                        </span>
                        <span className="text-xs text-slate-400 ml-2">
                          ({(size / 16).toFixed(3)}rem)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => handleCopy(
                  idealScale.map((s, i) => `${i - 2}: ${Math.round(s)}px`).join('\n'),
                  'scale'
                )}
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
              >
                {copied === 'scale' ? <Check size={16} /> : <Copy size={16} />}
                {copied === 'scale' ? 'Copied!' : 'Copy Scale Values'}
              </button>
            </div>
          </div>

          {/* Scale Comparison */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Scale Comparison</h3>
            <p className="text-sm text-slate-500 mb-6">
              Compare your current typography tokens against the ideal scale.
            </p>

            <div className="space-y-4">
              {validationResults.map((result) => {
                const expectedStep = result.scaleValidation.expectedStep;
                const expectedSize = result.scaleValidation.expectedSize;
                const deviation = result.scaleValidation.deviation;

                return (
                  <div
                    key={result.token.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border ${
                      result.scaleValidation.isValid
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800">{result.token.name}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-slate-500">
                          Actual: <span className="font-mono font-bold">{result.sizePx}px</span>
                        </span>
                        <span className="text-xs text-slate-500">
                          Expected: <span className="font-mono font-bold">{Math.round(expectedSize)}px</span>
                        </span>
                        <span className="text-xs text-slate-500">
                          Step: <span className="font-mono font-bold">{expectedStep > 0 ? `+${expectedStep}` : expectedStep}</span>
                        </span>
                      </div>
                    </div>

                    {/* Visual bar */}
                    <div className="w-48 relative">
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            result.scaleValidation.isValid ? 'bg-emerald-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.max(0, 100 - deviation * 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 mt-1 block text-right">
                        {Math.round((1 - deviation) * 100)}% match
                      </span>
                    </div>

                    <StatusBadge
                      status={result.scaleValidation.isValid ? 'pass' : 'fail'}
                      label={result.scaleValidation.isValid ? 'Match' : 'Off-scale'}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Line Height Reference */}
          <div className="bg-slate-50 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <FileText size={18} />
              Line Height Recommendations by Font Size
            </h4>
            <div className="grid grid-cols-4 gap-4">
              {LINE_HEIGHT_RECOMMENDATIONS.slice(0, 4).map((rec, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-slate-200">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                    {rec.minSize}-{rec.maxSize === 999 ? '+' : rec.maxSize}px
                  </p>
                  <p className="text-lg font-bold text-slate-800">{rec.recommended}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Range: {rec.minLineHeight} - {rec.maxLineHeight}
                  </p>
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
              <h3 className="text-lg font-bold text-slate-900">Typography Validation Report</h3>
              <button
                onClick={() => handleCopy(
                  `Typography Validation Report
${'='.repeat(50)}

Configuration:
  Scale Ratio: ${selectedRatio.name} (${selectedRatio.value})
  Base Size: ${baseSize}px
  Tolerance: ${tolerance}%

Summary:
  Overall Score: ${summary.overallScore}%
  Scale Compliance: ${summary.scaleValid}/${summary.total} (${summary.scalePercent}%)
  Line Height Compliance: ${summary.lineHeightValid}/${summary.total} (${summary.lineHeightPercent}%)

Token Details:
${validationResults.map(r => `
  ${r.token.name}:
    Size: ${r.token.size} (${r.sizePx}px)
    Expected: ${Math.round(r.scaleValidation.expectedSize)}px (step ${r.scaleValidation.expectedStep})
    Scale: ${r.scaleValidation.isValid ? 'PASS' : 'FAIL'} (${Math.round((1 - r.scaleValidation.deviation) * 100)}% match)
    Line Height: ${r.token.lineHeight}
    LH Status: ${r.lineHeightValidation.isValid ? 'PASS' : r.lineHeightValidation.status.toUpperCase()}
    Recommendations: ${r.recommendations.length > 0 ? r.recommendations.join('; ') : 'None'}
`).join('')}

Ideal Scale (${selectedRatio.name}):
${idealScale.map((s, i) => `  Step ${i - 2}: ${Math.round(s)}px`).join('\n')}
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
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Scale Ratio</p>
                <p className="text-sm font-bold text-slate-800">{selectedRatio.name} ({selectedRatio.value})</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Base Size</p>
                <p className="text-sm font-bold text-slate-800">{baseSize}px</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Tolerance</p>
                <p className="text-sm font-bold text-slate-800">{tolerance}%</p>
              </div>
            </div>

            {/* Detailed Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 text-slate-500 font-medium">Token</th>
                    <th className="text-left py-3 text-slate-500 font-medium">Size</th>
                    <th className="text-left py-3 text-slate-500 font-medium">Expected</th>
                    <th className="text-left py-3 text-slate-500 font-medium">Match</th>
                    <th className="text-left py-3 text-slate-500 font-medium">Line Height</th>
                    <th className="text-left py-3 text-slate-500 font-medium">Weight</th>
                    <th className="text-left py-3 text-slate-500 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {validationResults.map((result) => {
                    const allValid = result.scaleValidation.isValid && result.lineHeightValidation.isValid;
                    const someValid = result.scaleValidation.isValid || result.lineHeightValidation.isValid;

                    return (
                      <tr key={result.token.id}>
                        <td className="py-3 font-medium text-slate-800">{result.token.name}</td>
                        <td className="py-3 font-mono text-slate-600">{result.sizePx}px</td>
                        <td className="py-3 font-mono text-slate-500">{Math.round(result.scaleValidation.expectedSize)}px</td>
                        <td className="py-3 font-mono text-slate-600">{Math.round((1 - result.scaleValidation.deviation) * 100)}%</td>
                        <td className="py-3 font-mono text-slate-600">{result.token.lineHeight}</td>
                        <td className="py-3 font-mono text-slate-600">{result.token.weight}</td>
                        <td className="py-3">
                          <StatusBadge
                            status={allValid ? 'pass' : someValid ? 'warning' : 'fail'}
                            label={allValid ? 'Valid' : someValid ? 'Partial' : 'Invalid'}
                          />
                        </td>
                      </tr>
                    );
                  })}
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
                      ? 'Excellent! Your typography follows a consistent scale.'
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
  /* Typography Scale (${selectedRatio.name} - ${selectedRatio.value}) */
${idealScale.map((s, i) => `  --font-size-${i - 2 < 0 ? 'xs' : i - 2 === 0 ? 'base' : ['lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'][i - 3]}: ${(s / 16).toFixed(4)}rem; /* ${Math.round(s)}px */`).join('\n')}

  /* Line Height */
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 1.75;
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
  /* Typography Scale (${selectedRatio.name} - ${selectedRatio.value}) */
${idealScale.map((s, i) => `  --font-size-${i - 2 < 0 ? 'xs' : i - 2 === 0 ? 'base' : ['lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'][i - 3]}: ${(s / 16).toFixed(4)}rem; /* ${Math.round(s)}px */`).join('\n')}

  /* Line Height */
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 1.75;
}`}
            </pre>
          </div>

          {/* Letter Spacing Reference */}
          <div className="bg-slate-50 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-700 mb-4">Letter Spacing Guidelines</h4>
            <div className="grid grid-cols-2 gap-4">
              {LETTER_SPACING_RANGES.map((range, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-slate-200">
                  <p className="text-sm font-bold text-slate-800">{range.context}</p>
                  <p className="text-xs text-slate-500 mt-1">{range.description}</p>
                  <p className="text-xs font-mono text-slate-600 mt-2">
                    Range: {range.minEm}em to {range.maxEm}em
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypographyValidatorView;
