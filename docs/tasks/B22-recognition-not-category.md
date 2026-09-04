# B22: Recognition, not category — the rule the other five tasks answer to

**Status:** **Step 1 done, and three of the five decisions taken and shipped, 2026-09-04.**
**Two are still out: door one's four nouns (Misha's casting vote, B23) and the word *diagnosis*
on the doors footer (wants a second opinion on the legal point first)**
**Confidence:** 9/10 that the pattern is real, because it is the same pattern B19 found by
watching two people. 5/10 on any individual rewrite, because nobody outside this building has
read a word
**Date opened:** 2026-09-04 · **Founder's ask, same day, after reading the walks**
**Depends on:** `docs/journeys-observed.md`. **Governs B23, B24, B25, B26, B27, B28**

## The founder's sentence, and why it is the whole task

> *"I like that they saw themselves and were like 'oh yeah, that's totally me', that's a big
> deal."*

It is. And the walks show it is not luck — it happens in exactly one shape and fails in exactly
one other, every single time.

## What happened, at every single moment that worked

| Where | What it said | What they thought |
| --- | --- | --- |
| Door six | *"Nothing you hand over is quite finished either."* | "That's me. That's actually me." |
| The plan, Marcus | *"Don't hold a glass as cover."* | "Christ. That's exactly what I do." |
| The plan, Dan | *"Don't finish it with 'but I'm fine'."* | "How do they know I do that." |
| Front screen | *"You've played it out a hundred times."* | "Every night. And it's never once happened." |
| B20's screen | *"Pick the one that would sting."* | All three chose instantly, no re-reading |

**Every one of them describes the inside of a moment.** None of them names a kind of person.
Not one uses a word you would find in a diagnosis, a category, or a subreddit name.

## And at every single moment that nearly lost somebody

| Where | What it said | What they thought |
| --- | --- | --- |
| Door one | *"drink, weed, porn, betting"* | Priya: "Is this a recovery app? That's not me at all." |
| Door one's note | *"If you're dependent on alcohol or drugs"* | Marcus: "Am I? I don't think I am. I don't know." |
| Help, screen one | *"If you are in danger or in crisis"* | Dan: "I asked what this is and it's opened with a suicide line." |

**Every one of them names a category.** And a category asks the reader a question about their
identity — *am I one of those?* — which is the exact question this audience has spent years
answering defensively. A description asks *is that me?*, which they answer in half a second and
without shame.

## The rule

> **Describe the inside of the moment. Never name the kind of person.**
>
> A person recognises a feeling instantly and a category never. If a sentence would let somebody
> answer *"that's not me"* on the strength of a **word** rather than the strength of the
> **experience**, it is the wrong sentence.

**This is not a new idea in the repo, it is the old one generalised.** B19 found it by watching
two people fail on a flat list and succeed on a door, and wrote it down as a fact about doors.
It is not about doors. It is about every sentence in the app.

**It is also the evidence's own answer to shame.** Research §4.3: shame-proneness predicts
substance problems, guilt-proneness protects, and Gilbert's whole reason for inventing
compassion-focused therapy is that people can grasp a judgement logically and feel no different.
A category is a judgement with no evidence attached. A description is not a judgement at all.

## Where the rule and the law disagree, and who wins

Some categories are **required** and stay exactly as they are:

- **Frozen sentence 4** names psychosis, bipolar, eating disorders, PTSD, OCD and dependency.
  It is frozen (research §10) and Apple and Google both want something like it. **It does not
  move and it is not softened.**
