---
date: 2025-05-03T18:34:00
author: Richard
categories:
  - Satellite
tags:
  - Satellite
  - Space
  - Astrodynamics
  - Keeptrack.space
  - Artificial Intelligence
  - United States Space Force
  - Satellite Visualization
  - TypeScript
title: Explore the Fascinating World of Satellite Orbits with Keeptrack.space
image: /assets/images/keeptrack.png
video: ''
layout: post
image_alt: "Cover image for Explore the Fascinating World of Satellite Orbits with Keeptrack.space"
---
I came across [KeepTrack](https://keeptrack.space/) while looking for a way to see satellites without installing heavy software, and I ended up losing an hour to it. It draws Earth in your browser and fills the space around it with dots, one for every tracked object. Click a dot and you get its name, its altitude and who owns it. The thing that got me was the speed. Some of these satellites cross an entire country in the time it takes to read their label.

![KeepTrack showing Earth surrounded by tracked satellites](/assets/images/keeptrack.png "KeepTrack in the browser")

## What it is

KeepTrack is an open source satellite tracker written in TypeScript by Theodore Kruczek. The project describes itself as astrodynamics software for non-engineers, and that is a fair summary. You do not need to know what an orbital element is to use it, but the tools are there if you do. The 3D app lives at [app.keeptrack.space](https://app.keeptrack.space/) and runs on a phone as well as a desktop, with nothing to install.

It is also used by people who track satellites for a living. The project lists the U.S. Space Force's Combined Space Operations Center and the 18th Space Defense Squadron among its users, along with StarTalk. It started as a fork of James Yoder's Things in Space, though the code has since been rewritten. The [repository](https://github.com/thkruz/keeptrack.space) says it can follow more than 50,000 satellites in real time.

## How it stays fast

Drawing tens of thousands of moving objects in a browser tab sounds like a recipe for a frozen laptop. KeepTrack avoids that by doing the orbit maths in Web Workers, which run in the background, while WebGL handles the drawing. The positions come from published orbital data (TLEs, the two line element sets that describe each orbit), and an orbital mechanics library by the same author works out where each object is at any moment. That split is why it stays smooth on a phone.

## What you can do with it

The screenshot below shows the full app with the menus open. The parts I used most:

- Click any satellite to see where it is now, how high it is and which country or company owns it.
- Filter by country. Russia and the United States account for a large share of what is up there, and seeing it plotted makes that obvious.
- Search by name or catalogue number, or pick a group such as GPS or the ISS.
- Move time forward or backward and watch the orbits play out.
- Plot a satellite's position in different reference frames (ECI, ECF and RIC). These are the coordinate systems engineers use, and seeing the same orbit in each is a good way to understand why they exist.
- Model launches, breakups and manoeuvres, and check when a satellite will pass over a ground sensor.

![KeepTrack interface with satellite details and menus open](/assets/images/keeptrack_app_screenshot.png "KeepTrack with menus open")

## Trying it

Open [app.keeptrack.space](https://app.keeptrack.space/) and click anything. If you want to run it yourself or read the code, it is on [GitHub](https://github.com/thkruz/keeptrack.space) under the AGPL licence.

This short video walks through the app and is a quicker introduction than reading the menus one by one.

<iframe width="560" height="315" src="https://www.youtube.com/embed/qkQSz1UA_PY?si=V-DwVG8eIxDppl1B" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
