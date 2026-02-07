import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";
import { Button } from "../../atoms/button";
import { Input } from "../../atoms/input";

const meta: Meta = {
  title: "Molecules/Popover",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

// ── Default ──────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <div style={{ padding: "100px", display: "flex", justifyContent: "center" }}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none text-text-primary">Dimensions</h4>
              <p className="text-sm text-text-muted">
                Set the dimensions for the layer.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <label htmlFor="width" className="text-sm text-text-secondary">Width</label>
                <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <label htmlFor="height" className="text-sm text-text-secondary">Height</label>
                <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

// ── Simple Content ───────────────────────────────────────────────────────

export const SimpleContent: Story = {
  render: () => (
    <div style={{ padding: "100px", display: "flex", justifyContent: "center" }}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost">Info</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p className="text-sm text-text-secondary">
            This is a simple popover with text content.
          </p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
