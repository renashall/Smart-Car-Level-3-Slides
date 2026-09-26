# Lesson 3 — ADC & Multithreading

**Organization:** AI Code Academy · aicodeacademy.com
**Course:** Machine Learning with Raspberry Pi & Smart Car (Level 3)
**Lesson:** 3 — ADC & Multithreading
**Source file:** ../Code/User/lesson_3_adc_multithreading.py
**Runs on:** Raspberry Pi (the car) · `sudo` not required, but fine

> Layout/outline doc. Each `---` block below = one slide. Code blocks are copied
> from the real lesson file and grow chunk-by-chunk until the whole script exists.

---

## Slide 1 — Title

**On screen**
- **Lesson 3 — ADC & Multithreading**
- Machine Learning with Raspberry Pi & Smart Car (Level 3)
- AI Code Academy · aicodeacademy.com

**Visual:** Design System/assets/main/company-logo.png (corner) + Design System/assets/main/smart-car-full.png (hero)

**Coach note:** ~1 min. Two big ideas today: reading analog sensors, and doing two things at once.

---

## Slide 2 — Introduction

**On screen**
- Last time: drove the wheels, beeped the buzzer, and built **command strings** (`CMD_MOTOR#...`).
- We kept the **`setup()` → work → `destroy()`** skeleton.
- Today the car will **read its own sensors** and **watch its battery in the background**.

**Visual:** Design System/assets/main/smart-car-side-full.png

**Coach note:** Verbal check: "what does the `#` do in a command string?"

---

## Slide 3 — Our Goals

**On screen**
- A program that:
  - keeps printing the **two light sensors** (left & right), and
  - at the same time, runs a **battery watchdog** that beeps when power gets low.
- Two loops running **at once** = multithreading.

**Visual:** Design System/assets/icons/full-battery.png + Design System/assets/icons/low-battery.png

**Coach note:** Emphasize "at the same time" — that's the new concept, not just reading sensors.

---

## Slide 4 — What Is an ADC?

**On screen**
- Sensors like light and battery give a smooth **analog voltage**.
- Computers only understand **digital numbers**.
- The **ADC** (Analog-to-Digital Converter) translates voltage → number.
- We read it with `adc.recvADC(channel)`, which returns **volts**.

**Visual:** Design System/assets/icons/technology.png

**Coach note:** Analogy: a dimmer switch (smooth) vs a light switch (on/off). ADC reads the dimmer's position as a number.

---

## Slide 5 — The Sensors We'll Read

**On screen**
- The ADC has numbered inputs called **channels**.
- Channel **0** → left light sensor (photoresistor)
- Channel **1** → right light sensor
- Channel **2** → battery
- "Read a sensor" = "read its channel number."

**Visual:** [ASSET NEEDED: close-up of the two photoresistors / light sensors on the board]

**Coach note:** Have students find the two little light sensors on their board.

---

## Slide 6 — Battery Math

**On screen**
- The ADC only sees **one third** of the battery voltage → multiply the reading by **3**.
- Healthy ≈ 8 V. Warnings:
  - `7.0 V` or lower → **beep twice** (low)
  - `6.8 V` or lower → **beep four times** (critical — charge now)
- Rough percent: map `7.0 V → 0%` and `8.4 V → 100%`.

**Visual:** Design System/assets/materials/18650-batteries.png + Design System/assets/icons/low-battery.png

**Coach note:** Tie to real life: phones do the same voltage→percent estimate.

---

## Slide 7 — What Is Multithreading?

**On screen**
- A **thread** is a separate line of work running at the same time as the rest.
- Today: the **main thread** prints light readings, while a **second thread** watches the battery.
- Both happen at once — neither waits for the other.

**Visual:** [ASSET NEEDED: simple "two threads running side by side" diagram]

**Coach note:** Analogy: cooking dinner (main) while a timer watches the oven (background thread).

---

## Slide 8 — Threads, Daemons & a Stop Flag

