# B34 — Auditing the possibilities and the suggestion combos

**Opened:** 2026-09-08, straight after B33 closed, at the founder's ask: *"an audit of the
possibilities and suggestions combos … everything super clear and simple, and we're not
missing anything."*

**Status:** AUDITED, then **D1 and D2 fixed** at the founder's go-ahead. Everything else in
here is still open and is somebody's decision, not a session's. 206 tests green (196 + 4 new,
and the count moved again under B35's own additions); every screen below was walked at 390×844
with `tools/walk.js` and measured, not guessed.

---

## 1. What there is to audit

Suggestion content now lives in two files that have never been read against each other.

| | lines a person can be shown |
| --- | --- |
| `content/starts.js` | 21 `if` + 63 `thens` + 42 `dos` + 42 `drops` + 7 `general` = **175** |
| `content/worries.js` | 63 borrow sentences + 21 `test`/`drop` pairs = **105** |

**Three roads reach the build screen, and each offers a different set.**

| Road | If blank | Then | What you'll do | Leave out |
| --- | --- | --- | --- | --- |
| **A** front screen *What's yours?* — types their own | 21 chips | **general 3** | general 2 | general 2 |
| **B** taps one of the 21 chips | chip fills it | that start's 3 | that start's 2 | that start's 2 |
| **C** *Not sure?* → door → worry | prefilled from the card | 3 whole sentences | **prefilled** from the worry | **prefilled** |

Road A is the front door and the main road. Road B is the only road that reaches the 84
hand-written `dos`/`drops`. Road C never reaches them at all.

---

## 2. Defects — mechanical, not opinion — **BOTH FIXED**

### D1. The same sentence gives two different answers depending on whether it was typed or tapped — FIXED
`ifPlaceholder` is *"say no without giving a reason"*, which is also chip 1 word for word — so
people will type it. Typed, the Then suggestions are the three **generic** ones. Tapped, they
are the three written for it. Then one screen later the *What will you do* chips **do** match,
because that screen repaints and re-runs the lookup. One journey answers the same lookup two
different ways.

Cause: `startFor()` runs at paint. Typing deliberately never repaints (it would move the
caret), and nothing re-runs the lookup when focus moves to the second blank. `starts.js`'s own
header calls the lookup the whole contract; it is wired on one of the two events.

Measured: typed the exact words → `they'll think less of me / they'll go quiet with me / it'll
be held against me later`. Tapped → `they'll think I'm being difficult / they'll stop asking me
/ they'll be off with me for days`.

### D2. *Back* on the *What will you do today?* screen throws away what was typed — FIXED
`buildDo()` calls `wireBack('build')` and never `readBoxes()`. Type a plan, tap Back to fix one
word of the sentence, tap *What will you do?* — the plan is gone. On a borrowed test the stock
line comes back in its place, which reads as BETR having overwritten you. `readBoxes()` already
exists and is called by both chip handlers and by *Lock it in*; Back is the one exit that skips
it. Walked and confirmed.

### D3. Once an if-chip is tapped, the list of 21 cannot be reopened — OPEN
The row is hidden while the box holds any text, and re-focusing the box does not bring it back
(`show()` re-tests `box.value.trim()`). Changing your mind means selecting and deleting ~30
characters on a phone.

---

## 3. The 21 chips as a screen

- **The page is 1,678px. The chip row is 1,112px of it (353→1466). The fold is 785.**
  Nine chips are visible; **twelve need a scroll.** *What will you do?* sits at 271–353, above
  them, which is right — but the list under it is the longest thing in BETR.
- **The order is fixed and reads as arbitrary.** No grouping, and the near-twins are far apart.
- **Two pairs read as the same act, fourteen apart:**
  - #5 *send it without reading it again* / #19 *don't check it a second time* — drops are
    "No second read-through" and "No second look"
  - #6 *don't answer a message straight away* / #20 *let a message sit unread* — dos are
    "Leave one message a few hours before you answer it" and "Leave one message unopened until
    this evening"
  (Their predictions are genuinely different in both pairs. It is the **act** that repeats.)
- **One prediction appears under two starts word for word:** *"they'll think I don't care"*
  under #6 and under #21.
- **#21 is the opposite of a stock worry.** *get through it without apologising* against
  `sorry` *Apologising without explaining myself*. Both are real and they are different
  problems — but BETR offers both directions and never says which is which.
- **The placeholder is chip 1.** Grey in the box, black in the first chip: two things that look
  like the same offer.

---

## 4. The biggest gap: the generic Then set is social, and almost everyone gets it

`general.thens` is *they'll think less of me · they'll go quiet with me · it'll be held against
me later*. All three are about what other people think.

Road A is the main road. Whatever a person types — *don't check the door twice*, *sit with the
restlessness*, *leave the washing up*, *don't rush to be early* — those are the three
predictions offered. **Six of the 21 starts are not social at all** (#7 restlessness, #8 rest,
#9 phone, #13 rushing, #16 stopping early, #19 checking) and BETR has non-social predictions
written for every one of them — *it'll build until I have to do something about it*, *I won't
settle until I've looked*, *the whole day will run behind*. **None is reachable from the
general set.** A person testing a non-social belief is nudged toward a social one.

There is no rule against a second general shape. Rule 2 is about BETR choosing; showing
everybody the same longer fixed list is still a chapter in a book.

---

## 5. The two files cover the same ground and never speak

**14 of the 21 starts have a near-twin among the 21 worries** — #4/`enough`, #6/`reply`,
#9/`phone`, #14/`praise`, #15/`help`, #18/`early` are word for word or nearly.

**But only 1 of 63 borrowable predictions matches a start** (`rest`). So nothing crosses.
Borrow *Saying no without giving a reason*, clear the plan box, and the two plans offered are
the generic ones — never start #1's *"Say no to one thing today, in one sentence."*, which was
written for that exact act.

**Seven worries have no start:** `feed`, `care`, `low`, `right`, `joke`, `drink`, and `sit`
only loosely. (`feed` and `drink` are rule 4's business; the other five are not.)
**Three starts have no worry:** *ask for what I actually want*, *don't rush to be early* (the
founder's own), *go to something on my own*.

So which suggestions a person sees depends on **which door they came through**, not on what
they are testing.

### 5a. On the borrow screen, chip 1 restates the box
For **10 of the 21 worries** the prefilled If blank and the first chip's opening are the same
words or all but. `no` prefills *"say no and don't explain"*; chip 1 opens *"say no and don't
explain myself"*. Also `care`, `help`, `strug`, `hear`, `drink`, `enough`, `sorry`, `low`,
`praise`. B32 chose whole-sentence chips for a good reason and that reason stands — but the
prefill is a fourth first-half belonging to none of the three, sitting directly above them.

---

## 6. One for the founder, and it is rule 4

**Start #19 proposes a checking ritual.** *don't check it a second time* → *"Lock up once, and
walk away"* / *"No second look"* / *"I won't settle until I've looked"*. CLAUDE.md rule 4 says
no test BETR writes involves a checking ritual, and that half of rule 4 **did not loosen** on
2026-09-08 — the loosening was about what a *person* may write.

Nothing enforces it. `HABIT` and `BODY` are word lists and no form of "check" is on either, so
`content.test.js` passes. The stock worry `check` stays safely on the work side (*Sending
something without checking it again*); #19 crossed to the door-locking side, which is the one
place BETR is closest to proposing an OCD exposure with no clinician anywhere near it.

**Not fixed quietly. This is the founder's call**, the same way the `HARM` false refusal is.

---

## 7. What I would do, in order

1. **D1 and D2 are bugs and cost nothing to fix.** Re-run the lookup when the second blank
   takes focus (a text swap inside the existing row, no repaint, no caret move); call
   `readBoxes()` before Back.
2. **Ask the founder about #19** before touching it.
3. **Lengthen `general.thens`** with two or three non-social shapes, so the main road stops
   pointing everybody at other people's opinions. Content, so it goes to the CBT reviewer.
4. **Join the two files** — give each worry the `if` of its twin start, so road C reaches the
   84 written `dos`/`drops`. This is a data change, not a mechanism change, and it is the one
   that makes 280 lines of content behave like one set.
5. **The 21 chips are Misha's**, already on his list from B33. Add to that ask: the two
   repeated pairs, the arbitrary order, and whether 21 ungrouped chips is the right shape at
   1,112px.

**Confidence in the audit: 9/10.** Everything in §2 and §3 was walked and measured. §4–§6 are
readings of the content, and §6 in particular is a judgement the founder makes, not me.

---

## 8. What was actually fixed, 2026-09-08

**D1, and it was worse than §2 first described it.** The tap handler ran the lookup *again* on
the click, so a chip could put a different sentence in the box from the one printed on it: type
the placeholder's words, and the chip saying *"they'll think less of me"* inserted *"they'll
think I'm being difficult"*. Two changes, and the first is the one that matters:

- **A chip's handler now closes over the list that was printed.** `build()` works the Then
  suggestions out once into `thenChips` and `wireThens(list)` is wired against it; `buildDo()`
  does the same with `doChips` and `dropChips`. **What a chip says is now what it inserts**,
  by construction, on all three screens. This is the half that is tested.
- **The lookup runs again when the second blank takes focus.** `refreshThens()` reprints only
  the buttons — not the screen, not the heading the row is named by (a screen reader names the
  group from it), and nothing holding a caret. `wireChips()` gained an optional third element
  per pair, a callback run before the row is shown; only the second blank passes one.

Walked in Chrome at 390×844: typing *"say no without giving a reason"* and focusing the second
blank now shows *they'll think I'm being difficult / they'll stop asking me / they'll be off
with me for days*, and tapping the first inserts those exact words. The page is still 1,678px.

**D2** is one line: `on('#back', function () { readBoxes(); go('build'); })` in `buildDo()`,
replacing `wireBack('build')`. Walked on the borrow road — type over the stock plan, Back,
forward, and the person's words are still there.

**Four tests added** at the end of `loop.test.js`: the say-what-you-insert invariant on the
Then row and on the plan row, and the Back invariant for a typed test and for a borrowed one.
The borrowed case is the assertion worth keeping — a plan lost there does not come back empty,
it comes back as BETR's words sitting where the person's were.

**The live refresh itself is not unit-tested, and that is the existing bargain**, not a new
one: the fake DOM in `harness.js` is flat and fires no events, so `refreshThens()` returns
early there exactly as the hide/show around it never runs. The invariant that survives without
events is the one that is tested.

**Confidence: 9/10.** D1's display half rests on a real browser walk rather than on a test,
which is the same footing as every other live behaviour on this screen.

## 9. Still open after this

D3 (the 21 can't be reopened), all of §3, §4, §5 and §6. **§6 — start #19's checking ritual —
is the one to put in front of the founder**, and it has not been raised yet.
