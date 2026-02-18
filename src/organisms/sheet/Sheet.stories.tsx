import type { Meta, StoryObj } from "@storybook/react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./Sheet";

const meta: Meta<typeof Sheet> = {
  title: "Organisms/Sheet",
  component: Sheet,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded bg-[var(--color-accent)] px-4 py-2 text-sm text-white">Open Sheet</button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sidebar Panel</SheetTitle>
          <SheetDescription>Navigation and settings.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};
