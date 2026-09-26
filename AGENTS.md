# Claude Guide - Smart-Car-Level-3-Slides

This repository is for designing slide decks for the Smart Car course.
It is a companion to the `smartcar2026` code repository.

## Primary Role

- Design polished slide decks from source content, usually found in `content/`
  as plain text, markdown, outlines, notes, or similar files.
- Use `Design System/assets/` for reusable visual material: icons, product
  images, board images, screenshots, course visuals, and fonts.
- Keep slide work self-contained in this repository. Do not edit files outside
  `Smart-Car-Level-3-Slides/`.

## Repository Boundary

- This repo may be nested inside `smartcar2026` or checked out next to it.
- If nested, use `..` or `../Code/` for scripted reads. If checked out next to
  `smartcar2026`, use `../smartcar2026/` and its `Code/` folder.
- You may read the companion repo's files for context, especially its `Code/`
  folder, which contains the course and smart car code referenced by the slides.
- Never write, rename, delete, format, or otherwise modify files outside this
  repo unless the user explicitly asks for that separate code-repo work.
- If you need code examples for slides, read them from the nearby
  `smartcar2026` repo's `Code/` folder and adapt concise excerpts into slide
  content.

## Layout

- `content/` - source material for slide decks, typically plain text or notes.
- `Design System/` - AI Code Academy design system for deck visuals, tokens,
  components, slide examples, assets, and the static lesson-deck template.
- `.claude/skills/` - local Claude workflows for this slide-design repo.

## Design System

- Use `Design System/` as the default visual framework for new or revised slide
  decks. Read `Design System/SKILL.md` and `Design System/readme.md` before
  designing rendered slides.
- Build real decks from `Design System/templates/lesson-deck/` when possible;
  use `Design System/slides/` as slide-type examples, not as one-off styling to
  copy by eye.
- Link `Design System/styles.css` or reuse its token files for colors,
  typography, spacing, radius, shadows, and base slide styling. Keep decks on
  the 1280x720, 16:9 canvas defined by the system.
- Follow the AI Code Academy brand: Rubik for display/body text, JetBrains Mono
  for code, navy `#224289`, teal `#61cbc8`, amber `#fcb600`, soft navy-tinted
  shadows, rounded cards, flat fills, and sentence-case instructional copy.
- Prefer design-system components and patterns for core UI, callouts, code
  blocks, lists, material cards, screenshots, recap slides, thanks slides, and
  coach-only slides. Reuse `Design System/assets/` images before making new
  visuals.
- Preserve the design-system export rules for PPTX: keep text as real text,
  avoid export-hostile CSS such as heavy filters/backdrop blur/clip paths, pass
  Rubik and JetBrains Mono to exporters, and put full URLs in hidden
  speaker/link notes when a slide shows a link.

## Skills

Local Claude skills live in `.claude/skills/` and are mirrored under
`Design System/skills/` so they travel with the design system. Use them when the
matching task comes up:

- **`slide-deck-design`** — design or revise a rendered lesson deck from a
  `content/slide-plans/*.md` plan using the Design System. Reach for it whenever
  building or editing decks.
- **`export-deck-pdf`** — export a rendered `.html` deck to a clean 16:9 PDF (one
  slide per page, selectable text, clickable links). Use whenever the user asks
  for a PDF of a deck. Run
  `python .claude/skills/export-deck-pdf/export_pdf.py <deck.html>`.
- **`export-deck-pptx-screenshot`** — export a rendered `.html` deck to a 16:9
  `.pptx` of slide screenshots, with speaker notes and clickable link hotspots.
  Use whenever the user asks for a PowerPoint/`.pptx` of a deck. Run
  `python .claude/skills/export-deck-pptx-screenshot/build_pptx.py <deck.html>`.

Save every deck deliverable (`.html`, `.pdf`, `.pptx`, images) together in
`content/slide-decks/lesson-<n>-<name>/`, named `lesson-<n>.<ext>` (e.g.
`lesson-10.html`, `lesson-10.pdf`, `lesson-10.pptx`).

After you make any update to slide deck deliverables in this repo, commit and
sync the repo once the deck has been verified and temporary files have been
cleaned up.

## Asset Rules

- Prefer assets already in `Design System/assets/` before creating new visuals.
- Keep non-font asset names in kebab-case, such as `my-file-name.png`.
- Keep image assets as `.png` files with transparent backgrounds where useful.
- Do not rename or restyle the Rubik font files under
  `Design System/assets/fonts/Rubik/`.

## Slide Design Expectations

- Turn raw content into clear instructional decks, not text dumps.
- Structure lessons with a strong learning arc: context, objective, concept,
  demonstration, practice, troubleshooting, and recap when appropriate.
- Use visuals from `Design System/assets/` to make hardware, setup steps, and
  code workflows concrete.
- Keep code on slides short and readable. Prefer focused excerpts over full
  files.
- When a deck references repository code, verify the code path and filename
  against the nearby `smartcar2026` repo's `Code/` folder before finalizing.

## Safety

- Do not store secrets, API keys, credentials, or private tokens in this repo.
- Keep temporary files in a local ignored temp folder and remove them when done.
