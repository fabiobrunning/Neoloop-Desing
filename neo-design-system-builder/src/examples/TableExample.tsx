/**
 * Example: Advanced Table with Data Infrastructure
 * Demonstrates complete usage of data layer
 */

import React, { useState } from 'react';
import { useTables, useUpdateTableRow, useDeleteTableRow } from '../api/queries';
import { TableProvider, useTableContext } from '../context/TableContext';
import { useDebounce } from '../utils/performance';
import { formatDate, formatNumber } from '../utils/dataHelpers';

/**
 * Table Component (internal)
 */
const TableComponent: React.FC = () => {
  const {
    state,
    setPage,
    setPageSize,
    setSort,
    setSearch,
    selectRow,
    deselectRow,
    isRowSelected,
    clearSelection,
  } = useTableContext();

  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 300);

  // Update search when debounced value changes
  React.useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  // Fetch data with React Query
  const { data, isLoading, error } = useTables({
    page: state.page,
    pageSize: state.pageSize,
    sort: state.sort,
    filters: state.filters,
    search: state.search,
  });

  // Mutations
  const updateMutation = useUpdateTableRow();
  const deleteMutation = useDeleteTableRow();

  // Handlers
  const handleSort = (field: string) => {
    const direction = state.sort?.field === field && state.sort.direction === 'asc' ? 'desc' : 'asc';
    setSort({ field, direction });
  };

  const handleSelectRow = (id: string) => {
    if (isRowSelected(id)) {
      deselectRow(id);
    } else {
      selectRow(id);
    }
  };

  const handleSelectAll = () => {
    if (data && state.selectedRows.length === data.rows.length) {
      clearSelection();
    } else if (data) {
      data.rows.forEach((row) => selectRow(row.id));
    }
  };

  const handleUpdate = async (id: string, name: string) => {
    try {
      await updateMutation.mutateAsync({
        id,
        updates: { name },
      });
      alert('Updated successfully!');
    } catch (err) {
      alert('Update failed: ' + (err as Error).message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      await deleteMutation.mutateAsync(id);
      alert('Deleted successfully!');
    } catch (err) {
      alert('Delete failed: ' + (err as Error).message);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading data...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-500 text-xl mb-2">Error</div>
        <p className="text-gray-600">{error.message}</p>
      </div>
    );
  }

  // No data
  if (!data || data.rows.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">No data found</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Controls */}
      <div className="mb-6 flex gap-4 items-center">
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Page size */}
        <select
          value={state.pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
        </select>

        {/* Selection info */}
        {state.selectedRows.length > 0 && (
          <div className="ml-auto text-sm text-gray-600">
            {state.selectedRows.length} row(s) selected
            <button onClick={clearSelection} className="ml-2 text-blue-500 hover:underline">
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={state.selectedRows.length === data.rows.length}
                  onChange={handleSelectAll}
                  className="rounded"
                />
              </th>
              <th
                className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                Name {state.sort?.field === 'name' && (state.sort.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                Status {state.sort?.field === 'status' && (state.sort.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('category')}
              >
                Category {state.sort?.field === 'category' && (state.sort.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-right cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('value')}
              >
                Value {state.sort?.field === 'value' && (state.sort.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr
                key={row.id}
                className={`border-t border-gray-200 hover:bg-gray-50 ${
                  isRowSelected(row.id) ? 'bg-blue-50' : ''
                }`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={isRowSelected(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                    className="rounded"
                  />
                </td>
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      row.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : row.status === 'inactive'
                        ? 'bg-gray-100 text-gray-800'
                        : row.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3">{row.category}</td>
                <td className="px-4 py-3 text-right">{formatNumber(row.value)}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{formatDate(row.date, 'short')}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => {
                      const newName = prompt('New name:', row.name);
                      if (newName) handleUpdate(row.id, newName);
                    }}
                    className="text-blue-500 hover:underline mr-3"
                    disabled={updateMutation.isPending}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row.id)}
                    className="text-red-500 hover:underline"
                    disabled={deleteMutation.isPending}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {(state.page - 1) * state.pageSize + 1} to{' '}
          {Math.min(state.page * state.pageSize, data.total)} of {data.total} results
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setPage(state.page - 1)}
            disabled={state.page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>

          {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-4 py-2 border rounded-lg ${
                  state.page === pageNum
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setPage(state.page + 1)}
            disabled={state.page >= data.totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Table Example (exported)
 */
export const TableExample: React.FC = () => {
  return (
    <TableProvider initialState={{ pageSize: 10 }}>
      <TableComponent />
    </TableProvider>
  );
};
