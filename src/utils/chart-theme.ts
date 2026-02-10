/**
 * Synkra DS - Chart Theme Configuration
 *
 * Provides design-token-based theming for chart libraries (Recharts, Chart.js, etc.)
 * Uses CSS custom properties from palette-extended.css for consistency.
 *
 * Usage with Recharts:
 * ```tsx
 * import { chartTheme, chartColors } from "synkra-ds/utils/chart-theme";
 *
 * <BarChart data={data}>
 *   <Bar dataKey="value" fill={chartColors[0]} />
 *   <XAxis {...chartTheme.axis} />
 *   <Tooltip {...chartTheme.tooltip} />
 * </BarChart>
 * ```
 */

/** 10-color palette optimized for data visualization (from --chart-* tokens) */
export const chartColors = [
  "#1ea5fc", // chart-1: blue
  "#D4AF37", // chart-2: gold (brand)
  "#22C55E", // chart-3: green
  "#8962f8", // chart-4: purple
  "#fc4e12", // chart-5: orange
  "#fb0049", // chart-6: hibiscus
  "#91cec2", // chart-7: turquoise
  "#f7f6af", // chart-8: mellow yellow
  "#a990dd", // chart-9: lilac
  "#fd820b", // chart-10: light orange
] as const;

/** Dark theme configuration for chart components */
export const chartThemeDark = {
  axis: {
    stroke: "rgba(255, 255, 255, 0.1)",
    tick: { fill: "#A1A1AA", fontSize: 12 },
    tickLine: { stroke: "rgba(255, 255, 255, 0.1)" },
  },
  grid: {
    stroke: "rgba(255, 255, 255, 0.05)",
    strokeDasharray: "3 3",
  },
  tooltip: {
    contentStyle: {
      backgroundColor: "#111116",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "8px",
      color: "#FFFFFF",
      fontSize: "14px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
    cursor: { fill: "rgba(212, 175, 55, 0.1)" },
  },
  legend: {
    wrapperStyle: { color: "#A1A1AA", fontSize: "12px" },
  },
  background: "#0A0A0F",
  text: "#FFFFFF",
  textSecondary: "#A1A1AA",
  textMuted: "#71717A",
} as const;

/** Light theme configuration for chart components */
export const chartThemeLight = {
  axis: {
    stroke: "rgba(0, 0, 0, 0.1)",
    tick: { fill: "#4B5563", fontSize: 12 },
    tickLine: { stroke: "rgba(0, 0, 0, 0.1)" },
  },
  grid: {
    stroke: "rgba(0, 0, 0, 0.05)",
    strokeDasharray: "3 3",
  },
  tooltip: {
    contentStyle: {
      backgroundColor: "#F9FAFB",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      color: "#111827",
      fontSize: "14px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
    cursor: { fill: "rgba(184, 150, 46, 0.1)" },
  },
  legend: {
    wrapperStyle: { color: "#4B5563", fontSize: "12px" },
  },
  background: "#FFFFFF",
  text: "#111827",
  textSecondary: "#4B5563",
  textMuted: "#9CA3AF",
} as const;

/** Default chart theme (dark) */
export const chartTheme = chartThemeDark;

export type ChartTheme = typeof chartThemeDark;
