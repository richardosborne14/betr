# B19: Doors first, and a worry you can understand from the button

**Status:** **PROPOSED, not built.** Waiting on the founder, and on Misha for the six doors
**Confidence:** 8/10 that the diagnosis is right. 6/10 in the new words — nobody outside this
building has read them, which is the same reason B1 sits at 5/10
**Date opened:** 2026-09-03 · **Founder's ask, same day, after the first two test users**
**Depends on:** B1 (the twelve), B8 (the three doors), B18 (`why.js`, keyed by worry id)
**Blocks:** nothing technical. It does make Misha's read of B0 Q2a urgent rather than pending

## What happened

The founder sat with two people and watched them use BETR. Both stalled in the same place and
for the same reason.

They opened the app, tapped **Pick a worry**, and read twelve short labels. What they were
holding in their head was a problem — *I'm drinking too much*, *I want to be able to ask for
help* — and none of the twelve labels was that. **Being the only one not joining in** did not
read as anything. They picked something, landed on the plan screen, and did not understand
what *What you expect* was doing there or where it had come from.

The founder found the same thing trying to explain it out loud.

**The diagnosis: the conditional is the product, and it is invisible until the seventh screen.**
Every worry in `worries.js` has a `belief` — "If I turn up and don't join in, then everyone
will notice and ask me why" — and that sentence is the only part of an item that explains
itself. A person does not see it on the front screen, does not see it on the pick list, and
does not see it on the plan screen either. The first time it appears is `sure`, the re-rate,
**after** they have already done the test. In B18's "Why this one sticks" it is clearer still,
and that screen is deliberately locked until somebody has a result.

So the app asks people to choose between twelve two-word summaries of sentences it will not
show them for another four screens.

**The second finding: the door screen is the clear one.** "What's going on?" gives a label
*and* a line underneath, and both test users understood it immediately. It is currently a
secondary link on the front screen — *Not sure which? Start from what's going on* — reached by
almost nobody.

## What is proposed

Three changes. The third is the cheap one that does most of the work.

### 1. The doors become the way in, not the side door

`Start → What's going on? → the worries under it → the test.`

A person names the surface problem first, in their own words, and only then meets the worries.
Scope §5.3a considered this and recommended against it — worries first, doors as an optional
second entrance — on the grounds that naming a behaviour on the first screen sits closer to
the regulatory line. **That reasoning holds and does not change here.** A door still names no
diagnosis, still is written in the first person, and still can never be tested: it only points
at worries, and every test still comes out of `worries.js`. What changes is that a person meets
the safe general screen before the specific one, instead of instead of it.

**Cost: one extra tap before the first test**, against CLAUDE.md rule 10. That is the founder's
to accept, and it is the main thing to say no to if any of this is wrong. See "Two shapes" below.

### 2. The button says the worry, not a summary of it

This is the change that fixes what the test users hit. A worry on the pick list stops being a
two-word label and becomes the label **with its `belief` sentence underneath it**, rendered
exactly the way a door already renders its `under` line — which is the rendering both test
users understood.

    Being the only one not joining in
    If I turn up and don't join in, then everyone will notice
    and ask me why.

Nothing new is written for this and no field is added: the sentence is already in the file, it
is already the thing being tested, and it is already what the person will be asked to re-rate.
It is one line in `pick()` and one CSS rule that already exists. **If only one of these three
changes is made, it is this one.**

Longer buttons only work on a shortened list, which is what change 1 buys.

### 3. Nineteen worries instead of twelve, four or five per door

Twelve worries had to cover everybody, so they were spread thin and several doors pointed at
the same three. With an obligatory filter in front, a door can afford four or five that are
actually about the thing the person just tapped. The twelve keep their ids and their words;
seven are new.

## The six doors

Reworded from the founder's five. Each is a label and one recognition line — what it looks
like from the inside, not what is underneath it. That is a change of job for the `under`
field: it used to preview the worries, and it no longer needs to, because the worries now
explain themselves.

