---
layout: post
title: "Cybersecurity Datasets and Deep Learning: From KDD99 to Modern Foundation Models"
date: 2026-09-24T08:00:00Z
published: false
author: Richard
category: Technology
tags:
  - Cybersecurity
  - Deep Learning
  - Datasets
  - Network Intrusion Detection
  - Malware Analysis
  - Graph Neural Networks
image: /assets/images/posts/covers/deep-learning-cybersecurity-datasets-cover.jpg
image_alt: "Editorial illustration of a cybersecurity research laboratory showing data pipelines from internet through firewalls, feature extraction, neural network models, and security researchers analyzing alerts under the title Deep Learning for Cybersecurity"
card_items:
  - name: "Berman et al. 2019 Survey"
    badge_1: "Foundational Review"
    badge_2: "Information Journal"
    url: "https://doi.org/10.3390/info10040122"
    link_text: "Read Survey Paper"
    description: "Berman, Buczak, Chavis, and Corbett survey establishing the state of deep neural networks, autoencoders, and RBMs for intrusion detection and malware classification."
  - name: "SOREL-20M Benchmark"
    badge_1: "Malware Scale"
    badge_2: "20 Million PEs"
    url: "https://github.com/sophos-ai/SOREL-20M"
    link_text: "Access SOREL-20M"
    description: "Sophos and ReversingLabs release of 20 million portable executable files, including 10 million disarmed binaries, standardizing malware detection benchmarks."
  - name: "Standardized NetFlow Suite (NF-v2)"
    badge_1: "Network Intrusion"
    badge_2: "43 NetFlow Features"
    url: "https://arxiv.org/abs/2104.05929"
    link_text: "Explore NetFlow Datasets"
    description: "Sarhan et al. unified framework converting UNSW-NB15, BoT-IoT, ToN-IoT, and CSE-CIC-IDS2018 into identical 43-feature NetFlow formats for honest cross-evaluation."
  - name: "BETH Anomaly Dataset"
    badge_1: "Host Telemetry"
    badge_2: "Kernel eBPF"
    url: "https://github.com/rahul-t/beth-dataset"
    link_text: "View eBPF Dataset"
    description: "Highnam et al. dataset capturing eight million kernel-level process and system call events across 23 honeypots for unsupervised zero-day anomaly detection."
---

For more than twenty years, academic research in machine learning for intrusion detection revolved around a single, artificial collection of simulated network records. The Knowledge Discovery and Dissemination (KDD) 1999 dataset, derived from the 1998 DARPA intrusion detection evaluation at MIT Lincoln Laboratory, provided over four million connection records that sustained hundreds of doctoral theses and conference papers.

![Cybersecurity Datasets and Deep Learning](/assets/images/posts/covers/deep-learning-cybersecurity-datasets-cover.jpg)

When Daniel S. Berman, Anna L. Buczak, Jeffrey S. Chavis, and Cherita L. Corbett published their survey, *A Survey of Deep Learning Methods for Cyber Security* (Information 2019, 10(4), 122), they captured a pivotal inflection point. Deep learning architectures like Restricted Boltzmann Machines, Autoencoders, and early Convolutional Neural Networks were replacing shallow classifiers like decision trees and support vector machines. Yet researchers were still training these sophisticated architectures on tabular datasets originally collected during the dial-up era.

Understanding where defensive machine learning stands today requires examining the baseline that Berman and his colleagues documented in 2019.

## The 2019 baseline: what Berman et al. documented

That 2019 baseline was defined by early deep architectures applied to tabular network records, disassembled byte streams, and uniform text logs.

Berman and his co-authors surveyed five primary deep learning architectures across security applications:

1. **Restricted Boltzmann Machines (RBMs) and Deep Belief Networks (DBNs):** Used heavily for unsupervised pre-training and feature extraction before passing reduced embeddings to a supervised output layer.
2. **Deep Autoencoders (AEs, DAEs, and VAEs):** Applied as anomaly detectors by training strictly on benign traffic; packets with high reconstruction error were flagged as suspicious.
3. **Convolutional Neural Networks (CNNs):** Applied to raw packet payloads or binary executables converted into grayscale image grids (such as the Nataraj representation), allowing 2D spatial filters to spot structural patterns.
4. **Recurrent Neural Networks (RNNs and LSTMs):** Employed on temporal sequences, including sequences of API calls in sandbox logs, system call traces, and netflow packet arrivals.
5. **Generative Adversarial Networks (GANs):** Evaluated primarily for synthesizing synthetic training records or testing adversarial evasion against intrusion classifiers.

