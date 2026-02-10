import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Atoms/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error", "info"],
    },
    title: { control: "text" },
    hideIcon: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "This is an alert message.",
    variant: "default",
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: { variant: "default", children: "Something you should know." },
};

export const Success: Story = {
  args: { variant: "success", title: "Success!", children: "Your changes have been saved." },
};

export const Warning: Story = {
  args: { variant: "warning", title: "Warning", children: "Your session is about to expire." },
};

export const Error: Story = {
  args: { variant: "error", title: "Error", children: "Something went wrong. Please try again." },
};

export const Info: Story = {
  args: { variant: "info", title: "Info", children: "A new update is available." },
};

export const WithoutIcon: Story = {
  args: { variant: "info", hideIcon: true, children: "Alert without icon." },
};

export const WithoutTitle: Story = {
  args: { variant: "success", children: "Simple message without title." },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "480px" }}>
      <Alert variant="default" title="Default">Something you should know.</Alert>
      <Alert variant="success" title="Success">Your changes have been saved.</Alert>
      <Alert variant="warning" title="Warning">Your session is about to expire.</Alert>
      <Alert variant="error" title="Error">Something went wrong.</Alert>
      <Alert variant="info" title="Info">A new update is available.</Alert>
    </div>
  ),
};
