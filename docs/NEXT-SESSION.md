# Start here

**Last refreshed:** 2026-09-10, after B45 §5c shipped.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**[`B45`](tasks/B45-one-road-in.md) §5c is done: `web/content/starts.js` no longer exists.** One
content file, twenty worries, one shape. `startFor()` — the invisible lookup §9 asks for the head
of — went with it, and **§9's fourth bullet is met**. **259 tests pass** (three new). Walked in
Chrome on all three roads.

Twelve starts had described nine acts that were already worries, in their own words, with their
own predictions and no sizes. **That was not duplication, it was a fork** — two shipped wordings,
neither named as the live one ([`learnings.md`](learnings.md), 2026-09-10). Three starts had no
worry at all, including *say what I actually think*, **which is the act the founder's canvas
builds all seven of its screens on**. They are worries now: `want`, `think`, `ontime`.

**What a person gets that they did not get yesterday.** Tapping the front door's first suggestion
used to hand back *"Do it once today, in the smallest version that still counts"*. It now hands
back **`no`'s own three sizes** — *"Say no to somebody once today, about something small"* — and
`no`'s own three predictions. **Twelve roads stopped being generic and not one sentence was
written to do it**; §5e's cost (§12) is paid back. Full record in [`B45`](tasks/B45-one-road-in.md) §13.

## 2. The next action

**One of the four screen-shape drifts in [`B45`](tasks/B45-one-road-in.md) §3 — and drift 4 is
the one to take**, because it is `foldedSize()` and nothing else, and because it is the one the
canvas argues for in its own words: after she picks a size, **all three stay on screen** with the
chosen one filled in above them. **It collides with §7a, which is the founder's**, so read that
first — B39 spent a task getting *Lock it in* above the fold and B42 folded the three to keep it
there, and the canvas accepts running past it. If the founder has not answered, **take drift 2's
other half or drift 9 instead** (the hole shows its standing-in word in the blank; today the blank
is empty and the word only appears in the sentences below). **Do NOT take difference 6** — it is
measured out of reach and got further out today, see §3.

## 3. Measured today, and it changes one plan

**The chip row grew** — twelve chips were 353–998px and are **382–1050px** now, because a worry's
sentence is longer than a start's was (*say no to **somebody** without giving a reason*). **`What
will you do?` sits at 271 and is unaffected**, being above the row. But **difference 6, which puts
that button below the suggestions as the canvas draws it, is further out of reach than §3 measured,
not closer** — it waits on a cull of the twelve, or on the founder accepting the fold. The canvas's
own-words screen draws three if-chips and not twelve, so the canvas assumes that cull.

## 4. Waiting on people, not on code

1. **The founder.** **(a) `docs/redraft-sheet.md`** — read the Mine column, disagree on the row;
   plus the four renames and three direct questions (`S10-D2`, `S15-P1`, `S18-D1`). **(b) B47 §6c**,
   the #07 split draft, with its three pushbacks. **(c) B45 §7a, every road and not only every
   worry**: three sizes open put *Lock it in* below the fold at 125% everywhere. The canvas accepts
   that; B39 spent a task removing it. **Both cannot be true.** **(d) new today: `ontime` sits
   behind the `work` door and it is the weakest door fit of the twenty** — is that where a person
   would look for it? Then, still open: walk J4 and J5 on a phone, **B36 items 6 and 9**, five
   answers on *Why it's written like this*, rule 10's third amendment (B37 §9a), which example
   leads the front screen, **the purpose statement**, the **`HARM` false refusal**, and **change
   the ad, not the app** (B25).
2. **Misha, in one ask.** `docs/COPY.md` is regenerated and **shrank hard** this session: the 24
   parked plan lines and 36 duplicate predictions are gone, and the suggestions section is now a
   twelve-row pointer into the worry list. New for him: **the three new worries** (`want`, `think`,
   `ontime` — 39 sentences), **the two placeholders**, which changed because the content moved,
   and **the standing-in word doing double duty on the front door** (*If I say no to somebody…,
   then somebody will…*). Still unread: the sixty size sentences from §5b, **the `yes` door's own
   line — which now names three worries and has five**, B47 §6c's two new categories, B41's two
   skeletons, B42's three sets of three, B38's six strings, B39's *Change* / *Add one*, B40's
   *Write the whole thing myself*, the four nouns, the door order, the chips, B36's tone, the
   **red strike** (B36 §12b), and **`build.doOwnPlaceholder`**. **The redraft sheet is NOT for
   Misha yet.**
3. **The paid CBT reviewer, still the critical path. Send `docs/suggestions-review.csv`** — now
   **295 live rows of 557** (was 314 of 518: 58 duplicate start rows went `CUT`, 22 never-live
   proposals `PARKED`, 39 new worry rows in). The questions on the rows: is the largest step safe
   as written (`W-*-D3`, and **`W-THINK-D3` and `W-ONTIME-D3` are the two new ones we are least
   sure of**, beside `W-ST-D3`); are the three in order (`G-Z1`); may *A small go* change **who**
   it is with (every `W-*-D1`); `W-LOW-D1`; `S07-P3`; `S03-D4`.
4. **A screen-reader pass on a real phone** — B33 read the tree, **nobody has used it**. **Q1
   (name, trademark, domain)** blocks release. **Two API keys — Groq and Anthropic — still need
   rotating**; nobody owns the missing medication word list in `guards.js`. **Release conditions:**
   Misha on `places.signedOff` and all six door lines, J1–J5 on a phone, an owner for links.

## 5. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (259 pass); `node tools/copy-sheet.js` rewrites `docs/COPY.md` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** Live at **`https://betr.trybeup.com`** — every push to `main` touching `web/**` publishes it; cert expires 2026-12-02 |
| **The canvas** | the B45 spec, `claude.ai/code/artifact/77d1cadb-…`. **Read it with the Artifact tool** (`action: "read"`), then pull the artboards out of the `appifact-doc` script block — they are `.dc.html` files inside one JSON blob, not the page you get back |
| **The sheet** | `docs/suggestions-review.csv`, **557 rows**, **CRLF and a BOM — keep both**. A `csv.reader` → `csv.writer(QUOTE_MINIMAL, lineterminator='\r\n')` round trip is byte-identical; **match a Status exactly**, `'shipped' in status` also catches `CULLED — was shipped` |

