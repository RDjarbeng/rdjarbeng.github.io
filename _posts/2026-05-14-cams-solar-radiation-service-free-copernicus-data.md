---
date: 2026-05-14T19:23:00+02:00
published: false
author: Richard
category: Climate & Environment
tags:
  - Solar Energy
  - Copernicus
  - CAMS
  - Remote Sensing
  - Renewable Energy
  - Python
  - Satellite Data
title: "Accessing Copernicus CAMS Solar Radiation Data: Atmospheric Modeling, Irradiance Metrics, and Python Retrieval"
description: A technical guide to the Copernicus Atmosphere Monitoring Service (CAMS) Solar Radiation Service, exploring GHI, DNI, and McClear modeling alongside Python API workflows.
image: /assets/images/posts/covers/cams_solar_radiation_service_cover.jpg
image_alt: Technical breakdown of Copernicus CAMS solar radiation components and atmospheric irradiance vectors
layout: post
key_points:
  - The Copernicus Atmosphere Monitoring Service provides continuous, open-access solar irradiance records from 2004 to present at 15-minute intervals.
  - Surface solar irradiance decomposes into Global Horizontal Irradiance, Direct Normal Irradiance, and Diffuse Horizontal Irradiance.
  - The McClear clear-sky model evaluates atmospheric absorption using ECMWF aerosol optical depth, water vapor, and total column ozone.
  - Developers and energy analysts can programmatically query multi-year radiation profiles via the Copernicus Atmosphere Data Store and SoDa web APIs.
card_items: []
---
<!-- WRITER NOTE (for the writer only, remove before publishing)
Original draft, kept so you remember where this post was going:

What's CAMS and copernicus?

The Copernicus Atmosphere Monitoring Service (CAMS) Solar Radiation Service provides free, high-quality, real-time and historical (since 2004) data on solar radiation reaching the Earth's surface. Using satellite data (primarily Meteosat) and atmospheric modeling, it calculates global, direct, and diffuse irradiance for solar energy planning and grid management.Key Aspects of CAMS Solar Radiation ServicesData Purpose: CAMS helps determine how much solar energy is available, essential for energy production forecasting, photovoltaic (PV) system efficiency, and solar power plant management.Input Sources: The service uses cloud properties derived from Meteosat Second Generation (MSG) satellites and, increasingly, from Himawari-8/9 and GOES-16, providing near-global coverage.Atmospheric Modeling: CAMS combines satellite data with its own operational forecasts of aerosol optical properties, water vapor, and ozone to calculate the exact radiation at the ground level, often via the "McClear" model.Key Services:CAMS Radiation Service (CRS): Provides 15-minute intervals of surface solar irradiance (SSI).CAMS McClear: Provides clear-sky solar radiation, assuming no clouds are present.Accessibility: All data is freely available through the Copernicus Atmosphere Data Store and the SoDa portal.Coverage and Timeframe: Data covers Europe, Africa, the Middle East, and parts of Asia and America, with time series available from 2004 up to two days ago.The service is part of the European Union's Copernicus Programme, aimed at providing accurate, public-interest atmospheric data.

END WRITER NOTE -->

Accurately evaluating the solar resource potential of a geographical site is a primary prerequisite for solar energy deployment. Financing utility-scale photovoltaic (PV) installations, designing hybrid microgrids, and managing municipal power dispatch curves demand multi-year historical time-series data detailing how much sunlight actually reaches the ground.

Maintaining high-precision thermopile pyranometers and sun-tracking pyrheliometers on the ground is expensive and logistically demanding, leaving vast portions of Africa, the Middle East, and Latin America without dense ground-level measurement networks.

The European Union's Copernicus Programme bridges this spatial measurement void through the **Copernicus Atmosphere Monitoring Service (CAMS)**. Implemented by the European Centre for Medium-Range Weather Forecasts (ECMWF), CAMS operates a dedicated, free, open-access Solar Radiation Service that combines geostationary satellite imagery with advanced numerical atmospheric modeling.

```text
The CAMS Solar Data Pipeline Architecture
--------------------------------------------------------------------------------
Geostationary Satellites (Meteosat MSG) ---> Cloud Properties & Albedo Index
                                                        |
                                                        v
ECMWF Atmospheric Model (IFS)           ---> Aerosol Optical Depth, H2O, Ozone
                                                        |
                                                        v
[ McClear Model ]                       ---> Theoretical Cloud-Free Clear-Sky Solar Flux
                                                        |
                                                        v
[ Heliosat Algorithm ]                  ---> Real-Sky Irradiance (GHI, DNI, DHI)
                                                        |
                                                        v
Copernicus Atmosphere Data Store (ADS)  ---> 15-Minute / Hourly Time Series (2004 - Present)
--------------------------------------------------------------------------------
```

## The Physics of Surface Solar Irradiance

Solar radiation passing through Earth's atmosphere undergoes attenuation via Rayleigh scattering by air molecules, selective absorption by water vapor and ozone, and dynamic scattering by suspended aerosols and cloud droplets.

To design photovoltaic or concentrated solar power systems, solar engineers analyze three distinct radiative components:

