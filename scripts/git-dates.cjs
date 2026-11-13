const { execFileSync } = require("child_process");

let gitDatesCache = null;

function toDateStr(d) {
  try {
    return d.toLocaleDateString("en-CA", { timeZone: "Africa/Kigali" });
  } catch (e) {
    return d.toISOString().slice(0, 10);
  }
}

/**
 * Loads the latest and first commit dates for all posts in a single git log pass.
 * Result is cached in-memory for the lifetime of the process (~300ms total, 0ms on subsequent calls).
 */
function loadGitDates() {
  if (gitDatesCache) return gitDatesCache;

  const latestMap = new Map();
  const firstMap = new Map();

  try {
    const out = execFileSync(
      "git",
      ["log", "--format=COMMIT:%cI", "--name-only", "--", "_posts", "_personal"],
      { maxBuffer: 64 * 1024 * 1024, encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] }
    );

    let curDate = null;
    for (const line of out.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith("COMMIT:")) {
        curDate = new Date(trimmed.slice(7));
      } else if (curDate) {
        const file = trimmed.replace(/\\/g, "/");
        if (!latestMap.has(file)) {
          latestMap.set(file, curDate);
        }
        firstMap.set(file, curDate);
      }
    }
  } catch (err) {
    console.warn("[git-dates] Failed to retrieve git history:", err.message);
  }

  gitDatesCache = { latestMap, firstMap };
  return gitDatesCache;
}

/**
 * Returns the Date of last substantive modification for a post, or null if never edited after publication.
 *
 * @param {string} relPath - Relative file path (e.g. "_posts/2026-11-08-why-are-flight-tickets-in-africa-so-expensive-who-gets-the-taxes-and-fees.md")
 * @param {string|Date|boolean} [explicitDate] - Explicit frontmatter date (last_modified_at or updated)
 * @param {string|Date} [publishDate] - Publish date of the post
 * @returns {Date|null}
 */
function getPostLastModified(relPath, explicitDate, publishDate) {
  // If explicitly specified in frontmatter, that is authoritative
  if (explicitDate !== undefined && explicitDate !== null && explicitDate !== "") {
    if (explicitDate === false) return null;
    const d = new Date(explicitDate);
    return isNaN(d.getTime()) ? null : d;
  }

  if (!relPath) return null;
  const normalized = relPath.replace(/^\.\//, "").replace(/\\/g, "/");

  const { latestMap, firstMap } = loadGitDates();
  const latest = latestMap.get(normalized);
  const first = firstMap.get(normalized);

  if (!latest) return null;

  // If there's only 1 commit, it was created but never edited in git
  if (first && latest.getTime() <= first.getTime()) {
    return null;
  }

  // If latest commit was on the same calendar day as the file's first commit, it's not a later edit
  if (first && toDateStr(latest) === toDateStr(first)) {
    return null;
  }

  // If publishDate is known, only consider it an update if latest commit happened after publish calendar date
  if (publishDate) {
    const pub = new Date(publishDate);
    if (!isNaN(pub.getTime()) && toDateStr(latest) <= toDateStr(pub)) {
      return null;
    }
  }

  return latest;
}

module.exports = {
  loadGitDates,
  getPostLastModified
};
