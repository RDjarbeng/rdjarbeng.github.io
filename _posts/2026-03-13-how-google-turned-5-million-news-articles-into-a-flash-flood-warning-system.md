---
date: 2026-03-13T14:28:00+02:00
published: false
author: Richard
category: AI News
tags:
  - Google
  - Floods
  - Weather
title: How Google Turned 5 Million News Articles into a Flash Flood Warning System
image: ''
image_alt: ''
layout: post
card_items: []
---

card_items:
  - name: "Groundsource Dataset"
    image: ""
    alt: "Groundsource flood events global map"
    badge_1: "Open Data"
    badge_2: "Dataset"
    description: |
      2.6 million geo-tagged flood events across 150+ countries, extracted from 5 million news articles using Gemini. Covers 2000 to present. Freely downloadable at 668 MB.
    url: "https://zenodo.org/records/18647054"
    link_text: "Download Dataset"

  - name: "Google Flood Hub"
    image: ""
    alt: "Google Flood Hub flood forecasting platform"
    badge_1: "Live Tool"
    badge_2: "Forecasting"
    description: |
      Google's flood forecasting platform, now expanded with urban flash flood predictions for most of the world's population. Provides up to 24 hours advance warning.
    url: "https://sites.research.google/floods/"
    link_text: "Visit Flood Hub"

  - name: "Flash Flood Forecasting Research Blog"
    image: ""
    alt: "Google Research blog on flash flood forecasting"
    badge_1: "Technical Deep Dive"
    badge_2: "Google Research"
    description: |
      The full technical writeup from Google Research covering the model architecture, evaluation methodology, and global coverage maps.
    url: "https://research.google/blog/protecting-cities-with-ai-driven-flash-flood-forecasting/"
    link_text: "Read the Blog"

  - name: "Groundsource Methodology Blog"
    image: ""
    alt: "Google Research blog introducing the Groundsource methodology"
    badge_1: "Methodology"
    badge_2: "Google Research"
    description: |
      How Gemini was used to turn unstructured news text into structured scientific ground truth. Includes accuracy audits and a breakdown of the extraction pipeline.
    url: "https://research.google/blog/introducing-groundsource-turning-news-reports-into-data-with-gemini/"
    link_text: "Read the Blog"

  - name: "EarthArxiv Preprint"
    image: ""
    alt: "EarthArxiv preprint on AI flash flood forecasting"
    badge_1: "Not Peer Reviewed"
    badge_2: "Research Paper"
    description: |
      The underlying scientific paper, submitted March 9, 2026. Not yet peer reviewed. Includes full model evaluation, precision and recall metrics by country, and Africa coverage notes.
    url: "https://eartharxiv.org/repository/view/12082/"
    link_text: "Read the Preprint"
---

# How Google Turned 5 Million News Articles into a Flash Flood Warning System

Google just announced it can predict urban flash floods up to 24 hours in advance, for most of the world, without building a single physical sensor. Here is how they did it, and what the limits are.

