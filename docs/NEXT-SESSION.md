# Start here

**Last refreshed:** 2026-09-09, after B42 closed.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**B42 is built and closed** — 244 tests, no dependencies, nothing requested after load; `main`
clean and live at `https://betr.trybeup.com`. **It is the dial, and it is content rather than a
control.** *What will you do today?* opens with an empty box and **three named steps** under it
— *A small go · A bigger go · The whole thing* — each a whole sentence, in order, with her own
word already in it. Tapping one fills
**both** boxes, because a size is a step and the leave-out that belongs to it. That is the
founder's small / medium / big as three sentences a person can read (B36 item 8, B37 §8), and
**it is on the worry road and the free-text road alike**: two worries carry their own three
(`no`, `strug`), `starts.js` `general` carries the three everything else falls through to.
**Neither set has been read by Misha or the reviewer.**

**What is recorded is the size's NAME.** It rides in B40's `size` field, shows on the ladder row
(*"Down one rung. Done at: A small go."*) and in the export, and **keys nothing** — `rate.keyOf()`
still groups by the worry's id, so three sizes of one worry are one ladder (rule 5). Never
numbered, greyed, recommended or fewer than three: five tests hold each, and `content.js` refuses
a digit in a size name outright.

**The prefill moved, and that was the one piece of code B42 had to shift.** It happened at
`borrow()`, before anybody had typed into a hole; it happens on the way to the do screen now,
and **on a worry with three sizes there is no prefill at all** — the three are the choice, and a
pre-filled box is BETR having picked. Two knock-ons, both intended: *Write the whole thing
myself* no longer carries BETR's plan out of the worry's road, and the do box's placeholder asks
for her own words rather than showing a worked example that would read as a fourth suggestion.

## 2. The next action

**Build `B43`** — two templates, walked. It is the *"try it out"*: the founder holding a real
templated test on a real phone, end to end, on both skeletons and at every size, and **~26 more
sentences for the reviewer's pile**. Everything it depends on is shipped. Then `B44` (*Make it
smaller* and *Why it's written like this*), last on purpose. **Read B42's built log before
touching the do screen** — its fold table is measured, and re-deriving it costs an hour.

## 3. Changed on purpose, and measured and left

**A new row on a screen that had just started fitting is a fold, not a row** (learnings.md).
Three sizes are 257px at 100% and put *Lock it in* at 862 against a 785 fold — B39's bug, back,
the day after B39 closed it. Trimming bought 100%; **folding the row onto its own answer**, in
B39's own component, bought 125%.

**Left, all measured, all in B42's table.** At 125% *Lock it in* sits at 925 **before the first
pick** — not B39's failure, because an empty plan refuses, and the three all end by 705. At 200%
this screen has never fitted (the unchanged road is 1172 against a 720 fold) and B42 adds 22px.
**The repeat screen did not fit at 125% before today either** (834 with no row); the folded line
adds 41 to a 54px overhang, which is why it sits inside the plan card, 26px against 81. Still
live: the escape link behind the menu at 125%, the front screen's 20px sliver, the clipped second
placeholder, and **tapping *New test* from the do screen wipes the sentence and the plan with no
warning** — B36 item 6, waiting on the founder.

## 4. Waiting on people, not on code

1. **The founder.** **B36 items 6 and 9** (item 6 above). Rule 10's third amendment, written down
   rather than arrived at (B37 §9a). Start #19, the checking ritual (B34 §6). Which example leads
   the front screen, **real or an example**. **The purpose statement**, frozen in five places
   (`B29` has a candidate). **The `HARM` false refusal**, and **change the ad, not the app** (B25).
2. **Misha, in one ask:** **B41's two skeletons and B42's three sets of three**, plus every
   template in B43 — the risk is BETR's voice in somebody's mouth; `docs/COPY.md` prints each in
   its own block and explains a `{person}`. Also B38's six strings, B39's *Change* / *Add one*,
   B40's *Write the whole thing myself*, B42's *How big a go? Any of them counts*, the four nouns
   (B23 option b), the door order, the 21 chips, B36's tone, and the **red strike** (B36 §12b).
