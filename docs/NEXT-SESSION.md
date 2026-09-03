# Start here

**Last refreshed:** 2026-09-03, after B8 was built and the founder asked for a CBT primer.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**v1 is built, amended three times, and driven in a real browser. It has not been used on a
phone, and its words are still the prototype's.** Scoped and prototyped 2026-09-01, built
2026-09-02, amended 2026-09-02 (the ladder), 2026-09-03 (the brand) and 2026-09-03 (B8).

Eleven screens, **78 tests**, no dependencies, no build step, no requests after the page loads.

**2026-09-02:** "fear" became **worry** everywhere; the re-rate moves a **1–10 ladder** instead
of storing a fixed number; **Your worries** was added. **2026-09-03, morning:** the wordmark is
**BETR**, all caps, and no label a person taps is all-lowercase. Both guarded by tests.

**2026-09-03, B8 — built this session:**
- **Three plain words on every screen**: *Your worries · New worry · Help*. No icons, no
  selected state, no badges, no counts, no fourth item. Measured at 320×568: nothing covers the
  big button on any screen.
- **A test you locked in waits for you.** `S.open`, no cap, nothing counts them. Parking is in
  `go()`, so it holds for every way out of the loop, not just *New worry*. The front screen
  shows one line; Your worries carries them on their cards, with **Done it** / **Didn't get
  to it**.
- **Help** replaced *What this is*: crisis lines first, then the CBT primer, then the nine
  sentences, the airplane proof, export/delete, other places, who made this, the build hash.
- **The crisis numbers dial.** 988 and 116 123 are `tel:` links, findahelpline.com is a link —
  on Help and in the refusal after a self-harm test. The words are untouched; a test strips the
  tags off and compares sentence 7 character for character.
- **`web/content/places.js`** is new and holds every link. TrybeUP is in it, second in its
  group, saying we made it and what it costs. It is a **placeholder until Misha signs it off**.

**Still true:** both doors ship in v1 (**Misha must sign off the six surface-problem labels**);
a person's own entry ships in v1; **Q1 (name, trademark, domain) is open** and blocks release.

## 2. The next action

**Two coding tasks are open, and neither is urgent enough to jump the phone walk.**

1. **B1: write the twelve items fresh** — `docs/tasks/B1-the-stock-list.md`. The shape and the
   tests are done; the words are the prototype's. Then Misha, then one paid CBT reviewer. This
   is the product; everything else is plumbing.
2. **B3: hosting** — `docs/tasks/B3-hosting-and-deploy.md`, four corrections at its top that B2
   forced. Do this when a URL is needed to put BETR in front of anyone.

A session can start on B1 with this:

> Read `CLAUDE.md`, then `docs/NEXT-SESSION.md`, then `docs/tasks/B1-the-stock-list.md`, and
> write the twelve worries fresh. Every phrase from nothing — CCI, Getselfhelp, Therapist Aid,
> Psychology Tools and the Beck Institute all forbid reuse, and `content.test.js` will not catch
> a borrowed sentence. Keep the six parts, the lanes and the ids exactly as they are: stored
> results point at the ids. The first three get most of the taps, so they must be the easiest to
> succeed at. No test may touch the habit itself — the guard enforces that, but the writing is
> the point. Then `node --test`, update the task file, and rewrite this file.

**Not for a coding session, and blocking release:**

- **Walk J1, J2 and J3 on a phone.** `docs/journeys.md`. **J3 matters most right now**: the
  menu on a short screen, a test that survives *New worry* and a restart, and tapping 988.
- **Misha signs off the Help link list** (`places.js`, `signedOff: false`) and the six
  surface-problem labels.
- **Somebody owns checking the links at each release.** Nothing in BETR can check them at
  runtime, by design, and a dead link in a mental-health app is a real harm.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | `python3 -m http.server 8760 --bind 127.0.0.1` from `web/`, then `open http://127.0.0.1:8760/`. Opening `web/index.html` directly works too, but browsers are unreliable about saving anything for a `file:` page, so serve it when testing persistence |
| Drive it for real | headless Chrome + CDP over plain `fetch`/`WebSocket`, no dependencies. **Set the viewport with `Emulation.setDeviceMetricsOverride`, never `--window-size`** |
| Dev host (B3, not set up) | TrybeUP dev droplet, SSH alias `le-jibe`; target `betr.dev.trybeup.com`, `/var/www/betr-dev/` |
| Production host | none yet; waits on Q1 (a domain) |
| Related repo | `trybeup/trybeup-prod` — the B6 bridge's server side, and the audience research |

## 4. Gotchas, live

- **`node --test web/tests/` does not work on Node 22.** Use `node --test` from the repo root.
  `web/tests/harness.js` is the shared fake DOM; node does not pick it up as a test file.
- **Content is `web/content/*.js`, not `.json`.** A browser will not fetch JSON, or load an ES
  module, from a page opened off disk — same reason `web/lib/*.js` are classic scripts.
- **Every screen goes through `paint()`.** It appends the menu. Setting `app.innerHTML` directly
  from a screen loses the menu; setting it twice kills the handlers the screen just wired.
- **The ladder is one belief's grip.** No total, no average across worries, no line, no target.
- **Storage is at version 2**; `S.open` was added without a bump (an older state just has no
  `open`). Don't delete the v1 `rate` migration.
- **`--window-size` is not the CSS viewport in headless Chrome.** It has now lied twice.
- **`.kicker` is `text-transform: uppercase`**, so `innerText` returns "HERE'S YOUR TEST".
- **`file:` is in the CSP source lists** so the page works off disk. B3's header drops it, and
  must not carry `'unsafe-inline'` for scripts.
- **iPhone Safari deletes a web page's storage after seven days unused.** The install card and
  `navigator.storage.persist()` are in; the real fix is B5's native wrap. Research §9.1.
- **The habit-word guard blocks "bet"** in a person's own test. Correct, and relevant to Q1.
- **A link is allowed; a request is not.** Links are inert until tapped, and nothing may be
  fetched to support one. `menu.test.js` holds the allow-list; `tel:` is the two crisis numbers.
- **Every worksheet phrase must be fresh.** We link to CCI and Getselfhelp; we take no words
  from them, and linking to them does not change that.
- **"Improve your mental health" is inside Illinois's definition of therapy services.** Never.

## 5. Decisions locked

The ten rules in `CLAUDE.md` — rule 3 names the word *worry*, rule 5 covers the ladder, rule 7
covers BETR and capitalisation, and rules 9 and 10 carry the B8 amendments with their
conditions. Q2, Q3, Q8. The nine sentences from research §10, verbatim, in `app.js`.

## 6. What changed last session

2026-09-03: **B8 built** — the menu, tests that wait for you, Help, and `places.js`. 63 tests
became 78. The fake DOM moved to `web/tests/harness.js`. J3 written; J1 and J2 updated for the
menu. `CLAUDE.md`'s repo section now says where links live and what a link may be.

Mid-build the founder asked for **one clear thing to read about CBT in Help** — "either from the
official CBT website stuff, or our own explanation of why this app exists and why it uses CBT,
or both". It is both: three short paragraphs written fresh, second on the screen, above all the
small print, with the NHS's and BABCP's own pages under them. The crisis block is still first,
which is the part of B8's order that was load-bearing.

Then they asked for the emergency numbers to be tappable, so they are — and on the way past,
both guard refusals turned out to still say "Betr" rather than BETR. The wordmark test only
swept the screens a happy path reaches; it now walks the refusals too.
