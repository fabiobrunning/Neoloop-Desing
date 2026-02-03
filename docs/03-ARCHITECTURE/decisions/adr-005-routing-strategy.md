# ADR-005: Routing Strategy

**Date:** 2026-01-31
**Status:** Accepted
**Deciders:** @architect, @dev
**Related:** Phase 4 - Navigation Architecture

---

## Context

The Neoloop Design System Builder is a multi-page application with complex navigation requirements. We need to choose a routing solution that supports:

1. Code splitting by route
2. Nested routes (builder sub-sections)
3. Protected routes (authentication)
4. URL state management
5. Type-safe navigation
6. Excellent developer experience

### Current State

- React 19.2.3 (latest)
- Vite 6.2.0 (build tool)
- TypeScript 5.8.2 (strict mode)
- No routing library currently installed

---

## Decision

**We will use React Router v6 with the Data Router API (createBrowserRouter).**

### Key Decisions

1. **React Router v6** (latest stable)
2. **Data Router API** (`createBrowserRouter`)
3. **Route-based code splitting** with `React.lazy()`
4. **Type-safe routes** with TypeScript constants
5. **Protected routes** via wrapper components
6. **URL state management** with `useSearchParams`

---

## Rationale

### Why React Router v6?

**Pros:**
- ✅ **Industry standard**: Most popular React routing library
- ✅ **Data Router API**: Modern, powerful routing approach
- ✅ **Excellent TypeScript support**: Full type safety
- ✅ **Built-in features**: Lazy loading, error boundaries, loaders
- ✅ **Great documentation**: Comprehensive guides and examples
- ✅ **Active maintenance**: Regular updates, large community
- ✅ **Bundle size**: ~13 KB gzipped (reasonable)
- ✅ **React 18+ support**: Concurrent features, Suspense integration

**Cons:**
- ❌ **Migration overhead**: v5 → v6 had breaking changes (not applicable to us)
- ❌ **Learning curve**: New Data Router API is different from v5

**Bundle Size:**
- React Router DOM: ~13 KB gzipped
- Total routing overhead: < 15 KB

---

### Why Data Router API?

The Data Router API (`createBrowserRouter`) is the recommended approach in React Router v6.

**Advantages over legacy `<BrowserRouter>`:**

```typescript
// ❌ OLD WAY (Legacy API)
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/builder" element={<Builder />}>
      <Route path="colors" element={<Colors />} />
    </Route>
  </Routes>
</BrowserRouter>

// ✅ NEW WAY (Data Router API)
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: 'builder',
        element: <BuilderLayout />,
        children: [
          { path: 'colors', element: <Colors />, loader: colorLoader },
        ],
      },
    ],
  },
])

<RouterProvider router={router} />
```

**Benefits:**
1. **Better error handling**: `errorElement` per route
2. **Data loading**: `loader` functions for pre-fetching
3. **Better TypeScript**: Type-safe route configuration
4. **Nested layouts**: Cleaner nested route structure
5. **Future-proof**: Recommended by React Router team

---

### Alternatives Considered

#### 1. TanStack Router
**Pros:**
- ✅ Excellent TypeScript support (best-in-class)
- ✅ Built-in type-safe search params
- ✅ Automatic code splitting

**Cons:**
- ❌ Newer, less battle-tested
- ❌ Smaller community
- ❌ More complex API
- ❌ Larger bundle (~20 KB)

**Verdict:** Too new, React Router is more proven

---

#### 2. Next.js App Router
**Pros:**
- ✅ File-based routing (simple)
- ✅ Built-in SSR
- ✅ Excellent DX

**Cons:**
- ❌ **Overkill**: We don't need SSR for a design system builder
- ❌ **Framework lock-in**: Harder to migrate away
- ❌ **Bundle size**: Much larger (~100 KB)
- ❌ **Complexity**: Server components, RSC, etc.

**Verdict:** Too heavy for our SPA needs

---

#### 3. Wouter
**Pros:**
- ✅ Tiny bundle (1.5 KB)
- ✅ Simple API

**Cons:**
- ❌ No nested routes
- ❌ No data loading
- ❌ No protected routes
- ❌ Too minimal for our needs

**Verdict:** Too simple, lacks features we need

---

#### 4. No Router (Single Page)
**Pros:**
- ✅ Zero bundle overhead
- ✅ Simplest approach

**Cons:**
- ❌ No deep linking
- ❌ No browser history
- ❌ Poor UX (no back button)
- ❌ Doesn't meet requirements

**Verdict:** Not suitable for multi-page app

---

## Implementation Strategy

### 1. Route Structure

```typescript
// src/routes/index.tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      // Landing
      { index: true, element: <Landing /> },

      // Builder (Protected)
      {
        path: 'builder',
        element: <ProtectedRoute><BuilderLayout /></ProtectedRoute>,
        children: [
          { path: 'colors', element: <Colors />, loader: colorsLoader },
          { path: 'typography', element: <Typography />, loader: typographyLoader },
          { path: 'spacing', element: <Spacing /> },
          { path: 'icons', element: <Icons /> },
          { path: 'components', element: <Components /> },
          { path: 'export', element: <Export /> },
        ],
      },

      // Documentation (Public)
      {
        path: 'docs',
        element: <DocsLayout />,
        children: [
          { index: true, element: <DocsHome /> },
          { path: ':slug', element: <DocsPage /> },
        ],
      },

      // Settings (Protected)
      {
        path: 'settings',
        element: <ProtectedRoute><SettingsLayout /></ProtectedRoute>,
        children: [
          { path: 'profile', element: <Profile /> },
          { path: 'projects', element: <Projects /> },
          { path: 'billing', element: <Billing /> },
        ],
      },
    ],
  },
])
```

