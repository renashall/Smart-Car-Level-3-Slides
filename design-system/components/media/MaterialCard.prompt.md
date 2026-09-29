Material / hardware tile — product image with a name and a count subtitle. Use in "what's in the kit" grids.

```jsx
<MaterialCard src="assets/materials/raspberry-pi-4-set.png" name="Raspberry Pi 4" count="×1" note="the brain" />
<MaterialCard src="assets/materials/transmission-parts/wheel.png" name="Wheels & motors" count="×4" note="drive" />
```

Props: `src`, `alt`, `name`, `count` (e.g. "×1"), `note` (short role). The count + note render together in teal under the name. Lay several out in a `repeat(4, 1fr)` grid.
