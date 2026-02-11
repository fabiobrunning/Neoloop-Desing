/**
 * Synkra DS - Design Token Types & Exports
 * Auto-generated from tokens.yaml - DO NOT edit manually
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

export const colors = {
  primary: {
    blue: "#2B4BEE",
    "blue-dark": "#1E3A8A",
    "blue-light": "#5B7BF2",
  },
  active: {
    base: "#1DC9A0",
    dark: "#12B38C",
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
    emphasis: "rgba(43, 75, 238, 0.3)",
  },
} as const;

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const typography = {
  families: {
    sans: "'Inter', sans-serif",
    serif: "serif",
    display: "'Inter', sans-serif",
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
  glow: "0 0 20px rgba(43, 75, 238, 0.3)",
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
// TYPOGRAPHY SCALE (Display / Heading / Body / Caption)
// ============================================================================

export const typographyScale = {
  display: {
    xl: { size: "4.5rem", weight: 700, lineHeight: 1.25 },
    lg: { size: "3.75rem", weight: 700, lineHeight: 1.25 },
    md: { size: "3rem", weight: 600, lineHeight: 1.25 },
    sm: { size: "2.25rem", weight: 600, lineHeight: 1.375 },
  },
  heading: {
    xl: { size: "1.875rem", weight: 600, lineHeight: 1.375 },
    lg: { size: "1.5rem", weight: 600, lineHeight: 1.5 },
    md: { size: "1.25rem", weight: 600, lineHeight: 1.5 },
    sm: { size: "1rem", weight: 600, lineHeight: 1.5 },
    xs: { size: "0.875rem", weight: 600, lineHeight: 1.5 },
  },
  body: {
    lg: { size: "1.125rem", weight: 400, lineHeight: 1.625 },
    md: { size: "1rem", weight: 400, lineHeight: 1.5 },
    sm: { size: "0.875rem", weight: 400, lineHeight: 1.5 },
  },
  caption: {
    lg: { size: "0.875rem", weight: 500, lineHeight: 1.5 },
    md: { size: "0.75rem", weight: 500, lineHeight: 1.5 },
    sm: { size: "0.75rem", weight: 400, lineHeight: 1.25 },
  },
} as const;

export type TypographyScaleToken = typeof typographyScale;
export type TypographyCategory = keyof typeof typographyScale;
export type TypographyVariant<C extends TypographyCategory> = keyof (typeof typographyScale)[C];

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
  typographyScale: TypographyScaleToken;
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
  typographyScale,
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
    blue: "#1E3FD0",
    "blue-dark": "#1530A0",
    "blue-light": "#4B6BF5",
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
    emphasis: "rgba(30, 63, 208, 0.3)",
  },
} as const;

export const darkColors = colors;

type ColorScheme = {
  primary: { blue: string; "blue-dark": string; "blue-light": string };
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
