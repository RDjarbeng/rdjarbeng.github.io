---
date: 2026-05-16T13:54:00+02:00
published: false
author: Richard
category: Research
tags:
  - Weather
title: Open Meteo archive free historical weather data
image: ''
image_alt: ''
layout: post
card_items: []
---

The **Open-Meteo Archive** provides free, open-source access to historical and past weather data without requiring user registration. You can access decades of climate history alongside archived past forecasts using the [Historical Weather API](https://open-meteo.com/en/docs/historical-weather-api) to retrieve data for any specific geographic coordinate. [[1](https://open-meteo.com/), [2](https://open-meteo.com/en/docs/previous-runs-api), [3](https://open-meteo.com/en/docs/historical-weather-api)]

Core Archive Features

- **History API:** Provides a continuous historical timeseries of weather variables with a 1-hour step, reaching all the way back to January 1, 1979.
- **Historical Forecast API:** Designed specifically for forecast verification or training machine learning models, this continuously records daily high-resolution weather model outputs.
- **Previous Runs & Past Days:** Integrates short-term historical forecast runs (up to 16 days back). [[1](https://open-meteo.com/en/docs/historical-weather-api), [2](https://openweathermap.org/api/history-api-full-archive), [3](https://open-meteo.com/en/docs/historical-forecast-api), [4](https://open-meteo.com/en/docs/meteoswiss-api), [5](https://open-meteo.com/en/docs)]

Weather Data Available

Open-Meteo seamlessly integrates data from dozens of global weather models (e.g., ECMWF, NOAA, DWD) to ensure there are no discontinuities in the timeline. Available metrics include: [[1](https://open-meteo.com/), [2](https://open-meteo.com/en/docs)]

- **Core Variables:** Temperature, relative humidity, precipitation (rain and snow), and wind speed/direction.
- **Atmospheric Details:** Pressure, solar radiation, CAPE (Convective Available Potential Energy), and soil moisture.
- **Aggregated Formats:** Data can be queried natively in JSON via HTTP requests or downloaded using Python and R integrations. [[1](https://github.com/AntoinePinto/weather-data)]

Documentation and Tools

For comprehensive query parameters, exact data variables, and code examples for integration, you can explore the [Historical Forecast API](https://open-meteo.com/en/docs/historical-forecast-api) or refer to the Historical Weather API documentation directly on the [Open-Meteo.com](https://open-meteo.com/) main platform.
