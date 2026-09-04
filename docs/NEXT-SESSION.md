# Start here

**Last refreshed:** 2026-09-04, after the gluten fix went live and B24 closed the one safety gap.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**v1 is built and live, and everything from 2026-09-04 is committed and published.** 169 tests,
no dependencies, no build step, nothing requested after load. The founder read the changed
sentences and said commit and push (`dadb734`); `betr.trybeup.com` is serving them.

**What 2026-09-04 did, in order.**

- **The gluten problem.** A test user typed *"if I eat gluten, then I'll feel sick"* into the
  blank box. He is gluten intolerant, he was answering the question honestly, and **no screen in
  the app had ever said which worries BETR is for.** Fixed in words: a new front screen
  (*"You've played it out a hundred times."*), and `own.belief.only` under the blank box —
  *"Not the weather, and not your body. Only the ones you've never actually found out about."*
- **The grammar wall became a nudge.** He had also been refused for a missing "then". `if` may
  now sit anywhere, no comma, no "then", five-word floor; anything that does not read as a
  prediction is **asked about once** and the button becomes *Keep mine as it is*. Three stops
  stay hard: empty, `I am ___`, self-harm. One narrow loosening: a sentence containing "if" is
  exempt from the verdict check, because *"I'm going to get fired if I ask"* used to be refused.
- **`web/tests/harness.js` learned that a box keeps its text across a repaint**, which is the
  only way to test "hands your words back" rather than "sends your words back".
- **B21: three characters walked the app in a real browser** — `tools/walk.js`, one command per
  step. `docs/journeys-observed.md`. Ten findings.
- **B22–B27 written** from those findings, ordered in `docs/TRACK-understandable.md`.
- **B24 done, and it was the release blocker.** Door one's note promised *"Help has places that
  are"* and Help had none. It has six now — NHS alcohol, NHS drugs, WithYou, Talk to Frank, UK
  SMART Recovery, FindTreatment.gov — **every one read on its own site on 2026-09-04**, and no
  phone number written. **The founder overruled `places.js` rule 5 knowingly** to name a
  fellowship; the rule now records that it was overruled and how to reverse it. The note is a
  button, and it lands on the group, not on the top of a 4,700px screen.

**The founder's read of the walks, and it is the through-line:** everything that worked
**described the inside of a moment**; everything that nearly lost somebody **named a kind of
person**. That is B22 and it governs the other five.

**Still true:** **Q1 (name, trademark, domain) is open** and blocks release. **Nobody outside
this building has read a word of the worry list.** **Nobody who uses a screen reader has touched
the app.**

## 2. The next action

**Start on B27 items 1–3.** B24 is done. `docs/TRACK-understandable.md` has the rest of the
order and the reasoning:

```
B27 (items 1-3)  ──▶  B22  ──▶  B23  ──▶  B25  ──▶  B26
```

- **B27 items 1–3 need nobody's permission and are about an hour**: the miss state still shouts
  *LOCKED IN · Go and do it*; `own.belief.only` is missing from `beliefOwn()`; `early` and
  `strug` share a word-for-word consequence on the same screen.
- **B23 is the founder's and Misha's**, and it has no free option — door one is what nearly lost
  Priya *and* what got Dan and Marcus in. Five options costed in the file. **Misha's casting vote.**
- **B25 contains a regression made the same day.** Scope §3: *"Everything starts at 10 — that is
  what the front screen says."* The new headline does not say it. Dan read his 10 → 9 as barely
  moving. The fix carries a test, because a rule that lives only in a doc can be deleted by a
  well-meaning edit on github.com.

