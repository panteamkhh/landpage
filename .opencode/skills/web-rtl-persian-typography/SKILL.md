---
name: web-rtl-persian-typography
description: Implement right-to-left Persian (Farsi) web layouts with correct Vazirmatn typography, logical CSS properties and bidi-safe components. Use when building RTL pages, fixing mirrored layouts, Persian fonts, numbers or mixed-direction text.
---

# RTL & Persian Typography

## Document setup

```html
<html lang="fa" dir="rtl">
```

Font: **Vazirmatn** (variable or 400/500/700/800). Weights used: 400 body, 500 UI, 700 subheads, 800 hero.

```css
font-family: Vazirmatn, "Segoe UI", Tahoma, sans-serif;
```

Load with `preconnect` + `display=swap`. Never let Tahoma be the visible default (poor metrics).

## Use logical properties, never left/right

| Instead of | Use |
| --- | --- |
| `margin-left` | `margin-inline-start` |
| `padding-right` | `padding-inline-end` |
| `left: 0` | `inset-inline-start: 0` |
| `text-align: left` | `text-align: start` |
| `border-left` | `border-inline-start` |
| `border-radius: 0 12px 12px 0` | `border-start-start-radius: 12px` |

This makes the same CSS work if direction ever flips, and prevents "half-mirrored" bugs.

## Persian text rules

- **No `text-transform: uppercase`** and **no positive `letter-spacing`** — both break Arabic letter joining.
- Line-height 1.7–1.9 for body; 1.25–1.4 for headings. Persian needs more leading than Latin.
- Max line length ~62 characters for body copy.
- Do not justify text; use `text-align: start` and `text-wrap: pretty` where supported.
- Ellipsis and quotes: fine, but avoid mixing Latin punctuation mid-sentence.

## Numbers & mixed content

- Persian digits are optional; if you use `font-feature-settings: "ss01"` or a digit map, be consistent site-wide.
- Keep Latin/technical tokens (URLs, `wa.me`, prices in USD) wrapped so bidi doesn't reorder them, or keep them isolated in their own element.
- In code samples inside RTL pages, force `direction: ltr` on the code block.

## Icons & directional glyphs

- Arrows must point **left** for "next/forward", right for "back".
- Chevrons in accordions point **down**; rotate consistently.
- Icon + text: icon on the right of the label.

## Common bugs checklist

- Scrollbar appears on the left instead of right (wrong on `body` overflow).
- Cards' shadow looks asymmetric (hardcoded `box-shadow x-offset`).
- Flex rows reverse unexpectedly — that's correct for RTL; verify order intentionally.
- Dropdowns/menus anchored with `right:` open off-screen — use `inset-inline-end`.
- Numbers in tables misalign — set `font-variant-numeric: tabular-nums` and `direction: ltr` on numeric cells.
