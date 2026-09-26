# Lesson 6 — Camera Streaming

**Organization:** AI Code Academy · aicodeacademy.com
**Course:** Machine Learning with Raspberry Pi & Smart Car (Level 3)
**Lesson:** 6 — Camera Streaming
**Source files:** ../Code/User/lesson_6_pi_camera_stream_server.py (Pi) · ../Code/User/lesson_6_client_video_receiver.py (viewer)
**Runs on:** Server on the **Raspberry Pi** (needs `picamera2`) · viewer on the **Pi or a laptop** (needs `opencv-python` + `numpy`)

> Layout/outline doc. Each `---` block below = one slide. This lesson builds
> **two** files — a Pi camera server and a computer viewer — chunk-by-chunk.

---

## Slide 1 — Title

**On screen**
- **Lesson 6 — Camera Streaming**
- Machine Learning with Raspberry Pi & Smart Car (Level 3)
- AI Code Academy · aicodeacademy.com

**Visual:** Design System/assets/main/company-logo.png (corner) + Design System/assets/materials/electronic-parts/camera-module.png (hero)

**Coach note:** ~1 min. Make sure each car's camera module is connected before class.

---

## Slide 2 — Introduction

**On screen**
- So far the car *drives* and *senses* — now we give it **eyes**.
- We'll send live video from the Pi's camera to your computer over **Wi-Fi**.
- This is the foundation for **face tracking** (Lessons 7 & 8).

**Visual:** Design System/assets/icons/camera-black.png + Design System/assets/icons/wifi.png

**Coach note:** Frame this as the bridge into the "machine learning / vision" half of the course.

---

## Slide 3 — Our Goals

**On screen**
- Build **two programs** that talk to each other:
  - **Server** (on the Pi) — opens the camera and sends pictures.
  - **Viewer/Client** (on the Pi or a laptop) — shows the live video.
- Learn how programs send data over a **network** with sockets.

**Visual:** Design System/assets/icons/server-client-black.png

**Coach note:** Two files this lesson. Keep clear which one runs where.

---

## Slide 4 — Client & Server, Again

**On screen**
- Same idea as Lesson 2, but now over a real network:
  - The **Pi is the server** — it waits on **port 8000** and sends video.
  - Your **computer is the client** — it connects and displays the video.
- A **port** is like a numbered door on a computer.

**Visual:** Design System/assets/icons/server-client-black.png

**Coach note:** Reuse the L2 customer/kitchen analogy; the "order" is now a stream of pictures.

---

## Slide 5 — The Frame Protocol

**On screen**
- How do we send a *picture* over a connection that only carries bytes?
- Agreement between both sides for **every frame**:
  1. send **4 bytes** = how big the picture is, then
  2. send the **JPEG picture** bytes.
- A size of **0** means "no more pictures — stop."
- This is the contract between the **two files** we'll build: the **server** `lesson_6_pi_camera_stream_server.py` (Pi) sends frames, and the **client/viewer** `lesson_6_client_video_receiver.py` (Pi or laptop) reads them.

**Visual:** [ASSET NEEDED: diagram of the stream — [4-byte length][JPEG bytes][4-byte length][JPEG bytes]… [0]]

**Coach note:** This "length, then data" rule is the heart of the lesson. The viewer reads it back the exact same way.

---

## Slide 6 — Part A: The Pi Camera Server 🥧

**On screen**
- File: **`lesson_6_pi_camera_stream_server.py`**
- Runs **on the Raspberry Pi**.
- Job: open the camera → wait for the computer → send frames.

**Visual:** Design System/assets/icons/raspberry-pi.png

**Coach note:** Section divider. Everyone codes this file first; it must be running before the viewer connects.

---

## Slide 7 — Server: Imports

**On screen**
- `io` (in-memory file), `socket` (network), `struct` (number → bytes), `time`.
- `picamera2` controls the Raspberry Pi camera.

**Code (server · chunk A1/7):**
```python
"""Lesson 6 (Raspberry Pi side): stream the camera to the computer."""

import io                 # an in-memory "file" for the photo
import socket             # lets two computers talk over the network
import struct             # turns a number into a fixed set of bytes
import time

from picamera2 import Picamera2   # controls the Raspberry Pi camera
```

