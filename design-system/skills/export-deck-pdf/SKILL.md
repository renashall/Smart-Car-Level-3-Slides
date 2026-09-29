---
name: export-deck-pdf
description: Export a rendered Smart Car HTML slide deck to a 16:9 PDF with selectable text and clickable links. Use when asked for a PDF deck deliverable.
---

```toml
id = "25e2ce37be41a1153c65c2ebc20c8880"
```

# Export deck → PDF

Turn a rendered HTML slide deck into a print-clean, 16:9 PDF.

## When to use

- The user asks to export, save, or "make a PDF" of a slide deck or `.html` deck.
- You just rendered a lesson deck and want a PDF deliverable beside it.

## How it works

The deck's own `@media print` block (a `1280x720` `@page` with `page-break-after`
on each `.slide`) makes Chromium emit exactly one 16:9 page per slide, with no
browser header/footer. Because it is a real print (not a screenshot), the PDF
keeps **selectable / searchable text** and every `<a href>` as a **clickable link
annotation**.

## Steps

1. Confirm the deck has the print CSS. Decks built from the Design System
   `lesson-deck` template already ship it; if a deck lacks it, add:
   ```css
   @page { size: 1280px 720px; margin: 0; }
   @media print {
     .deck { gap: 0; padding: 0; }
     .frame { border-radius: 0; box-shadow: none; }
     .slide { page-break-after: always; break-after: page; }
     .slide:last-child { page-break-after: auto; }
     *, *::before, *::after { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
   }
   ```
2. Run the bundled script with the deck HTML path:
   ```
   python <this-skill-folder>/scripts/export_pdf.py <path/to/lesson-<n>.html>
   ```
   It writes `lesson-<n>.pdf` next to the HTML (pass a second arg to override).
3. Keep the PDF in the deck folder `design-system/content/slide-decks/lesson-<n>-<name>/` using
   the `lesson-<n>.pdf` naming standard (see the `slide-deck-design` skill).

## Notes

- Needs a Chromium-based browser (Edge or Chrome). The script auto-detects common
  install paths; set the `DECK_BROWSER` env var to override. No Python packages
  required (standard library only).
- It uses a throwaway browser profile per run, so it never disturbs your normal
  browser session. It retries a cold launch automatically.
