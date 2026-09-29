Numbered step list (1·2·3) with navy circle markers. Use for procedures and ordered instructions.

```jsx
<StepList items={[
  { title: "Set DEMO_MODE", body: "Choose how the car thinks." },
  { title: "Run the script", body: "sudo python3 lesson_4.py" },
  "Watch it drive around an obstacle",
]} />
```

Items: plain strings or `{ title, body }`. `start` sets the first number; `size` = sm / md / lg.