The problem spaces examined by Berman et al. stretched across Network Intrusion Detection Systems (NIDS), malware classification, spam detection, phishing URL identification, and Domain Generation Algorithm (DGA) traffic. 

```
+-------------------------------------------------------------------------+
|                  The 2019 Deep Learning Security Stack                  |
+-------------------------------------------------------------------------+
|  Applications:     NIDS       Malware PE      DGA/Phishing   Spam/Email |
|  Architectures:    RBM/DBN    Autoencoders    1D/2D CNN      LSTM/GRU   |
|  Feature Inputs:   CSV Rows   Byte Images     URL Chars      Bag-of-Words|
|  Dominant Data:    KDD Cup 99 NSL-KDD         UNSW-NB15      EMBER 2018 |
+-------------------------------------------------------------------------+
```

Across dozens of cited papers, researchers reported test accuracy figures between 97 percent and 99.8 percent. On paper, deep learning appeared to have solved automated defense.

Yet despite reporting accuracy figures exceeding 98 percent across these benchmarks, almost none of these models survived contact with enterprise production traffic.

## Why the classic benchmarks broke

Production traffic broke these models because academic datasets hid three structural traps.

### 1. The base rate fallacy

The most persistent flaw in early cybersecurity machine learning was the ignoring of the base rate fallacy, originally formalized for intrusion detection by Stefan Axelsson in 2000. In academic benchmark sets like KDD99 or NSL-KDD, malicious connections often made up 20 percent to 50 percent of the total evaluation samples. In production enterprise backbones, real attacks represent an infinitesimal fraction of daily packet traffic, often fewer than one packet in a million ($$P(\text{Attack}) \approx 10^{-6}$$).

When an alert occurs, the probability that an attack is actually taking place is governed by Bayes' theorem:

$$
P(\text{Attack} \mid \text{Alert}) = \frac{P(\text{Alert} \mid \text{Attack}) \cdot P(\text{Attack})}{P(\text{Alert} \mid \text{Attack}) \cdot P(\text{Attack}) + P(\text{Alert} \mid \text{Benign}) \cdot P(\text{Benign})}
$$

Suppose a model achieves an outstanding True Positive Rate of $$99.9\%$$ ($$P(\text{Alert} \mid \text{Attack}) = 0.999$$) and an extremely low False Positive Rate of $$0.1\%$$ ($$P(\text{Alert} \mid \text{Benign}) = 0.001$$). When deployed against a standard corporate pipe carrying $$10^7$$ connections per day with an attack base rate of $$P(\text{Attack}) = 10^{-6}$$:

$$
P(\text{Attack} \mid \text{Alert}) = \frac{0.999 \times 10^{-6}}{(0.999 \times 10^{-6}) + (0.001 \times (1 - 10^{-6}))}
$$

$$
P(\text{Attack} \mid \text{Alert}) = \frac{0.000000999}{0.000000999 + 0.000999999} \approx 0.000998 \approx 0.1\%
$$

Even with a $$99.9\%$$ detection rate and a $$99.9\%$$ specificity rate, over 99.9 percent of all generated alerts are false alarms. A Security Operations Center (SOC) processing tens of millions of records per day receives thousands of false alerts daily for every single true intrusion. This alert fatigue leads analysts to disable the automated system entirely.

### 2. Synthetic capture artifacts and label leakage

In 2021, Gints Engelen, Vera Rimmer, and Wouter Joosen published their landmark study, *Troubleshooting an intrusion detection dataset: the CICIDS2017 case study* (IEEE SPW 2021). The Canadian Institute for Cybersecurity had created CIC-IDS2017 to replace the outdated KDD99, recording modern network attacks like Heartbleed, DoS, Botnets, and Infiltration.

Engelen et al. analyzed the raw packet captures (PCAPs) alongside the exported feature sets and uncovered fatal flaws in the generation pipeline:

- More than 25 percent of all network flows produced by the extraction tool (CICFlowMeter) were completely corrupted or meaningless due to packet timing mismatches and TCP sequence reassembly failures.
- Severe label leakage existed throughout the dataset. The attacker machines used distinct network interface configurations, static IP subnets, and unique TCP window sizes or Time-To-Live (TTL) values.
- Deep neural networks achieved near-perfect accuracy not by learning the behavioral semantics of the attack, but by memorizing the TCP window size of the attacker's virtual machine. When researchers normalized the IP addresses and header constants, classifier performance collapsed.

