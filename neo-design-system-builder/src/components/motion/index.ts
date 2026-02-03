/**
 * Motion Components - Barrel Export
 *
 * Complete motion design system with animations, transitions, and gestures.
 */

// Animation Tokens
export {
  animationTokens,
  duration,
  easing,
  transition,
  animations,
  keyframes,
  createMotionVariants,
  createStaggerVariants,
  createInteractionVariants,
  prefersReducedMotion,
  getAccessibleDuration,
  getAccessibleTransition,
} from './AnimationTokens';

// Microinteractions
export {
  PulseButton,
  RippleButton,
  LoadingDots,
  LoadingSpinner,
  LoadingBar,
  ProgressRing,
  ShimmerLoader,
  SkeletonLoader,
  CountUp,
} from './Microinteractions';

// Cursor Animations
export {
  MagneticButton,
  CursorSpotlight,
  CursorTrail,
  HoverGlow,
  ParallaxHover,
  MagneticCard,
} from './CursorAnimations';

// Transitions
export {
  PageTransition,
  ModalTransition,
  SlideTransition,
  DrawerTransition,
  CollapseTransition,
  AccordionTransition,
  StaggerChildren,
  StaggerItem,
  NotificationTransition,
  RouterTransition,
} from './Transitions';

// Easing Presets
export {
  easingPresets,
  standardEasing,
  materialEasing,
  appleEasing,
  customEasing,
  cssEasings,
  framerEasings,
  durations,
  createCSSTransition,
  createFramerTransition,
  getRecommendedEasing,
  getEasingCurvePoints,
} from './EasingPresets';

// Mobile Gestures
export {
  SwipeCard,
  SwipeableListItem,
  TapToReveal,
  LongPressButton,
  PullToRefresh,
  PinchToZoom,
  DoubleTapToLike,
  useHapticFeedback,
} from './MobileGestures';

// Type exports
export type { Variants, Transition } from 'framer-motion';
