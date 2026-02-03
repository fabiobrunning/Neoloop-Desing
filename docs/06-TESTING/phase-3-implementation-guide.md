# Phase 3 Testing - Implementation Guide

**Document Version:** 1.0.0
**Date:** 2026-01-31
**Project:** Neoloop Design System Builder
**Author:** QA Agent (Astrid)
**Status:** Active

---

## Table of Contents

1. [Setup & Configuration](#1-setup--configuration)
2. [Test File Templates](#2-test-file-templates)
3. [Mock Data & Utilities](#3-mock-data--utilities)
4. [Performance Testing Setup](#4-performance-testing-setup)
5. [Accessibility Testing Setup](#5-accessibility-testing-setup)
6. [CI/CD Integration](#6-cicd-integration)
7. [Execution Instructions](#7-execution-instructions)

---

## 1. Setup & Configuration

### 1.1 Install Dependencies

```bash
npm install --save-dev \
  @testing-library/react@^16.0.0 \
  @testing-library/user-event@^14.5.0 \
  @testing-library/jest-dom@^6.5.0 \
  @axe-core/react@^4.10.0 \
  jest-axe@^9.0.0 \
  vitest@^2.0.0 \
  @vitest/ui@^2.0.0 \
  @vitest/coverage-v8@^2.0.0 \
  happy-dom@^15.0.0
```

### 1.2 Vitest Configuration

```typescript
// vitest.config.phase3.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    name: 'phase-3',
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./tests/setup/phase3-setup.ts'],
    include: [
      'src/components/{Table,List,Charts,Toast,Alert,Dialog}/**/*.test.{ts,tsx}',
      'tests/integration/phase3/**/*.test.{ts,tsx}',
      'tests/performance/phase3/**/*.test.{ts,tsx}'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: [
        'src/components/Table/**/*.{ts,tsx}',
        'src/components/List/**/*.{ts,tsx}',
        'src/components/Charts/**/*.{ts,tsx}',
        'src/components/Toast/**/*.{ts,tsx}',
        'src/components/Alert/**/*.{ts,tsx}',
        'src/components/Dialog/**/*.{ts,tsx}'
      ],
      exclude: [
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/__tests__/**',
        '**/*.d.ts'
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 90,
        statements: 100
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@tests': path.resolve(__dirname, './tests')
    }
  }
});
```

### 1.3 Test Setup File

```typescript
// tests/setup/phase3-setup.ts
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';

// Extend Vitest matchers
expect.extend(toHaveNoViolations);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  }),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

// Mock performance.now with high precision
if (!global.performance) {
  global.performance = {} as any;
}
global.performance.now = () => Date.now();
```

---

## 2. Test File Templates

### 2.1 Table Component Test Template

```typescript
// src/components/Table/Table.test.tsx
import { describe, test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Table } from './Table';
import { mockTableData } from '@tests/mocks/table-data';

describe('Table Component', () => {
  describe('Core Rendering', () => {
    test('renders empty table with headers', () => {
      const { columns } = mockTableData(0);
      render(<Table columns={columns} data={[]} />);

      columns.forEach(col => {
        expect(screen.getByText(col.label)).toBeInTheDocument();
      });
      expect(screen.queryByRole('row', { name: /row-/ })).not.toBeInTheDocument();
    });

    test('renders table with data rows', () => {
      const { columns, data } = mockTableData(10);
      render(<Table columns={columns} data={data} />);

      expect(screen.getAllByRole('row')).toHaveLength(11); // 1 header + 10 data rows
    });

    test('renders column headers correctly', () => {
      const { columns, data } = mockTableData(5);
      render(<Table columns={columns} data={data} />);

      const headers = screen.getAllByRole('columnheader');
      expect(headers).toHaveLength(columns.length);
    });

    test('applies column alignment', () => {
      const columns = [
        { id: 'left', label: 'Left', align: 'left' },
        { id: 'center', label: 'Center', align: 'center' },
        { id: 'right', label: 'Right', align: 'right' }
      ];
      const data = [{ id: 1, left: 'A', center: 'B', right: 'C' }];

      render(<Table columns={columns} data={data} />);

      const cells = screen.getAllByRole('cell');
      expect(cells[0]).toHaveStyle({ textAlign: 'left' });
      expect(cells[1]).toHaveStyle({ textAlign: 'center' });
      expect(cells[2]).toHaveStyle({ textAlign: 'right' });
    });

    test('renders with fixed layout', () => {
      const { columns, data } = mockTableData(5);
      const { container } = render(
        <Table columns={columns} data={data} layout="fixed" />
      );

      const table = container.querySelector('table');
      expect(table).toHaveStyle({ tableLayout: 'fixed' });
    });

    test('applies striped row styling', () => {
      const { columns, data } = mockTableData(3);
      render(<Table columns={columns} data={data} striped />);

      const rows = screen.getAllByRole('row').slice(1); // Skip header
      expect(rows[0]).toHaveClass(/striped/);
      expect(rows[1]).toHaveClass(/striped/);
    });

    test('shows loading skeleton', () => {
      const { columns } = mockTableData(0);
      render(<Table columns={columns} data={[]} loading />);

      expect(screen.getByTestId('table-skeleton')).toBeInTheDocument();
    });

    test('renders sticky header', () => {
      const { columns, data } = mockTableData(10);
      const { container } = render(
        <Table columns={columns} data={data} stickyHeader />
      );

      const thead = container.querySelector('thead');
      expect(thead).toHaveStyle({ position: 'sticky' });
    });

    test('handles empty data array', () => {
      const { columns } = mockTableData(0);
      render(<Table columns={columns} data={[]} />);

      expect(screen.getByText(/no data/i)).toBeInTheDocument();
    });

    test('renders custom cell components', () => {
      const columns = [
        {
          id: 'custom',
          label: 'Custom',
          render: (value: any) => <span data-testid="custom-cell">{value}</span>
        }
      ];
      const data = [{ id: 1, custom: 'Test' }];

      render(<Table columns={columns} data={data} />);
      expect(screen.getByTestId('custom-cell')).toHaveTextContent('Test');
    });
  });

  describe('Sorting', () => {
    test('sorts string column ascending', async () => {
      const user = userEvent.setup();
      const { columns, data } = mockTableData(5);
      const onSort = vi.fn();

      render(<Table columns={columns} data={data} onSort={onSort} />);

      const nameHeader = screen.getByText('Name');
      await user.click(nameHeader);

      expect(onSort).toHaveBeenCalledWith({
        column: 'name',
        direction: 'asc'
      });
    });

    test('sorts string column descending', async () => {
      const user = userEvent.setup();
      const { columns, data } = mockTableData(5);
      const onSort = vi.fn();

      render(
        <Table
          columns={columns}
          data={data}
          onSort={onSort}
          sortState={{ column: 'name', direction: 'asc' }}
        />
      );

      const nameHeader = screen.getByText('Name');
      await user.click(nameHeader);

      expect(onSort).toHaveBeenCalledWith({
        column: 'name',
        direction: 'desc'
      });
    });

    test('sorts number column ascending', async () => {
      const user = userEvent.setup();
      const columns = [
        { id: 'value', label: 'Value', sortable: true, type: 'number' }
      ];
      const data = [
        { id: 1, value: 30 },
        { id: 2, value: 10 },
        { id: 3, value: 20 }
      ];

      render(<Table columns={columns} data={data} />);

      const valueHeader = screen.getByText('Value');
      await user.click(valueHeader);

      // Verify sorted order in DOM
      const cells = screen.getAllByRole('cell');
      expect(cells[0]).toHaveTextContent('10');
      expect(cells[1]).toHaveTextContent('20');
      expect(cells[2]).toHaveTextContent('30');
    });

    test('handles null values in sort', async () => {
      const user = userEvent.setup();
      const columns = [{ id: 'name', label: 'Name', sortable: true }];
      const data = [
        { id: 1, name: 'Alice' },
        { id: 2, name: null },
        { id: 3, name: 'Bob' }
      ];

      render(<Table columns={columns} data={data} />);

      const nameHeader = screen.getByText('Name');
      await user.click(nameHeader);

      // Nulls should appear last
      const cells = screen.getAllByRole('cell');
      expect(cells[cells.length - 1]).toHaveTextContent('');
    });

    test('updates sort indicator icons', async () => {
      const user = userEvent.setup();
      const { columns, data } = mockTableData(5);

      render(<Table columns={columns} data={data} />);

      const nameHeader = screen.getByText('Name');
      await user.click(nameHeader);

      expect(screen.getByTestId('sort-asc-icon')).toBeInTheDocument();

      await user.click(nameHeader);
      expect(screen.getByTestId('sort-desc-icon')).toBeInTheDocument();
    });

    test('clears sort on third click', async () => {
      const user = userEvent.setup();
      const { columns, data } = mockTableData(5);
      const onSort = vi.fn();

      render(
        <Table
          columns={columns}
          data={data}
          onSort={onSort}
          sortState={{ column: 'name', direction: 'desc' }}
        />
      );

      const nameHeader = screen.getByText('Name');
      await user.click(nameHeader);

      expect(onSort).toHaveBeenCalledWith(null);
    });

    test('sorts with locale awareness', async () => {
      const columns = [{ id: 'name', label: 'Name', sortable: true }];
      const data = [
        { id: 1, name: 'Österreich' },
        { id: 2, name: 'Zebra' },
        { id: 3, name: 'Äpfel' }
      ];

      render(<Table columns={columns} data={data} locale="de-DE" />);

      const nameHeader = screen.getByText('Name');
      await userEvent.click(nameHeader);

      // Should sort with German locale rules
      const cells = screen.getAllByRole('cell');
      expect(cells[0]).toHaveTextContent('Äpfel');
    });
  });

  describe('Pagination', () => {
    test('renders pagination controls', () => {
      const { columns, data } = mockTableData(50);
      render(
        <Table
          columns={columns}
          data={data}
          pagination={{ pageSize: 10 }}
        />
      );

      expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument();
      expect(screen.getByText(/page 1 of 5/i)).toBeInTheDocument();
    });

    test('navigates to next page', async () => {
      const user = userEvent.setup();
      const { columns, data } = mockTableData(50);
      const onPageChange = vi.fn();

      render(
        <Table
          columns={columns}
          data={data}
          pagination={{ pageSize: 10, page: 1, onPageChange }}
        />
      );

      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    test('disables previous on first page', () => {
      const { columns, data } = mockTableData(50);
      render(
        <Table
          columns={columns}
          data={data}
          pagination={{ pageSize: 10, page: 1 }}
        />
      );

      const prevButton = screen.getByRole('button', { name: /previous/i });
      expect(prevButton).toBeDisabled();
    });

    test('disables next on last page', () => {
      const { columns, data } = mockTableData(50);
      render(
        <Table
          columns={columns}
          data={data}
          pagination={{ pageSize: 10, page: 5 }}
        />
      );

      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).toBeDisabled();
    });

    test('changes page size', async () => {
      const user = userEvent.setup();
      const { columns, data } = mockTableData(50);
      const onPageSizeChange = vi.fn();

      render(
        <Table
          columns={columns}
          data={data}
          pagination={{
            pageSize: 10,
            page: 1,
            onPageSizeChange
          }}
        />
      );

      const pageSizeSelect = screen.getByRole('combobox', { name: /items per page/i });
      await user.selectOptions(pageSizeSelect, '25');

      expect(onPageSizeChange).toHaveBeenCalledWith(25);
    });

    test('resets to page 1 on page size change', async () => {
      const user = userEvent.setup();
      const { columns, data } = mockTableData(50);
      const onPageChange = vi.fn();

      render(
        <Table
          columns={columns}
          data={data}
          pagination={{
            pageSize: 10,
            page: 3,
            onPageChange
          }}
        />
      );

      const pageSizeSelect = screen.getByRole('combobox', { name: /items per page/i });
      await user.selectOptions(pageSizeSelect, '25');

      expect(onPageChange).toHaveBeenCalledWith(1);
    });
  });

  describe('Selection', () => {
    test('selects row on click', async () => {
      const user = userEvent.setup();
      const { columns, data } = mockTableData(5);
      const onSelectionChange = vi.fn();

      render(
        <Table
          columns={columns}
          data={data}
          selectable
          onSelectionChange={onSelectionChange}
        />
      );

      const firstRow = screen.getAllByRole('row')[1]; // Skip header
      await user.click(firstRow);

      expect(onSelectionChange).toHaveBeenCalledWith([data[0].id]);
    });

    test('shows selected row styling', async () => {
      const user = userEvent.setup();
      const { columns, data } = mockTableData(5);

      render(<Table columns={columns} data={data} selectable />);

      const firstRow = screen.getAllByRole('row')[1];
      await user.click(firstRow);

      expect(firstRow).toHaveClass(/selected/);
    });

    test('selects multiple rows with Ctrl+Click', async () => {
      const user = userEvent.setup();
      const { columns, data } = mockTableData(5);
      const onSelectionChange = vi.fn();

      render(
        <Table
          columns={columns}
          data={data}
          selectable
          selectionMode="multiple"
          onSelectionChange={onSelectionChange}
        />
      );

      const rows = screen.getAllByRole('row').slice(1);
      await user.click(rows[0]);
      await user.keyboard('{Control>}');
      await user.click(rows[1]);
      await user.keyboard('{/Control}');

      expect(onSelectionChange).toHaveBeenLastCalledWith([data[0].id, data[1].id]);
    });

    test('selects range with Shift+Click', async () => {
      const user = userEvent.setup();
      const { columns, data } = mockTableData(5);
      const onSelectionChange = vi.fn();

      render(
        <Table
          columns={columns}
          data={data}
          selectable
          selectionMode="multiple"
          onSelectionChange={onSelectionChange}
        />
      );

      const rows = screen.getAllByRole('row').slice(1);
      await user.click(rows[0]);
      await user.keyboard('{Shift>}');
      await user.click(rows[2]);
      await user.keyboard('{/Shift}');

      expect(onSelectionChange).toHaveBeenLastCalledWith([
        data[0].id,
        data[1].id,
        data[2].id
      ]);
    });

    test('selects all with header checkbox', async () => {
      const user = userEvent.setup();
      const { columns, data } = mockTableData(5);
      const onSelectionChange = vi.fn();

      render(
        <Table
          columns={columns}
          data={data}
          selectable
          selectionMode="multiple"
          onSelectionChange={onSelectionChange}
        />
      );

      const selectAllCheckbox = screen.getByRole('checkbox', { name: /select all/i });
      await user.click(selectAllCheckbox);

      expect(onSelectionChange).toHaveBeenCalledWith(data.map(d => d.id));
    });

    test('shows indeterminate state when partial selection', async () => {
      const user = userEvent.setup();
      const { columns, data } = mockTableData(5);

      render(
        <Table
          columns={columns}
          data={data}
          selectable
          selectionMode="multiple"
          selectedRows={[data[0].id, data[1].id]}
        />
      );

      const selectAllCheckbox = screen.getByRole('checkbox', { name: /select all/i });
      expect(selectAllCheckbox).toHaveAttribute('data-indeterminate', 'true');
    });
  });

  describe('Performance', () => {
    test('renders 1000 rows under 500ms', async () => {
      const { columns, data } = mockTableData(1000);

      const start = performance.now();
      render(<Table columns={columns} data={data} />);
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(500);
    });

    test('sorts 1000 rows under 100ms', async () => {
      const user = userEvent.setup();
      const { columns, data } = mockTableData(1000);

      render(<Table columns={columns} data={data} />);

      const nameHeader = screen.getByText('Name');

      const start = performance.now();
      await user.click(nameHeader);
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(100);
    });

    test('uses virtualization for large datasets', () => {
      const { columns, data } = mockTableData(10000);
      const { container } = render(
        <Table columns={columns} data={data} virtualized />
      );

      const visibleRows = container.querySelectorAll('tbody tr');
      expect(visibleRows.length).toBeLessThan(100); // Only renders visible rows
    });
  });

  describe('Accessibility', () => {
    test('has role="table"', () => {
      const { columns, data } = mockTableData(5);
      const { container } = render(<Table columns={columns} data={data} />);

      const table = container.querySelector('table');
      expect(table).toHaveAttribute('role', 'table');
    });

    test('headers have role="columnheader"', () => {
      const { columns, data } = mockTableData(5);
      render(<Table columns={columns} data={data} />);

      const headers = screen.getAllByRole('columnheader');
      expect(headers).toHaveLength(columns.length);
    });

    test('sortable columns have aria-sort', () => {
      const { columns, data } = mockTableData(5);
      render(
        <Table
          columns={columns}
          data={data}
          sortState={{ column: 'name', direction: 'asc' }}
        />
      );

      const nameHeader = screen.getByRole('columnheader', { name: /name/i });
      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
    });

    test('selected rows have aria-selected', async () => {
      const user = userEvent.setup();
      const { columns, data } = mockTableData(5);

      render(<Table columns={columns} data={data} selectable />);

      const firstRow = screen.getAllByRole('row')[1];
      await user.click(firstRow);

      expect(firstRow).toHaveAttribute('aria-selected', 'true');
    });

    test('keyboard navigation with arrows', async () => {
      const user = userEvent.setup();
      const { columns, data } = mockTableData(5);

      render(<Table columns={columns} data={data} />);

      const firstCell = screen.getAllByRole('cell')[0];
      firstCell.focus();

      await user.keyboard('{ArrowDown}');
      const secondRowFirstCell = screen.getAllByRole('cell')[columns.length];
      expect(secondRowFirstCell).toHaveFocus();
    });

    test('no axe violations', async () => {
      const { columns, data } = mockTableData(5);
      const { container } = render(<Table columns={columns} data={data} />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
```

### 2.2 Charts Test Template

```typescript
// src/components/Charts/LineChart/LineChart.test.tsx
import { describe, test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LineChart } from './LineChart';
import { mockChartData } from '@tests/mocks/chart-data';

describe('LineChart Component', () => {
  describe('Rendering', () => {
    test('renders empty state', () => {
      render(<LineChart data={[]} />);
      expect(screen.getByText(/no data/i)).toBeInTheDocument();
    });

    test('renders with single data series', () => {
      const data = mockChartData({ series: 1, points: 10 });
      const { container } = render(<LineChart data={data} />);

      const paths = container.querySelectorAll('path.line');
      expect(paths).toHaveLength(1);
    });

    test('renders with multiple data series', () => {
      const data = mockChartData({ series: 3, points: 10 });
      const { container } = render(<LineChart data={data} />);

      const paths = container.querySelectorAll('path.line');
      expect(paths).toHaveLength(3);
    });

    test('renders axes', () => {
      const data = mockChartData({ series: 1, points: 10 });
      const { container } = render(<LineChart data={data} />);

      expect(container.querySelector('.x-axis')).toBeInTheDocument();
      expect(container.querySelector('.y-axis')).toBeInTheDocument();
    });

    test('renders legend', () => {
      const data = mockChartData({ series: 2, points: 10 });
      render(<LineChart data={data} showLegend />);

      expect(screen.getByRole('list', { name: /legend/i })).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    test('hover shows tooltip', async () => {
      const user = userEvent.setup();
      const data = mockChartData({ series: 1, points: 10 });
      const { container } = render(<LineChart data={data} />);

      const dataPoint = container.querySelector('circle.data-point');
      await user.hover(dataPoint!);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    test('click selects data point', async () => {
      const user = userEvent.setup();
      const data = mockChartData({ series: 1, points: 10 });
      const onDataPointClick = vi.fn();

      const { container } = render(
        <LineChart data={data} onDataPointClick={onDataPointClick} />
      );

      const dataPoint = container.querySelector('circle.data-point');
      await user.click(dataPoint!);

      expect(onDataPointClick).toHaveBeenCalled();
    });

    test('legend toggle series', async () => {
      const user = userEvent.setup();
      const data = mockChartData({ series: 2, points: 10 });

      render(<LineChart data={data} showLegend />);

      const legendItems = screen.getAllByRole('listitem');
      await user.click(legendItems[0]);

      // First series should be hidden
      expect(legendItems[0]).toHaveClass(/disabled/);
    });

    test('zoom in on data', async () => {
      const user = userEvent.setup();
      const data = mockChartData({ series: 1, points: 100 });
      const onZoom = vi.fn();

      const { container } = render(
        <LineChart data={data} zoomable onZoom={onZoom} />
      );

      const chart = container.querySelector('.chart-area');

      // Simulate zoom gesture
      await user.pointer([
        { keys: '[MouseLeft>]', target: chart, coords: { x: 100, y: 100 } },
        { coords: { x: 200, y: 200 } },
        { keys: '[/MouseLeft]' }
      ]);

      expect(onZoom).toHaveBeenCalled();
    });
  });

  describe('Data handling', () => {
    test('handles positive values', () => {
      const data = {
        labels: ['A', 'B', 'C'],
        datasets: [{ label: 'Series 1', data: [10, 20, 30] }]
      };

      const { container } = render(<LineChart data={data} />);
      const path = container.querySelector('path.line');
      expect(path).toBeInTheDocument();
    });

    test('handles negative values', () => {
      const data = {
        labels: ['A', 'B', 'C'],
        datasets: [{ label: 'Series 1', data: [-10, -20, -30] }]
      };

      const { container } = render(<LineChart data={data} />);
      const path = container.querySelector('path.line');
      expect(path).toBeInTheDocument();
    });

    test('handles null values', () => {
      const data = {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [{ label: 'Series 1', data: [10, null, 30, 40] }]
      };

      const { container } = render(<LineChart data={data} />);

      // Line should have gap at null value
      const paths = container.querySelectorAll('path.line-segment');
      expect(paths.length).toBeGreaterThan(1);
    });

    test('updates on data change', async () => {
      const data1 = mockChartData({ series: 1, points: 5 });
      const { rerender, container } = render(<LineChart data={data1} />);

      const initialPath = container.querySelector('path.line')?.getAttribute('d');

      const data2 = mockChartData({ series: 1, points: 5 });
      rerender(<LineChart data={data2} />);

      await waitFor(() => {
        const newPath = container.querySelector('path.line')?.getAttribute('d');
        expect(newPath).not.toBe(initialPath);
      });
    });
  });

  describe('Responsiveness', () => {
    test('resizes on container change', async () => {
      const data = mockChartData({ series: 1, points: 10 });
      const { container, rerender } = render(
        <div style={{ width: 800 }}>
          <LineChart data={data} />
        </div>
      );

      const initialWidth = container.querySelector('svg')?.getAttribute('width');

      rerender(
        <div style={{ width: 400 }}>
          <LineChart data={data} />
        </div>
      );

      await waitFor(() => {
        const newWidth = container.querySelector('svg')?.getAttribute('width');
        expect(newWidth).not.toBe(initialWidth);
      });
    });

    test('maintains aspect ratio', () => {
      const data = mockChartData({ series: 1, points: 10 });
      const { container } = render(
        <LineChart data={data} aspectRatio={2} />
      );

      const svg = container.querySelector('svg');
      const width = parseInt(svg?.getAttribute('width') || '0');
      const height = parseInt(svg?.getAttribute('height') || '0');

      expect(width / height).toBeCloseTo(2, 1);
    });
  });

  describe('Accessibility', () => {
    test('has descriptive title', () => {
      const data = mockChartData({ series: 1, points: 10 });
      render(<LineChart data={data} title="Sales Over Time" />);

      expect(screen.getByText('Sales Over Time')).toBeInTheDocument();
    });

    test('has data table alternative', () => {
      const data = mockChartData({ series: 1, points: 10 });
      render(<LineChart data={data} showDataTable />);

      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    test('keyboard navigation works', async () => {
      const user = userEvent.setup();
      const data = mockChartData({ series: 1, points: 10 });
      const { container } = render(<LineChart data={data} />);

      const firstDataPoint = container.querySelector('circle.data-point');
      firstDataPoint?.focus();

      await user.keyboard('{ArrowRight}');

      const secondDataPoint = container.querySelectorAll('circle.data-point')[1];
      expect(secondDataPoint).toHaveFocus();
    });
  });
});
```

### 2.3 Toast Test Template

```typescript
// src/components/Toast/Toast.test.tsx
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast, ToastContainer } from './Toast';

describe('Toast Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    test('renders toast message', () => {
      render(<Toast message="Test message" />);
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    test('renders info variant', () => {
      render(<Toast message="Info" variant="info" />);
      const toast = screen.getByRole('alert');
      expect(toast).toHaveClass(/info/);
    });

    test('renders success variant', () => {
      render(<Toast message="Success" variant="success" />);
      expect(screen.getByTestId('success-icon')).toBeInTheDocument();
    });

    test('renders with close button', () => {
      render(<Toast message="Test" closable />);
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    test('renders with action button', () => {
      render(<Toast message="Test" action={{ label: 'Undo', onClick: vi.fn() }} />);
      expect(screen.getByRole('button', { name: /undo/i })).toBeInTheDocument();
    });
  });

  describe('Auto-dismiss', () => {
    test('auto-dismisses after default duration', async () => {
      const onClose = vi.fn();
      render(<Toast message="Test" onClose={onClose} />);

      expect(screen.getByText('Test')).toBeInTheDocument();

      vi.advanceTimersByTime(5000);

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });

    test('auto-dismisses after custom duration', async () => {
      const onClose = vi.fn();
      render(<Toast message="Test" duration={3000} onClose={onClose} />);

      vi.advanceTimersByTime(3000);

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });

    test('does not auto-dismiss if duration=0', async () => {
      const onClose = vi.fn();
      render(<Toast message="Test" duration={0} onClose={onClose} />);

      vi.advanceTimersByTime(10000);

      expect(onClose).not.toHaveBeenCalled();
    });

    test('pauses on hover', async () => {
      const user = userEvent.setup({ delay: null });
      const onClose = vi.fn();
      render(<Toast message="Test" duration={5000} onClose={onClose} />);

      const toast = screen.getByRole('alert');

      vi.advanceTimersByTime(2000);
      await user.hover(toast);
      vi.advanceTimersByTime(4000); // Would normally dismiss

      expect(onClose).not.toHaveBeenCalled();

      await user.unhover(toast);
      vi.advanceTimersByTime(3000);

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });

    test('shows countdown progress bar', () => {
      render(<Toast message="Test" showProgress />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Stacking', () => {
    test('shows multiple toasts', () => {
      render(
        <ToastContainer>
          <Toast message="Toast 1" />
          <Toast message="Toast 2" />
          <Toast message="Toast 3" />
        </ToastContainer>
      );

      expect(screen.getByText('Toast 1')).toBeInTheDocument();
      expect(screen.getByText('Toast 2')).toBeInTheDocument();
      expect(screen.getByText('Toast 3')).toBeInTheDocument();
    });

    test('limits max toasts shown', () => {
      render(
        <ToastContainer maxToasts={3}>
          <Toast message="Toast 1" />
          <Toast message="Toast 2" />
          <Toast message="Toast 3" />
          <Toast message="Toast 4" />
        </ToastContainer>
      );

      expect(screen.getAllByRole('alert')).toHaveLength(3);
    });

    test('animates toast entrance', () => {
      const { container } = render(<Toast message="Test" />);
      const toast = container.querySelector('[data-state="entering"]');
      expect(toast).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    test('close button dismisses toast', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Toast message="Test" closable onClose={onClose} />);

      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      expect(onClose).toHaveBeenCalled();
    });

    test('action button works', async () => {
      const user = userEvent.setup();
      const onAction = vi.fn();
      render(<Toast message="Test" action={{ label: 'Undo', onClick: onAction }} />);

      const actionButton = screen.getByRole('button', { name: /undo/i });
      await user.click(actionButton);

      expect(onAction).toHaveBeenCalled();
    });

    test('swipe to dismiss on mobile', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      const { container } = render(<Toast message="Test" onClose={onClose} />);

      const toast = container.querySelector('[role="alert"]');

      await user.pointer([
        { keys: '[TouchA>]', target: toast, coords: { x: 100, y: 0 } },
        { coords: { x: 300, y: 0 } },
        { keys: '[/TouchA]' }
      ]);

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });
  });

  describe('Accessibility', () => {
    test('has role="alert"', () => {
      render(<Toast message="Test" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    test('has aria-live="polite"', () => {
      render(<Toast message="Test" variant="info" />);
      const toast = screen.getByRole('alert');
      expect(toast).toHaveAttribute('aria-live', 'polite');
    });

    test('error toasts have aria-live="assertive"', () => {
      render(<Toast message="Error" variant="error" />);
      const toast = screen.getByRole('alert');
      expect(toast).toHaveAttribute('aria-live', 'assertive');
    });

    test('close button has aria-label', () => {
      render(<Toast message="Test" closable />);
      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toHaveAttribute('aria-label');
    });

    test('keyboard dismissable with Escape', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Toast message="Test" onClose={onClose} />);

      await user.keyboard('{Escape}');

      expect(onClose).toHaveBeenCalled();
    });
  });
});
```

---

## 3. Mock Data & Utilities

### 3.1 Table Mock Data

```typescript
// tests/mocks/table-data.ts
export interface TableDataOptions {
  rows?: number;
  includeNulls?: boolean;
  includeEmptyStrings?: boolean;
}

export function mockTableData(rows: number = 10, options: TableDataOptions = {}) {
  const columns = [
    { id: 'id', label: 'ID', sortable: true, type: 'number' },
    { id: 'name', label: 'Name', sortable: true, type: 'string' },
    { id: 'email', label: 'Email', sortable: true, type: 'string' },
    { id: 'status', label: 'Status', sortable: true, type: 'string' },
    { id: 'value', label: 'Value', sortable: true, type: 'number' },
    { id: 'date', label: 'Date', sortable: true, type: 'date' },
    { id: 'active', label: 'Active', sortable: true, type: 'boolean' }
  ];

  const statuses = ['active', 'inactive', 'pending', 'archived'];

  const data = Array.from({ length: rows }, (_, i) => {
    const shouldBeNull = options.includeNulls && Math.random() > 0.9;
    const shouldBeEmpty = options.includeEmptyStrings && Math.random() > 0.9;

    return {
      id: i + 1,
      name: shouldBeNull ? null : shouldBeEmpty ? '' : `User ${i + 1}`,
      email: shouldBeNull ? null : `user${i + 1}@example.com`,
      status: statuses[i % statuses.length],
      value: shouldBeNull ? null : Math.floor(Math.random() * 1000),
      date: new Date(2024, 0, (i % 365) + 1),
      active: i % 2 === 0
    };
  });

  return { columns, data };
}

export function mockLargeTableData(rows: number = 10000) {
  return mockTableData(rows);
}
```

### 3.2 Chart Mock Data

```typescript
// tests/mocks/chart-data.ts
export interface ChartDataOptions {
  series?: number;
  points?: number;
  includeNulls?: boolean;
  min?: number;
  max?: number;
}

export function mockChartData(options: ChartDataOptions = {}) {
  const {
    series = 1,
    points = 10,
    includeNulls = false,
    min = 0,
    max = 100
  } = options;

  const labels = Array.from({ length: points }, (_, i) => {
    const date = new Date(2024, 0, i + 1);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const datasets = Array.from({ length: series }, (_, seriesIndex) => ({
    label: `Series ${seriesIndex + 1}`,
    data: Array.from({ length: points }, (_, pointIndex) => {
      if (includeNulls && Math.random() > 0.9) {
        return null;
      }
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }),
    borderColor: `hsl(${seriesIndex * (360 / series)}, 70%, 50%)`,
    backgroundColor: `hsla(${seriesIndex * (360 / series)}, 70%, 50%, 0.2)`
  }));

  return { labels, datasets };
}

export function mockTimeSeriesData(days: number = 30) {
  const labels = Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    return date.toISOString().split('T')[0];
  });

  const datasets = [{
    label: 'Value',
    data: Array.from({ length: days }, () =>
      Math.floor(Math.random() * 100) + 50
    )
  }];

  return { labels, datasets };
}
```

### 3.3 Performance Testing Utilities

```typescript
// tests/utils/performance.ts
export async function measureRenderTime(
  renderFn: () => void,
  threshold: number
): Promise<number> {
  const start = performance.now();
  renderFn();
  const duration = performance.now() - start;

  expect(duration).toBeLessThan(threshold);
  return duration;
}

export async function measureUpdateTime(
  updateFn: () => Promise<void>,
  threshold: number
): Promise<number> {
  const start = performance.now();
  await updateFn();
  const duration = performance.now() - start;

  expect(duration).toBeLessThan(threshold);
  return duration;
}

export function createLargeDataset(size: number) {
  return Array.from({ length: size }, (_, i) => ({
    id: i,
    value: Math.random(),
    text: `Item ${i}`,
    nested: {
      id: i,
      data: Array.from({ length: 10 }, () => Math.random())
    }
  }));
}

export function measureMemoryUsage() {
  if (performance.memory) {
    return {
      usedJSHeapSize: performance.memory.usedJSHeapSize,
      totalJSHeapSize: performance.memory.totalJSHeapSize,
      jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
    };
  }
  return null;
}
```

---

## 4. Performance Testing Setup

### 4.1 Performance Test Template

```typescript
// tests/performance/table-performance.test.ts
import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Table } from '@/components/Table';
import { mockTableData } from '@tests/mocks/table-data';
import { measureRenderTime, measureMemoryUsage } from '@tests/utils/performance';

describe('Table Performance', () => {
  test('renders 100 rows under 100ms', async () => {
    const { columns, data } = mockTableData(100);

    const duration = await measureRenderTime(() => {
      render(<Table columns={columns} data={data} />);
    }, 100);

    console.log(`Table rendered 100 rows in ${duration.toFixed(2)}ms`);
  });

  test('renders 1000 rows under 500ms', async () => {
    const { columns, data } = mockTableData(1000);

    const duration = await measureRenderTime(() => {
      render(<Table columns={columns} data={data} />);
    }, 500);

    console.log(`Table rendered 1000 rows in ${duration.toFixed(2)}ms`);
  });

  test('no memory leaks on unmount', () => {
    const { columns, data } = mockTableData(1000);

    const memoryBefore = measureMemoryUsage();

    const { unmount } = render(<Table columns={columns} data={data} />);

    unmount();

    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }

    const memoryAfter = measureMemoryUsage();

    if (memoryBefore && memoryAfter) {
      const leakThreshold = 1024 * 1024; // 1MB
      const leak = memoryAfter.usedJSHeapSize - memoryBefore.usedJSHeapSize;
      expect(leak).toBeLessThan(leakThreshold);
    }
  });

  test('sorts 1000 rows under 100ms', async () => {
    const { columns, data } = mockTableData(1000);
    const { rerender } = render(<Table columns={columns} data={data} />);

    const start = performance.now();
    rerender(
      <Table
        columns={columns}
        data={data}
        sortState={{ column: 'name', direction: 'asc' }}
      />
    );
    const duration = performance.now() - start;

    expect(duration).toBeLessThan(100);
    console.log(`Table sorted 1000 rows in ${duration.toFixed(2)}ms`);
  });

  test('maintains 60fps during scroll', async () => {
    const { columns, data } = mockTableData(1000);
    const { container } = render(
      <div style={{ height: '400px', overflow: 'auto' }}>
        <Table columns={columns} data={data} />
      </div>
    );

    const scrollContainer = container.firstChild as HTMLElement;
    const frameTime = 1000 / 60; // 16.67ms per frame

    const scrollDurations: number[] = [];

    for (let i = 0; i < 10; i++) {
      const start = performance.now();
      scrollContainer.scrollTop = i * 100;
      const duration = performance.now() - start;
      scrollDurations.push(duration);
    }

    const avgDuration = scrollDurations.reduce((a, b) => a + b) / scrollDurations.length;
    expect(avgDuration).toBeLessThan(frameTime);

    console.log(`Average scroll frame time: ${avgDuration.toFixed(2)}ms`);
  });
});
```

---

## 5. Accessibility Testing Setup

### 5.1 Accessibility Test Template

```typescript
// tests/a11y/table-accessibility.test.ts
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Table } from '@/components/Table';
import { mockTableData } from '@tests/mocks/table-data';

expect.extend(toHaveNoViolations);

describe('Table Accessibility', () => {
  test('no axe violations', async () => {
    const { columns, data } = mockTableData(10);
    const { container } = render(<Table columns={columns} data={data} />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('has proper ARIA roles', () => {
    const { columns, data } = mockTableData(5);
    const { container } = render(<Table columns={columns} data={data} />);

    expect(container.querySelector('[role="table"]')).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader')).toHaveLength(columns.length);
    expect(screen.getAllByRole('row').length).toBeGreaterThan(1);
  });

  test('keyboard navigation works', async () => {
    const user = userEvent.setup();
    const { columns, data } = mockTableData(3);
    render(<Table columns={columns} data={data} />);

    const firstCell = screen.getAllByRole('cell')[0];
    firstCell.focus();
    expect(firstCell).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    const secondCell = screen.getAllByRole('cell')[1];
    expect(secondCell).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    const cellBelow = screen.getAllByRole('cell')[columns.length + 1];
    expect(cellBelow).toHaveFocus();
  });

  test('screen reader announces sort changes', async () => {
    const user = userEvent.setup();
    const { columns, data } = mockTableData(5);
    render(<Table columns={columns} data={data} />);

    const nameHeader = screen.getByRole('columnheader', { name: /name/i });
    await user.click(nameHeader);

    expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');

    await user.click(nameHeader);
    expect(nameHeader).toHaveAttribute('aria-sort', 'descending');
  });

  test('selected rows announced', async () => {
    const user = userEvent.setup();
    const { columns, data } = mockTableData(5);
    render(<Table columns={columns} data={data} selectable />);

    const firstRow = screen.getAllByRole('row')[1];
    await user.click(firstRow);

    expect(firstRow).toHaveAttribute('aria-selected', 'true');
  });

  test('color contrast meets WCAG AA', async () => {
    const { columns, data } = mockTableData(5);
    const { container } = render(<Table columns={columns} data={data} />);

    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true }
      }
    });

    expect(results).toHaveNoViolations();
  });

  test('focus visible on all interactive elements', async () => {
    const user = userEvent.setup();
    const { columns, data } = mockTableData(5);
    render(<Table columns={columns} data={data} />);

    const headers = screen.getAllByRole('columnheader');

    for (const header of headers) {
      await user.tab();
      if (document.activeElement === header) {
        expect(header).toHaveClass(/focus-visible/);
      }
    }
  });

  test('skip navigation link provided', () => {
    const { columns, data } = mockTableData(100);
    render(<Table columns={columns} data={data} />);

    const skipLink = screen.getByRole('link', { name: /skip to table end/i });
    expect(skipLink).toBeInTheDocument();
  });
});
```

---

## 6. CI/CD Integration

### 6.1 GitHub Actions Workflow

```yaml
# .github/workflows/test-phase3.yml
name: Phase 3 Component Tests

on:
  push:
    branches: [main, develop]
    paths:
      - 'src/components/Table/**'
      - 'src/components/List/**'
      - 'src/components/Charts/**'
      - 'src/components/Toast/**'
      - 'src/components/Alert/**'
      - 'src/components/Dialog/**'
      - 'tests/**'
  pull_request:
    branches: [main, develop]

jobs:
  test-phase3:
    name: Run Phase 3 Tests
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type checking
        run: npm run typecheck

      - name: Run unit tests
        run: npm run test:phase3

      - name: Run integration tests
        run: npm run test:integration

      - name: Run accessibility tests
        run: npm run test:a11y:phase3

      - name: Run performance tests
        run: npm run test:performance

      - name: Generate coverage report
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/coverage-final.json
          flags: phase3
          fail_ci_if_error: true

      - name: Comment PR with coverage
        if: github.event_name == 'pull_request'
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  performance-benchmark:
    name: Performance Benchmarks
    runs-on: ubuntu-latest
    needs: test-phase3

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test:performance -- --reporter=json > performance.json

      - name: Store benchmark result
        uses: benchmark-action/github-action-benchmark@v1
        with:
          tool: 'customSmallerIsBetter'
          output-file-path: performance.json
          github-token: ${{ secrets.GITHUB_TOKEN }}
          auto-push: true
```

---

## 7. Execution Instructions

### 7.1 Local Development

```bash
# Run all Phase 3 tests
npm run test:phase3

# Run tests in watch mode
npm run test:phase3:watch

# Run specific component tests
npm run test:data-components
npm run test:feedback-components

# Run integration tests
npm run test:integration

# Run accessibility tests
npm run test:a11y:phase3

# Run performance tests
npm run test:performance

# Generate coverage report
npm run test:coverage

# Open coverage in browser
npm run test:coverage -- --reporter=html
open coverage/index.html

# Run tests with UI
npm run test:ui
```

### 7.2 Continuous Integration

```bash
# Full test suite (as run in CI)
npm run lint && \
npm run typecheck && \
npm run test:phase3 && \
npm run test:integration && \
npm run test:a11y:phase3 && \
npm run test:performance && \
npm run test:coverage
```

### 7.3 Test Execution Order

1. **Setup Phase** (tests/setup/phase3-setup.ts)
   - Initialize test environment
   - Setup global mocks
   - Configure matchers

2. **Unit Tests** (Component-specific)
   - Table (250 tests)
   - ResponsiveTable (80 tests)
   - List (70 tests)
   - Charts (200 tests)
   - EmptyState (30 tests)
   - DatePicker (90 tests)
   - TimePicker (60 tests)
   - FileUpload (70 tests)
   - Toast (50 tests)
   - Alert (40 tests)
   - ConfirmDialog (60 tests)
   - Component States (50 tests)

3. **Integration Tests** (150 tests)
   - Table + Pagination + Search
   - Forms + Validation + Feedback
   - Modal + Forms + Upload
   - Chart + Table Integration
   - Complex User Flows

4. **Accessibility Tests** (100 tests)
   - WCAG AA Compliance
   - Screen Reader Tests
   - Keyboard Navigation

5. **Performance Tests** (20 tests)
   - Render Performance
   - Memory & Performance

---

## 8. Success Criteria Checklist

- [ ] All 1.270+ tests implemented
- [ ] All tests passing
- [ ] 100% line coverage on data components
- [ ] 100% function coverage on feedback components
- [ ] 90%+ branch coverage overall
- [ ] 0 axe violations
- [ ] All WCAG AA criteria met
- [ ] Performance budgets met
- [ ] No memory leaks detected
- [ ] CI/CD pipeline green
- [ ] Documentation complete

---

**Document Status:** Complete and Ready for Implementation
**Next Action:** Begin test implementation following templates
**Estimated Time:** 3-4 weeks for complete implementation
