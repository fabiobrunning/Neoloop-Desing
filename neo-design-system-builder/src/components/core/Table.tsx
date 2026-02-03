import React, { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'

/**
 * Table column definition
 */
export interface TableColumn<T = unknown> {
  /** Unique column identifier */
  id: string
  /** Column header label */
  header: string
  /** Accessor function to get cell value */
  accessor: (row: T) => React.ReactNode
  /** Whether column is sortable */
  sortable?: boolean
  /** Custom sort function */
  sortFn?: (a: T, b: T) => number
  /** Column width (CSS value) */
  width?: string
  /** Column alignment */
  align?: 'left' | 'center' | 'right'
}

/**
 * Sort direction
 */
export type SortDirection = 'asc' | 'desc' | null

/**
 * Sort state
 */
export interface SortState {
  column: string | null
  direction: SortDirection
}

/**
 * Table component props
 */
export interface TableProps<T = unknown> {
  /** Column definitions */
  columns: TableColumn<T>[]
  /** Table data rows */
  data: T[]
  /** Enable row selection */
  selectable?: boolean
  /** Selected row IDs */
  selectedRows?: Set<string>
  /** Row selection change handler */
  onSelectionChange?: (selectedIds: Set<string>) => void
  /** Row key accessor */
  getRowId: (row: T, index: number) => string
  /** Enable pagination */
  pagination?: boolean
  /** Rows per page (default: 10) */
  pageSize?: number
  /** Current sort state */
  sortState?: SortState
  /** Sort change handler */
  onSortChange?: (state: SortState) => void
  /** Empty state message */
  emptyMessage?: string
  /** Loading state */
  loading?: boolean
  /** Striped rows */
  striped?: boolean
  /** Hover effect on rows */
  hoverable?: boolean
  /** Dense spacing */
  dense?: boolean
  /** Custom className */
  className?: string
}

/**
 * Table Component
 *
 * Full-featured data table with sorting, pagination, and row selection.
 *
 * @example
 * ```tsx
 * const columns = [
 *   { id: 'name', header: 'Name', accessor: (row) => row.name, sortable: true },
 *   { id: 'email', header: 'Email', accessor: (row) => row.email },
 *   { id: 'status', header: 'Status', accessor: (row) => <Badge>{row.status}</Badge> },
 * ]
 *
 * <Table
 *   columns={columns}
 *   data={users}
 *   getRowId={(row) => row.id}
 *   selectable
 *   pagination
 *   pageSize={20}
 * />
 * ```
 */
export function Table<T = unknown>({
  columns,
  data,
  selectable = false,
  selectedRows: controlledSelectedRows,
  onSelectionChange,
  getRowId,
  pagination = false,
  pageSize = 10,
  sortState: controlledSortState,
  onSortChange,
  emptyMessage = 'No data available',
  loading = false,
  striped = false,
  hoverable = true,
  dense = false,
  className = '',
}: TableProps<T>) {
  // Internal state for selection
  const [internalSelectedRows, setInternalSelectedRows] = useState<Set<string>>(new Set())
  const selectedRows = controlledSelectedRows ?? internalSelectedRows

  // Internal state for sorting
  const [internalSortState, setInternalSortState] = useState<SortState>({ column: null, direction: null })
  const sortState = controlledSortState ?? internalSortState

  // Internal state for pagination
  const [currentPage, setCurrentPage] = useState(0)

  // Handle row selection
  const handleRowSelect = (rowId: string, checked: boolean) => {
    const newSelection = new Set(selectedRows)
    if (checked) {
      newSelection.add(rowId)
    } else {
      newSelection.delete(rowId)
    }

    if (onSelectionChange) {
      onSelectionChange(newSelection)
    } else {
      setInternalSelectedRows(newSelection)
    }
  }

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(data.map((row, idx) => getRowId(row, idx)))
      if (onSelectionChange) {
        onSelectionChange(allIds)
      } else {
        setInternalSelectedRows(allIds)
      }
    } else {
      if (onSelectionChange) {
        onSelectionChange(new Set())
      } else {
        setInternalSelectedRows(new Set())
      }
    }
  }

  // Handle sort
  const handleSort = (columnId: string) => {
    const column = columns.find(col => col.id === columnId)
    if (!column?.sortable) return

    let newDirection: SortDirection = 'asc'

    if (sortState.column === columnId) {
      if (sortState.direction === 'asc') {
        newDirection = 'desc'
      } else if (sortState.direction === 'desc') {
        newDirection = null
      }
    }

    const newState: SortState = {
      column: newDirection ? columnId : null,
      direction: newDirection,
    }

    if (onSortChange) {
      onSortChange(newState)
    } else {
      setInternalSortState(newState)
    }
  }

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.direction) return data

    const column = columns.find(col => col.id === sortState.column)
    if (!column) return data

    return [...data].sort((a, b) => {
      if (column.sortFn) {
        return sortState.direction === 'asc'
          ? column.sortFn(a, b)
          : column.sortFn(b, a)
      }

      const aValue = column.accessor(a)
      const bValue = column.accessor(b)

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortState.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortState.direction === 'asc' ? aValue - bValue : bValue - aValue
      }

      return 0
    })
  }, [data, sortState, columns])

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData

    const start = currentPage * pageSize
    const end = start + pageSize
    return sortedData.slice(start, end)
  }, [sortedData, pagination, currentPage, pageSize])

  const totalPages = Math.ceil(sortedData.length / pageSize)
  const isAllSelected = data.length > 0 && selectedRows.size === data.length
  const isSomeSelected = selectedRows.size > 0 && selectedRows.size < data.length

  // Alignment classes
  const getAlignClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center': return 'text-center'
      case 'right': return 'text-right'
      default: return 'text-left'
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {selectable && (
                <th className={`${dense ? 'px-3 py-2' : 'px-6 py-4'} w-12`}>
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={input => {
                      if (input) {
                        input.indeterminate = isSomeSelected
                      }
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={`${dense ? 'px-3 py-2' : 'px-6 py-4'} font-semibold text-gray-900 ${getAlignClass(column.align)}`}
                  style={{ width: column.width }}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.id)}
                      className="inline-flex items-center gap-2 hover:text-blue-600 transition-colors"
                      type="button"
                    >
                      {column.header}
                      {sortState.column === column.id ? (
                        sortState.direction === 'asc' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-12 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                    Loading...
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-12 text-center text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const rowId = getRowId(row, rowIndex)
                const isSelected = selectedRows.has(rowId)

                return (
                  <tr
                    key={rowId}
                    className={`
                      ${striped && rowIndex % 2 === 1 ? 'bg-gray-50' : ''}
                      ${hoverable ? 'hover:bg-gray-100' : ''}
                      ${isSelected ? 'bg-blue-50' : ''}
                      transition-colors
                    `}
                  >
                    {selectable && (
                      <td className={`${dense ? 'px-3 py-2' : 'px-6 py-4'}`}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleRowSelect(rowId, e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          aria-label={`Select row ${rowIndex + 1}`}
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.id}
                        className={`${dense ? 'px-3 py-2' : 'px-6 py-4'} ${getAlignClass(column.align)}`}
                      >
                        {column.accessor(row)}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between px-2">
          <div className="text-sm text-gray-700">
            Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, sortedData.length)} of {sortedData.length} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

Table.displayName = 'Table'
