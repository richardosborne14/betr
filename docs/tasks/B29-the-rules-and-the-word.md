# B29: The rules rewritten, and "worry" becomes "test"

**Status:** **Done, 2026-09-08.** 181 tests green from the repo root, walked in `tools/walk.js`
**Confidence:** 9/10 — it is words and tests, and every change is one the founder made in
writing on 2026-09-08 (`B28-present-practice-produce.md`)
**Date opened:** 2026-09-08 · **Depends on:** B28 (the decisions) · **Blocks:** B30–B33 (cleared)

## Why this went first

Every session opens by reading `CLAUDE.md`, and `CLAUDE.md` said the opposite of what the
founder decided: that the word is *worry*, that free text is the last button, that a form has
been rejected, that the habit word list refuses a test. A session building B30 against those
rules would have fought them or quietly restored them. So the rules changed first, dated, and
the tests that held the old rules changed with them — changed, never deleted.

## What was built

### 1 · The word

**"Worry" is now "test" everywhere a person reads it**, and `loop.test.js` holds it: no button,
no heading and no accessible name in the app may say *worry* or *worries*. Walked on every
screen there is.

- The bottom row is **Your tests · New test · Help**. The front screen's button is *Start a
  test* (B31 replaces the whole screen). *Different worry* on the result is *Different test*.
  *Your worries* is *Your tests*.
- **The two counts on Your tests would have collided**, so they no longer share a noun. It said
  "3 tests across 1 worry"; it says **"1 test, done 3 times"**. `mine.tests`/`mine.worries`
  became `mine.kept`/`mine.runs`; a person reads *tests* for the things they keep and *times*
  for the runs. Rule 5 is untouched — neither number is a score and neither is added across
  cards. The result screen says the same way round: *3 tests done. Same test, different day.*

**The line drawn, and it is deliberate: the OBJECT is renamed, the English word is not.**
"Worry" survives exactly where it means the feeling rather than the thing — frozen sentence 3
("manage everyday worry"), the two paragraphs of *Why this one sticks* in `why.js`, and the
NHS entry on the Help list describing its own page. B29 §1 already exempted the frozen
sentence for that reason; the same reason covers the other two, and the test is written to
allow them (buttons and headings only).

**One thing was NOT renamed and it is a gap, not an oversight — see below.**

### 2 · Rule 4, loosened, and the one hard stop

`checkTest` no longer refuses the `HABIT` and `BODY` word lists. A person's own test naming a
drink, a joint, a bet or a weighing scale is simply taken, with no note and no nudge. `HARM`
still refuses, on both boxes, and still draws the crisis lines for the person's own country
underneath.

**The lists did not go anywhere, and this is the part most likely to be "tidied" wrongly.**
BETR may still never *propose* one. That check used to be `guards.checkTest(f.test)` inside
`validateWorries`, which became a no-op the moment the guard stopped refusing — so it is now
spelled out in `web/lib/content.js` against `guards.HARM`, `guards.HABIT` and `guards.BODY`
directly, with `guards.hit` newly exported for it. `guards.test.js` asserts that `content.js`
still calls `guards.hit`, so deleting the lists as dead code fails the build.

`refusal.habit` and `refusal.body` are unreachable now. Their keys and their words stay, the
way `notConditional` and `noConsequence` have since 2026-09-04: a language file that dropped a
key would fail `i18n.test.js` the day somebody put the wall back.

### 3 · The own-words lane, widened

`own.belief.sub` no longer says "make it about people" and `own.belief.only` no longer says
"Not the weather, and not your body". Both refused the founder's own two examples — one about
time, one about a feeling — and the research draws the lane wider than the copy did (B28 §3).
What is left is the half that excludes a settled fact, plus the risk line the founder asked
for: *"Only the ones you've never actually found out about. If it could put you or anyone else
at risk, that one needs a person, not this."*

### 4 · The documents

`CLAUDE.md` rules 3, 4, 5 and 10 and the "What not to do" line, each amended with the date and
with the founder's own words for the loosening. `docs/00-scope.md` §2, §3 (the screen table
redrawn to the shape B30–B32 build) and §9 Q3 marked superseded. `docs/COPY.md` regenerated.
`docs/changing-the-words.md` checked line by line and updated: the test count, the habit rule
now described as a rule about what BETR proposes, and the new word on the safety-net list.

## Decisions taken here

| | Taken | Why |
| --- | --- | --- |
| Rename the object or every use of the word | **The object** | A blanket rename would have rewritten `why.js`, which explains a mechanism in the sense frozen sentence 3 uses. The test is on buttons, headings and accessible names, which is where the founder's objection lives |
| Two counts on Your tests | **tests kept, and times run** | "3 tests across 1 test" was the collision B29 §1 warned about. The mockup already separates them; this is the same separation in the summary line |
| Where the habit rule now lives for stock content | **`content.js`, against the lists directly** | Borrowing the person-facing guard is what made it a no-op. Two rules, two call sites, and a test that fails if the second one goes |
| The unreachable refusals | **Kept, words and all** | Same standing as `notConditional`: a wall that is ever restored has its words waiting, in every language |

## The gap, and it is the founder's

**The purpose statement still says "worry"** — *"You pick a worry about how people will react"*
— and it is frozen (rule 7): identical in the app, `index.html`'s meta description, the
manifest, the store listing and every post. B29 was told the nine sentences do not change and
was told nothing about the purpose statement, so it was left exactly as it is.

It is now the only place on the Help screen where a person meets the old word, and it also no
longer describes what the app does: nobody *picks* a worry any more, they write a sentence.
**Changing it is the founder's call and touches five places at once.** A candidate, keeping the
same shape and the same claim: *"BETR helps you test unhelpful beliefs in everyday life. You
write down what you're sure will happen, it gives you one small thing to try today, and you
record what actually happened."*

## Definition of done

- [x] `node --test` green from the repo root — **181, up from 180**, none deleted
- [x] No "worry"/"worries" on any button, heading or accessible name — held by a test, and
      walked in `tools/walk.js` across the front screen, the doors, the pick list, the own box,
      the loop, the result, Your tests and Help
- [x] `CLAUDE.md`, scope, `changing-the-words.md`, `COPY.md` all say the same thing
- [ ] The purpose statement — **the founder's, above**
- [x] `NEXT-SESSION.md` rewritten at the end of the session
