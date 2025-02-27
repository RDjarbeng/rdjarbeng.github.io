---
title: Understanding the Air Quality Index (AQI)
date: 2024-10-29T10:11:00
author: Richard
image: /RDjarbeng/assets/images/air_quality/aqi.png
video: ""
layout: post
categories: ["Environment"]
tags: [Air quality, weather, Air quality index, environmental monitoring]
---
The Air Quality Index (AQI) is a vital tool developed by the U.S. Environmental Protection Agency (EPA) to communicate outdoor air quality and its potential health impacts. This index provides an easy-to-understand system that helps individuals make informed decisions about their outdoor activities and health protection measures.

## How the AQI Works

The AQI uses a color-coded system with six categories, each representing a different level of health concern. These categories are based on index values that range from 0 to 500+. As the AQI value increases, so does the level of air pollution and the associated health risks.

Here's a breakdown of the AQI categories:

The AQI uses a color-coded system with six categories, each representing a different level of health concern. These categories are based on index values that range from 0 to 500+. As the AQI value increases, so does the level of air pollution and the associated health risks.

Here's a breakdown of the AQI categories for the United States:

| AQI Category                     | Index Values | Health Concern                         | Color Code |
|----------------------------------|--------------|----------------------------------------|------------|
| Good                              | 0-50        | Minimal or no risk                     | Green      |
| Moderate                          | 51-100      | Potential risk for sensitive individuals | Yellow   |
| Unhealthy for Sensitive Groups    | 101-150     | Health effects for sensitive groups    | Orange     |
| Unhealthy                         | 151-200     | Health effects possible for general public | Red   |
| Very Unhealthy                    | 201-300     | Health alert for everyone              | Purple     |
| Hazardous                         | 301+        | Emergency conditions                   | Maroon     |

![AQI table with colors ](/RDjarbeng/assets/images/air_quality/aqi.png)

