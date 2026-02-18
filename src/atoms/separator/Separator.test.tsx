import { describe, it, expect } from "vitest";
import { render, axe } from "../../lib/test-utils";
import { Separator } from "./Separator";

describe("Separator", () => {
  it("renders horizontal by default", () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders vertical", () => {
    const { container } = render(<Separator orientation="vertical" className="h-8" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Separator />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
