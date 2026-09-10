# Start here

**Last refreshed:** 2026-09-10, 2nd session. **No code changed.** One task: [`B51`](tasks/B51-the-second-question.md).
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**[`B51`](tasks/B51-the-second-question.md) is specified and not built, and it came out of the
founder doing a test of their own.** They wrote *"If I post my app on social media, then people
will say it's rubbish"*, then asked what the loop does **when the prediction comes true**.
Nothing: the ladder goes up a rung, quietly, and the app has nothing to say.

**The finding, verified in the code: the app asks once.** A second field exists — `x`, labelled
*What you expect*, read-only prose on the plan screen ([`app.js:2532`](../web/app.js#L2532)) —
but [`app.js:2383`](../web/app.js#L2383) fills it from B20's hand-written expectation **only on a
word-for-word stock match**; otherwise it is
[`guards.expectationFrom`](../web/lib/guards.js#L221), which strips the `If I …, then` and hands
the tail back — on the founder's sentence, *"People will say it's rubbish"*. **Their own words,
echoed under a label that reads like a question.** Since
[`B50`](tasks/B50-the-front-door-swaps-round.md), that road is the front door. **Nobody noticed
because the field was never given a job**: of `sit`'s three expectations, `W-SIT-E1` predicts the
event again and E2 and E3 predict the cost. All 60 are *shipped, UNREVIEWED*.

**B51 needs no detection** — regex cannot read this and rule 2 forbids the other thing, but the
question does not arise once the app asks something only the cost answers. **One screen, no new
blank, no store change**: the answer *is* `x`. Blocked on Misha, the reviewer and one founder
call (§3). **269 tests, still passing.** `docs/posting-on-social.md` is now committed.

## 2. The next action — the first is code, the rest are not
1. **The other nineteen worries' size holes.** Sixty sentences, an hour, one question: *"are there
   already words standing in for something a person would name?"* Where yes it is free, the way
   `no`'s was; **where no, leave it** — inventing one is BETR proposing a sentence.
2. **`happened.placeholder` — *"He said 'fair enough' and got his own coffee."*** The **last
   frozen worked example in the app**, on every worry, and that box has **no suggestions under
   it**. Decide it on purpose (B49 §8.4) — one string, the founder's.
3. **The bottom row's *New test* still opens the two empty blanks** — the exit, on every screen;
   fine while free text was the entrance, a question since B50. One line, and it is the founder's.
4. **B45 §3 difference 7** — the repeat screen. Half shipped; its "all three open" half collides
   with difference 4, closed as a **no**.

**Do NOT take difference 4** (closed) or **difference 6** (the chip row is 382–1050px; it waits
on a cull of the twelve). **Do not build B51 §5 before §9's three people have answered.**

## 3. Waiting on people, not on code

0. **NEW, 2026-09-10, and it is not the main line: [`B52`](tasks/B52-uptime-the-locks-and-the-one-number.md).**
   The founder asked, before the first Instagram posts, how uptime, security and usage are
   handled. **A pitch, nothing built, eleven decisions in its §6.** Found on the live droplet
   that day: **TrybeUP's dev Postgres (5433), dev API (8001) and dev auth (9997) are open to
   the whole internet**, no firewall, no rate limit anywhere, no swap, a kernel reboot pending,
   **no HSTS on `betr.trybeup.com`, no CAA record**, and **no uptime monitoring of any kind**.
   The recommendation is an hourly **integrity** check in our own repo (the build hash on the
   page against `main` — the only thing that would ever catch a tampered publish), Better Stack
   free for the down alarm, HSTS, and **2FA + registrar lock at GoDaddy**, which is the highest
   consequence and lowest cost item on the list. **The blind daily tally is offered and
   recommended against for now** — it would cost the `what.airplane` sentence. **Cloudflare:
   no**, and §4.7 says why. A session picking this up starts with §6, not §1.

1. **The founder.** **(a) NEW, B51 §9.3:** on the stock road, does B20's hand-written
   expectation stay **pre-filled**, or become a **greyed example** so every road asks the same
   question? **(b) `docs/redraft-sheet.md`** — read the Mine column, disagree on the row; plus
   four renames and three questions (`S10-D2`, `S15-P1`, `S18-D1`). **(c) B47 §6c.** **(d)
   `ontime` is the weakest fit of the twenty behind the `work` door.** **(e)
   `happened.placeholder`, above.** Then: walk J4 and J5 on a phone, B36 items 6 and 9, five
   answers on *Why it's written like this*, rule 10's third amendment (B37 §9a), which example
   leads the front screen, **the purpose statement**, the **`HARM` false refusal**, **B25**.
2. **Misha, in one ask.** `docs/COPY.md` is regenerated. **NEW: B51's `plan.expectLabel`** — it
   becomes a question on a screen every person reaches; four drafts in B51 §9.1, none preferred.
   Still unread: **four strings** — `build.doOwnPlaceholder`, `build.dropPlaceholder`,
   `start.borrow` (*Find yours*), `start.go` (*Write my own*). Otherwise unchanged: **the three new worries** (`want`, `think`, `ontime` — 39 sentences), the
   sixty size sentences, **the `yes` door's own line, which names three worries and has five**,
   B47 §6c, B41's skeletons, B42's sizes, B38's six strings, B39's *Change* / *Add one*, B40's
   *Write the whole thing myself*, the four nouns, the door order, the chips, B36's tone, the
   **red strike**. **The redraft sheet is not.**
3. **The paid CBT reviewer, still the critical path. Send `docs/suggestions-review.csv`** —
   **295 live rows of 557**, plus **B51 §9.2's three, the biggest thing we have asked them**: is a
   second, cost-level prediction right for a tool with nobody in it, or does it invite rumination;
   should the **60 `W-*-E` rows** follow one rule (cost, never the event again); confirm Theory
   A/B and the survival experiment as B51 §7 states them. Standing: is the largest step safe
   (`W-*-D3`; **`W-THINK-D3` and `W-ONTIME-D3` least sure**, beside `W-ST-D3`); are the three in
   order (`G-Z1`); may *A small go* change **who** it is with (every `W-*-D1`); `W-LOW-D1`;
   `S07-P3`; `S03-D4`.
4. **A screen-reader pass on a real phone** — B33 read the tree, **nobody has used it**. **Q1
   (name, trademark, domain) blocks release.** **Two API keys — Groq and Anthropic — need
   rotating**; nobody owns `guards.js`'s medication list. **Release:** Misha on `places.signedOff`
   and six door lines, J1–J5 on a phone, an owner for links.

## 4. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (269 pass); `node tools/copy-sheet.js` rewrites `docs/COPY.md` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** Live at **`https://betr.trybeup.com`** — every push to `main` touching `web/**` publishes it; cert expires 2026-12-02 |
| **The canvas** | the B45 spec, `claude.ai/code/artifact/77d1cadb-…`. **Read it with the Artifact tool** (`action: "read"`), then pull the artboards out of the `appifact-doc` script block — **the reply is 2.4MB of editor chrome; parse the saved file.** Overruled on difference 4 |
| **The sheet** | `docs/suggestions-review.csv`, **558 rows with the header**, **CRLF and a BOM — keep both**. A `csv.reader` → `csv.writer(QUOTE_MINIMAL, lineterminator='\r\n')` round trip is byte-identical; **match a Status exactly** |

## 5. Gotchas, live

- **NEW: A DERIVED FIELD IS A ROAD NOBODY DREW.** `x` is two fields — B20's hand-written
  expectation on a word-for-word stock match, an **echo of the person's own sentence** everywhere
  else, edited stock worries included. It sat wrong for weeks because **the field had no written
  job**, so nothing could break it. **Say which way is right before shipping either** (B51 §2–§3).
- **`ch` IS THE WIDTH OF A “0” AND PROSE IS NOT MADE OF NOUGHTS.** A blank sized in `ch` comes
  out ~26% wider than the lowercase words in it. `growSaid()` measures the real font and answers
  in **`em`, never px**. **Anything sized from content needs a `max-width`** — at 200% a measured
  blank was 562px in a 350px card and the page scrolled sideways. **Check every walk at 200%:**
  `eval 'JSON.stringify({scrollW:document.documentElement.scrollWidth, innerW:innerWidth})'` —
  equal is right. In `calc(100% - .7em)` the `.7em` is the sentence's full stop.
- **A GREEN SUITE PROVES NOTHING ABOUT A SCREEN NOBODY READ.** (a) **A string wrong because
  content moved? check every string of its kind** — `grep -n "[Pp]laceholder" strings-en.js`
  against `worries.js` (B48/B49, one bug twice). (b) **Navigating by id tests nothing about what
  a person sees**: the front buttons were reversed for two days. **Assert class and arrow** (B50).
- **`walk.js` CANNOT FIRE A FOCUS EVENT.** `el.focus()` from `eval` moves `activeElement` but
  **dispatches no `focus`**; `type` and `tap` too, so `onfocus` work (**`refreshThens()`**) looks
  dead. **Call it:** `eval '…querySelector("#then").onfocus()'`.
- **THERE IS ONE CONTENT FILE FOR A WORRY.** `worries.js` holds the twenty plus `BETR_GENERAL`
  and `BETR_FRONT`; **`starts.js` is deleted**. `skeleton`/`sizes` REQUIRED; **`test` and `drop`
  are read by nothing** — `sizes[0]` word for word (`checkSizes0`).
- **A WALK NEEDS A SIZE TAP, ON EVERY ROAD.** On `no`'s **A small go** there is no `#do` box; the
  plan is `.plan-said` with `#p-thing` in it.
- **A rewrite can reach outside the content file** — `shrinkSaid` quotes `S01-P3`, `smallest` is
  read on two guide screens, **`build.ifPlaceholder` is load-bearing twice**. **Grep first.**
  Culled ids are retired — `phone` `reply` `check` `mist`, `cut`. **The door floor exists**
  (`MIN_PER_DOOR = 4`), and **two count canaries** (269 lines, 12 chips) **move only for a cull**.
- **`shows`/`hides` are SUBSTRING checks on the HTML**; a word split by an `<input>` does not
  count. **`walk.js tap` takes ONE selector.**
- **Set the font size BEFORE navigating** to measure at 125%. **The fold is 785 / 780 / 774 / 720
  at 100 / 125 / 150 / 200%. A WIDENING IS MORE DANGEROUS THAN A CHANGE.**
- **`shot` on the front screen catches it mid-reveal**; `getAnimations().finish()` throws on the
  infinite one. **A dead `walk.js` returns a stale page, not an error, and its browser is DARK.
  The fake DOM is flat, ignores `hidden`, and fires no events. After editing `web/`, `stop` and
  `start`** — `open` serves a cache. **Every word a person reads is in `web/content/`. Use `’` and
  `“ ”`, never `'` and `"`. `zones.js` and `COPY.md` are generated**; no number from memory.
