/**
 * Animation Tokens System
 *
 * Centralized animation design tokens for consistent motion design across the application.
 * Integrates with CSS variables and Framer Motion for unified animation system.
 *
 * @usage
 * ```tsx
 * import { animationTokens, createMotionVariants } from '@/components/motion/AnimationTokens';
 *
 * // CSS approach
 * <div style={{ transition: animationTokens.transition.normal }}>
 *
 * // Framer Motion approach
 * <motion.div variants={createMotionVariants('slideUp')} initial="hidden" animate="visible">
 * ```
 *
 * Performance: All animations optimized for 60fps
 * Accessibility: Respects prefers-reduced-motion
 */

import type { Transition, Variants } from 'framer-motion';

// ==================== DURATION TOKENS ====================
export const duration = {
  instant: 0,
  fast: 150,
  normal: 250,
  slow: 350,
  slower: 500,
  slowest: 750,
} as const;

// ==================== EASING TOKENS ====================
export const easing = {
  // Standard easings
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],

  // Custom easings
  bounce: [0.68, -0.55, 0.265, 1.55],
  sharp: [0.4, 0, 0.6, 1],
  smooth: [0.4, 0, 0.2, 1],
  emphasized: [0.05, 0.7, 0.1, 1],
  expressive: [0.34, 1.56, 0.64, 1],

  // Spring presets (for Framer Motion)
  spring: { type: 'spring', stiffness: 300, damping: 25 },
  springBouncy: { type: 'spring', stiffness: 400, damping: 15 },
  springGentle: { type: 'spring', stiffness: 200, damping: 30 },
} as const;

// ==================== TRANSITION TOKENS ====================
export const transition = {
  // CSS transitions
  instant: `all ${duration.instant}ms cubic-bezier(${easing.linear.join(',')})`,
  fast: `all ${duration.fast}ms cubic-bezier(${easing.smooth.join(',')})`,
  normal: `all ${duration.normal}ms cubic-bezier(${easing.smooth.join(',')})`,
  slow: `all ${duration.slow}ms cubic-bezier(${easing.emphasized.join(',')})`,
  slower: `all ${duration.slower}ms cubic-bezier(${easing.emphasized.join(',')})`,

  // Property-specific
  color: `color ${duration.fast}ms cubic-bezier(${easing.smooth.join(',')})`,
  opacity: `opacity ${duration.normal}ms cubic-bezier(${easing.smooth.join(',')})`,
  transform: `transform ${duration.normal}ms cubic-bezier(${easing.smooth.join(',')})`,
  background: `background-color ${duration.fast}ms cubic-bezier(${easing.smooth.join(',')})`,

  // Framer Motion transitions
  motion: {
    fast: { duration: duration.fast / 1000, ease: easing.smooth },
    normal: { duration: duration.normal / 1000, ease: easing.smooth },
    slow: { duration: duration.slow / 1000, ease: easing.emphasized },
    spring: easing.spring,
    springBouncy: easing.springBouncy,
    springGentle: easing.springGentle,
  } as Record<string, Transition>,
} as const;

// ==================== ANIMATION PRESETS ====================
export const animations = {
  // Fade
  fadeIn: {
    opacity: 0,
    to: { opacity: 1 },
  },
  fadeOut: {
    opacity: 1,
    to: { opacity: 0 },
  },

  // Slide
  slideUp: {
    y: 20,
    opacity: 0,
    to: { y: 0, opacity: 1 },
  },
  slideDown: {
    y: -20,
    opacity: 0,
    to: { y: 0, opacity: 1 },
  },
  slideLeft: {
    x: 20,
    opacity: 0,
    to: { x: 0, opacity: 1 },
  },
  slideRight: {
    x: -20,
    opacity: 0,
    to: { x: 0, opacity: 1 },
  },

  // Scale
  scaleIn: {
    scale: 0.9,
    opacity: 0,
    to: { scale: 1, opacity: 1 },
  },
  scaleOut: {
    scale: 1,
    to: { scale: 0.9, opacity: 0 },
  },

  // Zoom
  zoomIn: {
    scale: 0,
    to: { scale: 1 },
  },
  zoomOut: {
    scale: 1,
    to: { scale: 0 },
  },

  // Rotate
  rotateIn: {
    rotate: -180,
    opacity: 0,
    to: { rotate: 0, opacity: 1 },
  },
  rotateOut: {
    rotate: 0,
    to: { rotate: 180, opacity: 0 },
  },

  // Bounce
  bounceIn: {
    scale: 0.3,
    opacity: 0,
    to: { scale: 1, opacity: 1 },
  },

  // Flip
  flipIn: {
    rotateX: -90,
    opacity: 0,
    to: { rotateX: 0, opacity: 1 },
  },
} as const;

// ==================== VARIANT CREATORS ====================

/**
 * Create Framer Motion variants from animation presets
 * @param animationKey - Animation preset name
 * @param transitionType - Transition type (default: 'normal')
 */
export function createMotionVariants(
  animationKey: keyof typeof animations,
  transitionType: keyof typeof transition.motion = 'normal'
): Variants {
  const anim = animations[animationKey];
  const trans = transition.motion[transitionType];

  return {
    hidden: {
      ...anim,
      opacity: anim.opacity ?? 0,
    },
    visible: {
      ...anim.to,
      opacity: 1,
      transition: trans,
    },
    exit: {
      ...anim,
      opacity: 0,
      transition: trans,
    },
  };
}

/**
 * Create stagger container variants for child animations
 * @param staggerDelay - Delay between each child (default: 0.05s)
 */
export function createStaggerVariants(staggerDelay = 0.05): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: staggerDelay,
        staggerDirection: -1,
      },
    },
  };
}

/**
 * Create hover/tap interaction variants
 */
export function createInteractionVariants(config?: {
  scale?: number;
  rotate?: number;
  y?: number;
}): Record<string, any> {
  const { scale = 1.05, rotate = 0, y = 0 } = config || {};

  return {
    initial: { scale: 1, rotate: 0, y: 0 },
    hover: { scale, rotate, y: y || -2, transition: transition.motion.fast },
    tap: { scale: 0.95, transition: transition.motion.fast },
  };
}

// ==================== CSS ANIMATION KEYFRAMES ====================
export const keyframes = {
  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `,
  spin: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,
  bounce: `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `,
  shake: `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
  `,
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  slideInUp: `
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
} as const;

// ==================== REDUCED MOTION ====================

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get transition duration respecting user preferences
 * @param durationMs - Desired duration in milliseconds
 */
export function getAccessibleDuration(durationMs: number): number {
  return prefersReducedMotion() ? 0 : durationMs;
}

/**
 * Get transition respecting user preferences
 * @param transitionKey - Transition token key
 */
export function getAccessibleTransition(
  transitionKey: keyof typeof transition
): string {
  return prefersReducedMotion() ? 'none' : (transition[transitionKey] as string);
}

// ==================== EXPORTS ====================
export const animationTokens = {
  duration,
  easing,
  transition,
  animations,
  keyframes,
};

export default animationTokens;
