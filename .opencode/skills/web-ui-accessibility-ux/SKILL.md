---
name: web-ui-accessibility-ux
description: Make websites usable for everyone including non-technical and older visitors with semantic HTML, keyboard support, focus management and plain-language UX. Use when reviewing accessibility, fixing keyboard navigation, contrast, form labels or simplifying a UI for laypeople.
---

# Accessibility & Layperson UX

## The non-technical user test

Ask of every screen:
- Can a 55-year-old shop owner find the main action in 5 seconds?
- Is any label requiring technical knowledge? Replace with a plain phrase.
- Is the number of visible choices small enough to not overwhelm?
- Is there an obvious "human" fallback (phone / WhatsApp)?

## Semantics (free accessibility)

- One `<h1>` per page; headings in order (h1 → h2 → h3).
- `<header> <nav> <main> <section aria-labelledby=""> <footer>`.
- Buttons for actions (`<button>`), links for navigation (`<a href>`). Never a clickable `<div>`.
- Every `<img>` has `alt`; decorative SVG gets `aria-hidden="true"`.
- Icon-only buttons need `aria-label`.

## Keyboard

- Tab order follows visual order; visible ring on every focusable element.
- Custom widgets: menu, accordion, tabs, modal — all operable with Enter/Space/Esc/Arrows.
- Modal traps focus and returns it to the trigger on close.
- Skip link to `#main` content.

## Contrast (WCAG AA)

- Body text ≥ 4.5:1, large text ≥ 3:1, UI borders ≥ 3:1 against their background.
- Never signal state with color alone — add icon, text, or underline.

## Forms

- Real `<label for>` on every input (no placeholder-as-label).
- Error text tied with `aria-describedby`, placed near the field, says how to fix.
- Required fields marked in text, not just a red asterisk.

## Simplifying for laypeople

- Prefer concrete nouns over abstractions: "گزارش فروش روزانه" over "ETL pipeline".
- Explain terms inline in parentheses on first use.
- Multi-step or branching choices: one question per step, always a visible way back.
- Show what happens after clicking: WhatsApp connection is understandable; "API" is not.
- Feedback for every action: toast, inline success, or state change within 100ms.

## Touch & responsive

- Targets ≥ 44×44px with ≥ 8px separation.
- Body text ≥ 16px on mobile (prevents iOS zoom on focus).
- No hover-only content; all hover info also available on tap/focus.
- Test at 375px, 768px and 1280px widths.
