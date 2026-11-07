---
date: 2026-03-04T11:39:00+02:00
published: false
author: Richard
category: Climate & Environment
tags:
  - CMU
  - CAPS
  - Air Quality
  - Climate & Environment
  - Environmental Science
title: "Air Pollutant Patterns Following the East Palestine Train Derailment: A Mobile PTR-MS Analysis"
image: /assets/images/posts/covers/east_palestine_air_quality_cover.jpg
image_alt: Chemical atmospheric plume and mass spectrometry diagram analyzing volatile organic compounds following the East Palestine derailment
layout: post
description: A paper review examining mobile mass spectrometry air sampling and toxicological hazard quotients following the 2023 East Palestine train derailment.
key_points:
  - Mobile laboratory sampling using proton-transfer-reaction mass spectrometry mapped volatile organic compounds at 1-second resolution.
  - While vinyl chloride and benzene dropped below chronic risk thresholds within two weeks, acrolein levels remained six times higher than background.
  - Acute resident health symptoms correlated closely with elevated acrolein concentrations rather than vinyl chloride monomer.
  - Rapid mobile mass spectrometry provides critical spatial coverage that stationary municipal air monitors miss during industrial disasters.
card_items:
  - name: Proton-Transfer Ionization
    description: PTR-TOF-MS instruments utilize hydronium ions to measure trace volatile organics down to parts-per-trillion sensitivity in real time.
  - name: Hazard Quotient Findings
    description: Toxicological calculations confirmed that acrolein represented the dominant non-cancer respiratory irritant in the ambient plume.
  - name: Spatial Plume Dynamics
    description: Continuous driving routes identified persistent volatilization hot spots near contaminated creekbeds and trench excavation sites.
---
For agent: Needs link to the paper by Oladayo 

On February 3, 2023, thirty-eight cars of a Norfolk Southern freight train derailed in East Palestine, Ohio. Eleven of the derailed tank cars carried hazardous petrochemicals, including five containing vinyl chloride monomer. 

To avert an uncontrolled tank explosion, emergency responders conducted a controlled vent and burn on February 6, igniting over 115,000 gallons of vinyl chloride. The burn sent a towering plume of black smoke into the atmosphere, depositing combustion byproducts across eastern Ohio and western Pennsylvania.

Residents returning to the evacuation zone reported immediate physical symptoms: acute respiratory burning, ocular irritation, and severe headaches. To characterize the spatial distribution of volatile organic compounds (VOCs) and evaluate human health risks, researchers from Carnegie Mellon University's Center for Atmospheric Particle Studies (CAPS) deployed a mobile air quality laboratory equipped with high-resolution mass spectrometry.

| Date | Milestone / Deployment | Operational Detail | Analytical Finding |
| :--- | :--- | :--- | :--- |
| February 3, 2023 | Freight Train Derailment | 38 freight cars derail, including 11 hazardous chemical tank cars | Initial site contamination and containment response |
| February 6, 2023 | Controlled Vent and Burn | 115,000 gallons of vinyl chloride ignited to prevent uncontrolled detonation | Massive combustion and pyrolysis plume dispersed over the region |
| February 20 to 21, 2023 | CMU Mobile Lab Deployment | Mobile PTR-TOF-MS van acquiring data at 1 Hz (1-second spatial points) | Measured chemical transects across derailment perimeter versus rural background |
| Synthesis Phase | Toxicological Risk Modeling | Non-cancer Hazard Quotient (HQ) calculation | Vinyl chloride dissipated below chronic risk levels; acrolein remained 6x above baseline |

## The Monitoring Challenge: Stationary Versus Mobile Sampling

Initial environmental oversight conducted by the United States Environmental Protection Agency (EPA) relied primarily on stationary air monitoring stations and handheld point sensors.

Stationary monitors provide valuable longitudinal time-series data at a single fixed coordinate. However, during an industrial disaster, wind shear and micro-topography dictate atmospheric plume transport. Chemical plumes funnel through river valleys and settle into localized depressions, easily bypassing stationary sensors placed several miles away.

