# B49: the two grey lines on the plan screen, and a hole that belongs to a size

**Status:** **DONE, 2026-09-10.** Three things shipped: both grey example lines on the plan
screen, a size's own hole filled in the plan (the canvas's difference 3 + 5, on one worry), and
the rung that carries the word she put in it (difference 8).
**Confidence:** 9/10 on the code — 268 tests pass, every new one was checked against the old
code, and all three roads were walked in Chrome at 100%, 125% and 200% text. **7/10 on the two
grey sentences**, because they are drafts chosen off a pair of options and Misha has not read
them. **9/10 on the content**, and that is high because no sentence was written: `{thing}` is
"about something small" made tappable, and with the blank empty the small go reads word for word
as it read yesterday.
**Date opened:** 2026-09-10 · **Found by opening the app**, the way
[`B48`](B48-the-greyed-example-belongs-to-this-worry.md) was.
**Founder's calls, both taken today**, laid out as options with the screens drawn.
**Depends on:** [`B45`](B45-one-road-in.md) §5b (three sizes on every worry), §5c (one content
file), B48 (the same fault, one box earlier).

---

## 1. What was wrong, and it is B48 again

The leave-out box on the plan screen greyed out **“Don’t give a reason.”**

That is the worry `no`'s own `drop`, word for word — `content.byId(WORRIES, 'no').sizes[0].drop`
— frozen into `build.dropPlaceholder` and printed in that box on **all twenty worries and on the
free-text road**. On the other nineteen it is a leave-out for an act nobody on the screen is
doing, greyed out **directly above three that are right**:

> **AND LEAVE OUT** — *Don’t give a reason.* (greyed)
> Or one of these: *Don’t explain yourself.* · *Don’t line up a way out first.* · *Don’t soften
> it, and don’t apologise for it afterwards.*

**B34 D1 is what comes of that**: people type the greyed words out rather than tapping the ones
underneath. It is the whole reason that rule exists, and it is exactly what B48 fixed one box
earlier, in the second blank, on the same day.

**And the box above it had the order wrong.** The plan box said *“Or put it in your own words.”*
— sitting **above** the three it is saying “or” about, so the sentence answered a question the
screen had not asked yet. That was already on the handoff's list ([`B45`](B45-one-road-in.md)
§12) as the last of its kind.

Same screen, so they were fixed together rather than half of it.

## 2. What they say now, and it is the founder's pick of two

Asked with both drawn side by side. The other option was B48's shape — derive each grey line
from the first of the three under it, carrying her word. The founder chose the pair that name
the box and point down:

| | before | after |
| --- | --- | --- |
| `build.doOwnPlaceholder` | Or put it in your own words. | **Write what you’ll do, or start from one of the three below.** |
| `build.dropPlaceholder` | Don’t give a reason. | **Write what you’ll leave out, or start from one of the three below.** |

**Why not B48's shape here, when B48 chose it a screen earlier.** That was a blank *inside a
sentence*, where an example shows the SHAPE of what goes in it. These two are textareas sitting
on three whole suggestions, and B42 already ruled on that shape for the plan box: over three
named steps a worked example reads as a fourth one, or worse as a plan already in the box.
Deriving them would have put BETR's own sentence back in the grey — the thing being removed.

**BOTH ARE DRAFTS AND MISHA HAS NOT READ THEM.** They are in `docs/COPY.md` with the rest.

**One seam, known and accepted.** B30's one-row-at-a-time rule hides the three sizes while
somebody is working in the leave-out box, so an untouched plan box can say “below” with nothing
below it. The row comes back the moment the box is tapped, which is the moment anybody would act
on the sentence. Written into the string's own comment so it is not rediscovered as a bug.

## 3. A size's own hole — the canvas's difference 3, on one worry

**The founder's call, and they overruled the recommendation knowingly.** Offered: hold it for
the reviewer (because none of the sixty size sentences has a second hole and writing twenty
would be sixty unread sentences), write all twenty now, or build the pattern on one worry the
way B41 did skeletons and B42 did sizes. **They chose one worry**, with the fork risk stated.

### The content, and no sentence was written

    holes: { person: 'somebody', thing: 'something small' }
    sizes[0].do: 'Say no to {person} once today, about {thing}.'
    test:        'Say no to {person} once today, about {thing}.'

`{thing}` is the words that were already there. With the blank empty the sentence renders
identically, which is why **nothing here is a new row for the reviewer** — the same argument
B45 §6 makes for the verbs. `W-NO-D1`'s Line column was updated and flagged so nobody scores a
brace that was not there yesterday.

**It does not go in the other two sizes.** A hole carries ONE stand-in word for the whole worry,
and “about something small” is not what the bigger go says; putting `{thing}` there would
rewrite a sentence rather than open one.

### The screen

Once a size with a hole of its own is picked and the row has folded onto it, the plan **is that
sentence with a blank in it** rather than a box:

> Say no to `my sister` once today, about **[ the Saturday thing ]** .

