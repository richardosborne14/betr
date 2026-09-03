# B19: Doors first, and a worry you can understand from the button

**Status:** **Built and published, 2026-09-03.** Open until Misha has read the six doors and
the CBT reviewer has read twenty-one worries against twenty-one explanations
**Confidence:** 9/10 in the build — 153 tests, and the flow walked in headless Chrome on a
390-wide screen. 6/10 in the words, for the same reason B1 sits at 5/10: nobody outside this
building has read them
**Date opened / built:** 2026-09-03 · **Founder's ask, same day, after the first two test users**
**Depends on:** B1 (the list), B8 (the three doors), B18 (`why.js`, keyed by worry id)

## The three decisions, as taken

The founder said build it and left the three open questions to the recommendations. Each is
one line to flip if they want it the other way:

| | Taken | Where it lives |
| --- | --- | --- |
| Front screen | **A** — the one big button stays, and leads to the doors. One extra screen | `start()` in `app.js`, `start.go` in `strings-en.js` |
| Door one | **(c)** — it names drink, weed, porn and betting, and carries the line frozen sentence 4 already says | `note` on the `habit` door |
| `joke` | **In.** The founder's "insulting or making fun of people" | `worries.js`, behind `temper` |

## What happened

The founder sat with two people and watched them use BETR. Both stalled in the same place.

They opened the app, tapped **Pick a worry**, and read twelve short labels. What each was
holding in their head was a problem — *I'm drinking too much*, *I want to be able to ask for
help* — and none of the twelve labels was that. **Being the only one not joining in** did not
read as anything.

**The diagnosis: the conditional is the product, and it is invisible until the seventh screen.**
Every worry has a `belief` — "If I turn up and don't join in, then everyone will notice and ask
me why" — and that sentence is the only part of an item that explains itself. It is not on the
front screen, not on the pick list, not on the plan screen. The first time anybody sees it is
`sure`, the re-rate, **after** they have already done the test. So the app asks people to choose
between twelve two-word summaries of sentences it will not show them for another four screens.

**Second finding: the door screen is the clear one.** It gives a label *and* a line underneath,
and both test users understood it immediately. It is currently a link almost nobody taps.

## The three changes

**1. The doors become the way in.** `Start → What's going on? → the worries under it → the test.`
Scope §5.3a recommended against this and that reasoning still holds: a door names a behaviour,
which is the closest thing here to the regulatory line. Nothing about a door changes — first
person, no diagnosis, never tested, only ever points at worries. What changes is that the safe
general screen comes before the specific one instead of instead of it. **Cost: one extra tap**,
against CLAUDE.md rule 10, and that is the founder's to accept.

**2. The button says the worry, not a summary of it.** Label on top, the `belief` sentence
underneath, rendered the way a door already renders its `under` line. No new field, no new
writing, one line in `pick()` and CSS that already exists. **If only one change is made, this is
it.** Longer buttons need a shorter list, which is what change 1 buys.

**3. Twenty worries, four or five per door.** Twelve had to cover everybody, so they were spread
thin and several doors pointed at the same three. With a filter in front, a door can afford five
that are about the thing just tapped.

## What the founder changed in the second draft

All six of their notes are taken, and the note under them is the substantive one:

> *"You really need to work on the comprehensibility of these phrases at the top of the items.
> The descriptions are good but they can't carry the ambiguity."*

That is right, and it applies to labels the first draft did not touch. **Every one of the twenty
labels has been rewritten against one rule: a person reading only the label knows what act is
being proposed.** No pronoun without something to point at (*handing it over* → *handing
something over*). No channel left open (*Not replying straight away* → *Not answering a
message*). And no safety behaviour smuggled into the label, which is the mistake in *Saying I'm
annoyed, calmly* — "calmly" is the `test`, and putting it on the button quietly narrows the
worry to people who are already willing to say something.

| Founder's note | Done |
| --- | --- |
| Remove *Saying I'm cutting back* | Gone. `cut` is deleted, and its `why.js` entry with it |
| *Not replying straight away* is ambiguous — messages or spoken? | Messages. Now **Not answering a message straight away** |
| *Saying I'm annoyed* — drop "calmly" | Now **Telling someone they've annoyed me**. "Calmly" moves to the `test`, where it was always the drop |
| *Letting someone finish* — without interrupting | Now **Letting someone finish without interrupting** |
| Compliment without expecting one back — maybe separate | Separate. `praise` is its own worry; `care` keeps its own ground |
| *Handing it over* → *handing something over*; same for sending | Both changed |

