# Start here

**Last refreshed:** 2026-09-03, after B17 gave the crisis block a country.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**v1 is built, amended four times, and driven in a real browser. It has not been used on a
phone, and its words are still the prototype's.** Twelve screens, **89 tests**, no
dependencies, no build step, no requests after the page loads. Earlier amendments: *worry*
everywhere and the **1–10 ladder** (09-02); the **BETR** wordmark and nothing all-lowercase
that a person taps, then **B8** — three plain words on every screen, a locked-in test that
waits for you, and Help (09-03).

**2026-09-03, B17 — built this session.** BETR was showing 988 and Samaritans 116 123 to
everybody on earth; somebody in Lagos got two numbers that do not ring there. **The crisis
block now names one country's line.** Thirteen countries have one; every other country is told
plainly that nobody has checked one and **is shown no number at all** — never a neighbour's,
never 988 because it is the one we have. The same block sits under a self-harm refusal, which
is where it matters most, and `guards.js` no longer holds a phone number at all.

**How it knows:** a country the person picked, else the phone's time zone (`content/zones.js`,
generated from the IANA database), else a language tag's region, else nothing. **No request, no
permission prompt, no Geolocation, ever.** One tap says where you really are: every country,
alphabetical, named by the browser's own `Intl.DisplayNames`. Nothing else in BETR varies by
country, and a test compares the whole of Help to keep it that way.
**`content/helplines.js`** carries, per line, the provider's own page and the day a person read
the number there. **Nothing in it was written from memory.**

**Still true:** both doors and a person's own entry ship in v1; **Q1 (name, trademark,
domain) is open** and blocks release.

## 2. The next action

Two tracks: this file is the main line, `docs/TRACK-reach.md` is the second and says what is
next on it (**B15**, words out of the code). **Main line, and this is the product:**

1. **B1: write the twelve items fresh** — `docs/tasks/B1-the-stock-list.md`. The shape and the
   tests are done; the words are the prototype's. Then Misha, then one paid CBT reviewer.
2. **B3: hosting** — `docs/tasks/B3-hosting-and-deploy.md`, four corrections at its top that B2
   forced. Do this when a URL is needed to put BETR in front of anyone.

A session can start on B1 with this:

> Read `CLAUDE.md`, then `docs/NEXT-SESSION.md`, then `docs/tasks/B1-the-stock-list.md`, and
> write the twelve worries fresh. Every phrase from nothing — CCI, Getselfhelp, Therapist Aid,
> Psychology Tools and the Beck Institute all forbid reuse, and `content.test.js` will not catch
> a borrowed sentence. Keep the six parts, the lanes and the ids exactly as they are: stored
> results point at the ids. The first three get most of the taps, so make them the easiest to
> succeed at, and no test may touch the habit itself. Then `node --test`, update the task file,
> and rewrite this file.

**Reach track:** B15, words out of the code. `docs/TRACK-reach.md` has the prompt.

**Not for a coding session, and blocking release:**

- **Walk J1, J2 and J3 on a phone.** `docs/journeys.md`. J3 matters most: the menu on a short
  screen, a test that survives *New worry* and a restart, tapping the crisis number, and the
  country list under a thumb.
- **Misha signs off the Help link list** (`places.js`, `signedOff: false`), the six
  surface-problem labels, and now **which countries get a helpline**.
- **Somebody owns checking the links and the helpline numbers at each release.**
  `helplines.js` has `owner: null` and the tests say so on every run. Nothing in BETR can check
  either at runtime, by design.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | `python3 -m http.server 8760 --bind 127.0.0.1` from `web/`, then `open http://127.0.0.1:8760/`. Opening `web/index.html` directly works, but browsers are unreliable about storage for a `file:` page, so serve it when testing persistence |
| Drive it for real | headless Chrome + CDP over plain `fetch`/`WebSocket`. **Viewport with `Emulation.setDeviceMetricsOverride`, never `--window-size`**; country with `Emulation.setTimezoneOverride` |
| Dev host (B3, not set up) | TrybeUP dev droplet, SSH alias `le-jibe`; target `betr.dev.trybeup.com`, `/var/www/betr-dev/` |
| Production host | none yet; waits on Q1 (a domain). Related repo `trybeup/trybeup-prod` |

## 4. Gotchas, live

- **`node --test web/tests/` does not work on Node 22.** Use `node --test` from the repo root.
  `web/tests/harness.js` is the shared fake DOM, and node does not pick it up as a test file.
  `boot(seed, { timeZone, languages })` is the phone it pretends to be; it defaults to London.
- **Content is `web/content/*.js`, not `.json`**, and `web/lib/*.js` are classic scripts: a
  browser will not fetch JSON or load an ES module from a page opened off disk.
- **Every screen goes through `paint()`.** It appends the menu. Setting `app.innerHTML` directly
  from a screen loses the menu; setting it twice kills the handlers the screen just wired.
- **A new field on the stored state goes in three places**, not one: `blank()`, `normalise()`
  and `isEmpty()`. B17 missed the third and a person's chosen country was thrown away.
- **`content/zones.js` is generated, never hand-edited.** The recipe is in the B17 task file.
- **No helpline number is ever written from memory.** Read it off the provider's own site that
  day and record the URL and the date, or leave the country out — the app handles absence
  honestly, and that is the safe answer every time.
- **Sentence 7 still names 988 and 116 123 inside itself.** Frozen (research §10), and now the
  one place a country-wrong number appears. Flagged in the B17 task file; not a session's call.
- **The ladder is one belief's grip.** No total, no average across worries, no line, no target.
- **Storage is at version 2**; `S.open` and `S.country` were added without a bump. Don't delete
  the v1 `rate` migration. **`.kicker` is uppercase in CSS**, so `innerText` shouts.
- **`file:` is in the CSP source lists** so the page works off disk; B3's header drops it and
  must not carry `'unsafe-inline'` for scripts. **The habit-word guard blocks "bet"** in a
  person's own test — correct, and relevant to Q1.
- **iPhone Safari deletes a web page's storage after seven days unused.** The install card and
  `navigator.storage.persist()` are in; the real fix is B5's native wrap. Research §9.1.
- **A link is allowed; a request is not.** `menu.test.js` holds the allow-list; the diallable
  numbers come from `helplines.js`, so adding a country still shows up in a diff.
  **"Improve your mental health"** is inside Illinois's definition of therapy services. Never.

## 5. Decisions locked

The ten rules in `CLAUDE.md` — rule 3 names *worry*, rule 5 the ladder, rule 7 BETR and
capitalisation, rules 9 and 10 the B8 amendments. Q2, Q3, Q8. The nine sentences, verbatim.

## 6. What changed last session

2026-09-03: **B17 built** on the reach track — `content/zones.js`, `content/helplines.js` and
`lib/where.js` are new, the crisis block became four layers, `guards.js` lost its phone numbers
and `store.js` learned about `country`. 78 tests became 89, one of which caught a real bug in
`isEmpty`. The nine planning docs for the reach track were committed first (`05a9e47`).

France got away: 3114 is almost certainly right and is still not shipped, because the provider's
page would not load that day and "almost certainly" is not the standard that file holds. India,
Singapore and Kenya failed the same way; eight more were not attempted. `notShipped` names them.