**Unchanged release conditions, none of which B21 touched:** one paid CBT-trained reviewer on the
worries (add `early`/`strug` to the list beside `strug`/`low` and `care`/`praise`); **Misha on
the six doors and the sixty-three**; a real screen-reader pass on a real phone; **a PR on
`trybeup/trybeup-prod`** — BETR's nginx block is on the droplet and not in that repo, so their
next nginx change takes the address dark, and their deploy reloads nginx inside the container so
an inode change makes the reload silently do nothing; J1–J3 walked on a phone; an owner for links
and helplines (`helplines.js` has `owner: null`); and **Q1**.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | `python3 -m http.server 8760 --bind 127.0.0.1` from `web/`, then `http://127.0.0.1:8760/`. Opening `web/index.html` off disk works for words; serve it when testing storage |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap <sel>` · `type <sel> <text>` · `shot <file>` · `stop`. Keeps Chrome alive between commands, 390×844 @3x, Europe/London. `.walk.json` is gitignored. **Always `stop`** — it leaves a Chrome and a python server running otherwise |
| Live address | **`https://betr.trybeup.com` — live.** Every push to `main` touching `web/**` publishes it. Cert expires 2026-12-02 |

## 4. Gotchas, live

- **`node --test web/tests/` does not work on Node 22** — run it from the repo root.
  `harness.js` is the fake DOM; in its `vm`, **`instanceof Array` is unreliable** and there is
  **no `crypto`**. Since 2026-09-04 a **textarea keeps its value across a repaint** there.
- **`docs/prose-craft.md` is a ZIP, not markdown** — a skill package with the wrong extension.
  `unzip` it to read it. It is the writing guide the front screen was rewritten against.
- **Nothing in a test may hard-code a worry's words, or the front screen's.** Four tests did the
  latter and broke on the headline change; they read `en.s.start.title` now.
- **A walk in a test is five taps**: `#go` → `[data-door]` → `[data-id]` → `[data-b]` → `#lock`.
- **A worry is a loose `belief` plus exactly three `beliefs`**, two fields each, each predicting
  something different, and the card sentence is never one of the three.
- **`content.test.js` holds `STARTS_TODAY` by hand.** A worry behind no door is unreachable.
- **Every word a person reads is in `web/content/strings-en.js`**; a sentence back in `app.js`
  fails `i18n.test.js`, as does a `left:` or a `px` font size in `app.css`. `refusal.notConditional`
  and `refusal.noConsequence` are **dead keys kept on purpose** — nothing reaches them since the
  nudge, and dropping a key would fail the build the day somebody puts the wall back.
- **Every screen goes through `paint()`**, and **`worryHead()` is on every screen from the choice
  to the result**. `pending` and `whyId` are not stored; a reload there drops to the doors.
- **`nudge` is cleared by `go()`, like `refusal`.** `takeBelief()` is the only caller of
  `guards.checkBelief` and it is what makes the second tap go through.
- **A new field on the stored state goes in three places**: `blank()`, `normalise()`, `isEmpty()`.
- **Storage is v3.** A ladder's rungs come from `g.rungs`, not `r.level`. `rate.keyOf()` keys a
  stock ladder by **worry id**, so all three predictions share one ladder — a decision, and
  B20's file says how to reverse it.
- **`content/zones.js` is generated, never hand-edited**, and **no helpline number is written
  from memory**. **Sentence 7 names 988 and 116 123 inside itself**: frozen.
- **Language and country are two separate questions.** **The ladder is one belief's grip** — no
  total, no average, no target. **`.kicker` is uppercase in CSS.** **The guard blocks "bet".**
- **`docs/COPY.md` is generated** by `node tools/copy-sheet.js`; never hand-edit it. The founder
  may edit the five content files on github.com — `docs/changing-the-words.md` is what they are
  following, so keep it true if a content file moves or a rule changes.
- **`walk.js shot` leaves the page scrolled to the bottom.** Check `scrollY` before you
  screenshot, or `open` again; otherwise a working landing looks broken.
- **In `places.js` a GROUP may carry `note` and `id`; an ITEM still has three fields and no
  fourth**, and that is the rule that stops the Help list being aimed at anybody.
- **A link is allowed; a request is not** — `menu.test.js` holds the allow-list. **`why.js` has
  two fields and no third** — the regulatory line, not a style rule.
