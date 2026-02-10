import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Progress } from "./Progress";
import { axe } from "../../lib/test-utils";

describe("Progress", () => {
  it("renders with default props", () => {
    render(<Progress />);
    expect(screen.getByRole("progressbar")).toBeDefined();
  });

  it("sets aria-valuenow based on value prop", () => {
    render(<Progress value={42} />);
    const bar = screen.getByRole("progressbar");
    expect(bar.getAttribute("aria-valuenow")).toBe("42");
    expect(bar.getAttribute("aria-valuemin")).toBe("0");
    expect(bar.getAttribute("aria-valuemax")).toBe("100");
  });

  it("clamps value to 0-100", () => {
    const { rerender } = render(<Progress value={-10} />);
    expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("0");
    rerender(<Progress value={150} />);
    expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("100");
  });

  it("sets indicator width based on value", () => {
    const { container } = render(<Progress value={75} />);
    const indicator = container.querySelector("[role='progressbar'] > div");
    expect(indicator?.getAttribute("style")).toContain("width: 75%");
  });

  it.each(["sm", "md", "lg"] as const)("renders %s size", (size) => {
    render(<Progress size={size} data-testid="bar" />);
    expect(screen.getByTestId("bar")).toBeDefined();
  });

  it.each(["primary", "success", "warning", "error", "info"] as const)(
    "renders %s color",
    (color) => {
      render(<Progress color={color} value={50} data-testid="bar" />);
      expect(screen.getByTestId("bar")).toBeDefined();
    },
  );

  it("renders indeterminate state", () => {
    render(<Progress indeterminate />);
    const bar = screen.getByRole("progressbar");
    expect(bar.getAttribute("aria-valuenow")).toBeNull();
  });

  it("passes custom className", () => {
    render(<Progress className="custom-progress" />);
    expect(screen.getByRole("progressbar").className).toContain("custom-progress");
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Progress ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // A11y
  it("has no a11y violations", async () => {
    const { container } = render(<Progress value={50} aria-label="Loading progress" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
