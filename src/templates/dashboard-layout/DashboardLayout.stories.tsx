import type { Meta, StoryObj } from "@storybook/react";
import { DashboardLayout } from "./DashboardLayout";
import { SidebarGroup, SidebarItem } from "../../organisms/sidebar";
import { Avatar, AvatarFallback } from "../../atoms/avatar";
import { Badge } from "../../atoms/badge";
import { Card, CardHeader, CardTitle, CardContent } from "../../atoms/card";
import { Button } from "../../atoms/button";

const meta: Meta<typeof DashboardLayout> = {
  title: "Templates/DashboardLayout",
  component: DashboardLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof DashboardLayout>;

const DefaultNav = () => (
  <>
    <SidebarGroup label="Main">
      <SidebarItem icon={<span>D</span>} active>Dashboard</SidebarItem>
      <SidebarItem icon={<span>A</span>}>Analytics</SidebarItem>
      <SidebarItem icon={<span>U</span>}>Users</SidebarItem>
      <SidebarItem icon={<span>S</span>}>Settings</SidebarItem>
    </SidebarGroup>
    <SidebarGroup label="Resources">
      <SidebarItem icon={<span>H</span>}>Help</SidebarItem>
      <SidebarItem icon={<span>D</span>}>Docs</SidebarItem>
    </SidebarGroup>
  </>
);

export const Default: Story = {
  render: () => (
    <DashboardLayout
      pageTitle="Dashboard"
      sidebarHeader={
        <span style={{ fontWeight: 700, color: "var(--color-primary)", fontSize: "18px" }}>
          Lendario
        </span>
      }
      sidebarContent={<DefaultNav />}
      sidebarFooter={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Avatar size="sm">
            <AvatarFallback>FB</AvatarFallback>
          </Avatar>
          <span style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>Fabio B.</span>
        </div>
      }
      headerContent={
        <>
          <Badge variant="success">Online</Badge>
          <Button variant="outline" size="sm">Logout</Button>
        </>
      }
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {["Revenue", "Users", "Orders"].map((title) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-text-primary)" }}>
                {title === "Revenue" ? "R$ 42.5k" : title === "Users" ? "1,234" : "892"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <DashboardLayout
      sidebarCollapsed
      pageTitle="Settings"
      sidebarHeader={
        <span style={{ fontWeight: 700, color: "var(--color-primary)" }}>L</span>
      }
      sidebarContent={
        <SidebarGroup>
          <SidebarItem icon={<span>D</span>}>{""}</SidebarItem>
          <SidebarItem icon={<span>S</span>} active>{""}</SidebarItem>
        </SidebarGroup>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ color: "var(--color-text-secondary)" }}>Configure your application preferences.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  ),
};

export const Empty: Story = {
  render: () => (
    <DashboardLayout pageTitle="Getting Started">
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: "16px",
        color: "var(--color-text-muted)",
      }}>
        <p style={{ fontSize: "18px" }}>No data yet</p>
        <Button>Create your first project</Button>
      </div>
    </DashboardLayout>
  ),
};
