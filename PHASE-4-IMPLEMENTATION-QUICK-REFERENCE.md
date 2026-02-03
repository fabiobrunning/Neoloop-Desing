# PHASE 4: QUICK REFERENCE GUIDE

**Status**: ✅ COMPLETE | **Date**: 2026-01-31 | **Agent**: @dev

---

## Overview

14 advanced component systems implemented:
- **6 Motion Components** - Animations, transitions, gestures
- **5 Navigation Components** - Menus, routes, onboarding
- **4 Accessibility Components** - WCAG AAA compliance

**Total**: ~5,200 lines | **Dependencies**: framer-motion, react-router-dom

---

## Quick Import Guide

### Motion Components
```typescript
// Animation System
import {
  animationTokens,
  createMotionVariants,
  easingPresets,
} from '@/components/motion/AnimationTokens';

// Microinteractions
import {
  PulseButton,
  RippleButton,
  LoadingDots,
  LoadingSpinner,
  ShimmerLoader,
} from '@/components/motion/Microinteractions';

// Cursor Effects
import {
  MagneticButton,
  CursorSpotlight,
  ParallaxHover,
} from '@/components/motion/CursorAnimations';

// Transitions
import {
  PageTransition,
  ModalTransition,
  DrawerTransition,
  RouterTransition,
} from '@/components/motion/Transitions';

// Gestures
import {
  SwipeCard,
  LongPressButton,
  PullToRefresh,
  useHapticFeedback,
} from '@/components/motion/MobileGestures';
```

### Navigation Components
```typescript
// Menus
import {
  DropdownMenu,
  ContextMenu,
  MegaMenu,
} from '@/components/navigation/MenuSystem';

// Routes
import {
  AnimatedRoutes,
  ProtectedRoute,
  ScrollToTop,
  useRouteBreadcrumbs,
} from '@/components/navigation/RoutesSystem';

// Steppers
import {
  StepIndicator,
  WizardNavigation,
  DotStepIndicator,
} from '@/components/navigation/StepIndicator';

// Onboarding
import {
  OnboardingTour,
  FeatureHint,
  ChecklistOnboarding,
} from '@/components/navigation/OnboardingTutorial';
```

### Accessibility Components
```typescript
// Contrast Validation
import {
  ContrastValidator,
  useContrastCheck,
  calculateContrastRatio,
} from '@/components/accessibility/ContrastValidator';

// Focus Management
import {
  FocusTrap,
  SkipLink,
  useFocusManagement,
  focusRingStyles,
} from '@/components/accessibility/FocusVisibleSystem';

// ARIA
import {
  LiveRegion,
  VisuallyHidden,
  useAriaAnnouncer,
  ariaPatterns,
} from '@/components/accessibility/ARIALabelsManager';

// Touch Targets
import {
  TouchTargetValidator,
  MinimumTouchTarget,
  useTouchTargetSize,
} from '@/components/accessibility/TouchTargetValidator';
```

---

## Common Patterns

### Animated Page Navigation
```typescript
import { AnimatedRoutes, PageTransition } from '@/components/navigation';

<AnimatedRoutes mode="slide">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</AnimatedRoutes>
```

### Loading States
```typescript
import { LoadingSpinner, LoadingDots } from '@/components/motion';

{isLoading && <LoadingSpinner size="lg" />}
{isSubmitting && <LoadingDots />}
```

### Accessible Buttons
```typescript
import { TouchTargetValidator, FocusTrap } from '@/components/accessibility';

<TouchTargetValidator minSize={44}>
  <button className={focusRingStyles.default}>
    Click Me
  </button>
</TouchTargetValidator>
```

### Mobile Gestures
```typescript
import { SwipeCard, useHapticFeedback } from '@/components/motion';

const haptic = useHapticFeedback();

<SwipeCard
  onSwipeLeft={() => {
    haptic.light();
    handleDelete();
  }}
  onSwipeRight={handleArchive}
>
  <Card />
</SwipeCard>
```

### Wizard Flow
```typescript
import { StepIndicator, WizardNavigation } from '@/components/navigation';

const [step, setStep] = useState(0);

<StepIndicator currentStep={step} steps={steps} />
<WizardNavigation
  currentStep={step}
  totalSteps={3}
  onNext={() => setStep(s => s + 1)}
  onPrevious={() => setStep(s => s - 1)}
/>
```

### Onboarding Tour
```typescript
import { OnboardingTour } from '@/components/navigation';

const tourSteps = [
  { target: '#dashboard', title: 'Dashboard', content: 'Overview' },
  { target: '#settings', title: 'Settings', content: 'Configure' },
];

<OnboardingTour
  steps={tourSteps}
  isActive={showTour}
  onComplete={() => setShowTour(false)}
/>
```

### Dropdown Menu
```typescript
import { DropdownMenu } from '@/components/navigation';

const menuItems = [
  { id: '1', label: 'Edit', icon: <Edit />, onClick: handleEdit },
  { id: '2', label: 'Delete', icon: <Trash />, onClick: handleDelete },
];

<DropdownMenu
  trigger={<button>Actions</button>}
  items={menuItems}
/>
```

