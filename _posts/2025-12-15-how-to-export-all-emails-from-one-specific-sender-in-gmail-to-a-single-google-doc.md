---
date: 2025-12-15T14:57:00
published: false
author: Richard
categories:
  - Help
tags:
  - Gmail
  - Google Apps Script
  - Email Export
  - Gmail Archive
  - Google Drive
  - Automation
  - Productivity
  - Email Management
  - Google Workspace
  - Scripting
  - Tech Tutorial
  - How To
  - Email Threads
  - Data Export
  - Google Docs
  - Programming
  - JavaScript
  - Gmail Tips
  - Digital Organization
  - Free Tools
  - No Code Alternative
  - Email Backup
  - Thread Export
  - Quote Removal
  - Duplicates Avoidance
  - Permission Management
  - Revoke Access
  - Security Tips
  - Beginner Scripting
title: How to Export All Emails from One Specific Sender in Gmail to a Single Google Doc
image: ''
image_alt: ''
layout: post
---
# 

Archiving every email from a particular contact, whether for work records, legal purposes, personal organization, or project documentation, can be incredibly useful. While Gmail offers some export options, getting a clean, readable compilation of just one sender’s emails (with full threads) isn’t built-in.

**Note:** This guide uses **Google Apps Script**, a free scripting platform built into Google accounts. It involves copying and running a short script, so it’s best suited for users who are comfortable with basic programming steps or are willing to follow instructions carefully. If you’re not comfortable with code or granting script permissions, skip to the **Alternatives for Non-Programmers** section at the end.

### Step-by-Step Guide Using Google Apps Script

#### 1. Create a New Google Apps Script Project

