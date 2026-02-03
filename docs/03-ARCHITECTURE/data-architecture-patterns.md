# Data Architecture & Patterns Foundation - Neoloop Design System Builder

## Document Information

| Field | Value |
|-------|-------|
| **Project** | Neoloop Design System Builder |
| **Version** | 1.0.0 |
| **Date** | 2026-01-30 |
| **Author** | Data Engineer Agent |
| **Status** | Ready for Implementation |
| **PRD Reference** | prd-neoloop-design-system-builder-v1.0.md |

---

## Executive Summary

This document defines the complete data architecture for the Neoloop Design System Builder, covering data modeling, storage strategies, state management, API integration patterns, and Supabase setup specifications for future phases.

**Key Decisions:**
- ✅ **LocalStorage-first** for v1.0 (no backend)
- ✅ **Context API + useReducer** for state management
- ✅ **Incremental schema evolution** (v1.0 → v1.1 → v2.0)
- ✅ **JSON Schema validation** for import/export
- ✅ **Zustand migration path** ready for v1.5+

---

## 1. Data Modeling for Design System

### 1.1 Component Metadata Schema

```typescript
// Design System Root Schema
interface DesignSystemSchema {
  // Metadata
  _version: '1.0.0';
  _created: string; // ISO 8601 timestamp
  _updated: string; // ISO 8601 timestamp
  _id: string;      // UUID v4

  metadata: {
    name: string;
    description?: string;
    author: string;
    tags?: string[];
  };

  // Design Tokens (6 modules)
  tokens: {
    colors: ColorToken[];
    typography: TypographyToken;
    spacing: SpacingToken;
    shadows: ShadowToken;
    radius: RadiusToken;
    breakpoints: BreakpointsToken;
  };

  // Visual Components (4 modules)
  components: {
    icons: IconsSelection;
    socialIcons: SocialIconsSelection;
    charts: ChartsSelection;
    backgrounds: BackgroundsSelection;
  };

  // UI Components (3 modules)
  ui: {
    buttons: ButtonsSelection;
    cards: CardsSelection;
    forms: FormsSelection;
  };

  // Specific Modules (4 modules)
  modules: {
    animations: AnimationsSelection;
    checkbox: CheckboxSelection;
    loginTemplates: LoginTemplatesSelection;
    sidebarTemplates: SidebarTemplatesSelection;
  };
}
```

### 1.2 Design Token Storage Structure

#### Colors Token
```typescript
interface ColorToken {
  id: string;           // c1-4 (column-row)
  name: string;         // "Coral", "Ocean Blue"
  hex: string;          // #FF453A
  rgb: string;          // rgb(255, 69, 58)
  hsl: string;          // hsl(4, 100%, 61%)
  group: string;        // "red-pink", "blue-indigo", "neutrals"
  contrast?: {          // WCAG contrast ratios
    white: number;      // 4.51
    black: number;      // 4.65
    rating: 'AA' | 'AAA' | 'FAIL';
  };
  selected: boolean;    // Selection state
}

// Example
const colorExample: ColorToken = {
  id: 'c1-4',
  name: 'Coral',
  hex: '#FF453A',
  rgb: 'rgb(255, 69, 58)',
  hsl: 'hsl(4, 100%, 61%)',
  group: 'red-pink',
  contrast: {
    white: 4.51,
    black: 4.65,
    rating: 'AA'
  },
  selected: true
};
```

#### Typography Token
```typescript
interface TypographyToken {
  families: FontFamily[];
  scale: TypographyScale;
  lineHeights: LineHeights;
  letterSpacing: LetterSpacing;
}

interface FontFamily {
  id: string;           // neue-einstellung
  name: string;         // "Neue Einstellung"
  category: 'sans-serif' | 'serif' | 'monospace' | 'display';
  variants: FontVariant[];
  source: 'google' | 'system' | 'custom';
  fallback: string;     // Arial, sans-serif
  selected: boolean;
}

interface FontVariant {
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  style: 'normal' | 'italic';
  name: string;         // "Light", "Regular", "Bold"
  selected: boolean;
}

interface TypographyScale {
  xs: string;     // 0.75rem (12px)
  sm: string;     // 0.875rem (14px)
  base: string;   // 1rem (16px)
  lg: string;     // 1.125rem (18px)
  xl: string;     // 1.25rem (20px)
  '2xl': string;  // 1.5rem (24px)
  '3xl': string;  // 1.875rem (30px)
  '4xl': string;  // 2.25rem (36px)
  '5xl': string;  // 3rem (48px)
  '6xl': string;  // 3.75rem (60px)
}

interface LineHeights {
  none: number;     // 1
  tight: number;    // 1.25
  snug: number;     // 1.375
  normal: number;   // 1.5
  relaxed: number;  // 1.625
  loose: number;    // 2
}

interface LetterSpacing {
  tighter: string;  // -0.05em
  tight: string;    // -0.025em
  normal: string;   // 0
  wide: string;     // 0.025em
  wider: string;    // 0.05em
  widest: string;   // 0.1em
}
```

#### Spacing Token
```typescript
interface SpacingToken {
  '0': string;    // 0
  'px': string;   // 1px
  '0.5': string;  // 0.125rem (2px)
  '1': string;    // 0.25rem (4px)
  '1.5': string;  // 0.375rem (6px)
  '2': string;    // 0.5rem (8px)
  '2.5': string;  // 0.625rem (10px)
  '3': string;    // 0.75rem (12px)
  '3.5': string;  // 0.875rem (14px)
  '4': string;    // 1rem (16px)
  '5': string;    // 1.25rem (20px)
  '6': string;    // 1.5rem (24px)
  '7': string;    // 1.75rem (28px)
  '8': string;    // 2rem (32px)
  '9': string;    // 2.25rem (36px)
  '10': string;   // 2.5rem (40px)
  '11': string;   // 2.75rem (44px)
  '12': string;   // 3rem (48px)
  '14': string;   // 3.5rem (56px)
  '16': string;   // 4rem (64px)
  '20': string;   // 5rem (80px)
  '24': string;   // 6rem (96px)
  '28': string;   // 7rem (112px)
  '32': string;   // 8rem (128px)
  '36': string;   // 9rem (144px)
  '40': string;   // 10rem (160px)
  '44': string;   // 11rem (176px)
  '48': string;   // 12rem (192px)
  '52': string;   // 13rem (208px)
  '56': string;   // 14rem (224px)
  '60': string;   // 15rem (240px)
  '64': string;   // 16rem (256px)
  '72': string;   // 18rem (288px)
  '80': string;   // 20rem (320px)
  '96': string;   // 24rem (384px)
}
```

