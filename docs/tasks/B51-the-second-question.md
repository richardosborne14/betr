# B51: the second question, and the mistake worth posting

**Status:** **§5 DONE AND SHIPPED, 2026-09-10.** §8 (the post) is not started and is still
open. §9's founder call was taken; §9.1's wording shipped as a draft; **§9.2's three questions
for the paid reviewer are unanswered and the founder chose to ship ahead of them.**
**Confidence: 9/10 on the code** — 274 tests pass, every one of the five new ones was checked
against the old behaviour by mutating it back (§12), and all four roads were walked in Chrome
at 100/125/150/200% in both themes. **7/10 on the one sentence**, because Misha has not read
it. See §13 for what is knowingly left.
**Date opened:** 2026-09-10 · **The founder's ask**, in their own words, after doing a test of
their own: *"What if that's actually true, because my app is rubbish? … it's definitely a hole
in our method."* And, on reading the diagnosis: *"as a user, even as someone who knows CBT, I
fell into a trap of not saying the whole truth about how it'll make me FEEL if that event
happens."*
**Depends on:** nothing. **Touches:** [`B28`](B28-present-practice-produce.md) /
[`B31`](B31-the-front-screen.md) (the plan screen), [`B20`](B20-three-worries-under-one.md) (the
60 hand-written expectations), [`B7`](B7-distribution-and-the-ad.md) and
[`posting-on-social.md`](../posting-on-social.md) (§8 below).

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

> **CORRECTED ON BUILD, 2026-09-10, AND IT MADE THE HOLE BIGGER.** Everything below about the
> echo is true. What this section got wrong is WHERE. `plan()` — the screen holding `x` — is
> reached by exactly one caller, `again()`, so **a first test never saw the second field at
> all.** The founder's own road was: two blanks → *What will you do?* → a size → **Lock it in**
> → **Go and find out**, and `x` was derived in silence, stored, and shown for the first time
> on the result screen. The read-only echo with *Not quite? Change it* described below is the
> **repeat** screen. So the fix was not "turn a label into a question on one screen"; it was
> "ask the question on the screen a first test actually reaches, and make the repeat match".
> Walked and reproduced end to end before a line was changed. §5 below is amended in place.

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

## 5. What changes — the spec, as amended by §2's correction and BUILT

**No new step, no new blank in *If I ___, then ___*, and no change to the record.** Rule 10 is
not amended and the tap count does not move. The one thing the original spec got wrong is that
this is **two screens, not one** — the same question, in the same shape, on the build screen a
first test reaches and on the repeat screen `again()` opens.

1. **`plan.expectLabel` stops being a label and becomes a question.** Shipped as
   **"And what would that mean for you?"** — the founder's pick of the four in §9.1, on
   2026-09-10. Misha has not read it.
2. **The app's own expectation stops being the answer and becomes the greyed example IN the
   box** — `placeholder`, which is the mechanism [`B48`](B48-the-greyed-example-belongs-to-this-worry.md)
   and [`B49`](B49-the-grey-lines-and-a-size-of-its-own.md) actually used. Not "under the box":
   there is nothing under this box to point down at, so B49's name-the-box-and-point-down shape
   does not apply and B48's derive-an-example one does.
3. **The box is a textarea from the first paint, on every road.** `c.editing`, `#xedit`,
   `#xdone`, `plan.edit` and `plan.editDone` are gone: there is nothing to edit when the answer
   is a question nobody has been asked yet.
4. **An empty answer never blocks the lock.** BETR dares nobody and gates nobody. **Empty falls
   back to exactly the sentence that was greyed in the box** — one rule, both screens, so what
   is stored is always what she last read. Strictly additive: no road that worked before can
   stop working, and `an empty answer is a real answer` in `loop.test.js` is that in one walk.
5. **On the stock road, B20's hand-written expectation is a greyed example too** — **the
   founder's call, 2026-09-10, §9.3**, taken in favour of the pre-fill. Every road now asks the
   same question and every answer in a record is the person's own or the app's, never a mixture
   of the two by road.
6. **NEW, and it is not a CBT decision: the one hard stop runs on this box.** It is the box in
   the app most likely to be answered with the sentence rule 4 refuses — the founder's own
   example is *"If I kill myself everyone will be better off"* — and a third free box with no
   guard would be a hole opened by the task that closed a different one. Empty is not checked,
   the same as the leave-out. `guards.checkTest`, the same wall and the same crisis lines.
7. **NEW: the box grows to fit what is greyed in it.** `textarea { resize:none }`, and a
   placeholder cannot be scrolled, so on the repeat screen a hand-written answer came out
   sliced through the third line. `growAnswer()` borrows the placeholder into `value` for one
   frame to measure it, and answers in `em` for `growSaid`'s reason.

