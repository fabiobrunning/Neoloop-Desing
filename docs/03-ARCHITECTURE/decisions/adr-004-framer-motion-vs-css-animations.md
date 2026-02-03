# ADR-004: Framer Motion vs CSS Animations

**Date:** 2026-01-31
**Status:** Accepted
**Deciders:** @architect, @dev
**Related:** Phase 4 - Animation Architecture

---

## Context

The Neoloop Design System Builder requires a comprehensive animation strategy to provide polished user experience. We need to decide when to use CSS animations, when to use Framer Motion, and establish clear guidelines for the team.

### Requirements

1. **Performance**: Animations must maintain 60fps consistently
2. **Developer Experience**: Easy-to-use API for developers
3. **Bundle Size**: Minimize JavaScript overhead
4. **Flexibility**: Support simple to complex animations
5. **Accessibility**: Respect `prefers-reduced-motion`
6. **Maintainability**: Clear patterns and conventions

### Constraints

- Budget: Initial bundle < 180 KB gzipped
- Target: 60fps minimum across all animations
- Support: Modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)

---

## Decision

**We will use a hybrid approach:**

### CSS Animations for:
- **Micro-interactions** (< 200ms)
  - Button hover/press states
  - Input focus states
  - Toggle switches
  - Checkbox/radio selections
  - Simple opacity/transform transitions

### Framer Motion for:
- **Complex animations** (200ms+)
  - Page transitions
  - Modal enter/exit
  - Drawer slide-in/out
  - Multi-step sequences
  - Gesture-based interactions (drag, swipe)
  - Stagger animations (lists)
  - Physics-based animations (spring, inertia)

### Decision Matrix

```typescript
const animationDecisionTree = {
  // Simple state change?
  simpleStateChange: 'CSS',

  // Complex orchestration (multiple elements)?
  complexOrchestration: 'Framer Motion',

  // Physics-based (spring, bounce)?
  physicsBased: 'Framer Motion',

  // Gesture-based (drag, swipe)?
  gestureBased: 'Framer Motion',

  // Route/view transitions?
  routeTransitions: 'Framer Motion + AnimatePresence',

  // Performance-critical (loading spinners)?
  performanceCritical: 'CSS',
}
```

---

## Rationale

### Why CSS for Micro-interactions?

**Pros:**
- ✅ **Zero JS overhead**: No bundle size impact
- ✅ **GPU-accelerated**: Runs on compositor thread
- ✅ **Better performance**: No React re-renders
- ✅ **Simpler**: Less code, easier to understand
- ✅ **Native browser optimization**: Hardware-accelerated

**Cons:**
- ❌ **Limited control**: Can't interrupt or sequence complex animations
- ❌ **No JavaScript access**: Can't programmatically control
- ❌ **Basic easing only**: No spring physics

**Example:**
```css
.button {
  transition: background-color 150ms ease-out,
              transform 100ms ease-out;
}

.button:hover {
  transform: translateY(-1px);
}

.button:active {
  transform: translateY(0);
}
```

### Why Framer Motion for Complex Animations?

**Pros:**
- ✅ **Powerful API**: Declarative, React-friendly
- ✅ **Spring physics**: Natural, realistic motion
- ✅ **Gesture support**: Drag, pan, tap built-in
- ✅ **Layout animations**: Automatic layout transitions
- ✅ **Variants system**: Reusable animation states
- ✅ **AnimatePresence**: Proper exit animations
- ✅ **Accessibility built-in**: Respects `prefers-reduced-motion`

**Cons:**
- ❌ **Bundle size**: ~50 KB gzipped (but tree-shakeable)
- ❌ **Learning curve**: More complex API
- ❌ **Overhead**: Runs in JavaScript (but optimized)

**Example:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
>
  {children}
</motion.div>
```

### Why Not Other Options?

#### React Spring
- ❌ Larger bundle size (~60 KB)
- ❌ More complex API (hooks-based)
- ❌ Less declarative than Framer Motion
- ✅ Better physics engine (but overkill for our needs)

#### Anime.js
- ❌ Not React-specific
- ❌ Imperative API (harder to use with React)
- ❌ No built-in accessibility
- ✅ Very powerful for complex animations (but not needed)

#### GSAP
- ❌ Commercial license required for some features
- ❌ Imperative API
- ❌ Much larger bundle (~100 KB)
- ✅ Industry standard for complex animations (but overkill)

#### Web Animations API
- ✅ Native browser API (no bundle size)
- ❌ Poor browser support (Safari issues)
- ❌ Low-level, verbose API
- ❌ No React integration

---

## Implementation Guidelines

### Rule 1: Always Use CSS for Simple Transitions

```typescript
// ❌ BAD: Using Framer Motion for simple hover
<motion.button whileHover={{ scale: 1.05 }}>
  Click me
</motion.button>

// ✅ GOOD: Using CSS
<button className="hover:scale-105 transition-transform duration-200">
  Click me
</button>
```

### Rule 2: Use Framer Motion for Complex Sequences

```typescript
// ❌ BAD: Trying to orchestrate with CSS
<div className="animate-sequence">...</div>

