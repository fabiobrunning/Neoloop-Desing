# Token Reference

> 170 design tokens | Lendario brand + watchOS extended palette

## Core Colors (19)

| Token | CSS Variable | Value | Usage |
|-------|-------------|-------|-------|
| Primary | `--color-primary` | `#D4AF37` | Brand gold, CTAs, active states |
| Primary Hover | `--color-primary-hover` | `#C4A030` | Hover on primary elements |
| Primary Muted | `--color-primary-muted` | `rgba(212,175,55,0.15)` | Backgrounds, subtle highlights |
| Background Base | `--color-bg-base` | `#0A0A0F` | Main background |
| Background Elevated | `--color-bg-elevated` | `#12121A` | Cards, elevated surfaces |
| Background Surface | `--color-bg-surface` | `#1A1A24` | Hover, secondary surfaces |
| Border | `--color-border` | `#2A2A36` | Default borders |
| Border Emphasis | `--color-border-emphasis` | `#D4AF37` | Focus rings, active borders |
| Text Primary | `--color-text-primary` | `#FAFAF9` | Headings, body text |
| Text Secondary | `--color-text-secondary` | `#A8A8B3` | Descriptions, labels |
| Text Muted | `--color-text-muted` | `#6B6B78` | Placeholders, hints |
| Text Inverse | `--color-text-inverse` | `#0A0A0F` | Text on primary bg |
| Success | `--color-success` | `#22C55E` | Success states |
| Warning | `--color-warning` | `#F59E0B` | Warning states |
| Error | `--color-error` | `#EF4444` | Error states |
| Info | `--color-info` | `#3B82F6` | Info states |

## Extended Palette (77 watchOS colors)

Available as `--palette-*` CSS variables. Categories:

- **Red/Pink** (9): `--palette-red` through `--palette-bubblegumPink`
- **Orange/Yellow** (5): `--palette-tangerine` through `--palette-canaryYellow`
- **Green** (6): `--palette-flora` through `--palette-mint`
- **Blue/Teal** (7): `--palette-tealBlue` through `--palette-ocean`
- **Purple** (5): `--palette-lavender` through `--palette-plum`
- **Earth/Neutral** (8): `--palette-cocoa` through `--palette-stone`

Full list in `src/tokens/palette-extended.css`.

## Chart Palette (10)

Sequential colors for data visualization:
`--chart-1` through `--chart-10`

## Gradients (5)

| Name | CSS Variable | Colors |
|------|-------------|--------|
| Badge | `--gradient-badge` | `#ff3b57 → #ffda1a` |
| Purple Blue | `--gradient-purple-blue` | `#8962f8 → #1ea5fc` |
| Hibiscus | `--gradient-hibiscus` | `#fb0049 → #f12e6d` |
| Green Mint | `--gradient-green-mint` | `#80e220 → #a2ec8e` |
| Gold Sunset | `--gradient-gold-sunset` | `#D4AF37 → #fc4e12` |

## Typography (22)

| Token | CSS Variable | Value |
|-------|-------------|-------|
| Font Sans | `--font-sans` | `Inter, system-ui, sans-serif` |
| Font Mono | `--font-mono` | `JetBrains Mono, monospace` |
| Text XS | `--text-xs` | `0.75rem / 1rem` |
| Text SM | `--text-sm` | `0.875rem / 1.25rem` |
| Text Base | `--text-base` | `1rem / 1.5rem` |
| Text LG | `--text-lg` | `1.125rem / 1.75rem` |
| Text XL | `--text-xl` | `1.25rem / 1.75rem` |
| Text 2XL | `--text-2xl` | `1.5rem / 2rem` |
| Text 3XL | `--text-3xl` | `1.875rem / 2.25rem` |
| Text 4XL | `--text-4xl` | `2.25rem / 2.5rem` |

## Spacing (15)

Standard Tailwind spacing scale: `0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8, 10, 12, 16`

## Border Radius (7)

| Token | CSS Variable | Value |
|-------|-------------|-------|
| None | `--radius-none` | `0` |
| SM | `--radius-sm` | `0.25rem` |
| MD | `--radius-md` | `0.375rem` |
| LG | `--radius-lg` | `0.5rem` |
| XL | `--radius-xl` | `0.75rem` |
| 2XL | `--radius-2xl` | `1rem` |
| Full | `--radius-full` | `9999px` |

## Shadows (6)

| Token | CSS Variable | Usage |
|-------|-------------|-------|
| XS | `--shadow-xs` | Subtle depth |
| SM | `--shadow-sm` | Cards |
| MD | `--shadow-md` | Dropdowns |
| LG | `--shadow-lg` | Modals |
| XL | `--shadow-xl` | Popovers |
| Glow | `--shadow-glow` | Primary element glow |

## Motion (9)

| Token | CSS Variable | Value |
|-------|-------------|-------|
| Duration Fast | `--duration-fast` | `150ms` |
| Duration Normal | `--duration-normal` | `250ms` |
| Duration Slow | `--duration-slow` | `350ms` |
| Ease In | `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` |
| Ease Out | `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` |
| Ease In Out | `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |

## Usage in CSS

```css
.my-component {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  color: var(--color-text-primary);
  transition: all var(--duration-fast) var(--ease-in-out);
}
```

## Usage in Tailwind

```html
<div class="bg-bg-elevated border-border rounded-xl text-text-primary transition-all duration-fast ease-in-out">
```
