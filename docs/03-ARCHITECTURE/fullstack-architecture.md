# Full-Stack Architecture - Neoloop Design System Builder v1.0

## 📋 Document Information

| Field | Value |
|-------|-------|
| **Project** | Neoloop Design System Builder |
| **Version** | 1.0.0 MVP |
| **PRD Reference** | prd-neoloop-design-system-builder-v1.0.md |
| **Architecture Type** | Single Page Application (SPA) |
| **Date** | 2026-01-26 |
| **Architect** | Aria (Architect Agent) |
| **Status** | 🟢 Ready for Implementation |

---

## 🎯 Architecture Focus

**Mission:** Implement all **26 modules** from PRD v1.0 as fast as possible with production-ready code.

**Decisions:**
- ✅ Google Fonts **NOW** (not v1.5)
- ✅ Focus on **FEATURES** (polish later)
- ✅ Production-ready MVP in **6 weeks**

---

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Client)                      │
│  ┌────────────────────────────────────────────────────┐ │
│  │            React SPA (Vite)                        │ │
│  │  ┌──────────────────────────────────────────────┐ │ │
│  │  │  Context API (Global State)                  │ │ │
│  │  │  ├─ Design Tokens (6)                        │ │ │
│  │  │  ├─ Visual Components (4)                    │ │ │
│  │  │  ├─ UI Components (3)                        │ │ │
│  │  │  ├─ Specific Modules (4)                     │ │ │
│  │  │  └─ System Features (9)                      │ │ │
│  │  └──────────────────────────────────────────────┘ │ │
│  │                                                    │ │
│  │  Components (26 modules)                          │ │
│  │  ├─ Sidebar Navigation                            │ │
│  │  ├─ Module Views (26)                             │ │
│  │  ├─ Property Inspector                            │ │
│  │  └─ Export/Import System                          │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
             │                      │
             ↓                      ↓
    ┌──────────────┐      ┌──────────────┐
    │ localStorage │      │ Google Fonts │
    │ (auto-save)  │      │    (CDN)     │
    └──────────────┘      └──────────────┘
