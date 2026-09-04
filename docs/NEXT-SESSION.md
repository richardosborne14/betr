# Start here

**Last refreshed:** 2026-09-04, after B27's first three repairs went in.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**v1 is built and live, and everything from 2026-09-04 is committed and published.** 173 tests,
no dependencies, no build step, nothing requested after load. `betr.trybeup.com` is serving it.

**2026-09-04, in order.** The gluten fix (a new front screen and the boundary line under the
blank box); the grammar wall became a nudge; B21's three walks in a real browser
(`docs/journeys-observed.md`, ten findings); B22–B27 written from them; **B24 closed** — Help
has six places, every one read on its provider's own site that day; and then **B27 items 1–3**:

- **A miss is a state now, not a sentence.** Tapping *Didn't get to it* used to leave the screen
  saying **LOCKED IN · Go and do it** with a kind note bolted on, and a test user asked whether
  it had registered. Same screen, no new one: the kicker becomes **SET ASIDE**, the heading
  **Nothing lost.**, the big button **Actually, I did it**, and *Didn't get to it* is not offered
  a second time. The test and the drop stay — they are what is waiting for tomorrow.
- **The boundary line is on both boxes.** `own.belief.only` rendered on the blank box and not on
  *I'll put it my own way*, which is the path a test user actually took. One line, two assertions.
- **A test now fails the build if two worries behind one door end the same way.** `early` and
  `strug` both end *"then it costs me something with them"*, one above the other on door one.
  **The words are not a session's to change**, so the pair is exempted by hand in
  `KNOWN_SHARED_CONSEQUENCE` and written onto the CBT reviewer's list in `B1-the-stock-list.md`
  beside `strug`/`low` and `care`/`praise`. A second test deletes the exemption for us: it fails
  the day the pair stops being a duplicate.

**The founder's read of the walks, and it is the through-line:** everything that worked
**described the inside of a moment**; everything that nearly lost somebody **named a kind of
person**. That is B22 and it governs the rest.

**Still true:** **Q1 (name, trademark, domain) is open** and blocks release. **Nobody outside
this building has read a word of the worry list.** **Nobody who uses a screen reader has touched
the app.**

## 2. The next action

**Start B22.** `docs/TRACK-understandable.md` has the order and the reasoning:

```
B22  ──▶  B23  ──▶  B25  ──▶  B26          (B24 and B27 items 1-3 are done)
```

- **B22 is the rule the other three answer to**: sort every sentence in the app into three
  piles — describes a moment / names a kind of person / required and staying put — and put the
  rewrites in front of the founder and Misha. It changes no frozen sentence and deletes nothing
  for being intimidating; it decides what is **met first**.
- **B23 is the founder's and Misha's**, and it has no free option — door one is what nearly lost
  Priya *and* what got Dan and Marcus in. Five options costed in the file. **Misha's casting vote.**
- **B25 contains a regression made on 2026-09-04.** Scope §3: *"Everything starts at 10 — that is
  what the front screen says."* The new headline does not say it, and a test user read his 10 → 9
  as barely moving. The fix carries a test, because a rule that lives only in a doc can be
  deleted by a well-meaning edit on github.com.
- **B27 item 4 is open and is NOT next.** It needs somebody to look at an iPhone's *Add to Home
  Screen* sheet and confirm a person can still type their own name for the icon, before anyone
  can decide anything. Nothing in the repo can answer it. It bites harder at **B5**, where a
  native wrap fixes the name and icon with no rename sheet at all.

**Unchanged release conditions:** one paid CBT-trained reviewer on the worries (**three pairs are
now written down for them** in `B1-the-stock-list.md` step 3); **Misha on the six doors and the
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
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap <sel>` · `type <sel> <text>` · `shot <file>` · **`eval <js>`** · `stop`. `eval` is how you check where a screen actually landed. Keeps Chrome alive between commands, 390×844 @3x, Europe/London. `.walk.json` is gitignored. **Always `stop`** — it leaves a Chrome and a python server running otherwise |
| Live address | **`https://betr.trybeup.com` — live.** Every push to `main` touching `web/**` publishes it. Cert expires 2026-12-02 |

## 4. Gotchas, live

- **`node --test web/tests/` does not work on Node 22** — run it from the repo root, and only
  from there: run it inside `web/` and you get 166 tests instead of 173 and no warning.
  `harness.js` is the fake DOM; in its `vm`, **`instanceof Array` is unreliable** and there is
  **no `crypto`**. A textarea keeps its value across a repaint there.
- **`boot(a.mem)` lands straight back on the test in hand**, not on the front screen — there is
  no `#pickup` to tap when a test is locked in. `#pickup` only exists on the start screen.
- **`docs/prose-craft.md` is a ZIP, not markdown.** `unzip` it. It is the writing guide the front
  screen was rewritten against.
- **Nothing in a test may hard-code a worry's words, or the front screen's.** Four tests did the
  latter and broke on the headline change; they read `en.s.start.title` now.
- **A walk in a test is five taps**: `#go` → `[data-door]` → `[data-id]` → `[data-b]` → `#lock`.
- **A worry is a loose `belief` plus exactly three `beliefs`**, two fields each, each predicting
  something different, the card sentence never one of the three — and now **no two worries behind
  one door may end the same way**, exemptions held by hand in `content.test.js`.
- **`content.test.js` holds `STARTS_TODAY` and `KNOWN_SHARED_CONSEQUENCE` by hand** — judgements,
  not derivations, so a change shows in a diff. A worry behind no door is unreachable.
- **Every word a person reads is in `web/content/strings-en.js`**; a sentence back in `app.js`
  fails `i18n.test.js`, as does a `left:` or a `px` font size in `app.css`. The key sweep matches
  `t('literal')`, so **write `rest ? t('a') : t('b')`, never `t(rest ? 'a' : 'b')`** — the second
  compiles, renders, and is silently never checked. `refusal.notConditional` and
  `refusal.noConsequence` are **dead keys kept on purpose**.
- **Every screen goes through `paint()`**, and **`worryHead()` is on every screen from the choice
  to the result**. `pending` and `whyId` are not stored; a reload there drops to the doors.
- **`nudge` is cleared by `go()`, like `refusal`.** `takeBelief()` is the only caller of
  `guards.checkBelief` and it is what makes the second tap go through.
- **A new field on the stored state goes in three places**: `blank()`, `normalise()`, `isEmpty()`.
- **Storage is v3.** A ladder's rungs come from `g.rungs`, not `r.level`. `rate.keyOf()` keys a
  stock ladder by **worry id**, so all three predictions share one ladder — B20 says how to reverse it.
- **`content/zones.js` is generated, never hand-edited**, and **no helpline number is written
  from memory**. **Sentence 7 names 988 and 116 123 inside itself**: frozen.
- **Language and country are two separate questions.** **The ladder is one belief's grip** — no
  total, no average, no target. `.kicker` is uppercase in CSS. The guard blocks "bet".
- **`docs/COPY.md` is generated** by `node tools/copy-sheet.js`; never hand-edit it. The founder
  may edit the five content files on github.com — `docs/changing-the-words.md` is what they are
  following, so keep it true if a content file moves or a rule changes.
- **`walk.js shot` leaves the page scrolled to the bottom.** Check `scrollY` first, or `open`
  again; otherwise a working landing looks broken.
- **In `places.js` a GROUP may carry `note` and `id`; an ITEM still has three fields and no
  fourth.** **A link is allowed; a request is not** — `menu.test.js` holds the allow-list.
  **`why.js` has two fields and no third** — the regulatory line, not a style rule.
