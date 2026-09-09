# Start here

**Last refreshed:** 2026-09-09, after the redraft sheet went in.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**[`B47`](tasks/B47-the-cull.md)'s cull is applied and its redraft sheet is written.** The cull
went first — **twenty-one starts are twelve, twenty-one worries are seventeen**, four `why.js`
explanations went with their worries, the doors refilled. Then §7 item 3, the same day:
**[`docs/redraft-sheet.md`](redraft-sheet.md)**, all **85** of the founder's rewrites beside the
line the app says today and a redraft of each — **24 take theirs, 23 keep ours, 23 are a third
line, 8 need nothing. 254 tests pass; nothing was applied and the app is untouched.**

**It is built to be answered on the row**; rows they don't mention are agreed. It also carries
**the four renames as decisions of their own** (#04 #10 #14 #18, and #04's should wait for the
merge or it lands on a moving name) and **five findings that only exist because all 85 were laid
out together** — three duplications the founder's rewrites close, three they would create, one
that reaches outside `starts.js` into the guide's worked example, and a shape problem in five
lines that is the same one B47 §4 found in three. **`phone` is still at two and that is recorded,
not missed** — §6c's #07 split is what takes it to three.

## 2. The next action

**Both remaining pieces of B47 are somebody else's to read, not a session's to build** — §6c and
the redraft sheet's Mine column. Nothing in the app changes until one comes back.

**So the unblocked work is [`B45`](tasks/B45-one-road-in.md) §5b, three sizes per worry**, and it
is cheaper than the last file said: the cull took nineteen worries to seventeen. **Two inputs for
it came out of the redraft sheet** — the founder's *"someone you're comfortable with"*
(`S15-D1`) is what **A small go** should say for asking for help, and their *"where you're
allowed to"* (`S18-D1`) is the guard for leaving early, which belongs in a size and not welded
onto a `do`. **Then:** #07's two categories once §6c is read · **then** B45 §5c, the merge.

## 3. What the review did NOT cover, and somebody will assume it did

It was **the 245-row version**: every `S01`–`S21` row and the old general set. **Not marked: the
`W-*` rows — `worries.js`, the road most people are actually on** — nor the ~30 newer general
rows (`GW-*`, `GD-*`). **Eight worries were never in it at all:** `feed` `care` `low` `angry`
`hear` `joke` `sorry` `drink`. **And `Accept (1-5)` is empty on all 428 rows** — nothing scored,
so this is the founder's editorial pass, not the reviewer's clinical one, **and the critical
path has not moved.**

## 4. Waiting on people, not on code

