# smartcar2026-slides

Slide decks for **Machine Learning with Raspberry Pi & Smart Car (Level 3)**, an
AI Code Academy course. This repository holds the lesson plans, the rendered
decks, and the design system used to build them.

It is a companion to the parent [`smartcar2026`](../) repository, which contains
the actual smart-car and course code referenced throughout the slides.

## What's here

Each lesson moves from raw notes → a written plan → a rendered HTML deck →
exported PDF/PPTX deliverables:

```
content/
  slide-plans/      Lesson plans (markdown) + course-outline.md
  slide-decks/      Rendered decks, one folder per lesson
    lesson-01-components/
      lesson-01.html   Rendered 1280×720 deck
      lesson-01.pdf    Exported PDF (gitignored)
      lesson-01.pptx   Exported PowerPoint (gitignored)
  old-slide-decks/  Previous PPTX decks + slide PNGs, kept for reference
Design System/      AI Code Academy visual framework (tokens, components, assets)
```

The course covers 12 lessons (00–11): setup, components, server/client commands,
ADC & multithreading, autonomous modes, line following, camera streaming, face
tracking, multiple-face detection, the final-project workshop and presentation,
and a bonus PyQt5 camera GUI. See
[content/slide-plans/course-outline.md](content/slide-plans/course-outline.md)
for the full lesson map.

## Design System

`Design System/` is the required visual framework for every deck — do not style
slides by eye. Read [`Design System/readme.md`](Design%20System/readme.md) and
[`Design System/SKILL.md`](Design%20System/SKILL.md) before building.

- **Canvas:** 1280×720, 16:9.
- **Brand:** Rubik (display/body), JetBrains Mono (code), navy `#224289`, teal
  `#61cbc8`, amber `#fcb600`; rounded cards, flat fills, soft navy-tinted shadows.
- Reuse components, tokens (`Design System/styles.css`), and the assets in
  `Design System/assets/` before creating anything new.

## Setup

```bash
python -m venv .venv          # or: uv venv
.venv\Scripts\activate        # Windows (PowerShell: .venv\Scripts\Activate.ps1)
uv pip install -r requirements.txt
python -m playwright install chromium
```

The toolchain authors HTML slides, screenshots each slide with a headless
browser, and packs the images into PDF/PPTX. See
[requirements.txt](requirements.txt) for the full dependency list.

## Building & exporting a deck

Work is driven through the local Claude skills in `.claude/skills/` (mirrored
under `Design System/skills/`):

| Skill | Use |
| --- | --- |
| `slide-lesson-planner` | Draft a lesson plan in `content/slide-plans/`. |
| `slide-deck-design` | Render a deck from a plan using the Design System. |
| `edit-lesson` | Revise a plan and keep its rendered deck in sync. |
| `export-deck-pdf` | Export an `.html` deck to a clean 16:9 PDF. |
| `export-deck-pptx-screenshot` | Export an `.html` deck to a screenshot PPTX. |

Direct export commands:

```bash
python .claude/skills/export-deck-pdf/export_pdf.py content/slide-decks/lesson-01-components/lesson-01.html
python .claude/skills/export-deck-pptx-screenshot/build_pptx.py content/slide-decks/lesson-01-components/lesson-01.html
```

Save every deliverable together in
`content/slide-decks/lesson-<n>-<name>/`, named `lesson-<n>.<ext>`.

## Conventions

- Keep all slide work inside this repository; the parent `smartcar2026` repo is
  read-only reference (its `../Code/` folder is the source for code excerpts).
- Plans live in `content/slide-plans/`; rendered decks live in
  `content/slide-decks/`.
- Exported `.pdf` and `.pptx` files under `content/` are gitignored — only the
  `.html` source and the plans are tracked.
- Turn content into clear instructional slides, not text dumps. Keep code
  excerpts short and verified against the real files in `../Code/`.
