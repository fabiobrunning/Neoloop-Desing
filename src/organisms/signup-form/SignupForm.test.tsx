import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignupForm } from "./SignupForm";
import { axe } from "../../lib/test-utils";

describe("SignupForm", () => {
  // ── Rendering ──────────────────────────────────────────────────────────

  it("renders with default props", () => {
    render(<SignupForm />);
    expect(screen.getByText("Create account")).toBeDefined();
    expect(screen.getByText("Enter your details to get started")).toBeDefined();
  });

  it("renders custom title and description", () => {
    render(<SignupForm title="Join us" description="Start your journey" />);
    expect(screen.getByText("Join us")).toBeDefined();
    expect(screen.getByText("Start your journey")).toBeDefined();
  });

  it("renders all form fields", () => {
    render(<SignupForm />);
    expect(screen.getByLabelText(/full name/i)).toBeDefined();
    expect(screen.getByLabelText(/email/i)).toBeDefined();
    expect(screen.getByLabelText(/^password/i)).toBeDefined();
    expect(screen.getByLabelText(/confirm password/i)).toBeDefined();
  });

  it("renders terms checkbox by default", () => {
    render(<SignupForm />);
    expect(screen.getByRole("checkbox")).toBeDefined();
  });

  it("hides terms checkbox when showTerms is false", () => {
    render(<SignupForm showTerms={false} />);
    expect(screen.queryByRole("checkbox")).toBeNull();
  });

  it("renders custom submit label", () => {
    render(<SignupForm submitLabel="Register" />);
    expect(screen.getByRole("button", { name: "Register" })).toBeDefined();
  });

  it("renders footer content", () => {
    render(<SignupForm footer={<span>Already have an account?</span>} />);
    expect(screen.getByText("Already have an account?")).toBeDefined();
  });

  // ── Error state ────────────────────────────────────────────────────────

  it("displays error banner", () => {
    render(<SignupForm error="Email already in use" />);
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByText("Email already in use")).toBeDefined();
  });

  // ── Validation ─────────────────────────────────────────────────────────

  it("shows validation errors on empty submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SignupForm onSubmit={onSubmit} />);
    await user.click(screen.getByRole("button", { name: "Sign up" }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("Name is required")).toBeDefined();
    expect(screen.getByText("Email is required")).toBeDefined();
  });

  it("shows password mismatch error", async () => {
    const user = userEvent.setup();
    render(<SignupForm showTerms={false} />);
    await user.type(screen.getByLabelText(/full name/i), "John");
    await user.type(screen.getByLabelText(/email/i), "john@test.com");
    await user.type(screen.getByLabelText(/^password/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "different");
    await user.click(screen.getByRole("button", { name: "Sign up" }));
    expect(screen.getByText("Passwords do not match")).toBeDefined();
  });

  it("shows password length error", async () => {
    const user = userEvent.setup();
    render(<SignupForm showTerms={false} />);
    await user.type(screen.getByLabelText(/full name/i), "John");
    await user.type(screen.getByLabelText(/email/i), "john@test.com");
    await user.type(screen.getByLabelText(/^password/i), "short");
    await user.type(screen.getByLabelText(/confirm password/i), "short");
    await user.click(screen.getByRole("button", { name: "Sign up" }));
    expect(screen.getByText("Password must be at least 8 characters")).toBeDefined();
  });

  // ── Submit ─────────────────────────────────────────────────────────────

  it("calls onSubmit with form data when valid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SignupForm onSubmit={onSubmit} showTerms={false} />);
    await user.type(screen.getByLabelText(/full name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/^password/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "password123");
    await user.click(screen.getByRole("button", { name: "Sign up" }));
    expect(onSubmit).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      confirmPassword: "password123",
    });
  });

  it("requires terms acceptance when showTerms is true", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SignupForm onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText(/full name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/^password/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "password123");
    await user.click(screen.getByRole("button", { name: "Sign up" }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("You must accept the terms")).toBeDefined();
  });

  // ── Loading ────────────────────────────────────────────────────────────

  it("disables submit button when loading", () => {
    render(<SignupForm loading />);
    expect(screen.getByRole("button", { name: /sign up/i }).hasAttribute("disabled")).toBe(true);
  });

  // ── Ref & className ────────────────────────────────────────────────────

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<SignupForm ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("passes custom className", () => {
    const { container } = render(<SignupForm className="custom-form" />);
    expect(container.firstElementChild?.className).toContain("custom-form");
  });

  // ── A11y ───────────────────────────────────────────────────────────────

  it("has no a11y violations", async () => {
    const { container } = render(<SignupForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
