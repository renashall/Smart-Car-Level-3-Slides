Video / link card — a clickable poster image with a centered play overlay and a bottom-left subtitle that pairs a small thumbnail with a clickable link. The **whole card is one anchor**, so clicking anywhere opens the link. Use for "watch the video" / external-resource cards.

```jsx
{/* video link — poster + play overlay, subtitle = small thumb + link */}
<div style={{ width: 460, height: 320 }}>
  <VideoCard
    src="assets/main/smart-car-full.png"
    thumbSrc="assets/main/smart-car-full.png"
    href="https://drive.google.com/file/d/FILE_ID/view"
    title="Watch the smart car build video"
    meta="Google Drive · build & setup walkthrough"
  />
</div>

{/* omit thumbSrc → a teal play badge shows in the subtitle instead */}
<VideoCard src="assets/screenshots/demo.png" href="https://…" title="Watch the demo" />
```

Props: `src` (poster image), `href` (the link — the entire card is clickable, opens in a new tab), `title` (clickable link text in the subtitle), `meta` (optional muted second line), `thumbSrc` (small thumbnail beside the link; omit to show a play badge instead), `play` (overlay the play button on the poster, default `true`), `alt`, `background`. Size it from its parent; the poster fills the frame above the subtitle bar.

Mirror the full `href` in the slide's hidden notes (`<!-- SLIDE NOTES (hidden) … -->`) so the real URL survives copy/paste and PPTX export — same link convention as on-slide anchors.
