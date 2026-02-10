import { expect } from "vitest";
import { toHaveNoViolations } from "vitest-axe/matchers";

expect.extend({ toHaveNoViolations });

// Radix UI primitives (Checkbox, Select, etc.) use @radix-ui/react-use-size
// which requires ResizeObserver. jsdom does not provide it.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Node 22+ ships a built-in localStorage that conflicts with jsdom's Storage.
// Provide a spec-compliant in-memory Storage so tests work on any Node version.
function createStorage(): Storage {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return key in store ? store[key] : null;
    },
    setItem(key: string, value: string) {
      store[key] = String(value);
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
    key(index: number) {
      return Object.keys(store)[index] ?? null;
    },
    get length() {
      return Object.keys(store).length;
    },
  };
}

Object.defineProperty(window, "localStorage", {
  value: createStorage(),
  writable: true,
  configurable: true,
});