**Coach note:** No `car_setup` here — this file uses only standard libraries + the camera, not the car's motor/sensor modules.

---

## Slide 8 — Server: Settings

**On screen**
- `VIDEO_PORT = 8000` — the door the computer connects to.
- Picture size, frame rate, and a short camera warm-up.

**Code (server · chunk A2/7):**
```python
# ---- settings ----
VIDEO_PORT = 8000         # the "door number" the computer connects to
HOST = ""                 # "" = accept a connection on any of our addresses
FRAME_WIDTH = 400         # picture width in pixels
FRAME_HEIGHT = 300        # picture height in pixels
FRAME_RATE = 15           # pictures per second to capture
WARMUP_SECONDS = 2        # let the camera adjust before streaming
```

**Coach note:** Smaller frames = smoother streaming. They'll experiment with this later.

---

## Slide 9 — Server: `setup()` — Open the Door & Start the Camera

**On screen**
- Make a **socket**, claim port 8000, and **listen** for one connection.
- Then start the camera and let it warm up.

**Code (server · chunk A3/7):**
```python
server_socket = None
connection = None
camera = None


def setup():
    """Open the network doorway and start the camera."""
    global server_socket, camera
    # AF_INET = internet addresses; SOCK_STREAM = a reliable TCP connection.
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server_socket.bind((HOST, VIDEO_PORT))   # claim the port
    server_socket.listen(1)                  # listen for 1 connection
    print("Camera server ready on port", VIDEO_PORT, "- waiting...")

    camera = Picamera2()
    camera.configure(camera.create_video_configuration(
        main={"size": (FRAME_WIDTH, FRAME_HEIGHT)}))
    camera.start()
    time.sleep(WARMUP_SECONDS)               # let the camera settle
```

**Coach note:** Don't dwell on socket details — "make a door, claim a number, listen" is enough. `SO_REUSEADDR` just lets us restart cleanly.

---

## Slide 10 — Server: `accept_client()` — Wait for the Computer

**On screen**
- `accept()` **pauses** the program until the computer connects.
- `makefile("wb")` lets us **write bytes** to the connection like a file.

**Code (server · chunk A4/7):**
```python
def accept_client():
    """Wait until the computer connects, then open the pipe."""
    global connection
    client_socket, address = server_socket.accept()   # pauses until connected
    connection = client_socket.makefile("wb")         # write Bytes like a file
    print("Computer connected from", address[0])
```

**Coach note:** "wb" = write-bytes. The matching viewer will use "rb" = read-bytes.

---

## Slide 11 — Server: `loop()` — Capture & Send Each Frame

**On screen**
- Take a JPEG into an in-memory file, then send **size first, picture second**.
- Exactly the protocol from slide 5.

**Code (server · chunk A5/7):**
```python
def loop():
    """Capture pictures forever and send each one down the pipe."""
    stream = io.BytesIO()                     # an in-memory file for the photo
    while True:
        stream.seek(0); stream.truncate()     # empty it
        camera.capture_file(stream, format="jpeg")   # take one JPEG

        length = stream.tell()                # how many bytes the photo took
        connection.write(struct.pack("<L", length))   # send the 4-byte size
        connection.flush()                    # push it out now

        stream.seek(0)                        # rewind to the photo's start
        connection.write(stream.read())       # send the picture bytes
```

**Coach note:** `struct.pack("<L", length)` makes the 4 size-bytes. The viewer's `struct.unpack` reverses it.

---

## Slide 12 — Server: `destroy()` — Send "Done" & Close

**On screen**
- Send a size of **0** as the agreed "stop" signal.
- Close the camera and the socket tidily.

**Code (server · chunk A6/7):**
```python
def destroy():
    """Tell the computer we are done and close everything."""
    if connection is not None:
        try:
            connection.write(struct.pack("<L", 0))   # 0 = "no more pictures"
        except OSError:
            pass                             # the computer may already be gone
        connection.close()
    if camera is not None:
        camera.stop(); camera.close()
    if server_socket is not None:
        server_socket.close()
```

**Coach note:** The `length == 0` signal is how the viewer knows to stop cleanly. Same clean-shutdown habit as always.

---

## Slide 13 — Server: The Main Block

**On screen**
- Open everything, wait for the computer, then stream — with the usual safe wrapper.

