import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  // ── Rendering ──────────────────────────────────────────────────────────

  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: /click me/i });
    expect(btn).toBeDefined();
    expect(btn.getAttribute("type")).toBeNull(); // no explicit type by default (inherits button)
  });

  it("renders children correctly", () => {
    render(<Button>Save changes</Button>);
    expect(screen.getByText("Save changes")).toBeDefined();
  });

  // ── Variants ───────────────────────────────────────────────────────────

  it.each(["primary", "secondary", "outline", "ghost", "destructive", "link"] as const)(
    "renders %s variant without error",
    (variant) => {
      render(<Button variant={variant}>{variant}</Button>);
      expect(screen.getByRole("button", { name: variant })).toBeDefined();
    },
  );

  // ── Sizes ──────────────────────────────────────────────────────────────

  it.each(["sm", "md", "lg", "icon"] as const)(
    "renders %s size without error",
    (size) => {
      const label = size === "icon" ? "X" : `Size ${size}`;
      render(<Button size={size}>{label}</Button>);
      expect(screen.getByRole("button", { name: label })).toBeDefined();
    },
  );

  // ── Disabled State ─────────────────────────────────────────────────────

  it("disables the button when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole("button", { name: /disabled/i });
    expect(btn.hasAttribute("disabled")).toBe(true);
    expect(btn.getAttribute("aria-disabled")).toBe("true");
  });

  it("does not fire onClick when disabled", () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        No click
      </Button>,
    );
    fireEvent.click(screen.getByRole("button", { name: /no click/i }));
    expect(onClick).not.toHaveBeenCalled();
  });

  // ── Loading State ──────────────────────────────────────────────────────

  it("shows spinner and disables when loading", () => {
    render(<Button loading>Loading</Button>);
    const btn = screen.getByRole("button", { name: /loading/i });
    expect(btn.hasAttribute("disabled")).toBe(true);
    expect(btn.getAttribute("aria-busy")).toBe("true");
  });

  it("does not fire onClick when loading", () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Wait
      </Button>,
    );
    fireEvent.click(screen.getByRole("button", { name: /wait/i }));
    expect(onClick).not.toHaveBeenCalled();
  });

  // ── Events ─────────────────────────────────────────────────────────────

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button", { name: /click/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // ── HTML Attributes ────────────────────────────────────────────────────

  it("passes type attribute through", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button", { name: /submit/i }).getAttribute("type")).toBe(
      "submit",
    );
  });

  it("passes custom className", () => {
    render(<Button className="custom-class">Styled</Button>);
    const btn = screen.getByRole("button", { name: /styled/i });
    expect(btn.className).toContain("custom-class");
  });

  it("forwards ref via callback", () => {
    const refCallback = vi.fn();
    render(<Button ref={refCallback}>Ref</Button>);
    expect(refCallback).toHaveBeenCalled();
    const el = refCallback.mock.calls[0][0] as HTMLButtonElement;
    expect(el.tagName).toBe("BUTTON");
  });

  // ── asChild (Slot) ────────────────────────────────────────────────────

  it("renders as child element with asChild", () => {
    render(
      <Button asChild>
        <a href="/test">Link button</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: /link button/i });
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("/test");
  });

  // ── Accessibility ──────────────────────────────────────────────────────

  it("has accessible name from children", () => {
    render(<Button>Accessible</Button>);
    expect(screen.getByRole("button", { name: /accessible/i })).toBeDefined();
  });

  it("supports aria-label override", () => {
    render(<Button aria-label="Close dialog">X</Button>);
    expect(screen.getByRole("button", { name: /close dialog/i })).toBeDefined();
  });
});
