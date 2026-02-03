import { toHaveNoViolations } from 'jest-axe';
import { expect } from 'vitest';

// Extend Vitest matchers with jest-axe
expect.extend(toHaveNoViolations);

// Configure axe-core rules - only use valid rule names
export const axeConfig = {
  rules: {
    'color-contrast': { enabled: true },
    'aria-required-attr': { enabled: true },
    'aria-valid-attr-value': { enabled: true },
    'button-name': { enabled: true },
    'image-alt': { enabled: true },
    'label': { enabled: true },
    'link-name': { enabled: true },
    'list': { enabled: true },
    'listitem': { enabled: true }
  }
};
