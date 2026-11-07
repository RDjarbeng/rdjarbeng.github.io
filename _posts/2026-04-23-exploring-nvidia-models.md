---
date: 2026-04-23T21:58:00+02:00
published: false
author: Richard
category: Computer Vision
tags:
  - Nvidia
  - Computer Vision
  - Deep Learning
  - Video Processing
  - AI
title: "Neural Video Relighting: Inside NVIDIA's NIM Microservices for 360 HDRI Illumination"
image: /assets/images/posts/covers/nvidia_neural_relighting_cover.jpg
image_alt: Computer vision diagram showing neural video relighting decomposition into albedo, surface normals, diffuse shading, and spherical harmonics
layout: post
description: An engineering deep dive into neural video relighting, exploring inverse rendering, spherical harmonics, surface normals, and NVIDIA NIM microservices.
key_points:
  - Neural video relighting solves the inverse rendering problem by isolating diffuse albedo from source lighting conditions.
  - Target environmental illumination is projected onto estimated 3D surface normals using spherical harmonics basis functions.
  - Refinement neural networks synthesize complex skin subsurface scattering and ocular catchlights that basic physics approximations miss.
  - Optical flow warping and temporal attention maintain coherent shading across video frames without high-frequency flickering.
card_items:
  - name: Inverse Rendering Formulation
    description: Disentangling surface reflectance from ambient illumination enables synthetic re-illumination under arbitrary light environments.
  - name: Spherical Harmonics Shading
    description: Low-order orthogonal basis expansions compute Lambertian diffuse irradiance in real time directly on tensor cores.
  - name: Temporal Video Consistency
    description: Recurrent frame conditioning prevents frame-to-frame lighting jitter during dynamic head and facial movements.
---
<!-- WRITER NOTE (for the writer only, remove before publishing)
Original draft, kept so you remember where this post was going:

Exploring models on build

![Relighting model for Nvidia](/assets/images/20260423-215827.png)

Tested: https://build.nvidia.com/nvidia/relighting

# NVIDIA AI for Media Relighting

Re-illuminate people in video to match target lighting from a 360 HDRI environment map.

END WRITER NOTE -->

In traditional cinematography and video production, matching an actor recorded in a standard room to an exotic digital background requires physical lighting setups. Cinematographers construct elaborate programmable LED stages, known as lightcraft volumes, to cast colored highlights that mirror the target environment. 

