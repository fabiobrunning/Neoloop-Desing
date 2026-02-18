import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, axe, userEvent } from "../lib/test-utils";
import { ThemeProvider, useTheme } from "./ThemeProvider";

function ThemeConsumer() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme("light")}>Set Light</button>
      <button onClick={() => setTheme("system")}>Set System</button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.removeItem("neoloop-theme");
    localStorage.removeItem("custom-key");
    document.documentElement.classList.remove("light");
  });

  it("provides default dark theme", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
  });

  it("allows setting theme to light", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    await user.click(screen.getByText("Set Light"));
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
    expect(screen.getByTestId("resolved")).toHaveTextContent("light");
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });

  it("resolves system theme", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    await user.click(screen.getByText("Set System"));
    expect(screen.getByTestId("theme")).toHaveTextContent("system");
    // resolvedTheme should be either "dark" or "light"
    expect(["dark", "light"]).toContain(screen.getByTestId("resolved").textContent);
  });

  it("persists theme to localStorage", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    await user.click(screen.getByText("Set Light"));
    expect(localStorage.getItem("neoloop-theme")).toBe("light");
  });

  it("reads theme from localStorage", () => {
    localStorage.setItem("neoloop-theme", "light");
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  it("uses custom storageKey", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider storageKey="custom-key">
        <ThemeConsumer />
      </ThemeProvider>,
    );
    await user.click(screen.getByText("Set Light"));
    expect(localStorage.getItem("custom-key")).toBe("light");
  });

  it("throws when useTheme is used outside provider", () => {
    expect(() => render(<ThemeConsumer />)).toThrow(
      "useTheme must be used within ThemeProvider",
    );
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
