import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Icon } from "./Icon";
import { axe } from "../../lib/test-utils";

describe("Icon", () => {
  // ── Rendering ──────────────────────────────────────────────────────────

  it("renders a known icon", () => {
    render(<Icon name="House" label="Home" />);
    expect(screen.getByRole("img", { name: /home/i })).toBeDefined();
  });

  it("returns null for an unknown icon name", () => {
    const { container } = render(
      <Icon name={"FakeIconThatDoesNotExist" as never} />,
    );
    expect(container.innerHTML).toBe("");
  });

  // ── Sizes ──────────────────────────────────────────────────────────────

  it("renders xs size", () => {
    const { container } = render(<Icon name="Star" size="xs" />);
    const svg = container.querySelector("svg")!;
    expect(svg.classList.contains("h-3")).toBe(true);
    expect(svg.classList.contains("w-3")).toBe(true);
  });

  it("renders sm size", () => {
    const { container } = render(<Icon name="Star" size="sm" />);
    const svg = container.querySelector("svg")!;
    expect(svg.classList.contains("h-4")).toBe(true);
  });

  it("renders default (md) size", () => {
    const { container } = render(<Icon name="Star" />);
    const svg = container.querySelector("svg")!;
    expect(svg.classList.contains("h-5")).toBe(true);
  });

  it("renders lg size", () => {
    const { container } = render(<Icon name="Star" size="lg" />);
    const svg = container.querySelector("svg")!;
    expect(svg.classList.contains("h-6")).toBe(true);
  });

  it("renders xl size", () => {
    const { container } = render(<Icon name="Star" size="xl" />);
    const svg = container.querySelector("svg")!;
    expect(svg.classList.contains("h-8")).toBe(true);
  });

  // ── Accessibility ──────────────────────────────────────────────────────

  it("is aria-hidden when no label provided", () => {
    const { container } = render(<Icon name="Star" />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("aria-hidden")).toBe("true");
  });

  it("has role=img and aria-label when label provided", () => {
    render(<Icon name="Star" label="Favorite" />);
    const el = screen.getByRole("img", { name: /favorite/i });
    expect(el.getAttribute("aria-label")).toBe("Favorite");
  });

  // ── HTML Attributes ────────────────────────────────────────────────────

  it("passes custom className", () => {
    const { container } = render(
      <Icon name="Star" className="text-red-500" />,
    );
    const svg = container.querySelector("svg")!;
    expect(svg.classList.contains("text-red-500")).toBe(true);
  });

  it("forwards ref", () => {
    const refCallback = vi.fn();
    render(<Icon name="Star" ref={refCallback} />);
    expect(refCallback).toHaveBeenCalled();
    const el = refCallback.mock.calls[0][0] as SVGSVGElement;
    expect(el.tagName).toBe("svg");
  });

  // ── A11y ───────────────────────────────────────────────────────────────

  it("has no a11y violations (decorative)", async () => {
    const { container } = render(<Icon name="Star" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no a11y violations (with label)", async () => {
    const { container } = render(<Icon name="Star" label="Favorite" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
