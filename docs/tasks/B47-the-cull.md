# B47: The cull — the founder's review of the suggestions, turned into work

**Status:** **THE CULL IS APPLIED, AND SO IS §7 ITEM 3.** §6b was answered on 2026-09-09 and the
deletions went in the same day: **twenty-one starts are twelve, twenty-one worries are
seventeen**, four `why.js` explanations went with their worries, and the doors are refilled.
**The redraft sheet followed the same day** — [`docs/redraft-sheet.md`](../redraft-sheet.md),
all 85 of the founder's rewrites side by side with a redraft each, nothing applied. `node --test`
passes at 254. **Two things are left and both are somebody else's to read**: §6c, and the
redraft sheet's Mine column.
**Confidence:** **9/10** on the cull as applied — every deletion was driven off the sheet's own
`CULLED` marks rather than off this file's prose, and the three cross-file checks (no worry
behind no door, no explanation without a worry, no door naming a worry that is gone) all pass.
**6/10 on §6c**, unchanged, because it is new content and nobody but me has read it.
**8/10 on the redraft sheet.** Every one of the 85 rows was read against what the app actually
says today rather than against the sheet's `Line` column, four cross-file claims were checked in
the source (`strings-en.js`'s `shrinkSaid` and `smallest`, the guide's five dials, the *"but I'm
fine"* in answer four), and every candidate line went through `guards.js`. It is 8 and not 9
because 23 of the rows are a third line rather than a choice between two, and a third line is an
opinion — the founder may simply want theirs, and that is a legitimate answer on every one.
**Date opened:** 2026-09-09 · **Founder's**, returning the review sheet.
**Blocks:** [`B45`](B45-one-road-in.md) §5b and §5c. See §7 — doing them in the other order
writes thirty-eight sentences for worries that are about to be deleted.

---

## 1. What arrived

A filled-in copy of `docs/suggestions-review.csv` came back with **134 rows marked** — rewrites
in the `Rewrite` column, verdicts and questions in `Reviewer notes`. **It is merged into the
repo sheet** (matched by `Ref`; every one of the 134 refs existed, nothing was guessed).

Three facts about its coverage, and they matter more than any single line:

1. **It is the 245-row version of the sheet, not the 429-row one.** Every `S01`–`S21` and the
   old general rows are marked. **The 159 `W-*` rows are not** — those are `worries.js`, which
   is the road most people are actually on, and all 133 of them went in at B46. Nor are the
   ~30 newer general rows (`GW-*`, `GD-*`, from B43 and B44).
2. **It reviews `starts.js`, and `starts.js` is one of the two files describing the same
   twenty-one things** (B45 §2b). Eight worries were never in the sheet in any form: `feed`,
   `care`, `low`, `angry`, `hear`, `joke`, `sorry`, `drink`.
3. **The `Accept (1-5)` column is empty on all 429 rows.** No line was scored. This reads as
   the founder's own editorial pass, not the paid CBT reviewer's clinical one — and if that is
   right, **the critical path has not moved**: the reviewer still has not read a line.

---

## 2. The verdicts, by category

| Start | Verdict in the sheet | Reading |
| --- | --- | --- |
| #01 say no without a reason | keep; 3 rewrites | clear |
| #02 ask for what I actually want | keep; 4 rewrites, drop `D4` | clear |
| #03 tell someone I'm struggling | keep; 6 rewrites, drop `D2` `D3` `X3` | clear |
| #04 hand something over before it's perfect | keep, **rename** to *send or submit something before it's perfect*, "so we can merge a few other statement categories here" | clear, and it is the pivot the merge turns on |
| #05 send it without reading it again | *"drop the whole thing… too similar to #04… **To be discussed**"* | **open** |
| #06 don't answer a message straight away | *"**I wonder** if we should drop this for V1"* | **open** |
| #07 sit still with the restlessness | **rewrite the whole category and split it in two** — sitting alone in silence, and not distracting yourself from a feeling | clear in intent, and it is the most work |
| #08 rest while there's stuff to do | keep; 8 rewrites, drop `D3` `D4` | clear |
| #09 go an evening without my phone | *"**maybe** drop… some people do have emergencies"* | **open** |
| #10 say what I actually think | keep, **rename** to *say what I really think*; 7 rewrites | clear |
| #11 don't get the last word | keep; 5 rewrites, drop `D1` `X3` `X4` | clear (but see §4) |
| #12 let somebody see I got it wrong | **drop the category** — "too similar to submitting something that isn't perfect" | clear |
| #13 don't rush to be early | keep; 7 rewrites, drop all four PROPOSED | clear |
| #14 say something good about somebody | keep, **rename** to *give someone a compliment*; 6 rewrites | clear |
| #15 ask somebody for help | keep; 6 rewrites, drop `D3` `X4` | clear |
| #16 stop before it's finished | **drop the category** | clear |
| #17 go to something on my own | **drop the category** — "I'd worry it'd lead to someone going somewhere alone where they're not safe" | clear |
| #18 leave early and say plainly | keep, **rename** to *leave an event early*; 6 rewrites | clear |
| #19 don't check it a second time | **drop the category** — agrees with our own flag (a checking ritual, rule 4) | clear, and it closes B34 §6 |
| #20 let a message sit unread | **drop the category** | clear |
| #21 get through it without apologising | **drop the category** | clear |

**The general set:** rewrites on `G-P2` `G-P4` `G-D1` `G-D2` `G-X5`; **scrap `G-D3` `G-D4`
`G-D5` `G-D6` `G-X6`**; `G-X2` and `G-X4` get a note rather than a verdict. That is five of the
eight proposed general lines killed, which is the whole of what B34 proposed for `general` bar
`G-X3` and the two we ourselves recommended cutting.

**Six categories die outright, three more are asked about, one is split in two.** Twenty-one
starts become **twelve to fifteen**, plus one new one out of #07's split.

---

## 3. What a drop actually costs, and it is not the same on both roads

**Dropping a start is free.** `starts.js` items are matched by their `if` line and nothing
stores a reference to one. Delete the object, delete its rows from the sheet, done.

**Dropping a worry is not.** `worries.js` ids are stored in a person's own record (`rate.keyOf()`
keys a ladder by id), and every worry sits behind one or more doors. Six of the culled starts
have a worry behind them:

| Start dropped | The worry it is also | Doors it is behind |
| --- | --- | --- |
| #05 *and* #19 | `check` — Sending something without checking it again | `work` |
| #12 | `mist` — Owning up to a mistake before anyone finds it | `work`, `secret` |
| #06 *and* #20 | `reply` — Not answering a message straight away | `phone`, `yes` |
| #09 | `phone` — Going an evening without my phone | `phone` |

**If the cull carries across, two doors fall to two worries each:**

| Door | Today | After |
| --- | --- | --- |
| `phone` — On my phone more than I want to be | phone, feed, sit, reply | **sit, feed** |
| `work` — Never letting myself stop | rest, enough, check, mist | **rest, enough** |
| `yes` — Going along with things | reply, no, angry, help | no, angry, help |
| `secret` — Keeping it all to myself | care, strug, low, mist, help | care, strug, low, help |

`whats-going-on.js` says a door opens onto **four to six** worries. Nothing in the tests enforces
a floor — only the cap of six — so **this would not fail the build; it would just be a thin
screen.** And the `phone` door is deliberately first (B23, so the first thing anybody reads is
plainly not about recovery), which makes it the worst one to hollow out. `feed` survives untouched
only because it was never in the reviewed sheet.

**Neither #16, #17 nor #21 has a worry behind it.** Those three are free.

---

## 4. Ten lines that cannot be applied as written — and what I would put instead

**APPROVED IN FULL BY THE FOUNDER, 2026-09-09, and five of them are live.** Two are typos, two
are voice, three are the method, one is probably a dropped word, and **two stay questions for
the reviewer.** The founder's meaning is kept in every one of them.