**Code (server · chunk A7/7):**
```python
if __name__ == "__main__":
    try:
        setup()
        accept_client()                      # wait for the computer
        loop()                               # then stream pictures
    except KeyboardInterrupt:
        pass
    finally:
        destroy()
```

**Coach note:** Note the order: setup → accept → loop. The server waits for a viewer before sending anything.

---

## Slide 14 — Part B: The Computer Viewer 💻

**On screen**
- File: **`lesson_6_client_video_receiver.py`**
- Runs **on the Pi or a laptop**.
- Job: connect to the Pi → read frames → show them in a window.

**Visual:** Design System/assets/icons/server-client-black.png

**Coach note:** Section divider. This file needs `opencv-python` and `numpy` installed.

---

## Slide 15 — Viewer: Imports

**On screen**
- `socket`, `struct`, `sys` (to read the IP you type).
- `cv2` (OpenCV — shows the window) and `numpy` (turns bytes into an image).

**Code (viewer · chunk B1/5):**
```python
"""Lesson 6 (viewer side): show the video coming from the Pi camera."""

import socket             # connect to the Pi over the network
import struct             # turn the 4 size-bytes back into a number
import sys                # read the IP address you type in

import cv2                # OpenCV: shows the picture in a window
import numpy as np        # NumPy: turns raw bytes into an image
```

**Coach note:** First time using OpenCV (`cv2`). It does the heavy lifting of showing images.

---

## Slide 16 — Viewer: Settings + `setup()` — Read IP & Connect

**On screen**
- You type the Pi's IP on the command line; `sys.argv[1]` reads it.
- Connect to port 8000 and read it like a file with `makefile("rb")`.

**Code (viewer · chunk B2/5):**
```python
VIDEO_PORT = 8000                          # must match the Pi server's port
WINDOW_NAME = "Lesson 6 - Pi Camera"
video_socket = None
video_file = None


def setup():
    """Read the Pi's address from the command line and connect."""
    global video_socket, video_file
    if len(sys.argv) < 2:
        raise SystemExit("Please pass the Pi's IP, e.g. python this.py 192.168.1.50")
    pi_ip = sys.argv[1]

    video_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    video_socket.connect((pi_ip, VIDEO_PORT))   # dial the Pi's camera port
    video_file = video_socket.makefile("rb")    # read Bytes like a file
    print("Connected to", pi_ip)
```

**Coach note:** Use `127.0.0.1` if running the viewer on the Pi itself. Port must match the server (8000).

---

## Slide 17 — Viewer: `read_frame()` — Read Size, Then Picture

**On screen**
- Read the **4 size-bytes**, turn them into a number.
- If the size is 0 → the stream ended.
- Otherwise read exactly that many bytes and decode the JPEG.

**Code (viewer · chunk B3/5):**
```python
def read_frame():
    """Read one picture from the Pi, or None when the stream ends."""
    header = video_file.read(4)            # the 4 size-bytes
    if len(header) != 4:
        return None
    length = struct.unpack("<L", header)[0]   # bytes -> number
    if length == 0:
        return None                        # the Pi's "I'm done" signal

    jpeg_data = video_file.read(length)    # read exactly that many bytes
    if len(jpeg_data) != length:
        return None
    # Turn the raw JPEG bytes into a picture OpenCV can show.
    return cv2.imdecode(np.frombuffer(jpeg_data, dtype=np.uint8), cv2.IMREAD_COLOR)
```

**Coach note:** This mirrors the server exactly: server packs the size, viewer unpacks it. `[0]` because `unpack` returns a tuple.

---

## Slide 18 — Viewer: `loop()` — Show the Video

**On screen**
- Read a frame, show it, repeat. Press **q** to quit.
- `waitKey(1)` lets the window refresh and checks for a key.

**Code (viewer · chunk B4/5):**
```python
def loop():
    """Read pictures and show them until the video ends or you quit."""
    while True:
        frame = read_frame()
        if frame is None:
            break                          # no more pictures
        cv2.imshow(WINDOW_NAME, frame)     # draw the picture
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break
```

**Coach note:** `q` to quit is an OpenCV convention used in every vision lesson from here on.

---

## Slide 19 — Viewer: `destroy()` + Main Block

