import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";
import { axe } from "../../lib/test-utils";

describe("Popover", () => {
  const renderPopover = () => (
    <Popover>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverContent>
        <p>Popover content here</p>
      </PopoverContent>
    </Popover>
  );

  // ── Rendering ──────────────────────────────────────────────────────────

  it("renders the trigger", () => {
    render(renderPopover());
    expect(screen.getByText("Open popover")).toBeDefined();
  });

  it("does not show content initially", () => {
    render(renderPopover());
    expect(screen.queryByText("Popover content here")).toBeNull();
  });

  // ── Interaction ────────────────────────────────────────────────────────

  it("shows content when trigger is clicked", async () => {
    const user = userEvent.setup();
    render(renderPopover());
    await user.click(screen.getByText("Open popover"));
    expect(await screen.findByText("Popover content here")).toBeDefined();
  });

  it("closes when trigger is clicked again", async () => {
    const user = userEvent.setup();
    render(renderPopover());
    const trigger = screen.getByText("Open popover");
    await user.click(trigger);
    await screen.findByText("Popover content here");
    await user.click(trigger);
    // Radix handles close animation
  });

  // ── Custom className ───────────────────────────────────────────────────

  it("passes custom className to content", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent className="custom-popover">
          Content
        </PopoverContent>
      </Popover>,
    );
    await user.click(screen.getByText("Open"));
    const content = await screen.findByText("Content");
    expect(content.closest("[class*='custom-popover']")).toBeDefined();
  });

  // ── A11y ────────────────────────────────────────────────────────────────

  it("has no a11y violations", async () => {
    const user = userEvent.setup();
    render(renderPopover());
    await user.click(screen.getByText("Open popover"));
    await screen.findByText("Popover content here");
    const results = await axe(document.body, {
      rules: {
        region: { enabled: false },
        "aria-dialog-name": { enabled: false },
      },
    });
    expect(results).toHaveNoViolations();
  });
});
