# B51: the second question, and the mistake worth posting

**Status:** **OPEN — specified, not built.** Nothing in `web/` has changed.
**Date opened:** 2026-09-10 · **The founder's ask**, in their own words, after doing a test of
their own: *"What if that's actually true, because my app is rubbish? … it's definitely a hole
in our method."* And, on reading the diagnosis: *"as a user, even as someone who knows CBT, I
fell into a trap of not saying the whole truth about how it'll make me FEEL if that event
happens."*
**Depends on:** nothing. **Touches:** [`B28`](B28-present-practice-produce.md) /
[`B31`](B31-the-front-screen.md) (the plan screen), [`B20`](B20-three-worries-under-one.md) (the
60 hand-written expectations), [`B7`](B7-distribution-and-the-ad.md) and
[`posting-on-social.md`](../posting-on-social.md) (§8 below).
**Confidence in the diagnosis: 9/10. In the wording: not yet mine to have — see §9.**

---

## 1. What happened

The founder wrote their own test on the front screen:

> *If I post my app on social media, then people will say it's rubbish.*

Then asked the question the loop cannot answer: **what if it's true?** People say it's rubbish,
the prediction is confirmed, the ladder goes *up* a rung ([`rate.js`](../../web/lib/rate.js),
`more`, step 1, quiet) — and the app says nothing at all. Rule 6 holds (a bad outcome is data)
but nothing is *learned* from it. **The loop ends on a shrug at the one outcome that costs the
most.**

That cost is not a guess. It is already in our own research —
[`research/12`](../research/12-guiding-the-first-test.md) §4.2, Rachman's match–mismatch: large
reductions in over-prediction need many episodes of disconfirmation, while **one episode that
turns out worse than predicted drives the next prediction dramatically up.**

## 2. The finding: the field is there, and it asks nothing

