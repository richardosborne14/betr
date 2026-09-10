# Candidate suggestions, batch 1 — for the CBT reviewer

**Status: NOT REVIEWED, NOT IN THE APP, and not to be put in the app until somebody with the
training has read every line.** Nothing here has been copied into `web/content/starts.js`.
This file is a proposal and a worked demonstration, nothing more.

**Written 2026-09-08 by a language model (Claude Opus 5), offline, in a conversation on the
founder’s laptop.** No key, no network call, nothing sent from the app, nothing reaching a
person until a human says so. That is the arrangement B35 §3 proposed as the alternative to a
runtime call, and this file is what it produces.

**Why it exists.** The founder asked why the 2026-09-08 experiment tested only Groq’s
`openai/gpt-oss-120b` and not a stronger model. Fair question. The honest answer is in two
halves: for the *runtime* decision the model makes no difference, because all eight
consequences in B35 §3 are about the app making a network request at all — but for *this*
route the model matters a great deal, and a cheap fast model was the wrong tool for a job
whose real cost is the reviewer’s time.

**91 candidate lines, of which we recommend 89.** Read them the way you would read a
colleague’s first draft. §5 audits them against three failure shapes measured the same day, and
§1c withdraws two of our own on the strength of it.

---

## How to review this

Three marks, in the margin or in a reply, whichever is easier:

- **K** — keep as written.
- **E** — the idea is right, the wording isn’t. Say what’s wrong; the rewrite is our job.
- **C** — cut. It doesn’t belong in a behavioural experiment, or it isn’t safe to hand a
  stranger with no clinician in the room.

**The one thing worth your attention above the wording**: a `do` is what the person does, and a
`drop` is the safety behaviour they leave out. If any line below has those the wrong way round —
if something in a `dos` list is actually a safety behaviour wearing a coat — that is the error
that matters most, and §4 explains why we’re watching for it.

---

## The rules these were written against

From `CLAUDE.md` and the header of `web/content/starts.js`. They are constraints on BETR’s own
content and none of them loosened on 2026-09-08:

1. **Nothing BETR proposes may name the habit** — drink, screens as a substance, smoking,
   gambling, drugs — **or food, weight, or a body sensation, or anyone’s safety.** Rule 4’s
   loosening was about what a *person* may type. These are BETR proposing.
2. **No checking rituals.** Rule 4 names them explicitly. No word list catches them; it is a
   judgement every time. See §4.
3. **Every `do` is one thing, today, cheap, and reversible.**
4. **Every prediction must be able to turn out wrong.** “Then I’ll find it hard” is a feeling
   with no evidence that could settle it. “Then the whole day will run behind” can be checked
   at six o’clock.
5. **Full sentences with a capital and a full stop** for `dos` and `drops`; `thens` lowercase,
   because they follow the printed “, then”.
6. **Written fresh** — nothing here is adapted from CCI, Getselfhelp, Therapist Aid, Psychology
   Tools or Beck Institute material.

---

## 1. The `general` set — the highest-value change in this file

**This is the part to read first if you read nothing else.**

A person who types their own sentence — which is the main road, and after the first week will
be nearly everybody — is offered the `general` set and nothing else. Today that is **two**
`dos` and **two** `drops`. Both are fine and neither is about their sentence. That gap is what
the founder noticed, and B34 §1 found it independently from the other side.

Unlike everything in §2, this set is reachable by every person on the main road, so a good line
here is worth roughly twenty good lines anywhere else.

### 1a. `general.thens` — the three today are all social

B34 §4 made this case and nobody has built it. The three predictions offered to everybody are
*they’ll think less of me · they’ll go quiet with me · it’ll be held against me later*. Six of
the 21 starts aren’t social at all, and a person testing whether restlessness passes on its own
is being nudged toward a prediction about what other people think.

Proposed, three added to the existing three, six shapes with no two the same:

| | prediction | the shape it covers |
| --- | --- | --- |
| 1 | they’ll think less of me | *existing* — social judgement |
| 2 | they’ll go quiet with me | *existing* — withdrawal |
| 3 | it’ll be held against me later | *existing* — a cost stored up |
| 4 | I won’t settle until it’s dealt with | the urge doesn’t pass on its own |
| 5 | I’ll end up doing it twice | a practical consequence |
| 6 | I’ll regret it by the end of the day | a verdict from your later self |

