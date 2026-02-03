# Migration Guide: Mock API → Supabase

## Overview

This guide explains how to migrate from the mock API to Supabase in version 1.1.

## Current Architecture (v1.0 - Mock API)

```
Application
    ↓
React Query Hooks
    ↓
Mock API (JSON files)
    ↓
Public Data Files
```

## Target Architecture (v1.1 - Supabase)

```
Application
    ↓
React Query Hooks
    ↓
Supabase Client
    ↓
Supabase Database
```

## Migration Strategy

### Phase 1: Parallel Implementation

Keep both implementations side by side.

```
/src/api/
├── mock/              # Existing mock API
├── supabase/          # New Supabase API
└── index.ts           # API abstraction layer
```

### Phase 2: Database Schema

#### Tables Table

```sql
CREATE TABLE tables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  status TEXT CHECK (status IN ('active', 'inactive', 'pending', 'archived')),
  category TEXT NOT NULL,
  value INTEGER NOT NULL CHECK (value >= 0),
  date TIMESTAMPTZ NOT NULL,
  tags TEXT[],
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_tables_status ON tables(status);
CREATE INDEX idx_tables_category ON tables(category);
CREATE INDEX idx_tables_date ON tables(date DESC);

-- Full text search
CREATE INDEX idx_tables_name_search ON tables USING gin(to_tsvector('english', name));
```

#### Charts Table

```sql
CREATE TABLE chart_series (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT,
  type TEXT CHECK (type IN ('line', 'bar', 'area', 'scatter')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE chart_data_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  series_id TEXT REFERENCES chart_series(id) ON DELETE CASCADE,
  timestamp TIMESTAMPTZ NOT NULL,
  value NUMERIC NOT NULL,
  label TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_chart_data_series ON chart_data_points(series_id);
CREATE INDEX idx_chart_data_timestamp ON chart_data_points(timestamp);
```

#### Files Table

```sql
CREATE TABLE uploaded_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  size INTEGER NOT NULL CHECK (size >= 0),
  type TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  url TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by UUID, -- Reference to auth.users if using Supabase Auth
  metadata JSONB
);

-- Indexes
CREATE INDEX idx_files_uploaded_at ON uploaded_files(uploaded_at DESC);
CREATE INDEX idx_files_type ON uploaded_files(type);
```

### Phase 3: Supabase Client Setup

#### Install Dependencies

```bash
npm install @supabase/supabase-js
```

#### Environment Variables

```env
# .env.local
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_USE_MOCK_API=false  # Set to true to use mock API
```

#### Supabase Client

```typescript
// src/api/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Phase 4: Implement Supabase API

#### Tables API

```typescript
// src/api/supabase/tables.ts
import { supabase } from './client';
import { TableData, TableQuery, TableRow } from '../../schemas/table.schema';

export const fetchTableData = async (query: TableQuery): Promise<TableData> => {
  let supabaseQuery = supabase
    .from('tables')
    .select('*', { count: 'exact' });

  // Apply search
  if (query.search) {
    supabaseQuery = supabaseQuery.textSearch('name', query.search);
  }

  // Apply filters
  if (query.filters) {
    query.filters.forEach((filter) => {
      switch (filter.operator) {
        case 'equals':
          supabaseQuery = supabaseQuery.eq(filter.field, filter.value);
          break;
        case 'contains':
          supabaseQuery = supabaseQuery.ilike(filter.field, `%${filter.value}%`);
          break;
        case 'gt':
          supabaseQuery = supabaseQuery.gt(filter.field, filter.value);
          break;
        case 'lt':
          supabaseQuery = supabaseQuery.lt(filter.field, filter.value);
          break;
        case 'gte':
          supabaseQuery = supabaseQuery.gte(filter.field, filter.value);
          break;
        case 'lte':
          supabaseQuery = supabaseQuery.lte(filter.field, filter.value);
          break;
        case 'in':
          supabaseQuery = supabaseQuery.in(filter.field, filter.value as unknown[]);
          break;
      }
    });
  }

  // Apply sorting
  if (query.sort) {
    supabaseQuery = supabaseQuery.order(query.sort.field, {
      ascending: query.sort.direction === 'asc',
    });
  }

  // Apply pagination
  const start = (query.page - 1) * query.pageSize;
  const end = start + query.pageSize - 1;
  supabaseQuery = supabaseQuery.range(start, end);

  // Execute query
  const { data, error, count } = await supabaseQuery;

  if (error) {
    throw new Error(`Failed to fetch tables: ${error.message}`);
  }

  return {
    rows: data as TableRow[],
    total: count || 0,
    page: query.page,
    pageSize: query.pageSize,
    totalPages: Math.ceil((count || 0) / query.pageSize),
  };
};

