/**
 * Synkra DS - Chart Configuration
 * Provides chart color palette and theme utilities based on design tokens.
 * Works with any chart library (Recharts, Chart.js, Nivo, etc.)
 */

export const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--chart-8)",
  "var(--chart-9)",
  "var(--chart-10)",
] as const;

export const CHART_COLORS_HEX = {
  chart1: "#1ea5fc",
  chart2: "#2B4BEE",
  chart3: "#22C55E",
  chart4: "#8962f8",
  chart5: "#fc4e12",
  chart6: "#fb0049",
  chart7: "#91cec2",
  chart8: "#f7f6af",
  chart9: "#a990dd",
  chart10: "#fd820b",
} as const;

export interface ChartTheme {
  colors: readonly string[];
  background: string;
  text: string;
  textMuted: string;
  grid: string;
  tooltip: {
    background: string;
    border: string;
    text: string;
  };
}

/** Dark theme chart configuration (default) */
export const chartThemeDark: ChartTheme = {
  colors: [...CHART_COLORS],
  background: "var(--color-bg-base)",
  text: "var(--color-text-primary)",
  textMuted: "var(--color-text-muted)",
  grid: "var(--color-border-subtle)",
  tooltip: {
    background: "var(--color-bg-elevated)",
    border: "var(--color-border)",
    text: "var(--color-text-primary)",
  },
};

/** Light theme chart configuration */
export const chartThemeLight: ChartTheme = {
  colors: [...CHART_COLORS],
  background: "var(--color-bg-base)",
  text: "var(--color-text-primary)",
  textMuted: "var(--color-text-muted)",
  grid: "var(--color-border-subtle)",
  tooltip: {
    background: "var(--color-bg-elevated)",
    border: "var(--color-border)",
    text: "var(--color-text-primary)",
  },
};

/**
 * Get a chart color by index (wraps around if index > 10)
 */
export function getChartColor(index: number): string {
  return CHART_COLORS[index % CHART_COLORS.length];
}

/**
 * Generate a Recharts-compatible color array for a given number of data points
 */
export function getChartColorScale(count: number): string[] {
  return Array.from({ length: count }, (_, i) => getChartColor(i));
}
