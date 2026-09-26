# Lesson 0 — Initial ==Setup==

**Organization:** AI Code Academy · aicodeacademy.com
**Course:** Machine Learning with Raspberry Pi & Smart Car (Level 3)
**Lesson:** 0 — Initial Setup
**Format:** Hands-on setup session — get to know the kit, flash the Raspberry Pi, connect to it remotely, and install the course code. Coach-guided.
**Works on:** A computer (Windows / macOS / Linux) + the Raspberry Pi.

> Layout/outline doc. Each `---` block below = one slide. This is the longest
> deck — a full setup walkthrough. Terminal commands appear in code blocks.

---

## Slide 1 — Title

**On screen**

- **Lesson 0 — Initial Setup**
- Machine Learning with Raspberry Pi & Smart Car (Level 3)
- AI Code Academy · aicodeacademy.com

**Visual:** Design System/assets/main/company-logo.png (corner) + Design System/assets/main/smart-car-full.png (hero)

**Coach note:** ~2 min. Welcome everyone to the course. This session is about getting set up — patience pays off; later lessons depend on it.

---

## Slide 2 — Introduction

**On screen**

- Welcome to the course! Before we write code, we prepare our robot.
- Today is **all setup** — the kit, the Raspberry Pi (the car's brain), and the course code.
- It's the longest, most technical session — but you only do it once.

**Visual:** Design System/assets/main/smart-car-side-full.png

**Coach note:** Reassure students: setup is fiddly for everyone. We'll go step by step and help each other.

---

## Slide 3 — Our Goals

**On screen**

- By the end of today you will:
  - know the **parts** of your kit and how to build the car,
  - handle **batteries safely** and power the Pi correctly,
  - **flash** Raspberry Pi OS and boot the Pi,
  - reach the Pi from your computer with **SSH** and **VNC**,
  - **install the course code** (on the Pi and your computer) and confirm it runs.

**Visual:** Design System/assets/icons/success.png

**Coach note:** Set the finish line clearly: a working, reachable Pi with the course code installed, plus a ready-to-go computer.

---

## Slide 4 — Two References You'll Use All Course

**On screen**

- Keep these two PDFs handy (in the repo's `Resources/` folder):
  - 📘 **[Tutorial.pdf](https://github.com/renashall/smartcar2026/blob/main/Resources/Tutorial.pdf)** — building the car and general kit guidance.
  - 🔋 **[About_Battery.pdf](https://github.com/renashall/smartcar2026/blob/main/Resources/About_Battery.pdf)** — choosing and handling batteries safely.
- Note: the code has been updated since the Tutorial was written, so trust the **lesson decks** for code.

**Visual:** Design System/assets/icons/technology.png

**Coach note:** Point students to `Resources/Tutorial.pdf` and `Resources/About_Battery.pdf`. Flag the Tutorial-vs-current-code caveat now to avoid confusion later.

---

## Slide 5 — What's in the Box

**On screen**

- Your kit has five groups of parts:
  1. the **car board** + acrylic frame,
  2. **transmission** parts (motors, wheels),
  3. **electronic** parts (sensors, camera, cables),
  4. **tools**,
  5. **power** (batteries, charger, cables).
- Let's look at each group.

**Visual:** Design System/assets/materials/electronic-parts/electronic-parts-set.png + Design System/assets/materials/transmission-parts/transmission-parts-set.png + Design System/assets/materials/tools/tools-set.png

**Coach note:** Have students open their kits and lay parts out in these groups. ~5 min to inventory.

---

## Slide 6 — The Car Board & Frame

**On screen**

- **Smart car board** — the main circuit board the Pi sits on.
- **Acrylic parts** — the layered frame/chassis.
- **Screw set** — holds it all together.

**Visual:** Design System/assets/materials/smart-car-board.png + Design System/assets/materials/acrylic-parts.png + Design System/assets/materials/screw-set.png

**Coach note:** Acrylic may have a protective paper film to peel. Mention it so students don't think it's scratched.

---

## Slide 7 — Transmission Parts: Motors & Wheels

**On screen**

- **DC motors** — drive the four wheels.
- **Motor brackets** — hold the motors to the frame.
- **Servo motor set** — turns the camera head.
- **Wheels** — push onto the motor shafts.

**Visual:** Design System/assets/materials/transmission-parts/dc-motor.png + Design System/assets/materials/transmission-parts/motor-bracket-set.png + Design System/assets/materials/transmission-parts/servo-motor-set.png + Design System/assets/materials/transmission-parts/wheel.png

**Coach note:** These are the parts from Lessons 1–2 (servo + motors). Preview that connection.

---

## Slide 8 — Electronic Parts: Sensors & Cables

**On screen**

- **Connection board** — links sensors to the Pi.
- **Ultrasonic sensor** — distance (the "eyes" for obstacles).
- **Camera module** — video for Lessons 6–8.
- **Line-tracker module** — the IR line sensors (Lesson 5).
- **Jumper wire & cables** — wiring it together.

**Visual:** Design System/assets/materials/electronic-parts/connection-board.png + Design System/assets/materials/electronic-parts/ultrasonic-sensor.png + Design System/assets/materials/electronic-parts/camera-module.png + Design System/assets/materials/line-tracker-module.png + Design System/assets/materials/electronic-parts/4-pin-jumper-wire.png + Design System/assets/materials/electronic-parts/5-pin-cable.png

**Coach note:** Map each sensor to the lesson that uses it — it makes the kit feel purposeful.

---

## Slide 9 — Tools

**On screen**

- **Screwdriver** (3 mm) — assembly.
- **Black tape** — also handy for making a line track (Lesson 5!).
- **Wire tidy** — keep cables neat.

**Visual:** Design System/assets/materials/tools/tools-set.png + Design System/assets/materials/tools/3-mm-screw-driver.png + Design System/assets/materials/tools/black-tape.png + Design System/assets/materials/tools/wire-tidy.png

**Coach note:** Tell students to keep the tape — they'll build a line track with it in Lesson 5.

---

## Slide 10 — Building the Car → Follow Tutorial.pdf

**On screen**

- The full step-by-step **assembly** is in **[`Resources/Tutorial.pdf`](https://github.com/renashall/smartcar2026/blob/main/Resources/Tutorial.pdf)**.
- Build the frame, mount motors + wheels, attach the head/camera, and seat the Pi on the board.
- Take your time and keep screws organized.

**Visual:** Design System/assets/main/smart-car-full.png (the finished goal)

**Coach note:** Decide whether assembly happens in-class or as homework. Budget time accordingly; assembly can take a while. Tutorial.pdf has the photos.

---

## Slide 11 — Power: What You'll Use

**On screen**

- **18650 batteries** — power the car's motors and the Pi when mobile.
- **Battery charger** — recharge the 18650 cells.
- **AC power adapter** — power the Pi directly during setup.
- **USB cables** — the right cable for your Pi model.

**Visual:** Design System/assets/materials/18650-batteries.png + Design System/assets/materials/battery-charger.png + Design System/assets/materials/dc-power-supply.png

**Coach note:** During setup we usually power the Pi from the wall adapter; batteries are for driving later.

---

## Slide 12 — The 18650 Batteries

**On screen**

- The car uses **18650** rechargeable lithium cells.
- **Buy quality cells** — cheap/counterfeit ones can be unsafe and perform poorly.
  - A reputable source: **18650batterystore.com**
- Full guidance is in **[`Resources/About_Battery.pdf`](https://github.com/renashall/smartcar2026/blob/main/Resources/About_Battery.pdf)** — read it before charging.

**Visual:** Design System/assets/materials/18650-batteries.png

**Coach note:** Emphasize buying the correct, genuine cells. Point to About_Battery.pdf for exact specs.

---

## Slide 13 — ⚠️ Battery Safety

**On screen**

- Treat lithium batteries with respect:
  - Use the **correct type** for the car (see [About_Battery.pdf](https://github.com/renashall/smartcar2026/blob/main/Resources/About_Battery.pdf)).
  - Insert with the right **polarity** (+ / −).
  - **Never short** the terminals; keep cells away from coins/keys/metal.
  - **Don't use damaged** cells (dented, leaking, or wrapper torn).
  - Charge with the **proper charger**; don't leave it charging unattended.
  - Keep away from heat/water; store in a cool, dry place.

**Visual:** Design System/assets/icons/warning.png + Design System/assets/materials/18650-batteries.png

**Coach note:** Do this slide seriously and slowly. Stop and answer questions. When in doubt, set a bad cell aside and don't use it.

---

## Slide 14 — Charging the Batteries

**On screen**

- Use the included/recommended **charger**.
- Charge cells **fully** before the first drive.
- Watch orientation in the charger (+ / −).
- Unplug when done; don't overcharge or leave unattended.

**Visual:** Design System/assets/materials/battery-charger.png

**Coach note:** Start charging early in the session so cells are ready for later lessons. Most "car won't drive" issues are weak batteries.

---

## Slide 15 — Powering the Raspberry Pi (Use the Right Adapter)

**On screen**

- The Pi needs a **proper power supply** — match your model:
  - **Pi 5:** 5V / 5A (25W)
  - **Pi 4:** 5V / 3A (15W)
  - **Pi 3:** 5V / 2.5A (12W)
- Use a **quality AC adapter and cable** — **not** a PC USB port.
- Underpowering causes ⚡ warnings on screen and the Pi may not boot.

**Visual:** Design System/assets/materials/usbc-usbc.png + Design System/assets/materials/usba-micro-usb.png + Design System/assets/icons/warning.png

**Coach note:** Pi 4/5 use **USB-C**; Pi 3 uses **micro-USB**. Wrong/weak adapters are a top cause of boot and stability problems.

---

## Slide 16 — Which Raspberry Pi?

**On screen**

- This course works with **Raspberry Pi 3B+, 4, or 5**.
- ⭐ **Pi 3 or 4 is recommended** — they have the **standard camera ribbon connector** the kit's camera plugs into.
- **Pi 5 works too**, but its camera connector is **different**, so the kit's ribbon camera **won't connect**. On a Pi 5, the **camera components and lessons (6–8) won't work**.
- Check which one you have — it also sets your **power cable** and adapter.

**Visual:** Design System/assets/raspberry-pi-boards/raspberry-pi-4-b-plus.png + Design System/assets/raspberry-pi-boards/raspberry-pi-3-b-plus-to-1-b-plus.png

**Coach note:** The kit camera uses the standard 15-pin ribbon connector found on Pi 3/4. The Pi 5 uses a smaller, different camera connector, so the included ribbon camera won't plug in — Pi 5 students can do everything *except* the camera/vision lessons (6–8) unless they source a Pi 5 adapter cable. Lessons 7–8 (face detection) are CPU-heavy and run best on a Pi 4 or a laptop.

---

## Slide 17 — What You Need to Set Up the Pi

**On screen**

- A **microSD card** + a card reader/adapter.
- A **computer** (Windows / macOS / Linux) to flash the card.
- Your **Wi-Fi** name and password.
- The right **power adapter** for your Pi.

**Visual:** Design System/assets/materials/sd-card-and-card-adapter.png + Design System/assets/icons/wifi.png

**Coach note:** Make sure each student has a reader that fits their computer. Have Wi-Fi details ready (or a hotspot).

---

## Slide 18 — Step 1: Install Raspberry Pi Imager

**On screen**

- On **your computer**, download and install **Raspberry Pi Imager**:
  - https://www.raspberrypi.com/software/
- It's free and flashes Raspberry Pi OS onto the microSD card.
- Insert your microSD card (via the reader) when ready.

**Visual:** Design System/assets/icons/raspberry-pi.png + Design System/assets/icons/windows.png + Design System/assets/icons/mac-apple-black.png + Design System/assets/icons/linux.png

**Coach note:** Make sure everyone grabs the version for their OS. Installs are quick.

---

## Slide 19 — Step 2: Choose Device, OS & Storage

**On screen**

- Open Raspberry Pi Imager and pick three things:
  1. **Device** — your Pi model.
  2. **Operating System** — choose **Raspberry Pi OS (32-bit)**, the **Bookworm** image (under "Raspberry Pi OS (other)"). **Not the 64-bit version.**
  3. **Storage** — your microSD card (double-check you pick the SD card!).
- ℹ️ **Note:** 64-bit *may* work depending on whether the course code has been updated since this video — feel free to test it. But as of this video, **32-bit Bookworm is the stable, known-good version**.

**Visual:** [ASSET NEEDED: Raspberry Pi Imager main screen — Device / OS / Storage buttons]

**Coach note:** ⚠️ Flashing **erases** the chosen drive. Have students confirm it's the SD card, not a USB drive. The 32-bit image lives under **"Raspberry Pi OS (other)" → "Raspberry Pi OS (32-bit)"** (Bookworm) — the default highlighted option is 64-bit, so students must switch it.

---

## Slide 20 — Step 3: Pre-Configure (the Important Part!)

**On screen**

- Before writing, open **⚙️ OS Customisation / Edit Settings** and set:
  - **Hostname** (e.g. `mypi` → reachable as `mypi.local`),
  - **Username & password** (pick something memorable),
  - **Wi-Fi** name + password (+ your country),
  - **locale / time zone**.
- On the **Services** tab: **enable SSH** (password authentication).

**Visual:** Design System/assets/icons/settings-wheel-black.png + Design System/assets/icons/wifi.png + [ASSET NEEDED: Imager OS customisation dialog with SSH enabled]

**Coach note:** This is the step that makes headless (no-monitor) setup possible. **Enabling SSH + Wi-Fi here saves huge pain later.** Write down each student's hostname/username/password.

---

## Slide 21 — Step 4: Write & First Boot

**On screen**

- Click **Write** and wait for it to finish (and verify).
- Eject the card, put it into the Pi, connect power.
- The first boot takes a couple of minutes — give it time.

**Visual:** Design System/assets/materials/screenshot-2026-06-19-025355.png

**Coach note:** First boot can be slow and may reboot itself once. Don't pull power mid-boot. The Pi joins your Wi-Fi automatically using the settings from Step 3.

---

## Slide 22 — Two Ways to Reach Your Pi

**On screen**

- Most setups are **headless** (no monitor for the Pi). We reach it from our computer two ways:
  - **SSH** — a text **terminal** on the Pi.
  - **VNC** — the Pi's full **desktop** in a window.
- We'll enable both.

**Visual:** Design System/assets/icons/terminal.png + Design System/assets/icons/raspberry-pi.png

**Coach note:** SSH first (it's enabled already from Step 3), then turn on VNC through SSH.

---

## Slide 23 — Find Your Pi

**On screen**

- You reach the Pi by **hostname** or **IP address**:
  - hostname: `mypi.local` (the name you set in Step 3),
  - IP: e.g. `192.168.1.50`.
- **Hostnames are handy** — if the IP changes, the name still works.

**Visual:** Design System/assets/icons/wifi.png

**Coach note:** On the Pi (or via your router) `hostname -I` shows the IP. The `.local` name needs Bonjour/mDNS (built into macOS; on Windows it usually works, install Bonjour if not).

---

## Slide 24 — SSH Into the Pi

**On screen**

- From **your computer's terminal**, connect with the username + hostname you set:

```sh
ssh <username>@<hostname>.local
# example:
ssh pi@mypi.local
```

- Say **yes** to the first-time fingerprint prompt, then enter your password.
- You're now typing commands **on the Pi**. 🎉

**Visual:** Design System/assets/icons/terminal.png

**Coach note:** On Windows use PowerShell/Terminal (`ssh` is built in). If `.local` fails, use the IP: `ssh pi@192.168.1.50`.

---

## Slide 25 — Enable VNC on the Pi

**On screen**

- Over your SSH connection, open the config tool:

```sh
sudo raspi-config
```

- Go to **Interface Options → VNC → Enable**.
- (The course setup scripts handle **I2C** and the **camera**, but enabling **VNC** is a manual step.)
- Finish and reboot if asked.

**Visual:** Design System/assets/icons/config-wheel-black.png

**Coach note:** If a student has a monitor on the Pi, they can use **Preferences → Raspberry Pi Configuration → Interfaces** instead. VNC gives them the desktop for the camera lessons.

---

## Slide 26 — Install VNC Viewer on Your Computer

**On screen**

- On **your computer**, download **VNC Viewer**:
  - https://www.realvnc.com/en/connect/download/viewer/
- Free; pick your OS. Newer versions may ask you to create an account.

**Visual:** Design System/assets/icons/windows.png + Design System/assets/icons/mac-apple-black.png + Design System/assets/icons/linux.png

**Coach note:** Have the download link on the board. Account creation is usually optional but sometimes required.

---

## Slide 27 — Connect with VNC Viewer

**On screen**

- Open VNC Viewer and enter your Pi's **hostname** or **IP**:
  - `mypi.local` (or `192.168.1.50`)
- Log in with your Pi **username & password**.
- The Pi's **desktop** appears in a window — you're in! 🖥️

**Visual:** Design System/assets/icons/raspberry-pi.png

**Coach note:** First connection may warn about an unencrypted/identity check — accept to continue. If the screen is tiny/black, see Troubleshooting (resolution).

---

## Slide 28 — Optional: Raspberry Pi Connect

**On screen**

- **Raspberry Pi Connect** lets you reach your Pi from **anywhere** (not just home Wi-Fi).
  - https://www.raspberrypi.com/software/connect/
- Free; needs an account, and you must sign in **on the Pi** once.
- Useful for screen-sharing or SSH when your local network is being difficult.

**Visual:** Design System/assets/screenshots/raspberry-pi-connect.png

**Coach note:** Optional and account-based. Good fallback if a student's school/home network blocks local discovery.

---

## Slide 29 — Download the Course Code

**On screen**

- You need the course code in **two places**: on the **Pi** (to drive the car) and on **your computer** (for the camera/vision lessons 6–8 & 11).
- Get it with **git** — the same command everywhere:

```sh
git clone https://github.com/renashall/smartcar2026.git
cd smartcar2026
```

- This creates a **`smartcar2026`** folder with all the lesson code.
- No git? Download the **ZIP** from the repo page and unzip it.

**Visual:** Design System/assets/icons/terminal.png

**Coach note:** The clone link is also posted on the class page / Discord. Students clone on **both** the Pi and their computer. Confirm each ends up with a `smartcar2026` folder.

---

## Slide 30 — Cloning in a Terminal: Mac · Windows · Pi

**On screen**

- The `git clone` command is **identical** on every system — only the terminal differs:
  - **Windows:** open **PowerShell** or **Windows Terminal**.
  - **macOS:** open **Terminal**.
  - **Raspberry Pi:** open **Terminal** (or your **SSH** session).
- Don't have git yet?
  - **Windows:** install from git-scm.com (or `winget install Git.Git`).
  - **macOS:** run `git --version` — it offers to install the tools; or `brew install git`.
  - **Pi:** usually preinstalled; if not, `sudo apt install git`.

**Visual:** Design System/assets/icons/windows.png + Design System/assets/icons/mac-apple-black.png + Design System/assets/icons/raspberry-pi.png

**Coach note:** Same command everywhere keeps it simple. On the Pi git is normally already there. Have the Windows git installer link ready.

---

## Slide 31 — Run Setup, Part 1 (on the Pi)

**On screen**

- From the `Code` folder, make the scripts runnable and start part 1:

```sh
cd smartcar2026/Code
chmod +x setupPart1.sh setupPart2.sh
./setupPart1.sh
```

- It enables Pi interfaces, makes `python3` the default `python`, and installs basic I2C support.
- When it finishes, it asks you to **reboot**.

**Visual:** Design System/assets/icons/config-wheel-black.png

**Coach note:** It auto-detects the Pi model/OS. Let it reboot before part 2. If SSH drops on reboot, reconnect after a minute. (These scripts run **on the Pi only**.)

---

## Slide 32 — Run Setup, Part 2 (on the Pi)

**On screen**

- After the reboot, return to the `Code` folder and run part 2:

```sh
cd smartcar2026/Code
./setupPart2.sh
```

- It sets up the **camera** boot config, installs the **LED (WS281x) driver** and the **course Python packages**.
- Then it asks you to **reboot** one more time.

**Visual:** Design System/assets/icons/success.png

**Coach note:** Two scripts, two reboots — by design. After this, the Pi has all the hardware libraries the lessons need.

---

## Slide 33 — What the Setup Scripts Did

**On screen**

- You don't need to memorize this, but the scripts set up:
  - the Pi **interfaces** (I2C, camera, etc.),
  - `python3` as the default **`python`**,
  - the **WS281x LED** driver,
  - the **course Python packages** the lessons import.
- That's why on the Pi you **don't** need a virtual environment.

**Visual:** Design System/assets/icons/technology.png

**Coach note:** Reassure: the scripts replace a lot of manual fiddling. If one failed, re-run it and read the last error line.

---

## Slide 34 — Where Your Code Lives: Code/User

**On screen**

- Put all your course work in:

```text
smartcar2026/Code/User
```

- Lesson files start with `import car_setup` so the car's modules import cleanly.
- We'll explain `car_setup.py` properly in **Lesson 1**.

**Visual:** Design System/assets/icons/terminal.png

**Coach note:** Keeping work in `Code/User` keeps it separate from the Freenove `Server`/`Client` code. Tease the `car_setup` explanation for Lesson 1.

---

## Slide 35 — Editing Code on the Pi: Thonny

**On screen**

- Raspberry Pi OS comes with **Thonny**, a beginner-friendly Python editor — already installed, nothing to download.
- Open it on the Pi desktop (over **VNC**): **Menu → Programming → Thonny**.
- Use it to open, write, and **save** your lesson files in `smartcar2026/Code/User`.
- It's the easy way to read and edit code right on the car.
- You **run** lessons from the terminal, not Thonny's Run button — we cover that in **Lesson 1**.

**Visual:** Design System/assets/icons/thonny-logo.png + Design System/assets/icons/raspberry-pi.png + Design System/assets/icons/terminal.png

**Coach note:** Thonny ships with Raspberry Pi OS and runs on the Pi desktop (reach it over VNC) — no install needed. Students edit and save in Thonny but run lessons from the terminal (the LED lessons need `sudo`); we explain that split in Lesson 1. Keep all work saved in `Code/User`.

---

## Slide 36 — Is Python Installed? (Your Computer)

**On screen**

- The **Pi** already has Python (the setup scripts handled it). These next steps are for **your computer**, for the vision lessons.
- Open a terminal and check the version:

```sh
# Windows
py --version
# macOS / Linux
python3 --version
```

- See something like `Python 3.12.x`? You're set — skip ahead to making a venv.

**Visual:** Design System/assets/icons/terminal.png + Design System/assets/icons/windows.png + Design System/assets/icons/mac-apple-black.png

**Coach note:** On Windows, `py` is the most reliable launcher. If typing `python` opens the Microsoft Store, use `py` instead. The course needs Python 3.9+.

---

## Slide 37 — Install Python if Needed

**On screen**

- If the check failed, install **Python 3**:
  - **Windows:** download from **python.org/downloads**, run it, and **tick "Add python.exe to PATH"**. (Or `winget install Python.Python.3.12`.)
  - **macOS:** download from **python.org/downloads**, or with Homebrew: `brew install python`.
- Close and re-open the terminal, then check the version again.

**Visual:** Design System/assets/icons/windows.png + Design System/assets/icons/mac-apple-black.png + Design System/assets/icons/warning.png

**Coach note:** The #1 Windows mistake is forgetting **"Add to PATH"** — then `python`/`py` isn't found. Re-running the installer and ticking it fixes it.

---

## Slide 38 — Create a Virtual Environment

**On screen**

- A **virtual environment (venv)** is a private package box for this project — installs stay here, not on your whole computer.
- Make one named **`.venv`** in the **repo root** (do this once):

```sh
cd smartcar2026
# Windows
py -m venv .venv
# macOS / Linux
python3 -m venv .venv
```

- This creates a `.venv` folder you'll reuse for every lesson.

**Visual:** Design System/assets/icons/technology.png

**Coach note:** Always put it at the repo root as **`.venv`** (that's also where `Code/setup.py` puts it). One venv per project keeps package versions clean and avoids conflicts.

---

## Slide 39 — Activate the Venv Every Time You Run Code

**On screen**

- **Activate it whenever** you open a terminal to run a lesson:

```sh
# Windows (PowerShell)
.\.venv\Scripts\Activate.ps1
# macOS / Linux
source .venv/bin/activate
```

- Your prompt shows **`(.venv)`** when it's active. Install the packages **once**:

```sh
pip install -r requirements.txt
```

- Run `deactivate` when you're done.
- PowerShell blocks the script? Run once: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

**Visual:** Design System/assets/icons/terminal.png

**Coach note:** Stress: **activate first, every session**, before running any lesson. The `(.venv)` tag is proof it worked. Packages only need installing once per venv.

---

## Slide 40 — Shortcut: Let Code/setup.py Do It for You

**On screen**

- Don't want to do slides 38–39 by hand? In the **repo root**, run the helper:

```sh
# Windows
python Code\setup.py
# macOS / Linux
python3 Code/setup.py
```

- It **creates `.venv`** and **installs all the packages** for you. No admin/`sudo` needed. (`--force` rebuilds it.)
- You **still activate** the venv (slide 39) before running a lesson.

**Visual:** Design System/assets/icons/success.png

**Coach note:** `Code/setup.py` = slides 38–39's create+install in one step. It's the easy path; the manual steps teach what it's doing under the hood. Either way, you activate to run.

---

## Slide 41 — Try It Yourself: Verify Your Setup

**On screen**

- Confirm each piece works:
  1. The Pi **boots** and joins Wi-Fi.
  2. You can **SSH** in: `ssh pi@mypi.local`.
  3. **VNC Viewer** shows the Pi desktop.
  4. The `smartcar2026` folder exists on the Pi and **both setup scripts ran**.
  5. On **your computer**: the `.venv` **activates** (you see `(.venv)`) and `python -c "import cv2"` runs with no error.
  6. You can open a terminal and `cd smartcar2026/Code/User`.
- ✅ All six? You're ready for Lesson 1!

**Visual:** Design System/assets/icons/success.png

**Coach note:** Walk the room and tick these off per student. Don't move to Lesson 1 until everyone clears the checklist (the venv `import cv2` check catches missing packages early).

---

## Slide 42 — Troubleshooting

**On screen**

- **Pi won't boot / rainbow screen / ⚡ icon** → wrong or weak power adapter (match slide 15).
- **Can't find the Pi** → same Wi-Fi as your computer? Try the IP instead of `.local`.
- **SSH refused / times out** → SSH wasn't enabled in Imager (Step 3); re-flash with SSH on.
- **VNC won't connect** → VNC not enabled (slide 25); black/tiny screen → set a resolution in `raspi-config → Display`.
- **`git: command not found`** → install git (slide 30) or download the ZIP.
- **`python` not found (Windows)** → use `py`, or reinstall Python with **"Add to PATH"**.
- **PowerShell won't activate the venv** → `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
- **`ModuleNotFoundError` running a lesson** → activate `.venv` first, then `pip install -r requirements.txt`.
- **Setup script error (Pi)** → re-run it; read the **last** error line; check the Pi's internet.

**Visual:** Design System/assets/icons/error.png + Design System/assets/icons/warning.png

**Coach note:** Power, "SSH not enabled in Imager", and Windows "Add to PATH" are the biggest time-sinks. Keep a known-good adapter and a spare flashed SD card handy.

---

## Slide 43 — Recap & What's Next

**On screen**

- You built/inventoried the kit, learned **battery safety**, and powered the Pi correctly.
- You **flashed** the OS, reached the Pi with **SSH + VNC**, and installed the **course code** on the Pi and your computer.
- Your robot's brain is alive and reachable. 🧠
- **Next — Lesson 1:** write your first program and light up the car's **components**.

**Visual:** Design System/assets/main/smart-car-full.png

**Coach note:** Congratulate them — setup is the hardest logistics day. From here on it's coding and fun.

---

<!-- HIDDEN — COACH NOTES (do not show to students) -->

## Coach Notes (hidden)

**Timing:** This often spans **more than one session**. Rough split: kit + assembly (5–10) variable (assembly can be homework) · battery safety + power (11–15) ~15 min · flashing (16–21) ~25 min · SSH/VNC (22–28) ~25 min · install code on the Pi + Thonny (29–35) ~22 min · Python/venv on your computer (36–40) ~15 min · verify/troubleshoot (41–42) ~15 min. Don't rush; later lessons depend on this working.

**Before class**

- Have ready: charged spare 18650s, a known-good power adapter per Pi model, a spare pre-flashed SD card, the Wi-Fi name/password, and the course repo link (also pasted in Discord / the class page).
- Pre-flash a demo card yourself so you can show the Imager steps live.
- Confirm `Resources/Tutorial.pdf` and `Resources/About_Battery.pdf` are accessible to students.
- On laptops, have the Python and git installers ready in case they're missing.

**Safety (lead this seriously)**

- Battery handling (slide 13): correct type, polarity, no shorts, no damaged cells, supervised charging.
- Correct Pi power adapter (slide 15) — under-power causes most boot issues.

**Pi vs. computer**

- The **Pi** uses its **system Python** via the setup scripts — **no venv** there.
- The **venv steps (36–40) are computer-only**, for the camera/vision lessons (6 viewer, 7, 8, 11).

**Biggest time-sinks (head these off)**

1. SSH not enabled in Imager Step 3 → can't connect headless. Make everyone enable it.
2. Wrong/weak power adapter → boot/stability problems.
3. `.local` hostname not resolving on Windows → use the IP, or install Bonjour.
4. Student on a different network than their Pi.
5. Setup script needs internet on the Pi.
6. Windows: Python installed without **"Add to PATH"** → `python`/`py` not found (reinstall and tick it).
7. PowerShell blocks venv activation → `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

**Record-keeping**

- Write down each student's **hostname / username / password** — they *will* forget.

**Links (verify before class)**

- Course repo (clone) — https://github.com/renashall/smartcar2026.git
- Raspberry Pi Imager — https://www.raspberrypi.com/software/
- VNC Viewer — https://www.realvnc.com/en/connect/download/viewer/
- Raspberry Pi Connect — https://www.raspberrypi.com/software/connect/
- Batteries — https://www.18650batterystore.com/
- Tutorial.pdf — https://github.com/renashall/smartcar2026/blob/main/Resources/Tutorial.pdf
- About_Battery.pdf — https://github.com/renashall/smartcar2026/blob/main/Resources/About_Battery.pdf

**Assets to source (flagged in deck)**

- Raspberry Pi Imager main screen (Device / OS / Storage) — slide 19.
- Imager OS-customisation dialog with SSH enabled — slide 20.

