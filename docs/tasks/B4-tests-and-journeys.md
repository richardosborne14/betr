# B4: Tests and journeys

**Status:** Done, except the phone walk
**Confidence:** 8/10
**Date opened:** 2026-09-01 · **Built:** 2026-09-02
**Depends on:** B2 for the code; B1 for the content it checks.

## What to build

Betr has no backend and no dependencies, so its tests use Node's built-in runner:
**`node --test` from the repo root.** Nothing to install.

Not `node --test web/tests/`, which is what this file said and what CLAUDE.md said: Node 22
rejects a directory as a positional there and fails with a module-not-found error that looks
like a broken test rather than a broken command. `node --test` on its own finds all six files.

### Unit tests — `web/tests/`, plain `node --test`. **47 tests, all passing**

Betr's logic lives in `web/lib/*.js`, which `index.html` loads with a script tag and the tests
`require()`. Not ES modules, as this plan assumed: a browser will not load an ES module from a
page opened off the filesystem, and opening `web/index.html` directly is how this gets looked
at before B3. Each library file ends in a four-line shim that exports to whichever it is in.

| Test | Asserts |
| --- | --- |
| `content.test.js` | Every item in `worries.js` has the six fields; `belief` starts "If"; `lane` allowed; ids unique; neither `test` nor `drop` matches the habit-word list; visible count ≤ 12; the second door points only at worries that exist; none of the phrases we never use appears |
| `guards.test.js` | "I am a bad person" is rejected with the reframe; "If I say no, people will…" accepted; a test mentioning "beer" is refused with the reason |
| `rate.test.js` | The four labels map to 80/55/30/10 and nothing else |
| `store.test.js` | Round-trip through a stubbed `localStorage`; a throwing storage leaves the app in the start state; export shape is stable |
| `hash.test.js` | `tools/build-hash.js` produces a reproducible SHA-256; every served file is in it and the tests are not; stamping the hash into `index.html` does not change the hash |
| `loop.test.js` | **Added.** The whole loop, walked against about eighty lines of the smallest possible fake DOM: the stock loop, the repeat, "didn't get to it", the second door, a custom entry with both guards refusing first, the nine sentences and the crisis lines, export, delete, and coming back up from nothing and from rubbish |

### Journey — `docs/journeys.md` — **written, not yet walked**

`J1 Betr: one full loop`, 25 steps with an expected result for each, written so a
non-developer can follow it on a phone. It covers the stock loop, the repeat, "didn't get to
it", the second door, a person's own entry with both guards, *what this is*, export, delete,
the reload after delete, the network tab, and a full loop from the home-screen install.

## What the loop test caught

That after "do it again tomorrow" on a person's own test, *back* dropped them into the
half-finished entry screens with a stale draft. Fixed: the test screen now remembers where it
was entered from. That bug was invisible to every unit test and would have been found by a
person, on a phone, in the middle of their second loop.

## Done when

`node --test` passes (**47 tests, six files — done**) and the journey has been walked once on a
real phone from the dev URL with the result recorded in `docs/journeys.md`.

- [ ] J1 walked on an iPhone —
- [ ] J1 walked on an Android phone —
