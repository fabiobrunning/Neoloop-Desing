# Component Usage Guidelines
**Neoloop Design System Builder**
**Data:** 2026-01-31
**Status:** ✅ COMPLETO

---

## 📋 Visão Geral

Este documento fornece diretrizes práticas de uso para cada um dos 26 componentes do Neoloop Design System Builder, incluindo quando usar, quando NÃO usar, exemplos práticos e anti-patterns.

---

## 🎨 Design Tokens

### Color Tokens

**Quando Usar:**
- Definir paleta de cores do projeto
- Estabelecer hierarquia visual
- Criar identidade de marca
- Definir cores semânticas (success, error, warning)

**Quando NÃO Usar:**
- Para escolher cores de imagens (use image editor)
- Para gradientes complexos (use backgrounds module)
- Para cores de ícones sociais (use social icons module)

**Best Practices:**

```typescript
// ✅ DO: Use semantic color names
const Button = () => (
  <button style={{ background: 'var(--color-primary)' }}>
    Click me
  </button>
);

// ❌ DON'T: Hardcode color values
const Button = () => (
  <button style={{ background: '#FF453A' }}>
    Click me
  </button>
);

// ✅ DO: Define semantic roles
{
  "colors": {
    "primary": "#FF453A",
    "secondary": "#32ADE6",
    "success": "#10B981",
    "error": "#EF4444"
  }
}

// ❌ DON'T: Use color names as roles
{
  "colors": {
    "coral": "#FF453A",  // Não é claro o uso
    "blue": "#32ADE6"
  }
}
```

**Real-World Examples:**

```css
/* ✅ CORRETO: Sistema de cores completo */
:root {
  /* Primary (Brand) */
  --color-primary: #FF453A;
  --color-primary-hover: #E6312B;
  --color-primary-active: #CC271F;

  /* Semantic */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;

  /* Neutral */
  --color-text: #111827;
  --color-text-muted: #6B7280;
  --color-background: #FFFFFF;
  --color-border: #E5E7EB;
}
```

---

### Typography

**Quando Usar:**
- Definir hierarquia de texto
- Estabelecer fontes de marca
- Criar consistência tipográfica
- Definir escalas responsivas

**Quando NÃO Usar:**
- Para títulos de imagens (use image editor)
- Para logos tipográficos (use vector graphics)

**Best Practices:**

```typescript
// ✅ DO: Define clear font roles
{
  "typography": {
    "fontFamily": {
      "primary": "Inter",      // Body text
      "heading": "Playfair",   // Headings
      "mono": "JetBrains Mono" // Code
    },
    "fontSize": {
      "h1": "2.25rem",
      "h2": "1.875rem",
      "body": "1rem",
      "small": "0.875rem"
    }
  }
}

// ❌ DON'T: Mix too many fonts
{
  "fonts": [
    "Inter", "Roboto", "Open Sans", "Lato", "Montserrat"
    // Demais! Max 2-3 famílias
  ]
}
```

**Typography Scale:**

```css
/* ✅ Mathematical scale (1.25 ratio) */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px = 16 * 1.25 */
--font-size-2xl: 1.5rem;    /* 24px = 20 * 1.25 (approx) */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
```

---

### Spacing

**Quando Usar:**
- Definir padding/margin consistentes
- Criar grid systems
- Estabelecer espaçamento entre componentes
- Touch target sizing

**Quando NÃO Usar:**
- Para tamanhos de componentes específicos (use width/height direto)
- Para posicionamento absoluto complexo

**Best Practices:**

```css
/* ✅ DO: Use spacing scale para tudo */
.card {
  padding: var(--spacing-4);
  margin-bottom: var(--spacing-6);
  gap: var(--spacing-3);
}

/* ❌ DON'T: Valores arbitrários */
.card {
  padding: 17px;  /* Por que 17? */
  margin-bottom: 23px;
}

/* ✅ DO: Touch targets */
.button {
  padding: var(--spacing-2) var(--spacing-4);
  min-height: 44px; /* var(--spacing-11) */
}

/* ✅ DO: Consistent gaps */
.grid {
  display: grid;
  gap: var(--spacing-4);
  grid-template-columns: repeat(3, 1fr);
}
```