| id | Label | Under | Opens onto |
| --- | --- | --- | --- |
| `habit` | Something I keep doing more than I mean to | The one you've quietly decided to stop more than once, and haven't. BETR never tests that thing itself — only what you think happens if people see you not doing it. | drink · cut · early · strug · no |
| `phone` | On my phone more than I want to be | Picking it up without deciding to, and the evening's gone. Half of it is the scroll, and half is not being able to sit still without it. | phone · feed · sit · reply |
| `temper` | Taking it out on the people closest to me | Snapping, going quiet, talking down to people, not really listening — and knowing it while you're doing it. | angry · sorry · hear · right · strug |
| `secret` | Keeping it all to myself | Nobody around you knows the half of it. Not hiding it exactly; it just never seems like the moment. | strug · mist · help · care |
| `yes` | Going along with things I don't want to do | Yes when you meant no. Saying nothing when something's annoyed you. Answering the second the message lands. | no · angry · help · reply |
| `work` | Never letting myself stop | There's always something left, so sitting down feels like getting away with something. Nothing you hand over is quite finished either. | rest · enough · check · mist |

The founder proposed five. `work` is the sixth: without it the whole rest lane has no door, and
`rest`, `check` and `enough` have nowhere to live.

The founder's *keeping things inside* and *feeling like I'm weak* overlapped heavily — both had
asking for help and admitting you're struggling in them. They are split here on a line that
holds: **`secret` is what you don't say about yourself; `yes` is what you don't say to other
people.** `help` sits in both, which is fine — `strug` already sits in three.

## The nineteen worries

The twelve keep their `id`, their `belief`, their `test` and their `drop`. Two labels change,
both for the same reason `check` replaced `favour` in B1: they needed a job.

| id | Label | The sentence now on the button | Lane | Doors |
| --- | --- | --- | --- | --- |
| `no` | Saying no without an excuse | If I say no and don't explain myself, then people will think I'm selfish. | assertiveness | habit, yes |
| `help` | Asking for help | If I ask someone for help, then I become a burden to them. | assertiveness | secret, yes |
| `reply` | Not replying straight away | If I leave a message a few hours, then they'll think I don't care. | social | phone, yes |
| `check` | Sending it without checking it again | If I send something without going over it again, then there'll be a mistake in it and I'll look sloppy. | perfectionism | work |
| `sit` | Sitting with a bad feeling | If I feel restless or bored, then I can't just sit there with it. | urge-timing | phone |
| `phone` | An evening off my phone | If I don't check tonight, then I'll miss something that matters. | urge-timing | phone |
| `strug` | Admitting I'm struggling | If I let someone see I'm struggling, then they'll think less of me. | social | habit, temper, secret |
| `mist` | **Owning up to a mistake** *(was: at work)* | If I admit I got something wrong, then it'll be held against me later. | perfectionism | secret, work |
| `angry` | Saying I'm annoyed, calmly | If I tell someone I'm annoyed, even calmly, then it'll turn into an argument. | assertiveness | temper, yes |
| `rest` | Resting when there's stuff to do | If I rest while there's still stuff to do, then I'm being lazy. | rest | work |
| `drink` | Being the only one not joining in | If I turn up and don't join in, then everyone will notice and ask me why. | social | habit |
| `cut` | Saying I'm cutting back | If I tell someone I'm cutting back, then they'll lecture me or feel sorry for me. | social | habit |
| `early` | **New** — Leaving before everyone else | If I leave while it's still going, then they'll think I'm boring and stop asking me. | social | habit |
| `feed` | **New** — A day without seeing what everyone's up to | If I stop keeping up with everyone, then I'll fall out of things without noticing. | urge-timing | phone |
| `sorry` | **New** — Apologising without explaining why | If I properly apologise for how I acted, then they'll hold it over me from now on. | social | temper |
| `right` | **New** — Letting someone else be right | If I agree someone else has the better point, then I'll look like I don't know what I'm talking about. | social | temper |
| `hear` | **New** — Letting someone finish | If I don't get in quickly, then I'll look like I've got nothing worth saying. | social | temper |
| `enough` | **New** — Handing it over before it's perfect | If I hand something in that's only good enough, then they'll think I don't care about it. | perfectionism | work |
| `care` | **New** — Telling someone they matter to me | If I tell someone what they mean to me, then it'll be awkward and they won't say it back. | social | secret |

