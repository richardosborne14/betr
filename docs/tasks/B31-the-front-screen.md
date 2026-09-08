# B31: The front screen — one finished test, watched not read

**Status:** **Done, 2026-09-08.** 193 tests green; walked and measured at 390×844
**Confidence:** 8/10 in the build; **4/10 in the example**, unchanged — it is one line of
content nobody outside this building has read, and the whole screen rests on it
**Date opened:** 2026-09-08 · **Depends on:** B30 (done)
**Mockups:** screen 1, and the note "The first thing they see"

## What was built

The front screen stopped describing BETR and started showing it. In order down the screen:
**BETR**, the caption **What one test looks like**, the card, **What's yours?** (big, to the
build screen), **Not sure? Try one of these** (ghost, to the doors), anything on the go, and
the trust line.

**The card is `.result` — the same card a person's own result is drawn in**, with the ladder
brought inside it. Same two labels, same struck line, same marker pen. That is the point: this
is what you are about to make, and a different-looking card would be an advert for something
else.

**Measured at 390×844, menu fixed over the bottom 59px:** *What's yours?* bottom at 576, the
trust line bottom at **731**, the fold at 785. The whole screen fits, including the line the
founder's own trust story rests on.

## What left, and why that is the same job done better

`start.title` ("You've played it out a hundred times"), `start.sub`, and B25's `start.ladder`
("every test starts at ten out of ten") are gone. All three were the screen explaining the loop
in words to somebody who had never seen one, and the card does all three at once: it shows the
rehearsal, it shows the test, and its first rung reads **ten** where a person can see it.

**B25's problem is answered by the picture, and B25's test moved onto the card.** A person's
first result landing at 10 → 9 with nothing to read it against was the failure; a card that
starts at ten and ends lower is a better answer than a sentence about it, and a more fragile
one, because a card is easy to change without noticing what it was carrying. So
`loop.test.js` now asserts the first rung says ten, before anything is tapped — and keeps the
half of B25 that matters more: **no "most people", no average, no pace, no target.**

## The example

**`web/content/examples.js`** — four of them, four fields each (`prediction`, `happened`,
`from`, `to`), plain data, written fresh. The first is the mockup's, which the founder saw:

> If I tell my dad I'm struggling, then he'll change the subject. → He went quiet. Then he
> said "Me too." · 10 → 6

**One per open, by a counter, never at random** — a person who reopens sees the next one and a
tester can say in advance which. The index is fixed for the whole session, so walking back to
the front screen mid-session does not swap the card underneath somebody.

**`S.seen` is the one stored field `isEmpty()` deliberately ignores.** A BETR that has never
been used, and one that has just been wiped, must leave nothing at all behind — and which
example comes next is not something anybody would miss. The cost is that a person with nothing
else stored sees the first one every time, which is the right way round: the first one is the
one the founder chose to lead with.

## The reveal

Inside `@media (prefers-reduced-motion: no-preference)` and nowhere else. **The finished card
is in the markup**; the stylesheet only delays parts of it, so with reduced motion on, or with
the block never applied, a person sees the finished thing on paint. A test asserts both — the
words are in the markup, and each of the three rules is inside the reduced-motion block and
outside no other.

The prediction is there from the start; the strike is drawn through it at one second
(`text-decoration-color` from transparent, which animates and needs no overlay that would break
across two lines); what actually happened arrives at two; the rung it moved to at three.

## What keeps this an example rather than a claim

Shown as a real person's result the card is a **testimonial**, and the MHRA reads a testimonial
as an implied claim (research §5.2). Three things hold it:

1. **The caption is the h1** — four words, the heading the screen is announced by, drawn small
   because the card is what a person looks at. It is the most load-bearing string on the screen.
2. **`content.test.js` refuses a name, a diagnosis word, "most people", "on average"**, and the
   three word lists, in both fields of every example.
3. **`loop.test.js` asserts the caption is drawn above the card**, so changing it is deliberate.

**Rule 5 holds on the card**: its ladder moves because that is what happened in this example.
The screen never says how far anybody else's will move, and the number belongs to the test.

## Open, and it is the founder's and Misha's

- **Which example leads, and whether it is real or an example.** The task built the second one.
  If the founder chooses a real result of their own, the caption changes to say whose and the
  four fields become the real ones — one string and four numbers, no code.
- **Three alternatives are in the file** for them to read on a phone.

## Definition of done

- [x] Walked at 390 wide: the card, both buttons and the trust line are above the fold
- [x] With reduced motion, the finished card is there on paint (held by a test)
- [ ] **125% text** — B33 walks it
- [ ] **The founder has read the example on a phone and said which one**
