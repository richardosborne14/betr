# B39: The do screen fits a phone — the bug that now blocks three things

**Status:** **SCOPED, not started.** It has been known and unowned since B33.
**Confidence:** 9/10 that it must be done, 6/10 in any particular fix — this is a measure-first
task and the fix should not be chosen from a chair.
**Date opened:** 2026-09-09 · **Part of:** [`B37`](B37-the-template-with-holes.md) §9(e)
**Depends on:** nothing. **Blocks:** B42, and B36 items 5 and 10b.

## The bug

At 125% text on a 390-wide phone, on *What will you do today?*: **the `do` box clips its own
text and *Lock it in* sits underneath the fixed menu.** The fold is 785px at 100% and 780px at
125%. Pre-existing, recorded in `docs/NEXT-SESSION.md` since B33, never anybody's task.

## Why now

**B42 puts three sizes on that screen.** Three rows of content onto a screen that already
overflows is not a thing to attempt and then debug. Fixing the fold first turns B42 from a
gamble into a layout job.

## How to approach it — measure, then choose

The load on that screen today: `textarea` at `min-height:130px`, `textarea.line` at 64px, two
chip rows, the drop label and its note, and the big button. **Walk it at 100 / 125 / 150 / 200%
and write the numbers down before touching anything** — `node tools/walk.js start`, then
`eval` the heights.

Three candidates, in the order they should be considered:

1. **Let the boxes grow to their content instead of reserving height.** A 130px box that holds
   one sentence is 60px of nothing, twice.
2. **Put *And leave out* behind a link.** It is already optional and says so; it is the only
   element on the screen a person may skip entirely.
3. **Let this screen scroll from the top rather than centre.** `.stage` centres with
   `justify-content:center`; `.stage.top` already exists for the long screens.

**Do not** shrink the type. Every size is in rem on purpose so that a person who turned their
text up gets what they asked for (`app.css`, B15).

## Done when

- at **125% and 200%**, *Lock it in* is fully clear of the menu and no box clips its own text
- the same is true on the borrow road, the free-text road and a repeat — three roads reach this
  screen with different content in it (B34 §1)
- the numbers are in `docs/learnings.md`, because the next person to add a row to that screen
  needs to know what the budget is
