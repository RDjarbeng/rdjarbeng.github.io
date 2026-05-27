---
date: 2026-04-25T14:13:00+02:00
published: false
author: Richard
category: Research
tags:
  - '- flood'
  - '- climate'
  - '- disaster'
  - '- geospatial'
  - 'Google'
  - 'Gemini'
  - '- analysis'
  - 'Research'
title: 'When LLMs Become Scientific Instruments: Groundsource Flash Flood Research Report'
image: ''
image_alt: ''
layout: post
card_items: []
---

Deep Literature Analysis

*A deep-dive into Google's 2.6-million-event flood dataset — what the data actually shows, what claims hold up, and why the methodology may matter more than the dataset itself.*

**Resources:** [Enriched Dataset](https://huggingface.co/datasets/rdjarbeng/groundsource-enriched) | [Full Interactive Article](https://huggingface.co/spaces/rdjarbeng/groundsource-analysis) | [Original on Zenodo](https://zenodo.org/records/18647054)

---

## What is Groundsource?

In February 2026, Google Research released **Groundsource** — an open-access global dataset of 2.6 million historical flood events extracted from news articles using Gemini LLMs. The dataset was published on [Zenodo](https://zenodo.org/records/18647054) with a [preprint on EarthArxiv](https://eartharxiv.org/repository/view/12082/).

Google used Gemini to scan **5 million news articles across 80+ languages** and generated **2.6 million geo-tagged flood events** spanning 150+ countries. This is the training data behind Google's operational flash flood forecasting system.

> The best existing global flash flood database (GDACS) had roughly 10,000 entries. If Groundsource genuinely delivers 2.6 million validated events, that's not an incremental improvement — it's a demonstration that LLMs can turn the world's unstructured text into structured scientific ground truth.

We downloaded the full dataset, decoded every geometry, and verified the claims.

## What the Data Actually Shows

The dataset is a single 667 MB Parquet file containing exactly **2,646,302 flood events**. Each event has a UUID, polygon boundary (WKB geometry), area in km², start date, and end date.

### Key Numbers

| Metric | Value |
|--------|-------|
| Total events | 2,646,302 |
| Null values | 0 |
| Duplicates | 0 |
| Date range | 2000-01-01 to 2026-02-03 |
| Median area | 2.05 km² |
| Peak year | 2024 (402,012 events) |

### What's absent

No country column. No language of source article. No confidence score. No link to original news article. No severity classification. The dataset is deliberately minimalist — just polygons, dates, and areas.

### Geographic Distribution

We decoded all 2.6M WKB geometries into lat/lon centroids:

| Region | Events | Share |
|--------|--------|-------|
| Europe | 590,603 | 22.3% |
| Southeast Asia | 488,885 | 18.5% |
| South Asia | 484,418 | 18.3% |
| North America | 412,254 | 15.6% |
| South America | 248,652 | 9.4% |
| East Asia | 179,846 | 6.8% |
| **Africa** | **111,053** | **4.2%** |
| Other | 131,591 | 4.9% |

### Temporal Growth

| Period | Events | Share |
|--------|--------|-------|
| 2000-2009 | 40,581 | 1.5% |
| 2010-2019 | 876,630 | 33.1% |
| 2020-2026 | 1,729,091 | 65.3% |

65% of all data comes from the last 6 years — a compound effect of more digitized global news, improved LLM extraction, and genuinely increasing flood frequency.

## Claim Verification

### ✅ "2.6 million geo-tagged events"
**CONFIRMED.** 2,646,302 events, all with polygon geometry and dates. Zero nulls, zero duplicates.

### ⚠️ "GDACS had roughly 10,000 entries"
**Plausible, but needs context.** GDACS tracks *significant* disasters (affecting 100+ people). EM-DAT covers ~22K total natural disasters since 1900. The 260× scale increase is real, but GDACS events are curated expert assessments while Groundsource captures every reported flood — fundamentally different granularities.

### ⚠️ "5 million articles across 80 languages"
**CANNOT VERIFY FROM DATASET.** No language column, no source article metadata. The paper needs to provide this evidence directly.

### ✅ Africa coverage gap
**CONFIRMED AND QUANTIFIED.** 4.2% of events vs ~17% of world population — a 4× underrepresentation.

## The Real-Time Question

> If the dataset is a static archive of old news, how does it warn about a flood happening tomorrow?

**Groundsource is training data, not forecast input.** The model studied 2.6 million historical events alongside the weather conditions at each location at the time. It learned the patterns. For daily forecasting, it ingests live feeds from ECMWF, NASA, and NOAA and checks if today's weather matches a learned pattern.

```
TRAINING: Groundsource labels + Historical weather → Train model
OPERATIONAL: Live weather feeds → Frozen model → "Flash flood likely here tomorrow"
```

The dataset doesn't need updating for real-time forecasting, just as ImageNet doesn't need daily updates for an image classifier. Periodic retraining would improve performance, but the v1 snapshot is sufficient for operational deployment.

## The Africa Gap

Africa represents **4.2% of events** despite **~17% of world population**. The causes are structural:

1. **Fewer digitized news sources** — African outlets less indexed by Google News; local radio invisible to text mining
2. **Language gap** — Africa has ~2,000 languages; Gemini handles ~80
3. **Urban reporting bias** — rural flash floods may never appear in any outlet
4. **The paradox:** the regions with the least monitoring infrastructure are where this methodology works worst

### Concrete Approaches to Fix It

1. **Multi-source fusion** — Combine satellite SAR (works everywhere) + community platforms + radio monitoring
2. **Satellite-only ground truth** — Use SAR flood maps ([Kuro Siwo](https://arxiv.org/abs/2311.12056), [AI4G-Flood](https://arxiv.org/abs/2411.01411)) as labels independent of news
3. **Synthetic augmentation** — Generate flood scenarios from physics models ([SAGDA](https://arxiv.org/abs/2506.13123) shows this works for African agriculture)
4. **Transfer learning** — [RiverMamba](https://arxiv.org/abs/2505.22535) already generalizes from data-rich to data-poor regions
5. **Low-resource language improvement** — Fine-tune extraction models for Hausa, Amharic, Swahili

## The Methodology Is The Story

The most important thing about Groundsource is not the flood data — it's the demonstration that **LLMs can convert unstructured text into structured scientific ground truth at global scale.**

### Where Else Can This Go?

| Domain | Feasibility | Why |
|--------|------------|-----|
| **Disease outbreaks** | 🟢 Very high | Already working (ProMED/WHO) — F1 up to 0.954 |
| **Conflict/displacement** | 🟢 High | ACLED exists, news coverage very high |
| **Pollution events** | 🟡 Medium | Binary events work; continuous levels hard |
| **Wildfires** | 🟡 Medium | Satellite already strong; text adds context |
| **Mining hazards** | 🟡 Medium | Rare events, chronic vs acute exposure |
| **Drought/agriculture** | 🔴 Lower | Slow onset, not event-based |

The methodology works best for **binary, acute, widely-reported events** paired with **continuously-available physical observations.**

## Tutorial: The Enriched Dataset

We've published an enriched version with decoded coordinates:

```python
from datasets import load_dataset

ds = load_dataset("rdjarbeng/groundsource-enriched")
df = ds['train'].to_pandas()

# Columns: uuid, area_km2, start_date, end_date,
#          longitude, latitude, year, month, duration_days, region

# Analyze Africa gap
africa = df[df['region'] == 'Africa']
print(f"Africa: {len(africa):,} events ({100*len(africa)/len(df):.1f}%)")

# Time series by region
monthly = df.groupby(['year', 'region']).size().unstack(fill_value=0)
print(monthly.tail(5))
```

## Resources

- 📊 [Enriched Dataset](https://huggingface.co/datasets/rdjarbeng/groundsource-enriched) — Decoded coordinates, region classification
- 🌐 [Full Interactive Article](https://huggingface.co/spaces/rdjarbeng/groundsource-analysis) — Complete analysis with diagrams
- 💾 [Zenodo Original](https://zenodo.org/records/18647054) — CC-BY 4.0
- 📄 [EarthArxiv Preprint](https://eartharxiv.org/repository/view/12082/)
- 📰 [Google Blog](https://blog.google/technology/ai/gemini-communities-predict-crises/)
- 🔬 [Google Research Blog](https://research.google/blog/protecting-cities-with-ai-driven-flash-flood-forecasting/)

### Key Papers

- [RiverMamba](https://arxiv.org/abs/2505.22535) — Global flood forecasting with Mamba SSM
- [Epidemic IE](https://arxiv.org/abs/2408.14277) — LLMs for epidemic surveillance from ProMED/WHO
- [eKG from WHO DONs](https://arxiv.org/abs/2509.02258) — Knowledge graph from disease outbreak news
- [DengueNet](https://arxiv.org/abs/2401.11114) — Satellite-based disease prediction for resource-limited countries
- [SAGDA](https://arxiv.org/abs/2506.13123) — Synthetic data for Africa's agricultural data gap
- [AirPhyNet](https://arxiv.org/abs/2402.03784) — Physics-guided air quality prediction

---

*The original Groundsource dataset is by Google Research, licensed CC-BY 4.0. This analysis and enriched dataset by [rdjarbeng](https://huggingface.co/rdjarbeng).*
