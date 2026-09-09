# B37: The template with holes — canned where it helps, theirs where it matters

**Status:** **PROPOSAL. Nothing built.** It is the founder's, from 2026-09-08, and it is the
first idea in this run that changes the shape of the app rather than adding to it.
**Confidence:** 8/10 that it is right. 9/10 on §4, which is a bug it would create and which is
not optional. 5/10 on the content cost in §6, which is the part nobody can size without the
reviewer.
**Date opened:** 2026-09-08 · **Depends on:** nothing to think about; B32 to extend, B36 to
reorder, and one storage change before any of it.
**Research:** [`../research/12-guiding-the-first-test.md`](../research/12-guiding-the-first-test.md)

---

## 1. The proposal, in the founder's words

> Offering canned options that we can then suggest canned ideas for, but also letting the user
> personalise it to their situation.
>
> Perhaps that part can be "If I…" and then *criticise someone* is a choice you can make, but
> then it shows you *If I criticise [add a person]* and that's how you personalise, but then the
> next screen where you're offered the small, medium and big tests, we work off the *criticise*
> template, including the part the user typed in *add a person*, so you see *Give [the person] a
> little criticism about [insert a thing]* and again the thing is the part they personalise. Of
> course they can tap out of this template mode and just type their own stuff… or can they?
>
> In the end will we not be making 90% of users happy with guided and gated personalisation,
> rather than catering to the 10% who'll actually read the CBT help stuff and try to make their
> own fully custom tests?

## 2. Verdict: yes — and it is much cheaper than it looks, because B32 already ships two thirds of it

**B32 shipped four days ago and does exactly this, one level up.** Borrowing an item opens the
build screen **with the sentence half written**, the three predictions as chips underneath, and
*"its plan and its leave-out line are already in the boxes on the next screen. Everything
editable, everywhere."*

So the founder is not proposing a new mode. They are proposing **the same pattern with holes in
the middle of the sentence instead of only at the ends, and the holes carried through to the do
step.** That is the whole idea, and it is an extension of shipped machinery rather than a second
way for the app to work.

**And the carry-through is the part that earns it.** She types *my best friend* once, into the
if-half, and it appears in all three sizes of the test on the next screen. Nothing chose
anything, nothing was generated, no model ran — and the app reads as though it understood her.
**That is the closest thing to intelligence BETR is allowed to have, and it is a string
substitution.** It is worth the machinery for that alone.

## 3. Don't build a mode. Build prefill. Then "or can they?" stops being a question

The founder asks whether a person can tap out of template mode. **The better answer is that
there is no mode to be in.**

- Every slot is **a text box that starts with something in it**. Tap it and type over it.
- A template fills three or four boxes. Free text is the same screen with the boxes empty.
- No toggle, no "advanced" door, no gesture to discover, no second code path, **and no second
  set of guards** — which is the part that matters, because a second path is where the safety
  line goes soft.

This is already how B32 works and it is already what the build screen is. The difference is only
how much arrives pre-filled. **A person who wants to write their own does not have to leave
anything; they type over it.** The 10% pay one extra tap; the 90% pay nothing.

## 4. **The bug it would create, and this one must be fixed first**

**Identity in BETR is currently the sentence itself.** `sameAsStock()` in `app.js` compares the
person's words to each stock prediction **word for word**; if they differ, the test becomes
theirs, gets a new id, and `rate.keyOf()` starts **a new ladder at ten**. That is deliberate and
right today: change a word and you have made a different test.

**Under templates, a filled-in sentence differs from its template every single time, by design.**
So every templated test is a stranger to itself, every one starts at ten, and **nobody's ladder
ever moves past one rung.** The one number in the product stops working, and it fails silently —
tests pass, screens render, and the thing the whole app exists to show simply never happens.

**The fix, corrected 2026-09-09, and it is smaller than this file first said.** The original
draft here proposed keying the ladder on *template plus which prediction*. **That is wrong, and
rule 5 says why:** a stock item's three predictions **all share that item's one ladder**. Keying
on template-plus-prediction would give one worry three ladders — the opposite of the rule.

`rate.keyOf()` already does the right thing: `'stock:' + d.id`. So the real fix is one sentence:

> **Stay `stock`, and keep the worry's `id`, while the person is on the template road — whatever
> the words say.** `sameAsStock()`'s word-for-word comparison is what has to go, because the app
> already knows: it printed the skeleton.

Then store `prediction` and `slots` alongside — **not to key anything**, but so a record can be
redrawn, so the export is honest about what was actually done, and so *Test this again* comes
back with her words in it.