### The seven new ones, in full

Every one is doable today, cheap, reversible, entirely in the person's own control, and touches
no habit — the same six rules as the twelve (scope §5.2). All seven pass `guards.checkTest` on
both `test` and `drop`, which is the check that fails the build.

**`early` — Leaving before everyone else** · lane: social
- **expect:** Someone will try to talk me into staying, and I'll feel like I've let them down.
- **test:** Decide before you go what time you're leaving. At that time, say one sentence and go.
- **drop:** Don't apologise for going, and don't promise to stay longer next time.

**`feed` — A day without seeing what everyone's up to** · lane: urge-timing
- **expect:** I'll be the only one who hasn't heard something, and it'll be obvious.
- **test:** Go one day without opening the apps you scroll. At the end, write down what you actually missed.
- **drop:** No opening one "just to see if anyone's messaged me".

**`sorry` — Apologising without explaining why** · lane: social
- **expect:** They'll accept it, and then bring it up the next time we disagree.
- **test:** Say sorry to one person today, for one specific thing you did. One sentence.
- **drop:** Don't explain what kind of day you were having, and don't ask whether you're all right now.

**`right` — Letting someone else be right** · lane: social
- **expect:** They'll take it as a win, and I'll go down in their estimation.
- **test:** Once today, say "you're right, I hadn't thought of that" — and then stop.
- **drop:** No "but", and don't add a point of your own to level it back up.

**`hear` — Letting someone finish** · lane: social
- **expect:** The conversation will move on without me and I'll have missed my go.
- **test:** In one conversation today, let them finish, then ask one question before you say your bit.
- **drop:** Don't plan your answer while they're still talking, and don't finish their sentence.

**`enough` — Handing it over before it's perfect** · lane: perfectionism
- **expect:** They'll spot the rough edges and quietly decide I've dropped off.
- **test:** Finish one thing today at good enough and hand it over. Write down the time you stopped.
- **drop:** No last look through, and no message saying what you'd have done with more time.

**`care` — Telling someone they matter to me** · lane: social
- **expect:** They'll laugh it off, and I'll wish I hadn't said it.
- **test:** Tell one person, today, one specific thing you're glad about them.
- **drop:** Don't turn it into a joke, and don't move straight on to something else.

## What is deliberately not here, and why

Three things from the founder's five categories are left out. Each is a rule that does not bend.

**Checking my weight is out, and stays out.** It is not a wording problem. Food, weight and body
sensations are a refused lane (research §6), `guards.js` refuses any test that mentions them,
and frozen sentence 4 says in as many words that BETR is not for somebody with an eating
disorder. A door that names weight-checking invites exactly the person the app has just told to
go elsewhere. Nothing in this proposal mentions weight.

**Re-checking emails is in, but only as perfectionism.** `check` and `enough` are about the
standard a person holds themselves to — "it'll look sloppy", "they'll think I don't care".
Neither is framed as a ritual that takes a feeling away, because that is a compulsion, OCD is
excluded by the same sentence 4, and re-running a compulsion as a "test" is how somebody gets
hurt. The founder's "rechecking my emails" is served; "checking until the dread goes" is not,
and the wording keeps them apart on purpose.

