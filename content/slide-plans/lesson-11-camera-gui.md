# Lesson 11 — Camera GUI

**Organization:** AI Code Academy · aicodeacademy.com
**Course:** Machine Learning with Raspberry Pi & Smart Car (Level 3)
**Lesson:** 11 — Camera GUI
**Source file:** ../Code/User/lesson_11_camera_gui.py
**Runs on:** Your **Windows / macOS / Linux computer** (over Wi-Fi) · start `sudo python3 main.py` on the Pi first · needs `opencv-python`, `numpy`, `PyQt5`

> Layout/outline doc. Each `---` block below = one slide. This lesson wraps the
> whole video + control story into **one desktop window**: one PyQt5 class plus a
> handful of plain functions, built chunk-by-chunk from the real lesson file.

---

## Slide 1 — Title

**On screen**

- **Lesson 11 — Camera GUI (Bonus))**
- Machine Learning with Raspberry Pi & Smart Car (Level 3)
- AI Code Academy · aicodeacademy.com
- One small window: live camera, head buttons, and a face-tracking checkbox.

**Visual:** Design System/assets/main/company-logo.png (corner) + Design System/assets/icons/camera-black.png (hero)

**Coach note:** ~1 min. This is a bonus, capstone-style lesson — everything from Lessons 6–8 in one window. Make sure each Pi can run the full server before class.

---

## Slide 2 — Introduction

**On screen**

- So far you ran video and face tracking from **separate terminal scripts**.
- Today we put it all in **one desktop window** you can click.
- Live camera + **head buttons** + a **Track faces** checkbox — one file.

**Visual:** Design System/assets/screenshots/raspberry-pi-connect.png

**Coach note:** Frame this as the "nice front door" for the whole course — same plumbing as before, now with a GUI.

---

## Slide 3 — Our Goals

**On screen**

- **Run** the camera GUI and see the live video.
- **Control** the head with Up/Down/Left/Right/Home buttons.
- **Understand** how a frame travels: capture → stream → decode → display.
- **Locate** where each step lives in the code.

**Visual:** Design System/assets/icons/technology.png

**Coach note:** Four verbs — run, control, understand, locate. By the end they should be able to point at each step in the file.

---

## Slide 4 — The Video Path

**On screen**

- The **Pi** owns the camera and **streams** JPEG pictures (port **8000**).
- Your **computer decodes** each picture in memory and **displays** it.
- Servo commands go **back** to the Pi (port **5000**).
- **Two connections, two ports:** video in, commands out. Nothing is saved to disk.

**Visual:** [ASSET NEEDED: pipeline diagram — Pi camera → JPEG over TCP (8000) → computer decode → window display; commands flow back on 5000] (deck draws this as a CSS pipeline)

**Coach note:** This is the mental model for the whole lesson. The Pi only captures & streams; your computer does the thinking (decode, draw, face-find).

---

## Slide 5 — Inside the File

**On screen**

- One window class — **`CameraWindow`** — because a PyQt5 window needs a class.
- Everything else is a **plain function** (the familiar lesson style).
- A **background thread** reads video so the buttons stay clickable.
- **Why a thread?** Reading pictures from the network is slow — doing it in the background keeps the window responsive while video keeps flowing.

**Visual:** Design System/assets/icons/server-client-black.png

**Coach note:** Reassure students: only the *window* needs a class. The thread is the one genuinely new idea today.

---

## Slide 6 — Start the File: Imports

**On screen**
- `car_setup` **first** — so `from command import COMMAND` just works.
- `socket` + `struct` read the stream; `threading` runs the background reader.
- `cv2` + `numpy` handle pictures; **PyQt5** builds the window.

**Code (builds file · chunk 1/15):**

```python
"""Lesson 11: Camera GUI (Bonus).

Run this on your computer while the Raspberry Pi runs the server:
    sudo python3 main.py
"""

import car_setup            # adds the car's code folders to the import path

import socket               # to talk to the Pi over the network
import struct               # to read the 4-byte picture size
import sys
import threading            # to receive video in the background

import cv2                  # OpenCV: decodes pictures and finds faces
import numpy as np          # NumPy: turns raw bytes into an image
from PyQt5 import QtCore, QtGui, QtWidgets   # builds the window

from command import COMMAND  # the command names the car server understands
```

**Coach note:** `import car_setup` leads the list — it puts the car's `Server`/`Client` folders on the path so `Command` and the cascade file resolve.

---

## Slide 7 — Settings We Can Tune

