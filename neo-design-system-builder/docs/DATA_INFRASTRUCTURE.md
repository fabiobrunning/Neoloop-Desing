# Data Infrastructure Documentation

## Overview

Complete data management infrastructure for Phase 3 implementation, featuring:

- Mock API with realistic network simulation
- React Query hooks for data fetching and caching
- Zod schemas for validation
- Context providers for state management
- Performance optimization utilities

## Architecture

```
Data Layer Architecture
├── Schemas (Zod)           → Data validation
├── Mock API                → Simulated backend
├── React Query Hooks       → Data fetching/caching
├── Context Providers       → Global state management
└── Performance Utils       → Optimization helpers
```

## 1. Schemas (Zod Validation)

### Location
`/src/schemas/`

### Files
- `table.schema.ts` - Table data validation
- `chart.schema.ts` - Chart data validation
- `file.schema.ts` - File upload validation
- `index.ts` - Central export

### Usage

```typescript
import { TableDataSchema, TableRow } from '@/schemas';

// Validate data
const validatedData = TableDataSchema.parse(rawData);

// Type-safe data
const row: TableRow = {
  id: '550e8400-e29b-41d4-a716-446655440001',
  name: 'Component',
  status: 'active',
  category: 'Buttons',
  value: 100,
  date: '2024-01-15T10:30:00Z',
};
```

### Available Schemas

#### TableSchema
- `TableRow` - Single table row
- `TableData` - Paginated table response
- `TableQuery` - Query parameters
- `TableSort` - Sorting configuration
- `TableFilter` - Filter configuration

#### ChartSchema
- `ChartData` - Chart data structure
- `ChartSeries` - Chart series data
- `ChartDataPoint` - Individual data point
- `ChartConfig` - Chart configuration

#### FileSchema
- `FileUpload` - File upload state
- `FileUploadResponse` - Upload response
- `FileUploadConfig` - Upload configuration

## 2. Mock API

### Location
`/src/api/mock/`

### Features

#### Realistic Network Simulation
- Variable delay (200-500ms)
- Occasional slow requests (10% chance)
- Error scenarios (5% chance)
- Timeout handling

#### Available APIs

##### Tables API
```typescript
import { fetchTableData, fetchTableRow, updateTableRow, deleteTableRow } from '@/api/mock';

// Fetch with pagination, filtering, sorting
const data = await fetchTableData({
  page: 1,
  pageSize: 10,
  sort: { field: 'name', direction: 'asc' },
  filters: [{ field: 'status', operator: 'equals', value: 'active' }],
  search: 'button',
});

// Fetch single row
const row = await fetchTableRow('row-id');

// Update row
const updated = await updateTableRow('row-id', { name: 'New Name' });

// Delete row
await deleteTableRow('row-id');
```

##### Charts API
```typescript
import { fetchChartData, fetchChartDataByDateRange, fetchChartMetrics } from '@/api/mock';

// Fetch all chart data
const chartData = await fetchChartData();

// Fetch by date range
const rangeData = await fetchChartDataByDateRange({
  start: '2024-01-01T00:00:00Z',
  end: '2024-01-15T23:59:59Z',
});

// Fetch metrics
const metrics = await fetchChartMetrics();
```

##### File Upload API
```typescript
import { uploadFile, uploadFiles, deleteFile, validateFile } from '@/api/mock';

// Upload single file with progress
const response = await uploadFile(file, (progress) => {
  console.log(`Upload progress: ${progress}%`);
});

// Upload multiple files
const responses = await uploadFiles(files, (fileIndex, progress) => {
  console.log(`File ${fileIndex}: ${progress}%`);
});

// Validate before upload
const validation = validateFile(file, maxSize);
if (!validation.valid) {
  console.error(validation.error);
}
```

### Mock Data Files

Located in `/public/data/`:

- `tables.json` - 125 sample table rows
- `charts.json` - Time series data (15 days)
- `templates.json` - Design templates
- `icons.json` - Icon reference data

### Error Scenarios

```typescript
import { ApiError, validationError, notFoundError } from '@/api/mock';

// Custom errors
throw validationError('email', 'Invalid email format');
throw notFoundError('User');
throw new ApiError('Custom error', 400, 'CUSTOM_ERROR');
```

## 3. React Query Hooks

### Location
`/src/api/queries/`

### Configuration

```typescript
// QueryProvider configuration
import { QueryProvider } from '@/context/QueryProvider';

<QueryProvider enableDevtools={true}>
  <App />
</QueryProvider>
```

Default settings:
- Stale time: 5 minutes
- Cache time: 10 minutes
- Retry: 2 attempts
- Exponential backoff

### Available Hooks

#### Table Hooks

```typescript
import { useTables, useTableRow, useUpdateTableRow, useDeleteTableRow } from '@/api/queries';

// Fetch tables
const { data, isLoading, error } = useTables({
  page: 1,
  pageSize: 10,
  sort: { field: 'name', direction: 'asc' },
});

// Fetch single row
const { data: row } = useTableRow('row-id');

// Update row
const updateMutation = useUpdateTableRow();
updateMutation.mutate({ id: 'row-id', updates: { name: 'New Name' } });

// Delete row
const deleteMutation = useDeleteTableRow();
deleteMutation.mutate('row-id');
```

