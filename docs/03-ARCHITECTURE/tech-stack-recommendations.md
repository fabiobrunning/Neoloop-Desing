# Neoloop Design System - Tech Stack Recommendations
**Complete Technology Stack & Rationale**
**Data:** 2026-01-30
**Backend System Architect**

---

## 🎯 STACK OVERVIEW

### Current Stack (What's Already There)
```yaml
Frontend Framework: React 18+
Build Tool: Vite 5+
Language: TypeScript 5+
Styling: Tailwind CSS 4+
Icons: Lucide React (3,820 icons)
Charts: Victory
State Management: React useState + useContext
```

### Gaps & Recommendations

---

## 🏗️ CORE INFRASTRUCTURE

### 1. Build & Development

#### Vite 5+ (Current - Keep)
**Rationale:**
- ✅ Lightning fast HMR (Hot Module Replacement)
- ✅ Native ESM support
- ✅ Optimized production builds
- ✅ Plugin ecosystem (React, TypeScript, PWA)

**Configuration Recommendations:**
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Neoloop Design System',
        short_name: 'Neoloop',
        theme_color: '#667eea'
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-icons': ['lucide-react'],
          'vendor-charts': ['victory'],
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  }
})
```

---

### 2. TypeScript Configuration

#### TypeScript 5+ (Current - Enhance)
**Current:** Basic setup
**Recommended:** Strict mode + advanced features

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",

    // Strict Type Checking
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,

    // Advanced Checks
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false,

    // Module Resolution
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,

    // Emit
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": false,

    // Paths
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@tokens/*": ["src/tokens/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 🎨 STYLING & DESIGN

### 1. Tailwind CSS 4+ (Current - Keep & Extend)

**Rationale:**
- ✅ Utility-first approach
- ✅ JIT compilation (fast builds)
- ✅ Great for design systems
- ✅ CSS Variables support

**Configuration:**
```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Design tokens integration
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          // ... 200-900
        },
        // Semantic colors
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
      },
      spacing: {
        // 4px base system
        0.5: '0.125rem', // 2px
        1: '0.25rem',    // 4px
        1.5: '0.375rem', // 6px
        2: '0.5rem',     // 8px
        // ... continue
      },
      fontSize: {
        // Typography scale
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        // ... continue
      },
      boxShadow: {
        // Shadow system
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      borderRadius: {
        // Radius system
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

---

### 2. CSS Variables (Recommended - Implement)

**Rationale:**
- ✅ Runtime theming (light/dark mode)
- ✅ Easy export to CSS
- ✅ Browser native (no JS overhead)

**Implementation:**
```css
/* tokens.css */
:root {
  /* Colors */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #667eea;
  --color-primary-900: #1e3a8a;

  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  --spacing-8: 2rem;

  /* Typography */
  --font-family-sans: 'Inter', system-ui, sans-serif;
  --font-size-base: 1rem;
  --line-height-normal: 1.5;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;

  /* Z-Index */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}

[data-theme="dark"] {
  /* Dark mode overrides */
  --color-primary-50: #1e3a8a;
  --color-primary-900: #eff6ff;
  /* ... */
}
```

---

## 🧩 UI COMPONENT LIBRARIES

### 1. Radix UI (Recommended - Add)

**Rationale:**
- ✅ Unstyled, accessible primitives
- ✅ WCAG compliant out of the box
- ✅ Full keyboard navigation
- ✅ WAI-ARIA implementation

**Components to Use:**
```bash
npm install @radix-ui/react-dialog         # Modal
npm install @radix-ui/react-dropdown-menu  # Dropdown
npm install @radix-ui/react-tooltip        # Tooltip
npm install @radix-ui/react-accordion      # Accordion
npm install @radix-ui/react-tabs           # Tabs
npm install @radix-ui/react-select         # Select (better than native)
npm install @radix-ui/react-checkbox       # Checkbox
npm install @radix-ui/react-radio-group    # Radio
npm install @radix-ui/react-switch         # Switch
npm install @radix-ui/react-slider         # Slider
npm install @radix-ui/react-progress       # Progress
```

**Example Usage:**
```typescript
import * as Dialog from '@radix-ui/react-dialog'

export function Modal({ children, title, ...props }) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger asChild>
        <button>Open Modal</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6">
          <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

**Alternative:** Headless UI (by Tailwind team)
- Similar concept, less components
- Good for simpler needs

---

### 2. Framer Motion (Recommended - Add)

**Rationale:**
- ✅ Best animation library for React
- ✅ Simple API, powerful features
- ✅ Gestures support (drag, swipe)
- ✅ Great for microinteractions

```bash
npm install framer-motion
```

**Usage Examples:**
```typescript
import { motion } from 'framer-motion'

// Simple fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// Microinteraction
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>

// Page transitions
<motion.div
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: 100, opacity: 0 }}
>
  Page content
