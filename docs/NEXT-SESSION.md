# Start here

**Last refreshed:** 2026-09-08, after the founder's B28 question. B3 is closed.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**v1 is built and live, everything is committed and pushed, and B3 is now genuinely done.**
180 tests, no dependencies, no build step, nothing requested after load.

**B3 closed on 2026-09-04:** the `trybeup/trybeup-prod` PR #2245 was squash-merged as `d1d47520`,
its `nginx.conf` byte-identical to the live one; TrybeUP's next nginx deploy can no longer delete
BETR's block, and BETR's certificate (**expires 2026-12-02**) is inside the 14-day alarm. Details in
`learnings.md`. **No engineering task is left in v1 that is not waiting on a person.** What remains:

- **B28 is scoped and is the whole of the next stretch.** The founder saw the mockups
  (https://claude.ai/code/artifact/59278217-cc23-4e17-804e-97a917507497), said "I love it", and
  added one more decision: **"worry" becomes "test"** everywhere a person reads it. Five task
  files, in build order: **B29** the rules and the word · **B30** the build screen · **B31** the
  front screen · **B32** the borrow list · **B33** Help and the walk. Every one names the files,
  the tests that hold the old rule, and what is one line to flip.
- **Three questions, all yours.** **(d) change the ad, not the app** — all three walkers arrived
  from a post showing somebody at **6/10** and landed on an app at 10, so the honest fix is an ad
  showing a **first** result, 10 → 9; costs no code, best answer in B25, yours and Misha's.
  **Misha on the four nouns** (B23 option b) **and on the new door order, together** — ask once;
  the labels and the safety note were already his (B0 Q2a). And **the word *diagnosis*** on the
  doors footer, which wants a second opinion on the legal point.
- **The `HARM` false refusal, which is a safety call and yours.** *"end it"* matches whole words,
  so a sentence about ending a friendship is refused on a box where the words are the person's
  own. Loosening it risks missing a real disclosure, and BETR over-refuses by standing rule. **Ask;
  do not fix it quietly.**
- **Q1 (name, trademark, domain) is open, blocks release and blocks B5 outright.** The live
  address is a borrowed subdomain and is not where this finally lives.
- **Nobody outside this building has read the worry list, and nobody using a screen reader has
  touched the app.**

## 2. The next action

**Start B29: `docs/tasks/B29-the-rules-and-the-word.md`.** Rewrite `CLAUDE.md` rules 3, 4 and 10
and scope §2 to what the founder decided, dated; rename *worry* to *test* in `strings-en.js`; flip
the guard tests that expect a habit word to be refused; regenerate `COPY.md`; keep
`changing-the-words.md` true. **Do not start B30 until B29 is pushed** — a session building the
new screens against the old `CLAUDE.md` will fight it. Two open content calls sit inside B31:
which front-screen example, and whether it is real or an example.

- Walk the six taps with `tools/walk.js` and read the **accessibility tree**, not the pixels: every
  button's accessible name, heading order, `lang`, focus order after each tap, whether the worry
  and the sentence atop every loop screen are announced, whether the ladder's 1-10 is reachable and
  says what it is, and whether the permanent row of three reads as three links.
- **It does not replace the real pass.** A person on a real iPhone with VoiceOver is still a
  release condition; this is so that pass finds wording problems instead of missing labels.
  Anything it turns up is a fix in `app.js` + `strings-en.js` with a test, the usual shape.
  **Check 125% text while you are in there** — same class of problem, and §4 says where it bites.

**Not next, and why.** **B23's second half** (door one says *porn*; its five worries are shaped
like a pub) is content, and waits for the CBT reviewer and Misha alongside `strug`/`low`,
`care`/`praise` and the `early`/`strug` duplicate. **B27 item 4** needs an iPhone's *Add to Home
Screen* sheet and bites harder at **B5**, which cannot start until Q1 is answered.