export const fetchTableRow = async (id: string): Promise<TableRow> => {
  const { data, error } = await supabase
    .from('tables')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch row: ${error.message}`);
  }

  return data as TableRow;
};

export const updateTableRow = async (
  id: string,
  updates: Partial<TableRow>
): Promise<TableRow> => {
  const { data, error } = await supabase
    .from('tables')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update row: ${error.message}`);
  }

  return data as TableRow;
};

export const deleteTableRow = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('tables')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete row: ${error.message}`);
  }
};
```

#### Charts API

```typescript
// src/api/supabase/charts.ts
import { supabase } from './client';
import { ChartData } from '../../schemas/chart.schema';

export const fetchChartData = async (): Promise<ChartData> => {
  const { data: series, error: seriesError } = await supabase
    .from('chart_series')
    .select('*');

  if (seriesError) {
    throw new Error(`Failed to fetch chart series: ${seriesError.message}`);
  }

  // Fetch data points for each series
  const seriesWithData = await Promise.all(
    series.map(async (s) => {
      const { data: points, error: pointsError } = await supabase
        .from('chart_data_points')
        .select('*')
        .eq('series_id', s.id)
        .order('timestamp', { ascending: true });

      if (pointsError) {
        throw new Error(`Failed to fetch data points: ${pointsError.message}`);
      }

      return {
        ...s,
        data: points,
      };
    })
  );

  return {
    series: seriesWithData,
  };
};
```

#### Files API (with Storage)

```typescript
// src/api/supabase/files.ts
import { supabase } from './client';
import { FileUploadResponse } from '../../schemas/file.schema';

export const uploadFile = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<FileUploadResponse> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  // Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('files')
    .upload(filePath, file, {
      onUploadProgress: (progress) => {
        const percentage = (progress.loaded / progress.total) * 100;
        onProgress?.(percentage);
      },
    });

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('files')
    .getPublicUrl(filePath);

  // Save metadata to database
  const { data: fileRecord, error: dbError } = await supabase
    .from('uploaded_files')
    .insert({
      name: file.name,
      size: file.size,
      type: file.type,
      storage_path: filePath,
      url: urlData.publicUrl,
    })
    .select()
    .single();

  if (dbError) {
    throw new Error(`Failed to save file metadata: ${dbError.message}`);
  }

  return {
    id: fileRecord.id,
    url: fileRecord.url,
    name: fileRecord.name,
    size: fileRecord.size,
    type: fileRecord.type,
    uploadedAt: fileRecord.uploaded_at,
  };
};
```

### Phase 5: API Abstraction Layer

```typescript
// src/api/index.ts
import * as mockApi from './mock';
import * as supabaseApi from './supabase';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

// Export the appropriate API based on environment
export const tableApi = USE_MOCK ? mockApi : supabaseApi;
export const chartApi = USE_MOCK ? mockApi : supabaseApi;
export const fileApi = USE_MOCK ? mockApi : supabaseApi;
```

### Phase 6: Update React Query Hooks

```typescript
// src/api/queries/useTables.ts
import { useQuery } from '@tanstack/react-query';
import { tableApi } from '../index'; // Use abstraction layer

export const useTables = (query: TableQuery) => {
  return useQuery({
    queryKey: tableKeys.list(query),
    queryFn: () => tableApi.fetchTableData(query), // Dynamic API call
    // ... rest of config
  });
};
```

### Phase 7: Data Migration

#### Migrate Mock Data to Supabase

