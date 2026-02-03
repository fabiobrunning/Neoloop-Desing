import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Table, type TableColumn } from './Table'

interface TestData {
  id: string
  name: string
  email: string
  status: string
}

const mockData: TestData[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'active' },
]

const mockColumns: TableColumn<TestData>[] = [
  { id: 'name', header: 'Name', accessor: (row) => row.name, sortable: true },
  { id: 'email', header: 'Email', accessor: (row) => row.email },
  { id: 'status', header: 'Status', accessor: (row) => row.status },
]

describe('Table', () => {
  it('renders table with data', () => {
    render(
      <Table
        columns={mockColumns}
        data={mockData}
        getRowId={(row) => row.id}
      />
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
  })

  it('renders empty state when no data', () => {
    render(
      <Table
        columns={mockColumns}
        data={[]}
        getRowId={(row) => row.id}
        emptyMessage="No records found"
      />
    )

    expect(screen.getByText('No records found')).toBeInTheDocument()
  })

  it('handles row selection', () => {
    const onSelectionChange = vi.fn()

    render(
      <Table
        columns={mockColumns}
        data={mockData}
        getRowId={(row) => row.id}
        selectable
        onSelectionChange={onSelectionChange}
      />
    )

    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[1]) // First data row

    expect(onSelectionChange).toHaveBeenCalled()
  })

  it('handles sorting', () => {
    const onSortChange = vi.fn()

    render(
      <Table
        columns={mockColumns}
        data={mockData}
        getRowId={(row) => row.id}
        onSortChange={onSortChange}
      />
    )

    const nameHeader = screen.getByText('Name')
    fireEvent.click(nameHeader)

    expect(onSortChange).toHaveBeenCalledWith({
      column: 'name',
      direction: 'asc',
    })
  })

  it('shows loading state', () => {
    render(
      <Table
        columns={mockColumns}
        data={mockData}
        getRowId={(row) => row.id}
        loading
      />
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('handles pagination', () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 1}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      status: 'active',
    }))

    render(
      <Table
        columns={mockColumns}
        data={largeData}
        getRowId={(row) => row.id}
        pagination
        pageSize={10}
      />
    )

    expect(screen.getByText('Showing 1 to 10 of 25 results')).toBeInTheDocument()
  })
})
