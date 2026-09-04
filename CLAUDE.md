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
or edit a file; do it. The one exception they asked for, 2026-09-04: **`docs/changing-the-words.md`**
tells them how to change any sentence in the app themselves on github.com, and how the tests
stop them publishing something that breaks a rule. Keep it true when the content files move. When a decision is theirs, lay out the options simply and let them
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
   never accepted. The word for one of these, everywhere a person can see it, is **worry**.
   Not "fear" (founder, 2026-09-02: it sounds scary), not "thought", not "belief" on a button.
   **Amended 2026-09-03 (B20):** a worry is a situation and carries **three** predictions, and
   the person picks which one is theirs, or writes their own in its place. One per worry had
   to guess which consequence they feared, and test users said the guess "sort of matches my
   worry but not really" — a prediction that is only nearly yours cannot be disconfirmed, so
   the loop runs and moves nothing. Three, plus their own words; never a fourth stock one, and
   never one BETR chooses for them.
4. **Never the habit itself.** No test involves the drink, the screen, the substance, food
   restriction, body sensations, checking rituals, or anyone's safety. In v1 this is
   structural: there is no free-text test field.
5. **No streaks, no red days, no "you missed", no cap on rest.** The metric is completed
   tests. "Didn't get to it" keeps the test for tomorrow. The one other number is the belief
   ladder: 1-10, per belief, moved by the person's own re-rate. It is never a score of the
   person, never totalled or averaged across worries, and never carries a target.
   **A worry is one belief (founder, 2026-09-04).** Since B20 a worry offers three predictions,
   and **all of them share that worry's one ladder** — including a sentence the person wrote
   themselves for it. `rate.keyOf()` keys a stock ladder by the worry's **id**, and that is a
   decision, not an oversight: keying by the sentence would make a person look like they had
   lost their history the moment they came back and picked a different one of the three.
6. **No verdicts.** Never "irrational". Outcomes are observations. A bad outcome is data and
   the re-rate is optional.
7. **The wording is fixed.** The eight sentences and the crisis lines in scope §10 / research
   §10 appear verbatim. The purpose statement is identical in the app, the listing and every
   post. The phrases "digital CBT", "treats", "reduces symptoms", "for people with [diagnosis]",
   "tracks your anxiety" and "improve your mental health" never appear anywhere.
   **The wordmark is BETR, all caps, everywhere a person reads it** — app, title, manifest,
   export, listings, posts. And **nothing a person taps is all-lowercase** (founder, 2026-09-03:
   "very modern but not cool"). `loop.test.js` fails the build on either.
8. **Every phrase is written fresh.** No wording from CCI, Getselfhelp, Therapist Aid,
   Psychology Tools or the Beck Institute; all restrict reuse.
9. **Visible lineage.** "Made by the people behind TrybeUP" stays in the small print. TrybeUP
   is not mentioned anywhere else until B6's gate is open — **except, from 2026-09-03, as one
   plain entry among the other places on the Help screen** (founder's call, B8). Never first,
   never a button, never styled apart; it says we made it and what it costs, right there in the
   entry; no deep link, no campaign parameter, no referral code, ever. Not on the front screen,
   not in the loop, not in the result, not on the menu.
10. **The interface is one big button.** One sentence per loop. Anything that looks like a
    form, a wizard, a slider or a chat has already been rejected by the founder. Do not bring
    it back. **Amended 2026-09-03 (B8):** there is now a permanent row of three at the bottom
    of every screen — *Your worries · New worry · Help*. The founder overruled their own
    no-tab-bar rule knowingly. It stays three plain words: no icons, no selected state, no
    badges, no counts, no fourth item. It is three doors, not a place you live in.
    **Amended again 2026-09-03 (B19), and this one cost a tap:** the big button leads to
    *What's going on?*, and the worries sit behind a door. The founder accepted the extra
    screen after watching two people fail to choose from the flat list. With it: **a worry's
    `belief` — its "If I ___, then ___" — is drawn under its label wherever a person picks
    one.** That sentence is the only part of a worry that explains itself, and it used to be
    invisible until the re-rate. A pick list without it is the bug, not the tidy version.
    **Amended once more 2026-09-03 (B20), and it cost the second tap — accepted by the founder
    on 2026-09-04, "one extra tap is fine":** picking a worry opens *which of these three is
    it?* before the test. Still one screen, one question, a list of plain buttons — not a form
    and not a wizard. Six taps to a locked-in test is the shape now; do not "restore" four. And from B20 **the worry's label and the
    exact sentence being tested sit at the top of every screen from that choice to the
    result**, in the same words in the same place. A screen inside the loop that does not say
    which worry it belongs to is the bug.

## How the repo works

- **Branch:** `main`. Commit directly, push directly. There is no deploy yet (B3 builds it).
- **Stack:** `web/` is plain HTML, CSS and JavaScript. No framework, no build step, no
  `package.json` dependencies. Tests run with `node --test` from the repo root (not
  `node --test web/tests/`; Node 22 rejects a directory there). Keep it readable by a
  stranger in an evening; that is part of the trust story.
- **Content lives in `web/content/`**, not in code: `worries.js` (B1, B19 and B20 own it, and
  since B19 a label must be comprehensible on its own — no pronoun with nothing to point at,
  no open channel, and never the `drop` smuggled onto the button; since B20 every worry
  carries **exactly three** `beliefs`, each two fields and no third, each predicting something
  different, and the loose `belief` on the card is never word for word one of them),
  `whats-going-on.js`
  (B19: the way in, four to six worries a door, and every worry behind at least one)
  and, from B8, `places.js` — every link on the Help screen, and the only place a link may be
  added. From B17 there are two more: `zones.js`, which is **generated from the IANA time zone
  database and never hand-edited**, and `helplines.js`. They are `.js` files and not `.json`
  because a browser will not fetch JSON from a page opened off the filesystem, and the founder
  opens `web/index.html` directly. Still plain data, no logic. A link is plain `https`, with no
  query string, no campaign parameter and no shortener, ever; nothing is fetched at runtime to
  support one — no favicon, no preview, no link check. `web/tests/menu.test.js` holds the
  allow-list, so a new link shows up in a diff.
- **A crisis phone number is never written from memory — a person's or a model's.** Every line
  in `helplines.js` was read off the provider's own website on the day recorded next to it, and
  carries that page's URL. A country with no checked line shows **no number at all** and says
  so; never a neighbour's, never 988 because it is the one we have. A wrong number is worse
  than no number, because a person tries it and may only try once. If you are about to type a
  number you have not read on the provider's site today, stop and leave the country out.
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
