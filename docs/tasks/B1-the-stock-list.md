# B1: The stock list — the content is the product

**Status:** Not started (blocked on B0 Q2)
**Confidence:** —
**Date opened:** 2026-09-01
**Depends on:** B0

## What to build

The final list of fears, each with its six parts, as a single content file the app reads:
`web/content/fears.json`. Nothing else in the app is opinionated; this file is.

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
4. If B0 Q2a chose the second door, add `content/whats-going-on.json`: six or seven surface
   problems in the safe wording of research §5.4, each mapping to three or four fear ids.

## Test plan

- A unit test (B4) asserts every item has all six fields, `belief` starts with "If", `lane` is
  in the allowed set, and no `test` matches the habit-word list.
- A second test asserts the list is twelve visible or fewer unless a `more` flag is set.

## Done when

`fears.json` is committed, the two tests pass, and Misha and the reviewer have each signed off
in this file with a date.
