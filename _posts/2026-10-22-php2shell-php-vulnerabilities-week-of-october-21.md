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
  - "Details leaked a day early, attackers started probing within hours, and the NSA, CISA and CERT-EU told anyone who could not patch to take their PHP sites offline."
title: "PHP2Shell: The Two PHP Bugs That Took Government Websites Offline, and What to Do"
description: "What CVE-2026-109618 and CVE-2026-109619 are, why governments told people to take PHP sites offline in October 2026, which PHP versions fix them, and what to do if you run or host a PHP site."
image: /assets/images/20261022-145744.png
image_alt: "The CVE record for CVE-2026-109619 published by the PHP Group, titled RCE via stale global state"
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

On Wednesday 21 October 2026, PHP released emergency fixes for two bugs that let an attacker take over a web server without logging in. PHP runs most of the web, including WordPress, Drupal, Joomla, Magento and Laravel sites, so the reaction was unusual. The NSA, CISA and CERT-EU told organisations that could not patch straight away to take their sites offline, and several governments did exactly that with their own.

The bugs became known as **php2shell**. Here is what they are, how the week unfolded, and what to do if you run a PHP site or pay someone to host one.

## What the two bugs are

The PHP Group published two CVE records on 21 October. This is the second one, CVE-2026-109619:

![The CVE record for CVE-2026-109619, published by the PHP Group on 21 October 2026, titled RCE via stale global state](/assets/images/20261022-145744.png)

Both are rated 9.2 out of 10 (CVSS v4.0) by PHP. In plain terms:

- **CVE-2026-109618: running out of memory mid-request.** When PHP runs out of memory, it can stop processing a request halfway through and then tidy up data that was never fully set up. An attacker can trigger this with specially crafted form or file uploads, even ones that look within the size limits.
- **CVE-2026-109619: leftovers from the previous request.** A PHP worker handles one request after another. Some internal state can survive after its memory has been freed, and the next request on the same worker can use it before it is reset. Rapid7 confirmed two ways in: the session upload progress feature (switched on by default) and, on PHP 8.5, the fatal error backtrace feature.

Either one can end in remote code execution: the attacker runs their own commands with the same permissions as the web server. Every common way of running PHP for the web is affected, including PHP-FPM, Apache mod_php, php-cgi, FrankenPHP and LiteSpeed. Researchers at Wiz demonstrated unauthenticated takeovers of WordPress, Drupal and Joomla, and a memory leak path that could expose passwords, API keys and certificates.

### Why the CVE page says so little

If you open the CVE record you get one paragraph and a list of weakness types, with no exploit and no fix instructions. That is by design. A CVE record is an identifier, a shared name so that PHP, hosting companies, governments and security tools all know they are talking about the same flaw. The details live in the vendor's advisory and in write-ups from security firms, which are linked at the end of this post.

## How the week unfolded

- **17 October:** Amazon's threat intelligence team later found an exploit attempt in its honeypot data from this date, four days before the fix. Amazon now recommends checking logs back to 17 October, not just from the announcement.
- **20 October, morning:** A post on Hacker News said two critical PHP bugs were about to be disclosed. It was taken down, but screenshots spread, and the security firm watchTowr confirmed the bugs were real. PHP brought its release forward by a day.
- **21 October:** PHP released 8.5.12, 8.4.27, 8.3.36 and 8.2.35, and published the advisories. CISA issued an alert the same day.
- **21 to 22 October:** Governments and companies took sites offline as a precaution while they patched.

The bugs were found with the help of AI. Researchers at Calif found them through OpenAI's "Patch the Planet" project, and OpenAI called the flaw "one of the most impactful vulnerabilities in recent memory." Wiz published its own analysis alongside.

## Why governments said "take it offline"

Telling people to switch off their own websites is rare. It happened here because the bugs are reachable before any login, affect almost every PHP version back to 5.4, and were public before most people could patch.

The NSA's first post put it bluntly:
>Effective Immediately, all organizations using PHP for their systems are advised to be prepared for an update addressing two critical vulnerabilities. PHP is widely used for web applications. These vulnerabilities often provide a direct path to the server's file system or database. If an immediate update is not feasible, it is recommend that organizations take the system offline until it can be fully mitigated. NSA will follow up shortly with more specific guidance.

<blockquote class="twitter-tweet" data-dnt="true">
  <p lang="en" dir="ltr">Effective Immediately, all organizations using PHP for their systems are advised to be prepared for an update addressing two critical vulnerabilities. … If an immediate update is not feasible, it is recommend that organizations take the system offline until it can be fully mitigated.</p>
  &mdash; NSA Cyber (@NSACyber) <a href="https://x.com/NSACyber/status/2112903220209098897">October 21, 2026</a>
</blockquote>

The next day it followed up with detailed guidance:

<blockquote class="twitter-tweet" data-dnt="true">
  <p lang="en" dir="ltr">UPDATE: Specific mitigation guidance for the recently identified PHP critical vulnerabilities is now available. Secure your servers today.</p>
  &mdash; NSA Cyber (@NSACyber) <a href="https://x.com/NSACyber/status/2113068811058622971">October 22, 2026</a>
</blockquote>

CISA gave the same advice for anyone who could not update, or who runs PHP 8.1 or older. CERT-EU advised taking sites offline while patches were pending, and the UK's National Cyber Security Centre warned organisations to look for backdoors.

The most unusual warning came from Japan. Shortly before 10 pm on 21 October, Prime Minister Sanae Takaichi posted on X asking everyone to act that night: check whether their public websites use PHP, get the fix ready, and treat temporarily stopping a site as a valid way to reduce the risk. She took her own website offline too.
(I noticed the Japanese tweet doesn't have auto translate enabled, so you may)

<blockquote class="twitter-tweet" data-dnt="true" data-lang="ja">
  <p lang="ja" dir="ltr">皆様に、今夜に対応して頂きたい大至急のお願いです。多くのウェブサイトで使用されているPHPに関し、PHPのセキュリティチームが、重大な２件の脆弱性に関する注意喚起を行っています。…</p>
  &mdash; 高市早苗 (@takaichi_sanae) <a href="https://x.com/takaichi_sanae/status/2112890642590564386">October 21, 2026</a>
</blockquote>

A day later she followed up for the businesses that still had their sites switched off:

<blockquote class="twitter-tweet" data-dnt="true" data-lang="ja">
  <p lang="ja" dir="ltr">今回のPHPの脆弱性対応のため、現在もウェブサイトを一時停止されている事業者などの皆様もいらっしゃると思います。…</p>
  &mdash; 高市早苗 (@takaichi_sanae) <a href="https://x.com/takaichi_sanae/status/2113118173818224932">October 22, 2026</a>
</blockquote>

Many organisations did take their sites down for a while. Reported examples include the Dutch government portal Overheid.nl, all of Finland's public-facing government web services, the French Interior Ministry's websites and Denmark's national school platform. The Wikimedia Foundation shut down a number of supporting services, the Internet Archive briefly went offline to patch, and parts of the Japanese web went dark, including online shops and several popular games.

## How fast attackers moved

Cloudflare sits in front of a large share of the web, so it sees attacks early. Its CEO, Matthew Prince, shared these numbers on 22 October:

<blockquote class="twitter-tweet" data-dnt="true">
  <p lang="en" dir="ltr">Some stats on #php2shell. In the 10 hours before it was publicly announced, across the @Cloudflare network we saw thousands of attempts to exploit it. That jumped to tens of thousands in the 45 minutes post announcement, hundreds of thousands within 2 hours, and millions now.</p>
  &mdash; Matthew Prince (@eastdakota) <a href="https://x.com/eastdakota/status/2113079352682570051">October 22, 2026</a>
</blockquote>

These are attempts, not confirmed break-ins. On 21 October CISA said it had not yet seen successful exploitation, and Germany's BSI and the Dutch authorities reported the same. Amazon's security team, on the other hand, says the bugs are now being exploited broadly. Cloudflare added firewall rules for all its customers, including free accounts, but describes them as a stopgap: they only help traffic that passes through Cloudflare, and attackers have already been changing their payloads to get around them.

## What to do

**If your site is on shared or managed hosting**, the PHP version is your host's responsibility. Updating WordPress, plugins or your own code does not fix this. Check your host's status page or ask them directly whether PHP has been updated to one of the versions below. Most large hosts, including Plesk, GoDaddy, DigitalOcean and Laravel Forge, have published notices about it.

**If you run your own server:**

1. **Update PHP** to a fixed version and **restart every PHP worker**. The old code keeps running in memory until you do.

   | PHP branch | Update to |
   | --- | --- |
   | 8.5 | 8.5.12 |
   | 8.4 | 8.4.27 |
   | 8.3 | 8.3.36 |
   | 8.2 | 8.2.35 |
   | 8.1, 8.0, 7.4 | No official release, only source patches. Use your distribution's backported package or upgrade to a supported version. |

   Linux distributions use their own version numbers, so check their security notices rather than comparing numbers directly. Debian 12, for example, ships the fix as `8.2.35-1~deb12u1`.

2. **Check the version your web server actually uses.** `php -v` shows the command-line version, which can differ from the one serving your site. Check the FPM service or Apache module, or use a `phpinfo()` page that you delete straight afterwards.

3. **If you cannot update today**, these settings reduce the risk but don't remove it. Set them at server level (php.ini, the FPM pool or Apache config), not with `ini_set()` or `.user.ini`, which apply too late, and then restart the workers:
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

Not every detail in it holds up. The Japanese Prime Minister's post went out at night, not at 5:55 in the morning, for example. I checked three of the other incidents it mentions, and they are real:

- **GitLab** fixed CVE-2026-110264, rated the maximum 10.0, which lets an attacker run code on self-managed GitLab servers without logging in. Reports say it goes back to versions from 2014. The fixed releases include 19.5.1, 19.4.3 and 19.3.6.
- **LiteLLM 1.107.0**, a popular Python library for calling AI models, was published to PyPI and Docker with a credential stealer inside. It was live for about two hours on 21 October, and installing it was enough to run the malware. LiteLLM says 1.106.2 is safe and that any machine that installed 1.107.0 should be treated as compromised, with every secret on it rotated.
- **eMudhra**, an Indian certificate authority, had eight intermediate certificates revoked after their private keys turned out to be tiny numbers. One was literally 4. Mozilla, Google, Apple and Microsoft have blocked them.

I haven't verified the rest of the list, so treat it as a snapshot of how the week felt rather than a checklist.

## Sources

- [CISA: Critical Vulnerabilities in PHP Require Immediate Patching](https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching)
- [Rapid7: CVE-2026-109618 and CVE-2026-109619 technical analysis and mitigations](https://www.rapid7.com/blog/post/etr-cve-2026-109618-and-cve-2026-109619-critical-unauthenticated-remote-code-execution-in-php/)
- [Huntress: timeline of the leak and disclosure](https://www.huntress.com/blog/php2shell-leaked-critical-php-vulnerabilities)
- [Help Net Security: PHP2Shell patched, and Amazon's 17 October finding](https://www.helpnetsecurity.com/2026/10/21/php2shell-php-vulnerabilities-patched-cve-2026-109618-cve-2026-109619/)
- [The National: governments take sites offline; OpenAI's role in the discovery](https://www.thenationalnews.com/future/technology/2026/10/21/php-security-issues-exploit/)
- [Nikkei](https://www.nikkei.com/article/DGXZQOUA221J60S6A021C2000000/) and [ITmedia](https://www.itmedia.co.jp/news/article/2610/22/2000002483/) on Prime Minister Takaichi's warning (Japanese)
- [The Next Web: millions of attempts, no confirmed break-ins yet](https://thenextweb.com/news/php2shell-millions-exploit-attempts-no-confirmed-breaches)
- [LiteLLM incident report](https://docs.litellm.ai/blog/security-incident-oct-21-2026)
- [BleepingComputer: Mozilla, Google and Apple block eMudhra certificates](https://www.bleepingcomputer.com/news/security/mozilla-google-apple-block-compromised-emudhra-ca-certificates/)

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
