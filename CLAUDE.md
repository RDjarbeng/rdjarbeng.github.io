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

## Maintainer agent (GitHub Actions)
These rules apply when you run from `.github/workflows/maintainer.yml` on a `bug` issue or an
`@claude` comment, not in a local session.
- Fix only what the issue or comment asks. If it is unclear, or would need a design or content
  decision, comment with what you found and a suggested fix, and stop.
- Never push to `main`. Work on your branch, then open a PR with `gh pr create` whose body starts
  with `Fixes #<issue>` and says in 2-4 lines what changed and how to check it on the live site.
- Before opening the PR, run `npm run build` and `npm run check:links`; both must pass. Say so in
  the PR body.
- Small commits, one per concern. No `Co-Authored-By`, "Generated with Claude Code" or other AI
  attribution in commits or PR text.
- Don't edit post front matter in 5 or more files, don't rewrite post prose, and don't touch
  `_posts/` beyond the specific fix asked for. Don't edit `.github/workflows/`, `admin/`,
  `scripts/telegram-bot/` or the `TODO*.md` files.
- Screenshots in the issue live under `.github/issue-images/`; read them with the Read tool.

## Editing files
- Read a file before editing it, and copy `old_string` from that read exactly.
- The repo stores text as LF (`.gitattributes`), but older checkouts may still have CRLF on disk.
  If an Edit fails to match, re-read the file instead of guessing at the whitespace.