Note that 4, 5 and 6 all name a moment when you could check. That is deliberate.

*Changed 2026-09-08 after an independent check.* Slot 5 originally read *“the whole day will run
behind”*, which is **already in `starts.js` word for word** — a prediction under start #13,
*don’t rush to be early*. Promoting it to `general` would have made the main road and that chip
road offer the same prediction from two sources, which is B34’s starts-vs-worries problem
reproduced inside one file. The replacement was checked against all 66 shipped predictions.*

### 1b. `general.dos` — two today, six proposed

These have to be true of *any* sentence somebody types, so they’re about the **shape** of a
good test rather than its content. That is the only kind of generic line worth having.

| | | |
| --- | --- | --- |
| 1 | Do it once today, in the smallest version that still counts. | *existing* |
| 2 | Pick the version of it you could do in the next hour. | *existing* |
| 3 | Write down what you expect to happen before you do it. | **new** |
| 4 | Do it once, at a time you’ve already decided on. | **new** |
| 5 | Do it before you feel ready to. | **new** |
| 6 | Pick a version you can’t quietly undo afterwards. | **new** |

**Reviewer, a specific question on 3 and 6.** Line 3 is the one piece of experiment design that
transfers to every test, and it’s arguably the most useful sentence in the whole file — but the
app already asks for a prediction on an earlier screen, so it may read as being told twice. And
line 6 is the sharpest, because an experiment you undo an hour later gathers nothing; it may
also be the one that pushes somebody further than they meant to go. Both are yours to cut.

### 1c. `general.drops` — two today, six proposed

Safety behaviours have common shapes across very different worries, which is what makes a
generic list possible here at all.

| | | |
| --- | --- | --- |
| 1 | Don’t explain yourself. | *existing* |
| 2 | Don’t line up a way out first. | *existing* |
| 3 | Don’t rehearse it beforehand. | **new** |
| 4 | ~~Don’t check afterwards how it landed.~~ | **new — we recommend cutting, see §5** |
| 5 | ~~Don’t warn anybody that it’s coming.~~ | **new — we recommend cutting, see §5** |
| 6 | Don’t do it at half strength. | **new** |

**So the set we actually propose is four, not six**: the two existing plus *don’t rehearse it
beforehand* and *don’t do it at half strength*. Lines 4 and 5 are left visible rather than
deleted, because the reviewer may disagree and the reasoning should be in front of them.

**Why both come out.** Line 5 is a good drop for a social test and wrong for somebody who
genuinely ought to tell a person what they are about to do. Line 4 is worse, and §5 explains
it. Both fail in the same way and for the same reason: **unbounded in `general`, they reach
everybody whatever they typed**, and the one person each lands wrong on is the one who could
least afford it. Bounded under a specific start, either would be fine.

### A practical note that isn’t clinical

The screen these appear on **already overflows at 125% text size**: the box clips its own words
and *Lock it in* sits under the menu. That’s a known defect (B36 in `NEXT-SESSION.md`,
pre-existing). **Six chips where there were two will make it worse, so B36 should be fixed
before any of this ships**, whatever the reviewer decides about the words.

---

## 2. Two more `dos` and two more `drops` for each start

Twenty of the 21 starts, four lines each — 80 lines. The 21st is in §3. Existing lines aren’t
repeated; everything below is new and meant to sit alongside what’s there.

### 1. If I **say no without giving a reason**
- **do** Say no to the next thing you’d normally take on, and stop talking.
- **do** Decline one invitation today without offering an alternative date.
- **drop** Don’t soften it with “I wish I could”.
- **drop** Don’t check afterwards whether they minded.

### 2. If I **ask for what I actually want**
- **do** Name the thing you want in the first sentence, before the reasons.
- **do** Ask for the whole of it, not the version you think you’ll get.
- **drop** Don’t give them an easy way to say no.
- **drop** Don’t rehearse it more than once.

### 3. If I **tell someone I’m struggling**
- **do** Say one thing out loud that you’d normally only think.
- **do** Tell one person the part you’d usually leave out.
- **drop** Don’t ask if it was too much afterwards.
- **drop** Don’t change the subject to them.

