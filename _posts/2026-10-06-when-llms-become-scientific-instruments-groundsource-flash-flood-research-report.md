---
date: 2026-10-06T11:51:00+02:00
published: true
author: Richard
category: Research
tags:
  - flood
  - climate
  - disaster
  - geospatial
  - Google
  - Gemini
  - machine-learning
title: 'When LLMs Become Scientific Instruments: Groundsource Flash Flood Research Report'
image: /assets/images/posts/covers/groundsource_research_report_cover.jpg
image_alt: 'When LLMs Become Scientific Instruments: Groundsource Flash Flood Research Report cover'
layout: post
card_items:
  - name: Groundsource Enriched Dataset
    image: /assets/images/groundsource/figure2.png
    alt: Global spatial distribution of Groundsource flood events
    badge_1: Dataset
    badge_2: Hugging Face
    url: https://huggingface.co/datasets/rdjarbeng/groundsource-enriched
    link_text: Explore Dataset
  - name: Interactive Analysis & Maps
    image: /assets/images/groundsource/figure4.png
    alt: Groundsource interactive data visualization
    badge_1: Demo
    badge_2: Interactive
    url: https://huggingface.co/spaces/rdjarbeng/groundsource-analysis
    link_text: Open Space
  - name: Google EarthArXiv Preprint
    image: /assets/images/groundsource/figure1.png
    alt: Google Research Groundsource paper figures
    badge_1: Paper
    badge_2: Research
    url: https://doi.org/10.31223/x5rr2k
    link_text: Read Preprint
---

Deep literature analysis

*A deep dive into Google's 2.6-million-event flood dataset: what the data shows, what claims hold up, and why the methodology matters more than the dataset itself.*

