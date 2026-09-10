# Start here

**Last refreshed:** 2026-09-10, after B48 shipped and the founder settled B45 §7a.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**[`B48`](tasks/B48-the-greyed-example-belongs-to-this-worry.md) is done, and it was found by
opening the app rather than by reading a task file.** The greyed example in the second blank —
*", then* `somebody will think I'm selfish`*"* — was **one frozen string printed on every road on
every worry**, and it is the worry `no`'s first prediction. It was right on exactly one screen:
the front door before anybody taps anything, where the blank above it shows `no`'s sentence too.

**On 19 of 20 worries and 11 of the 12 front-door chips it was a prediction about a different
act**, offered by nothing on the screen — *If I sit with the restlessness for ten minutes, then
somebody will think I'm selfish*. **That is B34 D1 with the placeholder as the cause**: people
type the greyed words out instead of tapping them, which is why that rule exists at all.

It is now `thenHint()` — **the then-half of the first of the three currently under the blank**,
with her own word carried live on the keystroke. `build.thenPlaceholder` is **deleted**; nothing
drew it. **260 tests** (the new one fails against the old code — checked by putting it back).
Walked in Chrome on five roads and through to the ladder. **No sentence was written.**

**And the founder answered B45 §7a: the fold stays.** After somebody picks a size the other two
tuck away, and *Lock it in* stays above the fold. **B45 §3's difference 4 is CLOSED as a no**, not
deferred — the canvas is overruled on that row by the person whose canvas it is; do not "restore"
the open three. **Difference 9 is struck too**: never a drift — B41 has printed the hole's word as
a greyed placeholder since it was written, and B45 §3 read that row off the canvas, not off the
screen. **Read the screen before you believe the drift table.**

## 2. The next action

**Three candidates, and the first is the cheapest real one.**

1. **The plan box's placeholder, *"Or put it in your own words."*** — it sits *above* the three it
   is saying "or" about ([`B45`](tasks/B45-one-road-in.md) §12): **the same fault B48 just fixed,
   one screen later**, and the last of its kind. The canvas has *"Write what you'll do, or start
   from one of the three below."* **One string, the founder's and Misha's — ask, don't write it.**
2. **B45 §3 difference 3 — a size's own second hole**, filled on the do screen. The last unshipped
   item of §5, a screen change not content: inputs are drawn by scanning the skeleton's `if`, so
   a hole used only in a size prints its default for ever.
3. **B45 §3 difference 5** — the plan as a sentence with editable holes rather than a textarea.

**Do NOT take difference 4** (closed, §1) or **difference 6** (out of reach; the chip row grew to
382–1050px in §5c and it waits on a cull of the twelve).

## 3. Waiting on people, not on code

1. **The founder.** **(a) `docs/redraft-sheet.md`** — read the Mine column, disagree on the row;
   plus the four renames and three direct questions (`S10-D2`, `S15-P1`, `S18-D1`). **(b) B47 §6c**,
   the #07 split draft, with its three pushbacks. **(c) `ontime` sits behind the `work` door and
   it is the weakest door fit of the twenty** — is that where a person would look for it? **(d)
   the plan box placeholder above.** Then, still open: walk J4 and J5 on a phone, **B36 items 6
   and 9**, five answers on *Why it's written like this*, rule 10's third amendment (B37 §9a),
   which example leads the front screen, **the purpose statement**, the **`HARM` false refusal**,
   and **change the ad, not the app** (B25). **§7a is off this list — answered today.**
2. **Misha, in one ask.** `docs/COPY.md` is regenerated and is **one line shorter**
   (`build.thenPlaceholder` is gone; the sentence survives as worry `no`'s own prediction, which
   he already has). His list is otherwise unchanged: **the three new worries** (`want`, `think`,
   `ontime` — 39 sentences), **the placeholder** — now one, and load-bearing twice — the sixty
   size sentences from §5b, **the `yes` door's own line, which names three worries and has five**,
   B47 §6c's two new categories, B41's two skeletons, B42's three sets of three, B38's six
   strings, B39's *Change* / *Add one*, B40's *Write the whole thing myself*, the four nouns, the
   door order, the chips, B36's tone, the **red strike** (B36 §12b), and **`build.doOwnPlaceholder`**.
   **The redraft sheet is NOT for Misha yet.**
3. **The paid CBT reviewer, still the critical path. Send `docs/suggestions-review.csv`** —
   **295 live rows of 557**, unchanged today (B48 wrote no sentence). The questions on the rows:
   is the largest step safe as written (`W-*-D3`, and **`W-THINK-D3` and `W-ONTIME-D3` are the two
   we are least sure of**, beside `W-ST-D3`); are the three in order (`G-Z1`); may *A small go*
   change **who** it is with (every `W-*-D1`); `W-LOW-D1`; `S07-P3`; `S03-D4`.
