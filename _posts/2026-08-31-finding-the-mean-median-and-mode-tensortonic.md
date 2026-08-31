---
date: 2026-08-31T17:00:00+02:00
published: false
author: Richard
category: Technology
tags:
  - Algorithm
title: Finding the Mean, Median and Mode - TensorTonic
image: ''
image_alt: ''
layout: post
card_items: []
---

# Finding the Mean, Median, and Mode in Python

The [Mean, Median, Mode problem on TensorTonic](https://www.tensortonic.com/problems/mean-median-mode) asks you to compute these three statistical metrics for a 1D numeric array. The updated requirements specify returning the results as a dictionary. If multiple values share the highest frequency, the mode must be the smallest of those values.




The time limit is 300ms, and you are permitted to use NumPy and the standard collections library.




## The Standard Approach

Computing the mean and median is straightforward using NumPy. For the mode, the standard method tallies frequencies using `collections.Counter`, finds the highest frequency, filters all numbers sharing that frequency, and extracts the smallest one.




Python

```plain
import numpy as np
from collections import Counter

def mean_median_mode(x):
    x = np.asarray(x, dtype=float)
    mean = float(np.mean(x))
    median = float(np.median(x))
    
    counts = Counter(x)
    max_count = max(counts.values())
    modes = [val for val, count in counts.items() if count == max_count]
    mode = float(min(modes))
    
    return {"mean": mean, "median": median, "mode": mode}

```

This functions correctly, but it traverses the unique values twice: first to find `max_count`, and again to build the `modes` list.




## Single-Pass Optimization: Using `max()`

You can find the smallest mode in a single pass by providing a custom lambda function to Python's built-in `max()` function.




Python

```plain
import numpy as np
from collections import Counter

def mean_median_mode(x):
    x = np.asarray(x, dtype=float)
    mean = float(np.mean(x))
    median = float(np.median(x))
    
    counts = Counter(x)
    mode = float(max(counts, key=lambda k: (counts[k], -k)))
    
    return {"mean": mean, "median": median, "mode": mode}

```

When passing a tuple to Python's `max()` function, it compares the first items. If they tie, it proceeds to the second items. The lambda `lambda k: (counts[k], -k)` maximizes the frequency count first. If counts tie, it maximizes the negative value of the key, which effectively selects the smallest original number.




## Single-Pass Optimization: Using `min()` (Hint 3)

The TensorTonic problem provides a hint suggesting the use of `min()`. You can invert the logic of the previous optimization to use `min()` instead, which reads highly intuitively for this specific constraint.




Python

```plain
import numpy as np
from collections import Counter

def mean_median_mode(x):
    x = np.asarray(x, dtype=float)
    mean = float(np.mean(x))
    median = float(np.median(x))
    
    count = Counter(x)
    mode = float(min(count, key=lambda k: (-count[k], k)))
    
    return {"mean": mean, "median": median, "mode": mode}

```

By passing `lambda k: (-count[k], k)` to `min()`, Python evaluates the sequence as follows:




1. `-count[k]`: The `min()` function looks for the smallest number. By negating the count, the highest frequency becomes the most negative number, ensuring it is picked first.
2. `k`: If there is a tie in frequencies (the negative counts match), `min()` looks at the original numeric value `k` and simply selects the smallest one.

This completely satisfies the tie-breaking condition without needing negative key trickery on the secondary sort, making it an optimal, one-line solution for the mode.