**Spacing Guidelines:**

| Uso | Tamanho Recomendado | Token |
|-----|---------------------|-------|
| Padding de botão | 8-16px | spacing-2 a spacing-4 |
| Gap entre elementos | 12-16px | spacing-3 a spacing-4 |
| Margin entre seções | 24-32px | spacing-6 a spacing-8 |
| Touch target mínimo | 44px | spacing-11 |
| Container padding | 16-24px | spacing-4 a spacing-6 |

---

### Shadows

**Quando Usar:**
- Criar hierarquia visual (elevação)
- Destacar elementos interativos
- Diferenciar layers (modals, dropdowns)

**Quando NÃO Usar:**
- Como única forma de indicar informação (acessibilidade)
- Em backgrounds com gradientes complexos
- Para simular bordas (use border)

**Best Practices:**

```css
/* ✅ DO: Progressive elevation */
.card {
  box-shadow: var(--shadow-sm);
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.modal {
  box-shadow: var(--shadow-xl);
}

/* ❌ DON'T: Random shadow values */
.card {
  box-shadow: 2px 5px 13px rgba(0,0,0,0.17);
}

/* ✅ DO: Combine com border para clareza */
.card {
  border: 1px solid var(--gray-200);
  box-shadow: var(--shadow-sm);
}

/* ✅ DO: Inner shadow para inputs */
input {
  box-shadow: var(--shadow-inner);
}

input:focus {
  box-shadow: 0 0 0 3px var(--color-primary-200);
}
```

**Shadow Hierarchy:**

| Component | Shadow Level | When |
|-----------|--------------|------|
| Flat card | sm | Default |
| Elevated card | md | Hover, active |
| Dropdown menu | lg | Opened |
| Modal backdrop | xl | Overlays |
| Dialog critical | 2xl | Important |

---

### Border Radius

**Quando Usar:**
- Criar consistência visual
- Suavizar interfaces
- Diferenciar elementos (pills vs cards)

**Quando NÃO Usar:**
- Para criar formas complexas (use SVG)
- Inconsistentemente (escolha uma escala)

**Best Practices:**

```css
/* ✅ DO: Consistent radius */
.button {
  border-radius: var(--radius-md);
}

.card {
  border-radius: var(--radius-lg);
}

.avatar {
  border-radius: var(--radius-full);
}

/* ❌ DON'T: Mixed radiuses */
.button-1 { border-radius: 6px; }
.button-2 { border-radius: 8px; }
.button-3 { border-radius: 12px; }
/* Escolha UMA escala! */

/* ✅ DO: Match related components */
.input {
  border-radius: var(--radius-md);
}

.button-in-form {
  border-radius: var(--radius-md); /* Mesmo que input */
}
```

**Radius Personality:**

| Style | Radius | Vibe |
|-------|--------|------|
| Sharp | none (0) | Formal, editorial, serious |
| Subtle | sm-md (4-6px) | Modern, professional |
| Friendly | lg-xl (8-12px) | Approachable, casual |
| Bold | 2xl-3xl (16-24px) | Playful, distinctive |
| Pill | full | Badges, tags, avatars |

---

### Breakpoints

**Quando Usar:**
- Design responsivo
- Layout adaptativos
- Media queries
- Container queries

**Quando NÃO Usar:**
- Para sizes de componentes individuais (use width direto)

**Best Practices:**

```css
/* ✅ DO: Mobile-first approach */
.grid {
  display: grid;
  grid-template-columns: 1fr; /* Mobile: 1 coluna */
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 colunas */
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr); /* Desktop: 3 colunas */
  }
}

/* ❌ DON'T: Desktop-first (harder to maintain) */
.grid {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 1023px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ✅ DO: Consistent breakpoint usage */
/* Use sempre os mesmos valores em todo o projeto */
```

**Responsive Patterns:**

