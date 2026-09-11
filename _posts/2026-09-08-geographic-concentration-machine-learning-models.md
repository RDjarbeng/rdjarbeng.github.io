---
layout: post
title: "Geographic Concentration of Machine Learning Models: How Compute Economics Re-Engineered the AI Map"
date: 2026-09-08T16:00:00Z
published: true
author: Richard
category: Technology
tags:
  - Artificial Intelligence
  - Machine Learning
  - Compute
  - Geopolitics
  - Epoch AI
  - Stanford AI Index
image: /assets/images/posts/covers/geographic-concentration-ml-models-cover.jpg
image_alt: "Editorial illustration of a tipped balance scale showing massive compute clusters outweighing a tiny solitary chip"
card_items:
  - name: "Training Compute FLOPs"
    badge_1: "Hardware Scale"
    badge_2: "Exponential Growth"
    url: "https://epochai.org"
    link_text: "Explore Dataset"
    description: "Cumulative floating point operations expended during model training, growing from $$10^{18}$$ FLOPs in 2012 to over $$10^{26}$$ FLOPs in modern frontier systems."
  - name: "Chinchilla Optimal Scaling"
    badge_1: "Parametric Math"
    badge_2: "C ≈ 6ND"
    url: "https://arxiv.org/abs/2203.15556"
    link_text: "Read Scaling Paper"
    description: "Hoffmann et al. formulation demonstrating that compute-optimal training requires scaling model parameters and training dataset tokens in equal proportion."
  - name: "Sovereign Compute Infrastructure"
    badge_1: "Geopolitics"
    badge_2: "Capital Concentration"
    url: "https://aiindex.stanford.edu/report/"
    link_text: "View 2024 AI Index"
    description: "National and regional investments in high-bandwidth GPU clusters to counter bilateral dominance and secure autonomous foundational AI capability."
---

Look at a global map of machine learning breakthroughs over the last twenty years, and the most striking feature is not what is visible, but what is missing. Out of 149 notable foundation models tracked globally in the 2024 Stanford AI Index Report, the United States originated 61 and China produced 15. The entire European Union accounted for 21 systems, the United Kingdom produced 4, and vast swathes of Latin America, Africa, and Southeast Asia recorded zero. This distribution represents an extreme consolidation: intelligence research, once conducted in university laboratories scattered across dozens of countries, has narrowed into a geographic duopoly. The cause of this divide is not a shortage of global talent; it is the physical and economic reality of modern compute. Building frontier artificial intelligence now requires multi-megawatt electrical substations, specialized semiconductor clusters, and capital budgets crossing hundreds of millions of dollars. Here is how compute economics redrew the map of machine learning, the mathematical laws that forced that concentration, and how shut-out nations are fighting to claw their way back onto the board.

![The Compute Divide Cover](/assets/images/posts/covers/geographic-concentration-ml-models-cover.jpg)

## The disappearance of the academic map

That stark map did not always look like an industrial fortress. Prior to 2012, machine learning research was distributed across a collaborative network of public university laboratories. Breakthroughs occurred wherever mathematicians and computer scientists developed novel statistical ideas: neural probabilistic language models at Université de Montréal, deep belief networks at the University of Toronto, multi-column convolutional networks at IDSIA in Lugano, and statistical learning theory at INRIA in France.

The common denominator across all these institutions was the humble desktop workstation. Experiments ran on standard Intel CPUs and modest departmental server racks. A typical training run consumed less than $$10^{15}$$ floating point operations (FLOPs), cost a few hundred dollars in grid electricity, and was financed through routine government research grants. Because the computational threshold was low, any university with an internet connection and skilled researchers could produce world-class machine learning models. Over 80 percent of notable machine learning systems developed before 2012 originated in public academia.

```
Pre-2012: Polycentric Academic Network
  [Montreal] <---> [Toronto] <---> [Lugano] <---> [Paris] <---> [Tokyo]
  - Workstations: 1-4 CPUs/GPUs
  - Budget: Thousands of dollars
  - Barrier: Algorithmic ingenuity

Post-2017: Industrial Duopoly
  [Silicon Valley / Seattle] <==================> [Beijing / Shenzhen]
  - Mega-clusters: 10,000 to 100,000 GPUs
  - Budget: Tens to hundreds of millions of dollars
  - Barrier: Multi-megawatt power, silicon supply, liquid cooling
```

