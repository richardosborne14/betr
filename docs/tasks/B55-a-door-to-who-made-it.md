# B55: A door to who made it, on the front screen

**Status:** **BUILT AND WALKED, 2026-09-12.** 296 tests pass (294 before). Four mutations, all
caught. Walked at 390×844 and at 200% text.
**Confidence:** 8/10. It is one string, one line on two screens, and a helper that was already
written twice. The point off is not the code: **it is the first thing in BETR built for our
benefit rather than the person using it**, and §4 is the line that was drawn around it.
**Date opened:** 2026-09-12 · **Asked for by:** the founder, in one message
**Touches:** rule 9 (visible lineage), rule 10 (one big button)

---

## 0. What was asked, and the reason given

Word for word: *"Any chance we can add a little 'who made this?' to the top of the BETR pages,
that jumps to that part of the help page? I'm trying to do as much promo for TrybeUP as
possible, even if people just think BETR is kind of cool looking but don't use it, at least
they might click through to TrybeUP."*

**The reason is recorded because it decides the design.** The person this is for is somebody who
will never run a test. They are on the **front screen**, and nowhere else.

## 1. What was built

- **The front screen**, on the wordmark's own line: **`BETR · Who made this?`** — grey,
  underlined, the question in normal case beside the tracked capitals of the wordmark. It sits
  **inside the `.kicker`** and undoes the kicker's uppercase and tracking, which is why it
  **costs the big button no height at all**: *Find yours* is at 564px, exactly where it was.
- **Your tests**, on a line of its own under the summary.
- **Tapping it opens Help and lands on the *Who made this* heading**, with B54's TrybeUP block
  directly under it (318px down the screen, not 4,800).
- **`goHelpTo(id)`**, a helper that did not exist and should have: the focus-then-scroll pair
  was written out twice, here and in door one's *"Help has places that are"* note (B24). Both
  callers use it now. **Focus and a scroll, in that order** — the focus is what a screen reader
  follows, the scroll is what an eye follows, and neither does the other's job.
- **`<h2 id="who-made" tabindex="-1">`** on Help, the second and last id on that screen.

Seven lines of markup, one string (`byline`), one id, one helper, one block of CSS.

## 2. The label does not say TrybeUP, and that is the decision

**Rule 9's last standing half** — after B8 put TrybeUP in the places list and B54 gave it a
logo on Help — is that **the brand is not named on the front screen, in the loop, in the
result or on the menu**. A question in BETR's own voice keeps that half intact: the front
screen carries **the door to the lineage without carrying the brand**.

It is also the better sentence for the person. *"Who made this?"* is what somebody actually
wonders about an app they have just opened and are not sure about; a statement would be an
advert, and this audience is braced for exactly that (research §4).

**`Made by TrybeUP` on the front screen is the founder's to take**, and it would be more promo:
the brand lands even on people who never tap. It was offered. **If it is taken,
`menu.test.js` fails the build** — deliberately, so that the day the brand appears outside Help
is a day somebody decided it, not a day it drifted.

## 3. Rule 10, and why this is not a fourth door

The bottom row is **three plain words and no fourth item** (B8), and that is untouched. This is
not in it. It is **one small underlined question at the top of two screens**, in the same place
the app already puts furniture (the Back chip, the theme chip), and it opens a screen that is
already one tap away from every screen in the app. **If it ever wants to become a chip, an
icon, a badge or a fourth door, the answer is no.**

## 4. Where it is NOT, and this is the part to defend

**Not in the loop. Not on the result. Not on a refusal.** Not drawn by `paint()` — the two
screens that carry it ask for it by name, so nobody can add it everywhere by touching one line
(and `menu.test.js` fails if they do).

Two reasons, pointing the same way:

1. **The person in the loop.** They have just written a sentence about what they are afraid of,
   or picked how sure they are of it, or been handed a helpline number by a refusal. A door to
   another product on that screen is indefensible, and it is the sequencing offence research
   §7.1 describes, committed at the worst possible moment.
2. **It would not work anyway.** The taps this was asked for come from somebody browsing the
   front screen. Nobody halfway through a behavioural experiment stops to read about the
   company. **The front screen is where all of the value is, and it is the one screen with
   none of the cost.**

## 5. Test plan, and it ran

`web/tests/menu.test.js`, two new tests (296 total):

1. **"Who made this?" is on the front screen and Your tests, and nowhere in the loop.** Walks
   door → pick → belief → plan → size → lock → done → happened → sure → result and asserts it
   is absent on every one; asserts it is on *Your tests*; asserts it is **not** on Help, where a
   door to Help is no use; asserts **the front screen still has no "trybeup" in it at all**.
2. **The byline opens Help at the block that answers it.** Taps it, asserts Help with the
   TrybeUP block, asserts the `id="who-made"` anchor on the heading, asserts the block is still
   below the frozen nine.

**Four mutations, each caught:** byline removed from the front screen; byline moved into
`paint()` so it reaches the loop; the anchor id dropped from the Help heading; the label changed
to *"Made by TrybeUP"*. Baseline re-run afterwards: 296 pass.

**Walked**, 390×844: one line at 100% and at 200% text, no sideways scroll at either, *Find
yours* unmoved at 564px, and the jump lands on the heading with focus on it
(`document.activeElement.id === 'who-made'`).

## 6. Gaps

1. **`byline` is unread by Misha** — three words, but they are the first three words in BETR
   written to sell something.
2. **Nobody has seen it on a real phone**, and the underline on `--ink-3` is the same grey the
   contrast pass is already queued to look at (B51 §13.4).
3. **No idea whether anybody taps it**, and there will never be: nothing is counted, and the
   two numbers the server keeps cannot tell one screen from another (B52 §5c). **If the
   question "is this working?" ever gets asked, the honest answer is that BETR cannot answer
   it** — and the answer must not be to start measuring.
4. **It is on Your tests as well as the front screen**, which was a judgement call: that person
   already uses BETR, so the promo value is near nil and the clutter is real. **One line to
   remove** if the founder would rather it were the front screen alone.

## 7. Done when

Built and pushed. Open: the founder on §2 (whether the label should name TrybeUP) and §6.4
(whether *Your tests* keeps it), and Misha on three words.
