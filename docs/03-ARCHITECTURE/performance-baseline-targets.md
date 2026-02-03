# Performance Baseline & Targets
**Project:** Neoloop Design System Builder
**Date:** 2026-01-30
**Architect:** @architect
**Status:** Baseline Defined

---

## EXECUTIVE SUMMARY

This document establishes performance baselines and targets for the Neoloop Design System Builder to ensure optimal user experience and SEO.

### Key Targets
- **Bundle Size:** < 180 KB initial load (gzipped)
- **Lighthouse Performance:** ≥ 90/100
- **Time to Interactive:** < 3.5 seconds
- **First Contentful Paint:** < 1.5 seconds

---

## TABLE OF CONTENTS

1. [Bundle Size Targets](#1-bundle-size-targets)
2. [Lighthouse Performance Targets](#2-lighthouse-performance-targets)
3. [Web Vitals Targets](#3-web-vitals-targets)
4. [Runtime Performance](#4-runtime-performance)
5. [Network Performance](#5-network-performance)
6. [Storybook Performance](#6-storybook-performance)
7. [Monitoring Strategy](#7-monitoring-strategy)
8. [Optimization Techniques](#8-optimization-techniques)

---

## 1. BUNDLE SIZE TARGETS

### 1.1 JavaScript Bundle Targets

| Bundle Type | Target (Gzipped) | Target (Raw) | Priority |
|-------------|------------------|--------------|----------|
| **Main Bundle** | < 150 KB | < 450 KB | Critical |
| **Vendor Bundle** | < 100 KB | < 300 KB | Critical |
| **CSS Bundle** | < 30 KB | < 90 KB | High |
| **Total Initial Load** | < 180 KB | < 540 KB | Critical |
| **Lazy Route Chunk** | < 50 KB | < 150 KB | High |
| **Component Chunk** | < 30 KB | < 90 KB | Medium |

### 1.2 Current Baseline (Estimated)

```typescript
// Based on current dependencies:
// react: ~45 KB (gzipped)
// react-dom: ~135 KB (gzipped)
// lucide-react: ~15 KB (gzipped, tree-shaken)
// recharts: ~60 KB (gzipped, lazy-loaded)
// Total: ~255 KB

// Target after optimization: < 180 KB
// Savings needed: ~75 KB (29% reduction)
```

### 1.3 Bundle Size Budget

```javascript
// vite.config.ts - Bundle size warnings
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-icons': ['lucide-react'],
          'vendor-charts': ['recharts'],
        }
      }
    },
    chunkSizeWarningLimit: 500, // KB (raw)
  }
}

// package.json - Bundle size check
"scripts": {
  "build:size": "vite build && npx vite-bundle-visualizer"
}
```

### 1.4 Size Monitoring

```bash
# Automated size checks in CI/CD
npm run build
SIZE=$(du -sb dist | awk '{print $1}')
if [ $SIZE -gt 184320 ]; then  # 180KB in bytes
  echo "❌ Bundle size exceeds 180KB limit"
  exit 1
fi
```

---

## 2. LIGHTHOUSE PERFORMANCE TARGETS

### 2.1 Lighthouse Scores

| Category | Target | Minimum Acceptable | Priority |
|----------|--------|-------------------|----------|
| **Performance** | ≥ 90 | ≥ 85 | Critical |
| **Accessibility** | ≥ 95 | ≥ 90 | Critical |
| **Best Practices** | ≥ 90 | ≥ 85 | High |
| **SEO** | ≥ 90 | ≥ 85 | Medium |

### 2.2 Lighthouse Audit Configuration

```json
{
  "extends": "lighthouse:default",
  "settings": {
    "onlyCategories": ["performance", "accessibility", "best-practices", "seo"],
    "formFactor": "desktop",
    "screenEmulation": {
      "mobile": false,
      "width": 1920,
      "height": 1080,
      "deviceScaleFactor": 1
    },
    "throttling": {
      "rttMs": 40,
      "throughputKbps": 10240,
      "cpuSlowdownMultiplier": 1
    }
  }
}
```

### 2.3 Performance Audits

```yaml
# Critical Audits (must pass):
- first-contentful-paint: < 1.5s
- largest-contentful-paint: < 2.5s
- total-blocking-time: < 300ms
- cumulative-layout-shift: < 0.1
- speed-index: < 3.0s

# High Priority:
- time-to-interactive: < 3.5s
- max-potential-fid: < 130ms
- server-response-time: < 600ms

# Medium Priority:
- bootup-time: < 2s
- mainthread-work-breakdown: < 2s
- dom-size: < 1500 nodes
```

---

## 3. WEB VITALS TARGETS

### 3.1 Core Web Vitals

| Metric | Good | Needs Improvement | Poor | Target |
|--------|------|-------------------|------|--------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 2.5s - 4.0s | > 4.0s | **< 2.0s** |
| **FID** (First Input Delay) | < 100ms | 100ms - 300ms | > 300ms | **< 50ms** |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 0.1 - 0.25 | > 0.25 | **< 0.05** |

### 3.2 Additional Web Vitals

| Metric | Target | Description |
|--------|--------|-------------|
| **FCP** (First Contentful Paint) | < 1.5s | First pixel rendered |
| **TTI** (Time to Interactive) | < 3.5s | Page fully interactive |
| **TBT** (Total Blocking Time) | < 200ms | Main thread blocked time |
| **SI** (Speed Index) | < 3.0s | Visual completeness |
| **TTFB** (Time to First Byte) | < 600ms | Server response time |

### 3.3 Web Vitals Implementation

```typescript
// src/utils/web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

export function reportWebVitals() {
  getCLS((metric) => {
    console.log('CLS:', metric.value)
    // Send to analytics
    if (metric.value > 0.1) {
      console.warn('⚠️ CLS above target (0.1)')
    }
  })

  getFID((metric) => {
    console.log('FID:', metric.value)
    if (metric.value > 100) {
      console.warn('⚠️ FID above target (100ms)')
    }
  })

  getFCP((metric) => {
    console.log('FCP:', metric.value)
    if (metric.value > 1500) {
      console.warn('⚠️ FCP above target (1.5s)')
    }
  })

  getLCP((metric) => {
    console.log('LCP:', metric.value)
    if (metric.value > 2500) {
      console.warn('⚠️ LCP above target (2.5s)')
    }
  })

  getTTFB((metric) => {
    console.log('TTFB:', metric.value)
    if (metric.value > 600) {
      console.warn('⚠️ TTFB above target (600ms)')
    }
  })
}

// src/main.tsx
if (import.meta.env.PROD) {
  reportWebVitals()
}
```

---

## 4. RUNTIME PERFORMANCE

### 4.1 React Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Initial Render** | < 200ms | Time from mount to paint |
| **Re-render** | < 16ms | Component update time |
| **State Update** | < 10ms | setState to re-render |
| **Event Handler** | < 50ms | Click to state change |

### 4.2 React Profiler Targets

```typescript
// Component render time targets
<Profiler id="ColorSelector" onRender={onRenderCallback}>
  <ColorSelector />
</Profiler>

function onRenderCallback(
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number,
  baseDuration: number,
) {
  // Target: actualDuration < 100ms for complex components
  if (actualDuration > 100) {
    console.warn(`⚠️ ${id} render took ${actualDuration}ms`)
  }

  // Target: < 5ms for simple components
  if (actualDuration > 5 && id.includes('Button')) {
    console.warn(`⚠️ Button render took ${actualDuration}ms`)
  }
}
```

### 4.3 Memory Performance

| Metric | Target | Alert Threshold |
|--------|--------|----------------|
| **Heap Size** | < 50 MB | > 100 MB |
| **Memory Leaks** | 0 | Any growth over time |
| **DOM Nodes** | < 1500 | > 2000 |
| **Event Listeners** | < 100 | > 200 |

---

## 5. NETWORK PERFORMANCE

### 5.1 Asset Loading Targets

| Asset Type | Target Size | Target Load Time |
|------------|-------------|------------------|
| **HTML** | < 20 KB | < 100ms |
| **CSS** | < 30 KB (gzipped) | < 200ms |
| **JS (Main)** | < 150 KB (gzipped) | < 500ms |
| **Fonts** | < 100 KB total | < 300ms |
| **Images** | < 50 KB each | < 200ms |
| **Icons (SVG)** | < 2 KB each | Inline/instant |

### 5.2 HTTP Requests

| Metric | Target | Max Acceptable |
|--------|--------|----------------|
| **Total Requests** | < 30 | < 50 |
| **Requests (Critical Path)** | < 10 | < 15 |
| **Parallel Requests** | 6 (HTTP/2) | - |
| **Redirect Chains** | 0 | 1 |

### 5.3 Caching Strategy

```typescript
// Vite build configuration for long-term caching
export default {
  build: {
    rollupOptions: {
      output: {
        // Hash filenames for cache busting
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
}

// Vercel headers for caching
// vercel.json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

---

## 6. STORYBOOK PERFORMANCE

### 6.1 Storybook Metrics

| Metric | Target | Description |
|--------|--------|-------------|
| **Build Time** | < 30s | Full Storybook build |
| **HMR Time** | < 500ms | Story hot reload |
| **Story Load** | < 200ms | Individual story render |
| **Total Bundle** | < 2 MB | All stories + addons |
| **Stories Count** | 79+ | One per component |

### 6.2 Storybook Optimization

```typescript
// .storybook/main.ts
export default {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/react-vite',
  viteFinal: async (config) => {
    return {
      ...config,
      build: {
        ...config.build,
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
            }
          }
        }
      }
    }
  }
}
```

---

## 7. MONITORING STRATEGY

### 7.1 CI/CD Performance Checks

```yaml
# .github/workflows/performance.yml
name: Performance Check

on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://deploy-preview-${{ github.event.number }}--neoloop.netlify.app
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true

  bundle-size:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - name: Check bundle size
        run: |
          SIZE=$(du -sb dist | awk '{print $1}')
          if [ $SIZE -gt 184320 ]; then
            echo "❌ Bundle exceeds 180KB"
            exit 1
          fi
```

### 7.2 Lighthouse Budget

```json
// lighthouse-budget.json
[
  {
    "path": "/*",
    "resourceSizes": [
      { "resourceType": "script", "budget": 150 },
      { "resourceType": "stylesheet", "budget": 30 },
      { "resourceType": "document", "budget": 20 },
      { "resourceType": "font", "budget": 100 },
      { "resourceType": "image", "budget": 50 },
      { "resourceType": "total", "budget": 400 }
    ],
    "resourceCounts": [
      { "resourceType": "script", "budget": 10 },
      { "resourceType": "stylesheet", "budget": 5 },
      { "resourceType": "font", "budget": 3 },
      { "resourceType": "total", "budget": 30 }
    ]
  }
]
```

### 7.3 Real User Monitoring (RUM)

```typescript
// Production monitoring with web-vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric: Metric) {
  // Send to PostHog or other analytics
  if (window.posthog) {
    window.posthog.capture('web_vital', {
      metric_name: metric.name,
      metric_value: metric.value,
      metric_rating: metric.rating,
    })
  }

  // Log warnings for poor metrics
  if (metric.rating === 'poor') {
    console.warn(`⚠️ Poor ${metric.name}: ${metric.value}`)
  }
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

---

## 8. OPTIMIZATION TECHNIQUES

### 8.1 Code Splitting

```typescript
// Route-based code splitting
import { lazy, Suspense } from 'react'

const ColorSelector = lazy(() => import('./views/ColorSelector'))
const IconSelector = lazy(() => import('./views/IconSelector'))

<Suspense fallback={<Spinner />}>
  <ColorSelector />
</Suspense>

// Component-based code splitting (for large components)
const Charts = lazy(() => import('./components/Charts'))
```

### 8.2 Tree Shaking

```typescript
// Bad: imports entire library
import _ from 'lodash'
_.debounce(fn, 300)

// Good: imports only what's needed
import debounce from 'lodash/debounce'
debounce(fn, 300)

// Better: use native or smaller alternative
function debounce(fn, delay) { /* ... */ }
```

### 8.3 React Performance

```typescript
// Memoization
import { memo, useMemo, useCallback } from 'react'

// Memo for expensive components
const ColorCard = memo(({ color }) => {
  return <div style={{ background: color.hex }}>{color.name}</div>
})

// useMemo for expensive calculations
const filteredColors = useMemo(() => {
  return colors.filter(c => c.category === selectedCategory)
}, [colors, selectedCategory])

// useCallback for event handlers passed to children
const handleClick = useCallback(() => {
  setSelected(color)
}, [color])
```

### 8.4 Image Optimization

```typescript
// Use modern formats (WebP, AVIF)
<img
  src="hero.avif"
  srcSet="hero.avif 1x, hero@2x.avif 2x"
  alt="Hero"
  loading="lazy"
  decoding="async"
  width="800"
  height="600"
/>

// SVG icons inline for instant loading
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="..." />
  </svg>
)
```

### 8.5 Font Optimization

```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>

<!-- Google Fonts with display swap -->
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
>

<!-- CSS font-display -->
<style>
@font-face {
  font-family: 'Inter';
  font-display: swap;
  src: url('/fonts/inter.woff2') format('woff2');
}
</style>
```

### 8.6 CSS Optimization

```typescript
// Tailwind CSS v4 purging (automatic with JIT)
// Only used utilities are included in final bundle

// Critical CSS inline
<style dangerouslySetInnerHTML={{
  __html: `
    /* Critical styles for above-the-fold content */
    .hero { background: #667eea; }
  `
}} />

// Non-critical CSS deferred
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
```

---

## PERFORMANCE CHECKLIST

### Before Every Release

- [ ] Run Lighthouse audit (all scores ≥ 90)
- [ ] Check bundle size (< 180 KB gzipped)
- [ ] Test Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Profile React components (no renders > 100ms)
- [ ] Check memory leaks (no growth over time)
- [ ] Test on slow 3G network (usable in 5s)
- [ ] Test on low-end device (Moto G4)
- [ ] Verify lazy loading works
- [ ] Check font loading (no FOIT)
- [ ] Validate image optimization

---

## PERFORMANCE REGRESSION PREVENTION

```typescript
// CI/CD fails if performance regresses
const thresholds = {
  'first-contentful-paint': 1500,
  'largest-contentful-paint': 2500,
  'cumulative-layout-shift': 0.1,
  'total-blocking-time': 300,
  'speed-index': 3000,
}

// Bundle size check
const maxBundleSize = 184320 // 180 KB in bytes

// Automated alerts
if (bundleSize > maxBundleSize) {
  throw new Error(`Bundle size ${bundleSize} exceeds limit ${maxBundleSize}`)
}
```

---

## SUMMARY

**Targets Recap:**
- Bundle: < 180 KB (gzipped)
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
- Lighthouse: ≥ 90/100

**Key Strategies:**
1. Code splitting (route + component level)
2. Tree shaking (import only what's used)
3. Lazy loading (images, fonts, components)
4. Memoization (React.memo, useMemo, useCallback)
5. Monitoring (CI/CD + RUM with web-vitals)

**Review:** End of Week 2 (validate all targets met)

---

**Document Status:** ✅ Complete
**Last Updated:** 2026-01-30
**Next Review:** Week 2 implementation complete