```typescript
// scripts/migrate-data.ts
import { supabase } from '../src/api/supabase/client';
import tablesData from '../public/data/tables.json';
import chartsData from '../public/data/charts.json';

async function migrateTables() {
  console.log('Migrating tables data...');

  const { error } = await supabase
    .from('tables')
    .insert(tablesData.rows);

  if (error) {
    console.error('Error migrating tables:', error);
  } else {
    console.log(`Migrated ${tablesData.rows.length} rows`);
  }
}

async function migrateCharts() {
  console.log('Migrating charts data...');

  // Insert series
  for (const series of chartsData.series) {
    const { id, name, color, type, data } = series;

    // Insert series
    await supabase
      .from('chart_series')
      .insert({ id, name, color, type });

    // Insert data points
    const points = data.map((point) => ({
      series_id: id,
      timestamp: point.timestamp,
      value: point.value,
      label: point.label,
      category: point.category,
    }));

    await supabase
      .from('chart_data_points')
      .insert(points);
  }

  console.log('Charts data migrated');
}

async function migrate() {
  await migrateTables();
  await migrateCharts();
  console.log('Migration complete!');
}

migrate();
```

Run migration:
```bash
tsx scripts/migrate-data.ts
```

### Phase 8: Testing

#### Test Supabase Connection

```typescript
// src/api/supabase/__tests__/client.test.ts
import { describe, it, expect } from 'vitest';
import { supabase } from '../client';

describe('Supabase Client', () => {
  it('should connect to Supabase', async () => {
    const { data, error } = await supabase
      .from('tables')
      .select('count');

    expect(error).toBeNull();
    expect(data).toBeDefined();
  });
});
```

#### Test with Both APIs

```bash
# Test with mock API
VITE_USE_MOCK_API=true npm run test

# Test with Supabase
VITE_USE_MOCK_API=false npm run test
```

### Phase 9: Deployment

#### Development
```env
VITE_USE_MOCK_API=true
```

#### Staging
```env
VITE_USE_MOCK_API=false
VITE_SUPABASE_URL=https://your-staging-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-staging-key
```

#### Production
```env
VITE_USE_MOCK_API=false
VITE_SUPABASE_URL=https://your-prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-prod-key
```

## Rollback Plan

If Supabase migration fails:

1. Set `VITE_USE_MOCK_API=true`
2. Redeploy application
3. Mock API continues to work

## Performance Comparison

### Mock API
- Response time: 200-500ms (simulated)
- No network overhead
- Limited by JSON file size

### Supabase
- Response time: 50-200ms (real network)
- CDN-powered
- Scales to millions of rows

## Security Considerations

### Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE tables ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read
CREATE POLICY "Allow public read access"
  ON tables FOR SELECT
  TO anon
  USING (true);

-- Policy: Authenticated users can insert
CREATE POLICY "Allow authenticated insert"
  ON tables FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Users can update their own data
CREATE POLICY "Allow user update own data"
  ON tables FOR UPDATE
  TO authenticated
  USING (auth.uid() = uploaded_by)
  WITH CHECK (auth.uid() = uploaded_by);
```

### API Key Protection

```typescript
// Never expose service_role key in client
// Only use anon key in frontend
```

## Real-time Features (Bonus)

### Enable Real-time Updates

```typescript
// Subscribe to table changes
const channel = supabase
  .channel('tables-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'tables',
    },
    (payload) => {
      console.log('Table changed:', payload);
      // Invalidate React Query cache
      queryClient.invalidateQueries({ queryKey: tableKeys.all });
    }
  )
  .subscribe();

// Cleanup
return () => {
  supabase.removeChannel(channel);
};
```

## Cost Estimation

### Supabase Free Tier
- 500 MB database
- 1 GB file storage
- 2 GB bandwidth
- Unlimited API requests

### Paid Tier (Pro - $25/month)
- 8 GB database
- 100 GB file storage
- 250 GB bandwidth
- Daily backups

## Timeline

| Week | Task |
|------|------|
| 1 | Setup Supabase project, create database schema |
| 2 | Implement Supabase API functions |
| 3 | Create abstraction layer, update hooks |
| 4 | Migrate data, test both implementations |
| 5 | Deploy to staging, performance testing |
| 6 | Deploy to production, monitor |

## Support Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Query + Supabase](https://tanstack.com/query/latest/docs/framework/react/examples/supabase)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

---

**Version**: 1.0.0
**Target Release**: v1.1
**Status**: Ready for Implementation
