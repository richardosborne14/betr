# B44: Make it smaller, and why it's written like this — the two guide screens

**Status:** **DONE, 2026-09-09.** See the log at the bottom. Last on purpose, and the reason
is worth reading.
**Confidence:** 8/10.
**Date opened:** 2026-09-09 · **Was:** B36 items 2 and 3
**Depends on:** B42, so the worked shrink can use the real three sizes.

## Why this is last rather than second

In B36 these were the rescue: the daughter reached *What will you do today?*, pictured the
biggest possible test, and left. *Too big? Make it smaller* was the screen that would have kept
her in.

**B42 does most of that job inline.** She is now offered three sizes on the screen itself, with
her own words already in them, defaulted to the small end. The shrink is no longer behind a link;
it is the screen. **So these two become teaching rather than rescue** — which is a better job for
them and a worse reason to rush them.

They are still needed. The three sizes turn one dial; this screen names the others.

## The two screens

**1 · *Too big? Make it smaller*** — a plain link under the `do` box, **always there, never
triggered by anything**. That is the regulatory line, not a preference: a screen that appears
*because of* what somebody typed is the app choosing (research §6).

It carries: the normalising line (that thought is the sentence at the top, said out loud, and it
is what is being tested); the rule — *the smallest version that could still turn out wrong*; and
**the dials the three sizes do not turn** — who it is with, how long it goes on, when and where,
how many people are there. Then the worked shrink, **using B42's own three sizes** so the screen
teaches the control the person is already holding.

**2 · *Why it's written like this*** — a link on the build screen. Five short answers: why "If I",
why it needs a "then", why you write it before, why you leave something out, why you start small.
It is also the general `why` for somebody who wrote their own, which `why.js` cannot be: that file
is keyed to a stock worry id and appears only after a result, so it never reaches them.

Both are written fresh. CCI's stepladder module is the **method**; rule 8 means not one of its
sentences.

## Done when

- both screens reachable by a text link, from the build screen and the do screen
- neither ever appears on its own, in response to anything — a test holds it
- neither becomes a fourth door (rule 10): a link inside a screen, not a menu item
- the fold still clears at 125%

---

## Built, 2026-09-09

**Status: DONE.** 250 tests, no dependencies, nothing requested after load. **Confidence: 8/10
on the build; 4/10 on the wording**, which is Misha's and the reviewer's — eighteen more rows
went into `docs/suggestions-review.csv` with them.

### What is on screen

**Two screens, three links, and no new state.** `smaller` and `written` are stages like any
other; between them they read nothing about anybody — no `S.done`, no ladder, no rung, no
draft, no worry id. `guideBack` is the only thing either of them holds, and it is which screen
Back returns to.

| Link | Where it is | Goes to |
| --- | --- | --- |
| *Why it’s written like this* | the build screen, in the same small paragraph as *Write the whole thing myself* | `written` |
| *Why it’s written like this* | Help, under *What CBT is, and which bit of it this is* | `written` |
| *Too big? Make it smaller* | the do screen, **under the box and its three sizes** | `smaller` |

*Make it smaller* carries the normalising line, **the rule** — *the smallest version that could
still turn out wrong* — the **five dials** (who it is with, how big a thing, how long, when and
where, how many people), the line that keeps a small one from reading as a lesser one, and the
worked shrink. *Why it’s written like this* carries five short answers and `why.foot` unchanged.

### The three decisions

**1 · The rule about starting small is ONE string.** B36 item 3 asked for it "said once, in one
place", and both screens want it. So `guide.smallest` is written once and the fifth answer names
it rather than repeating it — `{ q: 'Why you start small', same: 'smallest' }`. A test fails the
build if that fifth answer ever grows a copy of the sentence, because two copies are two things
that can drift apart by a word.

**2 · The worked shrink uses B42's own three names, read biggest first.** B44 asked for the
worked shrink to use the real sizes and it does: *The whole thing · A bigger go · A small go*.
The do screen draws them small → big, because that is the order somebody chooses in; this reads
the same dial the other way, because turning it down is what the screen teaches. A test asserts
the shrink is `starts.general.sizes` reversed, so the two can never end up teaching different
vocabularies. It is fixed content and it says it is an example: everybody reads these three
lines, whatever they typed.

**3 · The link is where the person freezes, and that cost 35px.** Not at the bottom under *Lock
it in* — B36's whole finding was that somebody who has just pictured the biggest possible
version leaves from the do screen, and by the bottom of it they have stopped reading. So it sits
under the box and its sizes, in a `.tiny.under` paragraph whose margin is trimmed from 22px to
8px for exactly this reason.

### The fold, measured

| State, 125% (fold 780) | *Lock it in* before | after | verdict |
| --- | --- | --- | --- |
| worry road, **after** a size is picked | 538 | **574** | clears, 206px to spare |
| worry road, before any pick | 835 | 870 | was below the fold already (B42's table) |
| free-text road, **after** a suggestion is taken | 518 | **518** | costs nothing — the row hides and gives the space back |
| free-text road, before any pick | **766** | **802** | **this one changed sides** |

**One state got worse and it is written down rather than explained away.** On a start item's
road at 125%, with nothing yet in the plan box, *Lock it in* used to sit 14px above the fold and
now sits 22px below it. There is no way to buy that back: the link's own line is 25px before any
margin at all. It is accepted for B42's reason and not a new one — **an empty plan refuses**, so
the button in that state does nothing a person can miss out on, and it comes back up the moment
anything is in the box. If the founder disagrees, the fix is the link moving under *Lock it in*,
which is free and worse.

At 100% every state clears. Both guide screens are long and scroll, which is what they are for.

### Six tests, and one of them is the regulatory line

`neither guide screen ever arrives on its own, whatever a person does` walks a refusal, an empty
plan, *More sure than before*, a repeat, the worry road and Your tests, and asserts after every
one of them that neither screen is on the page. That is rule 2 and research §6 held down by a
test rather than by a comment. The other five: both screens open and come back with the words
somebody was half way through; neither becomes a fourth door; nothing on either names the habit,
the body or anyone's safety (**rule 4 did not loosen for BETR**); the small sentence is one
string; the shrink is B42's three names reversed. `a11y.test.js` now sweeps both screens, so
focus landing on the heading is held too.

**It cost a bug in the test, worth writing down:** the first version asserted on the screen's
TITLE, which is word for word the LINK's text — so it could never be false while the link was
drawn. `shows`/`hides` are substring checks (B42's learning, one turn later). Both are named by
a sentence only the screen itself carries now.

### Also done here

- `tools/copy-sheet.js` printed `[object Object]` for any list whose entries are named fields —
  which is every list B44 added. Fixed, and it resolves `same` to the sentence it names, so
  Misha reads words rather than a key.
- `docs/journeys.md` gained **J5**, whose step 6 is *try to make either screen appear on its own*.
- Eighteen rows in `docs/suggestions-review.csv` (296 now): the rule, the normalising line, the
  five dials, the three shrink steps and the five answers.

### Gaps

- **The founder's open question from B36 is still open:** whether five answers is one too many
  on a screen a person can meet before writing anything. It is a link and not a wall, which is
  the argument for leaving it at five.
- **Misha has not read a word of either screen**, and the worked shrink is BETR proposing three
  tests in a voice everybody reads.
- **Nobody has walked J5 on a phone**, and the 802px state above is the thing to look at first.
