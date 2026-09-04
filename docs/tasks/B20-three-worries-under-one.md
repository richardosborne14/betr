# B20: Three predictions under every worry, one language all the way through

**Status:** **Built and published, 2026-09-03.** Open until Misha and the CBT reviewer have
read the sixty-three new sentences
**Confidence:** 9/10 in the build — 160 tests, the loop walked screen by screen, the three
founder complaints each pinned by a test. 5/10 in the words: sixty-three of them are new
tonight and nobody outside this building has read one
**Date opened / built:** 2026-09-03, the same evening as B19 · **Founder's ask, from their own
test users**
**Depends on:** B19 (the doors are the way in, and a worry carries its sentence on the button)

## The three things the founder asked for

> * There's still a language disconnect between the list of worries, the worry detail page,
>   and the final worry result page. The language should stay the same, with the title and
>   if…then… visible all the time, so you don't get confused and worry you've filled out the
>   wrong worry item.
> * The If…then… statements are too specific and my test users are reporting they 'sort of
>   match what my worry is but not really'. […] There should maybe be the most generic one on
>   the list item card, but when you go in and choose one, you should be allowed to choose
>   from say 3 default If Thens that would be very common to the worry, and you can choose
>   your own one […] the 'Other' option of the 3 first options.
> * The yellow highlighted text at the end of a worry day report looks weird, the line spacing
>   is maybe not enough because the lines look like they're too tightly packed?

All three are built. The second one is the large one and the other two are half an hour
between them.

## 1. One worry, three predictions

### What was wrong

B19 put a worry's `belief` — its "If I ___, then ___" — onto the button, and that fixed the
stall on the pick list. It also exposed the next problem, which is that **there was only one of
them**. A worry is a *situation*: turning up and not joining in, leaving before everyone else,
sending something without checking it. The thing a behavioural experiment actually tests is the
**prediction underneath** the situation, and there is more than one prediction under every
situation on the list. One sentence per worry had to guess which one the person was afraid of.

The guess was wrong about as often as it was right, and the failure is not cosmetic. A
prediction that is only nearly yours **cannot be disconfirmed by anything that happens today** —
whatever the person writes into "What actually happened", it does not bear on the sentence they
did not quite mean. So the loop runs and the ladder moves for the wrong reason, or does not
move at all, and the person concludes the app does not work rather than that the sentence was
not theirs. That is scope §5.2's whole mechanism failing quietly.

### What it is now

`worries.js` gained a field and lost one. Every worry has:

- **`belief`** — the loose one, and it is the CARD. It is drawn under the label wherever a
  person picks a worry, and it is never itself tested. Its job is recognition on a list of four
  to six: *is this the one I mean?*
- **`beliefs`** — exactly **three**, each `{ belief, expect }`. These are the ones a person
  tests. Each predicts a **different consequence**, each could turn out to be wrong, and the
  first is the most common one because it is read first.
- `expect` at the top level is **gone**. It was one guess bolted onto another; the thing a
  person is braced for now travels with the prediction it belongs to, because they are the same
  sentence said twice and a mismatched pair is half of how the old one came to be wrong.

Sixty-three sentences, all written fresh. Nothing adapted from CCI, Getselfhelp, Therapist Aid,
Psychology Tools or Beck Institute material (rule 8).

### The screen

One new screen, between the list and the test:

    Start → What's going on? → Which one? → **Which of these is it?** → the test

The worry's label is the heading. The three sit in the same list shape the doors and the pick
list already use — the prediction on the button, **what you'd be braced for** underneath it, so
the choice is between two things a person can feel rather than two sentences they have to
parse. Three screens in a row a person reads the same way, deliberately.

Under them: **"None of these — I'll put it my own way."** It is the fourth button, not a fourth
screen. It keeps the worry, its test, its drop line and its "Why this one sticks" entry, and
replaces only the sentence being tested. It is a person's own belief, so it goes through
`guards.checkBelief` exactly as a fully custom one does — "I am the sort of person who…" is
reframed here too.

The footer is the only place in BETR that says why the choice matters: *Pick the one that would
sting. A worry that's only nearly yours can't be proved wrong by anything that happens today.*

### Cost: the second tap — **accepted, founder, 2026-09-04**

B19 spent one extra tap on the doors. This spends another. The loop is now five taps to a
locked-in test rather than three. **The founder accepted it the next morning: "one extra tap
is fine."** It is not an open question any more and it should not be reopened as a tidy-up.

It is still one line to take back if that ever changes — route `pick()` straight to
`startFrom(f, f.beliefs[0])` — and the reason to pay it stands: the tap buys the one thing the
loop cannot work without, which is a prediction that is actually the person's.

### What the ladder does about it — **decided, founder, 2026-09-04**

