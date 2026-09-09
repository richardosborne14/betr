# Start here

**Last refreshed:** 2026-09-09, after B45 §5b shipped.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**[`B45`](tasks/B45-one-road-in.md) §5b is done: every worry has its own three sizes.** Fifteen
worries gained them (`no` and `strug` had theirs from B42, and were the pattern). **Sixty new
sentences**, **+90 rows** in `docs/suggestions-review.csv` as `W-*-D1`…`X3`, sitting beside each
worry's predictions. **255 tests pass.**

Two rules went in with it, and they are why this is not just content. **`sizes` is now REQUIRED
on a worry** — it was optional, and optionality was silently choosing which of two roads a person
walked (see the new [`learnings.md`](learnings.md) entry; it broke 48 tests in one edit). **And
the smallest of the three IS the worry's own `test` and `drop`, word for word**, checked by
`checkSizes0` — so one worry holds one wording, and §5c can delete the pair without deciding
anything. Fourteen `test` lines were reworded to carry the worry's hole.

**Walked on a phone.** `feed`, with *three days* typed into the blank: all three sizes read *"Go
**three days** without opening…"*, her word marked. **The fold got worse and it is now everybody's
problem** — arriving, the page is 1005px against an 844px screen and *Lock it in* is off it;
tapping a size folds the row back to 850px. That is B45 §7a, and it is the founder's call.

## 2. The next action

**B45 §5c, the merge** — `starts.js` and `worries.js` become one file, twenty-nine things in one
shape. It is the last big piece and it **needs the reviewer** for the overlapping pairs. If that
is too big to start: **difference 3, a size's own hole filled on the do screen** — the mockup's
*"about [a thing]"*. It is a screen change, not content, it needs nobody, and B45 §5b's note says
exactly why it cannot be done in the content file alone (`holeRow()` scans the skeleton's `if`).

## 3. Two lines that were listed as inputs to §5b and did NOT get written in

Both are in the task file in full, and both are somebody's decision rather than an oversight.

1. **`S15-D1`, the founder's *"someone you're comfortable with"* for asking for help.** It turns
   the **who** dial, which is exactly B42's open question (`W-NO-D1` / `W-ST-D1`, the reviewer's
   with Misha) — and on the worry road she has already named the person a screen earlier, so a
   size that renames them argues with her own words. It lands in §5c or after the reviewer rules.
2. **`S18-D1`, the founder's *"where you're allowed to"* for leaving early.** The redraft sheet
   asks them whether they want it and says it belongs in `early`'s **small go**. **They have not
   answered.** Shipping it would put *asking permission* into the smallest version of the one test
   that is about not asking permission. **One line of `early`, the moment they say yes.**

## 4. Waiting on people, not on code

1. **The founder.** **(a) `docs/redraft-sheet.md`** — read the Mine column, disagree on the row;
   plus the four renames, and three rows that ask a direct question (`S10-D2`, whether a `do` may
   say *calmly and clearly*; `S15-P1`, which start gets *they'll think I'm weak*; `S18-D1`, above).
   **(b) B47 §6c**, the #07 split draft, with its three pushbacks. **(c) B45 §7a, and it is bigger
   than it was**: three sizes open put *Lock it in* below the fold on **every** worry now, not two.
   Then, still open: **walk J4 and J5 on a phone**, **B36 items 6 and 9** (tapping *New test* wipes
   the sentence with no warning), five answers on *Why it's written like this*, rule 10's third
   amendment (B37 §9a), which example leads the front screen, **the purpose statement**, the
   **`HARM` false refusal**, and **change the ad, not the app** (B25).
