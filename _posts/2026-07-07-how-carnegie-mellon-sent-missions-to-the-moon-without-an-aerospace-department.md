---
date: 2026-09-02T10:10:00+02:00
published: true
author: Richard
category: Technology
tags:
  - Space
  - Robotics
  - Carnegie Mellon
  - Autonomous Systems
title: How Carnegie Mellon Sent Missions to the Moon Without an Aerospace Department
image: /assets/images/posts/covers/cmu_moon_missions_cover.jpg
image_alt: Richard standing beside the Iris and MoonRanger lunar rovers at Carnegie Mellon University
layout: post
card_items: []
---

Visitors to Carnegie Mellon's labs expect artificial intelligence, big software systems, and robotics. In the university's planetary robotics space they also find flight-ready moon rovers being prepared for lunar deployment.

![Richard standing beside the Iris and MoonRanger lunar rovers at Carnegie Mellon University](/assets/images/posts/richard_cmu_lunar_rovers.jpg)

Standing next to them, I kept coming back to a contradiction. Carnegie Mellon has repeatedly landed hardware on the lunar frontier and built NASA-contracted planetary rovers, yet it has never offered a formal Aerospace Engineering degree.

The explanation is in how CMU frames the problem. It doesn't treat space as a traditional aerospace hardware challenge. It treats the Moon as a place to test autonomous systems, field robotics, and cross-disciplinary engineering.

## From aerospace engineering to autonomy

For decades, space exploration was dominated by rocket propulsion, atmospheric re-entry dynamics, orbital mechanics, and heavy structural design. Those disciplines are still essential for leaving Earth's atmosphere. Once a vehicle touches down on another body, though, the main challenge changes.

Planetary exploration is an autonomy problem. A rover on the Moon needs mobile robotics, real-time computer vision, edge computing under tight resource limits, and resilience in extreme environments. CMU focused on those software and control areas, and that made it a major source of space technology.

## How CMU organizes it

Instead of housing space technology in a standalone aerospace department, CMU spreads mission engineering across its existing strengths: the [School of Computer Science](https://www.cs.cmu.edu/), the [Robotics Institute](https://www.ri.cmu.edu/), Mechanical Engineering, Electrical and Computer Engineering, and Materials Science.

The approach builds on roboticist [Dr. William "Red" Whittaker](https://en.wikipedia.org/wiki/Red_Whittaker), a pioneer in field robotics who made CMU known for autonomous machines that can survive hazardous, unmapped environments. That work eventually led to [Astrobotic Technology](https://www.astrobotic.com/), a CMU spin-off that now builds commercial lunar landers and payload delivery systems for NASA.

## Two rovers: Iris and MoonRanger

Two rovers developed on campus show the approach in practice.

### Iris

Iris is tiny. It weighs under 2 kilograms, fits in a shoebox-sized envelope, and was built over several years by a multidisciplinary team of more than 300 CMU students.

The chassis is a custom carbon-fiber composite designed to survive violent launch vibrations and extreme thermal swings on the lunar surface. The wheel geometry was developed for fine, abrasive lunar regolith, where standard tires would get trapped. Iris launched in early 2024 aboard Astrobotic's [Peregrine Mission One](https://en.wikipedia.org/wiki/Peregrine_Mission_One) and became the first student-built carbon-fiber rover to communicate from deep space.

### MoonRanger

MoonRanger is the next step up: a suitcase-sized autonomous rover developed by CMU and Astrobotic under a contract with [NASA's Commercial Lunar Payload Services (CLPS)](https://www.nasa.gov/commercial-lunar-payload-services/) initiative. It is targeted for the Moon's south pole, where it will search for water ice and volatile compounds in permanently shadowed craters. Traditional planetary rovers rely on step-by-step commands from ground control on Earth. MoonRanger is designed to operate independently.

## Why autonomy matters at the south pole

Near the lunar south pole, communication with Earth has multi-second latency and drops out behind crater walls. There is no GPS on the Moon. MoonRanger has to find its own way.

It does that with stereo cameras and computer vision algorithms that continuously build high-resolution 3D elevation maps of the surrounding terrain. Onboard processors analyze the resulting point clouds in real time to detect steep drops, sharp boulders, and soft dust traps, without waiting for instructions from Earth. Navigation algorithms then plot trajectories through unmapped terrain and correct course instantly when a hazard appears.

## What a lunar rover takes

Modern space hardware relies on a broad software and engineering stack, and a lunar rover shows it. The suspension and motor control have to work in low gravity and vacuum. The software has to recover from radiation-induced bit flips in deep space. The computer vision has to run within a power budget under 20 watts. And the structure needs high-strength carbon composites to stay within restrictive payload mass limits.

## Final thoughts

Seeing lunar hardware inside a university lab shows how accessible space exploration has become for software engineers, roboticists, and computer scientists. You don't need a dedicated aerospace department to put working hardware on the Moon. You need solid systems engineering, good autonomy algorithms, and a willingness to use the Moon as a testing ground for field robotics.

## References & Documentation

* [Carnegie Mellon University School of Computer Science](https://www.cs.cmu.edu/)
* [Carnegie Mellon University Robotics Institute](https://www.ri.cmu.edu/)
* [Dr. William "Red" Whittaker (Biography & History)](https://en.wikipedia.org/wiki/Red_Whittaker)
* [Astrobotic Technology (Official Site)](https://www.astrobotic.com/)
* [Peregrine Mission One Flight Details](https://en.wikipedia.org/wiki/Peregrine_Mission_One)
* [NASA Commercial Lunar Payload Services (CLPS) Program](https://www.nasa.gov/commercial-lunar-payload-services/)