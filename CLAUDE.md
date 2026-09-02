# Betr — Claude Code Guide

Read automatically at the start of every session. Follow it without exception.

## Read these first, in this order

1. **`docs/NEXT-SESSION.md`** — where we are, the next action, live traps. Rewritten every session.
2. **`docs/00-scope.md`** — what Betr is and isn't. Its §9 holds the open questions.
3. **`docs/research/10-cbt-gateway-approach.md`** — the clinical, legal and ethical shape. Sourced. Do not re-argue it; if something seems wrong, bring it to the founder with the source.
4. **`docs/tasks/`** — the task you are on, and the ones before it.
5. **`docs/learnings.md`** — what has already gone wrong.

## Who you are working with

**The founder is not a developer.** Plain language, no jargon. Never ask them to run a command
or edit a file; do it. When a decision is theirs, lay out the options simply and let them
choose. Misha is the co-decider on anything about the audience, the list, or the tone.

## The rules that never bend

These come from the research and the scope. They are product rules, legal rules and trust
rules at once, and every one of them has failed in some other product.

1. **Nothing leaves the phone.** No account, no server, no analytics, no crash reporter, no
   push, no CDN fonts, no third-party script, no request of any kind after the page loads.
   The sentence "nothing is sent to us or anyone else" must be literally true. One SDK breaks
   Apple's *Data Not Collected* label and the airplane-mode proof.
2. **No AI.** Not for suggestions, not for wording, not for anything. Fixed content the person
   chooses from is a chapter in a book. A system that chooses for them is a medical device.
3. **Conditional beliefs only.** Every item is "If I ___, then ___". "I am ___" is reframed,
   never accepted.
4. **Never the habit itself.** No test involves the drink, the screen, the substance, food
   restriction, body sensations, checking rituals, or anyone's safety. In v1 this is
   structural: there is no free-text test field.
5. **No streaks, no red days, no "you missed", no cap on rest.** The metric is completed
   tests. "Didn't get to it" keeps the test for tomorrow.
6. **No verdicts.** Never "irrational". Outcomes are observations. A bad outcome is data and
   the re-rate is optional.
7. **The wording is fixed.** The eight sentences and the crisis lines in scope §10 / research
   §10 appear verbatim. The purpose statement is identical in the app, the listing and every
   post. The phrases "digital CBT", "treats", "reduces symptoms", "for people with [diagnosis]",
   "tracks your anxiety" and "improve your mental health" never appear anywhere.
8. **Every phrase is written fresh.** No wording from CCI, Getselfhelp, Therapist Aid,
   Psychology Tools or the Beck Institute; all restrict reuse.
9. **Visible lineage.** "Made by the people behind TrybeUP" stays in the small print. TrybeUP
   is not mentioned anywhere else until B6's gate is open.
10. **The interface is one big button.** Four taps and one sentence per loop. Anything that
    looks like a form, a wizard, a slider, a tab bar or a chat has already been rejected by
    the founder. Do not bring it back.

## How the repo works

- **Branch:** `main`. Commit directly, push directly. There is no deploy yet (B3 builds it).
- **Stack:** `web/` is plain HTML, CSS and JavaScript. No framework, no build step, no
  `package.json` dependencies. Tests run with `node --test` from the repo root (not
  `node --test web/tests/`; Node 22 rejects a directory there). Keep it readable by a
  stranger in an evening; that is part of the trust story.
- **Content lives in `web/content/fears.js`**, not in code. B1 owns it. It is a `.js` file and
  not `.json` because a browser will not fetch JSON from a page opened off the filesystem, and
  the founder opens `web/index.html` directly. It is still one plain array with no logic in it.
- **The prototype in `prototype/` is frozen.** It is the reference, not the shipping code.
- **Storage** is `localStorage` behind try/catch, versioned key, and the app must render
  correctly with nothing stored. Export and delete are always one tap away.

## When you finish a task

- [ ] Tests pass (`node --test` from the repo root) and the loop has been walked on a phone
- [ ] Confidence score 8/10 or higher, recorded in the task file
- [ ] The task file in `docs/tasks/` updated: status, what was built, decisions, gaps
- [ ] `docs/learnings.md` updated if anything took more than thirty minutes to understand
- [ ] **`docs/NEXT-SESSION.md` rewritten**, not appended to, under 120 lines
- [ ] Commit with a clear one-sentence message and push `main`
- [ ] **Tell the founder how to see it.** Until B3: open `web/index.html` in a browser, or the
      prototype. After B3: `https://betr.dev.trybeup.com`, wifi off after load. After B5: a
      TestFlight build, which is a new App Store release each time.

## The TrybeUP dev droplet (for B3 and B6 only)

Betr's dev host is the TrybeUP dev droplet. SSH alias **`le-jibe`** (root@134.209.228.44, key
`~/.ssh/id_ed25519`). Read-only commands run freely. **Every write** to nginx, `/var/www/`,
or anything under `/opt/` is confirmed with the founder first, every time. The TrybeUP dev
site at `dev.trybeup.com` must keep working after any change; check it. The TrybeUP repo is
`trybeup/trybeup-prod`; its `CLAUDE.md` governs anything done there.

## What not to do

- Don't add a dependency. Don't add a font. Don't add analytics "just to see".
- Don't add a questionnaire, a score, a streak, or a recommendation.
- Don't write a test that involves the habit. Don't accept "I am" as a belief.
- Don't mention TrybeUP outside the small print. Don't build the bridge before its gate opens.
- Don't say "improve your mental health", anywhere, ever.
