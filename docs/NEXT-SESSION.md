# Start here

**Last refreshed:** 2026-09-10, 4th session — **[`B51`](tasks/B51-the-second-question.md) §5 built, walked and pushed. 274 tests pass.** Rewritten, never appended to. Cap: 120 lines.

## 1. Where we are

**The loop asks a second question now, and it asks it on the screen a first test actually reaches.** The founder wrote *"If I
post my app on social media, then people will say it's rubbish"* and asked what happens when the prediction comes true. Nothing
did: the result screen struck their own sentence through against itself.

**B51's spec named the wrong screen, and walking it made the hole bigger.** `plan()` — the screen holding the second field `x` —
has **exactly one caller, `again()`**. So a first test was never asked anything at all: `guards.expectationFrom` cut the *If I
…, then* off the person's own sentence, stored the tail, and showed it back for the first time on the result. The read-only echo
with *Not quite? Change it* that B51 §2 described is the **repeat** screen.

**What shipped:** *plan.expectLabel* is **"And what would that mean for you?"** (the founder's pick of four; **Misha unread**),
with a box under it on **both** the build screen and the repeat screen. The app's own expectation is **greyed inside the box**
on every road, stock included (the founder's §9.3 call). **An empty box locks in that greyed sentence**, so nothing that worked
before can stop working. **The one hard stop runs on the box.** The box **grows to fit what is greyed in it**. No new blank, no
new screen, no new tap, **no store change**.

**Read [`B51`](tasks/B51-the-second-question.md) §12 and §13 before touching any of it.** §13 is what is knowingly left, and item
1 is that **the reviewer's three questions are unanswered and the founder chose to ship ahead of them.** If (a) comes back *no*,
this comes out again, and `docs/00-scope.md` §9 gains a named limit instead.

## 2. The next action — the first is code, the rest are not
1. **The other nineteen worries' size holes.** Sixty sentences, an hour, one question: *"are there already words standing in for
   something a person would name?"* Where yes it is free, the way `no`'s was; **where no, leave it** — inventing one is BETR
   proposing a sentence.
2. **`happened.placeholder` — *"He said 'fair enough' and got his own coffee."*** The **last frozen worked example in the app**,
   on every worry, and that box has **no suggestions under it**. Decide it on purpose (B49 §8.4) — one string, the founder's.
3. **The bottom row's *New test* still opens the two empty blanks** — the exit, on every screen; fine while free
   text was the entrance, a question since B50. One line, and it is the founder's.
4. **[`B51`](tasks/B51-the-second-question.md) §8, the post, is not started.** The correction pair the app now
   makes room for is the pair the post needs. **Written once, not twice.**
5. **B45 §3 difference 7** — the repeat screen. Half shipped; its "all three open" half collides with difference 4,
   closed as a **no**.

**Do NOT take difference 4** (closed) or **difference 6** (the chip row is 382–1050px; it waits on a cull of the
twelve). **Do not re-read the 60 `W-*-E` rows before the reviewer answers (b)** — B51 §13.2, their question.

## 3. Waiting on people, not on code

0. **A second track: [`B52`](tasks/B52-uptime-the-locks-and-the-one-number.md)** — uptime, security and usage, asked for before the first Instagram posts.
   **A pitch, nothing built, eleven decisions in its §6, most of them the founder's.** Found live that day: **three TrybeUP dev
   ports open to the internet**, no firewall, no rate limit, no HSTS, no CAA, **no uptime monitoring at all**.

1. **The founder.** **(a) `docs/redraft-sheet.md`** — read the Mine column, disagree on the row; plus four renames and three
   questions (`S10-D2`, `S15-P1`, `S18-D1`). **(b) B47 §6c.** **(c) `ontime` is the weakest fit of the twenty behind the `work`
   door.** **(d) `happened.placeholder`, above.** Then: walk J4 and J5 on a phone, B36 items 6 and 9, five answers on *Why it's
   written like this*, rule 10's third amendment (B37 §9a), which example leads the front screen, **the purpose statement**, the
   **`HARM` false refusal**, **B25**. *(B51 §9.3 is answered and shipped, with two more calls taken the same day.)*
2. **Misha, in one ask.** `docs/COPY.md` is regenerated. **NEW AND ALREADY LIVE: `plan.expectLabel`, *"And what would that mean
   for you?"*** — shipped unread, the way B49's two grey lines were, and it is on the last screen before *Lock it in* on
   **every** road; the other three drafts are in B51 §9.1. Still unread: **four strings** — `build.doOwnPlaceholder`,
   `build.dropPlaceholder`, `start.borrow` (*Find yours*), `start.go` (*Write my own*). Otherwise unchanged: **the three new
   worries** (`want`, `think`, `ontime` — 39 sentences), the sixty size sentences, **the `yes` door's own line, which names
   three worries and has five**, B47 §6c, B41's skeletons, B42's sizes, B38's six strings, B39's *Change* / *Add one*, B40's
   *Write the whole thing myself*, the four nouns, the door order, the chips, B36's tone, the **red strike**. **The redraft
   sheet is not.** *(`plan.edit` and `plan.editDone` are deleted — the edit button went with B51.)*
3. **The paid CBT reviewer, the critical path, and now overdue in a new way. Send `docs/suggestions-review.csv`** — **295 live
   rows of 557**, plus **B51 §9.2's three, the biggest thing we have asked them, and the app has shipped ahead of the answer**:
   is a second, cost-level prediction right for a tool with nobody in it, or does it invite rumination; should the **60 `W-*-E`
   rows** follow one rule (cost, never the event again — `W-SIT-E1` predicts the event again and is now greyed under a question
   only the cost answers); confirm Theory A/B and the survival experiment as B51 §7 states them. Standing: is the largest step
   safe (`W-*-D3`; **`W-THINK-D3` and `W-ONTIME-D3` least sure**, beside `W-ST-D3`); are the three in order (`G-Z1`); may *A
   small go* change **who** it is with (every `W-*-D1`); `W-LOW-D1`; `S07-P3`; `S03-D4`.
4. **A screen-reader AND CONTRAST pass on a real phone** — B33 read the tree, **nobody has used it**, and B51 adds one:
   **`--ink-3` on `--card` is about 3:1**, and the greyed sentence now carries what gets **stored**, not just an instruction
   (B51 §13.4). **Q1's name and trademark still block release; its address half was answered 2026-09-10 — `betr.trybeup.com` IS production.** **Two API keys — Groq and Anthropic — need rotating**; nobody
   owns `guards.js`'s medication list. **Release:** Misha on `places.signedOff` and six door lines, J1–J5 on a phone, an owner
   for links. **`docs/journeys.md` J1 is stale** beyond the two rows B51 fixed.

## 4. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (274 pass); `node tools/copy-sheet.js` rewrites `docs/COPY.md` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** Live at **`https://betr.trybeup.com`** — every push to `main` touching `web/**` publishes it; cert expires 2026-12-02 |
| **The canvas** | the B45 spec, `claude.ai/code/artifact/77d1cadb-…`. **Read it with the Artifact tool** (`action: "read"`), then pull the artboards out of the `appifact-doc` script block — **the reply is 2.4MB of editor chrome; parse the saved file.** Overruled on difference 4 |
| **The sheet** | `docs/suggestions-review.csv`, **558 rows with the header**, **CRLF and a BOM — keep both**. A `csv.reader` → `csv.writer(QUOTE_MINIMAL, lineterminator='\r\n')` round trip is byte-identical; **match a Status exactly** |

## 5. Gotchas, live

- **NEW: A SCREEN IS WHERE ITS CALLERS SEND YOU, NOT WHERE THE CODE SAYS IT IS.** B51 was specified off a careful read of
  `plan()` and named the wrong screen: **`go('plan')` has one caller, `again()`**, so it is the REPEAT screen and a first test
  never reached it. **Grep the callers and walk to it from the front door before specifying any change to a screen.** 269 tests
  walked `plan()` — every one of them by calling `again()` first.
- **NEW: AN ABSENCE ASSERTION DIES SILENTLY WHEN THE STRING DOES.** A test asserted `hides('Not quite? Change it')`; the button
  was deleted and it passed for ever after. **Name something that still exists**, and **mutate the code back and watch each new
  test fail before writing the commit message** — five mutations, four minutes.
- **NEW: A MADE-UP CUSTOM PROPERTY DISAPPEARS, IT DOES NOT FAIL.** `var(--bg)` — the page colour is **`--ground`** — rendered a
  transparent box, silently, with a green suite. **Read a new colour back:** `eval
  'getComputedStyle(document.querySelector("#x")).backgroundColor'`. **Two classes beat one class and a tag**: `.plan .line` was
  styling `textarea.line`; it is `.plan p.line` now. And **a placeholder cannot be scrolled** while every textarea is
  `resize:none` — **`growAnswer()`** borrows it into `value` for one frame to measure it, and answers in `em`.
- **`ch` IS THE WIDTH OF A “0” AND PROSE IS NOT MADE OF NOUGHTS.** A blank sized in `ch` comes out ~26% wider than the lowercase
  words in it. `growSaid()` measures the real font and answers in **`em`, never px**. **Anything sized from content needs a
  `max-width`** — at 200% a measured blank was 562px in a 350px card and the page scrolled sideways. **Check every walk at 200%:**
  `eval 'JSON.stringify({scrollW:document.documentElement.scrollWidth, innerW:innerWidth})'` — equal is right. In
  `calc(100% - .7em)` the `.7em` is the sentence's full stop.
- **A GREEN SUITE PROVES NOTHING ABOUT A SCREEN NOBODY READ.** (a) **A string wrong because content moved? check every string of
  its kind** — `grep -n "[Pp]laceholder" strings-en.js` against `worries.js` (B48/B49, one bug twice). (b) **Navigating by id
  tests nothing about what a person sees**: the front buttons were reversed for two days. **Assert class and arrow** (B50).
- **`walk.js` CANNOT FIRE A FOCUS EVENT.** `el.focus()` from `eval` moves `activeElement` but **dispatches no `focus`**; `type`
  and `tap` too, so `onfocus` work (**`refreshThens()`**) looks dead. **Call it:** `eval '…querySelector("#then").onfocus()'`.
- **THERE IS ONE CONTENT FILE FOR A WORRY.** `worries.js` holds the twenty plus `BETR_GENERAL` and `BETR_FRONT`; **`starts.js` is
  deleted**. `skeleton`/`sizes` REQUIRED; **`test` and `drop` are read by nothing** — `sizes[0]` word for word (`checkSizes0`).
- **A WALK NEEDS A SIZE TAP, ON EVERY ROAD.** On `no`'s **A small go** there is no `#do` box; the plan is `.plan-said` with
  `#p-thing` in it. **`shows`/`hides` are SUBSTRING checks on the HTML** and **`walk.js tap` takes ONE selector**.
- **A rewrite can reach outside the content file** — `shrinkSaid` quotes `S01-P3`, `smallest` is read on two guide screens,
  **`build.ifPlaceholder` is load-bearing twice**. **Grep first.** Culled ids are retired — `phone` `reply` `check` `mist`,
  `cut`. **The door floor exists** (`MIN_PER_DOOR = 4`), and **two count canaries** (269 lines, 12 chips) move only for a cull.
- **Set the font size BEFORE navigating** to measure at 125%. **The fold is 785 / 780 / 774 / 720 at 100 / 125 /
  150 / 200%. A WIDENING IS MORE DANGEROUS THAN A CHANGE.** B51 spent ~130px: *Lock it in* sits at **647–710** with
  a size picked, and at **825 with the three still open**, which is below the fold and was accepted.
- **`shot` on the front screen catches it mid-reveal**; `getAnimations().finish()` throws on the infinite one. **A dead
  `walk.js` returns a stale page, not an error, and its browser is DARK. The fake DOM is flat, ignores `hidden`, and fires no
  events. After editing `web/`, `stop` and `start`** — `open` serves a cache. **Every word a person reads is in
  `web/content/`. Use `’` and `“ ”`, never `'` and `"`. `zones.js` and `COPY.md` are generated**; no number from memory.