**On screen**
- Close the connection and the window cleanly.

**Code (viewer · chunk B5/5):**
```python
def destroy():
    """Close the connection and the window."""
    if video_file is not None:
        video_file.close()
    if video_socket is not None:
        video_socket.close()
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

**Coach note:** Same safe pattern as every lesson — just closing a network connection and a window instead of motors.

---

## Slide 20 — We Built Both Files 🎉

**On screen**
- **Server** (Pi): imports → settings → `setup()` → `accept_client()` → `loop()` → `destroy()` → main
- **Viewer** (computer): imports → `setup()` → `read_frame()` → `loop()` → `destroy()` → main
- They agree on one rule: **size first, picture second**.

**Visual:** Design System/assets/icons/success.png

**Coach note:** Stress the symmetry: server `pack`s the size, viewer `unpack`s it; server "wb", viewer "rb".

---

## Slide 21 — Run It

**On screen**
- **Step 1 — on the Pi**, start the server:
```sh
cd smartcar2026/Code/User
python3 lesson_6_pi_camera_stream_server.py
```
- **Step 2 — on the Pi or your laptop**, start the viewer with the Pi's IP:
```sh
python lesson_6_client_video_receiver.py 192.168.1.50
```
- A window shows the live camera. Press **q** to quit. (Use `127.0.0.1` on the Pi.)

**Visual:** Design System/assets/icons/terminal.png + Design System/assets/icons/wifi.png

**Coach note:** **Server first, then viewer.** Help students find the Pi's IP (`hostname -I`).

---

## Slide 22 — Try It Yourself

**On screen**
- Change `FRAME_WIDTH` / `FRAME_HEIGHT` (server) — bigger vs smoother?
- Change `FRAME_RATE` and watch the smoothness change.
- Rename `WINDOW_NAME` (viewer) to your own title.
- **Challenge:** run the viewer on a laptop while a classmate's runs on the Pi.

**Coach note:** Smaller frames stream much more smoothly over Wi-Fi — a good thing to discover by experiment.

---

## Slide 23 — Troubleshooting

**On screen**
- `Connection refused` → start the **server first**, and check the IP/port (8000).
- Black or frozen window → camera not ready; check the camera cable and `picamera2`.
- Laggy video → lower the resolution / frame rate, or get closer to the router.
- `ModuleNotFoundError: cv2` → install `opencv-python` and `numpy` on the viewer.

**Visual:** Design System/assets/icons/error.png + Design System/assets/icons/warning.png

**Coach note:** 90% of issues are "viewer started before server" or "wrong IP." Check those first.

---

## Slide 24 — Recap & What's Next

**On screen**
- You streamed live video from the Pi to a computer using a **socket** and a simple **frame protocol**.
- You met **OpenCV** — your tool for everything visual.
- **Next — Lesson 7:** detect a **face** in the video and turn the head to follow it.

**Visual:** Design System/assets/icons/face-scanner.png

**Coach note:** Tease face tracking — it reuses this exact `read_frame()` idea.

---

<!-- HIDDEN — COACH NOTES (do not show to students) -->

## Coach Notes (hidden)

**Timing (~50–55 min):** Intro + concepts (1–5) ~12 min · build server (6–13) ~15 min · build viewer (14–20) ~15 min · run + experiment (21–22) ~10 min · troubleshoot/recap (23–24) ~5 min. This is a longer lesson — consider splitting across two sessions if needed.

**Before class**
- Confirm each camera module is connected and enabled; test `picamera2` on the Pi.
- Install `opencv-python` + `numpy` on any laptops used as viewers (a venv is ideal).
- Know how to find the Pi's IP (`hostname -I`) and write it on the board.

**Key teaching points**
- The frame protocol (size-then-data) and its symmetry between the two files.
- Server runs first and waits; viewer connects to its IP on port 8000.
- `127.0.0.1` (localhost) when both run on the Pi.

**Most common failures**
1. Viewer started before server → `Connection refused`.
2. Wrong IP address.
3. Missing `opencv-python` / `numpy` on the viewer.
4. Camera cable loose / `picamera2` not installed.

**Assets to source (flagged in deck)**
- Frame-protocol diagram: `[4-byte length][JPEG][4-byte length][JPEG]…[0]` — slide 5.