NVIDIA has packaged an alternative into a cloud microservice within its NVIDIA Inference Microservice (NIM) catalog: **NVIDIA AI for Media Relighting**, accessible directly through the [NVIDIA Build Relighting Catalog](https://build.nvidia.com/nvidia/relighting).

```text
Source Video Frame (Arbitrary Ambient Lighting)
                      |
                      v
[ Inverse Rendering and Normal Estimation: Decomposes Albedo A(x) and Normals n(x) ]
                      |
                      v
[ 360 HDRI Environment Map Sampling: Spherical Harmonics L(theta, phi) ]
                      |
                      v
[ Neural Refinement and Temporal Filter: Subsurface Scattering and Ocular Catchlights ]
                      |
                      v
Relighted Video Output (Harmonized Target Lighting)
```

The system ingests an ordinary video stream captured under uncontrolled office lighting and alters the subject's lighting geometry to match any 360-degree High Dynamic Range Image (HDRI) environment map.

![Relighting model for Nvidia](/assets/images/20260423-215827.png)

Achieving this transition in real time demands solving the classic ill-posed computer vision challenge of inverse rendering while maintaining temporal stability across sequential frames.

## The Inverse Rendering Problem

A single pixel in an observed camera frame represents the final convergence of multiple physical parameters: surface geometry, diffuse material reflectance, directional illumination, and specular reflection.

The rendering equation models observed surface radiance $$I(x)$$ at image coordinate $$x$$:

$$I(x) = A(x) \odot S(x) + E(x)$$

In this formulation:
- $$A(x)$$ represents diffuse albedo, the intrinsic color and reflectance of the human skin, hair, and clothing isolated from any external light source.
- $$S(x)$$ represents the incident shading field, which incorporates light direction, shadows, and surface orientation.
- $$E(x)$$ accounts for direct emissive components and high-intensity specular highlights.
- The operator $$\odot$$ denotes element-wise Hadamard multiplication across color channels.

To relight an individual, the algorithm must invert this function. It extracts the unshaded albedo map $$A(x)$$ by factoring out the original, unmeasured ambient room lighting. If the system fails to strip out existing directional shadows, new virtual light sources will layer on top of old shadows, producing unnatural double-shadow artifacts.

## Surface Geometry and Normal Map Estimation

Once the network isolates the subject, it predicts dense three-dimensional surface orientation. For every pixel representing the subject's skin or clothing, the vision backbone computes a normalized surface normal vector:

$$\mathbf{n}(x) = \begin{bmatrix} n_x \\ n_y \\ n_z \end{bmatrix}, \quad \|\mathbf{n}(x)\|_2 = 1$$

Surface normals describe the tilt of facial contours (the bridge of the nose, the curve of the cheekbones, the slope of the forehead) relative to the camera lens.

```text
Frontal Face Contour Normal Mapping:
* Facing camera directly: n(x) = [0, 0, 1]
* Left cheek contour:     n(x) = [-1, 0, 0]
* Right cheek contour:    n(x) = [1, 0, 0]
```

Without dedicated depth sensors or multi-view stereo cameras, the model infers these vectors monocularly. It utilizes a vision backbone trained on high-resolution photogrammetry datasets captured inside physical light stages.

## Target Lighting via Spherical Harmonics

The target environment is supplied as an equirectangular 360-degree panoramic HDRI image. An HDRI map stores floating-point radiance values capable of distinguishing between faint room ambient light and the intense localized radiance of a direct spotlight or sunset.

To compute diffuse surface illumination rapidly on GPU hardware without performing computationally expensive Monte Carlo ray tracing for every pixel, the system projects the target lighting environment into an orthogonal basis known as Spherical Harmonics (SH).

The continuous lighting distribution $$L(\theta, \phi)$$ across spherical coordinates expands into basis functions $$Y_l^m$$:

$$L(\theta, \phi) \approx \sum_{l=0}^{N} \sum_{m=-l}^{l} c_l^m Y_l^m(\theta, \phi)$$

For Lambertian diffuse surfaces like skin, higher-frequency lighting details blur out across the surface. Ramamoorthi and Hanrahan proved that second-order spherical harmonics ($$N = 2$$) account for over 99 percent of diffuse reflected irradiance:

$$E(\mathbf{n}) \approx \sum_{l=0}^{2} \sum_{m=-l}^{l} \hat{A}_l c_l^m Y_l^m(\mathbf{n})$$

Because second-order harmonics require only 9 coefficients per color channel (27 scalar values for full RGB), the environment map compresses into a compact mathematical tensor. Computing diffuse illumination on any facial coordinate reduces to a fast matrix-vector quadratic product against the estimated surface normal $$\mathbf{n}(x)$$.

| Order $$l$$ | Basis Count $$(2l + 1)$$ | Total Coefficients | Physical Lighting Captured |
| :--- | :--- | :--- | :--- |
| **0** | 1 | 1 | Uniform ambient diffuse light |
| **1** | 3 | 4 | Directional light vectors (XYZ axes) |
| **2** | 5 | 9 | Quadratic gradients, saddle points, oblique highlights |

## Neural Refinement: Subsurface Scattering and Catchlights

Pure Lambertian shading based on surface normals yields a matte, plaster-like appearance. Human skin is biologically complex: light penetrates the translucent epidermis, scatters internally across blood vessels and collagen fibers, and exits at neighboring points. This phenomenon, known as subsurface scattering (BSSRDF), gives human skin its characteristic warmth along shadow boundaries.

In addition, human eyes contain reflective corneas. Viewers instantly detect artificial relighting if the eyes lack specular reflections (catchlights) that match the brightest light sources in the target HDRI map.

```text
Target HDRI Map -> Extract Dominant Light Angles -> Synthesize Corneal Highlight
                                                          |
Estimated Normals -> Diffuse Irradiance -> Neural Refiner -+-> Photo-Realistic Skin
```

NVIDIA's relighting pipeline addresses this by feeding the diffuse physical shading estimate, original video frame, and target lighting coefficients into a neural refinement network. This network:

1. Modulates shadow terminators with warm subsurface scattering tones.
2. Synthesizes ocular catchlights aligned with dominant directional lights.
3. Generates subtle self-occlusion contact shadows beneath the chin and nose.

## Temporal Stability Across Video Frames

Executing neural relighting frame-by-frame leads to severe flickering. Slight variations in monocular normal estimation between frame $$t$$ and frame $$t+1$$ cause noticeable illumination jitter across cheekbones and foreheads.

To guarantee broadcast-grade temporal coherence, the NIM architecture incorporates optical flow warping and recurrent cross-frame conditioning:

$$\mathbf{F}_{t \to t-1} = \text{OpticalFlow}(I_t, I_{t-1})$$

The feature representation of the preceding frame $$t-1$$ warps along the motion vector field $$\mathbf{F}_{t \to t-1}$$ into alignment with frame $$t$$. A temporal attention module compares the warped previous state with the current candidate estimation, smoothing out high-frequency flickering while preserving sharp geometric changes during rapid head rotations.

## Invoking the NVIDIA NIM Relighting API

Developers can deploy this microservice locally as an optimized Docker container on NVIDIA RTX or data center GPUs, or query it programmatically via cloud endpoints.

```python
import requests
import json
import base64

API_ENDPOINT = "https://ai.api.nvidia.com/v1/cv/nvidia/relighting"
API_KEY = "YOUR_NVIDIA_BUILD_API_KEY"

def relight_frame(video_frame_path: str, hdri_map_path: str, intensity: float = 1.0) -> bytes:
    """
    Submits a video frame and target 360 HDRI map to NVIDIA NIM Relighting microservice.
    Returns the synthesized frame bytes.
    """
    with open(video_frame_path, "rb") as f:
        frame_b64 = base64.b64encode(f.read()).decode("utf-8")
        
    with open(hdri_map_path, "rb") as f:
        hdri_b64 = base64.b64encode(f.read()).decode("utf-8")
        
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    payload = {
        "input_frame": f"data:image/png;base64,{frame_b64}",
        "environment_map": f"data:image/hdr;base64,{hdri_b64}",
        "lighting_intensity": intensity,
        "preserve_background": False
    }
    
    response = requests.post(API_ENDPOINT, headers=headers, json=payload, timeout=30)
    response.raise_for_status()
    
    result_data = response.json()
    output_b64 = result_data["output_frame"].split(",")[1]
    return base64.b64decode(output_b64)

# Execute frame relighting
output_bytes = relight_frame("test_actor.png", "sunset_lounge_360.hdr", intensity=1.2)
with open("relighted_actor.png", "wb") as f:
    f.write(output_bytes)
```

## Production Applications

Automated neural relighting transforms real-time media production pipelines:

- **Virtual Studio Production**: Streamers and remote presenters can composite themselves into virtual sets, automatically harmonizing skin tones with on-screen graphics or simulated 3D Unreal Engine studio lighting.
- **Visual Effects Compositing**: Film editors can integrate archival or location footage into newly filmed background plates without labor-intensive manual rotoscoping and color grading.
- **Enterprise Video Conferencing**: Telepresence systems can rebalance harsh overhead fluorescent lighting or dim backlighting into flattering, uniform illumination during business calls.

By combining inverse rendering physics with deep generative refinement, neural relighting replaces expensive physical lighting hardware with software-defined illumination.