```

**Architecture Type:** Client-side SPA (No backend needed for v1.0)

---

## 📦 Technology Stack

### Core Stack

| Technology | Version | Purpose | Status |
|------------|---------|---------|--------|
| **React** | 19.2.3 | UI Framework | ✅ Installed |
| **TypeScript** | 5.8.2 | Type Safety | ✅ Installed |
| **Vite** | 6.2.0 | Build Tool | ✅ Installed |
| **Tailwind CSS** | 3.4.16 | Styling | ⚠️ Need to install |
| **Lucide React** | 0.563.0 | Interface Icons | ✅ Installed |
| **Recharts** | 3.7.0 | Charts/Graphs | ❌ Need to install |
| **Google Fonts** | CDN | Typography | ⚠️ Need to configure |

### Additional Libraries

```json
{
  "dependencies": {
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "lucide-react": "^0.563.0",
    "recharts": "^3.7.0"           // ADD
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@vitejs/plugin-react": "^5.0.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.0",
    "tailwindcss": "^3.4.16",      // ADD
    "postcss": "^8.4.48",          // ADD
    "autoprefixer": "^10.4.20",    // ADD
    "vitest": "^2.1.8",            // ADD (for tests)
    "@testing-library/react": "^16.1.0"  // ADD (for tests)
  }
}
```

---

## 🗂️ Project Structure (Implementation Target)

```
neoloop-design/
├── src/
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # Entry point
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx        # Left navigation
│   │   │   ├── Toolbar.tsx        # Top toolbar
│   │   │   └── MainContent.tsx    # Content wrapper
│   │   │
│   │   ├── modules/               # 26 MODULE VIEWS
│   │   │   # Design Tokens (6)
│   │   │   ├── ColorTokensView.tsx         ✅ EXISTS
│   │   │   ├── TypographyView.tsx          ✅ EXISTS
│   │   │   ├── SpacingView.tsx             ✅ EXISTS
│   │   │   ├── ShadowsView.tsx             ❌ CREATE
│   │   │   ├── RadiusView.tsx              ❌ CREATE
│   │   │   ├── BreakpointsView.tsx         ❌ CREATE
│   │   │   #
│   │   │   # Visual Components (4)
│   │   │   ├── IconsView.tsx               ❌ CREATE
│   │   │   ├── SocialIconsView.tsx         ❌ CREATE
│   │   │   ├── ChartsView.tsx              ❌ CREATE
│   │   │   ├── BackgroundsView.tsx         ❌ CREATE
│   │   │   #
│   │   │   # UI Components (3)
│   │   │   ├── ButtonsView.tsx             ⚠️ SPLIT FROM UIComponentsView
│   │   │   ├── CardsView.tsx               ⚠️ SPLIT FROM UIComponentsView
│   │   │   ├── FormsView.tsx               ⚠️ SPLIT FROM UIComponentsView
│   │   │   #
│   │   │   # Specific Modules (4)
│   │   │   ├── AnimationsView.tsx          ❌ CREATE
│   │   │   ├── CheckboxView.tsx            ❌ CREATE
│   │   │   ├── LoginTemplatesView.tsx      ❌ CREATE
│   │   │   └── SidebarTemplatesView.tsx    ❌ CREATE
│   │   │
│   │   └── shared/
│   │       ├── PropertyInspector.tsx       ✅ EXISTS
│   │       ├── ExportModal.tsx             ⚠️ EXTRACT FROM App
│   │       ├── ModuleHeader.tsx            ❌ CREATE
│   │       └── SelectableGrid.tsx          ❌ CREATE
│   │
│   ├── context/
│   │   ├── DesignSystemContext.tsx         ❌ CREATE
│   │   ├── DesignSystemProvider.tsx        ❌ CREATE
│   │   └── designSystemReducer.ts          ❌ CREATE
│   │
│   ├── hooks/
│   │   ├── useDesignSystem.ts              ❌ CREATE
│   │   ├── useAutoSave.ts                  ❌ CREATE
│   │   └── useGoogleFonts.ts               ❌ CREATE
│   │
│   ├── utils/
│   │   ├── exportJSON.ts                   ❌ CREATE
│   │   ├── exportCSS.ts                    ❌ CREATE
│   │   ├── importJSON.ts                   ❌ CREATE
│   │   └── validateSchema.ts               ❌ CREATE
│   │
│   ├── types/
│   │   ├── design-system.ts                ⚠️ EXPAND
│   │   ├── modules.ts                      ❌ CREATE
│   │   └── actions.ts                      ❌ CREATE
│   │
│   ├── constants/
│   │   ├── colors.ts                       ⚠️ EXPAND
│   │   ├── typography.ts                   ⚠️ EXPAND
│   │   ├── spacing.ts                      ⚠️ EXPAND
│   │   ├── shadows.ts                      ❌ CREATE
│   │   ├── radius.ts                       ❌ CREATE
│   │   ├── breakpoints.ts                  ❌ CREATE
│   │   ├── icons.ts                        ❌ CREATE
│   │   ├── socialIcons.ts                  ❌ CREATE
│   │   ├── charts.ts                       ❌ CREATE
│   │   ├── backgrounds.ts                  ❌ CREATE
│   │   ├── animations.ts                   ❌ CREATE
│   │   ├── checkboxes.ts                   ❌ CREATE
│   │   ├── loginTemplates.ts               ❌ CREATE
│   │   └── sidebarTemplates.ts             ❌ CREATE
│   │
│   └── styles/
│       ├── index.css                       ⚠️ ADD GOOGLE FONTS
│       └── tailwind.css                    ❌ CREATE
│
├── public/
│   ├── icons/                              ❌ CREATE (SVGs from Figma)
│   └── templates/                          ❌ CREATE (screenshots)
│
├── index.html
├── vite.config.ts
├── tailwind.config.js                      ❌ CREATE
├── postcss.config.js                       ❌ CREATE
├── tsconfig.json
└── package.json
```

**Summary:**
- ✅ 6 files exist
- ⚠️ 7 files need modification
- ❌ 45+ files need creation

---

## 🎨 Module Implementation Matrix

### Priority P0: Core Infrastructure (Week 1)

| Task | Component | Complexity | Time | Status |
|------|-----------|------------|------|--------|
| **Setup Tailwind** | Config | Low | 1h | ❌ |
| **Google Fonts Integration** | index.css | Low | 2h | ❌ |
| **State Management** | Context API | Medium | 4h | ❌ |
| **Export JSON** | utils/exportJSON.ts | Low | 2h | ❌ |
| **Export CSS** | utils/exportCSS.ts | Medium | 3h | ❌ |
| **Auto-save** | hooks/useAutoSave.ts | Low | 2h | ❌ |
| **TypeScript Types** | types/*.ts | Medium | 3h | ❌ |

**Total P0:** 17h

### Priority P1: Design Tokens (Week 2)

| Module | Component | Complexity | Time | Status |
|--------|-----------|------------|------|--------|
| **Shadows** | ShadowsView.tsx | Low | 3h | ❌ |
| **Border Radius** | RadiusView.tsx | Low | 3h | ❌ |
| **Breakpoints** | BreakpointsView.tsx | Low | 3h | ❌ |

**Total P1:** 9h

### Priority P2: Visual Components (Week 3-4)

| Module | Component | Complexity | Time | Status |
|--------|-----------|------------|------|--------|
| **Icons** | IconsView.tsx | High | 8h | ❌ |
| **Social Icons** | SocialIconsView.tsx | Medium | 6h | ❌ |
| **Charts** | ChartsView.tsx | High | 10h | ❌ |
| **Backgrounds** | BackgroundsView.tsx | Medium | 4h | ❌ |

**Total P2:** 28h

### Priority P3: Specific Modules (Week 5)

| Module | Component | Complexity | Time | Status |
|--------|-----------|------------|------|--------|
| **Animations** | AnimationsView.tsx | Medium | 6h | ❌ |
| **Checkbox/Toggle** | CheckboxView.tsx | Medium | 4h | ❌ |
| **Login Templates** | LoginTemplatesView.tsx | High | 8h | ❌ |
| **Sidebar Templates** | SidebarTemplatesView.tsx | Medium | 6h | ❌ |

**Total P3:** 24h

### Priority P4: UI Components Refactor (Week 6)

| Task | Component | Complexity | Time | Status |
|------|-----------|------------|------|--------|
| **Split Buttons** | ButtonsView.tsx | Low | 2h | ❌ |
| **Split Cards** | CardsView.tsx | Low | 2h | ❌ |
| **Split Forms** | FormsView.tsx | Low | 2h | ❌ |

**Total P4:** 6h

### Priority P5: System Features (Week 6)

| Feature | Component | Complexity | Time | Status |
|---------|-----------|------------|------|--------|
| **Import JSON** | utils/importJSON.ts | Medium | 3h | ❌ |
| **Validation** | utils/validateSchema.ts | Medium | 3h | ❌ |

**Total P5:** 6h

**GRAND TOTAL:** 90 hours (~12 days of development)

---

## 💻 Implementation Guide

### Step 1: Setup Infrastructure (Week 1 - 17h)

#### 1.1 Install Dependencies

```bash
cd neo-design-system-builder

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install Recharts
npm install recharts