- **The crisis block** names crisis. B17 put it first for a reason that is still right.
- **Door one's note** is frozen sentence 4's language arriving at the one moment it is relevant
  (founder's call, B19, option c).

**The rule does not overrule any of those.** What it does is tell us *where* they belong: a
required category belongs where somebody who needs it will find it, not where somebody browsing
meets it first. That distinction is the whole of B23 and B26.

## What this task actually produces

**A pass over every sentence a person reads, sorted into three piles.** No rewriting until the
piles are agreed, because the founder and Misha own the words.

1. **Describes the inside** — leave alone, and use as the model for anything rewritten.
2. **Names a category, and has to** — legal, safety or frozen. Question is only *where it sits*.
3. **Names a category, and doesn't have to** — the pile the work is in.

Pile 3, from the walks so far, opened with three entries and there will be more:
`whats-going-on.js` door one's `under` line · `pick.notHere` ("the drink, the screen or the
habit itself") · `doors.foot` ("None of these is a diagnosis, and BETR never decides which one
you are" — a sentence that names *diagnosis* to a person who had not thought of one).

**Also in scope: the weight of the first impression.** Dan scrolled 4,112px of Help, most of it
heavy words, to find one number. Nothing there is wrong. All of it arrives at once.

## What this task may not do

- **It may not rewrite anything on its own.** It sorts and proposes; the founder and Misha
  choose. `docs/changing-the-words.md` stays true, so they can also just change it themselves.
- **It may not soften a frozen sentence, a crisis line or a store requirement.** Those are pile
  2 forever.
- **It may not turn a description into a diagnosis by accident.** Scope §5.3a: a door naming a
  behaviour is already the closest thing here to the regulatory line. More description is
  allowed; more *category* is what would cross it.
- **It may not add a screen.** Rule 10.

## Plan

1. Print every string a person reads (`docs/COPY.md` is generated for exactly this) and sort it
   into the three piles. One table, founder-readable.
2. Bring pile 3 to the founder and Misha with a proposed replacement beside each, in the voice
   of the five sentences in the table above.
3. Only then, the rewrites — and `loop.test.js` gains a test per changed string, because a
   sentence with a reason has to be held down.

---

## Step 1, done 2026-09-04 — what the sort found

**The sort is `docs/three-piles.md`**, written for the founder and Misha. It covers **all 487
sentences a person can read** — 180 in `strings-en.js` (including the frozen ten and everything
a screen reader says), 210 in `worries.js`, 15 in `whats-going-on.js`, 42 in `why.js`, 40 in
`places.js`. Verified against a freshly generated `docs/COPY.md`; nothing had drifted.

| Pile | Count |
| --- | --- |
| 1 — describes the inside | 465 |
| 2 — names a category, and has to | 17 |
| 3 — names a category, and doesn't have to | **5** |

Pile 1 is defined by subtraction and the count is checkable: 487 − 17 − 5.

### Pile 3 — the three the task predicted, and two it did not

1. **Door one's `under`** — and the finding that sharpens B23: **it is four nouns, not the
   line.** The label is a description and one of the best on the screen; the safety note is pile
   2. What Priya bounced off is *"drink, weed, porn, betting"* in the middle of `under`. Cut them
   and the sentence still describes the same moment. **Still B23's call, still Misha's casting
   vote** — the same four words are why Dan and Marcus found themselves in half a second.
2. **`pick.notHere`** — on the screen every person reaches, whichever door they came through.
   Proposal keeps the boundary and drops the three nouns.
3. **`doors.foot`'s second half** — and a fact worth having before it moves: the disclaimer
   Google Play requires is **frozen sentence 1**, which lives in Help, and MHRA is explicit that
   a general disclaimer is not what protects a product anyway (research §5.2). So this line is an
   extra, not a requirement. **Flagged in the doc as wanting a second opinion; not a lawyer.**

**New, and the more interesting of the two:**

4. **`worries.js` `rest`, the card sentence — *"then I'm being lazy"*.** It names a kind of
   person, and it is a **verdict rather than a prediction** — the exact thing `refusal.verdict`
   refuses when a person types one. Priya was refused for *"I'm not as good at this as they think
   I am"* and took it well; a stranger reading the worry list meets BETR doing the thing it tells
   them off for. Nothing breaks either way — it is the loose card sentence and is never itself
   tested, and the three predictions under it are all proper predictions. **On the record:
   already softened once, from "I'm worthless" (scope §5.3), so this is a second look at a
   sentence somebody has thought about.**
5. **`refusal.habit`'s "the crutch"** — BETR putting a judging word on the person's thing at the
   moment it has just said no. Smallest of the five.

### What the sort deliberately did not treat as a problem

- **Hard words are a different problem, and not a big one.** CBT, "behavioural experiment",
  safety behaviour. They name a **method**, not a kind of person, and nobody in the walks bounced
  off one. The rule does not reach them. Saying so is part of the deliverable: without it the
  next session softens Help's primer for no reason.
- **`own.belief.only` and `refusal.body`** name **topics** (the weather, the body, food, weight)
  rather than people, which is why neither stings. Filed pile 2, with the reason written down.
- **A person's own prediction may name a kind of person** — *"then I become a burden to them"*,
  *"then people will think I'm selfish"*. Those are predictions about somebody else's reaction,
  disconfirmable, and chosen by the reader rather than applied to them. They stay in pile 1.
  `rest`'s card sentence fails precisely because it is neither chosen nor disconfirmable.
- **The weight of Help** (B26) and **the door order** (B23) are placement, not wording.

### One finding for whoever writes the next promise line

Dan's reaction to *"No account, no AI, nothing leaves your phone"* was *"everyone says that."*
What kept him was the small print admitting TrybeUP's own paywall — *"nobody does that."*
**The promise did not win the sceptic; the admission did.** Recorded in `three-piles.md` for
B25 and B26.

## Steps 2 and 3 — three of five taken, 2026-09-04

The founder read the five proposals and took the three that are theirs alone. All three shipped
the same afternoon, each walked on screen with `tools/walk.js` before it was committed.

| # | The sentence | Decision | Now reads |
| --- | --- | --- | --- |
| 2 | `pick.notHere`, the line under every worry list | **Changed** | *"Nothing here tests the thing itself, only what you expect to happen without it. That's the worry underneath, and that's what we test."* |
| 4 | `rest`'s card sentence | **Changed** | *"If I rest before everything's done, then I'll pay for it."* |
| 5 | `refusal.habit`'s closing clause | **Changed** | *"...Try one about what people will think, or about what happens when you go without it."* |
| 1 | Door one's four nouns | **Open** | Misha's casting vote — **B23** |
| 3 | *diagnosis* on the doors footer | **Open** | Wants a second opinion on the legal point |

**Nothing in the codebase moved except those three strings.** The boundary each one draws is
unchanged: `pick.notHere` still says the thing itself is not what gets tested, and
`guards.checkTest` still refuses a habit test with the same words in a different tail. No test
was added for these three — each is a sentence rather than a rule, and `docs/changing-the-words.md`
is how they get changed again.

**What did not change, and why it is worth saying:** `rest`'s three predictions underneath are
untouched. The card sentence is never itself tested, so this was the one pile-3 entry with no
mechanical consequence at all.

**Confidence: 8/10.** High on the sort itself — the piles are small, the boundary is checkable,
and every entry has the walk that produced it written next to it. The 2 is that **three
characters written by the author of the app are still the only evidence**, so pile 3 may be
missing an entry that only a stranger would feel, and any individual proposed sentence is
untested prose. Nothing was changed in the app, so being wrong here costs a conversation, not a
release. 173 tests still pass.