</motion.div>
```

---

## 📊 DATA VISUALIZATION

### Current: Victory (Keep)
- ✅ Already integrated
- ✅ Good for design system context

### Add: Chart.js (Recommended)
**Rationale:**
- ✅ More chart types
- ✅ Better performance for large datasets
- ✅ Popular choice (ecosystem)

```bash
npm install chart.js react-chartjs-2
```

**When to use each:**
- **Victory:** Design system demos, theming showcase
- **Chart.js:** Production charts, complex data

---

## 🧪 TESTING STACK

### 1. Vitest (Recommended - Add)

**Rationale:**
- ✅ Vite-native (same config)
- ✅ Jest-compatible API
- ✅ Faster than Jest
- ✅ ESM support

```bash
npm install -D vitest @vitest/ui
```

**Configuration:**
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/',
      ]
    }
  }
})
```

---

### 2. React Testing Library (Recommended - Add)

**Rationale:**
- ✅ Tests user interactions (not implementation)
- ✅ Encourages accessible code
- ✅ Industry standard

```bash
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

**Example Test:**
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

---

### 3. Playwright (Future - E2E Testing)

**Rationale:**
- ✅ Cross-browser testing
- ✅ Visual regression testing
- ✅ Screenshot comparison

```bash
npm install -D @playwright/test
```

---

## ♿ ACCESSIBILITY TOOLS

### 1. axe-core (Recommended - Add)

**Rationale:**
- ✅ Industry standard a11y testing
- ✅ WCAG 2.1 validation
- ✅ Integrates with testing library

```bash
npm install -D axe-core @axe-core/react
```

**Usage in Development:**
```typescript
// src/main.tsx (development only)
if (import.meta.env.DEV) {
  import('@axe-core/react').then(axe => {
    axe.default(React, ReactDOM, 1000)
  })
}
```

**Usage in Tests:**
```typescript
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

it('has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

---

### 2. eslint-plugin-jsx-a11y (Recommended - Add)

**Rationale:**
- ✅ Lint-time a11y checks
- ✅ Catch issues early
- ✅ Best practices enforcement

```bash
npm install -D eslint-plugin-jsx-a11y
```

**Configuration:**
```javascript
// .eslintrc.cjs
module.exports = {
  extends: [
    'plugin:jsx-a11y/recommended'
  ],
  plugins: ['jsx-a11y'],
  rules: {
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
  }
}
```

---

## 🔧 CODE QUALITY TOOLS

### 1. ESLint + Prettier (Current - Enhance)

**ESLint Config:**
```javascript
// .eslintrc.cjs
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh', '@typescript-eslint', 'jsx-a11y'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
```

**Prettier Config:**
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

---

### 2. Husky + lint-staged (Recommended - Add)

**Rationale:**
- ✅ Pre-commit hooks
- ✅ Automatic linting/formatting
- ✅ Prevent bad commits

```bash
npm install -D husky lint-staged
npx husky init
```

**Configuration:**
```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

```bash
# .husky/pre-commit
npm run lint-staged
npm run typecheck
npm run test
```

---

## 📦 STATE MANAGEMENT

### Current: useState + useContext (Keep for MVP)

**Rationale:**
- ✅ Simple
- ✅ No dependencies
- ✅ Good for small-medium apps

**Future (v1.1+): Zustand (Recommended)**

**Rationale:**
- ✅ Minimal boilerplate
- ✅ No providers needed
- ✅ DevTools support
- ✅ TypeScript-first

```bash
npm install zustand
```

**Example:**
```typescript
// store/designSystemStore.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface DesignSystemState {
  tokens: DesignTokens
  activeView: ViewType
  theme: 'light' | 'dark'
  setTokens: (tokens: DesignTokens) => void
  setActiveView: (view: ViewType) => void
  toggleTheme: () => void
}

