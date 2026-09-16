# Betr — Claude Code Guide

Read automatically at the start of every session. Follow it without exception.

## Read this before anything below (2026-09-15)

**The app is rebuilt to [`docs/tasks/B56-the-redesign.md`](docs/tasks/B56-the-redesign.md), on the branch `redesign`, NOT YET MERGED**
— a push to `main` touching `web/**` publishes to the live address, so it merges only once the founder has seen it on a phone. Rules 3, 4,
5 and 10 below are rewritten to it (2026-09-15). The word is **prediction**; the front is `If I ___, then ___.` and `Lock it in`; there is
**no stock list, no doors, no sizes, no ladder, no tally, no number**; the look is terracotta and paper. **B57** moves it off TrybeUP and ends
rule 9. **Misha is no longer a co-decider.** The repo is **public and MIT**: no server address, key or person's name goes into any file.

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
choose. **Misha is no longer a co-decider** (founder, 2026-09-15): the founder decides the
audience, the list and the tone alone. Where an older file says "Misha's call", read "founder's call".

## The rules that never bend

These come from the research and the scope. They are product rules, legal rules and trust
rules at once, and every one of them has failed in some other product.

1. **Nothing leaves the phone.** No account, no server, no analytics, no crash reporter, no
   push, no CDN fonts, no third-party script, no request of any kind after the page loads.
   The sentence "nothing is sent to us or anyone else" must be literally true. One SDK breaks
   Apple's *Data Not Collected* label and the airplane-mode proof.
2. **No AI.** Not for suggestions, not for wording, not for anything. Fixed content the person
   chooses from is a chapter in a book. A system that chooses for them is a medical device.
3. **Conditional predictions only, and the word is *prediction*.** *Rewritten 2026-09-15 for
   B56, founder's call.* Every one is "If I ___, then ___." — the front screen prints "If I"
   and ", then" and the person writes both blanks themselves. The word a person reads, for a
   hope and a worry alike, is **prediction**: not test (B29's word, 2026-09-08 to 2026-09-15),
   not worry, not hope, not bet. "Worry" stays where it means the feeling — frozen sentence 3,
   *How it works*. `loop.test.js` fails the build if a button or a heading says test or worry.
   **The one hard stop is unchanged, on both blanks:** a sentence about ending it or hurting
   anyone is refused, with the crisis block for the country the person is in. B20's three
   predictions per worry and the borrow list went with the stock list (B56 §2 item 12). **Known
   gap:** "I am ___" has no road to a reframe on this screen, because every sentence made there
   is already a conditional (B56 §10).
   **In French the word is *pari*, and that is deliberate** (founder, 2026-09-16, B16 §10d): the
   "not bet" above is about the gambling echo in English, and the founder judged it weaker in
   French, where « je te parie que… » is everyday speech. The act is « Je m’engage » and the
   state ENGAGÉ. **Do not "correct" the French back to *prédiction* on the strength of this
   rule.** *Pari* is masculine and French agrees, so changing it means reading all of
   `strings-fr.js` for agreement. **And the hard stop works in every language at once** — one
   list in `guards.js`, never keyed to the interface language (B16 §10a).
4. **BETR proposes nothing.** *Rewritten 2026-09-15 for B56.* There is no stock content: no
   list, no suggestions, no examples, no sizes. BETR cannot propose the habit because it
   proposes nothing at all, and the habit and body word lists are gone from `guards.js` with
   the content they held. A person's own words are theirs (B29's loosening stands); the line
   about the rest is drawn once, by frozen sentence 6 on Help. **The one hard stop stays, on
   both blanks** — the founder's own example of what must still be refused is "If I kill
   myself everyone will be better off". **If stock content ever comes back, the old rule 4
   comes back with it.**
5. **No streaks, no red days, no "you missed", no cap on rest — and no number.** *Rewritten
   2026-09-15 for B56, founder: "they'll be able to put the puzzle together themselves".* No
   tally, no count of predictions or results, no ladder, no score, anywhere in the loop or on
   *Your predictions*; a day label (TUE) is a label, not a number. *Not today* keeps a
   prediction locked in and records nothing. *Done with this one* puts it away and deletes
   nothing; only *Delete everything* deletes. A prediction's id is random and never the
   sentence, for the reason `rate.keyOf()` gave: fixing a typo must not look like losing your
   history. `loop.test.js` fails the build on a digit.
