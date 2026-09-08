# B33: Help, the small print, and walking the whole thing

**Status:** **Open. Last of the five; closes B28**
**Confidence:** 8/10
**Date opened:** 2026-09-08 · **Depends on:** B29–B32

## What it is

The words that explain BETR catch up with what BETR now does, and the whole app is walked as
one thing — every screen, both roads, a screen reader's view, 125% text — before the handoff
says B28 is done.

## 1 · Help

- **Sentence 6 is the disclaimer the founder asked for**, and it already exists verbatim:
  *"Choose experiments that are safe and legal. Never design one that involves the habit you're
  trying to change, self-harm, restricting food, or putting yourself or anyone else at risk."*
  Since the habit and body lists no longer refuse a test, this sentence is the only place the
  line is drawn, so it moves **up** the Help screen: still after crisis (B17) and the proof
  (B26), and before the nine sentences as a block — the two order tests in `menu.test.js` change
  to hold the new order.
- The CBT explanation on Help (`why`/primer) says *test*, and says the If/Then shape in one line.
- The purpose statement stays identical everywhere it appears (rule 7); grep the listing text
  in `docs/` too.
- TrybeUP's entry: unchanged, rule 9.

## 2 · The small print and the paperwork

- `docs/changing-the-words.md` — the founder's own file. Every path and key in it checked
  against the new `strings-en.js`, `starts.js` and `examples.js`; a section on changing a
  suggestion chip and on changing the front-screen example.
- `docs/COPY.md` regenerated. `docs/00-scope.md` §3 table redrawn as the screens now are.
- B5's listing text (`docs/tasks/B5-capacitor-wrap-and-store-listings.md`) re-read for "worry".

## 3 · The walk

`tools/walk.js`, 390 wide, then 125% text, then a reduced-motion pass:

- Cold start → front card → *What's yours?* → build → lock → done → result → Your tests
- Cold start → *Not sure?* → door → borrow → chip → lock → … → result
- Returning person with a locked test: lands on it (`boot(a.mem)`)
- A `HARM` sentence on each blank → refusal with the crisis lines → *Change it* → carries on
- Export, and import into a cleared browser: ladders and sentences intact
- The accessibility tree of the build screen: each blank has a name that says "If I" / "then",
  the chips are buttons, the sentence at the top of the doing screen is announced

Anything found is fixed in place with a test, the usual shape. Findings that are content go
to `docs/journeys-observed.md` for the founder and Misha.

## Definition of done

- [ ] All of §3 walked, with `shot`s in `docs/shots/` for the founder
- [ ] `node --test` green; count recorded here
- [ ] `docs/learnings.md` has what took longer than thirty minutes
- [ ] `NEXT-SESSION.md` rewritten: B28 closed, release conditions restated (Misha on the doors,
      the CBT reviewer on `starts.js` and `examples.js`, a real screen-reader pass, Q1)
- [ ] The founder told: `https://betr.trybeup.com`, wifi off after load
