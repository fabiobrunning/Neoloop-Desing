/**
 * Easing Presets
 *
 * Comprehensive collection of easing functions and cubic-bezier curves
 * for consistent motion design. Includes Material Design, iOS, and custom easings.
 *
 * @usage
 * ```tsx
 * import { easingPresets } from '@/components/motion/EasingPresets';
 *
 * // CSS
 * transition: `all 0.3s ${easingPresets.css.emphasized}`;
 *
 * // Framer Motion
 * transition={{ ease: easingPresets.framer.emphasized }}
 * ```
 */

import type { Transition } from 'framer-motion';

// ==================== CUBIC BEZIER VALUES ====================

/**
 * Standard CSS easing curves
 */
export const standardEasing = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
} as const;

/**
 * Material Design Motion curves
 * @see https://m3.material.io/styles/motion/easing-and-duration
 */
export const materialEasing = {
  standard: [0.4, 0, 0.2, 1],
  emphasized: [0.05, 0.7, 0.1, 1],
  decelerated: [0, 0, 0.2, 1],
  accelerated: [0.4, 0, 1, 1],
  legacy: [0.4, 0, 0.6, 1],
} as const;

/**
 * iOS/Apple motion curves
 */
export const appleEasing = {
  spring: [0.5, 1.25, 0.75, 1.25],
  smooth: [0.25, 0.46, 0.45, 0.94],
  quick: [0.4, 0, 0.6, 1],
  gentle: [0.25, 0.1, 0.25, 1],
} as const;

/**
 * Custom expressive curves
 */
export const customEasing = {
  // Bouncy
  bounce: [0.68, -0.55, 0.265, 1.55],
  bounceSoft: [0.34, 1.56, 0.64, 1],
  bounceHard: [0.87, -0.41, 0.19, 1.44],

  // Sharp
  sharp: [0.4, 0, 0.6, 1],
  sharpIn: [0.9, 0, 0.8, 0.2],
  sharpOut: [0.2, 0.8, 0.1, 1],

  // Smooth
  smooth: [0.4, 0, 0.2, 1],
  smoothIn: [0.8, 0, 0.6, 0.2],
  smoothOut: [0.4, 0.8, 0.2, 1],

  // Expressive
  expressive: [0.34, 1.56, 0.64, 1],
  snappy: [0.76, 0, 0.24, 1],
  elastic: [0.68, -0.55, 0.27, 1.55],

  // Anticipate
  anticipate: [0.36, 0, 0.66, -0.56],
  overshoot: [0.34, 1.56, 0.64, 1],
} as const;

/**
 * Sine-based curves (natural motion)
 */
export const sineEasing = {
  in: [0.47, 0, 0.745, 0.715],
  out: [0.39, 0.575, 0.565, 1],
  inOut: [0.445, 0.05, 0.55, 0.95],
} as const;

/**
 * Quadratic curves (subtle acceleration)
 */
export const quadEasing = {
  in: [0.55, 0.085, 0.68, 0.53],
  out: [0.25, 0.46, 0.45, 0.94],
  inOut: [0.455, 0.03, 0.515, 0.955],
} as const;

/**
 * Cubic curves (moderate acceleration)
 */
export const cubicEasing = {
  in: [0.55, 0.055, 0.675, 0.19],
  out: [0.215, 0.61, 0.355, 1],
  inOut: [0.645, 0.045, 0.355, 1],
} as const;

/**
 * Quartic curves (strong acceleration)
 */
export const quarticEasing = {
  in: [0.895, 0.03, 0.685, 0.22],
  out: [0.165, 0.84, 0.44, 1],
  inOut: [0.77, 0, 0.175, 1],
} as const;

/**
 * Quintic curves (very strong acceleration)
 */
export const quinticEasing = {
  in: [0.755, 0.05, 0.855, 0.06],
  out: [0.23, 1, 0.32, 1],
  inOut: [0.86, 0, 0.07, 1],
} as const;

/**
 * Exponential curves (dramatic acceleration)
 */
export const expoEasing = {
  in: [0.95, 0.05, 0.795, 0.035],
  out: [0.19, 1, 0.22, 1],
  inOut: [1, 0, 0, 1],
} as const;

/**
 * Circular curves (smooth circular motion)
 */
export const circEasing = {
  in: [0.6, 0.04, 0.98, 0.335],
  out: [0.075, 0.82, 0.165, 1],
  inOut: [0.785, 0.135, 0.15, 0.86],
} as const;

/**
 * Back curves (slight overshoot)
 */
export const backEasing = {
  in: [0.6, -0.28, 0.735, 0.045],
  out: [0.175, 0.885, 0.32, 1.275],
  inOut: [0.68, -0.55, 0.265, 1.55],
} as const;

// ==================== CSS FORMATTED EASINGS ====================

