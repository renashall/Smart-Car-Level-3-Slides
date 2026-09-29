Primary clickable action for AI Code Academy UIs and slides — navy by default, teal for friendly/positive actions.

```jsx
<Button variant="primary" size="md" onClick={start}>Start lesson</Button>
<Button variant="accent" iconRight={<img src="assets/icons/car-black.png" width="18" />}>Drive</Button>
<Button variant="secondary">Back</Button>
<Button variant="ghost" size="sm">Skip</Button>
```

Variants: `primary` (navy, default), `accent` (teal), `secondary` (outlined), `ghost` (text), `danger` (red).
Sizes: `sm`, `md` (default), `lg`. Props: `fullWidth`, `disabled`, `iconLeft`, `iconRight`. Hover darkens; press nudges down 1px.
