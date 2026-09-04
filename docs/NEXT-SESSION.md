# Start here

**Last refreshed:** 2026-09-03, after B20 — a worry now carries three predictions, and the
same two lines are on every screen of the loop.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**v1 is built, amended twelve times, live, and there is nothing left to build without
somebody's decision.** Fifteen screens, **160 tests**, no dependencies, no build step, no
requests after the page loads. Earlier amendments, each in its own task file: *worry* and the
**1–10 ladder**; the **BETR** wordmark; **B8**'s three plain words; **B17**'s country-aware
crisis block; **B9**'s `rid` and `move` (storage is **v3**); **B15**'s strings and speech;
**B18**'s "Why this one sticks"; **B3**'s web server; **B19**'s doors.

**2026-09-03, B20, from the same two test users as B19 and on the same evening.** Three asks,
all built:

- **One worry, three predictions.** With B19 finally showing a worry's "If I ___, then ___",
  the next thing they said was that it "sort of matches my worry but not really". A worry is a
  *situation*; what an experiment tests is the **prediction underneath**, and there is always
  more than one. So `worries.js` now carries a loose `belief` for the card and **exactly three
  `beliefs`** — `{ belief, expect }` — that a person chooses between on a new screen, or
  replaces with their own words. Top-level `expect` is gone; it travels with the prediction now.
  **Sixty-three new sentences.**
- **The same words all the way through.** `worryHead()` puts the label and the exact sentence
  being tested at the top of every screen from the choice to the result. `plan.kicker`
  ("Here's your test") is gone; the worry's own label is that screen's heading.
- **The yellow.** `.result .real` line-height was 1.2 against a 1.44 minimum, so every
  highlight band overlapped the one below. Now 1.6, pinned by a test with the arithmetic.

**Cost: the loop is six taps, not four.** B19 bought one, B20 bought the other. **The founder
accepted both on 2026-09-04** — "one extra tap is fine" — and chose the **shared ladder**: all
three predictions under a worry move that worry's one ladder. Rule 5 and rule 10 in `CLAUDE.md`
now say so. Neither is an open question; do not reopen either as a tidy-up.

**Still true:** **Q1 (name, trademark, domain) is open** and blocks release. **Nobody outside
this building has read a word of the worry list** — and it is three times the size it was this
morning. **Nobody who uses a screen reader has touched the app.**

## 2. The next action

**There isn't a coding one.** B10 must not start until passkeys-in-a-Capacitor-webview is
settled (`capacitor://localhost` fails WebAuthn's origin check, and B5 allows no extra
plugins); B11 rests on an unchecked fact about Apple's CloudKit wording; B12–B14 need the
founder to amend rule 1 **in writing**; B16 waits for real users. **A session that opens should
ask the founder which of these to move, not start B10.** All of them block release:

- **One paid CBT-trained reviewer** reads, per worry, **the label, the card sentence, the three
  predictions and the explanation together**. The question is whether the three are three real
  predictions or one prediction and two paraphrases — only somebody trained will see it. Never
  an endorsement. Two pairs to ask about by name: **`strug` against `low`**, and **`care`
  against `praise`**; if either is called one worry, `low` and `praise` are the ones that go.
  Say out loud that `why.js` is the file most at risk of echoing CCI or Getselfhelp.
- **Misha reads the six doors and the sixty-three**, plus the `note` on door one, and he keeps
  the casting vote on `drink`, now *Turning up and not joining in* (B0 Q2a, Q2d).
- **A real screen-reader pass on a real phone**, VoiceOver and TalkBack, by somebody who uses
  one daily. Release condition in B15's file. **And nobody has walked B20 on a phone at all** —
  the new strip sits above the heading on five screens, unseen at 390 wide with big text.
- **A PR on `trybeup/trybeup-prod`.** BETR's nginx block is on the droplet and **not** in that
  repo, and their deploy rsyncs `nginx.conf` whenever it changes — so their next nginx change
  deletes BETR's block and the address goes dark. Same PR adds `betr.trybeup.com` to
  `renew-cert.yml`. **Tell them their deploy has a live bug too**: it reloads nginx inside the
  container, so an inode change makes the reload silently do nothing and the run still goes green.
- **J1, J2 and J3 walked on a real phone** against the live address (`docs/journeys.md`). They
  were written for the four-tap flow and are now two taps out of date.
