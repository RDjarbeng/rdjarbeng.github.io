---
date: 2026-10-14T09:00:00+02:00
published: true
author: Richard
tags:
  - Autonomous Driving
  - SAE J3016
  - Robotics
  - Automotive Tech
  - Artificial Intelligence
series: "Self-Driving, Explained"
series_part: 1
key_points:
  - "Levels 0 to 2 only assist. Whatever the marketing says, the person behind the wheel is the driver and is legally responsible."
  - "The real dividing line is between Level 2 and Level 3, where the carmaker takes legal responsibility while the system is on."
  - "Level 3 has a weak spot: when it reaches its limits it must hand control back, and drivers take between 2 and 26 seconds to respond."
title: "The Six Levels of Autonomous Driving: From Driver Assist to the Level 3 Handover"
image: /assets/images/posts/covers/six_levels_of_autonomous_driving_cover.jpg
image_alt: "Flat vector editorial illustration of the SAE six levels of autonomous driving from L0 human control to L5 full autonomy"
layout: post
card_items:
  - name: "SAE J3016 Standard (ISO/SAE PAS 22736)"
    badge_1: "Foundational Standard"
    badge_2: "Taxonomy"
    url: "https://www.sae.org/standards/content/j3016_202104/"
    link_text: "Access SAE J3016"
    description: "The authoritative global engineering standard establishing formal taxonomy and definitions for driving automation systems (Levels 0 to 5) for on-road motor vehicles."
  - name: "UN Regulation No. 157 (ALKS)"
    badge_1: "Regulatory Framework"
    badge_2: "UNECE WP.29"
    url: "https://unece.org/transport/documents/2021/03/standards/un-regulation-no-157-automated-lane-keeping-systems-alks"
    link_text: "Read UN-R157 Regulation"
    description: "The first binding international technical regulation establishing type-approval criteria for Automated Lane Keeping Systems, enabling certified commercial Level 3 highway automation."
  - name: "NTSB Report on the 2018 Uber Crash in Tempe"
    badge_1: "Accident Investigation"
    badge_2: "Automation Complacency"
    url: "https://www.ntsb.gov/investigations/AccidentReports/Reports/HAR1903.pdf"
    link_text: "Read NTSB HAR-19/03"
    description: "The National Transportation Safety Board's investigation into the first pedestrian death involving a self-driving test vehicle, and what it found about the system, the safety operator and Uber's safety culture."
  - name: "MIT AVT Naturalistic Driving Study"
    badge_1: "Human Factors"
    badge_2: "Level 2 Disengagement"
    url: "https://doi.org/10.1016/j.aap.2021.106360"
    link_text: "Read Morando et al. (2021)"
    description: "Morando, Gershon, Mehler, and Reimer study modeling driver glance patterns and cognitive disengagement around Tesla Autopilot disengagements across naturalistic driving datasets."
  - name: "Eriksson & Stanton 2017 Takeover Study"
    badge_1: "Handover Latency"
    badge_2: "Human Factors Journal"
    url: "https://doi.org/10.1177/0018720816685428"
    link_text: "Read Takeover Study"
    description: "Seminal human factors research documenting that non-critical driver takeover times in automated driving span 1.9 to 25.7 seconds, demonstrating the hazard of sudden manual transitions."
category: "AI"
---


When car companies advertise driver-assist software, they often blur the line between convenient driver aids and true driverless autonomy. Marketing terms like "Autopilot," "Full Self-Driving," and "hands-free assist" make it sound as though the vehicle is driving itself, even when the human in the driver's seat remains entirely responsible if anything goes wrong.

To clear up this confusion, engineers and transportation regulators do not rely on marketing claims. Instead, they turn to a shared technical standard created by the **Society of Automotive Engineers (SAE International)**, a global standards body that develops engineering guidelines for the automotive and aerospace industries. To see why that standard was needed, it helps to start with where self-driving cars came from.

![The Six Levels of Autonomous Driving](/assets/images/posts/covers/six_levels_of_autonomous_driving_cover.jpg)

## Where the Six Levels Came From