### 4. If I **hand something over before it’s perfect**
- **do** Hand it over at the point you’d normally start polishing.
- **do** Give it to one person today without a covering note.
- **drop** Don’t apologise for the state of it.
- **drop** Don’t list what you already know is wrong with it.

### 5. If I **send it without reading it again**
- **do** Send one message today straight after the last full stop.
- **do** Reply to one thing in one draft.
- **drop** Don’t read it back in the sent folder.
- **drop** Don’t ask anybody to look at it first.

### 6. If I **don’t answer a message straight away**
- **do** Answer one message tomorrow instead of tonight.
- **do** Let one message wait while you finish what you were doing.
- **drop** Don’t send a holding message to buy time.
- **drop** Don’t make the reply longer to make up for it.

### 7. If I **sit still with the restlessness**
- **do** When it comes, stay in the chair and write down the time.
- **do** Wait it out once today without changing anything.
- **drop** Don’t reach for something to look at.
- **drop** Don’t give yourself a job to make it bearable.

*Reviewer: this is the start closest to an interoceptive exposure. Nothing here names a body
sensation and nothing instructs anybody to bring one on — it’s about not acting on an urge. Say
if that line is thinner than we think.*

### 8. If I **rest while there’s still stuff to do**
- **do** Stop at six today, with the list unfinished.
- **do** Take the break before the work is at a tidy point.
- **drop** Don’t earn it first.
- **drop** Don’t tell anyone what you got done before you stopped.

### 9. If I **go an evening without my phone**
- **do** Go out for the evening and leave it at home once.
- **do** Hand it to somebody else until the morning.
- **drop** Don’t leave it face down on the table instead.
- **drop** Don’t set up a way to be reached “just in case”.

*Reviewer: the second drop is the real safety behaviour and also the one that could matter for
somebody who is a carer, or on call. Worth your eye.*

### 10. If I **say what I actually think**
- **do** Give your actual opinion the first time you’re asked today.
- **do** Say the unpopular half of what you think, once.
- **drop** Don’t start with “this is probably just me”.
- **drop** Don’t take it back if the room goes quiet.

### 11. If I **don’t get the last word**
- **do** Let somebody else close one conversation today.
- **do** Leave one thing unanswered that you could answer.
- **drop** Don’t draft the reply you aren’t going to send.
- **drop** Don’t tell somebody else your side of it.

### 12. If I **let somebody see I got it wrong**
- **do** Tell one person about a mistake they hadn’t noticed.
- **do** Correct yourself out loud in front of somebody today.
- **drop** Don’t say how tired or busy you were.
- **drop** Don’t make up for it with something else the same day.

### 13. If I **don’t rush to be early**
- **do** Set off at the time you worked out, not ten minutes before.
- **do** Arrive at the time you said you would, once.
- **drop** Don’t check the journey time again before you go.
- **drop** Don’t build in a spare fifteen minutes at the other end.

### 14. If I **say something good about somebody**
- **do** Say the compliment you’d normally think and not say.
- **do** Tell somebody today why their work made a difference.
- **drop** Don’t make it lighter by exaggerating it.
- **drop** Don’t move straight on to something else.

### 15. If I **ask somebody for help**
- **do** Ask before you’ve tried everything yourself.
- **do** Ask one person to take one job off you today.
- **drop** Don’t promise to make it up to them.
- **drop** Don’t say you’d have managed anyway.

### 16. If I **stop before it’s finished**
- **do** Put it down in the middle of a sentence today.
- **do** Set an alarm and stop when it goes, wherever you are.
- **drop** Don’t finish the bit you’re on.
- **drop** Don’t plan when you’ll pick it back up.

### 17. If I **go to something on my own**
- **do** Turn up somewhere today without telling anybody you’re coming.
- **do** Sit down on your own rather than looking for someone you know.
- **drop** Don’t arrive late enough to slip in.
- **drop** Don’t stand where you can watch the door.

### 18. If I **leave early and say plainly that I’m going**
- **do** Tell the person nearest you that you’re leaving, and leave.
- **do** Go at the time you wanted to go, not when it thins out.
- **drop** Don’t wait for somebody else to leave first.
- **drop** Don’t promise to come to the next one.

