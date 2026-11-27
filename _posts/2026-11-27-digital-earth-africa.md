---
date: 2026-11-27T10:42:00+02:00
published: false
author: Richard
category: Science & Technology
tags: []
series: ''
series_part: null
key_points: []
title: Digital Earth Africa
image: ''
image_alt: ''
layout: post
content_type: ''
ai_assistance: []
card_items: []
---

How come I've never heard about these guys? [https://digitalearthafrica.org/en_za/services/](https://digitalearthafrica.org/en_za/services/)

**Digital Earth Africa** (often written as **DE Africa**) is an operational platform that turns raw satellite imagery from missions like Landsat, Sentinel-1, and Sentinel-2 into continental-scale, Analysis Ready Data and decision-ready environmental services.




It is easy to miss because it operates mostly behind the scenes through regional geospatial centers, research institutions, and government agencies rather than consumer apps or mainstream tech headlines.




### Why It Often Flies Under the Radar

- **Institutional distribution model:** Rather than marketing directly to the general public, DE Africa works closely with regional implementing partners—such as RCMRD, AFRIGIST, AGRHYMET, CSE, and OSS—alongside national agencies and research teams to embed satellite analytics into planning, agriculture, and water management.
- **Domain-specific tooling:** Its core tools (like the **DE Africa Map**, **Sandbox** JupyterLab environment, OGC Web Services, and **Open Data Cube** workflows) are built for geospatial analysts, environmental researchers, and data engineers rather than casual browsers.
- **Quiet local footprint:** Even when events happen locally—such as workshops with the University of Rwanda or geospatial statistical meetings in Kigali—they are typically targeted at specific academic or policy audiences rather than broad public announcements.

### What Their Services Actually Do

The services listed on the page fall into two practical layers: **pre-computed continental products** and **landscape/time-series analysis services**:




| **Service / Product** | **What It Tracks** | **Practical Use** |
| **Water Observations from Space (WOfS) & Waterbodies** | Surface water extent and historical patterns across more than 700,000 water bodies over decades | Flood risk tracking, drought monitoring, and reservoir/water-resource planning |
| **Water Quality Monitoring Service** | Satellite-derived indicators for lakes, dams, and reservoirs | Moving beyond water presence to assess inland water conditions |
| **Coastlines Service & Dashboard** | Historical shoreline movement and coastal change | Identifying erosion hotspots and long-term coastal shifts |
| **Cropland Extent Map** | Continental agricultural land mapping (including major island nations) | Food security analysis and agricultural land-use monitoring |
| **Fractional Cover, GeoMAD & Mean NDVI** | Bare vs. green vs. non-green ground cover, multi-period composites, and monthly vegetation anomalies | Tracking vegetation health, seasonal shifts, and land degradation |

### How It Connects to Technical Workflows

If you work with spatial datasets, cloud pipelines, or Python-based data analysis, DE Africa's main technical value is removing the friction of raw remote sensing:

- **Cloud & local compute:** The **DE Africa Sandbox** provides a JupyterLab workspace with pre-loaded notebooks for querying and processing continental datasets, while **Cube in a Box** supports running an Open Data Cube setup locally.
- **Standardized access:** Data is exposed through **Metadata Explorer** and **OGC Web Services**, making it straightforward to pull spatial layers into custom scripts, dashboards, or GIS pipelines without downloading terabytes of raw scenes manually.


## Wait so is it free?

Yes—the core data, map portal, learning materials, and entry-level compute tools are **free** to use.

- **Datasets and map access:** The analysis-ready satellite products, continental layers, and the interactive **DE Africa Map** are openly accessible at no cost.
- **Learning and documentation:** Self-paced online courses, user guides, Jupyter notebook examples, and live learning sessions are free.
- **Sandbox compute limits:** The **DE Africa Sandbox** provides free compute resources for exploration and prototyping, though compute capacity is capped/shared rather than unlimited heavy-batch processing. If you run large-scale workloads outside their hosted environment (for instance, pulling open datasets into your own cloud or local setup), your own infrastructure costs apply.