// ✅ GOOD: Using Framer Motion variants
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  <motion.div variants={itemVariants}>Item 1</motion.div>
  <motion.div variants={itemVariants}>Item 2</motion.div>
  <motion.div variants={itemVariants}>Item 3</motion.div>
</motion.div>
```

### Rule 3: Always Respect Reduced Motion

```typescript
// Custom hook for all animations
export function useAnimation() {
  const shouldReduceMotion = useReducedMotion()

  const getPreset = (presetName) => {
    if (shouldReduceMotion) {
      return {
        initial: {},
        animate: {},
        exit: {},
        transition: { duration: 0 },
      }
    }
    return animationTokens.presets[presetName]
  }

  return { getPreset, shouldReduceMotion }
}
```

### Rule 4: GPU-Accelerated Properties Only

```typescript
// ❌ BAD: Animating expensive properties
{
  width: ['100px', '200px'],
  backgroundColor: ['#ff0000', '#00ff00'],
}

// ✅ GOOD: GPU-accelerated properties only
{
  transform: ['scale(1)', 'scale(1.2)'],
  opacity: [1, 0.8],
}
```

---

## Performance Budget

| Animation Type | Tool | Max Bundle | Max Duration |
|---------------|------|------------|--------------|
| Micro (< 200ms) | CSS | 0 KB | 200ms |
| Transitions (200-400ms) | CSS or Framer | ~5 KB | 400ms |
| Page transitions | Framer | ~20 KB | 500ms |
| Complex sequences | Framer | ~30 KB | 1000ms |

**Total Framer Motion impact:** ~50 KB gzipped (tree-shaken)

---

## Testing Strategy

### CSS Animation Tests
```css
/* Test with Chrome DevTools Performance tab */
/* Ensure no layout thrashing */
/* Check frame rate (should be 60fps) */
```

### Framer Motion Tests
```typescript
// Test animation variants
it('applies correct animation preset', () => {
  const { getPreset } = useAnimation()
  const preset = getPreset('fadeIn')
  expect(preset.initial).toEqual({ opacity: 0 })
})

// Test reduced motion
it('disables animations for reduced motion', () => {
  mockReducedMotion(true)
  const { getPreset } = useAnimation()
  const preset = getPreset('slideUp')
  expect(preset.transition.duration).toBe(0)
})
```

---

## Migration Path

### Phase 1 (Current - Week 1)
- Define animation tokens
- Create CSS animation utilities
- Install Framer Motion
- Create animation hooks

### Phase 2 (Week 2)
- Implement micro-interactions (CSS)
- Create reusable animation components (Framer)
- Build animation presets library

### Phase 3 (Week 3)
- Page transitions (Framer)
- Modal/Drawer animations (Framer)
- List stagger animations (Framer)

### Phase 4 (Week 4)
- Performance testing
- Bundle size optimization
- Accessibility audit

---

## Success Metrics

| Metric | Target | Critical |
|--------|--------|----------|
| Average FPS | 60fps | Yes |
| Min FPS | 55fps | Yes |
| Framer Motion bundle | < 50 KB | Yes |
| Animation duration (avg) | < 300ms | No |
| Reduced motion support | 100% | Yes |
| Lighthouse Performance | > 90 | Yes |

---

## Consequences

### Positive

1. **Best of Both Worlds**: Fast CSS for simple animations, powerful Framer Motion for complex ones
2. **Optimal Bundle Size**: Only pay for Framer Motion when needed
3. **Great DX**: Declarative API for developers
4. **Accessibility**: Built-in reduced motion support
5. **Performance**: 60fps animations across the board
6. **Maintainability**: Clear guidelines on when to use each approach

### Negative

1. **Learning Curve**: Team needs to learn Framer Motion API
2. **Two Systems**: Developers need to know when to use CSS vs Framer
3. **Bundle Size**: Still adding ~50 KB for Framer Motion
4. **Complexity**: More tools in the stack

### Mitigation

- Create clear decision tree documentation
- Provide animation presets for common patterns
- Enforce guidelines through code review
- Monitor bundle size with CI/CD checks
- Performance testing in CI pipeline

---

## Alternatives Considered

### Alternative 1: CSS-Only
**Rejected because:**
- Can't handle complex animations (page transitions, gestures)
- No programmatic control
- Limited easing functions

### Alternative 2: Framer Motion-Only
**Rejected because:**
- Unnecessary bundle overhead for simple transitions
- Overkill for micro-interactions
- CSS is faster for simple animations

### Alternative 3: React Spring
**Rejected because:**
- Larger bundle size
- More complex API
- Less declarative
- Framer Motion has better DX

---

## References

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Web Animations Performance](https://developer.chrome.com/blog/performant-animations/)
- [CSS Animation Performance](https://web.dev/animations-guide/)
- [ADR-001: Tailwind CSS v4](./adr-001-tailwind-css-v4.md)

---

**Decision Owner:** @architect
**Implementation Owner:** @dev
**Review Date:** End of Phase 4 (2026-02-28)
**Status:** ✅ Accepted and Active
