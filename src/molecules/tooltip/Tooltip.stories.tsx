import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./Tooltip";
import { Button } from "../../atoms/button";

const meta: Meta = {
  title: "Molecules/Tooltip",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div style={{ padding: "100px", display: "flex", justifyContent: "center" }}>
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

// ── Default ──────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

// ── Positions ────────────────────────────────────────────────────────────

export const Top: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Top</Button>
      </TooltipTrigger>
      <TooltipContent side="top">Tooltip on top</TooltipContent>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Bottom</Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
    </Tooltip>
  ),
};

export const Left: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Left</Button>
      </TooltipTrigger>
      <TooltipContent side="left">Tooltip on left</TooltipContent>
    </Tooltip>
  ),
};

export const Right: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Right</Button>
      </TooltipTrigger>
      <TooltipContent side="right">Tooltip on right</TooltipContent>
    </Tooltip>
  ),
};
