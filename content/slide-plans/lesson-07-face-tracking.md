# Lesson 7 — Face Tracking

**Organization:** AI Code Academy · aicodeacademy.com
**Course:** Machine Learning with Raspberry Pi & Smart Car (Level 3)
**Lesson:** 7 — Face Tracking
**Source file:** ../Code/User/lesson_7_face_tracking.py
**Runs on:** Pi or laptop (connects over Wi-Fi) · start `sudo python3 main.py` on the Pi first · needs `opencv-python` + `numpy`

> Layout/outline doc. Each `---` block below = one slide. Code blocks are copied
> from the real lesson file and grow chunk-by-chunk until the whole script exists.

---

## Slide 1 — Title

**On screen**
- **Lesson 7 — Face Tracking**
- Machine Learning with Raspberry Pi & Smart Car (Level 3)
- AI Code Academy · aicodeacademy.com

**Visual:** Design System/assets/main/company-logo.png (corner) + Design System/assets/icons/face-scanner.png (hero)

**Coach note:** ~1 min. The "wow" lesson — the car will follow your face. Build excitement.

---

## Slide 2 — Introduction

**On screen**
- Lesson 6 gave the car **eyes** (a live video stream).
- Now we add a **brain for vision**: find a face and **follow it** with the head.
- Same camera stream — plus a second connection to send servo commands.

**Visual:** Design System/assets/icons/camera-black.png + Design System/assets/icons/face-scanner.png

**Coach note:** Recall L6's `read_frame()` — we reuse that exact idea here.

---

## Slide 3 — Our Goals

**On screen**
- Build a program that:
  - receives video from the Pi,
  - **detects a face** with OpenCV,
  - turns the **head (pan + tilt)** to keep that face centered.
- Write each function to do **one job** — Lesson 8 will reuse them.

**Visual:** Design System/assets/icons/face-scanner.png

**Coach note:** Mention up front that L8 imports this file, so clean single-purpose functions matter.

---

## Slide 4 — How a Computer "Sees" a Face

**On screen**
- OpenCV uses a **cascade** — a file that's been trained on what a face looks like.
- Steps: convert the picture to **grey**, then scan it for face-shaped patterns.
- It returns a **box** `(x, y, w, h)` around each face found.

**Visual:** [ASSET NEEDED: camera frame with a green box around a face + (x,y,w,h) labels]

**Coach note:** This is the lesson's "machine learning" tie-in — a pre-trained model recognizing faces.

---

## Slide 5 — Two Connections

**On screen**
- This program opens **two** connections to the Pi's server (`main.py`):
  - **Port 8000** — receive video (pictures *in*).
  - **Port 5000** — send servo commands (orders *out*).
- So start the car's server first: `sudo python3 main.py` on the Pi.

**Visual:** Design System/assets/icons/server-client-black.png

**Coach note:** Clarify: Lessons 7/8 talk to the full `main.py` server (both ports), not the Lesson 6 server.

---

## Slide 6 — Face Position → Head Movement

**On screen**
- Find the face's center, compare it to the picture's center.
- **Offset** is −1 (far left/top) … 0 (centered) … +1 (far right/bottom).
- Nudge the head a few degrees toward the face — but:
  - ignore tiny offsets (**dead zone**) so it doesn't jitter,
  - never move past the servo's **limits** (**clamp**).

**Coach note:** Dead zone + clamp are the two ideas that make tracking smooth instead of twitchy.

---

## Slide 7 — Start the File: Imports

**On screen**
- Network + system imports, plus OpenCV and NumPy.
- `COMMAND` gives us the command names (like L2).

**Code (builds file · chunk 1/12):**
```python
"""Lesson 7: Face Detection and Tracking."""

import car_setup          # adds the car's code folders to the import path
import socket             # connect to the Pi over the network
import struct             # read the 4-byte picture size
import sys                # read the IP address you type

import cv2                # OpenCV: shows pictures and finds faces
import numpy as np        # NumPy: turns raw bytes into an image

from command import COMMAND   # the command names the car's server understands
```

