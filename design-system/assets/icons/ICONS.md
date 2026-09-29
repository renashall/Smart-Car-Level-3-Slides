# Icons

Read the file-by-file [Asset Info catalog](../ASSET-INFO.md) before selecting an icon. The course icons live in [this folder](./) and cover the car, Raspberry Pi, camera, face scanner, terminal, Wi-Fi, client/server, battery and status states, operating systems, and more.

## Use And Scale

- The PNG collection mixes black silhouettes, full-color flat illustrations, and colored line icons. Treat these as illustrative spot icons in cards, tiles, and callouts, typically around 40–48px. They are not a uniform small UI glyph set.
- Match the icon to the lesson content: `pdf-icon` for PDF handouts and links; `python` for Python code or virtual environment steps; `camera` or `face-scanner` for the corresponding vision topic.
- No emoji as iconography. Checkmarks (✓) and the amber dot are the small symbol affordances used in slide chrome.

## Variants And Contrast

- Use base or `-black` silhouettes on light surfaces. For navy or blue surfaces, use `-light` on colored icons and `-white` on black silhouettes, such as `settings-wheel-white.png`.
- Some full-color icons already contrast well on navy, including `raspberry-pi` and amber `warning`; inspect them in the rendered slide before keeping the base version.
- Apply the same contrast check to images generally: choose the lighter version on a dark surface when one exists.

For fine UI controls such as close, chevrons, and arrows, the original design proposed Lucide with a rounded 2px stroke as a possible companion. No production glyph set was found in the course codebase; treat Lucide as a proposal to confirm for a new interface, not as an established course asset.
