# AI Code Academy — Design System

A unified design system for **AI Code Academy** teaching materials — slides,
lesson screens and course UI. Clean, modern and friendly, built to present
hands-on coding and robotics courses to students.

The flagship course represented here is **"Machine Learning with Raspberry Pi
Smart Car"**, which teaches Python, electronics and computer vision by building
a Freenove 4WD smart car.

---

## Sources

Everything in this system was derived from materials provided by the user. Store
these references even though the reader may not have access:

- **Course codebase** — `smartcar2026/` (mounted, read-only). A fork of the
  *Freenove 4WD Smart Car Kit for Raspberry Pi* with AI Code Academy course code
  under `Code/User/` (`lesson_1` … `lesson_11`, `USER.md`).
  - Brand color signal: `smartcar2026/Internal_Debug/restyle.py` (dark Qt theme,
    teal `#00c2a3`).
  - Control GUI source: `Code/User/lesson_11_camera_gui.py`.
- **Brand & course assets** — `assets/` (mounted, read-only): logos, course PNG
  icons, hardware/material photos, fonts (Rubik). Mirrored into this project's
  `assets/`.
- Upstream kit: Freenove (`http://www.freenove.com`) — the orange manufacturer
  brand; secondary to AI Code Academy.

No Figma file was provided. The slide visual language was designed fresh from the
brand logo + asset palette; flag if an official template exists.

---

## Brand at a glance

The logo is a friendly geometric **"Ai" mark** (rounded, single-stroke) in teal
on a navy disc, with an amber dot over the *i*. Three colors carry the whole brand:

| Token | Hex | Role |
|-------|-----|------|
| Navy `--navy-600` | `#224289` | Primary — surfaces, headings, primary buttons |
| Teal `--teal-300` | `#61cbc8` | Secondary — highlights, friendly fills, accents |
| Amber `--amber-400` | `#fcb600` | Accent — the signature dot, emphasis (sparing) |

---

## CONTENT FUNDAMENTALS

How AI Code Academy writes — drawn from the lesson files (`Code/User/*.py`,
`USER.md`, `README.md`):

- **Voice: second person, encouraging, plain.** Talks directly to the learner —
  *"Run this on the Raspberry Pi and give your car space to move."* Never academic
  or stiff. The reader is a capable beginner, not an expert.
- **Tone: calm, friendly, confidence-building.** Reframes mistakes as learning —
  *"If the car bumps the wall, that's not a bug, it's data."* Celebrates progress
  ("You did it!"), names what's next.
- **Casing: sentence case everywhere** for headings, buttons and labels. Reserve
  UPPERCASE only for small eyebrows/kickers (with wide letter-spacing).
- **Concrete over abstract.** Instructions point at real files, values and parts:
  *"Set `DEMO_MODE` to choose how the car thinks."* Code, file paths and commands
  appear inline in mono.
