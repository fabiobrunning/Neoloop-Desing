/**
 * Touch Target Validator
 *
 * Validates touch target sizes (44px minimum for WCAG AAA, 48px iOS recommendation).
 * Provides visual feedback and automatic size adjustment utilities.
 *
 * @usage
 * ```tsx
 * import { TouchTargetValidator, useTouchTargetSize, MinimumTouchTarget } from '@/components/accessibility/TouchTargetValidator';
 *
 * <TouchTargetValidator minSize={44}>
 *   <button>Small Button</button>
 * </TouchTargetValidator>
 * ```
 */

import React, { useRef, useEffect, useState } from 'react';
import { AlertTriangle, Check } from 'lucide-react';

// ==================== TYPES ====================
export type TouchTargetStandard = 'WCAG_AAA' | 'iOS' | 'Android' | 'custom';

interface TouchTargetValidatorProps {
  children: React.ReactNode;
  minSize?: number; // Minimum size in pixels
  standard?: TouchTargetStandard;
  showWarning?: boolean;
  autoAdjust?: boolean;
  className?: string;
}

interface TouchTargetSize {
  width: number;
  height: number;
  isValid: boolean;
  minRequired: number;
}

// ==================== STANDARDS ====================
const TOUCH_TARGET_STANDARDS = {
  WCAG_AAA: 44, // WCAG 2.1 Level AAA - 44x44px
  iOS: 44, // iOS Human Interface Guidelines - 44x44pt
  Android: 48, // Android Material Design - 48x48dp
  custom: 44,
} as const;

// ==================== HOOK: useTouchTargetSize ====================
export function useTouchTargetSize(
  ref: React.RefObject<HTMLElement>,
  standard: TouchTargetStandard = 'WCAG_AAA'
): TouchTargetSize {
  const [size, setSize] = useState<TouchTargetSize>({
    width: 0,
    height: 0,
    isValid: false,
    minRequired: TOUCH_TARGET_STANDARDS[standard],
  });

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const minRequired = TOUCH_TARGET_STANDARDS[standard];

    const checkSize = () => {
      const rect = element.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(element);

      // Include padding in touch target size
      const paddingTop = parseFloat(computedStyle.paddingTop);
      const paddingBottom = parseFloat(computedStyle.paddingBottom);
      const paddingLeft = parseFloat(computedStyle.paddingLeft);
      const paddingRight = parseFloat(computedStyle.paddingRight);

      const width = rect.width + paddingLeft + paddingRight;
      const height = rect.height + paddingTop + paddingBottom;

      setSize({
        width,
        height,
        isValid: width >= minRequired && height >= minRequired,
        minRequired,
      });
    };

    checkSize();

    // Re-check on resize
    const resizeObserver = new ResizeObserver(checkSize);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [ref, standard]);

  return size;
}

