import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle } from "./Toggle";
import { axe } from "../../lib/test-utils";

describe("Toggle", () => {
  // ── Rendering ──────────────────────────────────────────────────────────

  it("renders with children", () => {
    render(<Toggle aria-label="Toggle bold">B</Toggle>);
    expect(screen.getByRole("button", { name: /toggle bold/i })).toBeDefined();
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    render(<Toggle aria-label="Toggle bold">B</Toggle>);
    const toggle = screen.getByRole("button", { name: /toggle bold/i });
    expect(toggle.getAttribute("data-state")).toBe("off");
    await user.click(toggle);
    expect(toggle.getAttribute("data-state")).toBe("on");
  });

  // ── Variants ───────────────────────────────────────────────────────────

  it("renders default variant", () => {
    render(<Toggle aria-label="Default toggle">B</Toggle>);
    const toggle = screen.getByRole("button", { name: /default toggle/i });
    expect(toggle).toBeDefined();
  });

  it("renders outline variant", () => {
    render(
      <Toggle variant="outline" aria-label="Outline toggle">
        B
      </Toggle>,
    );
    const toggle = screen.getByRole("button", { name: /outline toggle/i });
    expect(toggle.className).toContain("border");
  });

  // ── Sizes ──────────────────────────────────────────────────────────────

  it("renders sm size", () => {
    render(
      <Toggle size="sm" aria-label="Small toggle">
        B
      </Toggle>,
    );
    const toggle = screen.getByRole("button", { name: /small toggle/i });
    expect(toggle.className).toContain("h-8");
  });

  it("renders lg size", () => {
    render(
      <Toggle size="lg" aria-label="Large toggle">
        B
      </Toggle>,
    );
    const toggle = screen.getByRole("button", { name: /large toggle/i });
    expect(toggle.className).toContain("h-10");
  });

  // ── Disabled State ─────────────────────────────────────────────────────

  it("applies disabled state", () => {
    render(
      <Toggle disabled aria-label="Disabled toggle">
        B
      </Toggle>,
    );
    const toggle = screen.getByRole("button", { name: /disabled toggle/i });
    expect(toggle.hasAttribute("disabled")).toBe(true);
  });

  // ── HTML Attributes ────────────────────────────────────────────────────

  it("passes custom className", () => {
    render(
      <Toggle className="custom-class" aria-label="Custom toggle">
        B
      </Toggle>,
    );
    const toggle = screen.getByRole("button", { name: /custom toggle/i });
    expect(toggle.className).toContain("custom-class");
  });

  it("forwards ref", () => {
    const refCallback = vi.fn();
    render(
      <Toggle ref={refCallback} aria-label="Ref toggle">
        B
      </Toggle>,
    );
    expect(refCallback).toHaveBeenCalled();
    const el = refCallback.mock.calls[0][0] as HTMLButtonElement;
    expect(el.tagName).toBe("BUTTON");
  });

  // ── A11y ────────────────────────────────────────────────────────────────

  it("has no a11y violations", async () => {
    const { container } = render(
      <Toggle aria-label="Toggle bold">B</Toggle>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
