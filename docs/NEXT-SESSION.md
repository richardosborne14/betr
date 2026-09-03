# Start here

**Last refreshed:** 2026-09-03, after B9.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**v1 is built, amended eight times, and there is nothing left to build without somebody's
decision.** Twelve screens, **146 tests**, no dependencies, no build step, no requests after
the page loads. Earlier amendments: *worry* everywhere and the **1–10 ladder**; the **BETR**
wordmark and nothing all-lowercase that a person taps; **B8** three plain words on every screen
and a locked-in test that waits; **B17** the crisis block naming the country you are in; **B1**
the twelve worries in the audience's voice; **B3** BETR's own web server; **B15** every
sentence in `content/strings-en.js`, and an app that speaks.

**2026-09-03, B9 — built this session.** Storage is **v3**. Every result now has an id of its
own (`rid`; `id` stays the *worry's* id), says which word was tapped (`move`) next to the rung
that landed on, and is read in **clock order** rather than array order — so two devices'
histories can be joined without losing or duplicating a result, and the export is joinable
rather than only readable. **Nothing a person sees changed**: every screen was rendered through
the code before and after and diffed byte for byte.

**Still true:** **Q1 (name, trademark, domain) is open** and blocks release. **Nobody outside
this building has read the twelve worries**, and **nobody who uses a screen reader has touched
the app** — those two are the live risks.

## 2. The next action

**There isn't a coding one.** B9 was the last thing on `docs/TRACK-reach.md` a session could
take on its own. B10 must not start until passkeys-in-a-Capacitor-webview is settled
(`capacitor://localhost` fails WebAuthn's origin check, and B5 allows no extra plugins); B11
rests on an unchecked fact about Apple's CloudKit wording; B12–B14 need the founder to amend
rule 1 **in writing**; B16 waits for real users. **So a session that opens should ask the
founder which of these five they want moved, not start B10.** All five block release:

- **Misha reads the twelve worries**, the six labels in `whats-going-on.js`, and has the
  casting vote on `drink` (B0 Q2d). Sign-off boxes are at the bottom of B1's file. Then **one
  paid CBT-trained reviewer** reads it once for lane and wording. Never an endorsement.
- **A real screen-reader pass on a real phone**, by somebody who uses one every day. VoiceOver
  and TalkBack, the whole loop, hands-free of sight. A few hundred pounds, and worth more than
  every automated check in the repo. Release condition at the bottom of B15's file.
- **B3's DNS record for `betr.trybeup.com`**, then a walk of J1, J2 and J3 on a phone
  (`docs/journeys.md`). Everything else on hosting is built and running.
- **Somebody owns checking the links and the helplines at each release** — `helplines.js` has
  `owner: null` and the tests say so on every run. And **Q1**: nothing ships unnamed.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | `python3 -m http.server 8760 --bind 127.0.0.1` from `web/`, then `open http://127.0.0.1:8760/`. Opening `web/index.html` directly works, but browsers are unreliable about storage for a `file:` page, so serve it when testing persistence |
| Drive it for real | headless Chrome + CDP over plain `fetch`/`WebSocket`. **Viewport with `Emulation.setDeviceMetricsOverride`, never `--window-size`**; country with `Emulation.setTimezoneOverride`; **await the WebSocket handshake before the first `send()`**, `/json/new` needs `PUT`, and pick a free debugging port — another Electron app may hold 9222 |
| Live address | `betr.trybeup.com`, built and running, **waiting on one DNS record**. No production domain yet; that waits on Q1 |

## 4. Gotchas, live

- **`node --test web/tests/` does not work on Node 22** — run it from the repo root.
  `web/tests/harness.js` is the fake DOM; `boot(seed, { timeZone, languages })` is the phone it
  pretends to be (London, English). Inside its `vm`, **`instanceof Array` is unreliable** and
  there is **no `crypto`** — hence `store.rid()`'s `Math.random` fallback.
- **Every word a person reads is in `web/content/strings-en.js`**; a sentence back in `app.js`
  fails `i18n.test.js`, as does a `left:` or a `px` font size in `app.css`.
- **Every screen goes through `paint()`**: it appends the menu, moves focus to `#top` — which is
  how the heading gets read out — and speaks anything `say()` left. Setting `app.innerHTML`
  loses all three, and the live region is only for what focus does *not* say (a test keeps it
  empty on an ordinary screen change).
- **Content is `web/content/*.js`, not `.json`**, and `web/lib/*.js` are classic scripts: a
  browser will not fetch JSON or load an ES module off disk. A test may **read** content out of
  there, never restate it; and a locked-in test keeps its own copy of the words, so **clear
  storage** before checking a content edit in a browser.
- **A new field on the stored state goes in three places**: `blank()`, `normalise()`,
  `isEmpty()`. B17 missed the third and a person's chosen country was thrown away. (A field on a
  *record* inside `done`/`open` is different — `normalise()` only.)
- **Storage is v3.** `rid` and `move` are B9's; `open`, `country` and `lang` came without a
  bump; the v1 `rate` migration must stay. **A ladder's rungs come from `g.rungs`, not
  `r.level`** — `series()` replays the taps where every result in it has a `move`, and falls
  back to the stored rung where any does not. Reading `r.level` in a renderer is the bug B9
  nearly shipped.
- **To prove "no screen changed", diff two renderings, don't look**: `git archive <commit> web`
  into a scratch dir, walk both harnesses through the same taps, diff `a.html()`. Storage
  changes prove against `tests/fixtures/v2-phone.json`, a genuine pre-B9 file.
- **`content/zones.js` is generated, never hand-edited** (recipe in B17's file), and **no
  helpline number is written from memory** — off the provider's site that day, with the URL and
  the date, or leave the country out. **Sentence 7 still names 988 and 116 123 inside itself**:
  frozen (research §10), the one place a country-wrong number appears, not a session's call.
- **Language and country are two separate questions** and no file couples them. **The ladder is
  one belief's grip** — no total, no average across worries, no line, no target, on the screen
  and in what a screen reader says. **`.kicker` is uppercase in CSS**, so `innerText` shouts.
  **`file:` is in the CSP source lists** so it works off disk; nginx drops it. **The guard
  blocks "bet"** — see Q1.
- **iPhone Safari deletes a web page's storage after seven days unused** — the install card and
  `navigator.storage.persist()` are in; the real fix is B5's native wrap (research §9.1).
- **A link is allowed; a request is not** — `menu.test.js` holds the allow-list. **"Improve
  your mental health"** is inside Illinois's definition of therapy services. Never.
- **A person's own words go through `paras()` and wear `.wrote`** — they type into a textarea,
  so anything they wrote can have line breaks in it.

## 5. Decisions locked

The ten rules in `CLAUDE.md` — rule 3 names *worry*, rule 5 the ladder, rule 7 BETR and
capitalisation, rules 9 and 10 the B8 amendments. Q2, Q3, Q8. The nine sentences, verbatim.
B15 uses a small `web/lib/i18n.js`, not i18next; each translation of a frozen sentence is
approved once, in B16, then frozen the same way; the crisis block stays in English everywhere,
because a number belongs to a country and not to a language. **New (B9):** `store.js` never
calls `rate.keyOf()`; deduplication lives in `normalise()`, not `series()`; a mixed ladder
falls back **entirely** to stored rungs, never per result; the export is not re-ordered,
because it is a copy of what is stored and not a view of it.

## 6. What changed last session

2026-09-03: **B9 built** — storage v3, `rid` on every result and every waiting test, `move`
next to `level`, clock order in `series()` and `levelFor()`, `id` and `stillSureKey` in the
export, `ladder()` on the recomputed rungs. 20 new tests, a real v2 fixture, 126 → 146. Walked
in headless Chrome: a file joined to itself gives two results, not four, and a second device's
interleaved history gives four results on one card with the taps replayed. B15, B1, B17, B3 and
one paragraph bug landed the same day.
