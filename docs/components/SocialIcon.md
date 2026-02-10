# SocialIcon

Renders social media brand icons (GitHub, Discord, Instagram, etc.) from bundled SVG assets with color variant support.

## Import

```tsx
import { SocialIcon } from "synkra-ds";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `network` | `string` | — | Social network name (e.g., "GitHub", "Discord") |
| `variant` | `"colorida" \| "black" \| "white"` | `"colorida"` | Icon color variant |
| `size` | `number` | `24` | Icon size in pixels |
| `alt` | `string` | Network name | Alt text for accessibility |
| `className` | `string` | — | Additional CSS classes |

## Examples

```tsx
<SocialIcon network="GitHub" />
<SocialIcon network="Discord" variant="black" />
<SocialIcon network="Instagram" size={48} />
<SocialIcon network="X" variant="white" alt="Follow on X" />
```

## Available Networks

GitHub, Discord, Instagram, LinkedIn, X, YouTube, Spotify, Telegram, TikTok, and more.

## Accessibility

- Uses `<img>` with alt text (defaults to network name)
- Lazy loading enabled by default
