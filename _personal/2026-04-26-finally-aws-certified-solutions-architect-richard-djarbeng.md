---
title: Finally AWS Certified Solutions Architect- Richard Djarbeng
date: 2026-04-26T17:34:00+02:00
published: true
tags: [AWS, Cloud, Certification]
image: /assets/images/rd/richard_aws_solutions_architect_with_badge_cmmrs.png
image_alt: Richard Djarbeng looking up at a building with an AWS Certified Solutions Architect Associate badge overlaid
layout: personal
card_items:
  - name: "IAM (Identity and Access Management)"
    badge_1: "Security"
    description: "Think of IAM as the digital bouncer of your cloud environment. It strictly controls who (or what) is allowed to access your system and exactly what they are permitted to do once they are inside."
  - name: "High Availability & Multi-AZ"
    badge_1: "Resilience"
    description: "High Availability ensures your app stays online. 'Multi-AZ' means running your servers across multiple separate physical data centers (Availability Zones). If one data center experiences a power outage, the others seamlessly take over."
  - name: "Auto Scaling & Load Balancing"
    badge_1: "Performance"
    description: "**Auto Scaling** automatically adds more servers when your app gets busy and removes them when it's quiet. A **Load Balancer** acts like a traffic cop, evenly distributing users across those servers so none get overwhelmed."
---

Glad to acquire my [Amazon Web Services (AWS)](https://www.linkedin.com/feed/update/urn:li:activity:7450603934706016256/#) Solutions Architect Associate Certification. It took many months of preparation and it was worth it.

![AWS Certified Solutions Architect Associate Badge](/assets/images/rd/aws-certified-solutions-architect-associate_richard_djarbeng_badge.png)

[View the verified credential on Credly](https://www.credly.com/badges/7572e2fe-f26c-4711-9e7d-d439b1fe20b2/public_url)

## Domains tested:

1. Designing Secure Architectures - 30%
2. Designing Resilient Architectures - 26%
3. Designing High-Performing Architectures - 24%
4. Designing Cost-Optimized Architectures - 20%

---

These four domains represent the core pillars of the AWS Certified Solutions Architect – Associate (SAA-C03) exam. Here is a breakdown of what those categories actually mean in the world of cloud engineering:

### 1. Designing Secure Architectures (30%)

**The Goal:** Protect data and infrastructure from unauthorized access.

**What it covers:** Managing permissions through IAM (Identity and Access Management), encrypting data "at rest" (in storage) and "in transit" (moving over the network), and setting up firewalls like Security Groups and Network ACLs.

**Key Question:** "How do we ensure only the right people can see this data?"

### 2. Designing Resilient Architectures (26%)

**The Goal:** Ensure the system stays up even when things break.

**What it covers:** High Availability (HA) and Disaster Recovery (DR). This involves using Multi-AZ (Availability Zone) deployments so that if one data center loses power, another takes over. It also covers using Auto Scaling and Load Balancers to handle hardware failures automatically.

**Key Question:** "If an entire data center goes underwater, will our website still work?"

### 3. Designing High-Performing Architectures (24%)

**The Goal:** Make the system fast, responsive, and scalable.

**What it covers:** Choosing the right "size" for your servers and databases. It focuses on caching (using services like ElastiCache or CloudFront) to speed up delivery and selecting the best storage (SSD vs. HDD) for the specific workload.

**Key Question:** "How do we handle 1 million users at once without the app slowing down?"

### 4. Designing Cost-Optimized Architectures (20%)

**The Goal:** Get the most value for every dollar spent.

**What it covers:** Eliminating "zombie" resources (unused servers), choosing the cheapest storage tier for old data (like S3 Glacier), and using Spot Instances or Savings Plans to get discounts on compute power.

**Key Question:** "Are we paying for more than we actually need?"

## Media mentions

Posted this on LinkedIn and got more attention than I could have expected. It's my most liked post (600+), even the AWS official account commented. Sweet!

<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7450237838882893824?collapsed=1" height="670" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
