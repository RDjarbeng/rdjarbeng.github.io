---
date: 2025-08-11T10:02:00
published: false
author: Richard
categories:
  - IoT & Hardware
tags:
  - C-V2X
  - IoT
  - Connected Vehicles
  - Autonomous Driving
  - Sensors
  - Security
  - Public Safety
  - Accessibility
title: 'I Cannot See You in Fog: Vehicle-to-Pedestrian Radio Sidelinks and Low-Visibility Safety'
description: An environmental and wireless engineering analysis of Vehicle-to-Pedestrian (V2P) safety during low-visibility driving, examining C-V2X PC5 sidelinks, 77 GHz radar fusion, and accessibility for disabled road users.
image: /assets/images/posts/covers/v2p_fog_driving_safety_cover.jpg
image_alt: 'Vehicle to Pedestrian radio communication diagram through dense fog'
layout: post
key_points:
  - Atmospheric fog cuts visible distance far below vehicular stopping thresholds, creating an inescapable sight distance deficit.
  - Direct Cellular Vehicle-to-Everything PC5 sidelinks allow smartphones and wheelchairs to broadcast kinematic safety beacons directly to oncoming vehicles.
  - Standardized VRU profiles adapt collision warning times for wheelchair users, while bidirectional haptic feedback alerts blind and deaf pedestrians.
card_items:
  - name: The Stopping Distance Deficit
    description: Analyzing how fog collapses sightlines well below the mechanical stopping distance required at normal driving speeds.
  - name: C-V2X Direct Sidelinks
    description: Implementing 3GPP PC5 protocol stacks on the 5.9 GHz ITS band for sub-ten-millisecond collision alerts.
  - name: Accessible Pedestrian Safety
    description: Tailoring warning windows for wheelchair users and delivering bidirectional haptic alerts to blind and deaf road users.
---
<!-- WRITER NOTE (for the writer only, remove before publishing)
Original draft, kept so you remember where this post was going:

If I was afraid to cross a foggy road because I would not be seen by oncoming cars is there anything that can be done? Zebra crossing won't save me from getting hit if the driver can't see it.

If I was a driver how would I want to be told that there is a pedestrian on the road in front of me when I'm driving down a road with low visibility.

One possible solution:

Most people carry mobile phones. Is there a way that a person's mobile phone can talk to a car and make it very clear that a person is standing on the road? Does this technology exist?

Ironically, many blame mobile phones as the reason people get hit on the road because of distractions. Could the problem actually become a solution?

What security risks does this pose when it comes to sharing my location with a fleet of cars? Would this stand the test of time?

END WRITER NOTE -->

If I was afraid to cross a foggy road because oncoming cars could not see me, zebra crossings would do nothing to protect me. A painted stripe on asphalt cannot stop a vehicle if the driver cannot see the road in front of them.

Looking at the situation from behind the steering wheel feels just as terrifying. If I were driving down a low-visibility road in heavy fog, I would want a reliable warning that a pedestrian was ahead well before my headlights caught them. At 60 kilometers per hour, a car travels 16.7 meters every second. By the time human eyes register a shadow in the mist, stopping in time is practically impossible.

Most people carry a mobile phone. For years, phones have taken the blame for pedestrian accidents because of screen distraction. That led me to a counterintuitive idea: the very device blamed for road hazards could become the tool that solves them.

If a phone could communicate directly with approaching cars to announce a pedestrian position long before visual contact, the whole safety dynamic changes. That technology exists today under Vehicle-to-Pedestrian (V2P) and Cellular Vehicle-to-Everything (C-V2X) direct radio sidelinks. Yet broadcasting coordinates to every passing vehicle raises serious privacy stakes, requiring cryptographic safeguards so safety beacons never become tracking tools.

## Visibility Limits: Stopping Distance vs Sight Distance in Fog

The fundamental danger of driving in dense fog is not simply that things look blurry. It is a severe mathematical mismatch between how far ahead a driver can see and the physical distance required to bring a vehicle to a complete stop.

| Vehicle Speed | Reaction Distance (1.5s Perception) | Wet Braking Distance | Total Stopping Distance | Fog Sight Distance (Dense Mist) | Safety Margin |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 30 km/h (19 mph) | 12.5 m | 7.0 m | 19.5 m | 25.0 m | +5.5 m (Narrow Stop) |
| 50 km/h (31 mph) | 20.8 m | 19.3 m | 40.1 m | 25.0 m | -15.1 m (Collision Deficit) |
| 60 km/h (37 mph) | 25.0 m | 27.8 m | 52.8 m | 25.0 m | -27.8 m (Severe Impact) |
| 80 km/h (50 mph) | 33.3 m | 49.4 m | 82.7 m | 25.0 m | -57.7 m (Blind Travel) |

At 60 kilometers per hour, a vehicle covers nearly 53 meters before coming to a halt on damp asphalt. If visibility is restricted to 25 meters, the driver travels 28 meters completely blind to whatever lies in the road ahead.

