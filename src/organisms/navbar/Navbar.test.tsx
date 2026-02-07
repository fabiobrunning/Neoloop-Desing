import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "./Navbar";

const navItems = [
  { label: "Dashboard", href: "/dashboard", active: true },
  { label: "Projects", href: "/projects" },
  { label: "Settings", href: "/settings" },
];

describe("Navbar", () => {
  // ── Rendering ──────────────────────────────────────────────────────────

  it("renders brand text", () => {
    render(<Navbar brand="Synkra" />);
    expect(screen.getByText("Synkra")).toBeDefined();
  });

  it("renders navigation items", () => {
    render(<Navbar brand="Synkra" items={navItems} />);
    expect(screen.getByText("Dashboard")).toBeDefined();
    expect(screen.getByText("Projects")).toBeDefined();
    expect(screen.getByText("Settings")).toBeDefined();
  });

  it("renders actions slot", () => {
    render(
      <Navbar
        brand="Synkra"
        actions={<button>Login</button>}
      />,
    );
    expect(screen.getByText("Login")).toBeDefined();
  });

  // ── Active State ───────────────────────────────────────────────────────

  it("marks active item with aria-current=page", () => {
    render(<Navbar items={navItems} />);
    const dashboardLinks = screen.getAllByText("Dashboard");
    const activeLink = dashboardLinks.find(
      (el) => el.getAttribute("aria-current") === "page",
    );
    expect(activeLink).toBeDefined();
  });

  // ── Navigation landmark ────────────────────────────────────────────────

  it("renders as nav element", () => {
    render(<Navbar brand="Test" />);
    expect(screen.getByRole("navigation")).toBeDefined();
  });

  // ── Mobile Menu ────────────────────────────────────────────────────────

  it("has mobile menu toggle button", () => {
    render(<Navbar brand="Synkra" items={navItems} />);
    expect(screen.getByLabelText("Open menu")).toBeDefined();
  });

  it("toggles mobile menu on click", async () => {
    const user = userEvent.setup();
    render(<Navbar brand="Synkra" items={navItems} />);
    const toggleBtn = screen.getByLabelText("Open menu");
    await user.click(toggleBtn);
    expect(screen.getByLabelText("Close menu")).toBeDefined();
  });

  // ── Sticky ─────────────────────────────────────────────────────────────

  it("applies sticky class when sticky prop is true", () => {
    render(<Navbar brand="Synkra" sticky />);
    const nav = screen.getByRole("navigation");
    expect(nav.className).toContain("sticky");
  });

  // ── Custom className ───────────────────────────────────────────────────

  it("passes custom className", () => {
    render(<Navbar brand="Test" className="custom-nav" />);
    expect(screen.getByRole("navigation").className).toContain("custom-nav");
  });
});
