# B42: Three sizes — the dial, as content rather than as a control

**Status:** **SCOPED, not started.**
**Confidence:** 7/10.
**Date opened:** 2026-09-09 · **Part of:** [`B37`](B37-the-template-with-holes.md) §8 · absorbs
B36 item 8 and answers B36 item 9
**Depends on:** B39 (the fold), B40, B41.

## What it does

A worry with a skeleton gains **`sizes`** — three, in order small → big, each `{ name, do, drop }`,
each free to use the same holes:

    sizes: [
      { name: 'A small go',    do: 'Say no to one small thing today, in one sentence.',
                               drop: 'Don’t give a reason.' },
      { name: 'A bigger go',   do: '…' , drop: '…' },
      { name: 'The whole thing', do: '…', drop: '…' }
    ]

**They replace the two generic `dos` chips. Same screen, same shape, better content.** The
founder's small / medium / big *is* B36's dial — arriving as three concrete sentences rather than
three abstract sizes, which is better: a rung you can read is a rung you can pick.

`starts.js` `general` gains three generic sizes for the free-text road, so the dial exists on
both roads.

## What is recorded, and what is not

The run stores **which size it was done at** (B40's `size` field), and the ladder row shows it:
*"A small go · A bit less sure."* **That is a fact about the test, not a grade of the person.**

**Never, and a test holds each:**

- no rung is offered *because* a previous one succeeded, and no rung is ever greyed out — three,
  always, from the first screen to the fiftieth. Availability that depends on history is the app
  choosing (rule 2)
- no points, no badges, no levels, no progress bar, **no number on a size at all** — B36 §9: 38
  studies and 8,110 people found gamification predicted neither outcome nor whether people kept
  going, and it would be a score of the person besides
- nothing totalled, averaged or targeted across worries (rule 5)

## On a repeat

*Test this again* offers the same three with **last time marked**. Same again is a real answer
and the copy should say so: doing something once and getting away with it is easy to put down to
luck. Never a nudge upward; the person picks.

## Open, and whose

**Should *A small go* change who it is with?** These three turn one dial — how big a thing. CCI's
first dial is a different one: **who it is with**. The smallest honest version of a test may be
*"somebody who isn't [person]"*, which needs its own hole rather than reusing the first. **Decide
once, in the content, not per template.** The reviewer's, with Misha.

## Done when

- three sizes render on the template road **and** the free-text road
- the size shows on the ladder row and in the export
- a test proves no rung is ever hidden, greyed, numbered or recommended
- the screen still fits at 125% and 200% — which is why B39 comes first