That polycentric academic equilibrium shattered once empirical results proved that model capability scaled directly with raw hardware throughput. By 2014, corporate laboratories matched university output in notable models for the first time. By 2022, the academic share collapsed to single digits: industry laboratories produced 32 notable models, while pure academia managed only 3. In 2023, corporate industry built 51 notable models, joint industry-academic consortia produced 21, and universities acting alone managed only 15.

![Figure 2: Number of notable machine learning models by geographic area, 2003 to 2023](/assets/images/posts/notable-ml-models-by-geographic-area-2003-2023.png)
*Figure 2: Number of notable machine learning models by geographic area, 2003 to 2023. Data source: Epoch AI and the Stanford Institute for Human-Centered Artificial Intelligence 2024 AI Index Report.*

The map above, compiled by Epoch AI and published in the Stanford 2024 AI Index Report, illustrates the outcome of that migration. The United States accounts for roughly 430 cumulative notable models from 2003 to 2023. China forms the second major cluster with approximately 85 models. The rest of the world appears in faint shades or blank outlines. 

When a single training run costs tens of millions of dollars, standard university grants of 500,000 dollars cannot buy a seat at the table. Academic talent migrated to the private corporations that owned the hardware, and the map followed the money. Yet money alone does not explain why the barrier grew so rapidly; to understand why frontier research fled the university campus, one must look at the mathematical formula that governs training compute.

## The iron mathematical law of compute

That migration from global universities to two corporate corridors was driven by a single mathematical formula that dictates the cost of neural capability. When researchers design a modern language model, they cannot simply program smarter reasoning shortcuts. Autoregressive transformers learn statistical relationships through sheer matrix arithmetic, and the compute budget required to train them follows a strict accounting relation:

$$
C \approx 6 N D
$$

In this formulation, $$C$$ represents the total floating point operations (FLOPs) required for training, $$N$$ is the count of model parameters (excluding vocabulary embeddings), and $$D$$ is the volume of training tokens processed. 

To grasp why this simple equation warped the global map, consider the physical arithmetic an accelerator must execute for every single token:

1. **The Forward Pass ($$2 N$$ FLOPs per token)**:
   In every linear transformer layer, an input token vector multiplies against weight matrix $$W$$. Each element requires one multiplication and one addition, meaning every parameter performs 2 FLOPs per token. Processing a token through all self-attention projections and feed-forward blocks yields:
   $$
   \text{FLOPs}_{\text{forward}} \approx 2 N
   $$

2. **The Backward Pass ($$4 N$$ FLOPs per token)**:
   During backpropagation, the accelerator must calculate two distinct gradients. First, it computes gradients with respect to activations to propagate error signals backward through the layers ($$2 N$$ FLOPs). Second, it calculates gradients with respect to the weights to update model parameters ($$2 N$$ FLOPs). The backward pass requires twice the arithmetic of the forward pass:
   $$
   \text{FLOPs}_{\text{backward}} \approx 4 N
   $$

3. **The Total Operational Cost**:
   Adding both passes together gives $$(2 N + 4 N) = 6 N$$ operations per token. Across an entire dataset of $$D$$ tokens, the complete training expenditure equals $$6 N D$$. When intermediate activations exceed high-bandwidth memory, engineers use activation checkpointing to recompute activations on the fly, pushing that total up to approximately $$8 N D$$.

```
The Mathematical Escalation of Frontier Training:
  GPT-2 (2019):    1.5B params  ×   40B tokens   -->   ~3.6 × 10^20 FLOPs
  GPT-3 (2020):    175B params  ×  300B tokens   -->   ~3.1 × 10^23 FLOPs
  Llama 2 (2023):   70B params  ×    2T tokens   -->   ~8.4 × 10^24 FLOPs
  Llama 3 (2024):  405B params  ×   15T tokens   -->   ~3.6 × 10^26 FLOPs
```

Notice what happens when you substitute modern numbers into this equation. A model with 70 billion parameters trained on 15 trillion tokens requires:

