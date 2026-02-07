import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuGroup,
} from "./DropdownMenu";
import { axe } from "../../lib/test-utils";

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

  // ── CheckboxItem ──────────────────────────────────────────────────────

  it("renders checkbox item", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>Checked item</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Unchecked item</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByText("Open"));
    expect(await screen.findByText("Checked item")).toBeDefined();
    expect(screen.getByText("Unchecked item")).toBeDefined();
  });

  // ── RadioItem ────────────────────────────────────────────────────────

  it("renders radio items", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="a">
            <DropdownMenuRadioItem value="a">Option A</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="b">Option B</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByText("Open"));
    expect(await screen.findByText("Option A")).toBeDefined();
    expect(screen.getByText("Option B")).toBeDefined();
  });

  // ── SubMenu ──────────────────────────────────────────────────────────

  it("renders sub-menu trigger and content", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByText("Open"));
    expect(await screen.findByText("More options")).toBeDefined();
  });

  // ── Inset variants ───────────────────────────────────────────────────

  it("renders inset item and label", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel inset>Inset label</DropdownMenuLabel>
          <DropdownMenuItem inset>Inset item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByText("Open"));
    expect(await screen.findByText("Inset label")).toBeDefined();
    expect(screen.getByText("Inset item")).toBeDefined();
  });

  // ── A11y ────────────────────────────────────────────────────────────────

  it("has no a11y violations", async () => {
    const user = userEvent.setup();
    render(renderMenu());
    await user.click(screen.getByText("Open menu"));
    await screen.findByRole("menu");
    const results = await axe(document.body, {
      rules: { region: { enabled: false } },
    });
    expect(results).toHaveNoViolations();
  });
});