### The Contrast Trap and the High-Beam Mistake

Two common perceptual phenomena make fog driving even more hazardous:

1. **The Velocity Illusion**: In dense fog, the loss of high-frequency visual references along the road shoulder removes normal optical flow cues. Drivers systematically underestimate their speed, believing they are crawling along when their speedometer still reads 50 or 60 km/h.
2. **The High-Beam Backscatter**: Switching to high beams in thick fog worsens visibility immediately. Headlamp photons hit millions of suspended water droplets measuring 10 to 50 micrometers across. Because droplet diameters exceed the wavelength of visible light ($$\lambda \approx 0.4 \text{ to } 0.7\,\mu\text{m}$$), light scatters backward directly toward the driver eyes. This creates a blinding white wall of glare. Low-mounted fog lamps work because they project a wide, flat beam underneath the elevated mist layer.

The degradation of human vision follows Koschmieder's law of atmospheric extinction:

$$
C(x) = C_0 \exp(-\beta_{\text{ext}} x)
$$

Here $$C_0$$ is the original contrast of the pedestrian clothing against the pavement, $$x$$ is distance in meters, and $$\beta_{\text{ext}}$$ is the atmospheric extinction coefficient. In thick fog where $$\beta_{\text{ext}} > 0.05\,\text{m}^{-1}$$, contrast collapses below human recognition thresholds long before headlights reach the target. Even high-visibility fluorescent vests only buy a few extra meters in thick mist because the reflected light itself is scattered before returning to the driver retina.

## The V2P Architecture: C-V2X PC5 Direct Sidelinks

Vehicle-to-Pedestrian communication circumvents optical limitations by shifting detection from visible photons to radio frequency waves. Instead of waiting for light to bounce off clothing, the pedestrian device actively broadcasts its presence over dedicated spectrum.

| Dimension | Standard Cellular (4G/5G Uu) | Direct Sidelink (3GPP C-V2X PC5) |
| :--- | :--- | :--- |
| **Routing Path** | Phone to Tower to Core Network to Car | Direct Device-to-Vehicle Broadcast |
| **Air Interface Latency** | 50 ms to 150 ms | Under 10 ms |
| **Infrastructure Dependency** | Requires active cell tower coverage | Fully autonomous (zero infrastructure needed) |
| **Frequency Band** | Carrier licensed spectrum | 5.9 GHz ITS Band (5855 MHz to 5925 MHz) |
| **Collision Applicability** | Suitable for weather reports and traffic alerts | Real-time emergency braking and collision avoidance |

3GPP Releases 14, 15, and 16 standardized the PC5 direct sidelink interface. In Mode 4 (autonomous distributed scheduling), personal user equipment like smartphones and smartwatches broadcast safety messages directly to vehicle on-board units without routing data through cellular base stations.

### Accessible Safety: Protecting Wheelchair Users, Blind, and Deaf Road Users

The standard assumption in pedestrian safety models is an able-bodied adult walking at 1.2 to 1.4 meters per second. In the real world, vulnerable road users have diverse mobility profiles and sensory needs.

The European Telecommunications Standards Institute (ETSI TS 103 300-2) and SAE International (SAE J2945/9) define specific Vulnerable Road User (VRU) profiles within Cooperative Awareness Messages.

```text
VRU_Safety_Message {
  protocolVersion: 2,
  vruType: wheelchair_user,        // Options: pedestrian, wheelchair, cane_user, hearing_impaired
  temporaryID: 0x9F82AB31,         // Rotates every 5 minutes
  timestamp: 1792753200100,
  position: {
    latitude: 5.560014,
    longitude: -0.205744,
    altitude: 12.4,
    horizontalUncertainty: 0.6     // Sub-meter RTK/GNSS precision
  },
  kinematics: {
    speed: 0.7,                    // meters per second
    heading: 92.0,                 // degrees from true north
    trajectoryIntent: crossing_roadway,
    mobilityProfile: motorized_wheelchair
  }
}
```

This classification transforms road safety in three critical areas:

1. **Extended Crossing Clearance Windows**: A manual wheelchair user, a person pushing a stroller, or an elderly pedestrian using a walker might average 0.5 to 0.7 m/s. Crossing an 8-meter two-lane road takes 12 to 16 seconds instead of 6 seconds. When an approaching vehicle receives `vruType: wheelchair_user`, its collision estimation engine extends the safety clearance envelope, triggering automated slowing much earlier than it would for an adult runner.
2. **Bidirectional Protection for Blind Pedestrians**: In heavy fog, visually impaired pedestrians cannot see headlights, and modern electric vehicles operating at low speeds produce virtually zero engine noise. C-V2X direct links work bidirectionally. When the vehicle detects a visually impaired pedestrian signal, the car on-board unit immediately echoes a priority proximity acknowledgment back to the pedestrian smartphone or smartwatch. The pedestrian device vibrates with directional haptic pulses, alerting them that a vehicle is approaching from their left before they step into the roadway.
3. **Wearable Visual and Haptic Alerts for Deaf Road Users**: Hearing-impaired pedestrians cannot hear horns, approaching tires, or engine revs through fog. Direct V2P signaling triggers immediate vibration and high-contrast visual flashes on wearable smartwatches, providing an intuitive heads-up alert whenever an approaching vehicle enters a 100-meter collision trajectory.

