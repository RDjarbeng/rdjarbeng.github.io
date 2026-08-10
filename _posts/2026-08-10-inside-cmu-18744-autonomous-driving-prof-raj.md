---
date: 2026-08-10T14:55:00+02:00
published: false
author: Richard
category: Technology
tags:
  - Autonomous Driving
  - Carnegie Mellon
  - ECE 18-744
  - Robotics
  - Software Architecture
title: "Inside CMU 18-744: Architectural Lessons from Prof. Raj Rajkumar’s Autonomous Driving Course"
image: /assets/images/posts/covers/cmu_18744_autonomous_driving_cover.jpg
image_alt: "Vector illustration of an autonomous vehicle navigating urban traffic with perception bounding boxes and path trajectory planning"
layout: post
card_items: []
---

Carnegie Mellon University has a long history in vehicle automation, dating back to early mobile robotics experiments in the 1980s and the DARPA Urban Challenge victory in 2007 with the autonomous SUV named Boss. In the Department of Electrical and Computer Engineering (ECE), [18-744: Autonomous Driving](https://courses.ece.cmu.edu/18744) focuses on the core software architectures and engineering trade-offs required to build safe self-driving systems. Taught by Professor [Raj Rajkumar](https://www.ece.cmu.edu/directory/bios/rajkumar-raj.html), a leading researcher in real-time embedded systems and connected vehicles, the course approaches autonomous driving as a complex system engineering problem rather than a simple machine learning challenge.

![Vector illustration of an autonomous vehicle navigating urban traffic with perception bounding boxes and path trajectory planning](/assets/images/posts/covers/cmu_18744_autonomous_driving_cover.jpg)

Popular media often frames self-driving cars as a problem solved purely by training large neural networks on video feeds. Taking 18-744 provides a far more practical perspective. Real-world autonomous vehicles are distributed real-time systems that require precise coordination across hardware buses, sensor fusion pipelines, localization algorithms, motion planners, and safety watchdogs.

## The Multi-Layer Autonomous Driving Stack

The course structures the autonomous vehicle software pipeline into distinct functional layers. Each layer has strict latency requirements and well-defined interfaces to ensure predictability and fault isolation.

```
+-------------------------------------------------------------------+
|                        SENSING & PERCEPTION                       |
|   LiDAR (Point Clouds) | Cameras (RGB) | Radar | Ultrasonics      |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                     LOCALIZATION & MAPPING                        |
|    HD Vector Maps | SLAM | GNSS/IMU | Wheel Odometry Fusion       |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                 BEHAVIORAL & MOTION PLANNING                      |
|    State Machines | Rule-Based Logic | Trajectory Optimization    |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                      VEHICLE CONTROL & ACTUATION                  |
|    Drive-by-Wire | Throttle/Brake | Steering Angle Control        |
+-------------------------------------------------------------------+
```

### 1. Hardware Architecture and Real-Time Systems

At the foundation of the vehicle is the embedded compute platform. Autonomous vehicles process gigabytes of sensor data per second while maintaining deterministic real-time deadlines for brake and steering commands.

 * **Bus Communication:** Standard automotive networks use the Controller Area Network (CAN) bus for low-speed actuators and sensors, while Automotive Ethernet handles high-bandwidth LiDAR and video streams.
 * **Compute Nodes:** System architectures combine multicore CPUs for high-level decision logic with dedicated GPUs or FPGAs for deep neural network inference and point cloud filtering.
 * **Real-Time Operating Systems (RTOS):** Safety-critical tasks run on real-time operating systems like QNX or VxWorks, enforcing hard timing constraints so that control loops execute without preemption delays.

### 2. Perception and Sensor Fusion

No single sensor type is sufficient for all driving conditions. Cameras provide high-resolution visual detail and traffic sign text but fail in dense fog or direct sunlight glare. LiDAR delivers accurate 3D spatial depth maps but degrades in heavy rain or snowfall. Automotive radar measures object velocity via Doppler shift across long distances but lacks fine spatial resolution.

```
       +-------------------+       +-------------------+
       |   Camera Images   |       | LiDAR Point Cloud |
       +-------------------+       +-------------------+
                 \                       /
                  \                     /
                   v                   v
            +---------------------------------+
            |   Multi-Sensor Kalman Filter    |
            |     & Deep Neural Detection     |
            +---------------------------------+
                            |
                            v
            +---------------------------------+
            |  3D Object Bounding Boxes &     |
            |   Velocity Vector Tracks        |
            +---------------------------------+
```

18-744 examines how multi-sensor data fusion combines these modalities. Early fusion merges raw sensor data at the input level, requiring tight time-synchronization across sensors. Late fusion runs independent object detectors on each sensor stream and merges the resulting 3D bounding boxes using Extended Kalman Filters (EKF) or Hungarian data association algorithms. Late fusion provides modularity and fault tolerance, allowing the system to continue operating even if one sensor stream experiences transient interference.

### 3. Localization and High-Definition (HD) Mapping

Standard civilian GPS provides positional accuracy within 3 to 5 meters, which is insufficient for keeping a vehicle centered within a 3.5-meter highway lane. 18-744 explores high-precision localization techniques that achieve sub-decimeter accuracy:

 * **HD Maps:** Pre-built vector maps contain lane geometry, crosswalk locations, traffic signal coordinates, and speed limits.
 * **Feature Matching:** The vehicle compares live 3D LiDAR point clouds or visual landmarks against the HD map to compute its relative position.
 * **Sensor Integration:** Inertial Measurement Units (IMUs) and wheel encoders fill coverage gaps when satellite signals are blocked by high-rise buildings or tunnels.

### 4. Motion Planning and Decision Making

Once the vehicle understands where it is and what objects surround it, the planning subsystem determines how to reach the destination safely. Motion planning splits into two stages:

 * **Behavioral Planning:** High-level state machines decide tactical goals, such as maintaining lane speed, initiating a left turn, or yielding to a pedestrian. This stage handles complex urban interactions, including regional traffic quirks like Pittsburgh's unwritten courtesy yields at green lights.
 * **Trajectory Generation:** Low-level algorithms generate smooth geometric paths and speed profiles. Planners evaluate candidate curves (polynomial splines or clothoids) using cost functions that penalize obstacle proximity, sharp lateral acceleration, and sudden jerk.

```
+--------------------------+
|   Behavioral Planner     |  -> Selects maneuver (e.g., Change Lane Right)
+--------------------------+
             |
             v
+--------------------------+
|  Trajectory Generator    |  -> Computes smooth 5th-order polynomial curve
+--------------------------+
             |
             v
+--------------------------+
|    Cost Function Evaluator| -> Ranks paths by safety, comfort, and speed
+--------------------------+
             |
             v
+--------------------------+
|   Vehicle Controller     |  -> Issues steering angle and throttle commands
+--------------------------+
```

### 5. Vehicular Communication (V2X) and Functional Safety

Professor Rajkumar's research has long emphasized connected vehicles. 18-744 covers Vehicle-to-Everything (V2X) technologies, including Cellular V2X (C-V2X) and Dedicated Short-Range Communications (DSRC). V2X enables vehicles to broadcast velocity, heading, and braking intentions to surrounding traffic, allowing cooperative adaptive cruise control and automated intersection management beyond the line of sight of onboard sensors.

The course also addresses functional safety standards like ISO 26262. Engineers design self-driving software with fail-operational redundancy. If a primary perception pipeline fails, a lightweight fallback monitoring system brings the vehicle to a controlled stop on the road shoulder.

## Key Engineering Takeaways

Taking 18-744 reinforces that building an autonomous vehicle requires far more than training accurate computer vision models. The primary challenges lie in system integration, low-latency execution, real-time deterministic scheduling, and fail-safe hardware design.

18-744 provides a structured framework for understanding these trade-offs, demonstrating how embedded systems, control theory, and artificial intelligence come together in real-world automotive platforms.

## References and Course Links

 * [CMU ECE 18-744 Course Listing](https://courses.ece.cmu.edu/18744)
 * [Prof. Raj Rajkumar's ECE Faculty Page](https://www.ece.cmu.edu/directory/bios/rajkumar-raj.html)
 * [Carnegie Mellon University Department of Electrical and Computer Engineering](https://www.ece.cmu.edu/)
