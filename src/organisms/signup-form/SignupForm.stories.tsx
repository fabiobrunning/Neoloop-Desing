import type { Meta, StoryObj } from "@storybook/react";
import { SignupForm } from "./SignupForm";
import { Button } from "../../atoms/button";

const meta: Meta<typeof SignupForm> = {
  title: "Organisms/SignupForm",
  component: SignupForm,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    submitLabel: { control: "text" },
    loading: { control: "boolean" },
    error: { control: "text" },
    showTerms: { control: "boolean" },
  },
  args: {
    title: "Create account",
    description: "Enter your details to get started",
    submitLabel: "Sign up",
    loading: false,
    showTerms: true,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SignupForm>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: "An account with this email already exists.",
  },
};

export const Loading: Story = {
  args: { loading: true },
};

export const WithoutTerms: Story = {
  args: { showTerms: false },
};

export const CustomLabels: Story = {
  args: {
    title: "Join Lendario",
    description: "Create your free account today",
    submitLabel: "Get Started",
  },
};

export const WithFooter: Story = {
  args: {
    footer: (
      <Button variant="link" size="sm" className="text-xs">
        Already have an account? Sign in
      </Button>
    ),
  },
};

export const WithCustomTerms: Story = {
  args: {
    termsLabel: (
      <span>
        I agree to the{" "}
        <a href="#" className="text-primary underline">Terms</a> and{" "}
        <a href="#" className="text-primary underline">Privacy Policy</a>
      </span>
    ),
  },
};
