# Start here

**Last refreshed:** 2026-09-09, after B38 shipped and B39 was measured.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**B38 is built and closed. B39 is half built and the other half is the founder's.** 213 tests,
no dependencies, nothing requested after load; `main` clean and live at
`https://betr.trybeup.com`. Two commits today, both pushed.

**B38 — the `did`, the reframe and the net.** The worked example on the front screen now has a
fourth beat: what they actually **did**, and how small it was. That is the beat the founder's
daughter stalled on. Three more things went with it:

- the card is **one voice** now — *They expected · What they did · What actually happened · How
  sure they were* — the "shown" option the mockup took. `result.*` is untouched, so a person's
  own result still says *You expected*. **Misha owns which way round; four strings, no code.**
- **every dare in the loop became a question.** *"Go and do it."* → **"Go and find out."**;
  *"I'll do it today"* → **"I'll find out today."** BETR never asks anybody to be brave.
- **the safety net at the lock:** *"Bring back whatever happens. A bad one counts the same as a
  good one."* Not shown once a test is set aside — B27's rule.

**B39 — the do screen.** The boxes now grow to their own text: **no box clips on any road at
100 / 125 / 150 / 200%.** That was the real bug, and it was a **100%** bug on the main road.

## 2. The next action

**Build `B40`.** It depends on nothing, blocks B41/B42/B43, and **must not be done after them.**
Its whole content is one sentence: *stay `stock` and keep the worry's `id` while the person is on
the template road, whatever the words say.* It changes nothing a person can see — if anything
looks different, something is wrong — and **it fails silently with every test passing** if it is
skipped. Read that file before touching anything.

**Then `B41`.** `B42` is blocked by the decision below.

## 3. The decision that is blocking B42, and it is one question

**The do screen cannot be made to fit, and the arithmetic is not close.** After B39 the main
road — a person's own words — has *Lock it in* **47px below the fold at 100%** and **207px below
at 125%**. Every remaining margin on that screen added together is about 50px. The `do`
suggestion row alone is **159px, for two suggestions**.

**Ask the founder one question:** *when there is something in the "and leave out" box, may it
collapse to a single line showing what it says — "And leave out: 'No checking it just once
before bed.' — change" — instead of a label, an explanation and a box?*

- **Yes** → saves ~130px at 100%. Fixes the main road at 100%. Does not fix 125%. B42 designs
  against the collapsed version. **This is the recommendation.**
- **No** → the screen scrolls at every size and we say so; the work becomes making the scroll
  obvious. B42 gets harder.

**Same question, second screen.** B38's new beat cost the front screen its clearance: at 125%,
*Not sure? Try one of these* now sits **43px behind the menu** where B33 had bought it 32px of
clear air. Same budget problem, same decision. Both are written up in `docs/tasks/B39-*.md`.

## 4. Waiting on people, not on code

1. **The founder.** **The collapse question in §3, which blocks B42.** Rule 10's third
   amendment, written down rather than arrived at (B37 §9a). **B36 item 6 — does a half-written
   test survive?** — is no longer a nicety: tapping *New test* from the do screen wipes the
   sentence and the plan with no warning, and that button is straddling the menu. B36 items 6
   and 9. Start #19, the checking ritual (B34 §6). Which example leads the front screen, and
   **real or an example**. **The purpose statement**, still saying "you pick a worry", frozen in
   five places (`B29` has a candidate). **The `HARM` false refusal.** **Change the ad, not the
   app** (B25).
2. **Misha, in one ask:** **the card's voice and the two reframed lines from B38** (six strings,
   all flippable), the four nouns (B23 option b), the door order, the 21 chips, B36's tone, and
   the **red strike** through a person's own sentence (B36 §12b), **and every skeleton in
   B41/B43** — where the risk is BETR's voice in somebody's mouth.
3. **The paid CBT reviewer, still the critical path. Send `docs/suggestions-review.csv`** — 245
   rows, 154 shipped lines beside 91 proposed, blank score and rewrite columns, reasoned in
   `docs/candidates-suggestions-batch-1.md`. Also `content/examples.js` (**now +8 rows: four
   `did` and four `dropped`**), three rewritten `worries.js` sentences, three pairs from B1,
   B34 §4's `general.thens`, **B36's strings, and B38's four new ones**. Two questions: is *"the
   smallest version that could still turn out wrong"* safe to hand somebody with no clinician,
   and may *A small go* change **who it is with**? **B43 adds ~26.**
4. **A screen-reader pass on a real phone** — the tree was read in B33, **nobody has used it**.
5. **Q1 (name, trademark, domain)** blocks release and blocks B5 outright.

**Two API keys pasted in an earlier session — Groq and Anthropic — still need rotating. Nobody
owns** the missing medication word list in `guards.js`. **Release conditions:** Misha on
`places.signedOff`, J1–J3 on a phone, an owner for links and helplines.

## 5. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** |
| Live address | **`https://betr.trybeup.com` — live.** Every push to `main` touching `web/**` publishes it. Cert expires 2026-12-02 |

## 6. Gotchas, live

- **To measure at 125%, set the font size BEFORE navigating to the screen.** `eval
  "document.documentElement.style.fontSize='20px'"` then `open`/`tap` your way there. Setting it
  after measures a screen laid out at the old size — the boxes' heights are set in JS now and
  keep the old number. Half an hour went into that (B39, `learnings.md`).
- **`shot` on the front screen catches it mid-reveal** — the card animates over 3.4s and the
  parts that have not arrived are `opacity:0` with their space reserved, so the picture has a
  hole in it. `eval "document.getAnimations().forEach(function(a){a.finish();})"` first.
- **`walk.js` dies silently and a dead walker returns a stale page, not an error** — `start`
  again before believing a surprise. **Its browser is DARK**, so BETR opens dark (B35).
  **`theme.js` loads in the `<head>` before the stylesheet and has to**; tapping the look chip
  must never repaint. **Three roads reach the build screen** (B34 §1): check all three.
- **The fake DOM in `harness.js` is flat and fires no events** — `grow()` is a no-op there by
  design, so box heights are only ever proved on the walker. **A REGION DELETE NEEDS BOTH ENDS
  CHECKED** (`learnings.md`).
- **The fold is 785px at 100%, 780px at 125%, 774 at 150%, 720 at 200%.** The whole app's
  spare room on the do screen is about 50px; do not plan a new row against it without measuring.
- **Chips are exempt from the capital-letter rule**, by class. **`rate.keyOf()` keys a ladder by
  `id`**, and rule 5 means a worry's **three predictions share one ladder**. **After editing
  `web/content/*`, `stop` and `start`**: `open` serves a cache.
- **`HABIT`/`BODY` refuse nothing any more**, still hold BETR's own content, and neither catches
  a checking ritual, which rule 4 also forbids. **Help's order is three decisions held by four
  tests.**
- **Every word a person reads is in `web/content/`** — a sentence back in `app.js` fails
  `i18n.test.js`. **Use `’` and `“ ”`, never `'` and `"`**: the build fails on a typewriter one.
- **`content/zones.js` and `docs/COPY.md` are generated**; never hand-edit. No helpline number
  is written from memory.
