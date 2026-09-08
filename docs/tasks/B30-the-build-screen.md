# B30: The build screen — one sentence, two blanks, suggestions under each

**Status:** **Done, 2026-09-08.** 189 tests green from the repo root; walked end to end in
`tools/walk.js` at 390×844 and measured against the fold
**Confidence:** 8/10 — the shape is built and walked; the 2/10 is the content of
`web/content/starts.js`, which nobody outside this building has read
**Date opened:** 2026-09-08 · **Depends on:** B29 (done) · **Blocks:** B31, B32 (cleared)
**Mockups:** https://claude.ai/code/artifact/59278217-cc23-4e17-804e-97a917507497 (screens 2, 3, 4)

## What was built

*New test*, and the front screen's big button after B31, open **one sentence with two gaps in
it** — `If I ___, then ___` in the display size, each gap an underlined input sitting on the
baseline of the sentence rather than a box under a label. Under the gap a person is in, a row
of plain suggestion chips. One big button, *What will you do?*, opens the second half: the
sentence at the top in the quiet strip, *What will you do today?* with its own chips, *And
leave out* (optional, smaller, chips), and *Lock it in*. From there the loop is the one that
already existed.

**`plan()` was NOT deleted, and that is a decision.** The build road goes straight to `locked()`
— a person who has just typed both halves does not need a screen offering to let them change
what they expect. `plan()` is now the screen for a REPEAT: *Test this again* and *Do it again
tomorrow* land on it, everything already decided, one tap to commit. That is the one moment
adjusting the expectation is worth a screen, and it costs one tap rather than four.

## Decisions taken here (each one line to flip)

| | Taken | Why |
| --- | --- | --- |
| One screen or two | **Two**: the sentence, then what you'll do | As scoped. Four boxes on one phone screen overflowed |
| The blanks print "If I" and ", then" | **Yes, structural** | Every entry is conditional by construction, so `notConditional`, `noConsequence`, the shape nudge and `verdict` are all unreachable from this road. The checks stay in `guards.js` and `guards.test.js` proves each still fires on a bare sentence; `guards.checkPart` is what the screen actually calls, and it refuses two things — an empty blank, and anyone's safety |
| The stored sentence | **Assembled from the same two fragments the screen prints** | `build.ifWord` and `build.thenWord`, one source of truth. A translation cannot end up with a screen that says one thing and a record that says another |
| Where the chips come from | **`web/content/starts.js`**, 21 starts plus a general set | Plain data, fixed order. Which `thens` are offered depends on ONE thing: whether the first blank holds, word for word, one of the starts. A lookup, not a judgement (rule 2), and `content.test.js` pins the four-fields-and-no-fifth shape that keeps it one |
| Leave out | **Optional, kept, and it says "Optional" in its own line** | Research §2.3: dropping the safety behaviour is what makes a test count. The founder asked for freedom, so an empty one is not checked and not refused |
| Guards | `checkTest` and `checkBelief` keep **`HARM` only** (B29). `checkPart` is the build screen's | `HABIT`/`BODY` stay exported and still hold BETR's own content, including every chip |
| What a test is called | **Its own sentence**, never truncated | An own test stores `label: null`; `titleOf()` in `app.js` promotes the sentence, and `worryHead()` draws it as the title with no second line. On its card in Your tests it is the heading, in sentence case rather than the small uppercase kicker |
| The bottom row's *New test* | **Opens a new test**, not the doors | It led to the doors until today, when the stock list stopped being the way in |
| Back, on the build screen | **Always the front screen** | It is reached from three places and a Back that guessed which is a Back nobody can predict |

## Storage: v3 → v4, with no data migration, on purpose

`VERSION` is 4. A test a person builds carries `ifPart`, `thenPart`, the joined `belief`, and —
new — an **`id` of its own**. `rate.keyOf()` groups an own ladder by that id.

**That is a bug fixed, not a feature.** An own ladder used to be keyed by the sentence, so
correcting three words of your own wording the next day started a new ladder and the old one
looked lost. On a side path that was a wrinkle; as the main road it is unacceptable. A record
made **before** today has `id: null` and still falls back to its sentence, which is exactly why
nothing needed converting — and why the fallback in `rate.keyOf()` must not be tidied away.
`merge.test.js` and `store.test.js` assert version 4; a v3 record still imports and still draws
the same rungs.

