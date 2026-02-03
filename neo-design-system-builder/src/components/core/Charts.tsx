import React from 'react'
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  AreaChart as RechartsAreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts'

/**
 * Chart data point
 */
export interface ChartDataPoint {
  [key: string]: string | number
}

/**
 * Chart color palette
 */
export const CHART_COLORS = {
  primary: '#3b82f6',   // blue-600
  secondary: '#8b5cf6', // violet-600
  success: '#10b981',   // green-600
  warning: '#f59e0b',   // amber-600
  danger: '#ef4444',    // red-600
  info: '#06b6d4',      // cyan-600
  gray: '#6b7280',      // gray-600
}

export const CHART_COLOR_PALETTE = [
  CHART_COLORS.primary,
  CHART_COLORS.secondary,
  CHART_COLORS.success,
  CHART_COLORS.warning,
  CHART_COLORS.danger,
  CHART_COLORS.info,
]

/**
 * Base chart props
 */
export interface BaseChartProps {
  /** Chart data */
  data: ChartDataPoint[]
  /** Chart height in pixels */
  height?: number
  /** Show grid lines */
  showGrid?: boolean
  /** Show legend */
  showLegend?: boolean
  /** Show tooltip */
  showTooltip?: boolean
  /** Custom className */
  className?: string
}

/**
 * Line chart props
 */
export interface LineChartProps extends BaseChartProps {
  /** X-axis data key */
  xKey: string
  /** Y-axis data key(s) */
  yKeys: string[]
  /** Line colors (maps to yKeys) */
  colors?: string[]
  /** Smooth curve */
  smooth?: boolean
  /** Show data points */
  showDots?: boolean
}

/**
 * LineChart Component
 *
 * Line chart built on Recharts with consistent styling.
 *
 * @example
 * ```tsx
 * const data = [
 *   { month: 'Jan', sales: 4000, revenue: 2400 },
 *   { month: 'Feb', sales: 3000, revenue: 1398 },
 *   { month: 'Mar', sales: 2000, revenue: 9800 },
 * ]
 *
 * <LineChart
 *   data={data}
 *   xKey="month"
 *   yKeys={['sales', 'revenue']}
 *   colors={[CHART_COLORS.primary, CHART_COLORS.success]}
 *   smooth
 * />
 * ```
 */
export function LineChart({
  data,
  xKey,
  yKeys,
  colors = CHART_COLOR_PALETTE,
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  smooth = false,
  showDots = true,
  className = '',
}: LineChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          <XAxis dataKey={xKey} stroke="#6b7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
          {showTooltip && <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }} />}
          {showLegend && <Legend wrapperStyle={{ fontSize: '12px' }} />}
          {yKeys.map((key, index) => (
            <Line
              key={key}
              type={smooth ? 'monotone' : 'linear'}
              dataKey={key}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={showDots}
              activeDot={{ r: 6 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

LineChart.displayName = 'LineChart'

/**
 * Bar chart props
 */
export interface BarChartProps extends BaseChartProps {
  /** X-axis data key */
  xKey: string
  /** Y-axis data key(s) */
  yKeys: string[]
  /** Bar colors (maps to yKeys) */
  colors?: string[]
  /** Stack bars */
  stacked?: boolean
  /** Bar size */
  barSize?: number
}

/**
 * BarChart Component
 */
export function BarChart({
  data,
  xKey,
  yKeys,
  colors = CHART_COLOR_PALETTE,
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  stacked = false,
  barSize,
  className = '',
}: BarChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          <XAxis dataKey={xKey} stroke="#6b7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
          {showTooltip && <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }} />}
          {showLegend && <Legend wrapperStyle={{ fontSize: '12px' }} />}
          {yKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index % colors.length]}
              stackId={stacked ? 'stack' : undefined}
              barSize={barSize}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

BarChart.displayName = 'BarChart'

/**
 * Area chart props
 */
export interface AreaChartProps extends BaseChartProps {
  /** X-axis data key */
  xKey: string
  /** Y-axis data key(s) */
  yKeys: string[]
  /** Area colors (maps to yKeys) */
  colors?: string[]
  /** Stack areas */
  stacked?: boolean
  /** Smooth curve */
  smooth?: boolean
}

/**
 * AreaChart Component
 */
export function AreaChart({
  data,
  xKey,
  yKeys,
  colors = CHART_COLOR_PALETTE,
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  stacked = false,
  smooth = true,
  className = '',
}: AreaChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          <XAxis dataKey={xKey} stroke="#6b7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
          {showTooltip && <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }} />}
          {showLegend && <Legend wrapperStyle={{ fontSize: '12px' }} />}
          {yKeys.map((key, index) => (
            <Area
              key={key}
              type={smooth ? 'monotone' : 'linear'}
              dataKey={key}
              fill={colors[index % colors.length]}
              stroke={colors[index % colors.length]}
              fillOpacity={0.6}
              stackId={stacked ? 'stack' : undefined}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}

AreaChart.displayName = 'AreaChart'

/**
 * Pie chart data point
 */
export interface PieChartDataPoint {
  name: string
  value: number
}

/**
 * Pie chart props
 */
export interface PieChartProps {
  /** Chart data */
  data: PieChartDataPoint[]
  /** Chart height in pixels */
  height?: number
  /** Slice colors */
  colors?: string[]
  /** Show labels */
  showLabels?: boolean
  /** Show legend */
  showLegend?: boolean
  /** Inner radius (for donut chart) */
  innerRadius?: number
  /** Outer radius */
  outerRadius?: number
  /** Custom className */
  className?: string
}

/**
 * PieChart Component
 */
export function PieChart({
  data,
  height = 300,
  colors = CHART_COLOR_PALETTE,
  showLabels = true,
  showLegend = true,
  innerRadius = 0,
  outerRadius = 80,
  className = '',
}: PieChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey="value"
            label={showLabels}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          {showLegend && <Legend wrapperStyle={{ fontSize: '12px' }} />}
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

PieChart.displayName = 'PieChart'

/**
 * DonutChart Component
 *
 * Pie chart with inner radius (donut shape).
 */
export function DonutChart(props: Omit<PieChartProps, 'innerRadius'>) {
  return <PieChart {...props} innerRadius={60} />
}

DonutChart.displayName = 'DonutChart'
