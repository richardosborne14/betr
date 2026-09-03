# B9: The mergeable record — three small changes, cheap only if done early

**Status:** On the shelf — scoped 2026-09-03, not scheduled. **This is the only one of B9–B14
that is worth doing before anyone asks for sync.**
**Confidence:** —
**Date opened:** 2026-09-03
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

## Open

- Whether `rid` is also written into `S.cur` (a test locked in but not finished). B8 makes several
  of those possible at once; if B8 lands first, they need ids too, for the same reason.

## Done when

- `node --test` green from the repo root, with the new cases above.
- A v2 file from a real phone loads and draws the same ladders it drew before.
- Nothing on any screen has changed.
- Confidence score recorded here.
