# B43: Two templates, walked end to end — the "try it out"

**Status:** **DONE, 2026-09-09.** See the log at the bottom.
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

---

## Built, 2026-09-09

**Status: DONE. Confidence: 8/10 on the road, unchanged at 4/10 on whether the sentences sound
like people** — which is the whole point of this task and belongs to Misha and the reviewer.

### The finding: there was nothing left to build

B41 shipped the two skeletons and B42 shipped their two sets of three sizes. Every sentence this
task scoped was already in `worries.js` when it opened. **So B43 turned out to be the walk, not
the build**, and the walk is what it was for: three separate mechanisms — B40's road-keyed
ladder, B41's gaps, B42's sizes — had each been walked alone and never together.

**They work together.** Walked on `tools/walk.js` at 100% and 125%, on both templates, twice
each, and the one thing that could have been wrong was not: a person who types **my sister** on
Monday and **my boss** on Wednesday, picks a different prediction each time and a different size
each time, gets **one card and one ladder** — *Started 10 · 1st 7 · Now 6 · Down 4 since you
started*, each rung carrying the size it was done at. That is rule 5 holding across every
variable B40–B42 added at once, and it is the acceptance test for the whole programme.

Nothing was changed in `web/`. 244 tests, still passing, still no dependencies.

### Measured, and left

| Screen, 125% | Fold is 780 | Where things sit |
| --- | --- | --- |
| `strug` skeleton | | all three predictions start above it; the third runs 773–867, so its top edge shows and invites the scroll |
| `strug` do screen, before a pick | | the three sizes end at **754** — inside the fold, as B42's table promised for `no` at 705 |
| `strug` do screen, after a pick | | folded: *Lock it in* at **543–633**, well clear |

`#ownit` at 909 on the 125% skeleton screen is below the fold. It is a plain text link and the
last thing on the screen, and it is meant to be the road not taken — left.

### Checked, and each one is a decision rather than a bug

- **The `why` page quotes the worry's own sentence, not the person's.** It is a page about the
  worry, not about them; it must read the same for two people who filled the gap differently.
- **The person's own words are the second-person "you" in a size (*"Tell {person} what you are
  actually finding hard"*) while the prediction is "I".** That is the same split every `test`
  field in `worries.js` has always had: the prediction is what you believe, the do is what you
  are being handed.
- ***Write the whole thing myself* empties both boxes and leaves the worry's ladder alone** —
  B40's call, confirmed on the road.
- **A fresh visit to a worry does not pre-fill the last gap you typed.** A second test is a new
  test, not the old one reopened.

### `docs/journeys.md` gained J4, and the other three were labelled

**J4 · The template road** walks all of the above in 21 steps, at both text sizes, and ends with
the instruction that matters more than any of them: *read every sentence out loud, and ask not
whether it is correct but whether you would ever say it.*

**J1, J2 and J3 have not been rewritten since B19 and their wording is behind the app.** Rather
than rewrite three journeys inside this task, the changelog now says so at the top, and says to
walk J4 first. A founder finding *"Pick a worry"* in J1 should read that as an old journey, not
a broken app.

### The reviewer's envelope: 32 rows, not 26

`docs/suggestions-review.csv` goes from 245 rows to **277**. The 26 this task scoped are there —
per template: the skeleton stem, three predictions, three expectations, three size `do`s and
three size `drop`s. **Six more went in with them**, because the reviewer needs the third set of
three too: the size **names**, which every road falls through to, and the three `general` size
lines B42 wrote that had never reached the sheet.

**And one row was corrected rather than added.** `G-D2` — *"Pick the version of it you could do
in the next hour."* — was marked `shipped`, and has not been in the app since B42 replaced the
two loose `do` suggestions with the three sizes. It is now marked **CUT**, with the reason. A
reviewer scoring a line that is not live is the sheet wasting the critical path.

The three questions in the sheet's own words, on the rows they belong to:

- **W-NO-D1 / W-ST-D1** — the smallest step changes *what it is about* and keeps *who it is
  with*. Should it be the other way round? (B42's open question.)
- **W-NO-D3 / W-ST-D3** — the largest step, offered with no clinician anywhere near it.
  `W-ST-D3` is the one we are least sure of: it is the only step in BETR that hands the length
  of the thing to the other person.
- **G-Z1** — are the three actually **in order**, whatever the person typed? No test can check
  that, and it is the reviewer's to answer.

### Gaps

- **The founder has not walked J4 on a phone.** That is the acceptance test and it is a person's
  job, not a walker's.
- **The 26 sentences are still unread by Misha and the reviewer**, exactly as they shipped.
- **Nineteen worries still have no skeleton and no sizes.** Batching the rest is a job that has
  not been costed, and it waits on the reviewer agreeing to the two.
