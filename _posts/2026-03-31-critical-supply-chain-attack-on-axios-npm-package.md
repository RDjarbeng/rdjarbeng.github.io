---
layout: post
title: "CRITICAL: Active Supply Chain Attack on Axios NPM Package Update (Resolved)"
date: 2026-03-31T23:08:34+02:00
author: Richard
category: Security
tags:
  - Security
  - NPM
  - Axios
  - Malware
  - Supply Chain Attack
image: /assets/images/posts/covers/axios_security_cover.jpg
image_alt: "Cybersecurity warning for Axios NPM supply chain attack"
card_items:
  - name: What is Axios?
    description: Axios is a simple promise based HTTP client for the browser and node.js, enabling developers to easily send asynchronous HTTP requests. It is one of the most depended-on packages in the entire npm ecosystem. Allowing devs to make XMLHttpRequests directly from the browser.
    url: https://axios-http.com/
    link_text: Learn about Axios
    badge_1: Framework
  - name: Socket Security Report
    description: Read the in-depth technical analysis and official incident report regarding the compromised plain-crypto-js package directly from the Socket Security research team.
    url: https://socket.dev/blog/axios-npm-package-compromised
    link_text: Read the full report
    badge_1: Detailed Analysis
  - name: GitHub Issue #10604
    description: Tracking the supply chain attack and the resolution process directly on the official Axios repository. Technical details and maintainer responses can be found here.
    url: https://github.com/axios/axios/issues/10604
    link_text: View on GitHub
    badge_1: Technical Track
---
**TLDR:** A popular npm package has been attacked and it's used by many web developers.

If you are a JavaScript or Node.js developer, **stop what you are doing and audit your dependencies.** 

A critical, active supply chain attack is currently underway targeting **Axios**, one of the most heavily depended-on packages in the entire npm ecosystem (boasting over 100 million weekly downloads). 

This terrifying live compromise was discovered and publicly reported by X/Twitter user [@feross](https://twitter.com/feross) (Founder + CEO @SocketSecurity • Visiting lecturer @Stanford). This is textbook supply chain installer malware, and any `npm install` pulling the latest version is potentially compromised right now.

<center>
<blockquote class="twitter-tweet">
  <a href="https://twitter.com/feross/status/2038807290422370479"></a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</center>

## The Exploit: How the Axios Attack Works

The malicious payload revolves around the latest package release, `axios@1.14.1`. This seemingly routine update silently pulls in a brand-new, malicious dependency called `plain-crypto-js@4.2.1`—a package that did not exist before today. 

Security firm Socket AI has confirmed through analysis that `plain-crypto-js` is far from an innocent cryptographic utility. It is an obfuscated dropper/loader malware designed to compromise the host machine immediately upon installation.

### Key Capabilities of the Malware:

- **Runtime Deobfuscation:** It dynamically deobfuscates its embedded payloads and operational strings only at runtime to evade static code scanners.
- **Dynamic Module Loading:** The script actively loads Node modules like `fs`, `os`, and `execSync` dynamically, masking its true intent from typical heuristic defenses.
- **Shell Command Execution:** It actively executes decoded shell commands on the host machine.
- **File Staging & Payload Deployment:** The malware copies payload files into your operating system's Temp directory and the Windows ProgramData directory.
- **Forensic Destruction:** Once the payload is successfully executed, the script deletes and renames its initial artifacts to purposefully destroy forensic evidence and hide its tracks.

## The Industry Reaction

Given Axios's ubiquitous presence in frontend, backend, and full-stack environments, the tech community's reaction has been swift and deeply concerned. Even prominent AI figures like Andrej Karpathy have reacted to the sheer scale and audacity of the attack:

<center>
<blockquote class="twitter-tweet">
  <a href="https://twitter.com/karpathy/status/2038849654423798197"></a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</center>

## What You Need to Do Immediately

If you use Axios in any of your projects—whether personal, enterprise, or experimental—you must take immediate action to protect your environments:

1. **Do NOT Upgrade:** If you are on an older version of Axios (e.g., `1.7.x` or `1.13.x`), hold off on running any update commands.
2. **Pin Your Versions:** Update your `package.json` to hard-pin the exact, known-safe version of Axios by removing the caret (`^`) or tilde (`~`) prefixes.
3. **Audit Your Lockfiles:** Run a deep audit on your `package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml` specifically looking for the presence of `plain-crypto-js`. If it exists, your environment may already be compromised.
4. **Scan CI/CD:** Ensure that your automated deployment pipelines have not inadvertently pulled the latest broken patch.

Continue tracking this situation as npm security teams address the compromised package. Stay vigilant and triple-check your dependencies!

## Has this been resolved?


**Yes, the supply chain attack has been resolved at the source.**  

npm quickly unpublished the malicious versions (**axios@1.14.1**, **axios@0.30.4**, and the injected dependency **plain-crypto-js@4.2.1**) within roughly 3 hours of publication (they went live around 00:21–01:00 UTC on March 31, 2026, and were removed by ~03:29 UTC).  

As of now (evening of March 31, 2026):  
- The **latest** version on npm is **axios@1.14.0** (published a 4 days *before* the attack).  
- A clean `npm install axios` (or equivalent) will now pull a safe version.  
- The malicious versions no longer appear on the npm registry and cannot be installed fresh.  

The attacker had hijacked the lead maintainer’s npm account (jasonsaayman) and published the poisoned packages manually, bypassing normal GitHub Actions workflows. npm and the maintainers acted fast to revoke access and clean up.  

Technical users can find the official GitHub issue tracking this vulnerability and the community resolution process here: [Axios Issue #10604](https://github.com/axios/axios/issues/10604)

### Important caveat (this part is *not* fully resolved for everyone)
If your project (or any CI/CD pipeline, dev machine, etc.) installed **axios@1.14.1**, **axios@0.30.4**, or **plain-crypto-js@4.2.1** *during the short window the packages were live*, the postinstall malware likely ran. In that case:  
- Assume the machine/environment is compromised (cross-platform RAT that steals credentials and beacons out).  
- Immediately **rotate all secrets** (npm tokens, cloud keys, API keys, SSH keys, etc.).  
- Delete `node_modules`, your lockfile (`package-lock.json` / `yarn.lock` / `pnpm-lock.yaml`), and reinstall with a pinned safe version:  
  ```bash
  npm install axios@1.14.0   # or axios@0.30.3 for the 0.x branch
  ```  
- For extra safety, add an `overrides` (npm) / `resolutions` (yarn) block to force the safe version even for transitive dependencies.  

**Quick check command:**  
```bash
npm ls axios plain-crypto-js
```  
Look for the bad versions in any lockfile or `node_modules`.

The ecosystem response (Socket Security, Step Security, various security firms) caught it extremely fast, and the attack window was narrow, so most people who update today onward are fine. Pin your dependencies going forward and consider tools like Socket or npm audit + lockfile scanning to avoid the next one.  

The immediate threat is over, but treat any exposure from earlier today as a real breach.
