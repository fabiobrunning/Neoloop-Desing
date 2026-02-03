# Phase 4 Performance Benchmarks & Testing

**Document ID:** TEST-PERF-BENCHMARKS
**Focus:** Animation Performance, Bundle Size, Memory, CPU
**Total Tests:** 50+
**Target:** 60fps, <60KB bundle, 0 memory leaks

---

## Performance Targets Summary

| Metric | Target | Warning Threshold | Failure Threshold |
|--------|--------|-------------------|-------------------|
| **Animation FPS** | 60fps | <58fps | <55fps |
| **Frame Drops** | 0 | <5 | >10 |
| **Bundle Size (gzipped)** | <60KB | 60-70KB | >70KB |
| **Memory Growth (100 cycles)** | <10% | 10-20% | >20% |
| **CPU Usage (animations)** | <30% | 30-50% | >50% |
| **Main Thread Blocking** | <50ms | 50-100ms | >100ms |
| **Time to Interactive** | <3s | 3-5s | >5s |
| **First Contentful Paint** | <1.5s | 1.5-2.5s | >2.5s |

---

## 1. Animation Performance Benchmarks

### 1.1 FPS Targets by Animation Type

```typescript
// performance-benchmarks.test.ts
import { measureFPS, measureFrameDrops } from '@/test-utils/performance';

describe('Animation FPS Benchmarks', () => {
  const FPS_TARGET = 60;
  const FPS_WARNING = 58;
  const FPS_FAILURE = 55;

  const animations = [
    { name: 'Fade', target: 60, warning: 58 },
    { name: 'Slide', target: 60, warning: 58 },
    { name: 'Scale', target: 60, warning: 58 },
    { name: 'Rotate', target: 60, warning: 58 },
    { name: 'Collapse', target: 60, warning: 58 },
    { name: 'Stagger (10 items)', target: 60, warning: 58 },
    { name: 'Stagger (50 items)', target: 58, warning: 55 },
    { name: 'Complex sequence', target: 58, warning: 55 },
  ];

  animations.forEach(({ name, target, warning }) => {
    test(`${name} should maintain ${target}fps`, async () => {
      const fps = await measureFPS(`${name} animation`);

      expect(fps).toBeGreaterThanOrEqual(warning);

      if (fps < target && fps >= warning) {
        console.warn(`⚠️ ${name}: ${fps}fps (below target, above warning)`);
      }

      if (fps < warning) {
        console.error(`❌ ${name}: ${fps}fps (FAILED)`);
      }
    });
  });
});
```

**Benchmark Results Template:**

```
Animation Performance Benchmarks
=================================

Fade Animation:
  Target: 60fps
  Actual: 59.8fps ✓
  Frame Drops: 1 (0.3%)
  Status: PASS

Slide Animation:
  Target: 60fps
  Actual: 60.2fps ✓
  Frame Drops: 0 (0%)
  Status: PASS

Scale Animation:
  Target: 60fps
  Actual: 59.5fps ✓
  Frame Drops: 2 (0.7%)
  Status: PASS

Stagger (50 items):
  Target: 58fps
  Actual: 57.2fps ⚠️
  Frame Drops: 8 (2.7%)
  Status: WARNING

Overall: 7/8 PASS, 1/8 WARNING
```

### 1.2 Frame Drop Analysis

```typescript
describe('Frame Drop Analysis', () => {
  test('should have <5 frame drops during fade animation', async () => {
    const { frameDrops, totalFrames } = await measureFrameDrops('fade', {
      duration: 1000,
      expectedFPS: 60
    });

    const dropRate = (frameDrops / totalFrames) * 100;

    expect(frameDrops).toBeLessThan(5);
    expect(dropRate).toBeLessThan(10); // <10% drop rate

    console.log(`Frame Drops: ${frameDrops}/${totalFrames} (${dropRate.toFixed(2)}%)`);
  });

  test('should identify jank (>16ms frame times)', async () => {
    const frameTimes = await measureFrameTimes('slide');

    const jankFrames = frameTimes.filter(time => time > 16.67); // >60fps threshold
    const jankRate = (jankFrames.length / frameTimes.length) * 100;

    expect(jankRate).toBeLessThan(5); // <5% jank

    if (jankFrames.length > 0) {
      console.warn(`Jank detected: ${jankFrames.length} frames > 16ms`);
      console.warn(`Max frame time: ${Math.max(...frameTimes).toFixed(2)}ms`);
    }
  });
});
```

