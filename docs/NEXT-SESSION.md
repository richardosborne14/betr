# Start here

**Last refreshed:** 2026-09-01, on creating this repo.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**Scoped, prototyped, not built.** Betr was scoped in one session on 2026-09-01 after the
founder and Misha judged TrybeUP's men's-group gatekeeper outreach a dead end. Four prototypes
were built; the founder rejected three ("looks like an app", "have to learn it", "looks like an
AI chat") and approved the fourth: one big button, four taps and one sentence. It is frozen at
[`prototype/index.html`](../prototype/index.html).

The name is **Betr** (a bet on what will happen; it makes you better). Founder's call.

This repo was created the same day, private, after first deciding to build inside the TrybeUP
repo. That repo keeps a one-file pointer here.

## 2. The next action

**B0. Three answers from the founder and Misha, written into
[`tasks/B0-decisions-before-build.md`](tasks/B0-decisions-before-build.md):**

1. **Q1 · the name.** Trademark and domain search for Betr; Misha's read on the "bet" pun for a
   gambling-recovery reader; pun in copy or name only.
2. **Q2 · the stock list.** Fears first, with or without a "start from what's going on" door;
   how many; order; which of the twelve are wrong; who writes, who reviews.
3. **Q3 · custom entries.** v1 or v1.1 (recommended v1.1).

**Then B2 can start on the prototype's twelve items while B1 writes the real list.** B2 is
`web/`: the seven screens, content from `web/content/fears.json`, the guards, persistence,
install prompt, export, the small print, the build hash, and zero network after load. System
fonts only: the prototype's Google Fonts link is the first thing to remove.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; tests `node --test web/tests/`; no dependencies |
| Dev host (B3, not yet set up) | TrybeUP dev droplet, SSH alias `le-jibe`; target `betr.dev.trybeup.com`, `/var/www/betr-dev/`; needs its own deploy key and repo secrets |
| Production host | none yet; waits on Q1 (a domain) |
| Related repo | `trybeup/trybeup-prod` — the B6 bridge's server side, and the audience research |

## 4. Gotchas, live

- **iPhone Safari deletes a web page's storage after seven days unused.** Home-screen install
  and `navigator.storage.persist()` are v1 requirements, not polish. Research §9.1.
- **The habit-word guard blocks the word "bet".** Relevant to the name and to any copy using
  the pun. Q1.
- **Every worksheet phrase must be fresh.** The sources that look free (CCI, Getselfhelp,
  Therapist Aid) all forbid reuse in an app.
- **"Improve your mental health" is inside Illinois's definition of therapy services.** Never
  use it.
- **The recovery subreddits remove almost every "I built an app" post.** B7 is a reply first,
  and only after two weeks of membership.

## 5. Decisions locked

The ten rules in `CLAUDE.md`. Q8 (this repo). The seven-screen interface in scope §3. The
bridge to TrybeUP is gated on TrybeUP un-paywalling private groups on production (B6).

## 6. What changed last session

2026-09-01: research (`docs/research/10-…`), scope, four prototypes, task files B0–B7, this
repo. Nothing in `web/` yet.