## The twenty worries

Rewritten labels are marked. The `belief` column is the sentence that now sits under the label
on the button; the founder judged these good, so they are mostly unchanged.

| id | Label | The sentence under it | Lane |
| --- | --- | --- | --- |
| `no` | Saying no without giving a reason ✎ | If I say no and don't explain myself, then people will think I'm selfish. | assertiveness |
| `help` | Asking someone for help ✎ | If I ask someone for help, then I become a burden to them. | assertiveness |
| `reply` | Not answering a message straight away ✎ | If I leave a message a few hours, then they'll think I don't care. | social |
| `check` | Sending something without checking it again ✎ | If I send something without going over it again, then there'll be a mistake in it and I'll look sloppy. | perfectionism |
| `sit` | Sitting still when I feel restless ✎ | If I feel restless or bored, then I can't just sit there with it. | urge-timing |
| `phone` | Going an evening without my phone ✎ | If I don't check tonight, then I'll miss something that matters. | urge-timing |
| `strug` | Telling someone I'm struggling ✎ | If I let someone see I'm struggling, then they'll think less of me. | social |
| `mist` | Owning up to a mistake before anyone finds it ✎ | If I admit I got something wrong, then it'll be held against me later. | perfectionism |
| `angry` | Telling someone they've annoyed me ✎ | If I tell someone they've annoyed me, then it'll turn into an argument. | assertiveness |
| `rest` | Resting when there's stuff to do | If I rest while there's still stuff to do, then I'm being lazy. | rest |
| `drink` | Turning up and not joining in ✎ | If I turn up and don't join in, then everyone will notice and ask me why. | social |
| `early` | Leaving before everyone else does · **new** | If I leave while it's still going, then they'll think I'm boring and stop asking me. | social |
| `feed` | A day without checking social media · **new** | If I stop keeping up with everyone, then I'll fall out of things without noticing. | urge-timing |
| `sorry` | Apologising without explaining myself · **new** | If I properly apologise for how I acted, then they'll hold it over me from now on. | social |
| `right` | Letting someone else be right · **new** | If I agree someone else has the better point, then I'll look like I don't know what I'm talking about. | social |
| `hear` | Letting someone finish without interrupting · **new** | If I don't get in quickly, then I'll look like I've got nothing worth saying. | social |
| `enough` | Handing something over before it's perfect · **new** | If I hand something in that's only good enough, then they'll think I don't care about it. | perfectionism |
| `care` | Telling someone they matter to me · **new** | If I tell someone what they mean to me, then it'll be awkward and they won't say it back. | social |
| `praise` | Paying someone a compliment · **new** | If I say something good about someone and nothing comes back, then it'll look like I was fishing for one. | social |
| `low` | Telling someone I've been feeling low · **new** | If I tell someone I've been feeling low, then they won't know what to do with it and they'll keep their distance. | social |

`cut` is deleted. `joke` is offered below and is not counted in the twenty.

### The three added in this draft, in full

All three pass `guards.checkTest` on `test` and `drop`, which is the check that fails the build.

**`praise` — Paying someone a compliment** · social
- **expect:** There'll be an odd beat, and I'll wish I'd kept it to myself.
- **test:** Say one specific good thing about somebody today, to their face.
- **drop:** Don't follow it with one about yourself, and don't wait around for one back.

`care` and `praise` look close and are not. `care` is about the size of what you'd be admitting;
its drop is the joke you'd hide behind. `praise` is about what happens when nothing comes back;
its drop is the fishing. Keeping them apart was the founder's call and it is the right one.

**`low` — Telling someone I've been feeling low** · social — *back in, at the founder's push*
- **expect:** They'll say something kind, change the subject, and be careful around me after.
- **test:** Tell one person you trust, today, in one sentence, that you've been feeling low lately.
- **drop:** Don't add that it's nothing really, and don't ask whether that was too much.

This is the founder's *talking about negative emotions*, which the first draft folded into
`strug` and should not have. `strug` is a situation you're finding hard — sayable. `low` is a
state you're in — not sayable, by this audience, ever. **It is the closest pair on the list**, and
if the CBT reviewer says they are one worry, `low` is the one that goes.