**On screen**
- **daemon thread** = allowed to stop automatically when the main program ends (won't hold it open).
- **`Event`** = a simple on/off flag we flip to tell the thread "time to stop."
- Clean shutdown matters so we don't leave a thread running or the ADC half-open.

**Coach note:** Don't go deep on OS theory — "daemon = quits with the program" and "Event = a stop switch" is enough.

---

## Slide 9 — Start the File: Imports

**On screen**
- `car_setup` first, then `time`.
- `Thread` and `Event` come from Python's built-in `threading`.
- Then the ADC and the buzzer (for the low-battery beep).

**Code (builds file · chunk 1/12):**
```python
"""Lesson 3: Multithreading and the ADC.

Run this on the Raspberry Pi (the car).
"""

import car_setup          # adds the car's code folders to the import path
import time

# A "thread" runs at the same time as the rest of the program.
# An "Event" is a simple on/off flag used to tell the thread to stop.
from threading import Thread, Event

from adc import Adc           # reads sensor voltages
from buzzer import Buzzer     # the beeper, for the low-battery warning
```

**Coach note:** `Thread, Event` are standard Python, not car-specific — point that out.

---

## Slide 10 — Settings: The ADC Channels

**On screen**
- Give the channel numbers friendly names so the code reads clearly.

**Code (builds file · chunk 2/12):**
```python
# ---- ADC channels ----
LEFT_LIGHT = 0
RIGHT_LIGHT = 1
BATTERY = 2               # this reading × 3 = the real pack voltage
```

**Coach note:** Naming channels (instead of using bare 0/1/2) is a good-code habit worth praising.

---

## Slide 11 — Settings: Battery Thresholds

**On screen**
- Two warning levels, in volts.

**Code (builds file · chunk 3/12):**
```python
# ---- battery settings ----
LOW_BATTERY = 7.0         # volts: beep twice as a warning
CRITICAL_BATTERY = 6.8    # volts: beep four times, time to charge
```

**Coach note:** These are the numbers students will tweak in the "try it yourself" slide.

---

## Slide 12 — Empty Boxes + the Stop Flag

**On screen**
- Parts start as `None`; we also create the `stop_event` flag now.
- `Event()` starts **not set**; calling `.set()` later means "stop."

**Code (builds file · chunk 4/12):**
```python
# ---- car parts (created in setup) ----
adc = None
buzzer = None
stop_event = Event()      # starts "not set"; we set() it to stop the thread
battery_thread = None
```

**Coach note:** The flag exists before the thread that reads it — order matters.

---

## Slide 13 — `setup()`: Build & Start the Thread

**On screen**
- Create the sensors, then **make and start** the background thread.
- `target=monitor_battery` = "run that function in the thread."
- `daemon = True` = quit with the program. `.start()` actually launches it.

**Code (builds file · chunk 5/12):**
```python
def setup():
    """Create sensors and start the background battery thread."""
    global adc, buzzer, battery_thread
    adc = Adc()
    buzzer = Buzzer()

    battery_thread = Thread(target=monitor_battery)
    battery_thread.daemon = True   # stops automatically when the program ends
    battery_thread.start()         # begin running monitor_battery() now
```

**Coach note:** Three steps for a thread: **make it** (`Thread(...)`), **set daemon**, **start it**. We write `monitor_battery` next.

---

## Slide 14 — Reading & Scaling the Battery

**On screen**
- Read channel 2, multiply by 3 for the real voltage.
- Turn voltage into a rough 0–100% (`int(...)` drops the decimals).

**Code (builds file · chunk 6/12):**
```python
def read_battery_voltage():
    """Read the battery channel and scale to the real pack voltage."""
    return adc.recvADC(BATTERY) * 3   # ADC sees 1/3 of the voltage


def battery_percent(voltage):
    """Turn a voltage into a rough 0–100% estimate."""
    return int((voltage - 7) / 1.40 * 100)   # 7.0 V ≈ 0%, 8.4 V ≈ 100%
```

**Coach note:** Optional: ask what `int(7.6 V)` maps to (~42%) to check understanding.

---

## Slide 15 — `beep()`: A Reusable Helper

**On screen**
- Beep on/off a chosen number of times.
- `_` is a throwaway name — we just want to repeat, we don't use the counter.

**Code (builds file · chunk 7/12):**
```python
def beep(times):
    """Beep the buzzer on and off a chosen number of times."""
    for _ in range(times):   # "_" = a name we don't actually use
        buzzer.run("1")      # on
        time.sleep(0.1)
        buzzer.run("0")      # off
        time.sleep(0.1)
```

**Coach note:** Reuses the buzzer `"1"`/`"0"` string idea from Lesson 2 — quick callback.

---

## Slide 16 — `monitor_battery()`: The Background Loop

**On screen**
- This is the function the second thread runs.
- Keeps checking until `stop_event` is set; beeps more the lower it gets.
- Waits 3 seconds between checks.

**Code (builds file · chunk 8/12):**
```python
def monitor_battery():
    """Runs in the background thread, checking the battery."""
    while not stop_event.is_set():        # loop until told to stop
        voltage = read_battery_voltage()
        print("Battery:", round(voltage, 2), "V (", battery_percent(voltage), "% )")
        if voltage <= CRITICAL_BATTERY:
            beep(4)
        elif voltage <= LOW_BATTERY:
            beep(2)
        time.sleep(3)                     # check again in 3 seconds
```

**Coach note:** `while not stop_event.is_set()` is how the thread knows when to quit — link it to `destroy()` coming up.

---

## Slide 17 — `loop()`: The Main Thread

**On screen**
- While the battery thread runs quietly, the main thread keeps printing the light sensors.
- `round(value, 2)` keeps it readable.

**Code (builds file · chunk 9/12):**
```python
def loop():
    """The MAIN thread: keep printing the two light readings."""
    while True:
        left = adc.recvADC(LEFT_LIGHT)
        right = adc.recvADC(RIGHT_LIGHT)
        print("Light  left:", round(left, 2), "V   right:", round(right, 2), "V")
        time.sleep(1)
```

**Coach note:** Now there are **two** `while` loops alive at once (this one + `monitor_battery`). That's multithreading in action.

---

## Slide 18 — Clean Up: `destroy()`

**On screen**
- Flip the stop flag, **wait** for the thread to finish, then close the ADC.
- `join(timeout=2)` = "wait up to 2 seconds so we never hang forever."
- `i2cClose()` closes the connection to the ADC chip.

**Code (builds file · chunk 10/12):**
```python
def destroy():
    """Stop the background thread and close the sensors cleanly."""
    stop_event.set()             # tell monitor_battery() to finish
    if battery_thread is not None:
        battery_thread.join(timeout=2)   # wait (max 2s) for it to stop
    if buzzer is not None:
        buzzer.run("0")          # make sure the buzzer is off
    if adc is not None:
        adc.i2cClose()           # close the ADC connection
```

**Coach note:** This is the payoff for slide 8 — the `Event` flag + `join()` give a clean shutdown.

---

## Slide 19 — The Main Block

**On screen**
- Same trusty pattern: `try` runs setup+loop, `except` catches Ctrl+C, `finally` always cleans up.

**Code (builds file · chunk 11/12):**
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

**Coach note:** Third lesson in a row with this block — students should now recognize it instantly.

---

## Slide 20 — We Built the Whole File 🎉

**On screen**
- Complete `lesson_3_adc_multithreading.py`:
  - imports → channels/thresholds → placeholders + `stop_event` → `setup()` (starts thread) → battery helpers → `beep()` → `monitor_battery()` → `loop()` → `destroy()` → main block
- One program, **two threads** running together.

**Visual:** Design System/assets/icons/success.png

**Coach note:** Scroll the assembled file; highlight the two functions that loop (`loop` and `monitor_battery`).

---

## Slide 21 — Run It

**On screen**
- On the **Pi's terminal**:
```sh
cd smartcar2026/Code/User
python3 lesson_3_adc_multithreading.py
```
- Output **interleaves** the two threads — light every 1 s, battery every 3 s:
```text
Light  left: 1.85 V   right: 1.90 V
Battery: 8.05 V ( 75 % )
Light  left: 1.84 V   right: 1.88 V
Light  left: 1.86 V   right: 1.91 V
Battery: 8.04 V ( 74 % )
```
- **Ctrl+C** to stop.

**Visual:** Design System/assets/icons/terminal.png

**Coach note:** Point at the mixed output — proof both threads run at once. (`sudo` optional here; no LED strip.)

---

## Slide 22 — Try It Yourself

**On screen**
- **Cover one light sensor** with your hand and watch its voltage change.
- Raise `LOW_BATTERY` to `7.8` to force a warning beep (then set it back).
- Change the battery check interval from `3` seconds to `5`.
- **Challenge:** print `"LEFT brighter"` / `"RIGHT brighter"` based on which sensor reads higher.

**Coach note:** The brighter-side challenge previews line-following / light-seeking logic in later lessons.

---

## Slide 23 — Troubleshooting

**On screen**
- No battery line / weird voltage → check the ADC wiring; remember the **× 3**.
- Program won't quit on Ctrl+C → that's why we use `stop_event` + `join()`; give it a second.
- `i2c`/`OSError` errors → I²C not enabled, or ADC address/wiring issue.
- Light values don't change → sensor covered already, or wired to the wrong channel.

**Visual:** Design System/assets/icons/error.png + Design System/assets/icons/warning.png

**Coach note:** If I²C errors appear, check `raspi-config` (I²C enabled) and the ADC seating.

---

## Slide 24 — Recap & What's Next

**On screen**
- You read **analog sensors** through the **ADC** (light + battery).
- You ran a **background thread** and learned to stop it cleanly with an **`Event`**.
- You now have all the building blocks: lights, sound, motors, commands, and sensors.
- **Next:** put them together into smarter, more autonomous behavior.

**Visual:** Design System/assets/main/smart-car-full.png

**Coach note:** Celebrate — they've now touched every core subsystem of the car.

---

<!-- HIDDEN — COACH NOTES (do not show to students) -->

## Coach Notes (hidden)

**Timing (~45–50 min):** Recap + concepts (slides 1–8) ~14 min · build the code (9–20) ~20 min · run + experiment (21–22) ~10 min · troubleshooting/recap (23–24) ~6 min.

**Before class**
- Confirm I²C is enabled on each Pi (`raspi-config`) — ADC reads fail otherwise.
- Charge cars; a genuinely low battery will make the watchdog beep constantly (which is also a nice live demo).
- Pre-run the file once to confirm sensor readings look sane.

**Most common failures**
1. I²C not enabled → ADC errors on `recvADC` / `i2cClose`.
2. Forgetting the battery `× 3` when interpreting the number.
3. Expecting the program to exit instantly on Ctrl+C (the `join(timeout=2)` adds a short wait).
4. Wrong channel → "light value never changes."

**Concept pitfalls to pre-empt**
- Students may think the two `print` streams are "glitching" — it's actually both threads writing at once. Frame it as the goal, not a bug.
- Keep `daemon`/`Event` explanations light; the working mental model ("daemon = quits with the program", "Event = stop switch") is enough.

**Teaching tips**
- Demo "cover the sensor" early — it's the most tangible moment.
- If a real battery is low, lean into it: the live beeping makes the watchdog concrete.
- Reinforce that this is the **same** `setup → work → destroy` skeleton, now with a thread.

**Assets to source (flagged in deck)**
- Close-up photo of the two photoresistors / light sensors on the board — slide 5.
- "Two threads running side by side" diagram — slide 7.
