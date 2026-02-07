import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Textarea } from "./Textarea";
import { axe } from "../../lib/test-utils";

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea data-testid="ta" />);
    const el = screen.getByTestId("ta");
    expect(el.tagName).toBe("TEXTAREA");
  });

  it("renders with placeholder", () => {
    render(<Textarea placeholder="Write something..." />);
    expect(screen.getByPlaceholderText("Write something...")).toBeDefined();
  });

  it("handles value change", () => {
    const onChange = vi.fn();
    render(<Textarea data-testid="ta" onChange={onChange} />);
    fireEvent.change(screen.getByTestId("ta"), { target: { value: "Hello" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("renders disabled state", () => {
    render(<Textarea data-testid="ta" disabled />);
    expect(screen.getByTestId("ta").hasAttribute("disabled")).toBe(true);
  });

  it("renders error state with aria-invalid", () => {
    render(<Textarea data-testid="ta" error />);
    expect(screen.getByTestId("ta").getAttribute("aria-invalid")).toBe("true");
  });

  it("does not set aria-invalid when no error", () => {
    render(<Textarea data-testid="ta" />);
    expect(screen.getByTestId("ta").getAttribute("aria-invalid")).toBeNull();
  });

  it("renders with rows prop", () => {
    render(<Textarea data-testid="ta" rows={5} />);
    expect(screen.getByTestId("ta").getAttribute("rows")).toBe("5");
  });

  it("passes custom className", () => {
    render(<Textarea data-testid="ta" className="custom-textarea" />);
    expect(screen.getByTestId("ta").className).toContain("custom-textarea");
  });

  it("renders readonly state", () => {
    render(<Textarea data-testid="ta" readOnly value="Fixed text" />);
    expect(screen.getByTestId("ta").hasAttribute("readOnly")).toBe(true);
  });

  // ── A11y ────────────────────────────────────────────────────────────────

  it("has no a11y violations", async () => {
    const { container } = render(<Textarea aria-label="Message" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
