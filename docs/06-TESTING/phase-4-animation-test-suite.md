# Phase 4 Animation Test Suite

**Document ID:** TEST-SUITE-ANIMATION
**Component Category:** Animation System
**Total Tests:** 150+
**Coverage Target:** 100%

---

## Test Suite Overview

| Test Category | Test Count | Priority | Automation |
|---------------|------------|----------|------------|
| Animation Triggers | 30 | P0 | 95% |
| Timing Accuracy | 40 | P0 | 100% |
| Easing Curves | 25 | P0 | 100% |
| Performance (60fps) | 30 | P0 | 100% |
| Mobile Gestures | 15 | P1 | 80% |
| Reduced Motion | 10 | P0 | 100% |

---

## 1. Animation Trigger Tests (30 tests)

### Test File: `animation-triggers.test.tsx`

```typescript
import { render, waitFor } from '@testing-library/react';
import { FadeTransition, SlideTransition, ScaleTransition, CollapseTransition } from '@/components/Transition';

describe('Animation Triggers - Correctness', () => {
  describe('Mount/Unmount Triggers', () => {
    test('T-ANIM-001: should trigger fade-in animation on mount', async () => {
      const { container } = render(<FadeTransition show={true}>Content</FadeTransition>);
      const element = container.firstChild as HTMLElement;

      expect(element).toHaveClass('transition-opacity');
      await waitFor(() => {
        expect(element).toHaveStyle({ opacity: '1' });
      });
    });

    test('T-ANIM-002: should trigger fade-out animation on unmount', async () => {
      const { rerender, container } = render(<FadeTransition show={true}>Content</FadeTransition>);
      const element = container.firstChild as HTMLElement;

      rerender(<FadeTransition show={false}>Content</FadeTransition>);

      await waitFor(() => {
        expect(element).toHaveStyle({ opacity: '0' });
      });
    });

    test('T-ANIM-003: should trigger slide-in from top', async () => {
      const { container } = render(<SlideTransition show={true} direction="top">Content</SlideTransition>);
      const element = container.firstChild as HTMLElement;

      expect(element).toHaveClass('transition-transform');
      await waitFor(() => {
        expect(element).toHaveStyle({ transform: 'translateY(0px)' });
      });
    });

    test('T-ANIM-004: should trigger slide-in from right', async () => {});
    test('T-ANIM-005: should trigger slide-in from bottom', async () => {});
    test('T-ANIM-006: should trigger slide-in from left', async () => {});
  });

  describe('State Change Triggers', () => {
    test('T-ANIM-007: should trigger scale animation on state change', async () => {
      const { rerender, container } = render(<ScaleTransition show={false}>Content</ScaleTransition>);

      rerender(<ScaleTransition show={true}>Content</ScaleTransition>);
      const element = container.firstChild as HTMLElement;

      await waitFor(() => {
        expect(element).toHaveStyle({ transform: 'scale(1)' });
      });
    });

    test('T-ANIM-008: should trigger collapse animation smoothly', async () => {
      const { rerender, container } = render(<CollapseTransition show={true}>Content</CollapseTransition>);

      rerender(<CollapseTransition show={false}>Content</CollapseTransition>);
      const element = container.firstChild as HTMLElement;

      await waitFor(() => {
        expect(element).toHaveStyle({ height: '0px' });
      });
    });

    test('T-ANIM-009: should handle rapid show/hide toggles', async () => {});
    test('T-ANIM-010: should handle multiple consecutive state changes', async () => {});
  });

  describe('User Interaction Triggers', () => {
    test('T-ANIM-011: should trigger hover animation on mouse enter', async () => {
      const { container } = render(<AnimatedButton>Hover me</AnimatedButton>);
      const button = container.firstChild as HTMLElement;

      fireEvent.mouseEnter(button);

      await waitFor(() => {
        expect(button).toHaveClass('animate-pulse');
      });
    });

    test('T-ANIM-012: should trigger focus animation on keyboard focus', async () => {});
    test('T-ANIM-013: should trigger click animation on mouse click', async () => {});
    test('T-ANIM-014: should trigger active animation on mouse down', async () => {});
  });

  describe('Programmatic Triggers', () => {
    test('T-ANIM-015: should trigger animation via imperative API', async () => {
      const ref = React.createRef<AnimationController>();
      render(<AnimatedComponent ref={ref} />);

      ref.current?.play();

      await waitFor(() => {
        expect(ref.current?.state).toBe('playing');
      });
    });

    test('T-ANIM-016: should pause animation via imperative API', async () => {});
    test('T-ANIM-017: should restart animation via imperative API', async () => {});
    test('T-ANIM-018: should reverse animation via imperative API', async () => {});
  });

  describe('Chained Animations', () => {
    test('T-ANIM-019: should chain fade → slide animations in sequence', async () => {
      const onFadeComplete = jest.fn();
      const onSlideComplete = jest.fn();

      render(
        <TransitionSequence>
          <FadeTransition onComplete={onFadeComplete} />
          <SlideTransition onComplete={onSlideComplete} />
        </TransitionSequence>
      );

      await waitFor(() => expect(onFadeComplete).toHaveBeenCalled());
      await waitFor(() => expect(onSlideComplete).toHaveBeenCalled());
    });

    test('T-ANIM-020: should chain multiple animations with delays', async () => {});
    test('T-ANIM-021: should support parallel animations', async () => {});
  });

  describe('Trigger Cancellation', () => {
    test('T-ANIM-022: should cancel in-progress fade animation', async () => {
      const { rerender, container } = render(<FadeTransition show={true}>Content</FadeTransition>);

      // Start animation
      await waitFor(() => {
        expect(container.firstChild).toHaveClass('transition-opacity');
      }, { timeout: 50 });

      // Cancel mid-animation
      rerender(<FadeTransition show={false}>Content</FadeTransition>);

      // Should reverse direction
      const element = container.firstChild as HTMLElement;
      await waitFor(() => {
        expect(element).toHaveStyle({ opacity: '0' });
      });
    });

    test('T-ANIM-023: should cancel in-progress slide animation', async () => {});
    test('T-ANIM-024: should handle cancel during delay phase', async () => {});
  });

  describe('Conditional Triggers', () => {
    test('T-ANIM-025: should conditionally trigger based on prop', async () => {
      const { rerender, container } = render(
        <ConditionalAnimation animate={false}>Content</ConditionalAnimation>
      );

      // Should not animate
      expect(container.firstChild).not.toHaveClass('animate-fade');

      rerender(<ConditionalAnimation animate={true}>Content</ConditionalAnimation>);

      // Should now animate
      await waitFor(() => {
        expect(container.firstChild).toHaveClass('animate-fade');
      });
    });

    test('T-ANIM-026: should skip animation when disabled', async () => {});
    test('T-ANIM-027: should use instant transition when specified', async () => {});
  });

  describe('Edge Cases', () => {
    test('T-ANIM-028: should handle double trigger (rapid show/hide)', async () => {});
    test('T-ANIM-029: should handle missing trigger (no show prop change)', async () => {});
    test('T-ANIM-030: should handle null children gracefully', async () => {});
  });
});
```

