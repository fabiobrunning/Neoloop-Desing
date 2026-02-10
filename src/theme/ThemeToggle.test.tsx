import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

function renderToggle(defaultTheme: "dark" | "light" | "system" = "system") {
  return render(
    <ThemeProvider defaultTheme={defaultTheme}>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("light");

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === "(prefers-color-scheme: dark)",
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    document.documentElement.classList.remove("light");
  });

  // ── Rendering ──────────────────────────────────────────────────────────

  it("renders a button with correct aria-label for system theme", () => {
    renderToggle("system");
    expect(screen.getByRole("button", { name: "System theme" })).toBeDefined();
  });

  it("renders correct aria-label for light theme", () => {
    renderToggle("light");
    expect(screen.getByRole("button", { name: "Light theme" })).toBeDefined();
  });

  it("renders correct aria-label for dark theme", () => {
    renderToggle("dark");
    expect(screen.getByRole("button", { name: "Dark theme" })).toBeDefined();
  });

  // ── Cycling ────────────────────────────────────────────────────────────

  it("cycles themes: system → light → dark → system", async () => {
    const user = userEvent.setup();
    renderToggle("system");

    const btn = screen.getByRole("button");
    expect(btn.getAttribute("aria-label")).toBe("System theme");

    await user.click(btn);
    expect(btn.getAttribute("aria-label")).toBe("Light theme");

    await user.click(btn);
    expect(btn.getAttribute("aria-label")).toBe("Dark theme");

    await user.click(btn);
    expect(btn.getAttribute("aria-label")).toBe("System theme");
  });

  // ── Custom className ───────────────────────────────────────────────────

  it("passes custom className to button", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeToggle className="custom-class" />
      </ThemeProvider>,
    );
    expect(screen.getByRole("button").className).toContain("custom-class");
  });
});
