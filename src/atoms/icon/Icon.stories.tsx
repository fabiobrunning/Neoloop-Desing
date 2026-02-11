import type { Meta, StoryObj } from "@storybook/react";
import { Icon, type IconName } from "./Icon";
import { iconNames } from "../../icons";

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: iconNames,
      description: "Name of the icon from the registry",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size preset from the design system",
    },
    label: {
      control: "text",
      description: "Accessible label (omit for decorative icons)",
    },
  },
  args: {
    name: "House",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// ── Default ──────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { name: "House", label: "Home" },
};

// ── Sizes ────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Icon name="Star" size="xs" />
      <Icon name="Star" size="sm" />
      <Icon name="Star" size="md" />
      <Icon name="Star" size="lg" />
      <Icon name="Star" size="xl" />
    </div>
  ),
};

// ── Common Icons ─────────────────────────────────────────────────────────

const commonIcons: IconName[] = [
  "House",
  "Settings",
  "User",
  "Search",
  "Bell",
  "Mail",
  "Heart",
  "Star",
  "ChevronRight",
  "ChevronDown",
  "Plus",
  "X",
  "Check",
  "CircleAlert",
  "Info",
  "Trash2",
  "Pencil",
  "Eye",
  "EyeOff",
  "LogOut",
];

export const CommonIcons: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "24px",
      }}
    >
      {commonIcons.map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Icon name={name} size="lg" />
          <span style={{ fontSize: "11px", color: "#A1A1AA" }}>{name}</span>
        </div>
      ))}
    </div>
  ),
  name: "Common Icons",
};

// ── All Icons ────────────────────────────────────────────────────────────

export const AllIcons: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        gap: "16px",
      }}
    >
      {iconNames.map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Icon name={name} size="lg" />
          <span style={{ fontSize: "10px", color: "#A1A1AA" }}>{name}</span>
        </div>
      ))}
    </div>
  ),
  name: "All Icons",
};

// ── With Color ───────────────────────────────────────────────────────────

export const WithColor: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Icon name="Heart" size="lg" className="text-error" />
      <Icon name="Check" size="lg" className="text-success" />
      <Icon name="CircleAlert" size="lg" className="text-warning" />
      <Icon name="Info" size="lg" className="text-info" />
      <Icon name="Star" size="lg" className="text-primary" />
    </div>
  ),
  name: "With Color",
};