export const useDesignSystemStore = create<DesignSystemState>()(
  devtools(
    persist(
      (set) => ({
        tokens: defaultTokens,
        activeView: 'colors',
        theme: 'light',
        setTokens: (tokens) => set({ tokens }),
        setActiveView: (view) => set({ activeView: view }),
        toggleTheme: () => set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light'
        })),
      }),
      { name: 'design-system-storage' }
    )
  )
)
```

---

## 📄 FORMS HANDLING

### React Hook Form (Recommended - Add)

**Rationale:**
- ✅ Best performance (uncontrolled)
- ✅ Less re-renders
- ✅ Great validation API
- ✅ TypeScript support

```bash
npm install react-hook-form
npm install @hookform/resolvers zod  # for validation
```

**Example:**
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i),
})

type FormData = z.infer<typeof schema>

export function TokenForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <button type="submit">Submit</button>
    </form>
  )
}
```

---

## 🎨 ICONS & ILLUSTRATIONS

### 1. Lucide React (Current - Keep)
- ✅ 3,820 icons
- ✅ Consistent style
- ✅ Tree-shakable

### 2. Heroicons (Alternative - Optional)
- By Tailwind team
- Fewer icons, but high quality

### 3. React Icons (Optional - Comprehensive)
- Aggregates multiple icon sets
- Huge library

**Recommendation:** Keep Lucide, add custom SVG upload feature

---

## 🌐 ROUTING (Future v1.1+)

### TanStack Router (Recommended)

**Rationale:**
- ✅ Type-safe routing
- ✅ Search params management
- ✅ Better than React Router for TS

```bash
npm install @tanstack/react-router
```

**Alternative:** React Router 6+
- More established
- Larger ecosystem

---

## 📊 PERFORMANCE MONITORING

### 1. web-vitals (Recommended - Add)

```bash
npm install web-vitals
```

**Usage:**
```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

---

### 2. React DevTools Profiler (Built-in)

**Usage:**
```typescript
import { Profiler } from 'react'

function onRenderCallback(
  id, phase, actualDuration, baseDuration, startTime, commitTime
) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`)
}

<Profiler id="App" onRender={onRenderCallback}>
  <App />
</Profiler>
```

---

## 🚀 DEPLOYMENT & HOSTING (Future v1.1)

### Frontend: Vercel (Recommended)

**Rationale:**
- ✅ Best DX for React/Vite
- ✅ Automatic deployments
- ✅ Edge network (CDN)
- ✅ Free tier generous

**Alternative:** Netlify, Cloudflare Pages

---

### Backend: Supabase (Recommended)

**Rationale:**
- ✅ PostgreSQL database
- ✅ Auth built-in
- ✅ Storage for images
- ✅ Real-time subscriptions
- ✅ Free tier generous

```bash
npm install @supabase/supabase-js
```

**Alternative:** Firebase, PlanetScale + Clerk (auth)

---

## 📦 PACKAGE MANAGER

### pnpm (Recommended - Switch from npm)

**Rationale:**
- ✅ 3x faster than npm
- ✅ Saves disk space (symlinks)
- ✅ Strict node_modules
- ✅ Monorepo support (future)

```bash
npm install -g pnpm
pnpm install  # instead of npm install
```

**Alternative:** Bun (experimental, very fast)

---

## 🔍 DEVELOPER EXPERIENCE

### 1. TypeScript Path Aliases (Add)

Already in tsconfig, but configure Vite:
```typescript
// vite.config.ts
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@tokens': path.resolve(__dirname, './src/tokens'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
    }
  }
})
```

---

### 2. Storybook (Future - Component Documentation)

**Rationale:**
- ✅ Component playground
- ✅ Visual documentation
- ✅ Isolated development

```bash
npx storybook@latest init
```

---

## 📋 COMPLETE PACKAGE.JSON (Recommended)

