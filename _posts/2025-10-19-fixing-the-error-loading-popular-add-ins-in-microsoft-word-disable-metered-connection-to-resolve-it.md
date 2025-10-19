---
date: 2025-10-19T17:56:00
published: false
author: Richard
categories:
  - Help
tags:
  - Help
title: 'Fixing the "Error Loading Popular Add-ins" in Microsoft Word: Disable Metered Connection to Resolve It'
image: ''
layout: post
---
If you've ever fired up Microsoft Word, headed to **Insert > Get Add-ins**, and been slapped with the frustrating message *"There was an error loading popular add-ins. Please dismiss this flyout and try again"*, you're not alone. This pesky error can halt your productivity dead in its tracks, especially when you're trying to grab handy tools like citation managers or diagramming extensions. I ran into this exact issue recently while using **Microsoft Office Professional Plus 2021** on a Windows laptop tethered to mobile data via hotspot. After hours of scouring forums, Microsoft docs, and Reddit threads—only to come up empty-handed on a clear fix—I finally cracked it.

**The Solution That Worked for Me: Disable the Metered Connection Setting**  
Windows treats mobile data or hotspots as "metered" by default to conserve data, which blocks Word from fetching add-ins from Microsoft's online store. Turning this off instantly fixed the error—no reboots, updates, or repairs required.

## Quick Test: Confirm It's Your Connection
Switch to a non-mobile Wi-Fi network and retry the add-ins pane. If it works flawlessly, metered mode is your villain.

## Step-by-Step Fix: Disable Metered Connection
Here's how to toggle it off in Windows 10/11:

1. **Open Settings**: Hit the Windows key + I, or right-click the Start button > Settings.
2. **Navigate to Network**: Go to **Network & Internet** (or search "metered" in the top bar for a shortcut).
3. **Select Your Connection**:
   - For Wi-Fi/hotspot: Click **Wi-Fi** > Click your network name.
   - For mobile/cellular: Click **Cellular** or **Mobile hotspot**.
4. **Toggle Metered Off**:
   - Scroll to **Metered connection** (or **Set as metered connection**).
   - Switch the toggle to **Off**.
5. **Retest in Word**:
   - Fire up Word > Insert > Get Add-ins.
   - Popular add-ins should load without a hitch. (Pro tip: Dismiss any lingering flyouts first.)

![Screenshot of Windows Settings showing metered toggle](https://example.com/metered-toggle-screenshot.png)  
*(Image: The metered connection toggle in Windows Settings—flip it off for instant relief.)*

**Revert Tip**: Once fixed, you can toggle it back on to resume data-saving. Just remember to test add-ins periodically if you're on the go.

## Why Does This Happen?
- **Metered Connections 101**: Windows enables this automatically for cellular/hotspot links to prevent surprise data bills. It limits non-essential internet activity, like loading previews or catalogs in apps.
- **Word's Dependency**: Add-ins pull from the cloud, so any network restriction (firewalls, proxies, or metered flags) can trigger the error. In my case, it was 100% reproducible on mobile data but vanished on Wi-Fi.
- **Affected Versions**: This hits perpetual licenses like Office 2021 hardest, as they don't auto-update as fluidly as Microsoft 365 subscriptions.

If you're on a work laptop or strict data plan, this "feature" bites harder—IT policies might enforce metered mode too.

## Other Common Culprits (If This Doesn't Fix It)
While metered mode nailed it for me, rule these out next:
- **Outdated Office**: Check for updates via **File > Account > Update Options > Update Now** (or Windows Update).
- **Antivirus Interference**: Temporarily disable and test—add Office folders to exclusions.
- **Time Sync Issues**: Ensure your system clock is synced (right-click taskbar clock > Adjust date/time > Sync now).
- **Full Repair**: As a nuclear option, **Settings > Apps > Microsoft Office > Modify > Quick Repair**.

## Final Thoughts
This fix took way longer to uncover than it should have—props to trial-and-error over endless Googling. If you're battling the same error, drop a comment below: Was metered mode your issue too? Or did something else trip you up? Sharing these niche wins keeps the community sane. In the meantime, happy add-in hunting—may your documents diagram themselves effortlessly.

*If this helped, share it with a colleague who's secretly cursing their hotspot. 🚀*

*Disclaimer: This is based on Windows 11 and Office 2021 testing. Results may vary on older OSes or Mac.*
