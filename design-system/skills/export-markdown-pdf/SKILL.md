---
name: export-markdown-pdf
description: Export a Markdown .md document to a themed PDF beside it with the same basename. Use for Smart Car guides, notes, and other Markdown documents that need the AI Code Academy colors and Rubik typography.
---

```toml
id = "bb2a731d93a6ab6547b008c2a34e4b6d"
```

# Export Markdown PDF

Use this skill for document PDFs. For rendered HTML slide decks, use the existing `export-deck-pdf` skill instead.

## Workflow

1. Read the requested Markdown source and confirm its path. The source must be a `.md` file.
2. Check that the active project Python environment provides `markdown-it-py` and `PyMuPDF`, and that Edge or Chrome is available. Follow the project's Python environment workflow if dependencies need installation; do not install into global Python.
3. Run `python <this-skill-folder>/scripts/export_markdown_pdf.py <path/to/document.md>`. By default, this creates `<path/to/document.pdf>` in the same directory. Pass a second path only if the user requested a different destination. Set `DECK_BROWSER` to a Chromium browser executable when autodetection fails.
4. Inspect the PDF for complete pages, readable Rubik text, styled headings, tables, code, callouts, and working links that occur in the source. Remove temporary preview files after inspection.

The exporter reads the design system's color tokens and bundled Rubik fonts at runtime. It uses a US Letter document layout with navy headings, teal accents, restrained amber, and clear white surfaces. It keeps PDF text selectable and web links clickable. It escapes raw HTML from Markdown and does not load remote fonts or scripts.