_[Image source](https://www.airnow.gov/aqi/aqi-basics/)_

## Key Pollutants Measured

The EPA establishes AQI values for five major air pollutants regulated by the Clean Air Act:

1. Ground-level ozone
2. Particle pollution (PM2.5 and PM10)
3. Carbon monoxide
4. Sulfur dioxide
5. Nitrogen dioxide

Each of these pollutants has a national air quality standard set by the EPA to protect public health.

## Using the AQI

Understanding the AQI can help take necessary precautions:

- **Green (0-50)**: Enjoy outdoor activities without concern.
- **Yellow (51-100)**: Usually safe, but consider reducing prolonged outdoor exertion if you're unusually sensitive to air pollution.
- **Orange (101-150)**: Sensitive groups should reduce prolonged outdoor exertion.
- **Red (151-200)**: Everyone should reduce prolonged outdoor exertion.
- **Purple (201-300)**: Everyone should avoid prolonged outdoor exertion.
- **Maroon (301+)**: Everyone should avoid all outdoor activities.

## Importance of the AQI

The AQI plays a crucial role in protecting public health by providing easily accessible information about air quality. Here are some key reasons why the AQI is important:

1. **Health Protection**: The AQI helps individuals, especially those in sensitive groups, make informed decisions about outdoor activities and potential exposure to air pollution.
2. **Awareness**: By providing daily air quality reports, the AQI raises public awareness about air pollution and its health impacts.
3. **Policy Making**: Government agencies and policymakers use AQI data to develop and implement strategies for improving air quality.
4. **Environmental Education**: The AQI serves as an educational tool, helping people understand the relationship between air quality and health.
5. **Emergency Preparedness**: During severe air pollution events, the AQI helps local authorities issue timely warnings and take necessary actions to protect public health.

## How to Access AQI Information

You can easily access AQI information for your area through various channels:

- **AirNow Website**: The EPA's AirNow website provides real-time AQI data for locations across the United States.
- **Mobile Apps**: Many weather and air quality apps include AQI information.
- **Local News**: Many local news stations include AQI forecasts in their weather reports.
- **State and Local Air Quality Agencies**: These agencies often provide detailed local air quality information.

## Calculate the AQI from PM readings

The Air Quality Index (AQI) used by the US EPA measures both **PM2.5** and **PM10**. PM2.5 refers to particulate matter with a diameter of 2.5 micrometers or smaller, while PM10 includes particles up to 10 micrometers in diameter2.

To calculate the AQI from PM readings, the process involves several steps:

1. **Measure the concentration** of PM2.5 or PM10 in the air (in micrograms per cubic meter, µg/m³).
2. **Compare the measured concentration** to the EPA's AQI breakpoints, which define ranges of concentrations and corresponding AQI values.
3. **Use the formula** to calculate the AQI for the specific pollutant: 

   $$ \text{AQI} = \left( \frac{\text{IHI} - \text{ILO}}{\text{BPHI} - \text{BPLO}} \right) \times (\text{Cp} - \text{BPLO}) + \text{ILO} $$

   Where:

- **IHI** is the AQI value corresponding to the upper boundary of the AQI category.
- **ILO** is the AQI value corresponding to the lower boundary of the AQI category.
- **BPHI** is the concentration value corresponding to the upper boundary of the AQI category.
- **BPLO** is the concentration value corresponding to the lower boundary of the AQI category.
- **Cp** is the actual concentration of the pollutant.

4. **Select the highest AQI value** among all pollutants to represent the overall AQI for the area.

The website shows data for the USA AQI only.

### Why Use a Formula Instead of Simple Categories?

The AQI calculation uses a [piecewise linear function](https://en.wikipedia.org/wiki/Piecewise_linear_function) rather than simple categorical assignments for several important reasons:

1. **Precise Measurements**: The formula provides exact AQI values within each category through linear interpolation between breakpoints. For example, if PM2.5 = 20 µg/m³, the formula calculates the precise AQI (around 68) rather than just assigning it to the "Moderate" category.
2. **Non-Linear Relationship**: The AQI is intentionally designed as a non-linear index, meaning:

    - An AQI of 300 does not indicate twice the pollution or twice the health risk of an AQI of 150
    - When a pollutant's IAQI (Individual Air Quality Index) is 100, its concentration is not twice what it would be at IAQI 50
    - The health effects don't scale linearly with concentration increases

3. **Temporal Considerations**: While daily averages might seem acceptable, they can be misleading. For example:

    - Having an AQI of 50 for half a year and 100 for the other half yields an annual average of 75
    - However, this doesn't necessarily mean the air quality meets safety standards, as the benchmark is typically measured over 24-hour periods
    - It's possible to have "safe" daily readings but still fail annual pollution benchmarks

## International AQI Standards

While the concept of an Air Quality Index (AQI) is widely used around the world, it's important to note that there is no universal standard. Different countries and regions have developed their own air quality indices, which can vary in several key aspects:

### Scale Ranges

The scale used to represent air quality can differ significantly between countries:

- **United States**: Uses a 0-500+ scale
- **European Union**: Employs a 0-100 scale
- **China**: Utilizes a 0-500 scale, similar to the US but with different breakpoints
- **India**: Adopts a 0-500+ scale, but with different category thresholds'
- **Canada**: Uses the Air Quality Health Index (AQHI) with a scale of 1-10+

### Pollutants Measured

Countries may track different combinations of pollutants in their AQI calculations:

- Most countries include PM2.5, PM10, ozone (O3), nitrogen dioxide (NO2), and sulfur dioxide (SO2)
- Some countries also include carbon monoxide (CO)
- A few may incorporate additional pollutants specific to their environmental concerns

### Breakpoint Values

The concentration levels that trigger different AQI categories vary by country:

- These differences reflect varying national air quality standards
- They may also account for local environmental conditions and public health priorities

### Category Names and Colors

The warning levels and associated colors can differ between countries:

| Country | Good               | Moderate          | Unhealthy                | Very Unhealthy       | Hazardous            |
|---------|---------------------|-------------------|--------------------------|----------------------|----------------------|
| US      | Green              | Yellow           | Orange/Red               | Purple               | Maroon               |
| EU      | Good (Green)       | Fair (Yellow)    | Moderate (Orange)        | Poor (Red)           | Very Poor (Dark Red) |
| China   | Excellent (Green)  | Good (Yellow)    | Lightly Polluted (Orange)| Moderately Polluted (Red) | Heavily Polluted (Purple) |
| Canada  | Low Risk (Green)   | Moderate (Yellow)| High Risk (Orange)       | Very High Risk (Red) | N/A                  |

### Calculation Methods

Countries may use different formulas or averaging periods to calculate their AQI:

- Some use a linear scale, while others may use non-linear or stepwise functions
- Averaging periods can range from 1-hour to 24-hour measurements, depending on the pollutant and country
- Some indices are based on a single pollutant, while others use a multi-pollutant approach

### Implications of Varying Standards

These differences in AQI standards can lead to several important considerations:

1. **Comparability**: Direct comparisons between AQI values from different countries may not be meaningful without understanding the underlying differences.
2. **Public Understanding**: Travelers or international residents may need to familiarize themselves with local AQI systems to properly interpret air quality information.
3. **Policy and Research**: Researchers and policymakers must be aware of these differences when conducting cross-country comparisons or developing international air quality policies.
4. **Global Initiatives**: There are ongoing efforts by organizations like the World Health Organization (WHO) to promote more standardized approaches to air quality assessment and reporting.

Understanding these variations in international AQI standards is crucial for accurately interpreting air quality data across different countries and regions. It also highlights the complexity of global air quality monitoring.

## References

1. [AirNow - AQI Basics](https://www.airnow.gov/aqi/aqi-basics/)
2. [World Health Organization - Air quality and health](https://www.who.int/teams/environment-climate-change-and-health/air-quality-and-health/health-impacts)
3. [American Lung Association - State of the Air](https://www.lung.org/research/sota)
4. [Centers for Disease Control and Prevention - Air Quality](https://www.cdc.gov/air-quality/about/)
5. [Wikipedia - Air quality index](https://en.wikipedia.org/wiki/Air_quality_index)
6. [Canada - the air quality health index](https://www.canada.ca/en/environment-climate-change/services/air-quality-health-index/about.html)
7.[Standards for air quality in different countries](https://atmotube.com/blog/standards-for-air-quality-indices-in-different-countries-aqi)
