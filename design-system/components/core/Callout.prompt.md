Teaching call-out for notes, tips, warnings and "don't" rules inside lessons and slides — colored left bar + uppercase label. **Color carries meaning:** green = tip, amber = warning/heads-up, red = don't.

```jsx
<Callout kind="tip">Give the car space to move before you run it.</Callout>
<Callout kind="warning" icon={<img src="assets/icons/warning.png" width="24" />}>
  Lessons 1 and 2 light the LEDs, so run them with <code>sudo</code>.
</Callout>
<Callout kind="dont">Don't lift the car while the wheels are spinning.</Callout>
<Callout kind="note" title="Where it runs">On the Raspberry Pi (the car).</Callout>
```

Kinds: `tip` (green), `warning` (amber, "Heads up"), `dont` (red, "Don't"), `note` (navy). `title` overrides the default label; `icon` slot accepts a course PNG.
