---
name: edit-lesson
description: Edit a Smart Car lesson plan Markdown file and sync its rendered HTML slide deck when present. Use for requested changes to design-system/content/slide-plans/lesson-*.md.
---

```toml
id = "5a25ce8873430d7f3b2a260af3e90058"
```

# Edit Lesson

Use this skill to keep a lesson's source plan and rendered deck aligned. The
lesson plan is the source of truth; update it first, then update the matching
deck only if it already exists.

## Inputs

- Prefer an explicit `design-system/content/slide-plans/lesson-*.md` path from the user.
- If the user says a lesson number or name, match it to
  `design-system/content/slide-plans/lesson-*.md`.
- If the user refers to the open/current lesson, inspect the working context and
  nearby files before choosing a target.
- Do not edit `design-system/content/slide-plans/Course-Outline.md` unless the user names it
  directly.

## Workflow

1. Identify the target lesson plan in `design-system/content/slide-plans/`.
2. Read the lesson plan, `design-system/content/Organization.md`, and
   `design-system/content/Info.md` for context.
3. Make the requested edits to the lesson plan first. Preserve the lesson's
   existing structure unless the user asks for a larger rewrite.
4. Derive the rendered deck location from the plan filename:
   - Plan: `design-system/content/slide-plans/lesson-NN-topic.md`
   - Deck folder: `design-system/content/slide-decks/lesson-NN-topic/`
   - HTML deck: `design-system/content/slide-decks/lesson-NN-topic/lesson-NN.html`
5. If the matching HTML deck exists, use the `slide-deck-design` skill and update
   that deck so it reflects the revised plan.
6. If no matching deck exists, stop after the lesson plan edit and mention that
   no rendered deck was present.
7. Keep all writes inside `Smart-Car-Level-3-Slides/`.

## Deck Sync Rules

- Treat the edited plan as the source for slide order, titles, on-screen copy,
  visuals, code excerpts, and coach notes.
- Preserve the deck's design-system structure and naming. Do not move or rename
  deck artifacts.
- Update only the relevant lesson deck; do not rebuild unrelated lessons.
- If the plan edit changes code references, verify paths against the nearby
  Smart Car code repo before changing deck code snippets.

## Verification

- Confirm the lesson plan contains the requested change.
- If a deck was updated, confirm the deck reflects the same change and still
  follows `slide-deck-design` output conventions.
- Report whether the deck was updated or skipped because it did not exist.