### 2. Type-Safe Routes

```typescript
// src/routes/types.ts
export const ROUTES = {
  HOME: '/',
  BUILDER: {
    ROOT: '/builder',
    COLORS: '/builder/colors',
    TYPOGRAPHY: '/builder/typography',
    SPACING: '/builder/spacing',
    ICONS: '/builder/icons',
    COMPONENTS: '/builder/components',
    EXPORT: '/builder/export',
  },
  DOCS: {
    ROOT: '/docs',
    SLUG: (slug: string) => `/docs/${slug}`,
  },
  SETTINGS: {
    ROOT: '/settings',
    PROFILE: '/settings/profile',
    PROJECTS: '/settings/projects',
    BILLING: '/settings/billing',
  },
} as const

// Type-safe navigation hook
export function useTypedNavigate() {
  const navigate = useNavigate()

  return {
    navigate,
    goToBuilder: () => navigate(ROUTES.BUILDER.ROOT),
    goToColors: () => navigate(ROUTES.BUILDER.COLORS),
    goToExport: () => navigate(ROUTES.BUILDER.EXPORT),
    goBack: () => navigate(-1),
  }
}
```

### 3. Code Splitting

```typescript
// src/routes/lazy-routes.ts
import { lazy } from 'react'

export const routes = {
  Landing: lazy(() => import('@/pages/Landing')),
  BuilderColors: lazy(() =>
    import(/* webpackChunkName: "builder-colors" */ '@/pages/builder/Colors')
  ),
  BuilderTypography: lazy(() =>
    import(/* webpackChunkName: "builder-typography" */ '@/pages/builder/Typography')
  ),
  // ... more routes
}
```

### 4. Protected Routes

```typescript
// src/components/navigation/ProtectedRoute.tsx
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <PageLoader />

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
```

### 5. URL State Management

```typescript
// src/hooks/useURLState.ts
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
const [category, setCategory] = useURLState('category', 'red-pink')
```

---

## Performance Considerations

### Bundle Size Impact

| Package | Size (gzipped) | Purpose |
|---------|---------------|----------|
| react-router | ~8 KB | Core routing |
| react-router-dom | ~5 KB | DOM bindings |
| **Total** | **~13 KB** | Full routing solution |

### Code Splitting Strategy

```typescript
// Lazy load by route
const BuilderColors = lazy(() => import('@/pages/builder/Colors'))

// Result: Each route is a separate chunk
// Initial bundle: ~180 KB (no routes)
// Colors route: +50 KB (only loaded when navigating)
// Typography route: +40 KB (only loaded when navigating)
```

**Bundle Size Targets:**
- Initial bundle: < 180 KB (no route chunks)
- Per-route chunk: < 50 KB
- Vendor chunk (React Router): ~13 KB

---

## Testing Strategy

### 1. Unit Tests

```typescript
// Test route rendering
it('renders colors page at /builder/colors', async () => {
  render(
    <MemoryRouter initialEntries={['/builder/colors']}>
      <App />
    </MemoryRouter>
  )

  expect(await screen.findByText(/Color Palette/i)).toBeInTheDocument()
})

// Test protected routes
it('redirects to login for unauthenticated users', () => {
  render(
    <MemoryRouter initialEntries={['/builder']}>
      <App />
    </MemoryRouter>
  )

  expect(screen.getByText(/Sign In/i)).toBeInTheDocument()
})
```

### 2. E2E Tests

```typescript
// Cypress/Playwright tests
test('navigates through builder flow', async () => {
  await page.goto('/')
  await page.click('text=Get Started')
  await page.click('text=Colors')
  await expect(page).toHaveURL('/builder/colors')
})
```

---

## Migration Plan

### Phase 1: Setup (Day 1)
- Install React Router v6
- Create route configuration
- Set up layouts

### Phase 2: Implementation (Days 2-3)
- Implement all routes
- Add code splitting
- Create protected route wrapper
- Type-safe route constants

### Phase 3: Testing (Day 4)
- Unit tests for routing
- E2E tests for navigation
- Performance testing (bundle size)

### Phase 4: Polish (Day 5)
- Add loading states
- Implement error boundaries
- URL state management
- Prefetching optimization

---

## Success Metrics

| Metric | Target | Critical |
|--------|--------|----------|
| Bundle size (router) | < 15 KB | Yes |
| Route chunk size | < 50 KB | No |
| Navigation speed | < 200ms | Yes |
| Code split coverage | 100% | Yes |
| Type safety | 100% | Yes |

---

## Consequences

### Positive

1. ✅ **Industry Standard**: Well-known library, easy to hire for
2. ✅ **Excellent DX**: Great TypeScript support, clear API
3. ✅ **Future-Proof**: Active development, modern features
4. ✅ **Performance**: Code splitting, lazy loading built-in
5. ✅ **Testing**: Easy to test with MemoryRouter
6. ✅ **Reasonable Bundle**: Only ~13 KB overhead

### Negative

1. ❌ **Bundle Overhead**: +13 KB (but necessary for routing)
2. ❌ **Learning Curve**: Data Router API is new
3. ❌ **Type Safety**: Not as good as TanStack Router (but good enough)

### Mitigation

- Provide clear documentation and examples
- Create reusable route patterns
- Use TypeScript constants for type safety
- Monitor bundle size in CI/CD

---

## References

- [React Router v6 Docs](https://reactrouter.com/)
- [Data Router API](https://reactrouter.com/en/main/routers/picking-a-router)
- [Migration Guide v5 → v6](https://reactrouter.com/en/main/upgrading/v5)

---

**Decision Owner:** @architect
**Implementation Owner:** @dev
**Review Date:** End of Phase 4 (2026-02-28)
**Status:** ✅ Accepted and Active