1. **The founder.** **Two things now.** **(a) `docs/redraft-sheet.md`** — read the Mine column,
   disagree on the row; plus the four renames, and three rows that ask a direct question
   (`S10-D2`, whether a `do` may say *calmly and clearly*; `S15-P1`, which start gets *they'll
   think I'm weak*; `S18-D1`, where the *allowed to* guard lives). **(b) B47 §6c**, the #07 split
   draft, with its three pushbacks: *"I'll have a panic attack"* left out on purpose,
   guided-mindfulness answered no, and whether draft B stays the right side of rule 4. Then,
   still open: **walk J4 and J5 on a phone**, **B36 items 6 and 9** (tapping *New test* wipes the
   sentence with no warning), five answers on *Why it's written like this*, rule 10's third
   amendment (B37 §9a), which example leads the front screen, **the purpose statement**, the
   **`HARM` false refusal**, and **change the ad, not the app** (B25).
2. **Misha, in one ask.** `docs/COPY.md` prints every string in its own block and is regenerated.
   **The `yes` door's own line** — *"An answer sent the second the message lands"* was `reply`
   and is now *"Doing it all yourself rather than asking"*, which is `help`. Nobody has read that
   sentence. Plus **B47 §6c's two new categories** (fourteen sentences), B41's two skeletons,
   B42's three sets of three, B38's six strings, B39's *Change* / *Add one*, B40's *Write the
   whole thing myself*, the four nouns, the door order, the chips, B36's tone, and the **red
   strike** (B36 §12b). **The redraft sheet is NOT for Misha yet** — it wants the founder's
   answer first.
3. **The paid CBT reviewer, still the critical path. Send `docs/suggestions-review.csv`** —
   **269 live rows** of 428, every dead one marked with why, ten carrying `OURS: AGREED
   2026-09-09` so he scores what the app says now. **Six questions, each on the rows it belongs
   to:** is *"the smallest version that could still turn out wrong"* safe with no clinician
   (`GD-R1`); may *A small go* change **who it is with** (`W-NO-D1` / `W-ST-D1`); is the largest
   step safe as written (`W-NO-D3` / `W-ST-D3`, which hands the length of the thing to the other
   person); **are the three actually in order** (`G-Z1`); `S07-P3`, where we kept the shipped
   line rather than write *"I'll have a panic attack"*; and `S03-D4`, whether *"one thing you've
   been keeping to yourself"* is bounded enough with no clinician behind it.
4. **A screen-reader pass on a real phone** — B33 read the tree, **nobody has used it**. **Q1
   (name, trademark, domain)** blocks release. **Two API keys — Groq and Anthropic — still need
   rotating**; nobody owns the missing medication word list in `guards.js`. **Release
   conditions:** Misha on `places.signedOff` and all six door lines, J1–J5 on a phone, an owner
   for links and helplines.

## 5. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (254 pass); `node tools/copy-sheet.js` rewrites `docs/COPY.md` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** Live at **`https://betr.trybeup.com`** — every push to `main` touching `web/**` publishes it; cert expires 2026-12-02 |
| **The sheet** | `docs/suggestions-review.csv`, 428 rows, **CRLF and a BOM — keep both** or the whole file shows as changed. Columns: `Ref, Where, If I…, Type, Status, Line, Our flag, Accept (1-5), Rewrite, Reviewer notes` |

## 6. Gotchas, live

- **THE SHEET'S `Line` COLUMN IS NOT WHAT THE APP SAYS.** Five rows were applied on 2026-09-09
  and the column still holds the old string. **Read `web/content/starts.js`**, not the CSV, when
  you need to know what a person sees. The redraft sheet was built that way on purpose.
- **CROSS-START DUPLICATION IS NOT CAUGHT BY ANY TEST.** `content.test.js` holds no two `thens`
  under **one** start; two starts may quietly carry the same prediction, and three pairs already
  nearly did. Nobody sees it — the cost is a wasted slot and a reviewer scoring one line twice.
- **A rewrite can reach outside `starts.js`** — `strings-en.js`'s `shrinkSaid` quotes `S01-P3`
  word for word, and `smallest` is one string read on two guide screens. **Grep first.**
- **The four culled ids are retired, never reused** — `phone` `reply` `check` `mist`, in
  `worries.js`'s header beside `cut`. `rate.keyOf()` keys a person's ladder by `id`.
- **The door floor exists now.** `MIN_PER_DOOR = 4` in `content.test.js`, `phone` (2) and `yes`
  (3) named as dated exceptions. **A third exception needs the founder.** **Two count canaries
  moved with the cull and both carry a note** — `content.test.js` 150→90 suggestion lines,
  `loop.test.js` 20→12 chips; **move one only for a cull, and say which**. **`lockOne` in
  `menu.test.js` takes a door index now** — don't re-couple it to the first door.
- **`shows`/`hides` are SUBSTRING checks** and a screen's title is word for word its own link's
  text, so a `hides()` on the title is never true — **name a sentence only that screen carries**.
  **`walk.js tap` takes ONE selector** and ignores anything after it: `tap '[data-b="1"]'`.
- **Set the font size BEFORE navigating** to measure at 125%. **The fold is 785 / 780 / 774 /
  720px at 100 / 125 / 150 / 200%.** **A WIDENING IS MORE DANGEROUS THAN A CHANGE** (B40); **WHEN
  CONTENT GAINS A VARIABLE, GREP EVERY COMPARISON AGAINST IT** (B41) — nothing crashes, a
  sentence rots. **Never depend on an event**: a programmatic `.focus()` fires none in headless
  Chrome and none at all in the fake DOM.
- **`shot` on the front screen catches it mid-reveal** — finish the animations with `eval` first.
  **A dead `walk.js` returns a stale page, not an error, and its browser is DARK.** **The fake DOM
  is flat and ignores `hidden`**; **A REGION DELETE NEEDS BOTH ENDS CHECKED**. **Chips are exempt
  from the capital-letter rule**, by class — **a size name is not**. **After editing
  `web/content/*`, `stop` and `start`**: `open` serves a cache. **`HABIT`/`BODY` refuse nothing a
  PERSON writes** — they still hold every word BETR writes.
- **Every word a person reads is in `web/content/`** (a sentence in `app.js` fails
  `i18n.test.js`). **Use `’` and `“ ”`, never `'` and `"`.** **`content/zones.js` and
  `docs/COPY.md` are generated**; never hand-edit, and no helpline number is written from memory.
