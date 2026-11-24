---
name: web-portfolio-showcase
description: Design portfolio and demo-project sections with filters, cards, case-study details and honest demo labeling. Use when building a portfolio grid, project detail modal, case study content, or showcase of demo work.
---

# Portfolio & Demo Showcase

## Grid

- 2 columns tablet, 3 columns desktop (or 2 for large visuals). 1 column mobile.
- Card = visual (16:10 or 4:3) + category chip + title + one-line outcome + "مشاهده دمو".
- Keep the visual real and relevant: a composed UI mockup beats a stock photo.
- Consistent image treatment: same radius, same border, same aspect ratio.

## Card content hierarchy

1. Visual (carries most of the persuasion)
2. Project name (h3)
3. Business type — small muted chip
4. One line: the result ("کاهش ۴۰٪ زمان پاسخ‌گویی" — in a demo, mark it as illustrative)
5. CTA

## Filters

- 4–6 categories max, shown as pill chips with an "همه" default.
- Filter by business type AND solution type if the list grows.
- Active chip clearly distinct; announce counts for screen readers.
- Empty state message, never a blank grid.

## Case study detail (modal or page)

Structure that sells without jargon:
- **مسئله** — what hurt before, in the owner's words.
- **راهکار** — what was built, in one paragraph + 3–4 bullets.
- **قبل / بعد** — two or three metrics.
- **مزیت** — what the owner gains (time, clarity, revenue).
- **نکته** — explicit note that this is a demo project.

Keep the modal scrollable with a sticky header (title + close). Max width 720px.

## Honesty

- Label demo work everywhere: a badge on the card, a note in the modal, a line in the footer.
- Use realistic but clearly fictional business names and illustrative numbers.
- Never imply a real client relationship that does not exist.

## Visual QA

- All cards equal height (use flex column, push CTA to the bottom with `margin-top:auto`).
- Text truncation: title max 2 lines, description max 2 lines with `-webkit-line-clamp`.
- Verify keyboard: each card's CTA and the whole card are reachable and operable.