#### Shadow Token
```typescript
interface ShadowToken {
  none: string;   // none
  xs: string;     // 0 1px 2px 0 rgb(0 0 0 / 0.05)
  sm: string;     // 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
  md: string;     // 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
  lg: string;     // 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
  xl: string;     // 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
  '2xl': string;  // 0 25px 50px -12px rgb(0 0 0 / 0.25)
  inner: string;  // inset 0 2px 4px 0 rgb(0 0 0 / 0.05)
}
```

#### Radius Token
```typescript
interface RadiusToken {
  none: string;   // 0
  sm: string;     // 0.125rem (2px)
  md: string;     // 0.375rem (6px)
  lg: string;     // 0.5rem (8px)
  xl: string;     // 0.75rem (12px)
  '2xl': string;  // 1rem (16px)
  '3xl': string;  // 1.5rem (24px)
  full: string;   // 9999px
}
```

#### Breakpoints Token
```typescript
interface BreakpointsToken {
  sm: string;   // 640px
  md: string;   // 768px
  lg: string;   // 1024px
  xl: string;   // 1280px
  '2xl': string; // 1536px
}
```

### 1.3 Component Selection Schema

#### Icons Selection
```typescript
interface IconsSelection {
  library: 'lucide' | 'heroicons' | 'feather' | 'figma-custom';
  selected: IconItem[];
  style: 'outline' | 'solid' | 'bold';
  size: 16 | 20 | 24 | 32 | 48; // px
}

interface IconItem {
  id: string;           // home, search, settings
  name: string;         // "Home", "Search"
  category: string;     // interface, finance, communication
  svg: string;          // <svg>...</svg>
  keywords: string[];   // ["house", "dashboard"]
}
```

#### Social Icons Selection
```typescript
interface SocialIconsSelection {
  selected: SocialIconItem[];
}

interface SocialIconItem {
  id: string;           // facebook, instagram, x-twitter
  name: string;         // "Facebook", "Instagram"
  style: 'original' | 'dark' | 'light';
  svg: {
    original: string;   // Full color
    dark: string;       // Monochrome dark
    light: string;      // Monochrome light/outline
  };
  brandColor?: string;  // #1877F2 (Facebook blue)
}
```

#### Charts Selection
```typescript
interface ChartsSelection {
  selected: ChartItem[];
}

interface ChartItem {
  id: string;
  type: 'pie' | 'line' | 'bar' | 'area';
  variant: string;      // hollow, simple, stacked
  config: {
    colors?: string[];  // Data colors
    showGrid?: boolean;
    showLegend?: boolean;
    responsive?: boolean;
  };
  sampleData: any;      // Demo data for preview
}
```

#### Backgrounds Selection
```typescript
interface BackgroundsSelection {
  selected: BackgroundItem[];
}

interface BackgroundItem {
  id: string;
  name: string;
  type: 'solid' | 'gradient' | 'pattern' | 'texture' | 'glassmorphism';
  css: string;          // background: ...;
  preview?: string;     // base64 or URL
}
```

### 1.4 User Preferences Schema (v1.1+)

```typescript
interface UserPreferences {
  userId: string;       // UUID v4 (Supabase auth.uid)
  theme: 'light' | 'dark' | 'auto';
  favorites: {
    colors: string[];   // Color IDs
    icons: string[];    // Icon IDs
    charts: string[];   // Chart IDs
  };
  recentDesignSystems: string[]; // Last 10 DS IDs
  settings: {
    autoSave: boolean;
    autoSaveInterval: number; // milliseconds
    exportFormat: 'json' | 'css' | 'both';
    showGrid: boolean;
    compactMode: boolean;
  };
  createdAt: string;    // ISO 8601
  updatedAt: string;    // ISO 8601
}
```

### 1.5 Collaboration Schema (v1.1+)

```typescript
interface DesignSystemShare {
  id: string;           // UUID v4
  designSystemId: string;
  ownerId: string;
  accessType: 'public' | 'private' | 'unlisted';
  shareLink: string;    // https://neoloop.design/s/abc123
  allowedUsers?: string[]; // User IDs with access
  permissions: {
    canView: boolean;
    canComment: boolean;
    canEdit: boolean;
    canFork: boolean;
  };
  expiresAt?: string;   // ISO 8601 (optional)
  createdAt: string;
  viewCount: number;
  forkCount: number;
}

interface Comment {
  id: string;
  designSystemId: string;
  moduleId: string;     // colors, typography, etc.
  itemId?: string;      // Specific item (color ID, icon ID)
  userId: string;
  content: string;
  mentions: string[];   // @userId
  resolved: boolean;
  parentId?: string;    // For threaded replies
  createdAt: string;
  updatedAt: string;
}
```

---

## 2. Storage Strategy

### 2.1 Database vs LocalStorage vs SessionStorage

| Data Type | Storage | Reason | v1.0 | v1.1+ |
|-----------|---------|--------|------|-------|
| **Design System State** | localStorage | Persistence across sessions | ✅ | ✅ (+ Cloud sync) |
| **Auto-save Drafts** | localStorage | Recover on crash | ✅ | ✅ |
| **User Preferences** | localStorage | Settings persistence | ✅ | ⚠️ (Migrate to DB) |
| **Templates** | Static JSON | No user modification | ✅ | ✅ |
| **Icons Library** | Static JSON | Large, rarely changes | ✅ | ✅ |
| **Session Temp Data** | sessionStorage | Single-session cache | ✅ | ✅ |
| **User Account** | - | No backend v1.0 | ❌ | ✅ Supabase |
| **Shared Design Systems** | - | No sharing v1.0 | ❌ | ✅ Supabase |
| **Version History** | localStorage | Limited history (v1.0) | ✅ | ✅ Supabase |
| **Comments** | - | No collab v1.0 | ❌ | ✅ Supabase |

### 2.2 LocalStorage Keys Namespace

