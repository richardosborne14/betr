# B40: The record knows which template it is — the plumbing, before any template

**Status:** **DONE, 2026-09-09.** See the log at the bottom of this file — including the two
things a person CAN see change, which this line said would be none.
**Confidence:** 8/10 built (7/10 scoped: it touches storage, the ladder, merge and export at once).
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

---

## Built, 2026-09-09

**Status: DONE.** 222 tests, no dependencies, nothing requested after load. **Confidence: 8/10** —
the one below is the escape link's position at 125%, and it is a measurement rather than a doubt.

### What was built

**One sentence of behaviour, in `builtTest()`.** `source` and `id` now come from `draft.stock`
— the road — instead of from `sameAsStock()`. Stay on a worry's road and the test is that
worry's, whatever the words say.

**`sameAsStock()` did not go. It changed jobs**, and this is the part worth remembering: it now
decides the **wording only** — which sentence is stored, and whether B20's hand-written
expectation travels or one is read off the person's own words. That is why nothing on any screen
looks different today. Identity and wording were one decision until this morning and they are two
now.

**The way out: `#ownit`, one plain link, on the borrowed road only.** *Write the whole thing
myself.* It forgets the item, keeps the words in the blanks, and from that tap the test is theirs
— own id, own ladder, starting at ten. It had to be built here rather than in B41, because B40
removes the exit that editing used to be, and a road with no way off it is worse than the bug.

**`store.js` v4 → v5, migrating nothing.** Three fields ride along and **none of them keys
anything**: `prediction` (which of the three, by index), `slots` (name → the person's words, null
until B41 puts holes in something), `size` (null until B42). All three are in the export, counted
from one rather than from nought, and **absent entirely where there is nothing to say** — so a
free-text test's entry in the file looks exactly as it did yesterday.

**`rate.js` did not change, and that is the decision.** The comment in `keyOf()` now says why:
keying on worry-plus-prediction would give one worry three ladders, which is rule 5 inverted.

### The trap fired, and it was the second end

The file warned: *when identity moves, both ends have to move.* It did.

**`testFor()` / `dropFor()` looked a stock item's plan up FRESH**, so a corrected wording in
`worries.js` reaches everyone who repeats it. Safe while a rewritten plan always belonged to an
*own* test with no item to look up. Under B40 a test can be filed under a worry **with a plan the
person typed over** — and looking it up fresh would have handed BETR's sentence back and thrown
hers away, on *Test this again*, the one screen whose entire job is to bring her own test back.
It is now `planFor()`: unchanged from BETR's words means BETR's, looked up fresh; anything else,
including a leave-out line she deliberately emptied, is hers. **Both halves are asserted**, because
fixing one by breaking the other is the easy mistake.

### What a person can see change, and it is two things

The task file said nothing would. Two things do, and both are the point rather than a slip:

1. **The link.** One line of small print on the borrowed build screen, and nowhere else.
2. **Editing a borrowed sentence no longer starts a new ladder.** Rewrite the prediction and the
   test stays under that worry, on the rung it was on. That is the whole of B40. **Before today
   it became a separate card; now it is one card and one ladder.** Anybody who edited a borrowed
   sentence before today keeps the own-test card they already have — nothing was migrated and
   nothing was rewritten on the way in.

### Measured, and left

| | 100% | 125% |
| --- | --- | --- |
| *What will you do?* (the big button) | 407px | 492px |
| *Write the whole thing myself* | 698px | 870px |
| the fold | 785px | 780px |

**At 125% the link sits behind the menu.** So did the small-print line it shares a paragraph with,
yesterday and every day since B32 — nothing regressed, and the big button clears the fold on both.
It is where it is because it belongs **after** the three suggestions: you read them, none of them
is yours, and then you write your own. Offering the way out above the way in would be the wrong
screen. **If it ever needs to clear the fold, the thing to cut is the chip row, not this.**

### Tests

Six walks, all in `loop.test.js` unless said otherwise:

- editing a borrowed sentence keeps it inside the worry, and the ladder goes on moving
- **three runs of one worry in different words draw ONE ladder, not three** — B40's picture, and
  the thing that would have failed silently
- *Write the whole thing myself* hands over a genuinely own test, and leaves the worry alone
- the way out is only ever offered on the road that has something to leave
- a v4 record needs no migration, and **joins a v5 one on the same ladder**
- *Test this again* brings back the plan she wrote, and BETR's where she wrote none
- `store.test.js`: a templated result exports which one it was, what was typed in and how big;
  and a test with nothing typed into it exports no holes at all

### Left for B41

`slots` is plumbed and always null — nothing writes to it until there is a skeleton with a hole
in it. `filled()` in `app.js` is where a draft's holes become a record's, and `#ownit`'s handler
is where they are dropped on the way out.
