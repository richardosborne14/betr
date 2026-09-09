# Start here

**Last refreshed:** 2026-09-09, after B43 and B44 closed.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**B46 is built and closed** — 252 tests, no dependencies, nothing requested after load; `main`
clean and live at `https://betr.trybeup.com`. It is the first half of
[`B45`](tasks/B45-one-road-in.md), which is the plan for un-tangling three roads into one, and
it answers the founder's actual complaint.

**The verb constructor is the default.** Every one of the twenty-one worries prints its verb —
*If I* `ask` **[somebody]** `for one small, specific favour` **, then** [ ___ ]. It was on two.
Nineteen new skeletons and fifty-seven predictions, and the method is why that is not
seventy-six new sentences: **the consequence half of every prediction is kept word for word**
and only the pronoun becomes the hole. What changed is the action half — three slightly
different actions become one, which is what a skeleton is, and **that collapse is the only part
a reviewer judges fresh**. Fifteen take `{person}`, five take `{thing}`/`{long}`, one takes
nothing (*leaving at the time you decided* has no noun anybody could supply) — and **the screen
is identical either way**, which is the point.

**And the substitution is visible at last.** `content.fillParts()` returns the same text as
pieces, each marked for whether the PERSON put it there; `saidHtml()` wraps those and nothing
else. A hole's own default word is **never** marked — highlighting *somebody* would tell her she
had said something she had not. **The dial is on every road too:** nineteen worries arrived with
their plan pre-filled, which counted as words of her own, which hid the row of three sizes. One
line fixed it and the prefill stays, so she has a plan *and* the dial.

## 2. The next action

**B45 §5b — nineteen worries need three sizes of their own.** The dial is present everywhere
now, but on nineteen roads it is `general`'s generic three; a worry's own would be about that
worry. **38 sentences, and the reviewer's.** After that, B45 §3's remaining screen-shape drifts
(the plan as a sentence with holes; the button below the suggestions; the repeat screen).

**Send the envelope first.** `docs/suggestions-review.csv` is **429 rows** — B46 alone put in
133, and nobody has read one of them.

## 3. Changed on purpose, and measured and left

**B44's link cost 35px, and on a start item's road at 125% with an empty plan box *Lock it in*
went from 14px above the fold to 22px below it** — accepted for B42's reason only (an empty plan
refuses, so the button is inert exactly there). **B45 §7a reopens the whole question anyway,
because the mockup does not fold at all** and B46 has just put a size row on nineteen more roads.

Still live: the escape link behind the menu at 125%, the front screen's 20px sliver, the clipped
second placeholder, `#ownit` below the fold on the 125% skeleton screen, and **tapping *New test*
from the do screen wipes the sentence and the plan with no warning** — B36 item 6, on the founder.

## 4. Waiting on people, not on code