4. **A screen-reader pass on a real phone** — B33 read the tree, **nobody has used it**. **Q1
   (name, trademark, domain)** blocks release. **Two API keys — Groq and Anthropic — still need
   rotating**; nobody owns the missing medication word list in `guards.js`. **Release conditions:**
   Misha on `places.signedOff` and all six door lines, J1–J5 on a phone, an owner for links.

## 4. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (260 pass); `node tools/copy-sheet.js` rewrites `docs/COPY.md` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** Live at **`https://betr.trybeup.com`** — every push to `main` touching `web/**` publishes it; cert expires 2026-12-02 |
| **The canvas** | the B45 spec, `claude.ai/code/artifact/77d1cadb-…`. **Read it with the Artifact tool** (`action: "read"`), then pull the artboards out of the `appifact-doc` script block. **It is overruled on difference 4** (§1) |
| **The sheet** | `docs/suggestions-review.csv`, **557 rows**, **CRLF and a BOM — keep both**. A `csv.reader` → `csv.writer(QUOTE_MINIMAL, lineterminator='\r\n')` round trip is byte-identical; **match a Status exactly**, `'shipped' in status` also catches `CULLED — was shipped` |

## 5. Gotchas, live

- **NEW, AND IT COST TWENTY MINUTES: `walk.js` CANNOT FIRE A FOCUS EVENT.** `el.focus()` from
  `eval` moves `activeElement` but **does not dispatch `focus`** in headless Chrome; `type` focuses
  the same way, `tap` uses `el.click()`. So anything on `onfocus` — **`refreshThens()`, B34 D1's
  live half** — looks dead. **Call it: `eval 'document.querySelector("#then").onfocus()'`.**
- **NEW: a function that depends on state must read that state itself.** `paintThenHint()` worked
  for two callers who called `readBlanks()` a line above, and silently returned the last paint's
  answer for the third — no crash, no test failure.
- **THERE IS ONE CONTENT FILE FOR A WORRY.** `worries.js` holds the twenty, plus `BETR_GENERAL`
  and `BETR_FRONT`. **`starts.js` is deleted; do not recreate it.** `skeleton` and `sizes` are
  REQUIRED; **`test` and `drop` are read by nothing** — `sizes[0]` word for word (`checkSizes0`).
- **A WALK NEEDS A SIZE TAP, ON EVERY ROAD** — nothing is in either box on the plan screen until
  `[data-size]` is tapped.
- **A FALLBACK CHAIN THAT CAN RETURN NOTHING IS A BRANCH** (learnings, 2026-09-10); an optional
  content field the code branches on is a road nobody drew (2026-09-09).
- **THE SHEET'S `Line` COLUMN IS NOT WHAT THE APP SAYS** for the older rows. **Read
  `web/content/`**, not the CSV.
- **CROSS-WORRY DUPLICATION IS NOT CAUGHT BY ANY TEST.** Twenty worries, twelve on the front door.
- **A rewrite can reach outside the content file** — `shrinkSaid` quotes `S01-P3` word for word,
  `smallest` is read on two guide screens, and **`build.ifPlaceholder` is load-bearing twice: the
  first blank's example AND the source of the second blank's**. **Grep first. The four culled ids
  are retired, never reused** — `phone` `reply` `check` `mist`, beside `cut`.
- **The door floor exists** — `MIN_PER_DOOR = 4`, `phone` (2) the only dated exception. **Two count
  canaries** (269 proposed lines, 12 chips) **move only for a cull, say which**. **`shows`/`hides`
  are SUBSTRING checks** — **name a sentence only that screen carries**. **`walk.js tap` takes ONE
  selector.** A size button is nested spans: use `sizeText()`.
- **Set the font size BEFORE navigating** to measure at 125%. **The fold is 785 / 780 / 774 / 720px
  at 100 / 125 / 150 / 200%. A WIDENING IS MORE DANGEROUS THAN A CHANGE** (B40); **WHEN CONTENT
  GAINS A VARIABLE, GREP EVERY COMPARISON** (B41).
- **`shot` on the front screen catches it mid-reveal**; `getAnimations().finish()` throws on the
  infinite one. **A dead `walk.js` returns a stale page, not an error, and its browser is DARK. The
  fake DOM is flat, ignores `hidden`, and fires no events. After editing `web/`, `stop` and
  `start`** — `open` serves a cache. **Every word a person reads is in `web/content/`. Use `’` and
  `“ ”`, never `'` and `"`. `content/zones.js` and `docs/COPY.md` are generated**; no number from
  memory.
