import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";
import { axe } from "../../lib/test-utils";

describe("Badge", () => {
  it("renders with default variant", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeDefined();
  });

  it.each([
    "default",
    "secondary",
    "outline",
    "success",
    "warning",
    "error",
    "info",
    "gradient",
  ] as const)("renders %s variant", (variant) => {
    render(<Badge variant={variant}>{variant}</Badge>);
    expect(screen.getByText(variant)).toBeDefined();
  });

  it("applies gradient background style for gradient variant", () => {
    render(
      <Badge variant="gradient" gradient="badge" data-testid="grad">
        Hot
      </Badge>,
    );
    const el = screen.getByTestId("grad");
    expect(el.style.background).toContain("var(--gradient-badge)");
  });

  it("supports different gradient presets", () => {
    render(
      <Badge variant="gradient" gradient="purple-blue" data-testid="pb">
        Pro
      </Badge>,
    );
    const el = screen.getByTestId("pb");
    expect(el.style.background).toContain("var(--gradient-purple-blue)");
  });

  it("passes custom className", () => {
    render(<Badge className="custom-badge">Tag</Badge>);
    expect(screen.getByText("Tag").className).toContain("custom-badge");
  });

  it("renders children correctly", () => {
    render(
      <Badge>
        <span>Icon</span> Label
      </Badge>,
    );
    expect(screen.getByText("Icon")).toBeDefined();
  });

  // ── A11y ────────────────────────────────────────────────────────────────

  it("has no a11y violations", async () => {
    const { container } = render(<Badge>Status</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
