# Lesson 1 — Components

**Organization:** AI Code Academy · aicodeacademy.com
**Course:** Machine Learning with Raspberry Pi & Smart Car (Level 3)
**Lesson:** 1 — Components
**Source file:** ../Code/User/lesson_1_components.py
**Runs on:** Raspberry Pi (the car) · **run with `sudo`** (the LED strip needs root)

> Layout/outline doc. Each `---` block below = one slide. Code blocks are copied
> from the real lesson file and grow chunk-by-chunk until the whole script exists.

---

## Slide 1 — Title

**On screen**
- **Lesson 1 — Components**
- Machine Learning with Raspberry Pi & Smart Car (Level 3)
- AI Code Academy · aicodeacademy.com

**Visual:** Design System/assets/main/company-logo.png (top corner) + Design System/assets/main/smart-car-full.png (hero)

**Coach note:** ~1 min. Welcome students, confirm everyone's car is powered and they can open a terminal on the Pi.

---

## Slide 2 — Introduction

**On screen**
- This is a **Level 3** course: we write real Python that drives real hardware.
- Today is our first time talking to the car's parts directly from code.
- No machine learning yet — first we learn the body of the robot.

**Visual:** Design System/assets/main/smart-car-side-full.png

**Coach note:** Set expectations: by the end of today they'll run their own program that lights, moves the head, and measures distance.

---

## Slide 3 — Our Goals

**On screen**
- One program — a **component tester** — that runs three mini-demos:
  1. 💡 **LEDs** flash red → green → blue
  2. 🔄 **Servo head** sweeps left ↔ right
  3. 📏 **Ultrasonic sensor** prints the distance in front of the car
- You'll build it one function at a time, then run the whole thing.

**Visual:** Design System/assets/icons/success.png

**Coach note:** Show the finished demo running first (if time) so they know the goal.

---

## Slide 4 — Meet the Three Components

**On screen**
- **RGB LEDs** — 8 colored lights on the board, controlled as one strip.
- **Servo (the head)** — a motor that turns to an exact angle. Holds the ultrasonic sensor.
- **Ultrasonic sensor** — the "eyes": sends a sound pulse and times the echo to measure distance.

**Visual:** three-up — Design System/assets/materials/smart-car-board.png (LEDs) · Design System/assets/materials/transmission-parts/servo-motor-set.png (servo) · Design System/assets/materials/electronic-parts/ultrasonic-sensor.png (ultrasonic)

**Coach note:** Have students physically point to each part on their own car.

---

## Slide 5 — How Every Lesson Script Is Shaped

**On screen**
- All our lesson programs follow the same simple shape:
  - **`setup()`** — turn the parts on / get them ready (runs once)
  - **demo functions** — the actual work (`show_leds`, `sweep_head`, …)
  - **`destroy()`** — leave the car safe: lights off, head centered (always runs)
- Learn this shape once and every future lesson feels familiar.

**Coach note:** This "setup → do work → clean up" skeleton repeats in Lessons 2 and 3 — call it out now.

---

## Slide 6 — `car_setup.py`: The Magic Import

**On screen**
- The car's hardware code lives in another folder (`Code/Server`).
- `import car_setup` (always **first**) quietly tells Python where to find it.
- After that, short imports like `from led import Led` just work — no long paths.
- You never edit `car_setup.py`; you only import it.

**Code (builds file · chunk 1/9):**
```python
"""Lesson 1: Components.

Run this on the Raspberry Pi (the car).
"""

# car_setup must come first: it tells Python where the car's modules live.
import car_setup          # adds the car's code folders to the import path
import time               # lets us pause the program with time.sleep()
```

**Coach note:** Reassure them this is plumbing — they just type it once at the top. It must come *before* the hardware imports.

---

## Slide 7 — ⚠️ The Pi Is Case-Sensitive

**On screen**
- On the Raspberry Pi, file names must match **exactly**.
- The file is `servo.py` (lowercase) → `from servo import Servo` ✅
- `from Servo import Servo` works on Windows but **fails on the Pi** ❌
- Rule: import name = real filename, character for character.

