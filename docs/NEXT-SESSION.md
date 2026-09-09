# Start here

**Last refreshed:** 2026-09-09, after B43 and B44 closed.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**B43 and B44 are both closed. 250 tests, no dependencies, nothing requested after load;**
`main` clean and live at `https://betr.trybeup.com`.

**B43 turned out to be the walk, not the build.** B41 shipped the two skeletons and B42 their
sizes, so every sentence B43 scoped was already in `worries.js`; what had never been done was
walking B40's road-keyed ladder, B41's gaps and B42's sizes **together**. They work. A person who
types *my sister* on Monday and *my boss* on Wednesday, picks a different prediction each time
and a different size each time, gets **one card and one ladder** — *Started 10 · 1st 7 · Now 6 ·
Down 4 since you started*, each rung carrying its size. Rule 5 holding across everything B40–B42
added at once, and the acceptance test for the programme.

**B44 added the two teaching screens.** *Too big? Make it smaller* — the normalising line, the
rule, five dials, a worked shrink using B42's own three names read biggest-first. *Why it’s
written like this* — five short answers, and the fix for `why.js` never reaching somebody who
wrote their own. **Three links and no other way in: a test walks a refusal, an empty plan, *More
sure than before* and a repeat, and asserts neither screen appears** — rule 2 and research §6
held by a test rather than by a comment.

## 2. The next action

**Nothing is blocked on code** — everything in §4 waits on a person, and sending the envelope
comes first. If a session must build: **batch the other nineteen worries' skeletons and sizes**
(the mechanism is proved; ~13 sentences each, and the reviewer has not agreed to the two we
have), or **rewrite J1–J3**, behind the app since B19 and now labelled as such.

## 3. Changed on purpose, and measured and left

**One fold state got worse and it is written down rather than explained away.** B44's link is
one line of small print, 35px with its trimmed margin, and it sits **under the do box and its
sizes** because that is where somebody who has just pictured the biggest possible version is
looking. On a start item's road at 125%, with nothing yet in the plan box, *Lock it in* went
from 14px above the fold to 22px below it. Accepted for B42's reason and no other — an empty
plan refuses, so the button is inert exactly there — and it comes back up the moment anything
is in the box. **After a pick, every road clears at 125% with room** (574 against 780 on the
worry road; the free-text road costs nothing at all, because the row hides and gives the space
back). B44's task file has the whole table.

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
   **295 rows now**, up from 245: B43 put in the two templates' 26 sentences plus the three size
   names and the `general` size lines that had never reached the sheet, and B44 put in 18 more
   for the guide screens. `G-D2` is marked **CUT** — it stopped shipping at B42 and a reviewer
   scoring a line that is not live is the sheet wasting the critical path. **Four questions, each
   on the rows it belongs to:** is *"the smallest version that could still turn out wrong"* safe
   for somebody with no clinician (`GD-R1`); may *A small go* change **who it is with**
   (`W-NO-D1` / `W-ST-D1`, B42's open one); is the largest step safe as written (`W-NO-D3` /
   `W-ST-D3`, and `W-ST-D3` is the one we are least sure of — it hands the length of the thing
   to the other person); and **are the three actually in order** (`G-Z1`) — no test can check that.
4. **A screen-reader pass on a real phone** — B33 read the tree, **nobody has used it**, and
   B41, B42 and B44 have all added things since. **Q1 (name, trademark, domain)** blocks release.
5. **Two API keys — Groq and Anthropic — still need rotating**; nobody owns the missing
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
- **To measure at 125%, set the font size BEFORE navigating.** `eval
  "document.documentElement.style.fontSize='20px'"`, then tap your way there. **The fold is
  785 / 780 / 774 / 720px at 100 / 125 / 150 / 200%.** And **measure the state a person is
  actually in**: a button below the fold matters as much as it is possible to press it. To price
  one block, hide it with `eval` and re-read the button's rect either side — that is how B44's
  table was built.
- **A WIDENING IS MORE DANGEROUS THAN A CHANGE** (B40) and **WHEN CONTENT GAINS A VARIABLE, GREP
  EVERY COMPARISON AGAINST IT** (B41), both in `learnings.md`: nothing crashes, a sentence rots.
- **Never depend on an event**: a programmatic `.focus()` fires none in headless Chrome (B39) and
  the fake DOM none at all (B41). Put the state in the markup and re-read it on the tap. And
  **read the boxes before ANY navigation off the build or do screen** — `readBlanks()` /
  `readBoxes()` (B34 D2; B44's two links are the newest way off both).
- **`shot` on the front screen catches it mid-reveal** — it animates over 3.4s; run `eval
  "document.getAnimations().forEach(function(a){a.finish();})"` first. **`walk.js` dies silently
  and a dead walker returns a stale page, not an error. Its browser is DARK**, so BETR opens dark
  (B35); **`theme.js` loads in the `<head>` before the stylesheet and has to.** **Three roads
  reach the build screen** (B34 §1): check all three. **The fake DOM is flat and ignores
  `hidden`**, and **A REGION DELETE NEEDS BOTH ENDS CHECKED** (`learnings.md`).
- **Chips are exempt from the capital-letter rule**, by class — **a size name is not**, being a
  label on a button. **`rate.keyOf()` keys a ladder by `id`**; a worry's three predictions and
  its three sizes share one ladder. **After editing `web/content/*`, `stop` and `start`**:
  `open` serves a cache. **`HABIT`/`BODY` refuse nothing a PERSON writes any more** — they still
  hold every word BETR writes, **which since B44 includes both guide screens** (`loop.test.js`).
- **Every word a person reads is in `web/content/`** (a sentence in `app.js` fails
  `i18n.test.js`). **Use `’` and `“ ”`, never `'` and `"`.** **`content/zones.js` and
  `docs/COPY.md` are generated**; never hand-edit, and no helpline number is written from memory.
