# Phase 4: Performance Optimization Guide
**Project:** Neoloop Design System Builder
**Phase:** 4 - Polish & Performance
**Date:** 2026-01-31
**Architect:** @architect
**Status:** Specification

---

## TABLE OF CONTENTS

1. [Performance Strategy](#1-performance-strategy)
2. [Bundle Size Optimization](#2-bundle-size-optimization)
3. [Runtime Performance](#3-runtime-performance)
4. [Animation Performance](#4-animation-performance)
5. [Memory Management](#5-memory-management)
6. [Network Performance](#6-network-performance)
7. [Monitoring & Metrics](#7-monitoring--metrics)

---

## 1. PERFORMANCE STRATEGY

### 1.1 Performance Budget

```typescript
// src/performance/budget.ts

export const performanceBudget = {
  // Bundle sizes (gzipped)
  bundles: {
    initial: 180 * 1024, // 180 KB
    vendor: 100 * 1024, // 100 KB (React + deps)
    route: 50 * 1024, // 50 KB per route chunk
    component: 20 * 1024, // 20 KB per component chunk
  },

  // Loading times
  loading: {
    fcp: 1500, // First Contentful Paint (ms)
    lcp: 2500, // Largest Contentful Paint (ms)
    tti: 3500, // Time to Interactive (ms)
    fid: 100, // First Input Delay (ms)
    cls: 0.1, // Cumulative Layout Shift
  },

  // Runtime metrics
  runtime: {
    fps: 60, // Target frame rate
    minFps: 55, // Minimum acceptable FPS
    animationDuration: 500, // Max animation duration (ms)
    debounceDelay: 300, // Input debounce delay (ms)
    throttleDelay: 100, // Scroll throttle delay (ms)
  },

  // Memory
  memory: {
    maxHeapSize: 50 * 1024 * 1024, // 50 MB max heap
    maxComponentCache: 100, // Max cached components
  },
}
```

### 1.2 Performance Checklist

```typescript
// src/performance/checklist.ts

export const performanceChecklist = {
  // Build-time optimizations
  build: [
    'Enable tree-shaking',
    'Code splitting by route',
    'Lazy load components',
    'Minify and compress assets',
    'Remove unused CSS',
    'Optimize images (WebP, AVIF)',
    'Enable Vite build optimizations',
  ],

  // Runtime optimizations
  runtime: [
    'Use React.memo for expensive components',
    'Implement virtualization for long lists',
    'Debounce/throttle event handlers',
    'Use CSS animations over JS where possible',
    'Avoid forced synchronous layouts',
    'Use requestAnimationFrame for animations',
    'Implement proper cleanup in useEffect',
  ],

  // Network optimizations
  network: [
    'Enable HTTP/2',
    'Use CDN for static assets',
    'Implement resource hints (preload, prefetch)',
    'Use service workers for caching',
    'Optimize font loading (font-display: swap)',
    'Lazy load images below the fold',
  ],

  // Memory optimizations
  memory: [
    'Clean up event listeners',
    'Clear timers and intervals',
    'Dispose of large objects',
    'Use WeakMap for caching',
    'Avoid memory leaks in closures',
  ],
}
```

---

## 2. BUNDLE SIZE OPTIMIZATION

### 2.1 Code Splitting Strategy

```typescript
// vite.config.ts

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-motion': ['framer-motion'],

          // Feature chunks
          'builder-colors': [
            './src/pages/builder/Colors',
            './src/components/views/ColorSelector',
          ],
          'builder-typography': [
            './src/pages/builder/Typography',
            './src/components/views/TypographySelector',
          ],
          'builder-icons': [
            './src/pages/builder/Icons',
            './src/components/views/IconSelector',
          ],
        },
      },
    },

    // Optimize chunk size
    chunkSizeWarningLimit: 500, // KB
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
  },
})
```

### 2.2 Tree Shaking

```typescript
// src/utils/icons.ts

// ❌ BAD: Imports entire library
import * as Icons from 'lucide-react'

// ✅ GOOD: Import only what you need
import { Search, Settings, User } from 'lucide-react'

// Re-export specific icons
export { Search, Settings, User }
```

```typescript
// src/tokens/index.ts

// ❌ BAD: Barrel export that prevents tree-shaking
export * from './colors'
export * from './typography'
export * from './spacing'

// ✅ GOOD: Named exports only
export { colorTokens } from './colors'
export { typographyTokens } from './typography'
export { spacingTokens } from './spacing'
```

### 2.3 Dynamic Imports

```typescript
// src/components/builder/ColorPicker.tsx

import { lazy, Suspense } from 'react'

// Lazy load heavy components
const AdvancedColorPicker = lazy(() =>
  import('./AdvancedColorPicker').then((module) => ({
    default: module.AdvancedColorPicker,
  }))
)

export function ColorPicker() {
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div>
      <BasicColorPicker />

      {showAdvanced && (
        <Suspense fallback={<Skeleton />}>
          <AdvancedColorPicker />
        </Suspense>
      )}
    </div>
  )
}
```

### 2.4 Bundle Analysis

```bash
# Install bundle analyzer
npm install --save-dev rollup-plugin-visualizer

# vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
})

# Build and analyze
npm run build
```

---

## 3. RUNTIME PERFORMANCE

### 3.1 React Optimization

```typescript
// src/components/optimized/MemoizedComponent.tsx

import { memo } from 'react'

// ❌ BAD: Re-renders on every parent render
export function ExpensiveComponent({ data }: Props) {
  const processedData = expensiveCalculation(data)
  return <div>{processedData}</div>
}

// ✅ GOOD: Only re-renders when props change
export const OptimizedComponent = memo(
  function OptimizedComponent({ data }: Props) {
    const processedData = expensiveCalculation(data)
    return <div>{processedData}</div>
  },
  (prevProps, nextProps) => {
    // Custom comparison
    return prevProps.data.id === nextProps.data.id
  }
)
```

```typescript
// src/hooks/useMemoizedValue.ts

import { useMemo } from 'react'

export function ColorPalette({ colors }: { colors: Color[] }) {
  // ❌ BAD: Recalculates on every render
  const sortedColors = colors.sort((a, b) => a.tone - b.tone)

  // ✅ GOOD: Only recalculates when colors change
  const sortedColors = useMemo(() => {
    return colors.sort((a, b) => a.tone - b.tone)
  }, [colors])

  return <div>{/* render colors */}</div>
}
```

```typescript
// src/hooks/useCallbackOptimization.ts

import { useCallback } from 'react'

export function ParentComponent() {
  // ❌ BAD: New function on every render
  const handleClick = () => {
    console.log('clicked')
  }

  // ✅ GOOD: Stable function reference
  const handleClick = useCallback(() => {
    console.log('clicked')
  }, [])

  return <ChildComponent onClick={handleClick} />
}
```

### 3.2 Virtualization

```typescript
// src/components/optimized/VirtualList.tsx

import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

interface VirtualListProps {
  items: any[]
  renderItem: (item: any, index: number) => React.ReactNode
  itemHeight: number
}

export function VirtualList({ items, renderItem, itemHeight }: VirtualListProps) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: 5, // Render 5 extra items above/below viewport
  })

  return (
    <div
      ref={parentRef}
      className="h-[600px] overflow-auto"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {renderItem(items[virtualItem.index], virtualItem.index)}
          </div>
        ))}
      </div>
    </div>
  )
}

// Usage:
<VirtualList
  items={colorTokens} // 1000+ items
  itemHeight={60}
  renderItem={(color) => <ColorCard color={color} />}
/>
```

### 3.3 Debounce & Throttle

```typescript
// src/hooks/useDebounce.ts

import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

// Usage:
export function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    // Only runs 500ms after user stops typing
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm])

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )
}
```

```typescript
// src/hooks/useThrottle.ts

import { useEffect, useRef, useState } from 'react'

export function useThrottle<T>(value: T, delay: number = 100): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastRan = useRef(Date.now())

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= delay) {
        setThrottledValue(value)
        lastRan.current = Date.now()
      }
    }, delay - (Date.now() - lastRan.current))

    return () => clearTimeout(handler)
  }, [value, delay])

  return throttledValue
}

// Usage for scroll events:
export function ScrollHandler() {
  const [scrollY, setScrollY] = useState(0)
  const throttledScrollY = useThrottle(scrollY, 100)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Only updates every 100ms during scroll
  return <div>Scroll position: {throttledScrollY}</div>
}
```

---

## 4. ANIMATION PERFORMANCE

### 4.1 GPU Acceleration

```typescript
// src/components/animations/GPUOptimized.tsx

// ❌ BAD: Causes reflows/repaints
const badAnimation = {
  width: ['100px', '200px'],
  height: ['100px', '200px'],
  backgroundColor: ['#ff0000', '#00ff00'],
}

// ✅ GOOD: GPU-accelerated
const goodAnimation = {
  transform: ['scale(1)', 'scale(1.2)'],
  opacity: [1, 0.8],
}

// Optimal animation component
export function OptimizedAnimation({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      style={{
        willChange: 'transform', // Hint browser to optimize
      }}
    >
      {children}
    </motion.div>
  )
}
```

### 4.2 Animation Budget Enforcement

```typescript
// src/utils/animation-budget.ts

class AnimationBudgetMonitor {
  private activeAnimations = new Set<string>()
  private maxConcurrent = 5

  startAnimation(id: string): boolean {
    if (this.activeAnimations.size >= this.maxConcurrent) {
      console.warn(`Animation budget exceeded. Skipping animation: ${id}`)
      return false
    }

    this.activeAnimations.add(id)
    return true
  }

  endAnimation(id: string) {
    this.activeAnimations.delete(id)
  }

  getActiveCount(): number {
    return this.activeAnimations.size
  }
}

export const animationBudget = new AnimationBudgetMonitor()

// Usage:
export function BudgetedAnimation({ id, children }: AnimationProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    const canAnimate = animationBudget.startAnimation(id)
    setShouldAnimate(canAnimate)

    return () => {
      animationBudget.endAnimation(id)
    }
  }, [id])

  if (!shouldAnimate) {
    return <>{children}</>
  }

  return <motion.div {...animationProps}>{children}</motion.div>
}
```

---

## 5. MEMORY MANAGEMENT

### 5.1 Memory Leak Prevention

```typescript
// src/hooks/useCleanup.ts

export function useCleanup() {
  const cleanupFunctions = useRef<(() => void)[]>([])

  const addCleanup = useCallback((fn: () => void) => {
    cleanupFunctions.current.push(fn)
  }, [])

  useEffect(() => {
    return () => {
      cleanupFunctions.current.forEach((fn) => fn())
      cleanupFunctions.current = []
    }
  }, [])

  return addCleanup
}

// Usage:
export function ComponentWithCleanup() {
  const addCleanup = useCleanup()

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('tick')
    }, 1000)

    addCleanup(() => clearInterval(interval))

    const subscription = eventEmitter.on('event', handleEvent)
    addCleanup(() => subscription.unsubscribe())
  }, [addCleanup])

  return <div>Component</div>
}
```

### 5.2 Component Cache

```typescript
// src/utils/component-cache.ts

class ComponentCache<T> {
  private cache = new Map<string, T>()
  private maxSize = 100

  set(key: string, value: T) {
    if (this.cache.size >= this.maxSize) {
      // Remove oldest entry
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
    this.cache.set(key, value)
  }

  get(key: string): T | undefined {
    return this.cache.get(key)
  }

  clear() {
    this.cache.clear()
  }

  size(): number {
    return this.cache.size
  }
}

export const componentCache = new ComponentCache()
```

### 5.3 Image Optimization

```typescript
// src/components/optimized/OptimizedImage.tsx

import { useState, useEffect } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  loading = 'lazy'
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>()

  useEffect(() => {
    // Use Intersection Observer for lazy loading
    if (loading === 'lazy') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src)
            observer.disconnect()
          }
        })
      })

      const element = document.getElementById(`img-${src}`)
      if (element) {
        observer.observe(element)
      }

      return () => observer.disconnect()
    } else {
      setImageSrc(src)
    }
  }, [src, loading])

  return (
    <picture id={`img-${src}`}>
      {/* Modern formats first */}
      <source srcSet={`${imageSrc}.avif`} type="image/avif" />
      <source srcSet={`${imageSrc}.webp`} type="image/webp" />

      {/* Fallback */}
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
      />
    </picture>
  )
}
```

---

## 6. NETWORK PERFORMANCE

### 6.1 Resource Hints

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- DNS prefetch for external domains -->
    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

    <!-- Preconnect to critical origins -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- Preload critical resources -->
    <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />

    <!-- Prefetch next page -->
    <link rel="prefetch" href="/builder/colors" />
  </head>
</html>
```

### 6.2 Font Loading Optimization

```css
/* src/styles/fonts.css */

@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap; /* Show fallback font immediately */
  font-style: normal;
}

/* Prevent layout shift */
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
```

### 6.3 Code Prefetching

```typescript
// src/utils/prefetch.ts

export function prefetchRoute(routeName: string) {
  // Prefetch route component
  const prefetchMap = {
    colors: () => import('@/pages/builder/Colors'),
    typography: () => import('@/pages/builder/Typography'),
    icons: () => import('@/pages/builder/Icons'),
  }

  const prefetch = prefetchMap[routeName as keyof typeof prefetchMap]
  if (prefetch) {
    prefetch()
  }
}

// Usage on link hover:
<NavLink
  to="/builder/colors"
  onMouseEnter={() => prefetchRoute('colors')}
>
  Colors
</NavLink>
```

---

## 7. MONITORING & METRICS

### 7.1 Performance Monitoring

```typescript
// src/utils/performance-monitor.ts

export class PerformanceMonitor {
  measurePageLoad() {
    if (typeof window === 'undefined') return

    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

      const metrics = {
        dns: perfData.domainLookupEnd - perfData.domainLookupStart,
        tcp: perfData.connectEnd - perfData.connectStart,
        request: perfData.responseStart - perfData.requestStart,
        response: perfData.responseEnd - perfData.responseStart,
        dom: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        total: perfData.loadEventEnd - perfData.fetchStart,
      }

      console.table(metrics)

      // Send to analytics
      this.sendMetrics(metrics)
    })
  }

  measureComponentRender(componentName: string) {
    performance.mark(`${componentName}-start`)

    return () => {
      performance.mark(`${componentName}-end`)
      performance.measure(
        `${componentName}-render`,
        `${componentName}-start`,
        `${componentName}-end`
      )

      const measure = performance.getEntriesByName(`${componentName}-render`)[0]
      console.log(`${componentName} rendered in ${measure.duration.toFixed(2)}ms`)
    }
  }

  private sendMetrics(metrics: Record<string, number>) {
    // Send to your analytics service
    if (window.gtag) {
      Object.entries(metrics).forEach(([key, value]) => {
        window.gtag('event', 'timing_complete', {
          name: key,
          value: Math.round(value),
          event_category: 'Performance',
        })
      })
    }
  }
}

export const performanceMonitor = new PerformanceMonitor()

// Usage:
export function ExpensiveComponent() {
  useEffect(() => {
    const endMeasure = performanceMonitor.measureComponentRender('ExpensiveComponent')
    return endMeasure
  }, [])

  return <div>{/* component */}</div>
}
```

### 7.2 Web Vitals

```typescript
// src/utils/web-vitals.ts

import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals'

export function reportWebVitals() {
  onCLS(console.log) // Cumulative Layout Shift
  onFID(console.log) // First Input Delay
  onFCP(console.log) // First Contentful Paint
  onLCP(console.log) // Largest Contentful Paint
  onTTFB(console.log) // Time to First Byte

  // Send to analytics
  onCLS((metric) => sendToAnalytics(metric))
  onFID((metric) => sendToAnalytics(metric))
  onLCP((metric) => sendToAnalytics(metric))
}

function sendToAnalytics(metric: any) {
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    })
  }
}

// Call in main.tsx:
reportWebVitals()
```

---

## PERFORMANCE TARGETS SUMMARY

| Category | Metric | Target | Critical |
|----------|--------|--------|----------|
| **Bundle** | Initial JS | < 180 KB | Yes |
| **Bundle** | Vendor chunk | < 100 KB | No |
| **Bundle** | Route chunk | < 50 KB | No |
| **Loading** | FCP | < 1.5s | Yes |
| **Loading** | LCP | < 2.5s | Yes |
| **Loading** | TTI | < 3.5s | Yes |
| **Runtime** | FPS (avg) | 60 fps | Yes |
| **Runtime** | FPS (min) | 55 fps | Yes |
| **Memory** | Max heap | < 50 MB | No |
| **Network** | Total load | < 500 KB | No |

---

**Status:** Complete Specification
**Next:** ADRs Documentation
**Review:** Continuous monitoring
