# B38: The `did`, the reframe and the safety net — a day of content, no new screens

**Status:** **SCOPED, not started.** First in the programme because it is independent of
everything else in it and can ship on its own.
**Confidence:** 9/10. No new screens, no new code paths, no storage change.
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
