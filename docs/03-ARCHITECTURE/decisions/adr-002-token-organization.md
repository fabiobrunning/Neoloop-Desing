# ADR-002: Three-Layer Design Token Organization

**Date:** 2026-01-30
**Status:** Accepted
**Decision Maker:** @architect
**Stakeholders:** Design Team, Development Team, Users

---

## Context and Problem Statement

Design tokens need to be organized in a way that:
1. Makes sense to designers and developers
2. Enables flexible theming (light/dark, brand variations)
3. Exports cleanly for users
4. Scales to 79+ components
5. Supports semantic naming (primary, success, error, etc.)

We need a clear strategy for organizing and naming design tokens across the entire system.

---

## Decision Drivers

- **Clarity:** Designers should understand token hierarchy
- **Flexibility:** Easy to swap entire themes
- **Maintainability:** Adding new tokens shouldn't break existing ones
- **Export Quality:** Users get clean, usable token files
- **Scalability:** System works with 10 or 1000 tokens
- **Semantics:** Token names convey meaning, not just values

---

## Considered Options

### Option 1: Single-Layer (Flat) Tokens
```css
:root {
  --color-coral: #FF453A;
  --color-sky-blue: #32ADE6;
  --button-bg: #FF453A;
  --card-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
```

**Pros:**
- Simple structure
- Easy to understand
- No indirection

**Cons:**
- Hard to maintain at scale
- Difficult to theme (must change every token)
- Mixing levels of abstraction
- Not DRY (duplicated values)

---

### Option 2: Two-Layer (Primitive + Semantic)
```css
:root {
  /* Primitive */
  --color-red-500: #FF453A;
  --color-blue-500: #32ADE6;

  /* Semantic */
  --color-primary: var(--color-blue-500);
  --color-error: var(--color-red-500);
}
```

**Pros:**
- Clear separation of values and meaning
- Easy theming (change semantic layer)
- DRY (values defined once)

**Cons:**
- No component-specific tokens
- Semantic tokens get cluttered with component needs
- Hard to override per-component

---

### Option 3: Three-Layer (Primitive + Semantic + Component)
```css
:root {
  /* Layer 1: Primitive (raw values) */
  --color-blue-500: #3B82F6;
  --spacing-4: 1rem;

  /* Layer 2: Semantic (contextual) */
  --color-primary: var(--color-blue-500);
  --spacing-button-padding: var(--spacing-4);

  /* Layer 3: Component (specific) */
  --button-bg-primary: var(--color-primary);
  --button-padding-md: var(--spacing-button-padding);
}
```

**Pros:**
- Clear hierarchy
- Maximum flexibility
- Component tokens can be overridden
- Semantic layer provides meaning
- Primitive layer is theme-agnostic

**Cons:**
- More indirection (3 hops)
- More files to maintain
- Steeper learning curve

---

### Option 4: Design Tokens Community Group Format
```json
{
  "color": {
    "blue": {
      "500": {
        "value": "#3B82F6",
        "type": "color"
      }
    }
  },
  "semantic": {
    "color": {
      "primary": {
        "value": "{color.blue.500}",
        "type": "color"
      }
    }
  }
}
```

**Pros:**
- Industry standard (W3C spec)
- Tool support (Figma plugins, etc.)
- Type metadata included

**Cons:**
- JSON format (not CSS-native)
- Requires build step to convert
- More complex for simple use cases

---

## Decision Outcome

**Chosen Option: Three-Layer Token System (Option 3)**

We chose the three-layer approach because it provides the best balance of flexibility, clarity, and scalability.

### Token Hierarchy

```
Layer 1: PRIMITIVE TOKENS (Foundation)
├── Raw values (colors, sizes, etc.)
├── No semantic meaning
├── Never reference other tokens
└── Example: --color-blue-500, --spacing-4

Layer 2: SEMANTIC TOKENS (Contextual)
├── Reference primitive tokens
├── Provide meaning (primary, success, error)
├── Used across multiple components
└── Example: --color-primary, --spacing-section

Layer 3: COMPONENT TOKENS (Specific)
├── Reference semantic or primitive tokens
├── Scoped to individual components
├── Most specific, highest override priority
└── Example: --button-bg-primary, --card-padding
```

---

## Implementation Examples

### Layer 1: Primitive Tokens

```typescript
// src/tokens/primitives/colors.ts
export const primitiveColors = {
  // Neutral scale (white to black)
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Blue scale
  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  // ... 5 more color families (red, green, yellow, purple, teal)
}

// src/tokens/primitives/spacing.ts
export const primitiveSpacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
}

// CSS Variables
:root {
  /* Primitive Colors */
  --color-gray-50: #FAFAFA;
  --color-gray-100: #F5F5F5;
  /* ... */

  --color-blue-50: #EFF6FF;
  --color-blue-500: #3B82F6;
  /* ... */

  /* Primitive Spacing */
  --spacing-0: 0;
  --spacing-1: 0.25rem;
  --spacing-4: 1rem;
  /* ... */
}
```

