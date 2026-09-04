# Start here

**Last refreshed:** 2026-09-04, after B22's sort was written.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**v1 is built and live, and everything from 2026-09-04 is committed and published.** 173 tests,
no dependencies, no build step, nothing requested after load. `betr.trybeup.com` is serving it.

**2026-09-04, in order.** The gluten fix; the grammar wall became a nudge; B21's three walks
(`docs/journeys-observed.md`, ten findings); B22–B27 written from them; **B24 closed**; **B27
items 1–3 done**; and now **B22 step 1 — the sort**.

**`docs/three-piles.md` is the new document and it is for the founder and Misha.** It takes all
**487 sentences a person can read** and sorts them by one rule — *describe the inside of the
moment, never name the kind of person* — into 465 to leave alone, 17 that name a category and
have to, and **five that name one and don't have to**. Every entry carries the walk that
produced it. **No word in the app was changed.**

The five in pile 3: door one's four nouns · `pick.notHere` · the word *diagnosis* in the doors
footer · `rest`'s card sentence *"then I'm being lazy"* · *"the crutch"* in `refusal.habit`.
The last two are new; the first three were predicted in the task.

**Two things the sort settled that will otherwise be re-argued:**
- **Hard words are a different problem, and a small one.** *CBT*, *behavioural experiment* name
  a **method**, not a kind of person, and nobody bounced off one. Do not soften Help's primer.
- **Door one's damage is four nouns, not the line.** Its label is pile 1 and one of the best
  sentences on the screen; its note is pile 2. **B23's option (b) is a deletion, not a rewrite.**

**Still true:** **Q1 (name, trademark, domain) is open** and blocks release. **Nobody outside
this building has read a word of the worry list.** **Nobody who uses a screen reader has touched
the app.**

## 2. The next action

**B22 steps 2 and 3 are the founder's and Misha's, not a session's.** They read
`docs/three-piles.md` and take five decisions. Nothing in the app moves until they have.

**So the next action is B23**, which now carries B22's first question inside it:

```
B22 step 1  ──▶  B23  ──▶  B25  ──▶  B26        (B24 and B27 items 1-3 are done)
DONE             the doors  the number  Help
   └── steps 2-3 wait on the founder and Misha
```

- **B23 is founder + Misha and it has no free option.** Door one is what nearly lost Priya *and*
  what got Dan and Marcus in. Five options costed in the file, and (b) now has B22's note under
  it saying the cheap version is deleting *"— drink, weed, porn, betting"* and nothing else.
  **Misha's casting vote.** Its second half — door one's list does not serve porn recovery —
  is content, so it waits for the paid CBT reviewer either way.
- **B25 contains a regression made on 2026-09-04.** Scope §3: *"Everything starts at 10 — that is
  what the front screen says."* The new headline does not say it, and a test user read his 10 → 9
  as barely moving. The fix carries a test, because a rule that lives only in a doc can be
  deleted by a well-meaning edit on github.com.
- **B26 is Help's order, not its words.** Nothing on that screen is wrong; 4,112px of it arrives
  at once. B22 filed one thing for whoever takes it: **the promise did not win the sceptic, the
  admission did** — Dan shrugged at *"no account, no AI"* and stayed for TrybeUP's paywall in the
  small print.
- **B27 item 4 is open and is NOT next.** It needs somebody to look at an iPhone's *Add to Home
  Screen* sheet and confirm a person can still type their own name for the icon. Nothing in the
  repo can answer it, and it bites harder at **B5**.

