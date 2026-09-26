# Lesson 4 — Autonomous Modes

**Organization:** AI Code Academy · aicodeacademy.com
**Course:** Machine Learning with Raspberry Pi & Smart Car (Level 3)
**Lesson:** 4 — Autonomous Modes
**Source file:** ../Code/User/lesson_4_autonomous_modes.py
**Runs on:** Raspberry Pi (the car) · drive on the floor with space · no `sudo` needed

> Layout/outline doc. Each `---` block below = one slide. Code blocks are copied
> from the real lesson file and grow chunk-by-chunk until the whole script exists.

---

## Slide 1 — Title

**On screen**
- **Lesson 4 — Autonomous Modes**
- Machine Learning with Raspberry Pi & Smart Car (Level 3)
- AI Code Academy · aicodeacademy.com

**Visual:** Design System/assets/main/company-logo.png (corner) + Design System/assets/main/smart-car-full.png (hero)

**Coach note:** ~1 min. Today the car makes its own decisions. Make sure there's floor space.

---

## Slide 2 — Introduction

**On screen**
- So far *we* told the car exactly what to do.
- You've used **motors** (L2), **light + battery sensors** (L3), the **servo head** and **ultrasonic** (L1).
- Today the car uses those sensors to **drive itself** — no commands from us.

**Visual:** Design System/assets/main/smart-car-side-full.png

**Coach note:** Frame the jump: from remote control to autonomy. Quick recall of which sensor does what.

---

## Slide 3 — Our Goals

**On screen**
- Build a self-driving car with **two modes** (pick one with `DEMO_MODE`):
  - 💡 **M-Light** — drive toward the brightest light.
  - 📏 **M-Sonic** — look around and steer around obstacles.
- Learn the **Sense → Think → Act** loop that powers all robots.

**Visual:** Design System/assets/icons/car-black.png

**Coach note:** Decide as a class which mode to demo first (sonic is more reliable indoors).

---

## Slide 4 — Sense → Think → Act

**On screen**
- Every autonomous robot repeats three steps, fast:
  1. **Sense** — read the sensors (light or distance).
  2. **Think** — decide what to do with those numbers.
  3. **Act** — drive the motors.
- Our `loop()` does this over and over, many times a second.

**Visual:** Design System/assets/icons/technology.png

**Coach note:** This is the key idea of the whole lesson. Everything below is just filling in these three steps.

---

## Slide 5 — Start the File: Imports

**On screen**
- We pull in motors plus the sensors both modes might use.
- `from servo import Servo` — remember, the file is lowercase `servo.py`.

**Code (builds file · chunk 1/11):**
```python
"""Lesson 4: Autonomous Modes.

Run this on the Raspberry Pi (the car). Test on the floor with space to move!
"""

import car_setup          # adds the car's code folders to the import path
import time

from motor import Motor          # driving wheels
from adc import Adc              # light sensors (for "light" mode)
from servo import Servo          # turns the head (file is "servo.py")
from ultrasonic import Ultrasonic   # measures distance (for "sonic" mode)
```

**Coach note:** Callback to L1–L3 — they've met every one of these modules already.

---

## Slide 6 — Settings: Speed & Mode

**On screen**
- `DEMO_MODE` chooses which brain runs.
- Two speeds: gentle forward power, and a stronger turning power.

**Code (builds file · chunk 2/11):**
```python
# ---- settings you can change ----
DEMO_MODE = "sonic"       # "light" or "sonic"
DRIVE_SPEED = 1200        # forward power (0 = stop, up to 4095 = full)
TURN_SPEED = 1500         # turning power
```

**Coach note:** Keep speeds modest indoors. They'll tune these in "Try It Yourself".

---

## Slide 7 — M-Light: Follow the Light

**On screen**
- Two light sensors on ADC channels 0 and 1.
- **Lower voltage = more light.** So compare the two sides:
  - both bright → go straight
  - one side brighter → turn toward it
  - dim & even → wait

**Code (builds file · chunk 3/11):**
```python
# M-Light settings: light sensors on ADC channels 0 and 1.
# A LOWER voltage means MORE light is hitting that sensor.
LEFT_LIGHT = 0
RIGHT_LIGHT = 1
BRIGHT_ENOUGH = 2.99      # below this, both sides see light, so go forward
SIDE_DIFFERENCE = 0.15    # if one side is this much brighter, turn toward it
```

**Visual:** [ASSET NEEDED: light-sensor close-up + arrow toward a light source]

**Coach note:** The "lower = brighter" rule trips everyone up. Say it twice.

---

## Slide 8 — M-Sonic: Dodge Obstacles

**On screen**
- Use the head servo + ultrasonic to look **ahead, left, right**.
- Anything closer than `BLOCKED` cm counts as an obstacle.