```typescript
// Namespace: neoloop_ds_*
const STORAGE_KEYS = {
  // v1.0
  AUTOSAVE: 'neoloop_ds_autosave',           // Current design system
  PREFERENCES: 'neoloop_ds_preferences',     // User settings
  HISTORY: 'neoloop_ds_history',             // Undo/Redo stack
  SESSIONS: 'neoloop_ds_sessions',           // Last 5 saved sessions
  TEMPLATES: 'neoloop_ds_templates',         // Custom templates

  // v1.1+
  AUTH_TOKEN: 'neoloop_ds_auth_token',       // JWT token
  LAST_SYNC: 'neoloop_ds_last_sync',         // Sync timestamp
  OFFLINE_QUEUE: 'neoloop_ds_offline_queue', // Pending sync ops
} as const;
```

### 2.3 Caching Strategy

#### Cache Layers

```typescript
// Layer 1: Memory (React State)
// - Current design system in Context
// - Active module data
// - UI state (selected tab, filters)
// Lifetime: Session (until page reload)

// Layer 2: SessionStorage
// - Search results cache
// - Filtered icon lists
// - Computed CSS preview
// Lifetime: Single browser tab

// Layer 3: LocalStorage
// - Auto-saved design systems
// - User preferences
// - Undo/Redo history
// Lifetime: Persistent (until cleared)

// Layer 4: IndexedDB (v1.5+)
// - Large icon libraries (> 1MB)
// - Image assets
// - Offline-first support
// Lifetime: Persistent
```

#### Cache Invalidation Rules

```typescript
interface CacheStrategy {
  // Auto-save: Invalidate on state change (debounced 30s)
  autoSave: {
    trigger: 'state_change';
    debounce: 30000; // ms
  };

  // Search results: Invalidate on query change
  searchCache: {
    trigger: 'query_change';
    maxSize: 50; // entries
    ttl: 300000; // 5 min
  };

  // CSS preview: Invalidate on token change
  cssPreview: {
    trigger: 'token_change';
    debounce: 500; // ms
  };

  // Icon library: Never invalidate (static)
  iconLibrary: {
    trigger: 'manual_refresh_only';
  };
}
```

### 2.4 Sync Strategy (v1.1+)

```typescript
interface SyncStrategy {
  mode: 'optimistic' | 'pessimistic' | 'eventual';
  frequency: number; // ms
  conflictResolution: 'server-wins' | 'client-wins' | 'last-write-wins' | 'manual';
}

// Recommended for v1.1
const SYNC_CONFIG: SyncStrategy = {
  mode: 'optimistic',           // Update UI immediately
  frequency: 30000,             // Sync every 30s
  conflictResolution: 'last-write-wins'
};

// Sync Flow
// 1. User edits design system locally
// 2. Update React state immediately (optimistic)
// 3. Queue sync operation
// 4. After 30s debounce, send to Supabase
// 5. On conflict, use last-write-wins strategy
// 6. Update local state if server changed
```

#### Offline Support (v1.5+)

```typescript
interface OfflineQueue {
  operations: SyncOperation[];
  retryPolicy: {
    maxRetries: number;     // 3
    backoff: 'exponential'; // 1s, 2s, 4s, 8s...
  };
}

interface SyncOperation {
  id: string;
  type: 'create' | 'update' | 'delete';
  entity: 'design_system' | 'preference' | 'comment';
  data: any;
  timestamp: string;
  retries: number;
}

// Queue operations when offline
// Retry on reconnect
// Merge conflicts on success
```

---

## 3. Component Data Patterns

### 3.1 Table Data Specifications

#### Color Palette Table
```typescript
interface ColorTableRow {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  hsl: string;
  contrast: number;
  group: string;
  selected: boolean;
}

// Table structure: 7 columns × 10 rows = 70 colors
const colorTable: ColorTableRow[][] = [
  // Column 1: Red-Pink (10 colors)
  [...],
  // Column 2: Orange-Yellow (10 colors)
  [...],
  // ... (7 columns total)
];
```

#### Typography Table
```typescript
interface TypographyTableRow {
  id: string;
  family: string;
  variant: string;
  weight: number;
  style: 'normal' | 'italic';
  preview: string; // "Neoloop"
  selected: boolean;
}
```

#### Icons Table
```typescript
interface IconTableRow {
  id: string;
  name: string;
  category: string;
  svg: string;
  keywords: string[];
  selected: boolean;
}

// Grouping: By category
const iconsByCategory = {
  interface: [...],   // 100+ icons
  finance: [...],     // 50+ icons
  communication: [...], // 30+ icons
  // ... (10 categories)
};
```

### 3.2 Chart Data Structures

#### Recharts Data Format
```typescript
// Pie Chart
interface PieChartData {
  name: string;
  value: number;
  fill: string;
}

const pieExample: PieChartData[] = [
  { name: 'Desktop', value: 400, fill: '#FF453A' },
  { name: 'Mobile', value: 300, fill: '#32ADE6' },
  { name: 'Tablet', value: 200, fill: '#FFD60A' },
];

// Line Chart
interface LineChartData {
  name: string;
  value: number;
  [key: string]: any; // Multiple series
}

const lineExample: LineChartData[] = [
  { name: 'Jan', users: 400, revenue: 2400 },
  { name: 'Feb', users: 300, revenue: 1398 },
  { name: 'Mar', users: 200, revenue: 9800 },
];

// Bar Chart
interface BarChartData {
  name: string;
  value: number;
}

const barExample: BarChartData[] = [
  { name: 'Product A', value: 400 },
  { name: 'Product B', value: 300 },
  { name: 'Product C', value: 200 },
];

// Area Chart
interface AreaChartData {
  name: string;
  [key: string]: any; // Stacked series
}

const areaExample: AreaChartData[] = [
  { month: 'Jan', sales: 4000, expenses: 2400, profit: 1600 },
  { month: 'Feb', sales: 3000, expenses: 1398, profit: 1602 },
];
```

### 3.3 Form Data Handling

#### Form State Schema
```typescript
interface FormState {
  // Text Input
  textInput: {
    value: string;
    error?: string;
    touched: boolean;
    valid: boolean;
  };

  // Select
  select: {
    value: string | string[];
    options: SelectOption[];
    searchable: boolean;
    multiple: boolean;
  };

  // Checkbox/Toggle
  checkbox: {
    checked: boolean;
    indeterminate?: boolean;
  };

  // Date Picker
  datePicker: {
    value: Date | null;
    min?: Date;
    max?: Date;
    format: string; // YYYY-MM-DD
  };

  // File Upload
  fileUpload: {
    files: File[];
    maxSize: number;   // bytes
    accept: string;    // .svg, .png
    multiple: boolean;
  };
}

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}
```

