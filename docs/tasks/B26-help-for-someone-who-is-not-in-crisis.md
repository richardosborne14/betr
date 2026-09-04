# B26: Help, for the person who is not in crisis

**Status:** **Closed — 2026-09-04. Option (b) shipped, plus one sentence the task had missed**
**Confidence:** 9/10. The diagnosis was already 9; the fix landed smaller than feared, because
the thing in the way never had to move at all
**Date opened:** 2026-09-04 · **Depends on:** B8 (the Help screen), B17 (the crisis block)
**Finding 6 in `docs/journeys-observed.md`, and the "not intimidating" half of the founder's ask.**

## What happened

Dan tapped **Help** for one reason: to find out what BETR costs before typing anything into it.
That is exactly what somebody burned by five paywalled apps does, and §08 says he is the rule,
not the exception — paywall complaints carry a **−1.89 star** penalty and outnumber AI
complaints 34 to 1.

The entire first screen he got was **"If you are in danger or in crisis"** and a phone number.

*"Whoa. I asked what this is and it's opened with a suicide line."*

He scrolled. The page is **4,112px** against an **844px** screen. The thing that would have won
him — **0 results · 0 accounts · 0 B sent to us, ever**, under *"Don't take our word for it"* —
is **2,711px down**. Three and a half screens.

He stayed, and what kept him was near the bottom too: TrybeUP's entry saying in plain words that
its private groups need a paid plan. *"They've told me their own other app is paywalled, in the
small print, about a thing they're not even selling me here. Nobody does that."*

## The thing in the way, and why it stays

**The crisis block is first because B17 put it first, and B17 was right.** The person in crisis
is the person who cannot scroll, cannot read, and gets one chance. Nothing in this task moves it
without the founder saying so in writing, and the recommendation is that it does not move at all.

**But the person tapping *Help* to check the price and the person in crisis are not the same
person, and today they get the same screen.** That is the whole task.

## The options

**(a) Nothing moves; a way to jump is added.** A short row of plain in-page links under the
crisis block — *what this is · what it costs · what leaves your phone · other places* — so the
scroll is a choice. The crisis block keeps position one for the person who needs it.
*Costs:* it is a new element on the screen and it is close to a menu. Rule 10 territory,
though it is a table of contents rather than a place you live in.

**(b) The proof moves up, the crisis block stays.** *Don't take our word for it* and its three
counters go directly under the crisis block, before the CBT explanation and before the nine
sentences. The person checking the catch finds it in one screen.
*Costs:* nothing structural. The nine sentences move down, which is a question for whoever
signed them off — they are frozen in wording, not in order, and that distinction should be
confirmed rather than assumed.

**(c) Two entries instead of one.** The bottom row's *Help* stays as it is; the small print at
the foot of the front screen gains a plain link to the proof.
*Costs:* a second way in, and B19 found that a second way in becomes the only way in.

**(d) Nothing changes.** He scrolled and he stayed.
*Costs:* he is the most patient version of himself in that walk. §08's silent churn is invisible
by construction — people who leave do not review.

**Recommendation: (b), then (a) if it is still long.** (b) is small, moves nothing that matters,
and puts the strongest thing BETR has where it is read.

## The wider thing the founder asked about

*"Universally more understandable and not intimidating."* Help is where BETR's honesty
machinery lives, and every piece of it is right: the crisis lines, the nine sentences, the
psychosis and eating-disorder exclusions, the "not a medical device" line, the fact that we
made it and are not clinicians. **None of it is wrong. All of it arrives at once**, in the first
four thousand pixels, to somebody who wanted to know if this was free.

That is a **sequencing** problem, not a content problem, and B22's rule says how to think about
it: a required category belongs where the person who needs it will find it, not where the person
browsing meets it first. **Nothing gets deleted. The question is only what is met first.**

## What this task may not do

- **It may not move, shorten, soften or hide the crisis block** without the founder saying so in
  writing. Same standing as rule 1.
- **It may not change a word of the nine frozen sentences**, and any change to their **order**
  is checked with whoever signed them off, not assumed to be free.
- **It may not remove the TrybeUP entry or move it up.** Rule 9: never first, never a button,
  never styled apart. It is doing its job exactly where it is.
- **It may not add a fetch of any kind** — no link check, no favicon, no preview.

## Plan