#### Chart Hooks

```typescript
import { useCharts, useChartsByDateRange, useRealtimeCharts } from '@/api/queries';

// Fetch charts
const { data, isLoading } = useCharts();

// Fetch by date range
const { data: rangeData } = useChartsByDateRange({
  start: '2024-01-01T00:00:00Z',
  end: '2024-01-15T23:59:59Z',
});

// Real-time updates (refetch every 10 seconds)
const { data: liveData } = useRealtimeCharts(10000);
```

#### File Upload Hooks

```typescript
import { useFileUpload, useMultipleFileUpload, useDeleteFile } from '@/api/queries';

// Single file upload
const { upload, progress, isLoading } = useFileUpload();

const handleUpload = async (file: File) => {
  try {
    const response = await upload(file);
    console.log(`Uploaded: ${response.url}`);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};

// Multiple file upload
const { upload: uploadMultiple, progressMap } = useMultipleFileUpload();

const handleMultipleUpload = async (files: File[]) => {
  const responses = await uploadMultiple(files);
  console.log(`Uploaded ${responses.length} files`);
};

// Progress tracking
progressMap.forEach((item) => {
  console.log(`${item.fileName}: ${item.progress}%`);
});
```

## 4. Context Providers

### TableContext

Manages table state: sorting, pagination, selection, filtering.

```typescript
import { TableProvider, useTableContext } from '@/context/TableContext';

// Wrap component
<TableProvider initialState={{ pageSize: 25 }}>
  <YourTableComponent />
</TableProvider>

// Use in component
const {
  state,
  setPage,
  setSort,
  addFilter,
  selectRow,
  isRowSelected,
} = useTableContext();

// State
state.page          // Current page
state.pageSize      // Items per page
state.sort          // Current sort
state.filters       // Active filters
state.search        // Search query
state.selectedRows  // Selected row IDs

// Actions
setPage(2);
setPageSize(25);
setSort({ field: 'name', direction: 'asc' });
addFilter({ field: 'status', operator: 'equals', value: 'active' });
removeFilter('status');
setSearch('button');
selectRow('row-id');
deselectRow('row-id');
selectAll(['id1', 'id2', 'id3']);
clearSelection();
isRowSelected('row-id');
reset();
```

### FormContext

Manages form state with validation.

```typescript
import { FormProvider, useFormContext, ValidatorFn } from '@/context/FormContext';

// Validators
const validators: Record<string, ValidatorFn> = {
  email: (value) => {
    if (!value) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email';
    return undefined;
  },
  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    return undefined;
  },
};

// Wrap component
<FormProvider
  initialValues={{ email: '', password: '' }}
  validators={validators}
>
  <YourFormComponent />
</FormProvider>

// Use in component
const {
  state,
  setFieldValue,
  getFieldValue,
  getFieldError,
  isFieldTouched,
  handleSubmit,
  resetForm,
} = useFormContext();

// Field operations
setFieldValue('email', 'user@example.com');
const email = getFieldValue<string>('email');
const error = getFieldError('email');
const touched = isFieldTouched('email');

// Submit
const onSubmit = async () => {
  const values = {
    email: getFieldValue<string>('email'),
    password: getFieldValue<string>('password'),
  };

  await api.login(values);
};

await handleSubmit(onSubmit);
```

## 5. Performance Utilities

### Location
`/src/utils/performance.ts`

### Debounce & Throttle

```typescript
import { debounce, throttle, useDebounce } from '@/utils/performance';

// Debounce function
const debouncedSearch = debounce((query: string) => {
  fetchResults(query);
}, 300);

// Throttle function
const throttledScroll = throttle(() => {
  handleScroll();
}, 100);

// Debounced value hook
const [searchQuery, setSearchQuery] = useState('');
const debouncedQuery = useDebounce(searchQuery, 300);

useEffect(() => {
  fetchResults(debouncedQuery);
}, [debouncedQuery]);
```

### Memoization

```typescript
import { memoize, useStableCallback } from '@/utils/performance';

// Memoize expensive computation
const expensiveFunction = memoize((input: number) => {
  // Heavy computation
  return result;
});

// Stable callback reference
const stableCallback = useStableCallback(() => {
  // Callback logic
});
```

### Virtual Scrolling

```typescript
import { useVirtualScroll } from '@/utils/performance';

const { visibleRange, totalHeight, onScroll } = useVirtualScroll({
  itemCount: 1000,
  itemHeight: 50,
  containerHeight: 500,
  overscan: 3,
});

<div onScroll={onScroll} style={{ height: 500, overflow: 'auto' }}>
  <div style={{ height: totalHeight }}>
    {items.slice(visibleRange.startIndex, visibleRange.endIndex).map((item) => (
      <div key={item.id} style={{ height: 50 }}>
        {item.name}
      </div>
    ))}
  </div>
</div>
```

### Lazy Loading

```typescript
import { useIntersectionObserver } from '@/utils/performance';

const ref = useRef<HTMLDivElement>(null);
const isVisible = useIntersectionObserver(ref, { threshold: 0.5 });

{isVisible && <ExpensiveComponent />}
```

