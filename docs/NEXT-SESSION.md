# Start here

**Last refreshed:** 2026-09-03, after B1 gave BETR its own words.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**v1 is built, amended five times, and now says what we wrote rather than what the prototype
said.** Twelve screens, **89 tests**, no dependencies, no build step, no requests after the
page loads. Earlier amendments: *worry* everywhere and the **1–10 ladder** (09-02); the
**BETR** wordmark and nothing all-lowercase that a person taps; **B8** — three plain words on
every screen, a locked-in test that waits for you, and Help; **B17** — the crisis block names
the country you are actually in.

**2026-09-03, B1 — built this session, and it is the product.** All twelve worries rewritten
fresh: label, belief, expect, test and drop, every one of them. **Ids, order, lanes and the
six-field shape are untouched** — stored results point at those ids, and the easy three still
come first. Three things now hold for every item, and they are written into the head of
`worries.js`: the `expect` is small enough to be true (a pause, a face, being *quietly filed
under people who can't cope*), every `test` ends in something the person can observe and
report in one sentence, and every `drop` names the crutch as the thing they would actually do.

**Two changes the founder should look at.** `drink`'s button now reads **"Being the only one
not joining in"** rather than "Not drinking at a social thing" — B0 Q2d's own reasoning is
that the fear is about being noticed, and the old label named the drink on a button. And
`rest`'s belief ends **"then I'm being lazy"**, not "then I'm worthless": the belief has to be
the person's own word or the re-rate means nothing. Both are one line to put back.

**Still true:** both doors and a person's own entry ship in v1; **Q1 (name, trademark, domain)
is open** and blocks release. The list is written but **nobody outside this building has read
it** — that is the whole remaining risk in B1.

## 2. The next action

Two tracks: this file is the main line, `docs/TRACK-reach.md` is the second and says what is
next on it (**B15**, words out of the code — and its one open question was answered this
session: **no i18next**, write the small module). **Main line:**

1. **B3: hosting** — `docs/tasks/B3-hosting-and-deploy.md`, four corrections at its top that
   B2 forced. This is now the next build task on the main line, because everything else
   outstanding needs a person rather than a session, and every one of those people needs a URL.
2. **B1's remaining two steps are not a coding session.** Misha, then one paid CBT reviewer.

A session can start on B3 with this:

> Read `CLAUDE.md`, then `docs/NEXT-SESSION.md`, then `docs/tasks/B3-hosting-and-deploy.md`
> including the four corrections at the top, and put BETR on `betr.dev.trybeup.com`.
> The dev droplet is `le-jibe`. **Every write to nginx, `/var/www/` or `/opt/` is confirmed
> with the founder first, every time**, and `dev.trybeup.com` must still work afterwards —
> check it. The CSP header drops `file:` and must not carry `'unsafe-inline'` for scripts.

**Reach track:** B15, words out of the code. `docs/TRACK-reach.md` has the prompt.

**Not for a coding session, and blocking release:**

- **Misha reads the twelve**, the six surface-problem labels in `whats-going-on.js`, and has
  the casting vote on `drink` (B0 Q2d). Sign-off boxes are at the bottom of the B1 task file.
- **One paid CBT-trained reviewer** reads it once for lane and wording. Never an endorsement.
- **Walk J1, J2 and J3 on a phone.** `docs/journeys.md`. J3 matters most: the menu on a short
  screen, a test that survives *New worry* and a restart, tapping the crisis number, and the
  country list under a thumb.
- **Somebody owns checking the links and the helplines at each release.** `helplines.js` has
  `owner: null` and the tests say so on every run.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | `python3 -m http.server 8760 --bind 127.0.0.1` from `web/`, then `open http://127.0.0.1:8760/`. Opening `web/index.html` directly works, but browsers are unreliable about storage for a `file:` page, so serve it when testing persistence |
| Drive it for real | headless Chrome + CDP over plain `fetch`/`WebSocket`. **Viewport with `Emulation.setDeviceMetricsOverride`, never `--window-size`**; country with `Emulation.setTimezoneOverride`; **await the WebSocket handshake before the first `send()`**, and `/json/new` needs `PUT` |
| Dev host (B3, not set up) | TrybeUP dev droplet, SSH alias `le-jibe`; target `betr.dev.trybeup.com`, `/var/www/betr-dev/` |
| Production host | none yet; waits on Q1 (a domain). Related repo `trybeup/trybeup-prod` |

## 4. Gotchas, live

- **`node --test web/tests/` does not work on Node 22.** Use `node --test` from the repo root.
  `web/tests/harness.js` is the shared fake DOM, and node does not pick it up as a test file.
  `boot(seed, { timeZone, languages })` is the phone it pretends to be; it defaults to London.
- **Content is `web/content/*.js`, not `.json`**, and `web/lib/*.js` are classic scripts: a
  browser will not fetch JSON or load an ES module from a page opened off disk.
- **A test may read content out of `web/content/`; it may never restate it.** B1 broke three
  assertions that had worry labels typed into them. Misha's pass will change those words again.
- **A locked-in test keeps its own copy of the words.** Results and waiting tests snapshot
  their strings and only point at the id, so nothing changes under a person mid-test. When
  checking a content edit in a browser, **clear storage first** or you are seeing old words.
- **Every screen goes through `paint()`.** It appends the menu. Setting `app.innerHTML` directly
  from a screen loses the menu; setting it twice kills the handlers the screen just wired.
- **A new field on the stored state goes in three places**, not one: `blank()`, `normalise()`
  and `isEmpty()`. B17 missed the third and a person's chosen country was thrown away.
- **`content/zones.js` is generated, never hand-edited.** The recipe is in the B17 task file.
- **No helpline number is ever written from memory.** Read it off the provider's own site that
  day and record the URL and the date, or leave the country out.
- **Sentence 7 still names 988 and 116 123 inside itself.** Frozen (research §10), and the one
  place a country-wrong number appears. Flagged in the B17 task file; not a session's call.
- **The ladder is one belief's grip.** No total, no average across worries, no line, no target.
- **Storage is at version 2**; `S.open` and `S.country` were added without a bump. Don't delete
  the v1 `rate` migration. **`.kicker` is uppercase in CSS**, so `innerText` shouts.
- **`file:` is in the CSP source lists** so the page works off disk; B3's header drops it and
  must not carry `'unsafe-inline'` for scripts. **The habit-word guard blocks "bet"** in a
  person's own test — correct, and relevant to Q1.
- **iPhone Safari deletes a web page's storage after seven days unused.** The install card and
  `navigator.storage.persist()` are in; the real fix is B5's native wrap. Research §9.1.
- **A link is allowed; a request is not.** `menu.test.js` holds the allow-list.
  **"Improve your mental health"** is inside Illinois's definition of therapy services. Never.

## 5. Decisions locked

The ten rules in `CLAUDE.md` — rule 3 names *worry*, rule 5 the ladder, rule 7 BETR and
capitalisation, rules 9 and 10 the B8 amendments. Q2, Q3, Q8. The nine sentences, verbatim.
**New, 2026-09-03:** B15 uses a ~60-line `web/lib/i18n.js`, not i18next. Founder's call.

## 6. What changed last session

2026-09-03: **B1 built** — `content/worries.js` rewritten end to end, the twelve items in the
audience's own voice (research §8's language bank). `docs/00-scope.md` §5.1 now points at the
file rather than holding stale words; `docs/journeys.md` step 3 follows the new drop line.
Three tests stopped hardcoding labels. 89 tests still green, and the whole loop was driven at
390×844 in a real browser. B17 shipped earlier the same day on the reach track (`9dbbaf5`).
