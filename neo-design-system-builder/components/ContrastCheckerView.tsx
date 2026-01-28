import React, { useState, useMemo, useCallback } from 'react';
import {
  Eye,
  EyeOff,
  Check,
  X,
  AlertTriangle,
  Copy,
  ArrowLeftRight,
  Lightbulb,
  Type,
  Heading1,
  FileText,
  Sparkles,
  RefreshCw
} from 'lucide-react';

// WCAG 2.1 Contrast Calculation Utilities
// Based on https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

/**
 * Convert hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to hex
 */
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Calculate relative luminance according to WCAG 2.1
 * Formula: L = 0.2126 * R + 0.7152 * G + 0.0722 * B
 */
function getRelativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((channel) => {
    const sRGB = channel / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors
 * Formula: (L1 + 0.05) / (L2 + 0.05) where L1 is the lighter color
 */
function getContrastRatio(foreground: string, background: string): number {
  const lum1 = getRelativeLuminance(foreground);
  const lum2 = getRelativeLuminance(background);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * WCAG Compliance Levels
 */
interface WcagCompliance {
  normalTextAA: boolean;      // 4.5:1
  normalTextAAA: boolean;     // 7:1
  largeTextAA: boolean;       // 3:1
  largeTextAAA: boolean;      // 4.5:1
  uiComponentsAA: boolean;    // 3:1
}

function getWcagCompliance(ratio: number): WcagCompliance {
  return {
    normalTextAA: ratio >= 4.5,
    normalTextAAA: ratio >= 7,
    largeTextAA: ratio >= 3,
    largeTextAAA: ratio >= 4.5,
    uiComponentsAA: ratio >= 3,
  };
}

/**
 * Generate color suggestions that meet target contrast
 */
function findValidContrast(
  baseColor: string,
  targetRatio: number,
  adjustForeground: boolean
): string[] {
  const suggestions: string[] = [];
  const baseRgb = hexToRgb(baseColor);
  if (!baseRgb) return suggestions;

  // Try lightening
  for (let factor = 1; factor <= 100; factor += 5) {
    const lightened = rgbToHex(
      Math.min(255, baseRgb.r + factor * 2.55),
      Math.min(255, baseRgb.g + factor * 2.55),
      Math.min(255, baseRgb.b + factor * 2.55)
    );

    const testColor = adjustForeground ? lightened : baseColor;
    const bgColor = adjustForeground ? baseColor : lightened;

    if (getContrastRatio(testColor, bgColor) >= targetRatio) {
      if (!suggestions.includes(lightened)) {
        suggestions.push(lightened);
      }
      break;
    }
  }

  // Try darkening
  for (let factor = 1; factor <= 100; factor += 5) {
    const darkened = rgbToHex(
      Math.max(0, baseRgb.r - factor * 2.55),
      Math.max(0, baseRgb.g - factor * 2.55),
      Math.max(0, baseRgb.b - factor * 2.55)
    );

    const testColor = adjustForeground ? darkened : baseColor;
    const bgColor = adjustForeground ? baseColor : darkened;

    if (getContrastRatio(testColor, bgColor) >= targetRatio) {
      if (!suggestions.includes(darkened)) {
        suggestions.push(darkened);
      }
      break;
    }
  }

  // Add pure black/white if they pass
  if (getContrastRatio('#000000', baseColor) >= targetRatio && !suggestions.includes('#000000')) {
    suggestions.push('#000000');
  }
  if (getContrastRatio('#ffffff', baseColor) >= targetRatio && !suggestions.includes('#ffffff')) {
    suggestions.push('#ffffff');
  }

  return suggestions.slice(0, 4);
}

// Common color pairs for quick testing
const presetPairs = [
  { fg: '#000000', bg: '#ffffff', name: 'Black on White' },
  { fg: '#ffffff', bg: '#000000', name: 'White on Black' },
  { fg: '#1f2937', bg: '#f3f4f6', name: 'Gray 800 on Gray 100' },
  { fg: '#3b82f6', bg: '#ffffff', name: 'Blue 500 on White' },
  { fg: '#ffffff', bg: '#3b82f6', name: 'White on Blue 500' },
  { fg: '#ef4444', bg: '#ffffff', name: 'Red 500 on White' },
  { fg: '#22c55e', bg: '#ffffff', name: 'Green 500 on White' },
  { fg: '#6366f1', bg: '#eef2ff', name: 'Indigo 500 on Indigo 50' },
];

const ContrastCheckerView: React.FC = () => {
  const [foregroundColor, setForegroundColor] = useState('#1f2937');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [activeTab, setActiveTab] = useState<'checker' | 'presets' | 'report'>('checker');
  const [copied, setCopied] = useState<string | null>(null);

  // Calculate contrast ratio
  const contrastRatio = useMemo(() => {
    return getContrastRatio(foregroundColor, backgroundColor);
  }, [foregroundColor, backgroundColor]);

  // Get WCAG compliance
  const compliance = useMemo(() => {
    return getWcagCompliance(contrastRatio);
  }, [contrastRatio]);

  // Get overall rating
  const overallRating = useMemo(() => {
    if (compliance.normalTextAAA) return { label: 'AAA', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (compliance.normalTextAA) return { label: 'AA', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (compliance.largeTextAA) return { label: 'AA Large', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { label: 'Fail', color: 'text-red-600', bg: 'bg-red-50' };
  }, [compliance]);

  // Get suggestions
  const suggestions = useMemo(() => {
    if (compliance.normalTextAA) return [];
    return findValidContrast(backgroundColor, 4.5, true);
  }, [backgroundColor, compliance.normalTextAA]);

  // Swap colors
  const handleSwapColors = useCallback(() => {
    setForegroundColor(backgroundColor);
    setBackgroundColor(foregroundColor);
  }, [foregroundColor, backgroundColor]);

  // Copy to clipboard
  const handleCopy = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  // Apply preset
  const handleApplyPreset = useCallback((fg: string, bg: string) => {
    setForegroundColor(fg);
    setBackgroundColor(bg);
    setActiveTab('checker');
  }, []);

  // Apply suggestion
  const handleApplySuggestion = useCallback((color: string) => {
    setForegroundColor(color);
  }, []);

  // Format ratio
  const formatRatio = (ratio: number) => `${ratio.toFixed(2)}:1`;

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

  // Compliance badge
  const ComplianceBadge = ({
    passed,
    label,
    ratio
  }: {
    passed: boolean;
    label: string;
    ratio: string;
  }) => (
    <div className={`flex items-center justify-between p-4 rounded-xl border ${
      passed
        ? 'bg-emerald-50 border-emerald-200'
        : 'bg-red-50 border-red-200'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          passed ? 'bg-emerald-100' : 'bg-red-100'
        }`}>
          {passed ? (
            <Check className="text-emerald-600" size={18} />
          ) : (
            <X className="text-red-600" size={18} />
          )}
        </div>
        <div>
          <p className={`font-semibold ${passed ? 'text-emerald-800' : 'text-red-800'}`}>
            {label}
          </p>
          <p className={`text-xs ${passed ? 'text-emerald-600' : 'text-red-600'}`}>
            Minimum {ratio} required
          </p>
        </div>
      </div>
      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
        passed
          ? 'bg-emerald-100 text-emerald-700'
          : 'bg-red-100 text-red-700'
      }`}>
        {passed ? 'PASS' : 'FAIL'}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-slate-200">
        <Tab label="Contrast Checker" id="checker" />
        <Tab label="Preset Pairs" id="presets" />
        <Tab label="Full Report" id="report" />
      </div>

      {activeTab === 'checker' && (
        <>
          {/* Main Checker Interface */}
          <div className="grid grid-cols-2 gap-8">
            {/* Color Inputs */}
            <div className="space-y-6">
              {/* Foreground Color */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Type size={16} />
                    Foreground (Text)
                  </label>
                  <button
                    onClick={() => handleCopy(foregroundColor, 'fg')}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {copied === 'fg' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                </div>

                <div className="flex gap-3">
                  <div
                    className="w-16 h-16 rounded-xl border-2 border-slate-200 shadow-inner cursor-pointer overflow-hidden"
                    style={{ backgroundColor: foregroundColor }}
                  >
                    <input
                      type="color"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={foregroundColor.toUpperCase()}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                          setForegroundColor(val);
                        }
                      }}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-mono uppercase focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="#000000"
                    />
                    <p className="text-xs text-slate-400 mt-2">
                      Luminance: {getRelativeLuminance(foregroundColor).toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleSwapColors}
                  className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <ArrowLeftRight size={20} className="text-slate-400 group-hover:text-slate-600 rotate-90" />
                </button>
              </div>

              {/* Background Color */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <FileText size={16} />
                    Background
                  </label>
                  <button
                    onClick={() => handleCopy(backgroundColor, 'bg')}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {copied === 'bg' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                </div>

                <div className="flex gap-3">
                  <div
                    className="w-16 h-16 rounded-xl border-2 border-slate-200 shadow-inner cursor-pointer overflow-hidden"
                    style={{ backgroundColor: backgroundColor }}
                  >
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={backgroundColor.toUpperCase()}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                          setBackgroundColor(val);
                        }
                      }}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-mono uppercase focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="#FFFFFF"
                    />
                    <p className="text-xs text-slate-400 mt-2">
                      Luminance: {getRelativeLuminance(backgroundColor).toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview & Results */}
            <div className="space-y-6">
              {/* Live Preview */}
              <div
                className="rounded-2xl border-2 border-slate-200 p-8 min-h-[200px] flex flex-col justify-center"
                style={{ backgroundColor }}
              >
                <h3
                  className="text-3xl font-black mb-2"
                  style={{ color: foregroundColor }}
                >
                  Preview Text
                </h3>
                <p
                  className="text-lg font-medium mb-4"
                  style={{ color: foregroundColor }}
                >
                  This is how your text will look on this background.
                </p>
                <p
                  className="text-sm"
                  style={{ color: foregroundColor }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>

              {/* Contrast Ratio Display */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-slate-500">Contrast Ratio</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${overallRating.bg} ${overallRating.color}`}>
                    {overallRating.label}
                  </span>
                </div>
                <div className="text-5xl font-black text-slate-900 mb-2">
                  {formatRatio(contrastRatio)}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  {contrastRatio >= 4.5 ? (
                    <>
                      <Check size={16} className="text-emerald-500" />
                      Passes WCAG AA for normal text
                    </>
                  ) : contrastRatio >= 3 ? (
                    <>
                      <AlertTriangle size={16} className="text-amber-500" />
                      Only passes for large text (18pt+)
                    </>
                  ) : (
                    <>
                      <X size={16} className="text-red-500" />
                      Does not meet WCAG requirements
                    </>
                  )}
                </div>
              </div>

              {/* Copy Pair Button */}
              <button
                onClick={() => handleCopy(`Foreground: ${foregroundColor}\nBackground: ${backgroundColor}\nContrast: ${formatRatio(contrastRatio)}`, 'pair')}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-colors"
              >
                {copied === 'pair' ? <Check size={18} /> : <Copy size={18} />}
                {copied === 'pair' ? 'Copied!' : 'Copy Color Pair'}
              </button>
            </div>
          </div>

          {/* WCAG Compliance Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Eye size={20} />
              WCAG 2.1 Compliance
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <ComplianceBadge
                passed={compliance.normalTextAA}
                label="Normal Text (AA)"
                ratio="4.5:1"
              />
              <ComplianceBadge
                passed={compliance.normalTextAAA}
                label="Normal Text (AAA)"
                ratio="7:1"
              />
              <ComplianceBadge
                passed={compliance.largeTextAA}
                label="Large Text (AA)"
                ratio="3:1"
              />
              <ComplianceBadge
                passed={compliance.largeTextAAA}
                label="Large Text (AAA)"
                ratio="4.5:1"
              />
            </div>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="text-amber-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-amber-800">Suggested Foreground Colors</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    These colors will pass WCAG AA (4.5:1) with your current background.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {suggestions.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplySuggestion(color)}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-amber-300 hover:border-amber-400 transition-colors"
                  >
                    <div
                      className="w-6 h-6 rounded-md border border-slate-200"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm font-mono text-slate-700">{color.toUpperCase()}</span>
                    <span className="text-xs text-slate-500">
                      {formatRatio(getContrastRatio(color, backgroundColor))}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Text Size Reference */}
          <div className="bg-slate-50 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <Heading1 size={18} />
              Text Size Reference (WCAG)
            </h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Normal Text</p>
                <p className="text-sm text-slate-600">Less than 18pt (24px) regular or 14pt (18.66px) bold</p>
                <p className="text-xs text-slate-400">Requires 4.5:1 for AA, 7:1 for AAA</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Large Text</p>
                <p className="text-sm text-slate-600">At least 18pt (24px) regular or 14pt (18.66px) bold</p>
                <p className="text-xs text-slate-400">Requires 3:1 for AA, 4.5:1 for AAA</p>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'presets' && (
        <div className="space-y-6">
          <p className="text-slate-600">
            Click on a preset to test it in the contrast checker.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {presetPairs.map((preset, index) => {
              const ratio = getContrastRatio(preset.fg, preset.bg);
              const wcag = getWcagCompliance(ratio);

              return (
                <button
                  key={index}
                  onClick={() => handleApplyPreset(preset.fg, preset.bg)}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all text-left group"
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-lg border border-slate-200"
                    style={{ backgroundColor: preset.bg, color: preset.fg }}
                  >
                    Aa
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {preset.name}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Ratio: {formatRatio(ratio)}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        wcag.normalTextAA
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {wcag.normalTextAA ? 'AA' : 'Fail AA'}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        wcag.normalTextAAA
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {wcag.normalTextAAA ? 'AAA' : 'No AAA'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'report' && (
        <div className="space-y-6">
          {/* Current Pair Report */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Accessibility Report</h3>
              <button
                onClick={() => handleCopy(
                  `WCAG Contrast Report\n${'='.repeat(40)}\n\nColors:\n  Foreground: ${foregroundColor}\n  Background: ${backgroundColor}\n\nContrast Ratio: ${formatRatio(contrastRatio)}\n\nWCAG 2.1 Compliance:\n  Normal Text AA (4.5:1): ${compliance.normalTextAA ? 'PASS' : 'FAIL'}\n  Normal Text AAA (7:1): ${compliance.normalTextAAA ? 'PASS' : 'FAIL'}\n  Large Text AA (3:1): ${compliance.largeTextAA ? 'PASS' : 'FAIL'}\n  Large Text AAA (4.5:1): ${compliance.largeTextAAA ? 'PASS' : 'FAIL'}\n  UI Components (3:1): ${compliance.uiComponentsAA ? 'PASS' : 'FAIL'}\n\nOverall Rating: ${overallRating.label}`,
                  'report'
                )}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
              >
                {copied === 'report' ? <Check size={16} /> : <Copy size={16} />}
                Copy Report
              </button>
            </div>

            {/* Color Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Foreground</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg border border-slate-200"
                    style={{ backgroundColor: foregroundColor }}
                  />
                  <div>
                    <p className="font-mono font-bold text-slate-800">{foregroundColor.toUpperCase()}</p>
                    <p className="text-xs text-slate-500">L: {getRelativeLuminance(foregroundColor).toFixed(4)}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Background</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg border border-slate-200"
                    style={{ backgroundColor: backgroundColor }}
                  />
                  <div>
                    <p className="font-mono font-bold text-slate-800">{backgroundColor.toUpperCase()}</p>
                    <p className="text-xs text-slate-500">L: {getRelativeLuminance(backgroundColor).toFixed(4)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-700">Detailed Results</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 text-slate-500 font-medium">Criterion</th>
                    <th className="text-left py-2 text-slate-500 font-medium">Required</th>
                    <th className="text-left py-2 text-slate-500 font-medium">Actual</th>
                    <th className="text-left py-2 text-slate-500 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 text-slate-700">Normal Text (AA)</td>
                    <td className="py-3 text-slate-500">4.5:1</td>
                    <td className="py-3 font-mono text-slate-700">{formatRatio(contrastRatio)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        compliance.normalTextAA
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {compliance.normalTextAA ? 'PASS' : 'FAIL'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-700">Normal Text (AAA)</td>
                    <td className="py-3 text-slate-500">7:1</td>
                    <td className="py-3 font-mono text-slate-700">{formatRatio(contrastRatio)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        compliance.normalTextAAA
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {compliance.normalTextAAA ? 'PASS' : 'FAIL'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-700">Large Text (AA)</td>
                    <td className="py-3 text-slate-500">3:1</td>
                    <td className="py-3 font-mono text-slate-700">{formatRatio(contrastRatio)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        compliance.largeTextAA
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {compliance.largeTextAA ? 'PASS' : 'FAIL'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-700">Large Text (AAA)</td>
                    <td className="py-3 text-slate-500">4.5:1</td>
                    <td className="py-3 font-mono text-slate-700">{formatRatio(contrastRatio)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        compliance.largeTextAAA
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {compliance.largeTextAAA ? 'PASS' : 'FAIL'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-700">UI Components</td>
                    <td className="py-3 text-slate-500">3:1</td>
                    <td className="py-3 font-mono text-slate-700">{formatRatio(contrastRatio)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        compliance.uiComponentsAA
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {compliance.uiComponentsAA ? 'PASS' : 'FAIL'}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className={`p-4 rounded-xl ${overallRating.bg}`}>
              <div className="flex items-center gap-3">
                <Sparkles className={overallRating.color} size={24} />
                <div>
                  <p className={`font-bold ${overallRating.color}`}>
                    Overall: {overallRating.label}
                  </p>
                  <p className="text-sm text-slate-600">
                    {compliance.normalTextAAA
                      ? 'Excellent! This color combination meets the highest accessibility standards.'
                      : compliance.normalTextAA
                        ? 'Good! This color combination meets standard accessibility requirements.'
                        : compliance.largeTextAA
                          ? 'Limited. Only suitable for large text (18pt+ or 14pt bold).'
                          : 'Poor contrast. Consider choosing colors with higher contrast.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* WCAG Reference */}
          <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
            <h4 className="font-bold text-slate-800">WCAG 2.1 Reference</h4>
            <div className="space-y-3 text-sm text-slate-600">
              <p>
                <strong>Level AA (Minimum):</strong> Intended to eliminate barriers for users with moderately low vision (20/40) who do not use contrast-enhancing assistive technology.
              </p>
              <p>
                <strong>Level AAA (Enhanced):</strong> Intended to provide access to content for users with more severe vision loss (20/80) and enhanced accessibility for all users.
              </p>
              <p className="text-slate-500">
                <em>Source: WCAG 2.1 Success Criterion 1.4.3 (AA) and 1.4.6 (AAA)</em>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContrastCheckerView;
