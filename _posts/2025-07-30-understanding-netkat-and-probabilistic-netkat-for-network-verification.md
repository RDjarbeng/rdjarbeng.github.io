---
date: 2025-07-30T11:19:00
published: false
author: Richard
categories:
  - Technology
tags:
  - NetKAT
  - CMMRS
  - Networks
  - Probabilistic NetKAT
  - Network policies
  - Switches
  - Kleene Algebra
title: Understanding NetKAT and Probabilistic NetKAT for Network Verification
image: ''
layout: post
---
Network management has evolved from manual, error-prone configurations to formal, verifiable systems. [NetKAT](https://netkat.org/), a domain-specific language built on Kleene Algebra with Tests (KAT), offers a rigorous way to define and verify network policies. Its probabilistic extension, Probabilistic NetKAT (ProbNetKAT), introduces randomness to model real-world scenarios like load balancing or 5G network slicing. This post explores NetKAT, its probabilistic variant, their applications in cloud and 5G networks, and their significance in modern network verification, based on a detailed discussion of key concepts.

## What Is NetKAT?

NetKAT is a language for specifying, programming, and verifying packet-forwarding networks. Unlike traditional network management, which relies on manually configuring devices like routers and hoping for correct behavior, NetKAT provides a formal, mathematical framework to define network policies and prove their correctness.

### Key Features

- **Algebraic Reasoning**: NetKAT uses KAT to express policies as algebraic expressions, enabling reasoning about packet routing, filtering, or modification. For example, a policy might look like:

 if src_ip = 192.168.1.1 then drop else forward(port=2)

This drops packets from a specific IP and forwards others to port 2.

- **Verification**: Tools like [KATch](https://github.com/netkat-lang/katch) use symbolic automata to verify properties like reachability (can packets reach a destination?) or isolation (are network segments restricted?).
- **Extensions**: NetKAT supports probabilistic behaviors (ProbNetKAT), stateful operations (GNetKAT), stack-based protocols (StacKAT), and model checking (McNetKAT), making it versatile for complex networks.

### Why It’s Better Than Traditional Management

Traditional network management involves logging into devices (e.g., via Cisco’s CLI) and manually setting rules, such as:

access-list 101 deny ip 192.168.1.1 0.0.0.0 10.0.0.1 0.0.0.0

This is error-prone, hard to scale, and lacks automated verification. NetKAT abstracts device-specific details, allowing high-level policy definitions and formal proofs of correctness, reducing risks like black holes or security breaches.

**Example**: To ensure guest Wi-Fi (192.168.2.0/24) can’t access internal servers (10.0.0.0/24), a NetKAT policy might be:

if src_ip = 192.168.2.0/24 and dst_ip = 10.0.0.0/24 then drop else forward

KATch verifies this policy network-wide, ensuring no misconfigurations.

## Equivalence Queries in NetKAT

A key insight is that any NetKAT theory (a set of network properties) can be reduced to an _equivalence query_, which checks if two policies produce the same behavior for all packet inputs.

### How It Works

- **Encoding Properties**: Properties like reachability or isolation are expressed as NetKAT policies. For example, to verify that packets from 192.168.1.1 are dropped, you compare the network’s policy \\( Q \\) to an ideal policy \\( P \\):
if src_ip = 192.168.1.1 then drop else forward
- **Verification**: Tools check if \\( P = Q \\), ensuring the network behaves as expected. This leverages KAT’s completeness for equational reasoning.
- **Practical Impact**: Equivalence queries automate verification, eliminating manual testing. For instance, in a data center, you can prove no loops exist without sending test packets.

### Limitations

- **Decidability**: History-free NetKAT policies are decidable, but extensions like stateful NetKAT may complicate verification.
- **Complexity**: Large networks require efficient tools to handle equivalence checks.

## Probabilistic NetKAT: Reasoning with Probabilities

[Probabilistic NetKAT](https://www.cs.cornell.edu/~jnfoster/papers/probnetkat.pdf) extends NetKAT to model randomness, crucial for scenarios like load balancing or unreliable 5G links. Instead of deterministic outcomes, it focuses on probability distributions over packet histories.

### How It Differs

- **Probabilistic Policies**: A policy might specify:
 if src_ip = 192.168.1.1 then (0.7:drop + 0.3:forward(port=2))

This drops 70% of packets from 192.168.1.1 and forwards 30% to port 2.

- **Verification**: ProbNetKAT verifies probabilistic properties, like “the probability of packet loss is below 0.01.” It uses Markov chains or SMT solvers for analysis.

### Why It’s Significant

- **Real-World Relevance**: Networks often involve randomness (e.g., load balancers splitting traffic 60/40 or 5G links with 10% packet loss).
- **Applications**:
- **Cloud**: Model randomized firewall rules to mitigate DDoS attacks while ensuring isolation.
- **5G**: Verify that a telemedicine slice delivers packets with 99% probability within 5ms.

### Connection to Equivalence Queries

ProbNetKAT extends equivalence queries to compare probability distributions. For example, to verify a 5G slice’s latency, you check if the network’s policy matches an ideal policy with the desired probabilistic behavior.

## 5G Network Slicing and Verification

5G network slicing creates virtual networks on shared infrastructure, each tailored to specific needs (e.g., low latency for autonomous vehicles, high bandwidth for streaming). Slices are isolated to ensure security and performance.

### What Is a Slice?

- **Definition**: A slice is a logical network with dedicated resources (bandwidth, compute) and functions (routing, authentication). For example:
- **Emergency Slice**: Low latency for telemedicine (e.g., <5ms delivery).
- **IoT Slice**: Scalable for thousands of sensors.
- **Guest Wi-Fi Slice**: High bandwidth but lower priority.
- **Importance**: Slices enable 5G to support diverse applications on one network, unlike 4G’s one-size-fits-all model.

### Verification Needs

- **Isolation**: Ensure one slice’s traffic doesn’t affect another (e.g., IoT traffic not slowing emergency services).
- **Performance**: Verify QoS, like 99% packet delivery within 5ms for critical slices.
- **Probabilistic Challenges**: Random events (e.g., link failures) require tools like ProbNetKAT to model and verify probabilities.

**Example**: A ProbNetKAT policy for an emergency slice might be:

if slice = emergency then (0.95:forward(port=1) + 0.05:drop) else forward(port=2)

Verification ensures the 95% delivery guarantee holds despite random losses.

## Google’s C++ Implementation for Cloud Isolation

Google’s [C++ Client Libraries](https://cloud.google.com/cpp/docs) likely support verification of cloud isolation, ensuring tenants (e.g., VMs or applications) in a cloud like Google Cloud Platform (GCP) are separated to prevent data leaks.

### Why C++?

- **Performance**: C++’s speed suits large-scale cloud verification, analyzing thousands of firewall rules or VPC configurations quickly.
- **Integration**: Aligns with Google’s infrastructure, supporting real-time checks for authentication or traffic isolation.

### Significance

- **Scalability**: Verifies isolation across massive cloud environments.
- **Security**: Prevents cross-tenant breaches, critical for enterprise 5G use cases (e.g., secure WFH connectivity).
- **NetKAT Connection**: Could use ProbNetKAT to model probabilistic threats (e.g., random packet injection) and verify isolation with high probability.

## Galois’s Haskell Implementation for 5G Slicing

[Galois](https://galois.com/), known for formal verification tools like [Cryptol](https://cryptol.net/) and [SAW](https://saw.galois.com/), uses Haskell to verify secure 5G slicing. This ensures slices meet strict security and QoS requirements.

### Why Haskell?

- **Formal Correctness**: Haskell’s functional paradigm and strong type system (e.g., via [What4](https://github.com/GaloisInc/what4)) ensure verification tools are bug-free.
- **Verification**: Integrates with SMT solvers or Coq to prove properties like inter-slice isolation (e.g., no IoT interference with telemedicine).

### Significance

- **High Assurance**: Critical for 5G applications like autonomous vehicles or healthcare.
- **Probabilistic Verification**: Complements ProbNetKAT by verifying probabilistic properties, like “the probability of slice interference is below 0.001.”
- **Example**: In a hospital 5G network, Galois’s tools might verify that a telemedicine slice is isolated from a guest Wi-Fi slice, using ProbNetKAT policies for probabilistic guarantees.

## Comparing Approaches

- **Google (C++)**: Prioritizes performance for cloud-scale verification, integrating with production systems. Less focus on formal proofs but excels in real-time checks.
- **Galois (Haskell)**: Emphasizes mathematical correctness for high-assurance 5G slicing, ideal for mission-critical applications.
- **NetKAT/ProbNetKAT**: Provides a high-level, algebraic framework for both, unifying policy definition and verification across cloud and 5G.

## Practical Example: Verifying a 5G Slice

Consider a 5G network with an emergency slice for telemedicine:

- **NetKAT Policy**: `if slice = emergency then forward(port=1) else drop`
- **ProbNetKAT Policy**: `if slice = emergency then (0.95:forward(port=1) + 0.05:drop) else forward(port=2)`
- **Verification**:
- **NetKAT**: Use KATch to ensure deterministic isolation (no non-emergency traffic on port 1).
- **ProbNetKAT**: Verify the 95% delivery probability within 5ms, accounting for random link failures.
- **Galois’s Haskell**: Prove inter-slice isolation using SMT solvers.
- **Google’s C++**: Check cloud-hosted 5G core functions for tenant isolation.

## Limitations and Challenges

- **NetKAT**: Steep learning curve due to its algebraic foundation; tooling (e.g., KATch) is less mature than traditional tools like [Wireshark](https://www.wireshark.org/).
- **ProbNetKAT**: Computing probability distributions is computationally expensive; requires accurate models of randomness.
- **Google’s C++**: May miss edge cases without formal proofs.
- **Galois’s Haskell**: Slower than C++ and less adopted in industry.
- **5G Slicing**: Dynamic resource allocation and real-time changes complicate verification.

## Why This Matters

NetKAT and ProbNetKAT replace manual, error-prone network management with formal, verifiable policies. Google’s C++ and Galois’s Haskell implementations show how these ideas apply to real-world challenges:

- **Cloud Isolation**: Ensures secure multi-tenancy in clouds.
- **5G Slicing**: Guarantees performance and security for critical applications.
- **Probabilistic Reasoning**: Handles uncertainty in modern networks, from load balancing to 5G link failures.

By combining high-level policy languages like NetKAT with performance-driven (C++) and correctness-driven (Haskell) tools, we’re moving toward networks that are both efficient and trustworthy.

## Want to Learn More?

- Explore NetKAT at [netkat.org](https://netkat.org/).
- Check out KATch on [GitHub](https://github.com/netkat-lang/katch).
- Read about ProbNetKAT in this [paper](https://www.cs.cornell.edu/~jnfoster/papers/probnetkat.pdf).
- Learn about Google’s C++ libraries at [cloud.google.com](https://cloud.google.com/cpp/docs).
- Discover Galois’s verification tools at [galois.com](https://galois.com/).

_My disclaimer: This post is based on some extra reading I did after attending a lecture on NetKAT at the Cornell-Maryland-Max-PlancK Research School (CMMRS)  after a lecture by Alexandra Silva at the program. This post however is not an authoritative definition as I do not consider myself an expert on NetKAT or Kleene Algebra. _

Hope you enjoyed reading this.
