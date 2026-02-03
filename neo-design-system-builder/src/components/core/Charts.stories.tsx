import type { Meta, StoryObj } from '@storybook/react'
import { LineChart, BarChart, AreaChart, PieChart, DonutChart, CHART_COLORS } from './Charts'

const salesData = [
  { month: 'Jan', sales: 4000, revenue: 2400, profit: 1600 },
  { month: 'Feb', sales: 3000, revenue: 1398, profit: 900 },
  { month: 'Mar', sales: 2000, revenue: 9800, profit: 6500 },
  { month: 'Apr', sales: 2780, revenue: 3908, profit: 2200 },
  { month: 'May', sales: 1890, revenue: 4800, profit: 3100 },
  { month: 'Jun', sales: 2390, revenue: 3800, profit: 2500 },
  { month: 'Jul', sales: 3490, revenue: 4300, profit: 2800 },
]

const categoryData = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Food', value: 200 },
  { name: 'Books', value: 150 },
  { name: 'Other', value: 100 },
]

const meta: Meta<typeof LineChart> = {
  title: 'Phase 3/Data/Charts',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

type LineStory = StoryObj<typeof LineChart>
type BarStory = StoryObj<typeof BarChart>
type AreaStory = StoryObj<typeof AreaChart>
type PieStory = StoryObj<typeof PieChart>

export const Line: LineStory = {
  render: () => (
    <LineChart
      data={salesData}
      xKey="month"
      yKeys={['sales', 'revenue']}
      colors={[CHART_COLORS.primary, CHART_COLORS.success]}
      smooth
      height={400}
    />
  ),
}

export const LineMultiple: LineStory = {
  render: () => (
    <LineChart
      data={salesData}
      xKey="month"
      yKeys={['sales', 'revenue', 'profit']}
      colors={[CHART_COLORS.primary, CHART_COLORS.success, CHART_COLORS.warning]}
      smooth
      showDots
      height={400}
    />
  ),
}

export const Bar: BarStory = {
  render: () => (
    <BarChart
      data={salesData}
      xKey="month"
      yKeys={['sales', 'revenue']}
      colors={[CHART_COLORS.primary, CHART_COLORS.secondary]}
      height={400}
    />
  ),
}

export const BarStacked: BarStory = {
  render: () => (
    <BarChart
      data={salesData}
      xKey="month"
      yKeys={['sales', 'revenue', 'profit']}
      colors={[CHART_COLORS.primary, CHART_COLORS.success, CHART_COLORS.warning]}
      stacked
      height={400}
    />
  ),
}

export const Area: AreaStory = {
  render: () => (
    <AreaChart
      data={salesData}
      xKey="month"
      yKeys={['sales', 'revenue']}
      colors={[CHART_COLORS.primary, CHART_COLORS.success]}
      smooth
      height={400}
    />
  ),
}

export const AreaStacked: AreaStory = {
  render: () => (
    <AreaChart
      data={salesData}
      xKey="month"
      yKeys={['sales', 'revenue', 'profit']}
      colors={[CHART_COLORS.primary, CHART_COLORS.success, CHART_COLORS.warning]}
      stacked
      smooth
      height={400}
    />
  ),
}

export const Pie: PieStory = {
  render: () => (
    <PieChart
      data={categoryData}
      height={400}
      showLabels
      showLegend
    />
  ),
}

export const Donut: PieStory = {
  render: () => (
    <DonutChart
      data={categoryData}
      height={400}
      showLabels
      showLegend
    />
  ),
}

export const ChartsGrid: LineStory = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Line Chart</h3>
        <LineChart
          data={salesData}
          xKey="month"
          yKeys={['sales']}
          colors={[CHART_COLORS.primary]}
          smooth
          height={300}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Bar Chart</h3>
        <BarChart
          data={salesData}
          xKey="month"
          yKeys={['revenue']}
          colors={[CHART_COLORS.success]}
          height={300}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Area Chart</h3>
        <AreaChart
          data={salesData}
          xKey="month"
          yKeys={['profit']}
          colors={[CHART_COLORS.warning]}
          smooth
          height={300}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Pie Chart</h3>
        <PieChart
          data={categoryData}
          height={300}
          showLegend
        />
      </div>
    </div>
  ),
}
