# B4: Tests and journeys

**Status:** Not started
**Confidence:** —
**Date opened:** 2026-09-01
**Depends on:** B2 for the code; B1 for the content it checks.

## What to build

Betr has no backend and no dependencies, so its tests use Node's built-in runner:
`node --test web/tests/` from the repo root. Nothing to install.

### Unit tests — `web/tests/`, plain `node --test`

Betr's logic lives in plain ES modules (`web/lib/*.js`) that `index.html` imports and the
tests import too. No DOM in tests: stub `localStorage` with a tiny in-memory object.

| Test | Asserts |
| --- | --- |
| `content.test.js` | Every item in `fears.json` has the six fields; `belief` starts "If"; `lane` allowed; no `test` matches the habit-word list; visible count ≤ 12 |
| `guards.test.js` | "I am a bad person" is rejected with the reframe; "If I say no, people will…" accepted; a test mentioning "beer" is refused with the reason |
| `rate.test.js` | The four labels map to 80/55/30/10 and nothing else |
| `store.test.js` | Round-trip through a stubbed `localStorage`; a throwing storage leaves the app in the start state; export shape is stable |
| `hash.test.js` | The hash script produces the same SHA-256 as `sha256sum` |

### Journey — `docs/journeys.md`

One journey, `J1 Betr: one full loop`, written as a step table so a non-developer can walk it
on a phone:

Steps: open → Pick a fear → tap one → read the test and the bold "drop" line → I'll do it today
→ Done it → type one sentence → tap "a lot less sure" → see the expectation struck through and
the outcome highlighted → Do it again tomorrow → what this is → export → delete everything →
start screen. Expected result per step. Add the changelog line at the top of the file.

## Done when

`node --test web/tests/` passes with the five files, and the journey has been walked once on a
real phone from the dev URL with the result recorded in this file.