### 19. *(see §3 — nothing proposed)*

### 20. If I **let a message sit unread**
- **do** Leave one thread unopened for a whole day.
- **do** Let the notification sit there while you carry on.
- **drop** Don’t guess who it’s from.
- **drop** Don’t clear the other notifications to feel on top of it.

### 21. If I **get through it without apologising**
- **do** Ask your question today without apologising first.
- **do** Take up somebody’s time once without saying sorry for it.
- **drop** Don’t swap “sorry” for “just”.
- **drop** Don’t make your voice smaller instead.

---

## 3. Start #19, and why nothing is proposed for it

**Start #19 is *“don’t check it a second time”*, and one of its two existing `dos` is *“Lock up
once, and walk away.”***

We are not adding to it. We think it should come out of the app, and that is the founder’s call
and the reviewer’s, not ours.

**The reasoning.** Rule 4 forbids BETR from proposing a checking ritual. Start #19 is a
checking ritual — it is the whole start, not an unlucky phrase in it. Its predictions are
*I’ll have missed something · it’ll be wrong and I won’t know · I won’t settle until I’ve
looked*, which is response prevention, and response prevention for compulsive checking is a
treatment delivered with a clinician, not a suggestion chip in an app that says in its own
frozen wording that it is not for OCD.

**It matters that no automatic check catches this.** The `HABIT` and `BODY` word lists in
`guards.js` contain no word that appears in start #19, so 206 passing tests have never had an
opinion about it. B34 §6 found it by reading; the model’s failure on the hob sentence was the
same hole from the other side, four hours later. Two independent findings, one gap.

**And it is the honest answer to the founder’s question.** Would a better model have avoided
the hob failure? Probably. Would that have settled anything? No — because the same mistake is
already sitting in BETR’s own hand-written content, written by people, and it survived every
test in the repo. The problem was never which model wrote it. It is that nothing in the system
can tell a good behavioural experiment from a harmful one, so **everything of this kind needs a
person to read it before it ships** — which is exactly what this file is asking for.

---

## 4. What we declined to write, and the rule that decided it

The five-sentence experiment produced three failure shapes besides the hob one. All three are
easy to write by accident, so here is the test that catches them.

**A `drop` has to be a behaviour you could film.**

That single rule does a lot of work:

- **“Don’t imagine your boss will think you’re lazy.”** Fails. You cannot film not-imagining,
  the person cannot tell whether they did it, and telling somebody not to think a thought
  reliably produces the thought. It also quietly makes the test unfalsifiable: if the day goes
  badly, they conclude they did it wrong.
- **“Note your boss’s response.”** and **“Observe reactions.”** Fail as `dos`, and this is the
  subtle one — they *sound* like data-gathering, which is what a behavioural experiment is
  for. But watching closely for how it landed is the safety behaviour itself. If they appear
  anywhere, they belong in `drops` as things to leave out. The earlier model put them in `dos`,
  and a reader without the training would not have blinked.
- **Anything naming the habit, food, weight, or a body sensation.** Caught by the word lists in
  `guards.js`, and nothing above trips them — but the lists are shallow, and a sentence can
  describe a thing without using its noun. That one is still a human’s job too.

**The general point for whoever reads this next.** The line between a test and a compulsion is
not in the vocabulary. It is in what the behaviour is *for*, and no word list, no test in this
repo, and no model reaches that. It is why this file is a proposal and not a commit.

---

## 5. The three held-out blind spots, turned on these 91 lines

Added 2026-09-08, after a parallel session (B35 round 4) measured a dedicated safety gate at
**80/80 on sentences it had been shown and 21/30 on sentences it had not**. Three dangerous
sentences got through **consistently, 0/3 each** — not a wobble, a blind spot:

| Sentence the gate allowed | What it actually is |
| --- | --- |
| *If I walk home past the bridge…* | safety, wearing the clothes of an ordinary walk |
| *If I come off the sleeping tablets…* | medication, wearing the clothes of an ordinary decision |
| *If I stop messaging her to check she’s not angry…* | a reassurance ritual, wearing the clothes of an ordinary social test |

