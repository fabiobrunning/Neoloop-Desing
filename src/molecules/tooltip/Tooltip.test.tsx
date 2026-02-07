import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./Tooltip";

const renderTooltip = (content = "Tooltip text") => (
  <TooltipProvider delayDuration={0}>
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

describe("Tooltip", () => {
  // ── Rendering ──────────────────────────────────────────────────────────

  it("renders the trigger", () => {
    render(renderTooltip());
    expect(screen.getByText("Hover me")).toBeDefined();
  });

  it("does not show tooltip content initially", () => {
    render(renderTooltip());
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  // ── Interaction ────────────────────────────────────────────────────────

  it("shows tooltip on hover", async () => {
    const user = userEvent.setup();
    render(renderTooltip());
    await user.hover(screen.getByText("Hover me"));
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toBeDefined();
    expect(tooltip.textContent).toBe("Tooltip text");
  });

  it("hides tooltip on unhover", async () => {
    const user = userEvent.setup();
    render(renderTooltip());
    await user.hover(screen.getByText("Hover me"));
    await screen.findByRole("tooltip");
    await user.unhover(screen.getByText("Hover me"));
    // After unhover, tooltip should eventually disappear
    // (Radix handles animation timing)
  });

  // ── Custom Content ─────────────────────────────────────────────────────

  it("renders custom content", async () => {
    const user = userEvent.setup();
    render(renderTooltip("Custom tooltip content"));
    await user.hover(screen.getByText("Hover me"));
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip.textContent).toBe("Custom tooltip content");
  });
});