$$
C \approx 6 \times (70 \times 10^9) \times (15 \times 10^{12}) \approx 6.3 \times 10^{24} \text{ FLOPs}
$$

A frontier model with 405 billion parameters trained on that same dataset demands over $$3.6 \times 10^{26}$$ FLOPs. 

That arithmetic barrier hardened further in 2022 when DeepMind published the Chinchilla scaling laws (Hoffmann et al.). Earlier work by Kaplan et al. in 2020 had suggested that parameter count $$N$$ should grow faster than dataset size $$D$$ ($$N \propto C^{0.73}$$, while $$D \propto C^{0.27}$$). That guidance led teams to build oversized models trained on relatively small token volumes, such as GPT-3 (175 billion parameters on 300 billion tokens). 

Hoffmann and colleagues showed that this approach was wasteful. To achieve compute-optimal training, parameters and tokens must scale in equal 1:1 proportion:

$$
N \propto C^{0.5}, \quad D \propto C^{0.5}
$$

Under this optimal ratio ($$D / N \approx 20$$), every doubling of parameter scale demands a doubling of training data. Subsequent inference-optimized models, like Meta's Llama series, pushed token-to-parameter ratios past 200:1 to minimize deployment latency, driving token counts from 2 trillion to 15 trillion.

When an organization decides to train a frontier system, the $$6 N D$$ equation presents a non-negotiable physical bill. You cannot pay that bill over fifty years on a university cluster; competitive research requires training to complete in two to three months. Delivering $$10^{26}$$ FLOPs within ninety days requires tens of thousands of modern accelerators running in uninterrupted synchronization. That mathematical requirement transformed artificial intelligence into a heavy capital industry anchored to specialized physical terrain.

## Megawatts, cold plates, and balance sheets

That mathematical requirement of tens of thousands of accelerators running in synchronization transforms abstract code into massive industrial infrastructure. You cannot distribute a 25,000-GPU training cluster across fifty regional university basements. Frontier training relies on synchronous stochastic gradient descent, where thousands of chips must exchange parameter updates every few milliseconds. If high-bandwidth interconnects or electrical grids fail, the entire cluster halts.

The financial bill of materials for such an installation explains why only a handful of corporate entities can build them:

| Hardware Component | Scale per Cluster | Unit Cost | Total Component Cost |
| :--- | :--- | :--- | :--- |
| **Nvidia H100/H200 SXM5 GPUs** | 24,576 units | 30,000 to 40,000 dollars | 737M to 983M dollars |
| **High-Bandwidth Memory (HBM3e)** | 80 to 141 GB per GPU | 15 to 25 dollars per GB | Included in board cost |
| **Intra-Node Switches (NVLink 4.0)** | 900 GB/s bidirectional per GPU | Custom silicon | ~50M dollars |
| **Scale-Out Network (InfiniBand/Spectrum-X)** | 400G/800G optical transceivers, director switches | 1,500 to 2,500 dollars per port | 80M to 150M dollars |
| **Power Distribution and Liquid Cooling** | Multi-megawatt chillers, cold plates | Industrial utility grade | 100M to 200M dollars |
| **Total Facility Capital Investment** | Single dedicated campus | Complete turnkey facility | **1.0B to 1.5B dollars** |

This hardware scale creates severe thermal and electrical constraints. A conventional enterprise datacenter rack draws 5 to 10 kilowatts of electricity using chilled air cooling. An 8-GPU Nvidia HGX chassis draws 10.2 kilowatts on its own, pushing high-density racks to 40 to 60 kilowatts. The newer Nvidia GB200 NVL72 rack, which integrates 72 Blackwell GPUs across a unified NVLink spine, draws up to 140 kilowatts in a single footprint. Air cannot remove this heat density; facilities must circulate chilled liquid coolant through direct-to-chip copper cold plates.

```
Cluster Power Escalation:
  10,000 H100 GPUs:    ~12 MW chip power   -->   ~15 to 18 MW facility load (PUE 1.2)
  50,000 H100 GPUs:    ~60 MW chip power   -->   ~75 to 90 MW facility load
 100,000 B200 GPUs:   ~120 MW chip power   -->  ~150 to 180 MW facility load
```

