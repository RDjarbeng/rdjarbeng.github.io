---
date: 2025-05-03T18:34:00
author: Richard
tags:
  - Satellite
  - Space
  - Astrodynamics
  - Keeptrack.space
  - Artificial Intelligence
  - United States Space Force
  - Satellite Visualization
  - TypeScript
title: "KeepTrack: A Free 3D Website for Tracking Satellites in Real Time"
image: /assets/images/keeptrack.png
video: ''
layout: post
image_alt: "Cover image for KeepTrack: A Free 3D Website for Tracking Satellites in Real Time"
series: "Free Satellite and Climate Data"
series_part: 6
category: "Space & Satellites"
---
I recently came across [KeepTrack](https://keeptrack.space/), a website that shows satellites orbiting Earth in 3D. Every tracked object is a coloured dot, and when you click one you get its name, its altitude and who owns it. It is surprising to watch how fast some of them move. Some cross an entire country in a few seconds.

![KeepTrack showing Earth surrounded by tracked satellites](/assets/images/keeptrack.png "KeepTrack in the browser")

## What it is

KeepTrack is an open source satellite tracker written in TypeScript by Theodore Kruczek. The project calls itself astrodynamics software for non-engineers. You can use it without knowing anything about orbits, and there are more technical tools if you want them. The 3D app is at [app.keeptrack.space](https://app.keeptrack.space/) and runs on a phone as well as a desktop, with nothing to install.

People who track satellites professionally use it too. The project lists the U.S. Space Force's Combined Space Operations Center and the 18th Space Defense Squadron among its users, along with StarTalk. It started as a fork of James Yoder's Things in Space, though the code has since been rewritten. The [repository](https://github.com/thkruz/keeptrack.space) says it can follow more than 50,000 satellites in real time.

## How it stays fast

Drawing tens of thousands of moving objects in a browser could easily make it slow. KeepTrack handles this by doing the orbit calculations in Web Workers, which run in the background, while WebGL draws everything on screen. The positions come from published orbital data (TLEs, the two line element sets that describe each orbit), and an orbital mechanics library by the same author works out where each object is at any moment. Keeping the calculations separate from the drawing is what lets it run smoothly on a phone.

## What you can do with it

The screenshot below shows the app with the menus open. Some of the things you can do:

- Click any satellite to see where it is now, how high it is and which country or company owns it.
- Filter by country. Russia and the United States own a large share of what is up there, and you can see it clearly when it is plotted.
- Search by name or catalogue number, or pick a group such as GPS or the ISS.
- Move time forward or backward and watch the orbits play out.
- Plot a satellite's position in different reference frames (ECI, ECF and RIC). These are coordinate systems engineers use, and comparing the same orbit in each helps explain why there is more than one.
- Model launches, breakups and manoeuvres, and check when a satellite will pass over a ground sensor.

![KeepTrack interface with satellite details and menus open](/assets/images/keeptrack_app_screenshot.png "KeepTrack with menus open")

## Trying it

Open [app.keeptrack.space](https://app.keeptrack.space/) and click on any satellite to start. If you want to run it yourself or read the code, it is on [GitHub](https://github.com/thkruz/keeptrack.space) under the AGPL licence.

This short video walks through the app if you want a quick tour first.

<iframe width="560" height="315" src="https://www.youtube.com/embed/qkQSz1UA_PY?si=V-DwVG8eIxDppl1B" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
