# B27: The small repairs the walks turned up

**Status:** **Items 1, 2 and 3 built and pushed, 2026-09-04. Item 4 is open and is the only**
**one that needed a decision — it also needs a check on a real phone that no session can do**
**Confidence:** 9/10 on what was built. Each of the three is provable and each carries a test
**Date opened:** 2026-09-04 · **Depends on:** nothing. Items 1–3 took under an hour
**Findings 7, 8 and 9 in `docs/journeys-observed.md`.**

Four things, none of them big, all of them the kind of thing that only shows up when somebody
walks the app instead of reading it.

---

## 1 · "Didn't get to it" barely changes the screen — **DONE**

Marcus tapped **Didn't get to it**. He got the right sentence — *"No problem. It's still here
for tomorrow. Smaller counts, too."* — announced above a screen that was otherwise unchanged.
The heading still read **LOCKED IN · Go and do it**, the test was still there in full, and both
buttons were still there.

*"Did that do anything though? It still says LOCKED IN, go and do it."*

**Rule 5 is honoured in the words and undercut by the screen.** A person who taps "didn't get to
it" is closing the app; what they take away is the last thing they saw, and the last thing they
saw was an instruction they had just declined.

**The fix is a state, not a sentence.** The locked screen after a miss should read as *put down
safely* rather than *still shouting*. It already knows: `missed` is on the record. What it does
not do is look any different.

**Not a new screen.** Same screen, different state: the kicker and heading change, the command
softens, and *Didn't get to it* stops being offered a second time.

---

## 2 · The boundary line is on one of the two free-text screens — **DONE**

`own.belief.only` — *"Not the weather, and not your body. Only the ones you've never actually
found out about."* — was added on 2026-09-04 as the fix for the gluten problem. It renders on
`ownBelief()`, the blank box reached from the doors.

**It does not render on `beliefOwn()`**, the box a person reaches by taking *I'll put it my own
way* under a stock worry. That path is **four taps from a cold start** and it is the one Priya
took. `beliefOwn()` does not pass `foot` to `ownScreen()`.

Arguable that it matters less there — the worry is anchored to one of the twenty-one, so the
frame is already set. **Arguable is not a reason.** One line, plus a test that asserts the line
is on both boxes so it cannot fall off one of them again.

---

## 3 · Two worries on one screen share an identical second half — **test half DONE**

Adjacent, under door one:

- `early` — *"If I leave early, **then it costs me something with them**."*
- `strug` — *"If I let someone see I'm struggling, **then it costs me something with them**."*

Word for word, on the same screen, one above the other. `content.test.js` already fails the
build if a worry's three predictions repeat each other; it does not look **across** worries, and
it does not look at the card `belief` at all.

**Two parts:**
- **The content half is not ours.** It goes on the paid CBT reviewer's list beside `strug`/`low`
  and `care`/`praise`. If they are one worry, one of them goes.
- **The test half is ours, today.** A test that fails the build when two worries **on the same
  door** share a consequence clause. It would have caught this before anybody read it.

---

## 4 · The install card asks the one thing this audience will refuse — **OPEN**

Dan, on *Add this to your home screen*: *"I'm not putting an icon called BETR on my home screen
where my girlfriend can see it."*

Home-screen install is not decoration — research §9.1: Safari deletes a web page's storage after
seven days without use, and a person who loses three tests **has been harmed by our own privacy
design**. So the card is right and the refusal is also right, and they are in direct conflict.

**One fact worth checking before deciding anything:** on iOS, the *Add to Home Screen* sheet lets
a person **type their own name for the icon** before adding. If that is still true, the card can
say so, in one line, and the conflict mostly dissolves — the person chooses what it is called on
their own phone, and we never know.

**This is the one item here that needs a decision**, because it touches what BETR is called on a
person's phone and that is founder territory. It also matters before **B5**, where a native wrap
puts a fixed name and icon on the home screen with no rename sheet at all.

---

## What this task may not do

- **It may not add a screen** for the miss state. Same screen, different state.
- **It may not change a worry's words.** Item 3's content half belongs to the reviewer and Misha.
- **It may not weaken the install card's reason.** Safari's eviction is real and the card exists
  because of it.
- **It may not assert anything about iOS's rename sheet that has not been checked on a phone.**

## Plan