2. **Misha, in one ask.** `docs/COPY.md` prints every string in its own block and is regenerated.
   **It just grew by 165 lines: the sixty new size sentences are in it.** Plus **the `yes` door's
   own line** (*"An answer sent the second the message lands"* was `reply` and is now *"Doing it
   all yourself rather than asking"*, which is `help` — nobody has read that sentence), B47 §6c's
   two new categories, B41's two skeletons, B42's three sets of three, B38's six strings, B39's
   *Change* / *Add one*, B40's *Write the whole thing myself*, the four nouns, the door order, the
   chips, B36's tone, and the **red strike** (B36 §12b). **The redraft sheet is NOT for Misha yet.**
3. **The paid CBT reviewer, still the critical path. Send `docs/suggestions-review.csv`** — now
   **359 live rows of 518**, every dead one marked with why. **The ninety new rows are the biggest
   single block ever added and every one is BETR proposing something to somebody with no clinician
   near them.** The questions to put on the rows: is the largest step safe as written (`W-*-D3`,
   and `W-ST-D3` still the one we are least sure of, because it hands the length of the thing to
   the other person); **are the three actually in order** (`G-Z1`); may *A small go* change **who**
   it is with (`W-NO-D1` / `W-ST-D1`, and now every `W-*-D1`); `W-LOW-D1`, where *"one person you
   trust"* came out because she names the person a screen earlier; `S07-P3`; and `S03-D4`.
4. **A screen-reader pass on a real phone** — B33 read the tree, **nobody has used it**. **Q1
   (name, trademark, domain)** blocks release. **Two API keys — Groq and Anthropic — still need
   rotating**; nobody owns the missing medication word list in `guards.js`. **Release
   conditions:** Misha on `places.signedOff` and all six door lines, J1–J5 on a phone, an owner
   for links and helplines.

## 5. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (255 pass); `node tools/copy-sheet.js` rewrites `docs/COPY.md` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** Live at **`https://betr.trybeup.com`** — every push to `main` touching `web/**` publishes it; cert expires 2026-12-02 |
| **The sheet** | `docs/suggestions-review.csv`, **518 rows**, **CRLF and a BOM — keep both** or the whole file shows as changed. Columns: `Ref, Where, If I…, Type, Status, Line, Our flag, Accept (1-5), Rewrite, Reviewer notes` |

## 6. Gotchas, live

- **A WALK NOW NEEDS A SIZE TAP.** Nothing is in either box on the plan screen until
  `[data-size]` is tapped — on **every** worry, not the two that had sizes. Every test helper was
  changed for it (`borrowed` in `a11y.test.js`, `lockOne` in `menu.test.js`).
- **`prefillPlan()` NOW RETURNS ON EVERY ROAD**, so nothing in the app reads a worry's `test` or
  `drop`. They are held equal to the small go by `checkSizes0` rather than deleted; deleting two
  of the seven parts of a worry is §5c's job.
- **THE SHEET'S `Line` COLUMN IS NOT WHAT THE APP SAYS** for the older rows. **Read
  `web/content/`**, not the CSV, when you need to know what a person sees.
- **CROSS-START DUPLICATION IS NOT CAUGHT BY ANY TEST**, and neither is cross-*worry*: two sizes
  under **one** worry may not say the same thing, two worries' may.
- **A rewrite can reach outside `starts.js`** — `strings-en.js`'s `shrinkSaid` quotes `S01-P3`
  word for word, and `smallest` is one string read on two guide screens. **Grep first.**
- **The four culled ids are retired, never reused** — `phone` `reply` `check` `mist`, beside `cut`.
  `rate.keyOf()` keys a person's ladder by `id`.
- **The door floor exists** — `MIN_PER_DOOR = 4`, `phone` (2) and `yes` (3) dated exceptions; a
  third needs the founder. **Two count canaries** (102 suggestion lines, 12 chips) **move only for
  a cull, and say which**.
- **`shows`/`hides` are SUBSTRING checks** and a screen's title is word for word its own link's
  text — **name a sentence only that screen carries**. **`walk.js tap` takes ONE selector.**
- **Set the font size BEFORE navigating** to measure at 125%. **The fold is 785 / 780 / 774 /
  720px at 100 / 125 / 150 / 200%.** **A WIDENING IS MORE DANGEROUS THAN A CHANGE** (B40); **WHEN
  CONTENT GAINS A VARIABLE, GREP EVERY COMPARISON AGAINST IT** (B41). **Never depend on an event.**
- **`shot` on the front screen catches it mid-reveal** — and `getAnimations().finish()` throws on
  the infinite one; finish them by name or skip it. **A dead `walk.js` returns a stale page, not
  an error, and its browser is DARK.** **The fake DOM is flat and ignores `hidden`.** **Chips are
  exempt from the capital-letter rule; a size name is not.** **After editing `web/content/*`,
  `stop` and `start`**: `open` serves a cache.
- **Every word a person reads is in `web/content/`.** **Use `’` and `“ ”`, never `'` and `"`.**
  **`content/zones.js` and `docs/COPY.md` are generated**; no helpline number from memory.
