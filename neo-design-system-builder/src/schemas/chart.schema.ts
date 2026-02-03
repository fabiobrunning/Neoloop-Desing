import { z } from 'zod';

/**
 * Chart Data Validation Schemas
 * Defines validation rules for chart data structures
 */

export const ChartDataPointSchema = z.object({
  timestamp: z.string().datetime(),
  value: z.number(),
  label: z.string().optional(),
  category: z.string().optional(),
});

export const ChartSeriesSchema = z.object({
  id: z.string(),
  name: z.string(),
  data: z.array(ChartDataPointSchema),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  type: z.enum(['line', 'bar', 'area', 'scatter']).optional(),
});

export const ChartDataSchema = z.object({
  series: z.array(ChartSeriesSchema),
  title: z.string().optional(),
  description: z.string().optional(),
  unit: z.string().optional(),
  interval: z.enum(['hour', 'day', 'week', 'month', 'year']).optional(),
});

export const ChartConfigSchema = z.object({
  type: z.enum(['line', 'bar', 'area', 'pie', 'scatter', 'mixed']),
  showLegend: z.boolean().default(true),
  showGrid: z.boolean().default(true),
  showTooltip: z.boolean().default(true),
  responsive: z.boolean().default(true),
  height: z.number().min(100).max(1000).optional(),
  colors: z.array(z.string().regex(/^#[0-9A-Fa-f]{6}$/)).optional(),
});

// Type exports
export type ChartDataPoint = z.infer<typeof ChartDataPointSchema>;
export type ChartSeries = z.infer<typeof ChartSeriesSchema>;
export type ChartData = z.infer<typeof ChartDataSchema>;
export type ChartConfig = z.infer<typeof ChartConfigSchema>;
