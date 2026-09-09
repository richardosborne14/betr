# B46: The verb constructor on every worry, and the substitution made visible

**Status:** **DONE, 2026-09-09.** 252 tests, no dependencies, nothing requested after load.
**Confidence:** 9/10 on the mechanism, which is B41's and was already walked in B43.
**4/10 on the wording of nineteen skeletons and fifty-seven predictions**, which is the whole
risk and belongs to Misha and the CBT reviewer. They ship **unreviewed and marked so**, exactly
as `starts.js`, B41 and B42 did.
**Date opened and closed:** 2026-09-09 · **Founder's ask:** *"I wanted the verb constructor thing
to be the default."*
**Part of:** [`B45`](B45-one-road-in.md) §5a and §5d · **Spec:** the canvas at
https://claude.ai/code/artifact/77d1cadb-a55b-4926-8281-ea0a0556d73f

---

## What was wrong

**The verb constructor was on 2 of 21 worries.** The other nineteen handed a person a screen
headed *Make it yours* with **two empty blanks and nothing in them** — a worse screen than the
free-text one, which at least offers twenty-one verbs. And it was unreachable from either front
door.

**And the substitution was invisible.** It has worked since B41: she types "my sister" into one
blank and three sentences underneath become sentences about her sister. Nothing on screen said
so. The founder's canvas calls it *"the closest thing to intelligence BETR is allowed to have"*
and marks every landing with a highlight; the app marked none.

## What was built

### 1 · Nineteen skeletons, and the fifty-seven predictions under them

Every worry now prints its verb. `content.test.js` fails the build if one ships without.

    skeleton: { if: 'ask {person} for one small, specific favour',
                holes: { person: 'somebody' } }

**The method, and it is why this is not seventy-six new sentences.** The CONSEQUENCE half of
every prediction is kept **word for word** wherever it still reads; only the pronoun becomes the
hole — *"then I become a burden to them"* → *"then I become a burden to {person}"*. What changed
is the ACTION half: `help` had three slightly different actions (*ask someone for help* / *admit
I can't do it on my own* / *ask*) and now has one. **That collapse is the only part a reviewer
has to judge fresh**, and it is what a skeleton is — B41 made the same call for `no` and its own
note says so.

**Fifteen take `{person}`, five take `{thing}` or `{long}`, and one takes nothing.** *Leaving at
the time you decided* has no noun anybody could supply, so it is printed words and one blank —
and **the screen is identical**, which is the whole point. `lib/content.js` used to refuse a
hole-less skeleton (*"so it is just an if-half"*); that rule was right while a skeleton was the
exception and wrong now that it is the default, so it is gone, with its reasoning replaced.

**Three read badly on the first pass and were fixed by reading them out loud** — which is B43's
instruction and the only check that catches this: *"go the evening without my phone"* (not
English → *a whole evening*), *"turn up to something and not join in"* (the second verb needed
its own negation), and *"say one specific good thing to {person}, out loud"* (the comma stranded
*out loud* mid-sentence the moment a name went in the hole).

### 2 · The carried word is marked

`lib/content.js` gained **`fillParts()`** — the same substitution as `fill()`, returned as pieces
with each marked for whether the PERSON put it there. `app.js` gained `saidHtml()`, which wraps
those and nothing else. It shows on the three predictions, on the three sizes, and it is
reprinted on every keystroke so she watches her word arrive.

**A hole's own default word is never marked**, and that is the line rather than a nicety:
highlighting *"somebody"* would tell a person she had said something she had not, on the one
screen whose job is to show her her own words coming back.

`fillParts(x).map(text).join('') === fill(x)`, held by a test, because the moment those two
disagree a chip shows one sentence and inserts another (B34 D1).

### 3 · The dial, on every road

**Found while walking this**, and it is the same disease one screen later. Nineteen of the
twenty-one arrive on the do screen with their own `test` already in the box (`prefillPlan`),
which counted as *words of her own*, which **hid the row of three sizes**. So two worries showed
a dial and nineteen showed a finished plan nobody had chosen and no way to resize it.

One line: a box holding **BETR's own pre-filled plan, untouched** is not hers, so the three stay
beside it. **The prefill stays** — a worry's own plan is better than the general one, because it
is about that worry — so she now has both, on every road. The moment she edits a word of it, it
is hers and the row gets out of the way as it always did.

## What did not change, and was checked

- **BETR owns the verb, the person owns the nouns.** Every hole takes a person, a thing or a
  span of time. Not one takes a verb.
- **One worry, one ladder** — `rate.keyOf()` keys by id, untouched.
- **No id changed.** A stored result points at one.
- Nothing BETR writes names the habit, the body or anyone's safety — `content.test.js` walks
  every new skeleton through the same three word lists.

## Tests

**252, up from 250**, and four had their premise inverted rather than patched:

- *"a worry with no skeleton, and the free-text road, are exactly as they were"* became
  **"every worry prints a verb, and only the write-your-own road has one wide blank"**. It used
  to hold down the promise that B41 changed only two of the twenty-one — which is exactly what
  the founder opened the app and could not find.
- *"the skeletons that ship … are the two B37 named"* became **"every worry that ships has a
  skeleton"**, asserting the empty list rather than a list of two.
- The a11y sweep now derives where focus lands (the first empty hole) instead of hard-coding
  `#then`.
- The empty-blank refusal test now checks that a refusal does not take back a word she put in a
  hole — the first half is not a blank any more.

**And the harness gained `text()` / `showsText()` / `hidesText()`.** Marking split every sentence
carrying a hole across three nodes, and forty assertions were reading raw markup — which had
always been the fragile way to ask *is this sentence on screen* and only stopped working the day
a span landed in the middle of one.

## Gaps, and the next one is the founder's

- **Nineteen worries still have no three sizes of their own** and fall through to `general`'s.
  B45 §5b: thirty-eight sentences, and the reviewer's. The dial is now present everywhere, but
  on nineteen roads it is generic.
- **133 rows went into `docs/suggestions-review.csv`** (429 now) and every new sentence is in
  `docs/COPY.md` for Misha. **Nobody has read one of them.**
- **Nothing has been walked on a phone.** J4 covers the two templates; the other nineteen now
  behave the same way and no journey says so.
- **Still open from B45 §7a:** the mockup keeps all three sizes on screen after a pick and
  accepts the fold; B39 and B42 folded them to keep *Lock it in* above it. Untouched here.
