# B2: Betr v1 — the web build

**Status:** Built, then amended after the founder tested it. Not yet walked on a phone
**Confidence:** 8/10
**Date opened:** 2026-09-01 · **Built:** 2026-09-02 · **Amended:** 2026-09-02
**Depends on:** B0 (answered for Q2 and Q3). B1's real list lands into `web/content/worries.js`.
**Where:** `web/` — plain HTML/CSS/JS, no framework, no build step, no dependencies.

## What was built

The prototype made real, plus the two things B0 added. Ten screens: the seven from scope §3,
the second door, the three one-box screens for a person's own entry, and *what this is*.

```
web/index.html               the shell: CSP, manifest, icons, the script tags, nothing else
web/app.css                  the whole stylesheet. System fonts only
web/app.js                   every screen and the state machine
web/lib/guards.js            the if/then reframe and the habit / body / harm refusals
web/lib/rate.js              five words, each moving a belief along a 1–10 ladder
web/lib/store.js             one versioned key, try/catch everywhere, export, delete
web/lib/content.js           the rules the content has to pass, shared by the app and the tests
web/content/worries.js       the twelve. B1 rewrites the words, not the shape
web/content/whats-going-on.js the six surface problems behind the second door
web/manifest.webmanifest     home-screen install
web/icon-192.png             a struck line over a marked one. Drawn in the repo, 486 bytes
web/icon-512.png             the same, larger
tools/build-hash.js          the published build hash. B3 calls it in the deploy
web/tests/*.test.js          61 tests, no dependencies
docs/journeys.md             J1, the phone walk; J2, the same worry three days running
```

## The must-haves, and where each one went

| # | Item | Where |
| --- | --- | --- |
| 1 | Seven screens, copy as the prototype | `app.js`, plus four more screens B0 added |
| 2 | Content from a content file | `content/worries.js`; the app hard-codes no item |
| 3 | Expectation locked at "I'll do it today" | `plan()` sets `locked`; nothing can edit it after |
| 4 | Four-word re-rate, moving a 1–10 ladder | `lib/rate.js`. Amended 2026-09-02, see below |
| 5 | No streaks, no red days | Completed tests, plus one belief's ladder. "Didn't get to it" costs nothing |
| 6 | Persistence, versioned, try/catch, blank-safe | `lib/store.js`; renders from nothing, from rubbish, and from a storage that throws |
| 7 | Install prompt + `navigator.storage.persist()` | On the locked screen, once, dismissible. `askToPersist()` on lock |
| 8 | Export and delete | *what this is*: readable JSON, copy, share sheet on mobile, two-step delete |
| 9 | The sentences and crisis lines verbatim | `SENTENCES` in `app.js`, all nine from research §10, unedited |
| 10 | Lineage line | Sentence 9, plus its own section |
| 11 | Zero network after load, system fonts, CSP meta | No fonts, no CDN, no requests. `connect-src 'none'` |
| 12 | Build hash on *what this is* | `tools/build-hash.js` stamps `<meta name="betr-build">`; shows "dev build — not published" until B3 |
| 13 | Custom entry (B0 Q3 said v1) | Three screens, one box each, both guards |
| 14 | No console.log, no analytics, nothing third-party | None anywhere in `web/` |

## Decisions taken while building

1. **Content is `.js`, not `.json`.** A browser will not `fetch()` a JSON file, or load an ES
   module, from a page opened off the filesystem — and opening `web/index.html` directly is
   how the founder sees this before B3 exists. A classic script tag is the only thing that
   works both there and on the dev host. The file is still one plain array with no logic.
   Same reason the library files are classic scripts with a four-line export shim rather than
   ES modules, which B4's plan had assumed.
2. **`file:` is in the CSP source lists.** Without it the page opened off disk blocks its own
   scripts. Over https a `file:` URL cannot be loaded at all, so it grants nothing on the real
   site. `connect-src 'none'` is the line that matters and it has no exception.
3. **A person's own entry is three screens of one box, never a form.** CLAUDE.md rule 10.
4. **The habit guard also runs on the "leave out" line**, not just the test. Otherwise the
   habit walks in through the back door: test "go to the party", leave out "don't drink".