At the campus scale, a cluster housing 50,000 modern accelerators demands roughly 75 to 90 megawatts of continuous power. A planned 100,000-accelerator installation approaches 150 to 180 megawatts, equivalent to the electrical consumption of a city of 150,000 homes.

Grid access has become the ultimate geographical filter. In major American transmission regions like PJM in the mid-Atlantic, ERCOT in Texas, and CAISO in California, electrical utilities face interconnect queues of four to seven years to supply new high-voltage substations. In Europe, municipal authorities in Dublin, Amsterdam, and Frankfurt have enacted moratoriums on new datacenter power links to safeguard municipal grids.

To bypass public grid bottlenecks, American hyperscalers have started purchasing dedicated power directly from nuclear generating stations:

- **Microsoft**: Signed a 20-year power purchase agreement with Constellation Energy to restore the 835-megawatt Unit 1 nuclear reactor at Three Mile Island in Pennsylvania (rechristened the Crane Clean Energy Center).
- **Amazon Web Services**: Acquired the 960-megawatt Cumulus datacenter campus connected directly to the Susquehanna nuclear power station in Pennsylvania.
- **Google**: Contracted with Kairos Power to commission 500 megawatts of electricity across seven Small Modular Reactors by 2035.

When building a frontier model demands hundreds of megawatts of dedicated nuclear power and 1 billion dollars in specialized silicon, development naturally concentrates where capital markets are deep and balance sheets are massive. Microsoft, Alphabet, Amazon, and Meta each invest 30 billion to 50 billion dollars annually in capital expenditures. Outside the United States and China, almost no corporation or government entity commands equivalent reserves. That concentration of physical power on the ground quickly caught the attention of national governments, turning the compute divide into an explicit tool of statecraft.

## Geopolitical borders and the fight for sovereign compute

That concentration of physical power caught the attention of national governments because modern compute is not just an economic asset; it is the technological foundation of national defense, intelligence analysis, and economic productivity. When the United States realized that over 75 percent of frontier compute was stationed on its soil and that China commanded roughly 15 percent, compute clusters ceased to be viewed merely as corporate data hubs. They became instruments of state power.

To maintain its lead and freeze the geographic divide in place, the United States Department of Commerce Bureau of Industry and Security (BIS) turned export controls into a strategic lever:

1. **The October 2022 Controls**: The BIS banned the export of high-end accelerators (Nvidia A100 and H100) to China based on interconnect bandwidth thresholds (600 GB/s) and raw computational throughput. The Foreign Direct Product Rules prohibited foundries worldwide, including TSMC in Taiwan, from manufacturing chips designed by Chinese entities if American software or equipment was used.
2. **The October 2023 Revisions**: When Nvidia designed compliance chips for China (the A800 and H800 with interconnect speeds throttled to 400 GB/s), the BIS revised its rules. It introduced performance density metrics ($$\text{TPP} / \text{die area}$$) that banned the A800, H800, L40S, and even the high-end consumer GeForce RTX 4090.

These measures aimed to prevent rival nations from assembling the massive, tightly synchronized clusters required by the $$6 N D$$ scaling law. China responded with state-backed semiconductor self-reliance initiatives:

