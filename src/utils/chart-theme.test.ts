import { describe, it, expect } from "vitest";
import {
  chartColors,
  chartThemeDark,
  chartThemeLight,
  chartTheme,
  type ChartTheme,
} from "./chart-theme";

describe("chart-theme", () => {
  it("exports 10 chart colors", () => {
    expect(chartColors).toHaveLength(10);
  });

  it("all chart colors are valid hex strings", () => {
    chartColors.forEach((color) => {
      expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  it("chartThemeDark has required properties", () => {
    expect(chartThemeDark.axis).toBeDefined();
    expect(chartThemeDark.grid).toBeDefined();
    expect(chartThemeDark.tooltip).toBeDefined();
    expect(chartThemeDark.legend).toBeDefined();
    expect(chartThemeDark.background).toBeDefined();
    expect(chartThemeDark.text).toBeDefined();
  });

  it("chartThemeLight has required properties", () => {
    expect(chartThemeLight.axis).toBeDefined();
    expect(chartThemeLight.grid).toBeDefined();
    expect(chartThemeLight.tooltip).toBeDefined();
    expect(chartThemeLight.legend).toBeDefined();
    expect(chartThemeLight.background).toBeDefined();
    expect(chartThemeLight.text).toBeDefined();
  });

  it("dark and light themes have different backgrounds", () => {
    expect(chartThemeDark.background).not.toBe(chartThemeLight.background);
  });

  it("dark and light themes have different text colors", () => {
    expect(chartThemeDark.text).not.toBe(chartThemeLight.text);
  });

  it("default chartTheme equals dark theme", () => {
    expect(chartTheme).toBe(chartThemeDark);
  });

  it("ChartTheme type is assignable", () => {
    const theme: ChartTheme = chartThemeDark;
    expect(theme).toBeDefined();
  });

  it("tooltip has proper styling structure", () => {
    expect(chartThemeDark.tooltip.contentStyle).toHaveProperty("backgroundColor");
    expect(chartThemeDark.tooltip.contentStyle).toHaveProperty("border");
    expect(chartThemeDark.tooltip.contentStyle).toHaveProperty("borderRadius");
    expect(chartThemeDark.tooltip.contentStyle).toHaveProperty("color");
  });
});
