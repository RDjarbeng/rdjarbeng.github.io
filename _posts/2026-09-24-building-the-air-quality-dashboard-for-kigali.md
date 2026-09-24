---
date: 2026-09-24T13:52:00+02:00
published: false
author: Richard
category: Technology
tags:
  - Kigali
title: Building the air quality dashboard for Kigali
image: ''
image_alt: ''
layout: post
card_items: []
---

The data came from US Embassy reference monitors, which have logged hourly PM2.5 readings for years. Nobody had turned them into something a resident or an official could act on. I started by asking what "bad air" means in numbers. I worked from the WHO guidelines and the US AQI breakpoints and computed the distribution first. The average was 43.31 ug/m3, only 3.4% of readings were in the Good category, and over 57% were Unhealthy or worse. After that I knew this wasn't a borderline story, and I built everything else with that in mind. A number alone wasn't enough for people, so I added diurnal and seasonal views showing when pollution peaks, comparisons with other African cities, and visibility photos from Amahoro Stadium, so a non-technical reader could connect a reading to something they had seen themselves. Academic advisors checked the methodology, because a misleading dashboard is worse than none.

If I started again, I would change two things. First, I would automate ingestion from the beginning. I treated data updates as a manual step because I was focused on getting the analysis right, but a dashboard that goes stale quietly loses trust, and trust was the reason for building it. A scheduled pipeline with freshness checks would have made it a living system instead of a snapshot. Second, I would version the dataset alongside the code. I kept refining thresholds and groupings, and without versioning I couldn't always reconstruct which data produced an earlier conclusion. For a tool meant to inform decisions, that traceability matters.

What I took from it is that the hard part is rarely the model or the chart. It is working out what needs building with people who don't speak in specs, and then standing behind the result. That is what draws me to forward deployed work.
