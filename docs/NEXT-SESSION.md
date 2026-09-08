# Start here

**Last refreshed:** 2026-09-08, after the B34 audit and its two fixes.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Read this before you touch anything

**There is uncommitted work in the tree that is not B34's, and it is B35 — a dark/light look.**
`web/lib/theme.js` is untracked; `app.css`, `index.html`, `strings-en.js`, `harness.js`,
`loop.test.js` and one hunk of `app.js` (around `worryHead`) are modified. It appeared while
B34 was being written and it moved twice under a running session. **Nothing in `web/` has been
committed since.** B34's fixes sit in the same two files as B35's, so `web/app.js` and
`web/tests/loop.test.js` each hold two tasks' work at once.

**Do not push `web/**` until somebody decides whether B35 is finished** — every push touching
`web/**` publishes to `https://betr.trybeup.com`, so pushing now puts a half-built theme live.
Committing the two together, with a message naming both, is the honest option if B35 is done.

## 2. Where we are

B28–B33 are built and closed. B34 is an audit of the whole suggestion surface, with two
defects fixed: `docs/tasks/B34-auditing-the-suggestions.md`. **206 tests green.**

**What B34 found and fixed:**

- **A chip could put words in the box other than the ones printed on it.** The tap handler
  re-ran the lookup on the click, so a person who had TYPED a start's words — the placeholder
  is one of them, word for word — tapped *"they'll think less of me"* and got *"they'll think
  I'm being difficult"*. **Fixed:** every chip handler now closes over the list that was
  printed, on all three rows. Tested.
- **The lookup only ever ran at paint.** **Fixed:** `refreshThens()` reprints just the buttons
  when the second blank takes focus — never the screen, never the row's heading, nothing
  holding a caret. Walked in Chrome; not unit-tested, because the fake DOM fires no events.
- **Back on *What will you do today?* threw away the plan.** It was the one exit that skipped
  `readBoxes()`. **Fixed**, one line, and tested for a typed test and a borrowed one.

**What B34 found and did NOT fix — all of it still open, and most of it is somebody's call:**

- **Start #19 proposes a checking ritual** (*"Lock up once, and walk away"*). Rule 4's half
  about BETR's own content did not loosen on 2026-09-08 and no word list catches this. **The
  founder has not been asked yet. Ask before touching it.**
- **The generic Then set is three social-judgement predictions**, and typing your own is the
  main road. Six starts are not social and have non-social predictions written for them; none
  is reachable from `general`.
- **`starts.js` and `worries.js` cover the same ground and never speak.** 14 of 21 starts have
  a near-twin among the 21 worries, six word for word — but only 1 of 63 borrowable
  predictions matches a start, so the borrow road never reaches the 84 hand-written
  `dos`/`drops`.
- **The 21 chips**: 1,112px of them, twelve below the fold, an order that reads as arbitrary,
  two pairs that are the same act fourteen apart, and once one is tapped the list cannot be
  reopened without deleting the box by hand (D3).

## 3. The next action

**Settle B35 first — it is blocking every commit to `web/`.** Find out whether it is finished,
then commit it (with B34's fixes, naming both) or park it.

After that, and in this order:

1. **The founder, now five things.** Start #19, the checking ritual (B34 §6) — new, and the
   only one B34 added. Which of the four examples leads the front screen and **whether it is
   real or an example**. **The purpose statement**, which still says "you pick a worry",
   frozen in five places — candidate in `B29`. **The `HARM` false refusal** (*"end it"*
   refuses a sentence about ending a friendship). **Change the ad, not the app** (B25).
2. **Misha, in one ask:** the four nouns (B23 option b), the door order, and the 21 chips.
3. **The paid CBT reviewer:** `content/starts.js` (~180 sentences), `content/examples.js`, the
   three sentences in `worries.js` a session rewrote on 2026-09-08 (`phone`, `rest`, `low`),
   three pairs still waiting from B1 — and **B34 §4's proposal to lengthen `general.thens`**.
4. **A screen-reader pass on a real phone.** The tree was read in B33; nobody has used it.
5. **Q1 (name, trademark, domain)** is open, blocks release and blocks B5 outright.

**Unchanged release conditions** beyond those: Misha on `places.signedOff`; J1–J3 on a phone;
an owner for links and helplines.

## 4. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | `python3 -m http.server 8760 --bind 127.0.0.1` from `web/`, then `http://127.0.0.1:8760/` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** |
| Live address | **`https://betr.trybeup.com` — live.** Every push to `main` touching `web/**` publishes it. Cert expires 2026-12-02 |
| TrybeUP's repo | `trybeup/trybeup-prod`, checkout at `~/vscode_projects/trybeup-prod`. Nothing further is owed to it |

## 5. Gotchas, live

- **`walk.js` dies silently, and a dead walker returns a stale page rather than an error.** It
  happened twice during B34 and cost two wrong readings — one of them looked like a crisis
  screen appearing from a chip tap. **If a result surprises you, `start` again and redo it**
  before you believe it or write it down.
- **The three roads to the build screen offer three different suggestion sets** (B34 §1 has
  the table). Any chip change has to be checked on all three: type-your-own, tap-a-chip,
  borrow-a-worry.
- **The fake DOM in `harness.js` is flat and fires no events.** `parse()` indexes ids and
  `data-` attributes off the whole HTML string, so there is no real nesting: a chipset stub has
  no children, and anything reached by class or by traversal is invisible to a test. Live
  behaviour is walked, not unit-tested — that is the bargain, not an omission.
- **A REGION DELETE NEEDS BOTH ENDS CHECKED.** Cutting between comment banners once swallowed
  the whole build screen out of `app.js`. `learnings.md`.
- **The fold is 785px at 100% and 780px at 125%.** `doors.intro` is one line and must stay one.
  Anything near the bottom needs a `shot` or an `eval`'d rect; `dump` cannot see the fixed
  menu. The blank build screen is 1,678px.
- **Chips are exempt from the capital-letter rule**, narrowly and by class.
- **`rate.keyOf()` keys an own ladder by `id`**, falling back to the sentence when there is
  none — that fallback is somebody's pre-B30 ladder. **v4 migrated no data on purpose.**
- **After editing `web/content/*`, `stop` and `start`** — `open` alone serves a cache.
- **`HABIT`/`BODY` refuse nothing any more** and still hold BETR's own content — and neither
  catches a checking ritual, which rule 4 also forbids BETR to propose.
- **Help's order is three decisions and four tests hold it:** crisis first (B17), proof second
  (B26), frozen sentence 6 third (B33), then CBT, then the nine.
- **Every word a person reads is in `web/content/`**; a sentence back in `app.js` fails
  `i18n.test.js` — and **a string literal that starts mid-tag reads as prose to that sweep**.
  B35 tripped it with a class name (`' quiet solo'`) and fixed it mid-session.
- **`content/zones.js` and `docs/COPY.md` are generated** (`node tools/copy-sheet.js`); never
  hand-edit. **No helpline number is written from memory.**
