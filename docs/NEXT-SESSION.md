# Start here

**Last refreshed:** 2026-09-08, after B28 was built and closed.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**B28 is built and closed. The way in is a different app; the loop underneath is untouched.**
196 tests, no dependencies, no build step, nothing requested after load. All pushed.

The founder's Present · Practice · Produce, as built in one day across B29–B33:

- **B29** — the word a person reads is **test**, not worry, and `CLAUDE.md` rules 3, 4, 5 and 10
  say so with the date. Rule 4 loosened at the founder's call: the habit and body word lists
  **stop refusing a person's own test**, and the one hard stop left is anyone's safety, on both
  boxes. Those lists still hold BETR's own content, in `lib/content.js`.
- **B30** — *New test* opens **one sentence with two gaps**: `If I ___, then ___`, with
  suggestion chips from the new `content/starts.js` under whichever blank you are in. Then what
  you'll do, what you'll leave out (optional), *Lock it in*. Storage is **v4**.
- **B31** — the front screen **shows one finished test** from the new `content/examples.js`,
  then asks *What's yours?* It stopped describing BETR.
- **B32** — the doors and the twenty-one are **things to borrow**, one tap aside. Picking one
  opens the build screen with the sentence half written. Five screens retired.
- **B33** — Help, the paperwork, and the walk. Frozen sentence 6 is third on Help now, because
  since B29 it is the only place the line is drawn. Shots in `docs/shots/b33-*.png`.

**Nothing engineering is left in v1 that is not waiting on a person.**

## 2. The next action

**There is no next task. Everything open is somebody's reading, and the useful thing a session
can do is put it in front of them.** In the order it blocks release:

1. **The founder, and it is four things.** Which of the four examples leads the front screen,
   and **whether it is real or an example** (`content/examples.js` — shown as a real person's
   result it is a testimonial, which the MHRA reads as a claim). **The purpose statement**,
   which still says "you pick a worry", is frozen in five places, and no longer describes the
   app — a candidate sentence is in `B29-the-rules-and-the-word.md`. **The `HARM` false
   refusal:** *"end it"* matches whole words, so a sentence about ending a friendship is
   refused; loosening risks missing a real disclosure, and BETR over-refuses by standing rule.
   Ask; do not fix it quietly. And **(d) change the ad, not the app** — all three B21 walkers
   arrived from a post showing 6/10 and landed on an app at 10; the honest fix is an ad showing
   a *first* result, 10 → 9. Best answer in B25.
2. **Misha, in one ask:** the four nouns (B23 option b), the door order, and — new — the
   **twenty-one suggestion chips on the build screen**, which make that page 1,871px long.
3. **The paid CBT reviewer:** `content/starts.js` (~180 sentences), `content/examples.js`, and
   the **three sentences in `worries.js` a session rewrote** on 2026-09-08 (`phone`, `rest`,
   `low` — named in `journeys-observed.md`). Three pairs still waiting from B1.
4. **A screen-reader pass on a real phone.** The accessibility tree was read in B33 and is
   correct; that is not the same as somebody using it.
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

- **The walks changed shape on 2026-09-08.** The front screen's `#go` is now *What's yours?*
  and opens the **build** screen; the stock road is `#not-sure` → `[data-door]` → `[data-id]` →
  `[data-b]` → `#next` → `#lock`. `#m-new` opens a new test, not the doors. Five stage names
  (`own-belief`, `own-test`, `own-drop`, `belief`, `belief-own`) route to `build()`.
- **A REGION DELETE NEEDS BOTH ENDS CHECKED.** Cutting from one comment banner to the next
  swallowed the whole build screen out of `app.js`, and later the whole `build.*` string block,
  because both had been *inserted into* the region since its banner was written. Assert what
  must NOT be in the chunk as well as what must, and indent the guard (`'    own: {'`), because
  `own: {` contains a nested `belief: {`. `learnings.md`.
- **The fold is 785px at 100% and 780px at 125%, and it settles content decisions.** Four in
  this stretch, three of them fixed by a shorter sentence rather than CSS. **`doors.intro` is
  one line and must stay one** — a second cost the safety note 58 of its 100px. **Anything near
  the bottom needs a `shot` or an `eval`'d rect**; `dump` cannot see the fixed menu.
- **Chips are exempt from the capital-letter rule**, narrowly and by class, because they are
  fragments of the printed sentence. `loop.test.js` sweeps them separately and fails if a
  chip's words are also drawn as a real label.
- **`rate.keyOf()` keys an own ladder by `id`, and falls back to the sentence when there is
  none.** The fallback is somebody's pre-B30 ladder; do not tidy it away. **v4 migrated no
  data on purpose** — see the comment in `store.js`.
- **`walk.js open` clears storage on purpose.** **After editing `web/content/*`, `stop` and
  `start`** — `open` alone serves a cache.
- **`checkBelief`, `checkTest` and `checkPart` deliberately differ.** `HARM` is on all three;
  `HABIT`/`BODY` refuse nothing any more and still hold BETR's own content. The nudge and the
  two shape refusals are unreachable from every screen and are kept, tested, in `guards.js`.
- **Help's order is three decisions and four tests hold it:** crisis first (B17), proof second
  (B26), **frozen sentence 6 third (B33)**, then CBT, then the nine. Sentence 6 is drawn twice
  from the same array element — never copy its words.
- **Every word a person reads is in `web/content/`**; five files plus `starts.js` and
  `examples.js`. A sentence back in `app.js` fails `i18n.test.js` — and **a string literal that
  starts mid-tag reads as prose to that sweep**, so keep every static attribute in the fragment
  that opens the tag.
- **`content/zones.js` and `docs/COPY.md` are generated** (`node tools/copy-sheet.js`); never
  hand-edit. **No helpline number is written from memory.** `docs/changing-the-words.md` is the
  founder's — keep it true.