## 6. Data Helpers

### Location
`/src/utils/dataHelpers.ts`

### Formatting

```typescript
import {
  formatFileSize,
  formatDate,
  formatNumber,
  formatPercentage,
  formatRelativeTime,
} from '@/utils/dataHelpers';

formatFileSize(1048576)              // "1 MB"
formatDate(new Date(), 'short')      // "Jan 15, 2024"
formatDate(new Date(), 'relative')   // "2 hours ago"
formatNumber(1234567, 2)             // "1,234,567.00"
formatPercentage(75.5)               // "75.5%"
```

### Data Manipulation

```typescript
import {
  groupBy,
  sortBy,
  unique,
  searchArray,
  deepClone,
  deepMerge,
} from '@/utils/dataHelpers';

// Group by key
const grouped = groupBy(items, 'category');

// Sort by key
const sorted = sortBy(items, 'value', 'desc');

// Remove duplicates
const uniqueItems = unique(items, 'id');

// Search
const results = searchArray(items, 'query', ['name', 'description']);

// Deep clone
const cloned = deepClone(originalObject);

// Deep merge
const merged = deepMerge(target, source1, source2);
```

### Pagination

```typescript
import { calculatePagination } from '@/utils/dataHelpers';

const pagination = calculatePagination(2, 10, 95);
// {
//   page: 2,
//   pageSize: 10,
//   totalItems: 95,
//   totalPages: 10,
//   startIndex: 10,
//   endIndex: 20,
//   hasNext: true,
//   hasPrev: true,
// }
```

## Migration Path to Supabase (v1.1)

### Phase 1: Keep Mock API (Current)
- All features use mock API
- No external dependencies
- Easy testing and development

### Phase 2: Add Supabase Layer
```typescript
// Create real API alongside mock
/src/api/
  ├── mock/          # Keep existing
  └── supabase/      # Add new
      ├── tables.ts
      ├── charts.ts
      └── files.ts
```

### Phase 3: Switch via Environment Variable
```typescript
// api/index.ts
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

export const tableApi = USE_MOCK
  ? mockTableApi
  : supabaseTableApi;
```

### Phase 4: Remove Mock (Production)
- Switch to Supabase in production
- Keep mock for testing/development

### Benefits
- Zero-downtime migration
- Easy rollback
- Test both implementations
- Gradual team adoption

## Performance Benchmarks

### Mock API Response Times
- Table fetch: 200-500ms
- Chart fetch: 200-500ms
- File upload: 1-5 seconds (simulated)
- Error rate: 5% (configurable)

### React Query Caching
- Initial load: Network request
- Subsequent loads: Instant (from cache)
- Stale data refetch: Background
- Cache invalidation: Automatic on mutations

### Optimization Strategies
1. **Prefetching**: Load data before needed
2. **Pagination**: Load small chunks
3. **Virtual scrolling**: Render visible items only
4. **Memoization**: Cache expensive computations
5. **Debouncing**: Reduce unnecessary calls

## Testing

### Run Tests
```bash
npm run test                 # All tests
npm run test:unit            # Unit tests only
npm run test:coverage        # With coverage
```

### Test Files
- `/src/api/mock/__tests__/tables.test.ts`
- `/src/utils/__tests__/dataHelpers.test.ts`

### Coverage Goals
- Schemas: 100%
- Mock API: 90%+
- React Query Hooks: 85%+
- Utilities: 95%+

## Troubleshooting

### Common Issues

#### Query not refetching
```typescript
// Force refetch
queryClient.invalidateQueries({ queryKey: tableKeys.all });
```

#### Stale data showing
```typescript
// Reduce stale time
const { data } = useTables(query, {
  staleTime: 0, // Always fetch fresh
});
```

#### Upload progress not updating
```typescript
// Ensure progress callback is called
await uploadFile(file, (progress) => {
  setProgress(progress); // Update state
});
```

## Best Practices

1. **Always validate data with Zod schemas**
2. **Use React Query for server state**
3. **Use Context for UI state**
4. **Debounce search inputs**
5. **Implement error boundaries**
6. **Show loading states**
7. **Handle errors gracefully**
8. **Prefetch predictable data**
9. **Use virtual scrolling for large lists**
10. **Monitor React Query DevTools**

## Next Steps (Phase 3 Components)

Now that data infrastructure is ready, implement:

1. **Advanced Table Component**
   - Uses `useTables` hook
   - Uses `TableContext` for state
   - Implements virtual scrolling
   - Shows loading/error states

2. **Chart Components**
   - Uses `useCharts` hook
   - Real-time updates
   - Date range selector

3. **File Upload Component**
   - Uses `useFileUpload` hook
   - Progress indicators
   - Drag & drop

4. **Form Components**
   - Uses `FormContext`
   - Real-time validation
   - Submission handling

## Support

For questions or issues with data infrastructure:
1. Check this documentation
2. Review test files for examples
3. Check React Query DevTools
4. Review Zod error messages

---

**Version**: 1.0.0
**Last Updated**: 2024-01-31
**Status**: Production Ready
