import { describe, it, expect } from "vitest";
import {
  CHART_COLORS,
  CHART_COLORS_HEX,
  chartThemeDark,
  chartThemeLight,
  getChartColor,
  getChartColorScale,
} from "./chart-config";

describe("ChartConfig", () => {
  it("exports 10 chart CSS variable colors", () => {
    expect(CHART_COLORS).toHaveLength(10);
    expect(CHART_COLORS[0]).toBe("var(--chart-1)");
    expect(CHART_COLORS[9]).toBe("var(--chart-10)");
  });

  it("exports hex color map with 10 entries", () => {
    expect(Object.keys(CHART_COLORS_HEX)).toHaveLength(10);
    expect(CHART_COLORS_HEX.chart1).toBe("#1ea5fc");
    expect(CHART_COLORS_HEX.chart10).toBe("#fd820b");
  });

  it("dark theme has required properties", () => {
    expect(chartThemeDark.colors).toHaveLength(10);
    expect(chartThemeDark.background).toBeDefined();
    expect(chartThemeDark.text).toBeDefined();
    expect(chartThemeDark.grid).toBeDefined();
    expect(chartThemeDark.tooltip.background).toBeDefined();
    expect(chartThemeDark.tooltip.border).toBeDefined();
    expect(chartThemeDark.tooltip.text).toBeDefined();
  });

  it("light theme has required properties", () => {
    expect(chartThemeLight.colors).toHaveLength(10);
    expect(chartThemeLight.tooltip).toBeDefined();
  });

  it("getChartColor returns correct color by index", () => {
    expect(getChartColor(0)).toBe("var(--chart-1)");
    expect(getChartColor(4)).toBe("var(--chart-5)");
  });

  it("getChartColor wraps around for index > 9", () => {
    expect(getChartColor(10)).toBe("var(--chart-1)");
    expect(getChartColor(13)).toBe("var(--chart-4)");
  });

  it("getChartColorScale returns correct number of colors", () => {
    const scale3 = getChartColorScale(3);
    expect(scale3).toHaveLength(3);
    expect(scale3[0]).toBe("var(--chart-1)");
    expect(scale3[2]).toBe("var(--chart-3)");
  });

  it("getChartColorScale wraps for count > 10", () => {
    const scale12 = getChartColorScale(12);
    expect(scale12).toHaveLength(12);
    expect(scale12[10]).toBe("var(--chart-1)");
  });
});
