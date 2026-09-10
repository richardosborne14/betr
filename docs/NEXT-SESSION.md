# Start here

**Last refreshed:** 2026-09-10, after B49 and B50 shipped and the founder took three calls.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**[`B49`](tasks/B49-the-grey-lines-and-a-size-of-its-own.md), and half of it was B48 again.** The
leave-out box greyed out **“Don’t give a reason.”** — `no`'s own `sizes[0].drop`, word for word,
on all twenty worries, above three that were right. **A fault class does not have one instance.**
Both grey lines now name the box and point down: *“Write what you’ll do / what you’ll leave out,
or start from one of the three below.”* **Misha has read neither.**

**B49 also built the canvas's differences 3, 5 and 8, on one worry — the founder's call over the
recommendation, taken knowingly.** `no`'s small go is *…about **{thing}***; pick that size and the
plan **is that sentence with a blank in it**; the rung reads ***A small go · the Saturday thing***.
**No sentence was written.** `content.js` refuses a hole outside the if-half but a size's `do`.

**[`B50`](tasks/B50-the-front-door-swaps-round.md): the front screen's two buttons swapped
places** — ***Find yours*** is big and opens the doors, ***Write my own*** is the ghost. Asked
for as a taste call; **it is B45 §4's last unshipped row**, which has said since 2026-09-09 that
writing your own is "an exit, not the entrance". **Nothing failed for two days**, because every
test navigates that screen by id and no id says which button it is on. One does now; `#not-sure`
is `#pick`. **Two more drafts for Misha.**

**269 tests** (was 260), every new one checked against the old code; walked at 100%, 125% and
**200%**, which found a page that scrolled sideways.

## 2. The next action — four, and only the first two are code
1. **`happened.placeholder` — *“He said ‘fair enough’ and got his own coffee.”*** The **last
   frozen worked example in the app**, on every worry. Deliberately left: that box has **no
   suggestions under it**, so it shows what an observation-without-a-verdict looks like rather
   than what to write. **Decide it on purpose** (B49 §8.4) — one string, the founder's.
2. **The other nineteen worries' size holes.** Sixty sentences, an hour, one question: *"are there
   already words here standing in for something a person would name?"* Where yes it is free, the
   way `no`'s was; **where no, leave it** — inventing one is BETR proposing a sentence.
3. **The bottom row's *New test* still opens the two empty blanks** — the exit, on every screen.
   Consistent while the free-text road was the entrance; a question since B50. One line either
   way, and it is the founder's (B50 §5.1).
4. **B45 §3 difference 7** — the repeat screen. Half shipped; its "all three open" half collides
   with difference 4, closed as a **no**.

**Do NOT take difference 4** (closed) or **difference 6** (the chip row is 382–1050px; it waits
on a cull of the twelve).

## 3. Waiting on people, not on code

1. **The founder.** **(a) `docs/redraft-sheet.md`** — read the Mine column, disagree on the row;
   plus four renames and three questions (`S10-D2`, `S15-P1`, `S18-D1`). **(b) B47 §6c.** **(c)
   `ontime` is behind the `work` door and it is the weakest fit of the twenty.** **(d)
   `happened.placeholder`, above.** Then: walk J4 and J5 on a phone, B36 items 6 and 9, five
   answers on *Why it's written like this*, rule 10's third amendment (B37 §9a), which example
   leads the front screen, **the purpose statement**, the **`HARM` false refusal**, **B25**.
