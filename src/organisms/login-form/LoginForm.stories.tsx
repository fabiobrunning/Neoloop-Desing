import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "Organisms/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    submitLabel: { control: "text" },
    loading: { control: "boolean" },
    error: { control: "text" },
    showForgotPassword: { control: "boolean" },
  },
  args: {
    title: "Welcome back",
    description: "Enter your credentials to access your account",
    submitLabel: "Sign in",
    loading: false,
    showForgotPassword: true,
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

// ── Default ─────────────────────────────────────────────────────────────

export const Default: Story = {};

// ── Custom Title ────────────────────────────────────────────────────────

export const CustomTitle: Story = {
  args: {
    title: "Entrar",
    description: "Acesse sua conta Lendario",
    submitLabel: "Entrar",
  },
};

// ── States ──────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: { loading: true },
};

export const WithError: Story = {
  args: { error: "Invalid email or password. Please try again." },
};

export const NoForgotPassword: Story = {
  args: { showForgotPassword: false },
};

// ── With Footer ─────────────────────────────────────────────────────────

export const WithFooter: Story = {
  render: () => (
    <LoginForm
      footer={
        <p style={{ fontSize: "14px", color: "var(--color-text-muted)", textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <a href="#" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
            Sign up
          </a>
        </p>
      }
    />
  ),
};

// ── Full Example ────────────────────────────────────────────────────────

export const FullExample: Story = {
  render: () => (
    <LoginForm
      title="Lendario"
      description="Sign in to your premium account"
      submitLabel="Access Dashboard"
      showForgotPassword
      onForgotPassword={() => alert("Forgot password clicked")}
      onSubmit={(data) => alert(`Email: ${data.email}\nPassword: ${data.password}`)}
      footer={
        <p style={{ fontSize: "14px", color: "var(--color-text-muted)", textAlign: "center" }}>
          New here?{" "}
          <a href="#" style={{ color: "var(--color-primary)" }}>
            Create account
          </a>
        </p>
      }
    />
  ),
};