**Code (builds file · chunk 2/9):**
```python
# Each module controls one piece of hardware.
from led import Led
from servo import Servo          # the file is "servo.py" (lowercase!)
from ultrasonic import Ultrasonic
```

**Coach note:** This is the #1 "works on my laptop, breaks on the Pi" bug. Make them notice the lowercase `servo`.

---

## Slide 8 — Settings: A Menu Switch + the LED Bitmask

**On screen**
- `DEMO_MODE` lets you run one part at a time while learning.
- The 8 LEDs are picked with a **bitmask** — one on/off switch per LED.
- `0xFF` is the number 255 = all 8 switches on. `0x00` = all off.

**Code (builds file · chunk 3/9):**
```python
# ---- settings you can change ----
DEMO_MODE = "all"         # "leds", "servo", "distance", or "all"

# 0xFF = 255 = all 8 LEDs on at once. 0x00 = all off.
LED_ALL = 0xFF
LED_OFF = 0x00
```

**Coach note:** Don't over-explain hex/bitmask — "0xFF means all of them" is enough for now.

---

## Slide 9 — Settings: Colors and Head Angles

**On screen**
- Colors are `(red, green, blue)`, each value `0–255`.
- Servo angles are in **degrees**: `90` = straight ahead, smaller = left, larger = right.

**Code (builds file · chunk 4/9):**
```python
# Colours are (red, green, blue), each 0–255.
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)

# Servo head positions in degrees. 90 = straight ahead.
HEAD_LEFT = 30
HEAD_CENTER = 90
HEAD_RIGHT = 150

SERVO_DEMO_SECONDS = 5    # how long the head sweep runs
```

**Visual:** [ASSET NEEDED: simple head-angle diagram showing 30° / 90° / 150°]

**Coach note:** Tie colors back to the (R,G,B) idea they may know from art/screens.

---

## Slide 10 — Empty Boxes for Our Parts + `setup()`

**On screen**
- We name the parts now and set them to `None` (empty) — created later in one place.
- `setup()` fills them in and faces the head straight ahead.
- `global` means "use the variables from above, don't make new ones."

**Code (builds file · chunk 5/9):**
```python
# ---- car parts (created in setup) ----
led = None
servo = None
ultrasonic = None


def setup():
    """Create the hardware objects once, before the demo starts."""
    global led, servo, ultrasonic
    led = Led()                  # control the LED strip
    servo = Servo()              # control the head servo
    ultrasonic = Ultrasonic()    # control the distance sensor
    servo.setServoPwm("0", HEAD_CENTER)   # face straight ahead to start
```

**Coach note:** Point out `setServoPwm("0", ...)` — channel is the **string** `"0"`, not the number 0. Easy mistake.

---

## Slide 11 — Demo 1: Light the LEDs

**On screen**
- Loop through red, green, blue — hold each for 1 second — then turn off.
- `ledIndex(which_leds, r, g, b)` sets the chosen LEDs to a color.
- `(0, 0, 0)` means "no color" = off.

**Code (builds file · chunk 6/9):**
```python
def show_leds():
    """Light all LEDs red, then green, then blue, then off."""
    print("LED demo: red, green, blue, then off")
    for colour in (RED, GREEN, BLUE):
        red, green, blue = colour              # unpack the (r,g,b) tuple
        led.ledIndex(LED_ALL, red, green, blue)   # set every LED
        time.sleep(1)                          # hold for 1 second
    led.ledIndex(LED_ALL, 0, 0, 0)             # all off
```

