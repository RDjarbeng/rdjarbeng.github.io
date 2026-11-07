---
date: 2026-01-12T12:51:00+02:00
published: false
author: Richard
category: Web & Software
tags:
  - Windows
  - Web & Software
  - Operating Systems
  - Linux
  - Systems Architecture
title: "The Engineering Behind Windows Updates: File Locks, Kernel Restarts, and Modern OS Alternatives"
image: /assets/images/posts/covers/windows_update_evolution_cover.jpg
image_alt: Technical architectural diagram contrasting Windows Win32 file locking mechanisms against Linux inode unlinking and Android A/B partition updates
layout: post
description: An architectural comparison of operating system update mechanisms, analyzing why Windows historically demanded disruptive reboots due to Win32 file locks and how Linux, Android, and macOS achieve seamless patching.
key_points:
  - Windows requires reboots because the Win32 subsystem locks opened binaries and DLL files into memory, preventing in-place disk replacement.
  - The Windows Session Manager executes deferred updates during boot through the PendingFileRenameOperations registry queue.
  - Linux utilizes POSIX inode unlinking to replace running shared libraries on disk without terminating active processes.
  - Modern platforms deploy dual-slot A/B system partitions and memory-level hotpatching to eliminate user interruptions entirely.
card_items:
  - title: Win32 File Locking
    content: When a process loads an executable image into memory, Windows locks the disk binary, deferring file writes until the system restarts.
  - title: POSIX Inode Replacement
    content: Unix file systems allow unlinking active binaries from directory trees, permitting package managers to write patches while running software continues uninterrupted.
  - title: Seamless A/B Partitions
    content: Android and ChromeOS flash dormant partition slots in the background, making system upgrades as brief as a standard ten-second device restart.
---
<!-- WRITER NOTE (for the writer only, remove before publishing)
Original draft, kept so you remember where this post was going:

The answer is no. Of course you can't borrow my laptop/pc for  a few minutes while I'm working. Can you remind me tomorrow? No, don't. You'll remind me anyway, _sigh_, well the answer is still no, Microsoft. Find a way to do what you need without inconveniencing me. Okay you want to do it at 2am when I'm not using my PC, what are you some kind of stalker? Who even has their laptop on at that ungodly hour. It will only take a few minutes. Will I be able to continue from where I left off? No? So I'll have to start all over again but you promise it will be quick. So you can't do this without interrupting my work. I see. Hmm, let me think about it, NO!!. The answer is still no.

In this post we look at the evolution of windows update whilst comparing it to other update mechanisms in other operating systems such as MacOs and Linux based systems.

END WRITER NOTE -->

Few computing experiences generate as much immediate friction as an operating system interrupting active work to install software updates. A professional in the middle of a complex compile, video render, or writing session is presented with a persistent notification demanding an immediate restart. Postponing the prompt offers temporary relief, only for the machine to restart automatically overnight, closing open terminals, discarding unsaved state, and reorganizing application windows.

While users often interpret this behavior as corporate stubbornness, the root cause lies deep within operating system architecture. The historical requirement for Windows to restart following system patches is the direct consequence of technical design decisions made in the early 1990s regarding file locking, kernel stability, and backward compatibility.

Examining how Windows handles system binaries compared to Unix, Linux, Android, and macOS reveals how contrasting file system abstractions dictate the modern user experience.

| Operating System Architecture | File Locking & Patching Mechanism | Operational User Experience |
| :--- | :--- | :--- |
| **Windows Architecture** | Mandatory Win32 File Locks (`CreateFileMapping`) | Queued `PendingFileRenameOperations` requiring full system reboot |
| **Linux & BSD Systems** | POSIX Inode Unlinking (`unlink()` / `link()`) | In-place atomic binary swaps without restarting active desktops |
| **Android & ChromeOS** | Dual-Slot A/B Partitions | Invisible background streaming into standby slot with rapid reboot |
| **macOS (APFS Cryptex)** | Sealed System Volumes (SSV) + Cryptex Overlays | Cryptographic snapshot mounting without rewriting base system |

## The Root Architectural Cause: Win32 File Locking

The fundamental reason Windows historically demanded restarts for basic system patches comes down to how the operating system handles open files.

