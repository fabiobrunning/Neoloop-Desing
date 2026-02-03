import { z } from 'zod';

/**
 * Table Data Validation Schemas
 * Defines validation rules for table data structures
 */

export const TableRowSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  status: z.enum(['active', 'inactive', 'pending', 'archived']),
  category: z.string().min(1),
  value: z.number().min(0),
  date: z.string().datetime(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const TableDataSchema = z.object({
  rows: z.array(TableRowSchema),
  total: z.number().int().min(0),
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1).max(100),
  totalPages: z.number().int().min(0),
});

export const TableSortSchema = z.object({
  field: z.string(),
  direction: z.enum(['asc', 'desc']),
});

export const TableFilterSchema = z.object({
  field: z.string(),
  operator: z.enum(['equals', 'contains', 'gt', 'lt', 'gte', 'lte', 'in']),
  value: z.unknown(),
});

export const TableQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(10),
  sort: TableSortSchema.optional(),
  filters: z.array(TableFilterSchema).optional(),
  search: z.string().optional(),
});

// Type exports
export type TableRow = z.infer<typeof TableRowSchema>;
export type TableData = z.infer<typeof TableDataSchema>;
export type TableSort = z.infer<typeof TableSortSchema>;
export type TableFilter = z.infer<typeof TableFilterSchema>;
export type TableQuery = z.infer<typeof TableQuerySchema>;