**On screen**

- Ports, frame size, which servo is **pan** vs **tilt**, and the **safe angle ranges**.
- Pan is channel `"0"`, tilt is channel `"1"`. Angles are clamped: pan 0–180, tilt 80–180.
- `SERVO_STEP` = degrees per move; `DEAD_ZONE` = ignore tiny offsets so the head won't jitter.

**Code (builds file · chunk 2/15):**

```python
# ---- settings ----
VIDEO_PORT = 8000           # we receive pictures on this port
COMMAND_PORT = 5000         # we send servo commands on this port
FRAME_WIDTH = 400
FRAME_HEIGHT = 300
PAN_SERVO = "0"             # left/right head servo
TILT_SERVO = "1"            # up/down head servo
PAN_MIN, PAN_MAX = 0, 180   # degrees
TILT_MIN, TILT_MAX = 80, 180
SERVO_STEP = 4              # degrees moved per step
DEAD_ZONE = 0.15            # ignore tiny offsets so the head does not jitter
CASCADE_PATH = car_setup.CODE_DIR / "Client" / "haarcascade_frontalface_default.xml"
```

**Coach note:** The two ports (8000 video, 5000 commands) are the same ones the car server opens — point that out.

---

## Slide 8 — Shared State

**On screen**

- These are **global** because the background thread **and** the window both touch them.
- The two sockets, the **latest frame**, and a **lock** that keeps the frame safe.
- Plus the current head angles and two on/off flags.

**Code (builds file · chunk 3/15):**

```python
# ---- shared state used by the background video thread ----
cmd = COMMAND()                      # command names, like cmd.CMD_SERVO
face_cascade = cv2.CascadeClassifier(str(CASCADE_PATH))   # the face detector

video_socket = None         # connection that receives pictures
video_file = None           # that connection, read like a file
command_socket = None       # connection that sends servo commands
latest_frame = None         # the most recent picture, ready to show
frame_lock = threading.Lock()   # keeps the picture safe to share between threads

running = False             # True while the video thread should run
track_faces = False         # True when the "Track faces" box is ticked
pan_angle = 90.0            # current left/right head angle
tilt_angle = 90.0           # current up/down head angle
```

**Coach note:** A `Lock` is new — explain it as "a talking stick": only one thread holds the frame at a time, so it's never half-written when read.

---

## Slide 9 — connect(): Open Two Sockets

**On screen**

- **Connection 1** — pictures come in on port 8000.
- **Connection 2** — servo commands go out on port 5000.
- Wrapping the video socket as a **file** (`makefile("rb")`) lets us ask for an exact number of bytes.

**Code (builds file · chunk 4/15):**

```python
def connect(pi_ip):
    """Open the video and command sockets."""
    global video_socket, video_file, command_socket
    # Connection 1: pictures come in on port 8000.
    video_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    video_socket.connect((pi_ip, VIDEO_PORT))
    video_file = video_socket.makefile("rb")   # read the socket like a file

    # Connection 2: servo commands go out on port 5000.
    command_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    command_socket.connect((pi_ip, COMMAND_PORT))
```

**Coach note:** Same two ports as Lesson 6 (video) and Lesson 2 (commands) — this lesson just opens both at once.

---

## Slide 10 — read_frame(): Size First, Then the Picture

**On screen**

- Each picture is a **4-byte size** followed by that many **JPEG bytes**.
- A short or zero read means the stream ended → return `None`.
- `cv2.imdecode` turns the raw bytes straight into an image — **no file on disk**.

**Code (builds file · chunk 5/15):**

```python
def read_frame():
    """Read one picture: a 4-byte size, then that many JPEG bytes."""
    header = video_file.read(4)            # first 4 bytes = the picture's size
    if len(header) != 4:
        return None
    length = struct.unpack("<L", header)[0]   # turn those bytes into a number
    if length == 0:
        return None
    jpeg_data = video_file.read(length)    # read exactly that many bytes
    if len(jpeg_data) != length:
        return None
    return cv2.imdecode(np.frombuffer(jpeg_data, dtype=np.uint8), cv2.IMREAD_COLOR)
```

**Coach note:** This is exactly Lesson 6's `read_frame()` — call it out as reused knowledge, not new code.

---

## Slide 11 — send_servo() & clamp()

**On screen**

- A head command is just **text**: name, channel, angle, ending in a newline.
- Example: `CMD_SERVO#0#95\n` — pan servo to 95°.
- `clamp()` keeps every angle inside its safe range **before** it is sent.

