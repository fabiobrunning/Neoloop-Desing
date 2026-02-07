import type { Meta, StoryObj } from "@storybook/react";
import { DataTable, type DataTableColumn } from "./DataTable";
import { Badge } from "../../atoms/badge";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

const sampleData: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "active" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "active" },
  { id: "3", name: "Carol White", email: "carol@example.com", role: "Viewer", status: "inactive" },
  { id: "4", name: "Dave Brown", email: "dave@example.com", role: "Editor", status: "active" },
  { id: "5", name: "Eve Davis", email: "eve@example.com", role: "Admin", status: "inactive" },
];

const columns: DataTableColumn<User>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email" },
  { key: "role", header: "Role", sortable: true },
  {
    key: "status",
    header: "Status",
    cell: (row) => (
      <Badge variant={row.status === "active" ? "success" : "default"}>
        {row.status}
      </Badge>
    ),
  },
];

const meta: Meta = {
  title: "Organisms/DataTable",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

// ── Default ──────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={sampleData}
      getRowKey={(row) => row.id}
    />
  ),
};

// ── With Sorting ─────────────────────────────────────────────────────────

export const WithSorting: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={sampleData}
      getRowKey={(row) => row.id}
      sortKey="name"
      sortDirection="asc"
      onSort={(key) => alert(`Sort by: ${key}`)}
    />
  ),
};

// ── Empty State ──────────────────────────────────────────────────────────

export const Empty: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      getRowKey={(_, i) => String(i)}
      emptyMessage="No users found."
    />
  ),
};

// ── Loading ──────────────────────────────────────────────────────────────

export const Loading: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      getRowKey={(_, i) => String(i)}
      loading
    />
  ),
};

// ── Striped ──────────────────────────────────────────────────────────────

export const Striped: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={sampleData}
      getRowKey={(row) => row.id}
      striped
    />
  ),
};
