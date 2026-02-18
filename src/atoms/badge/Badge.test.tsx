import { describe, it, expect } from "vitest";
import { render, screen, axe } from "../../lib/test-utils";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders with text", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    render(<Badge variant="destructive">Error</Badge>);
    expect(screen.getByText("Error").className).toContain("destructive");
  });

  it("applies gradient style", () => {
    render(<Badge variant="gradient">Hot</Badge>);
    const el = screen.getByText("Hot");
    expect(el.style.background).toContain("gradient");
  });

  it("has no a11y violations", async () => {
    const { container } = render(<Badge>Badge</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