There is already a second field. It is called `x`, it is labelled **What you expect**, and on the
plan screen it is read-only prose with a *Not quite? Change it* button beside it
([`app.js:2532`](../../web/app.js#L2532)).

**On the road the founder took, that field is their own sentence echoed back.**

[`app.js:2383`](../../web/app.js#L2383):

```js
x: same ? upperFirst(saidIn(same.expect)) : guards.expectationFrom(said),
```

`same` is a stock prediction matched word for word. When there is one, `x` is B20's hand-written
expectation. **When there is not, `x` is [`guards.expectationFrom`](../../web/lib/guards.js#L221)**,
which strips the `If I …, then` and hands the tail straight back. Run on the founder's own
sentence it returns, exactly:

> **People will say it's rubbish**

So the app asked once, printed the answer back under a label that reads like a second question,
and offered a button to change it. **The natural move is to nod at it and tap on**, and that is
what a person who knows CBT did.

**And the echo is not only the free-text road.** `same` is a word-for-word match, so a person who
picks a stock worry and then *edits* the sentence — which every road invites — falls through to
`expectationFrom` too. The echo is wherever the sentence is the person's own.

Since [`B50`](B50-the-front-door-swaps-round.md), yesterday, **the road with the weakest second
field is the front door.**

## 3. The 60 expectations were never given a job

Nobody noticed the echo because there was no rule for it to break. The 60 hand-written `expect`
lines ([`worries.js`](../../web/content/worries.js), 20 worries × 3 predictions; the 60 live
`W-*-E` rows in [`suggestions-review.csv`](../suggestions-review.csv), all *shipped, UNREVIEWED*)
do not all do the same thing. `sit`, one worry, all three:

| row | the expectation | what it predicts |
| --- | --- | --- |
| `W-SIT-E1` | *By about the fifth minute I'll be up and doing something else.* | **the event again** |
| `W-SIT-E2` | *I'll write the day off and get nothing done.* | **the cost** |
| `W-SIT-E3` | *The whole list will arrive at once, and stopping will have cost me.* | **the cost** |

Two of three already do the job this task is about — by instinct, not by rule. **The field has
never had a job written down, so a road that fills it with an echo is not obviously wrong.**
That is the fault, and it is one fault with two faces: an unspecified field and a road that
derives it.

## 4. This is not a detection problem, and that matters

The founder's instinct was that catching a person who names the event instead of the cost needs
judgement — that regex cannot do it, and an LLM is rule 2 and is not happening. **Both true, and
the question does not arise.**

Detection is only needed because the app currently **accepts an answer to a question it never
asked**. Ask a question that can only be answered with the cost and there is nothing left to
catch. Structure, not judgement — the way BETR solves everything else.

It is also the device line, cleanly: **asking everyone the same fixed question is a chapter in a
book. Judging whether *your* answer was good enough is a system that assesses you.** The fix
that needs no AI is the fix that is allowed to ship.

## 5. What changes — the spec

**One screen. No new step, no new blank in *If I ___, then ___*, and no change to the record.**
Rule 10 is not amended: the sentence keeps its two blanks and the plan screen keeps its shape.

1. **`plan.expectLabel` stops being a label and becomes a question.** Draft, and it is only a
   draft: **"If that happens, what happens to you?"** Three more drafted in §9 for Misha.
2. **On the derived road, the echo stops being the answer and becomes the greyed example under
   the box** — the exact pattern [`B48`](B48-the-greyed-example-belongs-to-this-worry.md) and
   [`B49`](B49-the-grey-lines-and-a-size-of-its-own.md) built for the other two boxes, including
   B49's lesson that a grey line must name its own box and point down. The machinery exists.
3. **The box is a textarea from the start on that road**, not read-only prose with an edit
   button. There is nothing to edit when nothing has been written.
4. **An empty answer never blocks *I'll find out today*.** BETR does not dare anybody and does
   not gate anybody. **Empty falls back to today's echo**, which makes this change strictly
   additive: no road that works now can stop working.
5. **On the stock road, B20's hand-written expectation stays pre-filled and editable, as now** —
   subject to §9's question about whether the good ones should become examples too.

**No store change.** The answer *is* `x`. Nothing new is written, no version key moves, `merge.js`
is untouched, and the result screen already prints `x` under *You expected*
([`app.js:2784`](../../web/app.js#L2784)).

**Tests:** `loop.test.js` walks it and must assert the question, the class of the grey line and
the fallback when the box is left empty. Per B50's lesson: **navigating by id proves nothing
about what a person reads** — assert the words.

## 6. What must never be said

Two sentences that would be easy to write and are both wrong.

- **Never "was it really that bad?"** That is a verdict, and a minimising one — rule 6 straight
  through. If people genuinely said it was rubbish, an app telling somebody it was not so bad is
  the app telling them their own reading is wrong. The person answers; BETR does not appraise.
- **Never argue with a true prediction.** If the app *is* rubbish, *"people said it's rubbish"*
  is useful information, and the answer to it is problem-solving, which BETR deliberately does
  not do. That is fine. It must simply not pretend otherwise. **CBT here is about accuracy, not
  comfort**, and the founder's own example is the case where the event may well be true and the
  cost still is not.

The existing `locked.net` — *"Bring back whatever happens. A bad one counts the same as a good
one."* — is already the right voice for this and is the model for anything added.

## 7. Why it is worth the screen

Once the cost is written down, **the result screen has something to strike through on the day the
event comes true.** *People will say it's rubbish* is confirmed; *and I'll feel like a fraud and
take it down* usually is not, or not to the degree predicted. Today both halves are the same
sentence, so a confirmed event is a dead end. That is the whole of the gain.

The clinical names for what this is, for the reviewer in §9 and **not to be re-argued here**:
**Theory A / Theory B** (Salkovskis) — *my app is rubbish* against *I am frightened my app is
rubbish*, two accounts needing different responses; and the **survival / coping experiment**
(Bennett-Levy, Butler, Fennell, Hackmann, Mueller & Westbrook, *Oxford Guide to Behavioural
Experiments in Cognitive Therapy*, OUP 2004), where the prediction under test is not *it will not
happen* but *if it happens, I will cope*. **Neither citation has been read back on the source
today; both are for the reviewer to confirm before a word of either reaches content.**

## 8. The second half of the ask: the post

The founder's second idea — *"social media posts where I show people a 'mistake' and how I
corrected it"* — is not an alternative to §5. **It is the same content in the other place, and it
should be written once.**

The correction pair the post needs is the worked example the app needs:

> *If I post my app, people will say it's rubbish.* ← what I wrote
> *…and I'll feel like a fraud and quietly take it down.* ← what I meant

- **The format is supported, and specifically the wrong one.** Erroneous worked examples — a
  mistake shown and then corrected — teach a learner to recognise the error, not only the right
  answer (Große & Renkl; Booth et al. on incorrect examples in algebra). **NOT read back on the
  source today.** What *is* ours and checked is
  [`research/12`](../research/12-guiding-the-first-test.md) §5: studying a worked example beats
  attempting the problem, g = 0.48 across 55 studies, and the argument there is to **show the
  step**, which is exactly what a correction pair does.
- **It is the post [`posting-on-social.md`](../posting-on-social.md) §0 already asks for** — a
  filled-in worksheet, not a product pitch — and the tone
  [`research/10`](../research/10-cbt-gateway-approach.md) says survives in the communities.
- **Two hard constraints.** It has to be ***I* got it wrong**, never *you will* — a post that
  tells the reader they are doing it wrong is a verdict aimed at somebody who has not asked. And
  rule 7: every sentence has to be one the App Store listing could carry.

There is a real property here worth using: **the founder would be posting the app while testing
whether posting the app goes badly**, and that is the honest version rather than a gimmick.

## 9. Who decides what, and nothing ships before they do

1. **Misha — the words.** `plan.expectLabel` becomes a question, and it is on the screen every
   person reaches. Drafted, none preferred: *"If that happens, what happens to you?"* ·
   *"And what would that mean for you?"* · *"If they do, what's the bit you're dreading?"* ·
   *"What are you braced for?"* — the last is the phrase `worries.js` already uses to describe
   the field to itself. **None is one of the frozen sentences** (research §10) — checked.
2. **The paid CBT reviewer — the shape**, because this changes what a test *is*. Three questions:
   (a) is a second, cost-level prediction right for an unguided tool with nobody in it, or does
   it invite rumination? (b) should the 60 `W-*-E` rows be re-written to a single rule — cost,
   never the event again — or is the mix in §3 correct and deliberate? (c) confirm Theory A/B and
   the survival experiment as §7 states them.
3. **The founder — one call:** on the stock road, does B20's hand-written expectation stay
   **pre-filled** (§5.5, cheap, no road changes) or does it become a **greyed example** like the
   derived one, so that every road asks the same question and every answer is the person's? The
   second is more consistent and costs 20 worries a re-read.

## 10. Not in this task

- **No detection**, of any kind — that is §4 and it is the point.
- **No new blank** in the sentence, no fourth screen, no wizard.
- **Nothing on the result screen yet.** A sentence there is worthless until the cost is being
  captured; it is a follow-on, not part of this.
- **`docs/00-scope.md` §9 is not amended.** If §9's reviewer answer comes back *no*, this becomes
  a named limit in the scope instead, which is the honest alternative and was offered.

## 11. Confidence

**9/10 on the diagnosis** — the echo is verified in the code and reproduced on the founder's own
sentence. **Not scored on the build**, because nothing is built and the two people who decide the
wording and the shape have not seen it.
