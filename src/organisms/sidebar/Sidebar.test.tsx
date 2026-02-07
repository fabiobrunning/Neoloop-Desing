import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarItem,
  SidebarFooter,
} from "./Sidebar";
import { axe } from "../../lib/test-utils";

describe("Sidebar", () => {
  it("renders sidebar element", () => {
    render(<Sidebar data-testid="sidebar">Content</Sidebar>);
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar.tagName).toBe("ASIDE");
  });

  it("renders expanded by default (w-64)", () => {
    render(<Sidebar data-testid="sidebar" />);
    expect(screen.getByTestId("sidebar").getAttribute("data-collapsed")).toBe("false");
  });

  it("renders collapsed state", () => {
    render(<Sidebar data-testid="sidebar" collapsed />);
    expect(screen.getByTestId("sidebar").getAttribute("data-collapsed")).toBe("true");
  });

  it("renders full composition", () => {
    render(
      <Sidebar>
        <SidebarHeader>Logo</SidebarHeader>
        <SidebarContent>
          <SidebarGroup label="Menu">
            <SidebarItem>Home</SidebarItem>
            <SidebarItem active>Dashboard</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>User</SidebarFooter>
      </Sidebar>,
    );
    expect(screen.getByText("Logo")).toBeDefined();
    expect(screen.getByText("Menu")).toBeDefined();
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Dashboard")).toBeDefined();
    expect(screen.getByText("User")).toBeDefined();
  });

  it("SidebarItem shows active state", () => {
    render(<SidebarItem active>Active</SidebarItem>);
    const item = screen.getByText("Active").closest("button");
    expect(item?.getAttribute("data-active")).toBe("true");
    expect(item?.getAttribute("aria-current")).toBe("page");
  });

  it("SidebarItem is not active by default", () => {
    render(<SidebarItem>Inactive</SidebarItem>);
    const item = screen.getByText("Inactive").closest("button");
    expect(item?.getAttribute("data-active")).toBe("false");
    expect(item?.getAttribute("aria-current")).toBeNull();
  });

  it("SidebarItem handles click", () => {
    const onClick = vi.fn();
    render(<SidebarItem onClick={onClick}>Click me</SidebarItem>);
    fireEvent.click(screen.getByText("Click me"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("SidebarItem renders icon", () => {
    render(
      <SidebarItem icon={<span data-testid="icon">I</span>}>With icon</SidebarItem>,
    );
    expect(screen.getByTestId("icon")).toBeDefined();
  });

  it("SidebarGroup renders label", () => {
    render(
      <SidebarGroup label="Section">
        <SidebarItem>Item</SidebarItem>
      </SidebarGroup>,
    );
    expect(screen.getByText("Section")).toBeDefined();
  });

  it("passes custom className to Sidebar", () => {
    render(<Sidebar data-testid="sidebar" className="custom-sidebar" />);
    expect(screen.getByTestId("sidebar").className).toContain("custom-sidebar");
  });

  // ── A11y ────────────────────────────────────────────────────────────────

  it("has no a11y violations", async () => {
    const { container } = render(
      <Sidebar>
        <SidebarHeader>Logo</SidebarHeader>
        <SidebarContent>
          <SidebarGroup label="Menu">
            <SidebarItem>Home</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>User</SidebarFooter>
      </Sidebar>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
