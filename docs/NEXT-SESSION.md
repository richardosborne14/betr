# Start here

**Last refreshed:** 2026-09-03, after B15 and one founder-reported bug.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**v1 is built, amended seven times, and now speaks to a screen reader and can be translated.**
Twelve screens, **126 tests**, no dependencies, no build step, no requests after the page
loads. Earlier amendments: *worry* everywhere and the **1–10 ladder** (09-02); the **BETR**
wordmark and nothing all-lowercase that a person taps; **B8** — three plain words on every
screen, a locked-in test that waits for you, and Help; **B17** — the crisis block names the
country you are actually in; **B1** — all twelve worries rewritten in the audience's own voice;
**B3** — BETR has its own web server and publishes on push.

**2026-09-03, B15 — built this session.** Every sentence a person can read is now in
`web/content/strings-en.js` behind a ~90-line `web/lib/i18n.js`. **Not one line of prose is
left in `app.js`**, and a test sweeps its string literals to keep it that way.

**And the app is no longer silent.** Focus lands on the new screen's heading on every change,
so tapping the big button now says something out loud instead of nothing at all. The ladder
reads as *"Now: 9 out of 10. Down one rung."* — no total, no average, because rule 5 applies to
what is said as much as to what is shown. Every layout property is logical and every font size
is in `rem`: forced to `dir="rtl"` the whole app mirrors, and at 200% text nothing clips.

**Still true:** **Q1 (name, trademark, domain) is open** and blocks release. **Nobody outside
this building has read the twelve worries**, and **nobody who uses a screen reader has touched
the app.** Those two are the live risks.

## 2. The next action

**B9, the mergeable record** — `docs/tasks/B9-the-mergeable-record.md`, next on
`docs/TRACK-reach.md`, and the last thing that can be built without a decision from somebody
else. Everything else outstanding needs a person, not a session.

> Read `CLAUDE.md`, then `docs/NEXT-SESSION.md`, then `docs/TRACK-reach.md`, then
> `docs/tasks/B9-the-mergeable-record.md`, and build B9. Confirm `git status` is clean and
> `node --test` is green from the repo root first: B9 changes `store.js`, so it must not run
> while another session has that file open. Two guards B15 added now fail the build — no
> English prose in `app.js`, and no physical CSS property or `px` font size in `app.css` — so
> anything new a person reads goes in `content/strings-en.js`, and any new screen needs a
> heading with `id="top"` and a line in `SCREENS` at the top of `a11y.test.js`.

**Not for a coding session, and blocking release:**

- **Misha reads the twelve worries**, the six labels in `whats-going-on.js`, and has the
  casting vote on `drink` (B0 Q2d). Sign-off boxes are at the bottom of B1's file. Then **one
  paid CBT-trained reviewer** reads it once for lane and wording. Never an endorsement.
- **A real screen-reader pass on a real phone**, by somebody who uses one every day. VoiceOver
  and TalkBack, the whole loop, hands-free of sight. A few hundred pounds, and it is worth more
  than every automated check in the repo. Release condition at the bottom of B15's file.
- **B3's DNS record for `betr.trybeup.com`**, and a walk of J1, J2 and J3 on a phone
  (`docs/journeys.md`). Everything else on hosting is built and running.
- **Somebody owns checking the links and the helplines at each release.** `helplines.js` has
  `owner: null` and the tests say so on every run.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | `python3 -m http.server 8760 --bind 127.0.0.1` from `web/`, then `open http://127.0.0.1:8760/`. Opening `web/index.html` directly works, but browsers are unreliable about storage for a `file:` page, so serve it when testing persistence |
| Drive it for real | headless Chrome + CDP over plain `fetch`/`WebSocket`. **Viewport with `Emulation.setDeviceMetricsOverride`, never `--window-size`**; country with `Emulation.setTimezoneOverride`; **await the WebSocket handshake before the first `send()`**, `/json/new` needs `PUT`, and check the debugging port is free — another Electron app may hold 9222 |
| Live address | `betr.trybeup.com`, built and running, **waiting on one DNS record**. No production domain yet; that waits on Q1 |

