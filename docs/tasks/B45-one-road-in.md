# B45: One road in — collapsing three ways of writing a test into one

**Status:** **§6 and §5d shipped in B46. §5b SHIPPED 2026-09-09. §5e's core SHIPPED
2026-09-10 (§12). §5c SHIPPED 2026-09-10 — `starts.js` is gone, there is one content file,
and `startFor()` went with it (§13). §7a ANSWERED 2026-09-10: the fold stays, so §3's
difference 4 is CLOSED as a no. §3's difference 9 is STRUCK — it was never a drift
([`B48`](B48-the-greyed-example-belongs-to-this-worry.md)).
**§3's differences 3, 5 and 8 are BUILT ON ONE WORRY, 2026-09-10
([`B49`](B49-the-grey-lines-and-a-size-of-its-own.md)), the founder's call over the
recommendation** — `no` carries `{thing}`, the plan is that sentence with a blank in it, and the
rung reads *A small go · the Saturday thing*. **Nineteen worries have no such hole and that is
sixty sentences for the reviewer, not a session's.** What is left of §3 is differences 6 and 7,
and the other nineteen worries' content.**
**Status when it was written:** **SCOPED, not started. No longer blocked** — the founder supplied the current mockup
on 2026-09-09 and it answers both questions the first draft of this file was waiting on.
**Confidence:** 9/10 in the diagnosis — every number below was measured in a browser today.
8/10 in the shape of the fix, because the mockup is now the spec rather than my reading of three
task files. 4/10 on what the content costs, which is the reviewer's.
**Date opened:** 2026-09-09 · **Founder's ask**, after opening the app and not finding the thing
he had asked for.
**THE MOCKUP, AND IT IS THE SPEC:** https://claude.ai/code/artifact/77d1cadb-a55b-4926-8281-ea0a0556d73f
— *The template with holes*, seven phone screens and four notes. Where this file and that canvas
disagree, **the canvas wins.**
**Supersedes the shape of:** [`B32`](B32-practice-one-tap-aside.md), [`B37`](B37-the-template-with-holes.md) §3,
[`B41`](B41-a-skeleton-with-holes.md), [`B42`](B42-three-sizes.md) — none of them is wrong; they
were built one at a time, from prose, and never joined up.
**Depends on:** nothing.

---

## 1. What the founder said

> It's confusing as fuck. We now have three systems all intertwined and nobody will know what
> to do. I wanted the verb constructor thing to be the default, and the current version doesn't
> look like the latest mockups. Let's write a new task to unfuck this thing and make it have a
> COMMON user journey, not three or four different paths that share the same underlying
> architecture.

He is right on both counts, and the rest of this file is the evidence rather than an argument.

---

## 2. The map: what is actually in the app today

**One screen called *the build screen* is drawn three different ways**, and which one a person
gets is decided by a road they cannot see.

| What it looks like | When you get it | How often |
| --- | --- | --- |
| **Set up a test** — one wide blank after *If I*, twenty-one verb suggestions under it, then three prediction suggestions | the front screen's big button, **and** *New test* on the bottom row | **the front door** |
| **Make it yours** — **two empty blanks** and three whole prediction sentences. Nothing printed, nothing to fill in | the worry road, on a worry with no skeleton | **19 of 21 worries** |
| **Make it yours** — *If I* `say no to` **[ ___ ]** `without giving a reason` **, then** [ ___ ] | the worry road, on a worry with a skeleton | **2 of 21 worries** |

**And one screen called *the do screen* is drawn two different ways.**

| What it looks like | When you get it |
| --- | --- |
| **How big a go? Any of them counts:** — three named sizes, whole sentences | the worry road, always; and the free-text road **when the sentence is not one BETR wrote** |
| **One small thing, your pick. / Or one of these:** — two loose suggestions, no sizes, no dial | the free-text road **when the person tapped one of BETR's own twenty-one suggestions** |

**Read those last two rows again, because this is the worst single fact in the file.**

> **Tapping BETR's own suggestion gets you the OLD screen. Typing something BETR has never seen
> gets you the NEW one.**

It is exactly backwards, nobody could predict it, and it is not a bug anybody wrote: it falls
out of `sizesFor()` looking up `starts.js`, where **0 of 21 items have sizes**, before falling
through to `general`, which does.