**Code (builds file · chunk 6/15):**

```python
def send_servo(channel, angle):
    """Send one servo command to the car, e.g. CMD_SERVO#0#95."""
    if command_socket is None:
        return                             # not connected yet, so do nothing
    message = cmd.CMD_SERVO + "#" + channel + "#" + str(int(angle)) + "\n"
    command_socket.send(message.encode("utf-8"))



def clamp(value, low, high):
    """Keep a number between low and high."""
    return max(low, min(high, value))
```

**Coach note:** The trailing `\n` tells the server the command is complete — same `#`-separated, newline-ended format from Lesson 2.

---

## Slide 12 — track_face(): Nudge the Head Toward Center

**On screen**

- Work out how far the face is from the **middle** of the frame.
- Inside the **dead zone**? Don't move (stops the twitch).
- Otherwise move pan & tilt a small `SERVO_STEP` the right way.

**Code (builds file · chunk 7/15):**

```python
def track_face(face):
    """Turn the head a little so the face moves toward the middle."""
    global pan_angle, tilt_angle
    x, y, w, h = face
    # offset: -1 at the left/top, +1 at the right/bottom, 0 in the middle.
    offset_x = ((x + w / 2) / FRAME_WIDTH - 0.5) * 2
    offset_y = ((y + h / 2) / FRAME_HEIGHT - 0.5) * 2
    if abs(offset_x) < DEAD_ZONE and abs(offset_y) < DEAD_ZONE:
        return                             # already centred: don't move
    pan_angle = clamp(pan_angle + SERVO_STEP * offset_x, PAN_MIN, PAN_MAX)
    tilt_angle = clamp(tilt_angle - SERVO_STEP * offset_y, TILT_MIN, TILT_MAX)
    send_servo(PAN_SERVO, pan_angle)
    send_servo(TILT_SERVO, tilt_angle)
```

**Coach note:** The dead zone is why the head stays still when the face is already roughly centred. Each correction is tiny, so movement stays smooth.

---

## Slide 13 — video_thread(): The Background Loop

**On screen**

- Runs in the background: **read a frame**, and when tracking is on, **box every face** and **follow the biggest**.
- `max(faces, key=area)` picks the biggest box (width × height).
- Store the finished picture under the **lock** so the window can read it safely.

**Code (builds file · chunk 8/15):**

```python
def video_thread():
    """Background loop: read a picture, optionally find faces, store it."""
    global latest_frame
    while running:
        frame = read_frame()
        if frame is None:
            break
        # If face tracking is on, box every face and follow the biggest.
        if track_faces:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, 1.3, 5)
            for (x, y, w, h) in faces:
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
            if len(faces) > 0:
                track_face(max(faces, key=lambda f: f[2] * f[3]))
        with frame_lock:                   # hand the picture over safely
            latest_frame = frame
```

**Coach note:** This is the slow work (network + face-finding) kept off the window's main thread — that's *why* the buttons keep responding.

---

## Slide 14 — CameraWindow (1 of 3): Video + Connect

**On screen**

- The class builds the window: a **video label**, an **IP box + Connect**, and a **Track faces** checkbox.
- Each control is wired to a handler (`on_connect`, `on_track_changed`).

**Code (builds file · chunk 9/15):**

```python
class CameraWindow(QtWidgets.QMainWindow):
    def __init__(self):
        super().__init__()                 # let PyQt set up the window first
        self.setWindowTitle("Lesson 11 - Camera GUI (Bonus)")

        # The label the video picture is drawn onto.
        self.video_label = QtWidgets.QLabel("Not connected")
        self.video_label.setFixedSize(FRAME_WIDTH, FRAME_HEIGHT)
        self.video_label.setAlignment(QtCore.Qt.AlignCenter)

        # A text box for the Pi's IP address and a Connect button.
        self.ip_box = QtWidgets.QLineEdit("192.168.1.50")
        connect_button = QtWidgets.QPushButton("Connect")
        connect_button.clicked.connect(self.on_connect)

        # A tick box to turn face tracking on and off.
        self.track_checkbox = QtWidgets.QCheckBox("Track faces")
        self.track_checkbox.stateChanged.connect(self.on_track_changed)
```

**Coach note:** `.clicked.connect(...)` / `.stateChanged.connect(...)` = "when this is used, call that function." That's the whole event idea.

---

## Slide 15 — CameraWindow (2 of 3): The Five Head Buttons

