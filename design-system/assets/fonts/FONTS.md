# Fonts And Copy

Use [`tokens/typography.css`](../../tokens/typography.css) for the scale and roles, [`tokens/fonts.css`](../../tokens/fonts.css) for font loading, and [`styles.css`](../../styles.css) as the shared entry point.

## Families And Weights

- **Rubik** is the display, heading, body, and UI font. Its variable upright and italic files are bundled in [`Rubik/`](Rubik/); use them as supplied. Static weights are available for exporters that need individual files.
- **JetBrains Mono** is for code, commands, file paths, values, and terminal content. It currently loads from Google Fonts; no local mono file is bundled.
- Display and headings use Rubik 700–800 with tight tracking (`-0.02em`). Body text uses 400–500 with line height 1.5–1.65. Controls and labels commonly use 600.
- Use bold to establish hierarchy or highlight a short key phrase. Use italics sparingly for a named title or a brief spoken emphasis; do not italicize steps, code, file paths, or long passages. Use code styling for literals and commands.

## Size And Role

| Role | Token | Size |
| --- | --- | --- |
| Hero / large slide title | `--text-5xl` | 88px |
| Display | `--text-4xl` | 64px |
| H1 | `--text-3xl` | 48px |
| H2 | `--text-2xl` | 36px |
| H3 | `--text-xl` | 28px |
| Subhead | `--text-lg` | 22px |
| Lead body | `--text-md` | 18px |
| Body | `--text-base` | 16px |
| Secondary UI | `--text-sm` | 14px |
| Caption / eyebrow | `--text-xs` | 12px |

The slide frame has its own applied sizes in [`slides/slide-frame.css`](../../slides/slide-frame.css): a regular slide title is 42px, eyebrow 16px, description 18px, and footer 15px. Use those frame styles for rendered slides rather than forcing the generic type scale onto them. Keep code excerpts short enough to remain readable without wrapping or clipping.

## Titles And Casing

- Use **sentence case** for headings, slide titles, buttons, captions, and labels. Reserve uppercase for small eyebrows or kickers with wide letter spacing.
- On a title slide, the large title is the course name and the eyebrow names the lesson: `Lesson <n> — <name>`. On regular slides, make the title a short learner-facing idea or action.
- Write `Lesson 04` when displaying a numbered lesson. Keep names and terminology consistent: “lesson,” “the car,” and “the Pi.”
- Use direct second-person instructions, short active sentences, and plain language. Use numbered steps for procedures. No emoji in body copy.

When exporting editable text, keep Rubik and JetBrains Mono available to the exporter; see [Export](../../docs/EXPORT.md).
