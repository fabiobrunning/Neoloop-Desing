import React, { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown, MoreVertical } from 'lucide-react'

/**
 * Responsive table column definition
 */
export interface ResponsiveTableColumn<T = unknown> {
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
  /** Column priority for responsive display (1 = always show, 2 = hide on mobile, 3 = hide on tablet) */
  priority?: 1 | 2 | 3
  /** Whether this is the primary column (shown as card title on mobile) */
  primary?: boolean
}

/**
 * Sort state
 */
export interface SortState {
  column: string | null
  direction: 'asc' | 'desc' | null
}

/**
 * Responsive table props
 */
export interface ResponsiveTableProps<T = unknown> {
  /** Column definitions */
  columns: ResponsiveTableColumn<T>[]
  /** Table data rows */
  data: T[]
  /** Row key accessor */
  getRowId: (row: T, index: number) => string
  /** Current sort state */
  sortState?: SortState
  /** Sort change handler */
  onSortChange?: (state: SortState) => void
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void
  /** Empty state message */
  emptyMessage?: string
  /** Loading state */
  loading?: boolean
  /** Enable pagination */
  pagination?: boolean
  /** Rows per page */
  pageSize?: number
  /** Custom className */
  className?: string
}

/**
 * ResponsiveTable Component
 *
 * Mobile-first responsive table that transforms into card view on mobile devices.
 *
 * @example
 * ```tsx
 * const columns = [
 *   { id: 'name', header: 'Name', accessor: (u) => u.name, primary: true, priority: 1 },
 *   { id: 'email', header: 'Email', accessor: (u) => u.email, priority: 2 },
 *   { id: 'status', header: 'Status', accessor: (u) => <Badge>{u.status}</Badge>, priority: 1 },
 * ]
 *
 * <ResponsiveTable
 *   columns={columns}
 *   data={users}
 *   getRowId={(row) => row.id}
 *   onRowClick={(user) => console.log(user)}
 * />
 * ```
 */
export function ResponsiveTable<T = unknown>({
  columns,
  data,
  getRowId,
  sortState: controlledSortState,
  onSortChange,
  onRowClick,
  emptyMessage = 'No data available',
  loading = false,
  pagination = false,
  pageSize = 10,
  className = '',
}: ResponsiveTableProps<T>) {
  // Internal sort state
  const [internalSortState, setInternalSortState] = useState<SortState>({ column: null, direction: null })
  const sortState = controlledSortState ?? internalSortState

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0)

  // Handle sort
  const handleSort = (columnId: string) => {
    const column = columns.find(col => col.id === columnId)
    if (!column?.sortable) return

    let newDirection: 'asc' | 'desc' | null = 'asc'

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
        return sortState.direction === 'asc' ? column.sortFn(a, b) : column.sortFn(b, a)
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
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, pagination, currentPage, pageSize])

  const totalPages = Math.ceil(sortedData.length / pageSize)

  const primaryColumn = columns.find(col => col.primary) || columns[0]

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Table View - hidden on mobile */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column) => {
                const priorityClass =
                  column.priority === 3 ? 'hidden xl:table-cell' :
                  column.priority === 2 ? 'hidden lg:table-cell' :
                  ''

                return (
                  <th
                    key={column.id}
                    className={`px-6 py-4 font-semibold text-gray-900 ${priorityClass}`}
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
                )
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                    Loading...
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const rowId = getRowId(row, rowIndex)

                return (
                  <tr
                    key={rowId}
                    onClick={() => onRowClick?.(row, rowIndex)}
                    className={`hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                  >
                    {columns.map((column) => {
                      const priorityClass =
                        column.priority === 3 ? 'hidden xl:table-cell' :
                        column.priority === 2 ? 'hidden lg:table-cell' :
                        ''

                      return (
                        <td key={column.id} className={`px-6 py-4 ${priorityClass}`}>
                          {column.accessor(row)}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - shown only on mobile */}
      <div className="md:hidden space-y-3">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-gray-500">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
            Loading...
          </div>
        ) : paginatedData.length === 0 ? (
          <div className="py-12 text-center text-gray-500">{emptyMessage}</div>
        ) : (
          paginatedData.map((row, rowIndex) => {
            const rowId = getRowId(row, rowIndex)

            return (
              <div
                key={rowId}
                onClick={() => onRowClick?.(row, rowIndex)}
                className={`bg-white rounded-lg border border-gray-200 p-4 ${onRowClick ? 'cursor-pointer active:bg-gray-50' : ''}`}
              >
                {/* Primary field as card title */}
                <div className="font-semibold text-gray-900 mb-3">
                  {primaryColumn.accessor(row)}
                </div>

                {/* Other fields as key-value pairs */}
                <div className="space-y-2">
                  {columns
                    .filter(col => !col.primary && col.priority === 1)
                    .map(column => (
                      <div key={column.id} className="flex justify-between items-start text-sm">
                        <span className="text-gray-600 font-medium">{column.header}:</span>
                        <span className="text-gray-900 ml-2 flex-1 text-right">{column.accessor(row)}</span>
                      </div>
                    ))}
                </div>

                {/* Action button placeholder */}
                {onRowClick && (
                  <button
                    type="button"
                    className="mt-3 p-1 rounded hover:bg-gray-100 ml-auto block"
                    aria-label="More options"
                  >
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </button>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Pagination */}
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

ResponsiveTable.displayName = 'ResponsiveTable'