> **FIXED 2026-09-10 — §12.** A matched start with no sizes of its own falls through to the
> general three like every other road. The second do variant is gone from the code, and
> `loop.test.js` walks all three roads into that screen and holds them to one shape.

## 2b. And underneath, two content files describing the same twenty-one things

| | `content/worries.js` | `content/starts.js` |
| --- | --- | --- |
| how many | 21 | 21 |
| what one is | `label`, `belief`, three `beliefs`, `test`, `drop`, `lane` | `if`, three `thens`, two `dos`, two `drops` |
| has a skeleton | **2** | 0 |
| has three sizes | **2** | **0** (only `general` does) |
| which screen | the worry road | the free-text road |
| knows the other exists | no | no |

Roughly fifteen of the twenty-one are the same worry written twice, in two shapes, in two files,
feeding two screens, with two sets of wording that have to be reviewed twice and can drift apart
at any time. **The mockup's own example makes the point:** its worry is ***Saying what I actually
think***, which today exists only as `starts.js` item #10 and has no entry in `worries.js` at
all. The screen the founder is looking at cannot be built without merging the two files.

**Nobody decided this.** B32 built the free-text road, B19/B20 built the worry road, B41 put a
skeleton on two worries and B42 put sizes on two more. Each was right on its own day.

---

## 3. The mockup, and the nine ways the app has drifted from it

The canvas is seven screens: *picked a skeleton → she fills one hole → three sizes carrying her
words → she picks a size and fills the second hole → the same screen with nothing prefilled →
doing it again → three wordings, one ladder.*

**Two of those seven are already shipped and correct.** Screen 7's *one ladder under three
different wordings* is B40, walked end to end in B43. Screen 5's *"there is no mode to leave"* is
the design B45 §4 argues for, and the canvas note already says it in one line.

**Everything else has drifted.** Hardest first.

| # | The mockup | The app today |
| --- | --- | --- |
| **1** | **Every** worry's sentence is a printed verb with a hole in it — *If I* `criticise` **[a person]** | **2 of 21.** The other nineteen show two empty blanks under a heading that says *Make it yours* |
| **2** | **The carried word is marked.** A soft blue highlight wherever a word she typed appears somewhere she did not type it. The canvas note calls this *"the closest thing to intelligence BETR is allowed to have"* | `content.fill()` returns plain text. The substitution happens **invisibly** — the one moment the mechanic could explain itself, and nothing on screen says anything happened |
| **3** | **The three sizes carry holes of their own** — *Give [my best friend] a little criticism about* **[a thing]** — and she fills the second one on the do screen | **BUILT 2026-09-10 ([`B49`](B49-the-grey-lines-and-a-size-of-its-own.md)), ON ONE WORRY.** `no`'s small go is *Say no to {person} once today, about {thing}* and the blank is on the plan screen. `content.js` refuses a hole outside the if-half anywhere but a size's `do`, so the silent road §5b describes cannot be built by accident again. **The other nineteen need sixty sentences and they are the reviewer's** |
| **4** | **After she picks a size, all three stay on screen**, with the chosen one filled in above them | B42 **folds** the three onto one line — *HOW BIG A GO · A bigger go · Change* |
| **5** | The plan is **a sentence with editable holes** | **BUILT 2026-09-10 (B49), WHERE THERE IS A HOLE TO EDIT.** Difference 5 and difference 3 were one job: with no hole of its own a size's sentence has nothing editable in it that was not already typed a screen earlier, so the plan is the sentence exactly where the canvas's is — on a size with a hole — and the box everywhere else. `Change` is the way back to free text and it was already there |
| **6** | *What will you do?* sits **at the bottom**, under the suggestions and the safety line | It sits **above** the suggestions |
| **7** | The repeat screen is *"Same again, or a notch up? — your choice, every time"*, with **all three open** and one marked *Last time* | A plan card, an expectation editor, and the three folded into a line |
| **8** | A rung on *Your tests* reads **A small go · about [her playlist]** — the size *and* the word she put in the hole | **BUILT 2026-09-10 (B49).** *A small go · the Saturday thing* for the eye, *“Done at: A small go, the Saturday thing.”* for the ear — the canvas's middle dot is not read aloud in the middle of somebody's own words. The canvas's *“about”* is not carried: it belongs to the sentence, not to the word |
| ~~**9**~~ | ~~The hole shows **a placeholder noun in the blank** — *a person*, *a thing* — so an empty sentence still reads~~ | ~~Our hole is an empty input; the default word only appears in the rendered predictions below it~~ **NOT A DRIFT AND NEVER WAS — struck 2026-09-10 ([`B48`](B48-the-greyed-example-belongs-to-this-worry.md) §6).** `skeletonHalf()` has printed the hole's word as a greyed placeholder since B41, and B41's comment argues for a placeholder over a value. **This row was read off the canvas and not off the screen.** |