#### Form Validation
```typescript
interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
}

interface FormValidation {
  rules: Record<string, ValidationRule[]>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isValid: boolean;
}

// Example: Color hex validation
const hexColorRules: ValidationRule[] = [
  { type: 'required', message: 'Color is required' },
  { type: 'pattern', value: /^#[0-9A-Fa-f]{6}$/, message: 'Invalid hex color' }
];
```

### 3.4 File Upload Handling Architecture

#### SVG Upload Flow
```typescript
interface SVGUploadConfig {
  maxSize: 100 * 1024;      // 100 KB
  accept: '.svg';
  sanitize: true;           // Remove scripts
  optimize: true;           // SVGO
  validate: {
    checkXSS: true;
    checkViewBox: true;
    checkDimensions: true;
  };
}

// Upload Flow
// 1. User selects SVG file
// 2. Client-side validation (size, type)
// 3. Read file as text
// 4. Sanitize (remove <script>, event handlers)
// 5. Optimize with SVGO
// 6. Validate viewBox and dimensions
// 7. Store in state (base64 or data URL)
// 8. Preview in UI
```

#### Security Considerations
```typescript
// SVG Sanitization (prevent XSS)
function sanitizeSVG(svgContent: string): string {
  // Remove dangerous tags
  const forbiddenTags = ['script', 'iframe', 'object', 'embed'];
  let sanitized = svgContent;

  forbiddenTags.forEach(tag => {
    const regex = new RegExp(`<${tag}[^>]*>.*?<\/${tag}>`, 'gi');
    sanitized = sanitized.replace(regex, '');
  });

  // Remove event handlers
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');

  // Remove javascript: URLs
  sanitized = sanitized.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, '');

  return sanitized;
}

// File size check
function validateFileSize(file: File, maxSize: number): boolean {
  return file.size <= maxSize;
}

// MIME type check
function validateMimeType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type);
}
```

---

## 4. API Integration Specs

### 4.1 Mock API for Phase 1-2 (v1.0)

```typescript
// src/api/mock.ts

interface MockAPI {
  // Templates
  getTemplates(): Promise<DesignSystemTemplate[]>;
  getTemplate(id: string): Promise<DesignSystemTemplate>;

  // Icons (static JSON)
  getIcons(category?: string): Promise<IconItem[]>;
  searchIcons(query: string): Promise<IconItem[]>;

  // Social Icons
  getSocialIcons(): Promise<SocialIconItem[]>;

  // Backgrounds
  getBackgrounds(type?: string): Promise<BackgroundItem[]>;
}

// Implementation
export const mockAPI: MockAPI = {
  async getTemplates() {
    // Return static templates from /public/templates/
    const response = await fetch('/templates/index.json');
    return response.json();
  },

  async getTemplate(id: string) {
    const response = await fetch(`/templates/${id}.json`);
    return response.json();
  },

  async getIcons(category?: string) {
    const response = await fetch('/icons/lucide-icons.json');
    const allIcons = await response.json();

    if (category) {
      return allIcons.filter(icon => icon.category === category);
    }
    return allIcons;
  },

  async searchIcons(query: string) {
    const allIcons = await this.getIcons();
    const lowerQuery = query.toLowerCase();

    return allIcons.filter(icon =>
      icon.name.toLowerCase().includes(lowerQuery) ||
      icon.keywords.some(kw => kw.toLowerCase().includes(lowerQuery))
    );
  },

  async getSocialIcons() {
    const response = await fetch('/icons/social-icons.json');
    return response.json();
  },

  async getBackgrounds(type?: string) {
    const response = await fetch('/backgrounds/index.json');
    const allBackgrounds = await response.json();

    if (type) {
      return allBackgrounds.filter(bg => bg.type === type);
    }
    return allBackgrounds;
  }
};
```

### 4.2 Real API Integration Path (Phase 5 - v1.1+)

#### Supabase Client Setup
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});
```

#### API Service Layer
```typescript
// src/api/designSystems.ts
import { supabase } from '../lib/supabase';
import type { DesignSystem, DesignSystemShare } from '../types';

export const designSystemsAPI = {
  // CRUD Operations
  async create(designSystem: DesignSystem) {
    const { data, error } = await supabase
      .from('design_systems')
      .insert({
        name: designSystem.metadata.name,
        description: designSystem.metadata.description,
        data: designSystem,
        owner_id: (await supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, designSystem: DesignSystem) {
    const { data, error } = await supabase
      .from('design_systems')
      .update({
        data: designSystem,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('design_systems')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('design_systems')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async getMyDesignSystems() {
    const { data, error } = await supabase
      .from('design_systems')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Sharing
  async createShareLink(designSystemId: string, options: {
    accessType: 'public' | 'private' | 'unlisted';
    expiresAt?: string;
  }) {
    const { data, error } = await supabase
      .from('design_system_shares')
      .insert({
        design_system_id: designSystemId,
        access_type: options.accessType,
        expires_at: options.expiresAt,
        share_link: generateShareLink()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getByShareLink(shareLink: string) {
    const { data, error } = await supabase
      .from('design_system_shares')
      .select(`
        *,
        design_systems (*)
      `)
      .eq('share_link', shareLink)
      .single();

    if (error) throw error;
    return data;
  }
};

function generateShareLink(): string {
  return Math.random().toString(36).substring(2, 15);
}
```

### 4.3 Data Fetching Patterns (SWR/React Query)

#### React Query Setup (Recommended for v1.1+)
```typescript
// src/lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 minutes
      cacheTime: 10 * 60 * 1000,     // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
    }
  }
});
```

#### Custom Hooks
```typescript
// src/hooks/useDesignSystems.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { designSystemsAPI } from '../api/designSystems';

export function useDesignSystems() {
  return useQuery({
    queryKey: ['designSystems'],
    queryFn: designSystemsAPI.getMyDesignSystems
  });
}

export function useDesignSystem(id: string) {
  return useQuery({
    queryKey: ['designSystems', id],
    queryFn: () => designSystemsAPI.getById(id),
    enabled: !!id
  });
}

export function useCreateDesignSystem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: designSystemsAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designSystems'] });
    }
  });
}

export function useUpdateDesignSystem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: DesignSystem }) =>
      designSystemsAPI.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['designSystems'] });
      queryClient.invalidateQueries({ queryKey: ['designSystems', variables.id] });
    }
  });
}
```

#### Loading States Pattern
```typescript
// Component usage
function DesignSystemsList() {
  const { data, isLoading, error } = useDesignSystems();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div>
      {data?.map(ds => (
        <DesignSystemCard key={ds.id} designSystem={ds} />
      ))}
    </div>
  );
}
```

### 4.4 Error Handling Patterns

```typescript
// src/lib/errors.ts

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public fields: Record<string, string>
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Error handler
export function handleAPIError(error: unknown): never {
  if (error instanceof APIError) {
    // Log to error tracking service (Sentry)
    console.error('API Error:', error.message, error.code);
    throw error;
  }

  if (error instanceof NetworkError) {
    console.error('Network Error:', error.message);
    throw error;
  }

  if (error instanceof ValidationError) {
    console.error('Validation Error:', error.fields);
    throw error;
  }

  // Unknown error
  console.error('Unknown Error:', error);
  throw new APIError('An unexpected error occurred', 500, 'UNKNOWN_ERROR');
}

