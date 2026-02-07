/**
 * Synkra DS - Icon System
 *
 * Primary: lucide-react (installed, tree-shakeable)
 * Extended: assets/icons/ (10,000+ SVGs from Figma libraries)
 *
 * Usage:
 *   import { Home, Settings, User } from "lucide-react";
 *   <Home size={24} className="text-text-secondary" />
 *
 * For icons not in lucide-react, reference the Figma libraries:
 * - 10,000 Free Icons (16 categories, see assets/icons/README-ICONS.md)
 * - 6,000+ UI Icons for Modern Interfaces
 * - Iconly V3.0 (6 styles: Linear, Bold, Bulk, Broken, TwoTone, Light)
 * - Xicons (Social, Crypto, Payment)
 * - Vuesax (6,150+ icons, 6 styles)
 *
 * Total available: 24,000+ icons across 5 Figma libraries
 * See: assets/icons/figma-bibliotecas.md for links and docs
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

/** Icon categories available in the 10K library */
export const iconCategories = [
  "Artificial-Intelligence-Machine-Learning",
  "Computer-Devices",
  "Culture",
  "Entertainment",
  "Food-drink",
  "Health",
  "Images-Photography",
  "Interface-Essential",
  "Mail",
  "Map-Travel",
  "Money-Shopping",
  "Nature-Ecology",
  "Phone",
  "Programming",
  "Shipping",
  "Work-Education",
] as const;

export type IconCategory = (typeof iconCategories)[number];
