# Start here

**Last refreshed:** 2026-09-04, after B25's repair shipped — the front screen says where the
number starts again.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**v1 is built and live, and everything from 2026-09-04 is committed and published.** 178 tests,
no dependencies, no build step, nothing requested after load. `betr.trybeup.com` is serving it.

**2026-09-04, in order.** The gluten fix; the grammar wall became a nudge; B21's three walks;
B22–B27 written from them; **B24 closed**; **B27 items 1–3 and 5**; **B22's sort**
(`docs/three-piles.md`) and three of its five wording calls; **B23's first half** — screen two no
longer opens on four substances; and last, **B25's repair.**

**What changed this session.** The 2026-09-04 headline change fixed the gluten problem and
silently deleted the only place the app said why every worry starts at 10 — scope §3's own
sentence — and nobody noticed until Dan finished his first test, saw **10 → 9**, and had nothing
to read it against. The front screen now carries it, under the button and above the trust line:
*"Every worry starts at ten out of ten — that's how sure you are. It moves when you find out
what happens."*

**The part worth reading before touching that screen.** It says where the number starts and
nothing about where it goes — *"what happens"*, not *"what happens instead"*, because a test can
leave a person **more** sure. Its test, `the front screen still says every worry starts at ten`,
also fails the build if the line grows a promise (*most people*, *within*, *will drop*): a rule
living only in `docs/00-scope.md` was deleted by a well-meaning edit once already.

**And the front screen is now full.** Cold it clears the menu at normal and 125% text. **With a
test on the go**, the *On the go* card pushes the trust line behind the menu at 125% — that page
already scrolled in that state before today, and the person who most needs the promise arrives
cold and sees it. The next thing added to that screen takes it below the fold for them. Don't.

**Three questions are open, all yours:**
- **(d): change the ad, not the app.** All three walkers arrived from a post showing somebody at
  **6/10** and landed on an app at 10. The honest fix is an ad showing a **first** result, 10 → 9.
  **Costs no code**, and it is the best answer in B25. Yours and Misha's.
- **Misha on the four nouns** (B23 option b) **and on the new door order, together** — one screen,
  ask once. The labels and the safety note were already his (B0 Q2a).
- **The word *diagnosis*** on the doors footer — wants a second opinion on the legal point.

**Still true:** **Q1 (name, trademark, domain) is open** and blocks release. **Nobody outside this
building has read a word of the worry list, and nobody using a screen reader has touched the app.**

## 2. The next action

**B26 — Help's order, not its words.**

- **4,112px of correct, heavy writing arriving at once.** Dan tapped *Help* for the price and got
  *If you are in danger or in crisis*. The counters that would have won him — **0 accounts · 0 B
  sent to us, ever** — are **2,711px** down. The crisis block is first for good reasons (B17) and
  nobody moves it without saying why; but those are not the same person.
- **B22 filed one thing for it: the promise did not win the sceptic, the admission did.** Dan
  shrugged at *"no account, no AI"* and stayed for TrybeUP's paywall named in the small print.
- **B23's second half is open and NOT next.** Door one says *porn* and the five worries behind it
  are shaped like a pub — content, so it waits for the CBT reviewer and Misha alongside
  `strug`/`low`, `care`/`praise` and the `early`/`strug` duplicate. **B27 item 4 is open and NOT
  next** either: it needs an iPhone's *Add to Home Screen* sheet, and bites harder at **B5**.

**Still open, unchanged.** `HARM` matches whole words, so *"end it"* in a sentence about ending a
friendship is refused on a box where the words are a person's own. It belongs with the
screen-reader pass.

