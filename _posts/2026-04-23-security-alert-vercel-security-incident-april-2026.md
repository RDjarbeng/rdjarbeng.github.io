---
date: 2026-04-23T11:47:00+02:00
published: true
author: Richard
tags:
  - Vercel
  - Security
  - Supply Chain Attack
  - OAuth
  - Environment Variables
  - Google Workspace
  - Context.ai
  - Developer Tools
  - Cybersecurity
  - Incident Response
key_points:
  - "Vercel disclosed a supply-chain attack in April 2026, where an attacker compromised Context.ai, a third-party AI tool used by a Vercel employee, to gain unauthorized access to Vercel internal systems."
  - "The attack involved the theft of OAuth tokens from Context.ai, which allowed the attacker to move laterally into Vercel's Google Workspace account and access environment variables that were not marked as sensitive."
  - "The compromised environment variables contained sensitive data, but Vercel has stated that environment variables marked as sensitive are stored in a way that prevents them from being read back, and there is currently no evidence that personal data or credentials were compromised."
  - "Vercel has identified and contacted a limited subset of customers whose credentials were confirmed to be compromised, advising them to rotate credentials immediately. The company has also updated its platform to default all new environment variables to sensitive and enhanced team-wide environment variable management."
title: 'Security Alert: Vercel Supply Chain Attack (April 2026) in 4 minutes'
image: /assets/images/vercel_security_incident_april_2026_cover.png
image_alt: 'A dramatic dark-themed cover image showing a cracked security shield with the Vercel logo surrounded by digital chains and broken padlocks, representing the April 2026 supply-chain security incident. Text reads: SECURITY ALERT: VERCEL INCIDENT · APRIL 2026'
layout: post
card_items:
  - name: What is a Supply Chain Attack?
    badge_1: Cybersecurity
    description: A supply chain attack targets less-secure elements in the software or service ecosystem (vendors, third-party tools, or partners) to gain access to the primary target. The attacker compromises an upstream dependency rather than attacking the target directly.
  - name: OAuth Token Theft
    badge_1: Authentication
    description: OAuth tokens are credentials that grant applications access to a user's account without sharing a password. If an OAuth token is stolen, an attacker can impersonate the user and access connected services, without ever needing the real password.
  - name: Sensitive Environment Variables in Vercel
    badge_1: Vercel Feature
    description: Vercel's 'sensitive' environment variable feature stores values encrypted in a way that prevents them from being read back, even by Vercel employees. Enabling this for secrets like API keys ensures they cannot be exposed even in an internal breach.
    url: https://vercel.com/docs/environment-variables/sensitive-environment-variables
    link_text: Vercel Docs
  - name: What is Google Workspace?
    badge_1: Productivity Suite
    description: Google Workspace (formerly G Suite) is Google's cloud-based productivity platform used by businesses, including Gmail, Drive, Docs, and admin tools. Because it's deeply integrated into many organizations, a compromised Workspace account is a powerful foothold for attackers.
series: "Security Alerts"
series_part: 2
category: "Security"
---

