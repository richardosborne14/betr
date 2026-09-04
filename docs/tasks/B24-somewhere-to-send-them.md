# B24: Somewhere to send the person we turn away

**Status:** **Open — written 2026-09-04. A promise the app breaks today**
**Confidence:** 10/10 that the gap is real (it is one grep). 3/10 on which services, because not
one of them has been checked yet and none may be written from memory
**Date opened:** 2026-09-04 · **Depends on:** B8 (`places.js`), B17 (how a checked line is kept)
**This is finding 2 in `docs/journeys-observed.md`, and it is the only safety one.**

## What is wrong

Door one carries a note, added in B19 at the founder's request (option c):

> *"If you're dependent on alcohol or drugs, this isn't the right thing. **Help has places that
> are.**"*

**Help has no alcohol or drug service on it at all.** `web/content/places.js` is, in full:
Centre for Clinical Interventions, Getselfhelp, NHS Every Mind Matters, Mind, BABCP,
Find a CBT Therapist, EABCT, Side by Side, TrybeUP. All CBT worksheets, therapist registers, a
general mental-health charity and our own other product.

So the one sentence in BETR that deliberately sends somebody away — written for the person
frozen sentence 4 excludes, at the exact moment it is relevant — **sends them to a screen that
does not have what it just promised.** Marcus read that note, asked himself *"am I? I don't
know"*, and carried on. Somebody who answers *yes* gets sent to nine links, none of which is for
them.

**It fails for the most vulnerable person who reads it.** That is the same class of harm as B17,
where a person in Lagos who had just typed the worst sentence of their week was handed two phone
numbers that do not ring there.

## The two ways to close it, and they are not equal

**(a) Give Help the places the note promises.** `places.js` gains a small group of alcohol and
drug services. Then the note is true.

**(b) Stop the note promising.** It says this is not the right thing and stops there.

**Recommendation: (a).** (b) is honest and it is worse. A person who has just been told "not
this" and given nothing is a person we have shown a door and then closed it. §08's loudest
finding is about exactly this shape — help withheld at the moment of need is the thing that
turns people against a product, and against asking again.

## How the services are chosen, and the rule that governs it

**The same discipline as `helplines.js`, because it is the same kind of harm.** CLAUDE.md:

> *A crisis phone number is never written from memory — a person's or a model's.*

A service is a softer case than a phone number, but not by much: a person in that state follows
the first link and may only try once. So:

- **Every entry read off the provider's own site, on the day, with that page's URL recorded.**
- **Plain `https`, no query string, no campaign parameter, no shortener** — `menu.test.js` holds
  the allow-list, so a new link shows up in a diff.
- **Nothing fetched at runtime** to support one. No favicon, no preview, no link check.
- **Three fields and no fourth**, like every other place, so there is nowhere to put a rule that
  shows one person different words from another.
- **Free at the point of use, or it says what it costs**, in the entry, the way TrybeUP's does.

**Candidates to check — not answers.** Nothing goes in this file because a model recalled it.
The starting list to *look up*, UK-first because the default helpline is UK: the NHS's own
alcohol-support and find-a-service pages, Drinkaware, We Are With You, Adfam (for families),
Alcohol Change UK, and the mutual-aid fellowships. **For the US and elsewhere**, `helplines.js`
already faces the country problem and B17 solved it once; this task should say plainly whether
`places.js` needs the same country awareness or whether one honest international line
(findahelpline-shaped) is the better answer. **That is a decision, and it is in this task.**

## The second question, and it is the founder's

**Should the note also appear where Marcus actually is?** He read it on the doors screen and it
did its job — he considered it. But if he had answered *yes*, the nearest way out was three taps
away through a menu he had not used. Options: leave it (the note names Help by name), or the
note itself carries the one link. **A link on the doors screen is a change to the shape of that
screen**, so it is not a quiet fix.

## What this task may not do

- **It may not write a phone number.** Not one, not anywhere, not from memory. `helplines.js` is
  the only file allowed to hold one and `guards.test.js` fails the build on a digit elsewhere.
- **It may not add a service it has not read today**, and it may not add a neighbour's because
  it is the one we have.
- **It may not make BETR triage.** No question, no screening, no "which of these are you". A
  fixed list of places is a chapter in a book; anything that chooses between them is a device
  (research §5.2).
- **It may not soften frozen sentence 4** or the note's first half.

## Plan

1. Decide (a) or (b) with the founder. **Recommend (a).**
2. Decide the country question: one honest international answer, or B17-style country awareness.
3. Read each candidate on its own site, on the day. Record the URL and the date beside it, the
   way `helplines.js` does.
4. Add them to `places.js`, add the links to `menu.test.js`'s allow-list, and add a test that
   fails the build if door one's note is present and the file has no such service in it — so
   this promise can never come apart silently again.
5. Name the owner. `helplines.js` has `owner: null` and this has the same problem.
