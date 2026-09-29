# Colors

The palette is light and navy-anchored. Use the tokens in [`colors.css`](colors.css) through [`styles.css`](../styles.css) rather than repeating hex values in components.

| Color | Token | Hex | Main use |
| --- | --- | --- | --- |
| Navy | `--navy-600` | `#224289` | Primary brand surface, headings, primary actions. |
| Teal | `--teal-300` | `#61cbc8` | Friendly highlights, fills, and accents. |
| Amber | `--amber-400` | `#fcb600` | Signature dot and sparing emphasis. |

## Surfaces And Text

- Default pages use white or `--neutral-50`; cards use `--surface-card`. Neutrals are navy-tinted slate, rather than pure gray.
- Use `--text-strong` for headings, `--text-body` for body copy, and `--text-muted` for secondary text. Primary links use `--text-link`.
- Dark title and code surfaces use navy from `--navy-700` through `--navy-950`. Use `--text-on-brand` or another tested light foreground on them.
- Buttons use navy for the primary action and teal for an accent action. On teal and amber fills, use the dark ink aliases `--text-on-teal` and `--text-on-amber`.
- Use semantic aliases such as `--surface-page`, `--action-bg`, and `--border-subtle` in new components so the intended role remains clear.

## Meaning And Restraint

- Amber is a small spark: the logo dot, a badge, an underline, or a caution highlight. Avoid filling large areas with it by default.
- Status colors carry meaning: green for success, amber for warning, red for error, and navy for information. The `--status-*` foreground and background tokens define the pairs.
- Callouts use color consistently: tip green, warning amber, “don't” red, and note navy. Do not rely on color alone; keep a label or icon.
- Hairline structure uses `--border-subtle`; stronger outlines use `--border-default` or `--border-strong`. Shadows are soft and navy-tinted.
- Focus uses the teal `--focus-ring` and `--shadow-focus` halo. Hover darkens fills one palette step; pressed buttons nudge down 1px.

See [`guidelines/`](../guidelines/) for color specimens, and [Icons](../assets/icons/ICONS.md) for choosing icon variants against light and dark surfaces.
