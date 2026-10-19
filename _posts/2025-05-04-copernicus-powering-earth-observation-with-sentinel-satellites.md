---
date: 2025-05-04T18:18:00
author: Richard
tags:
    - satellite
title: "Copernicus Explained: What Each Sentinel Satellite Measures and How to Use the Free Data"
image: /assets/images/copernicus_airq_new_delhi.png
video: ''
layout: post
image_alt: "Cover image for Copernicus Explained: What Each Sentinel Satellite Measures and How to Use the Free Data"
series: "Free Satellite and Climate Data"
series_part: 2
category: "Space & Satellites"
---
Copernicus is the European Union's Earth observation programme. Its data is free for anyone: you create an account and you can download satellite images of almost anywhere on Earth, often only a few days old. The European Commission runs the programme, and the European Space Agency (ESA) builds and operates most of the satellites.

I first looked at Copernicus for air quality data. This post goes through how the programme is organised, what each of its Sentinel satellites measures, and how to start using the data.

## How Copernicus is put together

Copernicus has three parts:

1. Satellites: the Sentinel family, each built for a different kind of measurement.
2. Ground measurements: weather stations, ocean buoys, air quality sensors and other instruments that check the satellite data and fill in what satellites cannot see.
3. Services: six services turn the raw data into ready to use products: atmosphere, marine, land, climate change, emergency management and security. The atmosphere service (CAMS), for example, publishes daily air quality forecasts. The climate service (C3S) publishes the monthly temperature reports you see in the news.

Most people only use the services. You do not need to process raw satellite data yourself to use a flood map or an air quality forecast.

## What each Sentinel does

### Sentinel-1: radar that sees through clouds

Sentinel-1 carries a radar instead of a camera. It sends out microwave pulses and measures what bounces back, so it works at night and through cloud. This makes it very useful for mapping floods, because floods usually come with heavy cloud. The Copernicus emergency service uses it to map flooded areas for rescue teams.

By comparing radar images taken weeks or months apart, scientists can also measure the ground moving by millimetres. This is how scientists monitor sinking cities like Jakarta, where pumping groundwater is causing parts of the city to sink.

### Sentinel-2: the colour camera

Sentinel-2 is closer to a normal camera. It takes high resolution images in 13 bands, from visible light into the infrared, with detail down to 10 metres, and with two satellites working together, the same spot is photographed about every five days.

The infrared bands are especially useful for vegetation. Healthy plants reflect a lot of near-infrared light, so Sentinel-2 can show crop stress before it is visible to the eye. The same data is used to spot new forest clearings, map farmland and track how cities grow.

### Sentinel-3: oceans and land temperature

Sentinel-3 measures the temperature of the sea and land surface, the colour of the ocean and the height of the sea surface. Ocean colour shows plankton and algal blooms, which matters for fisheries and water quality. Its thermal sensor also picks up active fires from space.

### Sentinel-5P: what is in the air

Sentinel-5P carries an instrument called TROPOMI that measures gases in the atmosphere: nitrogen dioxide from traffic and industry, methane, sulphur dioxide, ozone and carbon monoxide. Many of the city pollution maps you see online use its data. It has been used to find large methane leaks from oil and gas sites, and it tracked the sulphur dioxide cloud from the 2022 Hunga Tonga eruption.

Here is a screenshot of the web interface from when I was looking at a project on air pollution over New Delhi, where the nitrogen dioxide levels stand out clearly.

![Copernicus web interface showing air quality over New Delhi](/assets/images/copernicus_airq_new_delhi.png "Copernicus web interface showing air quality over New Delhi")

### Sentinel-6: sea level

Sentinel-6 Michael Freilich, launched in 2020 together with NASA, NOAA and EUMETSAT, measures the height of the sea surface to within a few centimetres. It continues a satellite record of global sea level that goes back to the early 1990s. This long record is how scientists know that sea level rise is speeding up. Countries with low coastlines, like the Netherlands and Bangladesh, depend on these numbers for flood defences and storm surge forecasts.

## Working with the data in Jupyter

If you would rather write code than click around a map, Copernicus also offers JupyterLab inside the [Copernicus Data Space Ecosystem](https://dataspace.copernicus.eu/). You get Python notebooks next to the data, so you can search, download and analyse images without moving gigabytes to your own machine first. The EU Space channel has a [short video overview](https://www.youtube.com/watch?v=zRqf9Nv0Tes) of how it works.

![Copernicus JupyterLab launch page](/assets/images/copernicus_jupyter_notebook.png "Copernicus JupyterLab launch page")

## Getting started

- The [Copernicus Browser](https://browser.dataspace.copernicus.eu/) is the easiest place to start. Pick a place and a date, and switch between satellites and layers.
- The [Data Space Ecosystem](https://dataspace.copernicus.eu/) is where you register, download data and use the APIs and notebooks.
- The [Copernicus use cases](https://www.copernicus.eu/en/use-cases) page collects real projects built on the data, which is a good source of ideas.

I would start with the browser and look at a place you know well. It is interesting to see your own neighbourhood in infrared or radar for the first time.