```json
{
  "name": "neoloop-design-system",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,md}\"",
    "prepare": "husky install"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.309.0",
    "victory": "^36.7.0",
    "framer-motion": "^10.16.16",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-radio-group": "^1.1.3",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-progress": "^1.0.3",
    "react-hook-form": "^7.49.3",
    "@hookform/resolvers": "^3.3.4",
    "zod": "^3.22.4",
    "zustand": "^4.4.7",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "@typescript-eslint/eslint-plugin": "^6.19.0",
    "@typescript-eslint/parser": "^6.19.0",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.3",
    "vite": "^5.0.11",
    "vite-plugin-pwa": "^0.17.4",

    "vitest": "^1.2.0",
    "@vitest/ui": "^1.2.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.2.0",
    "@testing-library/user-event": "^14.5.2",
    "jsdom": "^23.2.0",

    "eslint": "^8.56.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "eslint-plugin-jsx-a11y": "^6.8.0",
    "eslint-config-prettier": "^9.1.0",
    "prettier": "^3.2.4",
    "prettier-plugin-tailwindcss": "^0.5.11",

    "tailwindcss": "^4.0.0",
    "@tailwindcss/forms": "^0.5.7",
    "@tailwindcss/typography": "^0.5.10",
    "@tailwindcss/aspect-ratio": "^0.4.2",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.33",

    "husky": "^8.0.3",
    "lint-staged": "^15.2.0",

    "axe-core": "^4.8.3",
    "@axe-core/react": "^4.8.3",
    "jest-axe": "^8.0.0",

    "web-vitals": "^3.5.1"
  }
}
```

---

## 🎯 PRIORITY RECOMMENDATIONS

### IMMEDIATE (Week 1)
1. ✅ Setup TypeScript strict mode
2. ✅ Add ESLint + Prettier + Husky
3. ✅ Configure Tailwind properly
4. ✅ Setup path aliases

### SHORT-TERM (Weeks 2-4)
1. ✅ Add Vitest + React Testing Library
2. ✅ Add Radix UI primitives
3. ✅ Add Framer Motion
4. ✅ Implement axe-core

### MEDIUM-TERM (Months 2-3)
1. ✅ Add Zustand (if state complexity grows)
2. ✅ Add React Hook Form
3. ✅ Setup Storybook
4. ✅ Add Playwright E2E

### LONG-TERM (v1.1+)
1. ✅ Supabase backend
2. ✅ TanStack Router
3. ✅ Monorepo setup (Turborepo)
4. ✅ CI/CD pipeline

---

## 💰 COST ANALYSIS

### Free Tier (Recommended for MVP)
```
Vercel:        Free (100GB bandwidth, unlimited deploys)
Supabase:      Free (500MB DB, 1GB storage, 2GB bandwidth)
GitHub:        Free (unlimited repos, Actions minutes)
Cloudflare:    Free (CDN for assets)
────────────────────────────────────────────────────
TOTAL:         $0/month
```

### Paid Tier (Production)
```
Vercel Pro:    $20/month (1TB bandwidth, analytics)
Supabase Pro:  $25/month (8GB DB, 100GB storage)
Plausible:     $9/month (analytics, privacy-first)
────────────────────────────────────────────────────
TOTAL:         $54/month
```

---

## 📚 LEARNING RESOURCES

### Documentation
- **Radix UI:** https://www.radix-ui.com/
- **Framer Motion:** https://www.framer.com/motion/
- **Vitest:** https://vitest.dev/
- **Zustand:** https://docs.pmnd.rs/zustand/
- **React Hook Form:** https://react-hook-form.com/

### Courses
- **Testing Library:** Kent C. Dodds - Epic React
- **TypeScript:** Matt Pocock - Total TypeScript
- **Accessibility:** Marcy Sutton - Testing Accessibility

---

## ✅ FINAL RECOMMENDATIONS SUMMARY

| Category | Tool | Priority | Reason |
|----------|------|----------|--------|
| **Build** | Vite 5+ | ✅ Keep | Fast, modern |
| **Language** | TypeScript strict | 🔴 Immediate | Type safety |
| **Styling** | Tailwind + CSS Vars | ✅ Keep | Token-driven |
| **Components** | Radix UI | 🟡 Add Week 2 | Accessibility |
| **Animation** | Framer Motion | 🟡 Add Week 2 | Best DX |
| **Testing** | Vitest + RTL | 🔴 Immediate | Quality |
| **A11y** | axe-core | 🔴 Immediate | WCAG compliance |
| **Forms** | React Hook Form | 🟢 Add Month 2 | Performance |
| **State** | Zustand | 🟢 Add Month 3 | Scalability |
| **Lint** | ESLint + Prettier | 🔴 Immediate | Code quality |
| **Hooks** | Husky + lint-staged | 🔴 Immediate | Git workflow |

---

**Document Created:** 2026-01-30
**By:** Backend System Architect
**Path:** `/docs/03-ARCHITECTURE/tech-stack-recommendations.md`
