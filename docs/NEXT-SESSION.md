# Start here

**Last refreshed:** 2026-09-08, after the daughter walk and B36's research.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**B28–B35 are built and closed.** 208 tests, no dependencies, no build step, nothing requested
after load. `main` is clean and live at `https://betr.trybeup.com`. **No code changed this
session.** What was added is research and a proposal:

- **`docs/research/12-guiding-the-first-test.md`** — sourced, on what to say to somebody who has
  never done this, when to say it, and how small a first test may be made without stopping being
  a test.
- **`docs/tasks/B36-the-guide.md`** — the proposal, six items, ranked and costed. Nothing built.

**Why.** The founder walked the build screen with their eldest daughter. She wrote a sentence of
the right shape and the wrong content and nothing said so; she reached *What will you do today?*
with no idea what was expected; and when it was explained she said **"OH NO I can't actually give
her a criticism, she'll not talk to me for the day"** and left. That is a belief at 10 doing what
a belief at 10 does. A therapist shrinks the step out loud, with the reason attached. BETR says
*"Small and entirely up to you."*

**Three things that are true in the code, without her:**

1. **`content/examples.js` has no `did`.** The front screen shows prediction → what happened.
   The one screen that teaches by showing skips the beat she got stuck on.
2. **`content/why.js` is unreachable to her.** Twenty-one entries of the best writing in the
   app, keyed to a **stock worry id** — she typed her own — and shown only **after a result**.
3. **The verdict guard cannot fire from the build screen.** `checkBelief()` exempts any sentence
   containing "if", and the build screen prints "If I". `guards.js` says so in its own comment.

## 2. The next action

**Get a decision on `docs/tasks/B36-the-guide.md`, then build item 1** — the cheapest and best
evidenced: `examples.js` gains a `did` field, so the worked example shows what the person
actually did, one short line, before what happened. Half a day. **Measure it on the walker at
100% and 125%: the front screen is already at the fold (785 / 780px).**

Items 2 and 3 are one screen each behind a text link — *Too big? Make it smaller* on the do
screen, *Why it's written like this* on the build screen — sharing scaffolding, so about a day
together. Item 4 is two nudges in `guards.js`, half a day. Item 5 (when and where) is
deliberately **deferred behind the 125% fold bug**. Item 6 (should a half-written sentence
survive leaving the screen) is a founder decision, not a build.

**The rule that governs all of it, from research §6: the person opens the door.** No screen may
appear because of anything somebody typed, rated or did. Fixed prose everybody can open is a
chapter in a book; prose shown *because of* an input is the app choosing — rule 2, and a device.

Everything else open is somebody's reading:

1. **The founder, six things.** B36 items 1–4 and item 6. Start #19, the checking ritual
   (B34 §6). Which of the four examples leads the front screen and **whether it is real or an
   example**. **The purpose statement**, which still says "you pick a worry", frozen in five
   places — candidate in `B29`. **The `HARM` false refusal** (*"end it"* refuses a sentence about
   ending a friendship). **Change the ad, not the app** (B25).
2. **Misha, in one ask:** the four nouns (B23 option b), the door order, the 21 chips, and now
   B36's tone — does *"Too big? Make it smaller"* read as helpful, or as being managed?
3. **The paid CBT reviewer, still the critical path. Send `docs/suggestions-review.csv`** —
   245 rows, the 154 shipped lines beside the 91 proposed, blank score and rewrite columns;
   `docs/candidates-suggestions-batch-1.md` is the reasoning. Also `content/examples.js`, the
   three `worries.js` sentences rewritten on 2026-09-08 (`phone`, `rest`, `low`), three pairs
   from B1, and B34 §4's `general.thens`. **Add B36's strings**, with one question: is *"the
   smallest version that could still turn out wrong"* safe to hand somebody with no clinician?
4. **A screen-reader pass on a real phone.** The tree was read in B33; **nobody has used it**,
   and B35's look chip is new and unheard.
5. **Q1 (name, trademark, domain)** is open, blocks release and blocks B5 outright.

**Two API keys were pasted into an earlier session — Groq and Anthropic. Both still need
rotating.**

**Gaps nobody owns:** no medication word list in `guards.js` (the *"sleeping tablets"* miss),
and the 125% fold bug on the do screen, which now blocks B36 item 5. **Unchanged release
conditions:** Misha on `places.signedOff`; J1–J3 on a phone; an owner for links and helplines.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | `python3 -m http.server 8760 --bind 127.0.0.1` from `web/`, then `http://127.0.0.1:8760/` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** |
| Live address | **`https://betr.trybeup.com` — live.** Every push to `main` touching `web/**` publishes it. Cert expires 2026-12-02 |
| TrybeUP's repo | `trybeup/trybeup-prod`, checkout at `~/vscode_projects/trybeup-prod`. Nothing further is owed to it |

## 4. Gotchas, live

- **`walk.js` dies silently, and a dead walker returns a stale page rather than an error.** If a
  result surprises you, `start` again and redo it before you believe it. **Its browser's system
  is set to DARK**, so BETR opens dark there and that is correct (B35).
- **`web/lib/theme.js` loads in the `<head>`, before the stylesheet, and has to.** Later is a
  flash of the wrong colour on every screen; and it cannot be an inline script — CSP.
- **Tapping the look chip must never repaint**, or it throws away a sentence somebody is half
  way through typing. It swaps its own text in place; there is a test. **The three roads to the
  build screen offer three different suggestion sets** (B34 §1): check any chip change on all.
- **The fake DOM in `harness.js` is flat and fires no events.** Live behaviour is walked, not
  unit-tested — that is the bargain. `boot(seed, {dark: true})` is a dark-mode phone (B35).
- **A REGION DELETE NEEDS BOTH ENDS CHECKED** — cutting between comment banners once swallowed
  the whole build screen out of `app.js` (`learnings.md`).
- **The fold is 785px at 100% and 780px at 125%.** `doors.intro` is one line and must stay one.
  **Known and untouched: at 125% the `do` box on *What will you do today?* clips its own text
  and *Lock it in* sits under the menu.** Pre-existing; it now blocks B36 item 5.
- **`go()` throws away an unlocked draft on the way out.** Deliberate, B8; B36 item 6 asks again.
- **Chips are exempt from the capital-letter rule**, narrowly and by class. **`rate.keyOf()`
  keys an own ladder by `id`**, falling back to the sentence only for a pre-B30 ladder (v4
  migrated no data on purpose). **After editing `web/content/*`, `stop` and `start`** — `open`
  alone serves a cache.
- **`HABIT`/`BODY` refuse nothing any more** and still hold BETR's own content — and neither
  catches a checking ritual, which rule 4 also forbids BETR to propose.
- **Help's order is three decisions and four tests hold it:** crisis first (B17), proof second
  (B26), frozen sentence 6 third (B33), then CBT, then the nine.
- **Every word a person reads is in `web/content/`**; a sentence back in `app.js` fails
  `i18n.test.js` — and **a string literal that starts mid-tag reads as prose to that sweep**.
- **Use `’` and `“ ”`, never `'` and `"`.** All 723 content strings already do, and since B35
  `content.test.js` fails the build on a typewriter one. Anything drafted outside `web/content/`
  arrives with the wrong quotes — B36's draft strings included.
- **`content/zones.js` and `docs/COPY.md` are generated** (`node tools/copy-sheet.js`); never
  hand-edit. **No helpline number is written from memory.**
