# Neoloop Design System - Component Architecture Diagram
**Visual Architecture Overview**
**Data:** 2026-01-30

---

## 🏗️ ARQUITETURA DE COMPONENTES

### Layer Architecture (Top-Down)

```mermaid
graph TD
    A[App.tsx - Main Application] --> B[Views Layer]
    A --> C[Components Layer]
    A --> D[Tokens Layer]

    B --> B1[Foundation Views]
    B --> B2[Component Views]
    B --> B3[Animation Views]
    B --> B4[Accessibility Views]

    C --> C1[Primitives]
    C --> C2[Composed]
    C --> C3[Feedback]
    C --> C4[Navigation]
    C --> C5[Showcases]

    D --> D1[Foundation Tokens]
    D --> D2[Semantic Tokens]
    D --> D3[Component Tokens]

    style A fill:#667eea,stroke:#333,color:#fff
    style B fill:#f093fb,stroke:#333,color:#fff
    style C fill:#4facfe,stroke:#333,color:#fff
    style D fill:#43e97b,stroke:#333,color:#fff
```

---

## 🎨 FOUNDATION TOKENS LAYER

```mermaid
graph LR
    A[Foundation Tokens] --> B[Colors]
    A --> C[Gradients]
    A --> D[Typography]
    A --> E[Spacing]
    A --> F[Shadows]
    A --> G[Radius]
    A --> H[Borders]
    A --> I[Grid]
    A --> J[Breakpoints]
    A --> K[Z-Index]
    A --> L[Opacity]
    A --> M[Animations]

    B --> N[15 Color Scales]
    C --> O[Linear/Radial/Conic]
    D --> P[Font Families + Scales]
    E --> Q[4px Base System]

    style A fill:#43e97b,stroke:#333,color:#fff
    style B fill:#90EE90,stroke:#333
    style C fill:#90EE90,stroke:#333
    style D fill:#90EE90,stroke:#333
    style E fill:#90EE90,stroke:#333
```

---

## 🧩 COMPONENT HIERARCHY

### Primitives (Atomic Components)

```mermaid
graph TD
    A[Primitives Layer] --> B[Input Components]
    A --> C[Display Components]
    A --> D[Interactive Components]

    B --> B1[Input]
    B --> B2[Textarea]
    B --> B3[Select]
    B --> B4[Checkbox]
    B --> B5[Radio]
    B --> B6[Switch]

    C --> C1[Badge]
    C --> C2[Avatar]
    C --> C3[Skeleton]
    C --> C4[Loader]

    D --> D1[Button]
    D --> D2[Button Icon]
    D --> D3[Link]
    D --> D4[Tooltip]

    style A fill:#4facfe,stroke:#333,color:#fff
    style B fill:#87CEEB,stroke:#333
    style C fill:#87CEEB,stroke:#333
    style D fill:#87CEEB,stroke:#333
```

### Composed Components

```mermaid
graph TD
    A[Composed Layer] --> B[Containers]
    A --> C[Data Display]
    A --> D[Overlays]

    B --> B1[Card]
    B --> B2[Sidebar]
    B --> B3[Navbar]
    B --> B4[Footer]

    C --> C1[Table]
    C --> C2[List]
    C --> C3[Chart]
    C --> C4[Empty State]

    D --> D1[Modal]
    D --> D2[Drawer]
    D --> D3[Tooltip]
    D --> D4[Dropdown]

    style A fill:#667eea,stroke:#333,color:#fff
    style B fill:#9896f0,stroke:#333
    style C fill:#9896f0,stroke:#333
    style D fill:#9896f0,stroke:#333
```

---

## 🔄 DATA FLOW ARCHITECTURE

### Token → Component → View Flow

