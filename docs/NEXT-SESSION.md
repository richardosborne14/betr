# Start here

**Last refreshed:** 2026-09-09, after B40 and B41 closed.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**B40 and B41 are built and closed.** 234 tests, no dependencies, nothing requested after load;
`main` clean and live at `https://betr.trybeup.com`.

**B41 is the one you can see. Two worries — `no` and `strug` — have a GAP in the sentence.** The
build screen prints *If I · say no to · [gap] · without giving a reason · , then · ___*, and typing
**my sister** into that gap puts her into **all three predictions** before she has finished reading
them. Nothing chose anything, nothing was ranked, no model ran: it is a string substitution, and
the closest thing to intelligence this product is allowed to have.

**A skeleton'd worry's three predictions all start from its if-half, word for word**, and
`content.js` refuses one that drifts — so `no`'s three went from three slightly different actions
to **one action with three consequences under it**. B20's rule is untouched: it was about the
CONSEQUENCES differing, and all three still do. **Neither skeleton has been read by Misha or the
reviewer.**

**B40 was the plumbing that had to go first:** *the road decides which worry a test belongs to,
not the words.* A filled-in skeleton differs from its skeleton every time, by design, so under the
old rule (B32: the words decide) every templated run would have started at the top of the ladder
and the one number in the product would never have moved. Silently, every test passing. With it:

- **`sameAsStock()` changed jobs rather than going**: it decides the **wording** — which sentence
  is stored, and whether B20's hand-written expectation travels — and no longer the identity.
- **`store.js` v5, migrating nothing.** `prediction`, `slots`, `size` ride along, all three in the
  export, **and none keys a ladder** — `rate.keyOf()` did not change, because worry-plus-prediction
  would give one worry three ladders (rule 5 inverted). **The way out is `#ownit`, *Write the
  whole thing myself***: one plain link, borrowed road only, collapsing a skeleton into one blank.
- **Two rules no test can check, and the reviewer holds both.** *BETR owns the verb, the person
  owns the nouns* — a hole takes a person, a thing, a place, **never a verb**, or somebody composes
  a sentence BETR appears to be proposing (rule 4). And *a hole's fallback word must read naturally
  everywhere its hole appears* — it is what the sentence says while the blank is empty, which is
  why it is `somebody` and not `a person`.

## 2. The next action

**Build `B42`.** A skeleton'd worry gains **`sizes`** — three, small → big, each
`{ name, do, drop }`, free to use the same holes — replacing the two generic `dos` chips. The
founder's small/medium/big **is** B36's dial, as three readable sentences rather than three sizes.
**The one piece of code it has to move:** the plan is pre-filled at `borrow()`, before anybody has
typed into a hole — so `content.js` REFUSES a `{hole}` in `test`/`drop`, with a message saying B42
owns it. Lift that ban and move the prefill. **Measure against B39's numbers rather than
re-deriving them.** Then `B43`; `B44` is last on purpose.

## 3. Changed on purpose, and measured and left

**Editing a borrowed sentence no longer starts a new ladder.** Rewrite the prediction and the test
stays under that worry, on the rung it was on — one card and one ladder where before today it
became a second. Anybody who edited one before today keeps the own-test card they have.

**Left, all measured.** At 125% the escape link sits behind the menu (870px vs a 780px fold), as
did the small print it shares a paragraph with since B32; the big button clears the fold on every
road, skeleton or not, and **the chips get cut before the link does**. The front screen scrolls a
20px sliver, costed with nothing to take, and the second blank's placeholder clips, as an
`<input>` has since B30. And **tapping *New test* from the do screen wipes the sentence and the
plan with no warning** — B36 item 6, waiting on the founder.

## 4. Waiting on people, not on code

1. **The founder.** **B36 items 6 and 9** (item 6 above). Rule 10's third amendment, written down
   rather than arrived at (B37 §9a) — **B41 is more form again.** Start #19, the checking ritual
   (B34 §6). Which example leads the front screen, **real or an example**. **The purpose statement**,
   frozen in five places (`B29` has a candidate). **The `HARM` false refusal**, and **change the
   ad, not the app** (B25).
