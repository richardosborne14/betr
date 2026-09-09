# B39: The do screen fits a phone — the bug that now blocks three things

**Status:** **HALF BUILT, 2026-09-09, and the other half is a decision the founder has to make.**
The clipping bug is fixed on every road at every zoom. *Lock it in* is still below the fold, and
**the measurement found it is worse than this file said** — see "What the measuring found".
**Confidence:** 9/10 on what was built. The rest is not a fix anybody should pick alone.
**Date opened:** 2026-09-09 · **Part of:** [`B37`](B37-the-template-with-holes.md) §9(e)
**Depends on:** nothing. **Blocks:** B42, and B36 items 5 and 10b.
**Two screens since 2026-09-09:** the do screen and, from B38, the front screen — see below.

## The bug

At 125% text on a 390-wide phone, on *What will you do today?*: **the `do` box clips its own
text and *Lock it in* sits underneath the fixed menu.** The fold is 785px at 100% and 780px at
125%. Pre-existing, recorded in `docs/NEXT-SESSION.md` since B33, never anybody's task.

## And a second screen, added 2026-09-09 by B38

**The front screen joined it.** B38 put a fourth beat on the worked example — what they
actually did — and at 125% text *Not sure? Try one of these* went from clearing the fold by
32px to sitting **43px behind the fixed menu**. B33 had spent card padding on purpose to keep
that button clear; B38 spent it back and could not find the 44px anywhere cheap.

The primary button clears by 42px and is not at risk. What is at risk is the same thing as on
the do screen: **a tappable element whose visible sliver sits directly above a fixed bar**, so
the tap five pixels lower lands on the menu instead.

The three candidates below apply to it unchanged, and there is a fourth that is only the front
screen's: **the example card's `.real` type size**, which is at `clamp(1.1875rem,4vw,1.4375rem)`
and is two lines of marker-penned text at 125%. It is also the emotional payload of the card,
so it is the last thing to touch, not the first.

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
- at **125%**, the front screen's *Not sure? Try one of these* is either fully clear of the menu
  or fully below it — never a sliver above it (B38's numbers are in that task file)
- the same is true on the borrow road, the free-text road and a repeat — three roads reach this
  screen with different content in it (B34 §1)
- the numbers are in `docs/learnings.md`, because the next person to add a row to that screen
  needs to know what the budget is


---

## What the measuring found, 2026-09-09

`node tools/walk.js`, 390×844, root font-size set **before** the screen paints (setting it after
measures a stale auto-grown box — see `learnings.md`). Two of the three roads reach this screen
with different content in it; road B measures the same as road A.

**Road C, borrowed — both boxes pre-filled by BETR, both chip rows collapsed:**

| | fold | `do` box | *Lock it in* | before B39 |
| --- | --- | --- | --- | --- |
| 100% | 785 | 116, **fits** | 570–652, clear by 133 | box clipped, 112 into 92 |
| 125% | 780 | 169, **fits** | 733–823, **43 behind** | box clipped 165 into 99; button 49 behind |
| 150% | 774 | 235, **fits** | 911–1009, below | clipped 231 into 112 |
| 200% | 720 | 355, **fits** | 1371–1483, below | clipped 351 into 138 |

**Road A, the person's own words — both boxes empty, the `do` chip row open:**

| | fold | *Lock it in* | before B39 |
| --- | --- | --- | --- |
| 100% | 785 | 750–832, **47 behind** | 808–890, **105 behind** |
| 125% | 780 | 897–987, 207 behind | 969–1059 |
| 150% | 774 | 1059–1156 | 1146–1243 |

### Three things the numbers say that the scope did not

**1. The clipping was never a zoom bug. It was there at 100%, on the road most people take.**
BETR's own pre-filled `do` sentence needed 112px in a box reserving 92 — so the last line of a
sentence somebody was about to lock in sat inside a scrollbar they had no reason to look for.
This is fixed: the boxes grow to their contents, `min-height` stays as the floor, and **no box
clips its own text on any road at 100 / 125 / 150 / 200%.**

**2. *Lock it in* was already below the fold at 100% on the main road**, which this file said
was a 125% bug. It has been true since B32 made the free-text road the front door, and nobody
had measured road A.

**3. The screen cannot be made to fit by trimming, and the arithmetic is not close.** The two
explanatory lines were each wrapping to two lines at 125% and cost 74px between them; one line
each got that back and **the main road is still 47px over at 100% and 207px over at 125%.**
Every remaining margin on the screen added together is about 50px. **The `do` chip row alone is
159px at 100% — for two suggestions** — and B34 §1's road A is the only road that gets the
generic pair. The choice is between content and the fold, and it is not a padding value.

## What was built

- **The boxes grow to their contents** (`grow()` in `app.js`, called from `wireChips`).
  Textareas only — the build screen's two blanks are `<input>` and are left alone. Guarded on
  `tagName`, so it is a no-op in the flat fake DOM and is measured on the walker instead.
- **`build.doSub`** *"One thing, today. Small and entirely up to you."* → **"One small thing,
  your pick."** Keeps the size and the autonomy, loses a line.
- **`build.dropSub`** *"Leaving it out is what makes it count. Optional."* →
  **"Optional. It's what counts."**
- **A budget test**, the same guard `doors.intro` has had since B23: `loop.test.js` fails the
  build if either line goes over 28 characters, which is one line at 125% in a 350px column.

## The decision, and it is the founder's

At 125% on the free-text road the screen is 207px over. Only two things on it are that big.

**Option 1 — *And leave out* collapses to one line.** The label, its explanation, the box and
its chip row become a single row showing the current value: *And leave out: "No checking it
'just once' before bed." — change*. Saves ~130px at 100%, ~165 at 125%. **It fixes road A at
100% (clears by 83) and does not fix any road at 125%.** The thing to be careful of: on the
borrowed road that value is BETR's, pre-filled, and a person must still SEE it before locking
it in — a plain link that hides it would put BETR's words in somebody's mouth unread. That is
why the row shows the value rather than a label.

**Option 2 — the screen scrolls, and that is accepted and said so.** A form with two boxes and
a suggestion row does not fit a 390px phone at 125% text, and no rearrangement changes that. If
this is the answer then the work is to make the scroll obvious, not to make the screen shorter.

**Neither is free and B42 wants three more rows on this screen.** The recommendation is
**option 1, and B42 designs against the collapsed version** — but rule 10 is the founder's and
this screen is the one they have overruled themselves on twice.

## What made the straddle worth caring about, and it is already an open decision

At 100% on road A the button spans 750–832 with the menu fixed over 785: **the top 35px of
*Lock it in* is tappable and the bottom 47px is the menu.** Walked it — tapping *New test* from
this screen wipes the sentence and the plan with no warning. That is *New test* doing what it
says, and it is why a straddling primary button matters here more than it would elsewhere.
**B36 item 6 — "should a half-written test survive?" — is not a nicety; it is the safety net
under this bug**, and it is already waiting on the founder.

## Done when — where it stands

- ✅ no box clips its own text, on both roads, at 100 / 125 / 150 / 200%
- ✅ the numbers are in `docs/learnings.md`
- ⬜ *Lock it in* fully clear of the menu at 125% — **blocked on the decision above**
- ⬜ the front screen's *Not sure?* button at 125% (B38's regression) — same decision, same screen budget problem, different screen
