---
date: 2026-04-17T13:38:00+02:00
published: false
author: Richard
category: Research & Learning
tags:
  - Sports Analytics
  - Data Science
  - Python
  - Machine Learning
  - Football Analytics
title: "Sports Analytics: A Data Science Perspective on Football Tracking and Probabilistic Modeling"
image: /assets/images/posts/covers/football_data_science_cover.jpg
image_alt: Sports analytics data visualization showing football pitch tracking vectors, passing networks, Poisson goal probability, and press intensity metrics
layout: post
description: An examination of modern football data science exploring optical tracking data, Expected Threat surfaces, and Poisson match simulation engines.
key_points:
  - Modern football analytics has transitioned from discrete on-ball event logs to continuous 25 Hz optical tracking data.
  - Expected Threat models value spatial progressions across pitch zones using Markovian decision formulations.
  - Physical performance frameworks quantify pressing intensity and off-ball movement that traditional box scores miss.
  - Dixon-Coles Poisson distributions power Monte Carlo simulations to project league standings and relegation probabilities.
card_items:
  - name: Event Versus Tracking Data
    description: Optical tracking captures all 22 players simultaneously, revealing defensive compact lines and off-ball runs across 90 minutes.
  - name: Expected Threat (xT) Formulation
    description: Spatial Markov chains evaluate passes and progressive carries by calculating the marginal increase in goal probability.
  - name: Probabilistic Match Simulation
    description: Bivariate Poisson modeling incorporates home advantage and low-score dependence to simulate 10,000 fixture permutations.
---
<!-- WRITER NOTE (for the writer only, remove before publishing)
Original draft, kept so you remember where this post was going:

https://medium.com/@vickyfrissdekereki

https://github.com/vickyfriss

Data Scientist working in sports analytics and applied modelling. I analyse football, performance data, and explore how context shapes the numbers.

On linkedIn

https://www.linkedin.com/in/victoria-friss-de-kereki

Not my domain but I find this interesting

END WRITER NOTE -->

Association football was long considered resistant to quantitative analysis. Unlike baseball or cricket, where play divides into discrete, turn-based events with isolated batter-pitcher matchups, football is a fluid, continuous low-scoring invasion game. A 90-minute match might feature only one or two goals, creating a high degree of variance that frequently obscures underlying team quality.

