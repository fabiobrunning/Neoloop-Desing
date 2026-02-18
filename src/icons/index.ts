export { createIcon, createLineIcon, createSolidIcon } from "./create-icon";
export type { IconProps } from "./create-icon";

import {
  lineIconRegistry,
  solidIconRegistry,
} from "./generated-registry";

export { lineIconRegistry, solidIconRegistry } from "./generated-registry";

/** Unified registry: Line icons + Solid icons from Biblioteca 1 */
export const iconRegistry = {
  ...lineIconRegistry,
  ...solidIconRegistry,
} as const;

export type IconName = keyof typeof iconRegistry;
