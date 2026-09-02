# B2: Betr v1 — the web build

**Status:** Not started (blocked on B0 Q1–Q3; can start on the prototype content while B1 runs)
**Confidence:** —
**Date opened:** 2026-09-01
**Depends on:** B0. B1 content lands into it.
**Where:** `web/` — plain HTML/CSS/JS, no framework, no build step, no dependencies.

## What to build

The 2026-09-01 prototype ([`../../prototype/index.html`](../../prototype/index.html), the "one big button" artifact), made real. Seven screens, four taps
and one sentence per loop, exactly as scope §3. Start from the prototype file; it already does
the loop in one file, with content inline. v1 separates content (`content/fears.json`) from
the app and adds the things a prototype skips.

### Must-haves, each traceable to the scope

| # | Item | Why |
| --- | --- | --- |
| 1 | **Seven screens** as scope §3, copy as in the prototype | Validated by the founder over four iterations |
| 2 | **Content from `fears.json`**; the app never hard-codes an item | B1 owns the content |
| 3 | **Expectation locked** at "I'll do it today", shown read-only beside the outcome | Research §2.3 |
| 4 | **Four-button re-rate** mapped to 80/55/30/10; stored as numbers | Research §2.3, scope §3 |
| 5 | **No streaks, no red days.** "Didn't get to it" keeps the test for tomorrow | Product principle |
| 6 | **Persistence** in `localStorage` with a versioned key; every read and write in try/catch; the app renders correctly with nothing stored | Artifact storage rules; Quirk's first principle |
| 7 | **Install prompt** after the first locked test: "Add to Home Screen so this never gets wiped", and `navigator.storage.persist()` requested | iPhone Safari's 7-day eviction, research §9.1 |
| 8 | **Export and delete** on the "what this is" screen; export is a readable JSON in a textarea with a copy button plus a Share-sheet path on mobile | Trust, scope §7 |
| 9 | **The eight sentences and crisis lines** verbatim from scope/research §10 | Store rules and the legal line |
| 10 | **Lineage line**: "Made by the people behind TrybeUP" | Scope §4 item 7 |
| 11 | **Zero network after load.** No fonts, images, scripts or requests from anywhere. System font stack only. A `<meta http-equiv="Content-Security-Policy">` mirroring the B3 header as belt and braces | Scope §7 |
| 12 | **Build hash** printed on "what this is": the SHA-256 of `index.html`, written by a tiny script in CI (B3) | Scope §7 |
| 13 | **Custom entry** only if B0 Q3 says v1: last button, "Something else", with the if/then reframe and the habit-word refusal | Scope §5.4 |
| 14 | **No `console.log`**, no analytics, no crash reporter, no third-party anything | CLAUDE.md and scope §7 |

### Must-nots

- Nothing from the TrybeUP codebase. No shared cookie or domain. No React, no Tailwind, no Vite,
  no `package.json` dependencies: the folder must be readable as-is.
- No 0–100 slider anywhere. No streak. No "you missed". No "irrational". No "improve your
  mental health".
- No mention of TrybeUP outside the "what this is" screen until B6 decides otherwise.

## Test plan

- B4's unit tests for the guards, the mapping, persistence round-trip and export shape.
- Manual: airplane mode on, full loop works; browser network tab shows one request (the page);
  Safari "Add to Home Screen" then a full loop; delete everything; reload shows the start screen.
- The USER_JOURNEYS.md entry from B4, walked on `betr.dev.trybeup.com`.

## Done when

The seven screens work on an iPhone and an Android phone from the dev URL with wifi off after
load, the tests pass, and the confidence score is 8 or above.
