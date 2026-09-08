# Start here

**Last refreshed:** 2026-09-08, after the B34 audit of the suggestions.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**B28–B33 are built and closed: the way in is one sentence with two blanks, the front screen
shows a finished test, and the stock list is somewhere to borrow from.** 196 tests, no
dependencies, no build step, nothing requested after load. All pushed and live.

**B34 read the whole suggestion surface and changed nothing.** It is an audit, in
`docs/tasks/B34-auditing-the-suggestions.md`, and it is the thing to read before touching
`content/starts.js`, `content/worries.js` or the build screen. The short version:

- **280 lines of suggestion content live in two files that never speak.** 14 of the 21 starts
  have a near-twin among the 21 worries, six of them word for word — but only 1 of 63
  borrowable predictions matches a start, so the borrow road never reaches the 84 hand-written
  `dos`/`drops` in `starts.js`.
- **Two mechanical defects, both walked and confirmed.** Typing the exact words of a chip
  gives different Then suggestions than tapping it (the lookup runs at paint and nothing
  re-runs it on focus). And *Back* on *What will you do today?* silently discards what was
  typed, because `wireBack('build')` skips the `readBoxes()` every other exit calls.
- **The generic Then set is three social-judgement predictions, and the main road is the one
  that gets it.** Six starts are not social and have non-social predictions written for them;
  none is reachable from `general`.
- **Start #19 proposes a checking ritual** (*"Lock up once, and walk away"*). Rule 4's half
  about BETR's own content did not loosen on 2026-09-08, and no word list catches this.

## 2. The next action

**Fix the two defects in §2 of B34 — D1 and D2 — and nothing else in that file without asking.**
They are bugs, they cost little, and neither changes a shape the founder chose:

- **D2 first, it is one line.** Call `readBoxes()` before `go('build')` on the Back of
  `buildDo()`. Then walk it: type a plan, Back, forward, and the plan is still there.
- **D1 second.** Re-run `chipsFor('thens', …)` when `#then` takes focus, swapping the text
  inside the existing `[data-chips="data-then"]` row. **Do not repaint** — the whole reason
  typing does not repaint is the caret. A test in `loop.test.js` should hold that typing a
  start's words and tapping its chip end in the same three suggestions.

Everything else open is somebody's reading, and B34 added to two of the asks:

1. **The founder, now five things.** Which of the four examples leads the front screen and
   **whether it is real or an example** (`content/examples.js`). **The purpose statement**,
   which still says "you pick a worry", frozen in five places — candidate in `B29`. **The
   `HARM` false refusal** (*"end it"* refuses a sentence about ending a friendship). **Change
   the ad, not the app** (B25). And **new: start #19, the checking ritual** — B34 §6.
2. **Misha, in one ask:** the four nouns (B23 option b), the door order, and the **21 chips** —
   1,112px of them, twelve below the fold, in an order that reads as arbitrary, with two pairs
   that are the same act fourteen apart (B34 §3).
3. **The paid CBT reviewer:** `content/starts.js` (~180 sentences), `content/examples.js`, the
   three sentences in `worries.js` a session rewrote on 2026-09-08 (`phone`, `rest`, `low`),
   three pairs still waiting from B1 — and **B34 §4's proposal to lengthen `general.thens`**
   with non-social shapes.
4. **A screen-reader pass on a real phone.** The tree was read in B33; nobody has used it.
5. **Q1 (name, trademark, domain)** is open, blocks release and blocks B5 outright.

**Unchanged release conditions** beyond those: Misha on `places.signedOff`; J1–J3 on a phone;
an owner for links and helplines.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | `python3 -m http.server 8760 --bind 127.0.0.1` from `web/`, then `http://127.0.0.1:8760/`. Opening `web/index.html` off disk works for words; serve it when testing storage |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** `dump`'s CAN TAP list gives the real selectors |
| Live address | **`https://betr.trybeup.com` — live.** Every push to `main` touching `web/**` publishes it. Cert expires 2026-12-02, alarm covers it |
| TrybeUP's repo | `trybeup/trybeup-prod`, checkout at `~/vscode_projects/trybeup-prod`. Nothing further is owed to it |

## 4. Gotchas, live

- **The three roads to the build screen offer three different suggestion sets**, and B34 §1 has
  the table. Any change to chips has to be checked on all three: type-your-own, tap-a-chip,
  borrow-a-worry. Two of them were only ever walked one way.
- **The walks changed shape on 2026-09-08.** The front screen's `#go` is *What's yours?* and
  opens the **build** screen; the stock road is `#not-sure` → `[data-door]` → `[data-id]` →
  `[data-b]` → `#next` → `#lock`. `#m-new` opens a new test, not the doors.
- **A REGION DELETE NEEDS BOTH ENDS CHECKED.** Cutting from one comment banner to the next
  swallowed the whole build screen out of `app.js`. Assert what must NOT be in the chunk as
  well as what must, and indent the guard (`'    own: {'`). `learnings.md`.
- **The fold is 785px at 100% and 780px at 125%, and it settles content decisions.**
  **`doors.intro` is one line and must stay one.** **Anything near the bottom needs a `shot` or
  an `eval`'d rect**; `dump` cannot see the fixed menu. The build screen is already 1,678px.
- **Chips are exempt from the capital-letter rule**, narrowly and by class. `loop.test.js`
  sweeps them separately and fails if a chip's words are also drawn as a real label.
- **`rate.keyOf()` keys an own ladder by `id`, and falls back to the sentence when there is
  none.** The fallback is somebody's pre-B30 ladder; do not tidy it away. **v4 migrated no data
  on purpose** — see the comment in `store.js`.
- **`walk.js open` clears storage on purpose.** **After editing `web/content/*`, `stop` and
  `start`** — `open` alone serves a cache.
- **`checkBelief`, `checkTest` and `checkPart` deliberately differ.** `HARM` is on all three;
  `HABIT`/`BODY` refuse nothing any more and still hold BETR's own content — and B34 §6 found
  that neither list catches a checking ritual, which rule 4 also forbids BETR to propose.
- **Help's order is three decisions and four tests hold it:** crisis first (B17), proof second
  (B26), frozen sentence 6 third (B33), then CBT, then the nine. Sentence 6 is drawn twice from
  the same array element — never copy its words.
- **Every word a person reads is in `web/content/`**; a sentence back in `app.js` fails
  `i18n.test.js` — and **a string literal that starts mid-tag reads as prose to that sweep**,
  so keep every static attribute in the fragment that opens the tag.
- **`content/zones.js` and `docs/COPY.md` are generated** (`node tools/copy-sheet.js`); never
  hand-edit. **No helpline number is written from memory.** `docs/changing-the-words.md` is the
  founder's — keep it true.