**The shape all three share: the dangerous half is in the *If*, and the sentence reads as
ordinary social language.** Those are a person’s own sentences, not BETR’s — but the same shape
can appear in what BETR proposes, so all 91 lines were checked against each.

**Two of the three are clean, and one is not.**

- **Safety in ordinary clothes — nothing.** No line sends anybody anywhere, names a place, or
  proposes being somewhere alone.
- **Medication — nothing.** Worth saying plainly, though: **`guards.js` has no medication word
  list at all.** Not HABIT, not BODY, not HARM. Nothing in this file trips it because nothing
  in this file goes near it, but neither would anything else. That is a gap the parallel
  session’s round 4 exposed from the other side, and it belongs on somebody’s list.
- **Reassurance and response prevention — five lines, and this is the real finding.**

### The five, and why four are different from the fifth

| Line | Where it sits |
| --- | --- |
| Don’t check afterwards whether they minded. | start #1, *say no without giving a reason* |
| Don’t ask if it was too much afterwards. | start #3, *tell someone I’m struggling* |
| Don’t ask anybody to look at it first. | start #5, *send it without reading it again* |
| Don’t check the journey time again before you go. | start #13, *don’t rush to be early* |
| **Don’t check afterwards how it landed.** | **`general.drops` — everybody, every sentence** |

**The four are bounded and we would keep them.** Each sits under a start whose *If* is an
ordinary social or practical act, and dropping reassurance-seeking is the correct move in a
behavioural experiment — it is what separates a test from a day. The context does the work the
word list cannot.

**The fifth has no context, and that is exactly the problem.** `general.drops` is shown to
every person on the main road whatever they typed. For somebody testing an ordinary social
worry it is a good line. For somebody whose checking is compulsive it is **response
prevention**, delivered by an app that says in its own frozen wording that it is not for OCD,
with no clinician in the room and no way for BETR to know which of the two people is reading
it.

**That is start #19’s problem with the walls taken away**, and it is the same failure the gate
made on *“stop messaging her to check she’s not angry”* — reassurance-seeking reads as ordinary
social language right up until it isn’t.

**Our recommendation, and it is the reviewer’s to overrule:** cut *“Don’t check afterwards how
it landed”* from the general set, and — on a second reader’s argument, which we accept — cut
*“Don’t warn anybody that it’s coming”* with it. That leaves four generic drops, which is
enough, and it means **no unbounded line in BETR asks anybody to stop checking or to keep a
plan to themselves.** Keep the four bounded ones under their starts.

**The general point, which is the same one §4 reached from the other direction.** Whether a
line is a test or a compulsion is not in its vocabulary and not in its wording — it is in who
is reading it. A generic suggestion cannot know that. So the further a line is from a specific
*If*, the more carefully it has to be written, which is the opposite of how generic content
usually gets treated.

---

## What happens next

1. The reviewer marks up §1, §2 and §3.
2. B36 (the 125% overflow) is fixed first if §1 is adopted, because it adds chips to that screen.
3. Whatever survives goes into `web/content/worries.js` in a task of its own — `starts.js`
   was merged into it on 2026-09-10 (B45 §5c), so a surviving line now becomes part of a
   worry, or a worry of its own — with `content.test.js` run against it and the loop walked
   on a phone at both text sizes.
4. Nothing here reaches a person before all three.

**Already checked twice, so nobody repeats it.** All 91 lines were run against the `HABIT`,
`BODY` and `HARM` word lists in `web/lib/guards.js` — no hits — against the seven phrases that
may never appear, and against the shape rules `content.test.js` applies: capital, full stop, no
doubled spaces, no duplicates, every `drop` opening *Don’t*. A second session repeated the whole
check independently on the committed file and found the mechanics sound. **That says nothing
about whether these are clinically right, which is the entire reason this file needs you.**

**The apostrophes are converted.** This file now uses `’` throughout, as `web/content/` does.
60 of the 91 lines were drafted with the typewriter `’`, which was invisible until it was
looked for — a screen mixing the two does not read as a typo, it reads as two apps at once.
`content.test.js` now **fails the build** on a straight quote in any content file, so this
cannot ship wrong; the person it really protects is the founder, who edits those files in a
github.com textarea on a keyboard that types `’`.
