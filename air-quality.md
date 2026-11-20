---
layout: page
title: Air Quality and Environmental Sensing in Africa
permalink: /air-quality/
description: A guided reading list on air quality, particulate matter, low-cost sensors and open environmental data in Africa, from the basics to standards, data sources and field work.
---

At Carnegie Mellon University Africa I built and deployed low-cost weather and air quality sensors across East Africa, and most of what I write about the environment comes from that work. This page collects those posts in a sensible reading order: start with the basics, then the standards that define "safe", then where to find data, then what it takes to measure air in the field.

Last reviewed: 20 November 2026. See the [editorial policy](/editorial-policy/) for how posts are sourced and corrected.

## 1. The basics

What is in the air, how it is measured, and how a number becomes a colour on an app.

<div class="cards-grid cards-grid-mini">
{%- assign slugs = "what-is-particulate-matter-pm2.5-and-the-environmental-significance|understanding-the-air-quality-index-aqi|what-is-temperature-inversion" | split: "|" -%}
{%- for s in slugs -%}{%- assign p = site.posts | where: "slug", s | first -%}{%- if p -%}{% include post-card.html post=p horizontal=true show_excerpt=false %}{%- endif -%}{%- endfor %}
</div>

## 2. Standards and health

The limits governments and the WHO set, and what the evidence says about exposure.

<div class="cards-grid cards-grid-mini">
{%- assign slugs = "ambient-air-quality-standards-in-west-africa-the-current-state-2025|the-air-quality-paradigm-shift-a-comprehensive-analysis-of-the-2021-who-guidelines-and-their-implications-for-african-research-and-policy-executive-overview-the-global-health-imperative|the-hidden-cost-of-bad-air-fact-checking-the-impact-on-our-children|paper-reading-air-pollutant-patterns-and-human-health-risk-following-the-east-palestine-ohio-train-derailment" | split: "|" -%}
{%- for s in slugs -%}{%- assign p = site.posts | where: "slug", s | first -%}{%- if p -%}{% include post-card.html post=p horizontal=true show_excerpt=false %}{%- endif -%}{%- endfor %}
</div>

## 3. Where to find data

Ground monitors, satellites, reanalysis and forecast services, most of them free.

<div class="cards-grid cards-grid-mini">
{%- assign slugs = "top-websites-for-african-climate-data|guide-to-accessing-air-quality-data-from-us-embassies-worldwide|airnow-air-quality-website-data-update|open-meteo-archive-free-historical-weather-data|copernicus-powering-earth-observation-with-sentinel-satellites|cams-solar-radiation-service-free-copernicus-data|gee_recommendation|how-google-forecasts-weather-and-air-quality-data|earth-observations-promise-and-barriers-a-down-to-earth-view" | split: "|" -%}
{%- for s in slugs -%}{%- assign p = site.posts | where: "slug", s | first -%}{%- if p -%}{% include post-card.html post=p horizontal=true show_excerpt=false %}{%- endif -%}{%- endfor %}
</div>

## 4. Sensors and field work

Building, buying and running instruments, and what the readings look like on the ground.

<div class="cards-grid cards-grid-mini">
{%- assign slugs = "different-sensor-networks-across-africa|building-the-air-quality-dashboard-for-kigali|is-the-davis-solar-radiation-sensor-overpriced|weather-report-kigali-29th-january-2026|this-week-in-air-quality-research-novel-insights-and-sensor-advances-23-june-2025" | split: "|" -%}
{%- for s in slugs -%}{%- assign p = site.posts | where: "slug", s | first -%}{%- if p -%}{% include post-card.html post=p horizontal=true show_excerpt=false %}{%- endif -%}{%- endfor %}
</div>

Something missing or wrong? [Open an issue](https://github.com/RDjarbeng/rdjarbeng.github.io/issues) or use the [contact form](/contact/).