---

### Layer 2: Semantic Tokens

```typescript
// src/tokens/semantic/colors.ts
export const semanticColors = {
  // Brand colors (user-selectable)
  primary: {
    50: 'var(--color-blue-50)',
    500: 'var(--color-blue-500)',
    900: 'var(--color-blue-900)',
  },

  secondary: {
    50: 'var(--color-purple-50)',
    500: 'var(--color-purple-500)',
    900: 'var(--color-purple-900)',
  },

  // State colors (fixed)
  success: 'var(--color-green-500)',
  warning: 'var(--color-yellow-500)',
  error: 'var(--color-red-500)',
  info: 'var(--color-blue-500)',

  // Surface colors
  background: 'var(--color-gray-50)',
  surface: '#FFFFFF',
  'surface-elevated': 'var(--color-gray-100)',

  // Text colors
  'text-primary': 'var(--color-gray-900)',
  'text-secondary': 'var(--color-gray-700)',
  'text-disabled': 'var(--color-gray-400)',

  // Border colors
  border: 'var(--color-gray-300)',
  'border-focus': 'var(--color-primary-500)',
}

// src/tokens/semantic/spacing.ts
export const semanticSpacing = {
  // Element spacing
  'element-gap': 'var(--spacing-4)',
  'element-padding': 'var(--spacing-3)',

  // Section spacing
  'section-gap': 'var(--spacing-8)',
  'section-padding': 'var(--spacing-6)',

  // Container spacing
  'container-gap': 'var(--spacing-12)',
  'container-padding': 'var(--spacing-8)',
}

// CSS Variables
:root {
  /* Semantic Colors */
  --color-primary-50: var(--color-blue-50);
  --color-primary-500: var(--color-blue-500);
  --color-primary-900: var(--color-blue-900);

  --color-success: var(--color-green-500);
  --color-error: var(--color-red-500);

  --color-background: var(--color-gray-50);
  --color-surface: #FFFFFF;

  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-700);

  /* Semantic Spacing */
  --spacing-element-gap: var(--spacing-4);
  --spacing-section-gap: var(--spacing-8);
}

[data-theme="dark"] {
  --color-background: var(--color-gray-900);
  --color-surface: var(--color-gray-800);
  --color-text-primary: var(--color-gray-50);
  --color-text-secondary: var(--color-gray-300);
}
```

---

### Layer 3: Component Tokens

```typescript
// src/tokens/components/button.ts
export const buttonTokens = {
  // Backgrounds
  'bg-primary': 'var(--color-primary-500)',
  'bg-primary-hover': 'var(--color-primary-600)',
  'bg-primary-active': 'var(--color-primary-700)',

  'bg-secondary': 'var(--color-secondary-500)',
  'bg-danger': 'var(--color-error)',

  // Text
  'text-primary': '#FFFFFF',
  'text-secondary': 'var(--color-text-primary)',

  // Spacing
  'padding-sm': 'var(--spacing-2) var(--spacing-3)',
  'padding-md': 'var(--spacing-3) var(--spacing-4)',
  'padding-lg': 'var(--spacing-4) var(--spacing-6)',

  // Borders
  'border-radius': 'var(--radius-md)',
  'border-focus': '2px solid var(--color-primary-500)',

  // Shadows
  'shadow-hover': 'var(--shadow-md)',
}

// src/tokens/components/card.ts
export const cardTokens = {
  'bg-default': 'var(--color-surface)',
  'bg-elevated': 'var(--color-surface-elevated)',

  'padding-sm': 'var(--spacing-3)',
  'padding-md': 'var(--spacing-4)',
  'padding-lg': 'var(--spacing-6)',

  'border-color': 'var(--color-border)',
  'border-radius': 'var(--radius-lg)',

  'shadow-elevated': 'var(--shadow-md)',
}

// CSS Variables
:root {
  /* Button Tokens */
  --button-bg-primary: var(--color-primary-500);
  --button-bg-primary-hover: var(--color-primary-600);
  --button-padding-md: var(--spacing-3) var(--spacing-4);
  --button-border-radius: var(--radius-md);

  /* Card Tokens */
  --card-bg-default: var(--color-surface);
  --card-padding-md: var(--spacing-4);
  --card-border-radius: var(--radius-lg);
  --card-shadow: var(--shadow-md);
}
```

---

## Token Naming Convention

