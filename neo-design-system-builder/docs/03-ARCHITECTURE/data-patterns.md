# Data Patterns - Phase 3 Components

## Overview

This document defines standardized patterns for data handling, state management, and API integration across Phase 3 components.

## Table of Contents

1. [Data Component Patterns](#data-component-patterns)
2. [State Management](#state-management)
3. [API Integration with React Query](#api-integration-with-react-query)
4. [Feedback Patterns](#feedback-patterns)
5. [Accessibility Patterns](#accessibility-patterns)

---

## Data Component Patterns

### Table Pattern

**Use Cases:**
- User lists
- Transaction history
- Product catalogs
- Admin dashboards

**Key Features:**
- Sorting (controlled/uncontrolled)
- Pagination (client-side)
- Row selection (single/multiple)
- Custom cell rendering
- Responsive (use ResponsiveTable for mobile)

**Example:**
```tsx
import { Table, type TableColumn } from '@/components/core'
import { Badge } from '@/components/core'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

const columns: TableColumn<User>[] = [
  {
    id: 'name',
    header: 'Name',
    accessor: (row) => row.name,
    sortable: true,
  },
  {
    id: 'email',
    header: 'Email',
    accessor: (row) => row.email,
    sortable: true,
  },
  {
    id: 'status',
    header: 'Status',
    accessor: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : 'default'}>
        {row.status}
      </Badge>
    ),
  },
]

function UserTable({ users }: { users: User[] }) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  })

  return (
    <Table
      columns={columns}
      data={users}
      getRowId={(row) => row.id}
      selectable
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
      sortState={sortState}
      onSortChange={setSortState}
      pagination
      pageSize={20}
    />
  )
}
```

### List Pattern

**Use Cases:**
- Contact lists
- Message threads
- Notification feeds
- File browsers

**Key Features:**
- Avatar/icon support
- Primary/secondary/tertiary text
- Action buttons
- Interactive items

**Example:**
```tsx
import { List, type ListItem } from '@/components/core'
import { Avatar } from '@/components/core'

const items: ListItem[] = users.map(user => ({
  id: user.id,
  avatar: <Avatar name={user.name} src={user.avatar} />,
  primary: user.name,
  secondary: user.email,
  tertiary: `Last seen ${user.lastSeen}`,
  actions: (
    <Button size="sm" variant="ghost">
      Message
    </Button>
  ),
}))

<List
  items={items}
  interactive
  onItemClick={(item) => navigateToUser(item.id)}
  showChevron
/>
```

### Charts Pattern

**Use Cases:**
- Analytics dashboards
- Sales reports
- Usage statistics
- Performance monitoring

**Standardized Colors:**
```tsx
import { CHART_COLORS, CHART_COLOR_PALETTE } from '@/components/core'

// Use semantic colors
const colors = [
  CHART_COLORS.primary,   // blue
  CHART_COLORS.success,   // green
  CHART_COLORS.warning,   // amber
  CHART_COLORS.danger,    // red
]

// Or use the full palette
<LineChart
  data={data}
  xKey="month"
  yKeys={['sales', 'revenue', 'profit']}
  colors={CHART_COLOR_PALETTE}
/>
```

### Empty State Pattern

**Use Cases:**
- No search results
- Empty lists
- Error states
- Onboarding

**Pattern:**
```tsx
import { EmptyState, NoResultsEmptyState } from '@/components/core'

// Conditional rendering
{data.length === 0 ? (
  <NoResultsEmptyState
    action={<Button onClick={clearFilters}>Clear Filters</Button>}
  />
) : (
  <Table data={data} />
)}

// Custom empty state
<EmptyState
  icon="inbox"
  title="No projects yet"
  description="Create your first project to get started"
  action={<Button onClick={createProject}>Create Project</Button>}
/>
```

---

## State Management

### Component State Patterns

#### Controlled vs Uncontrolled

**Controlled (Recommended for forms):**
```tsx
function ControlledExample() {
  const [value, setValue] = useState('')

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
```

**Uncontrolled (Simpler for simple cases):**
```tsx
function UncontrolledExample() {
  return (
    <Input
      defaultValue="initial"
      // Component manages its own state
    />
  )
}
```

#### Dual Mode Components (Table, DatePicker, etc.)

All Phase 3 data components support both modes:

```tsx
// Controlled
<Table
  sortState={sortState}
  onSortChange={setSortState}
  selectedRows={selectedRows}
  onSelectionChange={setSelectedRows}
/>

// Uncontrolled (component manages state internally)
<Table
  // No state props - component is self-contained
/>
```

### Global State (Context)

**Toast Example:**
```tsx
// App level
<ToastProvider position="top-right">
  <App />
</ToastProvider>

// Usage anywhere
function MyComponent() {
  const { showToast } = useToast()

  const handleSuccess = () => {
    showToast(toast.success('Saved!'))
  }
}
```

---

## API Integration with React Query

### Setup (Mock for now)

```tsx
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  )
}
```

### Data Fetching Pattern

```tsx
import { useQuery } from '@tanstack/react-query'
import { Table } from '@/components/core'

function UsersTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users')
      return response.json()
    },
  })

  if (isLoading) {
    return <Table columns={columns} data={[]} loading />
  }

  if (error) {
    return <ErrorEmptyState />
  }

  return (
    <Table
      columns={columns}
      data={data}
      getRowId={(row) => row.id}
    />
  )
}
```

### Mutations with Feedback

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast, toast } from '@/components/core'

function DeleteButton({ userId }: { userId: string }) {
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/users/${id}`, { method: 'DELETE' })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      showToast(toast.success('User deleted successfully'))
    },
    onError: () => {
      showToast(toast.error('Failed to delete user'))
    },
  })

  return (
    <Button
      variant="danger"
      loading={deleteMutation.isLoading}
      onClick={() => deleteMutation.mutate(userId)}
    >
      Delete
    </Button>
  )
}
```

### Optimistic Updates

```tsx
const updateMutation = useMutation({
  mutationFn: updateUser,
  onMutate: async (newUser) => {
    // Cancel outgoing queries
    await queryClient.cancelQueries(['users'])

    // Snapshot current value
    const previous = queryClient.getQueryData(['users'])

    // Optimistically update
    queryClient.setQueryData(['users'], (old) =>
      old.map(u => u.id === newUser.id ? newUser : u)
    )

    return { previous }
  },
  onError: (err, newUser, context) => {
    // Rollback on error
    queryClient.setQueryData(['users'], context.previous)
    showToast(toast.error('Update failed'))
  },
  onSettled: () => {
    queryClient.invalidateQueries(['users'])
  },
})
```

---

## Feedback Patterns

### Success Flow

```tsx
const handleSave = async () => {
  try {
    await saveData()
    showToast(toast.success('Changes saved successfully'))
  } catch (error) {
    showToast(toast.error('Failed to save changes'))
  }
}
```

### Confirmation Before Destructive Actions

```tsx
import { useConfirmDialog } from '@/components/core'

function DeleteButton() {
  const { confirm, ConfirmDialog } = useConfirmDialog()

  const handleDelete = async () => {
    await confirm({
      title: 'Delete Item',
      description: 'This action cannot be undone.',
      variant: 'danger',
      confirmText: 'Delete',
      onConfirm: async () => {
        await deleteItem()
        showToast(toast.success('Item deleted'))
      },
    })
  }

  return (
    <>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
      {ConfirmDialog}
    </>
  )
}
```

### Loading States

```tsx
// Button loading
<Button loading={isLoading}>
  {isLoading ? 'Saving...' : 'Save'}
</Button>

// Table loading
<Table data={data} loading={isLoading} />

// Inline spinner
import { LoadingSpinner } from '@/components/core'

{isLoading && <LoadingSpinner size="md" />}
```

### Error States

```tsx
// Alert for page-level errors
{error && (
  <Alert
    variant="error"
    title="Error"
    message={error.message}
    action={{
      label: 'Retry',
      onClick: retry,
    }}
  />
)}

// Empty state for no data
{data.length === 0 && (
  <ErrorEmptyState
    description="Failed to load data"
    action={<Button onClick={retry}>Retry</Button>}
  />
)}
```

---

## Accessibility Patterns

### Keyboard Navigation

All interactive components support keyboard navigation:

- **Table:** Arrow keys, Tab, Space (select), Enter (activate)
- **DatePicker:** Arrow keys (navigate dates), Enter (select)
- **FileUpload:** Tab, Enter/Space (open picker)
- **ConfirmDialog:** Tab, Enter (confirm), Escape (cancel)

### Screen Reader Support

Components use proper ARIA attributes:

```tsx
// Loading state
<div role="status" aria-live="polite">
  <LoadingSpinner />
  Loading...
</div>

// Alert
<Alert
  variant="error"
  message="Error occurred"
  // Automatically adds role="alert"
/>

// Table
<Table
  // Automatically adds proper table semantics
  // th, tbody, tr, td with scope attributes
/>
```

### Focus Management

```tsx
import { focusStyles } from '@/components/core'

// Use consistent focus styles
<button className={focusStyles.default}>
  Click me
</button>

// For inputs
<input className={focusStyles.input} />

// For dangerous actions
<button className={focusStyles.danger}>
  Delete
</button>
```

---

## Best Practices

### Data Loading

1. **Always show loading state:** Use `loading` prop on components
2. **Handle errors gracefully:** Use ErrorEmptyState or Alert
3. **Show empty states:** Use EmptyState components
4. **Implement retry logic:** Allow users to retry failed operations

### Performance

1. **Memoize column definitions:** Use `useMemo` for table columns
2. **Virtualize long lists:** Consider react-window for 1000+ items
3. **Paginate on server:** For datasets > 100 items
4. **Debounce filters:** Use debounce for search/filter inputs

### User Experience

1. **Provide feedback:** Always confirm user actions
2. **Prevent destructive actions:** Use ConfirmDialog
3. **Show progress:** Use loading states and progress indicators
4. **Allow undo:** Where possible, implement undo functionality

---

## Example: Complete CRUD Flow

```tsx
import {
  Table,
  Button,
  useToast,
  useConfirmDialog,
  toast,
  type TableColumn,
} from '@/components/core'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

function UserManagement() {
  const queryClient = useQueryClient()
  const { showToast } = useToast()
  const { confirm, ConfirmDialog } = useConfirmDialog()

  // Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      showToast(toast.success('User deleted'))
    },
  })

  // Columns
  const columns: TableColumn<User>[] = [
    { id: 'name', header: 'Name', accessor: (u) => u.name, sortable: true },
    { id: 'email', header: 'Email', accessor: (u) => u.email },
    {
      id: 'actions',
      header: 'Actions',
      accessor: (u) => (
        <Button
          size="sm"
          variant="danger"
          onClick={() => handleDelete(u.id)}
        >
          Delete
        </Button>
      ),
    },
  ]

  const handleDelete = async (id: string) => {
    await confirm({
      title: 'Delete User',
      description: 'Are you sure?',
      variant: 'danger',
      onConfirm: () => deleteMutation.mutate(id),
    })
  }

  return (
    <>
      <Table
        columns={columns}
        data={users}
        getRowId={(u) => u.id}
        loading={isLoading}
        pagination
      />
      {ConfirmDialog}
    </>
  )
}
```

---

**Last Updated:** 2026-01-31
**Phase:** 3 - Data & Feedback Components
