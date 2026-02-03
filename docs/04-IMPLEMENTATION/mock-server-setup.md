# Mock Server Setup - Phase 1-2

## Document Information

| Field | Value |
|-------|-------|
| **Project** | Neoloop Design System Builder |
| **Version** | 1.0.0 |
| **Date** | 2026-01-30 |
| **Author** | Data Engineer Agent |
| **Status** | Ready for Implementation |
| **Phase** | v1.0 MVP (No Backend) |

---

## Overview

This document provides the complete setup for mock data and API layer for Phase 1-2 (v1.0 MVP), where the application runs **client-side only** without a real backend.

**Strategy:**
- Static JSON files for templates, icons, backgrounds
- LocalStorage for user data persistence
- Mock API layer with same interface as future real API
- Easy migration path to Supabase (v1.1+)

---

## 1. Mock Data Structure

### 1.1 Project File Organization

```
public/
├── data/
│   ├── templates/
│   │   ├── index.json              # List of available templates
│   │   ├── material-design.json    # Material Design template
│   │   ├── ios-style.json          # iOS style template
│   │   ├── minimalist.json         # Minimalist template
│   │   ├── corporate.json          # Corporate template
│   │   └── vibrant.json            # Vibrant template
│   │
│   ├── icons/
│   │   ├── lucide-icons.json       # 3800+ Lucide icons metadata
│   │   ├── categories.json         # Icon categories
│   │   └── social-icons.json       # Social media logos
│   │
│   ├── backgrounds/
│   │   ├── index.json              # 600+ background patterns
│   │   ├── gradients.json          # Gradient presets
│   │   └── patterns.json           # Pattern presets
│   │
│   └── defaults/
│       ├── colors.json             # 70 default colors (7x10 grid)
│       ├── typography.json         # 8 font families
│       ├── spacing.json            # Spacing scale
│       ├── shadows.json            # Shadow tokens
│       ├── radius.json             # Border radius tokens
│       └── breakpoints.json        # Responsive breakpoints
```

---

## 2. Mock Data Files

### 2.1 Templates Index

```json
// public/data/templates/index.json
{
  "templates": [
    {
      "id": "material-design",
      "name": "Material Design",
      "description": "Google's Material Design system with bold colors and elevation",
      "thumbnail": "/templates/material-design-thumb.png",
      "tags": ["modern", "colorful", "google"],
      "author": "Neoloop Team",
      "downloads": 1542,
      "featured": true
    },
    {
      "id": "ios-style",
      "name": "iOS Style",
      "description": "Apple's Human Interface Guidelines inspired design",
      "thumbnail": "/templates/ios-style-thumb.png",
      "tags": ["minimal", "clean", "apple"],
      "author": "Neoloop Team",
      "downloads": 1234,
      "featured": true
    },
    {
      "id": "minimalist",
      "name": "Minimalist",
      "description": "Clean, minimal design with focus on whitespace",
      "thumbnail": "/templates/minimalist-thumb.png",
      "tags": ["minimal", "clean", "professional"],
      "author": "Neoloop Team",
      "downloads": 987,
      "featured": false
    },
    {
      "id": "corporate",
      "name": "Corporate",
      "description": "Professional design system for enterprise applications",
      "thumbnail": "/templates/corporate-thumb.png",
      "tags": ["professional", "serious", "enterprise"],
      "author": "Neoloop Team",
      "downloads": 756,
      "featured": false
    },
    {
      "id": "vibrant",
      "name": "Vibrant",
      "description": "Bold, colorful design with playful elements",
      "thumbnail": "/templates/vibrant-thumb.png",
      "tags": ["colorful", "modern", "playful"],
      "author": "Neoloop Team",
      "downloads": 623,
      "featured": true
    }
  ]
}
```

### 2.2 Material Design Template

