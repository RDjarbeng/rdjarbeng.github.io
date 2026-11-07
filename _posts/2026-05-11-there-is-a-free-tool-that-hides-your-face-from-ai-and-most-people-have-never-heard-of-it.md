---
date: 2026-05-11T11:59:00+02:00
published: false
author: Richard
category: Security
tags:
  - AI
  - Security
  - Privacy
  - Computer Vision
  - Deep Learning
title: There Is a Free Tool That Hides Your Face From AI, and Most People Have Never Heard of It
image: /assets/images/posts/covers/fawkes_facial_cloaking_cover.jpg
image_alt: Diagram of adversarial facial cloaking showing perturbation noise shifting facial recognition embeddings in latent space
layout: post
description: Fawkes applies imperceptible pixel perturbations to personal photos to poison facial recognition scrapers and protect identity embeddings.
key_points:
  - Fawkes applies bounded pixel perturbations that look imperceptible to humans but displace deep feature embeddings.
  - The tool acts as a poison attack against model training pipelines rather than a real-time evasion mask.
  - Deep metric learning systems map faces to high-dimensional unit hyperspheres where small pixel shifts alter cluster assignments.
  - Cloaking protects against future web scraping pipelines but cannot retroactively erase historical image scrapers.
card_items:
  - name: Pixel Perturbation Mechanics
    description: Small bounded pixel deltas push deep feature representations across classification boundaries without visible image distortion.
  - name: Poison Attack Strategy
    description: Web scrapers train facial recognition models on corrupted identities, causing future identification against unaltered camera feeds to fail.
  - name: Metric Learning Vulnerability
    description: Hypersphere embedding losses such as ArcFace and CosFace remain sensitive to targeted gradient displacement vectors.
---

Every time an individual uploads a photograph to the public web, commercial data brokers and scraping engines can ingest the image without consent. Automated scrapers harvest billions of public social media photos to train commercial biometric databases. Services like Clearview AI demonstrate the practical reality of this architecture: a single photo taken years ago can link a person walking through a public space to their full legal name, social profiles, and employment records.

Physical countermeasures like medical masks, patterned scarves, and infrared LED visors attempt to defeat surveillance at the camera lens. However, these methods draw immediate attention and fail to address the underlying issue: the vast repository of personal photographs already circulating on the internet.