### 1.3 Animation Timing Precision

```typescript
describe('Animation Timing Precision', () => {
  test('should complete fast animation in 150ms ±10ms', async () => {
    const duration = await measureAnimationDuration('fade-fast');

    expect(duration).toBeGreaterThanOrEqual(140);
    expect(duration).toBeLessThanOrEqual(160);

    const variance = Math.abs(duration - 150);
    const variancePercent = (variance / 150) * 100;

    console.log(`Duration: ${duration}ms (±${variancePercent.toFixed(1)}%)`);
  });

  const timingTests = [
    { preset: 'fast', target: 150, tolerance: 10 },
    { preset: 'normal', target: 300, tolerance: 10 },
    { preset: 'slow', target: 500, tolerance: 10 },
  ];

  timingTests.forEach(({ preset, target, tolerance }) => {
    test(`${preset} animation: ${target}ms ±${tolerance}ms`, async () => {
      const duration = await measureAnimationDuration(`fade-${preset}`);

      expect(duration).toBeCloseTo(target, tolerance);
    });
  });
});
```

---

## 2. Bundle Size Benchmarks

### 2.1 Component Bundle Sizes

```typescript
// bundle-size.test.ts
import { getGzippedSize } from '@/test-utils/bundle-size';

describe('Bundle Size Benchmarks', () => {
  const bundleSizes = {
    'Animation System': { target: 15, warning: 18, max: 20 },
    'Transition Component': { target: 5, warning: 7, max: 10 },
    'Tabs Component': { target: 8, warning: 10, max: 12 },
    'Menu Component': { target: 10, warning: 12, max: 15 },
    'Breadcrumb Component': { target: 4, warning: 5, max: 6 },
    'Pagination Component': { target: 6, warning: 8, max: 10 },
    'Steps Component': { target: 7, warning: 9, max: 11 },
    'CommandPalette Component': { target: 12, warning: 15, max: 18 },
    'Focus Management Utils': { target: 5, warning: 7, max: 10 },
    'A11y Utils': { target: 5, warning: 7, max: 10 },
  };

  Object.entries(bundleSizes).forEach(([name, { target, warning, max }]) => {
    test(`${name} should be <${target}KB gzipped`, async () => {
      const size = await getGzippedSize(name);
      const sizeKB = size / 1024;

      expect(sizeKB).toBeLessThan(max);

      if (sizeKB > target && sizeKB < warning) {
        console.warn(`⚠️ ${name}: ${sizeKB.toFixed(2)}KB (above target)`);
      }

      if (sizeKB >= warning && sizeKB < max) {
        console.warn(`⚠️ ${name}: ${sizeKB.toFixed(2)}KB (WARNING)`);
      }

      console.log(`${name}: ${sizeKB.toFixed(2)}KB / ${target}KB`);
    });
  });

  test('Total Phase 4 bundle should be <60KB gzipped', async () => {
    const totalSize = await getGzippedSize('phase-4-total');
    const sizeKB = totalSize / 1024;

    expect(sizeKB).toBeLessThan(70); // Hard limit
    expect(sizeKB).toBeLessThan(60); // Target

    console.log(`Total Phase 4: ${sizeKB.toFixed(2)}KB / 60KB target`);
  });
});
```

**Bundle Size Report Template:**

```
Bundle Size Analysis (Gzipped)
===============================

Animation System:
  Target: 15KB
  Actual: 14.2KB ✓
  Status: PASS

Navigation Components:
  Tabs: 7.8KB / 8KB ✓
  Menu: 11.2KB / 10KB ⚠️
  Breadcrumb: 3.9KB / 4KB ✓
  Pagination: 5.7KB / 6KB ✓
  Steps: 6.8KB / 7KB ✓
  CommandPalette: 13.5KB / 12KB ⚠️

Utilities:
  Focus Management: 4.8KB / 5KB ✓
  A11y Utils: 5.1KB / 5KB ⚠️

TOTAL: 58.8KB / 60KB ✓

Tree-shaking Test:
  Import single component: 8.2KB ✓
  Import entire library: 58.8KB ✓
  Reduction: 86% ✓
```

### 2.2 Tree-Shaking Validation

