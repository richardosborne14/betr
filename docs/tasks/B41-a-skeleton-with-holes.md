# B41: A skeleton with holes — the build screen

**Status:** **DONE, 2026-09-09.** See the log at the bottom — including the shape the content
took, which is a real change to two shipped worries.
**Confidence:** 8/10 built. The rendering was cheap, as scoped; the content is the reviewer's.
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

---

## Built, 2026-09-09

**Status: DONE.** 234 tests, no dependencies, nothing requested after load. **Confidence: 8/10**
— the code is settled; the 2/10 is the content, and it is the reviewer's and Misha's, not a
doubt about the mechanism.

### What it does, on the screen

Two worries carry a skeleton: **`no`** and **`strug`**, the two B37 §6 named. Their build screen
prints *If I · say no to · [gap] · without giving a reason · , then · ___* — and typing **my
sister** into that one gap puts her in **all three predictions** before she has finished reading
them. Nothing chose anything, nothing was ranked, no model ran. It is a string substitution.

**No new component and no second code path.** A skeleton's if-half is the same `.fixed` span and
the same `.blank` input the sentence has always been made of; there are just more of them and
they are smaller, which is exactly what B37 §3 said it would be. A worry with no skeleton draws
the one big blank it always drew, and so does the free-text road.

### The shape the content took, and it is a real change to two shipped worries

**A skeleton'd worry's three predictions all start from the skeleton's if-half, word for word**,
and `content.js` refuses one that drifts. So `no`'s three went from three slightly different
actions — *say no and don't explain myself* / *turn something down* / *give no reason* — to **one
action with three consequences under it**. B20's rule is untouched, because B20's rule was that
the three predict DIFFERENT CONSEQUENCES, and all three still do.

That is the honest way to have a carry-through: she is filling in one action, and every
prediction is about the thing she actually did. Let the three drift apart and a chip changes the
words above it without changing that prediction.

**Both skeletons are BETR's voice in somebody's mouth, and NEITHER HAS BEEN READ BY MISHA OR THE
CBT REVIEWER.** That is B37 §9c and it is the risk in this whole task. They are flagged in
`worries.js`, in `docs/COPY.md` (which now explains what a `{person}` is, with its own block per
worry) and in `docs/changing-the-words.md`.

### What `content.js` holds, and the two things it cannot

Refused at build time: a `{hole}` used and never declared; one declared and never used; a
prediction that does not start from the skeleton; a hole whose fallback word is empty; a hole in
`test` or `drop` (**B42 owns the plan** — a hole there today would print as itself, because the
plan is pre-filled at the moment a worry is borrowed, before anybody has typed); an extra field
on a skeleton; and an assembled sentence that no longer comes apart the way the build screen
needs. Six tests in `content.test.js`.

**Not checked, and the reviewer holds both.** *BETR owns the verb, the person owns the nouns* — a
hole takes a person, a thing, a place and never a verb, or somebody composes a sentence BETR
appears to be proposing, which is the one thing rule 4 exists to prevent. And *a hole's fallback
word has to read naturally everywhere its hole appears* — which is why it is `somebody` and not
`a person`.

### Three things that would have gone quietly wrong

1. **B20's hand-written expectation stopped travelling.** `sameAsStock()` compares the person's
   sentence to the item's three; on a skeleton road every one of those has a `{person}` in it,
   so it matched nothing, and the thing she is braced for — written by a person to go with that
   exact prediction — was silently replaced by one read off her own words. It compares the
   FILLED sentences now.
2. **An expectation that begins with a hole began in the middle of itself.** *"my brother will go
   quiet, change the subject"*, in 800 weight, next to what actually happened.
   `guards.expectationFrom` has capitalised a derived expectation since the day it was written;
   `upperFirst()` is that same rule on a hand-written one, and a no-op on every expectation that
   starts with a word of BETR's.
3. **The chip row could hand back a stale word.** It is reprinted on every keystroke, but a
   browser that fired no input event would leave a chip saying *somebody* while the blank above
   said *my sister*. The tap re-reads the holes and substitutes her current word — B34 D1's rule
   is kept where it matters (`data-b` is an index into the three, so WHICH sentence you get is
   the one you tapped, and no lookup runs), and the only re-derived part is her own word.

### Measured

| at 125% | skeleton (`no`) | no skeleton (`angry`) | the fold |
| --- | --- | --- | --- |
| the sentence ends | 397px | 380px | — |
| *What will you do?* | 509px | 492px | 780px |
| the page | 1148px | 1060px | — |

A skeleton costs 17px on the sentence and both roads clear the fold at 100% and 125%. The extra
page height is the chips, which are longer sentences now.

**One thing seen and not fixed, because it predates this task:** the second blank's placeholder
*they'll think I'm being difficult* is clipped at 125% — an `<input>` does not wrap. It has been
that way since B30 and it is not a skeleton problem.

### Left for B42

`sizes` on a skeleton'd worry, replacing the two generic `dos` chips, with the same holes in
them — and with it the ban on a hole in `test`/`drop` is lifted. The plan prefill is what has to
move: it happens at `borrow()` today, before anybody has typed.