> **DIFFERENCE 4 IS CLOSED, 2026-09-10, AND IT IS A NO.** Asked of the founder with both
> screens drawn side by side; they chose **the fold**. The three tuck away after one is picked,
> *Lock it in* stays above the fold, and the *Change* link is the answer to "no rung is ever
> taken away" — it shows the words, it does not hide them (B39). **The canvas is overruled on
> this one row, on purpose, by the person whose canvas it is.** §7a below is settled; do not
> "restore" the open three. Recorded in [`B48`](B48-the-greyed-example-belongs-to-this-worry.md) §5.

**Difference 4 is a real collision and not a drift.** B39 spent a whole task getting *Lock it in*
above the fold on that screen, and B42 folded the three because open they cost 257px and put the
button at 862 against a 785 fold. **The mockup draws its own fold line and accepts being below
it** — its Sizes and Picked boards are 1000px tall. That is a decision, it is the founder's, and
it is §7a.

---

## 4. The one journey

**One road, one screen shape, one vocabulary, whatever a person tapped to get there.**

| # | Screen | What it says |
| --- | --- | --- |
| 1 | Front | One finished test, and one big button |
| 2 | **What's going on?** | Six doors, plus *None of these — I'll write my own* |
| 3 | **Which one?** | Four to six things, each with its sentence under it |
| 4 | **Make it yours** | *If I* `criticise` **[a person]** **, then** [ ___ ] — three predictions under it, **each carrying her word, marked** — then the safety line, then *What will you do?* |
| 5 | **What will you do today?** | Three sizes, each a name and a sentence **carrying her word and offering a second hole**. She picks one; **all three stay**; the chosen one fills in above. Then *And leave out*, then *Lock it in* |
| 6 | Locked in → do it → what happened → still sure? → the ladder | Rungs read **A small go · about her playlist** |

**Step 4 is the verb constructor and it is the default.** Every worry has a printed verb. The
person supplies a noun and never a verb — B37 §5, and the canvas's `note-verb` says it in the
same words. **A worry with nobody in it still gets a printed verb** and only the *then* blank to
fill: `sit still with the restlessness` printed, one blank after it. **The screen is identical
either way**, and that is what makes it one journey rather than two.

**The free-text road stops being a road.** The canvas settles this in one line:

> *"Screen 5 is the answer to 'or can they?' — it is the SAME screen with nothing prefilled.
> **There is no mode to leave.**"*

*None of these — I'll write my own* lands on that screen with every blank empty and no printed
verb, which is right: a person writing her own owns the whole sentence. **It is an exit, not the
entrance**, and it is not a second screen.

**What disappears:** the second build variant (two empty blanks under *Make it yours*), the
second do variant (two loose suggestions), and the invisible lookup that chooses between them.

---

## 5. What has to change, and it is mostly content

**5a. Every worry gets a skeleton.** 19 more, one line each:

    skeleton: { if: 'criticise {person}', holes: { person: 'a person' } }

**5b. Every worry gets three sizes, and the sizes get their own holes** (difference 3). 19 × 2
sentences, plus a second hole name where the size wants one.

