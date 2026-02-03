/**
 * Mock Chart API
 * Simulates chart data fetching with time series data
 */

import { ChartData, ChartDataSchema } from '../../schemas/chart.schema';
import { delay } from './delay';
import { maybeThrowError } from './errors';

let cachedChartData: ChartData | null = null;

/**
 * Load chart data from JSON file
 */
const loadChartData = async (): Promise<ChartData> => {
  if (cachedChartData) {
    return cachedChartData;
  }

  const response = await fetch('/data/charts.json');
  const data = await response.json();
  cachedChartData = ChartDataSchema.parse(data);
  return cachedChartData;
};

/**
 * Fetch chart data
 */
export const fetchChartData = async (): Promise<ChartData> => {
  await delay();
  maybeThrowError(0.03);

  return loadChartData();
};

/**
 * Fetch chart data for specific date range
 */
export interface DateRange {
  start: string;
  end: string;
}

export const fetchChartDataByDateRange = async (range: DateRange): Promise<ChartData> => {
  await delay();
  maybeThrowError(0.03);

  const allData = await loadChartData();

  const startDate = new Date(range.start);
  const endDate = new Date(range.end);

  // Filter series data by date range
  const filteredSeries = allData.series.map((series) => ({
    ...series,
    data: series.data.filter((point) => {
      const pointDate = new Date(point.timestamp);
      return pointDate >= startDate && pointDate <= endDate;
    }),
  }));

  return {
    ...allData,
    series: filteredSeries,
  };
};

/**
 * Fetch specific chart series by ID
 */
export const fetchChartSeries = async (seriesId: string): Promise<ChartData> => {
  await delay();
  maybeThrowError(0.03);

  const allData = await loadChartData();

  const series = allData.series.filter((s) => s.id === seriesId);

  if (series.length === 0) {
    throw new Error(`Series with id ${seriesId} not found`);
  }

  return {
    ...allData,
    series,
  };
};

/**
 * Generate mock real-time data point
 */
export const generateRealtimeDataPoint = (seriesId: string): number => {
  // Generate random value based on series type
  const baseValues: Record<string, number> = {
    'usage-components': 300,
    'downloads': 215,
    'errors': 6,
  };

  const baseValue = baseValues[seriesId] || 100;
  const variance = baseValue * 0.1;

  return Math.floor(baseValue + (Math.random() - 0.5) * variance);
};

/**
 * Fetch aggregated metrics
 */
export interface ChartMetrics {
  totalUsage: number;
  totalDownloads: number;
  totalErrors: number;
  avgUsage: number;
  avgDownloads: number;
  errorRate: number;
}

export const fetchChartMetrics = async (): Promise<ChartMetrics> => {
  await delay({ min: 150, max: 300 });
  maybeThrowError(0.03);

  const data = await loadChartData();

  const usageSeries = data.series.find((s) => s.id === 'usage-components');
  const downloadsSeries = data.series.find((s) => s.id === 'downloads');
  const errorsSeries = data.series.find((s) => s.id === 'errors');

  const totalUsage = usageSeries?.data.reduce((sum, point) => sum + point.value, 0) || 0;
  const totalDownloads = downloadsSeries?.data.reduce((sum, point) => sum + point.value, 0) || 0;
  const totalErrors = errorsSeries?.data.reduce((sum, point) => sum + point.value, 0) || 0;

  const dataPoints = usageSeries?.data.length || 1;

  return {
    totalUsage,
    totalDownloads,
    totalErrors,
    avgUsage: totalUsage / dataPoints,
    avgDownloads: totalDownloads / dataPoints,
    errorRate: (totalErrors / totalUsage) * 100,
  };
};