1. ~~The miss state, with a test that walks `#miss` and asserts the heading changed.~~ **Done.**
2. ~~`foot` on both belief boxes, with a test that asserts it on both.~~ **Done.**
3. ~~The same-door duplicate-consequence test~~ **done**; the content question is on the
   reviewer's list in `B1-the-stock-list.md`, in a table with the other two pairs.
4. Check the iOS rename sheet on a real phone, then take item 4 to the founder. **Open.**

---

## What was built — 2026-09-04

**173 tests, all green. Walked in a real browser, 390×844, both screens looked at.**

### 1 · The miss is a state now, not a sentence added to an unchanged screen

Same screen, no new one (rule 10). `locked()` takes a `rest` branch off `c.missed`, which was
already on the record and already saved:

| | Before the tap | After it |
| --- | --- | --- |
| kicker | LOCKED IN | **SET ASIDE** |
| heading | Go and do it. | **Nothing lost.** |
| the test and the drop | on screen | **on screen, unchanged** — it is what is waiting |
| the note | — | No problem. It's still here for tomorrow. Smaller counts, too. |
| big button | Done it. Here's what happened | **Actually, I did it** |
| "Didn't get to it" | offered | **gone** — it has already happened |

Three new strings, `locked.restKicker` / `restTitle` / `restDone`. The way back in is the same
`#done` button with a softer label, because a test put down is not a test taken away — and it
survives a reload, because `missed` was always stored.

**Two tests in `loop.test.js`:** one walks `#miss` and asserts the kicker, heading and button
all changed, that the miss is not offered twice, that the test and drop are still there, and
that `#done` still reaches *What happened?*. The second reboots off the same storage and
asserts the screen is still in the rest state.

The a11y test is unchanged and still passes. The note is still read out even though the heading
now changes too: focus lands on the heading, which is four words, and the note is the part that
says what actually happens to the test. They are not the same sentence, so this is not the app
saying everything twice.

### 2 · The boundary line is on both boxes

One line in `beliefOwn()` — `foot: t('own.belief.only')`. `loop.test.js` now walks to both
boxes and asserts the same string on each, plus an assertion that the string still contains
"not your body", so a reword cannot quietly turn the test into one that proves nothing.

### 3 · The test half, with the content question written down where it will be answered

`content.test.js` gains **`KNOWN_SHARED_CONSEQUENCE`**, held by hand like `STARTS_TODAY`, and
two tests:

- **no two worries behind one door end the same way** — compares the normalised clause after
  ", then " in each card `belief`, per door. `early`/`strug` is the one entry on the exemption
  list. Verified by deleting the entry: the test fails with the pair named.
- **every pair excused above is still the duplicate it was excused for** — fails the day the
  reviewer's answer lands in `worries.js`, which is what forces the exemption back out of the
  file rather than leaving it there forever.

The content question went to `docs/tasks/B1-the-stock-list.md` step 3, as a table with the
other two pairs (`strug`/`low`, `care`/`praise`) and what happens to each if the answer is
"one worry".

## Decisions

- **"Set aside · Nothing lost."** Not "Put down" (it reads as an ending), not a repeat of the
  note's own words (it is directly beneath). It names what happened to the test and says what
  it cost, which is the whole of rule 5 in four words.
- **The miss button goes rather than greying out.** A disabled control is still an offer, and
  the offer has been taken.
- **The test and the drop stay on screen after a miss.** They are not an instruction any more;
  they are what is waiting for tomorrow, and a person who comes back needs to see it.
- **The duplicate pair is exempted, not fixed.** CLAUDE.md and this task both say a worry's
  words are not a session's to change. The exemption is written down twice — in the test and
  on the reviewer's list — and the second test makes it self-deleting.

## Gaps

- **Item 4 is untouched and it is the only one that needed a decision.** It also needs
  something no session can do: *does iOS still let a person type their own name for the icon on
  the Add to Home Screen sheet?* That has to be seen on a real phone before the card can say it.
  It matters again, harder, at **B5**, where a native wrap puts a fixed name and icon on the
  home screen with no rename sheet at all.
- **The `early`/`strug` content question is on a list nobody has been paid to read yet.** The
  test stops it getting worse; it does not fix it.
- **Nobody using a screen reader has been through the rest state.** The note is announced and
  the heading takes focus, which is the shape the rest of the app uses, and that is not the
  same as somebody having heard it.