**Unchanged release conditions:** one paid CBT-trained reviewer on the worries (**three pairs are
written down for them** in `B1-the-stock-list.md` step 3); **Misha on the six doors and the
sixty-three**; a real screen-reader pass on a real phone; **a PR on `trybeup/trybeup-prod`** —
BETR's nginx block is on the droplet and not in that repo, so their next nginx change takes the
address dark, and their deploy reloads nginx inside the container so an inode change makes the
reload silently do nothing; J1–J3 walked on a phone; an owner for links and helplines
(`helplines.js` has `owner: null`); and **Q1**.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | `python3 -m http.server 8760 --bind 127.0.0.1` from `web/`, then `http://127.0.0.1:8760/`. Opening `web/index.html` off disk works for words; serve it when testing storage |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap <sel>` · `type <sel> <text>` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x, Europe/London. `.walk.json` is gitignored. **Always `stop`.** `shot` leaves the page scrolled to the bottom — check `scrollY` first |
| Live address | **`https://betr.trybeup.com` — live.** Every push to `main` touching `web/**` publishes it. Cert expires 2026-12-02 |

## 4. Gotchas, live

- **`node --test web/tests/` does not work on Node 22** — run it from the repo root, and only
  from there: run it inside `web/` and you get 166 tests instead of 173 and no warning.
  `harness.js` is the fake DOM; in its `vm`, **`instanceof Array` is unreliable** and there is
  **no `crypto`**. A textarea keeps its value across a repaint there.
- **Two footers are one sentence.** `whats-going-on.js`'s `foot` and `strings-en.js`'s
  `doors.foot` are printed into the same `<p>` at `app.js:667`. `docs/COPY.md` is organised by
  file and cannot show you that. **Sort copy by what a person reads, not by where it is stored.**
- **`boot(a.mem)` lands straight back on the test in hand**, not the front screen; `#pickup` only
  exists on the start screen. **`docs/prose-craft.md` is a ZIP** — `unzip` it. **No test may
  hard-code a worry's words, or the front screen's** — read `en.s.start.title` instead.
- **A walk in a test is five taps**: `#go` → `[data-door]` → `[data-id]` → `[data-b]` → `#lock`.
- **A worry is a loose `belief` plus exactly three `beliefs`**, two fields each, each predicting
  something different, the card sentence never one of the three — and **no two worries behind
  one door may end the same way**, exemptions held by hand in `content.test.js`.
- **`content.test.js` holds `STARTS_TODAY` and `KNOWN_SHARED_CONSEQUENCE` by hand** — judgements,
  not derivations, so a change shows in a diff. A worry behind no door is unreachable.
- **Every word a person reads is in `web/content/strings-en.js`**; a sentence back in `app.js`
  fails `i18n.test.js`, as does a `left:` or a `px` font size in `app.css`. The key sweep matches
  `t('literal')`, so **write `rest ? t('a') : t('b')`, never `t(rest ? 'a' : 'b')`**.
  `refusal.notConditional` and `refusal.noConsequence` are **dead keys kept on purpose**.
- **Every screen goes through `paint()`**, and **`worryHead()` is on every screen from the choice
  to the result**. `pending` and `whyId` are not stored; a reload there drops to the doors.
- **`nudge` is cleared by `go()`, like `refusal`**; `takeBelief()` is the only caller of
  `guards.checkBelief`. **A new stored field goes in three places**: `blank()`, `normalise()`,
  `isEmpty()`.
- **Storage is v3.** A ladder's rungs come from `g.rungs`, not `r.level`. `rate.keyOf()` keys a
  stock ladder by **worry id**, so all three predictions share one ladder — B20 says how to reverse it.
- **`content/zones.js` is generated, never hand-edited**, and **no helpline number is written
  from memory**. **Sentence 7 names 988 and 116 123 inside itself**: frozen.
- **Language and country are two separate questions.** **The ladder is one belief's grip** — no
  total, no average, no target. `.kicker` is uppercase in CSS. The guard blocks "bet".
- **`docs/COPY.md` is generated** by `node tools/copy-sheet.js`; never hand-edit it.
  `docs/changing-the-words.md` is what the founder follows — keep it true.
- **In `places.js` a GROUP may carry `note` and `id`; an ITEM still has three fields and no
  fourth.** **A link is allowed; a request is not** — `menu.test.js` holds the allow-list.
  **`why.js` has two fields and no third** — the regulatory line, not a style rule.
