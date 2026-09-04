# B25: The number that brought them in, and the one that greets them

**Status:** **Open — written 2026-09-04. Contains one regression introduced the same day**
**Confidence:** 8/10 on the diagnosis. 4/10 on the fix, because the obvious one is close to
something the rules forbid and needs care
**Date opened:** 2026-09-04 · **Depends on:** B18 (why it sticks), the 2026-09-04 wording change
**Findings 4 and 5 in `docs/journeys-observed.md`.**

## Two problems, and they are the same problem

All three walkers arrived from the same place: **an Instagram post showing somebody at 6 out of
10 on a belief about their anxiety.** That screenshot is not an accident of the ad — research
§11.6 says *"show the new belief's evidence growing"* is the mechanism **and** the ad, and scope
§3 agrees.

**Problem one: the ladder is invisible until after a completed test.** Seven screens and one
real-world action away. The landing page has no number on it at all. Dan's first thought on
arrival: *"That's not what I saw. The post had a number going down; this is a sentence."*

**Problem two, and this one is ours from today.** Scope §3:

> *"Everything starts at 10 — that is what the front screen says."*

The old headline **Sure it'll go badly?** said it. The new one, **You've played it out a hundred
times**, does not. So Dan finished his first test, saw **10 → 9**, and had no frame for it:
*"Down one. One rung. The bloke on Instagram was at six, so that's what, a month of this?"*

**The gap between the ad and the first result is three rungs and about eight more tests, and
nothing anywhere tells him that is normal.** The one line that does — *"One test done. The
second one is where it starts to stick."* — is on the result screen, after the disappointment.

## What may not be done about it

This is the part that needs saying before any option, because the obvious fix is out.

- **No fabricated ladder.** A made-up person at 6/10 on the landing page is a fabricated record
  presented as real, and a testimonial besides — MHRA treats a testimonial as an implied claim
  (research §5.2). **Never.**
- **No promise about how far or how fast.** "Most people reach 6 in a fortnight" is a claim the
  evidence does not support and would not survive §5.4.
- **No number that is a score of the person.** Rule 5. The ladder is one belief's grip, never
  totalled, never averaged, never carrying a target.

## The options

**(a) Put the mechanism on the front screen in words, not a number.** One line saying the belief
starts at ten because that is how sure you are now, and it moves when you find out. Restores what
the old headline carried, costs nothing, adds no screen.

**(b) Draw an empty ladder on the front screen.** The real component, ten rungs, none of them
filled, with the person's own first belief to be written into it. Shows the shape of the thing
in the ad without inventing anybody's data. Riskier: a decorative ladder on a screen where
nothing has happened yet is close to a promise.

**(c) Say it at the result instead, before the number lands.** The result screen already says
"the second one is where it starts to stick"; it could say what a first move usually looks like
without claiming what any particular person will get.

**(d) Change the ad, not the app.** If the screenshot that brings people is a 6/10, the app they
land on should look like the thing they saw — which may mean the ad should show a **first**
result, 10 → 9, and be honest that this is what day one looks like. **This may be the best answer
in the whole task** and it costs no code at all.

**Recommendation: (a) and (d).** (a) is the regression, and it is mine; it should be repaired
whatever else happens. (d) is free, honest, and fixes the expectation at the place the
expectation is made. (b) is a design experiment worth a look and no more. (c) is worth doing
with (a) but not instead of it.

## The regression, stated plainly

The 2026-09-04 headline change was made to fix the gluten problem, and it did. It also silently
removed the only place the app explained why every belief starts at 10, and **that was not
noticed until a character walked into it.** Whatever is chosen here, `loop.test.js` should gain
a test that fails the build if the front screen stops saying it — the same way it already fails
on a lowercase button label. A rule that lives only in `docs/00-scope.md` is a rule that can be
deleted by a well-meaning edit on github.com.

## What this task may not do

- No fabricated data, no testimonial, no claim about outcomes, no target.
- It may not add a screen, and it may not put a second number anywhere. Rule 5 allows exactly
  two: the ladder, and completed tests.
- It may not make the front screen longer than one screen at 390 wide with big text on.

## Plan

1. Repair the regression: a front-screen line that says why it starts at ten, in the voice of
   the headline it sits under, plus the test that holds it there.
2. Take (d) to the founder — it is a decision about the ad, not the app, and it may make (b)
   unnecessary.
3. Re-walk Dan end to end and see whether 10 → 9 still reads as a let-down.
