# Start here

**Last refreshed:** 2026-09-09, after B37 was scoped into seven tasks.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**B28–B35 are built and closed.** 208 tests, no dependencies, no build step, nothing requested
after load. `main` is clean and live at `https://betr.trybeup.com`. **No app code has changed
since B35** — the last two days are research, two proposals and a scope.

**The founder said "let's try it out" on 2026-09-09, and B37 is now a programme file** with the
running order in its §10. Seven tasks, `B38` to `B44`, all scoped, none started.

**How it got here.** The founder walked the build screen with their eldest daughter. She reached
*What will you do today?* with no idea what was expected, and when it was explained said **"OH NO
I can't actually give her a criticism"** and left. Two things are true in the code without her:
**`examples.js` has no `did`**, so the one screen that teaches by showing skips the beat she
stuck on; and **`why.js` is keyed to a stock worry id and shown only after a result**, so the
best writing in the app never reached her.

Then two ideas from the founder, both good, both now scoped:

- **The permission problem.** The therapist's blessing is four things and the one BETR cannot
  have is weakest — Bandura ranks mastery > vicarious > verbal persuasion. BETR supplies the two
  stronger ones, plus a plan for the bad outcome instead of authority. **And it never asks
  anybody to be brave: it asks them to find something out.**
- **The template with holes.** *If I criticise [add a person]*, and her words carried through
  into three sizes of test on the next screen. **It is B32 with holes in the middle instead of
  only at the ends.** Not a mode: free text is the same screen with the boxes empty.

**The documents:** `docs/research/12-guiding-the-first-test.md` (sourced),
`docs/tasks/B36-the-guide.md`, `docs/tasks/B37-the-template-with-holes.md` (**§10 is the running
order**). **Two mockup canvases**, founder-editable:
`https://claude.ai/code/artifact/5b7cf7c8-1905-43f2-823f-f813871acfb5` (B36, eight screens) and
`https://claude.ai/code/artifact/77d1cadb-a55b-4926-8281-ea0a0556d73f` (B37, seven). Working
files were in a scratchpad, not the repo — re-read an artifact to edit it.

## 2. The next action

**Build `B38`.** One day, depends on nothing, visible immediately, off the template critical
path: the worked example gains a `did` beat, the loop stops saying *"Go and do it."* and says
*"Go and find out."*, and one line at the lock says a bad one counts the same as a good one.
**Measure the front screen at 100% and 125% — it was already at the fold before this added a beat.**

**Then `B39`**, the 125% fold bug: known since B33, never anybody's, and now blocking three
things. Measure before choosing a fix.

**Then the template run: `B40` → `B41` → `B42` → `B43`.** `B40` is the one to read first and the
one to get right — **it changes nothing a person can see**, and if anything looks different,
something is wrong. Its whole content is one sentence: *stay `stock` and keep the worry's `id`
while the person is on the template road, whatever the words say.* Without it every templated run
is a stranger to itself, every ladder restarts at ten, and **it fails silently with every test
passing.** `B43` is the "try it out": the founder doing a real templated test on a real phone,
twice, and watching one ladder move.

`B44` (*Make it smaller*, *Why it's written like this*) is last on purpose — `B42` does most of
its rescue job inline, so it becomes teaching rather than rescue.

**The rule governing all of it (research §6): the person opens the door.** No screen appears
because of what somebody typed, rated or did. **A template is inside that line** — a worksheet
with blanks, whose `do` set is chosen by which template was picked, which is the lookup
`starts.js` already makes and already defends.

**And the rule that keeps the content safe: BETR owns the verb, the person owns the nouns.**
Holes take a person, a thing, a place — never a verb. Rule 4 did not loosen for BETR.

## 3. Waiting on people, not on code

1. **The founder.** Rule 10's third amendment, written down rather than arrived at (B37 §9a).
   B36 items 6 and 9 are decisions. Start #19, the checking ritual (B34 §6). Which example leads
   the front screen, and **real or an example**. **The purpose statement**, still saying "you pick
   a worry", frozen in five places (`B29` has a candidate). **The `HARM` false refusal.**
   **Change the ad, not the app** (B25).
2. **Misha, in one ask:** the four nouns (B23 option b), the door order, the 21 chips, B36's tone,
   the front card's **voice** and the **red strike** through a person's own sentence (B36 §12),
   **and every skeleton in B41/B43** — where the risk is BETR's voice in somebody's mouth.
3. **The paid CBT reviewer, still the critical path. Send `docs/suggestions-review.csv`** — 245
   rows, 154 shipped lines beside 91 proposed, blank score and rewrite columns, reasoned in
   `docs/candidates-suggestions-batch-1.md`. Also `content/examples.js`, three rewritten
   `worries.js` sentences, three pairs from B1, B34 §4's `general.thens`, **and B36's strings**.
   Two questions: is *"the smallest version that could still turn out wrong"* safe to hand
   somebody with no clinician, and may *A small go* change **who it is with**? **B43 adds ~26.**
4. **A screen-reader pass on a real phone** — the tree was read in B33, **nobody has used it**.
5. **Q1 (name, trademark, domain)** is open, blocks release and blocks B5 outright.

**Two API keys pasted in an earlier session — Groq and Anthropic — still need rotating. Nobody
owns** the missing medication word list in `guards.js`. **Release conditions:** Misha on
`places.signedOff`; J1–J3 on a phone; an owner for links and helplines.

## 4. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** |
| Live address | **`https://betr.trybeup.com` — live.** Every push to `main` touching `web/**` publishes it. Cert expires 2026-12-02 |

## 5. Gotchas, live

- **`walk.js` dies silently and a dead walker returns a stale page, not an error** — `start`
  again before believing a surprise. **Its browser is set to DARK**, so BETR opens dark (B35).
- **`theme.js` loads in the `<head>` before the stylesheet and has to** (else a flash of wrong
  colour; CSP forbids inlining). **Tapping the look chip must never repaint** — it would throw
  away a half-typed sentence. **Three roads reach the build screen** (B34 §1): check all three.
- **The fake DOM in `harness.js` is flat and fires no events**; live behaviour is walked. **A
  REGION DELETE NEEDS BOTH ENDS CHECKED** — cutting between comment banners once swallowed the
  build screen out of `app.js` (`learnings.md`).
- **The fold is 785px at 100%, 780px at 125%**; `doors.intro` must stay one line. **At 125% the
  `do` box clips and *Lock it in* sits under the menu** — that is B39.
- **Chips are exempt from the capital-letter rule**, by class. **`rate.keyOf()` keys a ladder by
  `id`**, and rule 5 means a worry's **three predictions share one ladder** — never key on which
  prediction. **After editing `web/content/*`, `stop` and `start`** — `open` serves a cache.
- **`HABIT`/`BODY` refuse nothing any more**, still hold BETR's own content, and neither catches
  a checking ritual, which rule 4 also forbids. **Help's order is three decisions held by four
  tests:** crisis, proof, frozen sentence 6, CBT, the nine.
- **Every word a person reads is in `web/content/`** — a sentence back in `app.js` fails
  `i18n.test.js`, and a literal starting mid-tag reads as prose to that sweep. **Use `’` and
  `“ ”`, never `'` and `"`**: the build fails on a typewriter one, and anything drafted outside
  `web/content/` arrives wrong.
- **`content/zones.js` and `docs/COPY.md` are generated**; never hand-edit. **No helpline number
  is written from memory.**
