# B32: Practice — the borrow list, one tap aside

**Status:** **Done, 2026-09-08.** 195 tests green; walked in `tools/walk.js`
**Confidence:** 8/10 — it is the existing doors and list, moved and re-pointed. The 2/10 is
three sentences of content this task had to reword; they are named below for the CBT reviewer
**Date opened:** 2026-09-08 · **Depends on:** B30, B31 (both done)
**Mockups:** screen "Practice · one tap aside"

## What was built

The stock list is no longer the way in. It is **things to borrow**, reached from *Not sure? Try
one of these* on the front screen. Same six doors, same twenty-one items with their sentence
under the label (B19's rule stands: a pick list without the sentence is the bug).

**Picking one opens the build screen with the sentence half written.** The heading is *Make it
yours*; the first blank holds the if-half of the item's card sentence; the second is empty,
because which prediction is theirs is the one thing only they can say (B20). Its three
predictions are a row of chips underneath, and its plan and its leave-out line are already in
the boxes on the next screen. Everything editable, everywhere.

**Two screens went: B20's "which of these three is it" and the old test screen.** Six taps to
a locked-in test is four again.

## Decisions taken here

| | Taken | Why |
| --- | --- | --- |
| A borrow chip fills **both** blanks and shows the **whole sentence** | **Yes** | The plan said the three would be endings under one beginning. They are not: each of the three has its own if-half, different from the card's. Welding the card's beginning to another prediction's ending assembles a sentence nobody wrote. So the chip shows what it will put there |
| Which kind of test comes out | **Decided by the WORDS, not by the road** | Keep one of the three word for word and it is that item — same id, same label, same ladder. Change a word and it is theirs, with an id of its own |
| B20's hand-written `expect` | **Travels, where the sentence is still B20's sentence** | It is what a person is braced for, in different words from the prediction, and it is better than anything derived. Sixty-three of them stay in use. Where the sentence is the person's, `x` comes off their own words, which is more honest on the result screen |
| The label, from the borrow road | **Carried through every screen to the result** | Rule 10 as amended by B20. A borrowed test has a label AND a sentence; one built from nothing has only the sentence, and the sentence is its name |
| The nudge, and `ownScreen` | **Gone** | The build screen prints "If I" and ", then", so a sentence that is not a prediction cannot be made and there is nothing to ask about. `guards.checkBelief` still returns all of it and `guards.test.js` still proves every branch fires |

## The three sentences this task had to reword — for the CBT reviewer

The build screen prints the words **If I**. Three of the sixty-three stock predictions did not
start that way, so they could not be drawn on it at all. All three moved from a situation
happening TO the person to an action the person takes, which is the shape a behavioural
experiment actually tests, and the prediction underneath each is unchanged:

| id | was | is |
| --- | --- | --- |
| `phone`, belief 1 | If **someone can't get hold of me**, then they'll think I'm ignoring them. | If **I don't answer while it's away**, then… |
| `rest`, belief 2 | If **anyone sees me sitting down**, then they'll think I'm not pulling my weight. | If **I let somebody see me sitting down**, then… |
| `low`, belief 0 | If **they know**, then it's the thing they think of every time they see me. | If **I tell them**, then… |

**These are the only sentences in `worries.js` a session has rewritten since B1**, and the note
at the top of that file says so. `lib/content.js` now fails the build on any belief that does
not start "If I" and split cleanly on ", then" — which is not a style rule: a sentence that
does not come apart puts half of itself in one blank and hands somebody a broken test.

## The one place a person could feel they lost a ladder

Borrow, edit the prediction, lock in — and the item you borrowed from must still be on Your
tests with its own rungs untouched. A test walks exactly that: two runs of the borrowed one to
7, then an edited version which starts its own ladder at the top, then both cards on the same
screen. If that ever stops passing, a person who changed three words looks as though they
deleted their history.

## Files

- `web/app.js` — `borrow()`, `borrowed()`, `splitBelief()`, `builtTest()`, `sameAsStock()`.
  `beliefScreen`, `beliefOwn`, `ownScreen`, `takeBelief`, `ask`, `nudgeBlock`, `startFrom` and
  the `pending`/`nudge` scratch state all deleted, each with a note where it stood saying where
  its job went. Five retired stage names route to `build()`
- `web/content/strings-en.js` — `build.borrowTitle/borrowSub/borrowChips`, `doors.sub`, a wider
  `pick.sub`. The `belief.*` and `own.*` blocks retired after grep
- `web/lib/content.js` — `splits()`, applied to the card sentence and all three
- `web/app.css` — `.sentence .part`, so a wrap never strands ", then" at the end of a line
  with its blank underneath. Measured on a 390px phone, where it always wraps
- `web/content/worries.js` — the three above, and the note that names them

## Definition of done

- [x] Borrow → chip → lock → done → result, walked in `tools/walk.js` and in tests
- [x] Borrow, edit the second blank, lock → a new test with its own ladder; the borrowed one's
      card is still on Your tests, on the rung it was on
- [x] A borrowed test kept word for word keeps its id, its label and its ladder, and B20's
      expectation still travels with it
- [x] The doors' safety note and `doors.foot` still render, with "test" not "worry"
- [ ] **The three reworded sentences read by the CBT reviewer and by Misha**
