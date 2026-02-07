import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Organisms/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

const linkGroups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Components", href: "/components" },
      { label: "Design Tokens", href: "/tokens" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

// ── Default ──────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    brand: "Synkra DS",
    description: "A token-based design system built with React, Tailwind CSS, and Radix UI.",
    linkGroups,
    copyright: `\u00A9 ${new Date().getFullYear()} Synkra. All rights reserved.`,
  },
};

// ── Simple ───────────────────────────────────────────────────────────────

export const Simple: Story = {
  args: {
    copyright: `\u00A9 ${new Date().getFullYear()} Synkra. All rights reserved.`,
  },
};

// ── With Bottom Content ──────────────────────────────────────────────────

export const WithBottomContent: Story = {
  args: {
    brand: "Synkra",
    linkGroups: linkGroups.slice(0, 2),
    copyright: `\u00A9 ${new Date().getFullYear()} Synkra.`,
    bottomContent: (
      <div style={{ display: "flex", gap: "12px" }}>
        <a href="/privacy" style={{ fontSize: "12px" }}>
          Privacy
        </a>
        <a href="/terms" style={{ fontSize: "12px" }}>
          Terms
        </a>
      </div>
    ),
  },
};