## 4. Gotchas, live

- **`node --test web/tests/` does not work on Node 22.** Use `node --test` from the repo root.
  `web/tests/harness.js` is the fake DOM; `boot(seed, { timeZone, languages })` is the phone it
  pretends to be, defaulting to London and English.
- **Every word a person reads is in `web/content/strings-en.js`**; a sentence back in `app.js`
  fails `i18n.test.js`, as does a `left:` or a `px` font size in `app.css`.
- **`instanceof Array` is unreliable here** — the tests run inside node's `vm`; use
  `Object.prototype.toString.call(v) === '[object Array]'`.
- **Focus IS the announcement.** `paint()` moves focus to `#top`, which reads the heading out.
  The live region is only for what that does not say, and there is a test that it stays empty
  on an ordinary screen change. Do not "helpfully" announce the heading as well.
- **Content is `web/content/*.js`, not `.json`**, and `web/lib/*.js` are classic scripts: a
  browser will not fetch JSON or load an ES module from a page opened off disk. A test may
  **read** content out of there; it may never restate it. And a locked-in test keeps its own
  copy of the words, so **clear storage** before checking a content edit in a browser.
- **Every screen goes through `paint()`.** It appends the menu, moves focus and reads out
  anything `say()` left. Setting `app.innerHTML` directly loses all three.
- **A new field on the stored state goes in three places**: `blank()`, `normalise()` and
  `isEmpty()`. B17 missed the third and a person's chosen country was thrown away.
- **`content/zones.js` is generated, never hand-edited** (recipe in the B17 task file), and
  **no helpline number is written from memory** — off the provider's site that day, with the
  URL and the date, or leave the country out.
- **Sentence 7 still names 988 and 116 123 inside itself.** Frozen (research §10), and the one
  place a country-wrong number appears. Flagged in the B17 task file; not a session's call.
- **Language and country are two separate questions** and no file couples them; both test
  files assert it. **The ladder is one belief's grip** — no total, no average across worries,
  no line, no target, on the screen and in what a screen reader says.
- **Storage is v2** (`open`, `country`, `lang` came without a bump); keep the v1 `rate`
  migration. **`.kicker` is uppercase in CSS**, so `innerText` shouts. **`file:` is in the CSP
  source lists** so it works off disk; nginx drops it. **The guard blocks "bet"** — see Q1.
- **iPhone Safari deletes a web page's storage after seven days unused.** The install card and
  `navigator.storage.persist()` are in; the real fix is B5's native wrap. Research §9.1.
- **A link is allowed; a request is not.** `menu.test.js` holds the allow-list.
  **"Improve your mental health"** is inside Illinois's definition of therapy services. Never.
- **A person's own words go through `paras()` and wear `.wrote`.** They type into a textarea, so
  anything they wrote can have line breaks in it. `esc()` alone draws them on one line.

## 5. Decisions locked

The ten rules in `CLAUDE.md` — rule 3 names *worry*, rule 5 the ladder, rule 7 BETR and
capitalisation, rules 9 and 10 the B8 amendments. Q2, Q3, Q8. The nine sentences, verbatim.
**New, 2026-09-03:** B15 uses a small `web/lib/i18n.js`, not i18next (founder's call); the
frozen sentences are canonical in English and each translation of one is approved once, in
B16, then frozen the same way; the crisis block stays in English in every locale, because a
number belongs to a country and not to a language.

## 6. What changed last session

2026-09-03: **B15 built** — every sentence moved into `content/strings-en.js` behind
`lib/i18n.js`, the screen-change announcement, the ladder in words, `lang`/`dir`, logical CSS
and `rem` sizes; 96 → 125 tests. B1, B17 and B3 landed the same day. **Then one bug, founder-
reported:** what happened, typed as paragraphs, came back out on one line — `paras()` in
`app.js`, `.wrote` in `app.css`, 126 tests, walked in a real browser.
