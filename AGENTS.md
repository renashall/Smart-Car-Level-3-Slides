# Agent Guide - Smart-Car-Level-3-Slides

## Repository Purpose

This repository contains Smart Car course lesson plans and rendered slide decks. It is the slide companion to the `smartcar2026` code repository.

Keep slide work self-contained here. The companion repository may be read for code examples and source verification, but do not write, rename, delete, or format files outside this repository unless the user explicitly asks for that separate work.

When reading the companion repository, use `../Code/` if it is nested here or `../smartcar2026/Code/` if it is checked out alongside this repository. Verify referenced code paths and filenames before using them in a deck.

## Start Here And Follow The Lesson Workflow

- At the start of any change, read `design-system/DESIGN.md`, then follow the linked guide that matches the work. Treat those guides as the source of truth for detailed design, content, asset, layout, and export rules.
- Work through the lesson sequence: ingest source content, plan and outline the slides, render the deck, then export the requested deliverables.
- Keep lesson plans in `design-system/content/slide-plans/` and rendered decks in `design-system/content/slide-decks/`.
- Use the canonical skills in `design-system/skills/` (also linked from `.agents/skills/` and `.claude/skills/`): `slide-lesson-planner` for planning, `edit-lesson` for revising a lesson plan and its matching deck, `slide-deck-design` for rendering or designing slides, `export-deck-pdf` for PDF export, and `export-deck-pptx-screenshot` for PowerPoint export.

When the user supplies Markdown lesson content, place it in the appropriate `design-system/content/` location and incorporate it into the lesson plan and deck. Place uploaded images in the appropriate category under `design-system/assets/`, document them in the relevant asset guide or catalog, and incorporate relevant images into the affected lesson plan and deck.

## Deliverables

- Keep every deck on the design system's 1280x720, 16:9 canvas.
- Save each deck's HTML, PDF, PPTX, and related images together in `design-system/content/slide-decks/lesson-<n>-<name>/`, using `lesson-<n>.<ext>` names such as `lesson-10.html`, `lesson-10.pdf`, and `lesson-10.pptx`.
- Use the PDF workflow for one slide per page with selectable text and clickable links.
- Use the screenshot PPTX workflow when requested; it preserves speaker notes and clickable link hotspots.
- Read `design-system/docs/EXPORT.md` for the authoritative export behavior, then render and inspect the deck and remove temporary capture files.

## Assets And Security

- Reuse assets from `design-system/assets/` where suitable. Keep new non-font asset names in kebab-case and do not rename or restyle supplied font files.
- Do not store secrets, API keys, credentials, private tokens, or similar sensitive data in this repository. Keep temporary work in the local ignored temp directory and remove it after use.

## Git And Repository Boundary

- Do not stage, commit, add remotes, push, or publish without explicit authorization. When a commit is authorized, use `development` when available, otherwise `main`; update `main` only through the repository's Push To Main task or script after committed development work is ready.
- Preserve unrelated work in the working tree and make only the requested scoped changes.