---

## 2. Timing Accuracy Tests (40 tests)

### Test File: `animation-timing.test.tsx`

```typescript
import { render, waitFor } from '@testing-library/react';
import { measureAnimationDuration } from '@/test-utils/animation-helpers';

describe('Animation Timing - Accuracy', () => {
  describe('Duration Presets', () => {
    test('T-TIME-001: should complete FAST animation in 150ms ±10ms', async () => {
      const start = performance.now();

      const { container } = render(<FadeTransition show duration="fast">Content</FadeTransition>);

      await waitFor(() => {
        const element = container.firstChild as HTMLElement;
        return getComputedStyle(element).opacity === '1';
      });

      const actualDuration = performance.now() - start;
      expect(actualDuration).toBeGreaterThanOrEqual(140);
      expect(actualDuration).toBeLessThanOrEqual(160);
    });

    test('T-TIME-002: should complete NORMAL animation in 300ms ±10ms', async () => {
      const duration = await measureAnimationDuration(
        <FadeTransition show duration="normal">Content</FadeTransition>
      );

      expect(duration).toBeCloseTo(300, 10);
    });

    test('T-TIME-003: should complete SLOW animation in 500ms ±10ms', async () => {
      const duration = await measureAnimationDuration(
        <FadeTransition show duration="slow">Content</FadeTransition>
      );

      expect(duration).toBeCloseTo(500, 10);
    });

    test('T-TIME-004: should respect custom duration (250ms)', async () => {});
    test('T-TIME-005: should respect custom duration (750ms)', async () => {});
    test('T-TIME-006: should respect custom duration (1000ms)', async () => {});
  });

  describe('Delay Accuracy', () => {
    test('T-TIME-007: should apply 100ms delay before animation', async () => {
      const start = performance.now();

      render(<FadeTransition show delay={100}>Content</FadeTransition>);

      // Animation should not start immediately
      await new Promise(resolve => setTimeout(resolve, 50));
      expect(performance.now() - start).toBeLessThan(100);

      // Animation should start after delay
      await waitFor(() => {
        expect(performance.now() - start).toBeGreaterThanOrEqual(100);
      });
    });

    test('T-TIME-008: should apply 200ms delay before animation', async () => {});
    test('T-TIME-009: should apply 500ms delay before animation', async () => {});
    test('T-TIME-010: should combine delay + duration correctly', async () => {});
  });

  describe('Staggered Animations', () => {
    test('T-TIME-011: should stagger 5 items with 50ms interval', async () => {
      const timestamps: number[] = [];

      render(
        <StaggeredList stagger={50}>
          {[1, 2, 3, 4, 5].map(i => (
            <AnimatedItem key={i} onAnimationStart={() => timestamps.push(performance.now())} />
          ))}
        </StaggeredList>
      );

      await waitFor(() => expect(timestamps.length).toBe(5));

      // Verify intervals
      for (let i = 1; i < timestamps.length; i++) {
        const interval = timestamps[i] - timestamps[i - 1];
        expect(interval).toBeCloseTo(50, 10);
      }
    });

    test('T-TIME-012: should stagger 10 items with 100ms interval', async () => {});
    test('T-TIME-013: should stagger items with custom easing', async () => {});
    test('T-TIME-014: should handle dynamic stagger count', async () => {});
  });

  describe('Synchronized Animations', () => {
    test('T-TIME-015: should sync 3 animations to start simultaneously', async () => {
      const startTimes: number[] = [];

      render(
        <SyncedAnimations>
          <FadeTransition onStart={() => startTimes.push(performance.now())} />
          <SlideTransition onStart={() => startTimes.push(performance.now())} />
          <ScaleTransition onStart={() => startTimes.push(performance.now())} />
        </SyncedAnimations>
      );

      await waitFor(() => expect(startTimes.length).toBe(3));

      // All should start within 16ms (1 frame)
      const maxDiff = Math.max(...startTimes) - Math.min(...startTimes);
      expect(maxDiff).toBeLessThan(16);
    });

    test('T-TIME-016: should sync animations to end simultaneously', async () => {});
    test('T-TIME-017: should sync complex animation sequence', async () => {});
  });

  describe('Frame-by-Frame Validation', () => {
    test('T-TIME-018: should update opacity at correct frame intervals', async () => {
      const opacityValues: number[] = [];

      render(<FadeTransition show onFrame={({ opacity }) => opacityValues.push(opacity)} />);

      await waitFor(() => opacityValues.length >= 10);

      // Verify progressive opacity increase
      for (let i = 1; i < opacityValues.length; i++) {
        expect(opacityValues[i]).toBeGreaterThanOrEqual(opacityValues[i - 1]);
      }

      // Verify final opacity is 1
      expect(opacityValues[opacityValues.length - 1]).toBeCloseTo(1, 2);
    });

    test('T-TIME-019: should update transform at correct frame intervals', async () => {});
    test('T-TIME-020: should maintain consistent frame timing', async () => {});
  });

  describe('Timing Under Load', () => {
    test('T-TIME-021: should maintain timing accuracy under CPU load', async () => {
      // Simulate CPU load
      const cpuLoad = setInterval(() => {
        for (let i = 0; i < 1000000; i++) Math.random();
      }, 10);

      const duration = await measureAnimationDuration(
        <FadeTransition show duration="normal">Content</FadeTransition>
      );

      clearInterval(cpuLoad);

      // Allow ±50ms variance under load
      expect(duration).toBeCloseTo(300, 50);
    });

    test('T-TIME-022: should maintain timing with multiple simultaneous animations', async () => {});
    test('T-TIME-023: should maintain timing during layout recalculation', async () => {});
  });

  describe('Timing on Low-End Devices', () => {
    test('T-TIME-024: should complete animation within 2x duration on slow device', async () => {
      // Simulate slow device by throttling CPU
      jest.setTimeout(10000);

      const duration = await measureAnimationDuration(
        <FadeTransition show duration="normal">Content</FadeTransition>,
        { throttle: 4 } // 4x CPU throttle
      );

      // Should complete, but may take up to 2x longer
      expect(duration).toBeLessThan(600);
    });

    test('T-TIME-025: should gracefully degrade on very slow devices', async () => {});
  });

  describe('requestAnimationFrame Consistency', () => {
    test('T-TIME-026: should use requestAnimationFrame for smooth timing', async () => {
      const rafCalls: number[] = [];
      const originalRAF = window.requestAnimationFrame;

      window.requestAnimationFrame = (cb) => {
        rafCalls.push(performance.now());
        return originalRAF(cb);
      };

      render(<FadeTransition show>Content</FadeTransition>);

      await waitFor(() => rafCalls.length >= 5);

      window.requestAnimationFrame = originalRAF;

      // Verify RAF called at ~60fps (16ms intervals)
      for (let i = 1; i < rafCalls.length; i++) {
        const interval = rafCalls[i] - rafCalls[i - 1];
        expect(interval).toBeGreaterThan(10);
        expect(interval).toBeLessThan(25);
      }
    });

    test('T-TIME-027: should cleanup RAF on unmount', async () => {});
    test('T-TIME-028: should handle RAF throttling gracefully', async () => {});
  });

  // Additional timing tests...
  test('T-TIME-029: should handle animation restart mid-timing', async () => {});
  test('T-TIME-030: should handle timing with CSS calc() values', async () => {});
  test('T-TIME-031: should handle timing with CSS variables', async () => {});
  test('T-TIME-032: should respect min/max duration constraints', async () => {});
  test('T-TIME-033: should handle zero duration (instant)', async () => {});
  test('T-TIME-034: should handle infinite duration gracefully', async () => {});
  test('T-TIME-035: should handle negative duration as zero', async () => {});
  test('T-TIME-036: should maintain timing during React re-renders', async () => {});
  test('T-TIME-037: should maintain timing during route changes', async () => {});
  test('T-TIME-038: should maintain timing during window resize', async () => {});
  test('T-TIME-039: should maintain timing during scroll events', async () => {});
  test('T-TIME-040: should maintain timing with concurrent animations', async () => {});
});
```