**Talking about shameful thoughts is out.** It reads as intrusive thoughts, which is OCD
territory, and the test it implies — tell somebody a thought you're ashamed of — is the one
thing on any candidate list that is neither small, nor cheap, nor reversible. `strug` covers
the version that is safe: one small, true, hard thing, to one person you trust.

## The one open decision: how plainly door 1 names the thing

`habit` is the door the founder cares most about and the only one near a line.

The founder's wording named alcohol, drugs and porn in the description. That is the most
recognisable version and it is also the version that calls to the person frozen sentence 4
excludes — "or are dependent on alcohol or drugs. Those need a person, not an app."

Three ways, and it is the founder's call with the research open:

- **(a) Name them.** "Drink, weed, porn, betting." Most people find themselves fastest. Closest
  to "for people with…".
- **(b) Name none.** "The one you've quietly decided to stop more than once, and haven't." Safest,
  and what the table above uses. A person looking for the drinking door has to recognise
  themselves in an abstraction.
- **(c) Name them, and be honest on the same screen.** The words in (a), plus one plain line on
  that door and no other: *if you're dependent on alcohol or drugs, this isn't the right thing —
  Help has places that are.* **Recommended.** It says out loud what sentence 4 already says, at
  the one moment it is relevant, and it costs one optional field on a door.

(c) needs `validateDoors` to allow that field and `menu.test.js` to know about it. Neither is
hard. It should not be added quietly — it is a safety line, and it should be in a diff.

## Two shapes for the front screen

**A — the front screen keeps its one big button** (recommended). The button stops saying *Pick a
worry* and starts saying something that leads to the doors; *Not sure which? Start from what's
going on* disappears, because that is now the main road. One extra screen before the first test.

**B — the six doors are the front screen.** No extra tap, and rule 10 is untouched. But the front
screen currently carries the wordmark, the question, the promise line and whatever is on the go,
and six buttons with a line of description each turns it into a scroll. The one big button is
most of what makes the first screen feel unlike anything else.

## What it would take to build

Roughly one session, and none of it is hard. The list is here so the size is visible:

1. `worries.js` — seven new entries; two labels changed. Twelve ids unchanged, so **the twelve
   existing `why.js` entries stay valid**. (The founder offered to tear the ids down. There is no
   need: nothing costs anything by keeping them, and B18's file stays correct.)
2. `why.js` — seven new explanations, two paragraphs each. This is the slowest part, and the
   file most at risk of echoing CCI or Getselfhelp; every word fresh (rule 8).
3. `whats-going-on.js` — six doors rewritten, `under` doing a new job.
4. `content.js` — `MAX_VISIBLE` (12) becomes a cap per door, not on the list. Add a rule that
   every worry is behind at least one door, or it is unreachable.
5. `pick()` in `app.js` — the belief sentence under the label. The `.under` CSS already exists.
6. `app.js` + `strings-en.js` — the front-screen button and the routing; `pick.showAll` retires
   (nineteen unfiltered is the scroll that caused this) and the way out of a door becomes
   *Something else*, straight to writing your own.
7. `content.test.js` — the "easiest three come first" test (scope §5.3c) is about a single flat
   list and stops meaning anything. It is replaced by the same rule per door: the first worry
   behind every door can be started today, alone, by somebody who has nobody free.
8. `docs/00-scope.md` §5 and CLAUDE.md rule 10 both record the old shape and would need amending.
9. `node tools/copy-sheet.js`, and the walk on a real phone.

## Sign-off

- [ ] **Founder** — doors first, at the cost of one tap (shape A or B), or no
- [ ] **Founder** — how plainly door 1 names the thing: (a), (b) or (c)
- [ ] **Misha** — the six door labels and their lines. This is B0 Q2a, and it is now all six
- [ ] **Misha** — still has the casting vote on `drink` (B0 Q2d), unchanged
- [ ] **The paid CBT reviewer** — reads nineteen worries and nineteen explanations in one pass,
      not twelve. Worth waiting for this decision before booking them
