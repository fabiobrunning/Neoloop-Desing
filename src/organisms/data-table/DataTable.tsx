import * as React from "react";
import { cn } from "../../lib/utils";

/* ── Types ────────────────────────────────────────────────────────────── */

export interface DataTableColumn<T> {
  /** Unique key matching the data field */
  key: string;
  /** Display header label */
  header: string;
  /** Custom cell renderer */
  cell?: (row: T, index: number) => React.ReactNode;
  /** Enable sorting on this column */
  sortable?: boolean;
  /** Column alignment */
  align?: "left" | "center" | "right";
  /** Column width (CSS value) */
  width?: string;
}

export interface DataTableProps<T> {
  /** Column definitions */
  columns: DataTableColumn<T>[];
  /** Data rows */
  data: T[];
  /** Unique key extractor for each row */
  getRowKey: (row: T, index: number) => string;
  /** Currently sorted column key */
  sortKey?: string;
  /** Sort direction */
  sortDirection?: "asc" | "desc";
  /** Sort change handler */
  onSort?: (key: string) => void;
  /** Message when data is empty */
  emptyMessage?: string;
  /** Loading state */
  loading?: boolean;
  /** Additional class for table wrapper */
  className?: string;
  /** Striped rows */
  striped?: boolean;
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void;
}

/* ── Sort Icon ────────────────────────────────────────────────────────── */

function SortIcon({
  active,
  direction,
}: {
  active: boolean;
  direction?: "asc" | "desc";
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "ml-1 inline-block transition-opacity",
        active ? "opacity-100" : "opacity-30",
      )}
      aria-hidden="true"
    >
      {(!active || direction === "asc") && <path d="m7 15 5 5 5-5" />}
      {(!active || direction === "desc") && <path d="m7 9 5-5 5 5" />}
    </svg>
  );
}

/* ── DataTable ────────────────────────────────────────────────────────── */

function DataTableInner<T>(
  {
    columns,
    data,
    getRowKey,
    sortKey,
    sortDirection,
    onSort,
    emptyMessage = "No data available",
    loading = false,
    className,
    striped = false,
    onRowClick,
  }: DataTableProps<T>,
  ref: React.ForwardedRef<HTMLTableElement>,
) {
  const alignClass = (align?: "left" | "center" | "right") => {
    if (align === "center") return "text-center";
    if (align === "right") return "text-right";
    return "text-left";
  };

  return (
    <div className={cn("w-full overflow-auto rounded-lg border border-border", className)}>
      <table ref={ref} className="w-full caption-bottom text-sm">
        <thead className="border-b border-border bg-bg-surface">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "h-10 px-4 font-medium text-text-muted",
                  alignClass(col.align),
                  col.sortable && "cursor-pointer select-none hover:text-text-primary",
                )}
                style={col.width ? { width: col.width } : undefined}
                onClick={col.sortable && onSort ? () => onSort(col.key) : undefined}
                aria-sort={
                  sortKey === col.key
                    ? sortDirection === "asc"
                      ? "ascending"
                      : "descending"
                    : undefined
                }
              >
                <span className="inline-flex items-center">
                  {col.header}
                  {col.sortable && (
                    <SortIcon
                      active={sortKey === col.key}
                      direction={sortKey === col.key ? sortDirection : undefined}
                    />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="h-24 text-center text-text-muted"
              >
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="h-24 text-center text-text-muted"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={getRowKey(row, i)}
                className={cn(
                  "border-b border-border transition-colors duration-fast",
                  "hover:bg-bg-surface/50",
                  striped && i % 2 === 1 && "bg-bg-surface/30",
                  onRowClick && "cursor-pointer",
                )}
                onClick={onRowClick ? () => onRowClick(row, i) : undefined}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn("px-4 py-3 text-text-secondary", alignClass(col.align))}
                  >
                    {col.cell
                      ? col.cell(row, i)
                      : String((row as Record<string, unknown>)[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const DataTable = React.forwardRef(DataTableInner) as <T>(
  props: DataTableProps<T> & { ref?: React.Ref<HTMLTableElement> },
) => React.ReactElement;

(DataTable as { displayName?: string }).displayName = "DataTable";

export { DataTable };
