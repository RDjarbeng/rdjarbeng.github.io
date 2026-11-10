---
date: 2026-11-09T11:55:00+02:00
published: false
author: Richard
category: "Web & Software"
tags:
  - Eleventy
  - Node.js
  - JavaScript
  - Performance
  - Web Development
title: "Eleventy Ran Out of Memory in Watch Mode. Forced GC Didn't Fix It."
image: /assets/images/posts/covers/eleventy_heap_out_of_memory_fix_cover.jpg
image_alt: "Flat illustration of a long chain of linked document pages weighing down a cracking red RAM stick while a small broom lies defeated beside it, with the headline The 10 GB Memory Leak"
layout: post
series: "Building This Blog"
series_part: 8
description: "My Eleventy dev server hit a heap out of memory crash. Raising the limit and forcing garbage collection let it reach 10 GB instead. Heap snapshots found the real leak in my config."
key_points:
  - "Forcing garbage collection only frees memory nothing refers to. My crash log already showed a full collection recovering just 3 MB out of 4 GB."
  - "Raising Node's heap limit to 8 GB did not fix the leak. It let the dev server reach nearly 10 GB and push the whole PC close to running out of memory."
  - "Heap measured right after a forced collection grew by about 150 MB on every rebuild, even when only 32 files were written."
  - "The cause was copying Eleventy's item.data onto a long-lived object. item.data includes global data, so each rebuild kept the previous rebuild alive."
  - "After the fix, heap stayed between 536 and 587 MB across the same 12 builds, against 2,138 MB before."
card_items:
  - name: "Eleventy Data Cascade"
    badge_1: "Docs"
    badge_2: "Eleventy"
    description: "How Eleventy merges global, directory and template data into the data each page sees."
    url: "https://www.11ty.dev/docs/data-cascade/"
    link_text: "Read the docs"
  - name: "Node.js Heap Snapshots"
    badge_1: "Guide"
    badge_2: "Node.js"
    description: "How to capture a V8 heap snapshot and find what is keeping objects in memory."
    url: "https://nodejs.org/en/learn/diagnostics/memory/using-heap-snapshot"
    link_text: "Read the guide"
---

My Eleventy dev server crashed with a heap out of memory error after two hours of editing. I raised Node's limit to 8 GB, forced garbage collection after every build, and wrote the first version of this post saying memory would now sit around 450 MB for days. Less than a day later, the same server was using nearly 10 GB and my PC had almost run out of memory.

![Flat illustration of a long chain of linked document pages weighing down a cracking red RAM stick while a small broom lies defeated beside it](/assets/images/posts/covers/eleventy_heap_out_of_memory_fix_cover.jpg "The 10 GB Memory Leak")

That first version was wrong, so this is the rewrite. If you found this page because of the same crash, the short version is that a bigger limit and `global.gc()` can hide a leak for a while, but neither can fix one. Here is how the real cause turned up, and what the numbers looked like before and after.

---

## The clue I ignored

This is the crash that started it:

```text
[11ty] Watching…

<--- Last few GCs --->

[38508:0000014DFF0AD000]  7175775 ms: Mark-Compact 4091.2 (4102.1) -> 4088.1 (4102.6) MB

FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
ERROR: "serve:11ty" exited with 134.
```

I read that as V8 being lazy about cleaning up. The log says the opposite. `4091.2 -> 4088.1` means a full collection ran and recovered 3 MB out of 4 GB. V8 was not behind on its cleaning. Nearly everything in the heap was still referenced by something, so none of it counted as garbage.

That rules out both things I did next:

- **Forcing garbage collection** after each build frees unreferenced memory sooner. It cannot touch memory that is still referenced.
- **Raising the limit to 8 GB** only moved the failure. Before, one process crashed at 4 GB. After, it kept growing until it had 9.73 GB committed, the PC was at 45.6 of 49.7 GB, and Windows Search stopped working. The crash had been protecting my machine.

---

## Measuring instead of guessing

Two questions needed real answers.

**Was something triggering endless rebuilds?** This was my first suspect, because Eleventy writes files and also watches files. It wasn't that. Left alone for 25 minutes, the server did 0 rebuilds and memory stayed flat at 730 MB. Later, 16 edits produced exactly 16 rebuilds.

