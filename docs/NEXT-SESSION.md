# Start here

**Last refreshed:** 2026-09-09, after the cull went in.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**[`B47`](tasks/B47-the-cull.md)'s cull is applied.** The founder answered the door question the
same afternoon and the whole thing went in as one move: **twenty-one starts are twelve,
twenty-one worries are seventeen**, four `why.js` explanations went with their worries, three
single `do` lines went, and the doors are refilled. **254 tests pass** and the loop was walked
end to end in a real browser — doors, plan, lock, outcome, re-rate, result.

**The `work` door was refilled by borrowing, not by putting anything back.** Nobody had noticed
that doors already share worries — `sit`, `strug`, `no`, `angry` and `help` each sit behind two.
So *Never letting myself stop* is now **rest · enough · help · no**: asking for help is handing
work over, saying no is not taking more on. Four again, nothing written, nothing resurrected.

**The cull hit a third door nobody was watching.** `yes` lost `reply` and that promoted *Saying
no without giving a reason* to the top — which waits on somebody asking you for something, and
**the first worry behind a door has to be startable the day it is tapped**. Founder's call: lead
on `help`, leave the door at three. `help` joined `STARTS_TODAY` for the reason `care` and
`praise` are already on it.

**`phone` is at two and that is recorded, not missed.** Nothing among the seventeen belongs
behind it. **§6c's #07 split is what takes it to three, and that draft is still unread.**

## 2. The next action

**§6c — the #07 split, and it is the founder's and Misha's to read, not a session's to build.**
Two new categories, fourteen sentences, drafted in [`B47`](tasks/B47-the-cull.md) §6c with three
things they should push back on. It is the only part of B47 left, and it is what refills `phone`.

**If they have not read it, the unblocked work is the redraft sheet** (B47 §7 item 3): every
surviving rewrite, the founder's line beside ours, in one document, so answer 4 — *"the founder
sees their line and mine side by side before anything is committed"* — can happen. ~90 rows
across twelve starts, none of it blocked, none of it touching the app.

**Then:** #07's two categories once they and Misha have read the draft · **then** B45 §5c, the
merge, on a list that has finally stopped moving. **B45 §5b is unblocked and cheaper than it
was** — three sizes per worry, and the cull took nineteen to seventeen.

## 3. What the review did NOT cover, and somebody will assume it did

It was **the 245-row version**. Marked: every `S01`–`S21` row and the old general set. **Not
marked: the `W-*` rows — `worries.js`, the road most people are actually on** — nor the ~30
newer general rows (`GW-*`, `GD-*`). **Eight worries were never in the reviewed sheet at all:**
`feed` `care` `low` `angry` `hear` `joke` `sorry` `drink`.

**And `Accept (1-5)` is empty on all 428 rows.** Nothing was scored — this reads as the founder's
editorial pass, not the reviewer's clinical one, **so the critical path has not moved.**

## 4. Waiting on people, not on code

1. **The founder.** **B47 §6c**, the #07 split draft, with its three pushbacks: *"I'll have a
   panic attack"* left out on purpose, guided-mindfulness answered no (a link lives in
   `places.js`, never in a test), and whether draft B stays the right side of rule 4. Then, still
   open: **walk J4 and J5 on a phone**, **B36 items 6 and 9** (tapping *New test* wipes the
   sentence with no warning), five answers on *Why it's written like this*, rule 10's third
   amendment (B37 §9a), which example leads the front screen, **the purpose statement**, the
   **`HARM` false refusal**, and **change the ad, not the app** (B25).
2. **Misha, in one ask.** `docs/COPY.md` prints every string in its own block and is regenerated.
   **New today: the `yes` door's own line** — *"An answer sent the second the message lands"* was
   `reply` and is now *"Doing it all yourself rather than asking"*, which is `help`. Nobody has
   read that sentence. Plus **B47 §6c's two new categories** (fourteen sentences), B41's two
   skeletons, B42's three sets of three, B38's six strings, B39's *Change* / *Add one*, B40's
   *Write the whole thing myself*, the four nouns, the door order, the chips, B36's tone, and the
   **red strike** (B36 §12b).