```typescript
// ✅ React: Responsive hook
function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState('sm');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setBreakpoint('lg');
      else if (width >= 768) setBreakpoint('md');
      else setBreakpoint('sm');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}

// Usage
const breakpoint = useBreakpoint();
const columns = breakpoint === 'lg' ? 3 : breakpoint === 'md' ? 2 : 1;
```

---

## 🔷 Visual Components

### Icons

**Quando Usar:**
- Navegação
- Ações (botões)
- Status indicators
- Visual hierarchy

**Quando NÃO Usar:**
- Como único indicador de informação (acessibilidade)
- Substituir texto descritivo importante
- Em excesso (visual clutter)

**Best Practices:**

```tsx
// ✅ DO: Icon + Text (mais claro)
<button>
  <HomeIcon />
  <span>Home</span>
</button>

// ❌ DON'T: Icon sem context
<button>
  <HomeIcon />
</button>

// ✅ DO: Icon-only com ARIA label
<button aria-label="Go to home">
  <HomeIcon aria-hidden="true" />
</button>

// ✅ DO: Consistent icon size
const ICON_SIZES = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
};

<HomeIcon size={ICON_SIZES.md} />
```

**Icon Usage Matrix:**

| Context | Size | With Text | ARIA Label |
|---------|------|-----------|------------|
| Button primary | 20px | Yes | Optional |
| Button icon-only | 24px | No | Required |
| Menu item | 20px | Yes | No (text presente) |
| Status indicator | 16px | Yes | No |
| Hero section | 48px | Optional | If no text |

---

### Social Icons

**Quando Usar:**
- Links para redes sociais
- Métodos de login (OAuth)
- Métodos de pagamento
- Sharing buttons

**Quando NÃO Usar:**
- Generic icons (use icon library)
- Fora de contexto de integração social

**Best Practices:**

```tsx
// ✅ DO: Official brand colors
<FacebookIcon color="original" /> {/* #1877F2 */}

// ❌ DON'T: Custom colors para marcas
<FacebookIcon color="#00FF00" /> {/* Quebra brand identity */}

// ✅ DO: Consistent sizing
<div className="social-links">
  <a href="https://facebook.com/...">
    <FacebookIcon size={24} />
    <span className="sr-only">Facebook</span>
  </a>
  <a href="https://twitter.com/...">
    <TwitterIcon size={24} />
    <span className="sr-only">Twitter</span>
  </a>
</div>

// ✅ DO: Payment icons em checkout
<div className="payment-methods">
  <span>We accept:</span>
  <VisaIcon />
  <MastercardIcon />
  <AmexIcon />
</div>
```

**Brand Guidelines:**
- Sempre use cores oficiais (original style)
- Nunca altere proporções
- Respeite spacing mínimo (clear space)
- Link para página oficial da marca

---

### Charts

**Quando Usar:**
- Visualizar dados numéricos
- Comparar valores
- Mostrar tendências
- Apresentar proporções

**Quando NÃO Usar:**
- Para dados complexos (use tabelas com sorting)
- Quando precisão exata é crítica (mostrar valores)
- Com muitas categorias (> 10 cores)

**Best Practices:**

```tsx
// ✅ DO: Acessível com tabela alternativa
<div>
  <LineChart data={data} />
  <details>
    <summary>View data as table</summary>
    <table>
      {/* Dados em formato tabular */}
    </table>
  </details>
</div>

// ✅ DO: Cores do design system
const chartColors = [
  'var(--color-primary)',
  'var(--color-secondary)',
  'var(--color-success)',
  'var(--color-warning)'
];

// ❌ DON'T: Muitas cores diferentes
const tooManyColors = [
  '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
  '#FF00FF', '#00FFFF', /* ... */ // Confuso!
];

// ✅ DO: Tooltips informativos
<BarChart>
  <Tooltip
    formatter={(value, name) => [`${name}: ${value}`, '']}
  />
</BarChart>

// ✅ DO: Axis labels claros
<LineChart>
  <XAxis
    dataKey="month"
    label={{ value: 'Month', position: 'insideBottom' }}
  />
  <YAxis
    label={{ value: 'Sales ($)', angle: -90, position: 'insideLeft' }}
  />
</LineChart>
```

**Chart Selection Guide:**