> **DONE, 2026-09-09, except the second hole.** Fifteen worries gained three sizes each — the
> cull had already taken twenty-one to seventeen, and `no` and `strug` had theirs from B42.
> **Sixty new sentences**, all ninety rows in `docs/suggestions-review.csv` as `W-*-D1`…`X3`.
> `sizes` is **required** on a worry now (`content.js checkSizes`), and **the smallest of the
> three is the worry's own `test` and `drop` word for word** (`checkSizes0`), so one worry
> holds one wording rather than two and §5c can delete the pair without deciding anything.
> Fourteen `test` lines were reworded to carry the worry's hole; `low` also lost *"one person
> you trust"*, which is a `W-LOW-D1` question for the reviewer.
>
> **DONE 2026-09-10 ON ONE WORRY — [`B49`](B49-the-grey-lines-and-a-size-of-its-own.md).** The
> screen change below is built and `no` has the first one. **The nineteen are still open, and
> they are content**: read the sixty with the founder and Misha and see which already have words
> standing in for something a person would name. Where they do it is free, the way `no`'s was —
> *about something small* became `{thing}` and not one word on the screen changed.
>
> **THE SECOND HOLE — difference 3 — IS NOT DONE AND IS NOT CONTENT.** The mockup's *Give [my
> best friend] a little criticism about [a thing]* fills its second blank on the **do** screen,
> and there is no blank on that screen: `holeRow()` draws inputs by scanning the skeleton's
> `if`, so a hole used only in a size is declared, validated, and then silently prints its own
> default for ever. It is a screen change, it belongs with the four in §3, and none of the
> sixty sentences needs it.
>
> **WHAT DID NOT GET WRITTEN IN, ON PURPOSE.** Two lines out of the redraft sheet were listed
> as inputs to this step and neither could land:
> - **`S15-D1`, the founder's *"someone you're comfortable with"*.** It changes **who** the
>   step is with, which is exactly B42's open question (`W-NO-D1` / `W-ST-D1`) and the
>   reviewer's, with Misha — and on the worry road she has already named the person in the
>   blank a screen earlier, so a size that renames them contradicts her own words. It lands in
>   §5c, where `starts.js` #15 has no hole, or as the who-dial once the reviewer rules.
> - **`S18-D1`, the founder's *"where you're allowed to"*.** The redraft sheet asks them
>   whether they want it, and says it belongs in `early`'s **small go**. They have not answered,
>   and shipping it would put *asking permission* into the smallest version of the one test
>   that is about not asking permission. **One line of `early`, the moment they say yes.**

**5c. `starts.js` and `worries.js` become one file.** Twenty-one things, one shape. The `thens`
become the three `beliefs`; the `dos`/`drops` pairs are promoted into sizes or dropped. **This is
the part that needs the reviewer**, because it means choosing, for fifteen overlapping pairs,
which of two wordings survives.

**5d. `content.fill()` learns to mark what it carried** (difference 2). It currently returns a
string; it needs to return a string plus where the substitutions landed, so the caller can wrap
them. **This is the smallest code change on the list and the biggest change to what a person
understands** — it is the entire mechanic, currently invisible.

**5e. The code shrinks.** `build()` loses a branch, `buildDo()` loses a branch, `sizesFor()`
loses its fallthrough, `chipsFor('dos'|'drops')` goes, and `startFor()` — the invisible lookup in
§2 — goes with it.

> **MOSTLY DONE, 2026-09-10 — see §12.** `buildDo()` lost its branch, `sizesFor()` lost its
> fallthrough, `chipsFor()` became `thensFor()` and serves one set, and `prefillPlan()` and
> `draft.planned` went with them. **`startFor()` is still there**, because it still decides
> which three predictions the second blank offers — it cannot go until `starts.js` and
> `worries.js` are one file. What it lost is its power to decide which SCREEN a person gets.
> `build()` still has its branch: the free-text road has one wide blank where the worry road
> has a printed verb, and that is §4's "exit, not entrance" rather than a drift.

---

## 6. The cheap first move, and it is genuinely cheap

**The founder can have the verb constructor as the default without anybody writing 250
sentences,** because `starts.js` already contains twenty-one verbs. They are its `if` lines, and
they are already printed on the chips a person taps today.

**One edit per item: decide where the hole goes.**

    if: 'say no without giving a reason'
    →  if: 'say no to {person} without giving a reason', holes: { person: 'somebody' }

That is **21 decisions and about 21 short lines**, not 250 sentences — the same decision B41
already made twice and B43 already walked. **Nothing new goes to the CBT reviewer for this step**,
because no new sentence is written: the verbs are already shipped and already in his sheet as
`S01-`…`S21-`.

