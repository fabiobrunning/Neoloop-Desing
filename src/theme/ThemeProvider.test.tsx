import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from "./ThemeProvider";

// Helper component to expose useTheme for testing
function ThemeConsumer() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme("light")}>Set Light</button>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
      <button onClick={() => setTheme("system")}>Set System</button>
    </div>
  );
}

describe("ThemeProvider", () => {
  let listeners: Array<(e: MediaQueryListEvent) => void> = [];

  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("light");
    listeners = [];

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === "(prefers-color-scheme: dark)",
        media: query,
        addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
          listeners.push(cb);
        },
        removeEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
          listeners = listeners.filter((l) => l !== cb);
        },
      })),
    });
  });

  afterEach(() => {
    document.documentElement.classList.remove("light");
  });

  // ── Rendering ──────────────────────────────────────────────────────────

  it("renders children without errors", () => {
    render(
      <ThemeProvider>
        <span>Hello</span>
      </ThemeProvider>,
    );
    expect(screen.getByText("Hello")).toBeDefined();
  });

  it("defaults to system theme", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("theme").textContent).toBe("system");
  });

  it("uses defaultTheme prop when provided", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("theme").textContent).toBe("light");
    expect(screen.getByTestId("resolved").textContent).toBe("light");
  });

  // ── setTheme ───────────────────────────────────────────────────────────

  it("setTheme('light') applies .light class on documentElement", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>,
    );
    await user.click(screen.getByText("Set Light"));
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(screen.getByTestId("resolved").textContent).toBe("light");
  });

  it("setTheme('dark') removes .light class", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </ThemeProvider>,
    );
    // Initially light
    expect(document.documentElement.classList.contains("light")).toBe(true);
    await user.click(screen.getByText("Set Dark"));
    expect(document.documentElement.classList.contains("light")).toBe(false);
  });

  // ── localStorage ───────────────────────────────────────────────────────

  it("persists theme choice in localStorage", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    await user.click(screen.getByText("Set Light"));
    expect(window.localStorage.getItem("synkra-theme")).toBe("light");
  });

  it("reads stored theme from localStorage", () => {
    window.localStorage.setItem("synkra-theme", "light");
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("theme").textContent).toBe("light");
  });

  // ── useTheme outside provider ──────────────────────────────────────────

  it("useTheme throws when used outside ThemeProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ThemeConsumer />)).toThrow(
      "useTheme must be used within a ThemeProvider",
    );
    spy.mockRestore();
  });

  // ── System preference listener ─────────────────────────────────────────

  it("reacts to matchMedia change when theme is system", async () => {
    render(
      <ThemeProvider defaultTheme="system">
        <ThemeConsumer />
      </ThemeProvider>,
    );
    // System starts as dark (mocked), so resolved = dark
    expect(screen.getByTestId("resolved").textContent).toBe("dark");

    // Simulate system change to light
    act(() => {
      listeners.forEach((cb) =>
        cb({ matches: false } as MediaQueryListEvent),
      );
    });
    expect(screen.getByTestId("resolved").textContent).toBe("light");
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });
});
