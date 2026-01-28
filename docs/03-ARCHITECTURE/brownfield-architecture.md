# Brownfield Architecture - Neoloop Design System Builder

## 📋 Document Information

| Field | Value |
|-------|-------|
| **Project** | Neoloop Design System Builder |
| **Architecture Type** | Brownfield (Existing Codebase Enhancement) |
| **Current Version** | 0.0.0 → Target 1.0.0 |
| **PRD Reference** | prd-neoloop-design-system-builder-v1.0.md |
| **Date Created** | 2026-01-26 |
| **Architect** | Aria (Architect Agent) |
| **Status** | 🟡 Draft - Awaiting Approval |

---

## 🎯 Executive Summary

This document outlines the architectural strategy for evolving the **Neoloop Design System Builder** from its current **23% implementation** (6/26 modules) to a **complete MVP** (v1.0) as specified in the PRD.

The project is in **brownfield** state with:
- ✅ **Functional foundation**: React 19 + TypeScript + Vite
- ✅ **3 core modules working**: Colors, Typography, Spacing
- ✅ **Basic UI structure**: Sidebar navigation, property inspector
- ❌ **Critical gaps**: State management, export functionality, 20 missing modules
- ❌ **Architectural debt**: Files in root (not `src/`), no Context API, inconsistent patterns

**Strategic Approach:** Preserve working code, fix architectural issues incrementally, add missing modules systematically.

**Estimated Timeline:** 6 weeks (6 sprints) to reach MVP

---

## 📊 Current State Analysis

### 1. Codebase Inventory

**Total Files:** 17
**Lines of Code:** ~1,200 (estimated)
**Test Coverage:** 0%

| Category | Files | Status |
|----------|-------|--------|
| **Components** | 5 | ✅ Working |
| **Types** | 1 | ⚠️ Incomplete |
| **Constants** | 1 | ⚠️ Limited |
| **Config** | 3 | ✅ Valid |
| **Utils** | 0 | ❌ Missing |
| **Context** | 0 | ❌ Missing |
| **Hooks** | 0 | ❌ Missing |
| **Tests** | 0 | ❌ Missing |

### 2. Implemented Features (6/26 = 23%)

#### ✅ Working Modules

| Module | Component | Quality | Notes |
|--------|-----------|---------|-------|
| **Colors** | `ColorTokensView.tsx` | 🟢 Good | Functional grid, selection works |
| **Typography** | `TypographyView.tsx` | 🟢 Good | Displays font tokens |
| **Spacing** | `SpacingView.tsx` | 🟢 Good | Shows spacing scale |
| **Buttons** | `UIComponentsView.tsx` | 🟡 Fair | Shares component with Cards/Forms |
| **Cards** | `UIComponentsView.tsx` | 🟡 Fair | Shares component with Buttons/Forms |
| **Forms** | `UIComponentsView.tsx` | 🟡 Fair | Shares component with Buttons/Cards |

**Strengths:**
- Clean, modern UI using Tailwind
- Responsive sidebar navigation
- Property inspector panel
- Modal for export (UI only)

**Weaknesses:**
- `UIComponentsView` violates Single Responsibility Principle
- No state persistence
- Export modal doesn't actually download files
- No type safety for all modules

### 3. Architectural Issues

#### 🔴 Critical Issues (Block Development)

| Issue | Impact | Files Affected | Priority |
|-------|--------|----------------|----------|
| **No State Management** | Can't add new modules, state lost on reload | All | 🔴 P0 |
| **Export Non-Functional** | Core feature broken | `App.tsx` | 🔴 P0 |
| **Files in Root** | Not scalable, violates conventions | All `.tsx/.ts` | 🔴 P0 |
| **Incomplete Types** | No type safety for 20 modules | `types.ts` | 🔴 P0 |

#### 🟡 High Priority Issues

