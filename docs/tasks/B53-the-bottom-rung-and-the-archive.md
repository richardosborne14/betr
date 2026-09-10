# B53: The bottom rung, and putting a test away

**Status:** **BUILT AND WALKED, 2026-09-10.** 292 tests pass. Eight mutations, all caught.
**Confidence:** 9/10. It is one drawn list split into two, one array of strings in storage,
and it deletes nothing — the smallest change in the app that answers what was asked. The
missing point is the one in §7: nobody who is not us has seen it.
**Date opened:** 2026-09-10 · **Asked for by:** the founder, in one message
**Touches:** rule 5 (no target), rule 6 (no verdicts), rule 10 (one big button)

---

## 0. What was asked

Word for word: *"Is there anything that happens in the app when a user does their test enough
to get the belief level down to 0 or whatever the lowest is? Some confetti or something? And do
they archive the worry afterwards or how does that work? Maybe letting people archive worries
in general is a good idea, if they've created one they don't want to try anymore, so they're
not plagued by it."*

Two questions, and they turned out to be one.

## 1. What the app did before today

**At the bottom of the ladder, nothing.** The floor is **1, not 0** — `web/lib/rate.js` says
why, and it is deliberate: *"a belief you have stopped buying is not a zero."* **"Not sure at
all" goes straight there in one tap**, so somebody can be at the floor on their first test. At
rung 1 the result screen was identical to the result screen at rung 10: expectation struck
through, what happened, the ladder, the count, *Do it again tomorrow* and *Different test*. No
line, no acknowledgement, no ending.

**Archiving did not exist, of anything.** The only removal in BETR was **Delete everything on
this phone**, all of it, no copy anywhere. A test on the go sat on *Your tests* for ever;
*Didn't get to it* keeps it for tomorrow by design, and there was no "actually, I'm not doing
this one". The founder's word for the consequence — *plagued* — was accurate, and the only
answer the app had was to wipe the lot.

## 2. The decisions, all three the founder's, taken 2026-09-10

| Asked | Chosen | Also offered |
| --- | --- | --- |
| Anything at the bottom rung? | **Nothing at all** (recommended) | one quiet sentence; a celebration |
| Who can be archived, and when? | **Any test, any time** (recommended) | only ones at the floor; only ones on the go |
| The word | **Archive / Unarchive** | *Put this away* / *Bring it back*; *Done with this one* |

The third went against the recommendation, knowingly: *Archive* is a computer word in an app
that has kept every word plain. It is the founder's to call and it is theirs, and the concern
was put once and not re-argued. It is one string, `mine.archive`, if they change their mind.

## 3. Why there is no confetti, and why that is not purism

**A reward at the floor makes the ladder a target.** The belief ladder is the one number in
the whole product and its only value is that it is the person's honest answer. The moment
there is something to win at rung 1, *not sure at all* stops being a report and becomes the
tap that gets the prize — and it is the one word on that screen that jumps straight to the
bottom in a single tap. That is rule 5's "never carries a target", broken by the animation
rather than by a number on screen.

**And it would be a verdict.** Confetti says *you were wrong to worry*, which is exactly the
sentence rule 6 exists to prevent. A bad outcome is data; so is a belief that has not moved.

**But the question was pointing at something real.** The app said *Do it again tomorrow* for
ever, and there was no way to be finished with anything. The honest answer to "what happens at
the bottom?" is **"you can put it down"** — which is the second question, which is why they
are one question.

## 4. Why archiving is not unlocked at the bottom

It was tempting, and it is wrong for the same reason. **A button that appears only once you
have rated yourself low is the same reward wearing a coat** — quieter, and still something to
tap *not sure at all* for. It is on every card from the first one, whatever the rung.

It also answers what was actually asked. The founder's own case was *"one they don't want to
try anymore"* — a test set up and abandoned, usually at rung 10, which an unlock at the floor
would never have reached.

## 5. What was built

- **`web/lib/store.js`** — one new field, `archived`: a list of **ladder keys**, the same
  strings `rate.keyOf()` makes (`stock:no`, `own:<id>`). **Keys, not sentences**, for rule 5's
  reason: fixing a typo has not archived a different thing. **No version bump** — a state
  written before today has no `archived` and normalise hands back an empty list, exactly as
  `open` behaved in B8. It is in all three places (`blank`, `normalise`, `isEmpty`); the
  `isEmpty` half is the bug B17 shipped with `country` and B31 shipped with `seen`, and there
  is a test for it.
