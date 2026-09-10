# B48: The greyed example in the second blank belongs to this worry

**Status:** **DONE, 2026-09-10.** 260 tests pass, walked in Chrome on all three roads and
through to the ladder. Nothing requested after load, no dependency, no new sentence.
**Confidence:** **9/10.** 10 on the diagnosis — it was walked, screenshotted and reproduced
before a line was changed, and the new test fails against the old code. 9 rather than 10 on the
change because one path (the greyed example following a keystroke in the FIRST blank) is walked
and not tested, for the reason the harness has always had: the fake DOM fires no events.
**Date opened and closed:** 2026-09-10 · **Found by:** walking [`B45`](B45-one-road-in.md) §3's
drift list to see which one to take next.
**Part of:** [`B45`](B45-one-road-in.md) — it is B34 D1 with the placeholder as the cause.
**Also settles:** B45 **§7a**, the founder's call, below in §5.

---

## 1. What was wrong

**One frozen string was printed into the second blank on every screen on every road**, and it
was right on exactly one of them.

    thenPlaceholder: 'somebody will think I’m selfish',

That sentence is the worry `no`'s first prediction. It is correct on the front door **before
anybody has tapped anything**, because the blank above it is showing `no`'s sentence too and the
two greyed halves read as one whole example — which is what [`B45`](B45-one-road-in.md) §5c put
there on purpose, and what `loop.test.js` held.

**It stops being correct at the first tap.** Walked in Chrome, 390×844, before the change:

| Where | The sentence on screen |
| --- | --- |
| the worry road, `think` | *If I tell* **[somebody]** *what I actually think, then* ***somebody will think I'm selfish*** |
| the front door, chip #5 | *If I sit with the restlessness for ten minutes, then* ***somebody will think I'm selfish*** |
| the free road, own words | *If I let the washing up wait until the morning, then* ***somebody will think I'm selfish*** |

In each of those the three suggestions **directly underneath** were that worry's own three, and
the greyed example was not one of them. On **19 of 20 worries** and on **11 of the 12 front-door
chips** the person was being shown a prediction BETR wrote for a different act.

### Why it is not cosmetic

**It is [B34](B34-auditing-the-suggestions.md) D1 with the placeholder as the cause.** That rule
exists because somebody **types the greyed words out rather than tapping** — `strings-en.js`
says so in the comment where these two placeholders are defined. A person testing *saying what I
actually think* who typed the example she was given would land on a prediction that belongs to
saying no, offered by nothing on her screen, and carried from there into her record.

And it is the one control on that screen that [`B46`](B46-the-verb-constructor-is-the-default.md)
never reached. B46's whole point is that she types a name once and watches it arrive everywhere.
It arrived in the three chips, marked. It did not arrive in the box she was about to type into,
which is the one she was looking at.

---

## 2. What changed

| | |
| --- | --- |
| `thenHint()` | new. The then-half of the **first of the three currently under the blank**, whichever road this is. On the worry road it is that worry's, with her word carried; on the free road it is the matched worry's or the general set's |
| `paintThenHint()` | new. Repaints the hint **without repainting the screen** — setting a placeholder moves no caret, so it can run on a keystroke where `render()` cannot |
| `build()` | draws `thenHint()` instead of the frozen string |
| `refreshThens()` | repaints the hint in the same breath as the row it belongs to — one lookup, one answer |
| `refreshBorrow()` | the same, so her word lands in the hint on the keystroke |
| `wireChips()` | gained an optional **fourth**: something to run on every keystroke. Only the first blank has one, and §4 is why |
| `build.thenPlaceholder` | **deleted.** Nothing drew it any more |
| Tests | **260** (was 259). The old string assertion is replaced by one that reads the rendered placeholder on all three roads |

**Nothing a person reads was rewritten and no new sentence exists.** Every example the second
blank can now show is a prediction already in `worries.js` and already in the reviewer's sheet.

**The arrival screen is byte-identical to yesterday.** The empty free road derives its hint from
`build.ifPlaceholder` rather than repeating it by hand, and `ifPlaceholder` is held equal to the
first front-door suggestion by a test — so the two greyed halves are still one sentence, and now
they stay one sentence on the day somebody reorders the front door.

