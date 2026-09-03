# Start here

**Last refreshed:** 2026-09-03, after the founder ran v1 in a browser and asked for a menu.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**v1 is built, amended twice, and tested in a real browser. It has not been used on a phone,
and its words are still the prototype's.** Scoped and prototyped 2026-09-01, built 2026-09-02,
amended 2026-09-02 (the ladder) and 2026-09-03 (the brand and capitalisation).

Eleven screens, 63 tests, no dependencies, no build step, no requests after the page loads.

**2026-09-02, after the founder walked it:** "fear" became **worry** everywhere, in the app and
in the code. The re-rate now moves a **1–10 ladder** instead of storing a fixed number — that
was a bug, not a preference: the four words are relative, so three days of "a bit less sure"
used to record the same number three times. A fifth, quiet **"more sure than before"** was added
against the safer recommendation. **Your worries** was added: one card per belief, its ladder,
what was written each time, and *Test this again*.

**2026-09-03, after the founder ran it:** the wordmark is **BETR**, all caps, everywhere a
person reads it, and **no label a person taps is all-lowercase** any more. Both are guarded by
tests. And **B8 was written** — see below. It is the next build.

**Still true:** both doors ship in v1 (**Misha must sign off the six surface-problem labels
before release**); a person's own entry ships in v1; **Q1 (name, trademark, domain) is open**
and blocks release, not build.

## 2. The next action

**B8, `docs/tasks/B8-the-menu-and-help.md`.** A permanent row of three at the bottom of every
screen — *Your worries · New worry · Help* — and a Help screen that absorbs *What this is* and
adds crisis lines first, then places to go that we don't run. The founder took five decisions on
2026-09-03: the menu's shape, the second-person voice, TrybeUP's place in Help, that a locked-in
test waits rather than being replaced, and — after asking what the research said — that there is
**no cap** on how many worries are on the go. All five are in the task file, with the two
CLAUDE.md rules this amends (rule 10's no-tab-bar, rule 9's TrybeUP gate) and their conditions.

A session can start on it with this:

> Read `CLAUDE.md`, then `docs/NEXT-SESSION.md`, then `docs/tasks/B8-the-menu-and-help.md`, and
> build B8. The five decisions in the task file are taken; don't reopen them for taste. If the
> research contradicts one, bring it to the founder with the source — that is how the cap on
> open tests came out.
>
> The parts that need care, in order: the menu must not cover the big button on a short phone;
> a locked-in test must survive *New worry* and reappear on the front screen and in Your
> worries, with **no cap** on how many are open and no count, badge or "overdue" anywhere; Help
> must open with wifi off, with the crisis block above everything else; and every external link
> must be plain https, no parameters, with nothing fetched at runtime to support it — no
> favicons, no previews, no link checking.
>
> Don't write the link list itself beyond a placeholder shape: Misha signs that off, and the
> "doing it with other people" group is the one that most needs him. Then tests, the phone walk
> (add J3), update the task file, `docs/learnings.md` and this file, and commit and push `main`.

**Two things that are not for a coding session and are still open:**

1. **Walk J1 and J2 on a phone.** `docs/journeys.md`. J2 is the one that matters: the same
   worry three days running, watching the ladder come down.
2. **B1: write the twelve items fresh.** The shape, the file and the tests are done; the words
   are the prototype's and are a placeholder. Then Misha, then one paid CBT reviewer.

**B3 (hosting) is still the other coding task**, and carries four corrections at its top that
B2 forced. B8 before B3 unless a URL is suddenly needed.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | `python3 -m http.server 8760 --bind 127.0.0.1` from `web/`, then `open http://127.0.0.1:8760/`. Opening `web/index.html` directly also works, but browsers are unreliable about saving anything for a `file:` page, so serve it when testing persistence |
| Drive it for real | headless Chrome + CDP over plain `fetch`/`WebSocket` in Node 22, no dependencies: `--remote-debugging-port`, then `Runtime.evaluate` to click and read `innerText`. The only way to prove localStorage across loops |
| Dev host (B3, not set up) | TrybeUP dev droplet, SSH alias `le-jibe`; target `betr.dev.trybeup.com`, `/var/www/betr-dev/` |
| Production host | none yet; waits on Q1 (a domain) |
| Related repo | `trybeup/trybeup-prod` — the B6 bridge's server side, and the audience research |

## 4. Gotchas, live

- **`node --test web/tests/` does not work on Node 22.** Use `node --test` from the repo root.
- **Content is `web/content/worries.js`, not `.json`.** A browser will not fetch JSON, or load
  an ES module, from a page opened off disk — same reason `web/lib/*.js` are classic scripts.
- **The ladder is one belief's grip.** No total, no average across worries, no line, no target.
  `rate.test.js` fails the build if those words appear in `rate.js`.
- **Storage is at version 2.** Version 1 results carry `rate` (80/55/30/10) and are moved onto
  the nearest rung on load. Don't delete that migration.
- **Headless Chrome lies twice.** `.kicker` is `text-transform: uppercase`, so `innerText`
  returns "HERE'S YOUR TEST"; and `--window-size` is not the CSS viewport — layout came out
  ~110px wider than asked, which looks exactly like an overflow bug until you check an
  unchanged screen.
- **`file:` is in the CSP source lists** so the page works off disk. B3's header drops it, and
  must not carry `'unsafe-inline'` for scripts.
- **iPhone Safari deletes a web page's storage after seven days unused.** The install card and
  `navigator.storage.persist()` are in; the real fix is B5's native wrap. Research §9.1.
- **The habit-word guard blocks "bet"** in a person's own test. Correct, and relevant to Q1.
- **Every worksheet phrase must be fresh.** CCI, Getselfhelp and Therapist Aid all forbid reuse.
  B8 links to them; it takes no words from them.
- **"Improve your mental health" is inside Illinois's definition of therapy services.** Never.

## 5. Decisions locked

The ten rules in `CLAUDE.md` — rule 3 names the word *worry*, rule 5 covers the ladder, rule 7
covers BETR and capitalisation, and rules 9 and 10 carry the B8 amendments with their
conditions. Q2, Q3, Q8. The nine sentences from research §10, verbatim, in `app.js`.

## 6. What changed last session

2026-09-03: ran v1 in a real browser and drove a four-loop walk over CDP (the ladder went
10 → 9 → 8 → 5, then 6 on "more sure than before"; the second worry stayed its own ladder;
persistence survived a reload). BETR became the wordmark; every tapped label was capitalised;
two guard tests added, 63 in all. `docs/tasks/B8-the-menu-and-help.md` written and the two
CLAUDE.md rules it amends updated in place.

Then the founder asked what the research said about running more than one experiment at a time,
and **the cap of three open tests came out of B8**. It was invented, not sourced, and the
evidence points the other way: completed experiments moderated improvement (Mindable, §3.3), and
self-guided dropout runs 5–45% with 38% never finishing session one in one trial (Cuijpers 2011,
§3.1). The risk is stopping, not doing too much. What replaced the cap is a rule about display,
marked INFERRED in the task file: no count, no badge, no "overdue", no tally on the front screen.
