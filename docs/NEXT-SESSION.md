# Start here

**Last refreshed:** 2026-09-10, after B45 §5e shipped.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**[`B45`](tasks/B45-one-road-in.md) §5e is done: the do screen has ONE shape on every road**, and
B45 §2's *"worst single fact"* is gone. It was live on the front door: `sizesFor()` stopped at a
matched start, no start has `sizes`, so **tapping one of BETR's own twelve suggestions got the old
screen — two loose lines, no names, no dial — and typing something BETR had never seen got the
three named sizes.** Exactly backwards. The same act (*say no without giving a reason*) had a dial
on the worry road and none on the front door. **256 tests pass** (one new: it walks tapped, typed
and borrowed into that screen and asserts they are the same screen).

**Walked in Chrome, all three roads.** `buildDo()` lost its branch; `chipsFor()` is `thensFor()`;
**`prefillPlan()`, `draft.planned` and `betrs` are gone** — provably dead once §5b gave every worry
three sizes. Three strings went with the screen they belonged to.

**What it cost is in [`B45`](tasks/B45-one-road-in.md) §12 and it is real:** twelve starts have a
hand-written pair about the exact words tapped, and those roads now get the generic three.
**Nothing was thrown away** — the 24 sentences stay in `starts.js` as §5c's raw material, 45 sheet
rows went `shipped` → `CUT — no longer in the app` with the reason on each, COPY.md marks them
***(parked)***, and `changing-the-words.md` no longer promises they show.

## 2. The next action

**B45 §5c, the merge** — `starts.js` and `worries.js` become one file. It is the last big piece,
it is what gets those twelve sentences back, and it **needs the reviewer** for the overlapping
pairs (9 of the 12 starts are the same act as a worry that already has three sizes). Three starts
have no worry at all — *ask for what I actually want*, *say what I actually think* (the mockup's
own example), *don't rush to be early* — and each needs a label, a skeleton, three predictions,
three sizes and a door.

**If that is too big to start:** the box's placeholder says *"Or put it in your own words."* and
sits **above** the three it says "or" about — the canvas has *"Write what you'll do, or start from
one of the three below."* **One string**, but Misha's and the founder's. Difference 3 is the other
candidate; read §3 first, because it turns out to be difference **5** and no content uses it.

## 3. The canvas is readable now, and that changes two of the nine drifts

The mockup — *The template with holes*, the spec — was fetched and unpacked this session, so its
seven artboards and four notes are quotable rather than remembered. Two things it settles:

1. **Difference 3 is difference 5.** On the canvas the plan is not a textarea: it is a **sentence
   with editable holes** (*Give [my best friend] a little criticism about [her playlist]*), and a
   size's second hole is filled *in the plan itself*. Building 3 without 5 bolts a stray blank
   next to a box — and **no size has a second hole**, so it changes nothing until content does.
2. **Difference 6 cannot ship on both roads yet, and this was measured.** The canvas puts *What
   will you do?* at the bottom, under the suggestions and the safety line. On the worry road that
   is three chips and cheap. On the free-text road the chip row is **353–998px, twelve chips**, so
   the button would land at ~1060 against a 785 fold. **The canvas's own-words screen shows three
   if-chips, not twelve** — so the canvas assumes §5c's cull. Same order on both roads is §9's
   acceptance test, so difference 6 waits for §5c or for the founder to cut the twelve.

## 4. Waiting on people, not on code

1. **The founder.** **(a) `docs/redraft-sheet.md`** — read the Mine column, disagree on the row;
   plus the four renames, and three rows that ask a direct question (`S10-D2`, whether a `do` may
   say *calmly and clearly*; `S15-P1`, which start gets *they'll think I'm weak*; `S18-D1`).
   **(b) B47 §6c**, the #07 split draft, with its three pushbacks. **(c) B45 §7a, and it is now
   every ROAD and not only every worry**: three sizes open put *Lock it in* below the fold at 125%
   everywhere (measured: 860–950 against a 780 fold). The canvas accepts running past the fold;
   B39 spent a task getting that button above it. **Both cannot be true.** Then, still open: walk
   J4 and J5 on a phone, **B36 items 6 and 9**, five answers on *Why it's written like this*,
   rule 10's third amendment (B37 §9a), which example leads the front screen, **the purpose
   statement**, the **`HARM` false refusal**, and **change the ad, not the app** (B25).
2. **Misha, in one ask.** `docs/COPY.md` prints every string in its own block and is regenerated.
   It **shrank** this session (three dead strings out) and gained the ***(parked)*** marks. Still
   unread: the sixty size sentences from §5b, **the `yes` door's own line**, B47 §6c's two new
   categories, B41's two skeletons, B42's three sets of three, B38's six strings, B39's *Change* /
   *Add one*, B40's *Write the whole thing myself*, the four nouns, the door order, the chips,
   B36's tone, the **red strike** (B36 §12b), and now **`build.doOwnPlaceholder`** (§2 above).
   **The redraft sheet is NOT for Misha yet.**
