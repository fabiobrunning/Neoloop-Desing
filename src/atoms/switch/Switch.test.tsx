import { describe, it, expect } from "vitest";
import { render, screen, axe, userEvent } from "../../lib/test-utils";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders unchecked by default", () => {
    render(<Switch aria-label="Toggle" />);
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Toggle" />);
    await user.click(screen.getByRole("switch"));
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("is disabled when disabled prop", () => {
    render(<Switch disabled aria-label="Disabled" />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Switch aria-label="Toggle" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
