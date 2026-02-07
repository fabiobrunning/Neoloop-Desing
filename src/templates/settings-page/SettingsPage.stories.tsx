import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SettingsPage, SettingsSection } from "./SettingsPage";
import { Button } from "../../atoms/button";
import { Input } from "../../atoms/input";
import { Switch } from "../../atoms/switch";
import type { SettingsNavItem } from "./SettingsPage";

const meta: Meta<typeof SettingsPage> = {
  title: "Templates/SettingsPage",
  component: SettingsPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SettingsPage>;

const navItems: SettingsNavItem[] = [
  { label: "General", value: "general" },
  { label: "Profile", value: "profile" },
  { label: "Notifications", value: "notifications" },
  { label: "Security", value: "security" },
  { label: "Billing", value: "billing" },
];

// ── Default ──────────────────────────────────────────────────────────────

const InteractiveSettings = () => {
  const [section, setSection] = React.useState("general");
  return (
    <SettingsPage
      title="Settings"
      description="Manage your account settings and preferences."
      navItems={navItems}
      activeSection={section}
      onSectionChange={setSection}
      headerActions={<Button size="sm">Save changes</Button>}
    >
      <div className="flex flex-col gap-6">
        <SettingsSection title="General" description="Basic account settings.">
          <div className="grid gap-4">
            <div>
              <label htmlFor="display-name" className="text-sm font-medium text-text-primary">Display Name</label>
              <Input id="display-name" defaultValue="Fabio Brunning" className="mt-1" />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-text-primary">Email</label>
              <Input id="email" type="email" defaultValue="fabio@synkra.com" className="mt-1" />
            </div>
          </div>
        </SettingsSection>

        <SettingsSection title="Notifications" description="Choose what notifications you receive.">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">Email notifications</p>
              <p className="text-xs text-text-muted">Receive email about account activity.</p>
            </div>
            <Switch defaultChecked />
          </div>
        </SettingsSection>
      </div>
    </SettingsPage>
  );
};

export const Default: Story = {
  render: () => <InteractiveSettings />,
};

// ── Without Navigation ───────────────────────────────────────────────────

export const WithoutNavigation: Story = {
  render: () => (
    <SettingsPage title="Profile Settings" description="Update your profile information.">
      <SettingsSection title="Profile" description="Your public profile information.">
        <div className="grid gap-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-text-primary">Name</label>
            <Input id="name" defaultValue="Fabio Brunning" className="mt-1" />
          </div>
        </div>
      </SettingsSection>
    </SettingsPage>
  ),
};

// ── Minimal ──────────────────────────────────────────────────────────────

export const Minimal: Story = {
  render: () => (
    <SettingsPage title="Settings">
      <SettingsSection title="Preferences">
        <p className="text-sm text-text-secondary">Configure your preferences here.</p>
      </SettingsSection>
    </SettingsPage>
  ),
};