| What happened | Which |
| --- | --- |
| **Applied to `starts.js` and live now** | `S04-D1` `S08-D1` `S08-X2` `S11-P2` `S11-X2` |
| **Cut from the sheet** | `G-X4` |
| **Folded into the #07 split** (§6c) | `S07-D1` `S07-D4` |
| **Agreed wording, goes in at the merge** (the line was PROPOSED, never shipped) | `S03-D4` |
| **Shipped line stays; the founder's version is now a question on the row** | `S07-P3` |

The five live ones carry `OURS: AGREED 2026-09-09 and LIVE` in the sheet's `Our flag`, so the
reviewer scores what the app says rather than what it used to say.

### The three where the method is the problem

| Ref | Shipped now | The founder's | What I'd put |
| --- | --- | --- | --- |
| `S08-X2` | Don't keep the list where you can see it. | *Try not to think about your todo list* | **Put the to-do list out of sight before you sit down.** |
| `G-X4` | Don't check afterwards how it landed. | *Try not to ruminate on what others thought of your action* | **Cut the row.** If something has to be there: *Don't go back and ask how it went.* |
| `S07-D1` | Set ten minutes and sit with it. Write down the time it eased. | *Plan ten minutes to do a guided mindfulness session* | **Sit somewhere quiet for ten minutes with nothing on, and write down when you first wanted to get up.** |

**Why all three change shape rather than wording.** A *leave out* has to be something a person
can either do or not do, and **"don't think about it" is not one** — there is no moment where you
either did it or didn't, and trying not to think about something is the one instruction that
reliably produces more of it. The founder is right that the shipped line is fussy; the fix is a
plainer **behaviour**, not a plainer thought. `G-X4` was already ours-to-cut: in the general set
it reaches everybody whatever they typed, and checking how it landed is not a safety behaviour
for most of what people will write.

**`S07-D1` is the one worth reading twice.** A guided session is a thing you do *instead of* the
discomfort — it is the distraction with a better name — and nothing in it is predicted, so
nothing can turn out to be wrong and the loop moves nothing. But the founder's complaint about
the shipped line is correct: *"sit with it"* — sit with **what**? The replacement says what the
person actually does, in words anybody can picture, and still produces the evidence.

### The one that looks like a dropped word

| Ref | Shipped now | The founder's | What I'd put |
| --- | --- | --- | --- |
| `S11-X2` | Don't go back to it later. | *Keep making new points arbitrarily* | **Don't keep making new points.** |

As written it tells a person to do the very thing the test is about. With the *Don't* in front it
is **better than the shipped line** — it names the actual behaviour under *don't get the last
word*, where "go back to it later" is vaguer. "Arbitrarily" goes because nobody says it.

### The two that are voice, and one of them is an improvement in disguise

| Ref | Shipped now | The founder's | What I'd put |
| --- | --- | --- | --- |
| `S11-P2` | it'll get brought up again | *they'll not remember what you said* | **they won't remember what I said** |
| `S08-D1` | Take two hours off today, and take them properly. | *Take one hour off today and do something just for me* | **Take an hour off today and do something just for yourself.** |

**`S11-P2` is not a slip and I called it one first time.** It is a *different* prediction from the
shipped line and a better one — the fear under not getting the last word is that your point
vanishes. It only needs the person fixing: a prediction follows *If I…, then* and is about **me**.
With it, the founder's three under #11 are better separated than the shipped three: how I look
(`P1`), whether my point lands (`P2`), whether I stew (`P3`).

**`S08-D1` also shrinks two hours to one, and that should stay** — a smaller first step is the
right direction for the line a person meets first.

### The two typos

| Ref | The founder's | What I'd put |
| --- | --- | --- |
| `S04-D1` | *Leave one thing at 'good enough' at hand it over* | **Leave one thing at good enough today and hand it over.** |
| `S07-D4` | *Wait the uncomfortabe feeling out and see if it goes away* | **Wait the feeling out once today, and write down when it went.** |

`S07-D4` lands in draft B of the split (§6c). The founder's version is plainer than both the
shipped line and my draft's — **"wait it out and see if it goes"** is the whole experiment in six
words. The only thing added is writing down when, because that is what turns it into evidence
rather than an impression.

### The two that stay questions

