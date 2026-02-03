# Phase 4: Navigation Architecture
**Project:** Neoloop Design System Builder
**Phase:** 4 - Polish & Performance
**Date:** 2026-01-31
**Architect:** @architect
**Status:** Specification

---

## TABLE OF CONTENTS

1. [Navigation Strategy](#1-navigation-strategy)
2. [React Router v6 Integration](#2-react-router-v6-integration)
3. [Code Splitting & Lazy Loading](#3-code-splitting--lazy-loading)
4. [Route State Management](#4-route-state-management)
5. [Route Guards & Authentication](#5-route-guards--authentication)
6. [Navigation Performance](#6-navigation-performance)
7. [Testing Navigation](#7-testing-navigation)

---

## 1. NAVIGATION STRATEGY

### 1.1 Application Routes Structure

```
Neoloop Design System Builder
│
├── / (Landing)
│   └── Public homepage with CTA
│
├── /builder (Main App - Protected)
│   │
│   ├── /builder/colors
│   │   ├── /builder/colors/palette (7-column grid)
│   │   ├── /builder/colors/semantic (Primary/Secondary/Tertiary)
│   │   └── /builder/colors/preview (Component previews)
│   │
│   ├── /builder/typography
│   │   ├── /builder/typography/fonts (8 font families)
│   │   ├── /builder/typography/scale (10 sizes)
│   │   └── /builder/typography/preview (Text samples)
│   │
│   ├── /builder/spacing
│   │   ├── /builder/spacing/scale (4px system)
│   │   └── /builder/spacing/preview (Layout examples)
│   │
│   ├── /builder/icons
│   │   ├── /builder/icons/selection (SVG library)
│   │   └── /builder/icons/customization
│   │
│   ├── /builder/components
│   │   ├── /builder/components/primitives (79 components)
│   │   ├── /builder/components/patterns (Composite)
│   │   └── /builder/components/preview (Full UI examples)
│   │
│   └── /builder/export
│       ├── /builder/export/preview (Final preview)
│       ├── /builder/export/code (Code snippets)
│       └── /builder/export/download (Export options)
│
├── /docs (Documentation - Public)
│   ├── /docs/getting-started
│   ├── /docs/components
│   └── /docs/api-reference
│
├── /examples (Live Examples - Public)
│   ├── /examples/dashboard
│   ├── /examples/landing-page
│   └── /examples/ecommerce
│
└── /settings (User Settings - Protected)
    ├── /settings/profile
    ├── /settings/projects
    └── /settings/billing
```

### 1.2 Route Configuration

```typescript
// src/routes/index.tsx

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Layouts
import { RootLayout } from '@/layouts/RootLayout'
import { BuilderLayout } from '@/layouts/BuilderLayout'
import { DocsLayout } from '@/layouts/DocsLayout'

// Loading components
import { PageLoader } from '@/components/feedback/PageLoader'
import { ErrorBoundary } from '@/components/errors/ErrorBoundary'

// Lazy-loaded pages
const LandingPage = lazy(() => import('@/pages/Landing'))
const BuilderColorsPage = lazy(() => import('@/pages/builder/Colors'))
const BuilderTypographyPage = lazy(() => import('@/pages/builder/Typography'))
const BuilderSpacingPage = lazy(() => import('@/pages/builder/Spacing'))
const BuilderIconsPage = lazy(() => import('@/pages/builder/Icons'))
const BuilderComponentsPage = lazy(() => import('@/pages/builder/Components'))
const BuilderExportPage = lazy(() => import('@/pages/builder/Export'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <LandingPage />
          </Suspense>
        ),
      },

      // Builder routes (protected)
      {
        path: 'builder',
        element: <BuilderLayout />,
        children: [
          {
            path: 'colors',
            element: (
              <Suspense fallback={<PageLoader />}>
                <BuilderColorsPage />
              </Suspense>
            ),
            children: [
              { path: 'palette', element: <ColorPaletteView /> },
              { path: 'semantic', element: <SemanticColorsView /> },
              { path: 'preview', element: <ColorPreviewView /> },
            ],
          },
          {
            path: 'typography',
            element: (
              <Suspense fallback={<PageLoader />}>
                <BuilderTypographyPage />
              </Suspense>
            ),
          },
          {
            path: 'spacing',
            element: (
              <Suspense fallback={<PageLoader />}>
                <BuilderSpacingPage />
              </Suspense>
            ),
          },
          {
            path: 'icons',
            element: (
              <Suspense fallback={<PageLoader />}>
                <BuilderIconsPage />
              </Suspense>
            ),
          },
          {
            path: 'components',
            element: (
              <Suspense fallback={<PageLoader />}>
                <BuilderComponentsPage />
              </Suspense>
            ),
          },
          {
            path: 'export',
            element: (
              <Suspense fallback={<PageLoader />}>
                <BuilderExportPage />
              </Suspense>
            ),
          },
        ],
      },

      // Documentation routes (public)
      {
        path: 'docs',
        element: <DocsLayout />,
        children: [
          // Docs pages...
        ],
      },

      // Settings routes (protected)
      {
        path: 'settings',
        element: <SettingsLayout />,
        children: [
          // Settings pages...
        ],
      },
    ],
  },
])

// App component
export function App() {
  return <RouterProvider router={router} />
}
```

---

## 2. REACT ROUTER V6 INTEGRATION

### 2.1 Typed Routes

```typescript
// src/routes/types.ts

export const ROUTES = {
  HOME: '/',

  BUILDER: {
    ROOT: '/builder',
    COLORS: '/builder/colors',
    COLORS_PALETTE: '/builder/colors/palette',
    COLORS_SEMANTIC: '/builder/colors/semantic',
    COLORS_PREVIEW: '/builder/colors/preview',
    TYPOGRAPHY: '/builder/typography',
    SPACING: '/builder/spacing',
    ICONS: '/builder/icons',
    COMPONENTS: '/builder/components',
    EXPORT: '/builder/export',
  },

  DOCS: {
    ROOT: '/docs',
    GETTING_STARTED: '/docs/getting-started',
    COMPONENTS: '/docs/components',
    API: '/docs/api-reference',
  },

  SETTINGS: {
    ROOT: '/settings',
    PROFILE: '/settings/profile',
    PROJECTS: '/settings/projects',
    BILLING: '/settings/billing',
  },
} as const

// Type-safe route parameters
export type RouteParams = {
  '/builder/components/:componentId': { componentId: string }
  '/docs/components/:slug': { slug: string }
  '/examples/:exampleId': { exampleId: string }
}

// Type-safe navigation hook
export function useTypedNavigate() {
  const navigate = useNavigate()

  return {
    navigate,
    goToBuilder: () => navigate(ROUTES.BUILDER.ROOT),
    goToColors: () => navigate(ROUTES.BUILDER.COLORS),
    goToTypography: () => navigate(ROUTES.BUILDER.TYPOGRAPHY),
    goToExport: () => navigate(ROUTES.BUILDER.EXPORT),
    goBack: () => navigate(-1),
  }
}
```

### 2.2 Navigation Components

```typescript
// src/components/navigation/NavLink.tsx

import { NavLink as RouterNavLink, NavLinkProps } from 'react-router-dom'
import { cn } from '@/utils/cn'

interface AppNavLinkProps extends NavLinkProps {
  icon?: React.ReactNode
  badge?: string | number
}

export function NavLink({
  children,
  icon,
  badge,
  className,
  ...props
}: AppNavLinkProps) {
  return (
    <RouterNavLink
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          isActive && 'bg-primary-50 text-primary-700 font-medium',
          !isActive && 'text-gray-700 dark:text-gray-300',
          className
        )
      }
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="flex-1">{children}</span>
      {badge && (
        <span className="px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
          {badge}
        </span>
      )}
    </RouterNavLink>
  )
}
```

```typescript
// src/components/navigation/Breadcrumbs.tsx

import { Link, useMatches } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbMatch {
  id: string
  pathname: string
  handle?: {
    crumb?: (data: any) => React.ReactNode
  }
}

export function Breadcrumbs() {
  const matches = useMatches() as BreadcrumbMatch[]

  const crumbs = matches
    .filter((match) => match.handle?.crumb)
    .map((match) => ({
      pathname: match.pathname,
      crumb: match.handle!.crumb!(match.data),
    }))

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1

        return (
          <div key={crumb.pathname} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
            {isLast ? (
              <span className="text-gray-900 font-medium">{crumb.crumb}</span>
            ) : (
              <Link
                to={crumb.pathname}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {crumb.crumb}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}

// Usage in route config:
{
  path: 'colors',
  element: <BuilderColorsPage />,
  handle: {
    crumb: () => 'Colors',
  },
}
```

### 2.3 Protected Routes

```typescript
// src/components/navigation/ProtectedRoute.tsx

import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { PageLoader } from '@/components/feedback/PageLoader'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: string
}

export function ProtectedRoute({
  children,
  requiredPermission
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasPermission } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <PageLoader />
  }

  if (!isAuthenticated) {
    // Redirect to login, preserving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/forbidden" replace />
  }

  return <>{children}</>
}

// Usage in routes:
{
  path: 'builder',
  element: (
    <ProtectedRoute>
      <BuilderLayout />
    </ProtectedRoute>
  ),
}
```

---

## 3. CODE SPLITTING & LAZY LOADING

### 3.1 Route-Based Code Splitting

```typescript
// src/routes/lazy-routes.ts

import { lazy } from 'react'

// Lazy load all routes
export const routes = {
  // Landing page
  Landing: lazy(() => import('@/pages/Landing')),

  // Builder pages
  BuilderColors: lazy(() =>
    import(/* webpackChunkName: "builder-colors" */ '@/pages/builder/Colors')
  ),
  BuilderTypography: lazy(() =>
    import(/* webpackChunkName: "builder-typography" */ '@/pages/builder/Typography')
  ),
  BuilderSpacing: lazy(() =>
    import(/* webpackChunkName: "builder-spacing" */ '@/pages/builder/Spacing')
  ),
  BuilderIcons: lazy(() =>
    import(/* webpackChunkName: "builder-icons" */ '@/pages/builder/Icons')
  ),
  BuilderComponents: lazy(() =>
    import(/* webpackChunkName: "builder-components" */ '@/pages/builder/Components')
  ),
  BuilderExport: lazy(() =>
    import(/* webpackChunkName: "builder-export" */ '@/pages/builder/Export')
  ),

  // Documentation pages
  Docs: lazy(() =>
    import(/* webpackChunkName: "docs" */ '@/pages/Docs')
  ),

  // Settings pages
  Settings: lazy(() =>
    import(/* webpackChunkName: "settings" */ '@/pages/Settings')
  ),
}
```

### 3.2 Prefetching Routes

```typescript
// src/hooks/usePrefetchRoute.ts

import { useEffect } from 'react'

export function usePrefetchRoute(routeName: keyof typeof routes) {
  useEffect(() => {
    // Prefetch on hover or after a delay
    const prefetchTimeout = setTimeout(() => {
      // This triggers the dynamic import
      routes[routeName]
    }, 2000) // Prefetch after 2 seconds

    return () => clearTimeout(prefetchTimeout)
  }, [routeName])
}

// Usage in navigation:
function BuilderNav() {
  usePrefetchRoute('BuilderColors')
  usePrefetchRoute('BuilderTypography')

  return (
    <nav>
      <NavLink to="/builder/colors">Colors</NavLink>
      <NavLink to="/builder/typography">Typography</NavLink>
    </nav>
  )
}
```

### 3.3 Smart Loading States

```typescript
// src/components/feedback/PageLoader.tsx

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function PageLoader() {
  const [showSlowWarning, setShowSlowWarning] = useState(false)

  useEffect(() => {
    // Show warning if loading takes too long
    const timeout = setTimeout(() => {
      setShowSlowWarning(true)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      <p className="mt-4 text-gray-600">Loading...</p>

      {showSlowWarning && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-orange-600"
        >
          This is taking longer than usual. Please wait...
        </motion.p>
      )}
    </motion.div>
  )
}
```

---

## 4. ROUTE STATE MANAGEMENT

### 4.1 URL State Synchronization

```typescript
// src/hooks/useURLState.ts

import { useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'

export function useURLState<T extends string>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [searchParams, setSearchParams] = useSearchParams()

  const value = (searchParams.get(key) as T) || defaultValue

  const setValue = useCallback(
    (newValue: T) => {
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set(key, newValue)
      setSearchParams(newSearchParams, { replace: true })
    },
    [key, searchParams, setSearchParams]
  )

  return [value, setValue]
}

// Usage:
function ColorPaletteView() {
  const [selectedCategory, setSelectedCategory] = useURLState('category', 'red-pink')
  const [selectedTone, setSelectedTone] = useURLState('tone', '500')

  return (
    <div>
      <ColorGrid
        category={selectedCategory}
        tone={selectedTone}
        onSelect={(cat, tone) => {
          setSelectedCategory(cat)
          setSelectedTone(tone)
        }}
      />
    </div>
  )
}
```

### 4.2 Navigation History Management

```typescript
// src/hooks/useNavigationHistory.ts

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export function useNavigationHistory() {
  const location = useLocation()
  const history = useRef<string[]>([])

  useEffect(() => {
    history.current.push(location.pathname)

    // Keep max 10 items
    if (history.current.length > 10) {
      history.current.shift()
    }
  }, [location])

  return {
    history: history.current,
    canGoBack: history.current.length > 1,
    previousPath: history.current[history.current.length - 2],
  }
}
```

### 4.3 Form State Preservation

```typescript
// src/hooks/useFormNavigation.ts

import { useEffect } from 'react'
import { useBlocker } from 'react-router-dom'

export function useFormNavigation(isDirty: boolean) {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname
  )

  useEffect(() => {
    if (blocker.state === 'blocked') {
      const confirmed = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      )

      if (confirmed) {
        blocker.proceed()
      } else {
        blocker.reset()
      }
    }
  }, [blocker])

  return blocker
}

// Usage:
function ColorPaletteForm() {
  const [formData, setFormData] = useState(initialData)
  const isDirty = JSON.stringify(formData) !== JSON.stringify(initialData)

  useFormNavigation(isDirty)

  return <form>...</form>
}
```

---

## 5. ROUTE GUARDS & AUTHENTICATION

### 5.1 Authentication Guard

```typescript
// src/guards/AuthGuard.tsx

import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { PageLoader } from '@/components/feedback/PageLoader'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <PageLoader />
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
```

### 5.2 Role-Based Access Control

```typescript
// src/guards/RoleGuard.tsx

import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: string[]
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user } = useAuth()

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />
  }

  return <>{children}</>
}

// Usage:
{
  path: 'admin',
  element: (
    <RoleGuard allowedRoles={['admin', 'superadmin']}>
      <AdminDashboard />
    </RoleGuard>
  ),
}
```

---

## 6. NAVIGATION PERFORMANCE

### 6.1 Performance Metrics

```typescript
// src/utils/navigation-metrics.ts

export class NavigationPerformanceMonitor {
  private navigationStart = 0

  startNavigation() {
    this.navigationStart = performance.now()
  }

  endNavigation(routeName: string) {
    const duration = performance.now() - this.navigationStart

    console.log(`Navigation to ${routeName}: ${duration.toFixed(2)}ms`)

    // Send to analytics
    if (window.gtag) {
      window.gtag('event', 'navigation', {
        route: routeName,
        duration: Math.round(duration),
      })
    }

    // Warn if too slow
    if (duration > 500) {
      console.warn(`⚠️ Slow navigation to ${routeName}: ${duration.toFixed(2)}ms`)
    }
  }
}
```

### 6.2 Bundle Size Targets

| Route | Max Bundle Size | Priority |
|-------|----------------|----------|
| Landing | 100 KB | Critical |
| Builder Colors | 150 KB | High |
| Builder Typography | 120 KB | High |
| Builder Components | 200 KB | Medium |
| Docs | 80 KB | Low |

---

## 7. TESTING NAVIGATION

### 7.1 Navigation Tests

```typescript
// src/routes/__tests__/navigation.test.tsx

import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { App } from '@/App'

describe('Navigation', () => {
  it('renders landing page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText(/Welcome to Neoloop/i)).toBeInTheDocument()
  })

  it('navigates to builder colors page', async () => {
    render(
      <MemoryRouter initialEntries={['/builder/colors']}>
        <App />
      </MemoryRouter>
    )

    expect(await screen.findByText(/Color Palette/i)).toBeInTheDocument()
  })

  it('redirects to login for protected routes', () => {
    render(
      <MemoryRouter initialEntries={['/builder']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText(/Sign In/i)).toBeInTheDocument()
  })
})
```

---

**Status:** Complete Specification
**Next:** Accessibility Architecture
**Review:** After implementation
