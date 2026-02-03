/**
 * Mock Table API
 * Simulates table data fetching with filtering, sorting, and pagination
 */

import { TableData, TableQuery, TableRow, TableDataSchema } from '../../schemas/table.schema';
import { delay } from './delay';
import { maybeThrowError } from './errors';

let cachedData: TableRow[] | null = null;

/**
 * Load table data from JSON file
 */
const loadTableData = async (): Promise<TableRow[]> => {
  if (cachedData) {
    return cachedData;
  }

  const response = await fetch('/data/tables.json');
  const data = await response.json();
  cachedData = data.rows;
  return cachedData;
};

/**
 * Apply filters to table data
 */
const applyFilters = (rows: TableRow[], query: TableQuery): TableRow[] => {
  let filtered = [...rows];

  // Apply search
  if (query.search) {
    const searchLower = query.search.toLowerCase();
    filtered = filtered.filter((row) =>
      row.name.toLowerCase().includes(searchLower) ||
      row.category.toLowerCase().includes(searchLower) ||
      row.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  }

  // Apply filters
  if (query.filters) {
    query.filters.forEach((filter) => {
      filtered = filtered.filter((row) => {
        const value = row[filter.field as keyof TableRow];

        switch (filter.operator) {
          case 'equals':
            return value === filter.value;
          case 'contains':
            return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
          case 'gt':
            return Number(value) > Number(filter.value);
          case 'lt':
            return Number(value) < Number(filter.value);
          case 'gte':
            return Number(value) >= Number(filter.value);
          case 'lte':
            return Number(value) <= Number(filter.value);
          case 'in':
            return Array.isArray(filter.value) && filter.value.includes(value);
          default:
            return true;
        }
      });
    });
  }

  return filtered;
};

/**
 * Apply sorting to table data
 */
const applySort = (rows: TableRow[], query: TableQuery): TableRow[] => {
  if (!query.sort) {
    return rows;
  }

  const { field, direction } = query.sort;

  return [...rows].sort((a, b) => {
    const aValue = a[field as keyof TableRow];
    const bValue = b[field as keyof TableRow];

    if (aValue === bValue) return 0;

    const comparison = aValue > bValue ? 1 : -1;
    return direction === 'asc' ? comparison : -comparison;
  });
};

/**
 * Apply pagination to table data
 */
const applyPagination = (rows: TableRow[], query: TableQuery): TableRow[] => {
  const { page, pageSize } = query;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return rows.slice(start, end);
};

/**
 * Fetch table data with query parameters
 */
export const fetchTableData = async (query: TableQuery): Promise<TableData> => {
  // Simulate network delay
  await delay();

  // Simulate random errors
  maybeThrowError(0.05);

  // Load data
  const allRows = await loadTableData();

  // Apply filters
  const filtered = applyFilters(allRows, query);

  // Apply sorting
  const sorted = applySort(filtered, query);

  // Calculate pagination
  const total = sorted.length;
  const totalPages = Math.ceil(total / query.pageSize);

  // Apply pagination
  const paginated = applyPagination(sorted, query);

  // Validate and return
  const result: TableData = {
    rows: paginated,
    total,
    page: query.page,
    pageSize: query.pageSize,
    totalPages,
  };

  return TableDataSchema.parse(result);
};

/**
 * Fetch single table row by ID
 */
export const fetchTableRow = async (id: string): Promise<TableRow> => {
  await delay();
  maybeThrowError(0.05);

  const allRows = await loadTableData();
  const row = allRows.find((r) => r.id === id);

  if (!row) {
    throw new Error(`Row with id ${id} not found`);
  }

  return row;
};

/**
 * Update table row
 */
export const updateTableRow = async (id: string, updates: Partial<TableRow>): Promise<TableRow> => {
  await delay({ min: 300, max: 600 });
  maybeThrowError(0.05);

  const allRows = await loadTableData();
  const rowIndex = allRows.findIndex((r) => r.id === id);

  if (rowIndex === -1) {
    throw new Error(`Row with id ${id} not found`);
  }

  const updatedRow = { ...allRows[rowIndex], ...updates };

  // Update cache
  if (cachedData) {
    cachedData[rowIndex] = updatedRow;
  }

  return updatedRow;
};

/**
 * Delete table row
 */
export const deleteTableRow = async (id: string): Promise<void> => {
  await delay({ min: 200, max: 400 });
  maybeThrowError(0.05);

  if (cachedData) {
    cachedData = cachedData.filter((r) => r.id !== id);
  }
};
