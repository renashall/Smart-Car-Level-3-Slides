Icon-and-description box — circular symbol + title + description. The thank-you "ways to reach me" / step-box pattern. Use `glass` on dark slides.

```jsx
<div style={{ display: "flex", gap: 18 }}>
  <IconDescCard glass symbol="?" title="Final questions?" text="Ask me anything before we finish." />
  <IconDescCard glass symbol="★" title="Certificates" text="Given after class by end of day." />
</div>
```

Props: `symbol`, `title`, `text`, `glass` (translucent for navy backgrounds). Width comes from the parent row.
