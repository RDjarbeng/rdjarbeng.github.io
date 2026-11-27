# Notes for Claude on this repo

## Dev server
- Start, stop and restart it yourself with the preview tools (`preview_start` name `eleventy-dev`,
  from `.claude/launch.json`). It runs `npm run start` (Sass watch + Eleventy) on port 8080.
  Don't ask Richard to restart it, and don't start it from a shell.
- If the watcher looks stuck or out of date, `preview_stop` and `preview_start` again.

## Shells
- Use the Bash tool (Git Bash) for scripts, pipes and git: `&&`, `$VAR`, forward slashes,
  `/c/Users/...` paths.
- PowerShell here is 5.1: no `&&`, `||`, `?:` or `??`. Use it only for Windows-specific things.

## Editing files
- Read a file before editing it, and copy `old_string` from that read exactly.
- The repo stores text as LF (`.gitattributes`), but older checkouts may still have CRLF on disk.
  If an Edit fails to match, re-read the file instead of guessing at the whitespace.