Over the past decade, data science has penetrated elite European football. Analysts like Victoria Friss de Kereki (a football data analyst at SkillCorner whose research is shared across her [Medium publications](https://medium.com/@vickyfrissdekereki), [GitHub projects](https://github.com/vickyfriss), and [LinkedIn profile](https://www.linkedin.com/in/victoria-friss-de-kereki)) demonstrate how applied modeling, computer vision tracking streams, and probabilistic simulations translate tactical concepts into measurable indicators.

Evaluating this field reveals how statistical models evaluate spatial control, physical pressing metrics, and league-wide outcomes.

## From Event Logs to 25 Hz Optical Tracking

Football data historically relied on manual event tagging provided by data vendors like Opta and StatsBomb.

| Data Modality | Capture Frequency and Coverage | Core Analytical Utility |
| :--- | :--- | :--- |
| **Event Data** | Discrete timestamps, on-ball events only | Pass completion, shot volume, basic player ratings (< 2% of match activity) |
| **Optical Tracking Data** | 25 Hz continuous coordinates for all 22 players and ball | Spatial control, pressing intensity, off-ball runs, and physical fatigue |

Event logs record discrete timestamps, player identifiers, event types, and coordinate pairs $$(x, y)$$. While useful for computing basic pass completion rates and shot volumes, event data suffers from an inherent structural blind spot: a single outfield player controls the ball for less than three minutes during an entire 90-minute match. The remaining 87 minutes consist of off-ball positioning, spatial closing, defensive cover shadows, and supporting decoy runs.

Modern clubs rely on broadcast optical tracking datasets produced by computer vision firms like SkillCorner. By running multi-object tracking networks across standard broadcast cameras, these systems generate continuous time series data at 25 Hz:

$$\mathbf{S}(t) = \left\{ \mathbf{p}_{\text{ball}}(t), \{\mathbf{p}_i(t), \mathbf{v}_i(t)\}_{i=1}^{22} \right\}$$

For every frame $$t$$, the pipeline tracks position coordinates $$\mathbf{p}_i(t) = (x_i, y_i)$$ and instantaneous velocity vectors $$\mathbf{v}_i(t) = (v_{x,i}, v_{y,i})$$ for all 22 athletes on the pitch. This enables analysts to quantify team compact shape, press resistance, and physical output without requiring physical GPS vests.

## Beyond Expected Goals: Spatial Control and Expected Threat (xT)

Expected Goals (xG) established quantitative football analytics by predicting the probability that a given shot results in a goal based on distance, angle, body part, and assist type. However, xG rewards only the final action in an attacking sequence, assigning zero mathematical value to the defense-splitting pass that unlocked the penalty box in the first place.

To solve this, researchers developed Expected Threat (xT), formalized by Karun Singh as a discrete Markov decision process across an $$M \times N$$ grid overlaid on the pitch.

| Pitch Zone | Defensive Third | Middle Third | Attacking Flank | Central Zone 14 | Danger Area (Box) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Left Wing** | 0.01 | 0.02 | 0.04 | 0.07 | 0.12 |
| **Central Channel** | 0.01 | 0.02 | 0.03 | 0.15 (Zone 14) | 0.35 (Goal Mouth) |
| **Right Wing** | 0.01 | 0.02 | 0.04 | 0.07 | 0.12 |

At any cell $$(x, y)$$, a player in possession faces two mutually exclusive actions: shoot with probability $$s(x, y)$$, or move the ball (via a pass or progressive dribble carry) with probability $$m(x, y) = 1 - s(x, y)$$.

The Expected Threat of any location satisfies the recursive equation:

$$\text{xT}(x, y) = s(x, y) \times g(x, y) + m(x, y) \times \sum_{x'=1}^{M} \sum_{y'=1}^{N} T((x, y) \to (x', y')) \times \text{xT}(x', y')$$

In this system:
- $$g(x, y)$$ is the goal conversion probability given a shot taken from cell $$(x, y)$$.
- $$T((x, y) \to (x', y'))$$ is the empirical transition probability of moving the ball from cell $$(x, y)$$ to cell $$(x', y')$$.

When an attacking midfielder receives possession in a low-value zone ($$\text{xT} = 0.03$$) and executes an incisive line-breaking pass to a forward in Zone 14 ($$\text{xT} = 0.18$$), the model credits the passer with an added threat delta:

$$\Delta \text{xT} = \text{xT}_{\text{end}} - \text{xT}_{\text{start}} = 0.18 - 0.03 = +0.15$$

This metric isolates progressive playmakers whose value does not show up in traditional assist columns.

## Profiling the "Pressing Number 8"

In modern tactical frameworks, physical running metrics must be paired with contextual game state. Evaluating midfielders solely by raw distance covered is counterproductive: a player who covers twelve kilometers while jogging between loose balls offers far less defensive utility than one who executes forty high-intensity sprints to cut off passing angles.

In her scouting research on European midfielder profiles, Victoria Friss de Kereki integrates physical metrics from tracking data with tactical turnover events to define player archetypes, such as the "Pressing Number 8":

| Analytical Metric | Tracking Data Definition | Tactical Significance |
| :--- | :--- | :--- |
| **High-Speed Running (HSR)** | Distance covered between 19.8 km/h and 25.2 km/h | Measures work rate during rapid defensive transitions |
| **Sustained Sprint Count** | Bursts exceeding 25.2 km/h for at least 1.0 second | Quantifies explosive recovery runs and aggressive press triggers |
| **Defensive Pressure Events** | Closing distance to ball-carrier to < 2.0 meters at high speed | Disrupts opponent passing rhythm and forces backward passes |
| **Turnover Retention Rate** | Percentage of won tackles leading to a forward pass within 5s | Evaluates counter-attacking transition speed |

By cross-referencing physical sprint curves against tactical pitch coordinates, recruitment departments identify athletes capable of sustaining aggressive pressing without suffering physical degradation in the final 20 minutes of matches.

## Probabilistic Match Simulation: The Dixon-Coles Framework

Beyond individual player evaluation, football data scientists construct probabilistic models to forecast match outcomes and simulate entire league campaigns.

Because goals in a football match occur as rare, discrete counts over a 90-minute interval, team scoring follows an approximate Poisson distribution. The classic model proposed by Mark Dixon and Stuart Coles extends the Poisson distribution to capture team attacking strength, defensive vulnerability, home pitch advantage, and the statistical correlation between low-scoring draws:

$$P(X = x, Y = y) = \frac{\lambda^x e^{-\lambda}}{x!} \times \frac{\mu^y e^{-\mu}}{y!} \times \tau_{x,y}(\lambda, \mu, \rho)$$

In this formulation:
- $$X$$ and $$Y$$ represent the goals scored by the home and away teams respectively.
- The expected goal rates $$\lambda$$ and $$\mu$$ are parameterized as:

$$\log \lambda = \alpha_{\text{home}} + \beta_{\text{away}} + \gamma$$

$$\log \mu = \alpha_{\text{away}} + \beta_{\text{home}}$$

Here, $$\alpha$$ measures a team's attacking strength, $$\beta$$ measures defensive resistance, and $$\gamma$$ represents the universal home field advantage coefficient. The correction factor $$\tau_{x,y}$$ adjusts probabilities for low-scoring states (0-0, 1-0, 0-1, and 1-1) where defensive game state incentives distort independent Poisson assumptions.

### Python Simulation Example

The following script illustrates how to generate a scoreline probability matrix using Poisson rates and simulate match outcomes:

```python
import numpy as np
import pandas as pd
from scipy.stats import poisson

def generate_match_probabilities(lambda_home: float, mu_away: float, max_goals: int = 6) -> pd.DataFrame:
    """
    Computes a joint scoreline probability matrix for a football match
    given home expected goals (lambda) and away expected goals (mu).
    """
    home_probs = [poisson.pmf(i, lambda_home) for i in range(max_goals + 1)]
    away_probs = [poisson.pmf(j, mu_away) for j in range(max_goals + 1)]
    
    # Outer product yields independent probability grid
    score_matrix = np.outer(home_probs, away_probs)
    
    df = pd.DataFrame(
        score_matrix,
        index=[f"Home {i}" for i in range(max_goals + 1)],
        columns=[f"Away {j}" for j in range(max_goals + 1)]
    )
    return df

def simulate_fixture(lambda_home: float, mu_away: float, iterations: int = 10000) -> dict:
    """
    Executes Monte Carlo simulation over fixture parameters to extract 
    Home Win, Draw, and Away Win probabilities.
    """
    home_goals = np.random.poisson(lambda_home, iterations)
    away_goals = np.random.poisson(mu_away, iterations)
    
    home_wins = np.sum(home_goals > away_goals) / iterations
    draws = np.sum(home_goals == away_goals) / iterations
    away_wins = np.sum(away_goals > home_goals) / iterations
    
    return {
        "Home Win Probability": round(float(home_wins), 4),
        "Draw Probability": round(float(draws), 4),
        "Away Win Probability": round(float(away_wins), 4)
    }

# Example: Arsenal (Home, exp: 1.85) vs Brighton (Away, exp: 1.10)
results = simulate_fixture(1.85, 1.10)
print(results)
```

Running these simulations across all 380 fixtures in a domestic league season 10,000 times generates robust probability distributions for title winners, European tournament qualification thresholds, and relegation danger zones.

## The Role of Domain Context

Data science in sports does not replace coaching intuition; it provides objective verification for tactical theories. A data scientist examining raw tracking numbers without understanding defensive zonal systems or pressing triggers will misinterpret tactical conservatism as individual player failure.

Analysts like Victoria Friss de Kereki exemplify the modern approach to sports analytics: anchoring complex machine learning pipelines and Markov decision processes to the physical and tactical realities of the pitch. By treating tracking coordinates as components of a dynamic spatial system, data science turns raw tracking coordinates into actionable tactical intelligence.
