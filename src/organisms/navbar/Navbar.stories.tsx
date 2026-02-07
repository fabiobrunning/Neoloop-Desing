import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./Navbar";
import { Button } from "../../atoms/button";
import { Avatar, AvatarFallback } from "../../atoms/avatar";

const meta: Meta<typeof Navbar> = {
  title: "Organisms/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

const navItems = [
  { label: "Dashboard", href: "/dashboard", active: true },
  { label: "Projects", href: "/projects" },
  { label: "Settings", href: "/settings" },
];

// ── Default ──────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    brand: "Synkra",
    items: navItems,
    actions: (
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Button variant="ghost" size="sm">
          Help
        </Button>
        <Avatar>
          <AvatarFallback>FB</AvatarFallback>
        </Avatar>
      </div>
    ),
  },
};

// ── Minimal ──────────────────────────────────────────────────────────────

export const Minimal: Story = {
  args: {
    brand: "Synkra",
    items: [
      { label: "Home", href: "/", active: true },
      { label: "Docs", href: "/docs" },
    ],
  },
};

// ── Sticky ───────────────────────────────────────────────────────────────

export const Sticky: Story = {
  args: {
    brand: "Synkra",
    items: navItems,
    sticky: true,
  },
};

// ── Brand Only ───────────────────────────────────────────────────────────

export const BrandOnly: Story = {
  args: {
    brand: "Synkra DS",
  },
};