**Coach note:** `car_setup` is back so we can import `COMMAND` from the car's code.

---

## Slide 8 — Settings

**On screen**
- Two ports, picture size, and the head's pan/tilt limits.
- The **cascade file** lives in the car's `Client` folder — found via `car_setup.CODE_DIR`.

**Code (builds file · chunk 2/12):**
```python
# ---- settings ----
VIDEO_PORT = 8000         # receive pictures here
COMMAND_PORT = 5000       # send servo commands here
FRAME_WIDTH = 400
FRAME_HEIGHT = 300
WINDOW_NAME = "Lesson 7 - Face Tracking"

PAN_SERVO = "0"           # left/right head servo
TILT_SERVO = "1"          # up/down head servo
PAN_MIN, PAN_MAX = 0, 180
TILT_MIN, TILT_MAX = 80, 180
SERVO_STEP = 4            # degrees to move per step
DEAD_ZONE = 0.15          # ignore tiny offsets (stops jitter)

# car_setup.CODE_DIR points at the Code folder, so we find the file reliably.
CASCADE_PATH = car_setup.CODE_DIR / "Client" / "haarcascade_frontalface_default.xml"
```

**Coach note:** `car_setup.CODE_DIR` is the same helper from L1 — here it locates the face-detector file.

---

## Slide 9 — Placeholders

**On screen**
- The detector, both connections, and the current head angles start empty/centered.

**Code (builds file · chunk 3/12):**
```python
# ---- things created in setup ----
cmd = None                # holds command names like cmd.CMD_SERVO
face_cascade = None       # the face detector
video_socket = None       # connection that receives pictures
video_file = None         # that connection, read like a file
command_socket = None     # connection that sends servo commands
pan_angle = 90.0          # current left/right angle (90 = straight ahead)
tilt_angle = 90.0         # current up/down angle
```

**Coach note:** `pan_angle` / `tilt_angle` track where the head is now, so we can nudge from there.

---

## Slide 10 — `setup()`: Load the Detector & Connect

**On screen**
- Load the face cascade (and check it actually loaded).
- Open the **video** connection (8000) and the **command** connection (5000).

**Code (builds file · chunk 4/12):**
```python
def setup():
    """Connect to the Pi and get the face detector ready."""
    global cmd, face_cascade, video_socket, video_file, command_socket
    if len(sys.argv) < 2:
        raise SystemExit("Please pass the Pi's IP, e.g. python this.py 192.168.1.50")

    cmd = COMMAND()
    face_cascade = cv2.CascadeClassifier(str(CASCADE_PATH))
    if face_cascade.empty():              # True if the file failed to load
        raise FileNotFoundError("Could not load the face file: " + str(CASCADE_PATH))

    pi_ip = sys.argv[1]
    video_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    video_socket.connect((pi_ip, VIDEO_PORT))
    video_file = video_socket.makefile("rb")

    command_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    command_socket.connect((pi_ip, COMMAND_PORT))
    print("Connected to", pi_ip)
```

**Coach note:** Two `connect()` calls = two ports. The `empty()` check saves a confusing crash later if the cascade path is wrong.

---

## Slide 11 — `read_frame()`: Same Trick as Lesson 6

**On screen**
- Identical to Lesson 6: read the 4 size-bytes, then the JPEG, then decode it.
- Reusing a known idea — no need to reinvent it.

**Code (builds file · chunk 5/12):**
```python
def read_frame():
    """Read one picture from the Pi, or None when the stream ends."""
    header = video_file.read(4)
    if len(header) != 4:
        return None
    length = struct.unpack("<L", header)[0]
    if length == 0:
        return None
    jpeg_data = video_file.read(length)
    if len(jpeg_data) != length:
        return None
    return cv2.imdecode(np.frombuffer(jpeg_data, dtype=np.uint8), cv2.IMREAD_COLOR)
```

**Coach note:** Point out this is copied from L6 — recognizing reusable code is a real skill.

---

## Slide 12 — `detect_faces()` & `biggest_face()`

