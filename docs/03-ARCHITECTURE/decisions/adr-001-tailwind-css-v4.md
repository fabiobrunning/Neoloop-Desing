# ADR-001: Tailwind CSS v4 as Primary Styling Solution

**Date:** 2026-01-30
**Status:** Accepted
**Decision Maker:** @architect
**Stakeholders:** Development Team, UX Team

---

## Context and Problem Statement

The Neoloop Design System Builder needs a CSS framework that:
1. Enables rapid UI development
2. Supports design token export (CSS Variables)
3. Provides excellent TypeScript integration
4. Delivers small bundle sizes
5. Allows runtime theming (light/dark mode)

We need to decide on a styling approach that balances developer experience, performance, and export capabilities.

---

## Decision Drivers

- **Export Capability:** Users must get both Tailwind config AND CSS variables
- **Performance:** Bundle size must stay under 180KB (gzipped)
- **Type Safety:** TypeScript autocomplete for all utilities
- **Theming:** Runtime switching between light/dark modes
- **Developer Experience:** Fast iteration with HMR
- **Ecosystem:** Large community and plugin support

---

## Considered Options

### Option 1: Tailwind CSS v4
**Pros:**
- Utility-first approach (rapid prototyping)
- JIT compiler (fast builds, small bundles)
- CSS Variables support (perfect for design tokens)
- Excellent TypeScript integration
- Tree-shakable utilities
- Built-in responsive design
- Large ecosystem (plugins, resources)
- v4 improvements: better type safety, improved DX

**Cons:**
- Learning curve for non-Tailwind developers
- Can lead to verbose className strings
- Requires Tailwind knowledge to customize exported CSS
- Some developers dislike utility-first approach

**Bundle Impact:** ~30KB CSS (gzipped)

---

### Option 2: CSS Modules
**Pros:**
- Scoped styles (no conflicts)
- Standard CSS syntax
- No framework lock-in
- Simple mental model

**Cons:**
- No built-in design token system
- Manual responsive design
- Verbose file structure (one CSS file per component)
- Harder to theme dynamically
- No TypeScript autocomplete
- Larger bundle sizes (no tree-shaking)

**Bundle Impact:** ~60-80KB CSS (gzipped)

---

### Option 3: Styled Components (CSS-in-JS)
**Pros:**
- Component-scoped styles
- Dynamic theming built-in
- TypeScript support
- Theme object pattern

**Cons:**
- Runtime overhead (styles generated at runtime)
- Larger bundle size
- Harder to export for users (requires React)
- Performance issues with many components
- No static CSS extraction by default
- Poor SSR performance

**Bundle Impact:** ~50KB JS + runtime overhead

---

### Option 4: Vanilla CSS + PostCSS
**Pros:**
- No dependencies
- Full control over output
- Standard CSS

**Cons:**
- Too much boilerplate
- No design token system
- Manual responsive design
- No type safety
- Requires building own system for everything
- Slow development

**Bundle Impact:** ~40-50KB CSS (gzipped)

---

## Decision Outcome

**Chosen Option: Tailwind CSS v4**

We chose Tailwind CSS v4 because it best aligns with our requirements:

1. **Design Token Integration:** Seamless integration with CSS Variables
   ```css
   /* Design tokens become Tailwind utilities */
   :root {
     --color-primary-500: #667eea;
   }

   /* Tailwind config */
   theme: {
     extend: {
       colors: {
         primary: {
           500: 'var(--color-primary-500)'
         }
       }
     }
   }

   /* Usage */
   <button className="bg-primary-500">
   ```

2. **Export Flexibility:** Users get BOTH:
   - `tailwind.config.js` for Tailwind projects
   - `tokens.css` with CSS Variables for any project

3. **Performance:** Tree-shaking ensures only used utilities are bundled
   - Initial CSS: ~25-30KB (gzipped)
   - Scales linearly (not exponentially) with usage

4. **Developer Experience:**
   - IntelliSense autocomplete in VS Code
   - Fast HMR (< 100ms)
   - Minimal context switching (stay in JSX)

5. **Runtime Theming:**
   ```typescript
   // Dark mode switching
   <html className={isDark ? 'dark' : 'light'}>

   // CSS automatically adapts
   .dark .bg-gray-50 { background: var(--color-gray-900); }
   ```

