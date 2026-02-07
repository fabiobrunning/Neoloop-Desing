import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders unchecked by default", () => {
    render(<Switch aria-label="Toggle" />);
    const sw = screen.getByRole("switch", { name: /toggle/i });
    expect(sw).toBeDefined();
    expect(sw.getAttribute("data-state")).toBe("unchecked");
  });

  it("toggles on click", () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Toggle" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("switch", { name: /toggle/i }));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("renders checked when defaultChecked", () => {
    render(<Switch aria-label="On" defaultChecked />);
    expect(screen.getByRole("switch", { name: /on/i }).getAttribute("data-state")).toBe(
      "checked",
    );
  });

  it("disables the switch", () => {
    render(<Switch aria-label="Disabled" disabled />);
    expect(screen.getByRole("switch", { name: /disabled/i }).hasAttribute("disabled")).toBe(true);
  });

  it("does not toggle when disabled", () => {
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="No" disabled onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("switch", { name: /no/i }));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("renders sm size", () => {
    render(<Switch aria-label="Small" size="sm" />);
    expect(screen.getByRole("switch", { name: /small/i })).toBeDefined();
  });

  it("renders md size by default", () => {
    render(<Switch aria-label="Default" />);
    expect(screen.getByRole("switch", { name: /default/i })).toBeDefined();
  });

  it("supports controlled state", () => {
    const { rerender } = render(<Switch aria-label="Ctrl" checked={false} />);
    expect(screen.getByRole("switch", { name: /ctrl/i }).getAttribute("data-state")).toBe(
      "unchecked",
    );
    rerender(<Switch aria-label="Ctrl" checked={true} />);
    expect(screen.getByRole("switch", { name: /ctrl/i }).getAttribute("data-state")).toBe(
      "checked",
    );
  });

  it("passes custom className", () => {
    render(<Switch aria-label="Styled" className="custom-switch" />);
    expect(screen.getByRole("switch", { name: /styled/i }).className).toContain("custom-switch");
  });
});
