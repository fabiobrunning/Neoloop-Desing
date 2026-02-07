import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DataTable, type DataTableColumn } from "./DataTable";
import { axe } from "../../lib/test-utils";

interface TestRow {
  id: string;
  name: string;
  age: number;
}

const columns: DataTableColumn<TestRow>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "age", header: "Age", align: "right" },
];

const data: TestRow[] = [
  { id: "1", name: "Alice", age: 30 },
  { id: "2", name: "Bob", age: 25 },
  { id: "3", name: "Carol", age: 35 },
];

describe("DataTable", () => {
  // ── Rendering ──────────────────────────────────────────────────────────

  it("renders column headers", () => {
    render(<DataTable columns={columns} data={data} getRowKey={(r) => r.id} />);
    expect(screen.getByText("Name")).toBeDefined();
    expect(screen.getByText("Age")).toBeDefined();
  });

  it("renders data rows", () => {
    render(<DataTable columns={columns} data={data} getRowKey={(r) => r.id} />);
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("Bob")).toBeDefined();
    expect(screen.getByText("Carol")).toBeDefined();
  });

  it("renders cell values", () => {
    render(<DataTable columns={columns} data={data} getRowKey={(r) => r.id} />);
    expect(screen.getByText("30")).toBeDefined();
    expect(screen.getByText("25")).toBeDefined();
  });

  // ── Empty State ────────────────────────────────────────────────────────

  it("shows empty message when no data", () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        getRowKey={(_, i) => String(i)}
        emptyMessage="No results"
      />,
    );
    expect(screen.getByText("No results")).toBeDefined();
  });

  it("shows default empty message", () => {
    render(
      <DataTable columns={columns} data={[]} getRowKey={(_, i) => String(i)} />,
    );
    expect(screen.getByText("No data available")).toBeDefined();
  });

  // ── Loading ────────────────────────────────────────────────────────────

  it("shows loading state", () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        getRowKey={(_, i) => String(i)}
        loading
      />,
    );
    expect(screen.getByText("Loading...")).toBeDefined();
  });

  // ── Sorting ────────────────────────────────────────────────────────────

  it("calls onSort when sortable header is clicked", () => {
    const onSort = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowKey={(r) => r.id}
        onSort={onSort}
      />,
    );
    fireEvent.click(screen.getByText("Name"));
    expect(onSort).toHaveBeenCalledWith("name");
  });

  it("does not call onSort for non-sortable columns", () => {
    const onSort = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowKey={(r) => r.id}
        onSort={onSort}
      />,
    );
    fireEvent.click(screen.getByText("Age"));
    expect(onSort).not.toHaveBeenCalled();
  });

  it("sets aria-sort on active sort column", () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowKey={(r) => r.id}
        sortKey="name"
        sortDirection="asc"
      />,
    );
    const nameHeader = screen.getByText("Name").closest("th");
    expect(nameHeader?.getAttribute("aria-sort")).toBe("ascending");
  });

  // ── Custom Cell Renderer ───────────────────────────────────────────────

  it("uses custom cell renderer", () => {
    const customColumns: DataTableColumn<TestRow>[] = [
      {
        key: "name",
        header: "Name",
        cell: (row) => <strong data-testid="custom">{row.name}</strong>,
      },
    ];
    render(
      <DataTable
        columns={customColumns}
        data={data}
        getRowKey={(r) => r.id}
      />,
    );
    expect(screen.getAllByTestId("custom").length).toBe(3);
  });

  // ── Row Click ──────────────────────────────────────────────────────────

  it("calls onRowClick when row is clicked", () => {
    const onRowClick = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowKey={(r) => r.id}
        onRowClick={onRowClick}
      />,
    );
    fireEvent.click(screen.getByText("Alice"));
    expect(onRowClick).toHaveBeenCalledWith(data[0], 0);
  });

  // ── Accessibility ──────────────────────────────────────────────────────

  it("renders a table element", () => {
    render(<DataTable columns={columns} data={data} getRowKey={(r) => r.id} />);
    expect(screen.getByRole("table")).toBeDefined();
  });

  it("renders column headers as th elements", () => {
    render(<DataTable columns={columns} data={data} getRowKey={(r) => r.id} />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers.length).toBe(2);
  });

  // ── A11y ────────────────────────────────────────────────────────────────

  it("has no a11y violations", async () => {
    const { container } = render(
      <DataTable columns={columns} data={data} getRowKey={(r) => r.id} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
