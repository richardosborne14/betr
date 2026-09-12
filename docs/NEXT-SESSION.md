# Start here

**Last refreshed:** 2026-09-12, 7th session — **the founder asked for the lineage to be obvious, so TrybeUP now has a logo, a wordmark and a blurb on Help. 294 tests pass.** Rewritten, never appended to. Cap: 120 lines.

## 1. Where we are

**This session, [`B54`](tasks/B54-the-lineage-with-a-logo.md), from one founder message: *"a more obvious 'made by TrybeUP' with the logo … and the logo text … maybe a
little blurb about what is trybeup that leads them to the trybeup.com landing page?"*** Built, under *Who made this* on Help: the mark, **`TrybeUP™`**, TrybeUP's own
headline, the *personal-change app* paragraph, and one plain link. **Rule 9's "never styled apart" is amended** — by the founder, in the ask — and the rest of rule 9 is
untouched and still tested: Help only, not a button, no parameter on the link, **and the plain places entry above is unchanged**.

**Two things in the ask could not be built, and the reason is the app's own policy, not taste.** `img-src 'self' data:` and `font-src 'none'`, in `index.html` and in the
header B3 serves. So: **the logo is a file in the repo** — `web/trybeup-logo.png`, 6.4 KB, cropped off trybeup.com and committed, never hotlinked — and **the wordmark is
the system font at 600, not Inter from Google**. A hotlinked logo would not even appear; it would just be a request attempted on the one screen that promises none. If the
exact Inter letterforms are ever wanted, the only road is glyph outlines in an inline SVG (B54 §2).

**Three of the seven new sentences are safeguards, not copy**, carried over from B8's conditions and each held by a test: **what it costs including the paywall**, **that
TrybeUP has an AI coach**, and **that it is an account on their servers and nothing written here goes there**. **B54 §5.3 is the founder's to confirm and it is live:** BETR
says it has no AI two paragraphs above a sentence that says TrybeUP has one. The recommendation is to keep it — a feature found out after signing up is the betrayal
research §4 is about — but it is one line to delete. **B6's gate is still shut**; a block of prose is not the bridge.

**Before that: [`B53`](tasks/B53-the-bottom-rung-and-the-archive.md) — nothing happens at the bottom rung, on purpose, and Archive is what was actually missing.** A test
compares a rung-1 result screen with a rung-7 one button for button, so the next person who thinks a little celebration would be kind has to argue with its §3. Archive is
one array of ladder keys, **no version bump, nothing deleted, not in the export**. **Before that, [`B51`](tasks/B51-the-second-question.md) §5: the loop asks *"And what
would that mean for you?"*** on the last screen before *Lock it in*, on every road, **Misha unread**, and **§13 item 1: the reviewer's three questions are unanswered and
the founder shipped ahead of them.**

## 2. The next action — the first is code, the rest are not
1. **The other nineteen worries' size holes.** Sixty sentences, an hour, one question: *"are there already words standing in for something a
   person would name?"* Where yes it is free, the way `no`'s was; **where no, leave it** — inventing one is BETR proposing a sentence.
2. **`happened.placeholder` — *"He said 'fair enough' and got his own coffee."*** The **last frozen worked example in the app**, on every worry, and
   that box has **no suggestions under it**. Decide it on purpose (B49 §8.4) — one string, the founder's.
3. **The bottom row's *New test* still opens the two empty blanks** — the exit, on every screen; fine while free text was the entrance, a question
   since B50. One line, and it is the founder's.