**Visual:** [ASSET NEEDED: close-up photo of the car's LEDs lit a solid color]

**Coach note:** Run just this part live (`DEMO_MODE = "leds"`) — instant payoff.

---

## Slide 12 — Demo 2: Sweep the Head

**On screen**
- Move the head through left → center → right → center, over and over.
- Stop after `SERVO_DEMO_SECONDS`, then re-center.
- We check the clock each move so it stops on time.

**Code (builds file · chunk 7/9):**
```python
def sweep_head():
    """Sweep left/right for SERVO_DEMO_SECONDS, then re-center."""
    print("Servo demo: sweeping for", SERVO_DEMO_SECONDS, "seconds")
    end_time = time.time() + SERVO_DEMO_SECONDS
    while time.time() < end_time:
        for angle in (HEAD_LEFT, HEAD_CENTER, HEAD_RIGHT, HEAD_CENTER):
            if time.time() >= end_time:
                break
            servo.setServoPwm("0", angle)      # channel "0" = left/right servo
            time.sleep(0.6)                    # give the servo time to move
    servo.setServoPwm("0", HEAD_CENTER)        # finish facing forward
```

**Coach note:** Warn them the servo can buzz/jitter if power is low — normal-ish, covered in troubleshooting.

---

## Slide 13 — Demo 3: Read the Distance

**On screen**
- `read_distance()` asks the sensor once and returns centimeters.
- `loop()` keeps printing the distance every half-second until you press **Ctrl+C**.
- `while True:` means "repeat forever" (until we stop it).

**Code (builds file · chunk 8/9):**
```python
def read_distance():
    """Return the distance in front of the car, in centimetres."""
    return ultrasonic.get_distance()


def loop():
    """Print the distance until you press Ctrl+C."""
    print("Distance demo: press Ctrl+C to stop")
    while True:
        distance = read_distance()
        print("Distance ahead:", distance, "cm")
        time.sleep(0.5)
```

**Coach note:** Have students wave a hand in front of the sensor and watch the number drop.

---

## Slide 14 — Clean Up: `destroy()`

**On screen**
- Always leave the car safe: LEDs **off**, head **centered**.
- Each part might still be `None` if setup failed, so we check before using it.

**Code (builds file · chunk 9a):**
```python
def destroy():
    """Leave the car in a safe, tidy state when the program ends."""
    if led is not None:
        led.ledIndex(LED_ALL, 0, 0, 0)         # LEDs off
    if servo is not None:
        servo.setServoPwm("0", HEAD_CENTER)    # center the head
```

**Coach note:** Connect "clean up" to real robots — you never want hardware left in a weird state.

---

## Slide 15 — The Main Block: Tying It Together

**On screen**
- `if __name__ == "__main__":` = "only run this when I start this file directly."
- `try / except / finally`:
  - **try** runs the chosen demos
  - **except** catches **Ctrl+C** so there's no scary error
  - **finally** *always* runs `destroy()` — even after an error

**Code (builds file · chunk 9b):**
```python
if __name__ == "__main__":
    try:
        setup()
        if DEMO_MODE in ("leds", "all"):
            show_leds()
        if DEMO_MODE in ("servo", "all"):
            sweep_head()
        if DEMO_MODE in ("distance", "all"):
            loop()
        print("Component testing was completed.")
    except KeyboardInterrupt:
        pass                 # Ctrl+C: shut down quietly
    finally:
        destroy()            # always leave the car safe
```

**Coach note:** `finally` is the key idea — clean-up runs no matter how the program ends.

---

## Slide 16 — We Built the Whole File 🎉

**On screen**
- Top to bottom, you now have a complete `lesson_1_components.py`:
  - imports → settings → `setup()` → `show_leds()` / `sweep_head()` / `loop()` → `destroy()` → main block
- Same shape we'll reuse all course long.

**Visual:** Design System/assets/icons/success.png

**Coach note:** Quick scroll through the full file on screen so they see the assembled result.

---

## Slide 17 — Where to Write & Save: Thonny + Code/User

**On screen**
- Write this lesson in **Thonny** — the Pi's built-in Python editor (already installed on Raspberry Pi OS).
- Open it on the Pi desktop (over **VNC**): **Menu → Programming → Thonny**.
- **Save the file in** `smartcar2026/Code/User` — the same folder as `car_setup.py`, so the imports resolve.
- Keep the filename `lesson_1_components.py`.
- Our workflow all course long: **edit & save in Thonny → run from the terminal**.
- We don't use Thonny's green **Run** button for these lessons — they need `sudo` (root), which the terminal handles cleanly.

**Visual:** Design System/assets/icons/thonny-logo.png + Design System/assets/icons/terminal.png

**Coach note:** Thonny is pre-installed on Raspberry Pi OS and runs on the Pi desktop (reach it over VNC). Students **edit and save** in Thonny but **run from the terminal**, because the LED strip needs `sudo`. Stress saving into `Code/User` next to `car_setup.py` — saving elsewhere is why imports fail. This Thonny-edits / terminal-runs split repeats every Pi lesson.

---

## Slide 18 — Run It

**On screen**
- You saved the file in `Code/User` with Thonny — now switch to the **Pi's terminal** to run it:
```sh
cd smartcar2026/Code/User
sudo python3 lesson_1_components.py
```
- Why `sudo`? The LED strip library needs root to reach the hardware.
- Expected: LEDs cycle colors → head sweeps → distance prints. **Ctrl+C** to stop.

**Visual:** Design System/assets/icons/terminal.png + Design System/assets/icons/raspberry-pi.png

**Coach note:** ~5 min hands-on. Circulate. Everyone should see at least the LEDs change.

---

## Slide 19 — Try It Yourself

**On screen**
- Change `DEMO_MODE` to `"leds"`, `"servo"`, or `"distance"` to run one part.
- Add your own color (e.g. purple = `(160, 0, 255)`).
- Make the head sweep wider or slower (`HEAD_LEFT`, `time.sleep`).
- **Challenge:** light the LEDs *red* when something is closer than 15 cm.

**Coach note:** The red-when-close challenge previews the sensor→action logic in later lessons. Help fast finishers attempt it.

---

## Slide 20 — Troubleshooting

**On screen**
- `Can't open /dev/mem` / `mmap() failed` → you forgot **`sudo`**.
- `ModuleNotFoundError: No module named 'Servo'` → casing! It's `from servo import Servo`.
- Head buzzes / jitters → low battery or it's fighting a wall — check power, give it room.
- No distance / weird numbers → sensor wires loose, or pointed at a soft/angled surface.

**Visual:** Design System/assets/icons/error.png + Design System/assets/icons/warning.png

**Coach note:** Casing + missing `sudo` cover ~90% of failures today. Check those first.

---

## Slide 21 — Recap & What's Next

**On screen**
- You drove **three components** from one Python program.
- You learned the **setup → work → destroy** skeleton and why we `import car_setup` first.
- **Next — Lesson 2:** make the wheels move, and learn how the car's **commands** travel from a client to the server.

**Visual:** Design System/assets/main/smart-car-full.png

**Coach note:** End on energy — tomorrow it actually drives. Remind them to power down safely.

---

<!-- HIDDEN — COACH NOTES (do not show to students) -->

## Coach Notes (hidden)

**Timing (~45–50 min):** Intro/concepts (slides 1–7) ~10 min · build the code (8–16) ~20 min · save + run + experiment (17–19) ~12 min · troubleshooting/recap (20–21) ~6 min.

**Before class**
- Charge cars; low battery is the cause of most servo/LED weirdness.
- Confirm every student can open a terminal on the Pi and `cd smartcar2026/Code/User`.
- Pre-run the file yourself once to confirm the kit works.

**Most common failures (in order)**
1. Missing `sudo` → `Can't open /dev/mem`.
2. Import casing (`from servo import Servo`, lowercase file).
3. `car_setup` not imported first → `ModuleNotFoundError` on the hardware modules.
4. File saved outside `Code/User` (Thonny default) → `car_setup`/module imports fail. Save next to `car_setup.py`.
5. Servo channel passed as `0` (int) instead of `"0"` (string).

**Safety**
- LEDs are bright — fine, but tell students not to stare close-up.
- Keep fingers clear of the head while the servo sweeps.

**Teaching tips**
- Demo the finished program first (slide 3) so students have a target.
- Build live, typing each chunk, rather than pasting the whole file.
- Emphasize the `setup → work → destroy` shape — it returns every lesson.

**Assets to source (flagged in deck)**
- Head-servo angle diagram (30° / 90° / 150°) — slide 9.
- Close-up photo of the car's LEDs lit a solid color — slide 11.