```json
// public/data/templates/material-design.json
{
  "_version": "1.0.0",
  "_id": "material-design",
  "_created": "2026-01-15T10:00:00Z",
  "_updated": "2026-01-15T10:00:00Z",

  "metadata": {
    "name": "Material Design",
    "description": "Google's Material Design system",
    "author": "Neoloop Team",
    "tags": ["modern", "colorful", "google"]
  },

  "tokens": {
    "colors": [
      { "id": "c5-6", "name": "Material Blue", "hex": "#1976D2", "rgb": "rgb(25, 118, 210)", "hsl": "hsl(207, 79%, 46%)", "group": "blue-indigo", "selected": true },
      { "id": "c1-4", "name": "Material Red", "hex": "#D32F2F", "rgb": "rgb(211, 47, 47)", "hsl": "hsl(0, 66%, 51%)", "group": "red-pink", "selected": true },
      { "id": "c3-5", "name": "Material Green", "hex": "#388E3C", "rgb": "rgb(56, 142, 60)", "hsl": "hsl(123, 43%, 39%)", "group": "green", "selected": true },
      { "id": "c2-6", "name": "Material Orange", "hex": "#F57C00", "rgb": "rgb(245, 124, 0)", "hsl": "hsl(30, 100%, 48%)", "group": "orange-yellow", "selected": true },
      { "id": "c7-10", "name": "Material Dark", "hex": "#212121", "rgb": "rgb(33, 33, 33)", "hsl": "hsl(0, 0%, 13%)", "group": "neutrals", "selected": true },
      { "id": "c7-2", "name": "Material Light", "hex": "#FAFAFA", "rgb": "rgb(250, 250, 250)", "hsl": "hsl(0, 0%, 98%)", "group": "neutrals", "selected": true }
    ],

    "typography": {
      "families": [
        {
          "id": "roboto",
          "name": "Roboto",
          "category": "sans-serif",
          "variants": [
            { "weight": 300, "style": "normal", "name": "Light", "selected": true },
            { "weight": 400, "style": "normal", "name": "Regular", "selected": true },
            { "weight": 500, "style": "normal", "name": "Medium", "selected": true },
            { "weight": 700, "style": "normal", "name": "Bold", "selected": true }
          ],
          "source": "google",
          "fallback": "Arial, sans-serif",
          "selected": true
        }
      ],
      "scale": {
        "xs": "0.75rem",
        "sm": "0.875rem",
        "base": "1rem",
        "lg": "1.125rem",
        "xl": "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.125rem",
        "5xl": "3rem",
        "6xl": "3.75rem"
      },
      "lineHeights": {
        "none": 1,
        "tight": 1.25,
        "snug": 1.375,
        "normal": 1.5,
        "relaxed": 1.625,
        "loose": 2
      },
      "letterSpacing": {
        "tighter": "-0.05em",
        "tight": "-0.025em",
        "normal": "0",
        "wide": "0.025em",
        "wider": "0.05em",
        "widest": "0.1em"
      }
    },

    "spacing": {
      "0": "0",
      "1": "0.25rem",
      "2": "0.5rem",
      "3": "0.75rem",
      "4": "1rem",
      "6": "1.5rem",
      "8": "2rem",
      "12": "3rem",
      "16": "4rem",
      "24": "6rem"
    },

    "shadows": {
      "none": "none",
      "xs": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      "sm": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)"
    },

    "radius": {
      "none": "0",
      "sm": "0.125rem",
      "md": "0.25rem",
      "lg": "0.5rem",
      "xl": "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      "full": "9999px"
    },

    "breakpoints": {
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px"
    }
  },

  "components": {
    "icons": {
      "library": "lucide",
      "selected": ["home", "search", "settings", "user", "menu"],
      "style": "outline",
      "size": 24
    },

    "socialIcons": {
      "selected": [
        { "id": "facebook", "style": "original" },
        { "id": "instagram", "style": "original" },
        { "id": "x-twitter", "style": "dark" }
      ]
    },

    "charts": {
      "selected": [
        {
          "id": "pie-simple",
          "type": "pie",
          "variant": "simple",
          "config": {
            "colors": ["#1976D2", "#D32F2F", "#388E3C"],
            "showLegend": true
          }
        }
      ]
    },

    "backgrounds": {
      "selected": ["solid-white", "gradient-blue"]
    }
  },

  "ui": {
    "buttons": {
      "selected": [
        { "variant": "primary", "size": "medium" },
        { "variant": "secondary", "size": "medium" },
        { "variant": "outline", "size": "medium" }
      ]
    },
    "cards": {
      "selected": ["elevated", "outlined"]
    },
    "forms": {
      "selected": ["text-input", "select", "checkbox"]
    }
  },

  "modules": {
    "animations": {
      "selected": []
    },
    "checkbox": {
      "selected": ["default"]
    },
    "loginTemplates": {
      "selected": null
    },
    "sidebarTemplates": {
      "selected": null
    }
  }
}
```

