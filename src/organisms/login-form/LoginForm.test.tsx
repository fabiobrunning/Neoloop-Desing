import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";
import { axe } from "../../lib/test-utils";

describe("LoginForm", () => {
  it("renders with default props", () => {
    render(<LoginForm />);
    expect(screen.getByText("Welcome back")).toBeDefined();
    expect(screen.getByText("Enter your credentials to access your account")).toBeDefined();
    expect(screen.getByText("Sign in")).toBeDefined();
  });

  it("renders custom title and description", () => {
    render(<LoginForm title="Login" description="Access your panel" />);
    expect(screen.getByText("Login")).toBeDefined();
    expect(screen.getByText("Access your panel")).toBeDefined();
  });

  it("renders email and password fields", () => {
    render(<LoginForm />);
    expect(screen.getByText("Email")).toBeDefined();
    expect(screen.getByText("Password")).toBeDefined();
  });

  it("shows forgot password link by default", () => {
    render(<LoginForm />);
    expect(screen.getByText("Forgot password?")).toBeDefined();
  });

  it("hides forgot password when showForgotPassword is false", () => {
    render(<LoginForm showForgotPassword={false} />);
    expect(screen.queryByText("Forgot password?")).toBeNull();
  });

  it("calls onForgotPassword when clicked", () => {
    const onForgot = vi.fn();
    render(<LoginForm onForgotPassword={onForgot} />);
    fireEvent.click(screen.getByText("Forgot password?"));
    expect(onForgot).toHaveBeenCalledTimes(1);
  });

  it("shows error message", () => {
    render(<LoginForm error="Invalid credentials" />);
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByText("Invalid credentials")).toBeDefined();
  });

  it("shows validation errors on empty submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    await user.click(screen.getByRole("button", { name: "Sign in" }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("Email is required")).toBeDefined();
    expect(screen.getByText("Password is required")).toBeDefined();
  });

  it("calls onSubmit with email and password when valid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    await user.type(screen.getByPlaceholderText("you@example.com"), "test@example.com");
    await user.type(screen.getByPlaceholderText("Enter your password"), "secret123");
    await user.click(screen.getByRole("button", { name: "Sign in" }));
    expect(onSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "secret123",
    });
  });

  it("shows loading state on submit button", () => {
    render(<LoginForm loading />);
    const btn = screen.getByText("Sign in").closest("button");
    expect(btn?.hasAttribute("disabled")).toBe(true);
    expect(btn?.getAttribute("aria-busy")).toBe("true");
  });

  it("renders custom submit label", () => {
    render(<LoginForm submitLabel="Entrar" />);
    expect(screen.getByText("Entrar")).toBeDefined();
  });

  it("renders footer content", () => {
    render(
      <LoginForm
        footer={<p>Don&apos;t have an account? Sign up</p>}
      />,
    );
    expect(screen.getByText(/Sign up/)).toBeDefined();
  });

  it("passes custom className to card", () => {
    render(<LoginForm className="custom-login" data-testid="login" />);
    expect(screen.getByTestId("login").className).toContain("custom-login");
  });

  // ── A11y ────────────────────────────────────────────────────────────────

  it("has no a11y violations", async () => {
    const { container } = render(<LoginForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
