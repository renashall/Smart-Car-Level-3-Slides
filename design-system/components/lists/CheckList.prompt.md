Checklist — vertical list with green ticks. Use for recaps, requirements and done-states.

```jsx
<CheckList items={[
  "Wired up motors, sensors and the camera",
  "Ran your first Python on the Pi",
  { text: "Tuned the drive speed", checked: false },
]} />
```

Items: plain strings (all ticked) or `{ text, checked }`. `size` = sm / md / lg. Rows are divided by hairlines.
