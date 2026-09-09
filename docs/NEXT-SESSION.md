# Start here

**Last refreshed:** 2026-09-09, after B38 and B39 both closed.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**B38 and B39 are built and closed.** 216 tests, no dependencies, nothing requested after load;
`main` clean and live at `https://betr.trybeup.com`. Four commits today, all pushed.

**B38 — the `did`, the reframe and the net.** The worked example has a fourth beat: what they
actually **did**, and how small it was — the beat the founder's daughter stalled on. With it:

- the card is **one voice** — *They expected · What they did · What actually happened · How sure
  they were*. `result.*` is untouched, so a person's own result still says *You expected*.
  **Misha owns which way round; four strings, no code.**
- **every dare became a question.** *"Go and do it."* → **"Go and find out."** BETR never asks
  anybody to be brave.
- **the safety net at the lock:** *"Bring back whatever happens. A bad one counts the same as a
  good one."* Not shown once a test is set aside — B27's rule.

**B39 — the do screen fits a phone.** Three things, the third approved by the founder the same
day (*"your suggestion for the below the fold problem sounds good, do it"*):

- **the boxes grow to their own text.** BETR's own pre-filled sentence needed 112px in a box
  reserving 92 — **at 100%**, on the road most people take. No box clips at any size now.
- both explanatory lines went from two rendered lines to one; `loop.test.js` holds them to 28.
- **the leave-out half is one row until it is touched** — the label, **what it currently says**,
  and *Change* / *Add one*. It shows the words rather than hiding them, which is the whole
  design: on the borrowed road those words are BETR's, and nobody locks in a sentence of ours
  they never read.

**Both roads now clear the fold at 100% and 125%**, which has not been true on the free-text
road since B32. 150% and 200% scroll, and always will.

## 2. The next action

**Build `B40`.** It depends on nothing, blocks B41/B42/B43, and **must not be done after them.**
Its whole content is one sentence: *stay `stock` and keep the worry's `id` while the person is on
the template road, whatever the words say.* It changes nothing a person can see — if anything
looks different, something is wrong — and **it fails silently with every test passing** if it is
skipped. Read that file before touching anything.

**Then `B41` → `B42` → `B43`.** Nothing is blocked now. `B42` puts three sizes on the do screen
and it has room: measure against the numbers in the B39 task file rather than re-deriving them.
`B44` is last on purpose.

## 3. Two things measured and left alone, on purpose

**The front screen at 125% scrolls a little.** B38's new beat cost it the clearance B33 had
bought: *Not sure? Try one of these* ends 43px behind the menu, a 20px sliver showing. **It was
costed and there is nothing to take** — dropping the card's `dropped` line saves 30 and leaves
13; making the ghost a plain link saves 38 and leaves 5. And the harm is not the do screen's
harm: a mis-tap there navigates to *Your tests* and Back returns. Recorded in the B39 file.

**Tapping *New test* from the do screen wipes the sentence and the plan, with no warning.** That
is *New test* doing what it says, and it is B36 item 6 — *should a half-written test survive?* —
**a founder decision already waiting.** It matters less now that *Lock it in* is no longer
straddling the menu, but it is still the one destructive tap in the app.

## 4. Waiting on people, not on code

1. **The founder.** **B36 item 6** (above). Rule 10's third amendment, written down rather than
   arrived at (B37 §9a). B36 items 6 and 9. Start #19, the checking ritual (B34 §6). Which
   example leads the front screen, and **real or an example**. **The purpose statement**, still
   saying "you pick a worry", frozen in five places (`B29` has a candidate). **The `HARM` false
   refusal.** **Change the ad, not the app** (B25).
2. **Misha, in one ask:** **the front card's voice and the two reframed lines from B38** (six
   strings, all flippable), **B39's *Change* / *Add one*** (two more), the four nouns (B23 option
   b), the door order, the 21 chips, B36's tone, the **red strike** through a person's own
   sentence (B36 §12b), **and every skeleton in B41/B43** — where the risk is BETR's voice in
   somebody's mouth.
3. **The paid CBT reviewer, still the critical path. Send `docs/suggestions-review.csv`** — 245
   rows, 154 shipped lines beside 91 proposed, blank score and rewrite columns, reasoned in
   `docs/candidates-suggestions-batch-1.md`. Also `content/examples.js` (**+8 rows: four `did`
   and four `dropped`**), three rewritten `worries.js` sentences, three pairs from B1, B34 §4's
   `general.thens`, **B36's strings and B38's four**. Two questions: is *"the smallest version
   that could still turn out wrong"* safe to hand somebody with no clinician, and may *A small
   go* change **who it is with**? **B43 adds ~26.**
4. **A screen-reader pass on a real phone** — the tree was read in B33, **nobody has used it**,
   and B39 just added a disclosure row to the busiest screen.
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
  "document.documentElement.style.fontSize='20px'"` then tap your way there. Setting it after
  measures a screen laid out at the old size — box heights are set in JS now and keep the old
  number. **The fold is 785 / 780 / 774 / 720px at 100 / 125 / 150 / 200%.**
- **If a screen's state depends on focus, put it in the markup too.** A programmatic `.focus()`
  does not reliably fire a focus event — headless Chrome fires none — so anything hung on
  `onfocus` silently does not run on the way in (B39, `learnings.md`).
- **`shot` on the front screen catches it mid-reveal** — the card animates over 3.4s.
  `eval "document.getAnimations().forEach(function(a){a.finish();})"` first.
- **`walk.js` dies silently and a dead walker returns a stale page, not an error** — `start`
  again before believing a surprise. **Its browser is DARK**, so BETR opens dark (B35).
  **`theme.js` loads in the `<head>` before the stylesheet and has to**; tapping the look chip
  must never repaint. **Three roads reach the build screen** (B34 §1): check all three.
- **The fake DOM in `harness.js` is flat, fires no events and ignores `hidden`** — `grow()` is a
  no-op there by design. **A REGION DELETE NEEDS BOTH ENDS CHECKED** (`learnings.md`).
- **Chips are exempt from the capital-letter rule**, by class. **`rate.keyOf()` keys a ladder by
  `id`**, and rule 5 means a worry's **three predictions share one ladder**. **After editing
  `web/content/*`, `stop` and `start`**: `open` serves a cache.
- **`HABIT`/`BODY` refuse nothing any more**, still hold BETR's own content, and neither catches
  a checking ritual, which rule 4 also forbids.
- **Every word a person reads is in `web/content/`** — a sentence back in `app.js` fails
  `i18n.test.js`. **Use `’` and `“ ”`, never `'` and `"`**: the build fails on a typewriter one.
- **`content/zones.js` and `docs/COPY.md` are generated**; never hand-edit. No helpline number
  is written from memory.
