# DataTable

> Organism | Generic data table with sorting, empty/loading states, and clickable rows

## Import

```tsx
import { DataTable, type DataTableColumn, type DataTableProps } from "synkra-ds";
```

## Props

### DataTableColumn\<T\>

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `key` | `string` | - | Unique key matching the data field |
| `header` | `string` | - | Display header label |
| `cell` | `(row: T, index: number) => ReactNode` | - | Custom cell renderer |
| `sortable` | `boolean` | - | Enable sorting on this column |
| `align` | `"left" \| "center" \| "right"` | `"left"` | Column alignment |
| `width` | `string` | - | Column width (CSS value) |

### DataTableProps\<T\>

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `DataTableColumn<T>[]` | - | Column definitions |
| `data` | `T[]` | - | Data rows |
| `getRowKey` | `(row: T, index: number) => string` | - | Unique key extractor for each row |
| `sortKey` | `string` | - | Currently sorted column key |
| `sortDirection` | `"asc" \| "desc"` | - | Sort direction |
| `onSort` | `(key: string) => void` | - | Sort change handler |
| `emptyMessage` | `string` | `"No data available"` | Message when data is empty |
| `loading` | `boolean` | `false` | Loading state |
| `striped` | `boolean` | `false` | Striped rows |
| `onRowClick` | `(row: T, index: number) => void` | - | Row click handler |
| `className` | `string` | - | Additional class for table wrapper |

## Usage

```tsx
interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
}

const columns: DataTableColumn<User>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email" },
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

<DataTable
  columns={columns}
  data={users}
  getRowKey={(row) => row.id}
  sortKey="name"
  sortDirection="asc"
  onSort={(key) => handleSort(key)}
  striped
/>
```

## Features

- Generic typing -- works with any data shape via `DataTableColumn<T>`
- Column sorting with visual sort indicators (ascending/descending icons)
- Custom cell renderers for flexible column content
- Configurable column alignment and width
- Empty state with customizable message
- Loading state with "Loading..." indicator
- Striped rows for improved readability
- Clickable rows via `onRowClick`
- Ref forwarding to the underlying `<table>` element

## Accessibility

- Uses semantic `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` elements
- `aria-sort` attribute on sorted column header (`ascending` / `descending`)
- Sort icon SVGs marked with `aria-hidden="true"`
- Sortable headers have `cursor-pointer` for visual affordance

## Tests: 13 | Stories: 5
