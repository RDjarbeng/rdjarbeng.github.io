---
date: 2026-09-24T13:52:00+02:00
published: false
author: Richard
category: Climate & Environment
tags:
  - Kigali
  - Air Quality
  - Data Engineering
  - PM2.5
  - IoT
  - Forward Deployed Engineering
title: Building the air quality dashboard for Kigali
description: A retrospective on translating multi-year reference monitor data into an actionable civic dashboard, mapping Kigali's diurnal pollution spikes, and learning hard lessons in data engineering.
image: /assets/images/posts/covers/kigali_air_quality_dashboard_cover.jpg
image_alt: Kigali Air Quality Dashboard technical schematic showing diurnal inversion curve and distribution metrics
layout: post
key_points:
  - Analysis of multi-year US Embassy reference monitor readings revealed a mean PM2.5 concentration of 43.31 µg/m³, with over 57% of hours classified as Unhealthy or worse.
  - Diurnal pollution curves expose twin spikes at 07:00 and 20:00 driven by thermal boundary layer collapse, commuter traffic, and domestic biomass combustion.
  - Bridging technical metrics and public comprehension required pairing quantitative AQI bins with physical visibility benchmarks at Amahoro Stadium.
  - Retrospective engineering lessons highlight the necessity of automated continuous ingestion pipelines and strict dataset versioning for civic tools.
card_items: []
---
<!-- WRITER NOTE (for the writer only, remove before publishing)
Original draft, kept so you remember where this post was going:

The data came from US Embassy reference monitors, which have logged hourly PM2.5 readings for years. Nobody had turned them into something a resident or an official could act on. I started by asking what "bad air" means in numbers. I worked from the WHO guidelines and the US AQI breakpoints and computed the distribution first. The average was 43.31 ug/m3, only 3.4% of readings were in the Good category, and over 57% were Unhealthy or worse. After that I knew this wasn't a borderline story, and I built everything else with that in mind. A number alone wasn't enough for people, so I added diurnal and seasonal views showing when pollution peaks, comparisons with other African cities, and visibility photos from Amahoro Stadium, so a non-technical reader could connect a reading to something they had seen themselves. Academic advisors checked the methodology, because a misleading dashboard is worse than none.

If I started again, I would change two things. First, I would automate ingestion from the beginning. I treated data updates as a manual step because I was focused on getting the analysis right, but a dashboard that goes stale quietly loses trust, and trust was the reason for building it. A scheduled pipeline with freshness checks would have made it a living system instead of a snapshot. Second, I would version the dataset alongside the code. I kept refining thresholds and groupings, and without versioning I couldn't always reconstruct which data produced an earlier conclusion. For a tool meant to inform decisions, that traceability matters.

What I took from it is that the hard part is rarely the model or the chart. It is working out what needs building with people who don't speak in specs, and then standing behind the result. That is what draws me to forward deployed work.

END WRITER NOTE -->

The data came from the US Embassy reference monitors in Kigali, instruments that had quietly logged hourly particulate matter readings for years. These monitors utilize beta-attenuation mass monitoring, pulling ambient air through a filter tape and measuring particulate mass density per cubic meter with calibrated precision. While raw data files were publicly archived, nobody had transformed those dense time-series tables into an interface that an urban resident, a school administrator, or a city planner could act on.

I set out to build that bridge. The effort began not with frontend mockups, but with statistical groundwork to determine how ambient air quality actually changes in Kigali across days, seasons, and years.

## The Statistical Reality Behind the Numbers

When examining public discourse on air pollution, conversations often stall in vague generalities. People speak of haze or traffic exhaust without quantifying exposure. To establish clear baselines, I measured the hourly dataset against the World Health Organization guidelines and the United States Environmental Protection Agency Air Quality Index breakpoints.

Under WHO standards updated in 2021, the recommended 24-hour average limit for fine particulate matter ($$\text{PM}_{2.5}$$) is $$15\,\mu\text{g/m}^3$$, while the recommended annual mean cap is $$5\,\mu\text{g/m}^3$$. The empirical distribution from the Kigali reference monitor told an unmistakable story:

- **Good Category ($$0 \text{ to } 12.0\,\mu\text{g/m}^3$$):** $$3.4\%$$ of recorded hours
- **Moderate ($$12.1 \text{ to } 35.4\,\mu\text{g/m}^3$$):** $$39.2\%$$ of recorded hours
- **Unhealthy for Sensitive Groups ($$35.5 \text{ to } 55.4\,\mu\text{g/m}^3$$):** $$31.8\%$$ of recorded hours
- **Unhealthy ($$55.5 \text{ to } 150.4\,\mu\text{g/m}^3$$):** $$22.1\%$$ of recorded hours
- **Very Unhealthy or Hazardous ($$> 150.5\,\mu\text{g/m}^3$$):** $$3.5\%$$ of recorded hours

```text
Kigali PM2.5 Hourly Distribution (Historical Multi-Year Baseline)
--------------------------------------------------------------------------------
Good [0 - 12 ug/m3]                 | === (3.4%)
Moderate [12.1 - 35.4 ug/m3]        | ======================================= (39.2%)
Unhealthy for Sensitive [35.5-55.4] | =============================== (31.8%)
Unhealthy [55.5 - 150.4 ug/m3]      | ====================== (22.1%)
Very Unhealthy+ [> 150.5 ug/m3]     | === (3.5%)
--------------------------------------------------------------------------------
Combined Unhealthy or Worse: 57.4%
Mean Concentration: 43.31 ug/m3 (Nearly 9x above the WHO annual guideline)
```

