# B9: The mergeable record — three small changes, cheap only if done early

**Status:** **Built 2026-09-03.** 146 tests green. Nothing a person sees changed, and that was
checked by rendering every screen with the code before and after and diffing the output.
**Confidence:** 9/10
**Date opened:** 2026-09-03
**Date built:** 2026-09-03
**Depends on:** B2 (done). Nothing else. Breaks no rule, adds no dependency, changes no screen.
**Where:** `web/lib/store.js`, `web/lib/rate.js`, `web/app.js`, `web/tests/`.
**Background:** `docs/research/11-sync-passkeys-and-the-promise.md` §7, Phase 0.

## Why this exists

Sync — whatever form it eventually takes (B10–B13), and even the low-tech version of two
exported files being joined by hand — means two devices each adding results without knowing
about the other, and then joining the two histories. The record BETR writes today cannot
survive that, for three small reasons. All three are cheap to fix now and expensive to fix once
people have months of history, because by then the fix is a migration of real data rather than
a shape change to an empty file.

**This is worth doing on its own merits even if B10–B14 never happen.** It makes the export
self-describing, it makes two exports joinable, and it removes an ambiguity in the ladder that
is a latent bug today: `series()` reads results in the order they sit in the array, so any
future feature that inserts, re-imports or reorders a result silently mis-draws the ladder.

## The three problems, precisely

### 1. No result has its own id

`app.js:430` pushes:

```js
S.done.push({
  id: c.id, source: c.source, label: c.label, belief: c.belief,
  x: c.x, test: c.test, drop: c.drop, o: c.o,
  level: rate.next(at, ch.key), rateLabel: ch.label,
  when: new Date().toISOString()
});
```

`id` is the **worry's** id, shared by every test of that worry. Two histories therefore cannot be
joined without either duplicating results or dropping them, and there is no way to tell "the same
result, seen twice" from "two results that happen to look alike".

**Fix:** a random `rid` on every result, generated at the moment it is pushed
(`crypto.randomUUID()` where available, a random hex string otherwise — no dependency).

### 2. The ladder stores where it landed, not what was tapped

`level: rate.next(at, ch.key)` saves the **resulting rung**. `ch.key` — one of `still`, `bit`,
`lot`, `none`, `more` — is not saved; only `ch.label`, the display string, which is wording that
may change. So when two devices' results are interleaved there are two rungs each claiming to be
the latest, and no way to work out what the person actually did.

**Fix:** store `move: ch.key`. The ladder then *is* the taps replayed in order, and it recomputes
correctly however the results interleave. `rate.js` already holds the replay step — `next()` — and
`series()` already groups correctly by `keyOf()`.

Keep `level` as written, as the fallback for records made before this change, exactly the way
`withLevel()` already carries v1's `rate` values onto the nearest rung. Nobody loses a result.

### 3. Order is array position, not time

`series()` and `levelFor()` both walk `done` in the order it happens to be in. Every result already
carries `when`.

**Fix:** sort by `when` before grouping, with array position as the tie-break so two results in the
same millisecond stay in the order they were made.

## What to build

- A storage version bump, **v2 → v3**, of exactly the kind `store.js` was built for. `normalise()`
  fills in a `rid` for any old record that lacks one (stable per record, derived from its
  `when` + worry key so re-normalising the same file twice gives the same ids) and leaves `move`
  absent where it is unknown.
- `series()` and `levelFor()` sort by `when`, and recompute each group's rungs from `move` where
  every result in that group has one, falling back to the stored `level` where any does not. A
  mixed group — old records then new ones — must draw exactly the ladder it drew yesterday.
- `exportJSON` gains `id` and the tapped word as a stable key alongside the human-readable
  `stillSure`, so an exported file is joinable rather than only readable.
- `rate.keyOf()` is unchanged. It is already merge-safe and is the part of this that was right.

**Nothing a person sees changes.** No new screen, no new label, no new setting. If a screenshot
of any screen differs after this task, something has gone wrong.

## Rules this must not break

- Rule 1 stands untouched: nothing about this sends anything anywhere.
- Rule 5: `move` is stored per belief and is never totalled, averaged or compared across worries.
  It is the same number the ladder already draws, written down more honestly.
- The storage rules in `store.js`'s own header still hold: one versioned key, every read and
  write in try/catch, correct render with nothing stored and with garbage stored.

## Tests to add

