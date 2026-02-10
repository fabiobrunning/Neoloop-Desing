import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Separator } from "./Separator";
import { axe } from "../../lib/test-utils";

describe("Separator", () => {
  it("renders with default orientation (horizontal)", () => {
    render(<Separator data-testid="sep" />);
    const el = screen.getByTestId("sep");
    expect(el).toBeDefined();
    expect(el.getAttribute("data-orientation")).toBe("horizontal");
  });

  it("renders as separator role when not decorative", () => {
    render(<Separator decorative={false} data-testid="sep" />);
    const el = screen.getByRole("separator");
    expect(el).toBeDefined();
  });

  it("renders as none role when decorative (default)", () => {
    render(<Separator data-testid="sep" />);
    const el = screen.getByTestId("sep");
    expect(el.getAttribute("role")).toBe("none");
  });

  it("renders vertical orientation", () => {
    render(<Separator orientation="vertical" data-testid="sep" />);
    const el = screen.getByTestId("sep");
    expect(el.getAttribute("data-orientation")).toBe("vertical");
  });

  it("applies correct classes for horizontal", () => {
    render(<Separator data-testid="sep" />);
    const el = screen.getByTestId("sep");
    expect(el.className).toContain("h-px");
    expect(el.className).toContain("w-full");
  });

  it("applies correct classes for vertical", () => {
    render(<Separator orientation="vertical" data-testid="sep" />);
    const el = screen.getByTestId("sep");
    expect(el.className).toContain("h-full");
    expect(el.className).toContain("w-px");
  });

  it("passes custom className", () => {
    render(<Separator className="custom-sep" data-testid="sep" />);
    const el = screen.getByTestId("sep");
    expect(el.className).toContain("custom-sep");
  });

  it("forwards ref", () => {
    const refCallback = vi.fn();
    render(<Separator ref={refCallback} data-testid="sep" />);
    expect(refCallback).toHaveBeenCalled();
    const el = refCallback.mock.calls[0][0] as HTMLElement;
    expect(el.tagName).toBe("DIV");
  });

  // ── A11y ────────────────────────────────────────────────────────────────

  it("has no a11y violations", async () => {
    const { container } = render(<Separator />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
