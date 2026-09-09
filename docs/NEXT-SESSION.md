# Start here

**Last refreshed:** 2026-09-09, after B40 closed.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**B40 is built and closed.** 222 tests, no dependencies, nothing requested after load; `main`
clean and live at `https://betr.trybeup.com`.

**B40 was the plumbing under the whole template programme, and its one sentence is this:**

> **The road decides which worry a test belongs to, not the words.** Stay on a stock item's road
> and the record keeps that item's `id`, whatever the person types over it.

Because a filled-in skeleton differs from its skeleton **every time, by design** — so under the
old rule (B32: the words decide) every templated run would have been a stranger to itself, every
one would have started at the top, and the one number in the product would never have moved off
its first rung. **Silently, with every test passing.** Hence: before B41, never after.

- **`sameAsStock()` changed jobs rather than going.** It decides the **wording** — which sentence
  is stored, and whether B20's hand-written expectation travels — and no longer the identity.
- **`store.js` v5, migrating nothing.** Three fields ride along, **none of them keying a
  ladder**: `prediction`, `slots` (null until B41), `size` (null until B42). All three are in the
  export, counted from one, absent where there is nothing to say.
- **`rate.keyOf()` did not change, and that is the decision** — worry-plus-prediction would give
  one worry three ladders, which is rule 5 inverted. Its comment now says so.
- **The way out: `#ownit`, *Write the whole thing myself*.** One plain link, borrowed road only.
  It had to be built here: B40 removes the exit that editing used to be.

## 2. The next action

**Build `B41`.** Its dependency is met and it blocks B42 and B43. A worry gains an optional
`skeleton` — printed words with named holes — and typing into a hole re-renders the three
prediction chips with that word in them. `slots` is plumbed; `filled()` in `app.js` is where a
draft's holes become a record's.

**The rule that travels with it, and `content.test.js` cannot check it: BETR owns the verb, the
person owns the nouns.** A hole takes a person, a thing, a place — never a verb, or somebody can
compose a sentence BETR appears to be proposing. The file comment states it, **the reviewer holds
it.**

**Then `B42` → `B43`.** `B44` is last on purpose.

## 3. Two things a person can see change, both on purpose

**Editing a borrowed sentence no longer starts a new ladder.** Rewrite the prediction and the
test stays under that worry, on the rung it was on — one card and one ladder where before today
it became a second card. Anybody who edited one before today keeps the own-test card they have;
nothing was migrated and nothing was rewritten on the way in.

**At 125% the escape link sits behind the menu** (870px against a 780px fold) — as did the small-
print line it shares a paragraph with, every day since B32. Nothing regressed and the big button
clears the fold on both roads. It belongs **after** the three suggestions: you read them, none is
yours, then you write your own. **If it ever has to clear the fold, cut the chip row.**

**Still nobody's, from B39:** the front screen scrolls a 20px sliver at 125%, costed with nothing
to take; and **tapping *New test* from the do screen wipes the sentence and the plan with no
warning** — B36 item 6, a founder decision already waiting.

## 4. Waiting on people, not on code

1. **The founder.** **B36 items 6 and 9** (item 6 above). Rule 10's third amendment, written down
   rather than arrived at (B37 §9a). Start #19, the checking ritual (B34 §6). Which example leads
   the front screen, and **real or an example**. **The purpose statement**, still saying "you pick
   a worry", frozen in five places (`B29` has a candidate). **The `HARM` false refusal.** **Change
   the ad, not the app** (B25).
2. **Misha, in one ask:** the front card's voice and the two reframed lines from B38 (six
   strings, all flippable), B39's *Change* / *Add one*, **B40's *Write the whole thing myself***,
   the four nouns (B23 option b), the door order, the 21 chips, B36's tone, the **red strike**
   through a person's own sentence (B36 §12b), **and every skeleton in B41/B43** — where the risk
   is BETR's voice in somebody's mouth.
3. **The paid CBT reviewer, still the critical path. Send `docs/suggestions-review.csv`** — 245
   rows, reasoned in `docs/candidates-suggestions-batch-1.md`. Also `content/examples.js`, three
   rewritten `worries.js` sentences, three pairs from B1, B34 §4's `general.thens`, B36's strings
   and B38's four. Two questions: is *"the smallest version that could still turn out wrong"* safe
   to hand somebody with no clinician, and may *A small go* change **who it is with**? **B43 adds ~26.**
4. **A screen-reader pass on a real phone** — the tree was read in B33, **nobody has used it.**
   And **Q1 (name, trademark, domain)**, which blocks release and blocks B5 outright.

**Two API keys pasted in an earlier session — Groq and Anthropic — still need rotating.** Nobody
owns the missing medication word list in `guards.js`. **Release conditions:** Misha on
`places.signedOff`, J1–J3 on a phone, an owner for links and helplines.

## 5. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** Live at **`https://betr.trybeup.com`** — every push to `main` touching `web/**` publishes it; cert expires 2026-12-02 |

## 6. Gotchas, live

- **`walk.js tap` takes ONE selector and silently ignores anything after it.** It is
  `querySelector`, so `tap '[data-b]' 1` taps `data-b="0"` and says nothing. Hand it the full
  selector the dump printed — `tap '[data-b="1"]'` (B40). The test harness DOES take an index;
  they do not work the same way.
- **To measure at 125%, set the font size BEFORE navigating to the screen.** `eval
  "document.documentElement.style.fontSize='20px'"` then tap your way there. **The fold is
  785 / 780 / 774 / 720px at 100 / 125 / 150 / 200%.**
- **A WIDENING IS MORE DANGEROUS THAN A CHANGE** (B40, `learnings.md`). `testFor()` broke because
  the set of records it applies to got bigger — no diff shows that and no old test catches it.
  When a field's meaning changes, grep it and read **every** caller.
- **If a screen's state depends on focus, put it in the markup too**: a programmatic `.focus()`
  fires no event in headless Chrome (B39, `learnings.md`).
- **`shot` on the front screen catches it mid-reveal** — the card animates over 3.4s; run
  `eval "document.getAnimations().forEach(function(a){a.finish();})"` first.
- **`walk.js` dies silently and a dead walker returns a stale page, not an error. Its browser is
  DARK**, so BETR opens dark (B35); **`theme.js` loads in the `<head>` before the stylesheet and
  has to.** **Three roads reach the build screen** (B34 §1): check all three. **The fake DOM in
  `harness.js` is flat, fires no events, ignores `hidden`**, and **A REGION DELETE NEEDS BOTH
  ENDS CHECKED** (`learnings.md`).
- **Chips are exempt from the capital-letter rule**, by class. **`rate.keyOf()` keys a ladder by
  `id`**; rule 5 means a worry's **three predictions share one ladder**. **After editing
  `web/content/*`, `stop` and `start`**: `open` serves a cache. **`HABIT`/`BODY` refuse nothing
  any more**, still hold BETR's own content, and neither catches a checking ritual — also rule 4.
- **Every word a person reads is in `web/content/`** — a sentence back in `app.js` fails
  `i18n.test.js`. **Use `’` and `“ ”`, never `'` and `"`**: the build fails on a typewriter one.
  **`content/zones.js` and `docs/COPY.md` are generated**; never hand-edit, and no helpline
  number is ever written from memory.