- A v2 file (no `rid`, no `move`) loads, and every existing ladder draws **identically** to before.
  Pin this with a fixture of real-shaped v2 data, not a synthesised one.
- Normalising the same v2 file twice produces the same `rid`s.
- Results deliberately shuffled out of `when` order draw the same ladder as in order.
- Two histories of the same belief, made independently and concatenated, produce one group with
  every result present, none duplicated, and the rung that replaying all the taps in time order
  gives — including the case where both devices tapped on the same day.
- A group with old records followed by new ones draws the ladder the old records alone drew, then
  continues from there.
- The existing 63 tests still pass.


## What was built

All three, plus the two things they turned out to need.

### `web/lib/store.js` — version 3

- `VERSION` is **3**. The key is still `betr.v1`, because the version lives inside the record;
  that is what one versioned key means.
- **`store.rid()`** — `crypto.randomUUID()` where the browser has it, thirty-two hex characters
  from `Math.random` where it does not. No dependency. Never shown to anybody, never sent
  anywhere; it says only "this record and that record are the same record".
- **`normalise()` gives every old record an id derived from itself** — `when` (or `locked`, for
  a waiting test) plus source, worry id and belief, through FNV-1a twice for sixteen hex
  characters. The same file normalised twice gets the same ids, which is the whole requirement.
  Records that come out identical on both counts get a counter, so two real results in the same
  millisecond are never collapsed into one.
- **`normalise()` drops a record whose id it has already seen**, in `done` and in `open`. This
  is the one thing a hand-join needs and cannot do for itself, and it is ten lines, so it is
  here: concatenate two exports' `results` into one `done` and loading the file settles it.
- **`level` is still written and still read.** It is the fallback for any ladder holding a
  result made before `move` existed. Nobody loses a result to a version bump.
- **The export gains `id` and `stillSureKey`**, on results, and `id` on waiting tests.
  `stillSure` — the sentence they tapped — stays, because that file is meant to be readable.

### `web/lib/rate.js` — the ladder is the taps, in clock order

- **`inTimeOrder(done)`** — oldest first by `when`, array position as the tie-break, a record
  with no clock at all keeps its place at the end. `series()` and `levelFor()` both go through it.
- **`rungsFor(results)`** — where every result in a ladder says which word was tapped, the ladder
  is those taps replayed from the top, so it comes out the same however the results arrived.
  Where any one of them predates `move`, **the whole ladder** falls back to the rung each result
  stored at the time and draws exactly what it drew the day before. Half replayed and half
  stored would be a ladder that is neither.
- `keyOf()` is untouched, as scoped. It was already right.

### `web/app.js`

- The result is pushed with **`move: ch.key`** next to `level`, and with **`rid`**.
- **Every test in hand is born with an id** — `startFrom()`, `again()` and the own-belief path
  each set `rid: storeLib.rid()`. The result keeps it, so a test locked in on Monday and
  finished on Thursday is one thing with one id from end to end. That closes the open question
  below: yes, `S.cur` carries it, and so does everything waiting on Your worries.
- **`ladder()` draws `g.rungs`, not `r.level`.** This was the one thing that would have silently
  half-worked: `series()` recomputes the rungs, and the renderer was still reading the stored
  number off each result. It would have looked right for every phone in existence today and
  wrong for the first joined one.

### Tests — `web/tests/merge.test.js`, 20 of them, and a real fixture

`web/tests/fixtures/v2-phone.json` is **a genuine v2 file**, written by driving the code at
`f9e8421` — the last commit before this task — through the harness with a pinned clock. Four
results across two worries, one test locked in and never finished, a chosen country, and a
paragraph break in what somebody wrote. `web/tests/fixtures/make-v2-phone.js` is the recipe,
with the two commands to make it again, and nothing runs it.

Covered: the v2 file draws every ladder it drew before, stated as the old code stated it
(one rung per result, array order, straight off `level`); the same file normalised twice gets
the same ids; no old record is given a word it never tapped; results shuffled out of clock
order draw the same ladder as in order; two in the same millisecond keep their order; two
devices' histories joined are one ladder with every result in it and the rung the taps give,
including both devices tapping on the same day; the same result twice is one result, and the
same waiting test twice is one waiting test; a ladder of old records then new ones draws the
old rungs and continues from them, in the library and through the app; every result the app
writes has its own id and the tapped word; a test locked in and finished later keeps one id;
three waiting at once have three ids; two thousand ids do not repeat; the export carries the
id and the key; and nothing in `store.js` totals, averages or scores anything.

