/**
 * Contrast Validator
 *
 * Real-time WCAG contrast validation with visual indicators.
 * Checks AA/AAA compliance for text and interactive elements.
 *
 * @usage
 * ```tsx
 * import { ContrastValidator, useContrastCheck } from '@/components/accessibility/ContrastValidator';
 *
 * <ContrastValidator foreground="#000" background="#fff" fontSize={16} />
 *
 * const { ratio, isCompliant } = useContrastCheck('#000', '#fff', 'AA', 'normal');
 * ```
 */

import React, { useMemo } from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';

// ==================== TYPES ====================
export type WCAGLevel = 'AA' | 'AAA';
export type TextSize = 'normal' | 'large'; // large = 18pt+ or 14pt+ bold

interface ContrastValidatorProps {
  foreground: string;
  background: string;
  fontSize?: number;
  fontWeight?: number | string;
  level?: WCAGLevel;
  showDetails?: boolean;
  className?: string;
}

interface ContrastResult {
  ratio: number;
  isCompliant: boolean;
  level: WCAGLevel;
  textSize: TextSize;
  passes: {
    normalAA: boolean;
    normalAAA: boolean;
    largeAA: boolean;
    largeAAA: boolean;
  };
}

// ==================== WCAG THRESHOLDS ====================
const WCAG_THRESHOLDS = {
  normalAA: 4.5,
  normalAAA: 7,
  largeAA: 3,
  largeAAA: 4.5,
} as const;

// ==================== COLOR UTILS ====================

/**
 * Convert hex/rgb color to RGB object
 */
function parseColor(color: string): { r: number; g: number; b: number } | null {
  // Hex format
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b };
  }

  // RGB format
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1]),
      g: parseInt(rgbMatch[2]),
      b: parseInt(rgbMatch[3]),
    };
  }

  return null;
}

/**
 * Calculate relative luminance (WCAG formula)
 */
