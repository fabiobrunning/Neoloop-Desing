import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert } from "./Alert";
import { axe } from "../../lib/test-utils";

describe("Alert", () => {
  it("renders with default variant", () => {
    render(<Alert>Something happened</Alert>);
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByText("Something happened")).toBeDefined();
  });

  it("renders title when provided", () => {
    render(<Alert title="Heads up">Description text</Alert>);
    expect(screen.getByText("Heads up")).toBeDefined();
    expect(screen.getByText("Description text")).toBeDefined();
  });

  it.each(["default", "success", "warning", "error", "info"] as const)(
    "renders %s variant",
    (variant) => {
      render(<Alert variant={variant}>Message</Alert>);
      expect(screen.getByRole("alert")).toBeDefined();
    },
  );

  it("hides icon when hideIcon is true", () => {
    const { container } = render(<Alert hideIcon>No icon</Alert>);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(0);
  });

  it("shows icon by default", () => {
    const { container } = render(<Alert>With icon</Alert>);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(1);
  });

  it("passes custom className", () => {
    render(<Alert className="custom-alert">Test</Alert>);
    expect(screen.getByRole("alert").className).toContain("custom-alert");
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Alert ref={ref}>Ref test</Alert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("renders children as ReactNode", () => {
    render(
      <Alert>
        <span data-testid="child">Custom child</span>
      </Alert>,
    );
    expect(screen.getByTestId("child")).toBeDefined();
  });

  // A11y
  it("has no a11y violations", async () => {
    const { container } = render(<Alert title="Alert title">Alert description</Alert>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
