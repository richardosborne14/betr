# B36: *Le guide de prise en main* — telling somebody what is expected, and how small it can be

**Status:** **PROPOSAL. Nothing built.** Six items below, ranked, each costed. Items 1–3 are the
proposal proper; 4 is small and independent; 5 and 6 are decisions, not builds.
**Confidence:** 8/10 in the diagnosis — it is one walk, but every one of the three failures is
visible in the code without her, and two are provable in one grep. 6/10 in the shape of the fix,
which is where the founder, Misha and the CBT reviewer come in.
**Date opened:** 2026-09-08 · **Founder's ask**, after watching their eldest daughter build a
test and leave at the doing step.
**Research:** [`../research/12-guiding-the-first-test.md`](../research/12-guiding-the-first-test.md),
written the same day. Every claim below is sourced there.
**Depends on:** nothing. Item 1 could ship on its own tomorrow.

---

## 1. What happened

The founder's account, kept because it is the whole task:

> We did the initial *If … then …* screen and her first thought was **"If I'm always blaming
> myself for mistakes, I'll not feel good"** … I explained a bit and she came up with **"If I
> criticise my best friend, she'll not talk to me for the day"** which was awesome. Then we hit
> the *what will you do* screen, and this is still where she had no idea what she was expected
> to write. I explained she could try something like *"I'll give my best friend one small
> criticism tomorrow"* … her next reaction was:
>
> **"OH NO I can't actually give her a criticism, she'll not talk to me for the day"** — and she
> immediately disengaged.
>
> This was a fabulous reaction. If someone is at 10 on the scale of belief, and they believe
> something negative will happen when they try the test, that's absolutely the normal visceral
> reaction to have … Now where a CBT professional would have helped is to say something like
> "Well why don't you plan to give her a really banal criticism, that might annoy her a bit but
> wouldn't switch her off for the whole day". So the *start small* recommendation from our list,
> but actually **explained and suggested**.

Three failures, not one, and they are at three different moments.

**1a. The first sentence was wrong and nothing said so.** "If I'm always blaming myself for
mistakes, I'll not feel good" is a state rather than an action, and predicts a feeling nobody
else can see. It passed every guard. That is verifiable: `checkBelief()` in `lib/guards.js`
refuses "I am / I'm / I never" **only when the sentence has no "if" in it**, and the build
screen *prints* "If I" either side of the blank, so the conditional test is always true from
this road. The file's own comment already says so — *"`verdict` is [unreachable] too … from
this road"*. A person had to be her therapist.

**1b. The doing step teaches nothing, and our own worked example skips it.** Every entry in
`content/examples.js` is `prediction` → `happened`. **There is no `did`.** The one screen BETR
uses to show rather than tell jumps over the exact beat she got stuck on. She typed her own
sentence, so on the do screen she got the `general` chips — *"Do it once today, in the smallest
version that still counts"* and *"Pick the version of it you could do in the next hour"* — both
of which are instructions about a thing she does not yet have.

**1c. When she understood, the test she pictured was the biggest possible one, and BETR's whole
answer to that is four words.** `build.doSub` says *"One thing, today. Small and entirely up to
you."* The word doing the work is "small", and nothing anywhere says what smaller means, how you
make one, or that a smaller one still counts.

**And a fourth, underneath all of them.** `content/why.js` — twenty-one entries explaining
exactly why leaving the safety behaviour out is the point, and the best writing in the app — was
invisible to her twice over: it is keyed to a **stock worry id** and she wrote her own, and it
only appears **after a result**, which is after the moment she left.

---

## 2. The one sentence the whole task turns on

From the research, and it is the reconciliation of two findings that pull opposite ways:

> **The right first test is the smallest version that could still turn out wrong.**

- Too big and it does not happen, and worse, a first attempt that goes badly is expensive:
  over-predictions of fear come down slowly over many disconfirmations, but **one
  worse-than-expected episode drives the next prediction sharply up** (Rachman; research §4.2).
- Too small and nothing is tested: Craske's inhibitory-learning work says the useful mechanism
  is **expectancy violation**, so a step nothing could contradict teaches nothing (research §4.1).

BETR already half-says this — *"the smallest version that **still counts**"*. The load-bearing
words are the last two, and nothing explains them. **Every string written for this task has to
carry both halves or it will teach the wrong lesson.**

---

## 3. The proposal, ranked

### Item 1 — the worked example shows what they *did*. **Do this one first.**

`content/examples.js` gains one field, `did`, and optionally `dropped`. The front screen becomes
four beats instead of three: the sentence, **what they actually did**, what happened, the ladder.

```
    prediction: 'If I tell my dad I’m struggling, then he’ll change the subject.'
    did:        'Told him one true sentence about my week.'
    dropped:    'Didn’t finish it with “but I’m fine”.'
    happened:   'He went quiet. Then he said “Me too.”'
    from: 10 · to: 6
```

