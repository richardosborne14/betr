# Start here

**Last refreshed:** 2026-09-02, after the founder tested v1 and three changes were made.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**v1 is built, amended once after the founder walked it, and tested. It has not been used on a
phone, and its words are still the prototype's.** Betr was scoped and prototyped on 2026-09-01;
`web/` was built on 2026-09-02 and amended the same day.

Eleven screens: the seven from scope §3, the second door, the three one-box screens for a
person's own entry, *your worries*, and *what this is*. 61 tests pass. No dependencies, no
build step, no requests after the page loads.

**The founder's three calls on 2026-09-02, after testing (all live in the build):**
- **"Fear" is now "worry"**, everywhere a person can see it and everywhere in the code —
  `content/worries.js`, `BETR_WORRIES`, the door key. Fear sounded scary. "Worry" was already
  the word in the nine sentences. **Misha still has the last word on tone.**
- **The re-rate moves a 1–10 ladder** instead of storing a fixed number. This was a bug, not a
  preference: the four words are relative, so three days of "a bit less sure" used to record
  the same number three times. Everything starts at 10; the tap is still one of four words.
- **A fifth, quiet option, *more sure than before***, chosen against the safer recommendation,
  because a ladder that can only fall is a nicer story than someone's week.
- **A *your worries* screen**: one card per belief, its ladder, what you wrote each time, and
  *test this again*. Nothing is combined across cards.

**Earlier, and still true:** both doors ship in v1 (**Misha must sign off the six surface-problem
labels before release**); a person's own entry ships in v1; **Q1 (name, trademark, domain) is
still open** and blocks release, not build.

## 2. The next action

**Two things, and they are not for a coding session:**

1. **Walk J1 and J2 on a phone.** `docs/journeys.md`. J2 is new and is the one that matters:
   the same worry three days running, watching the ladder come down. Until B3 there is no URL,
   so this means opening `web/index.html` on a laptop browser, or B3 first.
2. **B1: write the twelve items fresh.** The shape, the file and the tests are done; the words
   are the prototype's and are a placeholder. This is the unvalidated part of the product and
   the part that matters most. Then Misha, then one paid CBT reviewer.

**The next coding task is B3** (`docs/tasks/B3-hosting-and-deploy.md`), which carries four
corrections at the top that B2 forced. Read them before writing the workflow.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | open `web/index.html` in any browser. No server needed |
| See a screen without doing four loops | copy `web/` somewhere, add a `seed.js` that writes `localStorage['betr.v1']` before `app.js`, serve it over `python3 -m http.server` (storage is opaque over `file:`), screenshot with `--headless=new` |
| Dev host (B3, not yet set up) | TrybeUP dev droplet, SSH alias `le-jibe`; target `betr.dev.trybeup.com`, `/var/www/betr-dev/`; needs its own deploy key and repo secrets |
| Production host | none yet; waits on Q1 (a domain) |
| Related repo | `trybeup/trybeup-prod` — the B6 bridge's server side, and the audience research |

## 4. Gotchas, live

- **`node --test web/tests/` does not work on Node 22.** Use `node --test` from the repo root.
- **Content is `web/content/worries.js`, not `.json`.** A browser will not fetch JSON, or load
  an ES module, from a page opened off the filesystem, and that is how this gets looked at.
  Same reason `web/lib/*.js` are classic scripts with a small export shim.
- **The ladder is one belief's grip and must stay that way.** No total, no average across
  worries, no line, no target, no comparison between two beliefs. `rate.test.js` fails the
  build if the words "average", "total", "score", "streak" or "target" appear in `rate.js`.
- **Storage is at version 2.** Version 1 results carry `rate` (80/55/30/10) and are moved onto
  the nearest rung on load. Do not delete that migration until nothing in the world has v1 data.
- **`--window-size` is not the CSS viewport in headless Chrome.** Layout came out ~110px wider
  than asked, which looks exactly like an overflow bug. Check an unchanged screen first.
- **`file:` is in the CSP source lists** so the page works when opened off disk. B3's header
  drops it — and must not carry `'unsafe-inline'` for scripts, because there is no inline script.
- **iPhone Safari deletes a web page's storage after seven days unused.** The install card and
  `navigator.storage.persist()` are in, but the real fix is B5's native wrap. Research §9.1.
- **The habit-word guard blocks the word "bet"** in a person's own test. Correct, and relevant
  to Q1: it does not block "Betr", which is tested.
- **Every worksheet phrase must be fresh.** CCI, Getselfhelp and Therapist Aid all forbid reuse.
- **"Improve your mental health" is inside Illinois's definition of therapy services.** Never.
- **The recovery subreddits remove almost every "I built an app" post.** B7 is a reply first,
  and only after two weeks of membership.

## 5. Decisions locked

The ten rules in `CLAUDE.md` (rule 3 now names the word *worry*; rule 5 now covers the ladder).
Q2, Q3, Q8. The interface in scope §3. The nine sentences from research §10, verbatim and
unedited, in `app.js`. The bridge to TrybeUP is gated on TrybeUP un-paywalling private groups
on production (B6).

## 6. What changed last session

2026-09-02, part one: B0 Q2 and Q3 answered; `web/` built — ten screens, both guards,
persistence, install prompt, export, delete, the CSP, the icons, the manifest,
`tools/build-hash.js`, 47 tests.

2026-09-02, part two, after the founder tested it: the belief ladder (`lib/rate.js` rewritten,
store at v2 with a migration), *more sure than before*, the *your worries* screen, the result
screen showing this belief's ladder in place of the flat "Earlier" list, and "fear" → "worry"
across the app, the content, the tests and the docs. 14 new tests, 61 in all. J2 added to
`docs/journeys.md`; B2 carries the amendment in full; two new entries in `docs/learnings.md`.
