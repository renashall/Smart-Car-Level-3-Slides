# Machine Learning with Raspberry Pi & Smart Car (Level 3) - Parent Guide

An overview of the AI Code Academy Machine Learning with Raspberry Pi & Smart Car (Level 3) course, including hardware guidance, lesson topics, and useful resources.

> **Raspberry Pi compatibility:** The Raspberry Pi 5 works for the course, but the camera module included with the Smart Car Kit does not work with it. Camera-based parts of the course and their code will therefore not work with that kit camera on a Pi 5. A Raspberry Pi 3 or 4 is recommended.

## Setup

Parents and/or students should review the **Lesson 0 slides** and complete the smart car setup, build, and testing before the first lesson. These steps are time consuming.

Links to the course code and assembly video are in [Helpful Links](#helpful-links) below. 
**They are also on the slides you should have received with this document.**

## Course Outline

Students begin by setting up the Raspberry Pi smart car and learning how the hardware, Python scripts, and course repository fit together. They then move from simple component tests to network commands, sensor reading, autonomous driving, line following, camera streaming, and face tracking. The course closes with a final project workshop and presentation.

| Lesson | Topic | Description |
| --- | --- | --- |
| 00 | Initial Setup | Build the smart car, prepare the Raspberry Pi, install remote access tools, clone the course code, and verify that Python and the setup scripts are ready. |
| 01 | Components | Meet the car's core parts by lighting LEDs, sweeping the servo head, reading ultrasonic distance, and learning the recurring lesson script structure. |
| 02 | Server & Client Commands | Learn how the computer sends text commands to the car server, then drive the wheels, test the buzzer, and control LEDs through command strings. |
| 03 | ADC & Multithreading | Read analog sensor values through the ADC, calculate battery level, and use a background thread to monitor the car while the main program keeps running. |
| 04 | Autonomous Modes | Build the sense-think-act loop for autonomous behavior, including light-following and ultrasonic obstacle-avoidance modes. |
| 05 | Line Follower | Use the three infrared line-tracking sensors to detect patterns under the car and choose steering moves that keep it following a path. |
| 06 | Camera Streaming | Create a Pi camera server and a computer viewer so frames can stream from the car to the student's computer over the network. |
| 07 | Face Tracking | Detect the largest face in the camera feed and send servo commands so the car's camera head follows the face position. |
| 08 | Multiple Face Detection | Extend face tracking to handle several faces, keep a target lock, draw detection status, and reuse prior lesson code cleanly. |
| 09 | Final Project Workshop | Review the course tools, brainstorm project ideas, choose a build direction, and plan the student's final demonstration. |
| 10 | Final Project Presentation | Guide students through presenting what they built, explaining their code choices, sharing results, and celebrating the completed course. |
| 11 | Camera GUI (Bonus) | Wrap the camera stream and head control into one PyQt5 desktop window: live video, pan/tilt buttons, and a face-tracking checkbox, with a background thread keeping the window responsive. |

## Helpful Links

- [AI Code Academy](https://aicodeacademy.com)
- [Smart Car Kit Assembly Video](https://drive.google.com/file/d/1fl8dAGgtttkPZFmboovwltMmlfYszNP7/view?usp=share_link)
- [Course Code Repository](https://github.com/renashall/smartcar2026)
- [Freenove Tutorial](https://github.com/renashall/smartcar2026/blob/main/Resources/Tutorial.pdf)
- [About Battery](https://github.com/renashall/smartcar2026/blob/main/Resources/About_Battery.pdf)
- [18650 Batteries](https://www.18650batterystore.com/)
- [Raspberry Pi Imager](https://www.raspberrypi.com/software/)
- [VNC Viewer](https://www.realvnc.com/en/connect/download/viewer/)