**`joke` — Getting through a conversation without a joke** · social — **offered, not proposed**
- **belief:** If I don't have something funny ready, then I'll be dull and people will drift off.
- **expect:** The conversation will go flat, and they'll find someone else to talk to.
- **test:** In one conversation today, say the plain thing where you'd normally reach for the joke.
- **drop:** No laughing it off when it gets serious, and no making anyone else the punchline.

This serves the founder's *insulting or making fun of people*. Its ancestor `funny` was cut in
B1 for a good reason — it needed a whole evening out, and somebody had to be there. This version
needs one conversation and nobody's agreement, which is the bar B1 set. **Founder's call.**

## The six doors

Each is a label and one line of recognition: what it looks like from the inside, not what is
underneath it. That is a new job for `under`, which used to preview the worries and no longer
needs to, because the worries now explain themselves.

| id | Label | Under | Opens onto |
| --- | --- | --- | --- |
| `habit` | Something I keep doing more than I mean to | The one you've quietly decided to stop more than once, and haven't. BETR never tests that thing itself — only what you think happens if people see you not doing it. | drink · early · sit · strug · no |
| `phone` | On my phone more than I want to be | Picking it up without deciding to, and the evening's gone. Half of it is the scroll. Half is not being able to sit still without it. | phone · feed · sit · reply |
| `temper` | Taking it out on the people closest to me | Snapping, going quiet, talking down to people, not really listening — and knowing it while you're doing it. | angry · sorry · hear · right · praise |
| `secret` | Keeping it all to myself | Nobody around you knows the half of it. Not hiding it exactly; it just never seems like the moment. | strug · low · mist · help · care |
| `yes` | Going along with things I don't want to do | Yes when you meant no. Nothing said when something's annoyed you. An answer sent the second the message lands. | no · angry · help · reply |
| `work` | Never letting myself stop | There's always something left, so sitting down feels like getting away with something. Nothing you hand over is quite finished either. | rest · enough · check · mist |

The founder proposed five. `work` is the sixth: without it the rest lane has no door and `rest`,
`check` and `enough` are unreachable. Their *keeping things inside* and *feeling like I'm weak*
overlapped heavily; they are split on a line that holds — **`secret` is what you don't say about
yourself, `yes` is what you don't say to other people.**

If `joke` goes in, it goes in `temper`, which then holds six.

## "Are you sure they're not worth putting in?"

The founder asked. Taking it seriously changed two answers.

**Talking about negative emotions — back in.** `low`, above. The first draft folded it into
`strug` and that was wrong.

**Making fun of people — offered back.** `joke`, above. Cutting it on B1's precedent was too
quick; B1's objection was the test, and this test is different.

**Re-checking emails — never cut.** It is `check` and `enough`. What is excluded is only the
framing: a standard you hold yourself to, never a ritual that makes a feeling go away.

**Talking about shameful thoughts — still out, for a better reason than the first draft gave.**
The first draft said OCD, which is true and is not the strongest argument. The strongest one is
scope §5.2: every test on this list is small, cheap and **reversible**. Leaving a message three
hours, sending an email once, going home early — all of them can be walked back tomorrow. You
cannot un-tell somebody a thought you are ashamed of. There is no version of that test that
belongs in an app with no person on the other end of it.

**Checking my weight — out, and not a judgement call.** Food, weight and body sensations are a
refused lane (research §6). `guards.js` blocks *weigh*, *weight*, *calories*, *diet*, and
`content.test.js` runs every `test` and every `drop` through it, so **a weight worry cannot pass
the build without changing the guard**. Frozen sentence 4 says BETR is not for somebody with an
eating disorder. A door naming weight-checking calls to exactly the person we have just told to
go elsewhere. This one needs the founder to change a frozen sentence, not a wording pass.

**Taking advantage of people — no honest version found.** Every worry here is held in place by a
prediction about how somebody will react. That is what makes it testable. Taking advantage of
people is mostly not held there; it is held by not noticing, and there is no experiment for not
noticing. Forcing it would produce an item that looks like the others and does nothing.

## The two decisions

**Door one, how plainly it names the thing.** The founder's wording named alcohol, drugs and
porn — the most recognisable version, and the version that calls to the person frozen sentence 4
excludes. **(a)** name them; **(b)** name none, as the table above does; **(c)** *recommended* —
name them and put one plain line on that door and no other: *if you're dependent on alcohol or
drugs, this isn't the right thing — Help has places that are.* (c) needs `validateDoors` to allow
that field and `menu.test.js` to know about it, so the safety line shows up in a diff.