```
+--------------------------------------------------------------------------+
|                  The Synthetic Benchmark Artifact Trap                   |
+--------------------------------------------------------------------------+
|  Training Pipeline:                                                      |
|  [Simulated Attack Tool] ---> [Static VM Config] ---> [Flawed Extractor] |
|                                       |                        |         |
|  Features Learned:             Hardcoded TTL            Mangled Flows    |
|                                Static Window Size       Missing FIN Flags|
|                                       v                        v         |
|  Model Prediction:       100% Test Accuracy in Academic Paper            |
|  Production Reality:     0% Generalization on Real Enterprise Traffic    |
+--------------------------------------------------------------------------+
```

### 3. The encryption blanket

When KDD99 and NSL-KDD were captured, the vast majority of web traffic traveled in cleartext HTTP, FTP, and Telnet. Deep learning models could inspect raw packet payloads directly, treating byte sequences like text tokens in natural language processing.

Over the following decade, the internet underwent total transport-layer encryption. By 2024, more than 95 percent of all web traffic was encrypted via TLS 1.3, Encrypted Client Hello (ECH), QUIC, and DNS-over-HTTPS (DoH). Payload inspection became impossible without actively terminating TLS sessions at enterprise proxy boundaries, which is computationally expensive and legally constrained. Deep learning models trained on cleartext payloads were blinded overnight.

To escape these synthetic artifacts and encryption blind spots, researchers between 2019 and 2026 had to rebuild security datasets from scratch.

## The modern cybersecurity dataset catalog (2019 to present)

Rebuilding security datasets from scratch required moving to massive scale, explicit timestamps, and host-level kernel telemetry. 

The community abandoned single-server toy datasets in favor of large benchmarks designed to measure specific phenomena: concept drift over time, multi-stage advanced persistent threats, and kernel-level process lineage.

```
+---------------------------------------------------------------------------+
|               Generational Shift in Cybersecurity Datasets                |
+---------------------------------------------------------------------------+
| Era              Primary Benchmark     Modality        Key Limitation     |
| 1999-2015        KDD Cup 99, NSL-KDD   Synthetic Flows Outdated, Dupes    |
| 2015-2019        CIC-IDS2017, EMBER18  PCAP / Static PE Feature Leakage   |
| 2020-Present     SOREL-20M, BODMAS,    Disarmed PEs,   Requires Graph /   |
|                  BETH, CIC-IoT2023,    Kernel eBPF,    Temporal Modeling  |
|                  DARPA TC Provenance   IoT Topologies                     |
+---------------------------------------------------------------------------+
```

### 1. Large-scale malware benchmarks

#### SOREL-20M (2020)
Created collaboratively by Sophos AI and ReversingLabs (Richard Harang and Ethan M. Rudd), SOREL-20M (*Sophos-ReversingLabs 20 Million*) transformed machine learning research on Portable Executable (PE) files. 

Prior to SOREL-20M, the standard benchmark was EMBER (Endgame Malware Benchmark for Research), which provided pre-extracted feature vectors for 1.1 million binaries. SOREL-20M scaled this by twenty times:
- **Volume:** Contains metadata, labels, and pre-extracted features for 20 million Windows PE files.
- **Disarmed Executables:** Includes approximately 10 million disarmed malware samples, where file headers were modified to make execution impossible while preserving the exact byte structures needed for static analysis.
- **Detection Tags:** Provides both binary detection labels and granular vendor detection counts alongside behavioral tags from ReversingLabs threat engines.
- **Baseline Models:** Released with production-grade PyTorch feedforward networks and LightGBM models trained on 8 terabytes of underlying data.

#### BODMAS (2021)
The Blue Hexagon Open Dataset for Malware Analysis (BODMAS), published by Limin Yang et al. in 2021, addressed the problem of temporal degradation and concept drift. Malware authors constantly update their packers, obfuscation routines, and command structures. A model trained in January often loses significant detection accuracy by November.

BODMAS curated 134,435 samples (57,293 malware and 77,142 benign files) collected between August 2019 and September 2020. Every sample is stamped with its verified first-seen date and classified into one of 581 malware families. This timestamp precision allows researchers to evaluate realistic time-split validation: training on months 1 through 6 and testing on months 7 through 12.