// ==================== COMPONENT: TouchTargetValidator ====================
export const TouchTargetValidator: React.FC<TouchTargetValidatorProps> = ({
  children,
  minSize,
  standard = 'WCAG_AAA',
  showWarning = true,
  autoAdjust = false,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const targetSize = useTouchTargetSize(ref, standard);
  const minimumSize = minSize || TOUCH_TARGET_STANDARDS[standard];

  const needsAdjustment = !targetSize.isValid && autoAdjust;

  return (
    <div className={`relative ${className}`}>
      {/* Target Element */}
      <div
        ref={ref}
        style={
          needsAdjustment
            ? {
                minWidth: `${minimumSize}px`,
                minHeight: `${minimumSize}px`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }
            : undefined
        }
      >
        {children}
      </div>

      {/* Warning Badge */}
      {showWarning && !targetSize.isValid && targetSize.width > 0 && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-amber-500 text-white rounded-full p-1" title="Touch target too small">
            <AlertTriangle className="w-3 h-3" />
          </div>
        </div>
      )}

      {/* Valid Badge */}
      {showWarning && targetSize.isValid && targetSize.width > 0 && (
        <div className="absolute -top-2 -right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-green-500 text-white rounded-full p-1" title="Touch target size OK">
            <Check className="w-3 h-3" />
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== COMPONENT: MinimumTouchTarget ====================
export const MinimumTouchTarget: React.FC<{
  children: React.ReactNode;
  minSize?: number;
  centerContent?: boolean;
  className?: string;
}> = ({ children, minSize = 44, centerContent = true, className = '' }) => {
  return (
    <div
      className={`
        inline-flex
        ${centerContent ? 'items-center justify-center' : ''}
        ${className}
      `}
      style={{
        minWidth: `${minSize}px`,
        minHeight: `${minSize}px`,
      }}
    >
      {children}
    </div>
  );
};

// ==================== COMPONENT: TouchTargetSizeReport ====================
export const TouchTargetSizeReport: React.FC<{
  elements: Array<{ selector: string; label: string }>;
  standard?: TouchTargetStandard;
  className?: string;
}> = ({ elements, standard = 'WCAG_AAA', className = '' }) => {
  const [report, setReport] = useState<
    Array<{
      selector: string;
      label: string;
      width: number;
      height: number;
      isValid: boolean;
    }>
  >([]);

  useEffect(() => {
    const minSize = TOUCH_TARGET_STANDARDS[standard];

    const checkElements = () => {
      const results = elements.map(({ selector, label }) => {
        const element = document.querySelector(selector);
        if (!element) {
          return { selector, label, width: 0, height: 0, isValid: false };
        }

        const rect = element.getBoundingClientRect();
        return {
          selector,
          label,
          width: rect.width,
          height: rect.height,
          isValid: rect.width >= minSize && rect.height >= minSize,
        };
      });

      setReport(results);
    };

    checkElements();

    // Re-check on resize
    window.addEventListener('resize', checkElements);
    return () => window.removeEventListener('resize', checkElements);
  }, [elements, standard]);

  const passCount = report.filter((r) => r.isValid).length;
  const failCount = report.length - passCount;
  const minSize = TOUCH_TARGET_STANDARDS[standard];

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Touch Target Size Report
      </h3>

      {/* Summary */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <div className="text-sm text-gray-600">Standard: {standard}</div>
          <div className="text-sm text-gray-600">Minimum Size: {minSize}x{minSize}px</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{passCount}</div>
          <div className="text-xs text-gray-600">Passing</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-red-600">{failCount}</div>
          <div className="text-xs text-gray-600">Failing</div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-2">
        {report.map((item, index) => (
          <div
            key={index}
            className={`
              flex items-center justify-between p-3 rounded-lg
              ${item.isValid ? 'bg-green-50' : 'bg-red-50'}
            `}
          >
            <div className="flex items-center gap-3">
              {item.isValid ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              )}
              <div>
                <div className="font-medium text-gray-900">{item.label}</div>
                <div className="text-xs text-gray-600 font-mono">{item.selector}</div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-sm font-medium ${item.isValid ? 'text-green-600' : 'text-red-600'}`}>
                {Math.round(item.width)}x{Math.round(item.height)}px
              </div>
              {!item.isValid && (
                <div className="text-xs text-red-600">
                  Needs {Math.max(0, minSize - item.width)}x
                  {Math.max(0, minSize - item.height)}px more
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== COMPONENT: TouchTargetHighlighter ====================
export const TouchTargetHighlighter: React.FC<{
  enabled?: boolean;
  minSize?: number;
}> = ({ enabled = false, minSize = 44 }) => {
  const [highlights, setHighlights] = useState<
    Array<{ x: number; y: number; width: number; height: number; isValid: boolean }>
  >([]);

  useEffect(() => {
    if (!enabled) {
      setHighlights([]);
      return;
    }

    const checkTargets = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, select, textarea, [role="button"], [onclick]'
      );

      const results = Array.from(interactiveElements).map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY,
          width: rect.width,
          height: rect.height,
          isValid: rect.width >= minSize && rect.height >= minSize,
        };
      });

      setHighlights(results);
    };

    checkTargets();

    window.addEventListener('resize', checkTargets);
    window.addEventListener('scroll', checkTargets);

    return () => {
      window.removeEventListener('resize', checkTargets);
      window.removeEventListener('scroll', checkTargets);
    };
  }, [enabled, minSize]);

  if (!enabled) return null;

  return (
    <>
      {highlights.map((highlight, index) => (
        <div
          key={index}
          className="fixed pointer-events-none border-2 z-[9999]"
          style={{
            top: highlight.y,
            left: highlight.x,
            width: highlight.width,
            height: highlight.height,
            borderColor: highlight.isValid ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)',
            backgroundColor: highlight.isValid
              ? 'rgba(34, 197, 94, 0.1)'
              : 'rgba(239, 68, 68, 0.1)',
          }}
        />
      ))}
    </>
  );
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Check if element meets touch target size requirements
 */
export function validateTouchTarget(
  element: HTMLElement,
  standard: TouchTargetStandard = 'WCAG_AAA'
): boolean {
  const rect = element.getBoundingClientRect();
  const minSize = TOUCH_TARGET_STANDARDS[standard];
  return rect.width >= minSize && rect.height >= minSize;
}

/**
 * Get recommended padding to meet touch target size
 */
export function getRecommendedPadding(
  currentWidth: number,
  currentHeight: number,
  standard: TouchTargetStandard = 'WCAG_AAA'
): { paddingX: number; paddingY: number } {
  const minSize = TOUCH_TARGET_STANDARDS[standard];
  const paddingX = Math.max(0, Math.ceil((minSize - currentWidth) / 2));
  const paddingY = Math.max(0, Math.ceil((minSize - currentHeight) / 2));

  return { paddingX, paddingY };
}

// Accessibility: WCAG 2.5.5 Target Size (AAA)
// Mobile: iOS/Android platform guidelines
// Usage: Validate all interactive elements
