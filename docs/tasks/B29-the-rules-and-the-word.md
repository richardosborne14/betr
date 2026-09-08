# B29: The rules rewritten, and "worry" becomes "test"

**Status:** **Open. First of the five B28 tasks; nothing else starts until this is pushed**
**Confidence:** 9/10 — it is words and tests, and every change is one the founder made in writing
on 2026-09-08 (`B28-present-practice-produce.md`)
**Date opened:** 2026-09-08 · **Depends on:** B28 (the decisions) · **Blocks:** B30, B31, B32, B33

## Why this is its own task, and why it goes first

Every session opens by reading `CLAUDE.md`, and `CLAUDE.md` today says the opposite of what the
founder decided: that the word is *worry*, that free text is the last button, that a form has
been rejected, that the habit word list refuses a test. A session that builds B30 against those
rules will either fight them or quietly "restore" them. So the rules change first, dated, and
the tests that hold the old rules change with them — **changed, never deleted**, so a new rule
is held as firmly as the old one was.

## 1 · The word

**"Worry" becomes "test" everywhere a person reads it** (founder, 2026-09-08: nobody has to say
"I have worries" to set up a test; "just pure CBT science"). The thing a person keeps is a
*test*; the sentence inside it is *what you're sure will happen*; doing it is *doing the test*.

- `web/content/strings-en.js` — every `worry`/`worries` a person reads. The bottom row becomes
  **Your tests · New test · Help**. Screen titles: *Your tests*, *Set up a test*, *Different
  test*. Where "worry" was the noun for the belief, the new phrase is *what you're sure will
  happen*, not "prediction" on a button and never "belief" on one.
- **Where the two meanings could collide** — the count of tests done vs. the test a person keeps
  — the mockup already separates them: *Test done* under the big number, *Do it again tomorrow*
  for the next run. Keep that separation; do not write "tests" for both on one screen.
- `web/content/worries.js`, `whats-going-on.js`, `why.js` — the file names and the `worries`
  variable can stay (code, not read by a person). The `doors.foot` and the front-screen sentences
  that say "worry" change.
- The nine frozen sentences in scope §10 **do not change** — they say "worry" once, in sentence 3
  ("manage everyday worry"), where it means the feeling, not the thing. Leave it.
- `docs/COPY.md` is regenerated (`node tools/copy-sheet.js`), never hand-edited.
- `docs/changing-the-words.md` stays true: check every path and key it names.

## 2 · `CLAUDE.md`, rule by rule, each amended with the date

| Rule | Was | Becomes |
| --- | --- | --- |
| 3 | The word is *worry*; three stock predictions, never one BETR chooses | The word is *test*. A test is *If I ___, then ___*; the person writes both halves or taps a suggestion into either. Suggestions are fixed content; never one BETR chooses for them (still true, still the device line) |
| 4 | Never the habit itself; structural, no free-text test field | The habit and body word lists **stop refusing** a test. Sentence 6 on Help says what not to design. **Self-harm and harm to anyone is still refused, on both boxes** |
| 10 | The interface is one big button; a form has been rejected; six taps | The way in is one sentence with two blanks and suggestions under each, then what you'll do and what you'll leave out, then *Lock it in*. **It is a form, and the founder chose it on 2026-09-08.** The front screen shows one finished test before anything is asked |
| "What not to do" | Don't write a test that involves the habit | Keep the line for *us*: BETR's own stock content never involves the habit. A person's own test is theirs |

Also: the second paragraph of the founder note ("free ourselves up a little bit") goes into
`CLAUDE.md` in its own words, so a future session knows the loosening was chosen, not drifted.

## 3 · `docs/00-scope.md`

§2 ("Not adaptive", "Not a chatbot", "no free text until after the test") and §3's table are
rewritten to the new shape. §4 items 1 and 2 stand. §9's Q3 gets a line: *superseded by B28*.

## 4 · The tests that hold the old rules

Read each before touching it; the comment above it says which rule it holds.

- `web/tests/loop.test.js` — the walk fixtures (`#go` → `[data-door]` → `[data-id]` → `[data-b]`
  → `#lock`) describe the old six taps and change in B30, not here. **Here:** the two tests that
  type a habit word and a body word and expect a refusal (around line 539) — they now expect the
  words to go through. The capital-letter test and the BETR wordmark test stay exactly as they are.
- `web/tests/guards.test.js` — the `HABIT` and `BODY` refusal cases flip to pass-through; the
  `HARM` cases stay on both `checkTest` and `checkBelief`.
- `web/tests/content.test.js` — the stock list's own rules stand (three beliefs each, no habit
  word in a stock test). Nothing to change unless a label's word changes.
- `web/tests/i18n.test.js` — will catch any sentence left in `app.js`.

## Definition of done

- [ ] `node --test` green from the repo root, same number of tests or more, none deleted
- [ ] No "worry"/"worries" on any screen: `node tools/walk.js` through every screen, `dump`, grep
- [ ] `CLAUDE.md`, scope, `changing-the-words.md`, `COPY.md` all say the same thing
- [ ] `NEXT-SESSION.md` rewritten, pointing at B30
