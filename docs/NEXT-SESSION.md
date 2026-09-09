# Start here

**Last refreshed:** 2026-09-09, after B43 and B44 closed.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**B43 and B44 are both closed. 250 tests, no dependencies, nothing requested after load;**
`main` clean and live at `https://betr.trybeup.com`.

**B43 was the walk, not the build** — every sentence it scoped was already shipped, and what had
never been done was walking B40's road-keyed ladder, B41's gaps and B42's sizes **together**.
They work: different word in the hole, different prediction, different size, **one card and one
ladder** (*Started 10 · 1st 7 · Now 6*). **B44 added the two teaching screens**, reached only by
a link — a test walks a refusal, an empty plan, *More sure than before* and a repeat and asserts
neither appears, which is rule 2 held by a test rather than a comment.

## 2. The next action

**Read [`B45`](tasks/B45-one-road-in.md) first.** One build screen is drawn three ways and one do
screen two ways, decided by a road nobody can see; `worries.js` and `starts.js` are two content
files describing the same twenty-one things. **The verb constructor is on 2 of 21 worries and
unreachable from the front door.** Worst fact: tapping BETR's own suggestion gets the OLD do
screen; typing something BETR has never seen gets the NEW one.

**The founder supplied the current mockup and it is now the spec** —
`https://claude.ai/code/artifact/77d1cadb-a55b-4926-8281-ea0a0556d73f`, *The template with holes*,
seven screens and four notes. **Where B45 and that canvas disagree, the canvas wins.** B45 §3
lists the nine ways the app has drifted from it; two of the seven screens are already shipped and
right (B40's one ladder, and *there is no mode to leave*).

**Start with B45 §6 plus 5d: 21 verbs get a hole, and `content.fill()` marks the word it carried.**
No new sentence, nothing for the reviewer, well under a day, and together they are the demo — a
person types a word once and can see where it went. **§7a is the founder's and it is a real
trade:** the mockup keeps all three sizes on screen after a pick and accepts the fold; B39 and
B42 folded them to keep *Lock it in* above it (574 vs 870 at 125%).

## 3. Changed on purpose, and measured and left

**B44's link cost 35px and one fold state got worse.** It sits **under the do box and its sizes**,
because that is where somebody who has just pictured the biggest possible version is looking. On
a start item's road at 125%, with nothing yet in the plan box, *Lock it in* went from 14px above
the fold to 22px below it — accepted for B42's reason only (an empty plan refuses, so the button
is inert exactly there) and it comes back up the moment anything is in the box. **After a pick
every road clears at 125% with room.** B44's task file has the table; B45 §7a reopens the whole
question, because the mockup does not fold at all.

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
