# Start here

**Last refreshed:** 2026-09-03, after B9, the worry rework, B18, and BETR going live.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**v1 is built, amended ten times, and there is nothing left to build without somebody's
decision.** Thirteen screens, **151 tests**, no dependencies, no build step, no requests after
the page loads. Earlier amendments, each in its own task file: *worry* and the **1–10
ladder**; the **BETR** wordmark; **B8**'s three plain words and its waiting test; **B17**'s
country-aware crisis block; **B1**; **B3**'s web server; **B15**'s strings and speech.

**2026-09-03, B9.** Storage is **v3**: every result has its own `rid`, says which word was
tapped (`move`), and is read in **clock order**, so two devices' histories join cleanly.

**2026-09-03, the twelve worries reworked.** Read against "the average adult or young adult"
rather than research §8's corpus alone. **`funny` and `favour` are gone**; **`reply`** (Not
replying straight away) and **`check`** (Sending it without checking it again) are in — the
first social item needing no live spoken conversation, and a perfectionism item needing no job.
**The order changed**, and that is the substantive part: only three of the twelve could be
started on the day they were picked, so a first loop ended in *Didn't get to it*.
Doable-today-and-alone now comes first and **`strug` moved from third to seventh**. Two doors
repointed. Reasoning in B1's file.

**2026-09-03, B18 built.** **"Why this one sticks"** — a thirteenth screen, offered from the
result and from a card in Your worries, never before somebody has a result of their own. Two
short paragraphs per worry in `content/why.js`: what the worry is underneath, and which safety
behaviour keeps it from being tested. **Keyed by worry id and nothing else** — the regulatory
line, and `validateWhy()` fails the build on a third field. A screen, not a modal, so `paint()`
handles focus and the announcement.

**2026-09-03, BETR is live at `https://betr.trybeup.com`** — cert to 2026-12-02, deploy green
end to end, and a full loop on the live address makes **19 requests, every one to
`betr.trybeup.com`**. Two surprises, both written up in B3: the TrybeUP nginx change **had
never been applied** (no `betr-nginx` branch ever existed), and **TrybeUP's nginx container
held a stale handle to its config**, so `nginx -t` and `-s reload` both reported success while
changing nothing. Fixed by recreating the container.

**Still true:** **Q1 (name, trademark, domain) is open** and blocks release. **Nobody outside
this building has read the twelve worries or the twelve explanations**, and **nobody who uses
a screen reader has touched the app** — those two are the live risks.

## 2. The next action

**There isn't a coding one.** B10 must not start until passkeys-in-a-Capacitor-webview is
settled (`capacitor://localhost` fails WebAuthn's origin check, and B5 allows no extra
plugins); B11 rests on an unchecked fact about Apple's CloudKit wording; B12–B14 need the
founder to amend rule 1 **in writing**; B16 waits for real users. **A session that opens should
ask the founder which of these five to move, not start B10.** All five block release:

- **Misha reads the twelve worries** — including the two new ones — the six labels in
  `whats-going-on.js`, and has the casting vote on `drink` (B0 Q2d). Sign-off boxes are at the
  bottom of B1's file. Then **one paid CBT-trained reviewer** reads the worries **and B18's
  twelve explanations together, in one pass**, for lane and wording. Never an endorsement.
  `why.js` is the file most at risk of echoing CCI or Getselfhelp wording; say so to them.
- **A real screen-reader pass on a real phone**, VoiceOver and TalkBack, by somebody who uses
  one daily. Worth more than every automated check here. Release condition in B15's file.
- **A PR on `trybeup/trybeup-prod`.** BETR's nginx block is on the droplet and **not** in that
  repo, and TrybeUP's deploy rsyncs `nginx.conf` from it whenever that file changes — so the
  next TrybeUP nginx change deletes BETR's block and the address goes dark. The same PR should
  add `betr.trybeup.com` to `renew-cert.yml`, which is the alarm that emails admins before a
  cert expires. **Also tell them their deploy has a live bug**: it reloads nginx inside the
  container, so if rsync ever changes `nginx.conf`'s inode the reload silently does nothing and
  the deploy still goes green.
- **J1, J2 and J3 walked on a real phone** against the live address (`docs/journeys.md`).
- **Somebody owns checking links and helplines each release** (`helplines.js` has
  `owner: null`, and the tests say so every run), and **Q1** — nothing ships unnamed.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | `python3 -m http.server 8760 --bind 127.0.0.1` from `web/`, then open `http://127.0.0.1:8760/`. Opening `web/index.html` off disk works too, but storage is unreliable for a `file:` page — serve it when testing persistence |
