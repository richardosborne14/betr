# Start here

**Last refreshed:** 2026-09-04, after B26 closed — Help answers the price on the first screen.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**v1 is built and live, and everything from 2026-09-04 is committed and published.** 180 tests,
no dependencies, no build step, nothing requested after load. `betr.trybeup.com` is serving it.
Closed this day: **B24**, **B27 items 1–3 and 5**, **B22's sort** (`docs/three-piles.md`) and
three of its five wording calls, **B23's first half**, **B25's repair**, and **B26**.

**What changed — B26, and it was two things, not one. The order:** the counters that answer
*what's the catch* sat 2,607px down, behind the crisis lines, the CBT explainer and the nine
sentences. The proof block is second now — heading 456px, counters 653px. **The crisis block did
not move**, and was never proposed for moving.

**The sentence that was never there.** Reading `strings-en.js` to move the block turned up what
the walk could not: **BETR never said anywhere that it is free** — not in ~150 sentences. Dan
tapped Help to check the price and inferred it from TrybeUP's paywall admission four thousand
pixels down. Founder's call, now the first line under the proof heading: *"BETR is free. No ads,
no subscription, nothing to buy, and nothing to unlock."* **The standing risk, which no test can
catch: if BETR ever gains a thing to buy, that sentence comes out the same day.**

**Before saying "the proof is above the fold":** the counters clear the 785px fold by **11 pixels**
at normal text and **not at all at 125%** (block starts 901px). The *free line* clears it at both.

**Three questions are open, all yours:** **(d) change the ad, not the app** — all three walkers
arrived from a post showing somebody at **6/10** and landed on an app at 10, so the honest fix is
an ad showing a **first** result, 10 → 9; costs no code, best answer in B25, yours and Misha's.
**Misha on the four nouns** (B23 option b) **and on the new door order, together** — one screen,
ask once; the labels and the safety note were already his (B0 Q2a). And **the word *diagnosis***
on the doors footer, which wants a second opinion on the legal point.

**Still true: Q1 (name, trademark, domain) is open** and blocks release. **Nobody outside this building has read the worry list, and nobody using a screen reader has touched the app.**

## 2. The next action

**The `trybeup/trybeup-prod` PR. It is the one unblocked engineering job left in v1, and it is
the one that can take the live address dark without anybody touching BETR.**

- **BETR's nginx block only exists on the droplet.** `B3-hosting-and-deploy.md` describes a
  branch `betr-nginx`; **there is no such branch**, `main`'s `nginx.conf` contains no `betr`, and
  the live `/opt/trybeup/nginx.conf` was edited by hand. **TrybeUP's next deploy from their repo
  overwrites it and `betr.trybeup.com` stops answering** — and nobody would connect the two.
- **Two files**, spelled out in `B3-hosting-and-deploy.md` § *The exact changes to TrybeUP*:
  `nginx.conf` (the 443 block, plus `betr.trybeup.com` on the port-80 redirect's `server_name`) and
  `.github/workflows/renew-cert.yml` (probe, renew loop, expiry alert — **the cert expires
  2026-12-02 and nothing renews it**).
- **`trybeup/trybeup-prod`'s own `CLAUDE.md` governs that repo. Read it first.** Diff the live
  `/opt/trybeup/nginx.conf` against their `main` before writing a line — the PR must carry what is
  actually running. `dev.trybeup.com` and `trybeup.com` must still serve afterwards; check both.
- **Do not push it without the founder saying so, on the day** (CLAUDE.md). Prepare, show, ask.

**Not next, and why.** **B23's second half** (door one says *porn*; its five worries are shaped
like a pub) is content, and waits for the CBT reviewer and Misha alongside `strug`/`low`,
`care`/`praise` and the `early`/`strug` duplicate. **B27 item 4** needs an iPhone's *Add to Home
Screen* sheet and bites harder at **B5**. **The `HARM` false refusal** — *"end it"* matches whole
words, so a sentence about ending a friendship is refused on a box where the words are the
person's own — **is a safety call, not a tidy-up**: loosening it risks missing a real disclosure,
BETR over-refuses by standing rule, and it is the founder's. Ask; do not fix it quietly.

**Unchanged release conditions:** one paid CBT-trained reviewer on the worries (**three pairs are
written down for them** in `B1-the-stock-list.md` step 3); **Misha on the six doors, their order,
the sixty-three, and `places.signedOff`**; a real screen-reader pass on a real phone; **the PR
above**; J1–J3 on a phone; an owner for links and helplines; **Q1**.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | `python3 -m http.server 8760 --bind 127.0.0.1` from `web/`, then `http://127.0.0.1:8760/`. Opening `web/index.html` off disk works for words; serve it when testing storage |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** `dump`'s CAN TAP list gives the real selectors — doors are `[data-door="habit"]`, not the label |
| Live address | **`https://betr.trybeup.com` — live.** Every push to `main` touching `web/**` publishes it. Cert expires 2026-12-02 |

## 4. Gotchas, live

- **`node --test web/tests/` does not work on Node 22** — run it from the repo root; inside `web/`
  you get fewer tests and no warning. `harness.js` is the fake DOM; in its `vm` **`instanceof
  Array` is unreliable** and there is **no `crypto`**.
- **The fold is 785px, not 844.** `nav.menu` is fixed over the bottom 59px and `dump` cannot see
  it, so a thing it calls on-screen can be invisible: **anything near the bottom needs a `shot` or
  an `eval`'d rect against `nav.menu`** — and **check 125% text**, where the Help counters fall
  off and the front screen's trust line already does.
- **A walk finds what is hard to reach; only reading the file finds what was never written** (B25's
  ladder line, B26's price) — grep before moving anything. `learnings.md`.
- **`walk.js open` clears storage on purpose** (returning person: five taps to `#lock`, then
  `#m-mine`, `#back`). **After editing `web/content/*`, `stop` and `start`** — `open` alone
  re-serves a cached copy and the screen comes back in the old words.
- **Help's order is a decision and two tests hold it:** crisis first (B17), proof second (B26),
  then CBT, then the nine sentences — frozen in **wording, not position**. **The doors order is a
  decision too**: `phone, habit, work, temper, secret, yes` (B23, founder, 2026-09-04); door one
  may not name a substance and the door carrying the note may not fall past second — two more
  tests. Misha has not signed either off.
- **`checkBelief` and `checkTest` deliberately do not enforce the same lists** — `HARM` is on
  both, `HABIT` and `BODY` are `checkTest`'s alone. **Do not tidy this into symmetry**; a test
  fails. **Two footers are one sentence** — `whats-going-on.js`'s `foot` and `strings-en.js`'s
  `doors.foot` share one `<p>`. **Sort copy by what a person reads.**
- **`boot(a.mem)` lands back on the test in hand. `docs/prose-craft.md` is a ZIP** — `unzip` it.
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
