# Phase 3 Integration Guide

## Overview

This guide covers integration of Phase 3 components (Data Display and Feedback) into your application.

## Installation

Phase 3 components are already included in the core library. No additional installation needed.

## Dependencies

Phase 3 introduces the following new dependencies:

```json
{
  "recharts": "^3.7.0"  // Charts library
}
```

Already included in devDependencies:
- `@tanstack/react-query` (recommended for data fetching)

## Setup

### 1. Toast Provider

Wrap your app with ToastProvider to enable toast notifications globally:

```tsx
import { ToastProvider } from '@/components/core'

function App() {
  return (
    <ToastProvider position="top-right" maxToasts={3}>
      <YourApp />
    </ToastProvider>
  )
}
```

### 2. React Query (Optional but Recommended)

For data fetching and caching:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastProvider } from '@/components/core'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <YourApp />
      </ToastProvider>
    </QueryClientProvider>
  )
}
```

## Component Usage

### Data Components

#### Table

```tsx
import { Table, type TableColumn } from '@/components/core'

const columns: TableColumn<User>[] = [
  { id: 'name', header: 'Name', accessor: (row) => row.name, sortable: true },
  { id: 'email', header: 'Email', accessor: (row) => row.email },
]

<Table
  columns={columns}
  data={users}
  getRowId={(row) => row.id}
  pagination
  selectable
/>
```

#### Charts

```tsx
import { LineChart, BarChart, CHART_COLORS } from '@/components/core'

<LineChart
  data={salesData}
  xKey="month"
  yKeys={['sales', 'revenue']}
  colors={[CHART_COLORS.primary, CHART_COLORS.success]}
  smooth
/>
```

#### File Upload

```tsx
import { FileUpload } from '@/components/core'

<FileUpload
  accept="image/*"
  multiple
  maxSize={5 * 1024 * 1024} // 5MB
  onUpload={async (files) => {
    await uploadToServer(files)
  }}
/>
```

### Feedback Components

#### Toast

```tsx
import { useToast, toast } from '@/components/core'

function MyComponent() {
  const { showToast } = useToast()

  const handleSave = async () => {
    try {
      await saveData()
      showToast(toast.success('Saved successfully!'))
    } catch (error) {
      showToast(toast.error('Failed to save'))
    }
  }
}
```

#### Alert

```tsx
import { Alert } from '@/components/core'

<Alert
  variant="error"
  title="Error"
  message="Something went wrong"
  dismissible
  action={{
    label: 'Retry',
    onClick: handleRetry,
  }}
/>
```

#### Confirm Dialog

```tsx
import { useConfirmDialog } from '@/components/core'

function DeleteButton() {
  const { confirm, ConfirmDialog } = useConfirmDialog()

  const handleDelete = async () => {
    await confirm({
      title: 'Delete Item',
      description: 'This cannot be undone',
      variant: 'danger',
      onConfirm: async () => {
        await deleteItem()
      },
    })
  }

  return (
    <>
      <Button onClick={handleDelete}>Delete</Button>
      {ConfirmDialog}
    </>
  )
}
```

## State Patterns

### Global State Styles

Import and use consistent state styles:

```tsx
import {
  hoverStyles,
  focusStyles,
  disabledStyles,
  LoadingSpinner,
  SuccessIcon,
  ErrorIcon,
} from '@/components/core'

// In a custom component
<button
  className={`
    ${hoverStyles.button}
    ${focusStyles.default}
    ${disabledStyles.default}
  `}
>
  {loading ? <LoadingSpinner size="sm" /> : 'Submit'}
</button>

// Success state
<div className={successStyles.background}>
  <SuccessIcon />
  <span className={successStyles.text}>Success!</span>
</div>
```

## Migration from Phase 2

### No Breaking Changes

All Phase 2 components remain unchanged. Phase 3 adds new components.

### Enhanced Patterns

Phase 3 introduces standardized patterns for:

1. **Data Display:** Use Table/ResponsiveTable instead of custom implementations
2. **Feedback:** Use Toast/Alert/ConfirmDialog instead of window.alert/confirm
3. **Loading States:** Use LoadingSpinner and loading props
4. **Empty States:** Use EmptyState instead of conditional text

### Before/After Examples

**Before:**
```tsx
// Phase 2
{loading && <Spinner />}
{error && <p className="text-red-600">{error}</p>}
{data.length === 0 && <p>No data</p>}
```

**After:**
```tsx
// Phase 3
{loading && <LoadingSpinner />}
{error && <Alert variant="error" message={error} />}
{data.length === 0 && <EmptyState title="No data" />}
```

## TypeScript Support

All Phase 3 components are fully typed:

```tsx
import type {
  TableColumn,
  TableProps,
  ToastVariant,
  AlertProps,
  EmptyStateIcon,
} from '@/components/core'

