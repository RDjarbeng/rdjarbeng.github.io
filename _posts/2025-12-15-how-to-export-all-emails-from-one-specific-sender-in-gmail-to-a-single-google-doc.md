---
date: 2025-12-15T14:57:00+02:00
published: false
author: Richard
category: How-to Guides
tags:
  - Gmail
  - How-to Guides
  - Google Apps Script
  - Google Docs
  - Automation
  - Productivity
title: "How to Export All Emails from One Specific Sender in Gmail to a Single Google Doc"
image: /assets/images/posts/covers/export_gmail_to_google_doc_cover.jpg
image_alt: Illustrated workflow showing Google Apps Script querying Gmail threads and compiling deduplicated email messages into a structured Google Doc
layout: post
description: A complete guide to extracting all email threads from a specific sender in Gmail and compiling them into a clean, deduplicated Google Doc using Google Apps Script.
key_points:
  - Gmail lacks a native mechanism to export all correspondence from a single sender into a consolidated readable document.
  - A lightweight Google Apps Script extracts entire conversation threads without transmitting sensitive data outside your Google account.
  - Regular expression filters remove repeated blockquotes from replies, preventing bloated duplicate text across multi-turn exchanges.
  - Users can revoke script OAuth permissions immediately following compilation through the Google Account security dashboard.
card_items:
  - title: In-Account Execution
    content: The script executes entirely within the Google cloud runtime under your existing credentials, ensuring complete data confidentiality.
  - title: Thread Deduplication
    content: Automated regex patterns strip nested reply headers and quoted text to produce a concise, chronological transcript.
  - title: Custom Drive Routing
    content: Setting a target parent folder ID places the generated archive directly into a designated project directory in Google Drive.
---

Archiving every email from a specific contact, whether for legal discovery, project retrospectives, tax audits, or client handover records, is a common administrative requirement. While Gmail provides search operators and full account export via Google Takeout, it lacks a native feature to export correspondence from a single sender into a consolidated, formatted text document.

Third-party browser extensions often promise one-click exports, but requiring users to grant complete mailbox access to unverified external servers introduces serious privacy risks.