1. **The founder.** **Walk J4 and J5 on a phone** — J4 is the acceptance test for the whole
   programme and J5's step 6 is *try to make a guide screen appear on its own*. Then: **B36
   items 6 and 9** (item 6 above), whether **five answers** is one too many on *Why it’s written
   like this* (B36 item 3's open question), rule 10's third amendment written down rather than
   arrived at (B37 §9a), start #19 the checking ritual (B34 §6), which example leads the front
   screen, **the purpose statement** frozen in five places (B29 has a candidate), the **`HARM`
   false refusal**, and **change the ad, not the app** (B25).
2. **Misha, in one ask.** `docs/COPY.md` prints every string in its own block and explains a
   `{person}`; it now has **Screen 9b, the two guide screens** — the risk there is the worked
   shrink, which is BETR proposing three tests in a voice everybody reads. Plus B41's two
   skeletons, B42's three sets of three, B38's six strings, B39's *Change* / *Add one*, B40's
   *Write the whole thing myself*, B42's *How big a go? Any of them counts*, the four nouns
   (B23 option b), the door order, the 21 chips, B36's tone, and the **red strike** (B36 §12b).
3. **The paid CBT reviewer, still the critical path. Send `docs/suggestions-review.csv`** —
   **429 rows now**, up from 245: B43 put in 32, B44 18, and **B46 put in 133** — every new
   skeleton and every prediction under it. `G-D2` is marked **CUT** — it stopped shipping at B42 and a reviewer
   scoring a line that is not live is the sheet wasting the critical path. **Four questions, each
   on the rows it belongs to:** is *"the smallest version that could still turn out wrong"* safe
   for somebody with no clinician (`GD-R1`); may *A small go* change **who it is with**
   (`W-NO-D1` / `W-ST-D1`, B42's open one); is the largest step safe as written (`W-NO-D3` /
   `W-ST-D3`, and `W-ST-D3` is the one we are least sure of — it hands the length of the thing
   to the other person); and **are the three actually in order** (`G-Z1`) — no test can check that.
4. **A screen-reader pass on a real phone** — B33 read the tree, **nobody has used it**, and B41,
   B42 and B44 have all added things since. **Q1 (name, trademark, domain)** blocks release.
   **Two API keys — Groq and Anthropic — still need rotating**; nobody owns the missing
   medication word list in `guards.js`. **Release conditions:** Misha on `places.signedOff`,
   J1–J5 on a phone, an owner for links and helplines.

## 5. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root**; `node tools/copy-sheet.js` rewrites `docs/COPY.md` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** Live at **`https://betr.trybeup.com`** — every push to `main` touching `web/**` publishes it; cert expires 2026-12-02 |

## 6. Gotchas, live

- **`shows`/`hides` are SUBSTRING checks, and B44 found the worst version of it**: a screen's
  title is word for word its own link's text, so a `hides()` on the title can never be true
  while the link is drawn — and that was the test holding rule 2 down. **Name a sentence only
  the screen itself carries.** (`learnings.md`, B42 and B44.)
- **`walk.js tap` takes ONE selector and ignores anything after it** — `tap '[data-b]' 1` taps
  `data-b="0"` silently. Hand it `tap '[data-b="1"]'` (B40). The harness takes an index.
- **To measure at 125%, set the font size BEFORE navigating** (`eval
  "document.documentElement.style.fontSize='20px'"`), then tap your way there. **The fold is
  785 / 780 / 774 / 720px at 100 / 125 / 150 / 200%.** **Measure the state a person is actually
  in.** To price one block, hide it with `eval` and re-read the button's rect either side.
- **A WIDENING IS MORE DANGEROUS THAN A CHANGE** (B40); **WHEN CONTENT GAINS A VARIABLE, GREP
  EVERY COMPARISON AGAINST IT** (B41). Nothing crashes, a sentence rots.
- **Never depend on an event**: a programmatic `.focus()` fires none in headless Chrome (B39),
  the fake DOM none at all (B41). Put the state in the markup and re-read it on the tap. **Read
  the boxes before ANY navigation off the build or do screen** (B34 D2).
- **`shot` on the front screen catches it mid-reveal** — run `eval
  "document.getAnimations().forEach(function(a){a.finish();})"` first. **`walk.js` dies silently
  and a dead walker returns a stale page, not an error. Its browser is DARK**, so BETR opens dark
  (B35); **`theme.js` loads in the `<head>` before the stylesheet.** **Three roads reach the build
  screen** (B34 §1). **The fake DOM is flat and ignores `hidden`**; **A REGION DELETE NEEDS BOTH
  ENDS CHECKED**.
- **Chips are exempt from the capital-letter rule**, by class — **a size name is not**, being a
  label on a button. **`rate.keyOf()` keys a ladder by `id`**; a worry's three predictions and
  its three sizes share one ladder. **After editing `web/content/*`, `stop` and `start`**:
  `open` serves a cache. **`HABIT`/`BODY` refuse nothing a PERSON writes any more** — they still
  hold every word BETR writes, **which since B44 includes both guide screens** (`loop.test.js`).
- **Every word a person reads is in `web/content/`** (a sentence in `app.js` fails
  `i18n.test.js`). **Use `’` and `“ ”`, never `'` and `"`.** **`content/zones.js` and
  `docs/COPY.md` are generated**; never hand-edit, and no helpline number is written from memory.
