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

Tested it out myself![](/assets/images/20260313-142850.png)


Google just announced it can predict urban flash floods up to 24 hours in advance, for most of the world, without building a single physical sensor. Here is how they did it, and what the limits are.

> **Sundar Pichai, Google CEO, [announced on X](https://x.com/sundarpichai/status/2032137438089658764?s=20):**
> *"Excited to share our latest work on flash flood forecasting..."*

---

## The Problem: Flash Floods Are Nearly Impossible to Predict at Scale

Flash floods kill more than [5,000 people every year](https://wmo.int/media/news/flash-flood-guidance-system-saves-lives) and account for roughly [85% of all flood related fatalities](https://wmo.int/media/news/devastating-floods-highlight-need-and-challenges-warnings) worldwide, according to the World Meteorological Organization. Unlike river floods that build slowly over days, a flash flood can turn a city street into a torrent within six hours of heavy rain, often faster than any warning can reach the people who need it.

The core obstacle to predicting them has always been data. To teach an AI model to forecast a flash flood, you need a historical record of where and when flash floods have actually occurred. For river floods, physical water gauges have been collecting that data for decades. Flash floods happen anywhere: city underpasses, drainage channels, steep streets. There are no gauges there.

The existing global databases reflect this gap. The [Global Disaster Alert and Coordination System](https://gdacs.org/) (GDACS), a joint UN and European Commission initiative, holds around 10,000 entries, focused primarily on high impact humanitarian events. Satellite archives face their own constraints, including cloud interference and a tendency to only capture large, long lasting floods.

Google's response was to build the missing data from scratch, using a source that has been quietly recording disasters for decades: the news.

---

## The Solution: Teaching an AI to Read 5 Million News Articles

Using Gemini, Google processed publicly available news reports across 80 languages. Each article was put through a structured pipeline:

- **Classification:** Gemini determined whether the article described an actual past flood, not a future warning or a policy discussion.
- **Timing:** Vague references like "last Tuesday" were resolved against the article's publication date to pin down a precise date.
- **Location:** Described locations were mapped down to neighborhoods and streets using Google Maps Platform.

The result is [Groundsource](https://zenodo.org/records/18647054), an open dataset published in February 2026 containing 2.6 million geo tagged flood events spanning more than 150 countries, from the year 2000 to the present. The entire dataset, which is publicly downloadable, weighs in at about 668 MB, a surprisingly compact package for a record of this scale.

For comparison, GDACS took years of coordinated international monitoring to build its 10,000 entries. Groundsource produced 260 times that volume from news text alone.

Google is upfront about the accuracy tradeoffs. Manual audits found that 60% of extracted events were correct in both location and timing. 82% were accurate enough to be practically useful, for example correctly identifying the right district, or placing the event within a day of its actual peak. The remaining 18% were errors or imprecisions. That caveat matters, and is one reason the underlying research, currently a [preprint on EarthArxiv](https://eartharxiv.org/repository/view/12082/) and not yet peer reviewed, deserves scrutiny as independent scientists examine it.

---

## The Forecast: How Old News Predicts Tomorrow's Flood

This is the question the announcement raises but does not spell out clearly: if Groundsource is a static archive of past news articles, last updated in February 2026, how does it warn about a flood happening tomorrow?

The answer is that Groundsource is not the forecast input. It is the training data, the historical record the model studied before it ever made a single prediction.

During training, the model was shown 2.6 million historical flood events alongside the weather conditions at each location at the time: rainfall intensity, soil moisture, topography, urbanization density, and drainage characteristics. It learned to recognise which combinations of factors precede a flash flood in which kind of environment.

Once trained, the model does not consult the news archive again. For real time forecasting, it ingests live global weather data including NASA and NOAA rainfall products and forward looking forecasts from the ECMWF atmospheric model and Google DeepMind's AI weather model. When today's forecast over a city matches a pattern the model learned from Groundsource history, it issues an alert. The 24 hour lead time comes from how far ahead those weather forecasts look, not from any ongoing update to the news dataset.

Think of it like a doctor who trained for years on patient records and then works from a patient's current test results. The training data does not need to be updated every day. The current inputs do.

---

## What It Covers, and Where the Gaps Are

The model currently operates at a 20x20 kilometre resolution and focuses on urban areas with more than 100 people per square kilometre. That urban focus is deliberate: news coverage is naturally denser in cities, so that is where Groundsource's training data is most reliable.

Google's own evaluation showed the model performs comparably in much of South America and Southeast Asia to countries with advanced sensor infrastructure. For context, the US National Weather Service Flash Flood Warning system, measured on the same metrics, showed 22% recall and 44% precision, which illustrates just how hard this problem is.

Africa is the clearest remaining gap. Many countries on the continent lack independent ground truth data beyond what Groundsource itself provides, which means there is no external benchmark to verify how accurate the model is there. [Google's research blog](https://research.google/blog/protecting-cities-with-ai-driven-flash-flood-forecasting/) acknowledges this directly.

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