### Modal with Focus Trap
```typescript
import { ModalTransition, FocusTrap } from '@/components/motion';

<ModalTransition isVisible={isOpen} onClose={handleClose}>
  <FocusTrap active={isOpen}>
    <div>Modal Content</div>
  </FocusTrap>
</ModalTransition>
```

### Screen Reader Announcements
```typescript
import { useAriaAnnouncer, LiveRegion } from '@/components/accessibility';

const { announce, Announcer } = useAriaAnnouncer();

// Somewhere in render
<Announcer />

// Trigger announcement
announce('Form saved successfully', 'polite');
```

### Contrast Validation
```typescript
import { ContrastValidator, useContrastCheck } from '@/components/accessibility';

// Component
<ContrastValidator
  foreground="#000"
  background="#fff"
  level="AAA"
/>

// Hook
const { ratio, isCompliant } = useContrastCheck('#595959', '#fff', 'AA');
```

---

## Animation Presets Quick Reference

### Easing Curves
```typescript
import { easingPresets } from '@/components/motion';

// Material Design
easingPresets.css.standard    // Default animations
easingPresets.css.emphasized  // Important UI changes
easingPresets.css.decelerated // Enter animations
easingPresets.css.accelerated // Exit animations

// Custom
easingPresets.css.bounce      // Bouncy effect
easingPresets.css.smooth      // Smooth transitions
easingPresets.css.sharp       // Quick, snappy
easingPresets.css.elastic     // Elastic overshoot
```

### Transition Durations
```typescript
import { animationTokens } from '@/components/motion';

animationTokens.duration.fast    // 150ms
animationTokens.duration.normal  // 250ms
animationTokens.duration.slow    // 350ms
```

### Motion Variants
```typescript
import { createMotionVariants } from '@/components/motion';

const variants = createMotionVariants('slideUp', 'spring');

<motion.div variants={variants} initial="hidden" animate="visible">
  Content
</motion.div>
```

---

## ARIA Patterns Quick Reference

### Accordion
```typescript
import { ariaPatterns } from '@/components/accessibility';

<div {...ariaPatterns.accordion.container}>
  <button {...ariaPatterns.accordion.trigger(isOpen, panelId)}>
    Toggle
  </button>
  <div {...ariaPatterns.accordion.panel(panelId, triggerId)}>
    Content
  </div>
</div>
```

### Dialog
```typescript
<div {...ariaPatterns.dialog.overlay} aria-labelledby="title">
  <h2 {...ariaPatterns.dialog.title('title')}>Modal Title</h2>
  <p {...ariaPatterns.dialog.description('desc')}>Description</p>
</div>
```

### Menu
```typescript
<div {...ariaPatterns.menu.container}>
  <div {...ariaPatterns.menu.item}>Menu Item</div>
  <div {...ariaPatterns.menu.checkbox(isChecked)}>Checkbox Item</div>
</div>
```

---

## File Locations

```
neo-design-system-builder/src/components/

motion/
  ├── AnimationTokens.ts          # Animation design tokens
  ├── Microinteractions.tsx       # Loading states, buttons
  ├── CursorAnimations.tsx        # Cursor effects
  ├── Transitions.tsx             # Page/modal transitions
  ├── EasingPresets.ts            # Easing curves library
  ├── MobileGestures.tsx          # Touch gestures
  └── index.ts

navigation/
  ├── MenuSystem.tsx              # Dropdown/context/mega menus
  ├── RoutesSystem.tsx            # React Router helpers
  ├── StepIndicator.tsx           # Wizard/stepper
  ├── OnboardingTutorial.tsx      # Guided tours
  └── index.ts

accessibility/
  ├── ContrastValidator.tsx       # WCAG contrast
  ├── FocusVisibleSystem.tsx      # Keyboard navigation
  ├── ARIALabelsManager.tsx       # Screen reader support
  ├── TouchTargetValidator.tsx    # Touch target size
  └── index.ts
```

---

## TypeScript Support

All components are 100% TypeScript with strict mode:

```typescript
import type {
  Variants,
  Transition,
  WCAGLevel,
  AriaLive,
  MenuItem,
  TourStep,
} from '@/components/...';
```

---

## Performance Tips

1. **Code Splitting**
   ```typescript
   const Motion = lazy(() => import('@/components/motion'));
   ```

2. **Tree Shaking**
   ```typescript
   // Import only what you need
   import { LoadingDots } from '@/components/motion/Microinteractions';
   ```

3. **Reduced Motion**
   ```typescript
   import { prefersReducedMotion } from '@/components/motion';

   const shouldAnimate = !prefersReducedMotion();
   ```

4. **GPU Acceleration**
   - All animations use `transform` and `opacity`
   - Avoid animating `width`, `height`, `top`, `left`

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Chrome Mobile 90+

---

## Next Steps

1. Add Storybook stories for all components
2. Write comprehensive test suite
3. Build documentation site
4. Create usage examples
5. Performance profiling

---

**Full Documentation**: `/PHASE-4-ADVANCED-COMPLETE.md`

**Dependencies**:
```bash
npm install framer-motion react-router-dom
```

**Import Path Alias**:
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/components/*": ["./src/components/*"]
    }
  }
}
```
