---
date: 2025-10-19T17:56:00
published: false
author: Richard
categories:
  - How-to Guides
tags:
  - Microsoft Word
  - Windows 11
  - Windows 10
  - Troubleshooting
  - Networking
  - Office Add-ins
  - PowerShell
title: 'Fixing the Error Loading Popular Add-ins in Microsoft Word: Network Cost Policy Resolution'
description: A technical guide to resolving Microsoft Word add-in catalog failures caused by Windows Network List Manager metered connection cost flags on cellular and hotspot links.
image: /assets/images/posts/covers/word_addins_metered_connection_cover.jpg
image_alt: 'Windows Network Cost Manager architecture and Microsoft Word add-in store resolution diagram'
layout: post
key_points:
  - Windows automatically assigns metered cost flags to cellular hotspots to prevent background bandwidth consumption.
  - Microsoft Office respects Network List Manager policies by suppressing non-essential HTTP catalog queries within Edge WebView2.
  - Toggling connection cost to unrestricted via Windows Settings or PowerShell immediately restores AppSource store connectivity.
card_items:
  - title: The NLM Cost Engine
    description: How the Windows Network List Manager signals WinINet to throttle background catalog requests on cellular interfaces.
  - title: PowerShell Remediation
    description: Using administrative NetConnectionProfile cmdlets to inspect and clear metered flags programmatically.
  - title: WebView2 Store Pipeline
    description: Diagnosing how Office.js runtimes communicate with remote AppSource XML manifests over WinHTTP.
---

When attempting to browse or install extensions in desktop Microsoft Word through the menu sequence Insert, then Get Add-ins, users frequently encounter an abrupt modal dialog:

```text
There was an error loading popular add-ins. Please dismiss this flyout and try again.
```

This failure halts the installation of essential productivity tools including citation managers (Zotero, Mendeley), diagramming tools (Lucidchart, Draw.io), and mathematical editors. 

The issue commonly manifests when operating Microsoft Word (spanning Microsoft Office Professional Plus 2021, Office 2019, and enterprise Microsoft 365 desktop builds) on a laptop tethered to a smartphone via mobile hotspot or cellular Wi-Fi.

While basic troubleshooting guides suggest reinstalling Microsoft Office or running repair wizards, the root cause resides within the Windows Network Cost Policy Engine.

| Step | Lifecycle Phase | System Event |
| :--- | :--- | :--- |
| **1** | Wi-Fi Connection | Windows detects connection as cellular or metered hotspot |
| **2** | Network List Manager | Asserts `NLM_CONNECTION_COST_FIXED` cost policy |
| **3** | Bandwidth Throttling | WinINet and WinHTTP suppress background catalog polling |
| **4** | Catalog Failure | Office WebView2 host drops AppSource catalog queries |
| **5** | Error Display | Word displays: "There was an error loading popular add-ins" |

## Architectural Root Cause: The Network List Manager

Windows 10 and Windows 11 manage network interfaces through the Network List Manager (NLM) COM service. When a client device connects to a Wi-Fi network broadcasting an 802.11 management frame identifying as a mobile device, or when an operator cellular SIM interface is detected, Windows automatically marks the profile with a metered flag.

Inside the Windows networking stack, the `INetworkCostManager` interface exposes connection cost states:

```cpp
typedef enum NLM_CONNECTION_COST {
    NLM_CONNECTION_COST_UNKNOWN     = 0x0,
    NLM_CONNECTION_COST_UNRESTRICTED= 0x1,
    NLM_CONNECTION_COST_FIXED       = 0x2,
    NLM_CONNECTION_COST_VARIABLE    = 0x4,
    NLM_CONNECTION_COST_OVERDATALIMIT = 0x10000,
    NLM_CONNECTION_COST_CONGESTED   = 0x20000,
    NLM_CONNECTION_COST_ROAMING     = 0x40000,
    NLM_CONNECTION_COST_APPROACHINGDATALIMIT = 0x80000
} NLM_CONNECTION_COST;
```

When a network connection is flagged with `NLM_CONNECTION_COST_FIXED` or `NLM_CONNECTION_COST_VARIABLE`, Windows instructs consumer applications to conserve data.

### Impact on Microsoft Office Add-in Runtimes

Modern Office add-ins run within an embedded Chromium-based Microsoft Edge WebView2 control. When the user opens the Add-in Store dialog:

1. The Word process (`WINWORD.EXE`) initializes a WebView2 host process (`msedgewebview2.exe`).
2. The runtime issues asynchronous HTTPS GET requests to Microsoft AppSource store catalog endpoints (`store.office.com` and `appsource.microsoft.com`).
3. The underlying Windows HTTP stack (WinHTTP / WinINet) checks the active connection cost status via NLM.
4. Because the connection is classified as metered, Office suppresses secondary catalog queries to prevent data exhaustion on cellular quotas.
5. The WebView2 component fails to receive the remote catalog JSON payload and returns the default error modal.

## Step-by-Step Resolution Procedures

Restoring full add-in catalog functionality requires reclassifying the network interface cost from metered to unrestricted.

