import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["rectangle", "circle", "text"] },
    width: { control: "text" },
    height: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Rectangle: Story = {
  args: { variant: "rectangle", width: "100%", height: "120px" },
};

export const Circle: Story = {
  args: { variant: "circle", width: 48, height: 48 },
};

export const Text: Story = {
  args: { variant: "text" },
};

export const CardSkeleton: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
      <Skeleton variant="rectangle" width="100%" height="180px" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Skeleton variant="circle" width={32} height={32} />
        <Skeleton variant="text" width="120px" />
      </div>
    </div>
  ),
};

export const ProfileSkeleton: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Skeleton variant="circle" width={64} height={64} />
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="70%" />
      </div>
    </div>
  ),
};