**On screen**

- Five buttons → `nudge()` with **which servo** and **how far**.
- `lambda` is a tiny throwaway function used to pass those values along.
- Laid out in a **plus-pad**: Up on top, Left/Home/Right in the middle, Down below.

**Code (builds file · chunk 10/15):**

```python
        # Five buttons to move the head by hand.
        up = QtWidgets.QPushButton("Up")
        down = QtWidgets.QPushButton("Down")
        left = QtWidgets.QPushButton("Left")
        right = QtWidgets.QPushButton("Right")
        home = QtWidgets.QPushButton("Home")

        up.clicked.connect(lambda: self.nudge(TILT_SERVO, +SERVO_STEP))
        down.clicked.connect(lambda: self.nudge(TILT_SERVO, -SERVO_STEP))
        left.clicked.connect(lambda: self.nudge(PAN_SERVO, -SERVO_STEP))
        right.clicked.connect(lambda: self.nudge(PAN_SERVO, +SERVO_STEP))
        home.clicked.connect(self.go_home)

        # Arrange the five buttons in a little plus-sign grid.
        pad = QtWidgets.QGridLayout()
        pad.addWidget(up, 0, 1)
        pad.addWidget(left, 1, 0)
        pad.addWidget(home, 1, 1)
        pad.addWidget(right, 1, 2)
        pad.addWidget(down, 2, 1)
```

**Coach note:** `addWidget(widget, row, col)` is grid coordinates. Up = row 0 col 1; that's the plus shape.

---

## Slide 16 — CameraWindow (3 of 3): Lay It Out & Start the Timer

**On screen**

- Stack the controls down the **right**, the video on the **left**.
- A **timer** calls `refresh_video()` every **30 ms** (~33 fps) so the video looks smooth.

**Code (builds file · chunk 11/15):**

```python
        # Stack the controls down the right-hand side.
        controls = QtWidgets.QVBoxLayout()
        controls.addWidget(self.ip_box)
        controls.addWidget(connect_button)
        controls.addWidget(self.track_checkbox)
        controls.addLayout(pad)
        controls.addStretch(1)             # push everything up to the top

        layout = QtWidgets.QHBoxLayout()   # video left, controls right
        layout.addWidget(self.video_label)
        layout.addLayout(controls)
        container = QtWidgets.QWidget()
        container.setLayout(layout)
        self.setCentralWidget(container)

        # A timer redraws the newest picture about every 30 ms.
        self.timer = QtCore.QTimer()
        self.timer.timeout.connect(self.refresh_video)
        self.timer.start(30)
```

**Coach note:** Two layouts: `QVBoxLayout` stacks vertically, `QHBoxLayout` places side by side. The timer is what keeps the picture fresh.

---

## Slide 17 — on_connect(): Connect, Then Start the Thread

**On screen**

- Try to `connect()` with whatever IP is in the box.
- A bad IP raises `OSError` → show "Could not connect" instead of crashing.
- On success, start the **background video thread** as a **daemon** (it stops when the app closes).

**Code (builds file · chunk 12/15):**

```python
    def on_connect(self):
        """Connect to the Pi, then start the background video thread."""
        global running
        try:
            connect(self.ip_box.text())    # use whatever IP is in the box
        except OSError as error:
            self.video_label.setText("Could not connect:\n" + str(error))
            return
        running = True
        thread = threading.Thread(target=video_thread)
        thread.daemon = True               # let it stop when the app closes
        thread.start()
```

**Coach note:** "Daemon" = the thread won't keep the program alive; closing the window lets the loop end with it.

---

## Slide 18 — Button Handlers: Toggle, Nudge, Home

**On screen**

- `on_track_changed` → flip the `track_faces` flag.
- `nudge` → move one servo a `SERVO_STEP`, clamped to its safe range.
- `go_home` → recentre both servos to **90°**.

**Code (builds file · chunk 13/15):**

```python
    def on_track_changed(self):
        """Remember whether the 'Track faces' box is ticked."""
        global track_faces
        track_faces = self.track_checkbox.isChecked()

    def nudge(self, channel, change):
        """Move one servo a step when an arrow button is pressed."""
        global pan_angle, tilt_angle
        if channel == PAN_SERVO:
            pan_angle = clamp(pan_angle + change, PAN_MIN, PAN_MAX)
            send_servo(PAN_SERVO, pan_angle)
        else:
            tilt_angle = clamp(tilt_angle + change, TILT_MIN, TILT_MAX)
            send_servo(TILT_SERVO, tilt_angle)

    def go_home(self):
        """Recentre the head to look straight ahead."""
        global pan_angle, tilt_angle
        pan_angle, tilt_angle = 90.0, 90.0
        send_servo(PAN_SERVO, pan_angle)
        send_servo(TILT_SERVO, tilt_angle)
```