### 2.3 Default Colors

```json
// public/data/defaults/colors.json
{
  "colors": [
    // Column 1: Red-Pink (10 colors)
    { "id": "c1-1", "name": "Soft Pink", "hex": "#FFD7D7", "rgb": "rgb(255, 215, 215)", "hsl": "hsl(0, 100%, 92%)", "group": "red-pink", "selected": false },
    { "id": "c1-2", "name": "Light Pink", "hex": "#FFB3B3", "rgb": "rgb(255, 179, 179)", "hsl": "hsl(0, 100%, 85%)", "group": "red-pink", "selected": false },
    { "id": "c1-3", "name": "Pink", "hex": "#FF8F8F", "rgb": "rgb(255, 143, 143)", "hsl": "hsl(0, 100%, 78%)", "group": "red-pink", "selected": false },
    { "id": "c1-4", "name": "Coral", "hex": "#FF453A", "rgb": "rgb(255, 69, 58)", "hsl": "hsl(4, 100%, 61%)", "group": "red-pink", "selected": false },
    { "id": "c1-5", "name": "Red", "hex": "#FF0000", "rgb": "rgb(255, 0, 0)", "hsl": "hsl(0, 100%, 50%)", "group": "red-pink", "selected": false },
    { "id": "c1-6", "name": "Deep Red", "hex": "#CC0000", "rgb": "rgb(204, 0, 0)", "hsl": "hsl(0, 100%, 40%)", "group": "red-pink", "selected": false },
    { "id": "c1-7", "name": "Crimson", "hex": "#990000", "rgb": "rgb(153, 0, 0)", "hsl": "hsl(0, 100%, 30%)", "group": "red-pink", "selected": false },
    { "id": "c1-8", "name": "Burgundy", "hex": "#660000", "rgb": "rgb(102, 0, 0)", "hsl": "hsl(0, 100%, 20%)", "group": "red-pink", "selected": false },
    { "id": "c1-9", "name": "Maroon", "hex": "#330000", "rgb": "rgb(51, 0, 0)", "hsl": "hsl(0, 100%, 10%)", "group": "red-pink", "selected": false },
    { "id": "c1-10", "name": "Dark Maroon", "hex": "#1A0000", "rgb": "rgb(26, 0, 0)", "hsl": "hsl(0, 100%, 5%)", "group": "red-pink", "selected": false },

    // Column 2: Orange-Yellow (10 colors)
    { "id": "c2-1", "name": "Cream", "hex": "#FFF4CC", "rgb": "rgb(255, 244, 204)", "hsl": "hsl(47, 100%, 90%)", "group": "orange-yellow", "selected": false },
    { "id": "c2-2", "name": "Light Yellow", "hex": "#FFE599", "rgb": "rgb(255, 229, 153)", "hsl": "hsl(45, 100%, 80%)", "group": "orange-yellow", "selected": false },
    { "id": "c2-3", "name": "Yellow", "hex": "#FFD60A", "rgb": "rgb(255, 214, 10)", "hsl": "hsl(50, 100%, 52%)", "group": "orange-yellow", "selected": false },
    { "id": "c2-4", "name": "Gold", "hex": "#FFB800", "rgb": "rgb(255, 184, 0)", "hsl": "hsl(43, 100%, 50%)", "group": "orange-yellow", "selected": false },
    { "id": "c2-5", "name": "Amber", "hex": "#FF9500", "rgb": "rgb(255, 149, 0)", "hsl": "hsl(35, 100%, 50%)", "group": "orange-yellow", "selected": false },
    { "id": "c2-6", "name": "Orange", "hex": "#FF7A00", "rgb": "rgb(255, 122, 0)", "hsl": "hsl(29, 100%, 50%)", "group": "orange-yellow", "selected": false },
    { "id": "c2-7", "name": "Deep Orange", "hex": "#CC6200", "rgb": "rgb(204, 98, 0)", "hsl": "hsl(29, 100%, 40%)", "group": "orange-yellow", "selected": false },
    { "id": "c2-8", "name": "Dark Orange", "hex": "#994A00", "rgb": "rgb(153, 74, 0)", "hsl": "hsl(29, 100%, 30%)", "group": "orange-yellow", "selected": false },
    { "id": "c2-9", "name": "Brown", "hex": "#663200", "rgb": "rgb(102, 50, 0)", "hsl": "hsl(29, 100%, 20%)", "group": "orange-yellow", "selected": false },
    { "id": "c2-10", "name": "Dark Brown", "hex": "#331900", "rgb": "rgb(51, 25, 0)", "hsl": "hsl(29, 100%, 10%)", "group": "orange-yellow", "selected": false },

    // Column 3: Green (10 colors)
    { "id": "c3-1", "name": "Mint", "hex": "#D7FFD7", "rgb": "rgb(215, 255, 215)", "hsl": "hsl(120, 100%, 92%)", "group": "green", "selected": false },
    { "id": "c3-2", "name": "Light Green", "hex": "#B3FFB3", "rgb": "rgb(179, 255, 179)", "hsl": "hsl(120, 100%, 85%)", "group": "green", "selected": false },
    { "id": "c3-3", "name": "Lime", "hex": "#8FFF8F", "rgb": "rgb(143, 255, 143)", "hsl": "hsl(120, 100%, 78%)", "group": "green", "selected": false },
    { "id": "c3-4", "name": "Green", "hex": "#34C759", "rgb": "rgb(52, 199, 89)", "hsl": "hsl(135, 59%, 49%)", "group": "green", "selected": false },
    { "id": "c3-5", "name": "Forest Green", "hex": "#00B300", "rgb": "rgb(0, 179, 0)", "hsl": "hsl(120, 100%, 35%)", "group": "green", "selected": false },
    { "id": "c3-6", "name": "Deep Green", "hex": "#008F00", "rgb": "rgb(0, 143, 0)", "hsl": "hsl(120, 100%, 28%)", "group": "green", "selected": false },
    { "id": "c3-7", "name": "Dark Green", "hex": "#006B00", "rgb": "rgb(0, 107, 0)", "hsl": "hsl(120, 100%, 21%)", "group": "green", "selected": false },
    { "id": "c3-8", "name": "Pine", "hex": "#004700", "rgb": "rgb(0, 71, 0)", "hsl": "hsl(120, 100%, 14%)", "group": "green", "selected": false },
    { "id": "c3-9", "name": "Hunter Green", "hex": "#002300", "rgb": "rgb(0, 35, 0)", "hsl": "hsl(120, 100%, 7%)", "group": "green", "selected": false },
    { "id": "c3-10", "name": "Very Dark Green", "hex": "#001200", "rgb": "rgb(0, 18, 0)", "hsl": "hsl(120, 100%, 4%)", "group": "green", "selected": false },

    // Column 4: Teal-Cyan (10 colors)
    { "id": "c4-1", "name": "Ice Blue", "hex": "#D7FFFF", "rgb": "rgb(215, 255, 255)", "hsl": "hsl(180, 100%, 92%)", "group": "teal-cyan", "selected": false },
    { "id": "c4-2", "name": "Light Cyan", "hex": "#B3FFFF", "rgb": "rgb(179, 255, 255)", "hsl": "hsl(180, 100%, 85%)", "group": "teal-cyan", "selected": false },
    { "id": "c4-3", "name": "Cyan", "hex": "#8FFFFF", "rgb": "rgb(143, 255, 255)", "hsl": "hsl(180, 100%, 78%)", "group": "teal-cyan", "selected": false },
    { "id": "c4-4", "name": "Turquoise", "hex": "#30D5C8", "rgb": "rgb(48, 213, 200)", "hsl": "hsl(175, 67%, 51%)", "group": "teal-cyan", "selected": false },
    { "id": "c4-5", "name": "Teal", "hex": "#00B3A6", "rgb": "rgb(0, 179, 166)", "hsl": "hsl(176, 100%, 35%)", "group": "teal-cyan", "selected": false },
    { "id": "c4-6", "name": "Deep Teal", "hex": "#008F85", "rgb": "rgb(0, 143, 133)", "hsl": "hsl(176, 100%, 28%)", "group": "teal-cyan", "selected": false },
    { "id": "c4-7", "name": "Dark Teal", "hex": "#006B64", "rgb": "rgb(0, 107, 100)", "hsl": "hsl(176, 100%, 21%)", "group": "teal-cyan", "selected": false },
    { "id": "c4-8", "name": "Very Dark Teal", "hex": "#004743", "rgb": "rgb(0, 71, 67)", "hsl": "hsl(177, 100%, 14%)", "group": "teal-cyan", "selected": false },
    { "id": "c4-9", "name": "Almost Black Teal", "hex": "#002322", "rgb": "rgb(0, 35, 34)", "hsl": "hsl(178, 100%, 7%)", "group": "teal-cyan", "selected": false },
    { "id": "c4-10", "name": "Black Teal", "hex": "#001211", "rgb": "rgb(0, 18, 17)", "hsl": "hsl(177, 100%, 4%)", "group": "teal-cyan", "selected": false },

    // Column 5: Blue-Indigo (10 colors)
    { "id": "c5-1", "name": "Sky Blue", "hex": "#D7E3FF", "rgb": "rgb(215, 227, 255)", "hsl": "hsl(222, 100%, 92%)", "group": "blue-indigo", "selected": false },
    { "id": "c5-2", "name": "Light Blue", "hex": "#B3CCFF", "rgb": "rgb(179, 204, 255)", "hsl": "hsl(220, 100%, 85%)", "group": "blue-indigo", "selected": false },
    { "id": "c5-3", "name": "Periwinkle", "hex": "#8FB5FF", "rgb": "rgb(143, 181, 255)", "hsl": "hsl(220, 100%, 78%)", "group": "blue-indigo", "selected": false },
    { "id": "c5-4", "name": "Blue", "hex": "#007AFF", "rgb": "rgb(0, 122, 255)", "hsl": "hsl(211, 100%, 50%)", "group": "blue-indigo", "selected": false },
    { "id": "c5-5", "name": "Ocean Blue", "hex": "#0062CC", "rgb": "rgb(0, 98, 204)", "hsl": "hsl(211, 100%, 40%)", "group": "blue-indigo", "selected": false },
    { "id": "c5-6", "name": "Royal Blue", "hex": "#004A99", "rgb": "rgb(0, 74, 153)", "hsl": "hsl(211, 100%, 30%)", "group": "blue-indigo", "selected": false },
    { "id": "c5-7", "name": "Navy Blue", "hex": "#003266", "rgb": "rgb(0, 50, 102)", "hsl": "hsl(211, 100%, 20%)", "group": "blue-indigo", "selected": false },
    { "id": "c5-8", "name": "Dark Navy", "hex": "#001A33", "rgb": "rgb(0, 26, 51)", "hsl": "hsl(211, 100%, 10%)", "group": "blue-indigo", "selected": false },
    { "id": "c5-9", "name": "Very Dark Navy", "hex": "#000D1A", "rgb": "rgb(0, 13, 26)", "hsl": "hsl(210, 100%, 5%)", "group": "blue-indigo", "selected": false },
    { "id": "c5-10", "name": "Almost Black Blue", "hex": "#00070D", "rgb": "rgb(0, 7, 13)", "hsl": "hsl(208, 100%, 3%)", "group": "blue-indigo", "selected": false },

    // Column 6: Purple-Violet (10 colors)
    { "id": "c6-1", "name": "Lavender", "hex": "#F0D7FF", "rgb": "rgb(240, 215, 255)", "hsl": "hsl(278, 100%, 92%)", "group": "purple-violet", "selected": false },
    { "id": "c6-2", "name": "Light Purple", "hex": "#E0B3FF", "rgb": "rgb(224, 179, 255)", "hsl": "hsl(276, 100%, 85%)", "group": "purple-violet", "selected": false },
    { "id": "c6-3", "name": "Purple", "hex": "#BF5AF2", "rgb": "rgb(191, 90, 242)", "hsl": "hsl(280, 85%, 65%)", "group": "purple-violet", "selected": false },
    { "id": "c6-4", "name": "Deep Purple", "hex": "#9F00FF", "rgb": "rgb(159, 0, 255)", "hsl": "hsl(277, 100%, 50%)", "group": "purple-violet", "selected": false },
    { "id": "c6-5", "name": "Violet", "hex": "#7F00CC", "rgb": "rgb(127, 0, 204)", "hsl": "hsl(277, 100%, 40%)", "group": "purple-violet", "selected": false },
    { "id": "c6-6", "name": "Dark Violet", "hex": "#5F0099", "rgb": "rgb(95, 0, 153)", "hsl": "hsl(277, 100%, 30%)", "group": "purple-violet", "selected": false },
    { "id": "c6-7", "name": "Very Dark Violet", "hex": "#3F0066", "rgb": "rgb(63, 0, 102)", "hsl": "hsl(277, 100%, 20%)", "group": "purple-violet", "selected": false },
    { "id": "c6-8", "name": "Indigo", "hex": "#1F0033", "rgb": "rgb(31, 0, 51)", "hsl": "hsl(276, 100%, 10%)", "group": "purple-violet", "selected": false },
    { "id": "c6-9", "name": "Almost Black Purple", "hex": "#10001A", "rgb": "rgb(16, 0, 26)", "hsl": "hsl(277, 100%, 5%)", "group": "purple-violet", "selected": false },
    { "id": "c6-10", "name": "Black Purple", "hex": "#08000D", "rgb": "rgb(8, 0, 13)", "hsl": "hsl(277, 100%, 3%)", "group": "purple-violet", "selected": false },

    // Column 7: Neutrals (White to Black)
    { "id": "c7-1", "name": "White", "hex": "#FFFFFF", "rgb": "rgb(255, 255, 255)", "hsl": "hsl(0, 0%, 100%)", "group": "neutrals", "selected": false },
    { "id": "c7-2", "name": "Ghost White", "hex": "#F5F5F5", "rgb": "rgb(245, 245, 245)", "hsl": "hsl(0, 0%, 96%)", "group": "neutrals", "selected": false },
    { "id": "c7-3", "name": "Light Gray", "hex": "#E0E0E0", "rgb": "rgb(224, 224, 224)", "hsl": "hsl(0, 0%, 88%)", "group": "neutrals", "selected": false },
    { "id": "c7-4", "name": "Silver", "hex": "#BDBDBD", "rgb": "rgb(189, 189, 189)", "hsl": "hsl(0, 0%, 74%)", "group": "neutrals", "selected": false },
    { "id": "c7-5", "name": "Gray", "hex": "#9E9E9E", "rgb": "rgb(158, 158, 158)", "hsl": "hsl(0, 0%, 62%)", "group": "neutrals", "selected": false },
    { "id": "c7-6", "name": "Dim Gray", "hex": "#757575", "rgb": "rgb(117, 117, 117)", "hsl": "hsl(0, 0%, 46%)", "group": "neutrals", "selected": false },
    { "id": "c7-7", "name": "Dark Gray", "hex": "#616161", "rgb": "rgb(97, 97, 97)", "hsl": "hsl(0, 0%, 38%)", "group": "neutrals", "selected": false },
    { "id": "c7-8", "name": "Charcoal", "hex": "#424242", "rgb": "rgb(66, 66, 66)", "hsl": "hsl(0, 0%, 26%)", "group": "neutrals", "selected": false },
    { "id": "c7-9", "name": "Almost Black", "hex": "#212121", "rgb": "rgb(33, 33, 33)", "hsl": "hsl(0, 0%, 13%)", "group": "neutrals", "selected": false },
    { "id": "c7-10", "name": "Black", "hex": "#000000", "rgb": "rgb(0, 0, 0)", "hsl": "hsl(0, 0%, 0%)", "group": "neutrals", "selected": false }
  ]
}
```

