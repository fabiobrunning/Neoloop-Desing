/**
 * Synkra DS - Icon System
 *
 * The primary Icon component lives at src/atoms/icon/Icon.tsx.
 * Individual icons are in src/icons/ — no external dependencies.
 *
 * Usage:
 *   import { Icon } from "synkra-ds";
 *   <Icon name="House" size="lg" className="text-primary" />
 *
 * Or import individual icon components for tree-shaking:
 *   import { HouseIcon } from "synkra-ds";
 *   <HouseIcon size={24} className="text-text-secondary" />
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
