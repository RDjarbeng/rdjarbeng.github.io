---
key_points:
  - "Google Earth Engine (GEE) is a free, web-based platform providing access to satellite imagery and analysis tools for academic and research use."
  - "GEE includes historical imagery dating back over 30 years, with image refresh times ranging from daily to a few weeks, depending on the dataset and satellite image source."
  - "The platform offers JavaScript and Python access, with a web Code Editor for JavaScript. The sharpest free global satellite imagery is 10m per pixel from Sentinel-2, and a short script can map a month of Sentinel-5P NO2 over a city such as Kigali."
  - "Users should be cautious of data usage during development and consider NASA ARSET's training videos and GEE documentation for further learning."
title: "Google Earth Engine: A Useful Tool for Satellite Imagery"
date: 2025-12-27
layout: post
author: Richard
image: https://github.com/user-attachments/assets/213b0937-d8b0-4b12-82fc-9220c977fd39
tags: [Google Earth Engine, Satellite, satellite imagery,GEE]
image_alt: "Cover image for Google Earth Engine: A Useful Tool for Satellite Imagery"
series: "Free Satellite and Climate Data"
series_part: 3
category: "Space & Satellites"
ai_assistance:
  - drafting
---

I discovered Google Earth Engine (GEE), and I thought it might be helpful to share my experience with others who might need satellite images for their work.    
![image](https://github.com/user-attachments/assets/f228193a-fdd1-4708-a78e-76babb867959)


GEE is essentially a repository of satellite images with some analysis capabilities. It's free for academic and research use, and it's also available for commercial purposes. You can find it here: https://earthengine.google.com/

Here are a few things I found useful:

- It includes historical imagery dating back over 30 years to the present day
- You can access it using JavaScript or Python (Web IDE provided for JavaScript)
- Image refresh times vary from daily to a few weeks, depending on the dataset and satellite image source
![image](https://github.com/user-attachments/assets/695be7c4-a6b5-4797-8857-f76cf61a4b09)

One interesting feature is the ability to filter images to show a specific area in a given year. However, the sharpest free global satellite imagery is about 10m per pixel, from Sentinel-2, which might not be enough for very detailed views. The [data catalog](https://developers.google.com/earth-engine/datasets) also lists some high-resolution aerial imagery, but not with global coverage.

A couple of things to keep in mind:
1. GEE can use a lot of data during development, so be cautious if you're on a limited data plan.
2. If you're looking for the high-resolution images you might see on Google Earth, those often come from drones or aircraft, not satellites.

If you're interested in learning more, NASA ARSET has some helpful training videos, and the GEE documentation is a good place to start after registration. These links can get you started:
[NASA ARSET training](https://appliedsciences.nasa.gov/join-mission/training/english/fundamentals-satellite-remote-sensing-land-and-water-applications)
[GEE developer guide](https://developers.google.com/earth-engine/guides)

## A short example: one month of NO₂ over Kigali

Earth Engine also holds atmospheric data, not just pictures of the ground. The Sentinel-5P satellite measures gases such as nitrogen dioxide (NO₂), a common air pollutant. The [Sentinel-5P NO₂ dataset page](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S5P_OFFL_L3_NO2) lists the collection as `COPERNICUS/S5P/OFFL/L3_NO2`. It starts on 28 June 2018 and has pixels about 1.1 km across.

The script below maps the average tropospheric NO₂ over Kigali for July 2025. Paste it into the [Code Editor](https://code.earthengine.google.com/) and click Run.

```javascript
// 1. Area of interest: a 15 km circle around central Kigali
var kigali = ee.Geometry.Point([30.115, -1.9525]).buffer(15000);

// 2. Load the NO2 collection, keep one band, one month, one area
var no2 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2025-07-01', '2025-08-01')
  .filterBounds(kigali);

// 3. Average all images in the month and cut to the circle
var meanNo2 = no2.mean().clip(kigali);

// 4. Show it on the map
var viz = {
  min: 0,
  max: 0.0002,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.centerObject(kigali, 10);
Map.addLayer(meanNo2, viz, 'Mean tropospheric NO2, July 2025');

// 5. Print one average value for the whole area
var stats = meanNo2.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: kigali,
  scale: 1113.2
});
print('Mean NO2 (mol/m^2)', stats);
```

What each step does:

1. `ee.Geometry.Point` takes longitude first, then latitude. The coordinates come from [Wikipedia's Kigali page](https://en.wikipedia.org/wiki/Kigali). `buffer(15000)` turns the point into a circle with a 15 km radius, about 700 km². Kigali's area is 730 km², so this is a rough stand-in for the city boundary.
2. `ee.ImageCollection` loads every Sentinel-5P NO₂ image. `select` keeps only the tropospheric column band, the part of the atmosphere near the ground. `filterDate` keeps July; the end date is excluded, so `2025-08-01` stops at 31 July. `filterBounds` drops images that don't touch the circle.
3. `mean()` averages each pixel across all the images in the month. Averaging over a month evens out day-to-day changes. `clip` hides everything outside the circle.
4. The colour range and palette match the example on the dataset page. Values are in moles of NO₂ per square metre of ground, so they look tiny.
5. `reduceRegion` with `ee.Reducer.mean()` gives one number for the whole circle. `scale` is set to the dataset's pixel size of 1113.2 m. The result appears in the Console tab.

To try another city or month, change the coordinates and the two dates. Satellite NO₂ is a column through the air, not the concentration you breathe at street level. It is useful for comparing places and months, but it does not replace ground monitors. The [air quality hub](/air-quality/) on this site collects my posts on ground data, standards and the AQI.

This tool significantly helped my project work, and I hope it might be useful for others too.

GEE web interface - [Image source](https://www.researchgate.net/figure/The-Earth-Engine-interactive-development-environment_fig3_318246365)
![image](https://github.com/user-attachments/assets/213b0937-d8b0-4b12-82fc-9220c977fd39)


#research #project #javascript #python #satellite-imagery