**Code (builds file · chunk 4/11):**
```python
# M-Sonic settings: head angles to check, and what counts as "too close".
HEAD_LEFT = 30
HEAD_CENTER = 90
HEAD_RIGHT = 150
BLOCKED = 30              # closer than this (in cm) is an obstacle
```

**Visual:** Design System/assets/materials/electronic-parts/ultrasonic-sensor.png

**Coach note:** Connect head angles back to L1's servo sweep — same `setServoPwm("0", angle)` idea.

---

## Slide 9 — Build Only What You Need: `setup()`

**On screen**
- Both modes drive, so we always make the motor.
- Then we create **only** the sensors the chosen mode uses — the rest stay `None`.

**Code (builds file · chunk 5/11):**
```python
# ---- car parts (created in setup) ----
motor = None
adc = None
servo = None
ultrasonic = None


def setup():
    """Create just the hardware the chosen DEMO_MODE needs."""
    global motor, adc, servo, ultrasonic
    motor = Motor()                      # both modes need to drive
    if DEMO_MODE == "light":
        adc = Adc()                      # light mode needs the light sensors
    else:
        servo = Servo()                  # sonic mode needs head + sensor
        ultrasonic = Ultrasonic()
        servo.setServoPwm("0", HEAD_CENTER)   # start looking straight ahead
```

**Coach note:** Point out the `if/else` — clean code only builds what it needs.

---

## Slide 10 — `light_step()`: Steer Toward Light

**On screen**
- One pass of the **Sense → Think → Act** loop for light mode.
- Read both sensors, compare, drive.

**Code (builds file · chunk 6/11):**
```python
def light_step():
    """Read both sensors and steer toward the brighter side."""
    left = adc.recvADC(LEFT_LIGHT)
    right = adc.recvADC(RIGHT_LIGHT)
    # Remember: smaller voltage = brighter.
    if left < BRIGHT_ENOUGH and right < BRIGHT_ENOUGH:
        motor.setMotorModel(DRIVE_SPEED, DRIVE_SPEED, DRIVE_SPEED, DRIVE_SPEED)
    elif left - right > SIDE_DIFFERENCE:
        motor.setMotorModel(-TURN_SPEED, -TURN_SPEED, TURN_SPEED, TURN_SPEED)
    elif right - left > SIDE_DIFFERENCE:
        motor.setMotorModel(TURN_SPEED, TURN_SPEED, -TURN_SPEED, -TURN_SPEED)
    else:
        motor.setMotorModel(0, 0, 0, 0)
```

**Coach note:** Walk through each branch as Sense/Think/Act. The turn tuples are the same trick as L2.

---

## Slide 11 — `look()`: Aim & Measure

**On screen**
- A small helper: point the head at an angle, wait for it to arrive, then measure.
- Reused three times in sonic mode (ahead, left, right).

**Code (builds file · chunk 7/11):**
```python
def look(angle):
    """Turn the head to an angle and measure the distance there (cm)."""
    servo.setServoPwm("0", angle)
    time.sleep(0.3)                      # let the head finish moving
    return ultrasonic.get_distance()
```

**Coach note:** Helper functions keep the next step short and readable — good habit to highlight.

---

## Slide 12 — `sonic_step()`: Look, Then Turn

**On screen**
- If the path ahead is clear → drive forward.
- If blocked → stop, look left & right, turn toward more open space.

**Code (builds file · chunk 8/11):**
```python
def sonic_step():
    """Look ahead; if blocked, turn toward the side with more room."""
    ahead = look(HEAD_CENTER)
    if ahead > BLOCKED:
        motor.setMotorModel(DRIVE_SPEED, DRIVE_SPEED, DRIVE_SPEED, DRIVE_SPEED)
        return

    motor.setMotorModel(0, 0, 0, 0)      # something ahead: stop and look
    left = look(HEAD_LEFT)
    right = look(HEAD_RIGHT)
    servo.setServoPwm("0", HEAD_CENTER)  # head back to the middle
    if left > right:
        motor.setMotorModel(-TURN_SPEED, -TURN_SPEED, TURN_SPEED, TURN_SPEED)
    else:
        motor.setMotorModel(TURN_SPEED, TURN_SPEED, -TURN_SPEED, -TURN_SPEED)
    time.sleep(0.5)                      # turn briefly before re-checking
```

**Coach note:** `return` early = "clear road, nothing else to do." Highlight that pattern.

---

## Slide 13 — `loop()`: Run the Chosen Mode

**On screen**
- Repeat the right single step forever, with a tiny pause.