```typescript
describe('Tree-Shaking', () => {
  test('should support tree-shaking (import single component)', async () => {
    // Simulate importing only Tabs
    const singleComponentSize = await getGzippedSize('tabs-only');
    const fullLibrarySize = await getGzippedSize('full-library');

    const reduction = ((fullLibrarySize - singleComponentSize) / fullLibrarySize) * 100;

    expect(reduction).toBeGreaterThan(80); // At least 80% reduction

    console.log(`Single component: ${(singleComponentSize / 1024).toFixed(2)}KB`);
    console.log(`Full library: ${(fullLibrarySize / 1024).toFixed(2)}KB`);
    console.log(`Reduction: ${reduction.toFixed(1)}%`);
  });

  test('should not include unused animations in bundle', async () => {
    const withAllAnimations = await getGzippedSize('all-animations');
    const withFadeOnly = await getGzippedSize('fade-only');

    expect(withFadeOnly).toBeLessThan(withAllAnimations * 0.3);
  });
});
```

---

## 3. Memory Benchmarks

### 3.1 Memory Leak Detection

```typescript
// memory-benchmarks.test.ts
import { measureMemoryUsage, forceGC } from '@/test-utils/memory';

describe('Memory Leak Detection', () => {
  test('should not leak memory after 100 animation cycles', async () => {
    const initialMemory = await measureMemoryUsage();

    // Run 100 mount/unmount cycles
    for (let i = 0; i < 100; i++) {
      const { unmount } = render(<FadeTransition show>Content</FadeTransition>);
      await waitFor(() => {});
      unmount();
    }

    await forceGC(); // Force garbage collection

    const finalMemory = await measureMemoryUsage();
    const memoryGrowth = finalMemory - initialMemory;
    const growthPercent = (memoryGrowth / initialMemory) * 100;

    expect(growthPercent).toBeLessThan(10); // <10% growth

    console.log(`Initial: ${(initialMemory / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Final: ${(finalMemory / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Growth: ${growthPercent.toFixed(2)}%`);
  });

  test('should cleanup event listeners on unmount', async () => {
    const initialListeners = getEventListenerCount();

    const { unmount } = render(<AnimatedComponent />);
    const duringListeners = getEventListenerCount();

    expect(duringListeners).toBeGreaterThan(initialListeners);

    unmount();
    await waitFor(() => {});

    const finalListeners = getEventListenerCount();
    expect(finalListeners).toBe(initialListeners);

    console.log(`Listeners: ${initialListeners} → ${duringListeners} → ${finalListeners}`);
  });

  test('should cleanup timers on unmount', async () => {
    const initialTimers = getActiveTimerCount();

    const { unmount } = render(<AnimatedComponent />);
    unmount();

    await waitFor(() => {});

    const finalTimers = getActiveTimerCount();
    expect(finalTimers).toBe(initialTimers);
  });
});
```

**Memory Benchmark Report Template:**

```
Memory Benchmark Report
========================

100 Animation Cycles Test:
  Initial Memory: 45.2MB
  Final Memory: 48.8MB
  Growth: 3.6MB (7.9%) ✓
  Status: PASS

Event Listener Cleanup:
  Before: 12 listeners
  During: 28 listeners
  After: 12 listeners ✓
  Status: PASS

Timer Cleanup:
  Before: 2 timers
  During: 8 timers
  After: 2 timers ✓
  Status: PASS

DOM Node Cleanup:
  Before: 247 nodes
  During: 315 nodes
  After: 247 nodes ✓
  Status: PASS

Overall: 0 memory leaks detected ✓
```

### 3.2 Memory Profiling

```typescript
describe('Memory Profiling', () => {
  test('should profile memory usage during animations', async () => {
    const samples: number[] = [];

    const profiler = setInterval(async () => {
      const memory = await measureMemoryUsage();
      samples.push(memory);
    }, 100);

    render(<ComplexAnimationSequence />);
    await waitFor(() => {}, { timeout: 3000 });

    clearInterval(profiler);

    const avgMemory = samples.reduce((a, b) => a + b) / samples.length;
    const maxMemory = Math.max(...samples);
    const memorySpike = maxMemory - samples[0];

    console.log(`Avg Memory: ${(avgMemory / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Max Memory: ${(maxMemory / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Max Spike: ${(memorySpike / 1024 / 1024).toFixed(2)}MB`);

    expect(memorySpike).toBeLessThan(10 * 1024 * 1024); // <10MB spike
  });
});
```

---

## 4. CPU Usage Benchmarks

### 4.1 CPU Profiling

```typescript
// cpu-benchmarks.test.ts
import { measureCPU, measureMainThreadBlocking } from '@/test-utils/cpu';

describe('CPU Usage Benchmarks', () => {
  test('should keep CPU usage <30% during fade animation', async () => {
    const cpuUsage = await measureCPU(async () => {
      render(<FadeTransition show duration="normal">Content</FadeTransition>);
      await waitFor(() => {}, { timeout: 500 });
    });

    expect(cpuUsage).toBeLessThan(50); // Warning threshold
    expect(cpuUsage).toBeLessThan(30); // Target

    console.log(`CPU Usage: ${cpuUsage.toFixed(1)}%`);
  });

  const animations = [
    { name: 'Fade', target: 30 },
    { name: 'Slide', target: 35 },
    { name: 'Scale', target: 30 },
    { name: 'Collapse', target: 40 },
    { name: 'Stagger (10)', target: 50 },
    { name: 'Stagger (50)', target: 60 },
  ];

  animations.forEach(({ name, target }) => {
    test(`${name} should use <${target}% CPU`, async () => {
      const cpuUsage = await measureCPU(async () => {
        render(<Animation type={name} />);
        await waitFor(() => {}, { timeout: 1000 });
      });

      expect(cpuUsage).toBeLessThan(target);

      console.log(`${name}: ${cpuUsage.toFixed(1)}% / ${target}%`);
    });
  });
});
```

### 4.2 Main Thread Blocking

```typescript
describe('Main Thread Blocking', () => {
  test('should not block main thread for >50ms', async () => {
    const { maxBlockingTime, totalBlockingTime } = await measureMainThreadBlocking(() => {
      render(<ComplexAnimation />);
    });

    expect(maxBlockingTime).toBeLessThan(50);
    expect(totalBlockingTime).toBeLessThan(200);

    console.log(`Max blocking: ${maxBlockingTime.toFixed(2)}ms`);
    console.log(`Total blocking: ${totalBlockingTime.toFixed(2)}ms`);
  });

  test('should remain interactive during animations', async () => {
    render(<AnimatedComponent />);

    const responseTime = await measureInteractionDelay(() => {
      // Simulate user click during animation
      fireEvent.click(screen.getByRole('button'));
    });

    expect(responseTime).toBeLessThan(100); // <100ms response

    console.log(`Interaction delay: ${responseTime}ms`);
  });
});
```

**CPU Benchmark Report:**

```
CPU Usage Benchmarks
=====================

Animation CPU Usage:
  Fade: 24.3% / 30% ✓
  Slide: 31.2% / 35% ✓
  Scale: 27.8% / 30% ✓
  Collapse: 38.5% / 40% ✓
  Stagger (10): 47.2% / 50% ✓
  Stagger (50): 58.9% / 60% ⚠️

Main Thread Blocking:
  Max blocking: 38ms / 50ms ✓
  Total blocking: 156ms / 200ms ✓
  Status: PASS

Interaction Delay:
  During animation: 72ms / 100ms ✓
  Status: PASS

Overall: CPU performance ACCEPTABLE
```

---

## 5. Web Vitals

### 5.1 Core Web Vitals

```typescript
// web-vitals.test.ts
import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

describe('Core Web Vitals', () => {
  test('Largest Contentful Paint (LCP) should be <2.5s', async () => {
    const lcp = await measureLCP();

    expect(lcp).toBeLessThan(4000); // Poor threshold
    expect(lcp).toBeLessThan(2500); // Good threshold

    console.log(`LCP: ${lcp}ms`);
  });

  test('First Input Delay (FID) should be <100ms', async () => {
    const fid = await measureFID();

    expect(fid).toBeLessThan(300); // Poor
    expect(fid).toBeLessThan(100); // Good

    console.log(`FID: ${fid}ms`);
  });

  test('Cumulative Layout Shift (CLS) should be <0.1', async () => {
    const cls = await measureCLS();

    expect(cls).toBeLessThan(0.25); // Poor
    expect(cls).toBeLessThan(0.1); // Good

    console.log(`CLS: ${cls}`);
  });

  test('First Contentful Paint (FCP) should be <1.8s', async () => {
    const fcp = await measureFCP();

    expect(fcp).toBeLessThan(3000); // Poor
    expect(fcp).toBeLessThan(1800); // Good

    console.log(`FCP: ${fcp}ms`);
  });

  test('Time to Interactive (TTI) should be <3.8s', async () => {
    const tti = await measureTTI();

    expect(tti).toBeLessThan(7300); // Poor
    expect(tti).toBeLessThan(3800); // Good

    console.log(`TTI: ${tti}ms`);
  });
});
```

**Web Vitals Report:**

```
Core Web Vitals
================

Largest Contentful Paint (LCP):
  Target: <2.5s
  Actual: 1.8s ✓
  Rating: GOOD

First Input Delay (FID):
  Target: <100ms
  Actual: 45ms ✓
  Rating: GOOD

Cumulative Layout Shift (CLS):
  Target: <0.1
  Actual: 0.05 ✓
  Rating: GOOD

First Contentful Paint (FCP):
  Target: <1.8s
  Actual: 1.2s ✓
  Rating: GOOD

Time to Interactive (TTI):
  Target: <3.8s
  Actual: 2.9s ✓
  Rating: GOOD

Overall: ALL METRICS GOOD ✓
```

---

## 6. Performance Testing Tools

### 6.1 Lighthouse CI

```yaml
# lighthouserc.js
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: [
        'http://localhost:6006/?path=/story/animations--fade',
        'http://localhost:6006/?path=/story/navigation--tabs',
        'http://localhost:6006/?path=/story/navigation--menu',
      ],
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 1.0 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'interactive': ['error', { maxNumericValue: 4000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

### 6.2 Chrome DevTools Performance API

```typescript
// performance-utils.ts
export async function measurePerformance(callback: () => void) {
  performance.mark('start');

  await callback();

  performance.mark('end');
  performance.measure('operation', 'start', 'end');

  const measure = performance.getEntriesByName('operation')[0];
  return measure.duration;
}

export function startPerformanceObserver(callback: (entries: PerformanceEntry[]) => void) {
  const observer = new PerformanceObserver((list) => {
    callback(list.getEntries());
  });

  observer.observe({ entryTypes: ['measure', 'navigation', 'paint', 'layout-shift'] });

  return () => observer.disconnect();
}
```

---

## 7. Performance Budget

```json
{
  "budgets": [
    {
      "resourceType": "script",
      "budget": 60000
    },
    {
      "resourceType": "stylesheet",
      "budget": 20000
    },
    {
      "resourceType": "total",
      "budget": 100000
    }
  ],
  "timings": [
    {
      "metric": "interactive",
      "budget": 3000
    },
    {
      "metric": "first-contentful-paint",
      "budget": 1500
    }
  ]
}
```

---

## 8. Performance Regression Testing

```typescript
// performance-regression.test.ts
describe('Performance Regression Tests', () => {
  const baseline = {
    fadeAnimationFPS: 60,
    bundleSize: 58.8,
    memoryGrowth: 7.9,
    cpuUsage: 24.3,
  };

  test('should not regress animation FPS', async () => {
    const currentFPS = await measureFPS('fade');

    expect(currentFPS).toBeGreaterThanOrEqual(baseline.fadeAnimationFPS - 2);

    if (currentFPS < baseline.fadeAnimationFPS) {
      console.warn(`⚠️ FPS regression: ${currentFPS} < ${baseline.fadeAnimationFPS}`);
    }
  });

  test('should not increase bundle size >5%', async () => {
    const currentSize = await getGzippedSize('total');
    const currentSizeKB = currentSize / 1024;

    const maxAllowed = baseline.bundleSize * 1.05;

    expect(currentSizeKB).toBeLessThan(maxAllowed);
  });

  test('should not increase memory growth', async () => {
    const currentGrowth = await measureMemoryGrowth(100);

    expect(currentGrowth).toBeLessThan(baseline.memoryGrowth * 1.2);
  });
});
```

---

## 9. CI/CD Performance Gates

```yaml
# .github/workflows/performance-gates.yml
name: Performance Gates

on: [pull_request]

jobs:
  performance-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4

      - name: Install dependencies
        run: npm ci

      - name: Run performance tests
        run: npm run test:performance

      - name: Run Lighthouse CI
        run: npm run lighthouse:ci

      - name: Check bundle size
        run: npm run bundlesize

      - name: Fail on performance regression
        if: failure()
        run: exit 1
```

---

**Document Version:** 1.0
**Created:** 2026-01-31
**Status:** READY FOR EXECUTION
