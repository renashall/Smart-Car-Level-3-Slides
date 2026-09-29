# Machine Learning with Raspberry Pi & Smart Car (Level 3) - Slides

Slide decks for **Machine Learning with Raspberry Pi & Smart Car (Level 3)**, an
AI Code Academy course. This repository holds the lesson plans, the rendered
decks, and the design system used to build them.

The companion [`smartcar2026`](https://github.com/renashall/smartcar2026)
repository contains the course code referenced in the slides.

## Repository Layout

Each lesson moves from source notes to a Markdown slide plan, an HTML deck,
and PDF/PPTX exports:

```
design-system/
  DESIGN.md        Design overview and guide navigation
  docs/            Content, structure, and export guides
  guidelines/      Layout guide and visual examples
  tokens/          Color guide and CSS tokens
  assets/          Course images, fonts, icons, and asset guides
  skills/          Canonical agent skills and export scripts
  export.py        Entry point for course-wide exports
  content/
    slide-plans/    Lesson plans and Course-Outline.md
    slide-decks/    Rendered decks, one folder per lesson
      lesson-01-components/
        lesson-01.html   Rendered 1280×720 deck
        lesson-01.pdf    Exported PDF (gitignored)
        lesson-01.pptx   Exported PowerPoint (gitignored)
```

The course has 12 lessons (00–11). See the
[Course Outline](design-system/content/slide-plans/Course-Outline.md) for the
lesson map.

## Setup

Create and activate a project virtual environment, then install the packages
in [requirements.txt](requirements.txt):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

On macOS or Linux, activate with `source .venv/bin/activate` instead. PDF
export also needs Edge or Chrome; set `DECK_BROWSER` to its executable path if
the exporter cannot find it. Run the commands below from the repository root
with the virtual environment active.

## Building & Exporting

To export the course for sharing, run the quick mode in a terminal:

```bash
python design-system/export.py --quick
```

This creates PDFs of `Guide.md`, `Info.md`, `Organization.md`, and
`Course-Outline.md` in the newly created `Exports/` folder. It also creates
`Exports/Lessons/Lesson 0/` through `Lesson 11/`; each lesson folder contains
the lesson-plan PDF, deck PDF, and deck PPTX. `--quick` is the default mode.

Other course export commands:

| Command | Result |
| --- | --- |
| `python design-system/export.py --full` | The quick bundle plus matching Markdown source files. |
| `python design-system/export.py --zip` | The full bundle plus `Exports/Smart-Car-Level-3-Slides.zip`. |
| `python design-system/export.py --pdf_pptx` | Four course document PDFs at the root of `Exports/`, plus 12 deck PDFs in `Exports/PDF/` and 12 deck PPTXs in `Exports/PPTX/`. |

To export one file, use the relevant script directly:

| Command | Result |
| --- | --- |
| `python design-system/skills/export-markdown-pdf/scripts/export_markdown_pdf.py design-system/content/Guide.md` | A themed PDF beside the Markdown document. |
| `python design-system/skills/export-deck-pdf/scripts/export_pdf.py design-system/content/slide-decks/lesson-01-components/lesson-01.html` | A selectable-text PDF beside the HTML deck. |
| `python design-system/skills/export-deck-pptx-screenshot/scripts/build_pptx.py design-system/content/slide-decks/lesson-01-components/lesson-01.html` | A screenshot PPTX beside the HTML deck, with notes and links. |

Keep each lesson's HTML, PDF, and PPTX together under
`design-system/content/slide-decks/lesson-<n>-<name>/` using `lesson-<n>.<ext>`
filenames. See the [export guide](design-system/docs/EXPORT.md) for format details.

## Agent Usage & Skills

Start with [AGENTS.md](AGENTS.md) and the [Design System](design-system/DESIGN.md)
when editing lessons or decks. The canonical skills live in
`design-system/skills/`. Both `.agents/skills/` and `.claude/skills/` are links
to that directory, so Codex and Claude use the same skill files.

| Skill | Use |
| --- | --- |
| [`slide-lesson-planner`](design-system/skills/slide-lesson-planner/SKILL.md) | Draft a lesson plan from source material. |
| [`edit-lesson`](design-system/skills/edit-lesson/SKILL.md) | Revise a plan and update its rendered deck. |
| [`slide-deck-design`](design-system/skills/slide-deck-design/SKILL.md) | Design or revise an HTML lesson deck. |
| [`export-all`](design-system/skills/export-all/SKILL.md) | Build the full course bundle or document PDFs with separate deck PDF/PPTX folders. |
| [`export-markdown-pdf`](design-system/skills/export-markdown-pdf/SKILL.md) | Export one Markdown document as a themed PDF. |
| [`export-deck-pdf`](design-system/skills/export-deck-pdf/SKILL.md) | Export one HTML deck as a PDF with selectable text and links. |
| [`export-deck-pptx-screenshot`](design-system/skills/export-deck-pptx-screenshot/SKILL.md) | Export one HTML deck as a PPTX with speaker notes and links. |

Use the companion `smartcar2026` repository as a read-only source for verified
code examples. Keep slide changes in this repository.

## Design System

Read [design-system/DESIGN.md](design-system/DESIGN.md) before changing slides.
It links to the layout, content, color, font, asset, and export guides. Decks
use a 1280×720, 16:9 canvas with Rubik for text and JetBrains Mono for code.
Reuse the existing styles and assets in `design-system/`.