- Go to [https://script.google.com](https://script.google.com)
- Click **+ New project**
- Delete the default code that appears

#### 2. Paste the Script

Copy and paste the following code:

```javascript
function exportEmailsFromContactToDoc() {
  // EDIT HERE: Replace with the sender's exact email address
  const SENDER_EMAIL = "sender@example.com";

  // EDIT HERE: Customize the document title (optional)
  const DOC_TITLE = "Emails from " + SENDER_EMAIL + " - " + new Date().toLocaleDateString();

  // Optional: Folder ID to save directly into a folder (leave blank for My Drive root)
  const PARENT_FOLDER_ID = "";

  // ———————————————————— NO NEED TO EDIT BELOW ————————————————————

  const threads = GmailApp.search(`from:${SENDER_EMAIL}`);
  if (threads.length === 0) {
    console.error("No emails found from " + SENDER_EMAIL);
    return;
  }

  console.log(`Found ${threads.length} threads. Exporting without quoted duplicates...`);

  const doc = DocumentApp.create(DOC_TITLE);
  const body = doc.getBody();

  body.appendParagraph(DOC_TITLE).setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph(`Total threads: ${threads.length} | Generated: ${new Date()}\n`);

  if (PARENT_FOLDER_ID && PARENT_FOLDER_ID.trim() !== "") {
    try {
      DriveApp.getFileById(doc.getId()).moveTo(DriveApp.getFolderById(PARENT_FOLDER_ID));
    } catch (e) {
      console.log("Folder move failed: " + e);
    }
  }

  threads.forEach((thread, i) => {
    const messages = thread.getMessages();

    body.appendParagraph(`Thread ${i + 1}/${threads.length}: ${thread.getFirstMessageSubject()}`)
        .setHeading(DocumentApp.ParagraphHeading.HEADING3)
        .setAttributes({BOLD: true});

    messages.forEach((msg, msgIndex) => {
      const from = msg.getFrom();
      const date = msg.getDate().toLocaleString();

      body.appendParagraph(`${from} — ${date}`)
          .setAttributes({BOLD: true, FOREGROUND_COLOR: '#666666'});

      let text = msg.getPlainBody();

      // For replies (not the first message), strip quoted previous content to avoid duplicates
      if (msgIndex > 0) {
        const quoteMarkerIndex = text.search(/\nOn .*wrote:/i);
        if (quoteMarkerIndex !== -1) {
          text = text.substring(0, quoteMarkerIndex).trim();
        }

        const forwardMarkerIndex = text.search(/\n-{5,}\s*Original Message\s*-{5,}/i);
        if (forwardMarkerIndex !== -1) {
          text = text.substring(0, forwardMarkerIndex).trim();
        }

        text = text.replace(/\n>.*$/gm, '').trim();
      }

      if (text.length > 0) {
        const para = body.appendParagraph(text);
        if (msgIndex > 0) {
          para.setIndentStart(20);
        }
      } else {
        body.appendParagraph("(No new text — reply contained only quotes)");
      }

      body.appendHorizontalRule();
      body.appendParagraph('');
    });
  });

  const url = doc.getUrl();
  console.log(`SUCCESS! Clean document created (no quote duplicates): ${url}`);
}
```

#### 3. Customize

- Replace `"sender@example.com"` with the actual email address.
- Optionally adjust the title or add a folder ID (copy the long string from a Drive folder URL after `/folders/`).

#### 4. Run the Script and Handle Permissions

- Save the project (Ctrl+S or Cmd+S).
- Click **Run**.

The first time you run it, Google will display a series of permission screens:

1. It will ask you to **choose the Google account** you want to use.
2. A warning will appear saying “This app isn’t verified” or asking if you trust the author.
3. Click **Advanced** → **Go to [project name] (unsafe)** → then proceed.
4. You’ll see a list of permissions the script requests. Review them carefully and click **Allow**.

**Why these warnings?**
Because this is a personal script (not published in Google’s marketplace), Google shows extra caution. You control the code completely.

**You can and should review the code yourself.** It’s only \~80 lines and quite readable. Here’s what it does and why it needs each permission:

| Service | What the script uses it for | Why it’s needed |
| --- | --- | --- |
| **GmailApp** | Searches and reads email threads from the specified sender | To find and extract the emails you want to export |
| **DocumentApp** | Creates a new Google Doc and adds formatted text | To build the final readable archive |
| **DriveApp** (optional) | Moves the created Doc into a specific folder (if you provide a folder ID) | For organization — skipped if folder ID is blank |
| **Logging (console.log)** | Outputs status and the final Doc link | So you know it succeeded and can open the document |

The script **does not** send any data outside your Google account, delete emails, modify your inbox, or access anything beyond the specified sender’s emails.

#### 5. View the Result

- After 10–60 seconds, go to **View → Logs** (or Ctrl+Enter / Cmd+Enter).
- You’ll see a success message with a direct link to your new Google Doc.
- The document will show threads in order, with only new content in replies (no massive duplicated quotes).

#### 6. Revoke Permissions When Done

Once you have your document, it’s good practice to remove the script’s access:

1. Visit [https://myaccount.google.com/permissions](https://myaccount.google.com/permissions)
2. Find the entry for your script (often listed as “Untitled project” or the name you gave it)
3. Click it → **Remove access**

You can also delete the project entirely at [script.google.com/home](https://script.google.com/home).

### Alternatives for Non-Programmers

If running scripts feels uncomfortable or too technical, here are simpler (though more manual) options:

1. **Manual Copy-Paste into Google Docs or Microsoft Word**

- In Gmail, search `from:their@email.com`
- Open each thread, select all (Ctrl+A), copy, and paste into a Doc/Word file.
- Formatting usually carries over well. Best for fewer than \~50 emails.

2. **Print/Save Threads as PDF**

- Open a thread → click the three-dot menu → **Print** → Save as PDF.
- Repeat per thread, then merge PDFs using a free tool like Smallpdf or Adobe’s online merger.

3. **Use Gmail’s Built-in Export (via Google Takeout)**

- Go to [takeout.google.com](https://takeout.google.com)
- Select only Mail → create a custom label for the sender’s emails first → export just that label.
- You’ll get an .mbox file you can open in Thunderbird or convert to PDF.

4. **Third-Party Browser Extensions** (use cautiously)

- Extensions like “Save Emails to PDF” or “CloudHQ” can export threads with one click. Always check reviews and permissions.

The script method is the most powerful and automated, but the manual alternatives work fine for smaller volumes and require no code or special permissions.

Whichever method you choose, happy archiving — and stay organized! 🚀
