# B38: The `did`, the reframe and the safety net — a day of content, no new screens

**Status:** **BUILT AND CLOSED, 2026-09-09.** 212 tests green. Live on `main`.
**Confidence:** 9/10. No new screens, no new code paths, no storage change. The one point off
is the 125% measurement below, which is a real regression on the front screen's second button
and is handed to `B39`.
**Date opened:** 2026-09-09 · **Founder:** *"let's try it out"*, 2026-09-09
**Part of:** [`B37`](B37-the-template-with-holes.md) §8 · **Was:** B36 items 1, 7 and 10a
**Depends on:** nothing.

## What it does

**1 · The worked example shows what they did.** `content/examples.js` gains `did` and optionally
`dropped`; `exampleCard()` in `app.js` draws a fourth beat between the prediction and the
outcome. Today the front screen goes prediction → what happened, so the one screen that teaches
by showing skips the exact beat a newcomer stalls on.

    prediction: 'If I tell my dad I’m struggling, then he’ll change the subject.'
    did:        'Told him one true sentence about my week.'
    dropped:    'Didn’t finish it with “but I’m fine”.'
    happened:   'He went quiet. Then he said “Me too.”'

**2 · Every dare in the loop becomes a question.** `locked.title` is *"Go and do it."*; the
candidate is *"Go and find out."* Sweep the loop for the others (`plan.lock`, `locked.done`).
A dare needs permission from somebody with authority, which BETR has not got. **A question does
not.** This is the one structural advantage a behavioural-experiment app has over an exposure
app and the loop currently does not use it (research §9.1).

**3 · One line at the lock.** The safety net is not authority, it is knowing a bad outcome has
already been thought about: *whatever happens, bring it back here and write it down; a bad one
counts the same as a good one.* That is rule 6 said out loud at the moment it matters.

## What it touches

`content/examples.js`, `content/strings-en.js`, one function in `app.js`, `tests/loop.test.js`,
`tests/content.test.js`, and `docs/COPY.md` regenerated with `node tools/copy-sheet.js`.

## Open, and whose

- **Misha, one string:** the front card says *"You expected"* over somebody else's example. That
  read fine with two labels and reads odd the moment a third says *"What they did"*. Is the card
  something you are **shown**, or something you are **invited into**? Either is fine; two voices
  in one card is not. B36 §12a; the mockup takes the *"They expected"* option to make it visible.
- **Misha, on the reframe wording.** *"Go and find out."* is a candidate, not a decision.
- **The reviewer**, with everything else in the envelope.

## Done when

- 208+ tests green, `node --test` from the repo root
- walked at 100% **and** 125%, and the front screen still clears the fold — it was already at
  785 / 780px before this added a beat, so this is a measurement, not a glance
- `docs/COPY.md` regenerated, `docs/learnings.md` updated if anything took half an hour to see


---

## What was built, 2026-09-09

**1 · The worked example shows what they did.** `content/examples.js` gained `did` (required)
and `dropped` (optional) on all four entries; `exampleCard()` draws them as a fourth beat
between the prediction and the outcome, plain — no strike, no marker pen, because it is neither
the thing that turned out wrong nor the surprise. `content.test.js` holds `did` to **one
sentence and sixty characters**, which is the assertion the beat exists for: the size is the
lesson, and a `did` that grows into a paragraph teaches the opposite of what it is here for.

**The first drafts were too long and the measurement said so.** *"Told him one true sentence
about my week."* wrapped to two lines at 125% text and the beat cost 110px on a card with 32px
of clearance. Shortened to *"Told him one true sentence."* — which is also the better line, and
this is the third time on this screen that the fix was a shorter sentence rather than CSS.

**2 · The card has its own labels now, and that is a voice decision.** B36 §12a: with two
labels *"You expected"* read fine over somebody else's example; with three the card said YOU,
then THEY. New `example.expected` / `example.did` / `example.ladderLabel` plus
`a11y.ladderPlainExample`, all in the third person — **the SHOWN option, which is the one the
mockup the founder saw takes**. `result.*` is untouched, because on a person's own result
"You expected" is exactly right. `loop.test.js` now fails the build if the card grows a second
voice, without saying which voice it should be. **Misha owns which way round it goes; it is
four strings and no code either way.**

**3 · Every dare in the loop became a question.** `locked.title` *"Go and do it."* →
**"Go and find out."**; `plan.lock` *"I'll do it today"* → **"I'll find out today"**.
`locked.done`, `locked.restDone` and `build.lock` were swept and left alone — they are reports
and a commitment, not dares. A new test sweeps the words at the two moments somebody is asked
for something. **The wording is Misha's; the structure is not.**

**4 · The safety-net line.** `locked.net`, drawn above the big button on the locked screen and
**not in the rest state** — B27's lesson is that this screen stops asking for things once a
person has declined. Shortened from the scoped draft for the same fold reason: the first
version ran to three lines at 125% and put *"Didn't get to it"* 3px behind the menu.

## The numbers, at 390×844

| | before B38 | after |
| --- | --- | --- |
| front, 100%: trust line bottom vs 785 fold | 723 | **772** — clears by 13 |
| front, 125%: *What's yours?* bottom vs 780 fold | 662 | **738** — clears by 42 |
| front, 125%: *Not sure? Try one of these* bottom | 748, **clear by 32** | **823 — 43px behind the menu** |
| locked, 125%: *Didn't get to it* bottom | 647 | **754** — clears by 26 |

**The regression is real and it is named.** At 125% text the front screen's second button now
sits mostly behind the fixed menu, where B33 had deliberately spent card padding to keep it
clear. Getting it back needs ~44px and the only places left are the beat itself, the surprise's
type size, or the card's remaining padding — so it is not a trim, it is a design decision.
**Handed to `B39`, which is now two screens.** The primary road is unaffected at both zooms.

## Decisions made here, and who can overturn them

| | | Whose |
| --- | --- | --- |
| The card is third person throughout — *shown*, not *invited into* | mockup's option, now shipped | **Misha**, 4 strings |
| *"Go and find out."* / *"I'll find out today."* | candidates in B36, now shipped | **Misha**, 2 strings |
| *"Bring back whatever happens. A bad one counts the same as a good one."* | shortened to fit | **Misha** and the reviewer |
| The four `did` and four `dropped` lines | new BETR content, rule 4 applies | **the reviewer**, in the envelope |
| The net line is not shown in the rest state | B27 item 1 | built |

## Gaps

- **The eight `did`/`dropped` lines have not been read by the CBT reviewer.** They are BETR's
  own content and go in the envelope with everything else. `+8 rows`.
- **The red strike through the prediction** (B36 §12b) was left exactly as it was. It is now
  next to a third label and still the only red on the card. Not this task's to change.
- **The front screen at 125% is B39's now**, and B39's own scope said one screen.
