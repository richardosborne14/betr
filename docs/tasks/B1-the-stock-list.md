# B1: The stock list — the content is the product

**Status:** Step 1 done, 2026-09-03. **Every one of the twelve is written fresh.** The task
stays open until Misha and the CBT reviewer have signed off below
**Confidence:** 8/10 in the drafting. Still 5/10 in the *product*, and it stays there until
somebody who is not us has read the list — that is what steps 2 and 3 are for
**Date opened:** 2026-09-01 · **File created:** 2026-09-02 · **Words written:** 2026-09-03
**Depends on:** B0 (Q2 answered 2026-09-02)

## What to build

The final list of worries, each with its six parts, as a single content file the app reads:
`web/content/worries.js`. Nothing else in the app is opinionated; this file is.

**Note, 2026-09-02:** the user-facing word is **worry**, never "fear" (founder's call; it
sounds scary). The file, the array `BETR_WORRIES` and the door key `worries` follow it.

**It is `.js`, not `.json`.** A browser will not fetch a JSON file from a page opened off the
filesystem, and that is how this gets looked at before B3. It is still one plain array with no
logic in it, and it is edited exactly as a JSON file would be. B2's notes have the reasoning.

Each item, per scope §5.2:

| Field | Rule |
| --- | --- |
| `label` | Plain words, the situation not the diagnosis. It is the button text |
| `belief` | "If I ___, then ___", about how people react or how it will feel |
| `expect` | One sentence, the thing the person is braced for. Shown pre-written, editable |
| `test` | One line, doable today, cheap, legal, reversible, in the person's control |
| `drop` | The safety behaviour to leave out. Without it the item is not an experiment |
| `lane` | One of: social, assertiveness, perfectionism, urge-timing, rest, sleep |

And the hard rule: **no test touches the habit itself** — no drink, screen, substance, food
restriction, body sensation, checking ritual, or anyone's safety.

Starting material: the twelve in scope §5.1 and the fifteen candidates in research
[`10-cbt-gateway-approach.md`](../research/10-cbt-gateway-approach.md) §7.

## Steps

1. **Done, 2026-09-03.** Every item drafted fresh. No phrase copied from CCI, Getselfhelp,
   Therapist Aid, Psychology Tools or Beck Institute material; all restrict reuse.
2. Misha reads for the audience: which items read as a substance test, which feel like a
   diagnosis, which a person in early recovery would tap first. **Outstanding.**
3. One CBT-trained reviewer reads once for lane and wording. Paid, brief, and **never described
   as an endorsement** anywhere. **Outstanding.**
4. ~~If B0 Q2a chose the second door~~ **It did.** `content/whats-going-on.js` exists with six
   surface problems, each mapping to three or four worry ids, written against research §5.4:
   first person, a behaviour and never a condition, and nothing that claims to fix anything.
   **These six labels need Misha's sign-off before release.** They are the closest thing in
   Betr to the regulatory line. Not touched by this session; its six labels are unchanged.

## What step 1 actually did — 2026-09-03

**All twelve rewritten, ids and order untouched.** The ids (`no`, `help`, `strug`, `funny`,
`drink`, `angry`, `mist`, `rest`, `sit`, `phone`, `favour`, `cut`), the order, the lanes and
the six-field shape are exactly as they were: stored results point at those ids, and the first
three are still the easy three (scope §5.3c). Only the words changed.

**How they were written.** Three rules, applied to every item, and they are recorded in the
header of `worries.js` so the next person writing one follows them:

1. **The `expect` is what the person is actually braced for, and it is small enough to be
   true.** The old ones were closer to a catastrophe ("they'll be annoyed"). The audience is
   the person nobody knows this about — research §8's "functional one", who is
   *"lonely in a specific way that's hard to explain"*. So what they dread is not a scene: it
   is somebody going quiet, a face, a pause, being *"quietly filed under people who can't
   cope"*. A dread that is small is a dread that can be checked against what happened.
2. **Every `test` ends in something observable.** Count how many people say anything; write
   down what you actually missed; see whether anyone mentions it. That observation is the one
   sentence the person types afterwards, so the test has to hand them one.
3. **Every `drop` names the safety behaviour as the thing they would actually do**, not as a
   clinical label, and several now name two of them, because one is usually not the whole
   crutch — "don't offer before you're asked, **and don't make up for it another way**".

**Two changes worth the founder's eye:**

- **`drink`'s label is now "Being the only one not joining in"**, not "Not drinking at a social
  thing". B0 Q2d is the founder's own reasoning — *"the fear is about being noticed, not about
  the drink"* — and the old label did not say that; it named the drink on a button. The new one
  names the noticing. The item, its lane and its place in the list are unchanged, and the door
  `Drinking more than I mean to` still opens onto it. If it should read the old way, it is one
  line in `worries.js` to put back.
- **`rest`'s belief is now "then I'm being lazy"**, not "then I'm worthless". "Worthless" is
  the clinical wording of that assumption; "lazy" is the word the person uses about themselves,
  and the belief has to be the person's own or the re-rate means nothing.

**Typography:** quoted speech inside a test or drop uses “curly” quotes, matching the rest of
the app. The straight ones looked wrong on a phone next to the app's apostrophes.

**Three tests stopped hardcoding content.** `loop.test.js` and `menu.test.js` asserted worry
labels as string literals, so rewriting the words broke a test that was not about the words.
They now read the label out of `content/worries.js`. Misha's pass will change these words again
and the suite should not care.

## Test plan — done

`web/tests/content.test.js` asserts every item has all six fields, `belief` starts with "If",
`lane` is in the allowed set, ids are unique, neither `test` nor `drop` matches the habit-word
list, the visible count is twelve or fewer, the first three are the easiest ones, the second
door points only at worries that exist, and none of the phrases we never use appears anywhere.
**89 tests green after the rewrite.** The whole loop was also walked in a real browser at
390×844 — pick, plan, lock, record, re-rate, result and Your worries — and every new string
renders on one screen without clipping.

## Gaps

- **Nobody outside this building has read the list.** That is steps 2 and 3, and it is the
  entire remaining risk in B1. The words are careful; careful is not reviewed.
- **The `sleep` lane is still empty.** It is allowed (scope §5.2, research §7 candidate 13) and
  no item uses it. Twelve is the cap, so a sleep item means dropping one. Not a session's call.
- **`whats-going-on.js` was not rewritten**, only checked against the new labels. Its six
  labels are the closest thing here to the regulatory line and still need Misha, not a redraft.

## Done when

Richard has written every item fresh (step 1), and Misha and the CBT reviewer have each signed
off in this file with a date. The file and its tests are already committed.

- [x] Richard: every item written fresh — **2026-09-03**
- [ ] Misha: read for the audience, including the six surface-problem labels, and the casting
      vote on `drink` (B0 Q2d) —
- [ ] CBT reviewer: read once for lane and wording —
