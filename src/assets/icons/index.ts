/**
 * Synkra DS - Icon System
 *
 * The primary Icon component lives at src/atoms/icon/Icon.tsx.
 * It wraps lucide-react with DS-consistent defaults (size presets, color tokens).
 *
 * Usage:
 *   import { Icon } from "synkra-ds";
 *   <Icon name="Home" size="lg" className="text-primary" />
 *
 * Or use lucide-react directly for tree-shaking individual icons:
 *   import { Home } from "lucide-react";
 *   <Home size={24} className="text-text-secondary" />
 */

/** Icon size presets matching the design system */
export const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

export type IconSize = keyof typeof iconSizes;
