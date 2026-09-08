# Start here

**Last refreshed:** 2026-09-08, after the daughter walk, B36, its mockups and B37.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**B28–B35 are built and closed.** 208 tests, `main` clean and live at `https://betr.trybeup.com`.
**No code changed this session.** What was added is research, a proposal and its mockups:

- **`docs/research/12-guiding-the-first-test.md`** — sourced: what to say to somebody who has
  never done this, and how small a first test may be without stopping being a test.
- **`docs/tasks/B36-the-guide.md`** — the proposal, **eleven items**, ranked and costed.
- **`docs/tasks/B37-the-template-with-holes.md`** — the founder's own shape for the way in, and
  it reorders B36. **Read §4 before writing any code.**
- **The mockups**, eight screens and four notes, the founder can edit the words:
  `https://claude.ai/code/artifact/5b7cf7c8-1905-43f2-823f-f813871acfb5` (working files were in
  scratchpad, not the repo — re-read the artifact to edit them).

**Why.** The founder walked the build screen with their eldest daughter. She reached *What will
you do today?* with no idea what was expected, and when it was explained she said **"OH NO I
can't actually give her a criticism"** and left — a belief at 10 doing what a belief at 10 does.
Two things are true in the code without her, and B36 §1 has both: **`examples.js` has no `did`**,
so the one screen that teaches by showing skips the beat she stuck on; and **`why.js` is keyed to
a stock worry id and shown only after a result**, so the best writing in the app never reached
her.

**B36 part two.** The therapist's *permission* is four things and the one BETR cannot have is
weakest — Bandura ranks mastery > vicarious > verbal persuasion, the blessing third. BETR supplies
the two stronger ones, plus a plan for the bad outcome instead of authority. **And it never asks
anybody to be brave: it asks them to find something out.** The **dial** is the evidenced half of
the founder's idea; the **points** are refused (§9).

**B37, from the founder, later the same day:** a skeleton with **holes** — *If I criticise [add a
person]* — and the words they type carried into three sizes of test on the next screen. **It is
B32 with holes in the middle instead of only at the ends.** Not a mode: every slot is a box that
starts with something in it, and free text is the same screen with the boxes empty.

**B37 §4 fails silently and must be read first.** Identity in BETR is the sentence —
`sameAsStock()` compares words, and a sentence that differs starts a new ladder at ten. **A
filled-in template differs from its template every time, by design**, so under templates nobody's
ladder would move past one rung, with every test passing. Store `{template, prediction, slots}`
and key off that. **Before the first template, not after.**

## 2. The next action

**Get a decision on B36 and B37 (the mockups are how to read B36), then build B36 item 1** —
cheapest and best evidenced: `examples.js` gains a `did` field, so the worked example shows what
the person actually did, one short line, before what happened. Half a day, and **measure it on
the walker at 100% and 125% — the front screen is already at the fold.** Then items 7 and 10a,
strings only: the loop says *"Go and find out."*, and the lock says a bad one counts the same.

**If B37 is a yes, its §4 identity fix is the next code after that** (`store.js` v5, `rate.js`,
`app.js`, merge, export), and B36 item 8's dial then arrives as B37's three concrete sentences
rather than three abstract sizes — which is better. B36 items 2 and 3 are one screen each behind
a text link, sharing scaffolding, about a day together; item 4 is two nudges in `guards.js`, half
a day. Items 5 and 10b are **deferred behind the 125% fold bug, now blocking three items and
still nobody's task.** Items 6 and 9 are decisions, not builds.

**The rule that governs all of it (research §6): the person opens the door.** No screen appears
because of what somebody typed, rated or did. Fixed prose everybody can open is a chapter in a
book; prose shown *because of* an input is the app choosing — rule 2, and a device. **A template
is inside that line**: it is a worksheet with blanks, and which `do` set appears is decided by
which template was picked — the same lookup `starts.js` already makes and already defends.

Everything else open is somebody's reading:

