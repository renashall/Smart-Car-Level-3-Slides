# Course Outline

**Organization:** AI Code Academy
**Course:** Machine Learning with Raspberry Pi & Smart Car (Level 3)

> Course-wide slide plan. Use this as the quick map for the full lesson arc and
> the one-line purpose of each deck in `content/slide-plans/`.

## Course Arc

Students begin by setting up the Raspberry Pi smart car and learning how the
hardware, Python scripts, and course repository fit together. They then move
from simple component tests to network commands, sensor reading, autonomous
driving, line following, camera streaming, and face tracking. The course closes
with a final project workshop and presentation.

## Lessons

| Lesson | Title                      | Short description                                                                                                                                                                          |
| ------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 00     | Initial Setup              | Build the smart car, prepare the Raspberry Pi, install remote access tools, clone the course code, and verify that Python and the setup scripts are ready.                                 |
| 01     | Components                 | Meet the car's core parts by lighting LEDs, sweeping the servo head, reading ultrasonic distance, and learning the recurring lesson script structure.                                      |
| 02     | Server & Client Commands   | Learn how the computer sends text commands to the car server, then drive the wheels, test the buzzer, and control LEDs through command strings.                                            |
| 03     | ADC & Multithreading       | Read analog sensor values through the ADC, calculate battery level, and use a background thread to monitor the car while the main program keeps running.                                   |
| 04     | Autonomous Modes           | Build the sense-think-act loop for autonomous behavior, including light-following and ultrasonic obstacle-avoidance modes.                                                                 |
| 05     | Line Follower              | Use the three infrared line-tracking sensors to detect patterns under the car and choose steering moves that keep it following a path.                                                     |
| 06     | Camera Streaming           | Create a Pi camera server and a computer viewer so frames can stream from the car to the student's computer over the network.                                                              |
| 07     | Face Tracking              | Detect the largest face in the camera feed and send servo commands so the car's camera head follows the face position.                                                                     |
| 08     | Multiple Face Detection    | Extend face tracking to handle several faces, keep a target lock, draw detection status, and reuse prior lesson code cleanly.                                                              |
| 09     | Final Project Workshop     | Review the course tools, brainstorm project ideas, choose a build direction, and plan the student's final demonstration.                                                                   |
| 10     | Final Project Presentation | Guide students through presenting what they built, explaining their code choices, sharing results, and celebrating the completed course.                                                   |
| 11     | Camera GUI (Bonus)         | Wrap the camera stream and head control into one PyQt5 desktop window: live video, pan/tilt buttons, and a face-tracking checkbox, with a background thread keeping the window responsive. |

## Deck Sources

- Lesson plans live in `content/slide-plans/lesson-00-initial-setup.md` through
  `content/slide-plans/lesson-11-camera-gui.md` (lesson 11 is a flexible bonus
  lesson).
- General course notes live in `content/specific-notes.md`.
- Coaching and administrative notes live in `content/organization-notes.md`.
- Useful course links (downloads, repo, build video) live in
  `content/Links.txt`.

