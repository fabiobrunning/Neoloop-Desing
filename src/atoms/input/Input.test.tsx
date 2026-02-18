import { describe, it, expect } from "vitest";
import { render, screen, axe } from "../../lib/test-utils";
import { Input } from "./Input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input placeholder="Type here" />);
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
  });

  it("supports type prop", () => {
    render(<Input type="email" placeholder="email" />);
    expect(screen.getByPlaceholderText("email")).toHaveAttribute("type", "email");
  });

  it("is disabled when disabled prop", () => {
    render(<Input disabled placeholder="disabled" />);
    expect(screen.getByPlaceholderText("disabled")).toBeDisabled();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Input aria-label="Test input" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
