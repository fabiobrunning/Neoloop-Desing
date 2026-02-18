import type { Meta, StoryObj } from "@storybook/react";
import { NavigationMenu, NavigationMenuItem } from "./NavigationMenu";

const meta: Meta<typeof NavigationMenu> = {
  title: "Molecules/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof NavigationMenu>;

export const Default: Story = {
  render: () => (
    <NavigationMenu aria-label="Main navigation">
      <NavigationMenuItem href="/" active>Home</NavigationMenuItem>
      <NavigationMenuItem href="/about">About</NavigationMenuItem>
      <NavigationMenuItem href="/docs">Docs</NavigationMenuItem>
    </NavigationMenu>
  ),
};