// Type-safe column definitions
const columns: TableColumn<User>[] = [
  {
    id: 'name',
    header: 'Name',
    accessor: (row) => row.name, // row is typed as User
    sortable: true,
  },
]
```

## Performance Optimization

### Table Performance

For large datasets (1000+ rows):

```tsx
// Use pagination
<Table
  data={largeDataset}
  pagination
  pageSize={50}
/>

// Or implement server-side pagination
const { data } = useQuery({
  queryKey: ['users', page],
  queryFn: () => fetchUsers({ page, limit: 50 }),
})

<Table
  data={data.items}
  pagination
  // Implement custom pagination controls
/>
```

### Chart Performance

For frequently updating data:

```tsx
import { useMemo } from 'react'

const chartData = useMemo(() => {
  return processChartData(rawData)
}, [rawData])

<LineChart data={chartData} />
```

## Accessibility

All Phase 3 components follow WCAG AA standards:

- **Keyboard Navigation:** All interactive elements support keyboard
- **Screen Readers:** Proper ARIA labels and roles
- **Focus Management:** Visible focus indicators
- **Color Contrast:** Meets AA contrast ratios

### Testing Accessibility

```tsx
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

test('Table is accessible', async () => {
  const { container } = render(
    <Table columns={columns} data={data} getRowId={(r) => r.id} />
  )
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

## Testing

### Component Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Table } from '@/components/core'

test('handles sorting', () => {
  const onSortChange = vi.fn()

  render(
    <Table
      columns={columns}
      data={data}
      getRowId={(r) => r.id}
      onSortChange={onSortChange}
    />
  )

  const header = screen.getByText('Name')
  fireEvent.click(header)

  expect(onSortChange).toHaveBeenCalledWith({
    column: 'name',
    direction: 'asc',
  })
})
```

### Integration Tests

```tsx
test('complete flow', async () => {
  const { user } = setupTest()

  // Load data
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  // Delete user
  const deleteButton = screen.getByRole('button', { name: /delete/i })
  fireEvent.click(deleteButton)

  // Confirm dialog appears
  expect(screen.getByText('Delete User')).toBeInTheDocument()

  // Confirm deletion
  const confirmButton = screen.getByRole('button', { name: /delete/i })
  fireEvent.click(confirmButton)

  // Toast appears
  await waitFor(() => {
    expect(screen.getByText('User deleted')).toBeInTheDocument()
  })
})
```

## Storybook

View all Phase 3 components in Storybook:

```bash
npm run storybook
```

Navigate to:
- **Phase 3 > Data:** Table, Charts, EmptyState, FileUpload
- **Phase 3 > Feedback:** Toast, Alert, ConfirmDialog

## Troubleshooting

### Toast not showing

Ensure ToastProvider wraps your app:

```tsx
// ✅ Correct
<ToastProvider>
  <App />
</ToastProvider>

// ❌ Wrong - useToast will throw error
<App />
```

### Table not sorting

Check that columns have `sortable: true`:

```tsx
const columns = [
  {
    id: 'name',
    header: 'Name',
    accessor: (row) => row.name,
    sortable: true, // ✅ Add this
  },
]
```

### Charts not rendering

Verify data format:

```tsx
// ✅ Correct
const data = [
  { month: 'Jan', sales: 100 },
  { month: 'Feb', sales: 200 },
]

// ❌ Wrong - missing x-axis key
const data = [
  { sales: 100 },
  { sales: 200 },
]
```

## Next Steps

- Review [Data Patterns documentation](../03-ARCHITECTURE/data-patterns.md)
- Explore components in Storybook
- Check [Component API reference](../02-DESIGN/component-api.md)
- See example implementations in `/examples`

## Support

For questions or issues:
1. Check Storybook documentation
2. Review test files for usage examples
3. See data-patterns.md for common patterns

---

**Last Updated:** 2026-01-31
**Phase:** 3 - Data & Feedback Components
