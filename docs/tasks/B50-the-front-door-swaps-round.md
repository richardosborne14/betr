# B50: the front screen's two buttons swap places

**Status:** **DONE, 2026-09-10.** 269 tests pass, walked in Chrome, measured at 100% and 125%.
**Confidence:** 9/10. The change is four lines of markup and two strings; what makes it a 9 and
not a 10 is that **the two sentences are drafts and Misha has not read them.**
**Date opened:** 2026-09-10 · **The founder's ask**, in their own words: *"the 'not sure? try
these' button should be the primary button … and the 'what's yours' button should be secondary."*
**Depends on:** nothing. **Finishes:** [`B45`](B45-one-road-in.md) §4.

---

## 1. It is not a preference — it is B45 §4's last unshipped row

The founder asked for this as a taste call. It is not one. **[`B45`](B45-one-road-in.md) §4's
one journey has said since 2026-09-09** that the front screen's big button opens *What's going
on?* — the doors — and that the free-text road is **"an exit, not the entrance"**:

> *"None of these — I'll write my own* lands on that screen with every blank empty and no
> printed verb, which is right: a person writing her own owns the whole sentence. **It is an
> exit, not the entrance**, and it is not a second screen."

The buttons were the other way round from 2026-09-08 ([`B28`](B28-present-practice-produce.md) /
[`B31`](B31-the-front-screen.md)) to today: the big button opened two empty blanks and the
ready-made list was a ghost underneath it. B45 changed the road four times over two days and
never moved the door. **The founder read the screen and found it.**

## 2. What changed

| | before | after |
| --- | --- | --- |
| big button | *What's yours?* → the build screen, two empty blanks | **_Find yours_ → *What's going on?*, the six doors** |
| ghost under it | *Not sure? Try one of these* → the doors | **_Write my own_ → the build screen** |
| the arrow `→` | on the big button | on the big button — it moves with the road, because it is what says which one the road is |
| the id `#not-sure` | the doors | **renamed `#pick`.** A button that says *Find yours* cannot keep an id that says *not sure*; that is the same staleness [`B48`](B48-the-greyed-example-belongs-to-this-worry.md) and [`B49`](B49-the-grey-lines-and-a-size-of-its-own.md) were both about, one layer down. `#go` kept its name: it still goes somewhere |

**The string keys did NOT change.** `start.go` is still the road that starts from nothing and
`start.borrow` is still the one that starts from BETR's list. Only which of them a person meets
first, and what each says.

### On the words

The founder offered *"Choose one of yours"* and *"Make your own one"*, hedged both with "or
something", and chose **_Find yours_ / _Write my own_** off three drafted pairs.

- ***Find yours*** keeps the possessive the old big button had. A person is looking for the one
  that is theirs and the six doors are where that search starts. What it drops is *"Not sure?"*,
  which named the **person** rather than the thing, and only ever made sense while this was the
  smaller of the two — a ghost may ask whether you are stuck; the road may not.
- ***Write my own*** is the app's own phrase for this, twice over: the doors screen ends with
  *None of these — I'll write my own*, and the build screen's way out is *Write the whole thing
  myself*. Nothing new to learn.

**Neither is one of the nine frozen sentences** (research §10) — checked before a word was
touched. **NOT MISHA'S YET.**

## 3. The test that should have existed and did not

**Nothing failed for two days.** Every test navigates the front screen by id, and neither id
says which button it is on — so the app could disagree with its own journey's first step with a
green suite. `loop.test.js` now reads what a person sees: which button carries `big`, which
carries `ghost`, **where the arrow is**, and where each one lands. Checked by putting the old
arrangement back; it fails.

**The lesson is B48's and B49's a third time.** A pair held equal by nothing at all is a pair
that comes apart, and the front door is the one screen where being wrong costs everybody rather
than somebody.

## 4. Measured, 390×844

| | |
| --- | --- |
| 100% | *Find yours* **534–617**, *Write my own* **635–691**, fold 785, page 882, no horizontal scroll. Both fully clear |
| 125% | *Find yours* ends at **738**, the menu starts at **780** — clear by 42. *Write my own* ends at **823**, **44px behind the menu** |

**The 125% number is B39's, to the pixel** ([`B39`](B39-the-do-screen-fits-a-phone.md), *"the
front screen at 125% is NOT fixed and cannot be"* — it costed the levers and there was nothing
to take). **Nothing got worse**: both new strings are shorter than the ones they replaced, so
neither button can wrap where the old one did, and the geometry is unchanged.

**One thing did get slightly better, and it is worth saying.** The button partly behind the menu
at 125% used to be *the way to the ready-made list*. It is now *the way to write your own* — so
the road is the one that is fully clear, and the exit is the one that needs a scroll. That is
the right way round.

## 5. What this leaves open

1. **The bottom row's *New test* still opens the build screen with two empty blanks** —
   i.e. the exit, reached from a permanent row on every screen. That was consistent while the
   free-text road was the entrance and it is a question now. **Not changed: the founder asked
   for the front screen.** It is one line (`on('#m-new', …)`) whichever way it goes.
2. **Misha on both sentences.**
3. **Old task files were not rewritten.** [`B28`](B28-present-practice-produce.md),
   [`B31`](B31-the-front-screen.md), [`B33`](B33-help-the-small-print-and-the-walk.md),
   [`B34`](B34-auditing-the-suggestions.md), [`B38`](B38-the-did-the-reframe-and-the-net.md) and
   [`B39`](B39-the-do-screen-fits-a-phone.md) all quote *What's yours?* or *Not sure? Try one of
   these*. They are logs of what was true on their day and they stay that way. **The live
   documents were updated**: `docs/00-scope.md` (§1 and the screen table), `docs/journeys.md`
   (J4 step 1 and 12), and `docs/COPY.md` is regenerated.