That is the entire lesson, taught by demonstration rather than instruction: **the doing was one
sentence, not a confession.** A novice reads it and knows what size the thing is. This is the
worked-example effect, which is the best-evidenced item here and the only one that costs almost
nothing (research §5). It also has the expertise-reversal caveat built in: the founder can skip
the screen, because it is the front screen and there is a big button under it.

- **Cost:** one content field on four entries, one line of markup, one a11y string, tests,
  `tools/copy-sheet.js` regenerated. **Half a day.**
- **Risk, and it is real:** the front screen is at the fold already — 785px at 100%, 780px at
  125% (NEXT-SESSION). `did` must be one short line and it has to be measured on the walker at
  both zooms before it is called done.
- **Whose call:** the four `did` and `dropped` lines are content and go to the CBT reviewer and
  to Misha with everything else. The *structure* is not a decision, it is a hole.

### Item 2 — **"Too big? Make it smaller"**, one new screen, opened by a link on the do screen

A plain text link under the `do` box. **Always there, never triggered by anything** — that is the
regulatory line and it is not negotiable (research §6): the moment a screen appears *because of*
what somebody typed or rated, BETR is choosing, and it is rule 2 and a medical device.

The screen, written fresh — CCI's stepladder module is the **method**, and rule 8 means not one
of its sentences (research §3). Draft, for the reviewer to cut up:

> **Too big? Make it smaller**
>
> If you just thought "I can't actually do that" — that's the sentence at the top, said out
> loud. It is the thing being tested. It isn't a sign you've picked the wrong one.
>
> The one to start with is **the smallest version that could still turn out wrong**. Smaller
> than that and nothing can surprise you, and being surprised is the only part that does
> anything.
>
> You don't water it down. You turn one of these:
>
> - **Who it's with.** Somebody it would matter less with.
> - **How big a thing it is.** The smallest true version of it.
> - **How long it goes on.** One sentence, then move on to something else.
> - **When and where.** A moment you pick, not one that catches you.
> - **How many people are there.**
>
> A smaller one still counts. Doing something once and getting away with it is easy to put down
> to luck — that's what tomorrow is for.

And under it, one worked shrink, which is item 1's trick applied again:

> "If I say no without giving a reason, then they'll be off with me for weeks."
>
> - Too big — Say no to the next big favour anybody asks.
> - Smaller — Say no to one small thing, to somebody you're not worried about losing.
> - **Small enough, still counts** — Say no to one small thing today, in one sentence, and
>   don't explain.

- **Cost:** one screen, one string block, one link, a11y, `loop.test.js` and `i18n.test.js`.
  **About a day.**
