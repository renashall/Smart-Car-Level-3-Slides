Dark terminal-style panel for lesson commands and code, with a traffic-light title bar.

```jsx
<CodeBlock language="bash" prompt>{`cd Code/User
sudo python3 lesson_1_components.py`}</CodeBlock>

<CodeBlock title="lesson_4_autonomous_modes.py">{`DEMO_MODE = "sonic"
DRIVE_SPEED = 1200`}</CodeBlock>
```

Pass code as a template string in `children`. `prompt` adds a teal `$` per line (for shell). `title` overrides the language label.

On slides, trim docstrings and inline comments to the shortest phrase that still teaches (or drop them), and keep every line short enough to fit the panel without wrapping or clipping — the slide's bullets and hidden speaker notes carry the detail. Show the smallest excerpt that makes the point, not the whole file.