- **`web/app.js`** — `isAway` / `putAway` / `bringBack` / `waitingLive`, and `mine()` splits
  the same cards into two lists. An archived card is **drawn whole**: same title, same quoted
  sentence, same ladder, same rows. What changes is what it asks — no *Test this again*, no
  *Done it*, no *Didn't get to it*. A waiting test still shows in words, so nobody wonders
  where the thing they promised themselves went; it simply stops asking.
- **The front screen.** The on-the-go note reads `waitingLive()`, so an archived test stops
  calling from there too. That was the founder's actual complaint and the note is where the
  plaguing happens.
- **It brings itself back.** Locking in or finishing a test on an archived belief unarchives
  it. Somebody doing the work on it is plainly not done with it, and making them unarchive
  first would be a chore the app invented.
- **Both counts describe the list**, so an archived card is in neither. The one case the old
  line got wrong — results kept, none on the list — has its own sentence, `mine.allAway`,
  rather than "Nothing recorded yet", which would be a lie.
- **`web/app.css`** — `.stowed`, `.sect`, and `.card.away { border-style:dashed }`. **Nothing
  is faded.** The obvious way to say "put away" is opacity, and every card has a person's own
  sentence and a ten-rung ladder in it, on the screen with the worst contrast in the app
  already (B51 §13.4). Dashed reads at any size and costs nobody anything.
- **No question is asked in either direction.** Neither tap loses anything and the other tap
  is on the screen you are already looking at. Contrast *Delete it all*, the only thing in
  BETR that is confirmed, because it is the only thing that cannot be undone.

**Five new strings**, all English-only and all new for Misha: `mine.archive`, `mine.unarchive`,
`mine.awayTitle`, `mine.awayNote`, `mine.allAway`, plus two spoken lines `mine.archived` and
`mine.unarchived`.

## 6. What it deliberately does not do

- **It is not in the export**, and that is a decision. The export is what a person wrote and
  did; every archived test's full history is already in the file, complete and unchanged.
  Archiving is which cards are tucked away in a list, and a line of `stock:` ids in a file
  that is "boring on purpose, understood at a glance" makes it worse. **Nothing is lost by
  leaving it out** — there is no import to lose it from.
- **It does not hide the worry from the doors.** The doors are BETR's content, the same for
  everybody, and filtering them by what one person archived would be the app deciding what
  they may pick. Picking it again brings the card back, which is the least surprising thing.
- **It does not count.** There is no number on the *Archived* heading. A count there would be
  the beginning of a tally of things you gave up on.

## 7. What is knowingly left

1. **Nobody outside this room has seen it.** It is on `betr.trybeup.com` and it has been
   walked at 390×844 and at 200% text, and that is all.
2. **Two ghost buttons side by side** — *Test this again* and *Archive* — carry the same
   visual weight on a live card. *Test this again* is first, which is the order that matters,
   but if archiving turns out to be tapped by accident the fix is to demote *Archive* to the
   small plain style *Why this one sticks* uses. One class.
3. **Misha has not read the five strings**, in particular `mine.awayNote`, which is the
   longest new sentence in the app.
4. **An archived card with a waiting test on it still holds that test in `open`.** That is
   correct — nothing is deleted — but it means a person could archive several and have a
   waiting list they never see. Nothing counts them and nothing calls them overdue, so it
   costs nothing today; worth a look if anybody ever archives more than a handful.

## 8. Tests

Six walks in `loop.test.js`, two in `store.test.js`, 292 pass. Every one was mutated back and
watched to fail first:

| Mutation | Caught by |
| --- | --- |
| nothing is ever archived | 3 |
| the front screen ignores the archive | 1 |
| doing it again leaves it archived | 1 |
| the counts still count the archive | 1 |
| an archived card still asks | 1 |
| **confetti at the bottom rung** | 2 |
| `isEmpty` forgets the archive | 1 |
| `normalise` trusts the field | 1 |

The confetti one is the point of the first test: a rung-1 result screen and a rung-7 result
screen are compared button for button and word for word, so the next person who thinks a little
celebration would be kind has to argue with §3 first.