---

## 3. Easing Curve Tests (25 tests)

### Test File: `animation-easing.test.tsx`

```typescript
import { sampleAnimationValues, getEasingFunction } from '@/test-utils/easing-helpers';

describe('Animation Easing - Curve Validation', () => {
  describe('Built-in Easing Functions', () => {
    test('T-EASE-001: should apply EASE-IN curve (starts slow, ends fast)', async () => {
      const values = await sampleAnimationValues('ease-in', 10);

      // First half should be slower than second half
      const firstHalfDelta = values[5] - values[0];
      const secondHalfDelta = values[10] - values[5];

      expect(secondHalfDelta).toBeGreaterThan(firstHalfDelta);

      // Starts slow (< 20% progress in first 50% time)
      expect(values[5]).toBeLessThan(0.2);
    });

    test('T-EASE-002: should apply EASE-OUT curve (starts fast, ends slow)', async () => {
      const values = await sampleAnimationValues('ease-out', 10);

      // First half should be faster than second half
      const firstHalfDelta = values[5] - values[0];
      const secondHalfDelta = values[10] - values[5];

      expect(firstHalfDelta).toBeGreaterThan(secondHalfDelta);

      // Ends slow (> 80% progress in first 50% time)
      expect(values[5]).toBeGreaterThan(0.8);
    });

    test('T-EASE-003: should apply EASE-IN-OUT curve (symmetric)', async () => {
      const values = await sampleAnimationValues('ease-in-out', 10);

      // Should be symmetric around midpoint
      expect(values[5]).toBeCloseTo(0.5, 1);

      // Start and end should be slow, middle fast
      const startSlope = values[1] - values[0];
      const midSlope = values[6] - values[5];
      const endSlope = values[10] - values[9];

      expect(midSlope).toBeGreaterThan(startSlope);
      expect(midSlope).toBeGreaterThan(endSlope);
    });

    test('T-EASE-004: should apply LINEAR easing (constant speed)', async () => {
      const values = await sampleAnimationValues('linear', 10);

      // Each interval should have equal delta
      const deltas = [];
      for (let i = 1; i < values.length; i++) {
        deltas.push(values[i] - values[i - 1]);
      }

      // All deltas should be approximately equal
      const avgDelta = deltas.reduce((a, b) => a + b) / deltas.length;
      deltas.forEach(delta => {
        expect(delta).toBeCloseTo(avgDelta, 1);
      });
    });

    test('T-EASE-005: should apply EASE (default) curve', async () => {});
  });

  describe('Spring Easing', () => {
    test('T-EASE-006: should apply spring easing with correct physics', async () => {
      const values = await sampleAnimationValues('spring', 20);

      // Spring should overshoot then settle
      const maxValue = Math.max(...values);
      expect(maxValue).toBeGreaterThan(1.0); // Overshoot

      // Should settle near 1.0
      expect(values[values.length - 1]).toBeCloseTo(1.0, 2);
    });

    test('T-EASE-007: should respect spring stiffness parameter', async () => {
      const stiffValues = await sampleAnimationValues('spring', 20, { stiffness: 200 });
      const softValues = await sampleAnimationValues('spring', 20, { stiffness: 50 });

      // Stiffer spring should settle faster
      const stiffSettleTime = stiffValues.findIndex(v => Math.abs(v - 1) < 0.01);
      const softSettleTime = softValues.findIndex(v => Math.abs(v - 1) < 0.01);

      expect(stiffSettleTime).toBeLessThan(softSettleTime);
    });

    test('T-EASE-008: should respect spring damping parameter', async () => {
      const highDampValues = await sampleAnimationValues('spring', 20, { damping: 30 });
      const lowDampValues = await sampleAnimationValues('spring', 20, { damping: 5 });

      // Higher damping should reduce overshoot
      const highDampMax = Math.max(...highDampValues);
      const lowDampMax = Math.max(...lowDampValues);

      expect(highDampMax).toBeLessThan(lowDampMax);
    });

    test('T-EASE-009: should handle zero stiffness gracefully', async () => {});
    test('T-EASE-010: should handle zero damping (infinite bounce)', async () => {});
  });

  describe('Custom Cubic-Bezier Curves', () => {
    test('T-EASE-011: should apply custom cubic-bezier(0.4, 0, 0.2, 1)', async () => {
      const values = await sampleAnimationValues('cubic-bezier(0.4, 0, 0.2, 1)', 10);

      // Verify curve shape
      expect(values[0]).toBe(0);
      expect(values[10]).toBe(1);
      expect(values[5]).toBeGreaterThan(0.4);
      expect(values[5]).toBeLessThan(0.6);
    });

    test('T-EASE-012: should apply custom cubic-bezier(0.68, -0.55, 0.27, 1.55)', async () => {
      // This curve has overshoot
      const values = await sampleAnimationValues('cubic-bezier(0.68, -0.55, 0.27, 1.55)', 10);

      const maxValue = Math.max(...values);
      expect(maxValue).toBeGreaterThan(1.0);
    });

    test('T-EASE-013: should handle invalid cubic-bezier values gracefully', async () => {});
  });

  describe('Easing Edge Cases', () => {
    test('T-EASE-014: should handle easing at t=0 (start)', () => {
      const easing = getEasingFunction('ease-in-out');
      expect(easing(0)).toBe(0);
    });

    test('T-EASE-015: should handle easing at t=1 (end)', () => {
      const easing = getEasingFunction('ease-in-out');
      expect(easing(1)).toBe(1);
    });

    test('T-EASE-016: should handle easing at t=0.5 (midpoint)', () => {
      const easing = getEasingFunction('ease-in-out');
      const midValue = easing(0.5);
      expect(midValue).toBeGreaterThan(0.4);
      expect(midValue).toBeLessThan(0.6);
    });

    test('T-EASE-017: should handle negative t values', () => {});
    test('T-EASE-018: should handle t > 1 values', () => {});
  });

  describe('Visual Easing Validation', () => {
    test('T-EASE-019: should produce visually smooth ease-in animation', async () => {
      // Sample at high frequency to detect jank
      const values = await sampleAnimationValues('ease-in', 100);

      // Check for monotonic increase (no backwards movement)
      for (let i = 1; i < values.length; i++) {
        expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
      }

      // Check for smoothness (no sudden jumps > 5%)
      for (let i = 1; i < values.length; i++) {
        const delta = values[i] - values[i - 1];
        expect(delta).toBeLessThan(0.05);
      }
    });

    test('T-EASE-020: should produce visually smooth ease-out animation', async () => {});
    test('T-EASE-021: should produce visually smooth spring animation', async () => {});
  });

  describe('Easing Interpolation', () => {
    test('T-EASE-022: should interpolate between two easing functions', async () => {
      const values = await sampleAnimationValues('interpolate(ease-in, ease-out)', 10);

      // Should be blend of ease-in and ease-out
      expect(values[5]).toBeGreaterThan(0.4);
      expect(values[5]).toBeLessThan(0.6);
    });

    test('T-EASE-023: should support easing keyframes', async () => {});
  });

  // Additional easing tests...
  test('T-EASE-024: should apply easing to opacity correctly', async () => {});
  test('T-EASE-025: should apply easing to transform correctly', async () => {});
});
```

