# B30: The build screen — one sentence, two blanks, suggestions under each

**Status:** **Open. The core of B28; the largest of the five**
**Confidence:** 7/10 — the shape is drawn (screens 2–4 of the mockups) and every piece exists in
some form in `app.js` today; the risk is in the storage change and in getting the chips to feel
like help rather than a menu
**Date opened:** 2026-09-08 · **Depends on:** B29 · **Blocks:** B31, B32
**Mockups:** https://claude.ai/code/artifact/59278217-cc23-4e17-804e-97a917507497 (screens 2, 3, 4)

## What it is

*New test* opens one screen: **If I ___, then ___** as one sentence in the display size, each
blank an input that looks like part of the sentence. Under the active blank, a row of plain
suggestion chips. Tap one, it fills the blank; type instead, and the chips stay as they were.
When both blanks hold something, one big button: *What will you do?* That opens the second half:
the sentence at the top in the quiet strip, **What will you do today?** (one box, chips under it),
**And leave out** (a smaller box, chips, optional), and **Lock it in**. From lock onwards, the
loop is the one that exists: `locked()`, what happened, how sure, result, ladder.

**From a car, under thirty seconds to Lock it in** is the bar.

## Decisions taken here (each one line to flip)

| | Taken | Why |
| --- | --- | --- |
| One screen or two | **Two**: the sentence, then what you'll do | The sentence alone is a full thought; a person who stops there has still written their test down. Four boxes on one phone screen overflowed the mockup |
| The blanks print "If I" and ", then" | **Yes, structural** | Every entry is conditional by shape; `checkBelief`'s `notConditional` and `noConsequence` refusals become unreachable and are retired with their tests. `verdict` ("I am ___") is also unreachable by shape — keep the check, it is cheap, and a test proves it still fires on a pasted sentence |
| Leave out | **Optional, kept** | Research §2.3: dropping the safety behaviour is what makes a test count. Optional because the founder asked for freedom; kept because it is one small box |
| Where the chips come from | A new **`web/content/starts.js`** | Plain data: `{ if: 'don’t get the last word', thens: [...], dos: [...], drops: [...] }`, twenty to thirty of them, hand-written fresh. When the If blank matches a start (chip tapped, or typed text equal to one), that start's `thens`/`dos`/`drops` are the chips; otherwise a short general set (`starts.general`). The stock worries in `worries.js` are the borrow list (B32) and feed the same shape when a person arrives through it |
| Guards | `checkBelief` and `checkTest` keep **`HARM` only** as a refusal | `HABIT`/`BODY` lists stay exported (Help may quote what BETR's own content avoids) but no longer refuse. Refusal wording `refusal.harm` and sentence 7 stay verbatim (screen "The one hard stop") |
| What a test is called on its card | **Its own sentence** | An own test has no label; the If/Then sentence is its title everywhere (`heading()` in `app.js`). Never truncated |

## Storage: v3 → v4

`store.js` `VERSION` becomes 4, `normalise()` upgrades v3 in place, `blank()` and `isEmpty()`
learn the new fields (three places, per `NEXT-SESSION.md`). A test in hand or done carries:
`source: 'own' | 'stock'`, `id` (**own tests get a stable id at creation** — today
`rate.keyOf()` keys an own ladder by its sentence, so a person who fixes a typo loses their
ladder; that is a bug the main road cannot carry), `ifPart`, `thenPart`, `belief` (the joined
sentence, kept so export and old records still read), `test`, `drop`. Export (`store.js` ~262)
writes `belief` as the sentence. `merge.test.js` and `store.test.js` get v4 fixtures beside the
v3 ones; a v3 record must still import.

## Files

- `web/app.js` — `ownBelief()`, `ownTest()`, `ownDrop()` and `ownScreen()` are replaced by
  `build()` (the sentence) and `buildDo()` (the doing); `beliefOwn()` goes (its job is a chip now).
  `go()` and the `IN_LOOP` list learn the two stages. Focus lands on the first blank.
- `web/content/strings-en.js` — `build.*` keys; `own.*` keys retired **after** grep shows nothing
  reads them. `refusal.notConditional`/`noConsequence` retired with their guard branches.
- `web/content/starts.js` — new, and listed in `index.html` before `app.js` like the others.
- `web/app.css` — `.sentence`, `.blank`, `.chips`, `.chip`, all in rem, logical properties only;
  the caret blink under `prefers-reduced-motion: no-preference`. Chips are ≥44px tall.
- `web/lib/guards.js` — as above. `web/lib/store.js`, `web/lib/rate.js` — as above.
- `web/tests/loop.test.js` — the walk becomes `#m-new` → type/tap into `#if` → `#then` → `#next`
  → `#do` → `#lock`; `firstBehind()` and the door walk move to B32's borrow path.
- `web/tests/content.test.js` — `starts.js`: every `if` starts lowercase (it follows "If I"),
  no `then` repeats another's under the same start, no habit word in BETR's own chips, every
  `dos` entry is a full sentence with a capital.

## Definition of done

- [ ] Cold start → *New test* → typed If and Then → *What will you do?* → typed test → *Lock it
      in* → done → result → ladder, walked in `tools/walk.js` at 390 wide **and at 125% text**
- [ ] The same walk with chips only, no typing
- [ ] A v3 export imports and its ladders draw the same as before
- [ ] `HARM` on either blank shows the refusal with sentence 7; a habit word goes through
- [ ] The sentence is at the top of every screen from *What will you do?* to the result
- [ ] Every new string is in `strings-en.js`; `i18n.test.js` green