**Resources:** [Enriched Dataset](https://huggingface.co/datasets/rdjarbeng/groundsource-enriched) | [Full Interactive Article](https://huggingface.co/spaces/rdjarbeng/groundsource-analysis) | [Original on Zenodo](https://zenodo.org/records/18647054)

---

## What is Groundsource?

In February 2026, Google Research released **Groundsource**, an open-access global dataset of 2.6 million historical flood events extracted from news articles using Gemini models. Google published the dataset on [Zenodo](https://zenodo.org/records/18647054) alongside a preprint on [EarthArXiv](https://doi.org/10.31223/x5rr2k) (*Mayo, Zlydenko, Bootbool, Nearing, Cohen, et al.*).

Google used Gemini to scan **5 million news articles across 80+ languages**, generating **2.6 million geo-tagged flood events** spanning 150+ countries. This archive serves as the ground-truth training data behind Google's operational flash flood forecasting system.

> The largest existing global disaster databases, such as GDACS, held roughly 10,000 flood events, mostly major disasters. Groundsource records 2.6 million localized events, showing that language models can turn unstructured news archives into structured scientific datasets.

We downloaded the dataset, parsed the geometries, and checked its claims against the EarthArXiv preprint and external observation records.

---

## What the data actually shows

The dataset is distributed as a single 667 MB Parquet file containing **2,646,302 flood events**. Each record contains a UUID, polygon boundary (stored as WKB geometry), area in km², start date, and end date.

### Key numbers

| Metric | Value |
|--------|-------|
| Total events | 2,646,302 |
| Null values | 0 |
| Duplicates | 0 |
| Date range | 2000-01-01 to 2026-02-03 |
| Median area | 2.05 km² |
| Mean area | 142.0 km² |
| Peak year | 2024 (402,012 events) |

### What is missing

There is no country column, no source article URL, no language tag, no confidence score, and no casualty or severity rating. The dataset includes only geometry, start date, end date, and area.

### Geographic distribution

We decoded the 2.6 million WKB geometries into latitude and longitude centroids:

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

![Global Spatial Distribution](/assets/images/groundsource/figure2.png "Global spatial distribution of extracted flood events aggregated per grid cell on a Robinson projection (logarithmic scale), with red centroids representing GDACS reference disasters.")

### Temporal growth

| Period | Events | Share |
|--------|--------|-------|
| 2000-2009 | 40,581 | 1.5% |
| 2010-2019 | 876,630 | 33.1% |
| 2020-2026 | 1,729,091 | 65.3% |

Over 65% of all records come from the last six years. This reflects the expansion of digitized online news, broader search indexing, and automated extraction tools, rather than a 40-fold increase in real-world flooding.

![Temporal Growth](/assets/images/groundsource/figure1.png "Monthly volume of ingested news URLs (a) versus finalized flood events extracted by Gemini (b) between 2000 and 2026.")

---

## Data topology: entity polygons vs. regional disasters

The **median area of 2.05 km²** reflects how Groundsource structures records. The data is **entity based**, not organized around single weather systems.

![Event Area Footprint Distribution](/assets/images/groundsource/figure3.png "Distribution of event geographic areas in km² (logarithmic scale). Over 82% of all events have footprints smaller than 50 km².")

The authors explain:
> *"A single, large-scale real-world flood event may be represented by multiple entries within the Groundsource dataset. This occurs when an extensive flood inundates multiple distinct geographic entities (e.g., specific neighborhoods, towns, and districts), all of which are independently annotated by the LLM extraction process."*

- **82% of events cover less than 50 km²** (median: 2.05 km², mean: 142 km²).
- When a severe cyclone strikes a region and floods 40 towns, 80 streets, and 12 districts, Groundsource records over 100 distinct polygon rows. Each is tied to a specific administrative boundary or a buffered point ($0.001^\circ$).
- **Impact on hydrological modeling:** In gridded hydrological training (such as $0.05^\circ$ ERA5-Land or $0.1^\circ$ IMERG), tight footprints prevent positive flood labels from bleeding across dry terrain. But researchers studying macroeconomic disaster loss cannot treat individual rows as separate storms.

---

## Ingestion and extraction pipeline

The Parquet file does not include source URLs, but the EarthArXiv preprint describes the five-stage pipeline:

```
[9.5M Candidate URLs]
   ↓ Google Web Crawler + WebRef (Topicality Score ≥ 0.6)
[7.5M Accessible Articles]
   ↓ Read Aloud User-Agent (80 Languages) + Cloud Translation to English
[5.0M Verified Flood Reports]
   ↓ Gemini 3 Flash Prompt (Gate Filtering: Precision 75%, Recall 90%)
[2.65M Spatiotemporal Events]
   ↓ Google Maps Geocoding API + Spatial Aggregation + Geometric Thresholds
```

1. **Entity filtering (9.5M URLs):** Google harvested news articles published since 2000 mentioning floods. The WebRef entity system assigned a topicality score between 0 and 1 for "flood". Articles scoring at least 0.6 were kept (9.5 million URLs).
2. **Text cleaning and language coverage (7.5M articles):** The Google Read Aloud user agent extracted article text and publication dates across 80 supported languages. Sites blocking bots or using unsupported languages were dropped, leaving 7.5 million accessible articles.
3. **Translation and entity candidates:** Non-English articles were translated into English with the Google Cloud Translation API. WebRef extracted named places from both original and translated text to build candidate Machine Identifiers (MIDs).
4. **Gemini 3 Flash extraction (5.0M articles):** Gemini 3 Flash evaluated each article using a structured prompt to confirm ongoing or past floods while discarding forecasts, insurance notices, or regional summaries. Gemini identified roughly 5.0 million articles as actual flood reports.
5. **Geocoding and spatial filtering (2.6M final events):** Locations were resolved to Google Maps polygons (or $0.001^\circ$ buffered points). Consecutive daily reports for identical locations were merged. Events exceeding $5{,}000\text{ km}^2$, with diameters over $500\text{ km}$, continuous durations over 7 days, or dates before 2000 were filtered out, leaving **2,646,302 finalized records**.

---

## Claim verification

### Confirmed: 2.6 million geo-tagged events
The dataset contains 2,646,302 events with valid WKB polygon geometries and dates. There are no null values and no duplicate records.

### Confirmed: 5 million articles across 80 languages
The pipeline processed 7.5 million articles across 80 languages supported by Read Aloud. Gemini 3 Flash classified 5.0 million of them as real flood events, which geocoding and geometric filtering condensed into 2.65 million spatiotemporal polygons.

### Confirmed with context: GDACS comparison
The 260x scale increase is real, but reflects a different unit of analysis. GDACS tracks roughly 10,000 major humanitarian disasters requiring international response (events affecting 100 or more people or triggering external aid). Groundsource captures localized street, town, and municipal flooding.

### Confirmed: Africa coverage gap
Africa represents 4.2% of events in the dataset despite having roughly 17% of the world's population. This underrepresentation stems from uneven digital news infrastructure and search engine indexing.

---

## Accuracy and failure modes

Google ran a manual audit of 400 randomly selected entries evaluated by human raters against the source news text:

- **Strict precision (60% ± 5% at 95% CI):** Matched both the location polygon and start and end dates in the article ("Accurate").
- **Practical usability (82% combined):** An additional 22% had minor discrepancies ("Approximate" or "Partial"), such as selecting a surrounding municipal district instead of a specific village, or a one-day offset from phrases like "over the weekend".
- **Hard error rate (18% "Wrong"):** Unusable due to metaphorical uses ("a flood of complaints"), ambiguous place names, or hallucinated dates.

### Main failure modes

1. **Ambiguous place names:** Common names without regional qualifiers were misrouted during geocoding (for example, "Kherbari", which exists in multiple Indian states).
2. **Updated publication timestamps:** When an outlet updated an article days after an event, the system calculated relative dates ("last Tuesday") from the update time, shifting the event date by a week.
3. **Temporal guessing:** Vague phrasing like "last September" sometimes led Gemini to guess a specific date (such as September 1) instead of dropping the record.

> *"The actual errors in the dataset are likely not independent and identically distributed (i.i.d.). For instance, the geocoding system may exhibit variable accuracy with location names across different languages, potentially concentrating spatial errors in specific regions or countries."* — Mayo et al.

---

## External benchmark validation: GDACS and DFO audits

To measure recall against external records, the authors evaluated spatiotemporal overlap against **6,537 GDACS events (2017 to 2026)** and **3,875 Dartmouth Flood Observatory (DFO) satellite-derived events (2000 to 2023)**:

![Global Recall and Coverage](/assets/images/groundsource/figure4.png "Country-level spatial recall of Groundsource against GDACS (a) and DFO (b) reference archives, alongside total reference event distributions (c, d).")

- **Annual recall vs. GDACS:** From 2020 to 2025, Groundsource captured **81% to 86% of all GDACS events globally** (reaching 90.1% in 2017, 94.2% in 2018, and 93.6% in 2019).
- **Annual recall vs. DFO:** Recall grew from 13.7% in 2000 to **93.6% in 2019**, following the growth of digital news publishing.
- **Regional disparities:** Recall exceeds 96% in the United States and 79% to 89% in the Philippines and Malaysia. It drops in areas with lower digital media presence or unsupported indigenous languages (39% in Papua New Guinea, 50% in Gabon).

![Recall Stratified by Severity](/assets/images/groundsource/figure5.png "Groundsource recall stratified by disaster impact: (a) GDACS alert level (green, orange, red) and (b) DFO Flood Impact Index.")

### Scaling with event severity

Figure 5 shows that recall tracks event severity:
- **GDACS Green Alerts** (locally managed floods): **82% recall** ($n = 6{,}038$).
- **GDACS Orange and Red Alerts** (major humanitarian emergencies): **99% recall** ($n = 438$ orange, $n = 61$ red).
- **DFO Flood Impact Index:** 43% to 65% for minor events (Index 2 to 3), rising to **over 90% for severe events** (Index $> 6$).

---

## Hydrological context: why flash floods needed Groundsource

The gap Groundsource addresses becomes clear when comparing **riverine flooding** with **flash flooding**:

1. **Riverine floods (tracked by stream gauges):** Hydrological machine learning models, including Google's global model ([Nearing et al., *Nature* 2024](https://doi.org/10.1038/s41586-024-07145-1)) and state-space architectures like [RiverMamba (Shams Eddin et al., 2025)](https://arxiv.org/abs/2505.22535), predict river flow through established river basins (HydroATLAS, Caravan dataset) where physical gauges provide steady measurements.
2. **Flash and pluvial floods (the data void):** Flash floods are triggered by fast, intense rainfall over small ungauged drainage basins, city streets, and dry ravines. Physical gauges rarely exist in these locations.
3. **The human reporting network:** Cloud cover blocks optical satellites during rainstorms. Groundsource uses local news reports as a proxy observation network for flash flood events.

---

## Forecasting with historical records

> If the dataset is a static archive of past news, how does it warn about a flood happening tomorrow?

**Groundsource provides training data, not live inputs.** The forecasting model paired these 2.6 million historical events with local weather conditions (rainfall, soil moisture, runoff) at the time of each event to learn physical response patterns. For daily forecasts, the trained model evaluates live weather feeds (ECMWF, NASA, NOAA) to calculate flood probabilities:

```
TRAINING: Groundsource labels + Historical weather → Train model
OPERATIONAL: Live weather feeds → Frozen model → "Flash flood likely here tomorrow"
```

The model does not need daily news ingestion to generate forecasts, just as an image classifier does not need daily retraining to identify new photos.

---

## The Africa coverage gap and potential fixes

Africa accounts for **4.2% of Groundsource events** despite having **roughly 17% of the global population**. Several factors contribute to this disparity:
1. **Fewer online news outlets** indexed by global aggregators, alongside heavy use of local radio broadcasts that web crawlers do not capture.
2. **Language limits:** Africa has more than 2,000 languages, but the ingestion pipeline relied on the 80 languages supported by Google's Read Aloud agent.
3. **Urban bias:** Floods in remote rural areas rarely generate written news stories.

### Ways to address the gap

Current work in remote sensing and machine learning offers practical ways to fill these gaps:

1. **Synthetic Aperture Radar (SAR):** Optical satellites cannot see through storm clouds, but SAR penetrates cloud cover day and night. Multi-temporal SAR datasets like [Kuro Siwo (Alberti et al., 2024)](https://doi.org/10.52202/079017-1204) supply 33 billion m² of flood inundation masks across 43 disasters, offering ground truth independent of news reporting.
2. **Synthetic data generation:** As shown by [SAGDA (2025)](https://arxiv.org/abs/2506.13123) for agricultural data in Africa, physics-informed synthetic generators can simulate extreme hydrological events in data-sparse regions.
3. **Cross-regional transfer learning:** Models like [RiverMamba (2025)](https://arxiv.org/abs/2505.22535) demonstrate that spatial representations pretrained on global reanalysis can transfer predictive skill to ungauged basins in the Global South.
4. **Multimodal surveillance methods:** In epidemiological surveillance, [Epidemic IE (2024)](https://doi.org/10.1007/978-981-97-4581-4_17) and the WHO Disease Outbreak News Knowledge Graph ([eKG, *Scientific Data* 2025](https://doi.org/10.1038/s41597-025-05276-2)) show that combining structured ontologies with multi-LLM ensembles extracts outbreak events ($F_1$ scores up to 0.954) from sparse reporting. [DengueNet (2024)](https://arxiv.org/abs/2401.11114) similarly pairs satellite imagery with sparse health reports in developing regions.
5. **Support for regional languages:** Extending entity extraction to African languages (such as Swahili, Hausa, Amharic, and Yoruba) and transcribing local radio broadcasts using speech-to-text models.

---

## Broader applications of the methodology

The core lesson from Groundsource reaches beyond hydrology: **language models can transform unstructured text into structured scientific ground truth at global scale.**

### Other potential domains

| Domain | Feasibility | Why |
|--------|------------|-----|
| **Disease outbreaks** | Very high | Frequent public reporting; demonstrated by ProMED and WHO eKG ($F_1 \approx 0.954$) |
| **Conflict and displacement** | High | ACLED validation; extensive real-time journalistic coverage |
| **Pollution events** | Medium | Sudden chemical spills work well; ongoing air and water metrics require sensor measurements (such as [AirPhyNet](https://arxiv.org/abs/2402.03784)) |
| **Wildfires** | Medium | Satellite thermal data is already strong; text adds context on evacuations and ignition causes |
| **Mining hazards** | Medium | Dam failures are sudden and reported; underground leaks are chronic and rarely covered |
| **Drought and crop failure** | Lower | Gradual onset over months; lacks distinct start and end dates in news reports |

This approach works best for **sudden, discrete events** that can be paired with **continuous physical Earth observation data**.

---

## Tutorial: The Enriched Dataset

We've published an enriched version of Groundsource with decoded lat/lon centroids, duration calculations, and regional metadata:

```python
from datasets import load_dataset

ds = load_dataset("rdjarbeng/groundsource-enriched")
df = ds['train'].to_pandas()

# Columns: uuid, area_km2, start_date, end_date,
#          longitude, latitude, year, month, duration_days, region

# Quantify Africa gap
africa = df[df['region'] == 'Africa']
print(f"Africa: {len(africa):,} events ({100*len(africa)/len(df):.1f}%)")

# Monthly time series by region
monthly = df.groupby(['year', 'region']).size().unstack(fill_value=0)
print(monthly.tail(5))
```

---

## Resources

- 📊 [Enriched Dataset on Hugging Face](https://huggingface.co/datasets/rdjarbeng/groundsource-enriched) — Decoded coordinates, geographic regions, durations
- 🌐 [Full Interactive Space](https://huggingface.co/spaces/rdjarbeng/groundsource-analysis) — Complete interactive exploration with maps
- 💾 [Original Dataset on Zenodo](https://doi.org/10.5281/zenodo.18647053) — CC-BY 4.0
- 📄 [EarthArXiv Preprint (Mayo et al., 2026)](https://doi.org/10.31223/x5rr2k) — *Groundsource: A Dataset of Flood Events from News*
- 📰 [Google Blog](https://blog.google/technology/ai/gemini-communities-predict-crises/)
- 🔬 [Google Research Blog](https://research.google/blog/protecting-cities-with-ai-driven-flash-flood-forecasting/)

### Key Scientific References

- **Riverine AI Benchmark:** Nearing et al. (2024). *Global prediction of extreme floods in ungauged watersheds.* [Nature 627, 559–563](https://doi.org/10.1038/s41586-024-07145-1).
- **State-Space Hydrology:** Shams Eddin et al. (2025). *RiverMamba: A State Space Model for Global River Discharge and Flood Forecasting.* [arXiv:2505.22535](https://arxiv.org/abs/2505.22535).
- **All-Weather SAR Flood Mapping:** Alberti et al. (2024). *Kuro Siwo: 33 billion m² under the water.* [DOI:10.52202/079017-1204](https://doi.org/10.52202/079017-1204).
- **Epidemic Text Mining:** *Epidemic Information Extraction for Event-Based Surveillance Using Large Language Models.* [DOI:10.1007/978-981-97-4581-4_17](https://doi.org/10.1007/978-981-97-4581-4_17).
- **WHO Outbreak Knowledge Graph:** *An epidemiological knowledge graph extracted from WHO Disease Outbreak News (eKG).* [Scientific Data (2025)](https://doi.org/10.1038/s41597-025-05276-2).
- **Satellite Health Equity:** *DengueNet: Dengue Prediction using Spatiotemporal Satellite Imagery for Resource-Limited Countries.* [arXiv:2401.11114](https://arxiv.org/abs/2401.11114).
- **Synthetic African Data:** *SAGDA: Open-Source Synthetic Agriculture Data for Africa.* [arXiv:2506.13123](https://arxiv.org/abs/2506.13123).
- **Physics-Guided Neural Networks:** *AirPhyNet: Harnessing Physics-Guided Neural Networks for Air Quality Prediction.* [arXiv:2402.03784](https://arxiv.org/abs/2402.03784).

---

*The original Groundsource dataset is by Google Research, licensed CC-BY 4.0. Independent analysis and enriched dataset by [rdjarbeng](https://huggingface.co/rdjarbeng).*