- **Domestic Fabrication**: Semiconductor Manufacturing International Corporation (SMIC) utilized multi-patterning Deep Ultraviolet (DUV) immersion lithography to manufacture Huawei Ascend 910B processors at a 7-nanometer equivalent node, bypassing Western export restrictions.
- **Hardware Yields and Software Moats**: While the Ascend 910B delivers approximately 70 to 80 percent of Nvidia A100 performance in FP16 matrix operations, SMIC faces lower wafer yields (estimated at 30 to 50 percent versus TSMC's greater than 90 percent), significantly raising production expenses. Furthermore, Huawei's CANN software ecosystem requires ongoing engineering labor to match Nvidia's CUDA developer foundation.
- **Topological Compensation**: Unable to obtain high-density monolithic accelerators, Chinese cloud operators construct larger clusters with custom communication topologies to offset per-chip bandwidth deficits.

For the rest of the world, seeing the map partitioned between two powers prompted an urgent response. Nations realized that depending entirely on American cloud APIs meant surrendering data sovereignty, cultural nuance, and technological autonomy. This sparked a wave of government-backed "Sovereign AI" programs:

- **France**: Emerged as Europe's leading artificial intelligence hub through Mistral AI, founded in Paris and backed by European capital to build independent foundation models like Mixtral 8x7B. French institutions also funded Kyutai, which developed the Moshi real-time voice model.
- **United Kingdom**: Allocated 300 million pounds through the AI Research Resource to construct Isambard-AI at the University of Bristol, deploying 5,448 Nvidia GH200 Grace Hopper superchips alongside the Dawn supercomputer at Cambridge.
- **United Arab Emirates**: The Technology Innovation Institute (TII) in Abu Dhabi funded the Falcon model family (Falcon 7B, 40B, and 180B), while state-backed conglomerate G42 partnered with Microsoft to build regional cloud infrastructure.
- **Japan**: The Ministry of Economy, Trade, and Industry provided substantial subsidies to Sakura Internet and SoftBank to construct domestic GPU clusters and develop localized Japanese language models.
- **European Union**: The EuroHPC Joint Undertaking established the AI Factories initiative, deploying dedicated GPU partitions across supercomputers like LUMI in Finland, Leonardo in Italy, and MareNostrum 5 in Spain.

These sovereign investments allow medium-sized nations to claim localized territory on the map. Yet building a national cluster of 5,000 GPUs does not match the 100,000-GPU mega-datacenters operating in the United States and China. To bridge that gap, researchers outside the dominant centers turned to architectural efficiency to compete without equivalent hardware budgets.

## Architectural efficiency as an equalizing force

That hardware disparity forced researchers outside the dominant compute centers to pursue architectural efficiency rather than brute force scaling. If a laboratory cannot afford a 100-million-dollar training run or a 50-megawatt datacenter, its only path to competitive capability is algorithmic ingenuity. Several targeted innovations have emerged to level the playing field:

```
Brute Force Dense Scaling (Hyperscale Path)
  [Every token activates 100% of parameters]
  - Massive compute demand ($$C \approx 6ND$$)
  - Requires 25,000+ synchronized GPUs
  - Heavily centralized in mega-datacenters

Sparse Mixture of Experts & Efficiency (Decentralized Path)
  [Tokens routed only to specialized sub-networks]
  - Example: Mixtral 8x7B activates 12.9B of 46.7B total parameters
  - FlashAttention cuts memory IO from $$O(S^2)$$ to $$O(S)$$
  - FP8/FP4 quantization doubles arithmetic throughput per watt
```

1. **Sparse Mixture of Experts (MoE)**:
   In a standard dense transformer, every token activates 100 percent of the model parameters. Mixture of Experts architectures replace dense feed-forward layers with multiple specialized subnetworks, using a learned gating router to direct each token to a small subset of experts. Mistral AI demonstrated the power of this approach with Mixtral 8x7B: the model contains 46.7 billion total parameters, but only 12.9 billion active parameters are evaluated per token. This delivers the reasoning capability of a much larger model at the operational cost and latency of a smaller architecture.

2. **Memory Hierarchy Optimization (FlashAttention)**:
   Hardware throughput is frequently constrained not by raw compute capability, but by the memory bandwidth wall. Modern accelerators process math far faster than High Bandwidth Memory can transfer weights and activations. Tri Dao's FlashAttention addresses this bottleneck by tiling attention matrices directly into the GPU's small on-chip SRAM cache. By calculating softmax normalization incrementally without writing the full $$S \times S$$ attention matrix back to global memory, FlashAttention cuts memory transfers from $$O(S^2)$$ to $$O(S)$$, accelerating attention layers by two to four times.

3. **Numerical Precision Compression**:
   Moving from 16-bit floating point formats (FP16/BF16) to 8-bit (FP8) and 4-bit (FP4) numerical precision doubles or quadruples matrix throughput on newer Tensor Cores while cutting memory footprint in half. Techniques like AWQ, GPTQ, and bitsandbytes enable researchers to run inference and fine-tuning on consumer-grade hardware that previously required multi-node cloud clusters.

4. **Open-Weights Distribution**:
   Open-weights releases have become the most effective counterweight to geographic centralization. When Meta open-sourced Llama, and international labs like Mistral in France, Alibaba with Qwen in China, and DeepSeek published weights openly, they decoupled model utilization from model pre-training. An engineer in Nairobi, Warsaw, or Singapore does not need 100 million dollars to pre-train a foundation model from scratch; they can download an open-weights checkpoint and fine-tune it on localized data using parameter-efficient methods like LoRA on a single workstation.

However, a persistent proposal suggests that open-source communities could completely decentralize foundation model pre-training across millions of consumer gaming PCs over the internet, similar to SETI@home or Folding@home. Network physics proves why this remains impossible for frontier pre-training:

| Architectural Metric | Datacenter Interconnect Fabric | Consumer Broadband Internet | Performance Mismatch |
| :--- | :--- | :--- | :--- |
| **Network Fabric** | Nvidia NVLink 4.0 / InfiniBand Quantum-2 | TCP/IP over Public Internet | Completely different protocols |
| **Node-to-Node Latency** | Less than 2 microseconds | 20 to 80 milliseconds (ping) | 10,000x to 40,000x slower |
| **Bidirectional Bandwidth** | 400 Gbps to 900 GB/s | 20 to 100 Mbps (residential upload) | 4,000x to 36,000x narrower |
| **Packet Reliability** | Zero-loss fabric (PFC, ECN) | Variable packet loss (0.5% to 3%) | Causes pipeline stalls |
| **Parallel Execution** | Synchronous Stochastic Gradient Descent | Asynchronous / Gossip protocols | High risk of gradient divergence |

Large-scale pre-training requires all nodes to synchronize gradients after every step. In a datacenter connected by InfiniBand or NVLink, this synchronization finishes in microseconds. Over residential internet, waiting for 10,000 consumer GPUs with 50-millisecond latency causes accelerators to spend 99 percent of their cycles idling. 

While decentralized frameworks like Petals work well for distributed inference and fine-tuning, training a frontier model from scratch requires high-bandwidth physical proximity. Architectural efficiency and open weights allow the world to run, adapt, and deploy intelligence locally, but the creation of new frontier foundations remains bound to the physical clusters that command the map.

## The future geometry of the compute map

The geographic concentration of machine learning models is neither an accident of geography nor a temporary market anomaly. It is the direct consequence of physical and economic laws. As long as neural capability demands exponential increases in training compute ($$C \approx 6 N D$$), and as long as synchronous gradient descent requires microsecond interconnect latency, frontier model creation will concentrate wherever capital, silicon, and electricity converge.

The global compute map has crystallized into three distinct layers:

1. **The American Hyperscale Core**: Microsoft, Alphabet, Amazon, and Meta, backed by deep capital markets and private nuclear energy partnerships, operating 50,000 to 100,000+ GPU supercomputers.
2. **The Chinese Industrial Alternative**: A state-subsidized ecosystem utilizing domestic SMIC fabrication, Huawei Ascend hardware, and custom network topologies to maintain sovereign frontier capability under trade sanctions.
3. **The Sovereign and Open-Weights Perimeter**: Regional powers (France, the UK, Japan, UAE) funding national clusters to safeguard strategic autonomy, while global developers leverage open-weights models (Llama, Mistral, Qwen) and algorithmic efficiencies like MoE to build advanced systems without paying the frontier pre-training bill.

For developers, policymakers, and researchers navigating this landscape, three primary resources provide essential tracking of this compute divide:

- **Historical Compute Tracking**: The [Epoch AI Notable AI Models Database](https://epochai.org/data/notable-ai-models) documents hardware allocations and training FLOP counts for every major model since the birth of the field.
- **Global Industry Data**: The [Stanford AI Index Report](https://aiindex.stanford.edu/report/) provides annual data on national investments, private sector consolidation, and model origins.
- **Foundational Scaling Literature**: Hoffmann et al. formulate the mathematical relationship between parameters, tokens, and compute in [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556).

Intelligence as mathematical theory can be written anywhere on a sheet of paper. But intelligence trained at frontier scale requires the power output of nuclear reactors, billions of dollars in silicon, and square miles of industrial datacenters. Until a fundamental algorithmic shift breaks the dependency on brute force scaling, the geographic borders of artificial intelligence will remain drawn by the physics of compute.