6. **No verdicts.** Never "irrational". Outcomes are observations. A bad outcome is data and
   the re-rate is optional.
7. **The wording is fixed.** The eight sentences and the crisis lines in scope §10 / research
   §10 appear verbatim. The purpose statement is identical in the app, the listing and every
   post. The phrases "digital CBT", "treats", "reduces symptoms", "for people with [diagnosis]",
   "tracks your anxiety" and "improve your mental health" never appear anywhere.
   **The wordmark is BETR, all caps, everywhere a person reads it** — app, title, manifest,
   export, listings, posts. And **nothing a person taps is all-lowercase** (founder, 2026-09-03:
   "very modern but not cool"). `loop.test.js` fails the build on either.
   **In French** (2026-09-16, B16 §10g) the purpose and the nine sentences are a **faithful
   translation in draft**, not a rewrite, until the founder signs them off; then they are frozen
   in French the same way. Fix the stale ones ("pick a worry", "rate the belief again") in both
   languages at once or neither. Sentence 7's "988", "116 123" and "findahelpline.com" must stay
   written exactly so, because that is how `callable()` makes them tap.
8. **Every phrase is written fresh.** No wording from CCI, Getselfhelp, Therapist Aid,
   Psychology Tools or the Beck Institute; all restrict reuse.
