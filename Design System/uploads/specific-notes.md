# Course Notes - Machine Learning with Raspberry Pi & Smart Car (Level 3)

Setup links, common issues, and reminders specific to this course.

## Important Links

| Tool | Link | Notes |
| --- | --- | --- |
| **VNC Viewer** | [Download](https://www.realvnc.com/en/connect/download/viewer/) | Free. Account creation usually not required, but newer versions might require it. |
| **Raspberry Pi Imager** | [Download](https://www.raspberrypi.com/software/) | Free and simple to use. Flashes the OS onto an SD card for the Pi. Requires a microSD card and an SD card reader/adapter. |
| **Raspberry Pi Connect** | [Info](https://www.raspberrypi.com/software/connect/) | Free, optional. Account creation required. Useful for connecting to your Pi from outside your home network. |
| **Smart Car GitHub Repo** | [renashall/smartcar2026](https://github.com/renashall/smartcar2026) | Course code repository for the smart car. |
| **Smart Car Tutorial PDF** | [Tutorial.pdf](https://github.com/renashall/smartcar2026/blob/main/Resources/Tutorial.pdf) | Official kit tutorial/reference PDF in the course repo. |
| **Battery Guide PDF** | [About_Battery.pdf](https://github.com/renashall/smartcar2026/blob/main/Resources/About_Battery.pdf) | Official battery selection and safety PDF in the course repo. |
| **Smart Car Video Setup** | [Google Drive video](https://drive.google.com/file/d/1fl8dAGgtttkPZFmboovwltMmlfYszNP7/view?usp=share_link) | Video setup guide for building the smart car. |
| **Batteries** | [18650batterystore.com](https://www.18650batterystore.com/) | Use the correct battery type for the smart car. A reputable source for quality cells. |

### Link details

- **Raspberry Pi Connect**
  - Allows remote access via screen sharing and/or SSH.
  - Helpful if the Pi is connected to the Internet but having issues on your local network.
  - You must sign in on the Pi at least once and authenticate.
- **Smart Car GitHub Repo**
  - Main source for the current smart car code.
- **Smart Car Tutorial PDF**
  - Direct repo link: [Tutorial.pdf](https://github.com/renashall/smartcar2026/blob/main/Resources/Tutorial.pdf).
- **Battery Guide PDF**
  - Direct repo link: [About_Battery.pdf](https://github.com/renashall/smartcar2026/blob/main/Resources/About_Battery.pdf).
- **Smart Car Video Setup**
  - Walkthrough video for building and setting up the smart car.
- **Batteries**
  - Some batteries are poorly made - research first or use the recommended store.
  - Refer to [About_Battery.pdf](https://github.com/renashall/smartcar2026/blob/main/Resources/About_Battery.pdf) for more information.

> Download the appropriate version of each application for your device (Windows, macOS, Linux, etc.) and follow the installer instructions carefully.

## Common Issues

### Power

Make sure each Pi uses a proper AC adapter or battery:

| Model | Requirement |
| --- | --- |
| Pi 5 | 5V / 5A (25W) |
| Pi 4 | 5V / 3A (15W) |
| Pi 3 | 5V / 2.5A (12W) |

- Prefer AC adapters over a PC USB port or similar.
- Use a quality cable when possible.
- Warnings appear on the Pi when there are power issues.
- The Pi may not boot if power is insufficient.

### Python

- A PC must have Python installed to run any project code locally (such as clients).
- For installation help, refer to your coach or external resources. [Tutorial.pdf](https://github.com/renashall/smartcar2026/blob/main/Resources/Tutorial.pdf) has more information.
- Prefer virtual environments when using Python, especially on your primary device. Your coach can assist if needed.

### Batteries

- Batteries are very important - refer to [About_Battery.pdf](https://github.com/renashall/smartcar2026/blob/main/Resources/About_Battery.pdf) for battery selection.

## Notes

- A lot of the code has been updated.
- [Tutorial.pdf](https://github.com/renashall/smartcar2026/blob/main/Resources/Tutorial.pdf) might not perfectly reflect the code currently in the repository.
- Set a memorable username, password, and hostname for your Pi.
- Hostnames are useful when the Pi's local IP address changes - you can reach it by hostname (e.g. `mypi.local`) instead of an IP like `192.168.0.15`.