**Do 5d in the same move.** Marking the carried word is one function and one CSS rule, it needs
no content and no reviewer, and without it a person fills a hole and watches nothing visibly
happen. §6 + 5d together is the demo.

**Recommended order:** §6 + 5d, then 4/5/6/7 of the drift table (the screen shapes), then 5b,
then 5c last. Each is shippable and each leaves the app more coherent than it found it.

---

## 7. What is still the founder's, and it is now two things rather than two questions

**7a. ANSWERED 2026-09-10, AND THE ANSWER IS THE FOLD.** The founder was shown both screens and
chose the one that ships: **after somebody picks a size, the other two tuck away**, and *Lock it
in* stays above the fold. B39's task holds, B42's fold holds, difference 4 is closed as a no.
Everything below is the record of the trade, kept because the canvas still draws the other one.

**7a, as it stood. The fold, on the do screen. IT IS NOW ON EVERY WORRY AND NOT ON TWO** (§5b, 2026-09-09).
Measured on a 390×844 phone at 100% text, on `feed` with *three days* typed into the blank:
arriving with the three open the page is **1005px against an 844px screen — 161px below the
fold, and *Lock it in* is not on it.** Tapping one folds the row and the page comes back to
850px, 6px over. So the trade below is no longer a question about two worries; it is what
everybody meets. Nothing was changed either way here: B42's fold is still what ships. The mockup keeps all three sizes on screen after one is
picked and accepts running past the fold. B39 spent a task getting *Lock it in* above it and B42
folded the three to keep it there. **Both cannot be true.** Measured, at 125% text on a 390×844
phone: folded, *Lock it in* sits at 574 against a 780 fold; open, it is at 870. The mockup's own
argument is that a person who has just picked *A small go* must be able to see that *A bigger go*
still exists — **no rung is ever taken away** — and folding hides it behind a *Change*. Founder's
call, and it is a real trade.

**7b. The two the canvas itself leaves open**, quoted from its `note-open`:

> **1. Does this sound like a person?** Read *"Give my best friend a little criticism about her
> playlist"* out loud. If she would never say *"a little criticism"*, that is BETR's voice in her
> mouth. **Misha's.**
>
> **2. Should *A small go* change WHO it is with?** These three turn one dial — how big a thing.
> CCI's first dial is a different one. **The reviewer's, with Misha.**

Both are already in `docs/suggestions-review.csv` as `W-NO-D1` / `W-ST-D1` and in `docs/COPY.md`.

---

## 8. What must not be lost

1. **BETR owns the verb, the person owns the nouns** (`note-verb`, B37 §5). A hole takes a
   person, a thing, a place. Never a verb.
2. **BETR never picks.** Three predictions, three sizes, none numbered, greyed, recommended or
   defaulted, and no box pre-filled with one of them.
3. **One worry, one ladder.** `rate.keyOf()` keys by id — screen 7 of the canvas, shipped in B40
   and walked in B43.
4. **The road decides which worry a test belongs to, not the words** (B40). Merging two content
   files must not change one id: a stored result points at it.
5. **The one hard stop stays on every box and every hole** — a sentence about ending it, or
   hurting anyone.
6. **Nothing BETR writes names the habit, food, weight, the body or anyone's safety.** The
   2026-09-08 loosening was about a person's own words and nothing else — and it now covers
   every skeleton and every size.
7. **No screen appears because of what somebody typed** (B44, research §6).
8. **Three doors on the bottom row** (rule 10).

---

## 9. Done when

- **One build screen with one shape**, drawn identically from every road, printed verb by default
- **One do screen with one shape**, three sizes on it from every road
- **A filled hole is visibly carried** — she types a word once and can see where it went
- **`startFor()` is gone**, and with it the invisible lookup that decides which do screen a
  person gets
- `docs/journeys.md` loses J4 and gains one journey, because there is one road to walk
- The three roads in [`learnings.md`](../learnings.md) B34 §1 become one, and that entry is
  updated rather than left describing an app that no longer exists
- **A person cannot tell, from any screen, which road they came in on** — the acceptance test,
  and one somebody can check without reading code
- **Every screen matches the canvas**, or the canvas has been changed on purpose and says so

---

## 10. What this costs

