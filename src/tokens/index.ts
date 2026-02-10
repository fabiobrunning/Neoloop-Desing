/**
 * Synkra DS - Design Token Types & Exports
 * Auto-generated from tokens.yaml - DO NOT edit manually
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

export const colors = {
  primary: {
    gold: "#D4AF37",
    "gold-dark": "#B8962E",
    "gold-light": "#E4C84A",
  },
  background: {
    base: "#0A0A0F",
    elevated: "#111116",
    surface: "#1a1a1f",
    overlay: "rgba(0, 0, 0, 0.8)",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#A1A1AA",
    muted: "#71717A",
    inverse: "#0A0A0F",
  },
  semantic: {
    success: "#22C55E",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },
  border: {
    default: "rgba(255, 255, 255, 0.1)",
    subtle: "rgba(255, 255, 255, 0.05)",
    emphasis: "rgba(212, 175, 55, 0.3)",
  },
} as const;

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const typography = {
  families: {
    sans: "'Inter', sans-serif",
    serif: "'Source Serif 4', serif",
    display: "'Rajdhani', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  sizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },
  lineHeights: {
    xs: "1rem",
    sm: "1.25rem",
    base: "1.5rem",
    lg: "1.75rem",
    xl: "1.75rem",
    "2xl": "2rem",
    "3xl": "2.25rem",
    "4xl": "2.5rem",
    "5xl": "1",
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

// ============================================================================
// SPACING TOKENS
// ============================================================================

export const spacing = {
  0: "0",
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
} as const;

// ============================================================================
// RADIUS TOKENS
// ============================================================================

export const radius = {
  none: "0",
  sm: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  full: "9999px",
} as const;

// ============================================================================
// SHADOW TOKENS
// ============================================================================

export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  glow: "0 0 20px rgba(212, 175, 55, 0.3)",
} as const;

// ============================================================================
// MOTION TOKENS
// ============================================================================

export const motion = {
  duration: {
    instant: "0ms",
    fast: "100ms",
    normal: "200ms",
    slow: "300ms",
    slower: "500ms",
  },
  easing: {
    linear: "cubic-bezier(0, 0, 1, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

// ============================================================================
// Z-INDEX TOKENS
// ============================================================================

export const zIndex = {
  dropdown: 50,
  sticky: 100,
  modal: 200,
  popover: 300,
  tooltip: 400,
} as const;

// ============================================================================
// BREAKPOINT TOKENS
// ============================================================================

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// ============================================================================
// FOCUS RING TOKENS
// ============================================================================

export const focusRing = {
  width: "2px",
  offset: "2px",
  color: "var(--color-primary)",
  offsetColor: "var(--color-bg-base)",
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type ColorToken = typeof colors;
export type TypographyToken = typeof typography;
export type SpacingToken = typeof spacing;
export type RadiusToken = typeof radius;
export type ShadowToken = typeof shadows;
export type MotionToken = typeof motion;
export type ZIndexToken = typeof zIndex;
export type BreakpointToken = typeof breakpoints;
export type FocusRingToken = typeof focusRing;

export type DesignTokens = {
  colors: ColorToken;
  typography: TypographyToken;
  spacing: SpacingToken;
  radius: RadiusToken;
  shadows: ShadowToken;
  motion: MotionToken;
  zIndex: ZIndexToken;
  breakpoints: BreakpointToken;
  focusRing: FocusRingToken;
};

export const tokens: DesignTokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  motion,
  zIndex,
  breakpoints,
  focusRing,
};

// ============================================================================
// LIGHT THEME COLORS
// ============================================================================

export const lightColors = {
  primary: {
    gold: "#B8962E",
    "gold-dark": "#96790E",
    "gold-light": "#D4AF37",
  },
  background: {
    base: "#FFFFFF",
    elevated: "#F9FAFB",
    surface: "#F3F4F6",
    overlay: "rgba(0, 0, 0, 0.4)",
  },
  text: {
    primary: "#111827",
    secondary: "#4B5563",
    muted: "#9CA3AF",
    inverse: "#FFFFFF",
  },
  semantic: {
    success: "#16A34A",
    warning: "#D97706",
    error: "#DC2626",
    info: "#2563EB",
  },
  border: {
    default: "rgba(0, 0, 0, 0.1)",
    subtle: "rgba(0, 0, 0, 0.05)",
    emphasis: "rgba(184, 150, 46, 0.3)",
  },
} as const;

export const darkColors = colors;

type ColorScheme = {
  primary: { gold: string; "gold-dark": string; "gold-light": string };
  background: { base: string; elevated: string; surface: string; overlay: string };
  text: { primary: string; secondary: string; muted: string; inverse: string };
  semantic: { success: string; warning: string; error: string; info: string };
  border: { default: string; subtle: string; emphasis: string };
};

export const themeColors: Record<"dark" | "light", ColorScheme> = {
  dark: darkColors,
  light: lightColors,
};

// Extended palette & charts (from watchOS palette)
export {
  paletteExtended,
  chartPalette,
  gradients,
  type PaletteCategory,
  type ChartColor,
  type GradientName,
} from "./palette-extended";