#### MalNet (2021)
Moving beyond flat feature tables, MalNet (Freitas et al., 2021) introduced graph representations of binary execution. Containing over 1.2 million Android software graphs across 47 types and 696 families, MalNet captures intra-procedural Function Call Graphs (FCGs). This dataset enabled Graph Neural Networks to analyze malicious code based on topological execution patterns rather than fragile string literals.

### 2. Next-generation network and IoT intrusion benchmarks

#### CIC-IoT2023
Published by the Canadian Institute for Cybersecurity, CIC-IoT2023 moved away from simulated workstation LANs to address real IoT topologies. Captured across a physical lab setup of 105 interconnected smart devices (smart home cameras, sensors, microcontrollers, and gateways), the dataset spans 33 distinct attack profiles across seven core categories:
- Distributed Denial of Service (DDoS)
- Denial of Service (DoS)
- Reconnaissance and Scanning
- Web-based Attacks
- Brute Force Authentication
- Protocol Spoofing
- Mirai and Gafgyt Botnet Infiltration

#### Edge-IIoTset (2022) and ToN_IoT (2020)
Developed to benchmark edge computing and Industrial IoT (IIoT), Edge-IIoTset (Ferrag et al., 2022) and ToN_IoT (UNSW Canberra Cyber) provide multi-tier telemetry. Instead of capturing only network packets, these datasets simultaneously record:
- Telemetry from Modbus, MQTT, and BACnet industrial protocols.
- System activity metrics (CPU utilization, memory allocation, active sockets) from edge gateways.
- Operating system event logs from Linux and Windows server nodes.

#### Standardized NetFlow feature suites (NF-UNSW-NB15-v2, NF-CSE-CIC-IDS2018-v2)
One of the main frustrations identified in Berman et al.'s 2019 survey was that every dataset used different feature definitions, preventing cross-dataset comparisons. 

In 2021 and 2022, Mohanad Sarhan, Siamak Layeghy, and Marius Portmann resolved this by releasing standardized NetFlow versions of major benchmarks. Using nprobe and standardized flow definitions, the team converted UNSW-NB15, BoT-IoT, ToN-IoT, and CSE-CIC-IDS2018 into a shared 43-feature NetFlow format (known as the NF-v2 suite). For the first time, researchers could train a model on one dataset and immediately test its cross-domain generalization on another without modifying input layers.

### 3. Kernel provenance and system call telemetry

#### BETH dataset (2021)
When attackers establish a foothold on a server, they often avoid noisy network transmissions. Instead, they live off the land, executing native system binaries and modifying memory. 

The BETH dataset (Highnam et al., 2021) tackled this by recording kernel-level behavior using extended Berkeley Packet Filters (eBPF). Deployed across 23 honeypot hosts on AWS, BETH recorded more than eight million low-level operating system events:
- Process creation and thread cloning (`sys_clone`, `sys_fork`).
- Memory mappings and executable page creation (`sys_mprotect`).
- File descriptor modifications and socket bindings.

Because BETH provides uncorrupted, real-world attacker attempts against cloud infrastructure, it has become the standard benchmark for unsupervised, out-of-distribution anomaly detection.

#### DARPA Transparent Computing (TC) provenance benchmarks
The DARPA Transparent Computing program released massive whole-system provenance datasets (including CADETS, THEIA, TRACE, and ClearScope). Provenance data models operating system execution as a directed, acyclic graph where nodes represent processes, files, and network sockets, while directed edges represent system calls (`execve`, `read`, `write`, `connect`). 

DARPA TC datasets record multi-stage Advanced Persistent Threat (APT) campaigns conducted by military red teams, providing the foundational benchmark for causal intrusion analysis.