3. **The paid CBT reviewer, still the critical path. Send `docs/suggestions-review.csv`** — and
   it is a much better ask than it was: **269 live rows** of 428, every dead one marked with why,
   and ten carrying `OURS: AGREED 2026-09-09` so he scores what the app says now. **Six
   questions, each on the rows it belongs to:** is *"the smallest version that could still turn
   out wrong"* safe with no clinician (`GD-R1`); may *A small go* change **who it is with**
   (`W-NO-D1` / `W-ST-D1`); is the largest step safe as written (`W-NO-D3` / `W-ST-D3`, and
   `W-ST-D3` hands the length of the thing to the other person); **are the three actually in
   order** (`G-Z1`); `S07-P3`, where we kept the shipped line rather than write *"I'll have a
   panic attack"*; and `S03-D4`, whether *"one thing you've been keeping to yourself"* is bounded
   enough with no clinician behind it.
4. **A screen-reader pass on a real phone** — B33 read the tree, **nobody has used it**.
   **Q1 (name, trademark, domain)** blocks release. **Two API keys — Groq and Anthropic — still
   need rotating**; nobody owns the missing medication word list in `guards.js`. **Release
   conditions:** Misha on `places.signedOff` and on all six door lines, J1–J5 on a phone, an
   owner for links and helplines.

## 5. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (254 pass); `node tools/copy-sheet.js` rewrites `docs/COPY.md` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** Live at **`https://betr.trybeup.com`** — every push to `main` touching `web/**` publishes it; cert expires 2026-12-02 |
| **The sheet** | `docs/suggestions-review.csv`, 428 rows, **CRLF and a BOM — keep both** or the whole file shows as changed. Columns: `Ref, Where, If I…, Type, Status, Line, Our flag, Accept (1-5), Rewrite, Reviewer notes` |

## 6. Gotchas, live

- **The four culled ids are retired, never reused** — `phone` `reply` `check` `mist`, written
  into `worries.js`'s header beside `cut`. `rate.keyOf()` keys a person's ladder by `id`.
- **The door floor exists now.** `MIN_PER_DOOR = 4` in `content.test.js`, with `phone` (2) and
  `yes` (3) named as dated exceptions. **A third exception needs the founder.**
- **Two count canaries were moved by the cull and both carry a note** — `content.test.js` 150→90
  suggestion lines, `loop.test.js` 20→12 chips. **Move one only for a cull, and say which.**
- **`lockOne` in `menu.test.js` takes a door index now** — walks used to hard-code the first door and assume four worries sat behind it. Don't re-couple them.
- **`shows`/`hides` are SUBSTRING checks** and a screen's title is word for word its own link's
  text, so a `hides()` on the title is never true. **Name a sentence only that screen carries.**
- **`walk.js tap` takes ONE selector and ignores anything after it** — hand it `tap '[data-b="1"]'`.
- **To measure at 125%, set the font size BEFORE navigating.** **The fold is 785 / 780 / 774 /
  720px at 100 / 125 / 150 / 200%.** Measure the state a person is actually in.
- **A WIDENING IS MORE DANGEROUS THAN A CHANGE** (B40); **WHEN CONTENT GAINS A VARIABLE, GREP
  EVERY COMPARISON AGAINST IT** (B41). Nothing crashes, a sentence rots.
- **Never depend on an event**: a programmatic `.focus()` fires none in headless Chrome and none
  at all in the fake DOM. Put the state in the markup and re-read it on the tap.
- **`shot` on the front screen catches it mid-reveal** — finish the animations with `eval` first.
  **A dead `walk.js` returns a stale page, not an error, and its browser is DARK.** **The fake DOM
  is flat and ignores `hidden`**; **A REGION DELETE NEEDS BOTH ENDS CHECKED** — a JS array's last
  item ends `}` and not `},`, which hung a cull script for two minutes today.
- **Chips are exempt from the capital-letter rule**, by class — **a size name is not**. **After
  editing `web/content/*`, `stop` and `start`**: `open` serves a cache. **`HABIT`/`BODY` refuse
  nothing a PERSON writes** — they still hold every word BETR writes.
- **Every word a person reads is in `web/content/`** (a sentence in `app.js` fails
  `i18n.test.js`). **Use `’` and `“ ”`, never `'` and `"`.** **`content/zones.js` and
  `docs/COPY.md` are generated**; never hand-edit, and no helpline number is written from memory.
