import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorPage } from "./ErrorPage";

describe("ErrorPage", () => {
  // ── Default 404 ────────────────────────────────────────────────────────

  it("renders default 404 title", () => {
    render(<ErrorPage />);
    expect(screen.getByText("Page Not Found")).toBeDefined();
  });

  it("renders default 404 description", () => {
    render(<ErrorPage />);
    expect(
      screen.getByText(/doesn't exist or has been moved/i),
    ).toBeDefined();
  });

  it("renders default 404 illustration", () => {
    render(<ErrorPage />);
    expect(screen.getByText("404")).toBeDefined();
  });

  // ── 500 ────────────────────────────────────────────────────────────────

  it("renders 500 title", () => {
    render(<ErrorPage statusCode={500} />);
    expect(screen.getByText("Internal Server Error")).toBeDefined();
  });

  it("renders 500 description", () => {
    render(<ErrorPage statusCode={500} />);
    expect(screen.getByText(/something went wrong/i)).toBeDefined();
  });

  it("renders 500 illustration", () => {
    render(<ErrorPage statusCode={500} />);
    expect(screen.getByText("500")).toBeDefined();
  });

  // ── 403 ────────────────────────────────────────────────────────────────

  it("renders 403 title", () => {
    render(<ErrorPage statusCode={403} />);
    expect(screen.getByText("Forbidden")).toBeDefined();
  });

  // ── Custom Content ─────────────────────────────────────────────────────

  it("renders custom title", () => {
    render(<ErrorPage title="Custom Error" />);
    expect(screen.getByText("Custom Error")).toBeDefined();
  });

  it("renders custom description", () => {
    render(<ErrorPage description="Something custom happened." />);
    expect(screen.getByText("Something custom happened.")).toBeDefined();
  });

  it("renders custom illustration", () => {
    render(
      <ErrorPage
        illustration={<div data-testid="custom-illustration">🔍</div>}
      />,
    );
    expect(screen.getByTestId("custom-illustration")).toBeDefined();
  });

  // ── Actions ────────────────────────────────────────────────────────────

  it("renders primary action", () => {
    render(
      <ErrorPage primaryAction={<button>Go Home</button>} />,
    );
    expect(screen.getByText("Go Home")).toBeDefined();
  });

  it("renders secondary action", () => {
    render(
      <ErrorPage secondaryAction={<button>Go Back</button>} />,
    );
    expect(screen.getByText("Go Back")).toBeDefined();
  });

  it("renders both actions", () => {
    render(
      <ErrorPage
        primaryAction={<button>Home</button>}
        secondaryAction={<button>Back</button>}
      />,
    );
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Back")).toBeDefined();
  });

  it("does not render actions container when no actions", () => {
    const { container } = render(<ErrorPage />);
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(0);
  });

  // ── Accessibility ──────────────────────────────────────────────────────

  it("has alert role", () => {
    render(<ErrorPage />);
    expect(screen.getByRole("alert")).toBeDefined();
  });

  // ── Custom className ───────────────────────────────────────────────────

  it("passes custom className", () => {
    render(<ErrorPage className="custom-error" data-testid="err" />);
    expect(screen.getByTestId("err").className).toContain("custom-error");
  });
});
