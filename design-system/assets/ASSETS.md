# Asset Usage

Use this guide to select, place, and maintain visual assets in lesson decks. For a file-by-file catalog of what each item looks like and when to use it, read [Asset Info](ASSET-INFO.md). For icon-specific choices and variants, read [Icons](icons/ICONS.md).

## Brand At A Glance

The logo is a friendly geometric **"AI" mark** (rounded, single-stroke) in teal
on a navy disc, with an amber dot over the *i*. See [COLORS.md](../tokens/COLORS.md) for the palette
and its usage rules.

## Choose A Visual

1. Read the lesson plan and identify what the learner needs to recognize: the finished car, a part, a connection, a software screen, or a concept.
2. Check [Asset Info](ASSET-INFO.md) before browsing the folders or creating an image. Reuse the closest existing asset when it depicts the actual hardware or interface.
3. Verify that the image matches the instruction. A labeled Pi board is useful for locating a port; a clean car cutout is better for an introductory hero.
4. Choose the appropriate light or dark variant for its surface. See [Icons](icons/ICONS.md) for icon contrast rules.
5. Preview the rendered slide at 1280×720. Make labels and hardware details large enough to read within the slide safe area.

## Asset Folders And Placement

| Folder | Use |
| --- | --- |
| `main/` | AI Code Academy logo, Freenove credit, and assembled smart car hero images. |
| `materials/` and its subfolders | Part and tool cutouts for kit lists, assembly steps, and wiring explanations. |
| `raspberry-pi-boards/` | Labeled board and port references for setup instructions. |
| `screenshots/` | Real software and remote-access screens when the learner needs to identify UI. |
| `raspi-imager-steps/` | Sequential Raspberry Pi Imager setup screens; keep their order clear. |
| `icons/` | Topic and status spot icons. Follow [Icons](icons/ICONS.md). |
| `fonts/Rubik/` | Bundled Rubik files. Follow [Fonts](fonts/FONTS.md); preserve the supplied filenames. |

## Image Treatment

- Put product and hardware cutouts on white or `--neutral-50` in a rounded framed tile. Use the existing `MaterialCard` for part-and-count grids and `ImageFrame` for a large uncaptioned image.
- Use `ScreenshotCard` for a software step with a short caption. Camera and video imagery can sit in cool, dark device frames; use `VideoCard` for a linked video poster.
- Keep slide backgrounds mostly flat. Low-opacity navy or teal circles and one amber dot suit title and section slides. Avoid photographic full-bleed backgrounds, noisy textures, and busy gradients.
- Give labeled compilation images such as `materials/**/*-set.png` enough room for the labels to remain legible. If individual part cards already explain the group, use those instead of repeating the set image.
- Preserve transparent backgrounds where useful. Name new non-font assets in kebab-case and store them with the matching asset category.

## Deck Workflow

Build real decks from `../templates/lesson-deck/`, using `../slides/` as slide-type examples and `../styles.css` for shared styling. Select assets while drafting each slide, then check size, contrast, cropping, and caption clarity in the rendered deck. Keep source asset paths relative to the deck so the HTML and its exports resolve them together. For PDF and PPTX output, follow [Export](../docs/EXPORT.md).
