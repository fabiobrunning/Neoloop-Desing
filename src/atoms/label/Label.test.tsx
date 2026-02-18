import { describe, it, expect } from "vitest";
import { render, screen, axe } from "../../lib/test-utils";
import { Label } from "./Label";

describe("Label", () => {
  it("renders text", () => {
    render(<Label>Email</Label>);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Label htmlFor="email">Email</Label>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
