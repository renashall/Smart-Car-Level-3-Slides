---
name: slide-deck-design
description: Design or revise rendered Smart Car lesson slides from Markdown plans in design-system/content/slide-plans/. Use for HTML lesson decks following the repository design system.
---

```toml
id = "f6f438ef851dc6f258a779083d0984df"
```

# Lesson Slide Design

Use this skill when creating, revising, or reviewing lesson slides in the
`Smart-Car-Level-3-Slides` repository.

## Inputs

- Use the matching lesson plan in `design-system/content/slide-plans/*.md` as the primary
  source for slide content, slide order, visuals, code excerpts, and coach
  notes. Use `design-system/content/slide-plans/Course-Outline.md` only for course-wide
  context.
- Read `design-system/content/Organization.md` and `design-system/content/Info.md` for
  course links, coach/admin notes, common issues, and setup details that should
  appear in slides or hidden notes.
- Use `design-system/assets/` for images, icons, screenshots, and fonts. Read
  `design-system/assets/ASSET-INFO.md` first for the file-by-file catalog;
  `design-system/assets/ASSETS.md` explains selection and placement.
- Read `../Code/` only for context, code examples, and filename verification.

## Required Design Framework

- Always use `design-system/` as the slide design framework. Do not invent a
  separate slide style or copy older lesson slides as the visual source of truth.
- Before designing rendered slides, read `design-system/DESIGN.md` for the
  overview, then the relevant `docs/CONTENT.md`, `guidelines/LAYOUT.md`,
  `docs/STRUCTURE.md`, `tokens/COLORS.md`, `assets/fonts/FONTS.md`,
  `assets/icons/ICONS.md`, `docs/EXPORT.md`, and `assets/ASSETS.md` guides,
  all under `design-system/`.
- Build real lesson slides from `design-system/templates/lesson-deck/` when
  possible. Use `design-system/slides/` as slide-type examples and
  `design-system/styles.css` or its token files for the actual visual system.
- Keep lesson slides on the design-system canvas: 1280x720, 16:9, real editable text,
  Rubik for display/body text, JetBrains Mono for code, navy/teal/amber brand
  colors, rounded cards, soft navy-tinted shadows, and sentence-case
  instructional copy.
- **Stay inside the slide safe area — never crowd the footer.** All content lives
  in `.slide__body` (inset 122px top / 96px bottom / 80px sides). Keep a clear gap
  (~24px+) between the lowest element and the footer hairline. The usual offender
  is a full-width note / callout bar sitting under a tall image panel or card
  grid: the stack overflows and the bar collides with the footer. Fix it by
  capping the image-panel height (so the panel and bar move up) and/or splitting
  the content across two slides — don't let anything touch the footer band.
  Always confirm by rendering the slide to an image, not by eyeballing the markup.
- **Image contrast on dark backgrounds.** When an icon or image sits on a navy /
  blue background, use its lighter or white variant — `-light` (e.g.
  `success-light.png`, `python-light.png`) or `-white` for black icons (e.g.
  `settings-wheel-white.png`). Plain black / `-black` icons are for light
  surfaces only — they vanish on navy. Full-color icons that already contrast
  well on navy (e.g. `raspberry-pi`, the amber `warning`) may stay as-is. Use the
  topic-appropriate icon too: `pdf-icon` for PDF file links/elements, `python`
  for Python / venv content.
- **Material "set" compilation images** (`assets/materials/**/*-set.png`) pack
  many labelled parts into one sheet, so they are illegible when shrunk into a
  small tile. Show them large (let the image fill the card width/height within
  the slide's safe area), and drop the set image entirely when the slide — or a
  following slide — already breaks the group out into individual part cards.
- Follow the slide title/footer convention: on the **title slide** the big title
  is the course name and the eyebrow above it is the lesson (`Lesson <n> —
  <name>`). Every slide's footer-left shows the course name and level separated
  by a dash (`course name — Level <n>`); the footer-right shows the lesson
  number on content slides, or the site (`aicodeacademy.com`) on the title slide.
- Preserve the design-system export rules for PPTX: avoid heavy filters,
  backdrop blur, clip paths, text baked into images, and text over gradients;
  include full URLs in hidden speaker/link notes when a slide displays a link.

## Boundaries

- Write only inside `Smart-Car-Level-3-Slides/`.
- Do not edit parent-repo files, including `../Code/`, unless the user makes a
  separate explicit request.
- Do not rename or alter `design-system/assets/fonts/Rubik/`.

## Lesson-slides output location & naming

- Every lesson-slides deliverable lives together in one folder:
  `design-system/content/slide-decks/lesson-<n>-<name>/`. This includes the rendered HTML slides
  **and** any exported `.pdf`, `.pptx`, or slide-image files — they all sit
  alongside each other, never split across folders.
- Derive the folder `<n>` and `<name>` from the source lesson plan filename,
  preserving the full slug after `lesson-`. For example, the slides for
  `design-system/content/slide-plans/lesson-04-autonomous-modes.md` lives in
  `design-system/content/slide-decks/lesson-04-autonomous-modes/`.
- **File naming standard:** name every file in that folder `lesson-<n>.<ext>` —
  the HTML file is `lesson-<n>.html` (e.g. `lesson-10.html`), and exports are
  `lesson-<n>.pdf`, `lesson-<n>.pptx`, etc. The folder keeps the full slug; the
  files use the short `lesson-<n>` stem. Do not use `index.html`.
- Do not place slide deliverables in `design-system/content/slide-plans/`, `design-system/content/slides/`,
  the repository root, or a temporary folder.

## Workflow

1. Identify the lesson and read its `design-system/content/slide-plans/lesson-*.md` file.
2. Read `design-system/content/Organization.md` and `design-system/content/Info.md` for
   reusable links, setup notes, common issues, and coach obligations.
3. Read `design-system/DESIGN.md` and relevant
   `design-system/templates/`, `slides/`, `components/`, or `guidelines/` files
   as needed for the slide type.
4. Consult `design-system/assets/ASSET-INFO.md` (the asset catalog — what each asset
   looks like and when to use it), then skim `design-system/assets/` for available
   visuals before creating or requesting new ones.
5. If slides mention code, verify the exact path and behavior from `../Code/`
   without modifying parent-repo files.
6. Render the lesson plan into design-system slides with concise on-screen text,
   speaker-friendly notes, and short readable code excerpts.
7. Save the rendered HTML slides and any exports (`.pdf`, `.pptx`, images) together
   in `design-system/content/slide-decks/lesson-<n>-<name>/`, naming each file `lesson-<n>.<ext>`
   (e.g. `lesson-10.html`, `lesson-10.pdf`).
8. Save slide artifacts and any new supporting files inside this repo only.
9. Clean temporary files before finishing.

## Naming

- Use kebab-case for new non-font files and folders, such as
  `lesson-01-setup-outline.md`.
- Prefer `.png` with transparency for image assets.
