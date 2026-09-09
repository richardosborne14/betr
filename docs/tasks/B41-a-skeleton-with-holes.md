# B41: A skeleton with holes — the build screen

**Status:** **SCOPED, not started.**
**Confidence:** 7/10. The rendering is cheap; the content shape is the part to get right once.
**Date opened:** 2026-09-09 · **Part of:** [`B37`](B37-the-template-with-holes.md) §3, §5
**Depends on:** B40. **Blocks:** B42, B43.

## What it does

A worry may carry a **skeleton**: the if-half as printed words with named holes in it.

    id: 'no',
    skeleton: { if: 'say no to {person} without giving a reason',
                holes: { person: 'a person' } },
    beliefs: [ { belief: '{person} will think I’m being difficult', … }, … ]

**The build screen already does 90% of this.** It prints `If I` and `, then` as `.fixed` and
puts `.blank` inputs between them. **A skeleton is more printed words and smaller blanks** — no
new component, no new screen, no second code path.

**The carry-through is the whole point.** Typing into a hole re-renders the three prediction
chips with that word in them. She fills *a person* once, at the If, and it arrives everywhere she
did not type it. Nothing chose anything and no model ran.

## The rules that travel with it

- **BETR owns the verb. The person owns the nouns.** Holes take a person, a thing, a place —
  **never a verb**. Rule 4 did not loosen for BETR: a suggested test is BETR proposing, so the
  action has to be BETR's content. Let a hole take a verb and somebody can compose a sentence
  BETR appears to be proposing. `content.test.js` cannot check this; **the file comment states it
  and the reviewer holds it.**
- **The HARM stop runs on hole text**, exactly as it runs on both boxes today. `HABIT` and `BODY`
  still refuse nothing (B29) and still hold BETR's own content — which now includes every
  skeleton.
- **A skeleton is optional.** *Sitting still when I feel restless* has nobody in it. Roughly eight
  to twelve of the twenty-one want holes; the rest stay exactly as they are.
- **`content.js` validates**: every `{hole}` named in a belief or a size exists in `holes`; every
  hole is used at least once; the assembled sentence still starts "If I" and splits on ", then",
  which `content.js` already enforces and which B32 rewrote three sentences to satisfy.

## Where a person leaves it

**Write the whole thing myself** — one plain link, specified in B40. Not a mode, not a toggle,
nothing to discover. The 10% pay one tap.

## Done when

- two skeletons render, fill, and carry a word into all three predictions
- the escape link works and hands over a genuinely own test
- a filled skeleton locks in **as the stock item, with its ladder intact** (B40's test proves it)
- nothing on the free-text road changed — same screen, boxes empty
