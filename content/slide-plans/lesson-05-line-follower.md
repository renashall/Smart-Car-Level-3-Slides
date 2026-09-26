# Lesson 5 — Line Follower

**Organization:** AI Code Academy · aicodeacademy.com
**Course:** Machine Learning with Raspberry Pi & Smart Car (Level 3)
**Lesson:** 5 — Line Follower
**Source file:** ../Code/User/lesson_5_line_follower.py
**Runs on:** Raspberry Pi (the car) · place it on a line track · no `sudo` needed

> Layout/outline doc. Each `---` block below = one slide. Code blocks are copied
> from the real lesson file and grow chunk-by-chunk until the whole script exists.

---

## Slide 1 — Title

**On screen**
- **Lesson 5 — Line Follower**
- Machine Learning with Raspberry Pi & Smart Car (Level 3)
- AI Code Academy · aicodeacademy.com

**Visual:** Design System/assets/main/company-logo.png (corner) + Design System/assets/main/smart-car-full.png (hero)

**Coach note:** ~1 min. Have a line track (black tape on a light floor) ready to demo.

---

## Slide 2 — Introduction

**On screen**
- Last time the car avoided obstacles and chased light.
- Today it follows a **line on the floor** — the classic robot challenge.
- New tool: three **infrared (IR) sensors** underneath the car.

**Visual:** Design System/assets/materials/line-tracker-module.png

**Coach note:** Show the underside of the car so students see the three IR sensors.

---

## Slide 3 — Our Goals

**On screen**
- Build a **line-following** car that:
  - reads three IR sensors (Left, Middle, Right),
  - figures out where the line is, and
  - steers to stay on it.
- Learn to read the Pi's pins directly with **RPi.GPIO**.

**Visual:** Design System/assets/icons/car-black.png

**Coach note:** Set the goal: smooth following around a loop of tape.

---

## Slide 4 — The Three IR Sensors

**On screen**
- Three sensors under the car: **Left, Middle, Right**.
- Each reads a simple yes/no:
  - **1** = it sees the dark **line**
  - **0** = it sees the light **floor**
- Together they tell us where the line is relative to the car.

**Visual:** Design System/assets/materials/line-tracker-module.png · [ASSET NEEDED: top-down line track with the car centered on the tape]

**Coach note:** Demo by hand: slide the car so only the middle/left/right sensor is over the tape.

---

## Slide 5 — Three Sensors → One Number

**On screen**
- Pack three yes/no answers into **one number**: `Left×4 + Middle×2 + Right×1`.
- Read it in **binary** as three digits — `0b` *Left Middle Right*:

| Pattern | Binary | Meaning |
|---|---|---|
| Middle only | `0b010` | centered → go straight |
| Left only | `0b100` | drifting right → turn left a bit |
| Left + Middle | `0b110` | turn left harder |
| Right only | `0b001` | drifting left → turn right a bit |
| Middle + Right | `0b011` | turn right harder |

**Coach note:** This binary trick is the clever bit. Spend a minute here; it makes the code tiny.

---

## Slide 6 — Start the File: Imports

**On screen**
- New import: **`RPi.GPIO`** — lets us read the Pi's pins directly.
- We still drive with `Motor` from earlier lessons.

**Code (builds file · chunk 1/9):**
```python
"""Lesson 5: Line Follower.

Run this on the Raspberry Pi (the car). Put the car on a line track to test.
"""

import car_setup          # adds the car's code folders to the import path
import time

# RPi.GPIO lets us read the Pi's pins. Each IR sensor is wired to a pin
# that reads 1 (line) or 0 (floor).
import RPi.GPIO as GPIO

from motor import Motor          # driving wheels
```

**Coach note:** `import RPi.GPIO as GPIO` — the `as` gives it a short nickname. First time we read pins directly.

---

## Slide 7 — Settings: Sensor Pins

**On screen**
- Each sensor is plugged into a Pi pin (BCM numbering).
- Naming the pins makes the rest of the code readable.

**Code (builds file · chunk 2/9):**
```python
# ---- sensor pins (BCM numbering) ----
IR_LEFT = 14
IR_MIDDLE = 15
IR_RIGHT = 23
```

**Coach note:** "BCM" = one of the Pi's pin-numbering schemes. Students don't need the theory, just that these match the wiring.

---

