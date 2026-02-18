import type { Meta, StoryObj } from "@storybook/react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Organisms/Dialog",
  component: Dialog,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded bg-[var(--color-accent)] px-4 py-2 text-sm text-white">Open Dialog</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
};