---

## 3. Mock API Implementation

### 3.1 API Service Layer

```typescript
// src/api/mock.ts

/**
 * Mock API for v1.0 (Client-side only)
 *
 * This API layer fetches data from static JSON files in /public/data/
 * and simulates async behavior with Promise delays.
 *
 * In v1.1+, this will be replaced with real Supabase calls.
 */

import type {
  DesignSystem,
  DesignSystemTemplate,
  IconItem,
  SocialIconItem,
  BackgroundItem
} from '../types';

// Simulate network delay
const MOCK_DELAY = 300; // ms

function delay(ms: number = MOCK_DELAY): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class MockAPI {
  // Templates
  async getTemplates(): Promise<DesignSystemTemplate[]> {
    await delay();
    const response = await fetch('/data/templates/index.json');
    const data = await response.json();
    return data.templates;
  }

  async getTemplate(id: string): Promise<DesignSystem> {
    await delay();
    const response = await fetch(`/data/templates/${id}.json`);
    return response.json();
  }

  // Icons
  async getIcons(category?: string): Promise<IconItem[]> {
    await delay();
    const response = await fetch('/data/icons/lucide-icons.json');
    const data = await response.json();

    if (category) {
      return data.icons.filter((icon: IconItem) => icon.category === category);
    }

    return data.icons;
  }

  async getIconCategories(): Promise<string[]> {
    await delay();
    const response = await fetch('/data/icons/categories.json');
    const data = await response.json();
    return data.categories;
  }

  async searchIcons(query: string): Promise<IconItem[]> {
    await delay();
    const allIcons = await this.getIcons();
    const lowerQuery = query.toLowerCase();

    return allIcons.filter(icon =>
      icon.name.toLowerCase().includes(lowerQuery) ||
      icon.keywords?.some(kw => kw.toLowerCase().includes(lowerQuery))
    );
  }

  // Social Icons
  async getSocialIcons(): Promise<SocialIconItem[]> {
    await delay();
    const response = await fetch('/data/icons/social-icons.json');
    const data = await response.json();
    return data.socialIcons;
  }

  // Backgrounds
  async getBackgrounds(type?: string): Promise<BackgroundItem[]> {
    await delay();
    const response = await fetch('/data/backgrounds/index.json');
    const data = await response.json();

    if (type) {
      return data.backgrounds.filter((bg: BackgroundItem) => bg.type === type);
    }

    return data.backgrounds;
  }

  // Defaults
  async getDefaultColors() {
    await delay();
    const response = await fetch('/data/defaults/colors.json');
    return response.json();
  }

  async getDefaultTypography() {
    await delay();
    const response = await fetch('/data/defaults/typography.json');
    return response.json();
  }

  async getDefaultSpacing() {
    await delay();
    const response = await fetch('/data/defaults/spacing.json');
    return response.json();
  }

  async getDefaultShadows() {
    await delay();
    const response = await fetch('/data/defaults/shadows.json');
    return response.json();
  }

  async getDefaultRadius() {
    await delay();
    const response = await fetch('/data/defaults/radius.json');
    return response.json();
  }

  async getDefaultBreakpoints() {
    await delay();
    const response = await fetch('/data/defaults/breakpoints.json');
    return response.json();
  }
}

export const mockAPI = new MockAPI();
```

