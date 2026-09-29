Screenshot card — a wide window/display capture with a step badge + 1–2 line instruction caption together along the bottom-left. Use for setup/walkthrough steps.

```jsx
<ScreenshotCard
  src="assets/screenshots/raspberry-pi-connect.png"
  step={1}
  caption="Slide the microSD card into the Raspberry Pi until it clicks."
/>
```

Props: `src`, `alt`, `step` (badge number/label — omit to hide), `stepLabel` (default "Step"), `caption` (1–2 lines), `background`. The image is usually wide; size the card from its parent.
