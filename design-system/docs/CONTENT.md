# Content And Voice

How AI Code Academy writes — drawn from the lesson files (`Code/User/*.py`,
`USER.md`, `README.md`):

- **Voice: second person, encouraging, plain.** Talks directly to the learner —
  *"Run this on the Raspberry Pi and give your car space to move."* Never academic
  or stiff. The reader is a capable beginner, not an expert.
- **Tone: calm, friendly, confidence-building.** Reframes mistakes as learning —
  *"If the car bumps the wall, that's not a bug, it's data."* Celebrates progress
  ("You did it!"), names what's next.
- **Concrete over abstract.** Instructions point at real files, values and parts:
  *"Set `DEMO_MODE` to choose how the car thinks."* Code, file paths and commands
  appear inline in mono.
- **Short, active sentences.** One idea per line. Numbered steps for procedures.
  Generous use of tips and warnings ("Heads up: Lessons 1 & 2 light the LEDs, so
  run them with `sudo`.").
- **Trim code comments and docstrings hard on slides.** When a code chunk goes on
  a slide, cut every docstring and inline comment to the shortest phrase that still
  teaches — or drop it. Keep each line short enough to fit the code panel without
  wrapping or clipping. The slide's surrounding bullets and the hidden speaker
  notes carry the detail; the on-screen code stays skimmable. Show the smallest
  excerpt that makes the point, not the full source file.
- **Vocabulary:** "lesson" (not "module/unit"), "the car", "the Pi", "run",
  "build", "wire up". Numbers lessons as `Lesson 04`.

Examples to imitate:
> "Each lesson builds on the last — wire up a part, run a short script, and watch
> the car respond."
> "Pick one self-driving mode. `"sonic"` steers around obstacles with the
> ultrasonic sensor."
