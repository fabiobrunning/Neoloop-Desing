import type { Meta, StoryObj } from "@storybook/react";
import { Toast, ToastTitle, ToastDescription } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Organisms/Toast",
  component: Toast,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => (
    <Toast>
      <ToastTitle>Notification</ToastTitle>
      <ToastDescription>Something happened.</ToastDescription>
    </Toast>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Toast variant="destructive">
      <ToastTitle>Error</ToastTitle>
      <ToastDescription>Something went wrong.</ToastDescription>
    </Toast>
  ),
};
