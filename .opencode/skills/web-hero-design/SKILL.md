---
name: web-hero-design
description: Design premium hero sections with strong headlines, dual CTAs and modern product visuals for landing pages. Use when building or improving a hero, above-the-fold layout, headline hierarchy, or the visual block beside hero copy.
---

# Hero Section Design

## Anatomy

```
[ optional eyebrow badge / trust pill ]
H1  — 44–68px desktop, 1.15 line-height, max ~14 words
Sub — 18–20px, max 2 lines, muted color, max-width 46ch
[ Primary CTA ] [ Secondary CTA ]
[ micro-trust row: avatars, rating, "بدون نیاز به دانش فنی" ]
```

Visual sits opposite the text (left in RTL layouts). On mobile it stacks **below** the CTAs.

## Headline craft

- Lead with the outcome, not the technology.
- Use a two-tone highlight: neutral headline + accent-colored key phrase.
- Keep one dominant size; do not make the subhead nearly as big.
- Persian text: avoid ALL-CAPS styling and letter-spacing — it breaks Arabic script joining.

## Visual block (no stock robot photos)

Preferred, in order of effort:
1. **Composed UI mockup** — a real-looking dashboard/chat card built in HTML/CSS/SVG. Most premium, themeable, and honest.
2. **Layered cards** — main panel + 2 floating chips (stat, notification) with soft shadows.
3. **Abstract SVG** — grid, nodes, soft gradient orbs, very restrained.

Guidelines:
- Keep the mockup slightly smaller than the headline block; it supports, not competes.
- One accent color on the data viz; everything else neutral.
- Soft shadow: `0 24px 60px -24px rgba(15,39,68,.28)`.
- Subtle motion only: 6–10s float, or a single line drawing itself.

## Avoid

- Generic AI brains / robots / circuit heads.
- Loud multi-stop gradients behind text (kills contrast).
- Centered hero with a giant heading and nothing else.
- Two equally-weighted primary buttons.

## Mobile

- Headline 32–40px, sub 16px, full-width stacked buttons with 12px gap.
- Visual: simplify — hide floating chips below 640px, keep the main panel.
- Never let the hero push the first CTA below the fold on a 375px screen.