```
+---------------------------------------------------------------------------------------------+
|                           Comparative Matrix of Modern Benchmarks                            |
+-------------------+------+--------------------+--------------------+------------------------+
| Dataset           | Year | Primary Domain     | Modality / Size    | Key Innovation         |
+-------------------+------+--------------------+--------------------+------------------------+
| KDD Cup 99        | 1999 | Network IDS        | 4.9M CSV Records   | Historical baseline    |
| EMBER             | 2018 | Windows PE Malware | 1.1M Static Vectors| Vectorized PE format   |
| SOREL-20M         | 2020 | Windows PE Malware | 20M PE / 10M Bin   | Disarmed binaries scale|
| BODMAS            | 2021 | Windows PE Malware | 134K Time-stamped  | Concept drift tracking |
| BETH              | 2021 | Host Anomaly (eBPF)| 8M Kernel Events   | Kernel syscall tracing |
| Sarhan NF-v2      | 2022 | Network IDS        | 43 Unified Features| Cross-dataset transfer |
| CIC-IoT2023       | 2023 | IoT Network IDS    | 105 Devices, 33 Atk| Physical IoT topology  |
| DARPA TC          | 2020 | Enterprise APT     | Millions of Nodes  | Whole-system provenance|
+-------------------+------+--------------------+--------------------+------------------------+
```

Rich, causal telemetry solved the data problem, but it created an architectural bottleneck that standard feedforward neural networks could not process.

## Architectural evolution: from autoencoders to provenance GNNs and foundation models

Processing causal graphs and high-dimensional sequence streams forced the security community to replace autoencoders and basic CNNs with two distinct model families.

### 1. Graph Neural Networks on provenance graphs

In a traditional intrusion detection system, an event is treated as an isolated row in a feature matrix:

```
Row 412: [Duration=0.4s, Protocol=TCP, SrcPort=443, DstPort=51234, Bytes=1420]
```

Advanced persistent threats do not operate in single rows. An attacker lands via a phishing document, spawns a PowerShell child process, executes an in-memory reflective DLL injection, queries the local Active Directory domain controller, and stages encrypted archives across multiple days.

Graph Neural Networks (GNNs) analyze this behavior by constructing dynamic provenance graphs where causality is preserved.

```
[Phishing PDF] --(executes)--> [Acrobat.exe]
                                     |
                                 (spawns)
                                     v
[powershell.exe] --(injects)--> [rundll32.exe]
                                     |
                                 (connects)
                                     v
[External C2 Socket: 198.51.100.24:443]
```

Modern systems like Unicorn (Han et al., NDSS 2020), ProvGNN, and ThreaTrace run message passing over these heterogeneous graphs. Each node $$v$$ with feature vector $$h_v^{(0)}$$ iteratively updates its hidden representation by aggregating the representations of its incoming causal neighbors $$u \in \mathcal{N}(v)$$:

$$
h_v^{(k)} = \sigma \left( W^{(k)} \cdot \text{AGGREGATE} \left( \left\{ h_u^{(k-1)} : u \in \mathcal{N}(v) \right\} \right) + B^{(k)} h_v^{(k-1)} \right)
$$

Because Graph Neural Networks evaluate the topological path rather than the isolated process name, an attacker cannot evade detection simply by renaming their malicious binary to `svchost.exe`. If a process named `svchost.exe` was spawned by Microsoft Excel and proceeded to open an outbound socket to an unknown IP, the GNN identifies the anomalous causal subgraph immediately.

### 2. Cybersecurity foundation models and code LLMs

The second major architectural transition occurred with the arrival of Transformer-based foundation models. Language models in cybersecurity split into three operational roles:

#### Threat intelligence extraction (SecBERT, SecureBERT)
Security operations teams are inundated with unstructured natural language reports: vendor threat advisories, CVE entries, paste sites, and dark web forums. Models like SecBERT and SecureBERT (fine-tuned BERT architectures trained on security corpora) perform automated Named Entity Recognition (NER). They ingest unstructured security articles and extract:
- Attack techniques mapped directly to the MITRE ATT&CK framework.
- Indicators of Compromise (IoCs) including file hashes, C2 IP addresses, and registry paths.
- Targeted vulnerabilities (CVE IDs) and associated software dependencies.

#### Vulnerability discovery and decompilation
Transformer architectures pre-trained on source code and disassembly (such as CodeLlama, StarCoder, and DeepSeek-Coder) shifted binary analysis. By fine-tuning these models on curated vulnerability datasets like Big-Vul (Fan et al., 2020) and DiverseVul (Chen et al., 2023), models can identify buffer overflows, use-after-free conditions, and injection flaws directly from abstract syntax trees or decompiled C output.

In reverse engineering, transformer models integrated with tools like Ghidra and IDA Pro infer variable names, reconstruct function signatures, and generate human-readable summaries of stripped assembly routines.