| Solar Irradiance Metric | Atmospheric Mechanism | Primary Engineering Application |
| :--- | :--- | :--- |
| **Incoming Beam (TSI)** | ~1361 W/m² extraterrestrial radiation | Upper atmosphere solar constant |
| **Direct Normal Irradiance (DNI)** | Direct parallel beam from solar disk | Tracking PV and Concentrated Solar Power (CSP) |
| **Diffuse Horizontal Irradiance (DHI)** | Rayleigh and Mie scattered sky light | Ambient diffuse light collection |
| **Global Horizontal Irradiance (GHI)** | Total direct plus diffuse radiation | Fixed-tilt rooftop and ground-mount PV |

1. **Global Horizontal Irradiance (GHI):** The total geometric solar flux received on a horizontal surface at ground level, measured in Watts per square meter ($$\text{W/m}^2$$). It represents the primary metric used to predict standard flat-panel rooftop and ground-mount PV generation.
2. **Direct Normal Irradiance (DNI):** The solar radiation arriving in a direct, parallel beam from the direction of the sun disk, measured perpendicular to the beam. DNI is critical for tracking systems and Concentrated Solar Power (CSP) mirrors that focus direct rays onto thermal receivers.
3. **Diffuse Horizontal Irradiance (DHI):** The solar radiation scattered by airborne particulates, aerosols, and cloud water droplets that reaches the horizontal surface from all celestial angles except the solar disk.

These three components adhere to a strict trigonometric relationship governed by the solar zenith angle $$\theta_z$$ (the angular distance between the sun and the local vertical zenith):

$$\text{GHI} = \text{DNI} \cos(\theta_z) + \text{DHI}$$

Understanding this decomposition is critical. A hazy or overcast day might produce a moderate GHI measurement through scattered diffuse light, while driving direct beam DNI down to zero, causing concentrated mirror plants to cease generation entirely while bifacial PV panels continue to generate electricity.

## Core CAMS Modeling Services: McClear Versus Real-Sky

CAMS delivers solar radiation intelligence through two complementary modeling tracks:

### 1. CAMS McClear (Clear-Sky Modeling)

The McClear service calculates the theoretical maximum solar radiation that would reach the Earth's surface assuming zero clouds are present in the sky. Rather than using fixed empirical lookup tables, McClear runs an efficient physical parameterization derived from the radiative transfer model libRadtran.

McClear ingests operational 3D global forecasts from the ECMWF Integrated Forecasting System (IFS):
- **Aerosol Optical Depth (AOD):** Accounting for desert dust plumes, maritime sea salt, volcanic sulfates, and biomass burning smoke.
- **Total Column Ozone:** Modeling ultraviolet photon absorption.
- **Total Column Water Vapor:** Modeling infrared water absorption bands.

Because it models clean atmospheric clarity independent of transient cloud formations, McClear provides the critical baseline required to quantify the exact attenuation caused by passing clouds.

### 2. CAMS Radiation Service (CRS Real-Sky)

The operational Radiation Service calculates actual real-sky surface irradiance by combining the McClear clear-sky baseline with the Heliosat cloud indexing method.

Using high-resolution radiance channels from the SEVIRI instrument aboard Meteosat Second Generation (MSG) geostationary satellites positioned at zero degrees longitude, CAMS tracks cloud optical depth and cloud fraction at fifteen-minute intervals. The cloud index $$n$$ scales the clear-sky flux into the real-sky global irradiance:

$$\text{GHI} = \text{GHI}_{\text{clear}} \cdot (1 - n) + \text{GHI}_{\text{cloudy}} \cdot n$$

## Spatial and Temporal Coverage

The CAMS Solar Radiation Service provides continuous, validated time-series data spanning from **January 1, 2004, to within two days of real time**.

- **Temporal Resolution:** Native 15-minute intervals, aggregable to 1-hour, 1-day, and 1-month summaries.
- **Spatial Coverage:** Field of view of Meteosat geostationary satellites, covering the entire European continent, all of Africa, the Middle East, the Atlantic Ocean, and eastern parts of South America.
- **Global Expansion:** Through integration with Himawari-9 (East Asia and Pacific) and GOES-East (the Americas), coverage is expanding to establish a worldwide standardized solar database.

## Programmatic Access Using Python

CAMS data is freely accessible under the European Union Copernicus open data policy. Developers can retrieve time series programmatically using the official `cdsapi` client or direct REST endpoints via the SoDa (Solar Radiation Data) web portal.

The following Python script illustrates how to query hourly solar irradiance data for a specific site (for example, Kigali, Rwanda at latitude -1.94, longitude 30.06):

```python
import cdsapi

client = cdsapi.Client()

# Request CAMS Solar Radiation time-series for a specific point
client.retrieve(
    'cams-solar-radiation-timeseries',
    {
        'location': {
            'latitude': -1.9441,
            'longitude': 30.0619,
        },
        'altitude': 1567.0,  # Elevation in meters
        'date': '2026-05-01/2026-05-07',
        'time_step': '1hour',
        'time_reference': 'universal_time',
        'sky_type': 'observed_cloud', # Real-sky conditions
        'format': 'csv',
    },
    'kigali_solar_may2026.csv'
)

print("CAMS irradiance time series downloaded successfully.")
```

The resulting CSV file provides structured columns containing GHI, DNI, DHI, clear-sky counterparts, and solar zenith angles, ready for immediate ingestion into energy modeling libraries like `pvlib-python`.

By combining satellite-observed cloud dynamics with global aerosol transport physics, CAMS eliminates the guesswork in renewable energy forecasting. For researchers and clean energy developers, it provides an open, authoritative foundation for modeling the future of solar power.