## Slide 8 — Settings: Driving Speeds

**On screen**
- Each move is four wheel speeds (LF, LB, RF, RB) — same as L2.
- **Soft** turns nudge; **hard** turns swing harder when the car is more off-line.

**Code (builds file · chunk 3/9):**
```python
# ---- driving speeds (left-front, left-back, right-front, right-back) ----
FORWARD = (800, 800, 800, 800)
SOFT_LEFT = (-1500, -1500, 2500, 2500)
HARD_LEFT = (-2000, -2000, 4000, 4000)
SOFT_RIGHT = (2500, 2500, -1500, -1500)
HARD_RIGHT = (4000, 4000, -2000, -2000)
STOP = (0, 0, 0, 0)
```

**Coach note:** Soft vs hard is the "how far off am I?" response. Tunable in Try It Yourself.

---

## Slide 9 — `setup()`: Tell the Pi the Pins Are Inputs

**On screen**
- Create the motor, then set the IR pins as **inputs** (we READ them).
- `GPIO.BCM` picks the pin-numbering scheme.

**Code (builds file · chunk 4/9):**
```python
motor = None


def setup():
    """Create the motor and set the sensor pins as inputs."""
    global motor
    motor = Motor()
    GPIO.setwarnings(False)      # hide harmless "pin already in use" warnings
    GPIO.setmode(GPIO.BCM)       # use BCM pin numbering
    GPIO.setup(IR_LEFT, GPIO.IN)     # IN = we READ these pins
    GPIO.setup(IR_MIDDLE, GPIO.IN)
    GPIO.setup(IR_RIGHT, GPIO.IN)
```

**Coach note:** `GPIO.IN` = data flows from sensor → Pi. Contrast with outputs that the Pi controls.

---

## Slide 10 — `read_sensors()`: Combine the Three Readings

**On screen**
- Read each pin (1 or 0), then pack them into one number.
- `Left×4 + Middle×2 + Right×1` — exactly the binary trick from slide 5.

**Code (builds file · chunk 5/9):**
```python
def read_sensors():
    """Return one number describing which sensors see the line."""
    left = GPIO.input(IR_LEFT)       # 1 if it sees the line, else 0
    middle = GPIO.input(IR_MIDDLE)
    right = GPIO.input(IR_RIGHT)
    return left * 4 + middle * 2 + right
```

**Coach note:** Tie each `GPIO.input` back to a sensor under the car.

---

## Slide 11 — `choose_move()`: Pick a Move for Each Pattern

**On screen**
- Match the sensor number to a steering move.
- The `0b...` values show the three sensors as three digits (L M R).
- Anything else (all three, or none) → **stop**.

**Code (builds file · chunk 6/9):**
```python
def choose_move(sensors):
    """Pick wheel speeds for the current sensor pattern."""
    if sensors == 0b010:          # middle only -> centred, go straight
        return FORWARD
    if sensors == 0b100:          # left only -> turn left a bit
        return SOFT_LEFT
    if sensors == 0b110:          # left + middle -> turn left harder
        return HARD_LEFT
    if sensors == 0b001:          # right only -> turn right a bit
        return SOFT_RIGHT
    if sensors == 0b011:          # middle + right -> turn right harder
        return HARD_RIGHT
    return STOP                   # all three, or none -> stop
```

**Coach note:** Read each `0b` value out loud as L-M-R so the pattern clicks.

---

## Slide 12 — `loop()`: Sense and Steer, Fast

**On screen**
- Read → decide → drive, over and over, very quickly.
- The short pause keeps steering smooth.

**Code (builds file · chunk 7/9):**
```python
def loop():
    """Read the sensors and drive, over and over."""
    while True:
        sensors = read_sensors()         # where is the line?
        move = choose_move(sensors)      # how should we drive?
        motor.setMotorModel(move[0], move[1], move[2], move[3])
        time.sleep(0.02)                 # short pause keeps steering smooth
```

**Coach note:** Same Sense→Think→Act loop as L4, just faster (20 ms). Speed matters for smooth lines.

---

## Slide 13 — Clean Up: `destroy()`

**On screen**
- Stop the wheels, then **release the pins** with `GPIO.cleanup()`.
- Releasing pins lets other programs use them next time.

