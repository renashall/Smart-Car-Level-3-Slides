---
name: export-deck-pptx-screenshot
description: Export a rendered Smart Car HTML slide deck to a 16:9 screenshot PPTX with speaker notes and clickable links. Use when asked for a PowerPoint deck with exact visual fidelity.
---

```toml
id = "ae662765e4bb92c3ed1cfff9e9bca107"
```

# Export deck → PPTX (screenshot)

Build a PowerPoint where every slide is a full-bleed render of the HTML slide —
visuals are exact, with speaker notes and clickable links carried over.

## When to use

- The user asks to export, save, or "make a PowerPoint / .pptx" of a slide deck.
- Visual fidelity matters more than editing individual text boxes.

## How it works

1. Renders the deck to a clean PDF — reusing a sibling `lesson-<n>.pdf` if the
   `export-deck-pdf` skill already made one, otherwise a throwaway PDF.
2. Rasterizes each PDF page at 2x to a full-bleed image and places it on a
   13.333x7.5in (16:9) slide.
3. Attaches the deck's hidden `<script id="speaker-notes">` entries as PowerPoint
   notes (one per slide).
4. Adds a transparent, clickable hyperlink hotspot over each `<a href>`,
   positioned from the PDF's own link rect (PDF points map 1:1 to slide points),
   so the links work in PowerPoint too.

## Steps

1. Ensure the deps are in the active virtualenv:
   ```
   python -c "import pptx, fitz"
   ```
   If either package is missing, use the project Python environment workflow
   before installing dependencies into that environment.
2. Run the bundled script with the deck HTML path:
   ```
   python <this-skill-folder>/scripts/build_pptx.py <path/to/lesson-<n>.html>
   ```
   It writes `lesson-<n>.pptx` next to the HTML (pass a second arg to override).
3. Keep it in the deck folder `design-system/content/slide-decks/lesson-<n>-<name>/` as
   `lesson-<n>.pptx` (see the `slide-deck-design` skill).

## Notes / trade-offs

- Slide text is a rendered **image**, not editable text boxes — this is the
  fidelity-vs-editability trade-off. Links and speaker notes are still preserved.
- A fully editable-text PPTX would need a different HTML→shapes exporter; this
  skill deliberately prioritizes exact visuals.
- The PDF step needs a Chromium-based browser (see `export-deck-pdf`); set the
  `DECK_BROWSER` env var to override auto-detection. Run `export-deck-pdf` first
  if you also want the standalone PDF kept beside the deck (it will be reused).
