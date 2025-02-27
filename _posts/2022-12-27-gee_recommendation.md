---
title: "Google Earth Engine: A Useful Tool for Satellite Imagery"
date: 2022-12-27
layout: post
author: Richard
image: https://github.com/user-attachments/assets/213b0937-d8b0-4b12-82fc-9220c977fd39
categories: ["GIS"]
tags: [Google Earth Engine, satellite, satellite imagery,GEE]
---

I discovered Google Earth Engine (GEE), and I thought it might be helpful to share my experience with others who might need satellite images for their work.    
![image](https://github.com/user-attachments/assets/f228193a-fdd1-4708-a78e-76babb867959)


GEE is essentially a repository of satellite images with some analysis capabilities. It's free for academic and research use, and it's also available for commercial purposes. You can find it here: https://earthengine.google.com/

Here are a few things I found useful:

- It includes historical imagery dating back over 30 years to the present day
- You can access it using JavaScript or Python (Web IDE provided for JavaScript)
- Image refresh times vary from daily to a few weeks, depending on the dataset and satellite image source
![image](https://github.com/user-attachments/assets/695be7c4-a6b5-4797-8857-f76cf61a4b09)

One interesting feature is the ability to filter images to show a specific area in a given year. However, it's worth noting that the highest resolution available is 10m pixel resolution from Sentinel-2, which might not be enough for very detailed views.

A couple of things to keep in mind:
1. GEE can use a lot of data during development, so be cautious if you're on a limited data plan.
2. If you're looking for the high-resolution images you might see on Google Earth, those often come from drones or aircraft, not satellites.

If you're interested in learning more, NASA ARSET has some helpful training videos, and the GEE documentation is a good place to start after registration. These links can get you started:
[NASA ARSET training](https://appliedsciences.nasa.gov/join-mission/training/english/fundamentals-satellite-remote-sensing-land-and-water-applications)
[GEE developer guide](https://developers.google.com/earth-engine/guides)

This tool significantly helped my project work, and I hope it might be useful for others too.

GEE web interface - [Image source](https://www.researchgate.net/figure/The-Earth-Engine-interactive-development-environment_fig3_318246365)
![image](https://github.com/user-attachments/assets/213b0937-d8b0-4b12-82fc-9220c977fd39)


#research #project #javascript #python #satellite-imagery
