---
name: slide-lesson-planner
description: Plan a Smart Car lesson as a Markdown slide outline in design-system/content/slide-plans/. Use when creating or revising lesson plans with a slide arc, code excerpts, and coach notes.
---

```toml
id = "4c6654cc88688afd12dc072d80e7eefd"
```

# Slide Lesson Planner

Use this skill to turn one course lesson into a **content/layout outline deck** —
a single Markdown file that lays out every slide's text, visuals, code, and
coach notes. These are planning docs, not rendered slides. This skill builds on
`slide-deck-design`; follow that skill's repo boundaries (write only inside
`Smart-Car-Level-3-Slides/`, read `../Code/` for reference only, never alter
`design-system/assets/fonts/Rubik/`).

## Output location & naming

- One file per lesson in `design-system/content/slide-plans/`.
- Kebab-case filename: `lesson-<NN>-<topic>.md` (e.g. `lesson-01-components.md`,
  `lesson-02-server-client-commands.md`). Use `lesson-00-setup.md` for setup.
- Each `---` horizontal rule separates one slide from the next.

## Header block (top of every file)

Place this before the first slide:

```
# Lesson N — <Name>

**Organization:** AI Code Academy · aicodeacademy.com
**Course:** Machine Learning with Raspberry Pi & Smart Car (Level 3)
**Lesson:** N — <Name>
**Source file:** ../Code/User/<lesson_file>.py   (omit if the lesson has no code)
**Runs on:** Raspberry Pi (the car) · <add "run with `sudo`" if it lights LEDs>

> Layout/outline doc. Each `---` block below = one slide. Code blocks are copied
> from the real lesson file and grow chunk-by-chunk until the whole script exists.

---
```

## Per-slide block format

Each slide is `## Slide N — <Title>` followed by only the labeled subsections it
needs, then a `---` divider:

```
## Slide N — <Title In Title Case>

**On screen**
- short bullet / line
- short bullet

**Visual:** design-system/assets/<path>.png   (or `[ASSET NEEDED: description]`)

**Code (builds file · chunk X/Y):**
    <verbatim excerpt from the lesson .py>

**Coach note:** one short presenter line (timing / what to point at / a pitfall)
```

Concept slides usually have no code; code slides may have no extra visual. Keep
bullets short and code excerpts slide-sized.

## Slide titles: Title Case

**Every slide title uses Title Case** — "Upper Case Like This". Capitalize the
principal words; keep short articles/conjunctions/prepositions lowercase unless
first (`a`, `the`, `of`, `to`, `and`, `&`). Examples: `Our Goals`,
`Try It Yourself`, `Recap & What's Next`, `The Pi Is Case-Sensitive`.

## The fixed slide arc

Every lesson follows this order. The **standard slides below are required in
every deck** (use these exact titles); insert the lesson-specific concept and
code-building slides in the middle.

1. **Title** — lesson name, course, org + logo. *(required, always first)*
2. **Introduction** — where we are in the course / recap of the previous lesson.
   *(required)*
3. **Our Goals** — what the student will build or learn today, in plain terms.
   *(required)*
4. **Concept slides** — *(lesson-specific)* the ideas needed before coding
   (hardware, vocabulary, the mental model). For Lesson 1 only, include
   `car_setup.py` and the Pi case-sensitivity warning here.
5. **Code-building slides** — *(lesson-specific, code lessons only)* assemble the
   real `.py` chunk by chunk (see rule below), then a `We Built The Whole File`
   recap slide closing the section.
6. **Run It** — the exact command + expected output. *(code lessons)*
7. **Try It Yourself** — small edits + a stretch challenge. *(required)*
8. **Troubleshooting** — the most likely errors and fixes. *(required)*
9. **Recap & What's Next** — what they learned + a teaser for the next lesson.
   *(required)*
10. **Coach Notes** — hidden section, always last. *(required)*

Non-code lessons adapt the arc:
- **Setup** keeps the required slides and replaces the code-building/Run It block
  with task or activity slides.
- **Final Project Workshop / Presentation** are intentionally short: keep
  **Title**, **Introduction**, and **Coach Notes**, add one or two
  activity/guideline slides in the middle, and close with a **Conclusion** slide
  (in place of Run It / Try It Yourself / Troubleshooting / Recap & What's Next).

## Code-chunk rule (code lessons)

- Code excerpts are copied **verbatim** from the real file in `../Code/User/`
  (lightly trim long docstrings to fit a slide; never change logic).
- Chunks follow the file's true order: docstring + imports → constants →
  variable placeholders → `setup()` → each function → `__main__` block. Label
  them `chunk X/Y` so the running total visibly assembles into the full script.
- Close the code section with a `We Built The Whole File` slide.
- The recurring lesson skeleton is `setup()` → work functions → `destroy()`,
  wrapped in a `try / except KeyboardInterrupt / finally: destroy()` main block.
  Reinforce this shape every lesson.

## Asset rule

- Prefer assets already in `design-system/assets/`; consult
  `design-system/assets/ASSET-INFO.md` (catalog of what each asset looks like and when
  to use it), and reference them by repo-relative path.
- Verify each referenced path exists before finalizing.
- Where no suitable asset exists, write an inline `[ASSET NEEDED: description]`
  flag — do not invent or create images. Collect all flags in the deck's coach
  notes under "Assets to source".

## Coach notes rule

- A short **`**Coach note:**`** line on each slide (timing, what to point at, a
  pitfall, or a demo cue).
- A dedicated **hidden** section at the end of every deck:

```
<!-- HIDDEN — COACH NOTES (do not show to students) -->

## Coach Notes (hidden)

**Timing (~45–50 min):** ...
**Before class** ...
**Safety** ... (include when motors/LEDs/power are involved)
**Most common failures** (ranked) ...
**Teaching tips** ...
**Assets to source (flagged in deck)** ...
```

## Audience & tone

- Teens/older (~14–18), beginner programmers. Clear, encouraging, concrete.
- Explain new vocabulary once, in plain language; avoid deep theory.
- Use real-world analogies (e.g. client/server = customer/kitchen).

## Workflow

1. Read the lesson's source in `../Code/User/` (and any notes in `design-system/content/`).
2. Map the file into code chunks in true file order.
3. Draft slides following the fixed arc; keep the required slides and titles.
4. Pull visuals from `design-system/assets/`; flag anything missing as `[ASSET NEEDED: …]`.
5. Write per-slide coach notes + the hidden Coach Notes section.
6. Title-case every slide title.
7. Verify: required slides present; code excerpts match the source; every
   `design-system/assets/...` path exists; each `[ASSET NEEDED]` is genuinely missing; no files
   outside `Smart-Car-Level-3-Slides/` were touched.