## How "nothing a person sees changes" was actually checked

Not by looking. The pre-B9 tree was checked out to a scratch directory, and a script rendered
every screen through both copies of the harness and diffed the output, twice:

- **From the v2 fixture:** Your worries, the front screen, and a whole loop finished on top of
  that history — what happened, the re-rate, the result, Your worries again, and a repeat.
- **From a clean start:** the front screen, Which one, the plan, locked, what happened, the
  re-rate, the result, a second loop, Your worries, Help.

**Byte-identical on every screen, in both walks.** That is the strongest form of the
"if a screenshot differs, something has gone wrong" condition this repo can produce without a
camera.

## Walked in a real browser

Headless Chrome over CDP, a 390×844 phone viewport, real `localStorage`, real
`crypto.randomUUID`, no console errors:

- A full loop writes `v: 3`, a UUID `rid`, `move: 'bit'` and `level: 9`. A second test writes a
  different `rid`, `move: 'lot'`, `level: 6`, and the card draws 10, 9, 6.
- The export reads `version: 3` with the result's `id` and `stillSureKey: 'bit'` in it.
- **The file joined to itself, by hand, in the browser, comes back as two results, not four**,
  and draws the same ladder.
- **A second device's two results pasted in, interleaved by a minute**, come back as four
  results in clock order and one card drawing 10, 9, 6, 5, 5 — which is the four taps replayed.
  Neither device on its own would have drawn that, which is the point.

## Decisions taken in the build

- **`store.js` does not call `rate.keyOf()`.** A derived id spells out the worry itself —
  source, id, belief. Storage has no business knowing how the ladder groups things, and the
  ladder has no business knowing how a record is stored.
- **Deduplication lives in `normalise()`, not in `series()`.** The ladder should draw what it
  is given; deciding that two records are one record is a question about the record, and
  `normalise()` is where questions about the record are answered.
- **An old record's derived id does not survive a file joined to itself.** Its id comes from
  what it contains, so the second copy gets a different counter and both are kept. There is no
  identity in a pre-v3 record to recover, and dropping one of two real results would be worse
  than carrying a duplicate. This is exactly why B9 was worth doing before anyone had months of
  history, and it is written in the file next to the code.
- **A mixed ladder falls back entirely, not per-result.** Replaying some rungs and reading
  others would produce a ladder that matches neither yesterday's screen nor the taps.
- **The export is not re-ordered.** It is what is stored, faithfully. Order does not matter to a
  join because the app sorts on load, and a sorted export would make the file a view rather
  than a copy.
- **A v3 file opened by an older cached copy of the app still works**: the old code ignores `v`,
  ignores `rid` and `move`, and reads `level`, which is still written.

## Gaps, and what is still true

- **Nothing merges anything yet, and nothing in the app can.** What exists is a record that
  *can* be merged and an export that can be joined by hand. B10–B14 are all still on the shelf,
  and B12–B14 still need the founder to amend rule 1 before anyone may start them.
- **Two devices tapping the same waiting test is undefined.** There is no sync, so it cannot
  happen; when there is, one test finished twice on two devices is two results with two ids,
  and whether that is right is B10's question, not this one.
- **`normalise()` does not look at `raw.v`.** It never has: it vouches for each field on its own
  merits, which is why v1 and v2 files both load without a version check. Left alone
  deliberately — a version gate would be a second place for the migration to live.

## Open — closed

- ~~Whether `rid` is also written into `S.cur`~~. **Yes.** B8 had landed, so a test in hand and
  everything waiting on Your worries gets an id the moment it exists, and the result keeps it.

## Done when — all met

- [x] `node --test` green from the repo root: **146 tests**, with 20 new ones in `merge.test.js`
      and three shape assertions in `store.test.js` updated to the v3 record.
- [x] A v2 file from a real phone loads and draws the same ladders it drew before — pinned with a
      fixture written by the pre-B9 code, not a synthesised one.
- [x] Nothing on any screen has changed — every screen rendered through both versions and diffed,
      byte-identical, from the fixture and from a clean start.
- [x] Confidence **9/10**, recorded above. The one point held back is that no phone that has been
      in real use since before today has been opened on the new code; the fixture is a faithful
      stand-in for one, but it is a stand-in.
