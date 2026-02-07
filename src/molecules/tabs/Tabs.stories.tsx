import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Molecules/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// ── Default ──────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-text-secondary">
          Manage your account settings and preferences.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-text-secondary">
          Change your password and security settings.
        </p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-sm text-text-secondary">
          Configure your application settings.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

// ── Two Tabs ─────────────────────────────────────────────────────────────

export const TwoTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-sm text-text-secondary">Overview content here.</p>
      </TabsContent>
      <TabsContent value="analytics">
        <p className="text-sm text-text-secondary">Analytics data here.</p>
      </TabsContent>
    </Tabs>
  ),
};

// ── Disabled Tab ─────────────────────────────────────────────────────────

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="active" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="another">Another</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <p className="text-sm text-text-secondary">This tab is active.</p>
      </TabsContent>
      <TabsContent value="another">
        <p className="text-sm text-text-secondary">Another tab content.</p>
      </TabsContent>
    </Tabs>
  ),
};
