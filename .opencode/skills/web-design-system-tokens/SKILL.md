---
name: web-design-system-tokens
description: Build a restrained color, spacing, radius, shadow and type scale for premium service websites. Use when choosing palette, defining CSS custom properties, fixing inconsistent spacing, or making a site look more premium and coherent.
---

# Design System Tokens

## Palette (professional services / AI studio)

Keep one dominant neutral and ONE accent. Two accents max.

```css
--navy-900:#0B1B33;  /* headings, primary buttons          */
--navy-800:#0F2744;  /* deep panels, visual block bg       */
--navy-600:#22406A;  /* secondary text on light            */
--ink-500:#475569;   /* body text on light                 */
--ink-400:#64748B;   /* muted text                         */
--line:#E6EAF2;      /* 1px borders                        */
--surface:#FFFFFF;
--surface-2:#F6F8FC; /* alternating section bg             */
--accent:#0FA6A0;    /* teal — data, highlights, badges    */
--accent-soft:#E6F6F4;
--blue:#2F6FED;      /* optional secondary accent, sparing */
--whatsapp:#25D366;
--success:#128C7E; --danger:#DC2626;
```

Contrast: body text on `--surface` must be ≥ 4.5:1 (`--ink-500` on white passes; `--ink-400` only for large/meta text). On navy use `#C9D6E8` for body.

## Spacing scale (4px base)

`4 8 12 16 24 32 40 48 64 80 96 120`
Section padding desktop `96–120` top/bottom, mobile `56–72`.
Container: `max-width:1180px`, side padding `24px` desktop / `18px` mobile.

## Radius

`--r-sm:8px; --r-md:12px; --r-lg:16px; --r-xl:22px; --r-pill:999px`
Cards 16–16px, buttons 12px, badges pill.

## Shadows (very soft — premium means restrained)

```css
--sh-sm:0 1px 2px rgba(11,27,51,.06);
--sh-md:0 6px 20px -8px rgba(11,27,51,.14);
--sh-lg:0 24px 60px -24px rgba(11,27,51,.28);
```

## Type scale (Persian)

| Token | Size / line-height | Weight |
| --- | --- | --- |
| display | 56/1.2 | 800 |
| h1 | 44/1.25 | 800 |
| h2 | 34/1.3 | 700 |
| h3 | 22/1.45 | 700 |
| body-lg | 18/1.85 | 400 |
| body | 16/1.8 | 400 |
| sm | 14/1.7 | 500 |
| xs | 12.5/1.6 | 500 |

Use `clamp()` for fluid headings: `clamp(2rem, 4vw, 3.5rem)`.

## Rules of restraint

- Borders 1px `--line`, not shadows AND heavy borders on the same card.
- One hover elevation level only.
- Icons: single stroke width (1.6–1.75), 24px grid, currentColor.
- Gradients: only very low-contrast radial washes behind visuals; never behind body text.
- Motion: 160–240ms ease-out for UI, 600–800ms for scroll reveals.