#### Frontier defensive agents and evaluation benchmarks
Industrial deployments have evolved into interactive security agents, such as Google Cloud's Sec-PaLM 2 (powering the Security AI Workbench) and Microsoft Security Copilot. These models combine domain-tuned foundation models with live security APIs to synthesize alert chains, explain complex PowerShell commands, and generate incident response playbooks in real time.

To evaluate these models rigorously, Meta's Purple Llama team released the CyberSecEval benchmark series (running from CyberSecEval 1 through CyberSecEval 4). CyberSecEval benchmarks models across critical risks:
- Susceptibility to generating exploitable code.
- Resistance to jailbreaking and prompt injection.
- Automated vulnerability exploitation and autonomous patching capability.
- False positive refusal rates when handling dual-use administrative tasks.

These advanced architectures reveal that defensive deep learning is no longer a standalone classifier, but a multi-tiered pipeline linking host telemetry, graph causality, and reasoning models.

## The modern blueprint for deep learning defense

Linking host telemetry, graph causality, and reasoning models forms the working architecture of contemporary defensive engineering.

Rather than relying on a single neural network to catch all threats, modern enterprise detection pipelines deploy a three-tier defensive stack.

```
+-------------------------------------------------------------------------+
|                  Modern Three-Tier Machine Learning SOC                 |
+-------------------------------------------------------------------------+
|                                                                         |
|  [ Tier 1: Line-Rate Ingestion & Filtering ]                            |
|  Data: Raw Packets, NetFlow v2, eBPF Events                             |
|  Models: Streaming Hash Embeddings, Lightweight GBDT / 1D-CNN           |
|  Latency: < 1 millisecond                                               |
|  Action: Drops 99% of normal traffic, passes anomalies to Tier 2        |
|                                                                         |
|                                    v                                    |
|                                                                         |
|  [ Tier 2: Structural Graph & Provenance Correlation ]                  |
|  Data: Dynamic System Provenance Graphs (eBPF / Sysmon)                 |
|  Models: Heterogeneous Graph Neural Networks (GNNs)                     |
|  Window: 1 hour to 30 days of causal lineage                            |
|  Action: Identifies multi-stage lateral movement & living-off-the-land  |
|                                                                         |
|                                    v                                    |
|                                                                         |
|  [ Tier 3: Reasoning & Incident Remediation ]                           |
|  Data: Correlated Attack Subgraphs & CTI Logs                           |
|  Models: Security Foundation Models (Sec-PaLM 2, SecBERT, Code LLMs)    |
|  Action: MITRE ATT&CK Mapping, Triage Summary, Automated Containment     |
|                                                                         |
+-------------------------------------------------------------------------+
```

### The operational layers

1. **Tier 1: High-throughput event filtering:** Evaluates high-volume traffic (such as streaming NetFlow records and raw kernel events) at line rate. Lightweight gradient boosted decision trees or quantized 1D CNNs filter out 99 percent of verified benign traffic, preventing downstream systems from drowning in data.
2. **Tier 2: Causal graph correlation:** Incoming anomalies are projected into a streaming provenance graph. Graph Neural Networks evaluate process lineage, socket creations, and file system mutations across hours or days, isolating multi-stage attack subgraphs while suppressing isolated false positives.
3. **Tier 3: Contextual reasoning and triage:** High-confidence malicious subgraphs are handed to domain-tuned foundation models. The language model translates the complex provenance graph into a plain narrative for human analysts, maps the indicators to MITRE ATT&CK techniques, verifies the code vulnerability, and suggests containment commands.

### The challenges that remain

Even with modern datasets and graph architectures, critical failure modes persist:

- **Adversarial evasion:** Attackers can perturb network packet timing, insert benign API calls into malware binaries, or alter padding bytes to evade neural feature extractors without breaking payload functionality.
- **Concept drift and retraining latency:** As demonstrated by the BODMAS benchmarks, a model's predictive power decays steadily as new threat campaigns emerge. Production pipelines require continuous automated retraining with active learning loops.
- **Model hallucinations in high-stakes actions:** While generative models excel at summarizing alerts, letting an autonomous LLM execute firewall changes or terminate critical enterprise database processes introduces severe availability risks.

The twenty-five-year journey from KDD99 to modern foundation models fundamentally reshaped how the industry views artificial intelligence in cybersecurity. Real security is not a single classifier scoring isolated tabular records; it is the continuous analysis of relational causality across entire systems.