1. **The founder.** **B37: yes or no to the shape, and rule 10's third amendment.** B36 items
   1–4, 7 and 10a to build; 6 and 9 to decide. Start #19, the checking ritual (B34 §6). Which
   example leads the front screen, and **real or an example**. **The purpose statement**, still
   saying "you pick a worry", frozen in five places (`B29` has a candidate). **The `HARM` false
   refusal.** **Change the ad, not the app** (B25).
2. **Misha, in one ask:** the four nouns (B23 option b), the door order, the 21 chips, B36's
   tone (does *"Too big? Make it smaller"* read as helpful or as being managed?), and the two the
   mockups turned up (B36 §12) — the front card's **voice**, and the **red strike** through a
   person's own sentence, next to rule 6. **And B37's skeletons**, where the risk is BETR's voice
   in somebody's mouth.
3. **The paid CBT reviewer, still the critical path. Send `docs/suggestions-review.csv`** —
   245 rows, 154 shipped lines beside 91 proposed, blank score and rewrite columns;
   `docs/candidates-suggestions-batch-1.md` is the reasoning. Also `content/examples.js`, three
   rewritten `worries.js` sentences, three pairs from B1, B34 §4's `general.thens`, **and B36's
   strings** — with one question: is *"the smallest version that could still turn out wrong"*
   safe to hand somebody with no clinician? **B37 would add ten sentences per template on top.**
4. **A screen-reader pass on a real phone** — the tree was read in B33, **nobody has used it**.
5. **Q1 (name, trademark, domain)** is open, blocks release and blocks B5 outright.

**Two API keys pasted in an earlier session — Groq and Anthropic — still need rotating. Nobody
owns:** the missing medication word list in `guards.js`, and the 125% fold bug. **Release
conditions:** Misha on `places.signedOff`; J1–J3 on a phone; an owner for links and helplines.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** |
| Live address | **`https://betr.trybeup.com` — live.** Every push to `main` touching `web/**` publishes it. Cert expires 2026-12-02 |

## 4. Gotchas, live

- **`walk.js` dies silently and a dead walker returns a stale page, not an error** — if a result
  surprises you, `start` again before you believe it. **Its browser is set to DARK**, so BETR
  opens dark there and that is correct (B35).
- **`web/lib/theme.js` loads in the `<head>` before the stylesheet and has to** (later is a
  flash of the wrong colour; CSP forbids inlining it). **Tapping the look chip must never
  repaint** — it would throw away a half-typed sentence; it swaps its own text, and a test holds
  it. **The three roads to the build screen offer three suggestion sets** (B34 §1): check all.
- **The fake DOM in `harness.js` is flat and fires no events**; live behaviour is walked. **A
  REGION DELETE NEEDS BOTH ENDS CHECKED** — cutting between comment banners once swallowed the
  build screen out of `app.js` (`learnings.md`).
- **The fold is 785px at 100%, 780px at 125%**; `doors.intro` must stay one line. **Known and
  untouched: at 125% the `do` box clips and *Lock it in* sits under the menu** — pre-existing,
  now blocking three items.
- **Chips are exempt from the capital-letter rule**, by class. **`rate.keyOf()` keys an own
  ladder by `id`**, falling back to the sentence only for a pre-B30 ladder (v4 migrated no data
  on purpose). **After editing `web/content/*`, `stop` and `start`** — `open` serves a cache.
- **`HABIT`/`BODY` refuse nothing any more**, still hold BETR's own content, and neither catches
  a checking ritual — which rule 4 also forbids BETR to propose. **Help's order is three
  decisions held by four tests:** crisis, proof, frozen sentence 6, CBT, the nine.
- **Every word a person reads is in `web/content/`** — a sentence back in `app.js` fails
  `i18n.test.js`, and a literal starting mid-tag reads as prose to that sweep.
- **Use `’` and `“ ”`, never `'` and `"`** — `content.test.js` fails the build on a typewriter
  one, and anything drafted outside `web/content/` arrives wrong, B36's draft strings included.
- **`content/zones.js` and `docs/COPY.md` are generated** (`node tools/copy-sheet.js`); never
  hand-edit. **No helpline number is written from memory.**