// Usage in API calls
async function fetchDesignSystem(id: string) {
  try {
    const { data, error } = await supabase
      .from('design_systems')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new APIError(
        error.message,
        error.code === 'PGRST116' ? 404 : 500,
        error.code
      );
    }

    return data;
  } catch (error) {
    return handleAPIError(error);
  }
}
```

---

## 5. State Management Strategy

### 5.1 Context vs Redux Decision

**Decision: Context API + useReducer for v1.0**

Rationale:
- ✅ Simpler setup (no additional dependencies)
- ✅ Sufficient for single-user, client-side state
- ✅ Built-in React (no learning curve)
- ✅ Easy migration path to Zustand (v1.5+)
- ❌ Redux is overkill for MVP (no complex middleware needed)

**Migration to Zustand (v1.5+)** if:
- Multi-tab sync required
- DevTools debugging needed
- Performance issues with Context re-renders
- Real-time collaboration (needs middleware)

### 5.2 Global State for Design Tokens

```typescript
// src/context/DesignSystemContext.tsx
import { createContext, useContext, useReducer, ReactNode } from 'react';
import type { DesignSystem, DesignSystemAction } from '../types';

interface DesignSystemContextType {
  state: DesignSystem;
  dispatch: React.Dispatch<DesignSystemAction>;
}

const DesignSystemContext = createContext<DesignSystemContextType | null>(null);

export function useDesignSystem() {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within DesignSystemProvider');
  }
  return context;
}

export function DesignSystemProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(designSystemReducer, initialDesignSystem);

  return (
    <DesignSystemContext.Provider value={{ state, dispatch }}>
      {children}
    </DesignSystemContext.Provider>
  );
}
```

### 5.3 Local vs Global State Patterns

```typescript
// GLOBAL STATE (Context)
// - Design system data (tokens, selections)
// - User preferences
// - Undo/Redo history
// - Current module/view

// LOCAL STATE (useState)
// - Form inputs (before submission)
// - Modal open/close
// - Dropdown expanded/collapsed
// - Search query (ephemeral)
// - Hover states

// Example: Color selection
function ColorTokenView() {
  // GLOBAL: Selected colors (persists)
  const { state, dispatch } = useDesignSystem();

  // LOCAL: Search filter (ephemeral)
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const filteredColors = useMemo(() => {
    return state.tokens.colors.filter(color =>
      color.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [state.tokens.colors, searchQuery]);

  function handleColorClick(color: ColorToken) {
    dispatch({
      type: 'TOGGLE_COLOR',
      payload: color.id
    });
  }

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search colors..."
      />

      {filteredColors.map(color => (
        <ColorCard
          key={color.id}
          color={color}
          selected={color.selected}
          hovered={hoveredColor === color.id}
          onClick={() => handleColorClick(color)}
          onMouseEnter={() => setHoveredColor(color.id)}
          onMouseLeave={() => setHoveredColor(null)}
        />
      ))}
    </div>
  );
}
```

### 5.4 Performance Optimization

#### Memoization Strategy
```typescript
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive components
const ColorCard = memo(function ColorCard({ color, selected, onClick }: ColorCardProps) {
  return (
    <div
      onClick={onClick}
      className={selected ? 'selected' : ''}
      style={{ backgroundColor: color.hex }}
    >
      {color.name}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison (only re-render if selected state changes)
  return prevProps.selected === nextProps.selected &&
         prevProps.color.id === nextProps.color.id;
});

// Memoize computed values
function ColorTokenView() {
  const { state } = useDesignSystem();

  const selectedColors = useMemo(() =>
    state.tokens.colors.filter(c => c.selected),
    [state.tokens.colors]
  );

  const colorsByGroup = useMemo(() =>
    groupBy(state.tokens.colors, 'group'),
    [state.tokens.colors]
  );

  return (
    <div>
      <p>{selectedColors.length} colors selected</p>
      {/* ... */}
    </div>
  );
}

// Memoize callbacks
function ColorTokenView() {
  const { dispatch } = useDesignSystem();

  const handleColorToggle = useCallback((colorId: string) => {
    dispatch({ type: 'TOGGLE_COLOR', payload: colorId });
  }, [dispatch]);

  return (
    <div>
      {/* Pass stable callback reference */}
      <ColorCard onClick={() => handleColorToggle(color.id)} />
    </div>
  );
}
```

#### Reducer Optimization
```typescript
// Immer for immutable updates (v1.5+)
import { produce } from 'immer';

function designSystemReducer(
  state: DesignSystem,
  action: DesignSystemAction
): DesignSystem {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'TOGGLE_COLOR':
        const color = draft.tokens.colors.find(c => c.id === action.payload);
        if (color) {
          color.selected = !color.selected;
        }
        break;

      case 'UPDATE_TYPOGRAPHY':
        draft.tokens.typography = action.payload;
        break;

      // ... other cases
    }
  });
}
```

#### Lazy Loading Components
```typescript
import { lazy, Suspense } from 'react';

