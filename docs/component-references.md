# Component Visual References

> Design references extracted from assets/ for building DS components.
> Use these as models for `*build` and `*compose` commands.

## Available References

### 1. Checkbox / Radio / Switch
**Source:** `assets/checkbox/Radio button, Switch & Checkbox - Tida Components (Community)/`

| Component | File | Build Command |
|-----------|------|---------------|
| Checkbox | `Checkbox.svg` | `*build checkbox` |
| Radio Button | `Radio Button.svg` | `*build radio` |
| Switch/Toggle | `Switch.svg` | `*build switch` |

**Design Notes:**
- Tida Components community library
- Clean, minimal style
- Dark/light variants expected

---

### 2. Sidebar Navigation
**Source:** `assets/Sidebar/`

| Variant | File |
|---------|------|
| Dark Mode | `Sidebar (Community)/Dark.svg` |
| Light Mode | `Sidebar (Community)/Light.svg` |
| Layout A | `Group 2.svg` |
| Layout B | `Main page.svg` |

**Design Notes:**
- Both dark and light mode variants available
- Reference for navigation organism
- Build with: `*compose sidebar`

---

### 3. Login / Registration Screens
**Source:** `assets/Login/20 Screen Login & Register Mobile App (Community)/`

| Type | Files | Count |
|------|-------|-------|
| Login | `Login Version 1.svg` - `Login Version 10.svg` | 10 variants |
| Sign Up | `Sign Up Version 1.svg` - `Sign Up Version 10.svg` | 10 variants |

**Design Tokens (from Figma export):**
- Background: `#05080F` (dark mode)
- Card: `#1A1C1E`
- Headline: `#FFFFFF`
- Grey/secondary: `#6C7278`
- Stroke: `#1A1C1E`
- Foundations: Blue `#375DFB`, Purple `#6E3FF3`, Red `#DF1C41`

**Design Notes:**
- Mobile-first design (20 screen variations)
- Dark mode with accent colors (blue, purple, red)
- Token-aligned with Lendario dark theme
- Build with: `*compose login-form`, `*compose signup-form`

---

### 4. Charts & Data Visualization
**Source:** `assets/graficos/`

| Type | Folder | Count |
|------|--------|-------|
| Pie Charts | `Circle Charts (Community)/` | 36 variants |
| Bar Charts (vertical) | `T Charts Components (Community) (1)/` | 22 variants |
| Bar Charts (horizontal) | `T Charts Components (Community)/` | 15 variants |
| Theme variants | `T Charts Components (Community) (2)/` | 2 (Dark/Light) |

**Design Notes:**
- Use `--chart-1` through `--chart-10` from `palette-extended.css`
- Dark and light mode chart variants available
- Build with: `*build chart-pie`, `*build chart-bar`

---

### 5. Background / UI Kit Templates
**Source:** `assets/background/`

| Kit | Folder | Content |
|-----|--------|---------|
| Backstage DS | `Backstage Design System (Community)/` | Homepage dark mode, tutorials |
| B&W UI Kit | `Black And White - Web & Mobile UI Kit (Community)/` | 73+ layout elements, typography |

**Design Notes:**
- Full page layout references
- Typography heading styles in `Type/Primary/` subfolder
- Useful for template-level organisms

---

### 6. Typography Scale
**Source:** `assets/fonts/README.md`

| Level | Size | Weight | Line Height |
|-------|------|--------|-------------|
| Display XL | 72px | Bold | 1.25 |
| Display LG | 60px | Bold | 1.25 |
| Display MD | 48px | Semibold | 1.25 |
| Display SM | 36px | Semibold | 1.375 |
| Heading XL | 30px | Semibold | 1.375 |
| Heading LG | 24px | Semibold | 1.5 |
| Heading MD | 20px | Semibold | 1.5 |
| Heading SM | 16px | Semibold | 1.5 |
| Heading XS | 14px | Semibold | 1.5 |
| Body LG | 18px | Regular | 1.625 |
| Body MD | 16px | Regular | 1.5 |
| Body SM | 14px | Regular | 1.5 |
| Caption LG | 14px | Medium | 1.5 |
| Caption MD | 12px | Medium | 1.5 |
| Caption SM | 12px | Regular | 1.25 |

**Fonts:** Inter (sans), JetBrains Mono (code), Source Serif 4 (reading), Rajdhani (display)

---

### 7. Color Palette Reference
**Source:** `assets/Cores/design-tokens-colors.css`

- 77 watchOS colors organized by hue family
- Integrated as extended palette in `src/tokens/palette-extended.css`
- 10-color chart palette for data visualization
- 5 gradient presets (badge, purple-blue, hibiscus, green-mint, gold-sunset)

---

## Icon Libraries (24,000+ total)

| Library | Icons | Styles | Source |
|---------|-------|--------|--------|
| 10K Free Icons | 10,000+ | Multiple | `assets/icons/` |
| 6K UI Icons | 6,000+ | Modern UI | Figma |
| Iconly V3.0 | 1,000+ | 6 styles | Figma |
| Xicons | 1,000+ | Social/Crypto/Payment | Figma |
| Vuesax | 6,150+ | 6 styles | Figma |

**Primary icon lib (code):** `lucide-react` (tree-shakeable, installed)
**Extended (design):** Reference Figma libraries for additional icons

---

## How to Use References

When building a component with `*build` or `*compose`:

1. Open the reference SVG in a browser or Figma
2. Extract visual patterns (spacing, radius, colors)
3. Map patterns to existing design tokens
4. Build component using tokens (zero hardcoded values)

```bash
# Example: Build checkbox using reference
*build checkbox
# Brad will reference: assets/checkbox/.../Checkbox.svg
```