| Resolution Pathway | Target Audience | Primary Tool |
| :--- | :--- | :--- |
| **Path A: Graphical Settings** | Individual desktop users | Windows Settings app |
| **Path B: PowerShell Script** | IT administrators and power users | Administrative terminal command |
| **Path C: Registry Policy** | Enterprise fleets | Group Policy and registry override |

### Method 1: Windows Graphical Settings

The primary fix involves toggling off the metered designation in the Windows Network settings:

1. Open Windows Settings using the keyboard shortcut Windows Key + I.
2. Select **Network & internet** from the left navigation panel.
3. Depending on the active network interface:
   - For Wi-Fi or tethered hotspots: Click **Wi-Fi**, then click the name of the active wireless network to open its profile properties.
   - For direct USB cellular modems: Click **Cellular**.
4. Scroll down to the **Metered connection** section.
5. Toggle the switch labeled **Set as metered connection** to **Off**.
6. Return to Microsoft Word, dismiss the error modal, and re-open **Insert > Get Add-ins**. The catalog will load normally.

```text
Windows Settings -> Network & internet -> Wi-Fi -> [Active Network SSID] -> Metered connection (Toggle to OFF)
```

### Method 2: Administrative PowerShell Cmdlets

System administrators and advanced users can inspect and update connection cost flags directly via an elevated PowerShell prompt:

1. Right-click the Start menu and select **Terminal (Admin)** or **Windows PowerShell (Admin)**.
2. Query the current network profile names and operational categories:

```powershell
Get-NetConnectionProfile
```

The output displays active network adapters along with their assigned interface index:

```text
Name             : AndroidHotspot_5G
InterfaceAlias   : Wi-Fi
InterfaceIndex   : 14
NetworkCategory  : Public
IPv4Connectivity : Internet
IPv6Connectivity : NoTraffic
```

3. Query the cost state using the NetConnectionProfile module:

```powershell
Get-NetConnectionProfile -InterfaceIndex 14 | Select-Object Name, NetworkCategory
```

4. If needed, configure the network category to Private and verify that corporate firewall restrictions permit local catalog traffic:

```powershell
Set-NetConnectionProfile -Name "AndroidHotspot_5G" -NetworkCategory Private
```

To enforce unrestricted cost status across PowerShell scripts, the Windows Connection Manager registry keys can be updated directly.

### Method 3: Windows Registry Default Media Cost Override

To prevent Windows from ever classifying Wi-Fi or Ethernet interfaces as metered by default, administrators can adjust the DefaultMediaCost registry hive.

```text
Key Path: HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\NetworkList\DefaultMediaCost
```

Inside this registry key, DWORD values determine the cost classification for each media type:

- `3G`: Default value 2 (Metered)
- `4G`: Default value 2 (Metered)
- `Ethernet`: Default value 1 (Unrestricted)
- `WiFi`: Default value 1 (Unrestricted)

Setting `WiFi` to `1` prevents Windows from automatically applying metered restrictions to wireless hotspots. Note that editing this registry key requires taking ownership of the key permissions from the `TrustedInstaller` service account.

## Secondary Diagnostic Checkpoints

If the add-in store fails to load after setting the connection to unrestricted, inspect the following secondary failure points:

### 1. Edge WebView2 Runtime Cache Corruption

Office add-in dialogs maintain local web caches on disk. Stale authentication cookies or truncated manifest downloads can cause persistent loading errors.

To clear the Office WebView2 cache:

1. Close all active Microsoft Office applications (`WINWORD.EXE`, `EXCEL.EXE`, `POWERPNT.EXE`).
2. Open Windows File Explorer and navigate to the application data cache directory:

```text
%LOCALAPPDATA%\Microsoft\Office\16.0\Wef\
```

3. Delete all subfolders inside the `Wef` (Web Extension Framework) directory.
4. Restart Microsoft Word and re-open the add-in catalog to force a fresh manifest retrieval.

### 2. System Clock Skew and TLS Certificate Handshakes

The Microsoft AppSource catalog requires strict HTTPS transport security. If the client laptop local hardware clock diverges by more than five minutes from coordinated universal time, TLS handshakes to `store.office.com` will fail silently with certificate validation errors.

Verify time synchronization:

```powershell
w32tm /resync /force
```

### 3. Corporate Group Policy and Tenant Add-in Blocks

In enterprise environments governed by Microsoft Intune or Active Directory Group Policy Objects (GPO), administrators often disable the public Office Store catalog entirely:

```text
GPO Path: User Configuration > Administrative Templates > Microsoft Office 2016 > Security Settings > Trust Center
Policy: Block Web Add-ins from the Office Store
```

If this policy is set to Enabled, the Word client will refuse to query AppSource regardless of network connection properties. Users in enterprise tenants must install approved add-ins distributed through the Admin Managed tab.

## Technical Summary

The modal failure when loading Microsoft Word add-ins on mobile hotspots is not a software crash or corrupted application installation. It is an intentional, defensive data conservation behavior enforced by the Windows Network List Manager.

By understanding how the `INetworkCostManager` COM interface instructs the WinINet and WebView2 runtimes to throttle background HTTP catalog queries, engineers can resolve the block in seconds by toggling the connection profile cost to unrestricted.