Handheld photoionization detectors (PIDs) deployed by initial response teams measure total VOC concentration. They cannot separate benign hydrocarbons from acute toxins, and their detection limits (often in parts per million) are too coarse to quantify chemicals that present human health risks at parts-per-billion (ppb) or parts-per-trillion (ppt) thresholds.

To overcome these constraints, the Carnegie Mellon and Texas A&M research teams navigated a specialized mobile research van through East Palestine and surrounding rural counties on February 20 and 21, approximately two weeks after the controlled burn.

## Instrumentation: Proton-Transfer-Reaction Mass Spectrometry

The mobile laboratory utilized Proton-Transfer-Reaction Time-of-Flight Mass Spectrometry (PTR-TOF-MS). 

Unlike conventional gas chromatography-mass spectrometry (GC-MS), which requires collecting air in canisters or sorbent tubes followed by multi-minute chromatographic separation, PTR-TOF-MS performs continuous, online real-time chemical ionization.

| Stage | Analytical Component | Reaction / Physics Mechanism | Operational Output |
| :--- | :--- | :--- | :--- |
| 1. **Sample Ingestion** | Inlet Tube | Direct intake of ambient air without pre-concentration canisters | Continuous VOC sample stream |
| 2. **Drift Tube Ionization** | Reaction Chamber | Hydronium ion source: $$ \text{H}_3\text{O}^+ + \text{VOC} \longrightarrow \text{VOC}\cdot\text{H}^+ + \text{H}_2\text{O} $$ | Soft chemical ionization with zero molecular fragmentation |
| 3. **Mass Separation** | Time-of-Flight Analyzer | High mass resolution analyzer ($$ m / \Delta m > 4{,}000 $$) | Separates ions by mass-to-charge ratio ($$ m/z $$) |
| 4. **Spectral Output** | Detector System | 1 Hz acquisition frequency at parts-per-trillion (ppt) sensitivity | Real-time quantification of trace atmospheric VOCs |

The instrument generates hydronium ions ($$\text{H}_3\text{O}^+$$) inside a discharge chamber. In the drift tube, these hydronium ions collide with incoming volatile organic molecules. A proton transfers efficiently from hydronium to any trace compound whose proton affinity exceeds that of water ($$691 \text{ kJ/mol}$$):

$$\text{H}_3\text{O}^+ + \text{VOC} \longrightarrow \text{VOC}\cdot\text{H}^+ + \text{H}_2\text{O}$$

Because proton transfer is a soft ionization process, the target molecules rarely fragment. The time-of-flight mass analyzer separates the resulting ions by their mass-to-charge ratio ($$m/z$$) with extreme precision, resolving isobaric compounds (molecules sharing the same nominal mass) at one-second acquisition intervals while driving at highway speeds.

## Toxicological Findings: Acrolein Versus Vinyl Chloride

The public and regulatory focus centered almost entirely on vinyl chloride monomer ($$\text{C}_2\text{H}_3\text{Cl}$$), a known human carcinogen linked to hepatic angiosarcoma.

The mobile PTR-TOF-MS survey revealed a more nuanced chemical profile:

| Chemical Compound | Atmospheric Lifetime | Measured Concentration Status | Dominant Toxicological Concern |
| :--- | :--- | :--- | :--- |
| **Vinyl Chloride** | 1 to 2 days | Below intermediate Minimum Risk Level (< 100 ppb) | Carcinogenicity under chronic exposure |
| **Benzene / Toluene** | Days to weeks | Typical rural background levels | Chronic bone marrow and blood disorders |
| **Acrolein** | Hours to 1 day | **Up to 6x higher than rural baseline** | **Acute mucosal, ocular, and respiratory irritation** |
| **Butyraldehyde** | 6 to 12 hours | Elevated near drainage creekbeds | Upper respiratory inflammation |

### 1. Rapid Vinyl Chloride Dispersion

By February 20, ambient concentrations of vinyl chloride, benzene, toluene, and xylenes (BTEX) had dropped below chronic Minimum Risk Levels (MRLs) established by the Agency for Toxic Substances and Disease Registry (ATSDR). 

