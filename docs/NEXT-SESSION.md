# Start here

**Last refreshed:** 2026-09-10, after B49 shipped and the founder took two calls.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**[`B49`](tasks/B49-the-grey-lines-and-a-size-of-its-own.md) is done, and half of it was B48
again.** The leave-out box greyed out **“Don’t give a reason.”** — the worry `no`'s own
`sizes[0].drop`, word for word, on all twenty worries and on the free-text road, sitting directly
above three that were right. **A fault class does not have one instance**, and B48's sibling was
one screen along. Both grey lines on that screen now name the box and point down at the three:
*“Write what you’ll do / what you’ll leave out, or start from one of the three below.”*
**Founder's pick of two options. Misha has not read either.**

**And the canvas's differences 3, 5 and 8 are built, on one worry — the founder's call over the
recommendation, taken knowingly.** `no`'s small go is *Say no to {person} once today, about
**{thing}***; once that size is picked the plan **is that sentence with a blank in it**, and the
rung reads ***A small go · the Saturday thing***. **No sentence was written** — `{thing}` is
“about something small” made tappable. `content.js` now refuses a hole outside the if-half
anywhere but a size's `do`.

**268 tests** (was 260); all eight new ones were checked against the old code. Walked in Chrome
on three roads at 100%, 125% and **200%**, which found a page that scrolled sideways.

## 2. The next action

**Three, and the first is the only one that is code.**
1. **`happened.placeholder` — *“He said ‘fair enough’ and got his own coffee.”*** The **last
   frozen worked example in the app**, on every worry. Looked at and deliberately left: that box
   has **no suggestions under it**, so the example shows what an observation-without-a-verdict
   looks like rather than what to write. **Decide it on purpose** (B49 §8.4) — one string, the
   founder's.
2. **The other nineteen worries' size holes.** Sixty sentences, an hour, and the question is only
   *"are there already words here standing in for something a person would name?"* Where yes it is
   free, the way `no`'s was. **Where no, leave it alone** — inventing one is BETR proposing a
   sentence, and that is the reviewer's. `enough` and `drink` carry `{thing}` in the **if**-half,
   which is a different thing.
3. **B45 §3 difference 7** — the repeat screen. Half shipped (`sizeAgain`, the `Last time` mark);
   its "all three open" half collides with difference 4, closed as a **no**.

**Do NOT take difference 4** (closed) or **difference 6** (the chip row is 382–1050px; it waits
on a cull of the twelve).

## 3. Waiting on people, not on code

1. **The founder.** **(a) `docs/redraft-sheet.md`** — read the Mine column, disagree on the row;
   plus the four renames and three questions (`S10-D2`, `S15-P1`, `S18-D1`). **(b) B47 §6c**, the
   #07 split draft. **(c) `ontime` sits behind the `work` door and it is the weakest door fit of
   the twenty.** **(d) `happened.placeholder`, above.** Then: walk J4 and J5 on a phone, **B36
   items 6 and 9**, five answers on *Why it's written like this*, rule 10's third amendment (B37
   §9a), which example leads the front screen, **the purpose statement**, the **`HARM` false
   refusal**, **change the ad, not the app** (B25). **The plan-box placeholder is off this list.**
2. **Misha, in one ask.** `docs/COPY.md` is regenerated. **Two strings changed and both are
   drafts nobody but the founder has read**: `build.doOwnPlaceholder` and `build.dropPlaceholder`,
   which say the same thing in the same shape about the two boxes on the plan screen. Otherwise
   unchanged: **the three new worries** (`want`, `think`,
   `ontime` — 39 sentences), the sixty size sentences from §5b, **the `yes` door's own line,
   which names three worries and has five**, B47 §6c's two new categories, B41's two skeletons,
   B42's three sets of three, B38's six strings, B39's *Change* / *Add one*, B40's *Write the
   whole thing myself*, the four nouns, the door order, the chips, B36's tone, the **red
   strike**. **The redraft sheet is NOT for Misha yet.**
3. **The paid CBT reviewer, still the critical path. Send `docs/suggestions-review.csv`** —
   **295 live rows of 557.** One row moved today: `W-NO-D1`'s Line now shows `{thing}` where it
   showed "something small", **and the sentence on the screen did not change** — the flag on the
   row says so, and it needs no re-scoring. The questions: is the largest step safe as written
   (`W-*-D3`; **`W-THINK-D3` and `W-ONTIME-D3` are the two we are least sure of**, beside
   `W-ST-D3`); are the three in order (`G-Z1`); may *A small go* change **who** it is with (every
   `W-*-D1`); `W-LOW-D1`; `S07-P3`; `S03-D4`.