| Issue | Impact | Recommendation |
|-------|--------|----------------|
| **No Auto-save** | Users lose work | Implement localStorage hook |
| **No Import JSON** | Can't reuse configurations | Add import utility |
| **Missing Utils** | No export/validation logic | Create `utils/` folder |
| **Monolithic Component** | `UIComponentsView` does 3 things | Split into 3 components |

#### 🟢 Medium Priority Issues

| Issue | Impact | Recommendation |
|-------|--------|----------------|
| **No Tests** | Code quality risk | Setup Vitest + React Testing Library |
| **No CI/CD** | Manual deployment | Setup GitHub Actions |
| **Limited Constants** | Hardcoded values in components | Expand `constants.ts` |

---

## 🔍 Gap Analysis: Current vs. PRD

### Module Implementation Status

| Module Category | Implemented | Total | % | Missing Modules |
|-----------------|-------------|-------|---|-----------------|
| **Design Tokens** | 3 | 6 | 50% | Shadows, Radius, Breakpoints |
| **Visual Components** | 0 | 4 | 0% | Icons, Social Icons, Charts, Backgrounds |
| **UI Components** | 3 | 3 | 100% | None (but need refactoring) |
| **Specific Modules** | 0 | 4 | 0% | Animations, Checkbox, Login, Sidebar |
| **System Features** | 0 | 9 | 0% | Export, Import, Auto-save, Undo/Redo, Search, Shortcuts, Onboarding, Templates, Preview |
| **TOTAL** | **6** | **26** | **23%** | **20 modules** |

### Feature Gaps by Priority

#### 🔴 P0 - Blocking (Must Fix First)

1. **State Management** (Context API + useReducer)
   - **Current:** Local `useState` in `App.tsx`
   - **Required:** Global context provider
   - **Impact:** Can't add new modules without this

2. **Export JSON Functional** (Download files)
   - **Current:** Modal shows JSON but doesn't download
   - **Required:** `downloadJSON()` utility
   - **Impact:** Core feature broken

3. **Export CSS Variables** (Generate CSS)
   - **Current:** Not implemented
   - **Required:** `generateCSS()` utility
   - **Impact:** RF-176 not met

4. **Auto-save** (localStorage persistence)
   - **Current:** State lost on reload
   - **Required:** `useAutoSave()` hook
   - **Impact:** Users lose work

#### 🟡 P1 - High Priority (Week 2-3)

5. **Design Tokens Complete** (Shadows, Radius, Breakpoints)
6. **Import JSON** (Reuse configurations)
7. **Icons Module** (50+ icons from Figma)
8. **Social Icons Module** (25+ brand logos)
9. **Charts Module** (Recharts integration)

#### 🟢 P2 - Medium Priority (Week 4-5)

10. **Remaining Visual Components** (Backgrounds, Animations)
11. **Specific Modules** (Checkbox, Login, Sidebar templates)
12. **UX Enhancements** (Undo/Redo, Search, Keyboard Shortcuts)

#### ⚪ P3 - Nice to Have (Week 6+)

13. **Onboarding/Tutorial**
14. **Templates Gallery**
15. **Preview Global**

---

## 🏗️ Migration Strategy

### Approach: **Incremental Refactoring**

We will **NOT** rewrite from scratch. Instead, we'll:
1. ✅ **Preserve** working code (6 modules)
2. 🔧 **Refactor** incrementally (state management, structure)
3. ➕ **Add** missing modules systematically
4. ✅ **Test** continuously

### Migration Principles

1. **No Breaking Changes to Working Modules**
   - ColorTokensView, TypographyView, SpacingView stay functional
   - Refactor only when necessary for new features