| Step | What | Reviewer? | Rough size |
| --- | --- | --- | --- |
| §6 | 21 verbs get a hole | **no** — no new sentence | half a day |
| 5d | the carried word is marked | **no** | an hour |
| 3 · 4/5/6/7 | the four screen-shape drifts | no | a day |
| 5b | ~~21~~ 15 items get three sizes | **yes** — 60 sentences, in the sheet | **done 2026-09-09** |
| 3 · difference 3 | a size's own hole, filled on the do screen | no | still to do, and it is a screen change |
| 5c | one content file | **yes** — 15 wording choices | two days, plus the reviewer |
| 5e | the branches go | no | falls out of the above |

**§6 plus 5d answers the founder's actual complaint, in well under a day, with nothing for the
reviewer.** The rest is the job that makes it stay answered.


---

## 11. What §5b actually shipped, 2026-09-09

**Confidence: 8/10.** 9 on the shape — the invariant means one worry cannot hold two answers
to one question, and the fifteen were written against a pattern the founder has already seen
twice. **6 on the sentences**, and that is the honest number: sixty of them went in in one
sitting, nobody but this session has read one, and they are BETR proposing something to
somebody with no clinician anywhere near them. That is what the ninety sheet rows are for.

| | |
| --- | --- |
| Content | 15 worries × 3 sizes. `no` and `strug` untouched — they were the pattern |
| New sentences | **60** (two new sizes per worry, a `do` and a `drop` each) |
| Reworded | **14 `test` lines**, to carry the worry's hole. `low` also lost *"one person you trust"* |
| Changed default | `drink`'s `{thing}` went *"something"* → *"the next thing"*: the small go already says *"order something soft"* |
| Rules added | `sizes` **required** on a worry; `sizes[0]` **is** the worry's own `test`/`drop`, word for word |
| Sheet | **+90 rows**, `W-*-D1`…`X3`, inserted beside each worry's predictions. CRLF and BOM intact |
| Tests | 255 pass (was 254). One assertion was **reversed**: *"most worries have none at all"* is now *every worry has three* |

**What a walk on a phone showed, and it is the thing to look at:** the dial is on the road
most people are on, and the word she typed into the blank arrives in all three sizes marked —
*"Go **three days** without opening the apps you scroll"*. That is the founder's canvas note
about the closest thing to intelligence BETR is allowed to have, on fifteen more worries.

**What this makes dead, and it is deliberate:** `prefillPlan()` now returns on every road, so
nothing in the app reads a worry's `test` or `drop`. They are held equal to the small go
rather than deleted, because deleting two of the seven parts of a worry (scope §5.2) is §5c's
job and it is the founder's list to shorten, not a session's.

---

> **ANSWERED 2026-09-10 by [`B49`](B49-the-grey-lines-and-a-size-of-its-own.md), and the
> founder chose the wording.** Both grey lines on that screen were wrong, not one: the plan box
> said “or” above the three, and the leave-out box next to it was printing the worry `no`'s own
> leave-out on all twenty. They now name the box and point down, in the same shape. Misha still
> has to read them.

## 12. What §5e shipped, 2026-09-10 — one do screen

**Confidence: 9/10.** 9 rather than 10 for one reason and it is a content reason, written out
below: twelve roads lost a hand-written pair of sentences and got the generic three instead.
The shape is not in doubt — three roads were walked into that screen in a browser and a test
now walks all three and asserts they are the same screen.

### What was actually wrong

`sizesFor()` was a fallback chain that **stopped at the first match rather than at the first
answer**:

    if (f && f.sizes) return f.sizes;          the worry's own three
    var start = startFor(ifPart);
    if (start) return start.sizes || null;     ← a matched start, and NO start has sizes
    return STARTS.general.sizes || null;

So a matched start returned `null`, and `buildDo()` drew its other shape. Walked in Chrome
before the change, on the front door: tapping suggestion #01, *say no without giving a reason*,
gave **two loose lines, no names, no dial** — while the same act on the worry road (`no`) gave
three named sizes, and typing something BETR had never seen gave the general three.

**And the old screen had a second fault visible in the screenshot:** its placeholder was
*"Say no to one thing today, in one sentence."* — word for word the first suggestion under it.
A plan that appears to be already in the box, sitting on top of the two it duplicates.

### What changed