| Ref | Shipped now | The founder's | Where it goes |
| --- | --- | --- | --- |
| `S07-P3` | it won't pass on its own | *I'll have a panic attack* | **Keep the shipped line; the founder's goes to the reviewer** |
| `S03-D4` | Tell one person the part you'd usually leave out. | *Admit how bad things really are* | **Tell one person one thing you've been keeping to yourself.** — and the founder's goes to the reviewer |

**`S07-P3`.** The words are not the problem; **who is saying them** is. Somebody who has panic
attacks already holds that prediction and can type it into the free box in six words — that box
is exactly what it is for. Somebody who does not has just been handed the idea by an app, on a
screen with no clinician behind it. And *"it won't pass on its own"* is already the falsifiable
core of the same belief without the word. **Keep it, ask the reviewer, and let the person's own
sentence be the sharp one.** It is now a question on `S07-P3` in the sheet.

**`S03-D4`.** *"How bad things really are"* has no floor — for one person that is a sentence at
lunch, for another it is a disclosure that cannot be walked back, and BETR is the one proposing
it. **"Admit"** is the other half: you admit a fault, and the whole point of this category is
that struggling is not one. The suggested line keeps the founder's move — say the thing you
normally don't — and puts a floor under it with **one thing**.

### And the mechanical ones, which are not decisions

Everything else in the review is `’` not `'`, a capital and a full stop on every *do* and *drop*,
lowercase on every prediction, and numbers written as words (`S13-D2`'s *"wait 2 minutes"*
becomes *two minutes*). The tests already hold all of it.

---

## 5. The editorial direction underneath it

Said plainly in two notes — *"reduce the scope down to important anxieties and not these kind of
banal things"*, and #17 dropped because of what it might lead somebody to do. **The cull is
mostly the admin end of the list**: unread messages, second read-throughs, being early, stopping
mid-job. What survives is social fear, saying the thing, asking, resting, being seen to be wrong.

That is coherent and it is worth saying out loud, because it is a decision about what BETR is
for — and **it does not survive contact with two of the six doors**, which were built around
exactly the material being cut (§3).

---

## 6. The founder's four answers, 2026-09-09

1. **A drop carries across.** One list, one cull — the six worries go too, **and the doors get
   refilled from what survives before anything ships.**
2. **All three open ones go**: #05 (send without reading it again), #06 (don't answer straight
   away), #09 (an evening without my phone).
3. **#07 is split and I draft it**, and the founder and Misha read it before it goes near the app.
4. **The rewrites get redrafted in the house voice**, and the founder sees their line and mine
   side by side before anything is committed.

**So the cull is: nine starts, four worries, thirty-four single lines, and start #07 rewritten
into two.** Twenty-one starts become twelve plus two. Twenty-one worries become seventeen plus
one. The sheet is marked: **271 rows are still live for the paid reviewer, down from 429.**

---

## 6b. THE REFILL — ANSWERED 2026-09-09, AND A THIRD DOOR TURNED UP

**The founder's call: borrow from what is already there.** Neither of the three options below
was taken, because a fourth was available and nobody had noticed it: **doors already share
worries.** `sit` sits behind two, `strug` behind two, `no` behind two, `angry` behind two,
`help` behind two. So `work` was refilled from the surviving seventeen without putting anything
back, rewriting a label, or dropping a door:

**`work` — Never letting myself stop → `rest`, `enough`, `help`, `no`.** Four again. Asking
someone for help is handing work over and saying no is not taking more on; both are ways of
letting yourself stop, and both were already in the product behind other doors.

**AND THE CULL HIT A THIRD DOOR, WHICH §3's TABLE RECORDED AND NOTHING FLAGGED.** `yes` — going
along with things — loses `reply` and falls to three, and **that broke a rule this file never
mentioned**: the first worry behind every door has to be one a person can start the day they
tap it (scope §5.3c, `STARTS_TODAY` in `content.test.js`). With `reply` gone the door led on
*Saying no without giving a reason*, which waits on somebody asking you for something — the
exact failure the rule exists to stop. **Founder's call, same day: lead on `help` instead and
leave the door at three** rather than borrow two more from `habit`, because five was more to
read than the door needed. `help` went onto `STARTS_TODAY` for the reason `care` and `praise`
are already on it: the person starts it, nobody has to do anything first.

**`phone` stays at two and that is on the record, not an oversight.** Nothing among the
seventeen belongs behind *On my phone more than I want to be*. §6c's split is what takes it to
three, and that draft is still unread.

**Three follow-ons went in with the cull.**

1. **The floor now exists.** `whats-going-on.js` has said "four to six worries" since B19 and
   `lib/content.js` only ever held the six, so a door could fall to two and the build would
   pass — which is exactly what happened. `content.test.js` now holds `MIN_PER_DOOR = 4` with
   `phone` and `yes` named as dated exceptions carrying their reason. A third one needs the
   founder.
2. **The `yes` door's own line was describing a deleted worry.** *"An answer sent the second
   the message lands"* was `reply`. It now reads *"Doing it all yourself rather than asking"*,
   which is `help` — the door's new first worry, and previously not in the line at all.
   **MISHA HAS NOT READ THIS SENTENCE.** It is in `docs/COPY.md`.
3. **Two count canaries moved, and both were doing their job.** The suggestion sweep in
   `content.test.js` went 150 → 90 (the file holds 102 lines now, down from 150-plus) and the
   chip sweep in `loop.test.js` went 20 → 12 (fifteen chips now: twelve `if`s and the general
   set's three `thens`). Both carry a note saying a cull is the only reason to move them.

## 6b-was. THE ARGUMENT AS IT STOOD BEFORE THE ANSWER

Answer 1 says refill the doors before anything ships. **Two of them cannot honestly be refilled
from what survives**, and the second one is worse than §3 made it look.

**The `phone` door** — *On my phone more than I want to be* — loses `phone` and `reply` and is
left with `feed` and `sit`. **The #07 split rescues it**: its own line already says *"Half of it
is the scroll. Half is not being able to sit still without it"*, and the split turns `sit` into
exactly those two things. That door goes to **three**, and three is nearly four.

**The `work` door** — *Never letting myself stop* — loses `check` and `mist` and is left with
`rest` and `enough`. **And the cull took its spine.** The one surviving start that would have
filled it, #16 *stop before it's finished*, is on the drop list too. Nothing else in the
seventeen belongs behind it, and nothing in the merge does either: the three starts with no
worry yet — *ask for what I actually want*, *say what I really think*, *don't rush to be early* —
are none of them about not letting yourself stop.

**So `work` is a two-worry door with no candidates, and that is a founder-and-Misha decision, not
a content job.** Three ways out, and they are not equal:

| | What it means |
| --- | --- |
| **Put one back** | `mist` (owning up to a mistake) is the closest to *never letting myself stop*, and it was culled for being *"too similar to submitting something that isn't perfect"* — which is true, and is also an argument for merging the two rather than deleting one |
| **Rewrite the door** | Make it about resting and handing things over, which is what `rest` and `enough` actually are. **Misha signs off door labels** (B19 release condition), so this is his read |
| **Five doors** | Drop `work` and move `rest` and `enough` behind others. The biggest change, and the doors were ordered on purpose in B23 |

**Nothing was deleted until this was answered, and that was deliberate.** Culling `starts.js`
on its own was the option the founder was offered as "only the typed suggestions for now" and
turned down, and culling `worries.js` on its own leaves hollow doors on the screen the founder
would next open on their phone. **The cull was one move, and it waited on 6b.** It was answered
the same afternoon and the whole thing went in together — see §6b above.

---

## 6c. Start #07, split in two — DRAFT, nobody has read this but me

The founder's note, in full: *"I think I'm maybe mixing up this category, between the concept of
sitting calmly alone in silence which is scary for some people, and the concept of not
distracting yourself when you have an uncomfortable emotion, so we may need to split these up and
rewrite please."* They are two different fears and they are right that one category was carrying
both. **Neither of these names a body sensation**, which is the line the old #07 was closest to.

**A — If I sit on my own with nothing on**

| | |
| --- | --- |
| then… | everything I've been putting off thinking about will arrive at once |
| then… | I won't last five minutes |
| then… | I'll feel worse afterwards than I did before |
| do | Sit somewhere quiet for ten minutes with nothing on, and write down when you first wanted to get up. |
| do | Sit down with the telly, the radio and your phone off, once today. |
| leave out | Don't put anything on in the background. |
| leave out | Don't give yourself a job to do while you sit. |

**B — If I leave a bad feeling alone instead of doing something about it**

| | |
| --- | --- |
| then… | it'll keep building until I do something about it |
| then… | it'll still be there hours later |
| then… | somebody will be able to tell |
| do | The next time you feel bad, start a timer and write down when it eased. |
| do | Wait the feeling out once today, and write down when it went. |
| leave out | Don't pick your phone up to take the edge off. |
| leave out | Don't find yourself a job to do. |

**Three things about this draft the founder and Misha should push back on.**

1. **"I'll have a panic attack" is not in it, and the founder agreed to that on 2026-09-09.**
   It is a real prediction people hold. It is also **BETR** writing it, on a screen with no
   clinician behind it, and `expect` is held to "never a catastrophe" — while somebody who does
   fear one can type it into the free box in six words, which is what that box is for. Draft B's
   *"it'll still be there hours later"* carries the falsifiable half. **It is now a question on
   `S07-P3` for the reviewer, not a line in the app.**
2. **The guided-mindfulness idea is answered, and the answer is no — but only in this half.**
   *"Plan ten minutes to do a guided mindfulness session"* turns a **test** into a coping
   technique: nothing is predicted, so nothing can turn out to be wrong, and the loop moves
   nothing. Free videos are a different question and a fair one — **a link lives on the Help
   screen in `places.js` and nowhere else** (rule 1, rule 9), never inside a test. If they should
   be there, that is a `places.js` entry and Misha's sign-off, not a `do` line.
3. **B is one small step from the habit.** *"Leave a bad feeling alone instead of doing something
   about it"* is, for a lot of people reading it, about the drink. It never says so, and it must
   never say so (rule 4 — the 2026-09-08 loosening was about a person's own words, not BETR's).
   **Read B once more asking whether it stays on the right side of that.**

---

## 7. The order, and why it is this order

**The cull comes before B45 §5b.** §5b writes three sizes for nineteen worries — thirty-eight
sentences — and four of those worries are now deleted and one becomes two. Culling first is the
difference between writing 38 sentences and writing about 30.

1. ~~**§6b answered** — the `work` door. Nothing is deleted until it is~~ **done 2026-09-09**
2. ~~The cull, both files in one move, plus the door refill~~ **done 2026-09-09, one commit**
3. ~~The redraft sheet: every surviving rewrite, the founder's line beside mine, in one
   document~~ **done 2026-09-09 — [`docs/redraft-sheet.md`](../redraft-sheet.md)**, all 85
   rewrite rows, **24 yours · 23 ours · 23 a third line · 8 needing nothing**, plus the four
   renames as decisions of their own and five findings that only appear when all 85 are laid
   out together. **Nothing applied; the app is untouched.**
4. #07's two categories built from §6c, once the founder and Misha have read it
5. **Then** B45 §5c, the merge, on a list that has stopped moving

## 8. Done when

- [x] Every `CULLED` row in the sheet is gone from the content files — driven off the sheet's
      own marks, not off this file's prose. **269 live rows** for the reviewer, from 428
- [x] No door opens onto fewer than four worries, or is named in `THIN_DOORS` with a reason and
      a date. `phone` at two and `yes` at three, both on the founder's word
- [x] `node --test` passes (**254**), the first-worry-per-door list matches, and the loop was
      walked end to end in a real browser
- [x] Nothing was deleted from `worries.js` without the founder saying so, and the four retired
      ids are written into the file's header so none is ever reused
- [x] **The redraft sheet exists and is the founder's to read** — `docs/redraft-sheet.md`. Every
      candidate line was run through `guards.js` (`HABIT` `BODY` `HARM`: no hit), carries the
      house's `’` and `“ ”`, and follows the capital-and-full-stop rule for its type
- [ ] **§6c** — the #07 split, still a draft, still the only thing left in B47 that is mine
