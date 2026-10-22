---
date: 2026-10-22T14:55:00+02:00
published: true
author: Richard
category: Security
tags:
  - PHP
  - php2shell
  - Vulnerabilities
  - CVE
  - Web Security
series: ''
series_part: null
key_points:
  - "Two PHP bugs, CVE-2026-109618 and CVE-2026-109619 (php2shell), let an attacker run code on a web server without logging in. Both are rated 9.2 out of 10."
  - "The fix is PHP 8.5.12, 8.4.27, 8.3.36 or 8.2.35. Updating your website or its plugins does not fix it; PHP itself has to be updated and the workers restarted."
  - "Government portals, banks, airlines, a port, hospitals and the BBC took services offline as a precaution while they patched."
title: "PHP2Shell: The Two PHP Bugs That Took Government Websites Offline, and What to Do"
description: "What CVE-2026-109618 and CVE-2026-109619 are, who took their websites offline in October 2026 and why, which PHP versions fix the bugs, and what to do if you run or host a PHP site."
image: /assets/images/posts/covers/php2shell_cover.jpg
image_alt: "Flat illustration of the blue PHP elephant in front of three browser windows, two showing a pulled plug and the word OFFLINE and one a warning sign, under the headline PHP2Shell: patch or go offline"
layout: post
card_items:
  - name: "CVE"
    badge_1: "Security"
    description: "Common Vulnerabilities and Exposures: a public catalogue that gives each known security flaw a unique ID, so everyone refers to the same bug by the same name."
    url: "https://www.cve.org/About/Overview"
    link_text: "About CVE"
  - name: "Remote code execution (RCE)"
    badge_1: "Security"
    description: "A flaw that lets an attacker run their own commands on someone else's server over the network. Unauthenticated RCE means they don't need an account or password first."
  - name: "CVSS"
    badge_1: "Security"
    description: "The Common Vulnerability Scoring System rates how severe a flaw is from 0 to 10. 9.0 and above is critical."
    url: "https://www.first.org/cvss/"
    link_text: "CVSS specification"
---

On Wednesday 21 October 2026, PHP released emergency fixes for two bugs that let an attacker take over a web server without logging in. PHP runs a large part of the web, including every WordPress, Drupal, Joomla, Magento and Laravel site, so the response was unusual. The NSA, CISA and CERT-EU told organisations that could not patch straight away to take their sites offline, and governments, banks, airlines and broadcasters did exactly that.

![Flat illustration of the blue PHP elephant in front of three browser windows, two showing a pulled plug and the word OFFLINE and one a warning sign](/assets/images/posts/covers/php2shell_cover.jpg "PHP2Shell: patch or go offline")

The bugs became known as **php2shell**. Here is what they are, who was affected, and what to do if you run a PHP site or pay someone to host one.

## What the two bugs are

