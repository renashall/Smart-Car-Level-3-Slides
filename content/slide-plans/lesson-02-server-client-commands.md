# Lesson 2 — Server & Client Commands

**Organization:** AI Code Academy · aicodeacademy.com
**Course:** Machine Learning with Raspberry Pi & Smart Car (Level 3)
**Lesson:** 2 — Server & Client Commands
**Source file:** ../Code/User/lesson_2_server_client_commands.py
**Runs on:** Raspberry Pi (the car) · **run with `sudo`** (motors + LED strip need hardware access)

> Layout/outline doc. Each `---` block below = one slide. Code blocks are copied
> from the real lesson file and grow chunk-by-chunk until the whole script exists.

---

## Slide 1 — Title

**On screen**
- **Lesson 2 — Server & Client Commands**
- Machine Learning with Raspberry Pi & Smart Car (Level 3)
- AI Code Academy · aicodeacademy.com

**Visual:** Design System/assets/main/company-logo.png (corner) + Design System/assets/main/smart-car-full.png (hero)

**Coach note:** ~1 min. Today the car moves — set the room up so cars can't drive off tables.

---

## Slide 2 — Introduction

**On screen**
- Last time: lit the **LEDs**, swept the **servo head**, read the **ultrasonic** sensor.
- We learned the shape: **`setup()` → work → `destroy()`**, and `import car_setup` first.
- Today we keep that shape and add the **wheels**, the **buzzer**, and the idea of **commands**.

**Visual:** Design System/assets/main/smart-car-side-full.png

**Coach note:** Quick verbal check: "what does `destroy()` do and why?"

---

## Slide 3 — Our Goals

**On screen**
- A **command demo** that:
  - drives forward, back, turns left, turns right, then stops
  - beeps the **buzzer**
  - flashes the **LEDs** blue
- And as it runs, it **prints the exact command string** the car would receive.

**Visual:** Design System/assets/icons/car-black.png

**Coach note:** The "print the command" part is the real teaching goal — not just driving.

---

## Slide 4 — Big Idea: Server & Client

**On screen**
- A normal setup: an **app (client)** on your laptop/phone sends orders; the **car (server)** carries them out.
- Client says *"drive forward"*; server **does** it with the motors.
- Today we play **both roles in one file**: we build the order, then run it on the car.

**Visual:** Design System/assets/icons/server-client-black.png

**Coach note:** Analogy: client = customer ordering, server = kitchen cooking. The order ticket is the "command".

---

## Slide 5 — Commands Are Just Text

**On screen**
- The client and server talk using short **text strings**.
- Pieces are glued together with `#`:
  - `CMD_MOTOR#1500#1500#1500#1500` → "set the four wheels to 1500"
  - `CMD_BUZZER#1` → "buzzer on"
  - `CMD_LED#255#0#0#255` → "LEDs to a color"
- We'll write a tiny function that builds these strings so we can **see** the message.

**Visual:** [ASSET NEEDED: command-flow diagram — client → "CMD_MOTOR#1500#..." → Pi/server]

**Coach note:** Stress: it's *just text*. Nothing magic travels over the wire — only a string.

---

## Slide 6 — The Four Wheels & Motor Values

**On screen**
- Four wheels, always in this order: **left-front, left-back, right-front, right-back**.
- Each value: `0` = stopped … up to `4095` = full speed. **Negative** = spin backward.
- **Turning trick:** spin one side backward and the other side forward.
- `1500` is a gentle, safe speed for the classroom.

**Visual:** Design System/assets/materials/transmission-parts/dc-motor.png + Design System/assets/materials/transmission-parts/wheel.png · [ASSET NEEDED: top-down diagram of 4 wheels labeled LF/LB/RF/RB with turn arrows]

**Coach note:** Have them predict which wheels reverse for a left turn before revealing the tuple.

---

## Slide 7 — Start the File: Imports