---

## 4. React Query Integration

### 4.1 Query Hooks

```typescript
// src/hooks/useMockData.ts
import { useQuery } from '@tanstack/react-query';
import { mockAPI } from '../api/mock';

export function useTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: () => mockAPI.getTemplates(),
    staleTime: 10 * 60 * 1000, // 10 minutes (templates rarely change)
  });
}

export function useTemplate(id: string) {
  return useQuery({
    queryKey: ['templates', id],
    queryFn: () => mockAPI.getTemplate(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
}

export function useIcons(category?: string) {
  return useQuery({
    queryKey: ['icons', category],
    queryFn: () => mockAPI.getIcons(category),
    staleTime: 15 * 60 * 1000, // Icons static
  });
}

export function useIconSearch(query: string) {
  return useQuery({
    queryKey: ['icons', 'search', query],
    queryFn: () => mockAPI.searchIcons(query),
    enabled: query.length > 2,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSocialIcons() {
  return useQuery({
    queryKey: ['socialIcons'],
    queryFn: () => mockAPI.getSocialIcons(),
    staleTime: 15 * 60 * 1000,
  });
}

export function useBackgrounds(type?: string) {
  return useQuery({
    queryKey: ['backgrounds', type],
    queryFn: () => mockAPI.getBackgrounds(type),
    staleTime: 10 * 60 * 1000,
  });
}

// Defaults
export function useDefaultColors() {
  return useQuery({
    queryKey: ['defaults', 'colors'],
    queryFn: () => mockAPI.getDefaultColors(),
    staleTime: Infinity, // Never refetch
  });
}

export function useDefaultTypography() {
  return useQuery({
    queryKey: ['defaults', 'typography'],
    queryFn: () => mockAPI.getDefaultTypography(),
    staleTime: Infinity,
  });
}
```