The PHP Group published two CVE records on 21 October, [CVE-2026-109618](https://www.cve.org/CVERecord?id=CVE-2026-109618) ("RCE via OOM corruption") and [CVE-2026-109619](https://www.cve.org/CVERecord?id=CVE-2026-109619) ("RCE via stale global state"). This is the second one:

![The CVE record for CVE-2026-109619, published by the PHP Group on 21 October 2026, titled RCE via stale global state](/assets/images/20261022-145744.png)

PHP rates both 9.2 out of 10 (CVSS v4.0). In plain terms, according to [Rapid7's analysis](https://www.rapid7.com/blog/post/etr-cve-2026-109618-and-cve-2026-109619-critical-unauthenticated-remote-code-execution-in-php/):

- **CVE-2026-109618: running out of memory mid-request.** When PHP runs out of memory, it can stop processing a request halfway through and then tidy up data that was never fully set up. An attacker can trigger this with specially crafted form or file uploads, even ones that look within the size limits.
- **CVE-2026-109619: leftovers from the previous request.** A PHP worker handles one request after another. Some internal state can survive after its memory has been freed, and the next request on the same worker can use it before it is reset. Rapid7 confirmed two ways in: the session upload progress feature (switched on by default) and, on PHP 8.5, the fatal error backtrace feature.

Either one can end in remote code execution: the attacker runs their own commands with the same permissions as the web server. Every common way of running PHP for the web is affected, including PHP-FPM, Apache mod_php, php-cgi, FrankenPHP and LiteSpeed, and almost every PHP version back to 5.4. [Huntress reports](https://www.huntress.com/blog/php2shell-leaked-critical-php-vulnerabilities) that researchers at Wiz demonstrated unauthenticated takeovers of WordPress, Drupal and Joomla, and a memory leak path that could expose passwords, API keys and certificates.

### Why the CVE page says so little

If you open either CVE record you get one paragraph and a list of weakness types, with no exploit and no fix instructions. That is by design. A CVE record is an identifier, a shared name so that PHP, hosting companies, governments and security tools all know they are talking about the same flaw. The details live in the vendor's advisory and in write-ups from security firms like the ones linked throughout this post.

## How the week unfolded

The order of events, from the [Huntress timeline](https://www.huntress.com/blog/php2shell-leaked-critical-php-vulnerabilities) and [Help Net Security](https://www.helpnetsecurity.com/2026/10/21/php2shell-php-vulnerabilities-patched-cve-2026-109618-cve-2026-109619/):

- **August 2026:** Ryan Austin of the security firm Calif found one of the bugs with an AI model as part of OpenAI's "Patch the Planet" project. Researchers at Wiz found them independently ([Wikipedia summary](https://en.wikipedia.org/wiki/PHP2Shell)). OpenAI later called the flaw "one of the most impactful vulnerabilities in recent memory" ([The National](https://www.thenationalnews.com/future/technology/2026/10/21/php-security-issues-exploit/)).
- **17 October:** Someone tried to exploit the bugs against one of Amazon's honeypots, four days before the fix was public. Amazon only connected the attempt to php2shell after the disclosure, which is why it now recommends checking server logs back to 17 October.
- **20 October, morning:** A post on Hacker News said two critical PHP bugs were about to be disclosed. It was taken down, but screenshots spread, and the security firm watchTowr confirmed the bugs were real. PHP brought its release forward by a day.
- **21 October:** PHP released 8.5.12, 8.4.27, 8.3.36 and 8.2.35 and published the advisories. [CISA issued an alert](https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching) the same day.
- **21 and 22 October:** Organisations around the world took sites offline while they patched (the full list is below), and attack attempts climbed into the millions.

## Why governments said "take it offline"

Telling people to switch off their own websites is rare. It happened here because the bugs can be reached before any login, affect almost every PHP version in use, and were public before most people could patch.

The NSA's first post put it bluntly:

<blockquote class="twitter-tweet" data-dnt="true">
  <p lang="en" dir="ltr">Effective Immediately, all organizations using PHP for their systems are advised to be prepared for an update addressing two critical vulnerabilities. … If an immediate update is not feasible, it is recommend that organizations take the system offline until it can be fully mitigated.</p>
  &mdash; NSA Cyber (@NSACyber) <a href="https://x.com/NSACyber/status/2112903220209098897">October 21, 2026</a>
</blockquote>

The next day it followed up with detailed guidance:

<blockquote class="twitter-tweet" data-dnt="true">
  <p lang="en" dir="ltr">UPDATE: Specific mitigation guidance for the recently identified PHP critical vulnerabilities is now available. Secure your servers today.</p>
  &mdash; NSA Cyber (@NSACyber) <a href="https://x.com/NSACyber/status/2113068811058622971">October 22, 2026</a>
</blockquote>

[CISA](https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching) gave the same advice for anyone who could not update, or who runs PHP 8.1 or older. CERT-EU advised taking sites offline while patches were pending, and the UK's National Cyber Security Centre warned organisations to look for backdoors.

The most unusual warning came from Japan. Just before 10 pm Tokyo time on 21 October, Prime Minister Sanae Takaichi posted on X asking everyone to act that night: check whether their public websites use PHP, get the fix ready, and treat temporarily stopping a site as a valid way to reduce the risk. She took her own website offline too, as did Kobayashi, the policy chief of her Liberal Democratic Party ([Jiji](https://www.jiji.com/jc/article?k=2026102200278&g=pol), [Nikkei](https://www.nikkei.com/article/DGXZQOUA221J60S6A021C2000000/), both in Japanese).

<blockquote class="twitter-tweet" data-dnt="true" data-lang="ja">
  <p lang="ja" dir="ltr">皆様に、今夜に対応して頂きたい大至急のお願いです。多くのウェブサイトで使用されているPHPに関し、PHPのセキュリティチームが、重大な２件の脆弱性に関する注意喚起を行っています。…</p>
  &mdash; 高市早苗 (@takaichi_sanae) <a href="https://x.com/takaichi_sanae/status/2112890642590564386">October 21, 2026</a>
</blockquote>

English translation of the opening: "An urgent request that I would like everyone to act on tonight. PHP's security team has issued a warning about two serious vulnerabilities in PHP, which is used by many websites."

A day later she followed up for the businesses that still had their sites switched off:

<blockquote class="twitter-tweet" data-dnt="true" data-lang="ja">
  <p lang="ja" dir="ltr">今回のPHPの脆弱性対応のため、現在もウェブサイトを一時停止されている事業者などの皆様もいらっしゃると思います。…</p>
  &mdash; 高市早苗 (@takaichi_sanae) <a href="https://x.com/takaichi_sanae/status/2113118173818224932">October 22, 2026</a>
</blockquote>

English translation of the opening: "I imagine some businesses and others still have their websites temporarily suspended while they deal with this PHP vulnerability."

## Who went offline

These are the organisations reported to have taken websites or services down as a precaution. Most come from a [Reuters factbox](https://www.globalbankingandfinance.com/factbox-websites-taken-offline-over-php-risks/); others are linked individually. None of them reported a breach. They switched off to patch safely.

- **Netherlands:** the government portal Overheid.nl, the Port of Rotterdam, the national football association KNVB, the websites of the five largest political parties and many hospital websites, following the National Cyber Security Centre's lead.
- **Finland:** Valtori, the state IT centre, shut down the government's public web services. It said it had seen no attempts to exploit the bugs.
- **France:** the Interior Ministry disabled the websites of the prefectures (local government offices), and the telecoms company Orange suspended some websites, services and apps across several subsidiaries.
- **Germany:** ITZBund, the federal IT provider, shut down several sites as a preventive step.
- **Belgium:** the foreign ministry took its websites offline.
- **Czech Republic:** the government took its website offline at 7 pm on 21 October on the advice of the national cyber watchdog.
- **Denmark:** Aula, the platform Danish schools use to talk to parents, went offline on Wednesday afternoon and came back on Thursday morning ([The Copenhagen Post](https://cphpost.dk/2026-10-22/news/round-up/aula-reopens-as-danish-authorities-restore-websites-following-security-scare/)).
- **United Kingdom:** the BBC took some web portals down, as did several councils, including the City of Edinburgh.
- **Japan:** the Ministry of Finance, the Meteorological Agency and the National Tax Agency suspended some online services, and so did Nomura, Mitsubishi UFJ Financial Group, the airline ANA and East Japan Railway.
- **The wider web:** the Wikimedia Foundation took many of its supporting services offline, saying all its PHP systems were affected, and the Internet Archive went down for emergency maintenance and patching before coming back online.

## Who this affects

**People who run websites.** If your site, or any tool it relies on, runs on PHP, it is exposed until PHP itself is updated. That includes WordPress and other content management systems, online shops, forums, booking systems and the admin panels that hosting companies use. A data company, Veridion, matched public version information to businesses and counted about 7 million companies running an affected version, most with fewer than 50 employees ([Wikipedia summary](https://en.wikipedia.org/wiki/PHP2Shell)). Small businesses are the ones least likely to have someone watching for this.

**People who use websites.** For everyone else, the main effect this week was services being unavailable: tax portals, train and airline bookings, banking and school platforms. The bigger worry is a site that stays unpatched. An attacker who takes over a server can read what it stores, including logins, personal details and payment data, and can use it to attack its visitors. There is nothing an ordinary user can patch here, but it is a good week to make sure your passwords are not reused across sites.

## How fast attackers moved

Cloudflare sits in front of a large share of the web, so it sees attacks early. Its CEO, Matthew Prince, shared these numbers on 22 October:

<blockquote class="twitter-tweet" data-dnt="true">
  <p lang="en" dir="ltr">Some stats on #php2shell. In the 10 hours before it was publicly announced, across the @Cloudflare network we saw thousands of attempts to exploit it. That jumped to tens of thousands in the 45 minutes post announcement, hundreds of thousands within 2 hours, and millions now.</p>
  &mdash; Matthew Prince (@eastdakota) <a href="https://x.com/eastdakota/status/2113079352682570051">October 22, 2026</a>
</blockquote>

These are attempts, not confirmed break-ins. On 21 October [CISA said](https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching) it had not yet seen successful exploitation, and Germany's BSI and the Dutch authorities reported the same ([The Next Web](https://thenextweb.com/news/php2shell-millions-exploit-attempts-no-confirmed-breaches)). Amazon's security team, on the other hand, says the bugs are now being exploited broadly ([Cybernews](https://cybernews.com/security/php2shell-wordpress-amazon-cloudflare-ai-cyberattacks/)). Cloudflare added firewall rules for all its customers, including free accounts, but describes them as a stopgap: they only help traffic that passes through Cloudflare, and attackers have already been changing their payloads to get around them.

## What to do

**If your site is on shared or managed hosting**, the PHP version is your host's responsibility. Updating WordPress, plugins or your own code does not fix this. Check your host's status page or ask them directly whether PHP has been updated to one of the versions below. Most large hosts have published notices, including [Plesk](https://support.plesk.com/hc/en-us/articles/44397729587351-Vulnerability-CVE-2026-109618-and-CVE-2026-109619-Remote-code-execution-in-PHP-shipped-with-Plesk), [GoDaddy](https://www.godaddy.com/resources/news/important-php-security-update-what-website-owners-need-to-do), [DigitalOcean](https://www.digitalocean.com/blog/critical-php-rce-vulnerabilities-patch-now) and [Laravel Forge](https://laravel.com/forge/docs/knowledge-base/php-security-release-october-2026).

**If you run your own server:**

1. **Update PHP** to a fixed version and **restart every PHP worker**. The old code keeps running in memory until you do.

   | PHP branch | Update to |
   | --- | --- |
   | 8.5 | 8.5.12 |
   | 8.4 | 8.4.27 |
   | 8.3 | 8.3.36 |
   | 8.2 | 8.2.35 |
   | 8.1, 8.0, 7.4 | Source patches only |

   PHP 8.1 and older are out of support, so there is no official release for them, only source patches. Use your Linux distribution's backported package or move to a supported version. Distributions also use their own version numbers, so check their security notices rather than comparing numbers directly. Debian 12, for example, ships the fix as `8.2.35-1~deb12u1`.

2. **Check the version your web server actually uses.** `php -v` shows the command-line version, which can differ from the one serving your site. Check the FPM service or Apache module, or use a `phpinfo()` page that you delete straight afterwards.

3. **If you cannot update today**, these settings from [Rapid7](https://www.rapid7.com/blog/post/etr-cve-2026-109618-and-cve-2026-109619-critical-unauthenticated-remote-code-execution-in-php/) reduce the risk but don't remove it. Set them at server level (php.ini, the FPM pool or Apache config), not with `ini_set()` or `.user.ini`, which apply too late, and then restart the workers:
   - `session.upload_progress.enabled = 0` blocks the confirmed session path for CVE-2026-109619.
   - `fatal_error_backtraces = 0` blocks the backtrace path on PHP 8.5.
   - Keep `post_max_size` small (8M if you don't need uploads) and block multipart uploads at your proxy if your site never accepts them.

   PHP's own advice is that updating is the only complete fix. If none of this is possible, do what CISA and the NSA said: take the site offline or put it behind a VPN until it is patched.

4. **Look for signs of compromise from 17 October onwards.** Watch for PHP worker processes starting shells or downloading tools, new files in the web root, new cron jobs and new user accounts. If you find any, isolate the server and keep the logs before you clean up.

## The rest of the week

PHP was not the only problem. This viral post summed up the mood of the week, half joking:

<blockquote class="twitter-tweet" data-dnt="true">
  <p lang="en" dir="ltr">So basically, today PHP got two critical bugs that let anyone run code on your server without even logging in, which is bad, and then the details leaked before the patch was even out, which is worse... Anyway, it&#39;s Wednesday.</p>
  &mdash; ⁵⁄₉ (@fiveoutofnine) <a href="https://x.com/fiveoutofnine/status/2113045722744717360">October 21, 2026</a>
</blockquote>
 checked three of the other incidents in the post, and they are real:

- **GitLab** fixed [CVE-2026-110264](https://www.cve.org/CVERecord?id=CVE-2026-110264), rated the maximum 10.0, which lets an attacker run code on self-managed GitLab servers without logging in by sending a specially crafted regular expression. It affects every version since GitLab 7.0 in 2014. The fix is in 19.5.1, 19.4.3 and 19.3.6, with backports to older branches ([GitLab's release notes](https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-5-1-released/)).
- **LiteLLM 1.107.0**, a popular Python library for calling AI models, was published to PyPI and Docker with a credential stealer inside. It was live for about two hours on 21 October, and installing it was enough to run the malware. LiteLLM says 1.106.2 is safe and that any machine that installed 1.107.0 should be treated as compromised, with every secret on it rotated ([LiteLLM incident report](https://docs.litellm.ai/blog/security-incident-oct-21-2026)).
- **eMudhra**, an Indian certificate authority, had eight intermediate certificates revoked after their private keys turned out to be tiny numbers. One was literally 4. Mozilla, Google, Apple and Microsoft have blocked them ([BleepingComputer](https://www.bleepingcomputer.com/news/security/mozilla-google-apple-block-compromised-emudhra-ca-certificates/)).

I haven't verified the rest of the list, so treat it as a snapshot of how the week felt rather than a checklist.

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
