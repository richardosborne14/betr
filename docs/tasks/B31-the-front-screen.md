# B31: The front screen — one finished test, watched not read

**Status:** **Open**
**Confidence:** 8/10 in the build; **4/10 in the example**, which is one line of content nobody
outside this building has read, and the whole screen rests on it
**Date opened:** 2026-09-08 · **Depends on:** B30 (its big button leads to the build screen)
**Mockups:** screen 1, and the note "The first thing they see"

## What it is

The front screen stops describing BETR. It shows **one finished test**: a small caption (*What
one test looks like*), then the result card exactly as a person's own will look — the
prediction, a line struck through it, what happened in marker, the ladder from ten to a lower
rung — then **What's yours?** (big, leads to B30's build screen), **Not sure? Try one of these**
(ghost, leads to B32's borrow list), and the trust line. The bottom row stays.

**The founder's bar (2026-09-08):** a handful of words, no long text, no link to go and learn.
A person reads it and thinks "I wish I had that courage", then sees that anyone does, in a safe
and controlled way. **Words, not video** — it works with wifi off, weighs nothing, needs no
actor, reads aloud on a screen reader, and it is the very thing they are about to make.

## The reveal

Under `@media (prefers-reduced-motion: no-preference)` only: the prediction is there from the
start; the strike draws at about one second; *What happened* fades in at about two; the ladder's
second row appears at three and its last four dots go grey. Four seconds in all. With reduced
motion the card is simply there, finished. **The final state is in the markup**, the animation
only delays it — so nothing depends on the animation having run.

## The example

Lives in a new **`web/content/examples.js`**: up to four, each `{ prediction, happened, from,
to }`. Plain data. One is shown per open, chosen by a counter in storage (not at random — a
person who reopens sees the next one, and a tester can predict which). The mockup's:

> If I tell my dad I'm struggling, he'll change the subject. → He went quiet. Then he said "Me
> too." 10 → 6

Three or four alternatives are on the canvas note for the founder and Misha.

**Real or example — the founder's decision, before this ships.** Shown as a real person's
result it is a testimonial, and MHRA reads a testimonial as an implied claim (research §5.2).
Shown under *What one test looks like* it is a page in a book. The task builds the latter and
the caption is the line that makes it so; if the founder chooses a real one of their own, the
caption changes to say whose, and the ladder numbers are the real ones.

**Rule 5 still holds on this card:** the example's ladder moves down because that is what
happened in the example; the screen may not say how far anyone else's will move, and the number
is that test's, not a score. No "most people". No average.

## What leaves the front screen

`start.title` ("You've played it out a hundred times"), `start.sub`, and `start.ladder` (B25's
"every worry starts at ten" line) all go. B25's problem — a person's first result landing on an
app that never said where the number starts — is answered by the card itself, which shows a
ladder starting at ten. `loop.test.js`'s test that holds the B25 line changes to assert the
card's first rung reads ten.

## Files

- `web/app.js` — `start()` redrawn. `web/content/strings-en.js` — `start.*` rewritten.
- `web/content/examples.js` — new; `index.html` loads it.
- `web/app.css` — the reveal, inside the reduced-motion block, and nothing else new: the card
  is `.result` as it is.
- `web/tests/content.test.js` — every example is one sentence each side, the prediction starts
  "If I", `from` is 10, `to` is between 1 and 9, no habit word, no diagnosis word, and none of
  the seven banned phrases.
- `web/tests/loop.test.js` — the front screen shows a card, *What's yours?* opens `#if`, *Not
  sure?* opens the borrow list; the a11y test reads the card as one region with the strike
  announced as "expected" not as struck text.

## Definition of done

- [ ] Walked at 390 wide: the card, both buttons and the trust line are above the fold **at
      125% text** (the fold is 785px, not 844 — see `NEXT-SESSION.md`)
- [ ] With reduced motion on, the finished card is there on paint
- [ ] The founder has read the example on a phone and said which one