- Three predictions, one ladder. Fixing a typo or picking a different one of the three keeps the
  history — which `rate.keyOf()`'s own comment already says is the point of keying by id.
- Tap *Write the whole thing myself* and you have left the template: own id, own ladder, exactly
  as today.

**Still not trivial** — it touches `store.js` (v5), `app.js`, merge and export — but it is a
narrowing of an existing rule rather than a new identity model, and it goes in **before** the
first template, not after.

## 5. The rule that keeps it safe: **BETR owns the verb, the person owns the nouns**

Rule 4 did not loosen for BETR on 2026-09-08. A generated *do* is **BETR proposing a test**, so
it must be BETR's content and must pass the word lists.

**So slots take nouns — a person, a thing, a place — and never verbs.** *Give [my sister] a
little criticism about [her cooking]* is BETR proposing the action and the person supplying who
and what. Let a slot take a verb and a person can compose a sentence BETR appears to be
proposing, which is the one thing the rule exists to prevent.

That also keeps the guard surface tiny: the **HARM** stop runs on slot text, as it already runs
on both boxes; the habit and body lists still refuse nothing (B29) and still hold BETR's own
content, which now includes every skeleton.

**On the regulatory line** (research §6): a template is fixed content with blanks — which is
what a CCI worksheet on paper literally is. The person chooses the chapter and writes in the
margin. Which set of `do` sentences appears is decided by **which template they picked**, and
that is the same lookup `starts.js` already makes and already defends: *"a lookup, not a
judgement — no scoring, no ranking, no closest match."* Nothing here ranks, nothing scores, and
BETR still never picks one of the three.

## 6. The real cost is content, and it is not shippable in one go

Each template needs, at minimum: the skeleton, **three** predictions (rule 3), three sizes of
`do`, three `drops`, and a `why`. Call it ten to thirteen sentences — and every one goes through
the paid CBT reviewer, **who is already the critical path and already holding 245 rows.**
Twenty-one worries at that rate is a job nobody has costed and the reviewer has not agreed to.

**Two things make it proportionate:**

1. **Not every worry wants slots.** *Sitting still when I feel restless* has nobody in it. Slots
   earn their place where **another person is in the test** — which is most of the green lane
   (assertiveness, people-pleasing, asking, admitting) and almost none of the rest. Guess: eight
   to twelve of the twenty-one.
2. **Build the mechanism, ship two templates, walk them.** Then batch the rest through the
   reviewer with everything already in the envelope. **Recommendation: `no` and `strug` first** —
   the two the observed walkers landed on.

**One content trap, and it is the interesting one.** The small size may legitimately want to
change *who it's with* — that is CCI's first dial. So *A small go* is not always "the same
sentence, smaller"; sometimes it is *"somebody who isn't [person]"*, which needs its own slot
rather than reusing the first. Worth deciding once, in the content, rather than per template.

## 7. The 90/10 question, answered straight

**It is not 90/10 of people. It is 90/10 of moments, and the same person is both.**

That is the expertise-reversal effect, and it is the one finding in this research that is about
exactly this decision: worked examples and guidance **stop helping and start getting in the way**
once somebody knows how (research §5). Which is not a hypothetical here —

- **The daughter is the day-one case.** She had a good sentence and no idea what a test was.
- **The founder is the day-thirty case**, and stopped opening the app. Their own two examples —
  the slow car, and the last word — **fit no template that will ever be written.**

So a product that serves only the 90% locks out the person who built it, on day thirty, having
served them well on day one. And a product that serves only the 10% is the app that lost a
seventeen-year-old at the third screen.

**The evidence is on the founder's side for the default.** Guided self-help beats unguided by
SMD 0.34–0.59 across 155 trials and 15,191 people, and NICE does not list unguided at all
(research §3.1). **A template is guidance that costs nothing, involves nobody, and phones
nowhere.** It is the most guidance this product is allowed to have.

**So: templates by default, free text always reachable, and the guidance gets out of the way
rather than being switched off.** Which §3 gives for free.

**UNKNOWN, and stated as such:** no trial evidence was found comparing templated entry to free
text in self-help CBT. Searches returned vendor blogs and one hospital-documentation survey
about typing speed. Nothing in §7 above rests on it.

## 8. What it does to B36