1. Confirm with the founder that the nine sentences are frozen in wording and not in order.
2. Move the proof block up. Measure the new pixel distance to the counters and record it here.
3. Re-walk Dan's first two steps and see whether he still has to scroll to find out what it costs.
4. If it is still over about two screens to the proof, add (a)'s jump row.


---

## What was built (2026-09-04)

**The founder chose (b), and answered a second question the task had not asked.**

### 1. The proof moved to second. The crisis block did not move.

`help()` in `web/app.js` now draws, in order: the crisis lines → **the proof block** → what CBT
is → what this is and the nine sentences → other places → who made this, language, code.

Measured on the walker, 390×844, fold at 785px:

| | before | after |
| --- | --- | --- |
| Whole page | 4,570px | 4,621px |
| Crisis lines | 72px | **72px — unmoved** |
| *Don't take our word for it* | 2,461px | **456px** |
| The three counters | 2,607px | **653px, and their bottom edge is 774px** |
| *What CBT is* | 456px | 827px |
| The nine sentences | 1,216px | 1,587px |
| TrybeUP's paywall admission | 4,116px | 4,167px — unmoved in rank |

**Honest reading of that 774px.** At normal text the counters clear the fold by **11 pixels**.
That is real but it is not comfortable, and at **125% text they fall below it** (the block starts
at 901px against a 780px fold). The sentence that answers the question a person arrives with is
above the fold at **both** sizes — 482–527px normal, ending at 719px at 125%. So: the price is on
screen one always, the counters are on screen one at normal text and one small scroll at 125%.
Do not describe this as "the proof is above the fold" without that second half.

**Nothing was deleted, nothing was reworded, and the nine sentences' own order is untouched.**
A block moved above them; sentence 1 is still sentence 1.

### 2. Help now says what BETR costs. It never had.

The task recorded that the counters were too far down. Reading the file to move them turned up
something the walk had not: **BETR does not say anywhere, in any screen, that it is free.** Not
Help, not the front screen, not `strings-en.js`. The counters say *0 accounts · 0 B sent to us* —
that is the privacy answer. The only price on the whole screen was TrybeUP's, and it is the price
of a different product.

Dan tapped Help to find out what this costs and the screen never answered him. He inferred it.

Founder's call, asked and taken on 2026-09-04, first line under the proof heading:

> **BETR is free. No ads, no subscription, nothing to buy, and nothing to unlock.**

`help.free` in `strings-en.js`. It names BETR and speaks for BETR only; TrybeUP's paid plan is
still stated in TrybeUP's own entry further down, exactly where rule 9 puts it — and that
admission is the other half of what kept Dan, so it was not touched.

**The standing risk, written down because no test can catch it:** if BETR ever gains a thing to
buy, that sentence comes out the same day. `menu.test.js` checks only that it is present.

### 3. Two tests, both verified to fail on a revert

- *Help answers the person checking for a catch on the first screen, under the crisis lines* —
  crisis block above the proof, proof above the CBT explainer, the nine sentences, other places
  and the small print.
- *Help says in plain words what BETR costs, before anything else it explains* — the free line is
  present, is above the CBT explainer, and TrybeUP's paywall line is still below it.

Reverting the move by hand fails exactly these two and nothing else. **180 tests pass.**

### 4. B24's anchor still lands

Door one's note (*"Help has places that are"*) still scrolls to and focuses `#group-substances`.
The page got 51px longer; the jump is by id, so it did not care.

## Decisions

1. **The crisis block was never moved and was never proposed for moving.** B17 holds.
2. **The nine sentences are frozen in wording, not in position** — put to the founder as the
   first thing, and answered by their choosing (b) knowingly. Their wording is checked against
   research §10 by `menu.test.js` and was not touched.
3. **(a)'s jump row was not built.** The plan said "if it is still over about two screens to the
   proof" — it is 456px. A table of contents on a screen whose answer is already on screen one
   would be a menu for no gain (rule 10).

## What is still open

- **The page is still 4,621px.** Moving the proof up fixed who meets what first; it did not make
  Help shorter, and it was never going to. Everything below *What this is* is four more screens.
  Nobody has complained about that half yet, and nothing should be cut on a hunch.
- **`places.signedOff` is still false.** Misha has not signed the list.
- **The 125% case above.** If the counters mattering on screen one is ever the ask, the thing to
  shorten is `help.airplane`, not the order — but it is a good paragraph and nobody has asked.