4. **[`B51`](tasks/B51-the-second-question.md) §8, the post, is not started.** The correction pair the app makes room for is the pair the post needs.
5. **B45 §3 difference 7** — the repeat screen. Half shipped; its "all three open" half collides with difference 4, closed as a **no**.
**Do NOT take difference 4** (closed), **difference 6** (the chip row waits on a cull), or **the 60 `W-*-E` rows** (B51 §13.2, the reviewer's).

## 3. Waiting on people, not on code

0. **[`B52`](tasks/B52-uptime-the-locks-and-the-one-number.md) — uptime, security, the one number. §5c is BUILT**: the tally, on the
   founder's instruction, overruling the recommendation to wait. Two counts per day — every open, and the ones that did not say they were a robot; a `1`
   per open, nothing in a line. Five lines of nginx, mutation-tested behind an **allow-list of what the config may read at all** (§11);
   `help.airplane` changed twice; read from a button on github.com, never a command. **Live since 2026-09-10, 12:03 UTC**, verified on the real address (§10).
   The rest is still a pitch — **three TrybeUP dev ports open to the internet**, no firewall, no rate limit, no HSTS, no CAA, **no uptime
   monitoring at all**, eleven decisions in its §6. **Point any monitor at `/app.js`, never at the page**, or it counts itself.
1. **The founder.** **(a) B54 §5.3 — the word *AI* in the new block**, and **§4 — the three numbered steps from the landing page were deliberately left
   out.** **(b) `docs/redraft-sheet.md`** — read the Mine column, disagree on the row; plus four renames and three questions
   (`S10-D2`, `S15-P1`, `S18-D1`). **(c) B47 §6c.** **(d) `ontime` is the weakest fit of the twenty behind the `work` door.** **(e)
   `happened.placeholder`, above.** **(f) B53 §7.2 — *Test this again* and *Archive* are two ghost buttons of equal weight on a card.** Then: walk J4 and J5 on a phone, B36 items 6 and 9, five answers on *Why it's written like this*, rule
   10's third amendment (B37 §9a), which example leads the front screen **and whether four stays four** (`example-tests-bank.md` §4), **the
   purpose statement**, the **`HARM` false refusal**, **B25**.
2. **Misha, in one ask.** `docs/COPY.md` is regenerated. **NEWEST: B54's seven** — `help.makerName`, `makerTag` (**TrybeUP's own headline, word for
   word**), `makerWhat`, `makerAI`, `makerCost`, `makerApart`, `makerLink`, `makerLinkWhat`; they are TrybeUP's copy on BETR's Help screen, so he is the
   reviewer who matters most. **Then B53's five** — `mine.archive` (*Archive*), `mine.unarchive`,
   `mine.awayTitle` (*Archived*), **`mine.awayNote`, the longest new sentence in the app**, and `mine.allAway`. **ALREADY LIVE AND UNREAD:
   `plan.expectLabel`, *"And what would that mean for you?"*** — on the last screen before *Lock it in* on **every** road; the
   other three drafts are in B51 §9.1. Still unread: **four strings** — `build.doOwnPlaceholder`, `build.dropPlaceholder`, `start.borrow`
   (*Find yours*), `start.go` (*Write my own*). Otherwise unchanged: **the three new worries** (`want`, `think`, `ontime` — 39 sentences),
   the sixty size sentences, **the `yes` door's own line, which names three worries and has five**, B47 §6c, B41's skeletons, B42's sizes,
   B38's six strings, B39's *Change* / *Add one*, B40's *Write the whole thing myself*, the four nouns, the door order, the chips, B36's
   tone, the **red strike**. **The redraft sheet is not.**
3. **The paid CBT reviewer, the critical path, and overdue. Send `docs/suggestions-review.csv`** — **295 live rows of 557**, plus **B51
   §9.2's three, the biggest thing we have asked them, and the app shipped ahead of the answer**: is a second, cost-level prediction
   right for a tool with nobody in it, or does it invite rumination; should the **60 `W-*-E` rows** follow one rule (cost, never the
   event again); confirm Theory A/B and the survival experiment (§7). Standing: is the largest step safe (`W-*-D3`; **`W-THINK-D3` and
   `W-ONTIME-D3` least sure**); are the three in order (`G-Z1`); may *A small go* change **who** it is with (every `W-*-D1`); `W-LOW-D1`; `S07-P3`; `S03-D4`.
4. **A screen-reader AND CONTRAST pass on a real phone** — B33 read the tree, **nobody has used it**; **`--ink-3` on `--card` is
   about 3:1** (B51 §13.4), which is also why B53's archived cards are dashed rather than faded. **Q1's name and
   trademark still block release; its address half was answered 2026-09-10 — `betr.trybeup.com` IS production.** **Two API keys — Groq and
   Anthropic — need rotating**; nobody owns `guards.js`'s medication list. **Release:** Misha on `places.signedOff` and six door lines,
   J1–J5 on a phone, an owner for links. **`docs/journeys.md` J1 is stale** beyond the two rows B51 fixed.

## 4. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (294 pass); `node tools/copy-sheet.js` rewrites `docs/COPY.md` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** Live at **`https://betr.trybeup.com`** — every push to `main` touching `web/**` publishes it; cert expires 2026-12-02 |
| **The canvas** | the B45 spec, `claude.ai/code/artifact/77d1cadb-…`. **Read it with the Artifact tool** (`action: "read"`), then pull the artboards out of the `appifact-doc` script block — **the reply is 2.4MB of editor chrome; parse the saved file.** Overruled on difference 4 |
| **The sheet** | `docs/suggestions-review.csv`, **558 rows with the header**, **CRLF and a BOM — keep both**. A `csv.reader` → `csv.writer(QUOTE_MINIMAL, lineterminator='\r\n')` round trip is byte-identical; **match a Status exactly** |
| **Images** | **no ImageMagick and no PIL on this machine, and every `sips -c` crop is CENTRED** (`--cropOffset` is ignored, silently). Decode PNGs in node with `zlib`; the script is in the scratchpad as `png.js`. **`walk.js shot` captures the WHOLE page** — crop the block out, and note its captures are RGB, not RGBA |

