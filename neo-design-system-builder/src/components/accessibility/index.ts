/**
 * Accessibility Components - Barrel Export
 *
 * Complete accessibility system with WCAG AAA compliance utilities.
 */

// Contrast Validator
export {
  ContrastValidator,
  ContrastChecker,
  AccessibleColorPicker,
  useContrastCheck,
  calculateContrastRatio,
  type WCAGLevel,
  type TextSize,
} from './ContrastValidator';

// Focus Visible System
export {
  FocusTrap,
  SkipLink,
  FocusIndicator,
  KeyboardOnlyOutline,
  FocusGuard,
  focusRingStyles,
  focusVisibleGlobalStyles,
  useFocusManagement,
  useFocusWithin,
  useKeyboardOnly,
  isFocusable,
  getFirstFocusable,
  getLastFocusable,
} from './FocusVisibleSystem';

// ARIA Labels Manager
export {
  LiveRegion,
  VisuallyHidden,
  AccessibleIcon,
  AccessibleImage,
  DescribedBy,
  ErrorMessage,
  LoadingAnnouncement,
  StatusMessage,
  LandmarkRegion,
  useAriaAnnouncer,
  useAriaExpanded,
  useAriaPressed,
  useAriaSelected,
  getAriaLabel,
  getAriaDescription,
  getAriaButton,
  getAriaFormField,
  generateId,
  ariaPatterns,
  type AriaLive,
  type AriaRole,
} from './ARIALabelsManager';

// Touch Target Validator
export {
  TouchTargetValidator,
  MinimumTouchTarget,
  TouchTargetSizeReport,
  TouchTargetHighlighter,
  useTouchTargetSize,
  validateTouchTarget,
  getRecommendedPadding,
  type TouchTargetStandard,
} from './TouchTargetValidator';