4. **A screen-reader pass on a real phone** — B33 read the tree, **nobody has used it**. **Q1
   (name, trademark, domain)** blocks release. **Two API keys — Groq and Anthropic — need
   rotating**; nobody owns the missing medication list in `guards.js`. **Release:** Misha on
   `places.signedOff` and all six door lines, J1–J5 on a phone, an owner for links.

## 4. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (268 pass); `node tools/copy-sheet.js` rewrites `docs/COPY.md` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** Live at **`https://betr.trybeup.com`** — every push to `main` touching `web/**` publishes it; cert expires 2026-12-02 |
| **The canvas** | the B45 spec, `claude.ai/code/artifact/77d1cadb-…`. **Read it with the Artifact tool** (`action: "read"`), then pull the artboards out of the `appifact-doc` script block — **the tool result is 2.4MB of editor chrome; parse the saved file, not the reply.** **Overruled on difference 4** |
| **The sheet** | `docs/suggestions-review.csv`, **558 rows with the header**, **CRLF and a BOM — keep both**. A `csv.reader` → `csv.writer(QUOTE_MINIMAL, lineterminator='\r\n')` round trip is byte-identical; **match a Status exactly** |

## 5. Gotchas, live

- **NEW: `ch` IS THE WIDTH OF A “0” AND PROSE IS NOT MADE OF NOUGHTS.** A blank sized in `ch`
  comes out ~26% wider than the lowercase words in it. Fine in the build screen's flex row,
  wrong inside a sentence. `growSaid()` measures the real font and writes the answer in **`em`,
  never px**. **And anything sized from content needs a `max-width`** — at 200% text a measured
  blank was 562px in a 350px card and the page scrolled sideways. **Check every walk at 200%:**
  `eval 'JSON.stringify({scrollW:document.documentElement.scrollWidth, innerW:innerWidth})'` —
  equal is right. `calc(100% - .7em)`, not 100%: the `.7em` is the sentence's full stop.
- **NEW: WHEN A STRING WAS WRONG BECAUSE CONTENT MOVED, CHECK EVERY STRING OF ITS KIND.**
  `grep -n "[Pp]laceholder" web/content/strings-en.js`, then read each against `worries.js`.
  Five minutes. B48 and B49 are the same bug on consecutive screens.
- **`walk.js` CANNOT FIRE A FOCUS EVENT.** `el.focus()` from `eval` moves `activeElement` but
  **does not dispatch `focus`**; `type` focuses the same way, `tap` uses `el.click()`. Anything
  on `onfocus` — **`refreshThens()`** — looks dead. **Call it:
  `eval 'document.querySelector("#then").onfocus()'`.** Same for `oninput` after `type`.
- **THERE IS ONE CONTENT FILE FOR A WORRY.** `worries.js` holds the twenty, plus `BETR_GENERAL`
  and `BETR_FRONT`. **`starts.js` is deleted; do not recreate it.** `skeleton` and `sizes` are
  REQUIRED; **`test` and `drop` are read by nothing** — `sizes[0]` word for word (`checkSizes0`).
- **A WALK NEEDS A SIZE TAP, ON EVERY ROAD.** On `no`'s **A small go** there is no `#do` box at
  all now — the plan is `.plan-said` with `#p-thing` in it. **A fallback chain that can return
  nothing is a branch**, and an optional content field the code branches on is a road nobody drew.
- **A rewrite can reach outside the content file** — `shrinkSaid` quotes `S01-P3`, `smallest` is
  read on two guide screens, **`build.ifPlaceholder` is load-bearing twice**. **Grep first. The
  culled ids are retired, never reused** — `phone` `reply` `check` `mist`, beside `cut`.
- **The door floor exists** — `MIN_PER_DOOR = 4`, `phone` (2) the only dated exception. **Two
  count canaries** (269 proposed lines, 12 chips) **move only for a cull, say which**.
  **`shows`/`hides` are SUBSTRING checks on the HTML** — a word inside `placeholder=` counts, a
  word split by an `<input>` does not. **`walk.js tap` takes ONE selector.**
- **Set the font size BEFORE navigating** to measure at 125%. **The fold is 785 / 780 / 774 /
  720px at 100 / 125 / 150 / 200%. A WIDENING IS MORE DANGEROUS THAN A CHANGE**; **when content
  gains a variable, grep every comparison**.
- **`shot` on the front screen catches it mid-reveal**; `getAnimations().finish()` throws on the
  infinite one. **A dead `walk.js` returns a stale page, not an error, and its browser is DARK.
  The fake DOM is flat, ignores `hidden`, and fires no events. After editing `web/`, `stop` and
  `start`** — `open` serves a cache. **Every word a person reads is in `web/content/`. Use `’` and
  `“ ”`, never `'` and `"`. `zones.js` and `COPY.md` are generated**; no number from memory.
