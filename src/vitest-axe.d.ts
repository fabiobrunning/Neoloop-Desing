import "vitest";
import type { AxeResults } from "axe-core";

interface AxeMatchers {
  toHaveNoViolations(): void;
}

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  interface Assertion<T = any> extends AxeMatchers {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}

declare module "vitest-axe" {
  import type { RunOptions } from "axe-core";
  export function axe(
    html: Element | string,
    additionalOptions?: RunOptions,
  ): Promise<AxeResults>;
  export type { AxeResults };
}

declare module "vitest-axe/matchers" {
  export function toHaveNoViolations(results: AxeResults): {
    message(): string;
    pass: boolean;
    actual: unknown[];
  };
}