# Install Testing (optional but recommended)
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

#### 1.2 Configure Tailwind

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'neue': ['"Neue Einstellung"', 'sans-serif'],
        'playfair': ['"Playfair Display"', 'serif'],
        'roboto-mono': ['"Roboto Mono"', 'monospace'],
        'pt-sans': ['"PT Sans"', 'sans-serif'],
        'barlow': ['Barlow', 'sans-serif'],
        'sarala': ['Sarala', 'sans-serif'],
        'monda': ['Monda', 'sans-serif'],
        'jura': ['Jura', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

#### 1.3 Google Fonts Integration

```css
/* src/styles/index.css */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Roboto+Mono:wght@300;400;500;700&family=PT+Sans:wght@400;700&family=Barlow:wght@300;400;500;700&family=Sarala:wght@400;700&family=Monda:wght@400;700&family=Jura:wght@300;400;500;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom CSS variables from design system */
:root {
  /* Will be generated dynamically by export */
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Ensure Google Fonts load with fallbacks */
.font-neue { font-family: 'Neue Einstellung', 'PT Sans', sans-serif; }
.font-playfair { font-family: 'Playfair Display', Georgia, serif; }
.font-roboto-mono { font-family: 'Roboto Mono', 'Courier New', monospace; }
```

#### 1.4 Create Context API

```typescript
// src/context/DesignSystemContext.tsx
import { createContext, useContext } from 'react';
import type { DesignSystem, DesignSystemAction } from '../types';

interface DesignSystemContextType {
  state: DesignSystem;
  dispatch: React.Dispatch<DesignSystemAction>;
}

export const DesignSystemContext = createContext<DesignSystemContextType | null>(null);

export function useDesignSystem() {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within DesignSystemProvider');
  }
  return context;
}
```

```typescript
// src/context/DesignSystemProvider.tsx
import { ReactNode, useReducer } from 'react';
import { DesignSystemContext } from './DesignSystemContext';
import { designSystemReducer } from './designSystemReducer';
import { initialDesignSystem } from '../constants';
import { useAutoSave } from '../hooks/useAutoSave';

interface Props {
  children: ReactNode;
}

export function DesignSystemProvider({ children }: Props) {
  const loadInitialState = () => {
    try {
      const saved = localStorage.getItem('neoloop_ds_autosave');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load saved state:', error);
    }
    return initialDesignSystem;
  };

  const [state, dispatch] = useReducer(
    designSystemReducer,
    null,
    loadInitialState
  );

  // Auto-save every 30 seconds
  useAutoSave(state, 30000);

  return (
    <DesignSystemContext.Provider value={{ state, dispatch }}>
      {children}
    </DesignSystemContext.Provider>
  );
}
```

```typescript
// src/context/designSystemReducer.ts
import type { DesignSystem, DesignSystemAction } from '../types';

export function designSystemReducer(
  state: DesignSystem,
  action: DesignSystemAction
): DesignSystem {
  switch (action.type) {
    case 'UPDATE_COLOR':
      return {
        ...state,
        colors: state.colors.map(c =>
          c.id === action.payload.id ? action.payload : c
        ),
      };

    case 'UPDATE_TYPOGRAPHY':
      return {
        ...state,
        typography: action.payload,
      };

    case 'UPDATE_SPACING':
      return {
        ...state,
        spacing: action.payload,
      };

    case 'ADD_ICON':
      return {
        ...state,
        icons: {
          ...state.icons,
          selected: [...state.icons.selected, action.payload],
        },
      };

    case 'REMOVE_ICON':
      return {
        ...state,
        icons: {
          ...state.icons,
          selected: state.icons.selected.filter(id => id !== action.payload),
        },
      };

    case 'IMPORT_DESIGN_SYSTEM':
      return action.payload;

    case 'RESET':
      return initialDesignSystem;

    default:
      return state;
  }
}
```

#### 1.5 Create Export Utilities

```typescript
// src/utils/exportJSON.ts
import type { DesignSystem } from '../types';

export function exportJSON(designSystem: DesignSystem): void {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `neoloop-design-system-${timestamp}.json`;

  const json = JSON.stringify(designSystem, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
```

```typescript
// src/utils/exportCSS.ts
import type { DesignSystem } from '../types';

export function generateCSS(ds: DesignSystem): string {
  const lines: string[] = [':root {'];

  // Colors
  lines.push('  /* Colors */');
  ds.colors.forEach(color => {
    lines.push(`  --color-${color.id}: ${color.hex};`);
  });

  // Typography
  lines.push('\n  /* Typography */');
  ds.typography.forEach(typo => {
    lines.push(`  --font-${typo.id}-size: ${typo.size};`);
    lines.push(`  --font-${typo.id}-weight: ${typo.weight};`);
    lines.push(`  --font-${typo.id}-line-height: ${typo.lineHeight};`);
  });

  // Spacing
  lines.push('\n  /* Spacing */');
  ds.spacing.forEach(space => {
    lines.push(`  --spacing-${space.id}: ${space.value}px;`);
  });

  // Shadows
  if (ds.shadows) {
    lines.push('\n  /* Shadows */');
    ds.shadows.forEach(shadow => {
      lines.push(`  --shadow-${shadow.id}: ${shadow.value};`);
    });
  }

  // Border Radius
  if (ds.borderRadius) {
    lines.push('\n  /* Border Radius */');
    ds.borderRadius.forEach((value, index) => {
      const name = ['none', 'sm', 'md', 'lg', 'xl', 'full'][index] || index;
      lines.push(`  --radius-${name}: ${value}px;`);
    });
  }

  // Breakpoints
  if (ds.breakpoints) {
    lines.push('\n  /* Breakpoints */');
    Object.entries(ds.breakpoints).forEach(([key, value]) => {
      lines.push(`  --breakpoint-${key}: ${value};`);
    });
  }

  lines.push('}');
  return lines.join('\n');
}

export function exportCSS(designSystem: DesignSystem): void {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `design-tokens-${timestamp}.css`;

  const css = generateCSS(designSystem);
  const blob = new Blob([css], { type: 'text/css' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
```

#### 1.6 Create Auto-save Hook

```typescript
// src/hooks/useAutoSave.ts
import { useEffect, useRef } from 'react';
import type { DesignSystem } from '../types';

export function useAutoSave(designSystem: DesignSystem, delay = 30000) {
  const timeoutRef = useRef<number>();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      try {
        localStorage.setItem(
          'neoloop_ds_autosave',
          JSON.stringify(designSystem)
        );
        console.log('✅ Auto-saved at', new Date().toISOString());
      } catch (error) {
        console.error('❌ Auto-save failed:', error);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [designSystem, delay]);
}
```

#### 1.7 Google Fonts Hook (Optional)

```typescript
// src/hooks/useGoogleFonts.ts
import { useEffect, useState } from 'react';

const GOOGLE_FONTS = [
  'Playfair Display',
  'Roboto Mono',
  'PT Sans',
  'Barlow',
  'Sarala',
  'Monda',
  'Jura',
];

export function useGoogleFonts() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Fonts are loaded via CSS @import
    // This hook just checks if they're available
    const checkFonts = async () => {
      try {
        await document.fonts.ready;
        setLoaded(true);
      } catch (err) {
        setError(err as Error);
      }
    };

    checkFonts();
  }, []);

  return { loaded, error, fonts: GOOGLE_FONTS };
}
```

---

### Step 2: Expand TypeScript Types (Week 1 - 3h)

```typescript
// src/types/design-system.ts
export interface DesignSystem {
  name: string;
  version: string;
  metadata: {
    created: string;
    author: string;
    description?: string;
  };

  // Design Tokens
  colors: ColorToken[];
  typography: TypographyToken[];
  spacing: SpacingToken[];
  shadows: ShadowToken[];
  borderRadius: number[];
  breakpoints: Record<string, string>;

  // Visual Components
  icons: IconsSelection;
  socialIcons: SocialIconsSelection;
  charts: ChartsSelection;
  backgrounds: BackgroundsSelection;

  // UI Components
  buttons: ButtonsSelection;
  cards: CardsSelection;
  forms: FormsSelection;

  // Specific Modules
  animations: AnimationsSelection;
  checkbox: CheckboxSelection;
  loginTemplates: LoginTemplatesSelection;
  sidebarTemplates: SidebarTemplatesSelection;
}

export interface ColorToken {
  id: string;
  name: string;
  hex: string;
  group: string;
  contrast?: number;
}

export interface TypographyToken {
  id: string;
  name: string;
  size: string;
  weight: string;
  lineHeight: string;
}

export interface SpacingToken {
  id: string;
  name: string;
  value: number;
}

export interface ShadowToken {
  id: string;
  name: string;
  value: string;
}

export interface IconsSelection {
  selected: string[];
  style: 'outline' | 'bold' | 'solid';
}

export interface SocialIconsSelection {
  selected: Array<{
    id: string;
    style: 'original' | 'dark' | 'light';
  }>;
}

export interface ChartsSelection {
  selected: Array<{
    type: 'pie' | 'line' | 'bar' | 'area';
    variant: string;
  }>;
}

export interface BackgroundsSelection {
  selected: string[];
}

export interface ButtonsSelection {
  selected: Array<{
    variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
    size: 'small' | 'medium' | 'large';
  }>;
}

export interface CardsSelection {
  selected: string[];
}

export interface FormsSelection {
  selected: string[];
}

export interface AnimationsSelection {
  selected: Array<{
    category: 'cursor' | 'loading' | 'transitions';
    name: string;
  }>;
}

export interface CheckboxSelection {
  selected: string[];
}

export interface LoginTemplatesSelection {
  selected: string | null;
}

export interface SidebarTemplatesSelection {
  selected: string | null;
}
```

```typescript
// src/types/actions.ts
import type { DesignSystem, ColorToken, TypographyToken, SpacingToken } from './design-system';

export type DesignSystemAction =
  | { type: 'UPDATE_COLOR'; payload: ColorToken }
  | { type: 'UPDATE_TYPOGRAPHY'; payload: TypographyToken[] }
  | { type: 'UPDATE_SPACING'; payload: SpacingToken[] }
  | { type: 'ADD_ICON'; payload: string }
  | { type: 'REMOVE_ICON'; payload: string }
  | { type: 'IMPORT_DESIGN_SYSTEM'; payload: DesignSystem }
  | { type: 'RESET' };
```

---

### Step 3: Update Main App (Week 1 - 2h)

```typescript
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DesignSystemProvider } from './context/DesignSystemProvider';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DesignSystemProvider>
      <App />
    </DesignSystemProvider>
  </React.StrictMode>
);
```

```typescript
// src/App.tsx (simplified)
import { useState } from 'react';
import { useDesignSystem } from './context/DesignSystemContext';
import { exportJSON } from './utils/exportJSON';
import { exportCSS } from './utils/exportCSS';
import Sidebar from './components/layout/Sidebar';
import Toolbar from './components/layout/Toolbar';
import MainContent from './components/layout/MainContent';
import { ViewType } from './types';

export default function App() {
  const { state } = useDesignSystem();
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.COLOR_TOKENS);

  const handleExport = () => {
    exportJSON(state);
    exportCSS(state);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 flex flex-col">
        <Toolbar onExport={handleExport} />
        <MainContent currentView={currentView} />
      </div>
    </div>
  );
}
```

---

## 📅 Implementation Timeline

### Week 1: Infrastructure (17h)
- ✅ Setup Tailwind + Google Fonts
- ✅ Context API + State Management
- ✅ Export JSON + CSS
- ✅ Auto-save
- ✅ TypeScript types complete

### Week 2: Design Tokens (9h)
- ✅ Shadows module
- ✅ Border Radius module
- ✅ Breakpoints module
- ✅ 6/6 Design Tokens complete

### Week 3: Icons (14h)
- ✅ Icons module (50+ icons)
- ✅ Social Icons module (25+ logos)

### Week 4: Visual Components (14h)
- ✅ Charts module (Recharts)
- ✅ Backgrounds module

### Week 5: Specific Modules (24h)
- ✅ Animations
- ✅ Checkbox/Toggle
- ✅ Login Templates
- ✅ Sidebar Templates

### Week 6: Polish + Deploy (12h)
- ✅ Split UI Components
- ✅ Import JSON
- ✅ Validation
- ✅ Deploy to Vercel

**Total:** 90 hours = 6 weeks

---

## 🎯 Success Criteria

- [ ] 26/26 modules implemented
- [ ] Export downloads JSON + CSS
- [ ] Auto-save works (30s interval)
- [ ] Google Fonts load correctly
- [ ] Responsive on mobile/tablet/desktop
- [ ] No TypeScript errors
- [ ] Bundle size < 500KB
- [ ] Deployed to Vercel

---

## 🚀 Next Steps

1. **Approve this architecture**
2. **Run Week 1 setup** (install deps, configure Tailwind, create Context)
3. **Start implementing modules** (Week 2-5)
4. **Deploy MVP** (Week 6)

---

**Document Status:** 🟢 Ready for Implementation

**Prepared by:** Aria (Architect Agent)
**Date:** 2026-01-26

— Aria, arquitetando o futuro 🏗️