---

## 5. Migration Path to Real API (v1.1+)

### 5.1 API Abstraction Layer

```typescript
// src/api/index.ts

/**
 * API Factory
 *
 * Returns either MockAPI (v1.0) or RealAPI (v1.1+)
 * based on environment variable.
 */

import { mockAPI } from './mock';
import { supabaseAPI } from './supabase'; // v1.1+

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

export const api = USE_MOCK_API ? mockAPI : supabaseAPI;

// Usage in hooks remains the same
// src/hooks/useMockData.ts just changes import:
// import { api } from '../api'; // instead of '../api/mock'
```

### 5.2 Environment Configuration

```bash
# .env.development
VITE_USE_MOCK_API=true

# .env.production (v1.0)
VITE_USE_MOCK_API=true

# .env.production (v1.1+)
VITE_USE_MOCK_API=false
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 6. Implementation Checklist

### Phase 1: Setup (Week 1)
- [ ] Create `/public/data/` directory structure
- [ ] Add default colors JSON (70 colors)
- [ ] Add default typography JSON (8 families)
- [ ] Add default spacing, shadows, radius, breakpoints
- [ ] Create 5 template JSON files

### Phase 2: Mock API (Week 1-2)
- [ ] Implement `src/api/mock.ts`
- [ ] Add network delay simulation
- [ ] Create React Query hooks
- [ ] Test all API endpoints

### Phase 3: Icons Data (Week 2)
- [ ] Generate Lucide icons JSON (3800+ icons)
- [ ] Organize icons by category
- [ ] Add social icons JSON (25+ logos)
- [ ] Implement search functionality

### Phase 4: Backgrounds Data (Week 2)
- [ ] Create backgrounds index JSON
- [ ] Add 600+ background patterns
- [ ] Categorize by type (solid, gradient, pattern, etc.)

### Phase 5: Testing (Week 3)
- [ ] Test all mock API endpoints
- [ ] Verify loading states
- [ ] Test error handling
- [ ] Performance check (bundle size)

---

## Summary

✅ **Complete mock data infrastructure** for v1.0 MVP
✅ **Static JSON files** for all resources (templates, icons, backgrounds)
✅ **Mock API layer** with realistic async behavior
✅ **React Query integration** for data fetching
✅ **Easy migration path** to real Supabase API in v1.1+

**Next Steps:**
1. Create all JSON files in `/public/data/`
2. Implement `src/api/mock.ts`
3. Add React Query hooks in `src/hooks/`
4. Test complete data flow
5. Document API usage for dev team

---

**Status:** ✅ Ready for Implementation
**Author:** Data Engineer Agent
**Date:** 2026-01-30
**Phase:** v1.0 MVP (Client-side only)