2. **Backward Compatibility**
   - Existing `DesignSystem` type evolves (adds fields, doesn't remove)
   - Constants remain accessible

3. **Feature Flags**
   - New modules behind feature flags until stable
   - Gradual rollout

4. **Continuous Testing**
   - Add tests for existing modules first
   - TDD for new modules

---

## 📐 Target Architecture (v1.0)

### Folder Structure

```
neo-design-system-builder/
├── src/                              # 🆕 All code moves here
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx           # Extract from App.tsx
│   │   │   ├── Toolbar.tsx           # Extract from App.tsx
│   │   │   └── ModuleContainer.tsx   # 🆕 Wrapper for modules
│   │   ├── modules/
│   │   │   ├── ColorTokensView.tsx   # ✅ Keep
│   │   │   ├── TypographyView.tsx    # ✅ Keep
│   │   │   ├── SpacingView.tsx       # ✅ Keep
│   │   │   ├── ShadowsView.tsx       # 🆕
│   │   │   ├── RadiusView.tsx        # 🆕
│   │   │   ├── BreakpointsView.tsx   # 🆕
│   │   │   ├── IconSelector.tsx      # 🆕
│   │   │   ├── SocialIconSelector.tsx # 🆕
│   │   │   ├── ChartSelector.tsx     # 🆕
│   │   │   ├── BackgroundSelector.tsx # 🆕
│   │   │   ├── AnimationSelector.tsx # 🆕
│   │   │   ├── CheckboxSelector.tsx  # 🆕
│   │   │   ├── LoginTemplates.tsx    # 🆕
│   │   │   ├── SidebarTemplates.tsx  # 🆕
│   │   │   ├── ButtonSelector.tsx    # 🔧 Split from UIComponentsView
│   │   │   ├── CardSelector.tsx      # 🔧 Split from UIComponentsView
│   │   │   └── FormSelector.tsx      # 🔧 Split from UIComponentsView
│   │   ├── shared/
│   │   │   ├── ModuleHeader.tsx      # 🆕 Reusable header
│   │   │   ├── SelectableGrid.tsx    # 🆕 Reusable grid
│   │   │   ├── PreviewPanel.tsx      # 🔧 Refactor PropertyInspector
│   │   │   ├── ExportModal.tsx       # Extract from App.tsx
│   │   │   └── SearchBar.tsx         # 🆕
│   │   ├── onboarding/
│   │   │   ├── Tutorial.tsx          # 🆕 v1.1
│   │   │   └── WelcomeModal.tsx      # 🆕 v1.1
│   │   └── templates/
│   │       └── TemplateGallery.tsx   # 🆕 v1.1
│   ├── context/
│   │   ├── DesignSystemContext.tsx   # 🆕 State definition
│   │   └── DesignSystemProvider.tsx  # 🆕 Provider wrapper
│   ├── hooks/
│   │   ├── useAutoSave.ts            # 🆕 Auto-save to localStorage
│   │   ├── useKeyboardShortcuts.ts   # 🆕 v1.1
│   │   └── useUndoRedo.ts            # 🆕 v1.1
│   ├── utils/
│   │   ├── exportJSON.ts             # 🆕 Download JSON
│   │   ├── exportCSS.ts              # 🆕 Generate CSS variables
│   │   ├── importJSON.ts             # 🆕 v1.1
│   │   └── validateSchema.ts         # 🆕 JSON validation
│   ├── types/
│   │   ├── design-system.ts          # 🔧 Expand with all modules
│   │   └── schema.ts                 # 🆕 JSON schema definition
│   ├── constants/
│   │   ├── colors.ts                 # 🔧 Expand current
│   │   ├── typography.ts             # 🔧 Expand current
│   │   ├── spacing.ts                # 🔧 Expand current
│   │   ├── shadows.ts                # 🆕
│   │   ├── radius.ts                 # 🆕
│   │   ├── breakpoints.ts            # 🆕
│   │   ├── icons.tsx                 # 🆕 SVG definitions
│   │   ├── social-icons.tsx          # 🆕
│   │   ├── charts.tsx                # 🆕
│   │   ├── backgrounds.tsx           # 🆕
│   │   ├── animations.tsx            # 🆕
│   │   ├── buttons.tsx               # 🆕
│   │   ├── cards.tsx                 # 🆕
│   │   └── forms.tsx                 # 🆕
│   ├── App.tsx                       # 🔧 Simplify (extract logic)
│   └── main.tsx                      # ✅ Keep (rename from index.tsx)
├── public/
│   ├── icons/                        # 🆕 SVG assets from Figma
│   ├── templates/                    # 🆕 Screenshot previews
│   └── fonts/                        # 🆕 Self-hosted fonts (v1.5)
├── tests/                            # 🆕 Test files mirror src/
│   ├── components/
│   ├── hooks/
│   └── utils/
├── .github/
│   └── workflows/
│       └── ci.yml                    # 🆕 CI/CD pipeline
├── index.html
├── vite.config.ts
├── tsconfig.json
├── vitest.config.ts                  # 🆕 Test config
├── package.json
└── README.md
```

### State Management Architecture

```typescript
// src/context/DesignSystemContext.tsx
import { createContext, useContext, Dispatch } from 'react';
import { DesignSystem, DesignSystemAction } from '../types';

interface DesignSystemContextType {
  state: DesignSystem;
  dispatch: Dispatch<DesignSystemAction>;
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
import { ReactNode, useReducer, useEffect } from 'react';
import { DesignSystemContext } from './DesignSystemContext';
import { designSystemReducer } from './designSystemReducer';
import { initialDesignSystem } from '../constants';
import { useAutoSave } from '../hooks/useAutoSave';

export function DesignSystemProvider({ children }: { children: ReactNode }) {
  // Load saved state from localStorage
  const loadSavedState = () => {
    try {
      const saved = localStorage.getItem('neoloop_ds_autosave');
      return saved ? JSON.parse(saved) : initialDesignSystem;
    } catch {
      return initialDesignSystem;
    }
  };

  const [state, dispatch] = useReducer(designSystemReducer, null, loadSavedState);

  // Auto-save every 30 seconds
  useAutoSave(state);

  return (
    <DesignSystemContext.Provider value={{ state, dispatch }}>
      {children}
    </DesignSystemContext.Provider>
  );
}
```

```typescript
// src/context/designSystemReducer.ts
import { DesignSystem, DesignSystemAction } from '../types';

export function designSystemReducer(
  state: DesignSystem,
  action: DesignSystemAction
): DesignSystem {
  switch (action.type) {
    case 'SELECT_COLOR':
      return {
        ...state,
        colors: state.colors.map(c =>
          c.id === action.payload.id ? action.payload : c
        )
      };

    case 'UPDATE_TYPOGRAPHY':
      return {
        ...state,
        typography: action.payload
      };

    case 'ADD_ICON':
      return {
        ...state,
        icons: [...state.icons, action.payload]
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

### Export/Import Architecture

```typescript
// src/utils/exportJSON.ts
import { DesignSystem } from '../types';

export function downloadJSON(data: DesignSystem, filename: string): void {
  const json = JSON.stringify(data, null, 2);
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

export function generateFilename(baseName: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `${baseName}-${timestamp}.json`;
}
```

```typescript
// src/utils/exportCSS.ts
import { DesignSystem } from '../types';

export function generateCSS(designSystem: DesignSystem): string {
  const lines: string[] = [':root {'];

  // Colors
  lines.push('  /* Colors */');
  designSystem.colors.forEach(color => {
    lines.push(`  --color-${color.id}: ${color.hex};`);
  });

  // Typography
  lines.push('\n  /* Typography */');
  designSystem.typography.forEach(typo => {
    lines.push(`  --font-${typo.id}-size: ${typo.size};`);
    lines.push(`  --font-${typo.id}-weight: ${typo.weight};`);
    lines.push(`  --font-${typo.id}-line-height: ${typo.lineHeight};`);
  });

  // Spacing
  lines.push('\n  /* Spacing */');
  designSystem.spacing.forEach(space => {
    lines.push(`  --spacing-${space.id}: ${space.value}px;`);
  });

  // Shadows (if exists)
  if (designSystem.shadows) {
    lines.push('\n  /* Shadows */');
    designSystem.shadows.forEach(shadow => {
      lines.push(`  --shadow-${shadow.id}: ${shadow.value};`);
    });
  }

  lines.push('}');
  return lines.join('\n');
}

export function downloadCSS(css: string, filename: string): void {
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

```typescript
// src/hooks/useAutoSave.ts
import { useEffect, useRef } from 'react';
import { DesignSystem } from '../types';

export function useAutoSave(designSystem: DesignSystem, delay = 30000) {
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Clear previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set new timer
    timerRef.current = setTimeout(() => {
      try {
        localStorage.setItem('neoloop_ds_autosave', JSON.stringify(designSystem));
        console.log('✅ Auto-saved at', new Date().toISOString());
      } catch (error) {
        console.error('❌ Auto-save failed:', error);
      }
    }, delay);

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [designSystem, delay]);
}
```

---

## 🚀 Implementation Roadmap

### Sprint 0: Preparation (Week 0 - Pre-Development)

**Goal:** Setup infrastructure and tooling

**Tasks:**
1. ✅ Create brownfield architecture document (this file)
2. ⏳ Setup GitHub repository structure
3. ⏳ Configure CI/CD pipeline (GitHub Actions)
4. ⏳ Setup testing framework (Vitest + React Testing Library)
5. ⏳ Document coding standards and git workflow

**Deliverables:**
- Approved architecture document
- CI/CD running on main branch
- Testing infrastructure ready

---

### Sprint 1: Foundation Refactoring (Week 1)

**Goal:** Fix critical architectural issues

**Priority:** 🔴 P0 - Blocking

#### Tasks

**1.1 Restructure to `src/` (4h)**
- Move all `.tsx/.ts` files to `src/`
- Update imports
- Update `vite.config.ts` to point to `src/main.tsx`
- Verify dev server works

**1.2 Implement State Management (6h)**
- Create `src/context/DesignSystemContext.tsx`
- Create `src/context/DesignSystemProvider.tsx`
- Create `src/context/designSystemReducer.ts`
- Wrap `App` with provider in `main.tsx`
- Refactor `App.tsx` to use context instead of local state
- Test: State persists across module navigation

**1.3 Expand TypeScript Types (3h)**
- Update `src/types/design-system.ts` with all 26 modules
- Add action types for reducer
- Add schemas for validation
- Ensure no TypeScript errors

**1.4 Implement Export Functionality (4h)**
- Create `src/utils/exportJSON.ts`
- Create `src/utils/exportCSS.ts`
- Update export modal in `App.tsx` to call download functions
- Test: JSON and CSS download correctly

**1.5 Implement Auto-save (3h)**
- Create `src/hooks/useAutoSave.ts`
- Integrate with `DesignSystemProvider`
- Add recovery on app init
- Test: State persists on reload

**Total:** 20h (1 week full-time)

**Acceptance Criteria:**
- [ ] All files in `src/` structure
- [ ] State managed by Context API
- [ ] Export downloads JSON + CSS files
- [ ] Auto-save works (reload doesn't lose data)
- [ ] All TypeScript types complete
- [ ] No console errors
- [ ] Existing 6 modules still work

---

### Sprint 2: Complete Design Tokens (Week 2)

**Goal:** Finish all 6 Design Token modules

**Priority:** 🟡 P1 - High

#### Tasks

**2.1 Shadows Module (4h)**
- Create `src/components/modules/ShadowsView.tsx`
- Create `src/constants/shadows.ts`
- Add `ShadowToken` type
- Add shadow preview cards
- Integrate with export

**2.2 Border Radius Module (3h)**
- Create `src/components/modules/RadiusView.tsx`
- Create `src/constants/radius.ts`
- Add `RadiusToken` type
- Add radius preview boxes
- Integrate with export

**2.3 Breakpoints Module (3h)**
- Create `src/components/modules/BreakpointsView.tsx`
- Create `src/constants/breakpoints.ts`
- Add `BreakpointToken` type
- Add responsive preview
- Integrate with export

**2.4 Refactor UI Components (4h)**
- Split `UIComponentsView.tsx` into:
  - `ButtonSelector.tsx`
  - `CardSelector.tsx`
  - `FormSelector.tsx`
- Update imports in `App.tsx`
- Test: All 3 work independently

**2.5 Add Unit Tests (6h)**
- Test Context Provider
- Test Export utilities
- Test Auto-save hook
- Test each Design Token module
- Achieve 60% coverage

**Total:** 20h

**Acceptance Criteria:**
- [ ] 6/6 Design Tokens implemented
- [ ] UI Components properly separated
- [ ] Tests running in CI
- [ ] 60%+ test coverage
- [ ] Export includes all tokens

---

### Sprint 3: Visual Components I (Week 3)

**Goal:** Icons and Social Icons

**Priority:** 🟡 P1 - High

#### Tasks

**3.1 Setup Icon Infrastructure (4h)**
- Download/organize SVGs from Figma libraries
- Create `public/icons/` structure
- Create `src/constants/icons.tsx`
- Create icon loader utility

**3.2 Icons Module (8h)**
- Create `IconSelector.tsx`
- Implement category filter
- Implement search
- Add 3 styles (outline, solid, bold)
- Integrate with export

**3.3 Social Icons Module (6h)**
- Create `SocialIconSelector.tsx`
- Add 25+ brand logos
- 3 styles (original, dark, light)
- Integrate with export

**3.4 Improve Search (2h)**
- Extract search to `SearchBar.tsx`
- Make reusable across modules

**Total:** 20h

**Acceptance Criteria:**
- [ ] 50+ icons available
- [ ] 25+ social icons available
- [ ] Search works
- [ ] Filter by category works
- [ ] All icons export correctly

---

### Sprint 4: Visual Components II + Charts (Week 4)

**Goal:** Charts, Backgrounds, Animations

**Priority:** 🟡 P1 - High

#### Tasks

**4.1 Charts Module (10h)**
- Install Recharts 3.7.0
- Create `ChartSelector.tsx`
- Implement 4 types: Pie, Line, Bar, Area
- Add demo data
- Preview with Recharts
- Integrate with export

**4.2 Backgrounds Module (4h)**
- Create `BackgroundSelector.tsx`
- 6 styles (solid, gradient, pattern, etc.)
- Visual preview cards
- Integrate with export

**4.3 Animations Module (6h)**
- Create `AnimationSelector.tsx`
- 3 categories (cursor, loading, transitions)
- CSS animations preview
- Integrate with export

**Total:** 20h

**Acceptance Criteria:**
- [ ] Recharts working
- [ ] 4 chart types preview correctly
- [ ] 6 background styles available
- [ ] 15+ animations available
- [ ] All export correctly

---

### Sprint 5: Specific Modules (Week 5)

**Goal:** Checkbox, Login, Sidebar templates

**Priority:** 🟢 P2 - Medium

#### Tasks

**5.1 Checkbox/Toggle Module (4h)**
- Create `CheckboxSelector.tsx`
- 5+ styles from Tida Components
- Interactive preview
- Integrate with export

**5.2 Login Templates Module (8h)**
- Create `LoginTemplates.tsx`
- 8+ templates from Figma community
- Screenshot previews
- Color adaptation from design system
- Integrate with export

**5.3 Sidebar Templates Module (6h)**
- Create `SidebarTemplates.tsx`
- 6+ templates
- 2 variations (expanded/collapsed)
- Preview with interactivity
- Integrate with export

**5.4 Import JSON (2h)**
- Create `src/utils/importJSON.ts`
- Add import button to toolbar
- Validate imported JSON
- Integrate with Context

**Total:** 20h

**Acceptance Criteria:**
- [ ] All 4 specific modules working
- [ ] Templates adapt colors from system
- [ ] Import JSON functional
- [ ] Validation prevents bad imports

---

### Sprint 6: UX Polish + Testing (Week 6)

**Goal:** UX enhancements, full test coverage, deploy

**Priority:** 🟢 P2 - Medium

#### Tasks

**6.1 Undo/Redo (4h)**
- Create `useUndoRedo.ts` hook
- Integrate with Context
- Add toolbar buttons
- Keyboard shortcuts

**6.2 Keyboard Shortcuts (3h)**
- Create `useKeyboardShortcuts.ts`
- Implement 7 shortcuts
- Add help modal (?)

**6.3 Comprehensive Testing (8h)**
- Increase coverage to 70%
- Add E2E tests (Playwright)
- Test all export formats
- Test import validation

**6.4 Documentation (3h)**
- Update README
- Add setup guide
- Add architecture diagrams
- Document all modules

**6.5 Deploy (2h)**
- Setup Vercel project
- Configure environment
- Deploy to staging
- Test production build

**Total:** 20h

**Acceptance Criteria:**
- [ ] 26/26 modules complete
- [ ] 70% test coverage
- [ ] E2E tests pass
- [ ] Undo/redo works
- [ ] Keyboard shortcuts work
- [ ] Deployed to Vercel
- [ ] Documentation complete

---

## 📋 Architecture Decision Records (ADRs)

### ADR-001: State Management - Context API vs Zustand

**Status:** ✅ Accepted

**Context:**
Need global state management for 26 modules with auto-save and undo/redo.

**Options:**
1. **Context API + useReducer** (PRD recommendation)
2. Zustand (lightweight, modern)
3. Redux Toolkit (overkill)

**Decision:** Context API + useReducer

**Rationale:**
- Built-in to React (no external dep)
- PRD explicitly specifies it
- Sufficient for our use case
- Can migrate to Zustand in v1.5 if needed

**Consequences:**
- More boilerplate than Zustand
- Manual DevTools integration
- Easier to understand for contributors

---

### ADR-002: Icon Strategy - Figma SVG vs Lucide React

**Status:** ✅ Accepted

**Context:**
PRD mentions both Figma libraries (10.000+ icons) and Lucide React. Need to choose primary source.

**Options:**
1. **Figma SVG exported** (PRD primary)
2. Lucide React only
3. Hybrid approach

**Decision:** Hybrid - Figma SVG primary, Lucide React supplemental

**Rationale:**
- Figma libraries have unique icons aligned with design
- Lucide React for interface icons not in Figma
- Best of both worlds

**Implementation:**
```typescript
// Priority:
// 1. Try Figma SVG first (public/icons/)
// 2. Fallback to Lucide React
// 3. Show "not found" placeholder
```

---

### ADR-003: File Structure - Root vs src/

**Status:** ✅ Accepted

**Context:**
Current files in root. PRD specifies `src/` structure.

**Decision:** Move all to `src/`

**Rationale:**
- Industry standard for React projects
- PRD explicitly shows `src/` structure
- Better organization as project grows
- Easier to add tests (`tests/` mirrors `src/`)

**Migration:**
- Sprint 1, Task 1.1
- No breaking changes (internal only)

---

### ADR-004: Testing Framework - Vitest vs Jest

**Status:** ✅ Accepted

**Context:**
Need testing framework for React components.

**Options:**
1. **Vitest** (Vite-native, fast)
2. Jest (industry standard)

**Decision:** Vitest

**Rationale:**
- Native Vite integration (already using Vite)
- Faster than Jest
- API compatible with Jest (easy migration)
- Modern, actively maintained

---

### ADR-005: Export Format - JSON + CSS vs JSON only

**Status:** ✅ Accepted

**Context:**
PRD specifies exporting as both JSON and CSS variables.

**Decision:** Export both JSON and CSS

**Rationale:**
- Developers want CSS variables for direct use
- Designers want JSON for Figma plugins
- Both formats serve different use cases
- Minimal effort to generate both

**Implementation:**
- One button downloads both files:
  - `neoloop-design-system-{timestamp}.json`
  - `design-tokens-{timestamp}.css`

---

## 🔐 Security Considerations

### Client-Side Security

**1. XSS Prevention**
- Sanitize all imported JSON
- No `dangerouslySetInnerHTML` with user data
- Validate schema before importing

**2. localStorage Limits**
- Implement size checks (max 5MB)
- Compress JSON if needed (LZ-string)
- Handle quota exceeded errors gracefully

**3. SVG Safety**
- Sanitize SVGs from Figma before using
- No `<script>` tags in SVGs
- Use `<img>` tags, not inline SVG for untrusted sources

**4. CSP Headers**
- Configure Content Security Policy in Vercel
- Restrict script sources
- HTTPS only

### Data Privacy

**1. No Server-Side Storage (v1.0)**
- Everything client-side
- No user accounts
- No analytics (v1.0)

**2. Google Fonts GDPR**
- Warn users about Google Fonts connection
- Plan self-hosting for v1.5

---

## 📊 Success Metrics

### Development Metrics

| Metric | Current | Sprint 3 Target | Sprint 6 Target |
|--------|---------|-----------------|-----------------|
| **Modules Implemented** | 6/26 (23%) | 15/26 (58%) | 26/26 (100%) |
| **Test Coverage** | 0% | 60% | 70% |
| **Bundle Size** | Unknown | < 400KB | < 500KB |
| **Type Errors** | Unknown | 0 | 0 |
| **Console Errors** | Unknown | 0 | 0 |

### Quality Metrics

| Metric | Target |
|--------|--------|
| **Lighthouse Performance** | > 90 |
| **Lighthouse Accessibility** | > 95 |
| **Build Time** | < 30s |
| **Dev Server Start** | < 3s |

---

## 🚧 Risks & Mitigations

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **State management complexity** | Medium | High | Start simple, iterate |
| **Bundle size > 500KB** | Medium | Medium | Code splitting, lazy loading |
| **Recharts performance** | Low | Medium | Virtualize if needed |
| **localStorage quota** | Low | Medium | Compression, IndexedDB fallback |

### Schedule Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Underestimated complexity** | Medium | High | 20% buffer in estimates |
| **Scope creep** | High | High | Strict adherence to PRD |
| **Figma assets unavailable** | Low | Medium | Fallback to Lucide React |

---

## 🎯 Next Steps

### Immediate Actions (This Week)

1. **Approve This Architecture** ← You are here
   - Review with stakeholders
   - Confirm approach
   - Sign off on ADRs

2. **Setup Infrastructure (Sprint 0)**
   - Configure GitHub Actions
   - Setup Vitest
   - Document coding standards

3. **Start Sprint 1 (Next Week)**
   - Restructure to `src/`
   - Implement Context API
   - Make export functional
   - Add auto-save

### Decision Points

**Q1: Do we need analytics in v1.0?**
- PRD says v1.1, but recommend v1.0
- Decision: ⏳ Pending stakeholder input

**Q2: Self-host Google Fonts now or later?**
- PRD says v1.5
- Decision: ✅ Later (v1.5) - use CDN for v1.0

**Q3: Add dark mode in v1.0?**
- PRD says v1.5
- Decision: ✅ Later (v1.5) - focus on core features

---

## 📚 References

- **PRD v1.0:** `docs/01-REQUIREMENTS/prd-neoloop-design-system-builder-v1.0.md`
- **Gap Analysis:** `docs/01-REQUIREMENTS/analise-prd-pontos-melhoria.md`
- **Current Analysis:** `docs/03-ARCHITECTURE/analise-estrutura-atual.md`
- **Repository:** https://github.com/fabiobrunning/Neoloop-Design

---

**Document Status:** 🟡 Draft - Awaiting Approval

**Prepared by:** Aria (Architect Agent)
**Date:** 2026-01-26
**Version:** 1.0

---

## ✅ Approval Checklist

- [ ] Architecture approach approved
- [ ] ADRs reviewed and accepted
- [ ] Sprint plan validated
- [ ] Timeline confirmed (6 weeks)
- [ ] Risk mitigations acceptable
- [ ] Ready to start Sprint 0

---

*"In brownfield projects, we don't build from nothing—we build from something. The art is knowing what to keep, what to change, and what to add."*

— Aria, arquitetando o futuro 🏗️
