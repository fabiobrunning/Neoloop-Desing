import type { Meta, StoryObj } from "@storybook/react";
import { AuthLayout } from "./AuthLayout";
import { Button } from "../../atoms/button";
import { Input } from "../../atoms/input";
import { FormField } from "../../molecules/form-field";

const meta: Meta<typeof AuthLayout> = {
  title: "Templates/AuthLayout",
  component: AuthLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AuthLayout>;

// ── Login ────────────────────────────────────────────────────────────────

export const Login: Story = {
  render: () => (
    <AuthLayout
      heading="Welcome back"
      subheading="Enter your credentials to access your account."
      footer={<span>© 2026 Synkra. All rights reserved.</span>}
    >
      <form className="flex flex-col gap-4">
        <FormField id="email" label="Email" inputProps={{ type: "email", placeholder: "you@example.com" }} />
        <FormField id="password" label="Password" inputProps={{ type: "password", placeholder: "••••••••" }} />
        <Button type="submit" className="w-full mt-2">Sign in</Button>
      </form>
    </AuthLayout>
  ),
};

// ── Register ─────────────────────────────────────────────────────────────

export const Register: Story = {
  render: () => (
    <AuthLayout
      heading="Create account"
      subheading="Get started with a free account."
      footer={<span>Already have an account? Sign in</span>}
    >
      <form className="flex flex-col gap-4">
        <FormField id="name" label="Name" inputProps={{ placeholder: "John Doe" }} />
        <FormField id="email" label="Email" inputProps={{ type: "email", placeholder: "you@example.com" }} />
        <FormField id="password" label="Password" inputProps={{ type: "password", placeholder: "••••••••" }} />
        <Button type="submit" className="w-full mt-2">Create account</Button>
      </form>
    </AuthLayout>
  ),
};

// ── With Brand ───────────────────────────────────────────────────────────

export const WithBrand: Story = {
  render: () => (
    <AuthLayout
      brand="Synkra"
      heading="Sign in"
      subheading="Welcome back to Synkra."
    >
      <form className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-text-primary">Email</label>
          <Input id="email" type="email" placeholder="you@example.com" className="mt-1" />
        </div>
        <Button type="submit" className="w-full">Continue</Button>
      </form>
    </AuthLayout>
  ),
};

// ── Custom Side Content ──────────────────────────────────────────────────

export const CustomSideContent: Story = {
  render: () => (
    <AuthLayout
      heading="Welcome"
      sideContent={
        <div className="max-w-md text-center">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Start building today</h2>
          <p className="text-text-muted">Join thousands of developers using Synkra DS.</p>
        </div>
      }
    >
      <form className="flex flex-col gap-4">
        <FormField id="email" label="Email" inputProps={{ type: "email" }} />
        <Button type="submit" className="w-full">Get started</Button>
      </form>
    </AuthLayout>
  ),
};
