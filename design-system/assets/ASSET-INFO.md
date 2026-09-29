# Asset Info

A catalog of every visual asset in `design-system/assets/`, grouped by folder, with one sentence on what each asset looks like and when to use it on a lesson slide. Assets are PNGs (transparent where useful) except the Rubik fonts.

Icon variant conventions: most base icons (e.g. `success.png`) ship with a matching `-light` recolor (e.g. `success-light.png`) — the same glyph tinted light/white for placement on dark or navy backgrounds. A handful of icons instead come as `-black` / `-white` pairs (the dark glyph for light backgrounds, the white glyph for dark backgrounds). You only need to picture one of each pair; the variant is the same shape recolored.

## Icons

| File | Looks like | When to use |
| --- | --- | --- |
| `success.png` | A green starburst/seal badge with a white circle and a white check mark inside. | Mark a completed step, a passing result, or a "done correctly" confirmation; `success-light.png` exists for dark backgrounds. |
| `error.png` | A solid dark-red circle with a thick white X in the center. | Flag a failed step, wrong output, or an error state; `error-light.png` exists for dark backgrounds. |
| `warning.png` | An amber rounded triangle with a white exclamation mark. | Caution callouts and "watch out" notes before a risky or easily-mistaken step; `warning-light.png` exists for dark backgrounds. |
| `stop.png` | A dark-red circle with a white raised open hand (palm out). | A hard stop, "do not proceed," or safety-critical pause instruction; `stop-light.png` exists for dark backgrounds. |
| `full-battery.png` | An upright green battery cell with a white lightning bolt, fully charged. | Show a charged/healthy power state or a "charge the batteries first" step; `full-battery-light.png` exists for dark backgrounds. |
| `low-battery.png` | A horizontal red battery outline nearly empty (one small red bar). | Warn about low charge or a power problem; `low-battery-light.png` exists for dark backgrounds. |
| `lightning-bold.png` | A bold two-tone yellow/orange lightning bolt. | Power, electricity, energy, or "fast/instant" emphasis on a slide; `lightning-bold-light.png` exists for dark backgrounds. |
| `lightbulb-idea.png` | A yellow glowing light bulb with radiating rays. | Tips, ideas, "pro tip," or insight callouts; `lightbulb-idea-light.png` exists for dark backgrounds. |
| `terminal.png` | A flat terminal/console window with a blue title bar, traffic-light dots, and a yellow `>` prompt over text lines. | Slides that show command-line steps or shell commands; `terminal-light.png` exists for dark backgrounds. |
| `python.png` | The two-tone blue-and-yellow interlocking Python snakes logo. | Identify Python code, scripts, or Python-specific lessons; `python-light.png` exists for dark backgrounds. |
| `linux.png` | The black-and-white Tux penguin with orange beak and feet. | Mark Linux / Raspberry Pi OS content or commands; `linux-light.png` exists for dark backgrounds. |
| `windows.png` | The cyan four-pane Windows logo tilted in perspective. | Flag Windows-specific setup or instructions; `windows-light.png` exists for dark backgrounds. |
| `wifi.png` | A teal three-arc Wi-Fi signal fan with a dot at the base. | Network, wireless connection, or "connect to Wi-Fi" steps; `wifi-light.png` exists for dark backgrounds. |
| `raspberry-pi.png` | The Raspberry Pi raspberry mark (green leaves over red dotted berry) on a faint circle. | Identify Raspberry Pi content, the board, or Pi-side steps; `raspberry-pi-light.png` exists for dark backgrounds. |
| `face-scanner.png` | A person's head/shoulders portrait framed by four corner brackets (a face-detection frame). | Face detection / recognition lessons and computer-vision-on-people slides; `face-scanner-light.png` exists for dark backgrounds. |
| `light-sensor.png` | An orange disc photoresistor (LDR) component on two yellow legs with a squiggle marking on top. | Light-sensing or photoresistor/sensor lessons; `light-sensor-light.png` exists for dark backgrounds. |
| `pdf-icon.png` | A red document page with a folded corner and a white "PDF" label band. | Link to or label a PDF handout/deliverable; `pdf-icon-light.png` exists for dark backgrounds. |
| `artificial-intelligence-black.png` | A black processor/chip square with pin legs and white "AI" lettering inside. | AI / machine-learning concept slides; paired `artificial-intelligence-white.png` is the white version for dark backgrounds. |
| `camera-black.png` | A black filled camera silhouette with a round lens. | Camera, photo capture, or vision-input slides; paired `camera-white.png` is the white version for dark backgrounds. |
| `car-black.png` | A black side-profile silhouette of a small car with two wheels. | Represent the smart car or driving/movement lessons; paired `car-white.png` is the white version for dark backgrounds. |
| `config-wheel-black.png` | A black gear with two circular refresh/sync arrows looping inside it. | Configuration, update, or sync/refresh steps; paired `config-wheel-white.png` is the white version for dark backgrounds. |
| `settings-wheel-black.png` | A black gear with a wrench inside it. | Settings, setup, or maintenance/adjustment steps; paired `settings-wheel-white.png` is the white version for dark backgrounds. |
| `server-client-black.png` | Two black line-art blocks — a person and a stacked server rack — joined by curved arrows in a loop. | Networking, client-server, or request/response architecture slides; paired `server-client-white.png` is the white version for dark backgrounds. |
| `mac-apple-black.png` | The solid black Apple logo. | Flag macOS-specific setup or instructions; paired `mac-apple-white.png` is the white version for dark backgrounds. |

