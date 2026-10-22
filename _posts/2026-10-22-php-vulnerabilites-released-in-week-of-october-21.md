---
date: 2026-10-22T14:55:00+02:00
published: false
author: Richard
category: Security
tags: []
series: ''
series_part: null
key_points: []
title: PHP vulnerabilites released in Week of October 21
image: ''
image_alt: ''
layout: post
card_items: []
---

![Screenshot of PHP CVE page CVE-2026-109619](/assets/images/20261022-145744.png)

Yes, **that is exactly how official CVE records are designed to be.**

An official CVE (Common Vulnerabilities and Exposures) record is intentionally brief. Its primary purpose is not to teach people how to exploit or fix a bug, but simply to act as a **unique identifier and standardized dictionary entry** so organizations worldwide know they are talking about the exact same security flaw

From: [https://x.com/fiveoutofnine/status/2113045722744717360?s=20](https://x.com/fiveoutofnine/status/2113045722744717360?s=20)

So basically, today PHP got two critical bugs that let anyone run code on your server without even logging in, which is bad, and then the details leaked before the patch was even out, which is worse, and it works on WordPress and MediaWiki and Magento and Joomla and Laravel, and Censys says like 1.5 million servers are running a version with no fix, so the NSA was like "take your system offline," and the FBI was like "take your system offline," and CISA and the UK and CERT-EU were all like "take your system offline," and then the Prime Minister of Japan, the actual Prime Minister, posted at 5:55 in the morning telling 48.8 million people to take their system offline, so everyone took their system offline, like the Dutch cybersecurity agency took its own website offline, and the Dutch parliament went offline, and the Port of Rotterdam went offline, and Finland and France and Denmark started pulling government sites, and Wikipedia went down, and [http://Archive.org](https://t.co/QlOXb3COq3) went down, and Asana and GOG and Something Awful went down, and the University of Vienna's webmail went down for some reason, and that's just PHP. Because GitLab also dropped a CVSS 10.0, which is the highest score they give out, for a bug that's been there since 2014, so that's every self-hosted GitLab for twelve years, and then LiteLLM 1.107.0 got hijacked and shipped a credential stealer and a remote access trojan in every single wheel and the Docker images, including latest, and you didn't even have to import it, just installing it was enough, and it's the second time this year, and then Railway paused every deployment on the entire platform because someone got into the environment variables, so now everyone has to rotate every secret they've ever stored there, and TiDB Cloud said someone was walking around inside with stolen credentials for basically a month and an extortion group says they took 10.6 terabytes, and Zeabur got breached for the second time in two months and is just shutting down, like the whole company, and Node.js patched remote code execution and a TLS bypass, and CISA says Plex is being actively exploited, and someone took over 300 Tor exit relays to steal SSH passwords, and SafePay ransomware has hit over 600 critical infrastructure orgs, and India's biggest bank filed a data loss incident, and Japan has been in an official state of emergency in cyberspace since October 9, which honestly explains the 5:55 AM post. Oh, and eMudhra, a certificate authority that's issued over 60 million certificates, whose entire job is proving websites are who they say they are, was supposed to be using private keys that are random numbers over a hundred digits long, and one of them was 4. Just 4. And the others were like 66 and 237. Anyway, it's Wednesday.

From Matthew Prince of Cloudflare:

Some stats on [#php2shell](https://x.com/hashtag/php2shell?src=hashtag_click). In the 10 hours before it was publicly announced, across the [@Cloudflare](https://x.com/Cloudflare) network we saw thousands of attempts to exploit it. That jumped to tens of thousands in the 45 minutes post announcement, hundreds of thousands within 2 hours, and millions now.

[https://x.com/eastdakota/status/2113079352682570051?s=20](https://x.com/eastdakota/status/2113079352682570051?s=20)

### 1. The main viral post by @fiveoutofnine
```html
<blockquote class="twitter-tweet" data-dnt="true">
  <p lang="en" dir="ltr">So basically, today PHP got two critical bugs that let anyone run code on your server without even logging in, which is bad, and then the details leaked before the patch was even out, which is worse... Anyway, it&#39;s Wednesday.</p>
  &mdash; ⁵⁄₉ (@fiveoutofnine) <a href="https://x.com/fiveoutofnine/status/2113045722744717360">October 21, 2026</a>
</blockquote>
```

### 2. Japanese PM Sanae Takaichi’s main warning post
```html
<blockquote class="twitter-tweet" data-dnt="true" data-lang="ja">
  <p lang="ja" dir="ltr">皆様に、今夜に対応して頂きたい大至急のお願いです。多くのウェブサイトで使用されているPHPに関し、PHPのセキュリティチームが、重大な２件の脆弱性に関する注意喚起を行っています。…</p>
  &mdash; 高市早苗 (@takaichi_sanae) <a href="https://x.com/takaichi_sanae/status/2112890642590564386">October 21, 2026</a>
</blockquote>
```

### 3. Her follow-up post the next day
```html
<blockquote class="twitter-tweet" data-dnt="true" data-lang="ja">
  <p lang="ja" dir="ltr">今回のPHPの脆弱性対応のため、現在もウェブサイトを一時停止されている事業者などの皆様もいらっしゃると思います。…</p>
  &mdash; 高市早苗 (@takaichi_sanae) <a href="https://x.com/takaichi_sanae/status/2113118173818224932">October 22, 2026</a>
</blockquote>
```

### 4. NSA Cyber “take the system offline” post
```html
<blockquote class="twitter-tweet" data-dnt="true">
  <p lang="en" dir="ltr">Effective Immediately, all organizations using PHP for their systems are advised to be prepared for an update addressing two critical vulnerabilities. … If an immediate update is not feasible, it is recommend that organizations take the system offline until it can be fully mitigated.</p>
  &mdash; NSA Cyber (@NSACyber) <a href="https://x.com/NSACyber/status/2112903220209098897">October 21, 2026</a>
</blockquote>
```

### 5. NSA follow-up with guidance
```html
<blockquote class="twitter-tweet" data-dnt="true">
  <p lang="en" dir="ltr">UPDATE: Specific mitigation guidance for the recently identified PHP critical vulnerabilities is now available. Secure your servers today.</p>
  &mdash; NSA Cyber (@NSACyber) <a href="https://x.com/NSACyber/status/2113068811058622971">October 22, 2026</a>
</blockquote>
```
