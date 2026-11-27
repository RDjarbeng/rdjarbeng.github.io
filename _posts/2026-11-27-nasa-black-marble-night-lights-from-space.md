---
title: "NASA Black Marble: Night lights as a map of human activity"
date: 2026-11-27
published: false
author: Richard
category: "Space & Satellites"
tags: [Earth observation, Satellites, Night lights, Urbanisation, Disaster response]
description: "NASA's Black Marble turns satellite images of night light into free daily, monthly and yearly maps that show cities, power outages and other human activity."
key_points:
  - "Black Marble is a NASA product suite that turns satellite measurements of night light into daily, monthly and yearly images of Earth."
  - "Its products use the VIIRS day-night band, which records light from cities, fishing fleets, gas flares and lava flows."
  - "The data are free under NASA's open science policy. Worldview and Earthdata Search are NASA's tools for viewing and downloading them."
  - "NASA documents uses such as population along the Nile, power outages after Hurricane Melissa in Jamaica, and gas flares and illegal fishing."
image: ""
image_alt: ""
content_type: explainer
ai_assistance:
  - drafting
layout: post
---

Satellites can see where lights are on at night. That tells you where people live and whether the power is working. [NASA's Black Marble](https://www.earthdata.nasa.gov/data/projects/black-marble) is a suite of related data products. It turns satellite images of artificial light into a daily, monthly and yearly record of human activity. Its lead scientist, or principal investigator, is Zhuosen Wang of the University of Maryland and NASA Goddard Space Flight Center. The Suomi NPP data are distributed through NASA's LAADS DAAC, an archive for these data, and the same project page lists the data access tools.

## What the products contain

The raw material is light. The Visible Infrared Imaging Radiometer Suite (VIIRS) is an instrument that carries a day-night band (DNB), a sensor setting designed to capture very faint light. VIIRS flies on the Suomi NPP, NOAA-20 and NOAA-21 satellites. The [project page](https://www.earthdata.nasa.gov/data/projects/black-marble) lists light from cities, fishing fleet navigation lights, gas flares and lava flows. It also lists moonlight reflected off ice and snow. Gas flares are fires that burn off gas at industrial sites.

Raw night images need correction. The [ARSET training page](https://www.earthdata.nasa.gov/learn/trainings/introduction-nasas-black-marble-night-lights-data) says Black Marble products are cloud-free and corrected for the atmosphere, terrain, moonlight and stray light. The result is a radiance, a measure of how much light leaves each patch of the Earth's surface.

The products come in daily, monthly and yearly forms. The monthly and yearly images are composites, which means they combine many nights into one image. The data are gridded, or split into a regular grid of cells, at 15 arc-seconds, a small unit of angle.

The record starts on 19 January 2012 for Suomi NPP (VNP46 product code) and 5 January 2018 for NOAA-20 (VJ146 product code). Near real-time data arrive within a three-hour window. The files use HDF-EOS5, a scientific data format, so you need mapping or analysis software to read them.

## Two examples of use

The first example is Egypt. A VIIRS day-night band image from 13 October 2012 shows the Nile Valley and Delta. NASA's [Earth Observatory article](https://science.nasa.gov/earth/earth-observatory/city-lights-illuminate-the-nile-79807/) says the valley and delta make up less than 5 percent of Egypt's land area. They hold roughly 97 percent of its population. The lights trace the river, the delta, Cairo and the Suez Canal. Most of the country's people live in a small share of its land, and the lights make that visible.

The second example is Jamaica. NASA says [Hurricane Melissa made landfall on 28 October 2025 as a category 5 storm](https://www.earthdata.nasa.gov/news/worldview-image-archive/power-outages-across-jamaica-due-hurricane-melissa). Category 5 is the highest rating on the hurricane scale, and landfall means the point where a storm moves onto land. A Black Marble blue and yellow composite, made from NOAA-21 observations, compares 19 October with 13 November 2025. The later image shows many smaller inland areas still without power two and a half weeks after landfall.

NASA's [nighttime lights topic page](https://www.earthdata.nasa.gov/topics/human-dimensions/nighttime-lights) describes further uses. These include estimating population, assessing electrification (how many places have power) in remote areas, and monitoring disasters and conflict. The same page cites NASA data used for disaster recovery in Puerto Rico after Hurricane Maria in 2017. It also cites fluctuations in economic activity in Dubai from 2012 to 2020. The [project page](https://www.earthdata.nasa.gov/data/projects/black-marble) also lists gas flares, light pollution and illegal fishing.

## How to start using it

Black Marble data are [free under NASA's open science policy](https://www.earthdata.nasa.gov/data/projects/black-marble). [Worldview](https://www.earthdata.nasa.gov/data/tools/worldview) is a viewing tool that works on mobile devices. You can compare and animate images, and download them.

For data files, use [Earthdata Search](https://www.earthdata.nasa.gov/data/tools/earthdata-search). NASA says an Earthdata Login, a sign-in account, is required to download data and to use some tools with full functionality. The [HDF to GeoTIFF tool](https://www.earthdata.nasa.gov/data/projects/black-marble/data-access-tools) reads, converts and displays VNP46 files from Suomi NPP.

If you only need a picture for a story or a class, the Earth Observatory publishes [Black Marble flat maps as JPEG and GeoTIFF](https://science.nasa.gov/earth/earth-observatory/earth-at-night/maps/). They come at three resolutions: 0.1 degrees, 3 km and 500 m.

To learn how to choose between the products, NASA's ARSET programme offers a [two-hour introductory webinar](https://www.earthdata.nasa.gov/learn/trainings/introduction-nasas-black-marble-night-lights-data). Slides, a question and answer transcript and homework are posted online. The training asks you to install QGIS, a desktop mapping program, to follow the demonstration.

## Conclusion

Night lights can show where people are and whether the power is working, but they do not show who lives in a place. They are a proxy, meaning a stand-in measure that is easier to track from space, for human activity. They cannot replace a census, which is a full count of the population. For the wider set of tools and the barriers that come with them, read [the Earth observation overview](/earth-observations-promise-and-barriers-a-down-to-earth-view/).
