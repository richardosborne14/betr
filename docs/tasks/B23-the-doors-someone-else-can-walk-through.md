# B23: The doors, for the person who did not come here about a habit

**Status:** **First half DONE 2026-09-04 (options c and a, founder's call). Second half open —
door one's list does not serve porn recovery, and that waits for the CBT reviewer and Misha.**
**Confidence:** 9/10 that the loss is real (Priya nearly closed the tab on screen two). **8/10
on the fix as shipped** — it is measured on a real phone and it costs Dan and Marcus nothing
they can see, but it has been walked by nobody outside this building
**Release condition added:** Misha signs off the ORDER as well as the labels and lines (B0 Q2a)
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
> **B22's sort, 2026-09-04, makes (b) cheaper than it reads here.** It does not need a rewrite.
> The damage is **four nouns**, not the sentence: the label is a description and one of the best
> on the screen, the note is pile 2, and the first clause of `under` — *"The one you've quietly
> decided to stop more than once, and haven't"* — is pile 1 and should survive whatever happens.
> Deleting *"— drink, weed, porn, betting"* and nothing else leaves the moment described in the
> words it is already in. See `docs/three-piles.md`, pile 3 entry 1. **The trade above is
> unchanged and this is still Misha's casting vote.**

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

## What the founder chose, and what shipped — 2026-09-04

**(c) and (a), as recommended. (b) was not taken**, so *"— drink, weed, porn, betting"* is still
on the `habit` door, word for word. Dan keeps the thing he valued most. **Misha's casting vote on
those four nouns is still outstanding and is now the only open wording question on this screen.**

**The order is `phone, habit, work, temper, secret, yes`.** `habit` is second, not third, and the
reason is the whole story of this half of the task — see below.

**The intro (c) is now:** *"More than one of these might fit. Read to the bottom, then tap what's
closest. It just points you at the worries that usually sit under it."* It does not say *most
people are in a bit of two*, which is a claim about people nobody here has measured. *More than
one might fit* says the same thing to the reader and claims nothing.

### The hour `habit` spent at door three, and why it is not there

(a) as written says *"door one goes third or fourth"*, and third is what was built and walked
first. The text dump said it fitted. **The screenshot said otherwise.** `nav.menu` is
`position: fixed` over the bottom 59px, so the first screenful is 785px, not 844 — and with
`habit` third its `note` rendered at **800–842px, entirely behind the menu.**

That note is the one line on this screen that tells somebody who is dependent to go elsewhere.
**Marcus read it twice.** Shipping a reorder that hides it would have traded Priya's flinch for
the exact person sentence 4 exists to catch.

`habit` at **second** puts the note at **643–685, a hundred pixels clear.** Priya still does not
open on substances — the first thing she reads is a phone door, which answers *"is this a
recovery app?"* before she can ask it — and she reads the four nouns one door sooner than the
strongest version of the fix would have given her. **That is the cost, and the founder took it
knowingly** when the measurement was put in front of them.

`work` is not first, and that was considered: read in four words, *"Never letting myself stop"*
can be heard as never letting myself stop **drinking**, which sends the wrong person through it.

### What holds it in place

Two tests in `content.test.js`, both written from what actually went wrong:

- **the first door a person reads does not name a substance** — checks door one's label, line and
  note against `guards.HABIT`. It does not pin the six in place; the order is Misha's and the
  founder's to change. It pins the one thing that may not come back. If (b) is ever taken and the
  four nouns are deleted, it passes wherever the door sits, which is correct: the harm was the
  words, not the door.
- **the door carrying the safety note is high enough for the note to be seen** — the note's door
  must be first or second. It is about the *note's* door, not about `habit` by name, so the rule
  travels if the note ever moves.

**Four existing tests broke on the reorder and all four were wrong before it.** Two asserted
`worries[0].label` where they meant "the first worry behind the first door" — true only by
coincidence while `habit` was first. Two read the bare word `missed` off the whole screen to
prove BETR never says *you missed*; behind the `phone` door a worry's own test says *"write down
what you actually missed"*, which is BETR asking, not accusing. `menu.test.js` already had the
right form — `'you missed'` — twenty lines away.

### Re-walked after the change

- **Priya.** Door one is *On my phone more than I want to be*. No substances on screen until she
  has already been told this is not a recovery app. Her door, *Never letting myself stop*, is
  third and its heading is on the first screenful. Reaches *Sending something without checking it
  again* in two taps as before.
- **Marcus.** Door three → door two. His door and its safety note are both fully visible without
  scrolling, which is better than before the change, not merely no worse. Walked to LOCKED IN.
- **Dan.** Door two rather than door one, same words, no scroll. The only thing he loses is
  being first, and nothing on the screen tells him so.

**What is NOT fixed:** she still meets the four nouns on screen two, one door later. If Misha
takes (b) that disappears; if he does not, this is as far as ordering can carry it.

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

1. ~~Founder and Misha choose from (a)–(e). One conversation, not a build.~~ **Done 2026-09-04:
   the founder took (c) and (a). Misha has not seen it.**
2. ~~Whichever is chosen: change it, re-walk Priya and Marcus with `tools/walk.js`, and record
   both walks in `journeys-observed.md` under the change.~~ **Done 2026-09-04.**
3. **Open.** The porn-recovery half goes on the CBT reviewer's list beside `strug`/`low`,
   `care`/`praise` and the `early`/`strug` duplicate.
4. **Open.** Misha on the order and on the four nouns, together. He is being asked two questions
   about the same screen and should be asked them once.
