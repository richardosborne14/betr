# The reach track — usable by anyone, on any of their devices

**A running prompt file. Each session reads it, does the next task, and rewrites the parts
marked *live*. Opened 2026-09-03.**

This is a **second track**, running alongside the main line (B8, then B1, then B3, tracked in
`docs/NEXT-SESSION.md`). That file stays the source of truth for where BETR is. This one only
covers the five tasks below, and a session working here touches nothing else.

## What the track is for

Two different kinds of "more people can use this", which turn out to be the same kind of work:
getting things out of the code that should never have been hardcoded, before there is more code.

- **B17** — the right helpline for the country a person is actually in. A live harm today.
- **B15** — every word out of `app.js`, and the app usable with a screen reader and a keyboard.
- **B9** — a result that can be joined with another device's results at all.
- **B10** — a key made by the person's passkey, used only on their own device.
- **B11** — an iPhone and a Mac showing the same worries, through the person's own iCloud.

**The track stops at B11, deliberately.** B12–B14 need the founder to amend CLAUDE.md rule 1
first, in writing. A session that reaches the end of B11 stops and says so.

`B16` (shipping an actual second language) sits outside this track: it is mostly not code, it
needs paid native reviewers, and the recommendation is that it waits for real users.

## The order, and the one hard block

```
   B8 landed ✓  ──▶  B17  ──▶  B15  ──▶  B9  ──▶  B10  ──▶  B11  ──▶  stop, ask the founder
```

**B8 landed on 2026-09-03** (`7e8754e`), 78 tests green, so the block is clear. It is kept here
as the standing rule: B15 rewrites nearly every line of `app.js` that renders text and B9 changes
`store.js`, so neither may start while another session has those files open. That happened once
already — this track was written while B8 was mid-flight and 10 tests were failing.

**Check first, every time:** `git status` is clean and `node --test` is green from the repo root.
If it is not, the answer is to stop and tell the founder, not to work around it.

*B17 went first on 2026-09-03: it is a harm that exists today in English, it needs no
translation, and it is what makes B16's languages safe to ship at all. B15 follows because the
founder asked for it next. B9 barely overlaps with it — `store.js`,
`rate.js` and one object literal — so a session with only half a day can take B9 instead without
causing anyone a problem.*

## Status — *live, rewrite this*

| Task | File | Status | Confidence |
| --- | --- | --- | --- |
| B17 | `tasks/B17-the-right-helpline.md` | **Not started — next** | — |
| B15 | `tasks/B15-words-out-of-the-code.md` | Not started | — |
| B9 | `tasks/B9-the-mergeable-record.md` | Not started | — |
| B10 | `tasks/B10-the-lock.md` | Not started | — |
| B11 | `tasks/B11-own-cloud-sync.md` | Not started | — |
| B16 | `tasks/B16-shipping-a-language.md` | Not started — needs B17, then waits for real users | — |

## Start the next session with this

> Read `CLAUDE.md`, then `docs/NEXT-SESSION.md`, then `docs/TRACK-reach.md`, then the task file
> named as next in its status table, and build that task.
>
> Before touching anything: confirm `git status` is clean and `node --test` is green from the
> repo root. If either is not, stop and say so — another session may be mid-flight.
>
> Do not start a task marked blocked. Do not begin B12, B13 or B14 under any circumstances;
> they need the founder to amend rule 1 first. Do not touch `docs/NEXT-SESSION.md` unless the
> main line's owner has finished with it.
>
> When the task is done: tests green, the task file updated with status, decisions and gaps, a
> confidence score of 8/10 or better recorded in it, `docs/learnings.md` updated if anything
> took more than thirty minutes to understand, **the *live* sections of `docs/TRACK-reach.md`
> rewritten**, then commit and push `main`, and tell the founder in plain words how to see it.

## Carried between sessions — *live, rewrite this*

Things a session found that the next one needs. Empty until the first session runs.

- **B15, unresolved and needs the founder:** i18next, or a ~60-line `web/lib/i18n.js`? The task
  file recommends the small module and gives the reasons. Don't decide it in a session.
- **B10, unresolved and blocks estimating anything after it:** passkeys inside the Capacitor
  webview fail WebAuthn's origin check from `capacitor://localhost`, and B5's rule is no plugins
  beyond Filesystem and Share. Settle this before B10 is scheduled, not during it.
- **B11 depends on a fact nobody has checked:** Apple's current wording on whether data in a
  user's private CloudKit database counts as collected by the developer. If it has changed, B11
  changes with it.
- **B17, absolute:** no helpline number is ever written from a model's memory, including a
  session's own. Read it off the provider's site that day, or do not ship it.
- **Accessibility, already right, do not undo it:** `app.css:191` wraps every animation in
  `@media (prefers-reduced-motion: no-preference)` — motion is opt-in. Keep that pattern.

## How to update this file

At the end of a session, rewrite the two sections marked *live* — the status table and what is
carried. Everything above them changes only when the founder changes the plan. Keep the whole
file under 120 lines, the same rule `docs/NEXT-SESSION.md` follows.

Append nothing. A file that grows is a file nobody reads.
