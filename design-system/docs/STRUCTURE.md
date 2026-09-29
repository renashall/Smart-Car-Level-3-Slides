# Design System Structure

Use this map when locating a source file, component, example, or deck deliverable. For design decisions, start with [DESIGN.md](../DESIGN.md) and follow its topic guides.

## Foundations

| Path | Purpose |
| --- | --- |
| [`styles.css`](../styles.css) | Shared CSS entry point for tokens and base styles. |
| `tokens/colors.css`, `typography.css`, `spacing.css`, `fonts.css`, `base.css` | Source values for palette, type, spacing, font loading, and element defaults. [COLORS.md](../tokens/COLORS.md) explains palette use. |
| [`guidelines/`](../guidelines/) | [LAYOUT.md](../guidelines/LAYOUT.md), visual specimen cards, and `coach-notes.md` for coach communication. |
| [`assets/`](../assets/) | Logos, icons, hardware images, screenshots, and Rubik files. See [asset usage](../assets/ASSETS.md), the [file catalog](../assets/ASSET-INFO.md), [FONTS.md](../assets/fonts/FONTS.md), and [ICONS.md](../assets/icons/ICONS.md). |
| [`docs/`](./) | This structure map, [CONTENT.md](CONTENT.md) for lesson voice, and [EXPORT.md](EXPORT.md) for deck output. |

## Reusable Components

The compiled component namespace is `window.DesignSystem_df7c10`. Browse the source and paired `.prompt.md` files in [`components/`](../components/).

| Folder | Components | Typical use |
| --- | --- | --- |
| `components/core/` | `Button`, `Badge`, `Card`, `Callout`, `CodeBlock` | Actions, labels, surfaces, teaching callouts, code. |
| `components/media/` | `MaterialCard`, `ImageFrame`, `ScreenshotCard`, `VideoCard` | Parts grids, large visuals, software steps, linked video. |
| `components/lists/` | `CheckList`, `StepList`, `NumberedList`, `IconList` | Recaps, procedures, goals, issues. |
| `components/blocks/` | `InfoCard`, `IconDescCard`, `TierList`, `MiniChecklist` | Recurring slide panels and coach reminders. |

## Slides And Lesson Decks

- [`slides/`](../slides/) contains numbered 1280×720 examples: title, goals, materials, code, content, common issues, recap, thanks, course thanks, and hidden coach slides. `slide-frame.css` defines their shared header, title area, and footer. These are examples, not lesson deliverables.
- [`templates/lesson-deck/`](../templates/lesson-deck/) is the static starting point for a real rendered deck. Its support files and speaker-notes structure travel with the template.
- `content/slide-plans/` holds the lesson plans and course outline. `content/slide-decks/lesson-<n>-<name>/` holds each lesson's `lesson-<n>.html` and any matching PDF, PPTX, or slide images.
- `content/Organization.md`, `Info.md`, and `Guide.md` contain course organization, reusable information, and working guidance used alongside the lesson plans.
- [`skills/`](../skills/) contains the lesson planning, editing, design, Markdown document PDF export, slide PDF export, and PPTX export workflows.

## Generated Files

`_ds_bundle.js`, `_ds_manifest.json`, and `_adherence.oxlintrc.json` are generated outputs; edit their source files instead. Read [EXPORT.md](EXPORT.md) for deliverable preparation and output rules.