| Data Type | Best Chart | Alternative |
|-----------|------------|-------------|
| Trend over time | Line | Area |
| Comparison | Bar | Column |
| Proportions | Pie | Donut |
| Distribution | Histogram | Box plot |
| Correlation | Scatter | Bubble |

---

### Backgrounds

**Quando Usar:**
- Hero sections
- Section dividers
- Card backgrounds
- Full-page layouts

**Quando NÃO Usar:**
- Atrás de muito texto (readability)
- Com contrastes baixos
- Em excesso (distracting)

**Best Practices:**

```css
/* ✅ DO: Subtle patterns */
.hero {
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-secondary) 100%
  );
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('/patterns/dots.svg');
  opacity: 0.1; /* Subtle! */
}

/* ❌ DON'T: Busy backgrounds com texto */
.section {
  background-image: url('/busy-pattern.png');
  color: black; /* Difícil de ler */
}

/* ✅ DO: Ensure text readability */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white; /* High contrast: 7.2:1 */
}

/* ✅ DO: Glassmorphism com moderação */
.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

**Background Overlay Pattern:**

```css
/* Garantir legibilidade de texto em imagens */
.hero-with-image {
  position: relative;
  background-image: url('/hero.jpg');
  background-size: cover;
}

.hero-with-image::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4); /* Overlay escuro */
}

.hero-with-image > * {
  position: relative;
  z-index: 1;
  color: white;
}
```

---

## 🎯 UI Components

### Button

**Quando Usar:**
- Ações primárias (submit, save, confirm)
- Ações secundárias (cancel, back)
- Navegação (next, previous)
- Ações destrutivas (delete, remove)

**Quando NÃO Usar:**
- Para navegação (use links `<a>`)
- Ações que não fazem nada (design only)
- Excesso de botões (max 2 primary por tela)

**Best Practices:**

```tsx
// ✅ DO: Clear hierarchy
<div className="actions">
  <Button variant="primary">Save Changes</Button>
  <Button variant="secondary">Cancel</Button>
  <Button variant="ghost">Preview</Button>
</div>

// ❌ DON'T: Multiple primary actions
<div className="actions">
  <Button variant="primary">Save</Button>
  <Button variant="primary">Delete</Button>
  <Button variant="primary">Cancel</Button>
  {/* Qual é a ação principal? */}
</div>

// ✅ DO: Appropriate sizes
<Button size="lg">Hero CTA</Button>
<Button size="md">Default Action</Button>
<Button size="sm">Secondary Action</Button>

// ✅ DO: Loading states
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Spinner />
      <span>Loading...</span>
    </>
  ) : (
    'Submit'
  )}
</Button>

// ✅ DO: Icon placement
<Button>
  <PlusIcon />
  <span>Add Item</span>
</Button>

<Button>
  <span>Next</span>
  <ArrowRightIcon />
</Button>
```

**Button Hierarchy:**

| Priority | Variant | When to Use | Max per Screen |
|----------|---------|-------------|----------------|
| Primary | primary | Main action | 1-2 |
| Secondary | secondary | Supporting action | 2-3 |
| Tertiary | outline/ghost | Optional action | 3+ |
| Danger | danger | Destructive | 1 |
| Link | link | Navigation alternative | No limit |

---

### Card

**Quando Usar:**
- Agrupar conteúdo relacionado
- List items com múltiplas propriedades
- Product displays
- Dashboard widgets

**Quando NÃO Usar:**
- Para todo o conteúdo (over-use)
- Dentro de outros cards (nested cards)
- Quando simples div é suficiente

**Best Practices:**

```tsx
// ✅ DO: Structured card
<Card>
  <CardHeader>
    <CardTitle>Product Name</CardTitle>
    <CardActions>
      <button>Edit</button>
    </CardActions>
  </CardHeader>
  <CardBody>
    <p>Description...</p>
  </CardBody>
  <CardFooter>
    <Button>View Details</Button>
  </CardFooter>
</Card>

// ❌ DON'T: Flat structure
<Card>
  <h3>Title</h3>
  <p>Text</p>
  <button>Action</button>
  {/* Sem semântica clara */}
