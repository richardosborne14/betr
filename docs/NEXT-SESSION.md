# Start here

**Last refreshed:** 2026-09-02, after building v1 in `web/`.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**v1 is built and tested. It has not been looked at on a phone, and its words are still the
prototype's.** Betr was scoped and prototyped on 2026-09-01; on 2026-09-02 the founder answered
two of the three B0 questions and `web/` was built from the frozen prototype.

Ten screens: the seven from scope §3, the second door, the three one-box screens for a person's
own entry, and *what this is*. 47 tests pass. No dependencies, no build step, no requests after
the page loads.

**The founder answered B0 Q2 and Q3 on 2026-09-02, both the bigger way:**
- **Both doors in v1.** Fears first, plus *Not sure which? Start from what's going on*, six
  surface problems. **Misha must sign off those six labels before release** — that screen is
  the closest thing in Betr to the regulatory line.
- **A person's own entry in v1**, against the scope's own recommendation of v1.1. Built as
  three screens of one box each, with both guards.
- **"Not drinking at a social thing" stays.** Its test was reworded to "order something soft"
  so it contains no habit word.
- **Q1 (the name, trademark, domain) is still open.** It blocks release, not build.

## 2. The next action

**Two things, and they are not for a coding session:**

1. **Walk J1 on a phone.** `docs/journeys.md`, 25 steps. Until B3 exists there is no URL, so
   this means opening `web/index.html` on a laptop browser, or B3 first.
2. **B1: write the twelve items fresh.** The shape, the file and the tests are done; the words
   are the prototype's and are a placeholder. This is the unvalidated part of the product and
   the part that matters most. Then Misha, then one paid CBT reviewer.

**The next coding task is B3** (`docs/tasks/B3-hosting-and-deploy.md`), which now carries four
corrections at the top that B2 forced. Read them before writing the workflow.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | open `web/index.html` in any browser. No server needed |
| Dev host (B3, not yet set up) | TrybeUP dev droplet, SSH alias `le-jibe`; target `betr.dev.trybeup.com`, `/var/www/betr-dev/`; needs its own deploy key and repo secrets |
| Production host | none yet; waits on Q1 (a domain) |
| Related repo | `trybeup/trybeup-prod` — the B6 bridge's server side, and the audience research |

## 4. Gotchas, live

- **`node --test web/tests/` does not work on Node 22.** Use `node --test` from the repo root.
- **Content is `web/content/fears.js`, not `fears.json`.** A browser will not fetch JSON, or
  load an ES module, from a page opened off the filesystem, and that is how this gets looked
  at. Still one plain array, edited exactly as JSON would be. Same reason `web/lib/*.js` are
  classic scripts with a small export shim.
- **`file:` is in the CSP source lists** so the page works when opened off disk. Over https a
  `file:` URL cannot be loaded at all, so it grants nothing on the real site. B3's header
  drops it — and must not carry `'unsafe-inline'` for scripts, because there is no inline
  script anywhere.
- **iPhone Safari deletes a web page's storage after seven days unused.** The install card and
  `navigator.storage.persist()` are in, but the real fix is B5's native wrap. Research §9.1.
- **The habit-word guard blocks the word "bet"** in a person's own test. Correct, and relevant
  to Q1: it does not block "Betr", which is tested.
- **Every worksheet phrase must be fresh.** CCI, Getselfhelp and Therapist Aid all forbid reuse.
- **"Improve your mental health" is inside Illinois's definition of therapy services.** Never.
- **The recovery subreddits remove almost every "I built an app" post.** B7 is a reply first,
  and only after two weeks of membership.

## 5. Decisions locked

The ten rules in `CLAUDE.md`. Q2, Q3, Q8. The interface in scope §3. The nine sentences from
research §10, verbatim and unedited, in `app.js`. The bridge to TrybeUP is gated on TrybeUP
un-paywalling private groups on production (B6).

## 6. What changed last session

2026-09-02: B0 Q2 and Q3 answered. `web/` built — ten screens, both guards, persistence,
install prompt, export, delete, the CSP, the icons, the manifest. `tools/build-hash.js`.
47 tests in six files including a fake-DOM walk of the whole loop, which found a real
navigation bug. `docs/journeys.md` written. B1, B2, B3, B4 task files updated; CLAUDE.md's
test command and content filename corrected; six new entries in `docs/learnings.md`.
