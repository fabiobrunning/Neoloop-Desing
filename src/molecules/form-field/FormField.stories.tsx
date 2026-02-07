import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./FormField";

const meta: Meta<typeof FormField> = {
  title: "Molecules/FormField",
  component: FormField,
  tags: ["autodocs"],
  argTypes: {
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    id: "name",
    label: "Name",
    inputProps: { placeholder: "Enter your name" },
  },
};

export const WithHelperText: Story = {
  args: {
    id: "email",
    label: "Email",
    helperText: "We'll never share your email.",
    inputProps: { type: "email", placeholder: "you@example.com" },
  },
};

export const Required: Story = {
  args: {
    id: "password",
    label: "Password",
    required: true,
    inputProps: { type: "password", placeholder: "Min 8 characters" },
  },
};

export const WithError: Story = {
  args: {
    id: "email",
    label: "Email",
    error: "Please enter a valid email address.",
    inputProps: { type: "email", defaultValue: "invalid-email" },
  },
};

export const Disabled: Story = {
  args: {
    id: "disabled",
    label: "Disabled Field",
    disabled: true,
    inputProps: { defaultValue: "Cannot edit" },
  },
};

export const LoginForm: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "360px" }}>
      <FormField
        id="login-email"
        label="Email"
        required
        inputProps={{ type: "email", placeholder: "you@example.com" }}
      />
      <FormField
        id="login-password"
        label="Password"
        required
        inputProps={{ type: "password", placeholder: "Enter password" }}
        helperText="Must be at least 8 characters."
      />
    </div>
  ),
  name: "Login Form Example",
};
