/**
 * React Query Hook: Tables
 * Manages table data fetching, caching, and mutations
 */

import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { TableData, TableQuery, TableRow } from '../../schemas/table.schema';
import { fetchTableData, fetchTableRow, updateTableRow, deleteTableRow } from '../mock/tables';

/**
 * Query key factory for tables
 */
export const tableKeys = {
  all: ['tables'] as const,
  lists: () => [...tableKeys.all, 'list'] as const,
  list: (query: TableQuery) => [...tableKeys.lists(), query] as const,
  details: () => [...tableKeys.all, 'detail'] as const,
  detail: (id: string) => [...tableKeys.details(), id] as const,
};

/**
 * Hook to fetch table data with query parameters
 */
export const useTables = (query: TableQuery): UseQueryResult<TableData, Error> => {
  return useQuery({
    queryKey: tableKeys.list(query),
    queryFn: () => fetchTableData(query),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * Hook to fetch single table row
 */
export const useTableRow = (id: string): UseQueryResult<TableRow, Error> => {
  return useQuery({
    queryKey: tableKeys.detail(id),
    queryFn: () => fetchTableRow(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

/**
 * Hook to update table row
 */
export const useUpdateTableRow = (): UseMutationResult<TableRow, Error, { id: string; updates: Partial<TableRow> }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }) => updateTableRow(id, updates),
    onSuccess: (data, variables) => {
      // Invalidate table lists
      queryClient.invalidateQueries({ queryKey: tableKeys.lists() });

      // Update specific row cache
      queryClient.setQueryData(tableKeys.detail(variables.id), data);
    },
  });
};

/**
 * Hook to delete table row
 */
export const useDeleteTableRow = (): UseMutationResult<void, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTableRow(id),
    onSuccess: (_, id) => {
      // Invalidate all table queries
      queryClient.invalidateQueries({ queryKey: tableKeys.all });

      // Remove specific row from cache
      queryClient.removeQueries({ queryKey: tableKeys.detail(id) });
    },
  });
};

/**
 * Prefetch table data
 */
export const usePrefetchTables = () => {
  const queryClient = useQueryClient();

  return (query: TableQuery) => {
    queryClient.prefetchQuery({
      queryKey: tableKeys.list(query),
      queryFn: () => fetchTableData(query),
      staleTime: 5 * 60 * 1000,
    });
  };
};