| | |
| --- | --- |
| `sizesFor()` | falls through a matched-but-empty start to `general.sizes`, which `content.js` makes **required** — so it cannot return nothing, and the screen cannot have a second shape |
| `buildDo()` | one branch instead of two: one list of three, one row, one handler, one placeholder |
| `chipsFor()` | is `thensFor()`. It served four chip sets and serves one — the second blank's predictions |
| `prefillPlan()`, `draft.planned`, `betrs` | **gone.** All three were provably dead once every worry had sizes (§5b); the boxes start empty on every road, because the three ARE the plan |
| `build.doSub`, `build.doPlaceholder`, `build.doChips` | deleted. They were the other screen's words and nothing drew them |
| `starts.js` | **no data change.** Its `dos`/`drops` are still there, still held to the three word lists, and a header block says plainly that no screen draws them |
| Tests | 256 pass (was 255). One new, two rewritten |

### Measured, 390×844, after

| | *Lock it in* | fold | page |
| --- | --- | --- | --- |
| tapped suggestion, 100% | 695–777 | 785 | 950 |
| tapped suggestion, 125% | 860–950 | 780 | 1186 |
| typed own words, 125% | 827–917 | 780 | 1153 |

**This does not create a new fold problem, it finishes an old one.** §7a already says the three
open put *Lock it in* below the fold on every worry; the last road that was not on that footing
is now on it. **§7a is unchanged as a question and bigger as a fact: it is every road now.**

### What it cost, and it is real

Twelve starts each carry a hand-written pair — *"Say no to one thing today, in one sentence."*
— about the exact words the person tapped. That pair is no longer drawn, so those roads get
*"Do it once today, in the smallest version that still counts."* instead. **A better sentence on
one road in twelve is worth less than one shape on all of them** — a screen that changes shape
for reasons a person cannot see is not a screen anybody can learn — but the sentence really was
better, and §5c is what gets it back: nine of the twelve starts are the same act as a worry that
already has three sizes of its own.

