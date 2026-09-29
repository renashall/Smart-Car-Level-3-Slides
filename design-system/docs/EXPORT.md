# Exporting Lesson Decks

Build decks from the static [`templates/lesson-deck/`](../templates/lesson-deck/) template on the 1280×720, 16:9 canvas. Keep the source HTML and its `.pdf` or `.pptx` exports together in `content/slide-decks/lesson-<n>-<name>/`, with filenames `lesson-<n>.<ext>`.

## PDF And PowerPoint Workflows

- To regenerate the complete shareable bundle, use the `export-all` skill or run `python design-system/export.py --quick`, `--full`, or `--zip` from the repository root. The wrapper invokes `skills/export-all/scripts/export_all.py`. Outputs go to the ignored root `Exports/` folder, with lesson PDFs/PPTXs and plan PDFs under `Lessons/Lesson N/`. Full adds matching Markdown sources; zip adds a repository-named archive of the full bundle.
- To export the four course document PDFs and the 12 rendered lesson decks in separate folders, run `python design-system/export.py --pdf_pptx`. It writes `Guide.pdf`, `Info.pdf`, `Organization.pdf`, and `Course-Outline.pdf` to the root of `Exports/`; `lesson-00.pdf` through `lesson-11.pdf` go to `Exports/PDF/`, and the matching `.pptx` files go to `Exports/PPTX/`. The two deck folders contain no other files.
- For a standalone Markdown guide or notes document, use `skills/export-markdown-pdf/scripts/export_markdown_pdf.py` on the `.md` file. It writes a themed PDF beside the source by default.
- For a PDF with one slide per page, selectable text, and clickable links, use `skills/export-deck-pdf/scripts/export_pdf.py` on the rendered HTML deck.
- For a screenshot-based PPTX with speaker notes and clickable link hotspots, use `skills/export-deck-pptx-screenshot/scripts/build_pptx.py` on the rendered HTML deck. Slide content in this route is an image, so its text is not editable.
- Some external PPTX workflows map static HTML to native PowerPoint text boxes, shapes, and images. The rules below also help that editable export route, but do not change the screenshot exporter's behavior.

## Prepare The Slides

- Export from a static lesson deck, not the React-rendered specimen cards. List and block examples under `slides/` mount asynchronously from the bundle; capturing them directly may require about 1200ms or more per slide to avoid empty panels.
- Keep every slide exactly 1280×720, which maps to a standard 13.33×7.5 inch 16:9 page. Do not letterbox inside the canvas.
- Keep text as real HTML text in the source. For native editable export, avoid baking it into images, SVG, or canvas. Provide Rubik and JetBrains Mono to the exporter through `googleFontImports` or `fontSwaps`; viewers without Rubik may substitute unless the font is embedded.
- Prefer flex or grid, solid fills, and soft shadows. Avoid `filter`, `backdrop-blur`, `clip-path`, and text over gradients on slides intended for native export.
- Make every displayed web link a real clickable `<a href>` with `target="_blank" rel="noopener"`. Keep link text short and place the full URL in the `href` and the slide's hidden notes. Channel names such as `#attendance` are styled text, not links.
- Body links inherit bold, underlined navy styling from `slide-frame.css` (teal on dark slides); footer links use the simpler `.slide__footer a` styling. Mirror each full URL in an HTML `<!-- SLIDE NOTES (hidden) … -->` comment near the slide's top and in its `.prompt.md` so it survives copy and export.
- Maintain the template's `<script type="application/json" id="speaker-notes">` entry for every frame. Include the full URLs used on coach slides so the PPTX exporter can attach them as speaker notes.

Render and inspect the deck before delivery, then remove temporary capture files. Font and color details live in [Fonts](../assets/fonts/FONTS.md) and [Colors](../tokens/COLORS.md).
