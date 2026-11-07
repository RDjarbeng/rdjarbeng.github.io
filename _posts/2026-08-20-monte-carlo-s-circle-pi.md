---
date: 2026-08-21T00:39:00+02:00
published: false
author: Richard
category: Science & Technology
tags:
  - Mathematics
  - Monte Carlo
  - Algorithms
  - Probability
  - Python
  - Simulation
title: "Monte Carlo's Circle: Estimating Pi Through Stochastic Rejection Sampling"
description: A mathematical and computational exploration of estimating Pi using Monte Carlo rejection sampling, analyzing O(1/sqrt(N)) convergence rates and variance bounds.
image: /assets/images/posts/covers/monte_carlo_circle_pi_cover.jpg
image_alt: Geometric diagram of Monte Carlo Pi estimation via rejection sampling in a unit square
layout: post
key_points:
  - Monte Carlo integration approximates the transcendental constant Pi by evaluating the ratio of random uniform points falling inside a quarter-circle inscribed within a unit square.
  - The estimator behaves as a scaled sum of independent Bernoulli random variables with success probability p = Pi / 4.
  - By the Central Limit Theorem, the estimator standard error decays at the rate of O(1 / sqrt(N)), meaning a tenfold error reduction demands a hundredfold increase in sample volume.
  - Quasi-Monte Carlo methods employing deterministic low-discrepancy Sobol sequences break the random sampling bottleneck to accelerate convergence toward O(log N / N).
card_items: []
---
<!-- WRITER NOTE (for the writer only, remove before publishing)
Original draft, kept so you remember where this post was going:

We’re using a Monte Carlo simulation to guess the value of the mathematical constant π (pi).

What is π?
π is the ratio of a circle’s circumference to its diameter. It also appears in the formula for the area of a circle:

\[
\text{Area of a circle} = \pi r^{2}
\]

For a circle of radius 1, the area is simply π.

Why a unit square and a quarter‑circle?

Unit square – we pick random points \((x, y)\) where both \(x\) and \(y\) are between 0 and 1. The square’s area is \(1 \times 1 = 1\).
Quarter‑circle – the part of a circle of radius 1 that lies in the same first‑quadrant region (where \(x \ge 0, y \ge 0\)). Its area is one‑fourth of the full circle’s area:
\[
\text{Area of quarter‑circle} = \frac{\pi \cdot 1^{2}}{4} = \frac{\pi}{4}.
\]

The idea
If we throw a huge number of random points uniformly into the unit square, the fraction of points that land inside the quarter‑circle will be roughly equal to the ratio of the two areas:

\[
\frac{\text{points inside}}{\text{total points}} \approx \frac{\text{area of quarter‑circle}}{\text{area of square}} = \frac{\pi/4}{1} = \frac{\pi}{4}.
\]

Turning the fraction into π
We simply multiply that fraction by 4:

\[
\pi_{\text{estimate}} = 4 \times \frac{\text{inside count}}{\text{total count}}.
\]

The more points we sample, the closer the estimate gets to the true value of π (≈ 3.14159).

What the plot shows

Red points → inside the quarter‑circle.

Blue points → outside the circle but still inside the square.


The visual density of red vs. blue gives a quick sense of the ratio, but the actual numeric estimate comes from the counts, not from looking at the picture.

END WRITER NOTE -->

Monte Carlo methods estimate deterministic mathematical quantities through repeated random sampling. Named by Stanislaw Ulam and John von Neumann after the famed Monaco casino, these stochastic algorithms power modern computational physics, quantitative finance, and Bayesian machine learning.

The classic canonical demonstration of this technique is estimating the transcendental mathematical constant $$\pi$$ using rejection sampling inside a unit square. Behind this simple geometric exercise lies a profound study in the Law of Large Numbers, the Central Limit Theorem, and the fundamental computational trade-offs of stochastic integration.

## Geometric Formulation of the Estimator

The geometric setup relies on bounding a quarter of a unit circle inside a unit square in the first quadrant of the Cartesian plane:

```text
Geometric Boundary in the First Quadrant
--------------------------------------------------------------------------------
(0, 1) +----------------------------------+ (1, 1)
       | ***                              |
       |     *****                        |
       |          ******                  |   Unit Square: Area = 1.0
       |                *****             |
       |                     *****        |   Quarter-Circle: Area = pi / 4
       |                          ****    |
       |                              *** |
(0, 0) +----------------------------------+ (1, 0)
--------------------------------------------------------------------------------
```