**Did memory grow with each rebuild?** To answer this I logged the heap straight after a forced collection. Taking the reading at that moment matters, because anything still counted must be referenced by something.

| Build | Heap after forced GC |
| :--- | ---: |
| 1 (first build) | 565 MB |
| 3 | 729 MB |
| 5 | 1,007 MB |
| 8 | 1,508 MB |
| 12 | 2,138 MB |

That is about 150 MB per rebuild, and it did not depend on how much was rebuilt. Editing a single post wrote only 32 files and still added about 140 MB. So the leak was per rebuild, not per page.

One experiment gave it away. Touching `_data/site.js` made the heap drop from 2,028 MB to 567 MB in a single rebuild. That is the file Eleventy reloads when it changes, so whatever held the memory was hanging off that module.

---

## What the heap snapshots showed

Node can write the whole heap to a file with `v8.writeHeapSnapshot()`. I took one after the first build and another four rebuilds later. V8 numbers objects in the order it creates them, so anything in the second snapshot with an ID higher than every ID in the first must be new and still alive.

That came to 559 MB. Tracing those objects back to what was holding them, 391 MB led to the same place:

```text
_data/site.js  (module.exports)
  gallery_categories[]
    site                  <- from the previous rebuild
      gallery_categories[]
        site              <- from the rebuild before that
          gallery_categories[]
            ...
```

There was one link per rebuild, and each link held that build's whole `collections` object and a 51 MB block of generated HTML for a dev-only page. Most of the remaining 168 MB was the current build's own template data, which is expected and only exists once.

---

## The bug was in my config

Eleventy was doing what it is designed to do. The mistake was mine, and it had been there since I migrated from Jekyll:

```javascript
const siteData = require("./_data/site.js");

eleventyConfig.addCollection("gallery_categories", (collectionApi) => {
  const cats = collectionApi.getFilteredByGlob("_gallery_categories/**/*.md");
  siteData.gallery_categories = cats.map((c) => ({ ...c.data, url: c.url }));
  return cats;
});
```

I wanted each category's front matter. But `item.data` is the merged [data cascade](https://www.11ty.dev/docs/data-cascade/), so it also contains every global data file, including `site`, along with `collections`.

`siteData` is a module that lives as long as the process does. So on each rebuild:

1. The new `gallery_categories` array was stored on the long-lived object.
2. Each entry carried a `site`, and that `site` still pointed at the previous build's `gallery_categories`.
3. Those entries carried their own `site`, and so on back to the first build.

Nothing in the chain could ever be collected, because every generation was reachable from a module Node keeps loaded. The pattern appeared in six collections.

---

## The fix

Copy only an item's own fields:

```javascript
const globalDataKeys = new Set([
  ...fs.readdirSync(path.join(__dirname, "_data")).map((f) => path.parse(f).name),
  "collections", "page", "eleventy", "pkg",
]);

const ownData = (item) =>
  Object.fromEntries(Object.entries(item.data).filter(([key]) => !globalDataKeys.has(key)));

// Then, wherever item.data was being copied:
siteData.gallery_categories = cats.map((c) => ({ ...ownData(c), url: c.url }));
```

Here is the same sequence of builds before and after:

![Line chart of heap after garbage collection over 12 builds. Before the fix it climbs from 565 MB to 2,138 MB. After the fix it stays near 580 MB.](/assets/images/diagrams/eleventy-watch-heap-comparison.svg "Heap after forced garbage collection, before and after the fix")

| After the same 12 builds | Before | After |
| :--- | ---: | ---: |
| Heap after forced GC | 2,138 MB | 580 MB |
| Total process memory (RSS) | 2,765 MB | 1,358 MB |
| Heap added per rebuild | about 150 MB | 0 once settled |

RSS is the amount of physical RAM the whole process is holding, which includes the JavaScript heap, Node itself, and space V8 keeps for reuse.

I compared the generated site from before and after, and the fix changed no page content. The only differences were things that vary on every build anyway, like randomised recommended cards and feed timestamps.

The 8 GB allowance is gone too. `npm run build:11ty` now passes with no heap flag, and the dev server runs with a 2 GB cap. Peak memory for a production build was 834 MB before the fix and 846 MB after, so the site never needed 8 GB to build.

---

## A guard, so this can't take the PC down again

