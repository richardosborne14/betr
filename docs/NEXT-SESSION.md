# Start here

**Last refreshed:** 2026-09-09, after B47 scoped the cull.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**The review came back, and it is saved.** 134 rows of the founder's own editorial pass are
merged into `docs/suggestions-review.csv` — rewrites and verdicts, matched by `Ref`, every one
found. **[`B47`](tasks/B47-the-cull.md) turns it into work** and the founder answered its four
questions the same day.

**The cull, decided:** nine whole starts (#05 #06 #09 #12 #16 #17 #19 #20 #21), the four worries
behind them (`check` `reply` `phone` `mist`), thirty-four single lines, and **start #07 split in
two and rewritten**. Twenty-one starts become twelve plus two; twenty-one worries become
seventeen plus one. **A drop carries across both files** — the founder's call, one list, one cull.

**The sheet is marked and it is 270 live rows, not 429.** Culled rows say `CULLED — was shipped`
and carry the reason; start #07's eleven say `REWRITE`; seven rows carry a new `Our flag` saying
the rewrite on them cannot be applied as written, with a suggested line beside it (B47 §4). **The paid reviewer's sheet just got
a third shorter and every dead row says why it is dead.**

**Ten rewrites we could not apply as written now have an agreed line, and five of them are
live** (B47 §4): `starts.js` #04, #08 ×2 and #11 ×2. One row is cut (`G-X4`), two fold into the
#07 split, one is the agreed wording for the merge, and `S07-P3` — *"I'll have a panic attack"* —
**stays a question for the reviewer rather than a line in the app**, with the founder's agreement.

**Nothing else in the content files changed, and that is the finding, not the shortfall.** See §2.

## 2. The next action

**§6b of B47 — the `work` door, and it is the founder's.** *Never letting myself stop* loses
`check` and `mist` to the cull and is left with two worries, **and the cull also took the one
start that would have refilled it** (#16, *stop before it's finished*). Nothing in the surviving
seventeen belongs behind it and nothing in the merge does either. Three ways out in B47 §6b:
put `mist` back, rewrite the door (Misha signs off door labels), or go to five doors.

**Nothing is deleted until that is answered**, because the cull is one move. Culling `starts.js`
alone is the option the founder was offered and turned down; culling `worries.js` alone leaves
two hollow doors on the screen they would next open. The `phone` door is fine — the #07 split
rescues it, three worries against its own "half the scroll, half not sitting still".

**Then, in order:** the cull in one commit with the door refill · the redraft sheet (every
surviving rewrite, the founder's line beside ours) · #07's two categories from §6c once they and
Misha have read the draft · **then** B45 §5c, the merge.

**B45 §5b is on hold and should stay there.** It writes three sizes for nineteen worries; four
of those worries are now deleted and one becomes two.

## 3. What the review did NOT cover, and somebody will assume it did

It is **the 245-row version**. Marked: every `S01`–`S21` row and the old general set. **Not
marked: the 159 `W-*` rows — `worries.js`, the road most people are actually on, all 133 added
at B46** — nor the ~30 newer general rows (`GW-*`, `GD-*`). **Eight worries were never in the
reviewed sheet at all:** `feed` `care` `low` `angry` `hear` `joke` `sorry` `drink`.

**And `Accept (1-5)` is empty on all 429 rows.** Nothing was scored — this reads as the founder's
editorial pass, not the reviewer's clinical one, **so the critical path has not moved.**

## 4. Waiting on people, not on code

1. **The founder.** **B47 §6b, the `work` door** — top of §2, and it blocks the cull. Then
   **B47 §6c**, the #07 split draft, with its three pushbacks: *"I'll have a panic attack"* left
   out on purpose, guided-mindfulness answered no (a link lives in `places.js`, never in a test),
   and whether draft B stays the right side of rule 4. Then, still open: **walk J4 and J5 on a
   phone**, **B36 items 6 and 9** (tapping *New test* wipes the sentence with no warning), five
   answers on *Why it's written like this*, rule 10's third amendment written down (B37 §9a),
   which example leads the front screen, **the purpose statement**, the **`HARM` false refusal**,
   and **change the ad, not the app** (B25).
2. **Misha, in one ask.** `docs/COPY.md` prints every string in its own block. **Now with B47
   §6c's two new categories** — fourteen sentences nobody has read — **and the `work` door**, if
   §6b goes the rewrite way. Plus B41's two skeletons, B42's three sets of three, B38's six
   strings, B39's *Change* / *Add one*, B40's *Write the whole thing myself*, the four nouns,
   the door order, the 21 chips, B36's tone, and the **red strike** (B36 §12b).
3. **The paid CBT reviewer, still the critical path. Send `docs/suggestions-review.csv`** — and
   it is a better ask than it was this morning: **270 live rows**, dead ones marked and
   explained, and ten carrying `OURS: AGREED 2026-09-09` so he scores what the app says now. **Four questions, each on the rows it belongs to:** is *"the smallest version that
   could still turn out wrong"* safe with no clinician (`GD-R1`); may *A small go* change **who
   it is with** (`W-NO-D1` / `W-ST-D1`); is the largest step safe as written (`W-NO-D3` /
   `W-ST-D3`, and `W-ST-D3` hands the length of the thing to the other person); and **are the
   three actually in order** (`G-Z1`). **Two more, both added 2026-09-09:** `S07-P3`, where we
   kept the shipped line rather than write *"I'll have a panic attack"*, and `S03-D4`, whether
   *"one thing you've been keeping to yourself"* is bounded enough with no clinician behind it.
4. **A screen-reader pass on a real phone** — B33 read the tree, **nobody has used it**.
   **Q1 (name, trademark, domain)** blocks release. **Two API keys — Groq and Anthropic — still
   need rotating**; nobody owns the missing medication word list in `guards.js`. **Release
   conditions:** Misha on `places.signedOff`, J1–J5 on a phone, an owner for links and helplines.

## 5. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (252 pass); `node tools/copy-sheet.js` rewrites `docs/COPY.md` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** Live at **`https://betr.trybeup.com`** — every push to `main` touching `web/**` publishes it; cert expires 2026-12-02 |
| **The sheet** | `docs/suggestions-review.csv`, 429 rows, **CRLF and a BOM — keep both** or the whole file shows as changed. Columns: `Ref, Where, If I…, Type, Status, Line, Our flag, Accept (1-5), Rewrite, Reviewer notes` |

## 6. Gotchas, live

- **Nothing is deleted from `worries.js` yet, and an id in a person's record cannot be brought
  back.** `rate.keyOf()` keys a ladder by `id`. Cull ids, never rename them.
- **Four to six worries a door, and only the SIX is enforced** (`MAX_PER_DOOR` in `content.js`).
  There is no floor, so a two-worry door passes the build: the tests miss what B47 §6b is about.
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
  is flat and ignores `hidden`**; **A REGION DELETE NEEDS BOTH ENDS CHECKED**.
- **Chips are exempt from the capital-letter rule**, by class — **a size name is not**. **After
  editing `web/content/*`, `stop` and `start`**: `open` serves a cache. **`HABIT`/`BODY` refuse
  nothing a PERSON writes** — they still hold every word BETR writes, B47's included.
- **Every word a person reads is in `web/content/`** (a sentence in `app.js` fails
  `i18n.test.js`). **Use `’` and `“ ”`, never `'` and `"`.** **`content/zones.js` and
  `docs/COPY.md` are generated**; never hand-edit, and no helpline number is written from memory.