**No store change.** The answer *is* `x`. Nothing new is written, no version key moves, `merge.js`
is untouched, and the result screen already prints `x` under *You expected*
([`app.js:2784`](../../web/app.js#L2784)). `draft.x` is the only new field and a draft is not a
record. `editing` stopped being written to records, and nothing ever read it but `plan()`.

**Tests:** five new walks in `loop.test.js`, and one rewritten. Per B50's lesson they assert
the words a person reads, not the ids. §12 records the mutation each one was checked against.

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

## 9. Who decides what — ANSWERED, 2026-09-10, except the reviewer

1. **Misha — the words. STILL UNREAD.** `plan.expectLabel` is a question now, and §2's
   correction makes it more exposed than this section thought, not less: it is on the last
   screen before *Lock it in*, on every road, including the first test a person ever writes.
   The founder picked **"And what would that mean for you?"** from the four on 2026-09-10, and
   the precedent for shipping it unread is B49's two grey lines. The other three, unused:
   *"If that happens, what happens to you?"* · *"If they do, what's the bit you're dreading?"*
   (breaks on a worry with nobody in it — `sit`) · *"What are you braced for?"* — the phrase
   `worries.js` already uses to describe the field to itself. **None is one of the frozen
   sentences** (research §10) — checked. **It is in `docs/COPY.md` with the rest.**
2. **The paid CBT reviewer — the shape**, because this changes what a test *is*. Three questions:
   (a) is a second, cost-level prediction right for an unguided tool with nobody in it, or does
   it invite rumination? (b) should the 60 `W-*-E` rows be re-written to a single rule — cost,
   never the event again — or is the mix in §3 correct and deliberate? (c) confirm Theory A/B and
   the survival experiment as §7 states them.
3. **The founder — ANSWERED 2026-09-10: the greyed example.** Every road asks the same
   question and every answer is the person's. **The 20 worries × 3 `expect` lines have NOT been
   re-read against their new job** — that is §13 and it is the reviewer's (b) as well.
   They also took two more calls on the day, both put with the screens drawn and the numbers
   measured: **where the question goes on a first test** (a third box on the build screen, over
   routing the first test through the repeat screen for a seventh tap, or fixing the repeat
   screen alone and leaving a first test unasked), and **shipping ahead of the reviewer**.

## 10. Not in this task

- **No detection**, of any kind — that is §4 and it is the point.
- **No new blank** in the sentence, no fourth screen, no wizard.
- **Nothing on the result screen yet.** A sentence there is worthless until the cost is being
  captured; it is a follow-on, not part of this.
- **`docs/00-scope.md` §9 is not amended.** If §9's reviewer answer comes back *no*, this becomes
  a named limit in the scope instead, which is the honest alternative and was offered.

## 11. Confidence

**9/10 on the diagnosis** — the echo is verified in the code and reproduced on the founder's own
sentence, and §2's correction was found the same way, by walking it. **9/10 on the build**, see
§12. **7/10 on the one sentence**, because Misha has not read it.

## 12. What was built, and how each test was checked

**Six files.** `web/content/strings-en.js` (one string rewritten, two deleted),
`web/app.js`, `web/app.css`, `web/tests/loop.test.js`, `web/tests/a11y.test.js`, and
`docs/COPY.md` regenerated. `docs/journeys.md` J1 steps 3–4 named a button that no longer
exists; both were rewritten. **No content file changed and no sentence of BETR's was written**
— the question is the only new string, and the greyed examples are sentences that already
existed and were already being stored.

| in the code | what it is |
| --- | --- |
| `draft.x` | the person's answer, empty until typed in, never cleared by `#ownit` or a chip |
| `expectationNow()` | lifted out of `builtTest`, so the grey line and the record are ONE lookup |
| `growAnswer()` / `wireAnswer()` | the box grows to fit its own placeholder, in `em` |
| `readX(c)` | the repeat screen's box, read back before any repaint |
| `.ask` | a question drawn as one — see below |
| `.plan p.line` | was `.plan .line`, and a two-class selector was landing on `textarea.line` |

**The question is not drawn as a `.lbl`.** It was, in the first build, and it landed directly
under **AND LEAVE OUT** in the same uppercase, starting with the same word — two section
headers, not a header and a question. B51's entire finding is that a label can be answered by
whatever is already under it and a question cannot, so drawing the question in the label style
gave half of it back. Sentence case, display face, full `--ink`. Not an `<h2>`: the screen's
own question is still *What will you do today?*

**Every new test was checked by mutating the code back and watching it fail.** A green suite
proves nothing about a screen nobody read (B50), and a test that cannot fail is worse than no
test — the one this task rewrote had been asserting the absence of *"Not quite? Change it"*,
a string that stopped existing when the edit button did.

| test | the mutation it caught |
| --- | --- |
| asks what it would cost | put the expectation back in the box as a value |
| an empty answer is a real answer | `x: draft.x.trim()` — no fallback |
| the greyed answer on a worry | the same prefill mutation |
| the one hard stop | deleted the `checkTest` on the box |
| a repeat greys last time's answer | put the value back on the repeat screen |

**Measured on a 390×844 phone, both themes.** *Lock it in* sits at **647–710** depending on the
road, against a fold of 785 — above it, once a size is picked. **With the three sizes still
open it is at 825, which is 40px below the fold and is the price of this task**, stated to the
founder before the call and accepted. No sideways scroll at 100/125/150/200%.

## 13. What is knowingly left

1. **The reviewer's three questions (§9.2) are unanswered and the app shipped anyway** — the
   founder's call, on the grounds that the change is strictly additive. If (a) comes back *no*,
   this comes out again, and §10's last line still stands: it becomes a named limit in the
   scope instead.
2. **The 60 `W-*-E` rows have not been re-read against their new job.** §3's finding stands
   untouched: `W-SIT-E1` predicts the event again and is now greyed under a question only the
   cost answers. That is reviewer question (b) and it is the biggest single content job left.
3. **Misha has not read the question**, and it is the one sentence on the last screen before
   the lock.
4. **`--ink-3` on `--card` is about 3:1.** The greyed sentence carries what will be STORED, not
   just an instruction, which is more weight than any other placeholder in the app puts on that
   colour. It goes to the outstanding screen-reader-and-contrast pass, not into this task.
5. **§8, the post, is not started.** It is the same content in the other place and it should
   still be written once. The correction pair the app now makes room for is the pair the post
   needs.
6. **`docs/journeys.md` J1 is stale beyond the two rows this task fixed** — it still says *Pick
   a worry*, *Sure it'll go badly?* and *I'll do it today*, all of which changed before today.
