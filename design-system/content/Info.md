# Machine Learning with Raspberry Pi & Smart Car (Level 3) - Information

Useful links and notes for the course.

## Useful Links

- [AI Code Academy (Main Organization Site)](https://aicodeacademy.com)
- [Smart Car 2026 Files, Videos, and Slides (Google Drive)](https://drive.google.com/drive/folders/1IxcgBp15RcEx-A0Y10D6Ou167gVQb2h0?usp=share_link)
- [Smart Car 2026 Assembly Video (Google Drive)](https://drive.google.com/file/d/1fl8dAGgtttkPZFmboovwltMmlfYszNP7/view?usp=share_link)
- [Smart Car 2026 Lesson Recordings (Google Drive)](https://drive.google.com/drive/folders/1zsH1Ep2sQ7aLmn3cece-ZJyW2UaUmf_V?usp=share_link)
- [Course Code Repository (GitHub)](https://github.com/renashall/smartcar2026)
- [Course Slides Repository (GitHub)](https://github.com/renashall/Smart-Car-Level-3-Slides)
- [Freenove Resources File (GitHub - Tutorial.pdf)](https://github.com/renashall/smartcar2026/blob/main/Resources/Tutorial.pdf)
- [About Battery File (GitHub - About_Battery.pdf)](https://github.com/renashall/smartcar2026/blob/main/Resources/About_Battery.pdf)
- [18650 Batteries (18650 Battery Store Website)](https://www.18650batterystore.com/)
- [Raspberry Pi Imager (Software Download Site)](https://www.raspberrypi.com/software/)
- [Raspberry Pi Connect (Remote Access)](https://www.raspberrypi.com/software/connect/)
- [VNC Viewer (Software Download Site)](https://www.realvnc.com/en/connect/download/viewer/)

## Notes

- Raspberry Pi 5 works for the course, but the camera module included with the Smart Car Kit does not work with it. Camera-based course activities and code will therefore not work with that kit camera on a Pi 5.
- A Raspberry Pi 3 or 4 is recommended.
- During setup, choose a memorable username, password, and hostname for the Pi. Keep the password private.
- The hostname helps you reach the Pi when its local IP address changes. For example, you can use `mypi.local` instead of an address such as `192.168.0.15`.
- Download the version of each setup application for your operating system. VNC Viewer is free; account requirements may vary by version.
- Raspberry Pi Connect is optional. It supports remote screen sharing and SSH, requires an account, and must be signed in and authenticated on the Pi at least once. It can help when the Pi has internet access but local network access is troublesome.
- The course code has been updated, so the Freenove Tutorial PDF may differ from the current code in the course repository.

## Common Issues

- Power: Use a suitable supply and quality cable. The Pi 5 needs 5V / 5A (25W), the Pi 4 needs 5V / 3A (15W), and the Pi 3 needs 5V / 2.5A (12W). A computer USB port may not provide enough power; low-power warnings or boot failures can result.
- Python: Install Python on the computer if you plan to run client programs there. Prefer a virtual environment. Ask your coach for setup help or consult the Freenove Tutorial PDF linked above.
- Batteries: Use the correct 18650 batteries for the car. Review the About Battery guide linked above for selection and safety guidance.