A heap limit only watches JavaScript objects. What actually hurt my PC was total process memory, so I added a small preload that stops the dev server if RSS passes a limit:

```javascript
// scripts/dev-memory-guard.cjs, loaded with: node -r ./scripts/dev-memory-guard.cjs
const fs = require("fs");
const { Worker, isMainThread } = require("worker_threads");

// `node -r` also loads this file inside every worker, so only the main thread may start one.
if (isMainThread && !process.env.DEV_MEMORY_GUARD_DISABLED) {
  const limitMb = Number(process.env.DEV_MEMORY_LIMIT_MB) || 3072;
  new Worker(
    `const fs = require("fs");
     const { limitMb } = require("worker_threads").workerData;
     setInterval(() => {
       const rssMb = Math.round(process.memoryUsage.rss() / 1048576);
       if (rssMb <= limitMb) return;
       fs.writeSync(2, "[memory guard] STOPPING the dev server: RSS is " + rssMb + " MB.\\n");
       process.kill(process.pid, "SIGKILL");
     }, 1000);`,
    { eval: true, workerData: { limitMb } }
  ).unref();
}
```

It runs on its own thread because a build blocks the main thread, which is exactly when memory spikes.

That `isMainThread` check is there for a reason. Without it, an early version of a probe like this started a worker, which loaded the preload, which started another worker. It reached 4.7 GB in about 16 seconds. If you preload anything that uses `worker_threads`, check this first.

With a test limit of 400 MB, the guard stopped a real `npm start` at 423 MB with its message on screen, and the Sass watcher stopped with it.

---

## What I can and can't claim this time

The first version of this post promised a number I had never tested, so here is exactly what was measured. I ran the real `npm start` for 33 minutes, made 16 edits across posts, includes, data files, an asset and the config, and logged memory from Windows once a minute.

| | RSS | Committed |
| :--- | ---: | ---: |
| Start | 962 MB | 1,029 MB |
| Peak | 1,465 MB | 1,527 MB |
| End | 1,442 MB | 1,527 MB |

The highest RSS I measured anywhere after the fix was 1,531 MB, in a separate run of 21 builds sampled more often.

Some limits on that:

- **33 minutes is not three days.** I have not tested longer sessions.
- **RSS still rose in steps during the test.** Its high points moved from about 1,080 MB to about 1,450 MB, with the largest step after a config edit. For the last 10 minutes it moved between 1,322 and 1,465 MB without trending up.
- **Editing `eleventy.config.js` adds memory.** The first edit added about 380 MB of heap and later ones about 18 MB each. I haven't traced why.
- **The guard's real default is untested.** I proved it fires at 400 MB. I haven't pushed a server to the 3,072 MB default.
- **I can't prove what the 10 GB process did.** Its log is gone. At 150 MB per rebuild, about 60 rebuilds would account for it, but that is arithmetic. I only reproduced the growth up to about 3 GB before stopping.

---

## Why it still uses about 1 GB

Even with the leak gone, the first build peaks at about 960 MB of RSS, which sounds like a lot for a blog.

A heap snapshot after that build held 594 MB, and 418 MB of it was strings. The site turns about 9 MB of Markdown into 114 MB of finished HTML across 2,226 files, and the server stays running with the current build's templates and data in memory. The strings include 51 MB for the dev-only page mentioned above. I didn't break them down further. The gap between the 594 MB heap and the RSS is outside live JavaScript objects, such as Node itself and heap space V8 has not handed back.

That dev-only page rebuilt every version of every post on each save, and I only looked at it occasionally, so I made it opt-in. In a short comparison of three rebuilds each, peak RSS was 866 MB without it and 1,187 MB with it.

A dev server is a compiler that stays open, so needing that much is normal. Needing more after every save is not.

---

## If your Eleventy server keeps growing

1. Log heap right after a forced collection, on each rebuild. If that number climbs, you have a real leak and more garbage collection will not help.
2. Don't raise `--max-old-space-size` until you know why it's growing.
3. Search your config for `...item.data`, or anything else that copies `data` onto an object outliving the build. Copy the fields you need instead.
4. If the numbers point to a leak, take two heap snapshots a few rebuilds apart and look at what holds the new objects.
5. Keep non-site folders in `.eleventyignore`. It wasn't my problem, but tools writing into watched folders do cause surprise rebuilds.