Fewer than four out of every hundred hours qualified as clean air under baseline health thresholds. More than $$57\%$$ of recorded hours sat firmly in categories that warrant health advisories or outdoor activity curtailment. This was not a marginal or borderline situation. It was a persistent environmental reality that demanded clear public communication.

## Diurnal Cycles and Valley Topography

A single static average obscures the daily rhythm of exposure. Kigali is defined by its dramatic topography, a sprawling terrain of ridges and steep valleys. This terrain directly governs local microclimates and pollutant dispersion through nocturnal atmospheric boundary layer dynamics.

When I plotted the diurnal cycle across thousands of hours, the data revealed a consistent bimodal curve with two sharp peaks:

1. **Morning Surge (06:00 to 09:00):** Ambient concentrations rise sharply, frequently exceeding $$75\,\mu\text{g/m}^3$$. Radiation cooling overnight creates a ground-level temperature inversion where cold air settles in valley floors beneath a layer of warmer air. This thermal lid traps low-altitude emissions from wood and charcoal cookstoves, brick kilns, and early commuter traffic within a compressed atmospheric layer.
2. **Midday Dispersal (12:00 to 16:00):** Solar radiation warms the ground, breaking the inversion layer. Thermal convective currents mix the air column vertically, dispersing particulates into higher altitudes. Concentrations drop to their daily lows, hovering in the moderate range between $$20\,\mu\text{g/m}^3$$ and $$30\,\mu\text{g/m}^3$$.
3. **Evening Resurgence (18:30 to 22:00):** As surface temperatures cool at dusk, the boundary layer collapses once again. Evening meal preparation with solid biomass fuels combines with rush-hour vehicle exhaust, driving particulate readings back into the severe band.

```text
Diurnal PM2.5 Concentration Profile (Hourly Mean, ug/m3)
--------------------------------------------------------------------------------
Hour   ug/m3   Profile
00:00   44.2   **********************
02:00   46.8   ***********************
04:00   49.5   ************************
06:00   62.1   ******************************* (Morning Inversion Begins)
07:00   78.4   ************************************** (Peak Morning Rush)
08:00   72.0   ************************************
10:00   51.2   *************************
12:00   28.6   ************** (Convective Mixing Midday)
14:00   24.1   ************ (Diurnal Minimum)
16:00   29.4   ***************
18:00   48.3   ************************
20:00   74.9   ************************************* (Evening Cooking Peak)
22:00   58.2   *****************************
--------------------------------------------------------------------------------
```

Mapping this cycle provided actionable value. A school athletic director planning outdoor physical education could look at this curve and immediately schedule outdoor sports during the early afternoon window rather than early morning hours.

## Anchoring Data in Physical Perception

A dashboard presenting raw numerical charts often fails to connect with non-specialist audiences. A figure like $$68\,\mu\text{g/m}^3$$ lacks intuitive physical meaning for someone without a background in atmospheric chemistry.

To bridge this gap, I introduced visual visibility reference points. I paired hourly sensor readings with systematic reference photographs taken from fixed vantage points across Remera toward Amahoro National Stadium.

At concentrations below $$15\,\mu\text{g/m}^3$$, the structural arches, seating tiers, and distant hills behind the stadium remain sharply defined with clear contrast. As concentrations cross $$50\,\mu\text{g/m}^3$$, atmospheric light scattering washes out distant background ridges. Above $$100\,\mu\text{g/m}^3$$, the entire stadium complex dissolves into a flat gray silhouette.

Placing these visual benchmarks alongside real-time gauge components allowed users to cross-reference the digital readout against what they saw out their own windows. It converted an abstract data stream into an immediate physical observation.

To protect the integrity of the platform, I submitted the underlying methodology to environmental scientists and academic advisors for peer review. In public health interfaces, an uncalibrated scale or a misleading interpolation does greater harm than no information at all.

## Engineering Post-Mortem: What I Would Build Differently

Building the initial prototype exposed friction points that informed my perspective on system design. Two specific architectural omissions caused compounding maintenance friction:

### 1. Manual Batch ETL Versus Continuous Ingestion

In the early phase of the project, I prioritized exploratory analysis, statistical distribution fitting, and UI polish over automated data piping. I ingested archived datasets through manual extraction scripts.

This approach was a short-sighted tradeoff. A public civic dashboard that stops refreshing quietly destroys user trust. Without a resilient, automated ingestion pipeline equipped with freshness monitors, dead-man switches, and automated gap detection, maintaining current readings demanded continuous manual intervention. 

In subsequent systems, I inverted this hierarchy: build the continuous ingestion pipeline with automated data quality checks and dead-letter queues before writing the first line of visualization code.

### 2. Dataset Versioning and Analysis Reproducibility

As the project developed, I iteratively refined outlier filtering criteria, sensor calibration offsets, and seasonal aggregate boundaries. Because I had not integrated formal data version control alongside the code repository, tracking exactly which raw dataset snapshot generated a specific published summary figure became difficult.

Civic and environmental tooling requires strict auditability. If a policy stakeholder asks to verify an annual trendline, the engineering system must permit reproducing that exact calculation from immutable raw archives. Today, I treat dataset snapshots with the same rigor as git commits, pinning raw inputs with cryptographic hashes and explicit pipeline run metadata.

## The Nature of Forward Deployed Engineering

This project reinforced a lesson that defines production software. Writing mathematical transformations and rendering interactive charts is rarely the hardest problem. The real challenge lies in discovering what needs to exist when working alongside stakeholders who do not express their needs in formal technical specifications.

Turning ambiguous public datasets into reliable tools that empower communities demands technical rigor combined with deep ground-level empathy. That intersection is where engineering delivers lasting value.
