# Brand Guidelines - Neoloop Design System

**Version:** 1.0.0
**Status:** Final
**Last Updated:** 2026-01-30

---

## Table of Contents

1. [Brand Overview](#1-brand-overview)
2. [Logo Usage](#2-logo-usage)
3. [Color Usage](#3-color-usage)
4. [Typography Hierarchy](#4-typography-hierarchy)
5. [Icon System](#5-icon-system)
6. [Voice & Tone](#6-voice--tone)
7. [Imagery Guidelines](#7-imagery-guidelines)
8. [Layout Principles](#8-layout-principles)
9. [Application Examples](#9-application-examples)

---

## 1. Brand Overview

### 1.1 Brand Essence

**Neoloop**
- **Industry:** Technology / SaaS
- **Positioning:** Modern, minimal, professional
- **Personality:** Clean, efficient, trustworthy

**Brand Attributes:**
- **Minimal:** Stripped down to essentials
- **Precise:** Pixel-perfect attention to detail
- **Modern:** Contemporary design language
- **Accessible:** Inclusive by design
- **Reliable:** Consistent and dependable

### 1.2 Design Philosophy

**Less is More:**
- Reduce visual noise
- Focus on content
- Use whitespace generously
- Avoid unnecessary decoration

**Clarity Over Cleverness:**
- Clear communication
- Obvious interactions
- No hidden functionality
- Predictable behavior

**Form Follows Function:**
- Design serves purpose
- No decoration without reason
- Every element has a job
- Beauty through simplicity

---

## 2. Logo Usage

### 2.1 Primary Logo

**Wordmark:**
- Logotype: "Neoloop" in Inter Bold
- Color: Black (#000000)
- All lowercase or Title Case

**Logomark (Optional):**
- Geometric symbol (if exists)
- Standalone or with wordmark
- Monochrome or color variants

### 2.2 Logo Sizes

**Minimum Sizes:**
- Digital: 120px width minimum
- Print: 25mm width minimum
- Favicon: 32x32px (simplified icon)

**Recommended Sizes:**
- Header/Navigation: 140-160px width
- Footer: 100-120px width
- Email signature: 180px width

### 2.3 Clear Space

**Protection Zone:**
- Minimum clear space: Height of letter "o" in logo
- No text, graphics, or other elements in this zone
- Applies to all sides of logo

```
┌───────────────────────┐
│       [Space]         │
│                       │
│  [o]  NEOLOOP  [o]    │
│                       │
│       [Space]         │
└───────────────────────┘
```

**Clear Space Calculation:**
- Measure height of lowercase "o"
- Apply same measurement on all sides
- Scale proportionally with logo size

### 2.4 Logo Variations

#### On Light Backgrounds
```css
.logo-light-bg {
  color: var(--gray-950); /* Black */
  /* or */
  color: var(--gray-900); /* Near black (if softer look needed) */
}
```

#### On Dark Backgrounds
```css
.logo-dark-bg {
  color: var(--white); /* White */
  /* or */
  color: var(--gray-50); /* Off-white (if softer look needed) */
}
```

#### Monochrome
- All black (primary)
- All white (on dark)
- No gradients or effects

### 2.5 Logo Don'ts

**Never:**
- ❌ Stretch or distort proportions
- ❌ Rotate logo
- ❌ Add drop shadows or effects
- ❌ Place on busy backgrounds
- ❌ Change font or spacing
- ❌ Add outline or stroke
- ❌ Use unapproved colors
- ❌ Place too close to edges

**Examples:**

❌ **Incorrect:**
```
N E O L O O P    (excessive spacing)
NEOLOOP          (italic/skewed)
[NEOLOOP]        (in a box)
```

✅ **Correct:**
```
NEOLOOP          (clean, unmodified)
Neoloop          (title case)
neoloop          (lowercase)
```

---

## 3. Color Usage

### 3.1 Primary Brand Colors

**Black (Primary):**
- Hex: `#000000`
- Usage: 60% of design
- Text, headings, primary CTA, logo
- Conveys: Sophistication, authority

**White (Secondary):**
- Hex: `#FFFFFF`
- Usage: 30% of design
- Backgrounds, text on dark, whitespace
- Conveys: Cleanliness, simplicity

**Gray Scale (Supporting):**
- Usage: 10% of design
- Borders, dividers, secondary text
- Maintains minimalist aesthetic

### 3.2 Accent Colors (Semantic)

**Success (Green):**
- Primary: `#10B981` (success-500)
- Usage: Success messages, confirmations
- Sparingly: Maintain minimal look

**Error (Red):**
- Primary: `#EF4444` (error-500)
- Usage: Error messages, destructive actions
- Sparingly: Only when needed

**Warning (Amber):**
- Primary: `#F59E0B` (warning-500)
- Usage: Warnings, alerts
- Sparingly: Draw attention without alarm

**Info (Blue):**
- Primary: `#3B82F6` (info-500)
- Usage: Informational messages, links, focus states
- Most commonly used accent

### 3.3 Color Ratios (60-30-10 Rule)

**In UI Design:**
- 60%: White/light gray backgrounds
- 30%: Black text and elements
- 10%: Accent colors (semantic, interactive)

**Example Page:**
```
┌─────────────────────────────────────┐
│ Header (white bg, black text) 30%  │ ← White: 60%
├─────────────────────────────────────┤
│                                     │
│  Content Area (white bg)      60%  │ ← Black: 30%
│                                     │
│  [Black Button] ← 10%               │ ← Accent: 10%
│                                     │
└─────────────────────────────────────┘
```

### 3.4 Color Psychology

**Black:**
- Elegance, power, sophistication
- Professional, modern
- Use for: Text, primary actions, branding

**White:**
- Simplicity, purity, clarity
- Clean, spacious, honest
- Use for: Backgrounds, breathing room

**Gray:**
- Neutrality, balance
- Professional, timeless
- Use for: Secondary elements, subtlety

**Blue (Info):**
- Trust, stability, intelligence
- Calm, focused
- Use for: Links, focus states, information

---

## 4. Typography Hierarchy

### 4.1 Font Family

**Primary: Inter**
- Modern, clean, highly legible
- Excellent for UI and content
- Supports multiple weights

**Why Inter:**
- Designed for screens
- Open-source, widely available
- Excellent at small sizes
- Large character set (multilingual)

**Fallback Stack:**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont,
             'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
```

### 4.2 Type Scale

**Hierarchy (Largest to Smallest):**

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| H1 | 40px (2.5rem) | Bold (700) | Hero headings, page titles |
| H2 | 32px (2rem) | Bold (700) | Section headings |
| H3 | 24px (1.5rem) | Semibold (600) | Subsection headings |
| H4 | 20px (1.25rem) | Semibold (600) | Card titles |
| Body | 16px (1rem) | Regular (400) | Body text, default |
| Small | 14px (0.875rem) | Regular (400) | Captions, labels |
| Tiny | 12px (0.75rem) | Regular (400) | Metadata, helper text |

### 4.3 Typography Examples

**Hero Section:**
```
[H1] Headline Goes Here (40px, Bold)
     ↓ spacing: 16px
[Body] Subheadline or description text (16px, Regular)
```

**Card Component:**
```
[H4] Card Title (20px, Semibold)
     ↓ spacing: 8px
[Small] Metadata (14px, Regular, gray-600)
     ↓ spacing: 16px
[Body] Card body content (16px, Regular)
```

**Form Labels:**
```
[Small] Label Text (14px, Medium)
     ↓ spacing: 4px
[Body] Input field (16px, Regular)
     ↓ spacing: 4px
[Tiny] Helper text (12px, Regular, gray-600)
```

### 4.4 Typography Best Practices

**Hierarchy Rules:**
- Only one H1 per page
- Don't skip heading levels
- Use font size + weight for hierarchy
- Maintain consistent spacing

**Readability:**
- Body text: 16px minimum
- Line height: 1.5 for body text
- Line length: 45-75 characters ideal
- Contrast: WCAG AA minimum (4.5:1)

**Emphasis:**
- Bold for strong emphasis
- Medium weight for subtle emphasis
- Avoid italic (less readable on screen)
- Use color sparingly for emphasis

---

## 5. Icon System

### 5.1 Icon Style

**Visual Style:**
- Stroke-based (not filled)
- Rounded corners (stroke-linecap: round)
- Consistent stroke width: 2px
- Minimal, geometric

**Recommended Library:**
- Lucide Icons (lucide.dev)
- Heroicons (heroicons.com)
- Feather Icons (feathericons.com)

### 5.2 Icon Sizes

**Standard Sizes:**
- Small: 16px (tight spaces, inline with text)
- Medium: 20px (default, buttons, inputs)
- Large: 24px (prominent icons, headings)
- Extra Large: 32px+ (feature icons, empty states)

**Implementation:**
```css
.icon-sm { width: 16px; height: 16px; }
.icon-md { width: 20px; height: 20px; }
.icon-lg { width: 24px; height: 24px; }
.icon-xl { width: 32px; height: 32px; }
```

### 5.3 Icon Usage

**With Text:**
- Align vertically centered
- 8px gap between icon and text
- Icon size proportional to text

**Standalone (Icon-only Buttons):**
- Always provide aria-label
- Minimum touch target: 44x44px
- Add tooltip on hover

**Color:**
- Default: Matches text color
- Interactive: Primary color (black)
- Disabled: gray-400
- Semantic: success/error/warning colors

### 5.4 Icon Don'ts

**Never:**
- ❌ Mix icon styles (stroke + filled)
- ❌ Use inconsistent stroke widths
- ❌ Rotate icons arbitrarily
- ❌ Add effects (shadows, gradients)
- ❌ Use low-quality raster icons
- ❌ Make icons too small (< 16px)

---

## 6. Voice & Tone

### 6.1 Brand Voice

**Characteristics:**
- **Clear:** Simple language, no jargon
- **Confident:** Direct, authoritative
- **Helpful:** Guiding, supportive
- **Professional:** Polished, reliable

**Not:**
- Casual or overly friendly
- Overly technical or complex
- Cutesy or playful
- Apologetic or uncertain

### 6.2 Tone Variations

**Instructional (Tutorials, Help):**
- Tone: Patient, clear, step-by-step
- Example: "Click the Save button to save your changes."

**Confirmations:**
- Tone: Reassuring, brief
- Example: "Changes saved successfully."

**Errors:**
- Tone: Helpful, solution-oriented
- Example: "Email is required. Please enter your email address."

**Marketing (Homepage, Landing Pages):**
- Tone: Confident, value-focused
- Example: "Streamline your workflow with Neoloop."

### 6.3 Writing Guidelines

**Be Concise:**
- Use short sentences
- Remove unnecessary words
- Get to the point quickly

**Be Clear:**
- Use familiar words
- Avoid jargon and acronyms
- Explain technical terms

**Be Helpful:**
- Provide context
- Suggest solutions
- Anticipate questions

**Examples:**

❌ Bad: "An error has occurred."
✅ Good: "Email is required. Please enter your email address."

❌ Bad: "Click here."
✅ Good: "View your dashboard" (descriptive link text)

❌ Bad: "Oops! Something went wrong!"
✅ Good: "Unable to save changes. Please try again."

---

## 7. Imagery Guidelines

### 7.1 Photography Style

**Preferred Style:**
- Clean, uncluttered compositions
- High contrast (light + shadow)
- Minimal color palette
- Focus on subjects, blur backgrounds
- Professional, not staged

**Avoid:**
- Cheesy stock photos
- Overly saturated colors
- Busy backgrounds
- Cliché office imagery

### 7.2 Illustrations

**Style (if used):**
- Line-based, minimal
- Monochrome or limited color (black + one accent)
- Geometric, simple shapes
- Consistent stroke width

**Use Cases:**
- Empty states
- Error pages
- Onboarding
- Feature explanations

### 7.3 Image Treatment

**Grayscale Filter (Optional):**
- Apply grayscale to photos for consistency
- Adds sophistication
- Reduces color distraction

**Overlay (for text on images):**
- Dark overlay (40-60% opacity) for light text
- Ensures text readability
- Maintains brand aesthetic

```css
.image-overlay {
  position: relative;
}
.image-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
}
```

---

## 8. Layout Principles

### 8.1 Grid System

**Column Grid:**
- 12-column grid (flexible)
- Gutter: 24px (spacing-6)
- Margins: 16px mobile, 24px tablet, 48px desktop

**Container Max Widths:**
- Small: 640px
- Medium: 768px
- Large: 1024px
- Extra Large: 1280px

### 8.2 Spacing Scale

**Consistent Spacing:**
- Base unit: 4px
- All spacing multiples of 4px
- Use design tokens (spacing-1 through spacing-16)

**Vertical Rhythm:**
- Section spacing: 64px (spacing-16)
- Content blocks: 48px (spacing-12)
- Paragraphs: 24px (spacing-6)
- Lines within paragraph: 1.5 line-height

### 8.3 Whitespace

**Generous Whitespace:**
- Don't fear empty space
- Gives content room to breathe
- Improves readability and focus
- Conveys sophistication

**Whitespace Ratios:**
- Between elements: 16-24px minimum
- Between sections: 48-64px
- Around CTA: 32-48px (draws attention)

---

## 9. Application Examples

### 9.1 Website Header

```
┌────────────────────────────────────────────────┐
│  [Logo]           Nav    Nav    Nav  [Button] │
│                                                │
└────────────────────────────────────────────────┘

Colors:
- Background: White
- Logo: Black
- Nav links: Gray-700, hover: Black
- Button: Black bg, white text
```

### 9.2 Hero Section

```
┌────────────────────────────────────────────────┐
│                                                │
│            [H1] Main Headline                  │
│         [Body] Subheadline text                │
│                                                │
│      [Primary Button]  [Secondary Button]      │
│                                                │
└────────────────────────────────────────────────┘

Colors:
- Background: White or light gray-50
- H1: Black, 40px, Bold
- Body: Gray-700, 16px
- Primary Button: Black bg, white text
- Secondary Button: White bg, black text, black border
```

### 9.3 Card Component

```
┌─────────────────────────────────┐
│                                 │
│  [H4] Card Title                │
│  [Small] Metadata               │
│                                 │
│  [Body] Card description text   │
│  that spans multiple lines.     │
│                                 │
│  [Link] Read more →             │
│                                 │
└─────────────────────────────────┘

Colors:
- Background: White
- Border: Gray-200
- H4: Black
- Metadata: Gray-600
- Body: Gray-700
- Link: Info-600 (blue)
```

### 9.4 Form Design

```
┌─────────────────────────────────┐
│  [Small] Email Address *        │
│  ┌───────────────────────────┐  │
│  │ [Input] user@example.com  │  │
│  └───────────────────────────┘  │
│  [Tiny] Helper text             │
│                                 │
│  [Small] Password *             │
│  ┌───────────────────────────┐  │
│  │ [Input] ••••••••••        │  │
│  └───────────────────────────┘  │
│                                 │
│  [Primary Button] Sign In       │
│  [Link] Forgot password?        │
│                                 │
└─────────────────────────────────┘

Colors:
- Labels: Gray-950, Medium weight
- Inputs: White bg, Gray-300 border
- Focus: Info-500 border
- Helper: Gray-600
- Button: Black bg, white text
- Link: Info-600
```

### 9.5 Dashboard Layout

```
┌─────────┬──────────────────────────────────┐
│         │  [H2] Dashboard                  │
│ [Nav]   ├──────────────────────────────────┤
│ Links   │                                  │
│         │  ┌──────────┐  ┌──────────┐      │
│         │  │  Card 1  │  │  Card 2  │      │
│         │  └──────────┘  └──────────┘      │
│         │                                  │
│         │  ┌──────────┐  ┌──────────┐      │
│         │  │  Card 3  │  │  Card 4  │      │
│         │  └──────────┘  └──────────┘      │
│         │                                  │
└─────────┴──────────────────────────────────┘

Colors:
- Sidebar: Gray-50 background
- Main: White background
- Nav links: Gray-700, active: Black
- Cards: White, Gray-200 border, shadow-sm
```

---

## Brand Checklist

### Design Review Checklist
- [ ] Logo used correctly (size, clear space, color)
- [ ] Color palette follows 60-30-10 rule
- [ ] Black (#000000) used for primary elements
- [ ] Typography uses Inter font family
- [ ] Heading hierarchy correct (H1 → H2 → H3)
- [ ] Font sizes match type scale
- [ ] Icons consistent style (stroke-based)
- [ ] Icon sizes appropriate (16-32px)
- [ ] Spacing follows 4px grid
- [ ] Generous whitespace used
- [ ] Minimal design aesthetic maintained
- [ ] Contrast meets WCAG AA standards
- [ ] Voice and tone consistent with guidelines

### Content Review Checklist
- [ ] Language clear and concise
- [ ] No jargon or unnecessary complexity
- [ ] Error messages helpful and solution-oriented
- [ ] Button labels descriptive (not "Click here")
- [ ] Alt text provided for all images
- [ ] Professional tone maintained

---

## Changelog

**v1.0.0 (2026-01-30)**
- Initial brand guidelines
- Logo usage specifications
- Color usage guidelines (60-30-10 rule)
- Typography hierarchy
- Icon system guidelines
- Voice and tone guidelines
- Imagery guidelines
- Layout principles
- Application examples
- Brand checklist
