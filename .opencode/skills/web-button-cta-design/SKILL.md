---
name: web-button-cta-design
description: Design clear, usable buttons and call-to-action systems for websites including sizes, states, hierarchy, icons and WhatsApp/phone links. Use when styling buttons, building a CTA hierarchy, or fixing unclear or unclickable actions.
---

# Buttons & CTA Design

## Hierarchy (use no more than 3 levels per page)

| Level | Look | Use |
| --- | --- | --- |
| Primary | solid dark/accent fill | the one main action (WhatsApp / demo) |
| Secondary | outline, same radius | supporting action ("مشاهده خدمات") |
| Tertiary | text + arrow | inline / low-commitment links |

Never place two primary buttons side by side. Primary sits visually first (start side) in RTL.

## Sizing

- Height: 44px minimum (touch), 48–52px for hero CTAs.
- Horizontal padding: 22–28px.
- Radius: match the card radius (12–14px), pill only for chips.
- Icon: 18–20px, 8px gap, sits on the **right** of the label in RTL.
- Full-width (`100%`) on mobile under 560px, in a vertical stack with 12px gap.

## States (all required)

- default, hover (darken ~6%, lift 1–2px), active (scale .98), focus-visible (2px accent ring, 2px offset), disabled (40% opacity, no pointer).
- Loading: keep the label, show a small spinner, block double-submit.
- Never remove the focus ring; restyle it instead.

## Labels

- Verb + outcome: "درخواست مشاوره در واتساپ" rather than "ارسال" or "اینجا کلیک کنید".
- Persian labels stay short (2–5 words). No uppercase transform.
- Every CTA must do something real — open WhatsApp with a prefilled message, scroll to a section, or open a modal.

## WhatsApp CTA pattern

```js
const text = encodeURIComponent("سلام، برای ... نیاز به مشاوره دارم.");
const url = `https://wa.me/${PHONE}?text=${text}`;
```

- Open in a new tab: `target="_blank" rel="noopener noreferrer"`.
- Give each service its own prefilled message so the conversation starts informed.
- Show a WhatsApp glyph so non-technical users instantly recognize the action.

## Micro-copy under buttons

Add one reassurance line: "پاسخ در کمتر از یک روز کاری" or "بدون نیاز به دانش فنی".
This lifts clicks more than button styling does.