Because vinyl chloride has a high vapor pressure ($$3.4 \text{ bar at } 20^\circ\text{C}$$) and a relatively short atmospheric chemical lifetime governed by hydroxyl radical ($$\cdot\text{OH}$$) oxidation, the initial gaseous cloud dispersed rapidly into the regional atmosphere once the fire subsided.

### 2. The Acrolein Anomaly

In contrast to vinyl chloride, concentrations of acrolein ($$\text{CH}_2\text{=CHCHO}$$) remained elevated throughout the village of East Palestine, reaching levels up to six times higher than the surrounding regional rural background.

Acrolein is an unsaturated aldehyde with extreme mucosal toxicity. It is formed during the incomplete combustion and secondary photochemical oxidation of acrylic monomers that were also aboard the derailed train, including butyl acrylate and ethylhexyl acrylate.

To determine whether measured concentrations posed an immediate public health threat, the researchers calculated the non-cancer Hazard Quotient (HQ):

$$\text{HQ} = \frac{C_{\text{measured}}}{\text{RfC}}$$

In this calculation, $$C_{\text{measured}}$$ is the ambient exposure concentration, and $$\text{RfC}$$ represents the reference concentration established by toxicological standards (the level below which no adverse health effects are anticipated across lifetime exposure). 

When an HQ exceeds 1.0, potential for adverse non-cancer health consequences exists. In East Palestine, the Hazard Quotient for acrolein significantly exceeded 1.0, directly explaining why residents continued to report burning eyes, sore throats, and headaches even after officials announced that vinyl chloride had dropped to undetectable levels.

| Target Compound | Hazard Quotient ($$ \text{HQ} $$) Status | Toxicological Interpretation |
| :--- | :--- | :--- |
| **Vinyl Chloride** | $$ \text{HQ} < 1.0 $$ | Safe intermediate boundary; initial gaseous cloud dispersed rapidly |
| **Benzene** | $$ \text{HQ} < 1.0 $$ | Consistent with normal regional rural baseline levels |
| **Acrolein** | $$ \text{HQ} > 1.0 $$ | Highly elevated non-cancer respiratory and ocular health hazard |

## Spatial Hot Spots and Creekbed Outgassing

Because the mobile van acquired data continuously at 1 Hz, the team constructed high-resolution spatial maps of chemical concentrations along rural roads and town streets.

These transects revealed distinct spatial hot spots:

1. **The Derailment Excavation Site**: Soil remediation and contaminated ballast removal generated localized plumes as heavy excavators turned over aerated soil, releasing trapped pockets of acrylate monomers into the air.
2. **Surface Water Creekbeds**: Measurements taken downwind of Sulphur Run and Leslie Run, two creeks flowing through the derailment perimeter, displayed elevated spikes in oxygenated volatile organics. Heavily contaminated sediments continued to outgas volatile chemicals into the ambient air long after the atmospheric fire was extinguished.

## Implications for Emergency Environmental Protocol

The Carnegie Mellon study demonstrates several lessons for disaster response:

- **Targeted Monitoring Misses Pyrolysis Intermediates**: Testing air purely for the primary chemicals listed on a train manifest ignores secondary reaction chemistry. The thermal decomposition of acrylates and chlorinated hydrocarbons produces reactive aldehydes, phosgene, and chlorinated benzenes that carry acute toxicities far higher than the parent compounds.
- **Mobile Real-Time Spectrometry Must Deploy Early**: Relying exclusively on stationary monitors leaves emergency responders blind to plume trajectories. Mobile research vehicles equipped with PTR-TOF-MS or mobile optical spectrometers should deploy within 24 hours of a hazardous material release to map real-time human exposure corridors.
- **Water-to-Air Pathways Prolong Exposure**: When hazardous chemicals seep into urban waterways and drainage culverts, volatilization from creek surfaces transforms waterways into open chemical emitters that expose neighboring homes through basement outgassing.

By combining spatial instrumentation with toxicological modeling, the CAPS team provided objective verification for community health symptoms, highlighting the vital role of mobile analytical chemistry in disaster response.