**On screen**
- `import car_setup` first (finds the car's modules), then `time`.
- Then the parts we control today + the list of command names.
- Watch the casing: lowercase files, but **`COMMAND` is all-caps**.

**Code (builds file · chunk 1/12):**
```python
"""Lesson 2: Server and Client.

Run this on the Raspberry Pi (the car).
"""

import car_setup          # adds the car's code folders to the import path
import time

from motor import Motor       # the four driving wheels
from buzzer import Buzzer     # the beeper
from led import Led           # the LED lights
from command import COMMAND   # the command names the car understands
```

**Coach note:** Point at `COMMAND` (uppercase) vs `Motor`/`Led` (PascalCase) — both come from lowercase files.

---

## Slide 8 — Settings: Speed + the Moves

**On screen**
- Each "move" is four wheel values as a tuple, in LF/LB/RF/RB order.
- Forward = all positive. Backward = all negative.
- Turns reverse one side. Stop = all zero.

**Code (builds file · chunk 2/12):**
```python
# ---- settings you can change ----
DRIVE_SPEED = 1500        # 0 = stop … 4095 = full speed; 1500 is gentle

# Wheel order: left-front, left-back, right-front, right-back.
FORWARD   = (DRIVE_SPEED, DRIVE_SPEED, DRIVE_SPEED, DRIVE_SPEED)
BACKWARD  = (-DRIVE_SPEED, -DRIVE_SPEED, -DRIVE_SPEED, -DRIVE_SPEED)
TURN_LEFT = (-DRIVE_SPEED, -DRIVE_SPEED, DRIVE_SPEED, DRIVE_SPEED)
TURN_RIGHT = (DRIVE_SPEED, DRIVE_SPEED, -DRIVE_SPEED, -DRIVE_SPEED)
STOP = (0, 0, 0, 0)

LED_ALL = 0xFF            # 0xFF = 255 = all eight LEDs at once
```

**Coach note:** Look at `TURN_LEFT`: left wheels negative, right wheels positive — that's the turning trick from slide 6.

---

## Slide 9 — Empty Boxes + `setup()`

**On screen**
- Name the parts now (`None`), build them in one place.
- `cmd = COMMAND()` gives us the command names like `cmd.CMD_MOTOR`.

**Code (builds file · chunk 3/12):**
```python
# ---- car parts (created in setup) ----
motor = None
buzzer = None
led = None
cmd = None


def setup():
    """Create the hardware objects and the command-name helper."""
    global motor, buzzer, led, cmd
    motor = Motor()
    buzzer = Buzzer()
    led = Led()
    cmd = COMMAND()       # holds names like cmd.CMD_MOTOR, cmd.CMD_BUZZER
```

**Coach note:** Same `None` → `setup()` pattern as Lesson 1. Reinforce the habit.

---

## Slide 10 — Build the Command String Yourself

**On screen**
- `format_command` glues a name + values with `#` — exactly like the real client.
- This lets us **print** the message that would travel over the network.
- `"#".join(parts)` puts a `#` between every piece.

**Code (builds file · chunk 4/12):**
```python
def format_command(name, values):
    """Build a string like CMD_MOTOR#1500#1500#1500#1500."""
    parts = [name]                  # start with the command name
    for value in values:            # add each value as text
        parts.append(str(value))
    return "#".join(parts)          # join with "#" between parts
```

**Coach note:** This is the conceptual heart of the lesson. Walk through it with one example by hand.

---

## Slide 11 — `drive()`: Print, Then Move

**On screen**
- Print the command so students see it, **then** actually drive the motors.
- `setMotorModel(lf, lb, rf, rb)` takes the four wheel speeds.

**Code (builds file · chunk 5/12):**
```python
def drive(move, seconds):
    """Run one move for some seconds, printing its command."""
    print("Sending:", format_command(cmd.CMD_MOTOR, move))
    motor.setMotorModel(move[0], move[1], move[2], move[3])
    time.sleep(seconds)             # keep driving this long
```

**Coach note:** Tie the printed `Sending: CMD_MOTOR#...` directly to the wheels turning — message → action.

---

## Slide 12 — `test_buzzer()`

**On screen**
- Buzzer uses **strings**: `"1"` = on, `"0"` = off (not the numbers 1/0).
- Beep on for a second, then off.

**Code (builds file · chunk 6/12):**
```python
def test_buzzer():
    """Beep the buzzer on, then off."""
    print("Sending:", format_command(cmd.CMD_BUZZER, ["1"]))
    buzzer.run("1")       # "1" = on, "0" = off (strings!)
    time.sleep(1)
    buzzer.run("0")
```

**Visual:** [ASSET NEEDED: close-up photo of the buzzer component on the board]

**Coach note:** Common bug: `buzzer.run(1)` (int) instead of `"1"`. Call it out.

---

## Slide 13 — `test_leds()`

**On screen**
- Reuse what we learned in Lesson 1: `ledIndex(which, r, g, b)`.
- Turn all LEDs blue for a moment, then off.

**Code (builds file · chunk 7/12):**
```python
def test_leds():
    """Turn every LED blue briefly, then off."""
    print("Sending:", format_command(cmd.CMD_LED, [LED_ALL, 0, 0, 255]))
    led.ledIndex(LED_ALL, 0, 0, 255)   # 0 red, 0 green, 255 blue = blue
    time.sleep(1)
    led.ledIndex(LED_ALL, 0, 0, 0)     # all off
```

**Coach note:** Callback to Lesson 1 — they already know `ledIndex`. Confidence boost.

---

## Slide 14 — `loop()`: The Whole Routine

**On screen**
- Run every move in order, then beep, then flash.
- Notice we **stop the wheels** before the buzzer/LED tests.

**Code (builds file · chunk 8/12):**
```python
def loop():
    """Drive, beep, then flash the LEDs — once."""
    drive(FORWARD, 1)
    drive(BACKWARD, 1)
    drive(TURN_LEFT, 1)
    drive(TURN_RIGHT, 1)
    drive(STOP, 1)        # stop before the next tests
    test_buzzer()
    test_leds()
```

**Coach note:** Ask why `drive(STOP, 1)` matters — you don't want the car rolling during the beep/flash.

---

## Slide 15 — Clean Up: `destroy()`

**On screen**
- Always finish **stopped and quiet**: motors off, buzzer off, LEDs off.
- Guard each part with `is not None` in case setup failed.

**Code (builds file · chunk 9/12):**
```python
def destroy():
    """Make sure the car is fully stopped and quiet."""
    if motor is not None:
        motor.setMotorModel(0, 0, 0, 0)   # stop all wheels
    if buzzer is not None:
        buzzer.run("0")                   # silence the buzzer
    if led is not None:
        led.ledIndex(LED_ALL, 0, 0, 0)    # LEDs off
```

**Coach note:** Stopping the motors here is a **safety** must — a crashed program shouldn't leave wheels spinning.

---

## Slide 16 — The Main Block

**On screen**
- Same safe pattern as Lesson 1: `try` runs the demo, `except` catches **Ctrl+C**, `finally` always cleans up.

**Code (builds file · chunk 10/12):**
```python
if __name__ == "__main__":
    try:
        setup()
        loop()
    except KeyboardInterrupt:
        pass                              # Ctrl+C: stop quietly
    finally:
        destroy()                         # always leave the car safe
```

**Coach note:** Recognize the pattern from Lesson 1 — `finally` guarantees the car stops.

---

## Slide 17 — We Built the Whole File 🎉

**On screen**
- Complete `lesson_2_server_client_commands.py`:
  - imports → moves → `setup()` → `format_command()` → `drive()` / `test_buzzer()` / `test_leds()` → `loop()` → `destroy()` → main block
- It both **builds the commands** and **carries them out**.

**Visual:** Design System/assets/icons/success.png

**Coach note:** Scroll the assembled file; point out it's the same skeleton as Lesson 1 plus the command idea.

---

## Slide 18 — Run It ⚠️ Wheels off the Ground!

**On screen**
- **Lift the car** (book/box under it) so wheels spin freely on the first run.
- On the **Pi's terminal**:
```sh
cd smartcar2026/Code/User
sudo python3 lesson_2_server_client_commands.py
```
- Watch the terminal — you'll see lines like:
```text
Sending: CMD_MOTOR#1500#1500#1500#1500
Sending: CMD_MOTOR#-1500#-1500#-1500#-1500
Sending: CMD_BUZZER#1
Sending: CMD_LED#255#0#0#255
```

**Visual:** Design System/assets/icons/warning.png + Design System/assets/icons/terminal.png

**Coach note:** Enforce "wheels off the ground" before anyone runs. Then let them put it on the floor for a second run.

---

## Slide 19 — Try It Yourself

**On screen**
- Lower `DRIVE_SPEED` to `1000` (gentler) or raise it carefully.
- Add a new move, e.g. `SPIN = (DRIVE_SPEED, DRIVE_SPEED, -DRIVE_SPEED, -DRIVE_SPEED)` and call it in `loop()`.
- Change the LED color in `test_leds()`.
- **Challenge:** make the car drive a square (forward + turn, four times).

**Coach note:** The "drive a square" challenge is great for fast finishers — timing/turn tuning teaches a lot.

---

## Slide 20 — Troubleshooting

**On screen**
- Car drives off the table → **lift the wheels** first; reduce `DRIVE_SPEED`.
- Wheels don't move / are weak → **battery low** or motor wires loose.
- Buzzer silent → you passed `1` instead of `"1"` (must be a string).
- Only some wheels spin → check the order LF/LB/RF/RB and the wiring.
- `ModuleNotFoundError` → casing, or `car_setup` not imported first.

**Visual:** Design System/assets/icons/error.png + Design System/assets/icons/warning.png

**Coach note:** Battery is the usual culprit for weak/uneven motors. Have charged spares ready.

---

## Slide 21 — Recap & What's Next

**On screen**
- You learned the **client → command → server** idea and built command strings yourself.
- You drove **all four wheels**, used the **buzzer**, and reused the **LEDs**.
- **Next — Lesson 3:** read sensors with the **ADC**, and run a background **battery watchdog** using **multithreading**.

**Visual:** Design System/assets/main/smart-car-full.png

**Coach note:** Tease Lesson 3: "the car will watch its own battery while doing something else at the same time."

---

<!-- HIDDEN — COACH NOTES (do not show to students) -->

## Coach Notes (hidden)

**Timing (~45–50 min):** Recap + concepts (slides 1–6) ~12 min · build the code (7–17) ~20 min · run + experiment (18–19) ~12 min · troubleshooting/recap (20–21) ~6 min.

**Before class**
- Cars charged; weak/uneven motors are almost always low battery.
- Have boxes/books ready so every car can run "wheels up".
- Clear floor space for a supervised "wheels down" run.

**Safety (important this lesson)**
- First run **must** be wheels-off-the-ground.
- Keep cables/charging away from the driving area.
- `destroy()` stops the motors — make sure students understand why that matters.

**Most common failures**
1. Buzzer passed `1` instead of `"1"` (string).
2. Low battery → weak or uneven driving.
3. Import casing / `car_setup` not first.
4. Confusing wheel order (LF/LB/RF/RB) when adding new moves.

**Teaching tips**
- Spend real time on `format_command` and the `#` protocol — it's the lesson's core idea, more than the driving.
- Connect every printed `Sending: CMD_...` line to the action that follows.
- Reuse Lesson 1's `setup → work → destroy` framing to build confidence.

**Assets to source (flagged in deck)**
- Command-flow diagram (client → `CMD_MOTOR#...` → Pi) — slide 5.
- Top-down 4-wheel diagram labeled LF/LB/RF/RB with turn arrows — slide 6.
- Close-up photo of the buzzer on the board — slide 12.
