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
   B8 ✓  ──▶  B17 ✓  ──▶  B15 ✓  ──▶  B9 ✓  ──▶  B10  ──▶  B11  ──▶  stop, ask the founder
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
| B17 | `tasks/B17-the-right-helpline.md` | **Built 2026-09-03** | 8/10 |
| B15 | `tasks/B15-words-out-of-the-code.md` | **Built 2026-09-03** | 8/10 |
| B9 | `tasks/B9-the-mergeable-record.md` | **Built 2026-09-03** | 9/10 |
| B10 | `tasks/B10-the-lock.md` | Not started — blocked, see below | — |
| B11 | `tasks/B11-own-cloud-sync.md` | Not started | — |
| B16 | `tasks/B16-shipping-a-language.md` | Not started — waits for real users | — |

**B9 landed.** Every result has an id of its own, says which word was tapped, and is read in
clock order rather than array order, so two devices' histories can be joined without losing or
duplicating a result. 146 tests green. Nothing a person sees changed, proved by rendering every
screen through the code before and after and diffing it.

**B10 is next on this track, and it should not be started yet.** Carried below: passkeys inside
the Capacitor webview fail WebAuthn's origin check from `capacitor://localhost`, and that has to
be settled before B10 is scheduled rather than during it. B11 rests on an unchecked fact about
Apple's current wording. So *there is nothing left on this track that a coding session can pick
up on its own*, and everything outstanding on Betr now needs a person — Misha and a paid
reviewer on the twelve worries, somebody who uses a screen reader every day on a real phone,
one DNS record, and Q1.

**B15 landed.** Every word a person reads is in one file, the app tells a screen reader what
just happened, and the stylesheet mirrors correctly and scales with a person's text size.

**B17 landed.** Thirteen countries have a helpline somebody read off the provider's own site
that day; every other country says so and shows no number at all. The country layer B16 was
going to need is now there, in English, before a word was translated.

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

Things a session found that the next one needs.

- **B15 landed on 2026-09-03.** Every word is in `web/content/strings-en.js` behind
  `web/lib/i18n.js`; the app announces itself to a screen reader and the stylesheet is logical
  and in `rem`. 125 tests green. **Two things it did not do and that nobody should assume:** no
  second language ships (that is B16), and **nobody who uses a screen reader has touched it** —
  that pass is a release condition at the bottom of the B15 task file.
- **B9 landed on 2026-09-03.** Storage is **v3**: `rid` on every result and on every waiting
  test, `move` (the word that was tapped) on every result, and `series()`/`levelFor()` read in
  clock order and replay the taps rather than trusting the stored rung. `level` is still
  written and is still the fallback for any ladder holding a pre-v3 result. **The export is now
  joinable**, not only readable: `id` and `stillSureKey` are in it. **B10 inherits three things
  it no longer has to build**, and one thing it must decide: one waiting test finished on two
  devices is two results with two ids, and whether that is right is B10's question.
  `web/tests/fixtures/v2-phone.json` is a genuine pre-B9 file and is how any future storage
  change proves it did not redraw somebody's history.
- **Two guards now sit across the whole repo.** No English prose
  may go into `app.js` (`i18n.test.js` sweeps its string literals), and no physical CSS
  property or `px` font size may go into `app.css`. Both fail the build. A new screen means a
  new block of keys in `strings-en.js`, a heading with `id="top"`, and a line in `SCREENS` at
  the top of `a11y.test.js`.
- **B15's one open question is closed.** The founder answered on 2026-09-03: **no i18next,
  write the ~60-line `web/lib/i18n.js`.** Built at about 90 lines of code.
- **B1 landed on the main line on 2026-09-03**, so B15 no longer has to translate twice: the
  words in `content/worries.js` are the written ones. Misha's pass will change some of them
  again, which is an argument for the string file B15 builds, not against it.
- **B15 inherits B17's shape.** `web/lib/where.js` is the pattern for anything a screen has to
  work out about a person's phone: it is handed its data, reads the browser in one place, and
  the app passes it in. Country and language stay two separate questions and must not be
  joined; `helpline.test.js` already asserts that in both directions, and B15 must not weaken
  it. `content/zones.js` is generated data, so never hand-edit it.
- **B17's list is thirteen countries and wants to be thirty.** Adding one is four lines in
  `content/helplines.js` plus reading the provider's page that day. France, India, Singapore
  and Kenya failed to load on 2026-09-03 and are named in `notShipped` with the reason.
  Nigeria, the Philippines, Malaysia, Poland, Sweden, Portugal, Japan and Mexico are next.
- **B17, absolute, and it held:** no helpline number is ever written from a model's memory,
  including a session's own. Read it off the provider's own site that day, or leave the country
  out — the app handles the absence honestly and that is the safe answer, every time.
- **Nobody owns re-checking the helplines.** `helplines.js` carries `owner: null` and the test
  prints a line about it on every run until somebody's name is in there.
- **B10, unresolved and blocks estimating anything after it:** passkeys inside the Capacitor
  webview fail WebAuthn's origin check from `capacitor://localhost`, and B5's rule is no plugins
  beyond Filesystem and Share. Settle this before B10 is scheduled, not during it.
- **B11 depends on a fact nobody has checked:** Apple's current wording on whether data in a
  user's private CloudKit database counts as collected by the developer. If it has changed, B11
  changes with it.
- **Accessibility, already right, do not undo it:** `app.css:191` wraps every animation in
  `@media (prefers-reduced-motion: no-preference)` — motion is opt-in. Keep that pattern.

## How to update this file

At the end of a session, rewrite the two sections marked *live* — the status table and what is
carried. Everything above them changes only when the founder changes the plan. Keep the whole
file under 120 lines, the same rule `docs/NEXT-SESSION.md` follows.

Append nothing. A file that grows is a file nobody reads.