| B36 item | Under B37 |
| --- | --- |
| 1 · the `did` on the worked example | **Unchanged, still first.** Independent of all of this |
| 7 · dares become questions | **Unchanged.** Strings only |
| 10a · the safety-net line | **Unchanged.** One string |
| 2 · *Too big? Make it smaller* | **Still needed, and better.** Its three worked sizes become the template's own three, so the screen teaches the dial the person is already holding |
| 8 · the dial | **This is where the two proposals meet, and B37 wins.** The founder's small / medium / big IS the dial — arriving as *three concrete sentences* rather than as three abstract sizes. Far better: a rung you can read is a rung you can pick |
| 3 · *Why it's written like this* | **Unchanged**, and more valuable: the 10% reach free text through it |
| 4 · the two nudges | **Less needed on the template road** (the skeleton cannot be a state or a feeling), still needed on the free-text road |
| 6 · keep the half-written sentence | **More valuable.** Slots are more work to lose |
| 5, 10b · when and where | Still behind the fold bug |
| 9 · points | Still no |

**And the order changes.** §4's identity fix is now the first piece of code in the whole
programme, ahead of everything except B36 item 1.

## 9. Open, and whose

| | Who | What |
| --- | --- | --- |
| a | **Founder** | Yes or no to the shape. And **rule 10 gets its third amendment** — this is more form than the last one. Their rule, their call, but it should be written down rather than arrived at |
| b | **Founder** | Free text stays reachable? **Strong recommendation: yes**, and §3 means it costs nothing. §7 is the argument |
| c | **Misha** | Every skeleton. The risk is BETR's voice in somebody's mouth: *"give her a little criticism"* has to sound like a person or B20's *"sort of matches my worry but not really"* comes back one level up |
| d | **CBT reviewer** | Whether a graded three-size ladder is safe to hand somebody with no clinician, and whether the small size may change *who it's with* (§6) |
| e | **Nobody** | The 125% fold bug, still. Three sizes is another row on the screen that already clips |

---

## 10. Scoped into tasks, 2026-09-09 — the founder said *"let's try it out"*

Seven tasks. **B37 is now the programme file**, as B28 was for B29–B33, and this is the order.

| | Task | What it is | Cost | Blocks |
| --- | --- | --- | --- | --- |
| 1 | [`B38`](B38-the-did-the-reframe-and-the-net.md) | The `did` on the worked example, dares become questions, one line at the lock | ~1 day | nothing |
| 2 | [`B39`](B39-the-do-screen-fits-a-phone.md) | The 125% fold bug on the do screen | ~1 day | **B42** |
| 3 | [`B40`](B40-the-record-knows-which-template.md) | Identity and storage v5. **No visible change** | 1–2 days | **B41, B42, B43** |
| 4 | [`B41`](B41-a-skeleton-with-holes.md) | The skeleton, the holes, the carry-through | ~2 days | B42, B43 |
| 5 | [`B42`](B42-three-sizes.md) | Three sizes on the do screen — the dial as content | 1–2 days | B43 |
| 6 | [`B43`](B43-two-templates-walked.md) | Two templates, walked. **The "try it out"** | ~1 day + review | — |
| 7 | [`B44`](B44-make-it-smaller-and-why.md) | *Make it smaller* and *Why it's written like this* | ~1 day | — |

**Two readings of the founder's sentence, and they give different first moves.**

- *"Let's try it out"* meaning **see the template working**: skip straight to **B39 → B40 → B41
  → B42 → B43**. Five or six working days to a founder holding a real templated test on a real
  phone. B38 and B44 come after.
- *"Let's try it out"* meaning **start shipping this run's thinking**: **B38 first**, which is a
  day, is visible tomorrow, and depends on nothing.

**Recommendation: B38, then B39, then the template run.** B38 is a day, it is the cheapest and
best-evidenced thing in either file, and it goes out while B39's measuring is happening. Nothing
in it is on the template critical path.

**What is still not a task, and deliberately:**

| | Why it is waiting |
| --- | --- |
| B36 item 4, the two nudges | Less needed on the template road — a skeleton cannot be a state or a feeling. Still wanted on the free-text road; small; do it when that road is next touched |
| B36 item 5, when and where | Behind B39, and B42's dial carries part of it for free |
| B36 item 6, keep the half-written sentence | A founder decision, still unanswered, and **worth more now** — slots are more work to lose |
| B36 item 10b, *and if it goes badly?* | Behind B39 |
| The rest of the templates, 6–10 more | Behind B43 and the reviewer's answer |

**And the decisions that gate content rather than code**, so none of them stops task 1 starting:
Misha on every skeleton (§9c), the reviewer on the graded three and on whether *A small go* may
change who it is with (§9d), and rule 10's third amendment written down rather than arrived at
(§9a).
