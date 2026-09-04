# B27: The small repairs the walks turned up

**Status:** **Items 1, 2, 3 and 5 built and pushed, 2026-09-04. Item 4 is open and is the only**
**one still needing a check on a real phone that no session can do**
**Confidence:** 9/10 on what was built. Each of the four is provable and each carries a test
**Date opened:** 2026-09-04 · **Depends on:** nothing. Items 1–3 took under an hour
**Findings 7, 8 and 9 in `docs/journeys-observed.md`. Item 5 was found the same way, later
the same day, and is the most serious thing in this file.**

Five things. Four are small. Item 5 is not, and it arrived last because it only shows up when
somebody types the wrong sentence into the right box.

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

## 5 · A worry naming self-harm was answered with "What will you do?" — **DONE**

`guards.checkTest` has always refused a plan naming suicide or self-harm, with the crisis
lines underneath. `guards.checkBelief` — the box one screen earlier — screened for none of it.

```
checkBelief("If I tell them how I really feel, then they will know I want to kill myself")
  → { ok: true }            → next screen: "What will you do?"
```

So the one person BETR most needs to stop was handed a box asking them to plan it, and heard
*"BETR can't help with that one"* only after they had typed something into it. One screen late,
at the worst possible moment.

Not fixed on the spot, and written into `learnings.md` unfixed, because `checkBelief` had its
walls taken down **that same morning** on the founder's call — a grammar wall had cost a test
user his session. Putting a wall back into that box was theirs to decide. **They decided it the
next session: stop it at the worry box.**

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
5. ~~`HARM` in `checkBelief`, refusing in `checkTest`'s exact words so the crisis block draws
   underneath it — and a test that pins HABIT to `checkTest` alone.~~ **Done.**

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

### 5 · The one wall that went back up

Three lines in `web/lib/guards.js`: `HARM` is checked in `checkBelief` immediately after the
empty box, before the verdict rule, and returns `refusal.harm` — the same key `checkTest`
returns. That matters more than it looks: `app.js:842` already draws the crisis block whenever
`refusal.kind === 'harm'`, so the country's own helpline appeared under the belief box with no
change to `app.js` at all.

Walked in a real browser. Typing the sentence above into *"None of these — I'll write my own"*
now gives the refusal, *"If you are in danger right now, call your local emergency number"*,
and **116 123 — Samaritans** as a tappable number. Tapping **Next** again refuses again: this is
a wall, not the shape nudge, and a second tap does not buy a way past it.

**175 tests.** Two new ones, and the second is the one to keep:

| Test | What it pins |
| --- | --- |
| a belief naming anyone's safety is refused here, not one screen later | the fix, and that both guards return the *same* key |
| a belief about the habit still goes through — it is the test that may not | that nobody "makes the two guards consistent" later |

## Decisions

- **`HARM` is screened on a belief; `HABIT` and `BODY` are not, and that is deliberate.** Rule 4
  is about the *test*. "If I stop drinking at the wedding, then they'll ask why" is precisely
  the worry door one exists to hold, and its test never goes near a drink. Screening beliefs for
  `HABIT` would refuse the people BETR is most for. The second new test fails if someone tidies
  this away, and the comment block above `checkBelief` now says which lists it owns and why —
  it previously explained at length what it had stopped enforcing and never said what it had
  never enforced.
- **The same words, not softer ones.** A separate, gentler refusal for the belief box would
  have been two sentences for one situation and one more thing to translate.
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

- **The word list is blunt and always was.** `HARM` matches on whole words, so "end it" in a
  sentence about ending a friendship is refused. That is the trade the guard file has always
  made deliberately — a person whose real worry is refused can reword it; a person whose real
  crisis is let through has been failed by the one rule that never bends — but it is now made
  on a box where the wording is a person's own, and it has not been watched in front of anyone.
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