// Lazy load heavy modules
const ChartsView = lazy(() => import('./components/modules/ChartsView'));
const IconsView = lazy(() => import('./components/modules/IconsView'));
const AnimationsView = lazy(() => import('./components/modules/AnimationsView'));

function MainContent({ currentView }: { currentView: ViewType }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      {currentView === ViewType.CHARTS && <ChartsView />}
      {currentView === ViewType.ICONS && <IconsView />}
      {currentView === ViewType.ANIMATIONS && <AnimationsView />}
    </Suspense>
  );
}
```

---

## 6. Supabase Setup (v1.1 Prep)

### 6.1 Database Schema Design

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users (managed by Supabase Auth)
-- auth.users table is built-in

-- Design Systems Table
CREATE TABLE design_systems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  data JSONB NOT NULL,
  version TEXT NOT NULL DEFAULT '1.0.0',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_design_systems_owner ON design_systems(owner_id);
CREATE INDEX idx_design_systems_created ON design_systems(created_at DESC);
CREATE INDEX idx_design_systems_data ON design_systems USING GIN(data);

-- Design System Shares Table
CREATE TABLE design_system_shares (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  design_system_id UUID NOT NULL REFERENCES design_systems(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  share_link TEXT UNIQUE NOT NULL,
  access_type TEXT NOT NULL CHECK (access_type IN ('public', 'private', 'unlisted')),
  expires_at TIMESTAMPTZ,
  view_count INTEGER NOT NULL DEFAULT 0,
  fork_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_shares_link ON design_system_shares(share_link);
CREATE INDEX idx_shares_ds ON design_system_shares(design_system_id);

-- Comments Table (v2.0)
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  design_system_id UUID NOT NULL REFERENCES design_systems(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  item_id TEXT,
  content TEXT NOT NULL,
  mentions UUID[] DEFAULT ARRAY[]::UUID[],
  resolved BOOLEAN NOT NULL DEFAULT FALSE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_comments_ds ON comments(design_system_id);
CREATE INDEX idx_comments_user ON comments(user_id);
CREATE INDEX idx_comments_parent ON comments(parent_id);

-- User Preferences Table
CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  theme TEXT NOT NULL DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'auto')),
  favorites JSONB NOT NULL DEFAULT '{"colors": [], "icons": [], "charts": []}'::jsonb,
  recent_design_systems UUID[] DEFAULT ARRAY[]::UUID[],
  settings JSONB NOT NULL DEFAULT '{
    "autoSave": true,
    "autoSaveInterval": 30000,
    "exportFormat": "json",
    "showGrid": true,
    "compactMode": false
  }'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Version History Table (Git-like)
CREATE TABLE design_system_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  design_system_id UUID NOT NULL REFERENCES design_systems(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  version_number INTEGER NOT NULL,
  commit_message TEXT,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_versions_ds ON design_system_versions(design_system_id, version_number DESC);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER design_systems_updated_at
BEFORE UPDATE ON design_systems
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER comments_updated_at
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER user_preferences_updated_at
BEFORE UPDATE ON user_preferences
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
```

### 6.2 Row-Level Security (RLS) Policies

```sql
-- Enable RLS
ALTER TABLE design_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_system_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_system_versions ENABLE ROW LEVEL SECURITY;

-- Design Systems Policies
-- Users can read their own design systems
CREATE POLICY "Users can view own design systems"
ON design_systems
FOR SELECT
USING (auth.uid() = owner_id);

-- Users can insert their own design systems
CREATE POLICY "Users can create design systems"
ON design_systems
FOR INSERT
WITH CHECK (auth.uid() = owner_id);

-- Users can update their own design systems
CREATE POLICY "Users can update own design systems"
ON design_systems
FOR UPDATE
USING (auth.uid() = owner_id)
WITH CHECK (auth.uid() = owner_id);

-- Users can delete their own design systems
CREATE POLICY "Users can delete own design systems"
ON design_systems
FOR DELETE
USING (auth.uid() = owner_id);

-- Shared Design Systems Policies
-- Anyone can view public/unlisted shares
CREATE POLICY "Public shares are viewable by anyone"
ON design_system_shares
FOR SELECT
USING (
  access_type IN ('public', 'unlisted')
  AND (expires_at IS NULL OR expires_at > NOW())
);

-- Share owners can manage shares
CREATE POLICY "Owners can manage shares"
ON design_system_shares
FOR ALL
USING (auth.uid() = owner_id)
WITH CHECK (auth.uid() = owner_id);

-- Comments Policies
-- Users can view comments on design systems they have access to
CREATE POLICY "Users can view comments on accessible design systems"
ON comments
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM design_systems ds
    WHERE ds.id = comments.design_system_id
    AND ds.owner_id = auth.uid()
  )
  OR EXISTS (
    SELECT 1 FROM design_system_shares dss
    WHERE dss.design_system_id = comments.design_system_id
    AND dss.access_type IN ('public', 'unlisted')
  )
);

-- Users can create comments
CREATE POLICY "Users can create comments"
ON comments
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own comments
CREATE POLICY "Users can update own comments"
ON comments
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own comments
CREATE POLICY "Users can delete own comments"
ON comments
FOR DELETE
USING (auth.uid() = user_id);

-- User Preferences Policies
-- Users can only access their own preferences
CREATE POLICY "Users can manage own preferences"
ON user_preferences
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Version History Policies
-- Users can view versions of their own design systems
CREATE POLICY "Users can view own design system versions"
ON design_system_versions
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM design_systems ds
    WHERE ds.id = design_system_versions.design_system_id
    AND ds.owner_id = auth.uid()
  )
);

-- Users can create versions
CREATE POLICY "Users can create versions"
ON design_system_versions
FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### 6.3 Realtime Subscriptions (v2.0)

```typescript
// src/hooks/useRealtimeDesignSystem.ts
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useQueryClient } from '@tanstack/react-query';

