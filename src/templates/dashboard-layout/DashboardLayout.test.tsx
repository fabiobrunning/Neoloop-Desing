import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardLayout } from "./DashboardLayout";
import { SidebarGroup, SidebarItem } from "../../organisms/sidebar";

describe("DashboardLayout", () => {
  it("renders the layout structure", () => {
    render(
      <DashboardLayout data-testid="layout">
        <p>Main content</p>
      </DashboardLayout>,
    );
    expect(screen.getByTestId("layout")).toBeDefined();
    expect(screen.getByText("Main content")).toBeDefined();
  });

  it("renders page title in header", () => {
    render(<DashboardLayout pageTitle="Dashboard" />);
    expect(screen.getByText("Dashboard")).toBeDefined();
  });

  it("renders sidebar header", () => {
    render(<DashboardLayout sidebarHeader={<span>Logo</span>} />);
    expect(screen.getByText("Logo")).toBeDefined();
  });

  it("renders sidebar content with navigation", () => {
    render(
      <DashboardLayout
        sidebarContent={
          <SidebarGroup label="Menu">
            <SidebarItem active>Home</SidebarItem>
            <SidebarItem>Settings</SidebarItem>
          </SidebarGroup>
        }
      />,
    );
    expect(screen.getByText("Menu")).toBeDefined();
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Settings")).toBeDefined();
  });

  it("renders sidebar footer", () => {
    render(<DashboardLayout sidebarFooter={<span>v0.1.0</span>} />);
    expect(screen.getByText("v0.1.0")).toBeDefined();
  });

  it("renders header content (right side)", () => {
    render(
      <DashboardLayout headerContent={<button>Profile</button>} />,
    );
    expect(screen.getByText("Profile")).toBeDefined();
  });

  it("renders with collapsed sidebar", () => {
    render(
      <DashboardLayout sidebarCollapsed data-testid="layout">
        <p>Content</p>
      </DashboardLayout>,
    );
    const aside = screen.getByTestId("layout").querySelector("aside");
    expect(aside?.getAttribute("data-collapsed")).toBe("true");
  });

  it("renders with expanded sidebar by default", () => {
    render(
      <DashboardLayout data-testid="layout">
        <p>Content</p>
      </DashboardLayout>,
    );
    const aside = screen.getByTestId("layout").querySelector("aside");
    expect(aside?.getAttribute("data-collapsed")).toBe("false");
  });

  it("passes custom className", () => {
    render(
      <DashboardLayout className="custom-layout" data-testid="layout">
        Content
      </DashboardLayout>,
    );
    expect(screen.getByTestId("layout").className).toContain("custom-layout");
  });

  it("renders full composition", () => {
    render(
      <DashboardLayout
        pageTitle="Analytics"
        sidebarHeader={<span>Lendario</span>}
        sidebarContent={
          <SidebarGroup label="Nav">
            <SidebarItem active>Analytics</SidebarItem>
          </SidebarGroup>
        }
        sidebarFooter={<span>User</span>}
        headerContent={<button>Logout</button>}
      >
        <div>Charts here</div>
      </DashboardLayout>,
    );
    expect(screen.getAllByText("Analytics").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Lendario")).toBeDefined();
    expect(screen.getByText("User")).toBeDefined();
    expect(screen.getByText("Logout")).toBeDefined();
    expect(screen.getByText("Charts here")).toBeDefined();
  });
});
