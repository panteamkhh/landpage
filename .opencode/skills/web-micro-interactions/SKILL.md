---
name: web-micro-interactions
description: Add tasteful scroll reveals, hover effects, accordions, tabs and modal transitions to static HTML sites without heavy libraries. Use when animating cards, adding scroll animations, building interactive filters or modals, or making a page feel premium.
---

# Micro-interactions (vanilla JS)

## Principles

- Motion explains change, never decorates. 160–240ms for UI feedback, 500–700ms for entrances.
- Animate `transform` and `opacity` only. Never animate `top/left/width/height`.
- Everything must degrade: content visible with JS off or `prefers-reduced-motion`.
- One hero animation maximum.

## Scroll reveal (IntersectionObserver)

```css
.reveal{opacity:0;transform:translateY(16px);transition:opacity .6s ease,transform .6s cubic-bezier(.22,.7,.2,1)}
.reveal.is-in{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none}}
```

```js
const io = new IntersectionObserver((es)=>{
  es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target);} });
},{threshold:.14, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
```

Stagger children with `transition-delay: calc(var(--i) * 60ms)`.

## Cards

Hover: lift `translateY(-4px)`, border darkens to accent tint, shadow steps to `--sh-md`. Do not scale cards (looks cheap). Keep `:focus-within` identical to hover for keyboard users.

## Accordion

Use native `<details><summary>` when possible — free accessibility. If custom, set `aria-expanded`, `aria-controls`, and animate with `grid-template-rows: 0fr → 1fr`.

## Filters

Toggle `hidden` + a fade class on items; update `aria-pressed` on filter chips; announce result count in a `role="status"` live region.

## Modal

- `<dialog>` element with `showModal()` gives focus trap + Esc for free.
- Lock body scroll (`overflow:hidden`), restore focus to the trigger on close.
- Backdrop `rgba(11,27,51,.55)` + `backdrop-filter: blur(3px)`.
- Animate panel: opacity + `translateY(12px) → 0`, 200ms.
- Close on: X button, Esc, backdrop click, explicit close button.

## Mobile menu

Full-height panel or dropdown under the header. Toggle `aria-expanded`, trap focus, close on link click and on resize ≥ breakpoint.

## Do not

- Parallax everywhere, spinning loaders, typewriter headlines, autoplaying carousels.
- Animations longer than the user's patience (>800ms for a reveal).
