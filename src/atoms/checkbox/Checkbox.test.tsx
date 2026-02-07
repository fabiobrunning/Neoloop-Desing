import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "./Checkbox";
import { axe } from "../../lib/test-utils";

describe("Checkbox", () => {
  it("renders unchecked by default", () => {
    render(<Checkbox aria-label="Accept" />);
    const checkbox = screen.getByRole("checkbox", { name: /accept/i });
    expect(checkbox).toBeDefined();
    expect(checkbox.getAttribute("data-state")).toBe("unchecked");
  });

  it("can be checked", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="Check me" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("checkbox", { name: /check me/i }));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("renders checked state when defaultChecked", () => {
    render(<Checkbox aria-label="Checked" defaultChecked />);
    expect(screen.getByRole("checkbox", { name: /checked/i }).getAttribute("data-state")).toBe(
      "checked",
    );
  });

  it("disables the checkbox", () => {
    render(<Checkbox aria-label="Disabled" disabled />);
    const checkbox = screen.getByRole("checkbox", { name: /disabled/i });
    expect(checkbox.hasAttribute("disabled")).toBe(true);
  });

  it("does not toggle when disabled", () => {
    const onCheckedChange = vi.fn();
    render(
      <Checkbox aria-label="No click" disabled onCheckedChange={onCheckedChange} />,
    );
    fireEvent.click(screen.getByRole("checkbox", { name: /no click/i }));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("sets aria-invalid when error is true", () => {
    render(<Checkbox aria-label="Error" error />);
    expect(screen.getByRole("checkbox", { name: /error/i }).getAttribute("aria-invalid")).toBe(
      "true",
    );
  });

  it("passes custom className", () => {
    render(<Checkbox aria-label="Styled" className="custom-check" />);
    expect(screen.getByRole("checkbox", { name: /styled/i }).className).toContain(
      "custom-check",
    );
  });

  it("supports controlled checked state", () => {
    const { rerender } = render(
      <Checkbox aria-label="Controlled" checked={false} />,
    );
    expect(
      screen.getByRole("checkbox", { name: /controlled/i }).getAttribute("data-state"),
    ).toBe("unchecked");

    rerender(<Checkbox aria-label="Controlled" checked={true} />);
    expect(
      screen.getByRole("checkbox", { name: /controlled/i }).getAttribute("data-state"),
    ).toBe("checked");
  });

  // ── Indeterminate ──────────────────────────────────────────────────────

  it("renders indeterminate state", () => {
    render(<Checkbox aria-label="Indeterminate" checked="indeterminate" />);
    expect(
      screen.getByRole("checkbox", { name: /indeterminate/i }).getAttribute("data-state"),
    ).toBe("indeterminate");
  });

  // ── A11y ────────────────────────────────────────────────────────────────

  it("has no a11y violations", async () => {
    const { container } = render(<Checkbox aria-label="Accept terms" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
