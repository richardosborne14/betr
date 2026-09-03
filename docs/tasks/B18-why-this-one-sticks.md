# B18: Why this one sticks — one explanation per worry, after the first result

**Status:** Built, 2026-09-03. Open until the CBT reviewer has read the twelve explanations
alongside the twelve worries, in the same pass (B1 step 3)
**Confidence:** 8/10 in the build. 5/10 in the words, for the same reason B1 is 5/10 — nobody
outside this building has read them
**Date opened / built:** 2026-09-03 · **Founder's ask, same day**
**Depends on:** B1 (the twelve), B15 (strings out of the code), B8 (the three doors)

## Why it exists

The loop tells a person what to do and what to leave out, and never says why leaving it out
is the point of the whole thing. The `drop` line is the difference between an experiment and
an errand — Clark and Wells, scope §3 — and until now the app asserted it without explaining
it. The founder asked for "a bit more insight about the thing they've chosen" once somebody
has their first result.

## What was built

**A thirteenth screen, `why`**, reached from a small link in two places and nowhere else:

- the **result** screen, last, under the two buttons — the run of expected → happened →
  ladder → count → do it again is the product, and this is an optional extra at the end of
  it, not a step in it
- the card in **Your worries**, under *Test this again*, and only on a card that has a ladder

**`web/content/why.js`** — twelve entries, keyed by worry id, two fields each:

| Field | What it does |
| --- | --- |
| `what` | what the worry actually is underneath the situation. Never what the *person* is |
| `why` | which safety behaviour keeps it from being tested, and what dropping it finds out |

The closing line is not in that file. It is one frozen sentence in `strings-en.js`
(`why.foot`), identical under all twelve, written once and translated once: *"This is general
— it is not about you, and BETR cannot see anything you have written. If you want to
understand it properly, that is what a CBT therapist is for, and Help has places to find
one."*

## The three decisions, and why each one is the way it is

**1. After a result, never before.** Read first, it is a lesson and it gets skimmed. Read
after somebody's own evidence, it answers a question they have actually got. It is also the
order the whole product is built on: your data, then the frame. So it hangs off the result
screen and off a card with a ladder on it, and off nothing else — never Pick, never inside
the loop.

**2. A screen, not a modal.** The founder asked for a modal. A screen was built instead and
the founder took the reasoning: everything in BETR goes through `paint()`, which moves focus
to the heading and gets it read out, and a modal would mean a focus trap, an escape key, an
inert background and a scroll lock, all written by hand, in an app that has still never been
in front of anybody who uses a screen reader (B15's release condition). A screen costs one
line in `a11y.test.js` and gets all of it for free. CLAUDE.md rule 10 also warns off new
interaction patterns, and this way there is not one.

**3. Keyed by worry id and by nothing else.** This is the regulatory line and it is the
reason the file has two fields and no third. Explaining a worry is the closest BETR comes to
psychoeducation, and it stays the right side of research §5.2 only while everybody who taps
the same worry reads the same two paragraphs forever. The moment it reads a ladder, a rung, a
re-rate or a missed test, it stops being a chapter in a book and becomes a system that decided
something about a person. `content.validateWhy()` fails the build on a third field, and the
header of `why.js` says so in the file where somebody would be about to add one.

A person's own worry has no entry, so no link draws. That is also the answer for custom
worries if Q3 ever admits them: no entry, no link, no code to write.

## Rules held

- **Rule 1.** Not one new link, and nothing fetched. The foot points at Help, where
  *Finding a real therapist* already lists BABCP, findCBT.org and EABCT. Every link in BETR is
  still in `content/places.js` and `menu.test.js` still holds the allow-list.
- **Rule 2.** Fixed content. Nothing chooses, nothing adapts.
- **Rule 6.** No explanation says what will happen. A test that goes badly is data too, and
  pre-empting the result would settle the experiment before it is run. There is a test for it.
- **Rule 7.** BETR in the foot; nothing a person taps is lowercase. The banned-phrase sweep
  now covers `why.js`.
- **Rule 8.** Every word is ours. General CBT explanation is exactly what CCI, Getselfhelp,
  Therapist Aid, Psychology Tools and the Beck Institute publish, and all of them restrict
  reuse — this is the file in the repo most at risk of echoing them, and the reviewer should
  be told that is what they are checking for.
- **Rule 10.** No modal, no fourth door, no new pattern.

## Test plan — done

**151 tests green**, up from 146. New: every worry has an explanation and nothing explains a
worry that is gone; an entry has two fields and no third (with the validator's own refusal
asserted); no explanation predicts an outcome; the link is absent on Pick, on the locked
screen and before the re-rate, and present on both screens after it; Back returns to whichever
of the two opened it; a person's own worry offers nothing. `why` joined `a11y.test.js`'s
SCREENS, so it is held to one heading, focus landing on it, and being read out.

**Walked in a real browser at 390×844**, headless Chrome over CDP: the screen fits without
scrolling, nothing overflows, focus lands on the heading, and Back returns to the result.

## Gaps

- **The words have not been read by anybody outside this building.** Same gap as B1, and it
  should be the same pass — one paid CBT-trained reviewer reading the twelve worries and the
  twelve explanations together, once, for lane and wording. Never an endorsement.
- **Misha has not read them** for the audience, alongside the twelve labels.
- **Twelve more paragraphs for B16 to translate**, plus `why.foot`, which is frozen and needs
  approving once in the target language the way the nine sentences do.
- **The `what` paragraphs are the riskier half.** They describe what sits under a worry, and
  that is the sentence a reviewer is most likely to want reworded.

## Done when

The reviewer and Misha have signed off, with a date.

- [x] Richard: twelve explanations written fresh — **2026-09-03**
- [ ] Misha: read for the audience — date:
- [ ] CBT-trained reviewer: read for lane and wording, with B1 — date:
