# Journeys

Walked by hand, on a real phone, not by a test. A journey is written so that someone who has
never seen the code can follow it and say whether it did what it says.

**Changelog**
- 2026-09-02 — J1 written (B2/B4). Not yet walked on a phone.
- 2026-09-02 — J1 updated for the belief ladder, *your worries*, and "fear" becoming "worry".
  J2 added: the same worry three days running.
- 2026-09-03 - J1 updated for B8: the menu of three, Help in place of *what this is*, and the
  small links that came off the start and result screens. J3 added: the menu, and a test that
  waits for you.
- 2026-09-09 - **J5 added: the two guide screens** (B44), and its step 6 is the one that
  matters - neither of them may ever appear on its own.
- 2026-09-10 - **J4 updated for B45 §5c and B49.** Its "two templates have this road and only
  two" was two tasks out of date; every worry has it. Steps 6a-6c (a size's own gap, on
  *Saying no*) and 19a (the leave-out's greyed example) are new. **J1, J2 and J3 are still
  behind the app and still have not been rewritten.**
- 2026-09-09 - **J4 added: the template road** (B43), and it is the acceptance test for the
  whole programme, not just for one task. **J1, J2 and J3 have not been rewritten since B19,
  and their wording is behind the app** - "Pick a worry", "Saying no without an excuse" and
  "fear" are all gone. Walk J4 first; treat a wording mismatch in J1-J3 as the journey being
  old, not the app being broken.

---

## J1 · Betr: one full loop

**Why it exists:** this is the whole product. If it works, Betr works.
**Where:** until B3, open `web/index.html` in a browser. After B3, `https://betr.dev.trybeup.com`.
**Before you start:** load the page, then **turn wifi and mobile data off**. Everything below
must work with them off. If anything fails, that is the finding.

| # | Do this | You should see |
| --- | --- | --- |
| 1 | Open it | *Sure it'll go badly?*, one big blue button, and one line: no account, no AI, nothing leaves your phone |
| 2 | Tap **Pick a worry** | Twelve worries as big buttons, *Something else* last, and a line about what is deliberately absent |
| 3 | Tap **Saying no without an excuse** | *Today:* one thing to do. Underneath in bold: *No reason, no apology, no softening it.* Then *What you expect*, already written, with *not quite? change it* |
| 4 | Tap **not quite? change it**, edit it, tap **done** | Your words, in the blue box |
| 5 | Tap **I'll do it today** | *Go and do it.* The test again. A card offering **Add to home screen** |
| 6 | Tap **Not now** / **Got it** | The card goes and does not come back |
| 7 | Tap **Didn't get to it** | *No problem. It's still here for tomorrow. Smaller counts, too.* No red, no "you missed", nothing lost |
| 8 | Go and actually do it. Come back. Tap **Done it** | One box: *Just what they said or did. No verdict.* |
| 9 | Type one sentence, tap **Next** | Your belief in quotes, the rung you are on (*Started · 10*), four buttons, and small underneath *More sure than before*. No slider anywhere |
| 10 | Tap **A lot less sure** | Your expectation with a line through it; what happened highlighted underneath; the ladder showing *Started 10* then *Now 7*; a big **1** |
| 11 | Tap **Do it again tomorrow** | The same test, ready to lock in again |
| 12 | Tap **Back**, then **New worry**, then **Not sure which? Start from what's going on** | Six things a person might say about themselves, each with a line about the worries underneath |
| 13 | Tap **Drinking more than I mean to** | Four worries, not a test. Nothing here is a test of the drink |
| 14 | Tap **Show all 12**, then **Something else** | *What do you think will happen?*, one box, pre-filled with "If I " |
| 15 | Type **I am a waste of space**, tap **Next** | Refused: *That's a verdict, not a prediction. What do you think would happen because of it?* |
| 16 | Type an "If I …, then …" sentence, tap **Next** | *What will you do?* |
| 17 | Type something involving the drink or the screen, tap **Next** | Refused, with the reason, not a warning you can tap past |
| 18 | Type a safe test, tap **Next**, then a thing to leave out, tap **Next** | Your own test, laid out exactly like a stock one, with your expectation taken from your own sentence |
| 19 | Finish that loop | A big **2** |
| 19a | Tap **Your worries** | Two cards, most recently tested first. Each has its own ladder and what you wrote each time. No total, no average, no target |
| 19b | Tap **Test this again** on the older card | That test again, ready to lock in. Its ladder carries on from where it was, not from 10 |
| 20 | Tap **Help** | The crisis lines first, above everything. Then *What CBT is, and which bit of it this is*. Then the nine sentences; the airplane-mode line; 0 accounts; 0 B sent; the other places; the TrybeUP line; the build hash |
| 21 | Tap **Export everything** | A readable JSON with both results in it, a **copy it** button, and on a phone **send it somewhere** |
| 22 | Tap **Delete everything**, then **Delete it all** | Back to the start screen, no result count, nothing left |
| 23 | Reload the page | Still the start screen. Nothing came back |
| 24 | Open the browser's network tab, reload, then use it | One page load and its files. Nothing after that, ever |
| 25 | Add it to the home screen, open it from there, do a full loop | The same thing, full screen, no browser bars |

**Result:** _not yet walked._

**Recorded by:** —
**Date:** —
**Notes:** —

---

## J2 · The same worry, three days running

**Why it exists:** this is what the whole thing is for, and until 2026-09-02 it was the one
thing the app could not show. The words are relative; the stored number used to be fixed, so
three days of *a bit less sure* recorded the same number three times.

**Where:** as J1. Takes three days if done honestly; can be walked in one sitting to check the
screens.

| # | Do this | You should see |
| --- | --- | --- |
| 1 | Do a full loop on **Asking for help**, ending on **A bit less sure** | *Started 10*, *Now 9* |
| 2 | Tap **Do it again tomorrow** and finish it, **A bit less sure** again | *Started 10*, *1st 9*, *Now 8* — three different rungs, not three nines |
| 3 | Do it a third time, **A lot less sure** | *Now 5*, and *Down 5 since you started* |
| 4 | Do it a fourth time after a bad day, tap **More sure than before** | *Now 6*. No red, no "you missed", nothing calls it a setback |
| 5 | Tap **Your worries** | One card, four outcomes in your own words beside the rung each one landed on |
| 6 | Tap **Help**, then **Export everything** | Each result carries `sureOutOfTen` |

**Result:** _not yet walked._

**Recorded by:** —
**Date:** —
**Notes:** —

---

## J3 - The menu, and a test that waits for you

**Why it exists:** B8 put three doors under every screen and made a locked-in test something
that keeps, rather than something the next tap overwrites. Both are easy to break, and neither
shows up in a test that only walks the loop.

**Where:** as J1. **Do at least the first six steps on the shortest phone you can find** - the
menu covering the big button is the failure this journey is looking for.

| # | Do this | You should see |
| --- | --- | --- |
| 1 | Open it | Three plain words along the bottom: *Your worries - New worry - Help*. No icons, nothing highlighted, no dots, no numbers |
| 2 | Look at the big button | The menu sits below it and does not cover it. Same on every screen after this |
| 3 | Tap **Your worries**, with nothing done yet | The pick list. Never an empty screen with nothing to do |
| 4 | Tap **Back**, **Pick a worry**, any worry, then **I'll do it today** | *Go and do it.* One small link under it: *Didn't get to it* |
| 5 | Tap **New worry** and start a different one | The pick list, then a second test. The first one is not gone |
| 6 | Tap **Back** until you reach the front screen | One line: *Tests you've got on the go*. No number, no "2 open", no red |
| 7 | Tap it | Your worries. Both are there, each on its own worry's card, each with **Done it** and **Didn't get to it** |
| 8 | Tap **Didn't get to it** | *No problem. It's still here for tomorrow.* It stays exactly where it is |
| 9 | Close the app, wait, open it again | Both are still waiting. Nothing expired, nothing marked late |
| 10 | Tap **Done it** on one | Straight to *What happened?*. Finish it, and it records one result |
| 11 | Tap **Help** | The crisis lines, above everything. You should not have to scroll to reach them |
| 11a | Read the first block | Your local emergency number, then **the helpline for the country you are in**, named. On a UK phone: *In the United Kingdom: Call 116 123 - Samaritans. Free, 24 hours.* |
| 11b | Tap the number | Your phone's dialler opens with it already in. Cancel it. Nothing in BETR changed while you were gone |
| 11c | Tap **Not where you are?** | Every country, alphabetical. Pick **Kenya** |
| 11d | Look at the crisis block again | It says nobody has checked a number for Kenya, and **shows no phone number at all**. If a number appears, stop: that is the bug B17 exists to prevent |
| 11e | Tap **Not where you are?**, then **Go back to guessing from my time zone** | Your own country's line is back |
| 11f | Type a test about hurting yourself, on **Something else** | The refusal, with the same country's number under it, tappable there too |
| 12 | Read *What CBT is, and which bit of it this is* | Three short paragraphs and two links, above all the small print |
| 13 | Scroll to *Other places* | Three groups. TrybeUP is in the third, second in it, in the same plain type as the rest, saying we made it and what it costs |
| 14 | **With wifi off**, open Help again | The whole screen reads correctly. Nothing missing, nothing loading |
| 15 | Turn wifi on and tap one link | It opens in your browser. Come back to BETR: everything is where you left it |
| 16 | Open the network tab and walk the whole app | The page load and its files. Nothing after that, ever |

**Result:** _not yet walked._

**Recorded by:** -
**Date:** -
**Notes:** -

---

## J4 - The template road: a skeleton, a gap, a size, twice

**Why it exists:** B41 gave two worries a sentence with a gap in it, B42 gave them three sizes,
and B40 made the road rather than the words decide which ladder a test belongs to. Each of
those was walked on its own. **This is the first journey that walks all three at once, and it
is the acceptance test for the whole programme:** a person types one word into a sentence, is
offered three predictions and three sizes built out of that word, does the test, comes back,
does it again differently - and watches **one** ladder move.

**Where:** `https://betr.trybeup.com`, wifi off after it loads. **Do it on a real phone.** Then
do steps 1-11 again with the phone's text size turned up (Settings - Display - Text Size, up
two notches); everything must still be reachable.

**Every worry has this road, since B45 §5c (2026-09-10).** All twenty print a verb and most have
a gap in it; there is no second shape and no worry that “still works the old way”. If two screens
on two worries look like different kinds of screen, that is the bug this journey is looking for.

**One worry has a second gap, and only one:** *Saying no without giving a reason* carries
`{thing}` in its smallest step, filled on the **plan** screen rather than the build screen
(B49). Steps 6a–6c below are that, and they are the only steps that apply to one worry.

| # | Do this | You should see |
| --- | --- | --- |
| 1 | Open it, tap **Not sure? Try one of these** | *What's going on?*, six doors and *None of these - I'll write my own* |
| 2 | Tap **Going along with things I don't want to do** | Four worries, each with its *If I ..., then ...* under its label |
| 3 | Tap **Saying no without giving a reason** | *Make it yours.* One sentence with the words **If I**, **say no to**, a box, **without giving a reason**, **, then** and a second box. Under it, three whole predictions - each one already saying *somebody* |
| 4 | Type **my sister** into the first box | **All three predictions change as you type**, and every *somebody* in them becomes *my sister*. Nothing else on the screen moves |
| 5 | Tap the second prediction | It drops into the second box, in your words. The other two stay on screen; nothing is greyed out or ticked |
| 6 | Tap **What will you do?** | Your finished sentence in quotes at the top, under the worry's name. Then *What will you do today?*, an empty box saying *Write what you'll do, or start from one of the three below* - **and the three are directly below it** - and **three named steps**: *A small go*, *A bigger go*, *The whole thing* - each a whole sentence with **my sister** already in it. The box is empty: BETR has not picked one |
| 6a | **On this worry only:** tap **A small go** instead | The plan is not a box — it is the sentence itself, *Say no to* **my sister** *once today, about* ___ ., with **my sister** highlighted and a small blank at the end. The blank is **empty**, and the word *something small* sits in it greyed out |
| 6b | Type **the Saturday thing** into that blank | The sentence reads *Say no to my sister once today, about the Saturday thing.* The full stop stays right after the word. **Lock it in** is on screen without scrolling |
| 6c | Tap **Change** | The three are back **and the box is back**, with *Say no to my sister once today, about the Saturday thing.* in it, editable. Nothing you typed was lost getting there |
| 7 | Tap **A bigger go** | The row of three folds onto the one you picked. *HOW BIG A GO - Change - A bigger go*, the sentence now in the box, and the leave-out that belongs to that size filled in under it. **Lock it in** is on screen without scrolling |
| 8 | Tap **Change** | The three are back, and the one you had is still the one in the box |
| 9 | Tap **A bigger go** again, then **Lock it in** | *LOCKED IN. Go and find out.* Your sentence, your leave-out, and *A bad one counts the same as a good one* |
| 10 | **Go and actually do it.** Come back. Tap **Done it. Here's what happened** | One box, and above it the worry's name and the exact sentence you are testing. No verdict asked for |
| 11 | Type what happened, tap **Next**, tap **A lot less sure** | Your expectation, what happened, and the ladder: *Started 10*, *Now 7*. Beside it, **the name of the size you did it at** - *A bigger go*. A big **1**. (If you did step 6b, that rung reads *A small go · the Saturday thing* - the size **and** the word you put in the gap) |
| 12 | Tap **New test** at the bottom, then **Back**, then **Not sure? Try one of these**, and come back to **Saying no without giving a reason** | The blank sentence again. **Your last answer is not pre-filled** - this is a new test, not the old one reopened |
| 13 | Type a **different** name into the gap, tap a **different** prediction, and pick a **different** size | All three sentences rebuild around the new name |
| 14 | Finish that loop too | *Started 10*, *1st 7*, *Now ...* - **one ladder, three rungs**, each rung carrying the size it was done at and what you wrote. Not two cards, not two ladders |
| 15 | Tap **Your tests** | **One** card for this worry, however many different names, predictions and sizes you used. *1 test, done 2 times* |
| 16 | Tap **Why this one sticks** | The worry's own page. It quotes the worry's general sentence, not the one you wrote - that is right; the page is about the worry, not about you |
| 17 | Go back to the worry and tap **Write the whole thing myself** | Both boxes empty, and no plan carried over. It hands you a genuinely blank test and **leaves the worry's ladder alone** |
| 18 | Do steps 1-11 again on **Telling someone I'm struggling** (it is behind *Keeping it all to myself*) | The same road. The gap sits in the middle of the sentence this time - *If I tell ___ one true thing I'm finding hard* |
| 19 | On that one, leave the gap **empty** and tap a prediction | Everything reads *somebody*, and it is a whole sentence. Nothing shows a blank, a placeholder or a brace |
| 19a | Open the **And leave out** row on any worry that is not *Saying no* | The greyed example in that box says *Write what you'll leave out, or start from one of the three below* - **never** a leave-out belonging to another worry. If it says *Don't give a reason* on anything but *Saying no*, B49 has come undone |
| 20 | Tap **Help**, then **Export everything** | Each result carries the words you typed into the gap, which prediction you picked, and the name of the size. Nothing carries a score of you |
| 21 | With wifi off, walk the whole road again | It all works. Open the network tab: the page load and its files, nothing after |

**Read every sentence out loud as you go.** The question is not whether it is correct, it is
whether **you would ever say it**. A sentence that is only nearly yours cannot be disconfirmed:
the loop runs and moves nothing. If one of them sounds like BETR talking rather than you, write
it down here - that is the finding this journey exists for.

**Result:** _not yet walked._

**Recorded by:** -
**Date:** -
**Notes:** -

---

## J5 - The two guide screens, and the one thing they must never do

**Why it exists:** B44 added two screens that teach - *Too big? Make it smaller* and *Why it's
written like this*. **Neither may ever appear on its own.** A screen that arrives BECAUSE of
what somebody typed, rated, refused or repeated is BETR deciding something about that person,
and that is the line between a book and a medical device. A test holds it; this journey is how
a person checks it, because a person can try things a test cannot think of.

**Where:** as J4. Do steps 1-6 with the phone's text size turned up two notches as well.

| # | Do this | You should see |
| --- | --- | --- |
| 1 | Tap **New test**, and read the bottom of the screen | Two small underlined lines: *Why it's written like this*, then the line about which tests BETR is for. No box, no banner, nothing coloured |
| 2 | Type half a sentence into the first blank, tap **Why it's written like this** | Five short answers, in the order you meet them. At the bottom, the same line that closes *Why this one sticks*: it is general, and BETR cannot see anything you have written |
| 3 | Tap **Back** | The build screen, **with your half sentence still in it** |
| 4 | Finish the sentence, tap **What will you do?**, and look under the three sizes | One small underlined line: *Too big? Make it smaller* |
| 5 | Type half a plan, tap it, read it, tap **Back** | The five dials, the worked shrink read biggest-first, and then your half plan still in the box |
| 6 | **Now try to make either screen appear on its own.** Type a test that gets refused. Leave the box empty and tap *Lock it in*. Do a test and answer **More sure than before**. Do the same one three days running. Open the app five times | **Neither screen ever appears.** The only way to either of them is the link, and the link is in the same place every time, whatever you have done. If one ever arrives by itself, stop and write it down: that is the failure this journey exists for |
| 7 | Tap **Help** and scroll to *What CBT is* | *Why it's written like this* is underneath it, as a plain line. Tap it, then **Back**: you are back on Help, where you were |
| 8 | Look at the bottom row on both screens | Still three plain words: *Your tests · New test · Help*. No fourth |
| 9 | Read the worked shrink out loud | Three steps, biggest first, using the same three names the do screen uses: *The whole thing*, *A bigger go*, *A small go*. If they are not the same words, they are teaching a dial that is not the one you are holding |

**Result:** _not yet walked._

**Recorded by:** -
**Date:** -
**Notes:** -