> **Update, 20 November 2026: how it ended.** Vercel closed the incident on 16 October 2026, saying all remediation actions were complete ([Vercel security bulletin](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident)). What we learned after this post was first written:
>
> - **More accounts were affected than first reported.** A wider log review on 22 and 23 April found a small number of additional compromised accounts, and those customers were notified. Vercel also found a few accounts with signs of a separate compromise that did not originate on its systems and is not part of this incident.
> - **The npm supply chain was safe.** Working with GitHub, Microsoft, npm and Socket, Vercel confirmed that no npm packages it publishes were tampered with.
> - **Who did it is still not settled publicly.** Vercel described the attacker as highly sophisticated and worked with Google Mandiant and law enforcement. A group claiming links to ShinyHunters demanded $2 million, but ShinyHunters denied involvement ([The Block](https://www.theblock.co/news/markets/2026-04-19-web3-hosting-backbone-vercel-confirms-breach-as-supposed-hacker-demands-2-million-ransom-398010), [Infosecurity Magazine](https://www.infosecurity-magazine.com/news/vercel-cyber-incident-threat-actor/)). Researchers at Hudson Rock traced the start of the chain to infostealer malware on a Context.ai employee's machine in February 2026 ([The Hacker News](https://thehackernews.com/2026/04/vercel-breach-tied-to-context-ai-hack.html)); Vercel has not confirmed that detail. As of this update I found no public reports of arrests or lawsuits.
> - **What changed in the product:** stronger defaults for environment variables, a team-wide security overview of them, and an easier-to-use activity log.
>
> The advice below still stands: mark secrets as sensitive, rotate anything stored as plain environment variables, enable MFA, and review which third-party apps hold OAuth access to your work accounts. The rest of this post is the original alert from 23 April 2026.

Vercel has disclosed a security incident involving unauthorized access to certain internal systems, which has led to the exposure of some customer environment variables.

If you use Vercel, here is a breakdown of what happened, who is impacted, and the immediate steps you should take to secure your applications.

![A dramatic dark-themed cybersecurity cover image showing a cracked red shield with the Vercel chevron logo, surrounded by broken padlocks and digital chains, conveying the April 2026 security breach.](/assets/images/vercel_security_incident_april_2026_cover.png "Security Alert: Vercel Incident, April 2026")

## The Origin: A Supply-Chain Attack

This was not a vulnerability within Vercel's core infrastructure. It was a **supply-chain attack**, one of the most insidious forms of breach, where an attacker gets in through a trusted third party rather than attacking the target directly.

Here is how the chain of events unfolded:

1. **Context.ai is compromised (March 2026):** Context.ai, an AI productivity tool used by a Vercel employee, was previously breached. Attackers stole OAuth tokens from the Context.ai platform.
2. **Lateral movement into Google Workspace:** Using the stolen OAuth token, attackers gained unauthorized access to the Vercel employee's **Google Workspace** account. The employee had previously authorized Context.ai with broad permissions ("Allow All") to access their Workspace.
3. **Access to Vercel internal environments:** With control of the Google Workspace account, the attacker moved laterally into Vercel's internal systems and was able to **enumerate and read environment variables that were not marked as "sensitive."**

Vercel has stated that environment variables properly marked as "sensitive" are stored in a way that prevents them from being read back, even internally, and there is currently **no evidence** that those values were compromised.

## Who is Impacted?

Vercel has already identified and directly contacted a limited subset of customers whose credentials were confirmed to be compromised, advising them to rotate credentials immediately.

**If Vercel has not contacted you, they currently have no reason to believe your personal data or credentials were compromised.** However, the investigation was still ongoing at the time of writing (it closed in October 2026, see the update above) in partnership with **Mandiant**, industry peers, and law enforcement. Vercel services, including Next.js, Turbopack, the AI SDK, and all published npm packages, remain fully operational and were not affected.

### Sources and Time of Discovery

_Source:_ [_Official Vercel Security Bulletin_](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident)

First discovered: **April 19, 11:04 AM PST**

## What You Need to Do Right Now

Even if you haven't been contacted, all Vercel users should take the following precautionary steps:

1. **Review and Rotate Secrets:** Check your environment variables. If you have any secrets (API keys, database credentials, tokens, signing keys) that were **not** marked as sensitive, treat them as exposed and rotate them immediately.
2. **Enable Sensitive Environment Variables:** Going forward, ensure you are taking advantage of Vercel's [sensitive environment variables feature](https://vercel.com/docs/environment-variables/sensitive-environment-variables) to protect secret values from being read. Vercel has already updated the platform to **default all new environment variables to sensitive**.
3. **Audit Activity and Deployments:** Review your [activity logs](https://vercel.com/activity-log) and recent deployments for anything suspicious or unexpected. Delete any deployments you do not recognize.
4. **Check Deployment Protection:** Ensure your Deployment Protection is set to "Standard" at a minimum, and rotate your Deployment Protection tokens if you use them.
5. **Audit Your OAuth Apps:** Review third-party apps connected to your Google Workspace and other corporate accounts. Remove any applications you do not recognize or no longer actively use. This incident is a reminder that every OAuth grant is a potential entry point.

## Indicator of Compromise (IOC)

Because the initial breach involved a third-party Google Workspace OAuth app used by **hundreds of organizations outside of Vercel**, the security team has released the following IOC to help the broader community check their environments.

Google Workspace Administrators and Google Account owners should immediately check their environments for usage of the following malicious/compromised app:

- **OAuth App:** `110671459871-30f1spbu0hptbs60cb4vsmv79i7bbvqj.apps.googleusercontent.com`

If this app ID appears in your Google Workspace OAuth audit logs, you should treat your environment as potentially compromised and rotate all credentials immediately.

## What Vercel Has Changed

In response to the incident, Vercel has shipped several platform-level security improvements:

- **Default-sensitive environment variables:** All newly created environment variables now default to the "sensitive" designation, preventing them from being read back.
- **Enhanced team-wide environment variable management:** Improved tooling for administrators to audit and manage environment variables across their entire team.

## The Bigger Picture: Third-Party Risk

This incident is a sharp reminder that your security posture is only as strong as the weakest tool in your stack. Granting third-party apps broad OAuth permissions, especially "Allow All" scopes, is a significant risk that is often overlooked.

For developers and engineering teams, the takeaway is clear: treat your OAuth grants like you treat your code dependencies. Audit them regularly, apply the principle of least privilege, and revoke access for anything you no longer actively use.

***

_For technical support or help rotating your secrets, contact Vercel through their help portal at_ [_vercel.com/help_](https://vercel.com/help)_._