export function useRealtimeDesignSystem(designSystemId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Subscribe to changes on this design system
    const channel = supabase
      .channel(`design_system:${designSystemId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'design_systems',
          filter: `id=eq.${designSystemId}`
        },
        (payload) => {
          console.log('Design system updated:', payload);

          // Invalidate cache to refetch
          queryClient.invalidateQueries({
            queryKey: ['designSystems', designSystemId]
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [designSystemId, queryClient]);
}

// Usage
function DesignSystemEditor({ id }: { id: string }) {
  const { data } = useDesignSystem(id);
  useRealtimeDesignSystem(id); // Auto-refresh on server changes

  return <div>{/* ... */}</div>;
}
```

#### Presence Tracking (Multi-user Collaboration)
```typescript
// src/hooks/usePresence.ts
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface PresenceUser {
  userId: string;
  username: string;
  cursorPosition?: { x: number; y: number };
  activeModule?: string;
}

export function usePresence(designSystemId: string) {
  const [users, setUsers] = useState<PresenceUser[]>([]);

  useEffect(() => {
    const channel = supabase.channel(`presence:${designSystemId}`, {
      config: {
        presence: {
          key: supabase.auth.getUser().then(u => u.data.user?.id || 'anonymous')
        }
      }
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const presentUsers = Object.values(state).flat() as PresenceUser[];
        setUsers(presentUsers);
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('New users joined:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('Users left:', leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          const user = await supabase.auth.getUser();
          await channel.track({
            userId: user.data.user?.id || 'anonymous',
            username: user.data.user?.email?.split('@')[0] || 'Anonymous',
            onlineAt: new Date().toISOString()
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [designSystemId]);

  return { users };
}
```

---

## 7. Migration Strategy

### 7.1 v1.0 → v1.1 (LocalStorage → Cloud)

```typescript
// src/utils/migration.ts

export async function migrateToCloud() {
  // Step 1: Read all localStorage design systems
  const localDS = localStorage.getItem(STORAGE_KEYS.AUTOSAVE);
  const sessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);

  if (!localDS) {
    console.log('No local design systems to migrate');
    return;
  }

  // Step 2: Parse and validate
  const designSystem = JSON.parse(localDS);
  const validated = validateDesignSystem(designSystem);

  // Step 3: Upload to Supabase
  const { data, error } = await designSystemsAPI.create(validated);

  if (error) {
    console.error('Migration failed:', error);
    // Keep local copy as backup
    return;
  }

  // Step 4: Mark as migrated (don't delete local yet)
  localStorage.setItem('neoloop_ds_migrated', 'true');
  localStorage.setItem('neoloop_ds_cloud_id', data.id);

  console.log('✅ Migrated to cloud:', data.id);
}

// Run migration on first login
export async function checkAndMigrate() {
  const migrated = localStorage.getItem('neoloop_ds_migrated');
  const hasLocalData = localStorage.getItem(STORAGE_KEYS.AUTOSAVE);

  if (!migrated && hasLocalData) {
    const confirmMigrate = confirm(
      'You have local design systems. Would you like to sync them to the cloud?'
    );

    if (confirmMigrate) {
      await migrateToCloud();
    }
  }
}
```

### 7.2 Schema Versioning
```typescript
// src/utils/schemaVersion.ts

export const SCHEMA_VERSIONS = {
  '1.0.0': {
    validate: validateV1_0,
    migrate: null // Current version
  },
  '0.9.0': {
    validate: validateV0_9,
    migrate: migrateV0_9_to_V1_0
  }
};

function migrateV0_9_to_V1_0(oldSchema: any): DesignSystemSchema {
  return {
    _version: '1.0.0',
    _created: oldSchema.created || new Date().toISOString(),
    _updated: new Date().toISOString(),
    _id: oldSchema.id || uuidv4(),
    metadata: {
      name: oldSchema.name || 'Untitled',
      description: oldSchema.description,
      author: oldSchema.author || 'Unknown',
      tags: []
    },
    // ... map old fields to new schema
  };
}

export function migrateSchema(data: any): DesignSystemSchema {
  const version = data._version || '0.9.0';
  const versionConfig = SCHEMA_VERSIONS[version];

  if (!versionConfig) {
    throw new Error(`Unsupported schema version: ${version}`);
  }

  if (versionConfig.migrate) {
    return versionConfig.migrate(data);
  }

  return data; // Already latest version
}
```

---

## 8. Performance & Scalability

### 8.1 Bundle Size Optimization

```typescript
// Target: < 500 KB total bundle

// Lazy load heavy modules
const ChartsView = lazy(() => import('./modules/ChartsView')); // ~100 KB (Recharts)
const IconsView = lazy(() => import('./modules/IconsView'));   // ~50 KB (3.8k icons)
const AnimationsView = lazy(() => import('./modules/AnimationsView')); // ~30 KB

// Code splitting by route
const routes = [
  { path: '/editor', component: lazy(() => import('./pages/Editor')) },
  { path: '/preview', component: lazy(() => import('./pages/Preview')) },
  { path: '/share/:id', component: lazy(() => import('./pages/SharedView')) }
];

// Tree-shaking: Import only used Recharts components
import { PieChart, Pie, LineChart, Line } from 'recharts';
// NOT: import * from 'recharts';

// Dynamic imports for icons
async function loadIcon(iconName: string) {
  const icon = await import(`lucide-react/dist/esm/icons/${iconName}`);
  return icon.default;
}
```

### 8.2 Database Query Optimization (v1.1+)

```sql
-- Index frequently queried columns
CREATE INDEX idx_design_systems_owner_updated ON design_systems(owner_id, updated_at DESC);
CREATE INDEX idx_shares_link_expires ON design_system_shares(share_link, expires_at);

-- Partial index for active shares
CREATE INDEX idx_active_shares ON design_system_shares(design_system_id)
WHERE expires_at IS NULL OR expires_at > NOW();

-- GIN index for JSONB searches
CREATE INDEX idx_design_systems_tokens ON design_systems USING GIN((data -> 'tokens'));
CREATE INDEX idx_design_systems_components ON design_systems USING GIN((data -> 'components'));

-- Query optimization: Select only needed columns
-- BAD
SELECT * FROM design_systems WHERE owner_id = $1;

-- GOOD
SELECT id, name, description, updated_at FROM design_systems WHERE owner_id = $1;

-- Use pagination
SELECT * FROM design_systems
WHERE owner_id = $1
ORDER BY updated_at DESC
LIMIT 20 OFFSET 0;
```

### 8.3 Caching Strategy (v1.1+)

```typescript
// React Query cache layers
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Layer 1: Memory cache (5 min)
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,

      // Layer 2: LocalStorage persistence
      persister: createSyncStoragePersister({
        storage: window.localStorage
      })
    }
  }
});

// Service Worker cache (v1.5+ - PWA)
// Cache static assets (icons, templates)
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/icons/') || event.request.url.includes('/templates/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
```

---

## 9. Testing & Validation

### 9.1 JSON Schema Validation

```typescript
// src/utils/validateSchema.ts
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const designSystemSchema = {
  type: 'object',
  required: ['_version', 'metadata', 'tokens'],
  properties: {
    _version: { type: 'string', pattern: '^\\d+\\.\\d+\\.\\d+$' },
    _id: { type: 'string', format: 'uuid' },
    _created: { type: 'string', format: 'date-time' },
    _updated: { type: 'string', format: 'date-time' },
    metadata: {
      type: 'object',
      required: ['name', 'author'],
      properties: {
        name: { type: 'string', minLength: 1, maxLength: 100 },
        description: { type: 'string', maxLength: 500 },
        author: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } }
      }
    },
    tokens: {
      type: 'object',
      required: ['colors', 'typography', 'spacing'],
      properties: {
        colors: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'name', 'hex', 'group'],
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              hex: { type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' },
              group: { type: 'string' }
            }
          }
        }
        // ... other token schemas
      }
    }
  }
};

const validate = ajv.compile(designSystemSchema);

export function validateDesignSystem(data: unknown): DesignSystemSchema {
  const valid = validate(data);

  if (!valid) {
    const errors = validate.errors?.map(e =>
      `${e.instancePath} ${e.message}`
    ).join(', ');

    throw new ValidationError(
      `Invalid design system schema: ${errors}`,
      validate.errors || []
    );
  }

  return data as DesignSystemSchema;
}
```

### 9.2 Unit Tests for Data Functions

```typescript
// src/utils/__tests__/exportJSON.test.ts
import { describe, it, expect, vi } from 'vitest';
import { exportJSON } from '../exportJSON';

describe('exportJSON', () => {
  it('should create a download link with correct filename', () => {
    const mockDS = createMockDesignSystem();
    const createElementSpy = vi.spyOn(document, 'createElement');

    exportJSON(mockDS);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(createElementSpy).toHaveBeenCalledWith('a');
  });

  it('should generate valid JSON', () => {
    const mockDS = createMockDesignSystem();

    // Mock Blob to capture JSON content
    const blobMock = vi.fn();
    global.Blob = blobMock as any;

    exportJSON(mockDS);

    const jsonContent = blobMock.mock.calls[0][0][0];
    expect(() => JSON.parse(jsonContent)).not.toThrow();
  });

  it('should include all required fields', () => {
    const mockDS = createMockDesignSystem();
    const blobMock = vi.fn();
    global.Blob = blobMock as any;

    exportJSON(mockDS);

    const jsonContent = blobMock.mock.calls[0][0][0];
    const parsed = JSON.parse(jsonContent);

    expect(parsed).toHaveProperty('_version');
    expect(parsed).toHaveProperty('metadata');
    expect(parsed).toHaveProperty('tokens');
  });
});
```

---

## 10. Documentation

### 10.1 API Documentation (v1.1+)

```typescript
/**
 * Design Systems API
 *
 * Provides CRUD operations for design systems with Supabase backend.
 *
 * @example
 * ```typescript
 * // Create a new design system
 * const ds = await designSystemsAPI.create({
 *   name: 'My Design System',
 *   data: { ... }
 * });
 *
 * // Update design system
 * await designSystemsAPI.update(ds.id, updatedData);
 *
 * // Share design system
 * const shareLink = await designSystemsAPI.createShareLink(ds.id, {
 *   accessType: 'public'
 * });
 * ```
 */
export const designSystemsAPI = {
  /**
   * Create a new design system
   * @param designSystem - The design system data
   * @returns Promise<DesignSystemRecord>
   * @throws {APIError} If creation fails
   */
  async create(designSystem: DesignSystem) { },

  /**
   * Update an existing design system
   * @param id - The design system ID
   * @param designSystem - Updated design system data
   * @returns Promise<DesignSystemRecord>
   * @throws {APIError} If update fails or user unauthorized
   */
  async update(id: string, designSystem: DesignSystem) { },

  // ... etc
};
```

### 10.2 Data Flow Diagrams

```
User Action → Component → Dispatch Action → Reducer → Update State → Auto-save
                ↓                                          ↓
              UI Update ←────────────────────────── Re-render
                                                     ↓
                                              localStorage
                                                     ↓
                                            (v1.1+) Supabase
```

---

## Summary & Next Steps

### Completed Specifications

✅ **1. Data Modeling**
- Complete schema for 26 modules
- Design tokens structure
- Component metadata
- User preferences
- Collaboration models

✅ **2. Storage Strategy**
- LocalStorage-first (v1.0)
- Cloud sync path (v1.1+)
- Caching layers defined
- Migration strategy

✅ **3. Component Data Patterns**
- Table structures
- Chart data formats
- Form handling
- File upload architecture

✅ **4. API Integration**
- Mock API for v1.0
- Real API design for v1.1+
- React Query patterns
- Error handling

✅ **5. State Management**
- Context API architecture
- Local vs Global state patterns
- Performance optimizations
- Migration to Zustand path

✅ **6. Supabase Setup**
- Complete database schema
- RLS policies
- Realtime subscriptions (v2.0)
- Presence tracking

### Implementation Priority

**Phase 1 (v1.0 - Week 1-2)**
1. Implement TypeScript types (`src/types/design-system.ts`)
2. Create Context API + Reducer (`src/context/`)
3. Build export/import utilities (`src/utils/`)
4. Setup auto-save hook (`src/hooks/useAutoSave.ts`)

**Phase 2 (v1.0 - Week 3-4)**
1. Implement mock API (`src/api/mock.ts`)
2. Create component data structures
3. Add JSON schema validation
4. Test with existing modules

**Phase 3 (v1.1 - Month 2-3)**
1. Setup Supabase project
2. Run database migrations
3. Implement API service layer
4. Migrate from localStorage to cloud

**Phase 4 (v2.0 - Month 4+)**
1. Real-time subscriptions
2. Presence tracking
3. Conflict resolution
4. Version control

---

**Status:** ✅ Ready for Implementation
**Author:** Data Engineer Agent
**Date:** 2026-01-30
**Next Review:** After v1.0 MVP completion

---