- **The word she filled a screen ago is printed and marked** (B46's `.carried`), not editable
  here. Editing it would leave the sentence at the top of this screen saying something else, and
  two sentences that disagree about what she is doing is worse than one she cannot re-edit.
  Back is one tap away and it is where that word lives.
- **The hole is empty, not pre-filled** — B41's two reasons unchanged. An untouched hole
  assembles as its own word, so *about something small* is a perfectly good plan.
- **The way back to writing the whole thing herself is `Change`**, which was already there: it
  opens the three and the box comes back **with her filled-in words in it**, editable. No new
  string, no new control, no mode to leave.
- **While the three are open there is no blank.** The question on the screen is still which
  size, and a gap in a sentence nobody has chosen yet is a fourth thing to answer before the
  first one has been.
- **`draft.test` stays one plain string.** The guard, the lock, the record and every screen
  after this one read one field and know nothing about holes. `readPlanHoles()` is the box's
  `value` said the other way round.

### The rule that came with it

`lib/content.js` now refuses **a hole outside the if-half anywhere but a size's `do`**. Put one
in a prediction, an `expect` or a size's leave-out and the build stops: there is no screen that
would draw a blank for it, so it would print its stand-in word for ever with nowhere to change
it. That is B45 §5b's finding turned into a check. `docs/changing-the-words.md` says it in the
founder's words, and its “two of the worries have a gap” — false since B45 §5c — went with it.

## 4. The rung carries the word (difference 8)

> **A small go · the Saturday thing**

Three rungs all reading *A small go* are three rows that look like the same test done three
times, and they were not: the word she put in the hole is the thing that told them apart, and it
only ever lived in the plan. Derived from the record's own `size` and `slots` — nothing looked
up about the person — so a result written before any size had a hole says nothing and looks
exactly as it did.

**Two spellings of one line, and that is not decoration.** The eye gets the canvas's middle dot;
the ear gets a comma, because a screen reader saying “middle dot” in the middle of somebody's
own words is worse than not reading it at all. No new string: `a11y.rungSize` takes the pair.

## 5. Measured, 390×844

| | | |
| --- | --- | --- |
| Both grey lines | **no height cost at all** — measured both strings in the same box at 125%: 103px and 103px on the plan box, 136 and 136 on the leave-out. The longer sentence wraps inside a min-height the old one already filled |
| `no`, small go, filled | *Lock it in* **568–651** against a 785 fold. Page 844, no horizontal scroll |
| `rest` (no hole), 100% | *Lock it in* 689–771, page 944 |
| **200% text, long word** | **This is the one that had to be fixed.** `growSaid()` sizes the blank to the words in it, and *“the thing on Saturday afternoon”* came out 562px inside a 350px card — `scrollWidth` 602 against a 390px phone, the page scrolling sideways. Capped at `calc(100% - .7em)` it is 283px, `scrollWidth` 390, the blank takes a line of its own and the words scroll inside it (B41's trade, made again). The `.7em` is the full stop: a blank that fills the line exactly leaves the sentence's own punctuation orphaned on the next one |

**`growSaid()` and not `growHole()`, and that is the second thing worth knowing.** `growHole`
sizes in `ch` — the width of a “0”, half again as wide as an average lowercase letter — so
“something small” got a blank 26% wider than the words in it. In the build screen's flex row
that reads as a gap; in a **sentence** it left the full stop a centimetre off the end of the
word and pushed the blank onto its own line. `growSaid` measures the words in the blank's own
font and writes the answer back in `em`, never px, so it still answers to the person's text
size. The build screen's holes were left alone.

## 6. What was walked, in Chrome, 390×844

1. `no` through the `yes` door, *my sister* in the hole, first prediction, **A small go** → the
   plan is the sentence with a gap, her word marked, the hole empty and greyed *something small*
2. Typed *the Saturday thing* → the sentence reads, the full stop stays put, *Lock it in* above
   the fold. Locked in, did it, re-rated → **the rung reads *A small go · the Saturday thing***
3. *Do it again tomorrow*, second run → **one ladder, two rungs, each carrying the size and the
   word**, on *Your tests*. The canvas's Ladder board
4. `rest` (no hole in any size) → the box it always was, with the three literally below the new
   grey line
5. The free-text road → the general three, both boxes with the new grey lines, no worry's own
   sentence anywhere near them
6. 125% and 200% text, and a hyphenated fifteen-letter name in the hole

## 7. Tests

268 (was 260). Eight new, and **every one was checked against the old code by putting it back**:

| | |
| --- | --- |
| `loop.test.js` | neither grey line is a sentence BETR wrote for one worry, and the two say it in the same shape · the leave-out box on `rest` does not grey out `no`'s leave-out · a size with a hole of its own is filled in the plan, and the plan is a sentence · a size with no hole is still the box it always was (and all three of `rest`'s) · *Change* gives back the box with her words in it · the one hard stop runs on a size's own hole · a rung carries the word |
| `content.test.js` | a hole outside the if-half may only be used in a size's plan sentence — and the shipped list still validates clean |
| Rewritten | thirteen assertions were doing `z.do.split('{person}').join('my sister')` by hand, which only ever filled one hole. They go through `content.fill` now, which is what the screen does |

## 8. What this did NOT do, and each is somebody else's

1. **Nineteen worries have no size with a hole of its own.** That is the fork the recommendation
   was against and the founder took it knowingly, on the B41/B42 precedent. **Writing the other
   nineteen is sixty sentences and it is the reviewer's and Misha's**, not a session's — unless
   they are, like this one, words already on the screen made tappable, in which case it is free.
   Worth an hour with the sixty in front of you: `enough` and `drink` already have `{thing}` in
   the if-half; most of the rest have no generic noun standing in for anything.
2. **The repeat screen has no blank.** *Test this again* carries last time's word through
   (`c.slots`), and *Change* → a size re-fills from it. There has never been a way to edit the
   plan on that screen and this did not add one. It is the canvas's difference 7 and it is open.
3. **The two grey sentences are drafts.** Misha.
4. **`happened.placeholder`** — *“He said ‘fair enough’ and got his own coffee.”* — is still one
   frozen worked example on every worry. It was looked at and left: that box has **no suggestions
   under it**, and the example is showing what an observation-without-a-verdict looks like rather
   than what to write. It is the last frozen example in the app and somebody should decide about
   it on purpose.