```mermaid
sequenceDiagram
    participant T as Design Tokens
    participant C as Component
    participant S as Showcase
    participant V as View
    participant E as Export

    T->>C: Provides tokens (color, spacing, etc)
    C->>S: Rendered in Showcase
    S->>V: Displayed in View
    V->>T: User edits tokens
    T->>E: Export to CSS/JSON/etc

    Note over T,E: Real-time synchronization
```

---

## 📦 MODULE DEPENDENCY GRAPH

```mermaid
graph LR
    A[App.tsx] --> B[Views]
    A --> C[Components]
    A --> D[Hooks]
    A --> E[Utils]
    A --> F[Types]

    B --> C
    B --> D
    B --> F

    C --> D
    C --> E
    C --> F

    D --> F
    E --> F

    style A fill:#667eea,stroke:#333,color:#fff
    style B fill:#f093fb,stroke:#333
    style C fill:#4facfe,stroke:#333
    style D fill:#43e97b,stroke:#333
    style E fill:#fa709a,stroke:#333
    style F fill:#feca57,stroke:#333
```

**Legend:**
- **Purple (App):** Entry point
- **Pink (Views):** Editor screens
- **Blue (Components):** UI components
- **Green (Hooks):** Custom React hooks
- **Red (Utils):** Utilities and helpers
- **Yellow (Types):** TypeScript definitions

---

## 🎯 COMPONENT COMPOSITION PATTERN

### Example: Card Component

```mermaid
graph TD
    A[Card Component] --> B[Card Tokens]
    A --> C[Primitives Used]
    A --> D[States]

    B --> B1[padding: spacing-4]
    B --> B2[shadow: shadow-md]
    B --> B3[radius: radius-lg]
    B --> B4[background: color-white]

    C --> C1[Button]
    C --> C2[Badge]
    C --> C3[Avatar]

    D --> D1[Default]
    D --> D2[Hover]
    D --> D3[Focus]
    D --> D4[Disabled]

    style A fill:#667eea,stroke:#333,color:#fff
    style B fill:#43e97b,stroke:#333
    style C fill:#4facfe,stroke:#333
    style D fill:#fa709a,stroke:#333
```

---

## 🔧 BUILD & EXPORT PIPELINE

```mermaid
graph LR
    A[User Edits Tokens] --> B[Validation Layer]
    B --> C{Valid?}
    C -->|Yes| D[Update State]
    C -->|No| E[Show Warning]

    D --> F[Generate Exports]
    F --> G[CSS Variables]
    F --> H[JSON Tokens]
    F --> I[TypeScript Types]
    F --> J[Tailwind Config]
    F --> K[SCSS Variables]

    E --> A

    style A fill:#667eea,stroke:#333,color:#fff
    style B fill:#feca57,stroke:#333
    style D fill:#43e97b,stroke:#333
    style E fill:#ff6b6b,stroke:#333
    style F fill:#4facfe,stroke:#333
```

---

## ♿ ACCESSIBILITY VALIDATION FLOW

```mermaid
graph TD
    A[Component Rendered] --> B[A11y Checks]

    B --> C[Contrast Check]
    B --> D[ARIA Validation]
    B --> E[Keyboard Nav]
    B --> F[Touch Target]

    C --> G{WCAG AA Pass?}
    D --> H{ARIA Complete?}
    E --> I{Keyboard OK?}
    F --> J{Target >= 44px?}

    G -->|No| K[Show Warning]
    G -->|Yes| L[Pass]

    H -->|No| K
    H -->|Yes| L

    I -->|No| K
    I -->|Yes| L

    J -->|No| K
    J -->|Yes| L

    L --> M[Component OK]
    K --> N[Fix Required]

    style A fill:#667eea,stroke:#333,color:#fff
    style B fill:#4facfe,stroke:#333
    style M fill:#43e97b,stroke:#333
    style N fill:#ff6b6b,stroke:#333
```

---

## 🚀 DEPLOYMENT ARCHITECTURE (Future v1.1)

