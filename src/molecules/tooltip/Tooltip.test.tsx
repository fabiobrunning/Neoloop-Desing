import { describe, it, expect } from "vitest";
import { render, screen, axe, userEvent } from "../../lib/test-utils";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./Tooltip";

describe("Tooltip", () => {
  it("shows content on hover", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    await user.hover(screen.getByText("Hover me"));
    const matches = await screen.findAllByText("Tooltip text");
    expect(matches.length).toBeGreaterThan(0);
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent>Info</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
