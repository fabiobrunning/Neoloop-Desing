import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import { axe } from "../../lib/test-utils";

function renderRadioGroup(props?: Record<string, unknown>) {
  return render(
    <RadioGroup defaultValue="a" aria-label="Test group" {...props}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="a" aria-label="Option A" />
        <label>Option A</label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="b" aria-label="Option B" />
        <label>Option B</label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <RadioGroupItem value="c" aria-label="Option C" />
        <label>Option C</label>
      </div>
    </RadioGroup>,
  );
}

describe("RadioGroup", () => {
  it("renders all radio items", () => {
    renderRadioGroup();
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
  });

  it("has default value checked", () => {
    renderRadioGroup();
    const optionA = screen.getByRole("radio", { name: /option a/i });
    expect(optionA.getAttribute("data-state")).toBe("checked");
  });

  it("changes selection on click", () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup aria-label="Test group" onValueChange={onValueChange}>
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      </RadioGroup>,
    );
    fireEvent.click(screen.getByRole("radio", { name: /option b/i }));
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("disables all items when group is disabled", () => {
    render(
      <RadioGroup disabled aria-label="Disabled group">
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      </RadioGroup>,
    );
    const radios = screen.getAllByRole("radio");
    radios.forEach((radio) => {
      expect(radio.hasAttribute("disabled")).toBe(true);
    });
  });

  it("does not change when disabled", () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup disabled aria-label="No change" onValueChange={onValueChange}>
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      </RadioGroup>,
    );
    fireEvent.click(screen.getByRole("radio", { name: /option b/i }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("sets aria-invalid when error is true on group", () => {
    renderRadioGroup({ error: true });
    const group = screen.getByRole("radiogroup");
    expect(group.getAttribute("aria-invalid")).toBe("true");
  });

  it("sets aria-invalid when error is true on item", () => {
    render(
      <RadioGroup aria-label="Error group">
        <RadioGroupItem value="a" aria-label="Error item" error />
      </RadioGroup>,
    );
    const radio = screen.getByRole("radio", { name: /error item/i });
    expect(radio.getAttribute("aria-invalid")).toBe("true");
  });

  it("passes custom className to group", () => {
    const { container } = render(
      <RadioGroup aria-label="Custom" className="custom-group">
        <RadioGroupItem value="a" aria-label="A" />
      </RadioGroup>,
    );
    expect(container.firstElementChild?.className).toContain("custom-group");
  });

  it("supports controlled value", () => {
    const { rerender } = render(
      <RadioGroup value="a" aria-label="Controlled">
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: /option a/i }).getAttribute("data-state")).toBe(
      "checked",
    );

    rerender(
      <RadioGroup value="b" aria-label="Controlled">
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: /option b/i }).getAttribute("data-state")).toBe(
      "checked",
    );
  });

  // ── A11y ────────────────────────────────────────────────────────────────

  it("has no a11y violations", async () => {
    const { container } = renderRadioGroup();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