### Format
```
--{category}-{property}-{variant?}-{state?}
```

### Examples
```css
/* Primitive */
--color-blue-500
--spacing-4
--shadow-md
--radius-lg

/* Semantic */
--color-primary-500
--color-text-primary
--spacing-section-gap

/* Component */
--button-bg-primary
--button-bg-primary-hover
--card-padding-md
--input-border-focus
```

### Rules
1. Use kebab-case for all tokens
2. Category first (color, spacing, shadow, etc.)
3. Property second (bg, text, padding, etc.)
4. Variant third (primary, secondary, sm, md, lg)
5. State last (hover, active, focus, disabled)

---

## Export Strategy

### For Tailwind Users
```javascript
// tailwind.config.js (auto-generated)
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          500: 'var(--color-primary-500)',
          900: 'var(--color-primary-900)',
        }
      }
    }
  }
}
```

### For Vanilla CSS Users
```css
/* tokens.css (auto-generated) */
:root {
  /* All three layers included */
  --color-blue-500: #3B82F6;
  --color-primary-500: var(--color-blue-500);
  --button-bg-primary: var(--color-primary-500);
}
```

### For JavaScript Users
```typescript
// tokens.ts (auto-generated)
export const tokens = {
  colors: {
    primitive: {
      blue: { 500: '#3B82F6' }
    },
    semantic: {
      primary: { 500: 'var(--color-blue-500)' }
    },
    component: {
      button: { bgPrimary: 'var(--color-primary-500)' }
    }
  }
}
```

---

## Positive Consequences

### Flexibility
- Change entire theme by swapping semantic layer
- Override specific components without affecting others
- Support multiple brands (different semantic mappings)

### Clarity
- Clear hierarchy (primitive → semantic → component)
- Token names convey meaning
- Easy to understand what each token does

### Scalability
- Add new components without touching existing tokens
- Semantic layer prevents token explosion
- Component tokens can be as specific as needed

### Export Quality
- Users get clean, understandable token files
- Can use all layers or just primitives
- Works with any CSS framework

---

## Negative Consequences & Mitigation

### Indirection (3 hops)
**Issue:** `--button-bg-primary` → `--color-primary-500` → `--color-blue-500` → `#3B82F6`

**Mitigation:**
- Document token relationships clearly
- Provide visual token explorer tool
- Export flattened version for debugging

### Maintenance Overhead
**Issue:** 3 files per token category (colors, spacing, etc.)

**Mitigation:**
- Code generation from single source of truth
- TypeScript types to catch errors
- Automated tests for token references

### Learning Curve
**Issue:** Developers need to learn which layer to use

**Mitigation:**
- Clear guidelines in docs
- Component examples showing token usage
- ESLint rule to suggest semantic tokens over primitives

---

## Validation & Metrics

### Success Criteria
- [ ] All 70 colors organized in primitive layer
- [ ] Semantic layer maps to at least 3 primitive colors
- [ ] 10+ components have component-specific tokens
- [ ] Dark mode works by swapping semantic layer only
- [ ] Export generates all 3 layers correctly
- [ ] Documentation includes token explorer

### Monitoring
```typescript
// Validate token references
function validateTokens(tokens: Tokens) {
  // Check all semantic tokens reference primitives
  // Check all component tokens reference semantic or primitives
  // No circular references
  // No orphaned tokens
}
```

---

## Future Enhancements

### Dynamic Token Generation
```typescript
// Auto-generate semantic tokens from primitive selections
function generateSemanticTokens(primitiveColor: string) {
  return {
    primary: {
      50: lighten(primitiveColor, 40),
      500: primitiveColor,
      900: darken(primitiveColor, 40),
    }
  }
}
```

### Token Analytics
- Track which tokens are most used
- Identify unused tokens
- Suggest consolidation opportunities

---

## Related Decisions

- **ADR-001:** Tailwind CSS v4 (CSS Variables support)
- **ADR-003:** Component composition (uses component tokens)
- **Future ADR:** Dark mode implementation (semantic layer switching)

---

## References

- [Design Tokens W3C Community Group](https://design-tokens.github.io/community-group/)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Tailwind CSS Variables](https://tailwindcss.com/docs/customizing-colors#using-css-variables)
- [Open Props](https://open-props.style/) (similar token system)

---

## Notes

- Primitive tokens should NEVER reference other tokens
- Semantic tokens should ONLY reference primitive tokens
- Component tokens can reference semantic OR primitive tokens
- All token names use kebab-case
- CSS Variables enable runtime theming (no rebuild needed)

---

**Decision Status:** ✅ Accepted
**Review Date:** End of Week 2 (validate with real components)
**Last Updated:** 2026-01-30