- **Watch:** it must not become a fourth door (rule 10) — it is a link inside a screen. And
  nothing on it may name the habit, food, weight, the body or anyone's safety: this is BETR
  proposing, and rule 4 did not loosen for BETR (only for a person's own text).

### Item 3 — **"Why it's written like this"**, one new screen, link on the build screen

The founder's *guide de prise en main*, and it is short — five questions, in the order a person
meets them. It is also the fix for `why.js` being unreachable to somebody who wrote their own:
this one is keyed to nothing, so everybody can reach it, forever.

> **Why "If I"** — because it has to be something you'd *do*, on a day. There is no day on which
> you either did or didn't *be* a certain kind of person, so there's nothing to find out. "If I
> ___" gives you a Tuesday, and an answer by Tuesday night.
>
> **Why it needs a "then"** — because somebody standing there would have to be able to see it
> happen. "Then I'll feel awful" can't be settled by anything; you'll feel however you feel.
> "Then she won't talk to me for the day" can.
>
> **Why you write it before** — so that afterwards you can't quietly move it. Everybody moves
> it. Written down first, it either happened or it didn't.
>
> **Why you leave something out** — the bit you always do, the reason, the joke, the "but I'm
> fine", is the bit that gets the credit when it goes fine. Leave it out once and whatever
> happens is about the thing itself.
>
> **Why you start small** — [the same sentence as item 2, said once, in one place].

Reachable from the build screen and from Help. The existing `why.foot` line goes underneath it
unchanged — *this is general, it is not about you, BETR cannot see anything you have written.*

- **Cost:** one screen, one string block, two links, tests. **About a day**, and it shares
  scaffolding with item 2 — built together they are not two days.
- **Whose call:** the founder on whether five questions is too much on a screen a person meets
  before they have written anything. **Assessment: it is a link, not a wall, and a link nobody
  taps costs nothing.** The alternative — putting one line under each blank — was considered and
  rejected: the build screen already clips at 125% zoom.

### Item 4 — two nudges, not refusals, for the two shapes she wrote

Same mechanism as the grammar nudge the founder approved on 2026-09-04: **ask once, show the
shape, and let the person's own words through on the next tap.** Never a refusal — B29 loosened
this box on purpose and this must not quietly tighten it.

| She wrote | The nudge |
| --- | --- |
| an *If* that is a state — "I'm always blaming myself", "I keep…", "I always…" | "That's how things are, rather than something you'd do. What would you actually do differently, once, this week? Or keep yours as it is." |
| a *then* that is her own feeling — "I'll not feel good", "I'll feel awful", "it'll be horrible" | "That one's only visible to you. What would somebody else have noticed? Or keep yours as it is." |

- **Keep the word lists tiny and first-person.** `/^(i'?m|i am|i keep|i always|i never)\b/` on the
  If, and `/\bi'?ll (feel|be)\b/` on the then. A miss costs nothing — it is a nudge — and a false
  positive costs one extra tap. **This is deliberately not the kind of word list that failed the
  offline safety-gate test**, because nothing here refuses anything.
- **Cost:** half a day in `guards.js`, two strings, tests.
- **Note for `NEXT-SESSION`:** this is the third word list in `guards.js` and there is still no
  medication list. Different task, still nobody's.

### Item 5 — when and where. **Not now.**

Both the clinical source and the psychology point the same way: an appointment with yourself —
day, time, place — is what turns an intention into something that happens (CCI; Gollwitzer &
Sheeran, d = 0.65 across 94 studies). BETR's `do` box asks for none of the three.

**Recommendation: do not build it yet.** The do screen already clips its own text at 125% zoom
and pushes *Lock it in* under the menu — a known, pre-existing bug. Adding a field to that
screen makes a real bug worse to chase a real improvement. **Fix the fold first, then revisit.**
In the meantime item 2's "when and where" dial carries the idea for free.

### Item 6 — should a half-written test survive? **Founder's decision.**

`go()` in `app.js` throws away an unlocked draft on the way out of the loop, and the comment
says why: *"nothing you promised yourself is ever quietly replaced by the next thing you tap"*
(B8). That is right for a **promise**. Her session says it may be wrong for a **sentence**: it
took two people ten minutes to arrive at "If I criticise my best friend, she'll not talk to me
for the day", and it was gone the moment she closed the tab.

- **Option a — leave it.** Simple, and the B8 reasoning stands.
- **Option b — keep the two blanks only** (not the do, not the drop, nothing locked, no card in
  *Your tests*, no notification, no mention of it anywhere), so that reopening the build screen
  finds the sentence still in the boxes. No streak, no nag, no "you left something" — rule 5 is
  untouched because nothing is counted and nothing is owed.
- **Assessment: b, narrowly.** But it changes a decision the founder made deliberately, so it is
  theirs, and it should not be smuggled in with item 1.

---

## 4. Her session, re-walked, if items 1–4 ship

1. **Front screen.** She reads a whole test including *what they did* — "Told him one true
   sentence about my week." She now knows the doing is small before she is asked for one.
2. **Build screen.** She writes "If I'm always blaming myself for mistakes, I'll not feel good".
   BETR asks once, twice, kindly, and offers to keep hers. She gets to "If I criticise my best
   friend, she'll not talk to me for the day" **without her father**. (Or she keeps hers, which
   is allowed and is the point of B29.)
3. **Under the blanks**, a link: *Why it's written like this*. She may not tap it. It is there
   for the fifth minute, not the first.
4. **Do screen.** She thinks "I can't actually do that". Under the box: *Too big? Make it
   smaller.* The screen opens with her exact thought written down as the thing being tested —
   which is the single most important sentence in this task — and then hands her the dials.
5. She turns one: **who it's with**, or **how big a thing**. She writes "Tell my brother his
   playlist is terrible, once, and don't laugh it off." Locks it in.
6. It is now a real behavioural experiment, she designed it, and BETR chose nothing.

**Step 4 is the whole task.** Everything else is making it likely she reaches step 4 knowing
what step 4 is.

---

## 5. What this does not do, and should not

- **It does not offer her a smaller step.** It teaches her how to make one. That distinction is
  the medical-device line, not a style choice (research §6).
- **It does not adapt.** Same words, same order, for everybody, forever. Nothing on any of these
  screens may read what she typed, her ladder, her history, or how many tests she has done.
- **It does not become a course.** Two screens, both behind links, both skippable. The founder's
  own bar from B28 stands: a handful of words, no long text, no link to go and learn.
- **It does not un-freeze anything.** No frozen sentence changes. The purpose statement does
  not change.

---

## 6. Open, and whose

| | Who | What |
| --- | --- | --- |
| a | **Founder** | Items 1–4: yes, some, or none. Item 6 is a straight decision. |
| b | **Founder** | Whether item 3's five questions is one too many for a screen met that early. |
| c | **Misha** | Tone on every string here, and one thing specifically: whether *"Too big? Make it smaller"* reads as helpful or as being managed. |
| d | **CBT reviewer** | All of it, and it should go in the same envelope as `docs/suggestions-review.csv` rather than as a second ask. Specifically: is *"the smallest version that could still turn out wrong"* a safe thing to hand somebody with no clinician, and are the five dials the right five? |
| e | **Nobody yet** | The fold bug that blocks item 5, and the medication word list. |