- **Somebody owns checking links and helplines each release** (`helplines.js` has
  `owner: null`), and **Q1** — nothing ships unnamed.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | `python3 -m http.server 8760 --bind 127.0.0.1` from `web/`, then open `http://127.0.0.1:8760/`. Opening `web/index.html` off disk works too, but storage is unreliable for a `file:` page — serve it when testing persistence |
| Drive it for real | headless Chrome + CDP over plain `fetch`/`WebSocket`. **Viewport with `Emulation.setDeviceMetricsOverride`, never `--window-size`**; country with `Emulation.setTimezoneOverride`; **await the WebSocket handshake before the first `send()`**, `/json/new` needs `PUT`, and pick a free debugging port |
| Live address | **`https://betr.trybeup.com` — live.** Every push to `main` touching `web/**` publishes it. Cert expires 2026-12-02. Still a borrowed subdomain; a real domain waits on Q1 |

## 4. Gotchas, live

- **`node --test web/tests/` does not work on Node 22** — run it from the repo root.
  `harness.js` is the fake DOM; `boot(seed, { timeZone, languages })` is the phone it pretends
  to be (London, English). In its `vm`, **`instanceof Array` is unreliable** and there is **no
  `crypto`**.
- **A walk in a test is five taps now**: `#go` → `[data-door]` → `[data-id]` → `[data-b]` →
  `#lock`. Nothing in a test may hard-code a worry's words; use `doors.items[n].worries[0]` and
  look it up, and use `f.beliefs[n]` rather than typing a sentence.
- **A worry is a loose `belief` plus exactly three `beliefs`**, two fields each, each predicting
  something different, and the card sentence is never one of the three. The build fails on all
  of it (`lib/content.js`, `content.test.js`).
- **`content.test.js` holds `STARTS_TODAY` by hand** — the first worry behind every door has to
  be startable the day it is tapped. **A worry behind no door is unreachable**, and
  `validateDoors` fails the build on it; a door is four fields and no fifth.
- **Every word a person reads is in `web/content/strings-en.js`**; a sentence back in `app.js`
  fails `i18n.test.js`, as does a `left:` or a `px` font size in `app.css`.
- **Every screen goes through `paint()`**: menu, focus to `#top`, and anything `say()` left.
- **`worryHead()` is on every screen from the choice to the result**; a new screen inside the
  loop must use it, and `loop.test.js` walks the run asserting both lines on each step.
  **`pending`, the worry being chosen for, is not stored** (like `whyId`): a reload there drops
  to the doors. **The highlight's `line-height` and padding are coupled** — the arithmetic is
  in the test named for it, and reducing one alone makes the yellow a slab again.
- **Content is `web/content/*.js`, not `.json`**, and `web/lib/*.js` are classic scripts. A
  test may **read** content out of there, never restate it; a locked-in test keeps its own copy
  of the words, so **clear storage** before checking a content edit in a browser.
- **A new field on the stored state goes in three places**: `blank()`, `normalise()`,
  `isEmpty()`. (A field on a *record* inside `done`/`open` is `normalise()` only.)
- **Storage is v3 and B20 did not bump it**: a record already stored `belief` and `x`, only
  which sentence goes in them changed. **A ladder's rungs come from `g.rungs`, not `r.level`.**
  `rate.keyOf()` keys a stock ladder by **worry id**, so all three predictions share one ladder
  — a decision, and B20's file says how to reverse it.
- **`content/zones.js` is generated, never hand-edited**, and **no helpline number is written
  from memory**. **Sentence 7 names 988 and 116 123 inside itself**: frozen.
- **Language and country are two separate questions.** **The ladder is one belief's grip** — no
  total, no average, no target. **`.kicker` is uppercase in CSS.** **The guard blocks "bet"**.
- **`docs/COPY.md` is generated** by `node tools/copy-sheet.js`; never hand-edit it. The
  founder may edit the five content files on github.com — `docs/changing-the-words.md` is what
  they are following, so keep it true if a content file moves or a rule changes.
- **A link is allowed; a request is not** — `menu.test.js` holds the allow-list. **`why.js` has
  two fields and no third** — the regulatory line, not a style rule.

## 5. Decisions locked

> Everything in this repo landed on 2026-09-03: B15, B1, B17, B3, B9, B18, B19 and B20.

The ten rules in `CLAUDE.md` — rule 3 names *worry* and, since B20, the three predictions;
rule 5 the ladder; rule 7 BETR and capitalisation; rules 9 and 10 the B8, B19 and B20
amendments. Q2, Q3, Q8. The nine sentences, verbatim. **B19 reversed scope §5.3a's
recommendation, on evidence**, and **B20 changed the shape of an item**, on the same evidence.