Researchers at the SAND (Security, Algorithms, Networking and Data) Laboratory at the University of Chicago developed an open-source software countermeasure called [Fawkes](https://sandlab.cs.uchicago.edu/fawkes). Fawkes operates directly on digital images before publication. It alters individual pixel values so subtly that the human eye detects no difference, yet facial recognition neural networks extract a completely different identity vector.

## How Facial Recognition Embeddings Work

Modern facial recognition systems do not store raw pixel arrays or rely on simple landmark measurements like eye width. Instead, they rely on deep convolutional neural networks or vision transformers trained through deep metric learning.

```text
Raw Probe Image x
    |
    v
[ Deep Feature Extractor f(x): ResNet-50 or ViT Backbone ]
    |
    v
Normalized Embedding Vector z in R^d (Unit Hypersphere ||z|| = 1)
    |
    v
Cosine Similarity Metric: cos(theta) = z_probe . z_gallery
```

The model architecture maps an input image $$x$$ to a compact embedding vector $$z = f(x) \in \mathbb{R}^d$$, typically in 512 dimensions. During training, losses like ArcFace (Additive Angular Margin Loss) or CosFace force representations of the same person into tight clusters on a unit hypersphere while pushing different identities apart:

$$L_{\text{ArcFace}} = -\log \frac{e^{s(\cos(\theta_{y_i} + m))}}{e^{s(\cos(\theta_{y_i} + m))} + \sum_{j \neq y_i} e^{s \cos \theta_j}}$$

Here, $$s$$ represents the feature scale radius, $$\theta_{y_i}$$ represents the angle between the normalized feature vector and the target weight vector, and $$m$$ introduces an explicit angular margin penalty.

When a surveillance provider crawls the web, their pipeline passes scraped photos through $$f(x)$$ and stores the resulting embedding clusters. When an unconstrained camera later captures a probe image $$x_{\text{probe}}$$, the verification system computes the cosine similarity:

$$\text{sim}(x_{\text{probe}}, x_{\text{gallery}}) = \frac{f(x_{\text{probe}}) \cdot f(x_{\text{gallery}})}{\|f(x_{\text{probe}})\| \|f(x_{\text{gallery}})\|}$$

If this score exceeds a predetermined threshold $$\tau$$, the system declares an identity match.

## The Cloaking Mechanism: Adversarial Poisoning

Fawkes disrupts this pipeline by executing a targeted poison attack. Instead of masking a face, Fawkes modifies an original image $$x$$ by adding a small perturbation vector $$\delta$$:

$$x_{\text{cloaked}} = x + \delta$$

The optimization objective minimizes the perceptual distortion between the original and cloaked image while maximizing the displacement in feature space toward an unrelated target identity $$x_T$$:

$$\min_{\delta} \|\delta\|_p \quad \text{subject to} \quad \mathcal{D}(f(x + \delta), f(x_T)) \le \epsilon_{\text{latent}}$$

In practice, the perturbation is constrained by an $$L_\infty$$ norm bound:

$$\|\delta\|_\infty \le \epsilon_{\text{pixel}}$$

This constraint guarantees that no individual pixel shifts by more than a tiny fraction of its color channel, keeping the perturbation invisible under standard viewing conditions.

| Attack Type | Operational Stage | Objective | Attacker Knowledge Needed |
| :--- | :--- | :--- | :--- |
| **Evasion Attack** | Live Inference | Prevent detection by a deployed model in real time | Architecture, weights, or query access |
| **Poison Attack** | Training / Ingestion | Corrupt scraped training samples to distort cluster centroids | Source images before web scraping |
| **Physical Camouflage** | Optical Capture | Block sensor capture using infrared lights or makeup | Environmental lighting conditions |
| **Model Inversion** | Feature Extraction | Reconstruct facial geometry from latent vectors | Public model weights and gradients |

When a web scraper ingests $$x_{\text{cloaked}}$$, the model learns that identity $$A$$ resides at embedding location $$f(x_T)$$. Later, when security cameras capture an unaltered, real-world probe photo $$x_{\text{probe}}$$ of person $$A$$, the camera extracts the genuine embedding $$f(x_{\text{genuine}})$$. Because $$f(x_T)$$ and $$f(x_{\text{genuine}})$$ point in divergent directions on the hypersphere, the cosine similarity falls well below the threshold $$\tau$$. The surveillance database fails to recognize the person.

## Empirical Effectiveness Across Commercial Platforms

In their USENIX Security evaluation, the SAND Lab tested Fawkes against state-of-the-art architectures including FaceNet, VGGFace2, and ArcFace, as well as commercial cloud recognition APIs.

| Pipeline Phase | Input Image State | Feature Space Outcome |
| :--- | :--- | :--- |
| **Web Crawling / Training** | Cloaked public photos ($$x + \delta$$) | Cluster centroid shifts to unrelated target vector $$f(x_T)$$ |
| **Surveillance Probe** | Real-world camera frame ($$x_{\text{probe}}$$) | Extracts unperturbed true identity vector $$f(x_{\text{genuine}})$$ |
| **Biometric Verification** | Cosine similarity query | Similarity falls below threshold ($$\cos \theta < \tau$$); match fails |

The study examined three distinct operational conditions:

1. **Clean Cloaking Baseline**: Every image available to the scraper contains the Fawkes perturbation. In tests against commercial APIs from Microsoft Azure Face, Amazon Rekognition, and Face++, Fawkes achieved a 100 percent cloaking success rate, preventing correct identity matching.
2. **Tainted Gallery Scenarios**: Real-world conditions often include uncloaked historical images. When test galleries contained up to 20 percent uncloaked images mixed with 80 percent cloaked images, protection remained above 84 percent. The perturbed vectors actively distorted the learned cluster centroid away from the true identity.
3. **Black-Box Architecture Transferability**: The researchers demonstrated that perturbations computed against local surrogate models transferred effectively to unknown commercial architectures due to shared gradient directions across deep metric learning backbones.

## Architectural Trade-Offs and Limitations

Fawkes provides individuals with a practical privacy tool, but technical limitations define its operational boundary.

### Historical Training Data

Cloaking works prospectively. If a surveillance firm scraped your social profiles before you adopted cloaking, those historical images have already established an accurate cluster centroid in their database. Cloaked images uploaded today can dilute that centroid if retraining occurs, but they do not delete past index entries.

### Third-Party Tagging

Personal privacy practices do not control third-party behavior. If family members, employers, or friends upload high-resolution group photographs without perturbations, those uncloaked images supply clean ground truth data to scraping crawlers.

### Image Compression and Preprocessing Defenses

Social media platforms routinely re-encode uploaded images using lossy JPEG compression, aggressive chroma subsampling, and spatial downscaling. Because high-frequency adversarial perturbations can attenuate under heavy compression, the perturbation budget must balance resilience against visual artifacts:

```text
Original Image -> Compute Perturbation -> Add delta -> JPEG Subsampling (4:2:0) -> Scraper Pipeline
```

Low-level spatial filtering like Gaussian smoothing or median blur can partially soften adversarial gradients. To combat this vulnerability, modern cloaking implementations apply Expectation Over Transformation (EOT), optimizing the perturbation across simulated compression and noise transformations before saving the file.

## Comparing Anti-AI Privacy Tools

Several complementary tools address different aspects of unauthorized machine learning collection:

| Tool | Primary Target | Technical Mechanism | Primary Use Case |
| :--- | :--- | :--- | :--- |
| **Fawkes** | Biometric facial recognition | Feature space perturbation poisoning ($$L_\infty$$ bound) | Personal social media portraits |
| **LowKey** | High-resolution face matchers | End-to-end optimization against ArcFace and MobileFace | Stronger perturbation for aggressive face models |
| **PhotoGuard** | Generative diffusion models | Encoder and latent diffusion disruption vectors | Preventing unauthorized AI image editing |
| **Glaze** | Generative style mimicry | Feature displacement in artist style latent spaces | Protecting artwork from style imitation |
| **Nightshade** | Multimodal concept models | Targeted concept association poisoning | Disrupting text-to-image dataset integrity |

## Implementation and Practical Deployment

The Fawkes client executes entirely on consumer hardware, requiring no remote cloud services or API connections. The software operates on Windows, macOS, and Linux distributions.

Users can select between three protection modes:

- **Low Mode**: Minimizes visual impact with an $$L_\infty$$ threshold near 0.005. Ideal for professional profile images where visual sharpness is paramount.
- **Mid Mode**: Balances visual clarity with robust transferability across unknown deep learning backbones.
- **High Mode**: Applies stronger perturbation bounds, providing resilience against aggressive platform recompression at the cost of faint texture variations in uniform skin areas.

The desktop client accepts standard image formats (JPEG, PNG) and generates cloaked copies within seconds using CPU or GPU acceleration.

## Strategic Privacy Posture

Algorithmic privacy tools serve as an immediate individual defense while legislative frameworks develop. While comprehensive data governance and statutory scraping restrictions provide structural remedies, technical tools like Fawkes alter the economic calculus of bulk scraping. By increasing the noise ratio and lowering the reliability of unauthorized biometric datasets, adversarial cloaking restores an essential layer of friction to automated facial profiling.