---

## 3. Why the frozen string is deleted rather than kept as a fallback

Two reasons, and the second is the founder's.

**It cannot hand back nothing, so there is nothing to fall back from.** `checkThens` makes
`thens` required and non-empty on the general set, and three `beliefs` are required on every
worry — the same guarantee `sizesFor()` already relies on. *A fallback chain that can return
nothing is a branch* ([`learnings.md`](../learnings.md), 2026-09-10); a fallback that can never
run is a second answer waiting for the day it does.

**And `docs/changing-the-words.md` promises the founder that every string in that file is a
string somebody can see.** A key nothing draws is a line they could edit and watch nothing
happen. `build.ifPlaceholder` stays and is now load-bearing twice over: edit it and the second
blank's example follows it, because the second blank's example is derived from it.

---

## 4. The bug inside the fix, and it is worth reading

`paintThenHint()` shipped in my own first draft **without calling `readBlanks()`**, and it
silently did nothing on the one path that mattered.

The hint is worked out from `draft.ifPart`. Typing does not repaint — that is the whole design —
so `draft.ifPart` only changes when something reads the boxes. Both of the first two callers
happened to call `readBlanks()` a line earlier, so both worked. The third, on the keystroke, did
not, and the function quietly recomputed the same answer it had at paint.

`readBlanks()` is now the first line of `paintThenHint()`. **A function that depends on state has
to read that state itself**, not hope its callers did — see [`learnings.md`](../learnings.md).

---

## 5. B45 §7a is answered: the fold stays

**Asked and answered on 2026-09-10, the founder's call.** On the do screen, after somebody picks
one of the three sizes, **the other two tuck away** — B42's fold is what ships, and *Lock it in*
stays above the fold.

**So [`B45`](B45-one-road-in.md) §3 difference 4 is closed, not deferred.** The canvas keeps all
three open and accepts running past the fold; the app does not, and that is a decision rather
than a drift. The canvas's own argument — that a person who has just picked *A small go* must be
able to see *A bigger go* still exists — is answered by the *Change* link, which shows the words
and does not hide them (B39). **Do not "restore" the open three.**

---

## 6. And difference 9 was already shipped

[`B45`](B45-one-road-in.md) §3 lists difference 9 as *"the hole shows a placeholder noun in the
blank... our hole is an empty input"*. **That is not true and was not true when it was written.**
`skeletonHalf()` has printed the hole's own word as a greyed placeholder since
[`B41`](B41-a-skeleton-with-holes.md), and the comment above it argues at length for a
placeholder rather than a value: *"a real value in a blank set in 800 weight looks like something
the person wrote, and she would lock in 'somebody' believing it was hers."*

Screenshotted before anything was changed today: *If I tell* `somebody` *what I actually think* —
the word is there, greyed, in the blank. **The drift table was read off the canvas and not off the
screen for that row.** It is struck out in B45 §3 now.

---

## 7. What is still open, and none of it is this task's

1. **Difference 3 — a size's own second hole**, filled on the do screen. Still not built, still a
   screen change and not content. It is the last unshipped item of B45's §5.
2. **Difference 6** — *What will you do?* below the suggestions — still out of reach at twelve
   chips, and further out since §5c grew the row. It waits on a cull or on the fold.
3. **The plan box's own placeholder**, *"Or put it in your own words."*, still sits above the
   three it is saying "or" about (B45 §12). The founder's canvas has *"Write what you'll do, or
   start from one of the three below."* **One string, Misha's and the founder's.** It is the same
   shape of fault as this task and the only one of its kind left on that screen.

---

## 8. Done when

- [x] The greyed example in the second blank is the first of the three offered under it, on
      every road — tested at paint on all three, walked in Chrome on five
- [x] It carries the person's own word, live, on the keystroke — walked (`no`, *my sister* →
      *"my sister will think I'm selfish"*)
- [x] The arrival screen is unchanged
- [x] No string exists that no screen draws
- [x] 260 tests pass, and the new one fails against the old code (verified by putting the old
      code back)
- [x] The whole loop walked to the ladder afterwards
