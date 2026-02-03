import type { Meta, StoryObj } from '@storybook/react'
import { Table, type TableColumn } from './Table'
import { Badge } from './Badge'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  joinDate: string
}

const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinDate: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', joinDate: '2024-02-20' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive', joinDate: '2024-03-10' },
  { id: '4', name: 'Alice Williams', email: 'alice@example.com', role: 'User', status: 'pending', joinDate: '2024-04-05' },
  { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin', status: 'active', joinDate: '2024-01-30' },
]

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
    id: 'role',
    header: 'Role',
    accessor: (row) => row.role,
  },
  {
    id: 'status',
    header: 'Status',
    accessor: (row) => (
      <Badge
        variant={row.status === 'active' ? 'success' : row.status === 'inactive' ? 'default' : 'warning'}
      >
        {row.status}
      </Badge>
    ),
  },
  {
    id: 'joinDate',
    header: 'Join Date',
    accessor: (row) => new Date(row.joinDate).toLocaleDateString(),
    sortable: true,
  },
]

const meta: Meta<typeof Table> = {
  title: 'Phase 3/Data/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  args: {
    columns,
    data: mockUsers,
    getRowId: (row) => row.id,
  },
}

export const WithSelection: Story = {
  args: {
    columns,
    data: mockUsers,
    getRowId: (row) => row.id,
    selectable: true,
  },
}

export const WithPagination: Story = {
  args: {
    columns,
    data: Array.from({ length: 25 }, (_, i) => ({
      ...mockUsers[i % mockUsers.length],
      id: `${i + 1}`,
      name: `User ${i + 1}`,
    })),
    getRowId: (row) => row.id,
    pagination: true,
    pageSize: 10,
  },
}

export const Striped: Story = {
  args: {
    columns,
    data: mockUsers,
    getRowId: (row) => row.id,
    striped: true,
  },
}

export const Dense: Story = {
  args: {
    columns,
    data: mockUsers,
    getRowId: (row) => row.id,
    dense: true,
  },
}

export const Loading: Story = {
  args: {
    columns,
    data: mockUsers,
    getRowId: (row) => row.id,
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    columns,
    data: [],
    getRowId: (row) => row.id,
    emptyMessage: 'No users found. Add your first user to get started.',
  },
}

export const AllFeatures: Story = {
  args: {
    columns,
    data: Array.from({ length: 25 }, (_, i) => ({
      ...mockUsers[i % mockUsers.length],
      id: `${i + 1}`,
      name: `User ${i + 1}`,
    })),
    getRowId: (row) => row.id,
    selectable: true,
    pagination: true,
    pageSize: 10,
    striped: true,
    hoverable: true,
  },
}
