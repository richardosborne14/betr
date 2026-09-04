# B23: The doors, for the person who did not come here about a habit

**Status:** **Open — written 2026-09-04. Needs the founder's and Misha's decision before code**
**Confidence:** 9/10 that the loss is real (Priya nearly closed the tab on screen two). 4/10 on
which fix, because every option costs somebody something
**Date opened:** 2026-09-04 · **Depends on:** B19 (the doors), B22 (the rule)
**This is the most expensive finding in `docs/journeys-observed.md`. It is finding 1 and 3.**

## What happened

Screen two of BETR is six doors. The first one reads:

> **Something I keep doing more than I mean to**
> *The one you've quietly decided to stop more than once, and haven't — drink, weed, porn,
> betting.*

**Priya read four words and nearly left.** *"Drink, weed, porn, betting — oh. Is this a recovery
app? That's not me at all."* She stayed only because she scrolled. The two doors she actually
belongs in — *Going along with things I don't want to do* and *Never letting myself stop* — are
**fifth and sixth, both below the fold** on an 844px screen.

**And the door does not keep its own promise either.** It says *porn*, and of the five worries
behind it, three are shaped like a pub: turning up and not joining in, leaving before everyone
else, sitting still. Dan noticed in seconds: *"It said porn on the last screen. These are all
about going to the pub."* Research §08 is explicit that porn recovery is a **distinct** mechanic
— accountability-partner requests run **9.53 per 1,000 posts against 0.34** in the alcohol subs,
across 95,707 posts.

## Why it is not simply "move door one"

Door one is the reason Dan and Marcus both got in. Marcus: *"That's me."* Dan: *"First one, no
dancing around it."* It is also, per scope §1, the **top of the TrybeUP funnel** — the audience
the whole product exists to reach. **Reordering the doors moves the loss, it does not remove it.**

## The options, and what each costs

**(a) Reorder.** Door one goes third or fourth. Priya meets a describing door first; Dan and
Marcus scroll for theirs. One line in `whats-going-on.js`.
*Costs:* the two people the product is for now have to scroll to find themselves, and §08 says
they are the ones with the least patience for an app that does not immediately get it.

**(b) Leave the order, change the four words.** Door one keeps its place; its `under` stops
listing substances and describes the moment instead — the 9pm decision, the promise made and
broken, the thing nobody knows about. Pile 3 of B22.
*Costs:* the men who found themselves instantly *because* the word was there. Dan's exact
reaction was relief at being named without euphemism. This trades his recognition for hers.

**(c) A line above all six that reframes the screen.** `BETR_DOORS.intro` currently says *"Tap
what's closest. It just points you at the worries that usually sit under it."* It could say that
none of these is what gets tested and that most people are in a bit of two — so a reader who
does not fit door one knows to keep reading rather than to leave.
*Costs:* nothing structural, and it is the smallest change here. It also may simply not be read;
Priya's flinch was pre-verbal and four words in.

**(d) Split the six into two groups with a heading each.** Something like *things I do* and
*things I don't say*.
*Costs:* it is a new structure on the screen, close to the wizard/form shape rule 10 exists to
refuse, and it introduces exactly the kind of category B22 says to avoid.

**(e) Add a seventh door for the perfectionism/assertiveness lane in plainer words.**
*Costs:* both of Priya's doors already exist and she recognised them the moment she read them.
The problem is not that her door is missing, it is what she read before reaching it. A seventh
door makes the screen longer and the fold worse.

**Recommendation: (c) and (a) together, and not (b).** (c) is nearly free and directly answers
"should I keep reading". (a) is the only thing that changes what she reads first. Keeping (b)
off the table protects the thing Dan valued most, which the walks say is real and rare. **But
this is the founder's and Misha's call and Misha holds the casting vote on the door labels
(B0 Q2a).**

## The second half: door one's list does not serve porn recovery

Separate from the order. Of `['sit', 'drink', 'early', 'strug', 'no']` behind `habit`, nothing
is shaped like the moment a man in porn recovery recognises. Either:

- the door stops saying *porn* and a **seventh door** carries it with its own worries, or
- `worries.js` gains two or three worries that a man in porn recovery reads and says "that's me"
  — about being alone in the evening, about what somebody would think if they knew, about being
  asked a direct question.

**Neither may go near the habit itself** (rule 4), and any new worry needs the same three
predictions, the same `why.js` entry, and the same reviewer read as the twenty-one. **This half
is content, so it waits for the paid CBT reviewer and Misha either way.**

## What this task may not do

- **It may not quietly reorder the doors.** The order is the founder's and Misha's.
- **It may not put a substance on a button.** Rule 4 and `content.test.js`.
- **It may not add a fourth field to a door.** Four fields and no fifth, so there is nowhere to
  hang a rule that shows one person different words from another.
- **It may not make the doors screen longer without measuring the fold again.** It is already
  1,555px against an 844px screen.

## Plan

1. Founder and Misha choose from (a)–(e). One conversation, not a build.
2. Whichever is chosen: change it, re-walk Priya and Marcus with `tools/walk.js`, and record
   both walks in `journeys-observed.md` under the change.
3. The porn-recovery half goes on the CBT reviewer's list beside `strug`/`low`, `care`/`praise`
   and the `early`/`strug` duplicate.
