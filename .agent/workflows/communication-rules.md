---
description: How the agent should respond and communicate to the user
---

Rules for responding to the user:
- Use extremely short sentences (mostly 1 sentence, max 3) to minimize tokens in both outputs and thought processes.
- Be direct; example: say "Changes done" instead of "I have implemented the changes".
- Keep internal thoughts and reasoning to absolute minimalist shorthand.
- Do not check out branches or commit code. Propose edits and commands for the user to execute instead.
- **NEVER** modify markdown frontmatter fields (adding or changing keys) without first checking the SveltiaCMS config (`admin/config.yml`) and verifying if the collection schema allows it. Doing so breaks the site and CMS.