function formatCubicBezier(values: readonly number[]): string {
  return `cubic-bezier(${values.join(', ')})`;
}

export const cssEasings = {
  // Standard
  linear: formatCubicBezier(standardEasing.linear),
  ease: formatCubicBezier(standardEasing.ease),
  easeIn: formatCubicBezier(standardEasing.easeIn),
  easeOut: formatCubicBezier(standardEasing.easeOut),
  easeInOut: formatCubicBezier(standardEasing.easeInOut),

  // Material Design
  standard: formatCubicBezier(materialEasing.standard),
  emphasized: formatCubicBezier(materialEasing.emphasized),
  decelerated: formatCubicBezier(materialEasing.decelerated),
  accelerated: formatCubicBezier(materialEasing.accelerated),

  // Custom
  bounce: formatCubicBezier(customEasing.bounce),
  sharp: formatCubicBezier(customEasing.sharp),
  smooth: formatCubicBezier(customEasing.smooth),
  expressive: formatCubicBezier(customEasing.expressive),
  snappy: formatCubicBezier(customEasing.snappy),
  elastic: formatCubicBezier(customEasing.elastic),
} as const;

// ==================== FRAMER MOTION EASINGS ====================

export const framerEasings = {
  // Array format (cubic-bezier)
  standard: materialEasing.standard,
  emphasized: materialEasing.emphasized,
  smooth: customEasing.smooth,
  bounce: customEasing.bounce,
  sharp: customEasing.sharp,
  expressive: customEasing.expressive,

  // Spring configurations
  spring: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 25,
  },
  springBouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 15,
  },
  springGentle: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 30,
  },
  springSnappy: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 20,
  },
} as const;

// ==================== DURATION PRESETS ====================

export const durations = {
  instant: 0,
  fast: 150,
  normal: 250,
  moderate: 350,
  slow: 500,
  slower: 750,
  slowest: 1000,
} as const;

// ==================== COMBINED PRESETS ====================

/**
 * Complete easing presets for different use cases
 */
export const easingPresets = {
  // Raw cubic-bezier values
  raw: {
    standard: standardEasing,
    material: materialEasing,
    apple: appleEasing,
    custom: customEasing,
    sine: sineEasing,
    quad: quadEasing,
    cubic: cubicEasing,
    quartic: quarticEasing,
    quintic: quinticEasing,
    expo: expoEasing,
    circ: circEasing,
    back: backEasing,
  },

  // CSS formatted
  css: cssEasings,

  // Framer Motion
  framer: framerEasings,

  // Durations
  duration: durations,
} as const;

// ==================== HELPER FUNCTIONS ====================

/**
 * Create a CSS transition with easing and duration
 * @param property - CSS property to transition
 * @param duration - Duration in ms (default: 250)
 * @param easing - Easing curve name (default: 'standard')
 */
export function createCSSTransition(
  property: string = 'all',
  duration: number = durations.normal,
  easing: keyof typeof cssEasings = 'standard'
): string {
  return `${property} ${duration}ms ${cssEasings[easing]}`;
}

/**
 * Create a Framer Motion transition config
 * @param duration - Duration in seconds (default: 0.25)
 * @param easing - Easing curve (default: 'standard')
 */
export function createFramerTransition(
  duration: number = durations.normal / 1000,
  easing: keyof typeof framerEasings = 'standard'
): Transition {
  const easingValue = framerEasings[easing];

  if (typeof easingValue === 'object' && 'type' in easingValue) {
    return easingValue as Transition;
  }

  return {
    duration,
    ease: easingValue as number[],
  };
}

/**
 * Get recommended easing for animation type
 * @param type - Animation type
 */
export function getRecommendedEasing(
  type: 'enter' | 'exit' | 'move' | 'emphasis' | 'subtle'
): keyof typeof cssEasings {
  const recommendations = {
    enter: 'decelerated' as const,
    exit: 'accelerated' as const,
    move: 'standard' as const,
    emphasis: 'emphasized' as const,
    subtle: 'smooth' as const,
  };

  return recommendations[type];
}

// ==================== VISUALIZATION DATA ====================

/**
 * Easing curve data for visualization tools
 * Each curve provides 100 sample points for smooth rendering
 */
export function getEasingCurvePoints(
  easing: readonly number[],
  steps: number = 100
): Array<{ x: number; y: number }> {
  const [x1, y1, x2, y2] = easing;
  const points: Array<{ x: number; y: number }> = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;

    // Cubic Bezier calculation
    const x = 3 * (1 - t) ** 2 * t * x1 + 3 * (1 - t) * t ** 2 * x2 + t ** 3;
    const y = 3 * (1 - t) ** 2 * t * y1 + 3 * (1 - t) * t ** 2 * y2 + t ** 3;

    points.push({ x, y });
  }

  return points;
}

export default easingPresets;
