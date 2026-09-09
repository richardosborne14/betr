# B40: The record knows which template it is — the plumbing, before any template

**Status:** **SCOPED, not started.** Nothing a person can see changes. If anything looks
different, something is wrong.
**Confidence:** 7/10, and the lowest in the programme: it touches storage, the ladder, merge
and export at once.
**Date opened:** 2026-09-09 · **Part of:** [`B37`](B37-the-template-with-holes.md) §4
**Depends on:** nothing. **Blocks:** B41, B42, B43. **This one is first among the template work
and must not be done after it** — retrofitting identity onto records already saved as strings is
the migration this project has twice chosen not to do.

## The problem, restated

Identity in BETR is the sentence. `sameAsStock()` in `app.js` compares the person's words to
each stock prediction **word for word**; differ and the test becomes theirs, gets a new id, and
`rate.keyOf()` starts a new ladder at ten. Right today.

**A filled-in template differs from its skeleton every time, by design.** So without this task
every templated run is a stranger to itself, every one starts at ten, and **nobody's ladder ever
moves past one rung** — silently, with every test passing.

## What changes

**The one sentence that matters:**

> **Stay `stock`, and keep the worry's `id`, while the person is on the template road — whatever
> the words say.** The word-for-word comparison goes, because the app already knows: it printed
> the skeleton.

**And the ladder key does not change.** `rate.keyOf()` already returns `'stock:' + d.id`, and
rule 5 says a worry's **three predictions all share that worry's one ladder**. Do not key on
template-plus-prediction; that would give one worry three ladders, which is the rule inverted.
(B37 §4 said the wrong thing here until 2026-09-09. It is corrected there.)

**Three fields ride along, and none of them keys anything:**

| field | what it is | what it is for |
| --- | --- | --- |
| `prediction` | which of the three, by index | redrawing; the export saying what was actually tested |
| `slots` | flat object, name → the person's words | *Test this again* coming back with her words in it |
| `size` | which rung of the dial (B42 fills this) | the line under the ladder row |

**`store.js` VERSION 4 → 5, migrating no data**, on v4's own precedent and for v4's own reason.
An older record has no `slots` and draws exactly as it does today.

## Where a person leaves the template

One plain link on the build screen: **Write the whole thing myself.** It collapses the printed
skeleton into a single blank holding the assembled sentence, and from that tap it is theirs —
own id, own ladder, exactly as now. That is the only exit and it needs no mode.

## Done when

- a test walks **three runs of one skeleton with different slot text** and draws **ONE** ladder,
  10 → 8 → 6 — the picture on screen 7 of the mockup
- a test walks **tapping the escape link** and gets a fresh own ladder at ten
- a **v4 record still draws its ladder unchanged**, and `merge.test.js` still joins two devices
- the export carries the three new fields and `docs/COPY.md` is regenerated

## The trap

`series()` and `ladder()` disagreed once before, over exactly this kind of derived value, and
every phone would have drawn a ladder that disagreed with itself (`docs/learnings.md`). **When
identity moves, both ends have to move.**