3. **The paid CBT reviewer, still the critical path. Send `docs/suggestions-review.csv`** — 245
   rows, reasoned in `docs/candidates-suggestions-batch-1.md`. Also `content/examples.js`, three
   rewritten `worries.js` sentences, three pairs from B1, B34 §4's `general.thens`, B36's strings,
   B38's four, B41's eight predictions **and B42's three sets of three**. Three questions: is
   *"the smallest version that could still turn out wrong"* safe for somebody with no clinician;
   may *A small go* change **who it is with** (B42's open one); and **are the three actually in
   order** — no test can check that and the reviewer holds it. **B43 adds ~26 more.**
4. **A screen-reader pass on a real phone** — B33 read the tree, **nobody has used it**, and B41
   and B42 have both added things inside sentences and rows since. **Q1 (name, trademark,
   domain)** blocks release.
5. **Two API keys — Groq and Anthropic — still need rotating**; nobody owns the missing
   medication word list in `guards.js`. **Release conditions:** Misha on `places.signedOff`, J1–J3
   on a phone, an owner for links and helplines.

## 5. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root**; `node tools/copy-sheet.js` rewrites `docs/COPY.md` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** Live at **`https://betr.trybeup.com`** — every push to `main` touching `web/**` publishes it; cert expires 2026-12-02 |

## 6. Gotchas, live

- **`walk.js tap` takes ONE selector and silently ignores anything after it** — `tap '[data-b]' 1`
  taps `data-b="0"` and says nothing. Hand it `tap '[data-b="1"]'` (B40). The harness takes an index.
- **To measure at 125%, set the font size BEFORE navigating.** `eval
  "document.documentElement.style.fontSize='20px'"`, then tap your way there. **The fold is
  785 / 780 / 774 / 720px at 100 / 125 / 150 / 200%.** And **measure the state a person is
  actually in**: a button below the fold matters as much as it is possible to press it.
- **`shows`/`hides` are SUBSTRING checks** (B42): *How big a go* is a prefix of *How big a go?
  Any of them counts:*, so a `hides()` on the shorter one can never be true while the longer one
  is on screen. Name a string that is not a prefix of another on the same screen.
- **A WIDENING IS MORE DANGEROUS THAN A CHANGE** (B40) and **WHEN CONTENT GAINS A VARIABLE, GREP
  EVERY COMPARISON AGAINST IT** (B41), both in `learnings.md`: readers are fine, comparisons
  quietly return "no", nothing crashes, a good sentence becomes worse. B42's `planFor()` was the
  third, found by looking rather than by a test.
- **Never depend on an event**: a programmatic `.focus()` fires none in headless Chrome (B39) and
  the fake DOM none at all (B41). Put the state in the markup and re-read it on the tap.
- **`shot` on the front screen catches it mid-reveal** — the card animates over 3.4s; run `eval
  "document.getAnimations().forEach(function(a){a.finish();})"` first.
- **`walk.js` dies silently and a dead walker returns a stale page, not an error. Its browser is
  DARK**, so BETR opens dark (B35); **`theme.js` loads in the `<head>` before the stylesheet and
  has to.** **Three roads reach the build screen** (B34 §1): check all three. **The fake DOM is
  flat and ignores `hidden`**, and **A REGION DELETE NEEDS BOTH ENDS CHECKED** (`learnings.md`).
- **Chips are exempt from the capital-letter rule**, by class — **a size name is not**, being a
  label on a button. **`rate.keyOf()` keys a ladder by `id`**; rule 5 means a worry's three
  predictions and its three sizes share one ladder. **After editing `web/content/*`, `stop` and
  `start`**: `open` serves a cache. **`HABIT`/`BODY` refuse nothing any more**, still hold BETR's
  own content — **which now includes every size** — and neither catches a checking ritual (rule 4).
- **Every word a person reads is in `web/content/`** (a sentence back in `app.js` fails
  `i18n.test.js`). **Use `’` and `“ ”`, never `'` and `"`**: the build fails on a typewriter one.
  **`content/zones.js` and `docs/COPY.md` are generated**; never hand-edit, and no helpline number
  is ever written from memory.