### 2004 to 2009: From a desert race to a Google project
The modern self-driving car started as a military research prize. In 2004 the US Defense Advanced Research Projects Agency ([DARPA](https://www.darpa.mil/news-events/2014-03-13)) offered $1 million to any team whose driverless vehicle could finish a 142-mile course through the Mojave Desert. Not one vehicle finished; the best entry, Carnegie Mellon's *Sandstorm*, made it about 7.4 miles before getting stuck.

A year later, in 2005, five vehicles completed a 132-mile course. The winner was Stanford University's *Stanley*, a modified Volkswagen Touareg led by Sebastian Thrun. In 2007 the DARPA Urban Challenge moved the contest to a mock city with traffic, junctions and parking, and Carnegie Mellon's *Boss* took first place.

Stanley, shown below, looks nothing like a modern robotaxi. The roof rack of laser scanners and cameras is the ancestor of the sensor domes you now see on Waymo cars.

![Stanford's Stanley, winner of the 2005 DARPA Grand Challenge](https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/The_winner%2C_2005_DARPA_Grand_Challenge_-Stanford%27s_Stanley.tiff/lossy-page1-500px-The_winner%2C_2005_DARPA_Grand_Challenge_-Stanford%27s_Stanley.tiff.jpg)
*Stanford's Stanley, the first vehicle to win the DARPA Grand Challenge (2005). Photo: DARPA, [public domain](https://commons.wikimedia.org/wiki/File:The_winner,_2005_DARPA_Grand_Challenge_-Stanford%27s_Stanley.tiff).*

Many people from those teams went on to build the industry. In 2009 Google quietly started its own self-driving car project, hiring Thrun and several DARPA veterans. That project became **Waymo** in December 2016, and its bubble-shaped *Firefly* prototype, built without a steering wheel or pedals, became the first fully driverless car to carry a member of the public on open roads in 2015. The Firefly is now a museum piece:

![Waymo Firefly prototype at the Computer History Museum](https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Waymo_Firefly_reference_vehicle_at_Computer_History_Museum%2C_Mountain_View.png/960px-Waymo_Firefly_reference_vehicle_at_Computer_History_Museum%2C_Mountain_View.png)
*Google's Firefly prototype, now at the Computer History Museum in Mountain View. Photo: Jonathan Deamer, [CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Waymo_Firefly_reference_vehicle_at_Computer_History_Museum,_Mountain_View.png).*

### 2014: SAE writes down the rules
By the early 2010s, carmakers were shipping radar cruise control and lane-keeping cameras, while tech companies were testing cars that could drive themselves. Everyone was using the word "autonomous", and it meant something different each time.

In January 2014 SAE published a document designated [SAE J3016](https://www.sae.org/standards/content/j3016_202104/) (where "J" indicates an SAE surface-vehicle standard and "3016" is its unique reference number). It defined an agreed-upon scale from Level 0 to Level 5. The [National Highway Traffic Safety Administration (NHTSA)](https://www.nhtsa.gov/) in the United States adopted it in its 2016 federal automated vehicles policy, and the United Nations Economic Commission for Europe ([UNECE](https://unece.org/)) builds on the same vocabulary. SAE has revised J3016 several times since (2016, 2018 and 2021), and it is now also published as international standard [ISO/SAE PAS 22736](https://www.iso.org/standard/79585.html).

## What the Levels Actually Measure

Instead of measuring vehicle intelligence with vague scores, the SAE standard evaluates two concrete engineering and legal questions:

1. **Who is actually driving?** In engineering terms, this is called the **Dynamic Driving Task (DDT)**. It covers both the immediate physical controls (steering, braking, accelerating) and tactical decisions (changing lanes, navigating turns, choosing safe following distances). It also asks who is responsible for scanning the surroundings, watching for hazards, and recognizing traffic signs, a task known as **Object and Event Detection and Recognition (OEDR)**.
2. **Who is legally responsible if something goes wrong?** Does liability stay with the person sitting behind the wheel, or does it shift to the automaker and the software controlling the car?

Crucially, the standard splits these six levels into two clear categories:

* **Levels 0 through 2 (Driver Support Systems / ADAS):** The vehicle assists the driver with features like lane-keeping or adaptive cruise control, but the human is always the legal driver. The driver must keep their eyes on the road and must be ready to take over steering or braking at any split second.
* **Levels 3 through 5 (Automated Driving Systems / ADS):** When the automated system is switched on within its designated operating zone, the machine is in full control. The software monitors the environment and handles emergency stops, shifting operational liability from the passenger to the vehicle's automated driving system.

### The Six Levels at a Glance
* [**Level 0: No Automation**](#level-0-no-driving-automation): Warnings and emergency braking only. Human does all driving.
* [**Level 1: Driver Assistance**](#level-1-driver-assistance): Steering or cruise assist (one axis). Human controls the other and monitors everything.
* [**Level 2: Partial Automation**](#level-2-partial-automation): Simultaneous lane-centering and speed control (Tesla Autopilot, GM Super Cruise). Human remains legally liable at every second.
* [**Level 3: Conditional Automation**](#level-3-conditional-automation-and-the-handover-problem): Car drives on selected highways (Honda Legend, Mercedes DRIVE PILOT). Manufacturer accepts liability until demanding a manual takeover.
* [**Level 4: High Automation**](/level-4-autonomous-driving-robotaxis-and-driverless-buses/#level-4-high-automation-inside-a-defined-area): Car or bus operates without human fallback within geofenced areas (Waymo, Baidu Apollo, ADASTEC). No driver required.
* [**Level 5: Full Automation**](/level-4-autonomous-driving-robotaxis-and-driverless-buses/#level-5-the-edge-case-frontier): Unconstrained driving anywhere, in any weather, with zero pedals or steering wheel. Still a research frontier.

For a quick spoken version of the same list, this one-minute explainer from the Engineering Explained channel walks through the six levels and the cameras and radar that driver-assist systems rely on:

<iframe width="100%" height="420" src="https://www.youtube.com/embed/x_Bsxz7Joqs" title="What Are The 6 Levels Of Automated Driving? (Engineering Explained)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

The easiest way to see the difference between the levels is to follow each part of the driving job and watch where it moves from the human to the machine. Figure 1 does exactly that: each row is a level, each column is one of the four jobs, and the colour shows who is responsible.

![Who is driving at each SAE level: a grid showing steering, watching the road, fallback and liability moving from human to machine between Level 2 and Level 3](/assets/images/diagrams/sae-levels-who-drives.svg)
*Figure 1. Most of the change happens between Level 2 and Level 3. Up to Level 2, the car can steer and brake, but you are still the driver in every legal sense.*

The table below adds the formal SAE names and the year each level first reached public roads.

| Level | Formal SAE Category | Controls (Steering & Speed) | Environment Monitoring | Intervention Fallback | Legal Liability | First on Public Roads |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **L0** | No Driving Automation | Human Driver | Human Driver | Human Driver | Human | Decades ago (ABS, stability control, AEB) |
| **L1** | Driver Assistance | Shared (1 axis) | Human Driver | Human Driver | Human | 1999 (Mercedes Distronic radar cruise) |
| **L2** | Partial Automation | Machine (both axes) | Human (must monitor) | Human Driver | Human | 2015 (Tesla Autopilot) |
| **L3** | Conditional Automation | Machine | Machine | Human (on alert request) | Manufacturer | 2021 (Honda Legend, Mercedes DRIVE PILOT) |
| **L4** | High Automation | Machine | Machine | Machine (auto safe stop) | Fleet / Operator | 2020 (Waymo, Phoenix) |
| **L5** | Full Automation | Machine | Machine | Machine (any condition) | Manufacturer | Not yet |

## The Levels Did Not Arrive in Order

The numbers suggest a staircase that the industry climbed one step at a time. That is not what happened. Level 4 robotaxis were carrying paying passengers in Phoenix in 2020, months before the first Level 3 car was sold in Japan. Meanwhile Level 2, which arrived in 2015, is still what almost every "self-driving" car in a private driveway actually is.

Figure 2 lists the milestones in the order they happened. Read it top to bottom and notice two things: the long quiet gap before 2014, and Level 4 appearing a year before Level 3.

![Timeline of driving automation milestones from 1999 to 2025, colour-coded by level](/assets/images/diagrams/autonomous-driving-timeline.svg)
*Figure 2. Key milestones from 1999 to 2025. Incidents are included because each one changed how regulators and companies treated the technology.*

The sections below follow the standard from Level 0 to Level 5, but each one notes when that level actually reached the road.

---

## The Supervised Tiers (Levels 0 to 2): Machine Support Under Human Liability

Levels 0 through 2 represent Advanced Driver Assistance Systems (ADAS). In all three tiers, the human seated in the driver's cabin remains legally in command at every microsecond.

### Level 0: No Driving Automation
**On the road since:** the late 1970s (anti-lock brakes), with stability control following in the 1990s.

The vehicle's electronic control units (ECUs) do not continuously actuate steering or acceleration. The platform only issues sensory warnings or momentary emergency interventions:
* **Sensory alerts:** Blind Spot Information Systems (BLIS), Lane Departure Warning (LDW), Forward Collision Warning (FCW).
* **Momentary actuation:** Automated Emergency Braking (AEB) and Electronic Stability Control (ESC). Because AEB only activates for fractions of a second to mitigate an imminent crash, it does not constitute sustained longitudinal automation under SAE definitions.

Level 0 is not the same as "no technology". Since July 2024, the European Union's General Safety Regulation has required every new car registered in the EU to have automatic emergency braking. Those cars are still Level 0, because the system only steps in for a moment.

### Level 1: Driver Assistance
**On the road since:** 1999, when Mercedes-Benz offered radar-based *Distronic* adaptive cruise control on the S-Class.

The system provides continuous automated execution of a single control axis (either longitudinal or lateral) while the human driver executes the other:
* **Longitudinal assistance:** Standard Adaptive Cruise Control (ACC) modulating throttle and braking to maintain time-gap headway.
* **Lateral assistance:** Lane Keeping Assist (LKA) providing torque nudges to prevent roadway departure.
* The human remains responsible for all visual scanning, mirror checks, and steering input on the non-automated axis.

**Everyday example:** on a motorway with adaptive cruise on, the car slows down behind a truck and speeds back up when the lane clears, but you are still steering through every bend.

### Level 2: Partial Automation
**On the road since:** October 2015, when Tesla pushed *Autopilot* to existing cars as an over-the-air software update. Cadillac followed in 2017 with *Super Cruise*, the first system to allow hands-free driving on pre-mapped highways, and Ford's *BlueCruise* arrived in 2021.

The hardware simultaneously executes lateral lane-centering and longitudinal speed modulation. Common commercial implementations include Tesla Autopilot and "Full Self-Driving (Supervised)", General Motors Super Cruise, Ford BlueCruise, and BMW Driving Assistant Professional. The photo below shows what that looks like from the driver's seat: the screen draws the lane and the cars around it, which is exactly what makes it so easy to stop paying attention.

![Tesla Autopilot engaged on Interstate 80 near Lake Tahoe](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Tesla_Autopilot_engaged_on_I-80_near_Lake_Tahoe.jpg/1280px-Tesla_Autopilot_engaged_on_I-80_near_Lake_Tahoe.jpg)
*Tesla Autopilot engaged on I-80 near Lake Tahoe. The car is steering and holding its speed, but legally the person behind the wheel is still driving. Photo: Natecation, [CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Tesla_Autopilot_engaged_on_I-80_near_Lake_Tahoe.jpg).*

While Level 2 systems can create the visceral sensation of autonomous navigation, their operational safety model depends entirely on continuous human vigilance. Research from the [MIT Advanced Vehicle Technology (MIT-AVT) Consortium](https://doi.org/10.1109/ACCESS.2019.2926040) has empirically documented the dangers of partial automation:
* In a landmark study on naturalistic glance behavior around Tesla Autopilot disengagements ([Morando, Gershon, Mehler, & Reimer, 2021](https://doi.org/10.1016/j.aap.2021.106360)), researchers found that drivers exhibit significantly higher rates of off-road glances toward the central touch screen and personal devices when Level 2 features are engaged compared to manual driving.
* Crucially, [Morando et al. (2020)](https://doi.org/10.1177/0018720820945113) discovered that in **33% of driver-initiated disengagements**, drivers were not holding the steering wheel prior to taking back control, resulting in measurable delays in physical intervention.

#### When supervision fails: Tempe, Arizona, 2018
The clearest example of "automation complacency" did not involve a consumer car at all. On 18 March 2018, an Uber self-driving test vehicle struck and killed a pedestrian, Elaine Herzberg, as she crossed a road in Tempe, Arizona. It was the first pedestrian death involving a self-driving test car.

The [NTSB investigation](https://www.ntsb.gov/investigations/AccidentReports/Reports/HAR1903.pdf) found that the system first detected her about 5.6 seconds before impact but kept misclassifying what she was. Uber had also disabled the Volvo's own emergency braking while its software was in control. The human safety operator, whose whole job was to supervise, was streaming a TV show on a phone and looked up too late. The car was a test vehicle, but the failure was a Level 2 failure: a human expected to watch a machine that almost always gets it right.

To combat this "automation complacency," modern Level 2 platforms have deployed active Driver Monitoring Systems (DMS):
1. **Capacitive touch steering rims:** Replacing older steering-column sensors (which measured torque and could be fooled by hanging weights on the wheel) with touch-sensitive rims that detect skin contact directly.
2. **In-cabin infrared cameras:** Tracking head position, eye gaze direction, and eyelid closure rates to ensure the driver is still looking forward at the roadway.

---

## Level 3: Conditional Automation and the Handover Problem

**On the road since:** March 2021, when Honda began leasing 100 Legend sedans in Japan with *Traffic Jam Pilot*, after [Japan granted it Level 3 type designation](https://global.honda/en/newsroom/news/2020/4201111eng.html) in November 2020. Mercedes-Benz received the first approval under international UN rules in December 2021.

Level 3 marks a major legal transition: when the automated system is switched on, the manufacturer assumes **legal liability for driving**. The human in the driver's seat is legally allowed to take their eyes off the road, whether to glance at messages, browse infotainment menus, or speak with passengers.

However, Level 3 systems operate only within a strictly bounded **Operational Design Domain (ODD)**. In automotive engineering, an ODD is simply the specific set of real-world conditions under which a system is designed and certified to function:
* Road conditions: Structurally divided highways with clear physical lane barriers and no oncoming traffic, pedestrians, or cyclists.
* Weather limits: Clear daytime weather, without heavy rain, fog, or snow obscuring lane markings.
* Operating boundaries: Digitally pre-mapped highway stretches, no active construction zones, and strict speed limits.

The tricky moment is what happens when one of those conditions stops being true. Figure 3 follows a Level 3 car through that moment, from driving normally, to asking for help, to the two ways it can end.

![How a Level 3 car hands control back: it drives, reaches the edge of its limits, asks the driver to take over, and then either the driver takes the wheel or the car stops itself](/assets/images/diagrams/level-3-takeover-flow.svg)
*Figure 3. Liability only moves back to the human if the human actually takes the wheel. If nobody responds, the car has to stop safely on its own.*

### The Handover Problem and Takeover Latency
The central challenge for Level 3 systems is what human factors researchers call **takeover latency**: the time it takes an off-duty human driver to recognize an alert, understand traffic conditions, and safely resume physical control of the car. When the car approaches the boundary of its operating conditions (such as entering a construction zone or encountering heavy downpours), it issues a **Takeover Request (TOR)**.

In a landmark review published in *Human Factors*, [Eriksson and Stanton (2017)](https://doi.org/10.1177/0018720816685428) investigated handover transitions in automated driving. In non-emergency situations, driver response times ranged from **1.9 to 25.7 seconds**, with a typical response taking 4.5 to 6.0 seconds. Further simulator tests by [Gold et al. (2013)](https://doi.org/10.1177/1541931213571433) and [Merat et al. (2014)](https://doi.org/10.1016/j.trf.2014.09.005) found that even after drivers placed their hands back on the wheel, stabilizing lane position and vehicle speed required **8 to 10 seconds**.

Those seconds turn into a lot of road. At highway speeds (such as 100 km/h or 62 mph), a car travels 27.8 meters per second. Figure 4 lays the measured takeover times out along a road at the same scale, with a football pitch for comparison.

![Distance a car covers at 100 km/h during a driver takeover: 53 m at 1.9 s, 125 to 167 m at 4.5 to 6 s, 278 m at 10 s and 714 m at 25.7 s](/assets/images/diagrams/level-3-takeover-distance.svg)
*Figure 4. A typical takeover lasts about as long as it takes to drive one and a half football pitches. The slowest driver in the study needed most of a kilometre.*

If the driver fails to take control after repeated visual, acoustic, and vibrating alerts, the system must execute what engineers call a **Minimal Risk Maneuver (MRM)** to reach a **Minimal Risk Condition (MRC)**. In plain language, the car must safely bring itself to a stop in its lane or on the shoulder, switch on hazard warning lights, and place an automatic emergency call.

### Commercial implementation: Mercedes-Benz DRIVE PILOT
The first automaker to achieve internationally recognized commercial approval for an SAE Level 3 system was Mercedes-Benz with its [DRIVE PILOT](https://group.mercedes-benz.com/) system:

* **Regulatory certification:** Certified under [UN Regulation No. 157](https://unece.org/transport/documents/2021/03/standards/un-regulation-no-157-automated-lane-keeping-systems-alks) (the international United Nations rulebook for Automated Lane Keeping Systems) by Germany's federal transport authority ([Kraftfahrt-Bundesamt, or KBA](https://www.kba.de/)) in December 2021, and launched on production S-Class and EQS sedans in Germany in 2022.
* **Expanding speed limits:** Under initial UN rules, the system was restricted to traffic-jam speeds of up to **60 km/h (37 mph)**. After updated regulatory approvals, Mercedes-Benz secured clearance from German authorities in late 2024 to raise DRIVE PILOT's top operating speed to **95 km/h (59 mph)** on German Autobahn corridors.
* **United States approvals:** Granted commercial operating approval by state authorities in [Nevada](https://dmv.nv.gov/) (January 2023) and the [California DMV](https://www.dmv.ca.gov/portal/vehicle-industry-services/autonomous-vehicles/) (June 2023) for designated freeway routes during congested traffic.
* **Redundant hardware stack:** Uses front-mounted laser radar (**LiDAR**), long-range radar, stereo optical cameras, road-moisture sensors inside wheel wells, centimeter-grade satellite positioning, and high-definition 3D vector maps. Crucially, it includes duplicate backup steering motors, backup braking boosters, and an independent secondary 12-volt electrical circuit.
* **Exterior turquoise marker lights ([SAE J3134](https://www.sae.org/standards/content/j3134_201905/)):** Mercedes-Benz became the first automaker authorized by California and Nevada to display turquoise exterior status lights built into headlights, taillights, and side mirrors. Engineers chose turquoise because it cannot be confused with flashing blue or red emergency vehicle lights, amber turn signals, or brake lamps. It lets surrounding motorists and traffic officers instantly see that the car's automated system, not the person in the front seat, is in legal control of driving.

To see the system in use, Mercedes-Benz published this 12-minute episode filmed at its Sindelfingen site. The presenters meet engineers who worked on DRIVE PILOT, try the driving simulator used to study how people react to a takeover request, and then ride hands-free on the Autobahn.

<iframe width="100%" height="420" src="https://www.youtube.com/embed/AiUUgVuqH98" title="Hands-free on the Autobahn with Mercedes-Benz Drive Pilot" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## Where This Leaves Us

Levels 0 to 2 help you drive, but you remain the driver: legally, and in practice, because the system is only as safe as your attention. Level 3 is the first level where the carmaker takes responsibility, and it pays for that with a handover that can take a person anywhere from 2 to 26 seconds, while the car covers up to 700 metres of road.

That handover is exactly why most companies building driverless vehicles skipped Level 3 and went straight to Level 4, where the vehicle never asks a human for help at all. Part 2 of this series follows that jump: robotaxis in Phoenix, San Francisco and Wuhan, driverless buses in Norway and the Netherlands, what happens when one of them gets stuck, and why Level 5 is still a research problem.

---

## Key Sources and Engineering Literature

1. **SAE International / ISO:**
   * SAE International (2021). *Taxonomy and Definitions for Terms Related to Driving Automation Systems for On-Road Motor Vehicles* (Standard J3016_202104 / ISO/SAE PAS 22736:2021). [SAE Standard J3016](https://www.sae.org/standards/content/j3016_202104/).
   * SAE International (2019). *Automated Driving System (ADS) Marker Lamp* (Standard J3134_201905). [SAE J3134](https://www.sae.org/standards/content/j3134_201905/).

2. **History of Self-Driving Research:**
   * DARPA (2014). *The DARPA Grand Challenge: Ten Years Later*. [DARPA News](https://www.darpa.mil/news-events/2014-03-13).

3. **Regulations and Type-Approvals:**
   * United Nations Economic Commission for Europe (UNECE). *UN Regulation No. 157: Uniform provisions concerning the approval of vehicles with regard to Automated Lane Keeping Systems (ALKS)*. [UN-R157 ALKS Documentation](https://unece.org/transport/documents/2021/03/standards/un-regulation-no-157-automated-lane-keeping-systems-alks).
   * Honda Motor Co. (2020). *Honda Receives Type Designation for Level 3 Automated Driving in Japan*. [Honda Global Newsroom](https://global.honda/en/newsroom/news/2020/4201111eng.html).
   * Mercedes-Benz Group AG (2021 to 2025). *DRIVE PILOT: System Architecture, UNECE R157 Certification, and SAE J3134 Turquoise Marker Lamp Specifications*. [Mercedes-Benz Technology News](https://group.mercedes-benz.com/).

4. **Accident Investigations:**
   * National Transportation Safety Board (2019). *Collision Between Vehicle Controlled by Developmental Automated Driving System and Pedestrian, Tempe, Arizona, March 18, 2018* (Highway Accident Report NTSB/HAR-19/03). [NTSB Report](https://www.ntsb.gov/investigations/AccidentReports/Reports/HAR1903.pdf).

5. **Human Factors, Disengagement, and Takeover Latency Research:**
   * Eriksson, A., & Stanton, N. A. (2017). *Takeover Time in Highly Automated Vehicles: Noncritical Transitions to and from Manual Control*. **Human Factors: The Journal of the Human Factors and Ergonomics Society**, 59(4), 689-705. DOI: [10.1177/0018720816685428](https://doi.org/10.1177/0018720816685428).
   * Morando, M. M., Gershon, P., Mehler, B., & Reimer, B. (2021). *A model for naturalistic glance behavior around Tesla Autopilot disengagements*. **Accident Analysis & Prevention**, 161, 106360. DOI: [10.1016/j.aap.2021.106360](https://doi.org/10.1016/j.aap.2021.106360).
   * Morando, M. M., Gershon, P., Mehler, B., & Reimer, B. (2020). *Driver-initiated Tesla Autopilot Disengagements in Naturalistic Driving*. **Human Factors: The Journal of the Human Factors and Ergonomics Society**. DOI: [10.1177/0018720820945113](https://doi.org/10.1177/0018720820945113).
   * Fridman, L., et al. (2019). *MIT Advanced Vehicle Technology Study: Large-Scale Naturalistic Driving Study of Driver Behavior and Interaction with Automation*. **IEEE Access**, 7, 102021-102038. DOI: [10.1109/ACCESS.2019.2926040](https://doi.org/10.1109/ACCESS.2019.2926040).
   * Merat, N., Jamson, A. H., Lai, F. C., Daly, M., & Carsten, O. M. (2014). *Transition to manual: Driver behaviour when resuming control from a highly automated vehicle*. **Transportation Research Part F: Traffic Psychology and Behaviour**, 27, 274-282. DOI: [10.1016/j.trf.2014.09.005](https://doi.org/10.1016/j.trf.2014.09.005).
   * Gold, C., Damböck, D., Lorenz, L., & Bengler, K. (2013). *"Take over!" How long does it take for a driver to take over control of a vehicle?* **Proceedings of the Human Factors and Ergonomics Society Annual Meeting**, 57(1), 1938-1942. DOI: [10.1177/1541931213571433](https://doi.org/10.1177/1541931213571433).
