# B27: The small repairs the walks turned up

**Status:** **Open — written 2026-09-04. None of these needs a decision except the last**
**Confidence:** 9/10. Each is small, each is provable, each gets a test
**Date opened:** 2026-09-04 · **Depends on:** nothing. Can be done in an hour, in any order
**Findings 7, 8 and 9 in `docs/journeys-observed.md`.**

Four things, none of them big, all of them the kind of thing that only shows up when somebody
walks the app instead of reading it.

---

## 1 · "Didn't get to it" barely changes the screen

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

## 2 · The boundary line is on one of the two free-text screens

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

## 3 · Two worries on one screen share an identical second half

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

## 4 · The install card asks the one thing this audience will refuse

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

1. The miss state, with a test that walks `#miss` and asserts the heading changed.
2. `foot` on both belief boxes, with a test that asserts it on both.
3. The same-door duplicate-consequence test; the content question to the reviewer's list.
4. Check the iOS rename sheet on a real phone, then take item 4 to the founder.
