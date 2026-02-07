import type { Meta, StoryObj } from "@storybook/react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarItem,
  SidebarFooter,
} from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Organisms/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  argTypes: {
    collapsed: { control: "boolean" },
  },
  args: {
    collapsed: false,
  },
  decorators: [
    (Story) => (
      <div style={{ height: "500px", display: "flex" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// ── Default ─────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <span style={{ fontWeight: 700, color: "var(--color-primary)", fontSize: "18px" }}>
          Lendario
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup label="Navigation">
          <SidebarItem active>Dashboard</SidebarItem>
          <SidebarItem>Analytics</SidebarItem>
          <SidebarItem>Users</SidebarItem>
          <SidebarItem>Settings</SidebarItem>
        </SidebarGroup>
        <SidebarGroup label="Resources">
          <SidebarItem>Documentation</SidebarItem>
          <SidebarItem>Support</SidebarItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <span style={{ color: "var(--color-text-muted)", fontSize: "12px" }}>v0.1.0</span>
      </SidebarFooter>
    </Sidebar>
  ),
};

// ── Collapsed ───────────────────────────────────────────────────────────

export const Collapsed: Story = {
  args: { collapsed: true },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <span style={{ fontWeight: 700, color: "var(--color-primary)" }}>L</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarItem icon={<span>D</span>}>{""}</SidebarItem>
          <SidebarItem icon={<span>A</span>}>{""}</SidebarItem>
          <SidebarItem icon={<span>U</span>}>{""}</SidebarItem>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
};

// ── With Icons ──────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <Sidebar>
      <SidebarHeader>
        <span style={{ fontWeight: 700, color: "var(--color-primary)", fontSize: "18px" }}>
          Lendario
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup label="Main">
          <SidebarItem icon={<span>📊</span>} active>Dashboard</SidebarItem>
          <SidebarItem icon={<span>📈</span>}>Analytics</SidebarItem>
          <SidebarItem icon={<span>👥</span>}>Users</SidebarItem>
          <SidebarItem icon={<span>⚙️</span>}>Settings</SidebarItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-text-secondary)" }}>
          <span>👤</span>
          <span style={{ fontSize: "14px" }}>John Doe</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  ),
};

// ── Empty ───────────────────────────────────────────────────────────────

export const Empty: Story = {
  render: () => (
    <Sidebar>
      <SidebarHeader>App</SidebarHeader>
      <SidebarContent />
    </Sidebar>
  ),
};
