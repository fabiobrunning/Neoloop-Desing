import { describe, it, expect } from "vitest";
import { render, screen, axe } from "../../lib/test-utils";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders with placeholder", () => {
    render(<Textarea placeholder="Type here" />);
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
  });

  it("is disabled when disabled", () => {
    render(<Textarea disabled aria-label="Text" />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Textarea aria-label="Message" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