**Coach note:** Both the buttons and `track_face()` call `send_servo()` / `clamp()` — show how the small functions get reused.

---

## Slide 19 — refresh_video(): Copy, Convert, Show

**On screen**

- The timer calls this. Take a quick **copy under the lock** so the thread keeps working.
- Swap OpenCV's **BGR** to Qt's **RGB** (that's why faces look natural, not blue).
- Wrap the pixels in a `QImage` and draw it on the label.

**Code (builds file · chunk 14/15):**

```python
    def refresh_video(self):
        """Copy the newest picture from the thread and draw it in the window."""
        with frame_lock:
            frame = None if latest_frame is None else latest_frame.copy()
        if frame is None:
            return                         # no picture yet
        # OpenCV uses Blue-Green-Red; Qt expects Red-Green-Blue, so swap.
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        height, width, _ = rgb.shape
        image = QtGui.QImage(rgb.data, width, height, 3 * width,
                             QtGui.QImage.Format_RGB888)
        self.video_label.setPixmap(QtGui.QPixmap.fromImage(image))
```

**Coach note:** Copying *under the lock* keeps the copy quick, so the background thread is barely paused. The BGR→RGB swap is the classic OpenCV+Qt gotcha.

---

## Slide 20 — destroy() & the Main Block

**On screen**

- `destroy()` stops the thread and closes the sockets.
- The main block builds the `QApplication`, shows the window, and **always** cleans up.
- PyQt runs its **own loop** (`app.exec_()`) — so the wrapper is `try / finally`, not the usual `try / except KeyboardInterrupt / finally`.

**Code (builds file · chunk 15/15):**

```python
def destroy():
    """Stop the thread and close the connections when the app ends."""
    global running
    running = False                        # tell the video thread to stop
    if video_file is not None:
        video_file.close()
    if video_socket is not None:
        video_socket.close()
    if command_socket is not None:
        command_socket.close()



if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)   # every PyQt program needs one
    window = CameraWindow()
    window.show()
    try:
        app.exec_()                        # runs until you close the window
    finally:
        destroy()                          # always clean up on the way out
```

**Coach note:** Same clean-shutdown *habit* as every lesson — `destroy()` in `finally` — just guarding a window + sockets instead of motors.

---

## Slide 21 — We Built the Whole File 🎉

**On screen**
- Complete `lesson_11_camera_gui.py`:
  - imports → settings → shared state → `connect()` → `read_frame()` → `send_servo()`/`clamp()` → `track_face()` → `video_thread()` → `CameraWindow` → handlers → `refresh_video()` → `destroy()` → main
- **One class** for the window, **plain functions** for the work, **one thread** for the video.

**Visual:** Design System/assets/icons/success.png

**Coach note:** Tie it back to slide 5: a class only because PyQt needs one; everything else is the lesson style they already know.

---

## Slide 22 — Run It

**On screen**

- **Step 1 — on the Pi:** start the car's server.

```sh
cd smartcar2026/Code/Server
sudo python3 main.py
```

- **Step 2 — on your computer:** run the GUI.

```sh
cd smartcar2026/Code/User
python lesson_11_camera_gui.py
```

- In the window: type your Pi's IP → click **Connect** → tick **Track faces**.

**Visual:** Design System/assets/icons/terminal.png

**Coach note:** The IP box defaults to `192.168.1.50` — students must change it to their Pi's IP. Ports 5000 and 8000 must be reachable.

---

## Slide 23 — Moving the Camera Head

**On screen**

- Each button nudges one servo by `SERVO_STEP` (4°), sent as a `CMD_SERVO` command.
- **Up / Down** → tilt, channel `"1"` (+4° / -4°).
- **Left / Right** → pan, channel `"0"` (-4° / +4°).
- **Home** → recentre pan and tilt to **90°**.
- Format: `CMD_SERVO#0#<pan>` and `CMD_SERVO#1#<tilt>`.

**Visual:** [ASSET NEEDED: plus-pad button map — Up/Down/Left/Right/Home with their servo + degree labels] (deck draws this as a CSS plus-pad)

**Coach note:** Connect the plus-pad layout back to chunk 10 — the grid coordinates make the shape.

---

## Slide 24 — Try It Yourself

**On screen**

- Change `SERVO_STEP` — bigger = faster, jerkier head; smaller = slower, smoother.
- Change `DEAD_ZONE` — bigger ignores more wobble; smaller follows more eagerly.
- Resize the window's frame with `FRAME_WIDTH` / `FRAME_HEIGHT`.
- **Challenge:** add a **snapshot button** that saves the current frame as a `.png` with a timestamp, or a label showing the live pan/tilt angles.

**Coach note:** `SERVO_STEP` and `DEAD_ZONE` are the fun dials — let students feel twitchy vs. smooth tracking.

---

## Slide 25 — Troubleshooting

**On screen**

- **"Could not connect"** → wrong IP, or ports 5000/8000 blocked. Fix and click Connect again.
- **Image is black / freezes** → check the camera cable; restart the GUI and the Pi server.
- **Face tracking does nothing** → tick **Track faces**; the cascade must load from `Code/Client/`.
- **Detection feels slow** → it runs on *your computer*, not the Pi. Improve lighting and face the camera.

**Visual:** Design System/assets/icons/error.png + Design System/assets/icons/warning.png

**Coach note:** Most issues are the wrong IP or the server not started. Check those two first, every time.

---

## Slide 26 — Recap & What's Next

**On screen**

- You built a **desktop GUI** that ties together Pi capture, TCP streaming, OpenCV decoding, PyQt display, and servo control.
- You learned the big new idea: a **background thread** keeps the window responsive.
- **Key idea:** the GUI follows *where* a face is, not *who* it is — a clean base for a final project.
- This is the course capstone — now make it your own!

**Visual:** Design System/assets/main/smart-car-full.png

**Coach note:** Send them off with the extension ideas from slide 24 — this file is a great starting point for final projects.

---

<!-- HIDDEN — COACH NOTES (do not show to students) -->

## Coach Notes (hidden)

**Timing (~50–55 min):** Intro + concepts (1–5) ~12 min · build the file (6–21) ~25 min · run + control (22–23) ~10 min · experiment/troubleshoot/recap (24–26) ~8 min. The build is long — consider a short break after the thread (slide 13).

**Before class**

- Confirm each Pi runs the full server: `sudo python3 main.py` from `Code/Server` (the camera + command ports both come from the main server).
- Install `opencv-python`, `numpy`, and `PyQt5` on each student computer (a venv is ideal). PyQt5 is the new dependency this lesson.
- Confirm `haarcascade_frontalface_default.xml` is in `Code/Client/` (the cascade path resolves there via `car_setup.CODE_DIR`).
- Know how to find each Pi's IP (`hostname -I`) and write it on the board.

**Key teaching points**

- A PyQt5 window needs one class; everything else stays a plain function — same lesson style.
- A background thread does the slow work (network + face detection) so the window's buttons stay responsive; a `Lock` keeps the shared frame safe.
- Two connections, two ports: video in on 8000, servo commands out on 5000 — the same ports the car server opens.
- OpenCV is BGR, Qt is RGB — the `cv2.cvtColor(..., COLOR_BGR2RGB)` swap is why faces aren't blue-tinted.
- The clean-shutdown habit (`destroy()` in `finally`) carries over; PyQt just supplies its own event loop via `app.exec_()`.

**Safety**

- Servo head only — no driving motors in this lesson. Still keep fingers clear of the pan/tilt bracket when Home/arrow buttons fire.

**Most common failures** (ranked)

1. Wrong Pi IP in the box, or the server not started → "Could not connect".
2. `PyQt5` (or `opencv-python` / `numpy`) not installed on the student's computer.
3. Cascade file missing from `Code/Client/` → Track faces does nothing.
4. Black/frozen video → camera ribbon cable or the Pi camera not enabled.

**Teaching tips**

- Demo the *responsiveness* point: with tracking on, the buttons still click instantly — that's the thread earning its keep.
- Have a volunteer move across the frame to show the dead zone (no twitch when centred) vs. correction at the edges.

**Assets to source (flagged in deck)**

- Pipeline diagram (Pi → stream 8000 → decode → display; commands back on 5000) — slide 4 (deck draws a CSS version).
- Plus-pad button map with servo/degree labels — slide 23 (deck draws a CSS version).
- Optional: a real screenshot of the running Camera GUI window for the title or intro (deck currently uses a CSS window mockup).

