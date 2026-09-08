# B32: Practice — the borrow list, one tap aside

**Status:** **Open**
**Confidence:** 8/10 — it is the existing doors and list, moved and re-pointed
**Date opened:** 2026-09-08 · **Depends on:** B30 (it lands in the build screen)
**Mockups:** screen "Practice · one tap aside"

## What it is

The stock list is no longer the way in. It is **things to borrow**, reached from *Not sure? Try
one of these* on the front screen and from a line on the build screen. Same doors, same
twenty-one worries with their sentence under the label (B19's rule stands: a pick list without
the sentence is the bug). Picking one **opens the build screen with the blanks filled**: the If
half from the worry's card sentence, the Then blank empty with **that worry's three `beliefs`
as its chips** (B20's three, now as suggestions instead of a screen of their own), and the stock
`test` and `drop` waiting in the second half's boxes. Everything editable. Then the loop as B30.

## Decision taken here

**The old test screen and the "which of these three" screen go.** One build screen serves both
roads; a borrowed test is an own test with the blanks pre-filled. The person's `source` stays
`'stock'` with the worry `id` when they keep the stock sentence unchanged, so `rate.keyOf()`
keeps the ladder they had (rule 5's "keyed by id" reasoning still holds); the moment they edit
either blank it is an own test with a new id, and the old ladder stays on Your tests under the
stock sentence. **This is the one place a person could feel they "lost" a ladder** — the card for
the stock sentence must still be there. A test proves it.

Flip if the founder wants the old flow back: keep `beliefScreen()` and route stock picks to it.
One line in `go()`.

## Files

- `web/app.js` — `doors()` and the list stay; `beliefScreen()`, `beliefOwn()` and the stock test
  screen retire; the pick calls B30's `build()` with a prefill. `startFrom(f, b)` becomes the
  prefill. The `mine` cards keep *Test this again*, which prefills the same way.
- `web/content/strings-en.js` — `doors.*` sub-lines say *borrow*; `belief.*` keys retire after
  grep.
- `web/content/whats-going-on.js`, `worries.js` — unchanged in shape. `why.js` (B18's "why this
  one sticks") stays reachable from the borrow list's cards.
- `web/tests/loop.test.js` — `firstBehind()` and the door walk move here: `#not-sure` →
  `[data-door]` → `[data-id]` → `#if` holds the stock If half → a `[data-b]` chip fills `#then`.
- `web/tests/content.test.js` — unchanged; plus: every stock `belief` splits cleanly on ", then "
  into two non-empty halves, so the prefill never lands a broken sentence.

## Definition of done

- [ ] Borrow → chip → lock → done → result, walked
- [ ] Borrow, edit the Then blank, lock → a new test with its own ladder; the stock one's card
      is still on Your tests
- [ ] The doors' safety note (door one) and `doors.foot` still render, with "test" not "worry"