```mermaid
graph TD
    A[Developer] --> B[GitHub Repo]
    B --> C[CI/CD - GitHub Actions]

    C --> D[Build Process]
    D --> E[Vite Build]
    E --> F[TypeScript Check]
    F --> G[ESLint]
    G --> H[Tests - Vitest]

    H --> I{All Pass?}
    I -->|Yes| J[Deploy to Vercel]
    I -->|No| K[Fail Build]

    J --> L[Vercel Edge Network]
    L --> M[Users]

    J --> N[Supabase Backend]
    N --> O[PostgreSQL]
    N --> P[Auth]
    N --> Q[Storage]

    style A fill:#667eea,stroke:#333,color:#fff
    style B fill:#feca57,stroke:#333
    style J fill:#43e97b,stroke:#333
    style K fill:#ff6b6b,stroke:#333
    style M fill:#4facfe,stroke:#333
```

---

## 📊 STATE MANAGEMENT ARCHITECTURE

```mermaid
graph TD
    A[App State] --> B[Design System State]
    A --> C[UI State]
    A --> D[User Preferences]

    B --> B1[Tokens State]
    B --> B2[Components State]
    B --> B3[Export State]

    C --> C1[Active View]
    C --> C2[Modal Open/Close]
    C --> C3[Loading States]

    D --> D1[Theme - Light/Dark]
    D --> D2[Language]
    D --> D3[Saved Designs]

    B1 --> E[useContext]
    B2 --> E
    B3 --> E

    C1 --> F[useState]
    C2 --> F
    C3 --> F

    D1 --> G[localStorage]
    D2 --> G
    D3 --> G

    style A fill:#667eea,stroke:#333,color:#fff
    style B fill:#43e97b,stroke:#333
    style C fill:#4facfe,stroke:#333
    style D fill:#fa709a,stroke:#333
```

---

## 🔍 COMPONENT FILE STRUCTURE

### Standard Component Structure

```
Component/
├── Component.tsx              # Main implementation
├── Component.types.ts         # TypeScript interfaces
├── Component.styles.ts        # Tailwind classes (or CSS)
├── Component.test.tsx         # Unit tests
├── Component.stories.tsx      # Storybook stories (future)
├── index.ts                   # Barrel export
└── README.md                  # Component documentation
```

### Example: Button Component

```mermaid
graph LR
    A[Button/] --> B[Button.tsx]
    A --> C[Button.types.ts]
    A --> D[Button.styles.ts]
    A --> E[Button.test.tsx]
    A --> F[index.ts]

    B --> G[8 Variants]
    B --> H[5 Sizes]
    B --> I[States - Hover/Focus/Disabled/Loading]

    C --> J[ButtonProps interface]
    C --> K[ButtonVariant type]
    C --> L[ButtonSize type]

    style A fill:#667eea,stroke:#333,color:#fff
    style B fill:#4facfe,stroke:#333
    style C fill:#feca57,stroke:#333
    style D fill:#43e97b,stroke:#333
```

---

## 🌐 EXPORT FORMATS ARCHITECTURE

```mermaid
graph TD
    A[Design System Tokens] --> B[Export Engine]

    B --> C[CSS Variables Export]
    B --> D[JSON Export]
    B --> E[TypeScript Export]
    B --> F[Tailwind Config Export]
    B --> G[SCSS Export]
    B --> H[Figma Tokens Export]

    C --> C1[:root { --color-primary: #667eea; }]
    D --> D1[{ color: { primary: '#667eea' } }]
    E --> E1[export const tokens = { color: { primary: '#667eea' } }]
    F --> F1[theme: { extend: { colors: { primary: '#667eea' } } }]
    G --> G1[$color-primary: #667eea;]
    H --> H1[Figma JSON format]

    style A fill:#667eea,stroke:#333,color:#fff
    style B fill:#4facfe,stroke:#333
    style C fill:#43e97b,stroke:#333
    style D fill:#43e97b,stroke:#333
    style E fill:#43e97b,stroke:#333
    style F fill:#43e97b,stroke:#333
    style G fill:#43e97b,stroke:#333
    style H fill:#43e97b,stroke:#333
```

