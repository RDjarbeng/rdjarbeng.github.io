---
date: 2026-10-14T09:30:00+02:00
published: true
author: Richard
category: Technology
tags:
  - Autonomous Driving
  - SAE J3016
  - Robotics
  - Public Transit
  - Smart Cities
  - Artificial Intelligence
series: "Self-Driving, Explained"
series_part: 2
key_points:
  - "A Level 4 vehicle never asks a passenger to take over. Inside its approved area it handles everything, including stopping safely."
  - "Level 4 comes in two forms: robotaxis that go anywhere inside a mapped zone, and driverless buses that repeat one route."
  - "When a robotaxi gets stuck, a remote human suggests a path, but the car still does all of the driving."
  - "Level 5, a car that can drive anywhere in any weather, does not exist yet."
title: "Level 4 Autonomous Driving: How Robotaxis and Driverless Buses Work Today"
image: /assets/images/posts/covers/level_4_in_the_real_world_cover.jpg
image_alt: "Flat vector illustration of a red driverless robotaxi and a blue driverless bus on a city road inside a dashed geofence, titled Level 4 in the Real World"
layout: post
card_items:
  - name: "SAE J3016 Standard (ISO/SAE PAS 22736)"
    badge_1: "Foundational Standard"
    badge_2: "Taxonomy"
    url: "https://www.sae.org/standards/content/j3016_202104/"
    link_text: "Access SAE J3016"
    description: "The authoritative global engineering standard establishing formal taxonomy and definitions for driving automation systems (Levels 0 to 5) for on-road motor vehicles."
  - name: "Waymo Safety Performance Data (270M+ Miles)"
    badge_1: "Level 4 Commercial Benchmark"
    badge_2: "Safety Evaluation"
    url: "https://waymo.com/safety/"
    link_text: "Explore Waymo Safety Data"
    description: "Empirical safety evaluation across 270+ million rider-only commercial miles demonstrating an 82% reduction in injury crashes and 95% reduction in serious injury crashes compared to human drivers."
  - name: "ADASTEC flowride.ai & Karsan e-ATAK"
    badge_1: "Level 4 Public Transit"
    badge_2: "Commercial Deployment"
    url: "https://www.adastec.com/"
    link_text: "View ADASTEC Platform"
    description: "Deployment profiles of the Karsan Autonomous e-ATAK full-size electric bus across municipal transit lines in Stavanger (Norway), Paris (RATP Line 393), and Michigan State University."
---


Robotaxis with nobody in the driver's seat now carry paying passengers in several cities, and full-size electric buses run timetabled routes without a driver at the wheel. Both are SAE **Level 4** vehicles, and they are the clearest sign that driverless technology has left the test track.

[Part 1 of this series](/the-six-levels-of-autonomous-driving/) explained the six levels and why Level 3 is awkward: the car can drive itself, but it must hand control back to a human who may need ten seconds or more to respond. Level 4 removes that handover entirely. This part looks at what that means in practice, from robotaxis to driverless buses to the remote control rooms behind them, and ends with why Level 5 is still out of reach.

![A driverless robotaxi and a driverless bus inside a geofenced city area](/assets/images/posts/covers/level_4_in_the_real_world_cover.jpg)

## Level 4: High Automation Inside a Defined Area