**Code (builds file · chunk 9/11):**
```python
def loop():
    """Repeat the chosen mode's single step over and over."""
    while True:
        if DEMO_MODE == "light":
            light_step()
        else:
            sonic_step()
        time.sleep(0.05)                 # a tiny pause so the loop isn't frantic
```

**Coach note:** This is the Sense→Think→Act loop made real. Connect back to slide 4.

---

## Slide 14 — Clean Up: `destroy()`

**On screen**
- Stop driving, re-center the head, close the sensor connection.
- Guard with `is not None` since unused parts were never created.

**Code (builds file · chunk 10/11):**
```python
def destroy():
    """Stop the car and tidy up the hardware we used."""
    if motor is not None:
        motor.setMotorModel(0, 0, 0, 0)       # stop driving
    if servo is not None:
        servo.setServoPwm("0", HEAD_CENTER)   # face forward again
    if adc is not None:
        adc.i2cClose()                        # close the sensor connection
```

**Coach note:** Same safety habit as every lesson — leave the car stopped.

---

## Slide 15 — The Main Block

**On screen**
- The familiar `try / except KeyboardInterrupt / finally: destroy()` wrapper.

**Code (builds file · chunk 11/11):**
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

**Coach note:** Fourth time seeing this — students should predict it now.

---

## Slide 16 — We Built the Whole File 🎉

**On screen**
- Complete `lesson_4_autonomous_modes.py`:
  - imports → settings → `setup()` → `light_step()` / `look()` / `sonic_step()` → `loop()` → `destroy()` → main
- One file, two self-driving brains.

**Visual:** Design System/assets/icons/success.png

**Coach note:** Scroll the file; point out how `loop()` picks which "brain" runs.

---

## Slide 17 — Run It

**On screen**
- Set `DEMO_MODE` to `"sonic"` or `"light"`, then on the **Pi**:
```sh
cd smartcar2026/Code/User
python3 lesson_4_autonomous_modes.py
```
- **Give it floor space.** For light mode, use a phone flashlight. **Ctrl+C** to stop.

**Visual:** Design System/assets/icons/warning.png + Design System/assets/icons/terminal.png

**Coach note:** Clear a driving area first. Watch fingers and table edges.

---

## Slide 18 — Try It Yourself

**On screen**
- Lower `DRIVE_SPEED` / `TURN_SPEED` if it's too wild.
- Change `BLOCKED` (sonic) — does it stop sooner or later?
- Change `SIDE_DIFFERENCE` (light) — more or less twitchy?
- **Challenge:** beep or flash an LED when it spots an obstacle (reuse L1/L2!).

**Coach note:** The LED/beep challenge connects back to earlier lessons — great for fast finishers.

---

## Slide 19 — Troubleshooting

**On screen**
- Turns the wrong way in light mode → remember **lower voltage = brighter**; check left/right wiring.
- Spins in circles (sonic) → `BLOCKED` too high, or head not centered; lower speeds.
- Won't move → battery low, or `DEMO_MODE` set to a mode whose sensors aren't connected.
- Head doesn't turn → servo on channel `"0"`; give it time (`look()` waits 0.3 s).

**Visual:** Design System/assets/icons/error.png + Design System/assets/icons/warning.png

**Coach note:** Most "weird driving" today is low battery or too-high speed. Check those first.

---

## Slide 20 — Recap & What's Next

**On screen**
- You built the **Sense → Think → Act** loop and two autonomous modes.
- The car now reacts to **light** and **obstacles** on its own.
- **Next — Lesson 5:** follow a line on the floor using the infrared sensors.

**Visual:** Design System/assets/main/smart-car-full.png

**Coach note:** Tease line following — a third kind of "sense and steer".

---

<!-- HIDDEN — COACH NOTES (do not show to students) -->

## Coach Notes (hidden)

**Timing (~45–50 min):** Intro + concepts (1–4) ~10 min · build (5–16) ~20 min · run + experiment (17–18) ~12 min · troubleshoot/recap (19–20) ~6 min.

**Before class**
- Clear floor space; cars charged.
- Have a flashlight/phone light ready for M-Light.
- Decide a default mode (sonic is usually more reliable indoors).

**Safety**
- Cars drive on the floor today — keep them away from stairs and feet.
- Start at low speed; raise only if stable.

**Most common failures**
1. Low battery → erratic or no driving.
2. Speeds too high for the room.
3. M-Light direction confusion (lower voltage = brighter).
4. Running a mode whose sensors aren't wired/connected.

**Teaching tips**
- Keep returning to Sense → Think → Act; map each function to a step.
- Reuse the L2 turning tuples and L3 ADC reads to show continuity.

**Assets to source (flagged in deck)**
- Light-sensor close-up with an arrow toward a light source — slide 7.