## Multi-Sensor Fusion Inside the Vehicle

Relying solely on smartphone broadcasts introduces practical failure modes: a pedestrian phone battery might run out, or a device might be buried deep inside a signal-shielded metal briefcase. Modern automotive safety controllers combine radio telemetry with active radar.

| Sensor Modality | Fog Penetration | Spatial Resolution | Primary Output |
| :--- | :--- | :--- | :--- |
| **Visible CMOS Camera** | Near zero in dense mist | Very high | 2D color bounding boxes |
| **LiDAR (905 nm / 1550 nm)** | Poor (beam attenuation and backscatter) | High | 3D reflective point cloud |
| **77 GHz mmWave Radar** | Superior (minimal fog attenuation) | Moderate | Radial distance and Doppler velocity |
| **LWIR Thermal Camera** | Moderate (penetrates light fog) | High | Body heat differential |
| **C-V2X V2P Sidelink** | Absolute (penetrates all weather) | Coordinate-based | Precise kinematics and intent |

### 77 GHz Millimeter-Wave Radar and Kalman Filter Tracking

Automotive radar operating at 77 GHz uses an electromagnetic wavelength of 3.9 millimeters. Because this wavelength is roughly 200 times larger than fog droplets, millimeter waves experience minimal Rayleigh scattering. Atmospheric attenuation in dense fog is less than 0.1 decibels per kilometer.

The vehicle central safety domain controller fuses the 77 GHz radar track with incoming V2P smartphone telemetry using an Extended Kalman Filter (EKF):

1. **Measurement Ingestion**: The radar detects physical echoes and measures radial velocity via Doppler shifts. Concurrently, the V2P receiver decodes the smartphone GPS position and heading vector.
2. **Spatial Gating**: The EKF constructs an ellipsoidal validation gate around the predicted pedestrian location. If the radar return falls within the covariance boundary of the radio coordinate, the system confirms a high-confidence target.
3. **Clutter Rejection**: Road spray and roadside signs frequently generate ghost radar reflections in rain and fog. Cross-referencing radar echoes with cryptographic V2P signals filters out phantom detections without sacrificing response time.

## Security, Privacy, and Ephemeral Pseudonyms

Broadcasting continuous geospatial coordinates from personal mobile devices immediately raises severe privacy questions. When sharing real-time coordinates with an oncoming fleet of vehicles, the core challenge is ensuring that safety beacons never degrade into continuous tracking tools.

If a smartphone continuously transmitted a static hardware Media Access Control (MAC) address or unique International Mobile Equipment Identity (IMEI), roadside receivers and passing vehicles could trace the physical movements of every citizen across an entire city.

To eliminate persistent surveillance risks, V2P safety implementations mandate the IEEE 1609.2 Security Services standard for Intelligent Transport Systems:

1. **Pseudonymous Signatures**: Every safety message is digitally signed using Elliptic Curve Digital Signature Algorithm (ECDSA) with NIST P-256 curves. Vehicles verify that the message originates from an authorized device without learning the subscriber name or phone number.
2. **Ephemeral Identity Rotation**: The smartphone rotates its temporary certificate, random identifier, and physical layer MAC address simultaneously every five minutes, or whenever a major turn is executed. This prevents external observers from stitching together longitudinal journey profiles.
3. **Sybil and Denial-of-Service Defense**: To prevent malicious actors from deploying simulated smartphone broadcasters to paralyze city traffic with non-existent pedestrian alerts, the Security Credential Management System (SCMS) enforces strict rate limits on certificate issuance, revoking batches tied to compromised hardware roots of trust.

## Technical Summary

The hazard of operating motor vehicles in dense fog is a physical limitation of the visible optical spectrum. Mie scattering off micro-droplets scatters illumination and robs drivers and optical cameras of critical stopping margins.

Vehicle-to-Pedestrian communication circumvents this barrier by converting atmospheric visibility into a direct wireless networking domain.

By combining low-latency 5.9 GHz C-V2X direct PC5 radio sidelinks with on-board 77 GHz millimeter-wave radar tracking, modern transportation engineering provides drivers with situational awareness that pierces visual whiteout conditions. 

Whether this technology stands the test of time depends on maintaining user trust and ensuring accessibility for all pedestrians. Protected by IEEE 1609.2 cryptographic pseudonyms and hardware roots of trust, vehicle-to-pedestrian radio links demonstrate that road safety does not have to come at the expense of personal privacy.