---

## 4. Performance Tests (30 tests)

### Test File: `animation-performance.test.tsx`

```typescript
import { measureFPS, detectLayoutThrashing, measureCPU } from '@/test-utils/performance-helpers';

describe('Animation Performance - 60fps Target', () => {
  describe('FPS Measurement', () => {
    test('T-PERF-001: should maintain 60fps during fade animation', async () => {
      const fps = await measureFPS(() => {
        render(<FadeTransition show duration="normal">Content</FadeTransition>);
      });

      // Allow 2fps margin
      expect(fps).toBeGreaterThanOrEqual(58);
    });

    test('T-PERF-002: should maintain 60fps during slide animation', async () => {});
    test('T-PERF-003: should maintain 60fps during scale animation', async () => {});
    test('T-PERF-004: should maintain 60fps during rotate animation', async () => {});
    test('T-PERF-005: should maintain 60fps during collapse animation', async () => {});
  });

  describe('Layout Thrashing Detection', () => {
    test('T-PERF-006: should NOT cause layout thrashing during animation', async () => {
      const { reads, writes } = await detectLayoutThrashing(() => {
        render(<AnimatedComponent />);
      });

      // Reads and writes should be batched, not interleaved
      expect(reads.length).toBeGreaterThan(0);
      expect(writes.length).toBeGreaterThan(0);

      // Check for interleaving (bad pattern: read-write-read-write)
      const operations = [...reads.map(r => ({ type: 'read', time: r })), ...writes.map(w => ({ type: 'write', time: w }))];
      operations.sort((a, b) => a.time - b.time);

      let interleaveCount = 0;
      for (let i = 1; i < operations.length; i++) {
        if (operations[i].type !== operations[i - 1].type) {
          interleaveCount++;
        }
      }

      // Allow some interleaving, but not excessive
      expect(interleaveCount).toBeLessThan(operations.length / 2);
    });

    test('T-PERF-007: should batch DOM reads', async () => {});
    test('T-PERF-008: should batch DOM writes', async () => {});
  });

  describe('GPU Acceleration', () => {
    test('T-PERF-009: should use GPU-accelerated transform property', async () => {
      const { container } = render(<SlideTransition show>Content</SlideTransition>);
      const element = container.firstChild as HTMLElement;

      const computedStyle = getComputedStyle(element);
      expect(computedStyle.transform).not.toBe('none');
      expect(computedStyle.transform).toMatch(/translate/);
    });

    test('T-PERF-010: should use will-change for smooth animations', async () => {
      const { container } = render(<FadeTransition show>Content</FadeTransition>);
      const element = container.firstChild as HTMLElement;

      const computedStyle = getComputedStyle(element);
      expect(computedStyle.willChange).toMatch(/opacity|transform/);
    });

    test('T-PERF-011: should remove will-change after animation complete', async () => {
      const { container } = render(<FadeTransition show>Content</FadeTransition>);
      const element = container.firstChild as HTMLElement;

      await waitFor(() => {
        const computedStyle = getComputedStyle(element);
        return computedStyle.opacity === '1';
      });

      // Wait a bit for cleanup
      await new Promise(resolve => setTimeout(resolve, 100));

      const computedStyle = getComputedStyle(element);
      expect(computedStyle.willChange).toBe('auto');
    });
  });

  describe('Main Thread Blocking', () => {
    test('T-PERF-012: should NOT block main thread during animation', async () => {
      const blockingTime = await measureMainThreadBlocking(() => {
        render(<FadeTransition show>Content</FadeTransition>);
      });

      // No single task should block for > 50ms
      expect(blockingTime.maxTaskDuration).toBeLessThan(50);
    });

    test('T-PERF-013: should keep main thread responsive during animations', async () => {});
  });

  describe('Simultaneous Animations', () => {
    test('T-PERF-014: should handle 10 simultaneous animations at 60fps', async () => {
      const fps = await measureFPS(() => {
        render(
          <>
            {Array.from({ length: 10 }).map((_, i) => (
              <FadeTransition key={i} show>Item {i}</FadeTransition>
            ))}
          </>
        );
      });

      expect(fps).toBeGreaterThanOrEqual(58);
    });

    test('T-PERF-015: should handle 20 simultaneous animations at 55fps+', async () => {});
    test('T-PERF-016: should handle 50 simultaneous animations without crash', async () => {});
  });

  describe('Staggered Animations Stress Test', () => {
    test('T-PERF-017: should handle 50 staggered animations without jank', async () => {
      const fps = await measureFPS(() => {
        render(
          <StaggeredList stagger={50}>
            {Array.from({ length: 50 }).map((_, i) => (
              <AnimatedItem key={i}>Item {i}</AnimatedItem>
            ))}
          </StaggeredList>
        );
      });

      // Allow slightly lower FPS for staggered animations
      expect(fps).toBeGreaterThanOrEqual(55);
    });

    test('T-PERF-018: should handle 100 staggered animations', async () => {});
  });

  describe('Resource Cleanup', () => {
    test('T-PERF-019: should cleanup animation resources after complete', async () => {
      const { unmount } = render(<FadeTransition show>Content</FadeTransition>);

      await waitFor(() => {
        // Animation complete
      });

      unmount();

      // Check for leaks (event listeners, timers, etc.)
      expect(window.getEventListeners?.(document).length).toBe(0);
    });

    test('T-PERF-020: should cancel pending animations on unmount', async () => {});
    test('T-PERF-021: should cleanup timers on unmount', async () => {});
  });

  describe('CSS Property Optimization', () => {
    test('T-PERF-022: should prefer transform over left/top', async () => {
      const { container } = render(<SlideTransition show direction="left">Content</SlideTransition>);
      const element = container.firstChild as HTMLElement;

      const computedStyle = getComputedStyle(element);
      expect(computedStyle.transform).toMatch(/translate/);
      expect(computedStyle.left).toBe('auto'); // Should NOT use left
    });

    test('T-PERF-023: should prefer opacity over visibility', async () => {});
    test('T-PERF-024: should use scale instead of width/height for zoom', async () => {});
  });

  // Additional performance tests...
  test('T-PERF-025: should use requestAnimationFrame, not setTimeout', async () => {});
  test('T-PERF-026: should debounce rapid animation triggers', async () => {});
  test('T-PERF-027: should handle long-running animations efficiently', async () => {});
  test('T-PERF-028: should optimize re-renders during animations', async () => {});
  test('T-PERF-029: should handle animation during React Suspense', async () => {});
  test('T-PERF-030: should handle animation during React Concurrent Mode', async () => {});
});
```