## 5. Gotchas, live

- **AN ASSET ASKED FOR BY URL IS AN ASSET THAT MUST BE COMMITTED.** `img-src 'self' data:` and `font-src 'none'` are in `index.html` AND in the
  header nginx serves. A remote image or a Google font does not fail loudly — **it just never appears**. Download it, commit it, reference
  it by relative path; size a logo in **`em`, never px**, or it is a stamp beside 200% text.
- **`git checkout <file>` RESTORES HEAD, NOT WHAT YOU HAD.** Mid-sweep of eight mutations it deleted the whole session's work in
  `app.js` and `store.js`, and the next six results meant nothing. **`cp` the file to the scratchpad and `cp` it back**, assert the
  mutation anchor is found exactly once, and **run the baseline again at the end**.
- **A SCREEN IS WHERE ITS CALLERS SEND YOU, NOT WHERE THE CODE SAYS IT IS.** B51 was specified off a careful read of
  `plan()` and named the wrong screen: **`go('plan')` has one caller, `again()`**, so it is the REPEAT screen and a first test
  never reached it. **Grep the callers and walk to it from the front door before specifying any change to a screen.**
- **AN ABSENCE ASSERTION DIES SILENTLY WHEN THE STRING DOES.** A test asserted `hides('Not quite? Change it')`; the button was
  deleted and it passed for ever. **Name something that still exists**, and **mutate the code back and watch each new test fail
  before writing the commit message** — four mutations, four minutes.
- **A MADE-UP CUSTOM PROPERTY DISAPPEARS, IT DOES NOT FAIL.** `var(--bg)` — the page colour is **`--ground`** — rendered a
  transparent box, silently, with a green suite. **Read a new colour back** with `eval 'getComputedStyle(…).backgroundColor'`.
  **Two classes beat one class and a tag**: `.plan .line` was styling `textarea.line`; it is `.plan p.line` now.
- **`ch` IS THE WIDTH OF A “0” AND PROSE IS NOT MADE OF NOUGHTS.** `growSaid()` measures the real font and answers in **`em`, never px**.
  **Anything sized from content needs a `max-width`**. **Check every walk at 200%:** `eval
  'JSON.stringify({scrollW:document.documentElement.scrollWidth, innerW:innerWidth})'` — equal is right.
- **A GREEN SUITE PROVES NOTHING ABOUT A SCREEN NOBODY READ.** (a) **A string wrong because content moved? check every string of its
  kind** — `grep -n "[Pp]laceholder" strings-en.js` against `worries.js`. (b) **Navigating by id tests nothing about what a person
  sees**: the front buttons were reversed for two days. **Assert class and arrow** (B50).
- **`walk.js` CANNOT FIRE A FOCUS EVENT.** `el.focus()` from `eval` moves `activeElement` but **dispatches no `focus`**, so `onfocus` work
  (**`refreshThens()`**) looks dead. **Call it:** `eval '…#then").onfocus()'`.
- **THERE IS ONE CONTENT FILE FOR A WORRY.** `worries.js` holds the twenty plus `BETR_GENERAL` and `BETR_FRONT`; **`starts.js` is deleted**. `skeleton`/`sizes` REQUIRED; **`test` and `drop` are read by nothing** — `sizes[0]` word for word (`checkSizes0`).
- **A WALK NEEDS A SIZE TAP, ON EVERY ROAD.** On `no`'s **A small go** there is no `#do` box; the plan is `.plan-said` with
  `#p-thing` in it. **`shows`/`hides` are SUBSTRING checks on the HTML** and **`walk.js tap` takes ONE selector**.
- **A rewrite can reach outside the content file** — `shrinkSaid` quotes `S01-P3`, `smallest` is read on two guide screens,
  **`build.ifPlaceholder` is load-bearing twice**. **Grep first.** Culled ids are retired (`phone` `reply` `check` `mist` `cut`);
  the door floor exists (`MIN_PER_DOOR = 4`); **two count canaries** (269 lines, 12 chips) move only for a cull.
- **Set the font size BEFORE navigating** to measure at 125%. **The fold is 785 / 780 / 774 / 720 at 100 / 125 / 150 / 200%. A
  WIDENING IS MORE DANGEROUS THAN A CHANGE.** *Lock it in* sits at **647–710** with a size picked, **825** with the three still open.
- **`shot` on the front screen catches it mid-reveal**; `getAnimations().finish()` throws on the infinite one. **A dead `walk.js`
  returns a stale page, not an error, and its browser is DARK. The fake DOM is flat, ignores `hidden`, fires no events. After
  editing `web/`, `stop` and `start`** — `open` serves a cache. **Every word a person reads is in `web/content/`. Use `’` and
  `“ ”`. `zones.js` and `COPY.md` are generated**; no number from memory.
