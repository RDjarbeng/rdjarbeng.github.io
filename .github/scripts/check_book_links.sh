#!/usr/bin/env bash
# Checks that every book link in _books/*.md is still alive.
# Strategy to avoid heavy downloads (PDFs etc.):
#   1. HEAD request only - no response body is downloaded at all.
#   2. If the server rejects HEAD (405/403/999) or times out, retry with a
#      ranged GET capped at ~2KB instead of the whole file.
#   3. Hard timeouts on every request so a slow site can never hang the job.

set -uo pipefail

BOOKS_DIR="_books"
UA="Mozilla/5.0 (compatible; enlighten-link-checker/1.0; +https://rdjarbeng.com)"
TIMEOUT_HEAD=25
TIMEOUT_GET=40
SLEEP_BETWEEN=2

summary_file="${GITHUB_STEP_SUMMARY:-/dev/stdout}"
broken=0
total=0

{
  echo "## 📚 Enlighten Book Link Check"
  echo ""
  echo "| Status | Code | Book | URL |"
  echo "|--------|------|------|-----|"
} >> "$summary_file"

for f in "$BOOKS_DIR"/*.md; do
  [ -e "$f" ] || continue
  url=$(grep -m1 -E '^link:' "$f" | sed 's/^link:[[:space:]]*//' | tr -d '"' | tr -d "'")
  title=$(grep -m1 -E '^title:' "$f" | sed 's/^title:[[:space:]]*//' | tr -d '"' | tr -d "'")
  [ -z "$url" ] && continue
  total=$((total + 1))

  code=$(curl -sIL --max-time "$TIMEOUT_HEAD" -A "$UA" -o /dev/null -w '%{http_code}' "$url" 2>/dev/null || echo "000")

  if [[ ! "$code" =~ ^[23] ]]; then
    code=$(curl -sL --max-time "$TIMEOUT_GET" -r 0-2047 -A "$UA" -o /dev/null -w '%{http_code}' "$url" 2>/dev/null || echo "000")
  fi

  if [[ "$code" =~ ^[23] ]]; then
    status="✅ OK"
  elif [[ "$code" == "429" || "$code" == "403" || "$code" == "999" || "$code" == "000" ]]; then
    status="⚠️ UNVERIFIABLE (bot-blocked or timed out - check manually)"
  else
    status="❌ BROKEN"
    broken=$((broken + 1))
  fi

  safe_title=$(printf '%s' "$title" | sed 's/|/\\|/g')
  echo "| $status | $code | $safe_title | <$url> |" >> "$summary_file"
  sleep "$SLEEP_BETWEEN"
done

{
  echo ""
  echo "**Checked:** $total links &nbsp;|&nbsp; **Broken:** $broken"
} >> "$summary_file"

if [ "$broken" -gt 0 ]; then
  echo "::error::$broken book link(s) are broken. See the job summary for details."
  exit 1
fi

echo "All $total book links are alive."