</Card>

// ✅ DO: Interactive cards
<Card
  as="a"
  href="/product/123"
  className="clickable"
>
  {/* Todo card é clicável */}
</Card>

// ✅ DO: Grid de cards consistente
<div className="grid grid-cols-3 gap-4">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>
```

**Card Patterns:**

```tsx
// Product Card
<Card variant="elevated">
  <img src="product.jpg" alt="Product" />
  <CardBody>
    <h3>Product Name</h3>
    <p className="price">$99.99</p>
    <Button fullWidth>Add to Cart</Button>
  </CardBody>
</Card>

// Stat Card
<Card variant="outlined">
  <CardBody>
    <div className="stat-label">Total Sales</div>
    <div className="stat-value">$12,345</div>
    <div className="stat-change success">+12%</div>
  </CardBody>
</Card>

// Profile Card
<Card variant="basic">
  <CardBody className="flex">
    <Avatar src="user.jpg" />
    <div>
      <h4>John Doe</h4>
      <p>Senior Designer</p>
    </div>
  </CardBody>
</Card>
```

---

### Form Inputs

**Quando Usar:**
- Coletar dados do usuário
- Filtros e buscas
- Configurações
- Autenticação

**Quando NÃO Usar:**
- Para exibir informação (use text)
- Quando action button é mais apropriado

**Best Practices:**

```tsx
// ✅ DO: Complete form field
<div className="form-group">
  <label htmlFor="email">
    Email Address
    <span aria-label="required">*</span>
  </label>
  <input
    id="email"
    type="email"
    placeholder="you@example.com"
    required
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby="email-help email-error"
    autoComplete="email"
  />
  <div id="email-help" className="helper-text">
    We'll never share your email.
  </div>
  {hasError && (
    <div id="email-error" className="error-message" role="alert">
      <AlertIcon />
      <span>Please enter a valid email</span>
    </div>
  )}
</div>

// ❌ DON'T: Placeholder as label
<input type="email" placeholder="Email" />

// ✅ DO: Appropriate input types
<input type="email" />     {/* Email validation */}
<input type="tel" />       {/* Phone keyboard on mobile */}
<input type="number" />    {/* Numeric keyboard */}
<input type="date" />      {/* Date picker */}
<input type="password" />  {/* Masked input */}

// ✅ DO: Autocomplete attributes
<input
  type="text"
  name="name"
  autoComplete="name"
/>
<input
  type="email"
  name="email"
  autoComplete="email"
/>
<input
  type="tel"
  name="phone"
  autoComplete="tel"
/>
```

**Form Validation Patterns:**

```tsx
// Real-time validation (on blur)
<input
  onBlur={(e) => validateEmail(e.target.value)}
  aria-invalid={emailError ? true : false}
/>

// Form-level validation (on submit)
<form onSubmit={(e) => {
  e.preventDefault();
  const errors = validateForm(formData);
  if (Object.keys(errors).length === 0) {
    submitForm();
  } else {
    setErrors(errors);
  }
}}>
  {/* Fields */}
</form>