Let $$X$$ and $$Y$$ be independent random variables drawn uniformly from the continuous interval $$[0, 1]$$:

$$X \sim \mathcal{U}(0, 1), \quad Y \sim \mathcal{U}(0, 1)$$

The point $$(X, Y)$$ lands uniformly inside the unit square whose area is:

$$A_{\text{square}} = 1 \times 1 = 1$$

The quarter-circle consists of all points whose Euclidean distance from the origin is at most $$1$$, satisfying the algebraic condition:

$$X^2 + Y^2 \le 1$$

Because the area of a complete circle with radius $$r = 1$$ is $$\pi r^2 = \pi$$, the area of the quarter-circle in the first quadrant is:

$$A_{\text{quarter}} = \frac{\pi \cdot 1^2}{4} = \frac{\pi}{4}$$

Because the points are uniformly distributed across the unit square, the theoretical probability $$p$$ that any randomly chosen point falls inside the quarter-circle equals the ratio of the two areas:

$$p = P\left(X^2 + Y^2 \le 1\right) = \frac{A_{\text{quarter}}}{A_{\text{square}}} = \frac{\pi / 4}{1} = \frac{\pi}{4}$$

## The Statistical Estimator and Asymptotic Variance

When sampling $$N$$ independent points $$(x_i, y_i)$$, we define an indicator random variable $$I_i$$ for each point:

$$I_i = \begin{cases} 1 & \text{if } x_i^2 + y_i^2 \le 1 \\ 0 & \text{otherwise} \end{cases}$$

Each $$I_i$$ is an independent Bernoulli trial with success probability $$p = \frac{\pi}{4}$$. The total number of points landing inside the quarter-circle is the sum of these indicators:

$$N_{\text{inside}} = \sum_{i=1}^N I_i \sim \text{Binomial}\left(N, \frac{\pi}{4}\right)$$

The Monte Carlo estimator for $$\pi$$, denoted $$\hat{\pi}_N$$, scales the empirical sample mean by $$4$$:

$$\hat{\pi}_N = 4 \times \frac{N_{\text{inside}}}{N} = \frac{4}{N} \sum_{i=1}^N I_i$$

### Expected Value and Unbiasedness

The estimator is strictly unbiased, as shown by taking the expectation:

$$\mathbb{E}[\hat{\pi}_N] = \frac{4}{N} \sum_{i=1}^N \mathbb{E}[I_i] = \frac{4}{N} \cdot N \cdot \left(\frac{\pi}{4}\right) = \pi$$

### Variance and the Standard Error Penalty

To quantify the precision of the estimate, we compute the variance of $$\hat{\pi}_N$$:

$$\text{Var}(\hat{\pi}_N) = \text{Var}\left(\frac{4}{N} \sum_{i=1}^N I_i\right) = \frac{16}{N^2} \sum_{i=1}^N \text{Var}(I_i)$$

For a Bernoulli random variable with parameter $$p = \frac{\pi}{4}$$, the variance is:

$$\text{Var}(I_i) = p(1 - p) = \left(\frac{\pi}{4}\right)\left(1 - \frac{\pi}{4}\right) = \frac{\pi(4 - \pi)}{16}$$

Substituting this variance back into the formula yields:

$$\text{Var}(\hat{\pi}_N) = \frac{16}{N^2} \cdot N \cdot \left(\frac{\pi(4 - \pi)}{16}\right) = \frac{\pi(4 - \pi)}{N}$$

The standard error $$\sigma_{\hat{\pi}}$$ is the square root of the variance:

$$\sigma_{\hat{\pi}} = \sqrt{\frac{\pi(4 - \pi)}{N}} \approx \frac{\sqrt{3.14159 \times 0.85841}}{\sqrt{N}} \approx \frac{1.6421}{\sqrt{N}}$$

This result exposes the fundamental computational property of standard Monte Carlo integration: the error decays at the rate of $$\mathcal{O}(1 / \sqrt{N})$$. 

