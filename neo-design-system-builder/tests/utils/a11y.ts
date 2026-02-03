import { axe, toHaveNoViolations } from 'jest-axe';
import { RenderResult } from '@testing-library/react';
import { expect } from 'vitest';
import { axeConfig } from '../setup-a11y';

expect.extend(toHaveNoViolations);

/**
 * Check accessibility violations using axe-core
 *
 * @example
 * const { container } = render(<Button>Click me</Button>);
 * await checkA11y(container);
 */
export async function checkA11y(container: RenderResult['container']) {
  const results = await axe(container, axeConfig);
  expect(results).toHaveNoViolations();
}

/**
 * Check accessibility with custom rules
 *
 * @example
 * await checkA11yWithRules(container, ['color-contrast', 'button-name']);
 */
export async function checkA11yWithRules(
  container: RenderResult['container'],
  rules: string[]
) {
  const customConfig = {
    rules: rules.reduce((acc, rule) => ({
      ...acc,
      [rule]: { enabled: true }
    }), {})
  };

  const results = await axe(container, customConfig);
  expect(results).toHaveNoViolations();
}

/**
 * Check accessibility and return violations (for debugging)
 */
export async function getA11yViolations(container: RenderResult['container']) {
  const results = await axe(container, axeConfig);
  return results.violations;
}

/**
 * Assert element has proper ARIA attributes
 */
export function assertAriaAttributes(
  element: HTMLElement,
  attributes: Record<string, string | null>
) {
  Object.entries(attributes).forEach(([attr, value]) => {
    if (value === null) {
      expect(element).not.toHaveAttribute(attr);
    } else {
      expect(element).toHaveAttribute(attr, value);
    }
  });
}

/**
 * Assert element is keyboard accessible
 */
export function assertKeyboardAccessible(element: HTMLElement) {
  // Must be focusable
  expect(element.tabIndex).toBeGreaterThanOrEqual(0);

  // Must have a role or be a native interactive element
  const interactiveElements = ['button', 'a', 'input', 'select', 'textarea'];
  const tagName = element.tagName.toLowerCase();
  const hasRole = element.hasAttribute('role');

  expect(
    interactiveElements.includes(tagName) || hasRole
  ).toBe(true);
}

/**
 * WCAG 2.1 AA color contrast checker
 *
 * @param foreground - Hex color (e.g., '#000000')
 * @param background - Hex color (e.g., '#FFFFFF')
 * @param fontSize - Font size in px
 * @param isBold - Whether text is bold
 * @returns Contrast ratio
 */
export function checkColorContrast(
  foreground: string,
  background: string,
  fontSize: number = 16,
  isBold: boolean = false
): { ratio: number; passes: boolean; level: 'AA' | 'AAA' | 'Fail' } {
  const ratio = calculateContrastRatio(foreground, background);

  // WCAG 2.1 thresholds
  const isLargeText = fontSize >= 18 || (fontSize >= 14 && isBold);
  const aaThreshold = isLargeText ? 3 : 4.5;
  const aaaThreshold = isLargeText ? 4.5 : 7;

  let level: 'AA' | 'AAA' | 'Fail' = 'Fail';
  if (ratio >= aaaThreshold) level = 'AAA';
  else if (ratio >= aaThreshold) level = 'AA';

  return {
    ratio: Math.round(ratio * 100) / 100,
    passes: ratio >= aaThreshold,
    level
  };
}

/**
 * Calculate contrast ratio between two colors
 */
function calculateContrastRatio(color1: string, color2: string): number {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Get relative luminance of a color
 */
function getRelativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  const [r, g, b] = rgb.map(val => {
    const v = val / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ]
    : [0, 0, 0];
}