**On the road since:** October 2020, when [Waymo opened its fully driverless service](https://waymo.com/blog/2020/10/waymo-is-opening-its-fully-driverless) in Phoenix to the general public. Riders had been taking driverless test rides there since 2017.

Because Level 3 transfers operational risk back to an out-of-the-loop human during sudden road hazards, many leading autonomous developers (such as Waymo, Zoox, and Baidu Apollo) chose to bypass Level 3 entirely and focus directly on **Level 4**.

At Level 4, the vehicle is architected **never to ask an occupant to take the wheel**. If the vehicle encounters heavy weather exceeding its operating limits, a damaged sensor, or a road blockage it cannot navigate, it executes its own fallback stop safely on the shoulder or within its lane without human help. Everyone inside is strictly a passenger.

In practice, Level 4 has split into two very different businesses: robotaxis that go wherever a passenger asks within a mapped zone, and driverless buses that repeat a single route. Figure 1 puts them side by side.

![Level 4 comes in two forms: a robotaxi may drive any trip inside a geofenced area on demand, while a driverless bus repeats one fixed route on a timetable](/assets/images/diagrams/level-4-robotaxi-vs-bus.svg)
*Figure 1. Both are Level 4. The difference is how much of the map each one is allowed to use, and that shapes who they serve. The rest of this section covers each in turn.*

### 1. Urban Robotaxis: The Commercial Global Battleground

While early autonomous testing was dominated by Silicon Valley tech pilots, urban robotaxis are now in active commercial revenue service across thousands of square miles globally.

#### The US Market: Waymo, Cruise and Tesla
The United States has emerged as a stark contest between multi-modal sensor fusion and pure vision:

* **[Waymo One](https://waymo.com/) (Alphabet):** The commercial pacesetter in driverless ride-hailing. After Phoenix, Waymo expanded to **San Francisco** and **Los Angeles**, and in 2025 launched in **Austin** and **Atlanta** through the Uber app. It logs hundreds of thousands of paid driverless trips each week. Its multi-sensor architecture combines roof-mounted LiDARs, imaging radar, optical cameras, and external microphone pods. Under mandatory federal incident reporting from the [NHTSA Standing General Order](https://www.nhtsa.gov/laws-regulations/standing-general-order-crash-reporting), Waymo's dataset spanning more than 270 million rider-only miles shows an **82% reduction in injury crashes** and a **95% reduction in serious injury crashes** compared to human drivers, corroborated by research from the [Insurance Institute for Highway Safety (IIHS)](https://www.iihs.org/).

Those sensors are easy to spot on the street. The photo below shows a Waymo car on a San Francisco road with the driver's seat empty.

![A driverless Waymo Jaguar I-Pace in San Francisco with nobody in the driver's seat](https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Waymo_Jaguar_I-Pace_in_San_Francisco_2023_dllu.jpg/1280px-Waymo_Jaguar_I-Pace_in_San_Francisco_2023_dllu.jpg)
*A Waymo Jaguar I-Pace driving itself through San Francisco in 2023, with nobody in the driver's seat. Note the roof-mounted LiDAR dome and the sensor pods on each corner. Photo: Dllu, [CC BY 4.0](https://commons.wikimedia.org/wiki/File:Waymo_Jaguar_I-Pace_in_San_Francisco_2023_dllu.jpg).*

What it is like to ride in one is harder to picture. In this 10-minute video, a travel YouTuber takes a first Waymo ride in San Francisco, from booking in the app and how the car talks to the passenger, to steep hills and busy intersections with nobody behind the wheel.

<iframe width="100%" height="420" src="https://www.youtube.com/embed/u0Iv3jvCDaE" title="Waymo Driverless Car in San Francisco | First Ride on City Streets" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Waymo is not the only company that has tried this in the US, and not every attempt went well:

* **Cruise (General Motors): a cautionary example.** In August 2023 California allowed both Waymo and GM's Cruise to run paid, round-the-clock robotaxi service in San Francisco. Two months later, a pedestrian who had been thrown into a Cruise car's path by a hit-and-run driver was trapped under it, and the car then tried to pull over, dragging her about 20 feet. The [California DMV suspended Cruise's driverless permits](https://www.dmv.ca.gov/portal/news-and-media/dmv-statement-on-cruise-llc-suspension/) in October 2023, partly over how the company disclosed the incident, and GM shut down the Cruise robotaxi business in December 2024. Level 4 shifts liability to the operator, and this is what that looks like when things go wrong.
* **[Tesla](https://www.tesla.com/) (Autopilot, FSD Supervised, and Cybercab):** Tesla rejects LiDAR and HD maps in favor of an end-to-end neural network running exclusively on optical cameras ("Tesla Vision"). Consumer Teslas remain classified strictly as **SAE Level 2 (Supervised)** because the human driver retains total legal liability at all times. In late 2024, Tesla unveiled the dedicated two-seat **Cybercab** robotaxi concept without steering wheels or pedals, and in June 2025 it started a small paid robotaxi pilot in Austin using Model Y cars, with a Tesla safety monitor riding in the front passenger seat.

#### The Chinese Market: Massive Scale and Multi-City Saturation
China has rapidly scaled the world's highest-density driverless robotaxi deployments, supported by dedicated municipal smart-city infrastructure and vehicle-to-everything (V2X) sensor networks:

* **[Baidu Apollo Go](https://apollo.auto/) (RT6):** Baidu began fully driverless commercial rides in **Wuhan** and **Chongqing** in 2022 and has since expanded across major Chinese cities including **Beijing**, **Shenzhen**, and **Shanghai**. Its Apollo Go fleet has completed millions of fully driverless commercial orders. In Wuhan alone, hundreds of sixth-generation **Apollo RT6** fully electric robotaxis navigate densely populated streets, bridges, and severe traffic corridors completely uncrewed.
* **[Pony.ai](https://www.pony.ai/) and [WeRide](https://www.weride.ai/):** Both technology providers run licensed commercial driverless fleets across Guangzhou, Beijing, and international pilot sites in the UAE and Singapore. Their fleets incorporate customized electric platforms from Chinese automakers like **GAC**, **FAW**, and **Geely / Zeekr**, featuring multi-sensor LiDAR arrays integrated directly into production vehicle chassis.

Baidu's own 35-second clip gives a quick look at an Apollo Go ride in Wuhan: booking the car, the cabin, and the robotaxi handling dense city traffic.

<iframe width="100%" height="420" src="https://www.youtube.com/embed/xvitD_7jmUw" title="Experience Driverless Robotaxis in Wuhan | Baidu Apollo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### 2. Autonomous Municipal Transit: Electric Buses in Public Fleets
While passenger robotaxis like Waymo dominate news coverage, municipal public transit represents the practical vanguard of Level 4 automation. Deploying driverless technology in public transportation solves chronic driver shortages and expands fixed route service.

Rather than retrofitting consumer passenger sedans, commercial bus builders collaborate directly with specialized autonomous software providers. The primary global partnership leading full-size automated transit brings together two specialized entities:
* **[Karsan](https://www.karsan.com/):** A prominent commercial vehicle manufacturer based in **Bursa, Turkey**, with decades of experience producing electric city buses exported across Europe and North America.
* **[ADASTEC](https://www.adastec.com/):** An automated driving software firm founded in **Istanbul, Turkey**, and headquartered in **Farmington Hills, Michigan (USA)**, that builds `flowride.ai`, a specialized Level 4 software stack tailored specifically for full-size heavy commercial buses and municipal operations.

Their joint flagship vehicle is the **Karsan Autonomous e-ATAK**, an 8.3-meter, 52-passenger fully electric bus equipped with LiDAR, radar, high-definition optical cameras, and redundant braking systems. It has achieved real-world commercial route deployments across multiple continents, starting in 2022:
* **Stavanger, Norway (Kolumbus Line 18):** Operating in open mixed traffic since 2022, this deployment reached a historic regulatory milestone by receiving formal authorization from Norwegian transport authorities to operate in scheduled public transit service without an in-vehicle safety driver behind the wheel.
* **Michigan State University (MSU, USA):** Deployed in 2022, the Autonomous e-ATAK operates on a 2.5-mile non-stop route connecting the MSU commuter lot to the campus transit center, making it the first full-size automated bus deployed on public roads in the United States.
* **Paris, France (RATP Line 393):** Completed extensive operational trials on a high-frequency Bus Rapid Transit (BRT) corridor in the Île-de-France region, negotiating complex dedicated bus lanes, multi-lane roundabouts, pedestrian crossings, and priority traffic signals.
* **International Expansion:** Further deployments and commercial pilots have been established in **Arbon (Switzerland)**, **Rotterdam The Hague Airport (Line 533)** in the Netherlands, and municipal campuses in **Romania** (Ploiești Industrial Park and Cluj-Napoca).

From the kerb, an autonomous e-ATAK looks almost like any other city bus. This one is in regular service in the Netherlands:

![Karsan e-ATAK Autonomous bus operated by RET on Line 533 to Rotterdam The Hague Airport](https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/RET_Karsan_e-ATAK_Autonomous_410_as_Line_533%2C_2026.jpg/1280px-RET_Karsan_e-ATAK_Autonomous_410_as_Line_533%2C_2026.jpg)
*A Karsan e-ATAK Autonomous bus in RET service on Line 533 to Rotterdam The Hague Airport, 2026. Photo: Styyx, [CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:RET_Karsan_e-ATAK_Autonomous_410_as_Line_533,_2026.jpg).*

---

## The Operational Realities: On-Board Safety Stewards and Remote Fleet Response
 
In many cities piloting autonomous transit shuttles, riders frequently notice a staff member or safety attendant seated on board.

Having an attendant inside an automated bus is not an indicator that the self-driving technology has failed. It reflects straightforward legal, accessibility, and operational requirements during real-world deployments:

1. **Passenger accessibility:** An autonomous perception stack cannot assist a passenger using a wheelchair, operate a manual boarding ramp, secure four-point floor belts, help visually impaired riders navigate to seats, or resolve fare disputes during peak rush hours. In the United States, compliance with the [Americans with Disabilities Act (ADA)](https://www.ada.gov/) often necessitates staff assistance.
2. **Regulatory transition periods:** Transportation rules, including European Union [Regulation (EU) 2022/1426](https://eur-lex.europa.eu/eli/reg_impl/2022/1426/oj) for automated vehicles and United States commercial vehicle exemptions, routinely require certified safety personnel on board during initial public deployment stages before authorities grant fully uncrewed commercial licenses.
3. **Remote fleet support instead of direct remote driving:**
   As fleets gain operational mileage, onboard technicians give way to **remote fleet assistance centers**. Importantly, remote support does **not** mean someone driving the car like a video game over cellular data:
   * Direct joystick driving over mobile networks is dangerous because network lag (latency spikes) and lost signals can delay emergency braking.
   * Instead, systems like Waymo Fleet Response and ADASTEC Remote Operations provide **high-level route guidance**. When an automated vehicle meets an unexpected obstruction (such as construction cones pushing traffic across a solid double-yellow line, or a police officer directing traffic with hand gestures), the car brings itself to a safe stop and asks fleet control for guidance. A human specialist views the vehicle's 3D cameras, confirms an approved path around the obstacle, and hands execution back to the car's local obstacle avoidance software.

Figure 2 walks through one of those requests for help, step by step, with the car on one side and the remote control room on the other.

![How remote assistance works for a Level 4 robotaxi: the car stops at an obstacle and sends camera views, a human specialist marks an allowed path, and the car drives that path itself](/assets/images/diagrams/level-4-remote-assistance.svg)
*Figure 2. The remote specialist only suggests where the car may go. The car keeps doing the steering, braking and obstacle avoidance itself.*

---

## Level 5: The Edge-Case Frontier

**On the road since:** not yet. No company sells or operates a Level 5 vehicle, and none has announced a credible date.

Level 5 represents **universal, unconstrained autonomy**. An SAE Level 5 vehicle must be capable of operating under all roadway conditions, across any drivable geography, in any weather, anywhere on Earth, with zero human intervention and no requirement for steering wheels, pedals, or manual controls.

Level 5 remains a scientific research frontier rather than a commercial product. The engineering challenges separating Level 4 from Level 5 are profound:
* **Adverse Weather Physics:** In heavy blizzards, freezing sleet, or torrential monsoon downpours, optical camera lenses become obscured, airborne snowflakes cause near-field LiDAR beam backscatter, and lane markings disappear entirely beneath packed snow or standing water.
* **Open-World Semantic Reasoning:** A Level 5 system cannot rely on pre-scanned millimeter-accurate High-Definition (HD) vector maps. It must navigate unpaved dirt trails, unmarked desert roads, dynamic detours with hand-scrawled detour signs, and nuanced human social interactions (e.g., eye contact and subtle hand gestures from construction workers or local drivers).
* **The Long Tail of Rare Events:** Machine learning models trained on millions of urban highway miles still struggle when encountering rare, out-of-distribution physical edge cases that a human driver negotiates using general commonsense physics and intuition.

Because solving every edge case globally is unnecessary to deliver safe urban transit, leading autonomous vehicle developers focus their capital on expanding the operational envelopes of **Level 4** systems.

---

## Strategic Takeaway: Why This Matters to Everyday Commuters

For everyday drivers and riders, the debate over autonomous vehicles is often framed around luxury passenger cars: whether someone can nap on the way to work or let their personal Tesla drive them home. 

In reality, the most immediate transformation will be seen in municipal public transit rather than private car ownership.

Cities worldwide face severe everyday transit bottlenecks:
* Severe shortages of licensed bus drivers leading to canceled runs and stranded riders.
* Rising operating costs that cause transit agencies to slash late-night routes and weekend service.
* Expanding transit deserts that leave suburban residents without dependable connections to rail lines or job centers.

Deploying SAE Level 4 automated electric shuttles along designated routes, bus rapid transit corridors, and neighborhood loops directly addresses these issues. By running predictable, high-frequency neighborhood feeder loops around the clock without driver-shift bottlenecks, autonomous transit connects residential areas directly to regional transit hubs. It shifts autonomous technology away from high-priced executive toys and toward affordable, reliable public infrastructure that commuters can rely on every single day.

---

---

## Key Sources

1. **Standards and Regulations:**
   * SAE International (2021). *Taxonomy and Definitions for Terms Related to Driving Automation Systems for On-Road Motor Vehicles* (Standard J3016_202104 / ISO/SAE PAS 22736:2021). [SAE Standard J3016](https://www.sae.org/standards/content/j3016_202104/).
   * National Highway Traffic Safety Administration (NHTSA). *Standing General Order 2021-01 for Crash Reporting: Incident Notification for Automated Driving Systems (ADS) and Level 2 ADAS*. [NHTSA SGO Reporting](https://www.nhtsa.gov/laws-regulations/standing-general-order-crash-reporting).
   * European Commission (2022). *Commission Implementing Regulation (EU) 2022/1426: Laying down rules for the application of Regulation (EU) 2019/2144 as regards uniform procedures and technical specifications for the type-approval of the automated driving system (ADS) of fully automated vehicles*. [EUR-Lex](https://eur-lex.europa.eu/eli/reg_impl/2022/1426/oj).
   * California DMV (2023). *DMV Statement on Cruise LLC Suspension*. [California DMV](https://www.dmv.ca.gov/portal/news-and-media/dmv-statement-on-cruise-llc-suspension/).

2. **Commercial Deployment Milestones and Safety Benchmarks:**
   * Waymo (2020). *Waymo is opening its fully driverless service to the general public in Phoenix*. [Waymo Blog](https://waymo.com/blog/2020/10/waymo-is-opening-its-fully-driverless).
   * Waymo LLC (2024 to 2026). *Safety Performance Data and Human Driver Benchmark Comparisons Across Rider-Only Miles*. [Waymo Safety Transparency](https://waymo.com/safety/).
   * Insurance Institute for Highway Safety (IIHS, July 2026). *Comparison of Real-World Autonomous Vehicle and Human Crash Rates per Vehicle Mile Traveled*. [IIHS Research](https://www.iihs.org/).
   * ADASTEC Corporation & Karsan (2022 to 2026). *Deployments of Level 4 flowride.ai on Karsan Autonomous e-ATAK Across Stavanger (Kolumbus), Michigan State University, and Paris (RATP Line 393)*. [ADASTEC Deployments](https://www.adastec.com/).
