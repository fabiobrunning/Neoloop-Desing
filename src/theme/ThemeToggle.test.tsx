import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, axe, userEvent } from "../lib/test-utils";
import { ThemeProvider } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

function renderToggle() {
  return render(
    <ThemeProvider defaultTheme="dark">
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.removeItem("neoloop-theme");
    document.documentElement.classList.remove("light");
  });

  it("renders toggle button", () => {
    renderToggle();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("has accessible label", () => {
    renderToggle();
    expect(screen.getByLabelText(/switch to light theme/i)).toBeInTheDocument();
  });

  it("toggles theme on click", async () => {
    const user = userEvent.setup();
    renderToggle();
    const button = screen.getByRole("button");
    await user.click(button);
    expect(screen.getByLabelText(/switch to dark theme/i)).toBeInTheDocument();
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });

  it("accepts custom className", () => {
    render(
      <ThemeProvider>
        <ThemeToggle className="custom-class" />
      </ThemeProvider>,
    );
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("has no a11y violations", async () => {
    const { container } = renderToggle();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
