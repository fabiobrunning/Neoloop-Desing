# ChartConfig

Chart theme utilities and color palette for data visualization. Works with any chart library (Recharts, Chart.js, Nivo, etc.).

## Import

```tsx
import {
  CHART_COLORS,
  CHART_COLORS_HEX,
  chartThemeDark,
  chartThemeLight,
  getChartColor,
  getChartColorScale,
} from "synkra-ds";
```

## Color Palette

10 optimized colors for data visualization:

| Token | Hex | Usage |
|-------|-----|-------|
| `--chart-1` | `#1ea5fc` | Blue (primary data) |
| `--chart-2` | `#D4AF37` | Gold (brand accent) |
| `--chart-3` | `#22C55E` | Green (success/growth) |
| `--chart-4` | `#8962f8` | Purple (secondary) |
| `--chart-5` | `#fc4e12` | Orange (warning) |
| `--chart-6` | `#fb0049` | Red (error/decline) |
| `--chart-7` | `#91cec2` | Teal (tertiary) |
| `--chart-8` | `#f7f6af` | Yellow (highlight) |
| `--chart-9` | `#a990dd` | Lilac (quaternary) |
| `--chart-10` | `#fd820b` | Amber (extra) |

## Chart Theme

```tsx
const theme: ChartTheme = {
  colors: string[];
  background: string;
  text: string;
  textMuted: string;
  grid: string;
  tooltip: {
    background: string;
    border: string;
    text: string;
  };
};
```

## Usage with Recharts

```tsx
import { getChartColorScale, chartThemeDark } from "synkra-ds";

const colors = getChartColorScale(data.length);

<BarChart data={data}>
  {data.map((_, i) => (
    <Bar key={i} fill={colors[i]} />
  ))}
</BarChart>
```

## Utilities

| Function | Description |
|----------|-------------|
| `getChartColor(index)` | Get color by index (wraps at 10) |
| `getChartColorScale(count)` | Generate array of N colors |
