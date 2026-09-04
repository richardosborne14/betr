# Start here

**Last refreshed:** 2026-09-04, after the self-harm gap in the worry box was closed.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**v1 is built and live, and everything from 2026-09-04 is committed and published.** 175 tests,
no dependencies, no build step, nothing requested after load. `betr.trybeup.com` is serving it.

**2026-09-04, in order.** The gluten fix; the grammar wall became a nudge; B21's three walks
(`docs/journeys-observed.md`, ten findings); B22–B27 written from them; **B24 closed**; **B27
items 1–3**; **B22 step 1 — the sort** (`docs/three-piles.md`); **three of B22's five wording
decisions**; and last, **B27 item 5 — the one wall that went back up.**

**What changed this session.** `guards.checkBelief` screened for nothing but an empty box and a
verdict, so somebody who wrote *"If I tell them how I really feel, then they'll know I want to
kill myself"* was answered with **"What will you do?"** and stopped only after typing a plan into
that box. Founder's call, taken this session: **stop it at the worry box.** `HARM` now runs in
`checkBelief` and returns `checkTest`'s own `refusal.harm`, so `app.js` drew the crisis lines
under the belief box with no change to `app.js` at all. Walked in a browser: the refusal, the
emergency line, and **116 123 — Samaritans** as a tappable number; a second tap refuses again.

**`HABIT` and `BODY` stay `checkTest`'s alone, deliberately.** "If I stop drinking at the wedding,
then they'll ask why" is exactly the worry door one exists to hold, and its test never goes near
a drink. **A test now fails if somebody "makes the two guards consistent".**

**Two of B22's five are still open and both are yours:**
- **Door one's four nouns** — *"— drink, weed, porn, betting"*. **Misha's casting vote, B23.**
- **The word *diagnosis*** on the doors footer — wants a second opinion on the legal point first.

**Still true:** **Q1 (name, trademark, domain) is open** and blocks release. **Nobody outside this
building has read a word of the worry list, and nobody using a screen reader has touched the app.**

## 2. The next action

**B23 — door one, which still carries B22's first question inside it.**

```
B22 steps 2-3  ──▶  B23  ──▶  B25  ──▶  B26     (B24 done; B27 1-3 and 5 done)
3 of 5 SHIPPED      doors     number    Help
   └── 2 left: door one's nouns (Misha), "diagnosis" (legal)
```

- **B23 has no free option.** Door one is what nearly lost Priya *and* what got Dan and Marcus
  in. Five options costed in the file; (b) is now a **deletion** — *"— drink, weed, porn,
  betting"* and nothing else — because B22 proved the label and the first clause are pile 1.
  Its second half (door one's list does not serve porn recovery) is content and waits for the
  paid CBT reviewer either way.
- **B25 contains a regression made on 2026-09-04.** Scope §3: *"Everything starts at 10 — that is
  what the front screen says."* The new headline does not say it, and a test user read his 10 → 9
  as barely moving. The fix carries a test, because a rule that lives only in a doc can be
  deleted by a well-meaning edit on github.com. **Its option (d) — change the ad, not the app —
  costs no code and may be the best answer in the task.**
- **B26 is Help's order, not its words.** 4,112px of correct, heavy writing arriving at once.
  B22 filed one thing for whoever takes it: **the promise did not win the sceptic, the admission
  did** — Dan shrugged at *"no account, no AI"* and stayed for TrybeUP's paywall in the small print.
- **B27 item 4 is open and is NOT next.** It needs somebody to look at an iPhone's *Add to Home
  Screen* sheet; nothing in the repo can answer it, and it bites harder at **B5**.

**One thing this session opened and did not close.** `HARM` matches whole words, so *"end it"* in
a sentence about ending a friendship is refused on a box where the words are a person's own. That
is the trade the guard file has always made on purpose, and it has never been watched in front of
anybody. It belongs with the screen-reader pass, not in a patch.

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
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap <sel>` · `type <sel> <text>` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x, Europe/London. `.walk.json` is gitignored. **Always `stop`.** `dump`'s CAN TAP list gives you the real selectors — doors are `[data-door="habit"]`, not the label |
| Live address | **`https://betr.trybeup.com` — live.** Every push to `main` touching `web/**` publishes it. Cert expires 2026-12-02 |

## 4. Gotchas, live

- **`node --test web/tests/` does not work on Node 22** — run it from the repo root, and only
  from there: run it inside `web/` and you get fewer tests than the real count and no warning.
  `harness.js` is the fake DOM; in its `vm`, **`instanceof Array` is unreliable** and there is
  **no `crypto`**. A textarea keeps its value across a repaint there.
- **`checkBelief` and `checkTest` deliberately do not enforce the same lists.** `HARM` is on both;
  `HABIT` and `BODY` are `checkTest`'s alone. The comment block above `checkBelief` says so now,
  and a test enforces it. **Do not tidy this into symmetry.**
- **Two footers are one sentence.** `whats-going-on.js`'s `foot` and `strings-en.js`'s
  `doors.foot` are printed into the same `<p>` at `app.js:667`. `docs/COPY.md` is organised by
  file and cannot show you that. **Sort copy by what a person reads, not by where it is stored.**
- **`boot(a.mem)` lands back on the test in hand**, not the front screen. **`docs/prose-craft.md`
  is a ZIP** — `unzip` it. **No test may hard-code a worry's words, or the front screen's.**
- **A walk in a test is five taps**: `#go` → `[data-door]` → `[data-id]` → `[data-b]` → `#lock`.
- **A worry is a loose `belief` plus exactly three `beliefs`**, two fields each, each predicting
  something different, the card sentence never one of the three — and **no two worries behind
  one door may end the same way**, exemptions held by hand in `content.test.js`.
- **Every word a person reads is in `web/content/strings-en.js`**; a sentence back in `app.js`
  fails `i18n.test.js`, as does a `left:` or a `px` font size in `app.css`. The key sweep matches
  `t('literal')`, so **write `rest ? t('a') : t('b')`, never `t(rest ? 'a' : 'b')`**.
  `refusal.notConditional` and `refusal.noConsequence` are **dead keys kept on purpose**.
- **`nudge` is cleared by `go()`, like `refusal`**; `takeBelief()` is the only caller of
  `guards.checkBelief`. **A new stored field goes in three places**: `blank()`, `normalise()`,
  `isEmpty()`. **The ladder is one belief's grip** — no total, no average, no target.
- **Storage is v3.** A ladder's rungs come from `g.rungs`, not `r.level`. `rate.keyOf()` keys a
  stock ladder by **worry id**, so all three predictions share one ladder — B20 says how to reverse it.
- **`content/zones.js` is generated, never hand-edited**, and **no helpline number is written
  from memory**. **Sentence 7 names 988 and 116 123 inside itself**: frozen.
- **`docs/COPY.md` is generated** by `node tools/copy-sheet.js`; never hand-edit it.
  `docs/changing-the-words.md` is what the founder follows — keep it true.
- **In `places.js` a GROUP may carry `note` and `id`; an ITEM has three fields and no fourth;
  `why.js` has two and no third.** **A link is allowed; a request is not** — `menu.test.js`.