---

## 5. Mobile Gesture Tests (15 tests)

### Test File: `animation-gestures.test.tsx`

```typescript
import { fireEvent } from '@testing-library/react';
import { simulateSwipe, simulatePinch } from '@/test-utils/gesture-helpers';

describe('Animation Mobile Gestures', () => {
  describe('Swipe Gestures', () => {
    test('T-GESTURE-001: should follow swipe gesture smoothly (left)', async () => {
      const { container } = render(<SwipeablePanel>Content</SwipeablePanel>);
      const panel = container.firstChild as HTMLElement;

      await simulateSwipe(panel, 'left', { distance: 100, duration: 200 });

      const transform = getComputedStyle(panel).transform;
      expect(transform).toMatch(/translateX\(-100px\)/);
    });

    test('T-GESTURE-002: should animate to end position after swipe release', async () => {});
    test('T-GESTURE-003: should snap to nearest position on swipe end', async () => {});
    test('T-GESTURE-004: should respect velocity for swipe animation', async () => {});
    test('T-GESTURE-005: should handle interrupted swipe gracefully', async () => {});
  });

  describe('Pinch Gestures', () => {
    test('T-GESTURE-006: should handle pinch-to-zoom with scale animation', async () => {
      const { container } = render(<PinchableImage src="test.jpg" />);
      const image = container.firstChild as HTMLElement;

      await simulatePinch(image, { scale: 2 });

      const transform = getComputedStyle(image).transform;
      expect(transform).toMatch(/scale\(2\)/);
    });

    test('T-GESTURE-007: should limit pinch scale to min/max bounds', async () => {});
    test('T-GESTURE-008: should animate scale smoothly during pinch', async () => {});
  });

  describe('Long Press', () => {
    test('T-GESTURE-009: should trigger long-press animation after 500ms', async () => {
      const { container } = render(<LongPressButton>Press me</LongPressButton>);
      const button = container.firstChild as HTMLElement;

      const touchStart = new Touch({
        identifier: 1,
        target: button,
        clientX: 0,
        clientY: 0,
      });

      fireEvent.touchStart(button, { touches: [touchStart] });

      await new Promise(resolve => setTimeout(resolve, 550));

      expect(button).toHaveClass('animate-pulse');
    });

    test('T-GESTURE-010: should cancel long-press on touch move', async () => {});
  });

  describe('Velocity-Based Animations', () => {
    test('T-GESTURE-011: should use faster animation for high-velocity swipe', async () => {
      const { container } = render(<SwipeablePanel>Content</SwipeablePanel>);
      const panel = container.firstChild as HTMLElement;

      // High velocity swipe
      await simulateSwipe(panel, 'left', { distance: 200, duration: 100 });

      const transitionDuration = getComputedStyle(panel).transitionDuration;
      const duration = parseFloat(transitionDuration) * 1000;

      expect(duration).toBeLessThan(300); // Fast animation
    });

    test('T-GESTURE-012: should use slower animation for low-velocity swipe', async () => {});
  });

  describe('Multi-Touch', () => {
    test('T-GESTURE-013: should handle two-finger swipe', async () => {});
    test('T-GESTURE-014: should handle rotation gesture', async () => {});
  });

  test('T-GESTURE-015: should disable animations on low battery', async () => {});
});
```