In Windows, when an application or background service launches, the kernel memory manager maps the executable image (`.exe`) and its dynamic-link libraries (`.dll`) directly into the virtual address space of the process using memory-mapped sections (`CreateFileMapping`). By default, the Win32 subsystem enforces strict file-sharing locks:

```c
// Typical Win32 file mapping prevents concurrent modification
HANDLE hFile = CreateFileW(
    L"C:\\Windows\\System32\\ntdll.dll",
    GENERIC_READ | GENERIC_EXECUTE,
    FILE_SHARE_READ, // Denies write and delete access to other processes
    NULL,
    OPEN_EXISTING,
    FILE_ATTRIBUTE_NORMAL,
    NULL
);
```

As long as a single process on the system holds an open handle to that library, no other program, including the Windows Update service running with administrative privileges, can overwrite, rename, or delete the file on disk. Attempting to write to an active DLL returns `ERROR_SHARING_VIOLATION` (error code 32).

Because foundational system libraries like `ntdll.dll`, `kernel32.dll`, and `user32.dll` are loaded by every active process, including the Windows subsystem process (`csrss.exe`) and the Windows logon process (`winlogon.exe`), these files can never be unloaded while the operating system is running.

| Step | Win32 Execution Event | Operating System Response |
| :--- | :--- | :--- |
| **1. Process Running** | Process A opens handle on `target.dll` | Win32 kernel locks binary file via memory-mapped section |
| **2. Update Attempt** | Windows Update installer writes patched file | File system throws `ERROR_SHARING_VIOLATION` (Error code 32) |
| **3. Deferred Staging** | Installer stages update in temporary directory | Writes target path into `PendingFileRenameOperations` registry key |
| **4. Early Boot Swap** | Session Manager (`smss.exe`) executes file move | Blue screen update sequence; mandatory restart required |

To work around this constraint, Microsoft engineered a deferred replacement mechanism. When Windows Update downloads a new version of an in-use library, it stages the file in a temporary servicing directory. It then records an entry in the system registry under:

`HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\PendingFileRenameOperations`

During the subsequent boot phase, early in the initialization sequence before user processes spawn, the Session Manager (`smss.exe`) reads this registry key, moves the patched files into their target destinations in `System32`, and deletes the obsolete originals. The familiar blue screen reading "Working on updates... do not turn off your PC" is the visible manifestation of this queued file transfer loop.

## How Unix and Linux Solved the Problem: Inode Unlinking

Unix-like operating systems (including Linux distributions and BSD variants) avoid this limitation through a fundamentally different file system model rooted in POSIX specifications.

In Unix file systems (such as ext4, Btrfs, and XFS), a file directory entry is merely a human-readable link pointing to a numeric metadata structure called an inode. The inode records file ownership, permissions, and pointers to raw data blocks on storage.

When a package manager like `apt`, `pacman`, or `dnf` updates a running shared library (such as `/usr/lib/libc.so`), it does not attempt to overwrite the active disk blocks in place. Instead, it invokes the `unlink()` system call on the existing directory entry:

```c
// POSIX atomic file replacement
unlink("/usr/lib/libc.so.6"); // Unlinks directory entry from old inode
// Old inode remains valid in memory for running processes!

link("/tmp/new_libc.so.6", "/usr/lib/libc.so.6"); // Points name to new inode
```

| Inode State | Directory Pointer (`/usr/lib/libc.so`) | Active Process State |
| :--- | :--- | :--- |
| **Before Update** | Inode 1042 (Original binary) | Running processes read mapped blocks via open file descriptors |
| **Unlink Phase** | Directory link removed via `unlink()` | Inode 1042 remains valid in RAM; storage blocks preserved |
| **After Update** | Inode 9884 (Patched binary linked in) | All newly launched processes immediately execute patched code |

The old inode is decoupled from the directory path, but its data blocks remain intact on storage as long as active processes maintain open file descriptors pointing to it. Running applications continue executing using the old code mapped in RAM without interruption.

Any newly launched program immediately opens the new inode referenced by the directory path. The operating system kernel automatically frees the old storage blocks once the last process using the original file terminates. Outside of core kernel updates, a Linux desktop can update its display server, web browsers, and background system daemons without forcing a reboot.

