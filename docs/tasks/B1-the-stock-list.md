# B1: The stock list — the content is the product

**Status:** Shape done, words not. The file exists and is enforced; it holds the prototype's
twelve, not a written-and-reviewed list
**Confidence:** 5/10 — this is the unvalidated part of the product and it is the part that matters
**Date opened:** 2026-09-01 · **File created:** 2026-09-02
**Depends on:** B0 (Q2 answered 2026-09-02)

## What to build

The final list of fears, each with its six parts, as a single content file the app reads:
`web/content/fears.js`. Nothing else in the app is opinionated; this file is.

**It is `.js`, not `.json`.** A browser will not fetch a JSON file from a page opened off the
filesystem, and that is how this gets looked at before B3. It is still one plain array with no
logic in it, and it is edited exactly as a JSON file would be. B2's notes have the reasoning.

**What exists now (2026-09-02):** the file, the six-field shape, the lane list, and the tests
that enforce all of it, holding the prototype's twelve items with one change — the drink item's
test was reworded to "order something soft" so it contains no habit word. Steps 1 to 3 below
have not happened. The words are a placeholder that happens to work.

Each item, per scope §5.2:

| Field | Rule |
| --- | --- |
| `label` | Plain words, the situation not the diagnosis. It is the button text |
| `belief` | "If I ___, then ___", about how people react or how it will feel |
| `expect` | One sentence, the thing the person is braced for. Shown pre-written, editable |
| `test` | One line, doable today, cheap, legal, reversible, in the person's control |
| `drop` | The safety behaviour to leave out. Without it the item is not an experiment |
| `lane` | One of: social, assertiveness, perfectionism, urge-timing, rest, sleep. Nothing else |

And the hard rule: **no test touches the habit itself** — no drink, screen, substance, food
restriction, body sensation, checking ritual, or anyone's safety.

Starting material: the twelve in scope §5.1 and the fifteen candidates in research
[`10-cbt-gateway-approach.md`](../research/10-cbt-gateway-approach.md) §7.

## Steps

1. Richard drafts every item **fresh**. No phrase copied from CCI, Getselfhelp, Therapist Aid,
   Psychology Tools or Beck Institute material; all restrict reuse.
2. Misha reads for the audience: which items read as a substance test, which feel like a
   diagnosis, which a person in early recovery would tap first.
3. One CBT-trained reviewer reads once for lane and wording. Paid, brief, and **never described
   as an endorsement** anywhere.
4. ~~If B0 Q2a chose the second door~~ **It did.** `content/whats-going-on.js` exists with six
   surface problems, each mapping to three or four fear ids, written against research §5.4:
   first person, a behaviour and never a condition, and nothing that claims to fix anything.
   **These six labels need Misha's sign-off before release.** They are the closest thing in
   Betr to the regulatory line.

## Test plan — done

`web/tests/content.test.js` asserts every item has all six fields, `belief` starts with "If",
`lane` is in the allowed set, ids are unique, neither `test` nor `drop` matches the habit-word
list, the visible count is twelve or fewer, the first three are the easiest ones, the second
door points only at fears that exist, and none of the phrases we never use appears anywhere.

## Done when

Richard has written every item fresh (step 1), and Misha and the CBT reviewer have each signed
off in this file with a date. The file and its tests are already committed.

- [ ] Richard: every item written fresh —
- [ ] Misha: read for the audience, including the six surface-problem labels —
- [ ] CBT reviewer: read once for lane and wording —
