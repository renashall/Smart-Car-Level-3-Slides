# Lesson 8 — Multiple Face Detection

**Organization:** AI Code Academy · aicodeacademy.com
**Course:** Machine Learning with Raspberry Pi & Smart Car (Level 3)
**Lesson:** 8 — Multiple Face Detection
**Source file:** ../Code/User/lesson_8_multiple_face_detection.py (keep it beside `lesson_7_face_tracking.py`)
**Runs on:** Pi or laptop (over Wi-Fi) · start `sudo python3 main.py` on the Pi first · needs `opencv-python` + `numpy`

> Layout/outline doc. Each `---` block below = one slide. This lesson **reuses
> Lesson 7 by importing it**, then adds a target-lock idea on top.

---

## Slide 1 — Title

**On screen**
- **Lesson 8 — Multiple Face Detection**
- Machine Learning with Raspberry Pi & Smart Car (Level 3)
- AI Code Academy · aicodeacademy.com

**Visual:** design-system/assets/main/company-logo.png (corner) + design-system/assets/icons/face-scanner.png (hero)

**Coach note:** ~1 min. The last code lesson — and the shortest, because we reuse Lesson 7.

---

## Slide 2 — Introduction

**On screen**
- Lesson 7 followed the **biggest** face. But what if **two people** are in view?
- The car can flip back and forth between faces — jumpy and confusing.
- Today: detect **everyone**, but **lock onto one** target and stick with it.

**Visual:** design-system/assets/icons/face-scanner.png

**Coach note:** Demo the problem if you can: two students in frame making L7 jump around.

---

## Slide 3 — Our Goals

**On screen**
- Build a program that:
  - draws a box around **every** face,
  - keeps a **target lock** on one face, and
  - follows that target smoothly.
- Do it by **reusing all of Lesson 7** — almost no new hardware code.

**Visual:** [ASSET NEEDED: two faces in frame, both boxed, one circled as the locked target]

**Coach note:** The headline skill today is *code reuse*, not new hardware.

---

## Slide 4 — Reusing Lesson 7 by Importing It

**On screen**
- `import lesson_7_face_tracking as face` brings in **all** of L7's functions.
- We then call `face.read_frame()`, `face.detect_faces()`, `face.track_face()`, etc.
- Importing a file runs its **top part** (imports, settings, functions) but **not** its `if __name__ == "__main__"` block — so L7 doesn't start on its own.

**Visual:** design-system/assets/icons/technology.png

**Coach note:** This is *why* L7's `__main__` guard mattered. Importing reuses the toolbox without running the program.

---

## Slide 5 — Target Lock

**On screen**
- **First frame:** pick the **biggest** face as the target.
- **After that:** pick the detected face **closest to where the target was** last frame.
- If the nearest face is within `LOCK_DISTANCE` pixels → keep the lock.
- If nobody is close enough → fall back to the biggest face.

**Coach note:** "Closest to last time" gives the program a simple memory — that's what stops the jumping.

---

## Slide 6 — Start the File: Imports

**On screen**
- Just `cv2` (to draw) and Lesson 7 (for everything else).
- The nickname `face` keeps calls short.

**Code (builds file · chunk 1/8):**
```python
"""Lesson 8: Multiple Face Detection."""

import cv2                # OpenCV: here we use it just to draw on the picture

# Import all of Lesson 7's functions under the short name "face".
# Importing runs L7's top part but NOT its __main__ block, so it doesn't
# start running on its own. Keep this file beside lesson_7_face_tracking.py.
import lesson_7_face_tracking as face
```

**Coach note:** Spend a moment on this import — it's the whole point of the lesson.

---

## Slide 7 — Settings

**On screen**
- A window name, two colors (green for faces, yellow for the target), and the lock distance.

**Code (builds file · chunk 2/8):**
```python
WINDOW_NAME = "Lesson 8 - Multiple Face Detection"
BOX_COLOR = (0, 255, 0)          # green
TARGET_COLOR = (0, 255, 255)     # yellow
LOCK_DISTANCE = 85               # pixels: how far the target can move and stay locked
```

**Coach note:** OpenCV colors are `(Blue, Green, Red)`, not RGB — worth a quick heads-up.

---

## Slide 8 — `face_center()` & `center_distance()`