## The Evolution of Windows Servicing

Microsoft recognized the operational friction caused by forced reboots and evolved its update architecture over three decades:

| Era | Operating System Baseline | Update Delivery Mechanism |
| :--- | :--- | :--- |
| **Manual Era** | Windows 98 / 2000 | Manual ActiveX web browser catalog downloads |
| **Automatic Era** | Windows XP / 7 | Background BITS service with aggressive 5-minute countdown modals |
| **Servicing Era** | Windows 10 | Windows as a Service (WaaS) monthly cumulative updates and Active Hours |
| **Hotpatch Era** | Windows 11 / Server 2025 | Virtualization-Based Security (VBS) in-memory instruction patching |

### Windows XP and 7: The Intrusive Countdown Popups

With Windows XP Service Pack 2, Microsoft introduced Automatic Updates powered by the Background Intelligent Transfer Service (BITS). While effective at patching widespread vulnerabilities like the Blaster worm, the system introduced notorious popup modals that presented a countdown timer. If a user stepped away from their computer, the countdown expired and the machine restarted automatically, often losing open unsaved documents.

### Windows 10: Cumulative Updates and Active Hours

Windows 10 overhauled servicing under the Windows as a Service model. Individual security patches were replaced by monthly Cumulative Updates, ensuring that machines received all security fixes in a single bundle. To curb untimely reboots, Microsoft introduced Active Hours, allowing users to designate an eighteen-hour daily window during which the computer would not restart automatically. However, devices left on overnight still rebooted, disrupting long-running batch jobs and developer environments.

### Windows 11 and Server 2025: In-Memory Hotpatching

The frontier of Windows servicing is Hotpatching. Originally developed for Azure virtual machine fleets and integrated into Windows Server 2025 and Windows 11 Enterprise, hotpatching updates the in-memory code of running processes without altering the on-disk files that require reboots.

Utilizing Virtualization-Based Security (VBS), the Windows hypervisor patches target instructions in memory, redirecting function entry points to patched code blocks. Under this model, systems receive regular monthly security fixes without requiring a single restart, scheduling traditional reboots only once per quarter to refresh the underlying baseline image.

## Alternative Approaches: Dual A/B Partitions and Sealed Snapshots

Mobile and modern desktop platforms have pioneered distinct architectures that balance security with non-disruptive user workflows.

### ChromeOS and Android: Dual A/B Partition Slots

Android and ChromeOS eliminate update screens through dual A/B system partition architecture:

| Partition Slot | Operational Role | Update Lifecycle Activity |
| :--- | :--- | :--- |
| **Active Slot A** | System running user workloads | Read-only partition; user works uninterrupted |
| **Inactive Slot B** | Standby target slot | Background updater streams patch and validates cryptographic hash |
| **Reboot Event** | Bootloader active slot toggle | Bootloader flips active flag to Slot B; 15-second standard reboot |

1. The device runs entirely from partition Slot A.
2. When a system update is detected, the background updater writes the new operating system image directly into dormant partition Slot B.
3. The system validates cryptographic signatures while the user continues working.
4. When the user eventually restarts their device, the bootloader changes a single boot flag, launching instantly into Slot B in under twenty seconds. If the new slot fails to boot, the bootloader automatically reverts to Slot A.

### macOS: Sealed System Volumes (SSV) and Cryptex

Starting with macOS Big Sur and refined in recent releases, Apple structured macOS around cryptographically sealed APFS snapshots. The core operating system resides on a read-only volume authenticated by a SHA-256 Merkle tree.

To deploy security fixes without downloading massive multi-gigabyte operating system installers, Apple introduced Rapid Security Responses utilizing Cryptex (cryptographic extension) disk images. These lightweight updates mount isolated system extensions alongside the sealed volume at boot, applying patches in minutes without rewriting the underlying root snapshot.

## Conclusion

The evolution of operating system updates reflects a broader journey from crude file overwrites to sophisticated storage abstractions. While Windows carried the legacy of Win32 file locks for decades, modern advances in virtualization-based hotpatching, unified package managers, and isolated partition switching are converging toward an identical ideal: an operating system that maintains rigorous security without interrupting the humans who rely on it to work.