2. **Misha, in one ask:** **B41's TWO SHIPPED SKELETONS and every one in B43** — where the risk is
   BETR's voice in somebody's mouth; `docs/COPY.md` explains a `{person}` and prints each in its
   own block. Also B38's six strings, B39's *Change* / *Add one*, B40's *Write the whole thing
   myself*, the four nouns (B23 option b), the door order, the 21 chips, B36's tone, and the
   **red strike** through a person's own sentence (B36 §12b).
3. **The paid CBT reviewer, still the critical path. Send `docs/suggestions-review.csv`** — 245
   rows, reasoned in `docs/candidates-suggestions-batch-1.md`. Also `content/examples.js`, three
   rewritten `worries.js` sentences, three pairs from B1, B34 §4's `general.thens`, B36's strings,
   B38's four **and B41's two skeletons — eight rewritten predictions**. Two questions: is *"the
   smallest version that could still turn out wrong"* safe for somebody with no clinician, and may
   *A small go* change **who it is with**? **B43 adds ~26 more.**
4. **A screen-reader pass on a real phone** — B33 read the tree, **nobody has used it**, and B41
   just put small blanks inside a sentence. And **Q1 (name, trademark, domain)**: blocks release.
5. **Two API keys — Groq and Anthropic — still need rotating**; nobody owns the missing medication
   word list in `guards.js`. **Release conditions:** Misha on `places.signedOff`, J1–J3 on a
   phone, an owner for links and helplines.

## 5. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root**; `node tools/copy-sheet.js` rewrites `docs/COPY.md` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** Live at **`https://betr.trybeup.com`** — every push to `main` touching `web/**` publishes it; cert expires 2026-12-02 |

## 6. Gotchas, live

- **`walk.js tap` takes ONE selector and silently ignores anything after it** — it is
  `querySelector`, so `tap '[data-b]' 1` taps `data-b="0"` and says nothing. Hand it the selector
  the dump printed, `tap '[data-b="1"]'` (B40). The test harness DOES take an index.
- **To measure at 125%, set the font size BEFORE navigating to the screen.** `eval
  "document.documentElement.style.fontSize='20px'"` then tap your way there. **The fold is
  785 / 780 / 774 / 720px at 100 / 125 / 150 / 200%.**
- **A WIDENING IS MORE DANGEROUS THAN A CHANGE** (B40) and **WHEN CONTENT GAINS A VARIABLE, GREP
  EVERY COMPARISON AGAINST IT** (B41) — both in `learnings.md`, both the same failure: readers are
  fine, comparisons quietly return "no", nothing crashes, and a good sentence becomes a worse one.
- **Never depend on an event**: a programmatic `.focus()` fires none in headless Chrome (B39) and
  the fake DOM fires none at all (B41). Put the state in the markup and re-read it on the tap.
- **`shot` on the front screen catches it mid-reveal** — the card animates over 3.4s; run
  `eval "document.getAnimations().forEach(function(a){a.finish();})"` first.
- **`walk.js` dies silently and a dead walker returns a stale page, not an error. Its browser is
  DARK**, so BETR opens dark (B35); **`theme.js` loads in the `<head>` before the stylesheet and
  has to.** **Three roads reach the build screen** (B34 §1): check all three. **The fake DOM is
  flat and ignores `hidden`**, and **A REGION DELETE NEEDS BOTH ENDS CHECKED** (`learnings.md`).
- **Chips are exempt from the capital-letter rule**, by class. **`rate.keyOf()` keys a ladder by
  `id`**; rule 5 means a worry's **three predictions share one ladder**. **After editing
  `web/content/*`, `stop` and `start`**: `open` serves a cache. **`HABIT`/`BODY` refuse nothing
  any more**, still hold BETR's own content, and neither catches a checking ritual — also rule 4.
- **Every word a person reads is in `web/content/`** (a sentence back in `app.js` fails
  `i18n.test.js`). **Use `’` and `“ ”`, never `'` and `"`**: the build fails on a typewriter one.
  **`content/zones.js` and `docs/COPY.md` are generated**; never hand-edit, and no helpline number
  is ever written from memory.