```text
Monte Carlo Sample Volume vs Standard Error
--------------------------------------------------------------------------------
Sample Count (N)    Standard Error (approx)    Expected Correct Decimals
10^2                0.164                      ~1 decimal place (3.1)
10^4                0.016                      ~2 decimal places (3.14)
10^6                0.0016                     ~3 decimal places (3.141)
10^8                0.00016                    ~4 decimal places (3.1415)
10^10               0.000016                   ~5 decimal places (3.14159)
--------------------------------------------------------------------------------
```

To gain a single additional decimal digit of precision (a tenfold reduction in standard error), the required number of random samples must increase by a factor of one hundred ($$10^2$$). Calculating millions of digits of $$\pi$$ using standard pseudo-random rejection sampling is computationally impractical compared to analytical algorithms like the Chudnovsky formula.

## Python Implementation and Vectorization

A naive Python loop generating individual coordinates in a `for` loop suffers from significant interpreter overhead. By leveraging NumPy array vectorization, modern hardware can evaluate ten million samples in less than a second:

```python
import numpy as np

def estimate_pi_monte_carlo(num_samples: int, seed: int = 42) -> dict:
    """
    Estimate Pi using vectorized Monte Carlo rejection sampling.
    """
    rng = np.random.default_rng(seed)
    
    # Generate uniform coordinates in [0, 1) x [0, 1)
    x = rng.uniform(0.0, 1.0, num_samples)
    y = rng.uniform(0.0, 1.0, num_samples)
    
    # Calculate squared Euclidean distances from origin
    squared_distances = x**2 + y**2
    
    # Boolean mask of points falling inside the quarter-circle
    inside_mask = squared_distances <= 1.0
    inside_count = np.count_nonzero(inside_mask)
    
    pi_estimate = 4.0 * (inside_count / num_samples)
    absolute_error = abs(pi_estimate - np.pi)
    theoretical_std_error = np.sqrt(np.pi * (4.0 - np.pi) / num_samples)
    
    return {
        "samples": num_samples,
        "inside_count": inside_count,
        "pi_estimate": pi_estimate,
        "absolute_error": absolute_error,
        "theoretical_std_error": theoretical_std_error
    }

# Run simulation across multiple sample magnitudes
for exponent in [3, 5, 7]:
    n = 10**exponent
    res = estimate_pi_monte_carlo(n)
    print(f"N={n:10d} | Estimate: {res['pi_estimate']:.6f} | Error: {res['absolute_error']:.6f}")
```

Executing this code produces empirical estimates that closely track the theoretical $$\mathcal{O}(1 / \sqrt{N})$$ standard error curve.

## Breaking the Bound: Quasi-Monte Carlo and Sobol Sequences

The slow convergence of standard Monte Carlo integration is caused by the clumping and empty voids inherent to pseudo-random numbers. True random points do not distribute themselves evenly; they cluster together unpredictably.

To accelerate convergence, computational mathematicians employ **Quasi-Monte Carlo (QMC)** methods. Instead of pseudo-random generators, QMC algorithms use deterministic, low-discrepancy point sets such as Halton sequences, Sobol sequences, or Faure grids.

```text
Pseudo-Random Clustering vs Low-Discrepancy Sobol Uniformity
--------------------------------------------------------------------------------
Pseudo-Random (PRNG):        Quasi-Random (Sobol Sequence):
+-----------------------+    +-----------------------+
|  *    **       *      |    |   *       *       *   |
|     *     *       **  |    |     *   *       *     |
| *         (void)      |    |   *       *   *     * |
|    **   *       *     |    | *     *       *   *   |
+-----------------------+    +-----------------------+
Clusters and gaps occur.     Evenly spaced spatial coverage.
--------------------------------------------------------------------------------
```

Low-discrepancy sequences intentionally place each subsequent point into the largest remaining unsampled spatial void. This deliberate dispersion improves the integration convergence rate from the stochastic limit of $$\mathcal{O}(N^{-1/2})$$ toward the near-linear deterministic limit of:

$$\mathcal{O}\left(\frac{(\log N)^d}{N}\right)$$

In two dimensions ($$d = 2$$), a Sobol sequence achieves a much smaller estimation error for the exact same sample count $$N$$.

While estimating $$\pi$$ via Monte Carlo simulation is rarely the method of choice for calculating constants to record precision, it provides an invaluable mental model. It demonstrates how simple probability spaces can approximate complex multidimensional integrals that resist closed-form analytical solutions.
