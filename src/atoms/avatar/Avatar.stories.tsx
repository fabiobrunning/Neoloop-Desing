import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Avatar size",
    },
  },
  args: {
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithFallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>FB</AvatarFallback>
    </Avatar>
  ),
};

export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage
        src="https://api.dicebear.com/7.x/initials/svg?seed=FB&backgroundColor=2B4BEE"
        alt="Fabio"
      />
      <AvatarFallback>FB</AvatarFallback>
    </Avatar>
  ),
};

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>S</AvatarFallback>
    </Avatar>
  ),
};

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>LG</AvatarFallback>
    </Avatar>
  ),
};

export const ExtraLarge: Story = {
  args: { size: "xl" },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>XL</AvatarFallback>
    </Avatar>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
      <Avatar size="md"><AvatarFallback>MD</AvatarFallback></Avatar>
      <Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
      <Avatar size="xl"><AvatarFallback>XL</AvatarFallback></Avatar>
    </div>
  ),
};

export const CustomStyled: Story = {
  render: () => (
    <Avatar className="ring-2 ring-primary ring-offset-2 ring-offset-bg-base">
      <AvatarFallback className="bg-primary text-text-inverse">VIP</AvatarFallback>
    </Avatar>
  ),
};

export const Group: Story = {
  render: () => (
    <div style={{ display: "flex" }}>
      {["AB", "CD", "EF", "GH"].map((initials, i) => (
        <Avatar
          key={initials}
          className="ring-2 ring-bg-base"
          style={{ marginLeft: i > 0 ? "-8px" : 0 }}
        >
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};