## 6. Gotchas, live

- **THERE IS ONE CONTENT FILE FOR A WORRY NOW.** `worries.js` holds the twenty, plus `BETR_GENERAL`
  (what a sentence BETR did not write falls through to) and `BETR_FRONT` (which twelve the first
  blank offers, in order). **`starts.js` is deleted; do not recreate it.**
- **A WALK NEEDS A SIZE TAP, ON EVERY ROAD** — nothing is in either box on the plan screen until
  `[data-size]` is tapped. **`test` and `drop` on a worry are still read by nothing**: they are
  `sizes[0]` word for word, held equal by `checkSizes0`. `skeleton` and `sizes` are both REQUIRED.
- **A FALLBACK CHAIN THAT CAN RETURN NOTHING IS A BRANCH** (learnings, 2026-09-10); an optional
  content field the code branches on is a road nobody drew (2026-09-09).
- **THE SHEET'S `Line` COLUMN IS NOT WHAT THE APP SAYS** for the older rows. **Read
  `web/content/`**, not the CSV. (The 39 new rows were checked against the app and match.)
- **CROSS-WORRY DUPLICATION IS NOT CAUGHT BY ANY TEST.** With twenty worries and twelve of them on
  the front door, two that say nearly the same thing is now the easy mistake.
- **A rewrite can reach outside the content file** — `strings-en.js`'s `shrinkSaid` quotes `S01-P3`
  word for word, `smallest` is read on two guide screens, and **both placeholders are now held
  equal to `BETR_FRONT[0]`'s sentence by a test**. **Grep first.** **The four culled ids are
  retired, never reused** — `phone` `reply` `check` `mist`, beside `cut`; `rate.keyOf()` keys by id.
- **The door floor exists** — `MIN_PER_DOOR = 4`, and **`phone` (2) is now the only dated
  exception**; `yes` came off the list today at five. **Two count canaries** (269 proposed lines,
  12 chips) **move only for a cull, say which**.
- **`shows`/`hides` are SUBSTRING checks** — **name a sentence only that screen carries**.
  **`walk.js tap` takes ONE selector.** A size button is nested spans: use `sizeText()`.
- **Set the font size BEFORE navigating** to measure at 125%. **The fold is 785 / 780 / 774 / 720px
  at 100 / 125 / 150 / 200%.** **A WIDENING IS MORE DANGEROUS THAN A CHANGE** (B40); **WHEN CONTENT
  GAINS A VARIABLE, GREP EVERY COMPARISON** (B41). **Never depend on an event.**
- **`shot` on the front screen catches it mid-reveal**; `getAnimations().finish()` throws on the
  infinite one. **A dead `walk.js` returns a stale page, not an error, and its browser is DARK.**
  **The fake DOM is flat and ignores `hidden`.** **After editing `web/content/*`, `stop` and
  `start`** — `open` serves a cache. **Every word a person reads is in `web/content/`. Use `’` and
  `“ ”`, never `'` and `"`. `content/zones.js` and `docs/COPY.md` are generated**; no helpline
  number from memory.