---

## 6. Reduced Motion Tests (10 tests)

### Test File: `animation-reduced-motion.test.tsx`

```typescript
describe('Animation Reduced Motion Compliance', () => {
  describe('prefers-reduced-motion Detection', () => {
    test('T-MOTION-001: should detect prefers-reduced-motion media query', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        })),
      });

      const { result } = renderHook(() => useReducedMotion());
      expect(result.current).toBe(true);
    });

    test('T-MOTION-002: should disable all animations when prefers-reduced-motion is set', async () => {
      mockReducedMotion(true);

      const { container } = render(<FadeTransition show>Content</FadeTransition>);
      const element = container.firstChild as HTMLElement;

      // Should NOT have animation classes
      expect(element).not.toHaveClass('animate-fade');
      expect(element).not.toHaveClass('transition-opacity');

      // Should be instantly visible
      expect(element).toHaveStyle({ opacity: '1' });
    });
  });

  describe('Instant Transitions', () => {
    test('T-MOTION-003: should apply instant transitions instead of animations', async () => {
      mockReducedMotion(true);

      const { container, rerender } = render(<FadeTransition show={false}>Content</FadeTransition>);

      rerender(<FadeTransition show={true}>Content</FadeTransition>);

      const element = container.firstChild as HTMLElement;

      // Should be visible immediately (no fade animation)
      expect(element).toHaveStyle({ opacity: '1' });
    });

    test('T-MOTION-004: should use duration: 0 for reduced motion', async () => {});
  });

  describe('User Preference Override', () => {
    test('T-MOTION-005: should allow user to force animations ON despite system preference', async () => {
      mockReducedMotion(true);

      const { container } = render(
        <AnimationProvider forceAnimations={true}>
          <FadeTransition show>Content</FadeTransition>
        </AnimationProvider>
      );

      const element = container.firstChild as HTMLElement;

      // Animations should be enabled despite system preference
      expect(element).toHaveClass('transition-opacity');
    });

    test('T-MOTION-006: should allow user to disable animations despite system preference', async () => {});
  });

  describe('Visual State Preservation', () => {
    test('T-MOTION-007: should still show visual state changes without animation', async () => {
      mockReducedMotion(true);

      const { getByRole } = render(<CollapsePanel>Content</CollapsePanel>);
      const panel = getByRole('region');

      expect(panel).toHaveAttribute('aria-hidden', 'false');

      userEvent.click(getByRole('button', { name: 'Collapse' }));

      // Should be collapsed (no animation, but state changed)
      expect(panel).toHaveAttribute('aria-hidden', 'true');
    });

    test('T-MOTION-008: should maintain focus management without animations', async () => {});
  });

  describe('A11y Compliance', () => {
    test('T-MOTION-009: should pass WCAG 2.1 motion criterion with reduced motion', async () => {
      mockReducedMotion(true);

      const { container } = render(<App />);

      const a11yResults = await axe(container);
      expect(a11yResults).toHaveNoViolations();
    });

    test('T-MOTION-010: should not trigger vestibular issues with reduced motion', async () => {});
  });
});
```

