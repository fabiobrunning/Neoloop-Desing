import type { Meta, StoryObj } from "@storybook/react";
import { ErrorPage } from "./ErrorPage";
import { Button } from "../../atoms/button";

const meta: Meta<typeof ErrorPage> = {
  title: "Templates/ErrorPage",
  component: ErrorPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ErrorPage>;

// ── 404 ──────────────────────────────────────────────────────────────────

export const NotFound: Story = {
  args: {
    statusCode: 404,
    primaryAction: <Button>Go Home</Button>,
    secondaryAction: <Button variant="ghost">Go Back</Button>,
  },
};

// ── 500 ──────────────────────────────────────────────────────────────────

export const ServerError: Story = {
  args: {
    statusCode: 500,
    primaryAction: <Button>Try Again</Button>,
    secondaryAction: <Button variant="ghost">Contact Support</Button>,
  },
};

// ── 403 ──────────────────────────────────────────────────────────────────

export const Forbidden: Story = {
  args: {
    statusCode: 403,
    primaryAction: <Button>Go Home</Button>,
  },
};

// ── Custom ───────────────────────────────────────────────────────────────

export const Custom: Story = {
  args: {
    statusCode: 404,
    title: "Oops! Nothing here",
    description: "The page you requested could not be found. Check the URL and try again.",
    illustration: (
      <div className="text-8xl" aria-hidden="true">
        🔍
      </div>
    ),
    primaryAction: <Button>Back to Dashboard</Button>,
  },
};

// ── No Actions ───────────────────────────────────────────────────────────

export const NoActions: Story = {
  args: {
    statusCode: 404,
  },
};