**Unchanged release conditions:** one paid CBT-trained reviewer on the worries (**three pairs are
written down for them** in `B1-the-stock-list.md` step 3); **Misha on the six doors, their order
and the sixty-three**; a real screen-reader pass on a real phone; **a PR on
`trybeup/trybeup-prod`** — BETR's nginx block is on the droplet and not in that repo, so their
next nginx change takes the address dark; J1–J3 on a phone; an owner for links and helplines;
and **Q1**.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | `python3 -m http.server 8760 --bind 127.0.0.1` from `web/`, then `http://127.0.0.1:8760/`. Opening `web/index.html` off disk works for words; serve it when testing storage |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap <sel>` · `type <sel> <text>` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x, Europe/London. `.walk.json` is gitignored. **Always `stop`.** `dump`'s CAN TAP list gives you the real selectors — doors are `[data-door="habit"]`, not the label |
| Live address | **`https://betr.trybeup.com` — live.** Every push to `main` touching `web/**` publishes it. Cert expires 2026-12-02 |

## 4. Gotchas, live

- **`node --test web/tests/` does not work on Node 22** — run it from the repo root; inside `web/`
  you get fewer tests than the real count and no warning. `harness.js` is the fake DOM, and in its
  `vm` **`instanceof Array` is unreliable** with **no `crypto`**.
- **The fold is 785px, not 844.** `nav.menu` is fixed over the bottom 59px and `dump` does not
  know it, so a thing it calls on-screen can be invisible. **Anything near the bottom needs a
  `shot` or an `eval`'d rect against `nav.menu`.** This nearly hid a safety line (B23).
- **`walk.js open` clears storage on purpose.** For the front screen as a returning person: five
  taps to `#lock`, then `#m-mine`, `#back`. A reload lands on the test in hand instead.
- **After editing `web/content/*`, `stop` and `start` the walker** — `open` alone re-serves a
  cached copy and the screen comes back in the old words.
- **The doors order is a decision, not a layout:** `phone, habit, work, temper, secret, yes`
  (B23, founder, 2026-09-04). Door one may not name a substance, and the door carrying the note
  may not fall past second — two tests say so. Misha has not signed it off.
- **`checkBelief` and `checkTest` deliberately do not enforce the same lists.** `HARM` is on both;
  `HABIT` and `BODY` are `checkTest`'s alone. **Do not tidy this into symmetry** — a test fails.
- **Two footers are one sentence** — `whats-going-on.js`'s `foot` and `strings-en.js`'s
  `doors.foot` share one `<p>`. **Sort copy by what a person reads.**
- **`boot(a.mem)` lands back on the test in hand.** **`docs/prose-craft.md` is a ZIP** — `unzip`
  it. **No test may hard-code a worry's words**, nor assert a bare word off the whole screen a
  worry could use (`missed`); assert the phrase.
- **A walk in a test is five taps**: `#go` → `[data-door]` → `[data-id]` → `[data-b]` → `#lock`.
  **`doors.items[0]` is `phone` now** — use `firstBehind()`, never `worries[0]`.
- **A worry is a loose `belief` plus exactly three `beliefs`**, two fields each, each predicting
  something different, the card sentence never one of them — and **no two worries behind one door
  may end the same way**, exemptions held by hand in `content.test.js`.
- **Every word a person reads is in `web/content/strings-en.js`**; a sentence back in `app.js`
  fails `i18n.test.js`, as does a `left:` or a `px` font size in `app.css`. The key sweep matches
  `t('literal')`, so **write `rest ? t('a') : t('b')`, never `t(rest ? 'a' : 'b')`**.
- **`nudge` is cleared by `go()`, like `refusal`.** **A new stored field goes in three places**:
  `blank()`, `normalise()`, `isEmpty()`. **The ladder is one belief's grip** — no total, no target.
  **Storage is v3**, and `rate.keyOf()` keys a stock ladder by **worry id**, so all three
  predictions share one ladder.
- **`content/zones.js` and `docs/COPY.md` are generated** (`node tools/copy-sheet.js`); never
  hand-edit either. **No helpline number is written from memory**, sentence 7 names 988 and
  116 123 inside itself, and `docs/changing-the-words.md` is the founder's — keep it true.
- **In `places.js` a GROUP may carry `note` and `id`; an ITEM has three fields and no fourth;
  `why.js` two and no third.** **A link is allowed; a request is not** — `menu.test.js`.
