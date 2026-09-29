Filled navy info card — optional badge/eyebrow + title + body. The "Questions?" and "Up next" call-out pattern.

```jsx
<InfoCard badge="?" title="Questions?">If anything isn't working, ask now.</InfoCard>
<InfoCard eyebrow="Up next" title={<>Lesson 05<br/>Line follower</>}>Trace a black line on the floor.</InfoCard>
```

Props: `eyebrow` (uppercase teal label), `badge` (symbol in a teal circle), `title`, `children` (body).
