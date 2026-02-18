import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./Tooltip";
import { Button } from "../../atoms/button/Button";

const meta: Meta = {
  title: "Molecules/Tooltip",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>This is a tooltip</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