---

## 🧪 TESTING ARCHITECTURE

```mermaid
graph TD
    A[Testing Strategy] --> B[Unit Tests]
    A --> C[Integration Tests]
    A --> D[E2E Tests]
    A --> E[Accessibility Tests]

    B --> B1[Vitest]
    B --> B2[React Testing Library]
    B --> B3[Component Tests]

    C --> C1[View Integration]
    C --> C2[Token Integration]

    D --> D1[Playwright - Future]

    E --> E1[axe-core]
    E --> E2[WCAG Validation]

    style A fill:#667eea,stroke:#333,color:#fff
    style B fill:#43e97b,stroke:#333
    style C fill:#4facfe,stroke:#333
    style D fill:#feca57,stroke:#333
    style E fill:#fa709a,stroke:#333
```

---

## 📱 RESPONSIVE ARCHITECTURE

```mermaid
graph LR
    A[Breakpoints System] --> B[Mobile - 0-639px]
    A --> C[Tablet - 640-1023px]
    A --> D[Desktop - 1024-1279px]
    A --> E[Wide - 1280px+]

    B --> F[Stack Layout]
    C --> G[Hybrid Layout]
    D --> H[Side-by-side]
    E --> I[Full Width]

    style A fill:#667eea,stroke:#333,color:#fff
    style B fill:#4facfe,stroke:#333
    style C fill:#4facfe,stroke:#333
    style D fill:#4facfe,stroke:#333
    style E fill:#4facfe,stroke:#333
```

---

## 🎨 THEMING ARCHITECTURE

```mermaid
graph TD
    A[Theme System] --> B[Light Theme]
    A --> C[Dark Theme]
    A --> D[Custom Themes]

    B --> E[Light Colors]
    B --> F[Light Shadows]

    C --> G[Dark Colors]
    C --> H[Dark Shadows]

    D --> I[User Defined]

    E --> J[CSS Variables]
    G --> J
    I --> J

    J --> K[Components]

    style A fill:#667eea,stroke:#333,color:#fff
    style B fill:#feca57,stroke:#333
    style C fill:#4a5568,stroke:#333,color:#fff
    style D fill:#43e97b,stroke:#333
```

---

## 🔐 SECURITY & VALIDATION LAYER

```mermaid
graph TD
    A[User Input] --> B[Validation Layer]

    B --> C[Type Check]
    B --> D[Range Check]
    B --> E[Format Check]
    B --> F[Security Check]

    C --> G{Valid?}
    D --> G
    E --> G
    F --> G

    G -->|Yes| H[Accept Input]
    G -->|No| I[Reject + Error]

    H --> J[Update State]
    I --> K[Show Error Message]

    style A fill:#667eea,stroke:#333,color:#fff
    style B fill:#feca57,stroke:#333
    style G fill:#4facfe,stroke:#333
    style H fill:#43e97b,stroke:#333
    style I fill:#ff6b6b,stroke:#333
```

---

## 📚 SUMMARY: ARCHITECTURAL PRINCIPLES

### 1. **Token-Driven Design**
All visual properties derive from design tokens.

### 2. **Component Composition**
Build complex components from atomic primitives.

### 3. **Accessibility First**
Every component validates against WCAG standards.

### 4. **Type Safety**
Full TypeScript coverage with strict mode.

### 5. **Export Flexibility**
Support multiple output formats for ecosystem compatibility.

### 6. **Performance Optimized**
Lazy loading, code splitting, memoization.

### 7. **Testable Architecture**
100% unit test coverage target, integration tests.

### 8. **Documentation as Code**
Showcases serve as live documentation.

---

**Documento Criado:** 2026-01-30
**Por:** Backend System Architect
**Caminho:** `/docs/03-ARCHITECTURE/component-architecture-diagram.md`
