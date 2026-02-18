import { describe, it, expect } from "vitest";
import { render, screen, axe, userEvent } from "../../lib/test-utils";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders unchecked by default", () => {
    render(<Checkbox aria-label="Accept" />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("can be checked", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Accept" />);
    await user.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("is disabled when disabled prop", () => {
    render(<Checkbox disabled aria-label="Disabled" />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Checkbox aria-label="Check" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
