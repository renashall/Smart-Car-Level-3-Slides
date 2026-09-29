Large plain image — no title or padding, just a rounded image that fills its wrapper. For hero shots, photos and diagrams.

```jsx
{/* photo that fills and crops */}
<div style={{ width: 520, height: 320 }}>
  <ImageFrame src="assets/main/smart-car-side-full.png" fit="cover" />
</div>

{/* transparent product cut-out, contained on a soft panel */}
<div style={{ width: 480, height: 340 }}>
  <ImageFrame src="assets/main/smart-car-full.png" fit="contain" background="var(--neutral-50)" pad />
</div>
```

Props: `src`, `alt`, `fit` (cover default / contain), `background`, `radius`, `pad`, `shadow`. Size it from the parent — the image fills the frame.