9. **Visible lineage.** "Made by the people behind TrybeUP" stays in the small print. TrybeUP
   is not mentioned anywhere else until B6's gate is open — **except, from 2026-09-03, as one
   plain entry among the other places on the Help screen** (founder's call, B8). Never first,
   never a button, never styled apart; it says we made it and what it costs, right there in the
   entry; no deep link, no campaign parameter, no referral code, ever. Not on the front screen,
   not in the loop, not in the result, not on the menu.
   **Amended 2026-09-12 (B54), by the founder, and it is the "never styled apart" half that
   went:** under *Who made this* on Help there is now a **block with TrybeUP's logo, the
   wordmark `TrybeUP™` and seven sentences saying what TrybeUP is**, ending in one plain link.
   The founder's word was "more obvious". **The places entry is NOT that block and is
   unchanged** — still plain, still second in its group. Everything else in rule 9 stands, and
   is still tested: it is on **Help and nowhere else**, it is **not a button**, and there is no
   parameter on the link. Three of the seven sentences are safeguards rather than copy and
   `menu.test.js` fails the build if any goes: **what it costs including the paywall** (B8's
   third condition), **that TrybeUP has an AI coach and BETR still has none**, and **that it is
   an account on their servers and nothing written here goes there**. **The logo is
   `web/trybeup-logo.png`, a file in this repo** — never hotlinked, because `img-src 'self'`
   blocks it and rule 1 is why — and **the wordmark is the system font at 600, never Inter from
   Google** (`font-src 'none'`, and "don't add a font"). **B6's gate is still shut**; a block of
   prose is not the bridge.
   **Amended again 2026-09-12 (B55), same founder, same day, and it is a door rather than a
   mention:** the front screen and *Your tests* carry **`Who made this?`** — grey, underlined,
   on the wordmark's own line — which opens Help at the block above. **It does not say TrybeUP,
   and that is the point:** the brand is still not named on the front screen, in the loop, in
   the result or on the menu, so the app carries the door to the lineage without carrying the
   promotion. *Made by TrybeUP* there is the founder's to take and was offered; `menu.test.js`
   fails the build the day the word appears outside Help. **It is NOT in the loop, NOT on the
   result and NOT on a refusal** — a person who has just written what they are afraid of, or
   been handed a helpline number, is not somebody to show another product to — and it is
   deliberately **not drawn by `paint()`**, so it cannot reach those screens by one edit.
10. **One question per screen, and B56 §3 is the shape.** *Replaced 2026-09-15 by the founder's
    redesign; the history of B8–B20's doors, lists and taps is in git and in those task files.*
    The front is *What do you think will happen?* over *If I ___, then ___.* and *Lock it in* —
    no door, no list, no example card. Then *Locked in* → *Did it go how you expected?*
    (*Yeah!* / *Sort of* / *Not really*) → *What happened?* → the results, newest first →
    *Same again tomorrow* or *Done with this one*. **Two voices:** the person's words in a serif
    on paper, the app's in the sans on terracotta. **Three grey words at the foot of every
    screen** — *Your predictions · How it works · Help* — plain, no icons, no selected state, no
    count, never a fourth. **The prediction is on screen, in the same words, on every screen from
    Locked in to the results;** a loop screen that does not say which prediction it belongs to is
    the bug. A wizard, a slider or a chat is still rejected and does not come back.
    **The language picker is top right of every screen** (founder, 2026-09-16, B16): two grey
    letters, `EN ▾` / `FR ▾`, on the wordmark's row, over a real `<select>`. B15 had said "one
    line in Help, never a picker on the front screen"; the founder moved it. It is not a foot
    word and does not count as a fourth. **No flag, ever** — a flag is a country, and language is
    never country (B17). It stays on a refusal, because somebody who cannot read the crisis block
    is exactly who needs it. Still never a first-run question.

## How the repo works

- **Branch:** `main`. Commit directly, push directly. There is no deploy yet (B3 builds it).
- **Stack:** `web/` is plain HTML, CSS and JavaScript. No framework, no build step, no
  `package.json` dependencies. Tests run with `node --test` from the repo root (not
  `node --test web/tests/`; Node 22 rejects a directory there). Keep it readable by a
  stranger in an evening; that is part of the trust story.
- **Content lives in `web/content/`**, not in code. Since B56 there is no stock content at all:
  `strings-en.js` is every word the app says (the frozen block in it is verbatim and frozen),
  `places.js` is every link on the Help screen and the only place a link may be added, and from
  B17 `zones.js`, which is **generated from the IANA time zone database and never hand-edited**,
  and `helplines.js`. The old `worries.js`, `whats-going-on.js`, `examples.js` and `why.js` are
  gone (B56 §4). They are `.js` files and not `.json`
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

**One of these is not like the others. `docs/NEXT-SESSION.md` is rewritten at the end of EVERY
session, whether or not a task finished** — a session that committed one sentence, or answered
one question, or got half way and stopped, still leaves the next session reading that file as
its only account of where things are. A file that describes yesterday sends somebody to do work
that is already done, or past a decision the founder has already made. Rewrite it, never append,
under 120 lines, and make its "next action" the thing you would genuinely do next.

- [ ] Tests pass (`node --test` from the repo root) and the loop has been walked on a phone
- [ ] Confidence score 8/10 or higher, recorded in the task file
- [ ] The task file in `docs/tasks/` updated: status, what was built, decisions, gaps
- [ ] `docs/learnings.md` updated if anything took more than thirty minutes to understand
- [ ] **`docs/NEXT-SESSION.md` rewritten**, not appended to, under 120 lines
- [ ] Commit with a clear one-sentence message and push `main`
- [ ] **Tell the founder how to see it.** Until B3: open `web/index.html` in a browser, or the
      prototype. Since B3: **`https://betr.trybeup.com`**, wifi off after load — every push to
      `main` touching `web/**` publishes it. (This file said `betr.dev.trybeup.com` until
      2026-09-04. That address does not resolve and never did.) After B5: a TestFlight build,
      which is a new App Store release each time.

## The TrybeUP dev droplet (for B3 and B6 only)

Betr's dev host is the TrybeUP dev droplet. SSH alias **`le-jibe`** (root; the address and key are
in `~/.ssh/config`, not here — this repo is public from 2026-09-15). Read-only commands run freely. **Every write** to nginx, `/var/www/`,
or anything under `/opt/` is confirmed with the founder first, every time. The TrybeUP dev
site at `dev.trybeup.com` must keep working after any change; check it. The TrybeUP repo is
`trybeup/trybeup-prod`; its `CLAUDE.md` governs anything done there.

## What not to do

- Don't add a dependency. Don't add a font. Don't add analytics "just to see".
- Don't add a questionnaire, a score, a streak, or a recommendation.
- Don't write a test that involves the habit — that rule is about **BETR's own content** and
  did not loosen on 2026-09-08. A person's own test is theirs. Don't accept "I am" as a belief.
- Don't mention TrybeUP outside the small print. Don't build the bridge before its gate opens.
- Don't say "improve your mental health", anywhere, ever.