---

## Implementation Strategy

### Phase 1: Setup (Week 1)
```typescript
// tailwind.config.ts
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          // ... 100-900
        }
      },
      spacing: {
        // Design token spacing
      },
      fontSize: {
        // Design token typography
      }
    }
  }
}
```

### Phase 2: Token Integration (Week 1-2)
```typescript
// Generate CSS Variables from design tokens
function generateTokenCSS(tokens: DesignTokens): string {
  return `
:root {
  ${tokens.colors.map(c => `--color-${c.id}: ${c.hex};`).join('\n')}
  ${tokens.spacing.map(s => `--spacing-${s.id}: ${s.value};`).join('\n')}
}
`
}
```

### Phase 3: Component Styling (Week 2)
```typescript
// Use cn() utility to merge Tailwind classes
import { cn } from '@/utils/cn'

<Button
  className={cn(
    'px-4 py-2 rounded-md',
    'bg-primary-500 text-white',
    'hover:bg-primary-600',
    'transition-colors duration-200'
  )}
/>
```

---

## Positive Consequences

### For Developers
- Rapid component development
- Consistent spacing/sizing system
- Responsive design utilities out of the box
- Dark mode with minimal code

### For Users
- Small CSS bundle size
- Get both Tailwind config AND vanilla CSS
- Can use design system without Tailwind
- Clear token naming conventions

### For Project
- Easy to maintain (no CSS files)
- Type-safe styling
- Excellent documentation
- Large community

---

## Negative Consequences & Mitigation

### Learning Curve
**Issue:** Team members unfamiliar with Tailwind
**Mitigation:**
- Internal workshop (1 hour)
- Documentation with examples
- VS Code IntelliSense for discovery

### Verbose ClassNames
**Issue:** Long className strings
**Mitigation:**
- Use `cn()` utility for conditional classes
- Extract repeated patterns to component variants
- ESLint plugin to format multi-line classNames

### Framework Lock-in
**Issue:** Users might not want Tailwind
**Mitigation:**
- Export pure CSS Variables alongside Tailwind config
- Document conversion to other frameworks
- Provide vanilla CSS alternative

---

## Validation & Metrics

### Success Criteria
- [ ] CSS bundle < 30KB (gzipped)
- [ ] HMR update < 100ms
- [ ] TypeScript autocomplete working
- [ ] Dark mode toggle < 50ms
- [ ] Export generates valid Tailwind config
- [ ] Export generates valid CSS Variables

### Monitoring
```typescript
// Bundle size check
npm run build
gzip -9 < dist/assets/index.*.css | wc -c
// Target: < 30,720 bytes (30KB)

// Performance check
lighthouse https://neoloop.design --view
// Target: Performance > 90
```

---

## Alternatives Revisited (Future)

### If Tailwind Becomes a Problem
**Scenario:** Performance issues, user complaints, etc.

**Migration Path:**
1. CSS Variables are framework-agnostic (keep them)
2. Generate vanilla CSS from tokens
3. Offer multiple export options:
   - Tailwind config (current)
   - CSS Variables only
   - CSS Modules
   - Styled Components theme

**Estimated Effort:** 2-3 weeks

---

## Related Decisions

- **ADR-002:** Token organization strategy (CSS Variables)
- **ADR-003:** Component composition pattern (Tailwind utilities)
- **Future ADR:** Dark mode implementation

---

## References

- [Tailwind CSS v4 Docs](https://tailwindcss.com/)
- [CSS Variables in Tailwind](https://tailwindcss.com/docs/customizing-colors#using-css-variables)
- [Performance Best Practices](https://tailwindcss.com/docs/optimizing-for-production)
- [TypeScript Support](https://tailwindcss.com/docs/configuration#type-script)

---

## Notes

- Tailwind CSS v4 is production-ready as of 2024
- v4 introduces improved type safety (satisfies Config)
- JIT compiler is now standard (no more purging)
- Supports CSS Variables natively (no plugins needed)

---

**Decision Status:** ✅ Accepted and Implemented
**Review Date:** End of Week 2 (validate performance metrics)
**Last Updated:** 2026-01-30