**On screen**
- `face_center` → the middle point of a face box.
- `center_distance` → how far apart two faces are (straight-line distance).

**Code (builds file · chunk 3/8):**
```python
def face_center(face_box):
    """Return the middle point of a face box."""
    x, y, w, h = face_box
    return int(x + w / 2), int(y + h / 2)


def center_distance(first_face, second_face):
    """Return the distance between two face centers."""
    first_x, first_y = face_center(first_face)
    second_x, second_y = face_center(second_face)
    return ((first_x - second_x) ** 2 + (first_y - second_y) ** 2) ** 0.5
```

**Coach note:** `center_distance` is the Pythagorean theorem (a²+b²=c²). Nice cross-over with math class.

---

## Slide 9 — `choose_target()`: Keep Following the Same Person

**On screen**
- No target yet → start with the **biggest** face.
- Have a target → pick the **closest** face to last frame's target.
- Too far from any face → restart with the biggest.

**Code (builds file · chunk 4/8):**
```python
def choose_target(faces, previous_target):
    """Choose one face to follow, using the previous target when possible."""
    if len(faces) == 0:
        return None, "none"
    if previous_target is None:
        return face.biggest_face(faces), "largest"

    closest_face = min(faces, key=lambda f: center_distance(f, previous_target))
    if center_distance(closest_face, previous_target) <= LOCK_DISTANCE:
        return closest_face, "locked"
    return face.biggest_face(faces), "largest"
```

**Coach note:** Returns two things: the face *and* a label ("largest"/"locked"/"none") we show on screen.

---

## Slide 10 — `draw_faces()`: Mark Everyone, Highlight the Target

**On screen**
- Green box around every face.
- A yellow **circle + label** around the one we're following.

**Code (builds file · chunk 5/8):**
```python
def draw_faces(frame, faces, target, target_mode):
    """Draw every face and highlight the target face."""
    for face_box in faces:
        x, y, w, h = face_box
        cv2.rectangle(frame, (x, y), (x + w, y + h), BOX_COLOR, 2)

    if target is not None:
        x, y, w, h = target
        center = face_center(target)
        cv2.circle(frame, center, int((w + h) / 4), TARGET_COLOR, 2)
        cv2.putText(frame, "target: " + target_mode,
                    (x, min(frame.shape[0] - 10, y + h + 18)),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, TARGET_COLOR, 1, cv2.LINE_AA)
```

**Coach note:** Don't dwell on the OpenCV drawing args — the takeaway is "boxes for all, circle for the target".

---

## Slide 11 — `draw_detection_summary()`: On-Screen Status

**On screen**
- A small line at the top: how many faces, and what the target is doing.

**Code (builds file · chunk 6/8):**
```python
def draw_detection_summary(frame, faces, target, target_mode):
    """Show a short summary for this video frame."""
    if target is None:
        summary = "faces: 0  target: none"
    else:
        summary = "faces: " + str(len(faces)) + "  target: " + target_mode
    cv2.putText(frame, summary, (10, 22),
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, TARGET_COLOR, 2, cv2.LINE_AA)
```

**Coach note:** This on-screen text is great for debugging — students can *see* "locked" vs "largest" live.

---

## Slide 12 — `loop()`: Reuse + Lock + Draw

**On screen**
- Reuse L7 for the camera, detection, and head movement.
- New logic: keep a `previous_target` so the lock carries frame to frame.

**Code (builds file · chunk 7/8):**
```python
def loop():
    """Read pictures, mark all faces, keep a target lock, and show the video."""
    previous_target = None
    while True:
        frame = face.read_frame()           # from Lesson 7
        if frame is None:
            break
        faces = face.detect_faces(frame)    # from Lesson 7: find EVERY face
        target, target_mode = choose_target(faces, previous_target)
        previous_target = target
        draw_faces(frame, faces, target, target_mode)
        draw_detection_summary(frame, faces, target, target_mode)
        face.track_face(target)             # from Lesson 7: turn toward the target
        cv2.imshow(WINDOW_NAME, frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break
```

**Coach note:** Point at each `face.xxx()` call — those are L7 functions doing the heavy lifting.

---

## Slide 13 — The Main Block: Borrow `setup()` & `destroy()`

**On screen**
- We even reuse L7's `setup()` and `destroy()` — no need to rewrite the connections.

