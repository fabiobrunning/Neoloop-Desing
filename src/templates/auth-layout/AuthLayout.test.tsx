import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthLayout } from "./AuthLayout";

describe("AuthLayout", () => {
  // ── Rendering ──────────────────────────────────────────────────────────

  it("renders heading", () => {
    render(<AuthLayout heading="Welcome back" />);
    expect(screen.getByText("Welcome back")).toBeDefined();
  });

  it("renders subheading", () => {
    render(<AuthLayout subheading="Sign in to continue" />);
    expect(screen.getByText("Sign in to continue")).toBeDefined();
  });

  it("renders children (form content)", () => {
    render(
      <AuthLayout heading="Login">
        <form data-testid="login-form">
          <input type="email" />
        </form>
      </AuthLayout>,
    );
    expect(screen.getByTestId("login-form")).toBeDefined();
  });

  // ── Brand ──────────────────────────────────────────────────────────────

  it("renders brand on mobile", () => {
    render(<AuthLayout brand="MyBrand" />);
    expect(screen.getByText("MyBrand")).toBeDefined();
  });

  // ── Side Content ───────────────────────────────────────────────────────

  it("renders custom side content", () => {
    render(
      <AuthLayout sideContent={<div data-testid="side">Custom side</div>} />,
    );
    expect(screen.getByTestId("side")).toBeDefined();
  });

  it("renders default side content when none provided", () => {
    render(<AuthLayout heading="Test" />);
    // Default side content has "Synkra" text
    expect(screen.getByText("Synkra")).toBeDefined();
  });

  // ── Footer ─────────────────────────────────────────────────────────────

  it("renders footer content", () => {
    render(<AuthLayout footer={<span>© 2026 Synkra</span>} />);
    expect(screen.getByText("© 2026 Synkra")).toBeDefined();
  });

  it("does not render footer when not provided", () => {
    const { container } = render(<AuthLayout heading="Test" />);
    expect(container.querySelector(".border-t.border-border:last-child")).toBeNull();
  });

  // ── Custom className ───────────────────────────────────────────────────

  it("passes custom className", () => {
    render(<AuthLayout className="custom-auth" data-testid="auth" />);
    expect(screen.getByTestId("auth").className).toContain("custom-auth");
  });

  // ── Full Composition ───────────────────────────────────────────────────

  it("renders full composition", () => {
    render(
      <AuthLayout
        brand="Synkra"
        heading="Sign in"
        subheading="Enter your credentials"
        footer={<span>Footer text</span>}
      >
        <button type="submit">Submit</button>
      </AuthLayout>,
    );
    expect(screen.getByText("Sign in")).toBeDefined();
    expect(screen.getByText("Enter your credentials")).toBeDefined();
    expect(screen.getByText("Submit")).toBeDefined();
    expect(screen.getByText("Footer text")).toBeDefined();
  });
});