5. **The expectation for a custom entry is taken from the second half of their own sentence**,
   so nobody types the same thing twice. Editable like any other.
6. **An empty Betr stores nothing at all.** Saving a state with no results removes the key
   instead of writing an empty record, so "delete everything" leaves the browser's storage
   genuinely empty, and so does an app that has never been used.
7. **The drink item's test was reworded** to "order something soft" so it contains no habit
   word, which is what the guard and the content test check. The item itself stays (B0 Q2d).

## The amendment, 2026-09-02 — after the founder walked the prototype

Three pieces of feedback, all accepted. The founder chose the wording and the shape of each.

1. **The re-rate could not show progress, and that was a bug, not a preference.** The four
   words are relative ("a bit less sure"), and they were stored as fixed values (80/55/30/10),
   so three days of the same honest answer recorded the same number three times. Each word now
   *moves* the belief along a ten-rung ladder from wherever it already was: still 0, a bit −1,
   a lot −3, not at all → 1. Everything starts at 10, which is what the front screen already
   says. The tap is still one of four words; nobody learns a slider. The founder's own CBT used
   1–10 and watching it come down is what kept them going; research §11.6 asked for exactly
   this and it had never been built.
2. **A fifth, quiet option: *more sure than before*.** Founder's call, against the safer
   recommendation. A test can go badly and leave someone more convinced, and a ladder that can
   only fall is a nicer story than the person's week. It sits small under the four, where
   *didn't get to it* sits, and nothing on any screen calls a rise a setback.
3. **A screen for your worries.** After two or three you could not get back to an earlier one,
   and the ladder was invisible. One card per belief: its ladder, what you wrote each time, and
   *test this again*, which picks the belief up at the rung it was on. Reachable from the front
   screen and from any result. Nothing is combined across cards — comparing two beliefs would
   be the beginning of a score. The old flat "Earlier" list on the result screen is gone.
4. **"Fear" is now "worry", everywhere a person can see it** — and in the code, the content
   file (`content/worries.js`), the array and the door key, so a stranger reading it does not
   meet two words for one thing. "Worry" is already the word in the nine sentences ("manage
   everyday worry"), so nothing new needed clearing. Misha still has the last word on tone.
5. **Storage went to version 2.** Results saved by version 1 carry `rate`; they are moved onto
   the nearest rung (80→8, 55→6, 30→3, 10→1) rather than dropped. Export now says
   `sureOutOfTen` and `worry` instead of `stillSureValue` and `fear`.

## Tests

61, `node --test` from the repo root, nothing to install. Six files: the five B4 asked for,
plus `loop.test.js`, which walks every screen against about eighty lines of the smallest
possible fake DOM. It is not a browser and cannot see anything a person would look at, but it
caught a real bug: after "do it again tomorrow" on a custom test, *back* dropped you into the
half-finished entry screens.

The fourteen added on 2026-09-02 cover the ladder: that three taps of the same word land on
three different rungs (the bug that started this), that a belief never goes above 10 or below
1, that two worries are two ladders, that an old version-1 result still opens and lands on the
nearest rung, and that nothing in `rate.js` totals, averages or targets anything.

## Gaps

- **Not walked on a phone.** The one done-when condition still open. J1 in `docs/journeys.md`.
- **The six surface-problem labels need Misha's sign-off** before this ships to anyone (B0 Q2a).
- **The words are the prototype's, not B1's.** The shape is finished; the content is not.
- **The ladder has been seen in a headless browser, not on a phone.** Light and dark both
  render; the dots and the number line up. A real thumb has not touched it.
- **"Worry" has not been through Misha.** It is the founder's call and it is live in the build;
  tone is Misha's to confirm (CLAUDE.md).
- **No CBT reviewer has read it** (B0 Q2e).
- **The icon is a placeholder** drawn in the repo — legible, but B5 should commission a real one.
- **`web/tests/` should not be deployed** by B3: the build hash deliberately excludes it, so a
  stranger hashing the served folder would get a different number if the tests were served.

## Done when

Walked on an iPhone and an Android phone from the dev URL with wifi off after load. Everything
else is done.
