import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";
import { axe } from "../../lib/test-utils";

describe("Pagination", () => {
  // ── Rendering ──────────────────────────────────────────────────────────

  it("renders page buttons", () => {
    render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByLabelText("Page 1")).toBeDefined();
    expect(screen.getByLabelText("Page 5")).toBeDefined();
  });

  it("renders previous and next buttons", () => {
    render(<Pagination page={3} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByLabelText("Previous page")).toBeDefined();
    expect(screen.getByLabelText("Next page")).toBeDefined();
  });

  it("returns null for single page", () => {
    const { container } = render(
      <Pagination page={1} totalPages={1} onPageChange={() => {}} />,
    );
    expect(container.innerHTML).toBe("");
  });

  // ── Active Page ────────────────────────────────────────────────────────

  it("marks current page with aria-current=page", () => {
    render(<Pagination page={3} totalPages={5} onPageChange={() => {}} />);
    const page3 = screen.getByLabelText("Page 3");
    expect(page3.getAttribute("aria-current")).toBe("page");
  });

  // ── Navigation ─────────────────────────────────────────────────────────

  it("calls onPageChange when page button is clicked", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={1} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByLabelText("Page 3"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange with next page on next click", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByLabelText("Next page"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange with previous page on prev click", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByLabelText("Previous page"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  // ── Disabled States ────────────────────────────────────────────────────

  it("disables previous button on first page", () => {
    render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByLabelText("Previous page").hasAttribute("disabled")).toBe(true);
  });

  it("disables next button on last page", () => {
    render(<Pagination page={5} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByLabelText("Next page").hasAttribute("disabled")).toBe(true);
  });

  // ── Ellipsis ───────────────────────────────────────────────────────────

  it("shows ellipsis for many pages", () => {
    render(<Pagination page={5} totalPages={20} onPageChange={() => {}} />);
    const dots = screen.getAllByText("...");
    expect(dots.length).toBeGreaterThanOrEqual(1);
  });

  // ── Accessibility ──────────────────────────────────────────────────────

  it("has pagination aria-label on nav", () => {
    render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByLabelText("pagination")).toBeDefined();
  });

  // ── A11y ────────────────────────────────────────────────────────────────

  it("has no a11y violations", async () => {
    const { container } = render(
      <Pagination page={3} totalPages={10} onPageChange={() => {}} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