**On screen**
- Detect: grey the picture, then `detectMultiScale` returns a box per face.
- Biggest: the closest person is usually the largest box (width × height).

**Code (builds file · chunk 6–7/12):**
```python
def detect_faces(frame):
    """Return a list of (x, y, w, h) boxes, one per face."""
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    # 1.3 and 5 control how carefully it searches.
    return face_cascade.detectMultiScale(gray, 1.3, 5)


def biggest_face(faces):
    """Return the largest face's (x, y, w, h), or None if there are none."""
    if len(faces) == 0:
        return None
    # Each box is (x, y, w, h); face[2] * face[3] is its area.
    return max(faces, key=lambda face: face[2] * face[3])
```

**Coach note:** "Biggest box ≈ closest face" is an assumption worth saying out loud. L8 will improve on it.

---

## Slide 13 — `send_servo()`: Build a CMD_SERVO Command

**On screen**
- Reuse the command idea from **Lesson 2** — now sent over the network.
- Format: `CMD_SERVO#<channel>#<angle>` + a newline; text must be sent as **bytes**.

**Code (builds file · chunk 8/12):**
```python
def send_servo(channel, angle):
    """Send one servo command, e.g. CMD_SERVO#0#95."""
    message = cmd.CMD_SERVO + "#" + channel + "#" + str(int(angle)) + "\n"
    command_socket.send(message.encode("utf-8"))   # text must be sent as bytes
```

**Coach note:** Direct callback to L2's `#`-joined command strings — now actually travelling over port 5000.

---

## Slide 14 — `track_face()` & `clamp()`: Nudge the Head

**On screen**
- Turn the face's position into an **offset**, skip tiny offsets (dead zone).
- Nudge pan/tilt toward the face, kept inside limits by `clamp()`.

**Code (builds file · chunk 9–10/12):**
```python
def track_face(face):
    """Turn the head a little so the face moves toward the middle."""
    global pan_angle, tilt_angle
    if face is None:
        return
    x, y, w, h = face
    center_x = x + w / 2
    center_y = y + h / 2
    # offset: -1 at left/top edge, +1 at right/bottom edge, 0 in the middle.
    offset_x = (center_x / FRAME_WIDTH - 0.5) * 2
    offset_y = (center_y / FRAME_HEIGHT - 0.5) * 2
    if abs(offset_x) < DEAD_ZONE and abs(offset_y) < DEAD_ZONE:
        return                            # already centered: don't move
    pan_angle = clamp(pan_angle + SERVO_STEP * offset_x, PAN_MIN, PAN_MAX)
    tilt_angle = clamp(tilt_angle - SERVO_STEP * offset_y, TILT_MIN, TILT_MAX)
    send_servo(PAN_SERVO, pan_angle)
    send_servo(TILT_SERVO, tilt_angle)


def clamp(value, low, high):
    """Keep a number between low and high."""
    return max(low, min(high, value))
```

**Coach note:** Walk through one offset by hand. `clamp` protects the servos from impossible angles.

---

## Slide 15 — `loop()`: Find, Draw, Follow

**On screen**
- Read a frame → find the biggest face → draw a green box → move the head → show it.
- Press **q** to quit.

**Code (builds file · chunk 11/12):**
```python
def loop():
    """Read pictures, find the biggest face, follow it, and show the video."""
    while True:
        frame = read_frame()
        if frame is None:
            break
        face = biggest_face(detect_faces(frame))
        if face is not None:
            x, y, w, h = face
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
            track_face(face)
        cv2.imshow(WINDOW_NAME, frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break
```

**Coach note:** This reads top-to-bottom like English: read, detect, draw, track, show. Highlight that clarity.

---

## Slide 16 — Clean Up + The Main Block

**On screen**
- Close **both** connections and the window, then the usual safe wrapper.

**Code (builds file · chunk 12/12):**
```python
def destroy():
    """Close both connections and the window."""
    if video_file is not None:
        video_file.close()
    if video_socket is not None:
        video_socket.close()
    if command_socket is not None:
        command_socket.close()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    try:
        setup()
        loop()
    except KeyboardInterrupt:
        pass
    finally:
        destroy()
```