**Code (builds file · chunk 8/9):**
```python
def destroy():
    """Stop the wheels and release the pins."""
    if motor is not None:
        motor.setMotorModel(0, 0, 0, 0)
    GPIO.cleanup()               # hand the pins back
```

**Coach note:** `GPIO.cleanup()` is new — it's the polite "I'm done with the pins" step.

---

## Slide 14 — The Main Block

**On screen**
- The same safe wrapper: setup, loop, and always `destroy()`.

**Code (builds file · chunk 9/9):**
```python
if __name__ == "__main__":
    try:
        setup()
        loop()
    except KeyboardInterrupt:
        pass
    finally:
        destroy()
```

**Coach note:** Students should recognize this instantly by now.

---

## Slide 15 — We Built the Whole File 🎉

**On screen**
- Complete `lesson_5_line_follower.py`:
  - imports → pins → speeds → `setup()` → `read_sensors()` → `choose_move()` → `loop()` → `destroy()` → main

**Visual:** Design System/assets/icons/success.png

**Coach note:** Highlight how small `choose_move` is thanks to the binary trick.

---

## Slide 16 — Run It

**On screen**
- Put the car on a **line track** (black tape on a light floor), then on the **Pi**:
```sh
cd smartcar2026/Code/User
python3 lesson_5_line_follower.py
```
- It should drive along the line. **Ctrl+C** to stop.

**Visual:** Design System/assets/icons/terminal.png

**Coach note:** A simple oval/loop of tape works best. Make sure the line is dark and the floor is light.

---

## Slide 17 — Try It Yourself

**On screen**
- Speed up `FORWARD` for a faster lap — does it still hold the line?
- Make `HARD_LEFT` / `HARD_RIGHT` stronger for sharp corners.
- **Debug move:** `print(sensors)` inside `loop()` and watch the numbers as you move the car by hand.
- **Challenge:** make a sharper line track and tune the speeds to handle it.

**Coach note:** The `print(sensors)` tip is the best way for students to *see* the binary numbers change.

---

## Slide 18 — Troubleshooting

**On screen**
- Car ignores the line → check the IR sensors face the floor; line dark enough?
- Steers the wrong way → Left/Right sensors may be swapped; check pins `14 / 15 / 23`.
- Stops constantly → it's reading "all" or "none"; adjust sensor height or track contrast.
- "Pin already in use" warning → harmless; `GPIO.setwarnings(False)` hides it.

**Visual:** Design System/assets/icons/error.png + Design System/assets/icons/warning.png

**Coach note:** Sensor height above the floor matters a lot. A few millimeters can fix erratic reads.

---

## Slide 19 — Recap & What's Next

**On screen**
- 🎉 **We are halfway through the course!** Five lessons down — great momentum.
- You read the Pi's pins with **RPi.GPIO** and followed a line.
- You used a **binary trick** to turn three sensors into one decision.
- **Next — Lesson 6:** give the car a **camera** and stream live video over Wi-Fi.

**Visual:** Design System/assets/main/smart-car-full.png

**Coach note:** Celebrate the halfway milestone (see the parent/guardian update in the hidden coach notes). Tease the camera — the course shifts from driving to *seeing*.

---

<!-- HIDDEN — COACH NOTES (do not show to students) -->

## Coach Notes (hidden)

**Timing (~45–50 min):** Intro + concepts (1–5) ~12 min · build (6–15) ~18 min · run + experiment (16–17) ~12 min · troubleshoot/recap (18–19) ~6 min.

**Halfway milestone — parent/guardian update**
- You are halfway through this course. Make sure to send each student's parents or
  guardians a progress update: note some good things about their child, and what
  they could work on (if anything). Make it personal!

**Before class**
- Lay out one or more tape line tracks (black electrical tape on light flooring works well).
- Cars charged; spare batteries handy.
- Test-run one car on the track yourself first.

**Most common failures**
1. Sensor height / floor contrast → erratic reads.
2. Left/Right swapped or wrong pin numbers.
3. Too fast for tight corners.
4. Low battery.

**Teaching tips**
- Spend real time on the binary number trick (slide 5) — it's the conceptual core.
- Use `print(sensors)` live to make the abstract numbers concrete.
- Connect the fast `loop()` to L4's Sense→Think→Act.

**Assets to source (flagged in deck)**
- Top-down line-track diagram with the car centered on the tape — slide 4.
