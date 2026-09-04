# B22: Recognition, not category — the rule the other five tasks answer to

**Status:** **Open — written 2026-09-04 from the three observed walks. Nothing built**
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
