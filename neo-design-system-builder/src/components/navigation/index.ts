/**
 * Navigation Components - Barrel Export
 *
 * Complete navigation system with menus, routes, breadcrumbs, and onboarding.
 */

// Menu System
export {
  DropdownMenu,
  ContextMenu,
  MegaMenu,
  type MenuItem,
} from './MenuSystem';

// Routes System
export {
  ScrollToTop,
  ScrollRestoration,
  AnimatedRoutes,
  ProtectedRoute,
  RouteGuard,
  LazyRoute,
  useRouteBreadcrumbs,
  useNavigationHistory,
  RouteChangeTracker,
  DelayedRedirect,
  NotFoundRoute,
  RouteLoader,
  RouteTransitionProvider,
  generateRoutes,
} from './RoutesSystem';

// Step Indicator
export {
  StepIndicator,
  CompactStepIndicator,
  DotStepIndicator,
  WizardNavigation,
  type Step,
} from './StepIndicator';

// Onboarding / Tutorial
export {
  OnboardingTour,
  FeatureHint,
  ChecklistOnboarding,
  type TourStep,
} from './OnboardingTutorial';