The most secure, reliable solution is building an automated script using [Google Apps Script](https://script.google.com/). Because Apps Script runs natively on Google servers under your active user session, your emails never leave Google infrastructure.

| Pipeline Stage | Implementation Mechanism | Functional Purpose |
| :--- | :--- | :--- |
| **1. Search Mailbox** | `GmailApp.search("from:target@example.com")` | Locate all relevant conversation threads |
| **2. Iterate Threads** | Message payload parsing | Extract subject, date, sender, and clean body text |
| **3. Deduplicate Content** | Regex text parsing | Strip redundant blockquotes and nested replies |
| **4. Format Google Doc** | `DocumentApp.create()` / `appendParagraph()` | Insert headings, metadata timestamps, and dividers |
| **5. Revoke Permissions** | Google Security Account Dashboard | Remove OAuth authorization tokens upon completion |

## Step 1: Open Google Apps Script

Google Apps Script is a cloud-based JavaScript development environment included with every personal Google account and Google Workspace subscription.

1. Open your web browser and navigate to [script.google.com](https://script.google.com/).
2. Sign in with the Google account hosting the target Gmail correspondence.
3. In the top left corner, click **New project**.
4. Rename the project from "Untitled project" to something recognizable, such as **Gmail Sender Exporter**.
5. Clear any default placeholder text inside the code editor window.

## Step 2: Paste the Script Code

Copy and paste the following tested script into the editor:

```javascript
function exportEmailsFromContactToDoc() {
  // Configuration: Replace with the sender's exact email address
  const SENDER_EMAIL = "sender@example.com";

  // Optional: Custom document title
  const DOC_TITLE = "Archived Correspondence: " + SENDER_EMAIL;

  // Optional: Target Google Drive folder ID (Leave blank to save in My Drive root)
  const PARENT_FOLDER_ID = "";

  // Search mailbox for all threads involving the specified sender
  const threads = GmailApp.search("from:" + SENDER_EMAIL);
  if (threads.length === 0) {
    console.error("No email threads found matching from:" + SENDER_EMAIL);
    return;
  }

  console.log("Found " + threads.length + " threads. Initializing document compilation...");

  // Create the destination Google Doc
  const doc = DocumentApp.create(DOC_TITLE);
  const body = doc.getBody();

  // Document Title Header
  body.appendParagraph(DOC_TITLE).setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph("Total Threads Processed: " + threads.length + " | Exported on: " + new Date().toLocaleDateString() + "\n");
  body.appendHorizontalRule();

  // Move document to specific Drive folder if configured
  if (PARENT_FOLDER_ID && PARENT_FOLDER_ID.trim() !== "") {
    try {
      const file = DriveApp.getFileById(doc.getId());
      const folder = DriveApp.getFolderById(PARENT_FOLDER_ID);
      file.moveTo(folder);
    } catch (err) {
      console.warn("Folder transfer failed: " + err);
    }
  }

  // Iterate over each conversation thread
  threads.forEach((thread, threadIndex) => {
    const messages = thread.getMessages();
    const threadSubject = thread.getFirstMessageSubject();

    body.appendParagraph("Thread " + (threadIndex + 1) + " of " + threads.length + ": " + threadSubject)
        .setHeading(DocumentApp.ParagraphHeading.HEADING2);

    messages.forEach((msg, msgIndex) => {
      const fromSender = msg.getFrom();
      const messageDate = msg.getDate().toLocaleString();

      body.appendParagraph(fromSender + " (Received: " + messageDate + ")")
          .setHeading(DocumentApp.ParagraphHeading.HEADING3);

      let plainText = msg.getPlainBody();

      // For reply messages in a thread, strip quoted historical content
      if (msgIndex > 0) {
        // Strip classic email quote marker
        const quoteIndex = plainText.search(/\nOn .*wrote:/i);
        if (quoteIndex !== -1) {
          plainText = plainText.substring(0, quoteIndex).trim();
        }

        // Strip forward and original message dividers
        const forwardIndex = plainText.search(/\n-{5,}\s*Original Message\s*-{5,}/i);
        if (forwardIndex !== -1) {
          plainText = plainText.substring(0, forwardIndex).trim();
        }

        // Remove standard email quote lines
        plainText = plainText.split("\n").filter(l => !l.trim().startsWith(">")).join("\n").trim();
      }

      if (plainText.length > 0) {
        const textParagraph = body.appendParagraph(plainText);
        if (msgIndex > 0) {
          textParagraph.setIndentStart(20);
        }
      } else {
        body.appendParagraph("[Reply contained only quoted text history]");
      }

      body.appendParagraph("");
    });

    body.appendHorizontalRule();
  });

  const finalUrl = doc.getUrl();
  console.log("Compilation complete. Access your document at: " + finalUrl);
}
```

## Step 3: Configure Parameters

Before executing the script, update the configuration constants at the top of the file:

1. **`SENDER_EMAIL`:** Replace `"sender@example.com"` with the exact email address of the person or automated service whose correspondence you wish to compile.
2. **`DOC_TITLE`:** Adjust the document name as desired.
3. **`PARENT_FOLDER_ID` (Optional):** If you wish to save the output into a specific Google Drive folder rather than your root drive, open the destination folder in Google Drive, copy the alphanumeric string at the end of the URL (after `/folders/`), and paste it between the quotes.

Save your edits by pressing `Ctrl+S` on Windows or `Cmd+S` on macOS.

## Step 4: Authorize and Execute

Click the **Run** button in the top toolbar to begin compilation. Because the script reads your mailbox and generates Google Docs, Google presents a standard security authorization flow.

| Step | Action in Google Authorization Dialog | Expected Screen or Modal |
| :--- | :--- | :--- |
| **Step 1** | Click **Run** in Apps Script toolbar | Triggers OAuth permission request |
| **Step 2** | Select active Google Account | Account selection picker |
| **Step 3** | Review Google Warning modal | "Google hasn't verified this app" warning banner |
| **Step 4** | Click **Advanced** → Click link | "Go to Gmail Sender Exporter (unsafe)" bypass |
| **Step 5** | Review requested permissions → Click **Allow** | Grants execution rights to local private script |

### Understanding Google Security Warnings

When you develop a private script, Google displays an unverified app banner. This safeguard prevents malicious actors from distributing unvetted scripts to unsuspecting users. Because you authored and controlled the code yourself, it is safe to proceed:

1. Click the small **Advanced** link in the lower left corner of the warning modal.
2. Click **Go to Gmail Sender Exporter (unsafe)**.
3. Review the permissions list:
   - Read your email messages and settings (`gmail.readonly`)
   - Create and edit Google Docs documents (`documents`)
   - Manage Drive files (if folder routing was configured)
4. Click **Allow** to grant execution rights.

## Step 5: Review the Generated Archive

Once authorized, the script queries your Gmail mailbox, strips duplicate quotes from reply chains, and appends the messages chronologically into your new document.

- Open the execution logs by clicking **Execution log** at the bottom of the editor.
- Once finished, the log displays: `Compilation complete. Access your document at: [URL]`.
- Click the provided URL or open Google Drive to inspect your compiled archive. Each conversation thread appears under an organized heading, separated by horizontal dividers.

## Step 6: Revoke Script Authorizations

When your export is complete, standard security hygiene recommends revoking the temporary OAuth permissions granted to the script:

1. Navigate to the [Google Account Third-Party Permissions Dashboard](https://myaccount.google.com/permissions).
2. Locate the project entry (named **Gmail Sender Exporter** or **Untitled project**).
3. Click the entry and select **Delete all connections that you have with this app**.
4. Return to [script.google.com](https://script.google.com/home) and delete the project file if you no longer require it.

## Alternative Manual Export Workflows

For users who prefer not to execute code, several non-programmatic alternatives exist:

| Workflow Method | Best Application | Main Constraint |
| :--- | :--- | :--- |
| **Manual Print to PDF** | 1 to 10 isolated email threads | Repetitive manual steps |
| **Google Takeout MBOX** | Full mailbox compliance backups | Requires MBOX reader |
| **Desktop Email Client (Thunderbird Local EML)** | Exporting via Mozilla Thunderbird to PDF merger | Requires local IMAP client configuration |

### 1. Manual Print to PDF

If you only need to archive three or four specific threads:
1. Open the conversation thread in Gmail.
2. Click the small printer icon located in the upper right header above the email.
3. In the system print dialog, set the destination printer to **Save as PDF**.
4. Combine individual PDF files using standard desktop tools.

### 2. Google Takeout MBOX Export

For extensive legal compliance archives containing thousands of messages:
1. Open [takeout.google.com](https://takeout.google.com/).
2. Deselect all services, then select only **Mail**.
3. In Gmail, apply a custom label to all target messages using a search filter (`from:target@example.com`).
4. In Takeout, choose to include only that specific custom label.
5. Download the resulting `.mbox` archive, which can be viewed in desktop email clients like Mozilla Thunderbird.

## Summary

Automating Gmail exports using Google Apps Script provides an efficient, private mechanism for archiving client and colleague correspondence. By filtering nested reply text and running entirely inside your secure Google Workspace environment, you create an organized, searchable document without exposing sensitive communication to commercial third-party platforms.