The export's `worry` field now reads `label || belief`, so a test a person built exports under
its own sentence rather than under a random id.

## The measurement, which changed the design

The menu is `position: fixed` over the bottom 59px, so the first screenful is **785px, not 844**.

- **The build screen:** the sentence sits at 168, *What will you do?* at 267. Both clear.
- **The second half, with every chip row drawn at once:** *Lock it in* landed at **981px** —
  behind the menu, the same failure the doors' safety note had in B23.
- **So the chips are one row at a time**, which is what B30's own "under the active blank"
  said: the row for the box a person is in, and only while that box is still empty. A box
  claims its row on focus (finger or keyboard) and gives it up on blur; none of it repaints,
  because a repaint would move the caret to the end on every keystroke.
- **Measured after:** *Lock it in* bottom at 827 before anything is typed, and at **659** —
  126px clear — the moment a plan is in the box. Pressing it before that would only get the
  empty refusal, so the button is fully visible from the first moment it does anything.

**The If chip list is 21 long and the page is 1871px.** That is a scroll, and it is a different
scroll from the one B19 removed: it sits *below* the button, so it costs a person who types
nothing, and the catalogue for somebody genuinely stuck is the borrow list behind doors (B32),
not this. Worth a second opinion from Misha all the same.

## The one exemption in the capital-letter rule

Founder, 2026-09-03: nothing a person taps is all-lowercase. **A suggestion chip is exempt**,
because it is a fragment of the sentence printed above it — the screen says "If I" and the chip
says "say no without giving a reason", and capitalising it would put a capital in the middle of
somebody's sentence. `loop.test.js` sweeps chips separately and holds them to the opposite
rule, and asserts no chip's words are also drawn as a real label — so if the `chip` class ever
lands on an ordinary button, the build fails. `dos` and `drops` chips are whole sentences and
start with a capital, checked in `content.test.js`.

## Files

- **new** `web/content/starts.js` — 21 starts, four fields each, plus `general`. Written fresh.
  Loaded in `index.html` and in `tests/harness.js`
- `web/app.js` — `build()`, `buildDo()`, `sentenceOf()`, `startFor()`, `chipsFor()`,
  `chipRow()`, `wireChips()`, `titleOf()`, `startOwn()`, `lockIn()`, `newTest()`.
  `ownBelief`/`ownTest`/`ownDrop` deleted; their stage names route to `build()` so a phone
  that stored one lands somewhere sensible. `ownScreen` and `takeBelief` stay for B32
- `web/content/strings-en.js` — `build.*`; `own.belief.only` moved to **`build.only`**, because
  the box it was written for is gone and this is the screen a person writes one on now
- `web/lib/guards.js` — `checkPart`, `REASON.emptyIf`; `web/lib/store.js`, `web/lib/rate.js`
- `web/lib/content.js` — `validateStarts()`, the rules in the same place as the others
- `web/app.css` — `.sentence`, `.blank`, `.chipset`, `.chips`, `.chip`, `textarea.line`,
  `.card .kicker.said-it`. All rem, logical properties only, chips ≥44px
- `web/tests/harness.js` — `<input>` values survive a repaint, the way a box's do

## Definition of done

- [x] Cold start → *New test* → typed If and Then → *What will you do?* → typed plan → *Lock it
      in* → done → result → ladder, walked in `tools/walk.js` at 390 wide
- [x] The same walk with chips only, nothing typed (`loop.test.js`)
- [x] A v3 record still imports and its ladders draw the same
- [x] `HARM` on either blank shows the refusal with the crisis lines; a habit word goes through
- [x] The sentence is at the top of every screen from *What will you do?* to the result, and on
      the card in Your tests
- [x] Every new string is in `strings-en.js`; `i18n.test.js` green
- [ ] **125% text** — B33 walks it, with the reduced-motion pass
- [ ] **`starts.js` read by the CBT reviewer and by Misha** — release condition, like `worries.js`
