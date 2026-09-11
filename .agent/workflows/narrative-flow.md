---
description: Write blog sections that flow into each other so the reader is led through a concept without getting lost
---

# Narrative Flow Workflow

One step in the post pipeline (after facts/draft are in hand, alongside image creation, tagging, etc.). Category is pre-set by the author but describes topic, not shape — classify type from the draft itself.

## 0. Classify type

Check the draft for these signals, in order, and stop at the first match:

1. Numbered steps/commands the reader follows, long or multi-milestone → **Build**
2. Numbered steps/commands, short, one specific fix → **Fix-It**
3. First paragraph leads with a date/announcement/"X happened" → **News**
4. Draft argues for or against a position → **Argument**
5. Draft explains a mechanism/discovery for its own sake, no reader task, no side taken → **Story**

If two signals tie (e.g. it explains a mechanism *and* argues a position) — ask which shape it's meant to be; don't guess on a long post. For short posts (Fix-It vs. News), proceed with a stated assumption.

## 1. Fix-It
- Open with the exact symptom, first sentence. No hook-building.
- Fix before explanation — impatient readers stop at the fix.
- No handoff rule; steps can be flat.
- Close: one line on root cause + link to docs/issue if one exists.

## 2. News
- Open with the fact itself (what/who/when), first sentence. Take comes after.
- Inverted pyramid: most important fact → detail → context → implication.
- Light echo between paragraphs is enough; no strict handoff needed.
- Close: what the reader should actually do, not a philosophical takeaway.

## 3. Build
- Open with hook + what you'll have built + rough time/skill ask.
- Spine = build order. Each H2 = one milestone, can depend directly on the last ("with X installed, now...").
- Sections may open by naming reader's current state rather than echoing exact wording; ending on "you should now see Z" is fine.
- Close: recap what's built, link the result, suggest one extension.

## 4. Story (strict — this is the original flow)
- Open with hook + stakes + one roadmap sentence.
- Spine: 3-6 questions, each answer raising the next.
- Handoff rule (strict): every section but the last ends on a forward-pointer (open question/tension); every section but the first opens with an echo of the prior section's closing line. No bare-definition opens, no dead-end closes.
- Close: restate the mental model in one breath + point to related posts/tools.

## 5. Argument
- Open by stating the position/tension within two sentences.
- Spine: claim → strongest evidence → strongest real counter-argument → where you land and why.
- Sections end by naming the tension carried forward, not a cliffhanger; openings engage the prior claim directly.
- Include a genuine counter-argument, not a strawman.
- Close: plain stance + what would change your mind.

## 6. Always (any type)
- Final paragraph restates the takeaway — one sentence for Fix-It/News, the full mental model for Story/Argument.
- Point outward to relevant links.
- Read aloud; every stumble = missing transition.
- Story/Argument: report the per-section handoffs when reviewed.
- Fix-It/News/Build: confirm a skim of just H2s + bolded fixes/steps still delivers the core value.