**Nothing was thrown away.** The 24 sentences stay in `starts.js` as §5c's raw material, and the
45 sheet rows that said `shipped` now say `CUT — no longer in the app`, each with the reason on
the row (the same status B42 used for the general set's two). `docs/COPY.md` prints them marked
***(parked)*** with a paragraph saying nobody needs to read a parked line for tone, and
`docs/changing-the-words.md` no longer tells the founder that editing one changes a screen.

### One thing seen and not changed, because it is a sentence and not a screen

The box's placeholder on arrival is **"Or put it in your own words."** — and it now sits *above*
the three it is saying "or" about, on every road. The founder's canvas has *"Write what you'll
do, or start from one of the three below."* in that box, which reads in the right order.
**One string, Misha's and the founder's, and it would be a one-line change.**

## 13. What §5c shipped, 2026-09-10 — one content file

**`web/content/starts.js` no longer exists.** Twenty worries, one shape, one file. `startFor()`
— the invisible lookup §9 asks for the head of — is gone with it, and §9's fourth bullet is met.

### What was actually in the two files

Twelve starts. **Nine were the same act as a worry already in `worries.js`**, written a second
time, in a second shape, with its own three predictions and no sizes at all. Three were not a
worry at all — and one of those three, *say what I actually think*, is the act the founder's
canvas builds all seven of its screens on.

It read like duplication. It was a fork: two wordings, both shipped, each reached down a road a
person cannot see, neither named as the live one. That is [`learnings.md`](../learnings.md)'s
entry for the day.

### What changed

| | before | after |
| --- | --- | --- |
| content files describing a worry | 2 | **1** |
| worries | 17 | **20** — `want`, `think` and `ontime` had no worry and now do |
| the front door's twelve suggestions | twelve sentences of their own | **twelve worry ids**, in the same order |
| the second blank, after tapping one | that start's three `thens` | **that worry's three predictions** |
| the plan screen, after tapping one | the generic three | **that worry's own three sizes** |
| sentences BETR proposes, swept by the word lists | 102 | **269** |
| rows the reviewer is being asked to score | 314 | **295** (58 duplicate start rows out, 39 new worry rows in) |

- **`worries.js` also holds the two things that were never a worry.** `BETR_GENERAL` — the three
  predictions and three sizes a sentence BETR did not write falls through to — and `BETR_FRONT`,
  which twelve of the worries the first blank offers, in what order. Both are validated by rules
  of their own (`validateGeneral`, `validateFront`).
- **`matchFor()` replaced `startFor()`.** It matches the first blank against a worry's skeleton
  with its holes at their own default words — the same sentence the chip printed. Word for word
  or nothing, and **it does not borrow**: it hands back suggestions and never an id, so §8.4
  holds and no ladder is touched by what somebody typed.
- **A skeleton is required on a worry now**, the way `sizes` became required in §5b. It was
  optional through B41 and B42, and that optionality WAS the second build screen. Three dead
  `f.skeleton ? … : …` branches went with it.
- **`why.js` gained three entries**, because an explanation may never outlive — or predate — the
  worry it explains.
- **The `yes` door is off `THIN_DOORS`.** It had been a dated exception at three since B47's cull;
  `want` and `think` are the door's own content, not borrowed from another one, and it is five.
- **The placeholders in both blanks are the first suggestion word for word.** They were start #01
  of a file that no longer exists, and after the merge they matched nothing — so typing the greyed
  words got the general three while the chip directly under them got `no`'s own. A new test holds
  them together.

### The one overlapping pair where the start's wording won

`rest` prediction 3 said *"somebody will think I'm not pulling my weight"*. `S08-P3` said
*"somebody will think I've gone slack"* for the same act and **had already been through the
founder**; the worry's had not. It also carried a word-list hit — "weight" is on the `BODY` list —
which only surfaced because the sweep in `content.test.js` widened from 102 lines to 269 and
started reading predictions. An idiom about workload reading as a sentence about a body.

Everywhere else the worry's wording survived, because it is the one with the holes, the `expect`
and the three sizes. **The three orphans carry their start's predictions forward** — all nine,
reworded to start from the new skeleton — so nothing the founder had already read was thrown away.

### Walked, 390×844, all three roads

1. **Tapped** BETR's first suggestion → *say no to somebody without giving a reason* → `no`'s own
   three predictions → **`no`'s own three sizes**: *"Say no to somebody once today, about
   something small."* Before today that road got *"Do it once today, in the smallest version that
   still counts."*
2. **Typed** a sentence BETR did not write → the general three, as it should.
3. **Borrowed** `think` through the `yes` door, *my brother* in the hole → three predictions and
   three sizes carrying her word, through to the ladder.

### Measured, and it is one number the next session needs

**The chip row grew.** Twelve chips were 353–998px (645 tall); they are now **382–1050px (669
tall)**, because a worry's sentence is longer than a start's was — *say no to **somebody**
without giving a reason*. **`What will you do?` is at 271 and unaffected**, because it sits above
the row. But **difference 6 — moving that button below the suggestions, as the canvas draws it —
is further out of reach than §3 measured it**, not closer. It waits on a cull of the twelve, or
on the founder accepting the fold.

### Three things this leaves open, and all three are somebody else's

1. **`ontime` is behind `work` and it is the weakest door fit of the twenty.** "Never letting
   myself stop" is about standards, and so is refusing to arrive without a margin — but nobody has
   said that is where a person would look for it. **Founder's and Misha's.**
2. **The standing-in word does double duty on the front door.** *If I say no to **somebody**
   without giving a reason, then **somebody** will think I'm selfish.* It reads as one person and
   it is meant to; on the worry road she has typed a name and it is unambiguous. **Misha's**, and
   it is in `docs/COPY.md`.
3. **The `yes` door's own line still names three worries and it has five.** It was already unread
   by Misha after B47 rewrote it; it is now also out of date.

### What it did not do

**Difference 3 — a size's own second hole — is still not built, and §3 of the handoff is right
that it is difference 5.** Nothing in the merge needed it and no size has one.

**Confidence: 8/10.** 9 on the code — one file, one lookup, three dead branches gone, 259 tests
pass and the loop was walked on all three roads in Chrome. **6 on the content**, and honestly so:
three new worries are 39 unreviewed sentences that BETR proposes, written in one session by
somebody who is not the reviewer. They are in `docs/suggestions-review.csv` with a flag on each,
and `W-THINK-D3` and `W-ONTIME-D3` carry a direct question about whether the largest step is safe
as written. **Nothing here should reach a person before the reviewer has read those 39 rows.**