**The front screen.** **A** *(recommended)* — keep the one big button; it leads to the doors,
and *Not sure which?* retires. One extra screen. **B** — the six doors are the front screen; no
extra tap, but the wordmark, the question, the promise line and six described buttons make it a
scroll, and the big button is most of what makes that screen feel unlike anything else.

## What was built

`cut` deleted, nine worries added, ten labels rewritten, six doors rewritten, one `note`.

- **`worries.js`** — twenty-one. `cut`'s id is retired, never reused.
- **`why.js`** — twenty-one, ten of them new. `cut`'s went with its worry.
- **`whats-going-on.js`** — six doors; `under` does recognition now rather than previewing the
  worries, and `habit` carries the safety `note`.
- **`content.js`** — `MAX_VISIBLE` (12, on the list) became **`MAX_PER_DOOR` (6)**, a door is
  **four fields and no fifth**, no door lists a worry twice, and **no worry may be behind zero
  doors** — a worry nothing leads to is how an item quietly falls out of the product the next
  time somebody rewords a door.
- **`app.js`** — `#go` leads to the doors; the pick list draws each worry's `belief` under its
  label; `pick.showAll` is gone; the doors screen carries *None of these — I'll write my own*;
  and the three dead ends that used to land on an unfiltered list of twenty-one (**New worry**,
  **Different worry**, and **Your worries** with nothing recorded) now land on the doors.
- **`app.css`** — one rule, `.list .doornote`. It wears the soft blue of a note, not the red of
  a refusal: a person reading it has done nothing wrong.
- **The tests** — 153, up from 151. Two rules were replaced rather than deleted:
  *"no more than twelve are visible"* became **no door opens onto more than six**, and
  *"the easiest three come first"* became **the first worry behind every door can be started on
  the day it is tapped**, against a hand-held `STARTS_TODAY` list so a reordering that breaks
  the rule shows up in a diff. Every walk that hard-coded the old first worry is data-driven
  again, which is what `loop.test.js`'s own header always said it should be.
- **Walked for real** in headless Chrome at 390×844: start → doors → the five behind `habit` →
  the plan. **18 requests, one host.**

## What is deliberately not here

Three things from the founder's five categories, each a rule that does not bend.

**Checking my weight — out, and not a judgement call.** Food, weight and body sensations are a
refused lane (research §6). `guards.js` blocks *weigh*, *weight*, *calories* and *diet*, and
`content.test.js` runs every `test` and every `drop` through it, so **a weight worry cannot pass
the build**. Frozen sentence 4 says BETR is not for somebody with an eating disorder; a door
naming weight-checking calls to exactly the person we have just sent elsewhere.

**Re-checking emails — in, as perfectionism only.** `check` and `enough` are about the standard
a person holds themselves to. Neither is framed as a ritual that makes a feeling go away: that
is a compulsion, OCD is excluded by the same sentence, and running one as a "test" is how
somebody gets hurt.

**Talking about shameful thoughts — out.** Not primarily because it is OCD territory, though it
is. Because every test here is small, cheap and **reversible** — leave a message three hours,
send an email once, go home early, all walkable back tomorrow. You cannot un-tell somebody a
thought you are ashamed of.

**Taking advantage of people — no honest version found.** Every worry here is held in place by
a prediction about how somebody will react; that is what makes it testable. This one is held by
not noticing, and there is no experiment for not noticing.

## Sign-off

- [x] **Founder** — doors first, shape A, at the cost of one tap
- [x] **Founder** — door one: (c)
- [x] **Founder** — `joke` in
- [ ] **Founder** — the twenty-one labels, now that they stand on their own and are live
- [ ] **Misha** — the six door labels, the six lines and the `note`. B0 Q2a, and it is now all
      six of them rewritten, so this is a read of new doors rather than a check of old ones
- [ ] **Misha** — the casting vote on `drink`, now *Turning up and not joining in* (B0 Q2d)
- [ ] **CBT reviewer** — twenty-one worries and twenty-one explanations in one pass. Two pairs
      to ask about by name: `strug` against `low`, and `care` against `praise`. If either is
      called one worry, `low` and `praise` are the ones that go
