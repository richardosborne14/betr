# B33: Help, the small print, and walking the whole thing

**Status:** **Done, 2026-09-08. B28 is closed.** 196 tests green from the repo root
**Confidence:** 8/10 — the app is walked and measured; the 2/10 is that a person on a real
phone with VoiceOver still has not touched it, and that is a release condition, not a task
**Date opened:** 2026-09-08 · **Depends on:** B29–B32 (all done)

## 1 · Help

**Frozen sentence 6 moved up, and it is now the third thing on the screen** — after the crisis
lines (B17) and the proof block (B26), before the CBT explainer. *"Choose experiments that are
safe and legal. Never design one that involves the habit you're trying to change, self-harm,
restricting food, or putting yourself or anyone else at risk."*

It moved because of what happened to rule 4 on the same day. The habit and body word lists
stopped refusing a person's own test, so **this sentence is now the only place the line is
drawn at all.** Fourth, inside a numbered list of nine, was the right position for a rule the
app also enforced. It is not any more.

**It is the same sentence, said twice, not a copy.** `app.js` draws `frozen.sentences[5]` in
both places, so there is exactly one version of it in the build and it cannot drift — a test
asserts it appears exactly twice on Help and that `app.js` contains no copy of the words.

Two order tests in `menu.test.js` changed to hold the new order, and both halves fail the
build: it may not climb above the crisis block or the proof, and it may not slide back below
the CBT explainer.

**The CBT explainer says the shape in one line**: *"You write down what you think will happen,
in one sentence with two halves — if I do this, then that will happen."*

## 2 · The small print and the paperwork

- **`docs/changing-the-words.md`** — the founder's own file. Every path and key checked against
  the new content. It now names **seven** files rather than five, and has two new sections:
  changing the front-screen example (which one leads is its position in the list), and changing
  a suggestion chip (with the lowercase/capital rule and why it exists). Test count updated;
  four new things added to the safety-net list.
- **`docs/COPY.md`** — `tools/copy-sheet.js` now generates sections for `examples.js` and
  `starts.js` too, so the founder's mark-up route reaches every word again. 1,936 lines.
- **`docs/00-scope.md`** — §1 rewritten to the shape as built, §2, §3 and §9 in B29.
- **`docs/tasks/B5-…`** — re-read for "worry". It has none.
- **`web/app.css` and `web/lib/store.js`** — two comments that named screens by their old names.

## 3 · The walk, and the four things it changed

`tools/walk.js`, 390×844, then again at 125% text (`documentElement.style.fontSize = 20px`).
Shots for the founder are in **`docs/shots/b33-*.png`**, eight of them, in order.

**Walked:** cold start → the card → *What's yours?* → build → plan → lock → done → result →
Your tests · cold start → *Not sure?* → door → borrow → chip → lock → … → result · a returning
person with a locked test, on a real reload · a `HARM` sentence on each blank and on the plan
box, with the crisis lines and the country's own number under it · export, read back as JSON.

**The fold is 785px at 100% and 780px at 125%, and it settled four decisions:**

| | Was | Is | What changed |
| --- | --- | --- | --- |
| Chips on the plan screen | *Lock it in* at 981px | 774 at 125%, 659 at 100% | One chip row at a time (B30) |
| The doors' safety note | 701–743, down from B23's 643–685 | **643–685 again** | B32's second intro line merged into the first |
| The plan screen at 125% | *Lock it in* at 811 | **774** | Two sub-lines shortened |
| The front screen at 125% | the ghost button's last 18px behind the menu | fully clear at 748 | The example card's padding tightened to 20px |

**Known limit, recorded rather than fixed: at 125% text the front screen's trust line ends at
843px against a 780px fold** — a person has to scroll about sixty pixels to read *"Nobody sees
this but you."* The card and *What's yours?* are both fully visible. The only lever that would
close it is a shorter example, which is a content decision the founder is already making.

**The accessibility tree, read rather than the pixels.** One heading per screen and focus lands
on it, except the three screens that are a box — the build screen takes the first blank, the
borrow road takes the second (the first arrives filled), the plan box takes itself. Both blanks
are named to work read alone and out of order: *"If I — what would you do?"* and *"Then what —
what are you sure will happen?"* **The chip rows are now named groups** (`role="group"`,
`aria-labelledby` pointing at the line already printed above them) — without that, a chip read
on its own says "say no without giving a reason, button" and nothing about which blank it fills.

## What is left, and none of it is code

- **The founder:** which example leads, and whether it is real or an example. The purpose
  statement, which still says "you pick a worry" and is frozen in five places (B29 has a
  candidate). The `HARM` false refusal on *"end it"*, which was open before this stretch.
- **Misha:** the four nouns, the door order, the twenty-one-chip list on the build screen.
- **The paid CBT reviewer:** `starts.js` (about a hundred and eighty sentences), `examples.js`,
  and the three sentences in `worries.js` this stretch rewrote — all named in
  `docs/journeys-observed.md`.
- **A real screen-reader pass on a real phone**, which is a release condition and always was.

**One wart, left deliberately.** The export's `worry` field now holds the sentence for a test a
person built, so `worry` and `belief` come out identical in the file. Renaming it is a
data-contract change and B9 owns the export shape; nobody outside this building has a file yet,
so it is cheap either way.

## Definition of done

- [x] All of §3 walked, with shots in `docs/shots/` for the founder
- [x] `node --test` green; **196**, up from 180 when the stretch began, none deleted
- [x] `docs/learnings.md` has what took longer than thirty minutes
- [x] `NEXT-SESSION.md` rewritten
- [x] The founder told: **`https://betr.trybeup.com`**, wifi off after load
