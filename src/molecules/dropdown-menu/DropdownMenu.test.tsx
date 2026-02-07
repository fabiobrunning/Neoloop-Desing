import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "./DropdownMenu";

describe("DropdownMenu", () => {
  const renderMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Profile
          <DropdownMenuShortcut>Cmd+P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem disabled>Disabled item</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // ── Rendering ──────────────────────────────────────────────────────────

  it("renders the trigger", () => {
    render(renderMenu());
    expect(screen.getByText("Open menu")).toBeDefined();
  });

  it("does not show menu content initially", () => {
    render(renderMenu());
    expect(screen.queryByText("Profile")).toBeNull();
  });

  // ── Interaction ────────────────────────────────────────────────────────

  it("opens menu when trigger is clicked", async () => {
    const user = userEvent.setup();
    render(renderMenu());
    await user.click(screen.getByText("Open menu"));
    expect(await screen.findByText("Profile")).toBeDefined();
    expect(screen.getByText("Settings")).toBeDefined();
  });

  it("shows label and separator", async () => {
    const user = userEvent.setup();
    render(renderMenu());
    await user.click(screen.getByText("Open menu"));
    expect(await screen.findByText("Actions")).toBeDefined();
  });

  it("shows keyboard shortcut", async () => {
    const user = userEvent.setup();
    render(renderMenu());
    await user.click(screen.getByText("Open menu"));
    expect(await screen.findByText("Cmd+P")).toBeDefined();
  });

  // ── Disabled Item ──────────────────────────────────────────────────────

  it("renders disabled item with data-disabled", async () => {
    const user = userEvent.setup();
    render(renderMenu());
    await user.click(screen.getByText("Open menu"));
    const disabledItem = await screen.findByText("Disabled item");
    expect(disabledItem.closest("[data-disabled]")).toBeDefined();
  });

  // ── Accessibility ──────────────────────────────────────────────────────

  it("has menu role on content", async () => {
    const user = userEvent.setup();
    render(renderMenu());
    await user.click(screen.getByText("Open menu"));
    expect(await screen.findByRole("menu")).toBeDefined();
  });

  it("has menuitem role on items", async () => {
    const user = userEvent.setup();
    render(renderMenu());
    await user.click(screen.getByText("Open menu"));
    await screen.findByText("Profile");
    const items = screen.getAllByRole("menuitem");
    expect(items.length).toBeGreaterThanOrEqual(2);
  });
});