## Main

| File | Looks like | When to use |
| --- | --- | --- |
| `company-logo.png` | The AI Code Academy mark: a teal stylized "AI" wordmark with an amber dot, on a navy circle. | Brand the deck — title slides, headers, footers, and thanks slides. |
| `freenove-logo.png` | The Freenove wordmark in white with a pinwheel mark on an orange square. | Credit the Freenove kit/source when showing original hardware or materials. |
| `smart-car-full.png` | A photo of the assembled 4WD smart car (Pi, ultrasonic head, black wheels) shot from a front-three-quarter angle. | Hero shot of the finished car on intro, objective, or "what we're building" slides. |
| `smart-car-side-full.png` | A clean 3D render of the assembled smart car (yellow wheels, ultrasonic head) from a side-three-quarter angle. | Alternative cleaner car visual for diagrams, side views, or render-styled slides. |

## Materials

| File | Looks like | When to use |
| --- | --- | --- |
| `18650-batteries.png` | Four blue 18650 lithium cells standing side by side. | Show the car's batteries in materials checklists or power-setup slides. |
| `acrylic-parts.png` | A labeled "For Pan Tilt" sheet of black acrylic plates with cut-out holes and small spacers. | Bill-of-materials slide for the pan-tilt acrylic mounting parts. |
| `battery-charger.png` | A black Nitecore two-bay charger with two yellow batteries and a lit display. | Show how/where to charge the 18650 cells in setup steps. |
| `dc-power-supply.png` | A black Raspberry Pi wall power adapter with the Pi logo and an attached USB cable. | Powering the Pi from mains during desktop/setup steps. |
| `raspberry-pi-3-b-plus-set.png` | A two-up panel: a "practicality picture" photo and a labeled "model diagram" of the Pi 3 B+. | Introduce or identify the Raspberry Pi 3 B+ board in materials slides. |
| `raspberry-pi-4-set.png` | A two-up panel: a "practicality picture" photo and a labeled "model diagram" of the Pi 4 Model B. | Introduce or identify the Raspberry Pi 4 Model B board in materials slides. |
| `screenshot-2026-06-19-025355.png` | A diagram of a green Raspberry Pi board with a microSD card and a red arrow pointing to its card slot. | Show inserting the microSD card into the Pi during setup. |
| `screw-set.png` | A labeled grid of fasteners (screws, standoffs, nuts) with sizes and quantities. | Hardware/fastener checklist for the build. |
| `sd-card-and-card-adapter.png` | A grey Integral USB-A/USB-C card reader beside a full-size SD card and a microSD card. | Slides about flashing or reading the SD card from a computer. |
| `smart-car-board.png` | Top and bottom views of the black Freenove smart-car PCB (chip area and the battery holder bay). | Identify the car's main control board in materials or wiring slides. |
| `line-tracker-module.png` | Front and back of the black Freenove tracking-sensor PCB with three blue line-sensor optos. | Line-tracking / line-following sensor lessons. |
| `usba-micro-usb.png` | A black cable with a USB-A plug on one end and a micro-USB plug on the other. | Show the USB-A to micro-USB cable in connection/setup steps. |
| `usba-usbc.png` | A black cable with a USB-A plug and a USB-C plug. | Show the USB-A to USB-C cable in connection/setup steps. |
| `usbc-usbc.png` | A black cable with USB-C plugs on both ends. | Show the USB-C to USB-C cable in connection/setup steps. |

### Materials/Electronic Parts

