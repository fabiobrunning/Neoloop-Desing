import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders with default variant", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toBeDefined();
  });

  it("is hidden from accessibility tree", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton").getAttribute("aria-hidden")).toBe("true");
  });

  it("applies pulse animation class", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton").className).toContain("animate-pulse");
  });

  it("renders circle variant", () => {
    render(<Skeleton variant="circle" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton").className).toContain("rounded-full");
  });

  it("renders rectangle variant", () => {
    render(<Skeleton variant="rectangle" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton").className).toContain("rounded-md");
  });

  it("renders text variant", () => {
    render(<Skeleton variant="text" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton").className).toContain("rounded-sm");
  });

  it("applies custom width and height as numbers", () => {
    render(<Skeleton width={200} height={40} data-testid="skeleton" />);
    const el = screen.getByTestId("skeleton");
    expect(el.style.width).toBe("200px");
    expect(el.style.height).toBe("40px");
  });

  it("applies custom width and height as strings", () => {
    render(<Skeleton width="100%" height="2rem" data-testid="skeleton" />);
    const el = screen.getByTestId("skeleton");
    expect(el.style.width).toBe("100%");
    expect(el.style.height).toBe("2rem");
  });

  it("passes custom className", () => {
    render(<Skeleton className="my-skeleton" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton").className).toContain("my-skeleton");
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
