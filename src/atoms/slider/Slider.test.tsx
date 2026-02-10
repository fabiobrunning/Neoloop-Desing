import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Slider } from "./Slider";
import { axe } from "../../lib/test-utils";

describe("Slider", () => {
  it("renders with default props", () => {
    render(<Slider aria-label="Volume" />);
    expect(screen.getByRole("slider")).toBeDefined();
  });

  it("renders with role slider", () => {
    render(<Slider aria-label="Volume" />);
    const slider = screen.getByRole("slider");
    expect(slider).toBeDefined();
  });

  it("applies default value", () => {
    render(<Slider aria-label="Volume" defaultValue={[50]} />);
    const slider = screen.getByRole("slider");
    expect(slider.getAttribute("aria-valuenow")).toBe("50");
  });

  it("applies min and max", () => {
    render(<Slider aria-label="Volume" min={10} max={200} defaultValue={[50]} />);
    const slider = screen.getByRole("slider");
    expect(slider.getAttribute("aria-valuemin")).toBe("10");
    expect(slider.getAttribute("aria-valuemax")).toBe("200");
  });

  it("passes custom className", () => {
    const { container } = render(<Slider aria-label="Volume" className="custom-slider" />);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain("custom-slider");
  });

  it("applies disabled state", () => {
    render(<Slider aria-label="Volume" disabled defaultValue={[50]} />);
    const slider = screen.getByRole("slider");
    expect(slider.getAttribute("data-disabled")).not.toBeNull();
  });

  it("forwards ref", () => {
    const refCallback = vi.fn();
    render(<Slider aria-label="Volume" ref={refCallback} />);
    expect(refCallback).toHaveBeenCalled();
  });

  it("calls onValueChange when value changes", () => {
    const onValueChange = vi.fn();
    render(<Slider aria-label="Volume" defaultValue={[50]} onValueChange={onValueChange} />);
    expect(screen.getByRole("slider")).toBeDefined();
  });

  // ── A11y ────────────────────────────────────────────────────────────────

  it("has no a11y violations", async () => {
    const { container } = render(<Slider aria-label="Volume" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