| File | Looks like | When to use |
| --- | --- | --- |
| `4-pin-jumper-wire.png` | A short ribbon of four colored (red/orange/yellow/green) female-to-female jumper wires with black housings. | Wiring slides that use the 4-pin F/F jumper cable. |
| `5-pin-cable.png` | A white 5-pin XH-2.54 connector cable with striped ribbon wires. | Wiring slides that use the 5-pin XH cable. |
| `connection-board.png` | A small black Freenove header/connection board with rows of socket pins. | Identify the connection board when seating modules or wiring. |
| `electronic-parts-set.png` | A labeled bundle photo: line-tracking module, camera, HC-SR04 ultrasonic, connection board, jumper wire, and 5-pin cable. | Overview/bill-of-materials slide for all electronic parts at once. |
| `camera-module.png` | A green Raspberry Pi Camera Module 3 board with a central lens and a white ribbon cable. | Camera-module lessons and "attach the camera" steps. |
| `ultrasonic-sensor.png` | A blue HC-SR04 board with two round transducer "eyes" and a 4-pin header. | Ultrasonic distance-sensing lessons and obstacle-avoidance slides. |

### Materials/Tools

| File | Looks like | When to use |
| --- | --- | --- |
| `3-mm-screw-driver.png` | A small black-handled 3 mm cross/Phillips screwdriver. | Tool callout when screws are involved in assembly. |
| `black-tape.png` | A roll of black electrical/insulating tape seen end-on. | Show the tape used to make a line track or secure wires. |
| `tools-set.png` | A labeled three-up of the cross screwdriver, black tape, and cable tidy. | Overview slide of the tools needed for the build. |
| `wire-tidy.png` | A black spiral cable-wrap tube. | Cable-management steps for bundling the car's wiring. |

### Materials/Transmission Parts

| File | Looks like | When to use |
| --- | --- | --- |
| `motor-bracket-set.png` | A metal motor mounting bracket with two short screws, two long screws, and two nuts. | Show the motor-bracket hardware during chassis assembly. |
| `servo-motor-set.png` | A blue 9g servo with its orange lead, white servo horns, and mounting screws. | Servo / pan-tilt lessons and "mount the servo" steps. |
| `transmission-parts-set.png` | A labeled four-up: servo package, driven wheel, DC reduction motor, and motor bracket package. | Overview/bill-of-materials slide for all drivetrain parts. |
| `dc-motor.png` | A yellow plastic gearbox TT DC speed-reduction motor with a metal can and output shaft. | Identify the drive motor in motor-control lessons. |
| `wheel.png` | A black rubber tire on a yellow plastic hub (the car's driven wheel). | Show the car's wheel in assembly or movement slides. |

## Raspberry Pi Boards

| File | Looks like | When to use |
| --- | --- | --- |
| `raspberry-pi-4-b-plus.png` | A clean top-down render of the Pi 4 Model B with callout labels for its ports (GPIO, USB, HDMI, power, camera, etc.). | Labeled port/feature reference for the Pi 4 in setup or hardware slides. |
| `raspberry-pi-3-b-plus-to-1-b-plus.png` | A flat illustrated Pi board with orange callout labels for GPIO, USB, Ethernet, HDMI, camera, display, audio, and power connectors. | Generic labeled connector reference for the classic-layout Pi (3/2/1 B+) in setup or hardware slides. |

## Screenshots

| File | Looks like | When to use |
| --- | --- | --- |
| `qt-gui.png` | A screenshot of the Freenove PyQt5 desktop client window with the live video panel and control buttons. | Show the desktop client UI when teaching the Qt control app. |
| `raspberry-pi-connect.png` | A screenshot of the "Raspberry Pi Connect" web page (sign-in, remote-desktop and terminal previews). | Slides about remote-accessing the Pi via Raspberry Pi Connect. |

## Fonts/Rubik

Rubik is the AI Code Academy brand display and body typeface; embed/pass it to renderers and exporters so deck text stays on-brand.

| File | Looks like | When to use |
| --- | --- | --- |
| `Rubik-VariableFont_wght.ttf`, `Rubik-Italic-VariableFont_wght.ttf` | Variable Rubik fonts covering the full upright and italic weight axes. | Preferred web/render font for all deck text where variable fonts are supported. |
| `static/Rubik-*.ttf` (Light, Regular, Medium, SemiBold, Bold, ExtraBold, Black, plus matching Italics) | Individual static weight files of Rubik, upright and italic. | Use specific static weights when an exporter or tool needs discrete font files instead of variable fonts. |
| `OFL.txt`, `README.txt` | The SIL Open Font License text and the font family readme. | License/attribution reference for redistributing the Rubik fonts; not a slide visual. |
