/**
 * React Query Hook: Charts
 * Manages chart data fetching and real-time updates
 */

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ChartData } from '../../schemas/chart.schema';
import { fetchChartData, fetchChartDataByDateRange, fetchChartSeries, fetchChartMetrics, DateRange, ChartMetrics } from '../mock/charts';

/**
 * Query key factory for charts
 */
export const chartKeys = {
  all: ['charts'] as const,
  data: () => [...chartKeys.all, 'data'] as const,
  dateRange: (range: DateRange) => [...chartKeys.data(), range] as const,
  series: (id: string) => [...chartKeys.all, 'series', id] as const,
  metrics: () => [...chartKeys.all, 'metrics'] as const,
};

/**
 * Hook to fetch all chart data
 */
export const useCharts = (): UseQueryResult<ChartData, Error> => {
  return useQuery({
    queryKey: chartKeys.data(),
    queryFn: () => fetchChartData(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * Hook to fetch chart data for specific date range
 */
export const useChartsByDateRange = (range: DateRange): UseQueryResult<ChartData, Error> => {
  return useQuery({
    queryKey: chartKeys.dateRange(range),
    queryFn: () => fetchChartDataByDateRange(range),
    enabled: !!range.start && !!range.end,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

/**
 * Hook to fetch specific chart series
 */
export const useChartSeries = (seriesId: string): UseQueryResult<ChartData, Error> => {
  return useQuery({
    queryKey: chartKeys.series(seriesId),
    queryFn: () => fetchChartSeries(seriesId),
    enabled: !!seriesId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

/**
 * Hook to fetch chart metrics
 */
export const useChartMetrics = (): UseQueryResult<ChartMetrics, Error> => {
  return useQuery({
    queryKey: chartKeys.metrics(),
    queryFn: () => fetchChartMetrics(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

/**
 * Hook for real-time chart updates
 * Refetches data at specified interval
 */
export const useRealtimeCharts = (intervalMs: number = 10000): UseQueryResult<ChartData, Error> => {
  return useQuery({
    queryKey: chartKeys.data(),
    queryFn: () => fetchChartData(),
    refetchInterval: intervalMs,
    refetchIntervalInBackground: false,
    staleTime: intervalMs,
  });
};
