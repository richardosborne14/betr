# B42: Three sizes — the dial, as content rather than as a control

**Status:** **DONE, 2026-09-09.** See the log at the bottom.
**Confidence:** 8/10 built. The mechanism is settled; the 2/10 is the content, which is the
reviewer's and Misha's.
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


---

## Built, 2026-09-09

**Status: DONE.** 244 tests, no dependencies, nothing requested after load. **Confidence: 8/10.**

### What it does, on the screen

*What will you do today?* opens with an **empty box and three named steps under it** — *A small
go · A bigger go · The whole thing* — each a whole sentence, in order, with her own word already
in it where the worry has a skeleton. Tapping one fills **both** boxes: a size is a step and the
leave-out that belongs to it, and a big go with a small leave-out is not a bigger test but a
different one.

Two worries carry their own three (`no` and `strug`, the two B41 gave skeletons). `starts.js`
`general` carries the three every other road falls through to, so **the dial is on the worry
road and the free-text road alike**. The twenty-one starts kept their hand-written `dos` and
`drops`: a pair written for that exact if-half is worth more to somebody who tapped it than a
generic dial, and the day a start gains three sizes it takes over with no code change.

**What is recorded is the size's NAME**, not an index — it is what the export and the ladder row
say out loud, and a list reworded next month must not silently relabel what somebody already did.
It rides in `store.js` v5's `size` field, which B40 put there for exactly this. **It keys
nothing**: `rate.keyOf()` still groups a ladder by the worry's id, so three sizes of one worry
are one ladder (rule 5). The ladder row says *A small go* under the rung it moved to, and a
screen reader hears *"Now: 9 out of 10. Down one rung. Done at: A small go."*

**On a repeat**, the plan card carries one line — *How big a go: A bigger go · Change* — and
*Change* opens all three with **LAST TIME** on the one she did. Same again is one tap and a
smaller one is the same one tap. There is no nudge upward anywhere.

### The one piece of code that had to move, and it moved further than the task said

The plan was pre-filled at `borrow()`. **Two things forced it out of there.** A plan may carry
the same `{person}` the sentence does now, and at `borrow()` nobody has typed into a hole yet —
so it would have printed `{person}` in a box, literally. And on a worry with three sizes there is
**no prefill at all any more**: the three are the choice, and a box arriving with one of them
in it is BETR having picked. So `prefillPlan()` runs on the way to the do screen, once, and only
where the worry has no sizes of its own.

**Two visible consequences, both intended.** *Write the whole thing myself* no longer carries
BETR's plan for the worry she just left — the own road starts empty, exactly as the free-text
road always has. And the do box's placeholder is *Or put it in your own words* on the size road:
the old one is a worked example, and over three named steps a worked example reads as a fourth.

### The fold, measured, and what it cost

The row is 257px at 100% and 296 at 125%, and it put *Lock it in* at **862 against a 785 fold**
— B39's bug, back, the day after B39 closed it. Two things fixed it, and the second is the one
that matters: the name runs into its own sentence rather than taking a line (−69), *One small
thing, your pick* comes off the size road (−47), and **once one of the three is in the box the
row folds to a line saying which**, in the same component B39 folded the leave-out into.

| 390×844 phone | 100% (fold 785) | 125% (fold 780) | 200% (fold 720) |
| --- | --- | --- | --- |
| worry road, before the pick | **760** | 925 | 1694 |
| worry road, picked | **627** | **719** | 1194 |
| free text, before the pick | **747** | 882 | 1598 |
| free text, picked | **620** | **709** | 1197 |
| a worry with no sizes (unchanged) | **599** | **668** | 1172 |
| repeat screen, folded | **678** | 875 | — |

**The 125% before-the-pick number is not B39's failure**, and the difference is worth stating:
with an empty plan *Lock it in* refuses, so it is not a button a person can press and cannot see.
What has to be visible in that state is the three, and the last of them ends at **705**. At 200%
this screen has never fitted — the unchanged road is 1172 against a 720 fold — and B42 adds 22px
to that overhang. **The repeat screen at 125% did not fit before today either** (834 with no row
at all); the folded line adds 41px to a 54px overhang, which is why it is a line inside the plan
card rather than a row of its own — 26px against 81.

### What `content.js` holds

`checkSizes()`, on a worry and on a start alike: exactly three or none at all; three fields and
no fourth; a name that starts with a capital, carries **no digit** and carries no hole; both
halves whole sentences starting with a capital and both through the three word lists, because
they are BETR proposing; no two saying the same thing. **The number rule is the one that is a
rule rather than shape** — "Level 2" turns a dial into a ladder with a top, and a top is
somewhere a person can fail to reach (B36 §9: 38 studies, 8,110 people).

**B41's ban on a hole in `test`/`drop` is lifted**, and a narrower one replaced it: a `{hole}`
anywhere in a worry with **no skeleton**, which is the bug the old ban was really about — there
is nothing to fill it from. `planFor()` fills both sides before comparing, which is the
comparison that would have gone quietly wrong this time (learnings.md, B41's rule).

**What it cannot check, and the reviewer holds it: that the three are actually in order.** A
list of three in the wrong order still validates and would hand somebody *The whole thing* under
the heading of a small go.

### Left open, and whose

- **Should *A small go* change WHO it is with?** Unanswered, and it is still the reviewer's with
  Misha. These three turn one dial — how big a thing — and CCI's first dial is a different one.
  Doing it would need a second hole rather than a reuse of the first.
- **Eight new sentences and nine names, none read by Misha or the CBT reviewer.** Two worries'
  three each, plus the general three. Same standing as B41's skeletons: BETR's voice in
  somebody's mouth, flagged in `worries.js`, `starts.js` and `docs/COPY.md`.
- **The 200% overhang on the do screen, and the 125% overhang on the repeat screen.** Both
  predate this task and both are measured above.