function getLuminance(color: { r: number; g: number; b: number }): number {
  const [r, g, b] = [color.r, color.g, color.b].map((val) => {
    const sRGB = val / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio (WCAG formula)
 */
export function calculateContrastRatio(foreground: string, background: string): number {
  const fg = parseColor(foreground);
  const bg = parseColor(background);

  if (!fg || !bg) return 1;

  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Determine if text is considered "large" by WCAG
 */
function isLargeText(fontSize: number, fontWeight: number | string): boolean {
  const weight = typeof fontWeight === 'string' ? parseInt(fontWeight) || 400 : fontWeight;

  // 18pt (24px) or larger
  if (fontSize >= 24) return true;

  // 14pt (18.66px) bold (700+) or larger
  if (fontSize >= 18.66 && weight >= 700) return true;

  return false;
}

// ==================== HOOK: useContrastCheck ====================
export function useContrastCheck(
  foreground: string,
  background: string,
  level: WCAGLevel = 'AA',
  textSize: TextSize = 'normal'
): ContrastResult {
  return useMemo(() => {
    const ratio = calculateContrastRatio(foreground, background);

    const passes = {
      normalAA: ratio >= WCAG_THRESHOLDS.normalAA,
      normalAAA: ratio >= WCAG_THRESHOLDS.normalAAA,
      largeAA: ratio >= WCAG_THRESHOLDS.largeAA,
      largeAAA: ratio >= WCAG_THRESHOLDS.largeAAA,
    };

    const threshold =
      textSize === 'large'
        ? level === 'AAA'
          ? WCAG_THRESHOLDS.largeAAA
          : WCAG_THRESHOLDS.largeAA
        : level === 'AAA'
          ? WCAG_THRESHOLDS.normalAAA
          : WCAG_THRESHOLDS.normalAA;

    return {
      ratio,
      isCompliant: ratio >= threshold,
      level,
      textSize,
      passes,
    };
  }, [foreground, background, level, textSize]);
}

// ==================== COMPONENT: ContrastValidator ====================
export const ContrastValidator: React.FC<ContrastValidatorProps> = ({
  foreground,
  background,
  fontSize = 16,
  fontWeight = 400,
  level = 'AA',
  showDetails = true,
  className = '',
}) => {
  const textSize = isLargeText(fontSize, fontWeight) ? 'large' : 'normal';
  const result = useContrastCheck(foreground, background, level, textSize);

  const StatusIcon = result.isCompliant ? Check : X;
  const statusColor = result.isCompliant ? 'text-green-600' : 'text-red-600';
  const statusBg = result.isCompliant ? 'bg-green-50' : 'bg-red-50';

  return (
    <div className={`inline-flex flex-col gap-2 ${className}`}>
      {/* Preview */}
      <div
        className="p-4 rounded-lg border-2"
        style={{ backgroundColor: background, color: foreground }}
      >
        <p style={{ fontSize, fontWeight }}>Sample Text</p>
      </div>

      {/* Status Badge */}
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${statusBg}`}>
        <StatusIcon className={`w-5 h-5 ${statusColor}`} />
        <div className="flex-1">
          <div className={`text-sm font-semibold ${statusColor}`}>
            {result.isCompliant ? 'Passes' : 'Fails'} WCAG {level} ({textSize} text)
          </div>
          <div className="text-xs text-gray-600">Ratio: {result.ratio.toFixed(2)}:1</div>
        </div>
      </div>

      {/* Details */}
      {showDetails && (
        <div className="text-xs space-y-1">
          <ComplianceBadge
            label="Normal Text AA"
            passes={result.passes.normalAA}
            threshold={WCAG_THRESHOLDS.normalAA}
          />
          <ComplianceBadge
            label="Normal Text AAA"
            passes={result.passes.normalAAA}
            threshold={WCAG_THRESHOLDS.normalAAA}
          />
          <ComplianceBadge
            label="Large Text AA"
            passes={result.passes.largeAA}
            threshold={WCAG_THRESHOLDS.largeAA}
          />
          <ComplianceBadge
            label="Large Text AAA"
            passes={result.passes.largeAAA}
            threshold={WCAG_THRESHOLDS.largeAAA}
          />
        </div>
      )}
    </div>
  );
};

// ==================== COMPONENT: ComplianceBadge ====================
const ComplianceBadge: React.FC<{
  label: string;
  passes: boolean;
  threshold: number;
}> = ({ label, passes, threshold }) => {
  const Icon = passes ? Check : X;
  const color = passes ? 'text-green-600' : 'text-gray-400';

  return (
    <div className="flex items-center gap-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <span className="text-gray-700">
        {label} ({threshold}:1)
      </span>
    </div>
  );
};

// ==================== COMPONENT: ContrastChecker ====================
export const ContrastChecker: React.FC<{
  colors: Array<{ foreground: string; background: string; label?: string }>;
  level?: WCAGLevel;
  className?: string;
}> = ({ colors, level = 'AA', className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900">Contrast Analysis</h3>
      <div className="grid gap-4">
        {colors.map((color, index) => {
          const result = useContrastCheck(color.foreground, color.background, level, 'normal');

          return (
            <div key={index} className="border rounded-lg p-4">
              {color.label && <h4 className="font-medium mb-2">{color.label}</h4>}

              <div className="flex items-center gap-4">
                {/* Color Preview */}
                <div className="flex gap-2">
                  <div
                    className="w-12 h-12 rounded border"
                    style={{ backgroundColor: color.foreground }}
                    title={`Foreground: ${color.foreground}`}
                  />
                  <div
                    className="w-12 h-12 rounded border"
                    style={{ backgroundColor: color.background }}
                    title={`Background: ${color.background}`}
                  />
                </div>

                {/* Ratio */}
                <div className="flex-1">
                  <div className="text-sm text-gray-600">Contrast Ratio</div>
                  <div className="text-lg font-semibold">{result.ratio.toFixed(2)}:1</div>
                </div>

                {/* Status */}
                <div>
                  {result.isCompliant ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">Passes {level}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600">
                      <X className="w-5 h-5" />
                      <span className="font-medium">Fails {level}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==================== COMPONENT: AccessibleColorPicker ====================
export const AccessibleColorPicker: React.FC<{
  baseColor: string;
  onColorChange: (color: string, isAccessible: boolean) => void;
  level?: WCAGLevel;
  className?: string;
}> = ({ baseColor, onColorChange, level = 'AA', className = '' }) => {
  const [selectedColor, setSelectedColor] = React.useState(baseColor);
  const result = useContrastCheck(selectedColor, '#ffffff', level, 'normal');

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const newResult = useContrastCheck(color, '#ffffff', level, 'normal');
    onColorChange(color, newResult.isCompliant);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-4">
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className="w-16 h-16 rounded border cursor-pointer"
        />

        <div className="flex-1">
          <input
            type="text"
            value={selectedColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
          />

          <div className="flex items-center gap-2 mt-2">
            {result.isCompliant ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            )}
            <span className="text-sm text-gray-600">
              Ratio: {result.ratio.toFixed(2)}:1 {result.isCompliant ? '✓' : '✗'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Accessibility: WCAG 2.1 compliant contrast checking
// Performance: Memoized calculations, optimized color parsing
// Usage: Integrate into design tools, component library
