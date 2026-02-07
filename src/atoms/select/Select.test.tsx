import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "./Select";
import { axe } from "../../lib/test-utils";

function renderSelect(props: Record<string, unknown> = {}) {
  return render(
    <Select {...props}>
      <SelectTrigger data-testid="trigger">
        <SelectValue placeholder="Choose..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>,
  );
}

describe("Select", () => {
  it("renders trigger with placeholder", () => {
    renderSelect();
    expect(screen.getByTestId("trigger")).toBeDefined();
    expect(screen.getByText("Choose...")).toBeDefined();
  });

  it("has combobox role on trigger", () => {
    renderSelect();
    expect(screen.getByRole("combobox")).toBeDefined();
  });

  it("opens on trigger click", () => {
    renderSelect();
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("Apple")).toBeDefined();
    expect(screen.getByText("Banana")).toBeDefined();
    expect(screen.getByText("Cherry")).toBeDefined();
  });

  it("selects an item", () => {
    const onValueChange = vi.fn();
    renderSelect({ onValueChange });
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("Banana"));
    expect(onValueChange).toHaveBeenCalledWith("banana");
  });

  it("renders disabled state", () => {
    renderSelect({ disabled: true });
    expect(screen.getByRole("combobox").hasAttribute("disabled")).toBe(true);
  });

  it("renders with default value", () => {
    renderSelect({ defaultValue: "cherry" });
    expect(screen.getByText("Cherry")).toBeDefined();
  });

  it("renders error state on trigger", () => {
    render(
      <Select>
        <SelectTrigger error data-testid="trigger">
          <SelectValue placeholder="Choose..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByTestId("trigger").getAttribute("aria-invalid")).toBe("true");
  });

  it("renders group with label", () => {
    render(
      <Select defaultOpen>
        <SelectTrigger>
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByText("Fruits")).toBeDefined();
  });

  it("renders separator", () => {
    render(
      <Select defaultOpen>
        <SelectTrigger>
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
          <SelectSeparator data-testid="sep" />
          <SelectItem value="b">B</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByTestId("sep")).toBeDefined();
  });

  it("passes custom className to trigger", () => {
    render(
      <Select>
        <SelectTrigger className="custom-trigger" data-testid="trigger">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByTestId("trigger").className).toContain("custom-trigger");
  });

  // ── A11y ────────────────────────────────────────────────────────────────

  it("has no a11y violations", async () => {
    const { container } = render(
      <Select>
        <SelectTrigger aria-label="Select option">
          <SelectValue placeholder="Choose..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
        </SelectContent>
      </Select>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