// Progressive enhancement
<input
  type="email"
  required
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  title="Please enter a valid email"
/>
```

---

## 🛠️ Tools & Validators

### ContrastCheckerView

**Quando Usar:**
- Validar paletas de cores
- Antes de finalizar design system
- Ao escolher cores de texto/background
- Compliance WCAG

**Como Usar:**

1. Selecione foreground color (texto)
2. Selecione background color
3. Veja ratio calculado
4. Verifique status (AAA, AA, Fail)
5. Use sugestões de cores alternativas

**Resultados:**
- AAA (7:1+): Excelente - use livremente
- AA (4.5:1+): Bom - OK para texto normal
- AA Large (3:1+): OK apenas para texto ≥18px
- Fail (<3:1): NÃO USE para texto

---

### TypographyValidatorView

**Quando Usar:**
- Definir escala tipográfica
- Validar line-heights
- Checar legibilidade
- Antes de finalizar design system

**Verificações:**
- [ ] Font size mínimo 16px (body)
- [ ] Line height ≥ 1.5 (texto normal)
- [ ] Scale matemática (ratio 1.125-1.618)
- [ ] Font pairing harmônico
- [ ] Responsive scaling

---

### SpacingValidatorView

**Quando Usar:**
- Validar spacing system
- Garantir múltiplos de 4px
- Checar touch targets
- Antes de finalizar design system

**Verificações:**
- [ ] Todos valores são múltiplos de 4px
- [ ] Touch targets ≥ 44px
- [ ] Consistent gap usage
- [ ] Grid system alignment

---

## ✅ Quick Reference

### Component Selection Matrix

| Need | Component | Notes |
|------|-----------|-------|
| Define colors | ColorTokens | Paleta base |
| Define fonts | Typography | Hierarquia de texto |
| Define spacing | Spacing | Sistema de espaçamento |
| Create elevation | Shadows | Hierarquia visual |
| Round corners | BorderRadius | Suavidade |
| Responsive layout | Breakpoints | Media queries |
| UI icons | Icons | 3.820 Lucide icons |
| Social links | SocialIcons | Brand logos |
| Data visualization | Charts | 4 tipos de gráficos |
| Section backgrounds | Backgrounds | Gradientes, patterns |
| Call-to-action | Button | 8 variantes |
| Content grouping | Card | 5 layouts |
| User input | FormInputs | 9 tipos |
| Color validation | ContrastChecker | WCAG compliance |
| Typography check | TypographyValidator | Readability |
| Spacing check | SpacingValidator | Consistency |

---

## 🚫 Common Anti-Patterns

**DON'T:**

```tsx
// ❌ Hardcoded values
<div style={{ color: '#FF0000', fontSize: '18px' }}>

// ❌ Inconsistent naming
const primaryColor = '#FF453A';
const mainButton = '#FF453A'; // Use same name!

// ❌ Over-nesting cards
<Card>
  <Card>
    <Card>Content</Card>
  </Card>
</Card>

// ❌ Icon sem texto/label
<button><XIcon /></button>

// ❌ Placeholder como label
<input placeholder="Email" />

// ❌ Low contrast
<div style={{ color: '#AAA', background: '#FFF' }}>
  {/* 2.3:1 - Fail! */}
</div>

// ❌ Non-semantic HTML
<div className="button" onClick={...}>
  {/* Use <button>! */}
</div>

// ❌ Skipping heading levels
<h1>Title</h1>
<h3>Subtitle</h3> {/* Onde está h2? */}
```

**DO:**

```tsx
// ✅ Use design tokens
<div style={{
  color: 'var(--color-primary)',
  fontSize: 'var(--font-size-lg)'
}}>

// ✅ Consistent naming
export const colors = {
  primary: '#FF453A',
  primaryHover: '#E6312B',
  primaryActive: '#CC271F'
};

// ✅ Flat structure
<Card>
  <CardHeader>...</CardHeader>
  <CardBody>...</CardBody>
</Card>

// ✅ Icon + text
<button>
  <XIcon />
  <span>Close</span>
</button>

// ✅ Label + placeholder
<label htmlFor="email">Email</label>
<input id="email" placeholder="you@example.com" />

// ✅ High contrast
<div style={{
  color: 'var(--gray-900)',
  background: 'var(--white)'
}}>
  {/* 10.5:1 - AAA! */}
</div>

// ✅ Semantic HTML
<button onClick={...}>
  Click me
</button>

// ✅ Proper heading hierarchy
<h1>Title</h1>
<h2>Subtitle</h2>
<h3>Sub-subtitle</h3>
```

---

## 📚 Additional Resources

**WCAG Guidelines:**
- https://www.w3.org/WAI/WCAG21/quickref/

**Design System Examples:**
- Material Design: https://m3.material.io/
- Ant Design: https://ant.design/
- Tailwind CSS: https://tailwindcss.com/

**Tools:**
- Contrast checker: https://contrast-ratio.com/
- Type scale: https://type-scale.com/
- Coolors palette: https://coolors.co/

---

**Status:** ✅ COMPLETO
**Última Atualização:** 2026-01-31
**Versão:** 1.0.0
