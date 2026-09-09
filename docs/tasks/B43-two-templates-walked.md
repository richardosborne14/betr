# B43: Two templates, walked end to end — the "try it out"

**Status:** **SCOPED, not started.** This is the one the founder can actually use.
**Confidence:** 8/10 on the build. **4/10 on whether the sentences sound like people**, and that
is the whole risk — it belongs to Misha and the reviewer, not to code.
**Date opened:** 2026-09-09 · **Part of:** [`B37`](B37-the-template-with-holes.md) §6
**Depends on:** B41, B42.

## What it does

Content for **two** worries, chosen because they are the two the observed walkers actually landed
on (`docs/journeys-observed.md`):

- **`no`** — saying no without giving a reason
- **`strug`** — telling somebody you are struggling

Each gets: the skeleton and its holes, three predictions using those holes, three sizes with
their drops. The existing `why` entry stays as it is.

**About twenty-six sentences.** They ship **unreviewed and marked so**, exactly as `starts.js`
did — the file comment says it, and they go into the reviewer's envelope with everything else.

## Why two and not twenty-one

Ten to thirteen sentences per template, and the paid CBT reviewer is already the critical path
holding 245 rows. Twenty-one worries at that rate is a job nobody has costed and the reviewer has
not agreed to. **Build the mechanism, ship two, walk them, then batch the rest.**

## The thing to check that is not a test

**Read every generated sentence out loud.** *"Give my best friend a little criticism about her
playlist"* — if a person would never say *"a little criticism"*, that is BETR's voice in their
mouth, and B20's finding comes back one level up: a sentence that is only nearly yours cannot be
disconfirmed, so the loop runs and moves nothing. Everything being editable is the safety net,
not the answer.

## Done when

- both templates walk end to end on `tools/walk.js` at 100% **and** 125%
- **the founder can do a real test from a skeleton on a real phone, twice, and watch one ladder
  move** — that is the acceptance test for the whole programme, not just this task
- `docs/journeys.md` gains the template road
- the twenty-six sentences are in `docs/suggestions-review.csv` for the reviewer
