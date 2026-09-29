# Layout And Visual Foundations

Use this guide for slide composition, spacing, surfaces, cards, and interaction. The source values live in [`tokens/spacing.css`](../tokens/spacing.css), [`styles.css`](../styles.css), and [`slides/slide-frame.css`](../slides/slide-frame.css). See [COLORS.md](../tokens/COLORS.md) for the palette and [FONTS.md](../assets/fonts/FONTS.md) for type.

## Canvas And Composition

- Slides use a fixed 1280×720, 16:9 canvas. The frame positions the header at 44px from the top and the footer at 40px from the bottom. The content body has 80px side insets and sits between the header and footer bands (`inset: 122px 80px 96px`).
- Work on a 4 / 8px spacing grid. Leave a clear gap above the footer; keep every image, code panel, and callout within the body area.
- Favor two columns when one side explains and the other shows. Split crowded content across slides rather than shrinking text or letting a card collide with the footer.
- Regular slides share the logo and slide number in the header, then eyebrow → title → description, followed by content. The footer carries the course, level, and lesson. The title slide uses the course name as its large title and the lesson as its eyebrow. Hidden coach slides share the frame with an amber rail and “Coach only” pill.

## Surfaces And Shape

- Use mostly flat white or faint navy-tinted surfaces. Brand blobs are large, low-opacity navy or teal circles; one amber dot can accent a title or section slide. Avoid photographic full-bleed backgrounds, noisy textures, and busy gradients. A soft two-stop radial can sit inside a device or video frame.
- Corners are friendly and rounded: cards use `--radius-lg` (16px), inputs and code panels use `--radius-md` (12px), buttons use 8–12px, and pills are fully round.
- Cards use a white surface, a 1px `--border-subtle` hairline, `--shadow-sm`, and a 16px radius. A 3px navy, teal, or amber top accent is optional. Interactive cards lift 2px and use `--shadow-md` on hover.
- Shadows are soft and navy-tinted (`rgba(19,33,66,…)`), with five steps from xs to xl. Use 1px neutral borders for structure and 1.5–2px outlines for emphasis.

## Controls And Motion

- Primary buttons are solid navy; accent buttons are teal. Secondary buttons are white with an outline; ghost buttons use text with a faint navy hover wash. Buttons use weight 600 and rounded corners.
- Hover darkens fills or lifts cards. Press moves a button down 1px without scaling. Focus uses the teal `--shadow-focus` halo.
- Motion is quick and gentle, typically 120–320ms with `--ease-out`. Use fades or short slides for entrances; avoid infinite decorative loops and decorative spinners.
- Use transparency lightly for background blobs and pills over video. Avoid heavy glass effects. For the treatment and placement of actual images, see [assets/ASSETS.md](../assets/ASSETS.md).
