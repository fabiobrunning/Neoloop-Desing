# Phase 4: Animation Architecture
**Project:** Neoloop Design System Builder
**Phase:** 4 - Polish & Performance
**Date:** 2026-01-31
**Architect:** @architect
**Status:** Specification

---

## TABLE OF CONTENTS

1. [Animation Strategy Overview](#1-animation-strategy-overview)
2. [Framer Motion Integration](#2-framer-motion-integration)
3. [CSS vs JS Animation Decision Matrix](#3-css-vs-js-animation-decision-matrix)
4. [GPU-Accelerated Properties](#4-gpu-accelerated-properties)
5. [Animation Patterns Library](#5-animation-patterns-library)
6. [Performance Optimization](#6-performance-optimization)
7. [Accessibility Considerations](#7-accessibility-considerations)

---

## 1. ANIMATION STRATEGY OVERVIEW

### 1.1 Animation Hierarchy

```
Animation System
├── Micro-interactions (0-200ms)
│   ├── Button hover/press states
│   ├── Input focus states
│   ├── Toggle switches
│   └── Checkbox/radio selections
│
├── Transitions (200-400ms)
│   ├── Modal open/close
│   ├── Dropdown expand/collapse
│   ├── Tab switching
│   └── Toast notifications
│
├── Page Transitions (300-500ms)
│   ├── Route changes
│   ├── View slides
│   └── Wizard steps
│
└── Complex Animations (500ms+)
    ├── Loading sequences
    ├── Success celebrations
    └── Tutorial walkthroughs
```

### 1.2 Performance Budget

| Animation Type | Max Duration | Frame Rate | Implementation |
|---------------|--------------|------------|----------------|
| **Micro** | 200ms | 60fps | CSS preferred |
| **Transitions** | 400ms | 60fps | CSS or Framer |
| **Page** | 500ms | 60fps | Framer Motion |
| **Complex** | 1000ms | 60fps | Framer Motion |

### 1.3 Animation Tokens

```typescript
// src/tokens/animations.ts

export const animationTokens = {
  duration: {
    instant: '0ms',
    micro: '100ms',
    fast: '200ms',
    base: '300ms',
    slow: '400ms',
    slower: '500ms',
    slowest: '700ms',
  },

  easing: {
    // Standard easing
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

    // Custom easing
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',

    // Spring-like (for Framer Motion)
    spring: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
    springGentle: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
    springBouncy: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },

  // Presets for common animations
  presets: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
    },
    slideUp: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -20, opacity: 0 },
      transition: { duration: 0.3 },
    },
    slideDown: {
      initial: { y: -20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 20, opacity: 0 },
      transition: { duration: 0.3 },
    },
    scaleIn: {
      initial: { scale: 0.95, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.95, opacity: 0 },
      transition: { duration: 0.2 },
    },
    slideLeft: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '-100%' },
      transition: { duration: 0.3 },
    },
  },
} as const

export type AnimationPreset = keyof typeof animationTokens.presets
```

---

## 2. FRAMER MOTION INTEGRATION

### 2.1 Core Setup

```typescript
// src/lib/motion.ts

import { motion, AnimatePresence, MotionConfig } from 'framer-motion'

export { motion, AnimatePresence }

// Global motion configuration
export const motionConfig = {
  transition: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1],
  },
  reducedMotion: 'user', // Respect prefers-reduced-motion
}

// Wrapper component for app-wide config
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig {...motionConfig}>
      {children}
    </MotionConfig>
  )
}
```

### 2.2 Animation Hooks

```typescript
// src/hooks/useAnimation.ts

import { useReducedMotion } from 'framer-motion'
import { animationTokens } from '@/tokens/animations'

export function useAnimation() {
  const shouldReduceMotion = useReducedMotion()

  const getPreset = (presetName: AnimationPreset) => {
    if (shouldReduceMotion) {
      // Disable animations if user prefers reduced motion
      return {
        initial: {},
        animate: {},
        exit: {},
        transition: { duration: 0 },
      }
    }
    return animationTokens.presets[presetName]
  }

  const getDuration = (key: keyof typeof animationTokens.duration) => {
    if (shouldReduceMotion) return 0
    return parseInt(animationTokens.duration[key])
  }

  return {
    getPreset,
    getDuration,
    shouldReduceMotion,
  }
}
```

```typescript
// src/hooks/useStaggerAnimation.ts

import { Variants } from 'framer-motion'

export function useStaggerAnimation(staggerDelay = 0.05) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return { containerVariants, itemVariants }
}
```

### 2.3 Animated Components Library

```typescript
// src/components/animations/AnimatedCard.tsx

import { motion } from 'framer-motion'
import { Card, CardProps } from '@/components/primitives/cards/Card'
import { useAnimation } from '@/hooks/useAnimation'

interface AnimatedCardProps extends CardProps {
  animationPreset?: AnimationPreset
  delay?: number
}

export function AnimatedCard({
  children,
  animationPreset = 'fadeIn',
  delay = 0,
  ...props
}: AnimatedCardProps) {
  const { getPreset } = useAnimation()
  const preset = getPreset(animationPreset)

  return (
    <motion.div
      initial={preset.initial}
      animate={preset.animate}
      exit={preset.exit}
      transition={{ ...preset.transition, delay }}
    >
      <Card {...props}>{children}</Card>
    </motion.div>
  )
}
```

```typescript
// src/components/animations/FadeIn.tsx

import { motion, HTMLMotionProps } from 'framer-motion'
import { useAnimation } from '@/hooks/useAnimation'

interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number
  duration?: number
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.3,
  ...props
}: FadeInProps) {
  const { shouldReduceMotion } = useAnimation()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
```

```typescript
// src/components/animations/SlideIn.tsx

import { motion, HTMLMotionProps } from 'framer-motion'
import { useAnimation } from '@/hooks/useAnimation'

interface SlideInProps extends HTMLMotionProps<'div'> {
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  distance?: number
}

export function SlideIn({
  children,
  direction = 'up',
  delay = 0,
  distance = 20,
  ...props
}: SlideInProps) {
  const { shouldReduceMotion } = useAnimation()

  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }

  const initial = shouldReduceMotion
    ? {}
    : { ...directions[direction], opacity: 0 }

  return (
    <motion.div
      initial={initial}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.3,
        delay: shouldReduceMotion ? 0 : delay,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
```

---

## 3. CSS VS JS ANIMATION DECISION MATRIX

### 3.1 Decision Tree

```
Need Animation?
│
├─ Simple state change (hover, focus)?
│  └─ Use CSS Transitions
│
├─ Complex orchestration (multiple elements)?
│  └─ Use Framer Motion
│
├─ Physics-based (spring, bounce)?
│  └─ Use Framer Motion
│
├─ Gesture-based (drag, swipe)?
│  └─ Use Framer Motion
│
├─ Route/view transitions?
│  └─ Use Framer Motion + AnimatePresence
│
└─ Performance-critical (60fps required)?
   ├─ Transform/opacity only?
   │  └─ Use CSS Transitions
   └─ Complex properties?
      └─ Use Framer Motion (but optimize!)
```

### 3.2 CSS Animations (Preferred)

**Use CSS for:**
- Button hover states
- Input focus states
- Simple opacity/transform changes
- Loading spinners
- Pulse effects

```css
/* src/styles/animations.css */

/* Micro-interactions */
.button-hover {
  transition: background-color 150ms ease-out,
              transform 100ms ease-out;
}

.button-hover:hover {
  transform: translateY(-1px);
}

.button-hover:active {
  transform: translateY(0);
}

/* Loading states */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin 1s linear infinite;
  will-change: transform;
}

/* Pulse effect */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Skeleton loading */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3.3 Framer Motion Animations (Complex)

**Use Framer Motion for:**
- Page transitions
- Modal enter/exit
- List reordering
- Drag and drop
- Multi-step animations
- Gesture interactions

```typescript
// src/components/animations/PageTransition.tsx

import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const pageVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 20,
  },
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

---

## 4. GPU-ACCELERATED PROPERTIES

### 4.1 Safe Properties (GPU-Accelerated)

**ALWAYS use these for smooth 60fps:**

```typescript
// ✅ SAFE: These trigger GPU acceleration
const safeAnimations = {
  transform: {
    // 2D transforms
    translate: 'translateX(10px) translateY(20px)',
    scale: 'scale(1.2)',
    rotate: 'rotate(45deg)',

    // 3D transforms (enable GPU layer)
    translate3d: 'translate3d(10px, 20px, 0)',
    scale3d: 'scale3d(1.2, 1.2, 1)',
    rotate3d: 'rotate3d(0, 0, 1, 45deg)',
  },

  opacity: '0.5',

  // Composite properties
  filter: 'blur(5px)', // Modern browsers GPU-accelerate
  backdropFilter: 'blur(10px)',
}
```

### 4.2 Expensive Properties (CPU-Heavy)

**AVOID animating these (causes repaints/reflows):**

```typescript
// ❌ EXPENSIVE: Avoid animating these
const expensiveAnimations = {
  // Layout properties (trigger reflow)
  width: '200px',
  height: '100px',
  padding: '20px',
  margin: '10px',
  top: '50px',
  left: '100px',

  // Paint properties (trigger repaint)
  backgroundColor: '#ff0000',
  borderColor: '#00ff00',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',

  // Text properties
  fontSize: '16px',
  lineHeight: '1.5',
}
```

### 4.3 Force GPU Acceleration

```css
/* Force GPU layer creation */
.gpu-accelerated {
  /* Method 1: Use transform */
  transform: translateZ(0);

  /* Method 2: Use will-change (sparingly!) */
  will-change: transform, opacity;

  /* Method 3: Use 3D transform */
  transform: translate3d(0, 0, 0);
}

/* Only use will-change when animating is imminent */
.button:hover {
  will-change: transform;
}

.button:not(:hover) {
  will-change: auto; /* Remove after animation */
}
```

### 4.4 Performance Checklist

```typescript
// src/utils/animation-performance.ts

export const animationPerformanceChecklist = {
  // ✅ DO
  goodPractices: [
    'Use transform and opacity only',
    'Add will-change before animation starts',
    'Remove will-change after animation ends',
    'Use CSS for simple animations',
    'Batch DOM reads/writes',
    'Use requestAnimationFrame for JS animations',
    'Respect prefers-reduced-motion',
    'Limit concurrent animations (max 3-5)',
    'Use passive event listeners',
  ],

  // ❌ DON'T
  badPractices: [
    'Animate width/height/top/left',
    'Animate box-shadow (use filter: drop-shadow instead)',
    'Leave will-change always on',
    'Animate many elements at once',
    'Force synchronous layout (read then write)',
    'Use setInterval for animations',
    'Ignore reduced motion preferences',
  ],
}
```

---

## 5. ANIMATION PATTERNS LIBRARY

### 5.1 Modal Animations

```typescript
// src/components/overlays/AnimatedModal.tsx

import { motion, AnimatePresence } from 'framer-motion'
import { Modal, ModalProps } from '@/components/primitives/overlays/Modal'

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
}

export function AnimatedModal({
  isOpen,
  onClose,
  children,
  ...props
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-modal-backdrop"
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="fixed inset-0 z-modal flex items-center justify-center p-4"
          >
            <Modal isOpen={isOpen} onClose={onClose} {...props}>
              {children}
            </Modal>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

### 5.2 List Animations (Stagger)

```typescript
// src/components/animations/AnimatedList.tsx

import { motion } from 'framer-motion'
import { useStaggerAnimation } from '@/hooks/useStaggerAnimation'

interface AnimatedListProps {
  children: React.ReactNode[]
  staggerDelay?: number
}

export function AnimatedList({
  children,
  staggerDelay = 0.05
}: AnimatedListProps) {
  const { containerVariants, itemVariants } = useStaggerAnimation(staggerDelay)

  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children.map((child, index) => (
        <motion.li key={index} variants={itemVariants}>
          {child}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

### 5.3 Drawer Slide-In

```typescript
// src/components/overlays/AnimatedDrawer.tsx

import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedDrawerProps {
  isOpen: boolean
  onClose: () => void
  side?: 'left' | 'right'
  children: React.ReactNode
}

export function AnimatedDrawer({
  isOpen,
  onClose,
  side = 'right',
  children
}: AnimatedDrawerProps) {
  const slideVariants = {
    hidden: { x: side === 'right' ? '100%' : '-100%' },
    visible: { x: 0 },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-modal-backdrop"
          />

          {/* Drawer */}
          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className={`fixed top-0 ${side}-0 bottom-0 w-80 bg-white shadow-2xl z-modal`}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

### 5.4 Toast Notifications

```typescript
// src/components/feedback/AnimatedToast.tsx

import { motion, AnimatePresence } from 'framer-motion'
import { Toast, ToastProps } from '@/components/primitives/feedback/Toast'

const toastVariants = {
  hidden: {
    opacity: 0,
    y: -50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
}

export function AnimatedToast({ isVisible, ...props }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={toastVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
          layout
        >
          <Toast {...props} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

### 5.5 Button Press Animation

```typescript
// src/components/primitives/buttons/AnimatedButton.tsx

import { motion } from 'framer-motion'
import { Button, ButtonProps } from './Button'

export function AnimatedButton({ children, ...props }: ButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  )
}
```

---

## 6. PERFORMANCE OPTIMIZATION

### 6.1 Animation Performance Monitoring

```typescript
// src/utils/performance-monitor.ts

export class AnimationPerformanceMonitor {
  private fpsHistory: number[] = []
  private frameCount = 0
  private lastTime = performance.now()

  startMonitoring() {
    const measureFPS = () => {
      const currentTime = performance.now()
      const deltaTime = currentTime - this.lastTime

      if (deltaTime >= 1000) {
        const fps = Math.round((this.frameCount * 1000) / deltaTime)
        this.fpsHistory.push(fps)

        // Keep only last 60 samples
        if (this.fpsHistory.length > 60) {
          this.fpsHistory.shift()
        }

        // Warn if FPS drops below 55
        if (fps < 55) {
          console.warn(`⚠️ Low FPS detected: ${fps}fps`)
        }

        this.frameCount = 0
        this.lastTime = currentTime
      }

      this.frameCount++
      requestAnimationFrame(measureFPS)
    }

    requestAnimationFrame(measureFPS)
  }

  getAverageFPS(): number {
    if (this.fpsHistory.length === 0) return 0
    const sum = this.fpsHistory.reduce((a, b) => a + b, 0)
    return Math.round(sum / this.fpsHistory.length)
  }

  getMinFPS(): number {
    return Math.min(...this.fpsHistory)
  }
}

// Usage in development
if (import.meta.env.DEV) {
  const monitor = new AnimationPerformanceMonitor()
  monitor.startMonitoring()

  setInterval(() => {
    console.log(`FPS - Avg: ${monitor.getAverageFPS()}, Min: ${monitor.getMinFPS()}`)
  }, 5000)
}
```

### 6.2 Lazy Animation Loading

```typescript
// src/components/animations/LazyAnimation.tsx

import { lazy, Suspense } from 'react'
import { useInView } from 'react-intersection-observer'

// Lazy load Framer Motion for animations
const MotionDiv = lazy(() =>
  import('framer-motion').then(mod => ({ default: mod.motion.div }))
)

interface LazyAnimationProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function LazyAnimation({ children, fallback }: LazyAnimationProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={fallback || <div>{children}</div>}>
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </MotionDiv>
        </Suspense>
      ) : (
        fallback || <div>{children}</div>
      )}
    </div>
  )
}
```

### 6.3 Animation Batching

```typescript
// src/utils/animation-batch.ts

export class AnimationBatcher {
  private pendingAnimations: Array<() => void> = []
  private rafId: number | null = null

  schedule(animation: () => void) {
    this.pendingAnimations.push(animation)

    if (!this.rafId) {
      this.rafId = requestAnimationFrame(() => {
        this.flush()
      })
    }
  }

  private flush() {
    const animations = this.pendingAnimations.slice()
    this.pendingAnimations = []
    this.rafId = null

    animations.forEach(animation => animation())
  }
}

// Global instance
export const animationBatcher = new AnimationBatcher()

// Usage
animationBatcher.schedule(() => {
  element.style.transform = 'translateX(100px)'
})
```

### 6.4 Performance Budget Enforcement

```typescript
// src/utils/animation-budget.ts

export const animationPerformanceBudget = {
  // Max concurrent animations
  maxConcurrentAnimations: 5,

  // Max animation duration
  maxDuration: 1000, // 1 second

  // Min FPS threshold
  minFPS: 55,

  // Max animation file size
  maxFramerMotionBundleSize: 50 * 1024, // 50 KB
}

// Validation during build
export function validateAnimationPerformance() {
  // This would be run in CI/CD
  const warnings: string[] = []

  // Check bundle size
  // Check animation durations
  // Check FPS in automated tests

  if (warnings.length > 0) {
    console.warn('Animation performance warnings:', warnings)
  }
}
```

---

## 7. ACCESSIBILITY CONSIDERATIONS

### 7.1 Reduced Motion Support

```typescript
// src/hooks/useReducedMotion.ts

import { useEffect, useState } from 'react'

export function useReducedMotion() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    setShouldReduceMotion(mediaQuery.matches)

    const handleChange = () => {
      setShouldReduceMotion(mediaQuery.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return shouldReduceMotion
}
```

### 7.2 Focus Management During Animations

```typescript
// src/components/animations/FocusAnimation.tsx

import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'

interface FocusAnimationProps {
  children: React.ReactNode
  shouldFocus?: boolean
}

export function FocusAnimation({
  children,
  shouldFocus = false
}: FocusAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (shouldFocus && ref.current) {
      // Focus after animation completes
      const timeout = setTimeout(() => {
        ref.current?.focus()
      }, 300) // Match animation duration

      return () => clearTimeout(timeout)
    }
  }, [shouldFocus])

  return (
    <motion.div
      ref={ref}
      tabIndex={shouldFocus ? 0 : -1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

### 7.3 Screen Reader Announcements

```typescript
// src/utils/announce.ts

export function announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcer = document.createElement('div')
  announcer.setAttribute('role', 'status')
  announcer.setAttribute('aria-live', priority)
  announcer.setAttribute('aria-atomic', 'true')
  announcer.className = 'sr-only'
  announcer.textContent = message

  document.body.appendChild(announcer)

  setTimeout(() => {
    document.body.removeChild(announcer)
  }, 1000)
}

// Usage with animations
export function AnimatedNotification({ message }: { message: string }) {
  useEffect(() => {
    announce(`Notification: ${message}`)
  }, [message])

  return (
    <AnimatedToast>
      {message}
    </AnimatedToast>
  )
}
```

---

## PERFORMANCE TARGETS

### Animation-Specific Metrics

| Metric | Target | Critical | Measurement |
|--------|--------|----------|-------------|
| **Average FPS** | 60fps | Yes | Chrome DevTools Performance |
| **Min FPS** | 55fps | Yes | Never drop below |
| **Animation duration** | < 500ms | No | Average page transition |
| **Jank events** | 0 | Yes | No dropped frames |
| **Bundle impact** | < 50KB | No | Framer Motion gzipped |

### Testing Strategy

```typescript
// vitest.config.ts - Animation testing

export default defineConfig({
  test: {
    // ... existing config

    // Animation-specific tests
    testTimeout: 10000, // Longer for animation tests

    // Performance tests
    benchmark: {
      include: ['**/*.bench.ts'],
    },
  },
})
```

---

**Status:** Complete Specification
**Next:** Navigation Architecture
**Review:** After implementation