| Drive it for real | headless Chrome + CDP over plain `fetch`/`WebSocket`. **Viewport with `Emulation.setDeviceMetricsOverride`, never `--window-size`**; country with `Emulation.setTimezoneOverride`; **await the WebSocket handshake before the first `send()`**, `/json/new` needs `PUT`, and pick a free debugging port — another Electron app may hold 9222 |
| Live address | **`https://betr.trybeup.com` — live.** Cert expires 2026-12-02. Still a borrowed subdomain; a real domain waits on Q1 |

## 4. Gotchas, live

- **`node --test web/tests/` does not work on Node 22** — run it from the repo root.
  `harness.js` is the fake DOM; `boot(seed, { timeZone, languages })` is the phone it pretends
  to be (London, English). In its `vm`, **`instanceof Array` is unreliable** and there is **no
  `crypto`** — hence `store.rid()`'s `Math.random` fallback.
- **Every word a person reads is in `web/content/strings-en.js`**; a sentence back in `app.js`
  fails `i18n.test.js`, as does a `left:` or a `px` font size in `app.css`.
- **Every screen goes through `paint()`**: it appends the menu, moves focus to `#top` (how the
  heading gets read out) and speaks anything `say()` left. Setting `app.innerHTML` loses all
  three; the live region is only for what focus does *not* say, and a test keeps it empty on an
  ordinary screen change.
- **Content is `web/content/*.js`, not `.json`**, and `web/lib/*.js` are classic scripts: a
  browser will not fetch JSON or load an ES module off disk. A test may **read** content out of
  there, never restate it; and a locked-in test keeps its own copy of the words, so **clear
  storage** before checking a content edit in a browser.
- **A new field on the stored state goes in three places**: `blank()`, `normalise()`,
  `isEmpty()`. B17 missed the third and a person's country was thrown away. (A field on a
  *record* inside `done`/`open` is `normalise()` only.)
- **Storage is v3.** `rid` and `move` are B9's; `open`, `country` and `lang` came without a
  bump; the v1 `rate` migration must stay. **A ladder's rungs come from `g.rungs`, not
  `r.level`** — `series()` replays the taps where every result in it has a `move`, and falls
  back to the stored rung where any does not. Reading `r.level` in a renderer is the bug B9
  nearly shipped.
- **`content/zones.js` is generated, never hand-edited** (recipe in B17's file), and **no
  helpline number is written from memory** — off the provider's site that day, with the URL and
  the date, or leave the country out. **Sentence 7 names 988 and 116 123 inside itself**: frozen
  (research §10), the one country-wrong number there is, not a session's call.
- **Language and country are two separate questions**; no file couples them. **The ladder is one
  belief's grip** — no total, no average, no target, on screen and in what is read out.
  **`.kicker` is uppercase in CSS**, so `innerText` shouts. **`file:` is in the CSP source
  lists** so it works off disk; nginx drops it. **The guard blocks "bet"** — see Q1.
- **iPhone Safari deletes a page's storage after seven days unused** — install card and
  `navigator.storage.persist()` are in; the real fix is B5's native wrap (research §9.1).
- **A link is allowed; a request is not** — `menu.test.js` holds the allow-list. **"Improve
  your mental health"** is inside Illinois's definition of therapy services.
- **A person's own words go through `paras()` and wear `.wrote`** — they type into a textarea,
  so what they wrote can have line breaks in it.
- **`content/why.js` has two fields and no third** — the regulatory line, not a style rule:
  text everybody reads the same is a book, text picked for somebody is a device. It may never
  read `S.done`, a rung, a re-rate or a missed test. **`about` is taken** as a stage name (it
  maps old phones to Help), so the screen is `why`, and `whyId` is in memory not storage — a
  reload there drops to Your worries.

## 5. Decisions locked

> Everything in this repo landed on 2026-09-03: B15, B1, B17, B3, B9, the worry rework, B18.

The ten rules in `CLAUDE.md` — rule 3 names *worry*, rule 5 the ladder, rule 7 BETR and
capitalisation, rules 9 and 10 the B8 amendments. Q2, Q3, Q8. The nine sentences, verbatim.
**B15:** a small `web/lib/i18n.js`, not i18next; a frozen sentence is approved once per
language in B16; the crisis block stays English everywhere. **B9:** deduplication is in
`normalise()`, not `series()`. **B18:** an explanation is a screen, not a modal, keyed by
worry id and nothing else.