- **Short, active sentences.** One idea per line. Numbered steps for procedures.
  Generous use of tips and warnings ("Heads up: Lessons 1 & 2 light the LEDs, so
  run them with `sudo`.").
- **No emoji** in body copy. Meaning is carried by the course's flat PNG icons and
  by callout color, not by emoji. Checkmarks (✓) are used as UI affordances.
- **Trim code comments and docstrings hard on slides.** When a code chunk goes on
  a slide, cut every docstring and inline comment to the shortest phrase that still
  teaches — or drop it. Keep each line short enough to fit the code panel without
  wrapping or clipping. The slide's surrounding bullets and the hidden speaker
  notes carry the detail; the on-screen code stays skimmable. Show the smallest
  excerpt that makes the point, not the full source file.
- **Vocabulary:** "lesson" (not "module/unit"), "the car", "the Pi", "run",
  "build", "wire up". Numbers lessons as `Lesson 04`.

Examples to imitate:
> "Each lesson builds on the last — wire up a part, run a short script, and watch
> the car respond."
> "Pick one self-driving mode. `"sonic"` steers around obstacles with the
> ultrasonic sensor."

---

## VISUAL FOUNDATIONS

- **Color & vibe.** Light, optimistic, navy-anchored. Default surfaces are white
  / `--neutral-50` (a faint navy-tinted off-white). Navy is the ink and the
  primary action; teal is the friendly highlight; amber is a rare spark (the dot,
  a "new" badge, a focus underline). Neutrals are a **navy-tinted slate** ramp —
  never pure gray — so grays feel related to the brand. Dark surfaces (code
  panels, the title slide) use navy `--navy-700/950`.
- **Typography.** One family does almost everything: **Rubik** — a rounded
  geometric sans whose soft terminals echo the logo. Display/headings are
  Rubik 700–800 with tight tracking (`-0.02em`); body is Rubik 400–500 at
  generous line-height (1.5–1.65) for readability. Code & terminals use
  **JetBrains Mono**. Big, legible scale — teaching-first.
- **Spacing & layout.** 4 / 8px grid. Slides are 1280×720 (16:9) with an 80px
  side / 72px top safe area and a persistent footer (course name — level · lesson).
  Content favors two-column "explain left, show right" splits.
- **Backgrounds.** Mostly flat solid fills. Brand "blobs" (large, low-opacity
  navy/teal circles) and a single bold amber dot add personality to title and
  section slides. No photographic full-bleeds, no noisy textures, no busy
  gradients — at most a soft two-stop radial inside a device/video frame.
- **Corners.** Friendly and rounded throughout: cards `--radius-lg` (16px),
  inputs/code `--radius-md` (12px), buttons 8–12px, pills/badges fully round.
  This roundness is a core brand signal (matches the logo).
- **Cards.** White surface, `1px --border-subtle` hairline, soft shadow
  (`--shadow-sm`), 16px radius. Optional 3px colored top accent bar
  (navy/teal/amber). Interactive cards lift `-2px` and deepen to `--shadow-md`.
- **Shadows.** Soft and **navy-tinted** (`rgba(19,33,66,…)`), never harsh black.
  Five steps xs→xl. Elevation is gentle; the brand reads soft, not glassy.
- **Borders.** Hairline `1px` neutral lines for structure; `1.5–2px` for emphasis
  (button outlines, the brand top-accent). No heavy rules.
- **Buttons.** Solid navy (primary) or teal (accent), 600 weight, rounded.
  Hover = one step darker fill; press = nudge **down 1px** (no scale). Secondary
  is an outlined white button; ghost is text-only with a faint navy wash on hover.
- **Hover / press / focus.** Hover darkens fills (or lifts cards); press nudges
  down 1px; focus shows a **teal halo** `--shadow-focus` (3px, `#38b4b1` at 45%).
- **Motion.** Quick and gentle — 120–320ms, `--ease-out` for most, a subtle
  `--ease-bounce` available for playful entrances. Fades and short slides; **no**
  infinite decorative loops, no spinners-as-decoration.
- **Transparency & blur.** Used lightly — low-opacity brand blobs, translucent
  pills over video (`rgba(0,0,0,.45)`). No heavy glassmorphism.
- **Imagery.** Product/hardware photos sit on white or `--neutral-50` in a
  rounded framed tile; they are clean catalog-style cutouts (the smart car, Pi
  boards, parts). Camera/video imagery is cool and dark.

---

## ICONOGRAPHY

- **Asset catalog** — `assets/assets.md` lists every asset (icons, photos, boards,
  screenshots, fonts) with a one-sentence "what it looks like" and "when to use
  it". Read it first when picking a visual, before listing the folders by hand.
- **Course PNG icons** (`assets/icons/`) are the brand's topic & hardware
  iconography — `car`, `raspberry-pi`, `camera`, `face-scanner`, `terminal`,
  `wifi`, `server-client`, `success`, `warning`, `error`, `stop`, batteries, OS
  logos (`windows`, `linux`, `mac-apple`), etc. They are a **mixed set**: some are
  solid black silhouettes, some are full-color flat illustrations, some are
  colored line icons. Treat them as illustrative spot icons (40–48px in cards,
  tiles and callouts) rather than a uniform UI glyph system. All are copied into
  the project — reference them directly.
- **Icon variants & background contrast.** Most icons ship in variants for
  legibility on different surfaces. Black silhouette icons have a `-black` and a
  `-white` (e.g. `settings-wheel-black.png` / `settings-wheel-white.png`);
  colored icons have a lightened `-light` (e.g. `success-light.png`,
  `python-light.png`). **On a navy / blue (dark) background, use the `-light`
  variant — or the `-white` variant for black icons.** A plain black / `-black`
  icon is for light surfaces only; it disappears on navy. The same goes for
  imagery generally: prefer the lighter version on dark backgrounds when one
  exists. Exception: full-color icons that already read strongly on navy (e.g.
  `raspberry-pi`, the amber `warning`) may stay as-is. Pick the topic-appropriate
  icon too — `pdf-icon` for PDF file links/elements, `python` for Python / venv
  content.
- **Material / hardware photos** (`assets/materials/`, `assets/main/`,
  `assets/raspberry-pi-boards/`) — catalog cutouts used in "what's in the kit"
  and product slides.
- **No emoji** as iconography. Checkmarks (✓) and the amber dot are the only
  "symbol" affordances used in chrome.
- **UI glyph recommendation (substitution — please confirm):** the course PNGs are
  inconsistent for fine UI controls (close, chevrons, arrows). For component-level
  glyphs, pair the brand with **Lucide** (CDN, 2px rounded stroke — visually in
  step with Rubik). No production glyph set was found in the codebase, so this is
  a proposed default, flagged for your sign-off.

---

## Fonts — note

**Rubik** ships with this system (variable TTF, `assets/fonts/Rubik/`) — this is
the brand font found in the assets, used as-is. **JetBrains Mono** is loaded from
Google Fonts CDN as the code/mono face (no mono font was provided; flag if you'd
prefer a different one or a self-hosted copy).

---

## Exporting to PPTX

The slides are built to export cleanly to PowerPoint (editable mode = native text
boxes + shapes + images). To keep positioning/sizing accurate:

- **Export from a static deck, not the React-rendered specimen cards.** Build real
  decks from the inline `templates/lesson-deck` (static markup) — it captures
  instantly and maps 1:1. The list/block slides under `slides/` render their panels
  from the compiled bundle via React+Babel, which loads *asynchronously*; if you
  export those directly, give the capture a longer per-slide delay (~1200ms+) so
  the components have mounted, or the lists may come out empty.
- **Slide size:** every slide is exactly **1280×720** → standard 13.33"×7.5" 16:9.
  Keep that canvas; don't letterbox inside it.
- **Fonts:** pass **Rubik** and **JetBrains Mono** as `googleFontImports` (and/or
  `fontSwaps`) to the exporter so text stays editable and reflows with the right
  metrics. Viewers without Rubik installed will substitute — embed fonts in the
  PPTX or accept the swap.
- **Keep text as real text** (it already is — no text baked into images, SVG or
  canvas). Solid fills and the navy/teal/amber palette translate to shape fills.
- **Export-friendly CSS only:** the design sticks to flex/grid + solid fills + soft
  shadows, which approximate well. Avoid adding `filter`, `backdrop-blur`,
  `clip-path`, or text over gradients on slides you intend to export.
- **Speaker/link notes:** `templates/lesson-deck` ships a
  `<script type="application/json" id="speaker-notes">` (one entry per frame,
  with the coach slides' full URLs) — the exporter attaches these as PowerPoint
  notes automatically. Edit that array when you build a real deck.

## Using this as a local Claude Code skill

`SKILL.md` is already Agent-Skills-compatible (frontmatter `name` /
`description` / `user-invocable`). To use it locally: download this project folder
and drop it into your skills directory (e.g. `~/.claude/skills/ai-code-academy-design/`
or `<repo>/.claude/skills/…`) — keep the folder intact so `readme.md`, `assets/`,
`components/`, `slides/` and `templates/` travel with it. Claude Code then reads
`SKILL.md` → `readme.md` and can design with the brand or copy assets out.

---

## Index — what's in this system

**Foundations**
- `styles.css` — global entry point (consumers link this one file).
- `tokens/colors.css` · `typography.css` · `spacing.css` · `fonts.css` · `base.css`
- `guidelines/*.card.html` — specimen cards (Design System tab): colors, type,
  spacing, radius, shadow, logo, iconography.

**Components** (namespace `window.DesignSystem_df7c10`)

*Core* (`components/core/`)
- `Button` — primary/accent/secondary/ghost/danger · sm/md/lg.
- `Badge` — pill label, 8 tones.
- `Card` — rounded surface panel, optional accent bar, interactive lift.
- `Callout` — teaching box; **color = meaning**: tip (green) · warning (amber, "Heads up") · dont (red, "Don't") · note (navy).
- `CodeBlock` — dark terminal panel with traffic-light bar.

*Media* (`components/media/`) — four image cards
- `MaterialCard` — part image + name + count subtitle (kit grids).
- `ImageFrame` — large plain image, no title/padding (hero shots, diagrams).
- `ScreenshotCard` — wide screenshot with a step badge (bottom-left) + 1–2 line caption.
- `VideoCard` — clickable poster + centered play overlay + a bottom-left subtitle (thumbnail + linked title) for "watch the video" cards; the whole card is one anchor.

*Lists* (`components/lists/`)
- `CheckList` — ticked list (recaps, requirements).
- `StepList` — numbered 1·2·3 steps (procedures).
- `NumberedList` — green numbered checklist (ordered goals).
- `IconList` — icon + title + description rows (common issues, features).

*Blocks* (`components/blocks/`) — reusable slide panels (slides render these from the bundle, so they stay in sync)
- `InfoCard` — filled navy "Questions?" / "Up next" call-out.
- `IconDescCard` — icon + title + description box (thank-you "ways"), `glass` for dark slides.
- `TierList` — certificate tiers (count tag + label).
- `MiniChecklist` — coach "every class" reminder list.

**Slides** (`slides/`, 1280×720), numbered in display order — `00-title` · `01-goals`
(NumberedList) · `02-materials` · `03-code` (StepList) · `04-content` ·
`05-common-issues` (IconList) · `06-recap` (CheckList) · `07-thanks` (lesson sign-off)
· `08-course-thanks` (course sign-off) · `09-end-of-class` (coach, hidden) ·
`10-course-end` (coach, hidden), plus `slide-frame.css`. The list slides render the
List components from the bundle. Sample copy uses placeholders ("Template Course
Name", "Lesson 0 — Template Lesson"). Every regular slide shares fixed chrome:
header (logo + slide no.), a locked head block (eyebrow → title → description), and
footer (course name — level + lesson). On the **title slide** the big title is the
course name and the eyebrow above it is the lesson (`Lesson <n> — <name>`); the
footer's left reads `course name — Level <n>`, with the site on the right. The two coach slides are hidden (amber rail + "Coach
only" pill) but share the same header/footer.

**Link convention:** render every on-slide link as a real, clickable `<a href>`
anchor (`target="_blank" rel="noopener"`). Body links inherit the bold + underlined
navy treatment from `slide-frame.css` (teal on dark slides); footer links such as
the site stay clean via `.slide__footer a`. Also mirror the full URL in that slide's
hidden notes (an HTML comment `<!-- SLIDE NOTES (hidden) … -->` near the top of the
slide, also in the slide's `.prompt.md`) so the real URL survives copy/paste and
PPTX export. On-slide link text stays short; the full URL lives on the `href` and in
the notes. Channel names like `#attendance` / `#final-project-winners` are not
hyperlinks — keep them as styled text, not anchors.

**Guidelines / docs** (`guidelines/`) — foundation specimen cards + `coach-notes.md`
(communication, final announcement, certificates workflow).

**Other**
- `assets/` — logos, icons, hardware/material photos, Rubik fonts.
- `SKILL.md` — Agent-Skills wrapper for use in Claude Code.
- Generated (do not edit): `_ds_bundle.js`, `_ds_manifest.json`,
  `_adherence.oxlintrc.json`.