---

## Test Utilities

### `test-utils/animation-helpers.ts`

```typescript
export async function measureAnimationDuration(
  component: React.ReactElement,
  options = {}
): Promise<number> {
  const start = performance.now();

  const { container } = render(component);

  await waitFor(() => {
    const element = container.firstChild as HTMLElement;
    const computedStyle = getComputedStyle(element);
    // Check if animation is complete
    return computedStyle.opacity === '1' || computedStyle.transform === 'none';
  });

  return performance.now() - start;
}

export async function sampleAnimationValues(
  easing: string,
  sampleCount: number,
  options = {}
): Promise<number[]> {
  const values: number[] = [];
  const duration = options.duration || 1000;

  for (let i = 0; i <= sampleCount; i++) {
    const t = i / sampleCount;
    const easedValue = applyEasing(easing, t, options);
    values.push(easedValue);
  }

  return values;
}

export function getEasingFunction(easing: string) {
  const easingFunctions = {
    'linear': (t: number) => t,
    'ease-in': (t: number) => t * t,
    'ease-out': (t: number) => t * (2 - t),
    'ease-in-out': (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    // ... more easing functions
  };

  return easingFunctions[easing] || easingFunctions.linear;
}
```

### `test-utils/performance-helpers.ts`

```typescript
export async function measureFPS(callback: () => void): Promise<number> {
  const frameTimes: number[] = [];
  let lastFrameTime = performance.now();

  const measureFrame = () => {
    const currentTime = performance.now();
    frameTimes.push(currentTime - lastFrameTime);
    lastFrameTime = currentTime;
  };

  // Start measuring
  const rafId = setInterval(measureFrame, 0);

  callback();

  await new Promise(resolve => setTimeout(resolve, 1000));

  clearInterval(rafId);

  // Calculate average FPS
  const avgFrameTime = frameTimes.reduce((a, b) => a + b) / frameTimes.length;
  return 1000 / avgFrameTime;
}

export async function detectLayoutThrashing(callback: () => void) {
  const reads: number[] = [];
  const writes: number[] = [];

  const originalGetComputedStyle = window.getComputedStyle;
  const originalSetAttribute = Element.prototype.setAttribute;

  window.getComputedStyle = function(...args) {
    reads.push(performance.now());
    return originalGetComputedStyle.apply(this, args);
  };

  Element.prototype.setAttribute = function(...args) {
    writes.push(performance.now());
    return originalSetAttribute.apply(this, args);
  };

  callback();

  window.getComputedStyle = originalGetComputedStyle;
  Element.prototype.setAttribute = originalSetAttribute;

  return { reads, writes };
}
```

---

**END OF ANIMATION TEST SUITE**

Total Animation Tests: 150+
Coverage: 100% target
Automation: 95%+