**Coach note:** Two connections now, so two closes. Same finally-always-cleans-up habit.

---

## Slide 17 — We Built the Whole File 🎉

**On screen**
- Complete `lesson_7_face_tracking.py`:
  - imports → settings → placeholders → `setup()` → `read_frame()` → `detect_faces()` / `biggest_face()` → `send_servo()` → `track_face()` / `clamp()` → `loop()` → `destroy()` → main
- Every function does one job — ready for Lesson 8 to reuse.

**Visual:** Design System/assets/icons/success.png

**Coach note:** Re-emphasize single-purpose functions; it pays off next lesson.

---

## Slide 18 — Run It

**On screen**
- **Step 1 — on the Pi**, start the car's server:
```sh
cd smartcar2026/Code
sudo python3 main.py
```
- **Step 2 — on the Pi or your laptop**, run the tracker with the Pi's IP:
```sh
python lesson_7_face_tracking.py 192.168.1.50
```
- A window shows the camera; the head follows your face. Press **q** to quit.

**Visual:** Design System/assets/icons/terminal.png + Design System/assets/icons/raspberry-pi.png

**Coach note:** Face detection is CPU-heavy — a laptop runs it much smoother than the Pi. Use `127.0.0.1` on the Pi.

---

## Slide 19 — Try It Yourself

**On screen**
- Change `SERVO_STEP` — bigger = faster but jumpier head movement.
- Change `DEAD_ZONE` — smaller = more sensitive (and twitchier).
- Change the box color in `loop()`.
- **Challenge:** widen `TILT_MIN`/`TILT_MAX` and see how far up/down it can follow.

**Coach note:** Let them feel the trade-off: responsiveness vs. jitter. There's no single "right" value.

---

## Slide 20 — Troubleshooting

**On screen**
- `Could not load the face file` → the cascade path is wrong; confirm it's in `Code/Client/`.
- No green box → more light on your face; face the camera straight on.
- Head jitters / overshoots → raise `DEAD_ZONE` or lower `SERVO_STEP`.
- `Connection refused` → start `sudo python3 main.py` on the Pi first; check the IP.

**Visual:** Design System/assets/icons/error.png + Design System/assets/icons/warning.png

**Coach note:** Lighting is the biggest factor in detection quality. Aim a lamp at the student's face if needed.

---

## Slide 21 — Recap & What's Next

**On screen**
- You used **OpenCV** to detect a face and steered the head to follow it.
- You combined **video in** (8000) with **commands out** (5000).
- **Next — Lesson 8:** handle **multiple faces** and lock onto one — by *reusing this file*.

**Visual:** Design System/assets/icons/face-scanner.png

**Coach note:** Tease L8: "we won't rewrite any of this — we'll import it."

---

<!-- HIDDEN — COACH NOTES (do not show to students) -->

## Coach Notes (hidden)

**Timing (~50–55 min):** Intro + concepts (1–6) ~14 min · build (7–17) ~22 min · run + experiment (18–19) ~12 min · troubleshoot/recap (20–21) ~6 min.

**Before class**
- On the Pi, confirm `sudo python3 main.py` starts (the full server with video + command ports).
- Confirm `haarcascade_frontalface_default.xml` exists in `Code/Client/`.
- Laptops used as the tracker need `opencv-python` + `numpy`; prefer a laptop for smooth detection.
- Have a lamp handy — lighting strongly affects detection.

**Key teaching points**
- Two connections / two ports (video in, commands out).
- Dead zone + clamp = smooth, safe tracking.
- `read_frame()` and the command string are reused ideas (L6 + L2).
- Single-purpose functions set up the Lesson 8 import.

**Most common failures**
1. `main.py` not running on the Pi → connection refused.
2. Cascade file path wrong → "Could not load the face file".
3. Poor lighting → no detections.
4. Jittery head → tune `DEAD_ZONE` / `SERVO_STEP`.

**Assets to source (flagged in deck)**
- Camera frame with a green face box and (x, y, w, h) labels — slide 4.