> **Sundar Pichai, Google CEO, [announced on X](https://x.com/sundarpichai/status/2032137438089658764?s=20):**
> *(embed tweet here)*

---

## The Problem: Flash Floods Are Nearly Impossible to Predict at Scale

Flash floods kill more than [5,000 people every year](https://wmo.int/media/news/flash-flood-guidance-system-saves-lives) and account for roughly [85% of all flood related fatalities](https://wmo.int/media/news/devastating-floods-highlight-need-and-challenges-warnings) worldwide, according to the World Meteorological Organization. Unlike river floods that build slowly over days, a flash flood can turn a city street into a torrent within six hours of heavy rain, often faster than any warning can reach the people who need it.

To teach an AI model to forecast a flash flood, you need a historical record of where and when flash floods have actually occurred. For river floods, this is manageable: physical water gauges have been collecting data for decades, and a model can learn what conditions precede a river overflowing its banks. Flash floods happen anywhere, though: city underpasses, drainage channels, steep streets. There are no gauges there.

The existing global databases reflect this gap. The [Global Disaster Alert and Coordination System](https://gdacs.org/) (GDACS), a joint UN and European Commission initiative, holds around 10,000 entries, focused primarily on high impact humanitarian events rather than the full range of localized flash floods. Satellite archives face their own constraints, including cloud interference and a tendency to capture only large, long lasting events.

Google's response was to build the missing data from scratch, using a source that has been quietly recording disasters for decades: the news.

---

## The Solution: Teaching an AI to Read 5 Million News Articles

Using Gemini, Google processed publicly available news reports across 80 languages. Each article was run through a structured extraction pipeline:

- **Classification:** Gemini determined whether the article described an actual past flood, not a future warning or a policy discussion.
- **Timing:** Vague references like "last Tuesday" were resolved against the article's publication date to pin down a precise date.
- **Location:** Described locations were mapped down to neighborhoods and streets using Google Maps Platform.

The result is [Groundsource](https://zenodo.org/records/18647054), an open dataset published in February 2026 containing 2.6 million geo tagged flood events spanning more than 150 countries, from the year 2000 to the present. The entire dataset is publicly downloadable at 668 MB, a surprisingly compact package for a record of this scale.

For comparison, GDACS took years of coordinated international monitoring to build its 10,000 entries. Groundsource produced 260 times that volume from news text alone.

<!-- DIAGRAM: Groundsource vs GDACS bar chart -->

Google is upfront about the accuracy tradeoffs. Manual audits found that 60% of extracted events were correct in both location and timing. 82% were accurate enough to be practically useful, for example correctly identifying the right district, or placing the event within a day of its actual peak. That 18% imprecision matters, and is part of why the underlying paper, currently a [preprint on EarthArxiv](https://eartharxiv.org/repository/view/12082/) and not yet peer reviewed, deserves scrutiny as independent scientists dig into it.

---

## The Forecast: How Old News Predicts Tomorrow's Flood

This is the question the announcement raises but does not spell out clearly: if Groundsource is a static archive of past news articles, last updated in February 2026, how does it warn about a flood happening tomorrow?

The answer is that Groundsource is not the forecast input. It is the training data, the historical record the model studied before it ever made a single prediction.

During the training phase, the model was shown 2.6 million historical flood events alongside the weather conditions at each location at the time: rainfall intensity, soil moisture, topography, urbanization density, and drainage characteristics. It learned which combinations of factors precede a flash flood in which kind of environment.

Once trained, the model does not consult the news archive again. For real time forecasting, it ingests live global weather data including NASA and NOAA rainfall products and forward looking forecasts from the ECMWF atmospheric model and Google DeepMind's AI weather model. When today's forecast over a city matches a pattern the model learned from Groundsource history, it issues an alert. The 24 hour lead time comes from how far ahead those weather forecasts look, not from any ongoing update to the news dataset.

The dataset being static is not a bug. A model trained on historical flood patterns does not need new historical data to generate tomorrow's forecast, any more than a doctor trained on years of clinical cases needs to review new textbooks before diagnosing a patient today. The current inputs are the live weather feeds, not the news archive.

<!-- DIAGRAM: Training vs inference pipeline flowchart -->

---

## What It Covers, and Where the Gaps Are

The model currently operates at a 20x20 kilometre resolution and focuses on urban areas with more than 100 people per square kilometre. That urban focus is deliberate: news coverage is naturally denser in cities, so that is where Groundsource's training data is most reliable.

Google's evaluation showed the model achieving precision and recall in much of South America and Southeast Asia that is comparable to performance in wealthier countries with advanced sensor infrastructure. For context, the US National Weather Service Flash Flood Warning system, adjusted to the same 20x20 km grid and 24-hour window, showed 22% recall and 44% precision. Google's model reaches similar numbers in many of the countries most frequently affected by floods — which, given it runs without any physical sensors on the ground, is the central claim worth watching.

Africa remains the clearest gap. As Google's own paper states directly: "Many countries in Africa are still lacking in ground truth beyond Groundsource, making it difficult to accurately estimate the accuracy of our model." In other words, the dataset built to fill the data gap is, in parts of Africa, the only data that exists — leaving no independent benchmark to check the model against.

---

## Why the Method Matters More Than This One Dataset

The deeper story here is not just flash floods. Google frames Groundsource explicitly as a general methodology. The same pipeline that converted news into flood event data could, in principle, be applied to droughts, landslides, or avalanches: any hazard where decades of physical sensor data simply do not exist.

In much of the world, monitoring networks are too expensive to build and maintain. But local journalists have been inadvertently building a global hazard record for decades. With a capable enough AI to extract and validate what they wrote, that record becomes trainable scientific data.

That is the claim worth watching as peer review unfolds: not just whether the flood alerts work, but whether this approach to generating ground truth from unstructured text holds up at the accuracy and scale required for life safety applications.

The forecasts are live now on Google's [Flood Hub](https://sites.research.google/floods/). The dataset is [freely downloadable](https://zenodo.org/records/18647054). And the methodology, if it passes scrutiny, could reshape how the world prepares for disasters it has never been able to see coming.

---

**Sources**

- [Google Research: Protecting Cities with AI-driven Flash Flood Forecasting](https://research.google/blog/protecting-cities-with-ai-driven-flash-flood-forecasting/) (March 12, 2026)
- [Google Research: Introducing Groundsource](https://research.google/blog/introducing-groundsource-turning-news-reports-into-data-with-gemini/) (March 12, 2026)
- [Groundsource Dataset on Zenodo](https://zenodo.org/records/18647054) (published February 15, 2026)
- [EarthArxiv Preprint: AI expands high-quality urban flash flood forecasts globally](https://eartharxiv.org/repository/view/12082/) (March 9, 2026, not yet peer reviewed)