**Code (builds file · chunk 8/8):**
```python
if __name__ == "__main__":
    try:
        face.setup()        # from Lesson 7: connect + load the face detector
        loop()              # our own loop, defined above
    except KeyboardInterrupt:
        pass
    finally:
        face.destroy()      # from Lesson 7: close the sockets and window
```

**Coach note:** `face.setup()` / `face.destroy()` — the connection code from L7, reused for free.

---

## Slide 14 — We Built the Whole File 🎉

**On screen**
- Complete `lesson_8_multiple_face_detection.py`:
  - import L7 → settings → `face_center()` / `center_distance()` → `choose_target()` → `draw_faces()` → `draw_detection_summary()` → `loop()` → main
- Most of the program is **reused** from Lesson 7 — that's the power of good functions.

**Visual:** design-system/assets/icons/success.png

**Coach note:** Celebrate how little new code this needed. That's the reward for L7's clean design.

---

## Slide 15 — Run It

**On screen**
- Keep `lesson_8...py` **in the same folder** as `lesson_7_face_tracking.py`.
- **Step 1 — on the Pi:** `sudo python3 main.py`
- **Step 2 — on the Pi or laptop:**
```sh
python lesson_8_multiple_face_detection.py 192.168.1.50
```
- Get a friend in frame — watch the yellow target stay locked. Press **q** to quit.

**Visual:** design-system/assets/icons/terminal.png

**Coach note:** Have two students stand in view to show off the lock. Use `127.0.0.1` on the Pi.

---

## Slide 16 — Try It Yourself

**On screen**
- Change `LOCK_DISTANCE` — bigger = stickier lock, smaller = switches more easily.
- Change `TARGET_COLOR` to your favorite color (remember: **B, G, R**).
- Add your own text to the summary line.
- **Challenge:** lock onto the face *closest to the camera* (biggest) instead of nearest-to-last.

**Coach note:** `LOCK_DISTANCE` is the fun dial — let students feel sticky vs. switchy tracking.

---

## Slide 17 — Troubleshooting

**On screen**
- `ModuleNotFoundError: lesson_7_face_tracking` → the two files must be in the same folder.
- Target jumps between people → raise `LOCK_DISTANCE`.
- Lock "sticks" to the wrong face → lower `LOCK_DISTANCE`.
- No video / refused → start `sudo python3 main.py` first; check the IP (same as Lesson 7).

**Visual:** design-system/assets/icons/error.png + design-system/assets/icons/warning.png

**Coach note:** Most new issues are the missing-neighbor-file or a `LOCK_DISTANCE` that needs tuning. Vision/connection issues are the same as L7.

---

## Slide 18 — Recap & What's Next

**On screen**
- You **reused an entire program** by importing it — real software engineering.
- You added **target lock** so the car follows one person smoothly.
- That's the last code lesson! **Next — Lesson 9:** the **Final Project Workshop** — build your own idea.

**Visual:** design-system/assets/main/smart-car-full.png

**Coach note:** Big moment — they've finished the code curriculum. Point them toward project ideas for next time.

---

<!-- HIDDEN — COACH NOTES (do not show to students) -->

## Coach Notes (hidden)

**Timing (~40–45 min):** Intro + concepts (1–5) ~12 min · build (6–14) ~16 min · run + experiment (15–16) ~10 min · troubleshoot/recap (17–18) ~5 min. Shorter than L7 because so much is reused.

**Before class**
- Same setup as Lesson 7 (`sudo python3 main.py`, cascade in `Code/Client/`, opencv + numpy on the viewer).
- Ensure students still have a working `lesson_7_face_tracking.py` in `Code/User/`; this file imports it.
- Two volunteers in frame makes the target-lock demo land.

**Key teaching points**
- Importing a module reuses its functions and runs its top level — but the `__main__` guard keeps it from auto-running.
- Target lock = "nearest to last frame" memory + a distance threshold.
- OpenCV colors are BGR, not RGB.

**Most common failures**
1. The two lesson files not in the same folder.
2. `LOCK_DISTANCE` mis-tuned (jumps or sticks).
3. Connection / lighting issues — identical to Lesson 7.

**Assets to source (flagged in deck)**
- Two boxed faces with one circled as the locked target — slide 3.
