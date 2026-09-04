# B24: Somewhere to send the person we turn away

**Status:** **Done — 2026-09-04. The promise is kept, and a test keeps it kept**
**Confidence:** 9/10. Every service was read on its own site on the day and every address was
checked; the walk lands on them in one screenful. The 1 is Misha, who has not seen the list
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


---

## What was built, 2026-09-04

**The group exists, it is first, and the sentence now opens it.**

### The three decisions, and who made them

| | Decision | Who |
| --- | --- | --- |
| (a) or (b) | **(a)** — give Help the places the note promises | founder |
| Naming a fellowship | **Name it.** UK SMART Recovery is on the list, directly | founder, overruling `places.js` rule 5 knowingly |
| Countries | **UK and US, and the group says so.** No per-country places | founder |
| Door one's note | **Tappable.** It opens Help | founder |

The fellowship decision **overrides a written rule**, so `places.js` rule 5 was rewritten rather
than quietly broken: it records what the rule used to say, that the founder overruled it, the
alternative they were offered (link only the NHS page, which names AA, Al-Anon and SMART Recovery
itself — one more tap for the person least able to spend it), and how to reverse it in one edit.

### The six, every one read on its own site on 2026-09-04

| Place | Where it works |
| --- | --- |
| NHS: alcohol support | UK |
| NHS: drug addiction, getting help | UK |
| WithYou | England and Scotland — free, confidential, chat open seven days |
| Talk to Frank | UK |
| UK SMART Recovery | UK — free meetings, in person and online |
| FindTreatment.gov | United States — SAMHSA, licensed treatment, anonymous |

**Read and left out**, so nobody spends the afternoon finding out the same thing twice:
**Drinkaware** (funded by the drinks industry — not from this sentence, of all sentences);
**Adfam** (excellent, but for the family of somebody who drinks, and door one's note is about the
person reading it); **SAMHSA's own national-helpline page** (403 both times; FindTreatment.gov is
the same agency and it rendered).

**No phone number was written.** `helplines.js` is still the only file allowed to hold one.

### The group carries one line of its own

> *"These are the UK, and one for the United States. We haven't checked anywhere else, and a
> wrong door is worse than no door."*

It is on the **group**, never on an item, so there is still nowhere to hang a rule that shows one
person a different list from another (`places.js` rule 3, research §5.2). `content.test.js`'s
three-fields-and-no-fourth test reads items, and still passes untouched.

### The note is a button, and it lands you on the group

`go('help')` alone put a person at the top of a screen that is **4,718 pixels long** — four
screenfuls of crisis block, CBT explainer and nine sentences between the promise and the thing
promised. So the note focuses the group's heading and scrolls it to the top. **Both, in that
order:** focus is what a screen reader follows, the scroll is what an eye follows, and neither
does the other's job. `focus()` on its own scrolled the least it could and left two of the six
places under the fold.

Walked in a real browser at 390×844: the heading lands at `top: -8px` and **all six places are
on one screen** (the last ends at 584px of an 844px viewport).

It is **not a link** — it moves inside the app — so the rule that only Help carries links is
untouched, and `menu.test.js` still proves it on every other screen.

### The test that stops this coming apart again

`menu.test.js`, and it is written round the way it is on purpose:

```
if door one still promises places for alcohol and drugs, Help has them
```

The **promise** is what is checked for. Deleting the group without deleting the sentence fails
the build. Deleting the sentence too is the only way to make it pass — which is a decision
somebody has to make on purpose, in a diff, with their name on it. Verified by deleting the
group and watching the build go red.

A second test asserts the note opens Help **and lands on `group-substances`**, so "it opens Help"
can never quietly become "it opens the top of Help".

### Files touched

`web/content/places.js` (the group, rule 5 rewritten, group-position references corrected) ·
`web/app.js` (group `note` rendered, note is a button, focus + scroll) · `web/app.css`
(`.doornote .plain` — looks exactly like the sentence it was, tappable across the whole
sentence) · `web/tests/menu.test.js` (six links on the allow-list, two new tests) ·
`tools/copy-sheet.js` (a group's own line reaches `COPY.md`) · `docs/COPY.md` (regenerated).

169 tests, 0 failures.

## What is still open

- **Misha has not seen this list.** `places.js` still says `signedOff: false`, and this group
  needs him more than most: it is the first thing under *Other places*, and it is the one that
  names a recovery fellowship.
- **Nobody owns the re-check.** `helplines.js` has `owner: null` and `places.js` has no owner
  field at all. A dead link here is a real harm and nothing in the app can notice one — B24 does
  not fix this, and it is the same release condition it already was.
- **Outside the UK and US there is still nothing**, and the group says so rather than guessing.
  If that is ever revisited, per-country places need a fourth field on an item, which rule 3
  forbids; the honest shape would be a second group, not a filter.