**Unchanged release conditions:** one paid CBT-trained reviewer on the worries (**three pairs are
written down for them** in `B1-the-stock-list.md` step 3); **Misha on the six doors, their order,
the sixty-three, and `places.signedOff`**; a real screen-reader pass on a phone; J1–J3 on a phone;
an owner for links and helplines; **Q1**.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | `python3 -m http.server 8760 --bind 127.0.0.1` from `web/`, then `http://127.0.0.1:8760/`. Opening `web/index.html` off disk works for words; serve it when testing storage |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** `dump`'s CAN TAP list gives the real selectors — doors are `[data-door="habit"]`, not the label |
| Live address | **`https://betr.trybeup.com` — live.** Every push to `main` touching `web/**` publishes it. Cert expires 2026-12-02, and **the alarm now covers it** |
| TrybeUP's repo | `trybeup/trybeup-prod`, checkout at `~/vscode_projects/trybeup-prod`. **Its own `CLAUDE.md` governs it.** Nothing further is owed to it |

## 4. Gotchas, live

- **A handoff file can be older than the session that wrote it** — this one denied a branch and a
  PR that existed. **Check the remote before repeating work it calls undone.** `learnings.md`.
- **`node --test web/tests/` does not work on Node 22** — run it from the repo root; inside `web/`
  you get fewer tests and no warning. `harness.js` is the fake DOM; in its `vm` **`instanceof
  Array` is unreliable** and there is **no `crypto`**.
- **The fold is 785px, not 844.** `nav.menu` is fixed over the bottom 59px and `dump` cannot see
  it, so a thing it calls on-screen can be invisible: **anything near the bottom needs a `shot` or
  an `eval`'d rect against `nav.menu`** — and **check 125% text**, where the Help counters fall
  off and the front screen's trust line already does.
- **A walk finds what is hard to reach; only reading the file finds what was never written** (B25's
  ladder line, B26's price) — grep before moving anything. `learnings.md`.
- **`walk.js open` clears storage on purpose** (returning person: five taps to `#lock`, `#m-mine`,
  `#back`). **After editing `web/content/*`, `stop` and `start`** — `open` alone serves a cache.
- **Help's order is a decision and two tests hold it:** crisis first (B17), proof second (B26),
  then CBT, then the nine sentences — frozen in **wording, not position**. **The doors order is a
  decision too**: `phone, habit, work, temper, secret, yes` (B23, founder); door one may not name a
  substance and the door with the note may not fall past second. Misha has signed off neither.
- **BETR never said it was free until 2026-09-04.** That line now opens the Help proof block.
  **If BETR ever gains a thing to buy, it comes out the same day.** No test can catch this.
- **`checkBelief` and `checkTest` deliberately do not enforce the same lists** — `HARM` is on
  both, `HABIT` and `BODY` are `checkTest`'s alone. **Do not tidy this into symmetry**; a test
  fails. **Two footers are one sentence** — `whats-going-on.js`'s `foot` and `strings-en.js`'s
  `doors.foot` share one `<p>`. **Sort copy by what a person reads.**
- **`boot(a.mem)` lands back on the test in hand; `docs/prose-craft.md` is a ZIP** — `unzip` it.
  **No test may hard-code a worry's words**, nor assert a bare word off the whole screen a worry
  could use (`missed`); assert the phrase. **A walk in a test is five taps** — `#go` →
  `[data-door]` → `[data-id]` → `[data-b]` → `#lock`; `doors.items[0]` is `phone`, so use
  `firstBehind()`, never `worries[0]`.
- **A worry is a loose `belief` plus exactly three `beliefs`**, two fields each, each predicting
  something different, the card sentence never one of them — and **no two worries behind one door
  may end the same way**, exemptions held by hand in `content.test.js`.
- **Every word a person reads is in `web/content/strings-en.js`**; a sentence back in `app.js`
  fails `i18n.test.js`, as does a `left:` or a `px` font size in `app.css`. The key sweep matches
  `t('literal')` — **write `rest ? t('a') : t('b')`, never `t(rest ? 'a' : 'b')`**.
- **`nudge` is cleared by `go()`, like `refusal`.** **A new stored field goes in three places**:
  `blank()`, `normalise()`, `isEmpty()`. **The ladder is one belief's grip** — no total, no target.
  **Storage is v3**; `rate.keyOf()` keys a stock ladder by **worry id**.
- **`content/zones.js` and `docs/COPY.md` are generated** (`node tools/copy-sheet.js`); never
  hand-edit. **No helpline number is written from memory**; sentence 7 names 988 and 116 123
  inside itself, and `docs/changing-the-words.md` is the founder's — keep it true.
- **In `places.js` a GROUP may carry `note` and `id`; an ITEM has three fields and no fourth;
  `why.js` two and no third. A link is allowed; a request is not** (`menu.test.js`).