3. **The paid CBT reviewer, still the critical path. Send `docs/suggestions-review.csv`** — now
   **314 live rows of 518** (was 359: 45 went to `CUT`). The questions to put on the rows: is the
   largest step safe as written (`W-*-D3`, and `W-ST-D3` still the one we are least sure of); are
   the three actually in order (`G-Z1`); may *A small go* change **who** it is with (`W-NO-D1` /
   `W-ST-D1`, and now every `W-*-D1`); `W-LOW-D1`; `S07-P3`; and `S03-D4`.
4. **A screen-reader pass on a real phone** — B33 read the tree, **nobody has used it**. **Q1
   (name, trademark, domain)** blocks release. **Two API keys — Groq and Anthropic — still need
   rotating**; nobody owns the missing medication word list in `guards.js`. **Release conditions:**
   Misha on `places.signedOff` and all six door lines, J1–J5 on a phone, an owner for links.

## 5. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (256 pass); `node tools/copy-sheet.js` rewrites `docs/COPY.md` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** Live at **`https://betr.trybeup.com`** — every push to `main` touching `web/**` publishes it; cert expires 2026-12-02 |
| **The canvas** | the B45 spec, `claude.ai/code/artifact/77d1cadb-…`. **Read it with the Artifact tool** (`action: "read"`), then pull the artboards out of the `appifact-doc` script block — they are `.dc.html` files inside one JSON blob, not the page you get back |
| **The sheet** | `docs/suggestions-review.csv`, **518 rows**, **CRLF and a BOM — keep both**. A `csv.reader` → `csv.writer(QUOTE_MINIMAL, lineterminator='\r\n')` round trip is byte-identical; **match a Status exactly**, `'shipped' in status` also catches `CULLED — was shipped` |

## 6. Gotchas, live

- **A WALK NEEDS A SIZE TAP, ON EVERY ROAD NOW.** Nothing is in either box on the plan screen
  until `[data-size]` is tapped — the free-text road included, where `[data-do]` no longer exists.
- **NOTHING READS A WORRY'S `test`/`drop`, OR A START'S `dos`/`drops`.** All four are still
  validated and still in the files; §5c decides their fate. **Editing one changes no screen.**
- **A FALLBACK CHAIN THAT CAN RETURN NOTHING IS A BRANCH** (learnings, 2026-09-10); an optional
  content field the code branches on is a road nobody drew (same lesson, 2026-09-09).
- **THE SHEET'S `Line` COLUMN IS NOT WHAT THE APP SAYS** for the older rows. **Read
  `web/content/`**, not the CSV, when you need to know what a person sees.
- **CROSS-START DUPLICATION IS NOT CAUGHT BY ANY TEST**, and neither is cross-*worry*.
- **A rewrite can reach outside `starts.js`** — `strings-en.js`'s `shrinkSaid` quotes `S01-P3` word
  for word, and `smallest` is read on two guide screens. **Grep first.** **The four culled ids are
  retired, never reused** — `phone` `reply` `check` `mist`, beside `cut`; `rate.keyOf()` keys by id.
- **The door floor exists** — `MIN_PER_DOOR = 4`, `phone` (2) and `yes` (3) dated exceptions.
  **Two count canaries** (102 suggestion lines, 12 chips) **move only for a cull, say which**.
- **`shows`/`hides` are SUBSTRING checks** — **name a sentence only that screen carries**.
  **`walk.js tap` takes ONE selector.** A size button is nested spans: use `sizeText()`.
- **Set the font size BEFORE navigating** to measure at 125%. **The fold is 785 / 780 / 774 /
  720px at 100 / 125 / 150 / 200%.** **A WIDENING IS MORE DANGEROUS THAN A CHANGE** (B40); **WHEN
  CONTENT GAINS A VARIABLE, GREP EVERY COMPARISON AGAINST IT** (B41). **Never depend on an event.**
- **`shot` on the front screen catches it mid-reveal**; `getAnimations().finish()` throws on the
  infinite one. **A dead `walk.js` returns a stale page, not an error, and its browser is DARK.**
  **The fake DOM is flat and ignores `hidden`.** **After editing `web/content/*`, `stop` and
  `start`**: `open` serves a cache.
- **Every word a person reads is in `web/content/`.** **Use `’` and `“ ”`, never `'` and `"`.**
  **`content/zones.js` and `docs/COPY.md` are generated**; no helpline number from memory.
