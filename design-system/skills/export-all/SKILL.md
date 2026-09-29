---
name: export-all
description: Export the Smart Car course bundle or four course document PDFs plus 12 lesson PDFs and PPTXs. Use when asked to regenerate Exports or separate deck PDF and PPTX folders.
---

```toml
id = "5f71ed329df3bfcbfce184ffbc22ffbd"
```

# Export all course deliverables

Read [EXPORT.md](../../docs/EXPORT.md) for the deck export contract. The bundled
script calls the existing Markdown, deck PDF, and screenshot PPTX exporters and
publishes the shareable bundle in the repository's ignored `Exports/` folder.

Run from the repository root with the active project Python environment:

```text
python design-system/export.py --quick
python design-system/export.py --full
python design-system/export.py --zip
python design-system/export.py --pdf_pptx
```

The wrapper above calls this skill's `scripts/export_all.py`; running that file
directly accepts the same options. `--quick` is the default and writes PDFs and
PPTXs. `--full` also copies the matching Markdown sources. `--zip` includes the
full bundle and a repository-named ZIP archive.
`--pdf_pptx` writes the PDFs of `Guide.md`, `Info.md`, `Organization.md`, and
`Course-Outline.md` at the root of `Exports/`. It also writes the 12 lesson deck
PDFs to `Exports/PDF/` and the 12 matching PPTXs to `Exports/PPTX/`. It requires
lessons 00–11 and leaves existing `Lessons/` bundles and ZIP files alone. If either target
folder contains unexpected files, the script stops before publishing instead
of removing them.

Before running, check the course document sources, lesson plans, matching HTML
decks, and needed exporter helpers.
Use the project's Python environment workflow if required packages are
unavailable. Afterward, inspect the expected
files under `Exports/`, including `Course-Outline.pdf` and each lesson's plan PDF,
deck PDF, and PPTX. For `--pdf_pptx`, check the four root document PDFs, then
check that `PDF/` has exactly 12 PDFs and `PPTX/` has exactly 12 PPTXs, with no
other contents in those folders. For a single document or deck, use its
dedicated exporter.