**One ladder per worry, shared by all three predictions.** `rate.keyOf()` is unchanged: a stock
worry's ladder is keyed by its **id**, so the three predictions under one worry — and a sentence
the person wrote themselves for that worry — all move the same ladder. **The founder chose this
explicitly on 2026-09-04** ("yes to the shared ladder"), and CLAUDE.md rule 5 now says so, so it
is a decision and not an accident of how `keyOf` happens to be written.

Rule 5 says the ladder is one belief's grip; the reading taken is that a worry **is** one belief
and the three are three ways of saying where it bites. The alternative — a ladder per prediction
— was rejected because a person who comes back through the list and taps a different one of the
three would appear to have lost their history, and because "Your worries" would then carry two
cards with the same title.

Consequence to know about: a card in Your worries quotes the **most recent** prediction tested,
so a person who switches shows the newer sentence over the older ladder. The label above it
does not change, which is what stops that reading as a different worry.

## 2. The same words all the way through

The founder's exact complaint — "you don't get confused and worry you've filled out the wrong
worry item" — is a real defect and it was easy to see once said. The pick list said one sentence,
the test screen said *Here's your test* and no sentence at all, the re-rate said the belief with
no label, and the result said the label with no belief. Four screens, four different answers to
"which worry am I in?".

One component now, `worryHead(label, belief, heading)` in `app.js`, on **every screen from the
choice to the result**: the worry's label, and under it the exact sentence being tested, word
for word, never shortened and never summarised.

| screen | what it shows |
| --- | --- |
| Which of these is it? | the label, as the heading |
| The test (`plan`) | the label as the heading, the chosen sentence under it |
| Locked in | both, quietly, above "Go and do it." |
| What happened? | both, quietly, above the box |
| Still think that's what happens? | both — this screen used to show the sentence and not the label |
| The result | the label as the heading, the sentence under it |
| Your worries | unchanged; the card already did this |

`heading` decides whether the label is the `<h2>` focus lands on. On the test screen and the
result the worry is the only title there is, so it is; everywhere else the screen has its own
heading and this is a quiet strip above it. **`plan.kicker` — "Here's your test" — is gone**,
because the worry's own label is a better title for that screen than a label for it.

## 3. The yellow

Not a taste call, arithmetic. The highlight is drawn around each line of an inline span with
`6px` of padding above and below and `box-decoration-break: clone`, so two bands of yellow stay
apart only while the line height exceeds the text plus both paddings — **1.44 at the largest
size in the clamp**. It was set to **1.2**. Every band overlapped the one below it, which is
exactly what "too tightly packed" looks like: a solid slab with the words squeezed inside it
instead of a marker pen.

`line-height` is now **1.6**, which leaves a clear gap at every size in the clamp, and the
paragraph gap went 12px → 14px to match. `loop.test.js` pins both numbers, with the reason, so
nobody tidies the line-height back down without the padding coming with it.

## What is enforced, and where

| rule | file |
| --- | --- |
| exactly three beliefs per worry, two fields and no third | `lib/content.js` → `checkBeliefs` |
| every one starts "If" and says "then" | `lib/content.js`, and again in `content.test.js` |
| no two of the three are the same prediction | both — word for word in the lib, same-words-reordered in the test |
| the card sentence is never word for word one of the three | `content.test.js` |
| the label and the sentence are on every screen in between | `loop.test.js` |
| the prediction picked is the one tested, stored and repeated | `loop.test.js` |
| "put it my own way" keeps the worry and only swaps the sentence | `loop.test.js` |
| the highlight's line-height and padding stay in step | `loop.test.js` |

160 tests, up from 153. No dependency, no build step, nothing fetched.

## Gaps, in the order they matter

1. **Sixty-three sentences nobody outside this building has read.** This is the same gap B1 and
   B19 have and it is now three times the size. The paid CBT reviewer's pass has to be the three
   together per worry, not one of them — the question is whether they are three real predictions
   or one prediction and two paraphrases, and only somebody trained will see the difference.
2. **Misha has not read them.** He has the casting vote on tone and on `drink`, and every worry
   he has seen has changed shape underneath him.
3. **Nobody has walked this on a phone.** The screen-by-screen walk in this session is the fake
   DOM, which cannot see layout. The new strip sits above the heading on five screens and it has
   not been looked at on a 390-wide screen with the text size turned up.
4. **The screen-reader pass is still owed**, and B20 added a `<p>` above the heading on five
   screens. Focus and the heading order are tested; what it is like to hear is not.
5. **`docs/journeys.md` J1–J3 are now two taps out of date**, having been one tap out of date
   since B19.

## Boxes for the founder

- [x] **The second tap: kept.** Founder, 2026-09-04 — "one extra tap is fine"
- [x] **One ladder per worry, shared by the three.** Founder, 2026-09-04
- [ ] Read `docs/COPY.md` — the three under each worry are in one table per worry now
- [ ] Misha reads the sixty-three

`docs/changing-the-words.md` is how to do something about anything on that read.
