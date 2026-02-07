import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Organisms/Pagination",
  component: Pagination,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// ── Interactive ──────────────────────────────────────────────────────────

const InteractivePagination = ({ totalPages }: { totalPages: number }) => {
  const [page, setPage] = React.useState(1);
  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      <p className="text-sm text-text-muted">
        Page {page} of {totalPages}
      </p>
    </div>
  );
};

export const Default: Story = {
  render: () => <InteractivePagination totalPages={10} />,
};

// ── Few Pages ────────────────────────────────────────────────────────────

export const FewPages: Story = {
  render: () => <InteractivePagination totalPages={5} />,
};

// ── Many Pages ───────────────────────────────────────────────────────────

export const ManyPages: Story = {
  render: () => <InteractivePagination totalPages={50} />,
};

// ── First Page ───────────────────────────────────────────────────────────

export const FirstPage: Story = {
  args: {
    page: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
};

// ── Last Page ────────────────────────────────────────────────────────────

export const LastPage: Story = {
  args: {
    page: 10,
    totalPages: 10,
    onPageChange: () => {},
  },
};

// ── Single Page ──────────────────────────────────────────────────────────

export const SinglePage: Story = {
  args: {
    page: 1,
    totalPages: 1,
    onPageChange: () => {},
  },
};