2. **Misha, in one ask.** `docs/COPY.md` is regenerated. **Four strings changed today and all
   four are drafts nobody but the founder has read**: `build.doOwnPlaceholder` and
   `build.dropPlaceholder` (the plan screen's two boxes), plus B50's `start.borrow` (*Find
   yours*) and `start.go` (*Write my own*). Otherwise unchanged: **the three new worries**
   (`want`, `think`, `ontime` — 39 sentences), the sixty size sentences, **the `yes` door's own
   line, which names three worries and has five**, B47 §6c, B41's skeletons, B42's sizes, B38's
   six strings, B39's *Change* / *Add one*, B40's *Write the whole thing myself*, the four nouns,
   the door order, the chips, B36's tone, the **red strike**. **The redraft sheet is not.**
3. **The paid CBT reviewer, still the critical path. Send `docs/suggestions-review.csv`** —
   **295 live rows of 557.** One row moved today: `W-NO-D1`'s Line now shows `{thing}` where it
   showed "something small", **and the sentence on the screen did not change** — the flag on the
   row says so, and it needs no re-scoring. The questions: is the largest step safe as written
   (`W-*-D3`; **`W-THINK-D3` and `W-ONTIME-D3` are the two we are least sure of**, beside
   `W-ST-D3`); are the three in order (`G-Z1`); may *A small go* change **who** it is with (every
   `W-*-D1`); `W-LOW-D1`; `S07-P3`; `S03-D4`.
4. **A screen-reader pass on a real phone** — B33 read the tree, **nobody has used it**. **Q1
   (name, trademark, domain) blocks release.** **Two API keys — Groq and Anthropic — need
   rotating**; nobody owns the medication list in `guards.js`. **Release:** Misha on
   `places.signedOff` and six door lines, J1–J5 on a phone, an owner for links.

## 4. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (269 pass); `node tools/copy-sheet.js` rewrites `docs/COPY.md` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** Live at **`https://betr.trybeup.com`** — every push to `main` touching `web/**` publishes it; cert expires 2026-12-02 |
| **The canvas** | the B45 spec, `claude.ai/code/artifact/77d1cadb-…`. **Read it with the Artifact tool** (`action: "read"`), then pull the artboards out of the `appifact-doc` script block — **the reply is 2.4MB of editor chrome; parse the saved file.** **Overruled on difference 4** |
| **The sheet** | `docs/suggestions-review.csv`, **558 rows with the header**, **CRLF and a BOM — keep both**. A `csv.reader` → `csv.writer(QUOTE_MINIMAL, lineterminator='\r\n')` round trip is byte-identical; **match a Status exactly** |

## 5. Gotchas, live

- **NEW: `ch` IS THE WIDTH OF A “0” AND PROSE IS NOT MADE OF NOUGHTS.** A blank sized in `ch`
  comes out ~26% wider than the lowercase words in it. Fine in a flex row, wrong inside a
  sentence. `growSaid()` measures the real font and answers in **`em`, never px**. **Anything
  sized from content needs a `max-width`** — at 200% a measured blank was 562px in a 350px card
  and the page scrolled sideways. **Check every walk at 200%:** `eval
  'JSON.stringify({scrollW:document.documentElement.scrollWidth, innerW:innerWidth})'` — equal is
  right. `calc(100% - .7em)`: the `.7em` is the sentence's full stop.
- **NEW, TWICE OVER: A GREEN SUITE PROVES NOTHING ABOUT A SCREEN NOBODY READ.** (a) **When a
  string was wrong because content moved, check every string of its kind** — `grep -n
  "[Pp]laceholder" web/content/strings-en.js` against `worries.js`; B48 and B49 are one bug on
  consecutive screens. (b) **Navigating by id tests nothing about what a person sees** — the
  front buttons were the wrong way round for two days. **Assert the class and the arrow** (B50).
- **`walk.js` CANNOT FIRE A FOCUS EVENT.** `el.focus()` from `eval` moves `activeElement` but
  **does not dispatch `focus`**; `type` and `tap` are the same, so `onfocus` work
  (**`refreshThens()`**) looks dead. **Call it:** `eval '…querySelector("#then").onfocus()'`.
- **THERE IS ONE CONTENT FILE FOR A WORRY.** `worries.js` holds the twenty, plus `BETR_GENERAL`
  and `BETR_FRONT`. **`starts.js` is deleted.** `skeleton` and `sizes` are REQUIRED; **`test` and
  `drop` are read by nothing** — `sizes[0]` word for word (`checkSizes0`).
- **A WALK NEEDS A SIZE TAP, ON EVERY ROAD.** On `no`'s **A small go** there is no `#do` box —
  the plan is `.plan-said` with `#p-thing` in it. **A fallback chain that can return nothing is a
  branch**; an optional content field the code branches on is a road nobody drew.
- **A rewrite can reach outside the content file** — `shrinkSaid` quotes `S01-P3`, `smallest` is
  read on two guide screens, **`build.ifPlaceholder` is load-bearing twice**. **Grep first.**
  Culled ids are retired — `phone` `reply` `check` `mist`, `cut`. **The door floor exists**
  (`MIN_PER_DOOR = 4`, `phone` the only dated exception), and **two count canaries** (269
  proposed lines, 12 chips) **move only for a cull — say which**.
- **`shows`/`hides` are SUBSTRING checks on the HTML** — a word inside `placeholder=` counts, one
  split by an `<input>` does not. **`walk.js tap` takes ONE selector.**
- **Set the font size BEFORE navigating** to measure at 125%. **The fold is 785 / 780 / 774 / 720
  at 100 / 125 / 150 / 200%. A WIDENING IS MORE DANGEROUS THAN A CHANGE**; **when content gains a
  variable, grep every comparison.**
- **`shot` on the front screen catches it mid-reveal**; `getAnimations().finish()` throws on the
  infinite one. **A dead `walk.js` returns a stale page, not an error, and its browser is DARK.
  The fake DOM is flat, ignores `hidden`, and fires no events. After editing `web/`, `stop` and
  `start`** — `open` serves a cache. **Every word a person reads is in `web/content/`. Use `’` and
  `“ ”`, never `'` and `"`. `zones.js` and `COPY.md` are generated**; no number from memory.
