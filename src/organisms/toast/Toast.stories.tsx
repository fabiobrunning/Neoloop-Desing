import type { Meta, StoryObj } from "@storybook/react";
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "./Toast";
import { Button } from "../../atoms/button";

const meta: Meta<typeof Toast> = {
  title: "Organisms/Toast",
  component: Toast,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastViewport />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => (
    <Toast open>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <ToastTitle>Notification</ToastTitle>
        <ToastDescription>Something happened in your application.</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  ),
};

export const Success: Story = {
  render: () => (
    <Toast open variant="success">
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <ToastTitle>Success</ToastTitle>
        <ToastDescription>Your changes have been saved.</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  ),
};

export const Error: Story = {
  render: () => (
    <Toast open variant="error">
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <ToastTitle>Error</ToastTitle>
        <ToastDescription>Failed to save changes. Please try again.</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  ),
};

export const Warning: Story = {
  render: () => (
    <Toast open variant="warning">
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <ToastTitle>Warning</ToastTitle>
        <ToastDescription>Your session expires in 5 minutes.</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  ),
};

export const Info: Story = {
  render: () => (
    <Toast open variant="info">
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <ToastTitle>Update Available</ToastTitle>
        <ToastDescription>A new version of the app is available.</ToastDescription>
      </div>
      <ToastClose />
    </Toast>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Toast open variant="error">
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
        <ToastTitle>Message deleted</ToastTitle>
        <ToastDescription>The message was moved to trash.</ToastDescription>
      </div>
      <ToastAction altText="Undo delete">Undo</ToastAction>
      <ToastClose />
    </Toast>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "400px" }}>
      {(["default", "success", "error", "warning", "info"] as const).map((variant) => (
        <Toast key={variant} open variant={variant} duration={Infinity}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <ToastTitle>{variant.charAt(0).toUpperCase() + variant.slice(1)}</ToastTitle>
            <ToastDescription>This is a {variant} toast message.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
      ))}
    </div>
  ),
};
