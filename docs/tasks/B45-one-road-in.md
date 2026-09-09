# B45: One road in — collapsing three ways of writing a test into one

**Status:** **SCOPED, not started. No longer blocked** — the founder supplied the current mockup
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
| **3** | **The three sizes carry holes of their own** — *Give [my best friend] a little criticism about* **[a thing]** — and she fills the second one on the do screen | A size can only reuse the belief's holes. There is no second hole anywhere |
| **4** | **After she picks a size, all three stay on screen**, with the chosen one filled in above them | B42 **folds** the three onto one line — *HOW BIG A GO · A bigger go · Change* |
| **5** | The plan is **a sentence with editable holes** | The plan is a plain textarea |
| **6** | *What will you do?* sits **at the bottom**, under the suggestions and the safety line | It sits **above** the suggestions |
| **7** | The repeat screen is *"Same again, or a notch up? — your choice, every time"*, with **all three open** and one marked *Last time* | A plan card, an expectation editor, and the three folded into a line |
| **8** | A rung on *Your tests* reads **A small go · about [her playlist]** — the size *and* the word she put in the hole | The size name only |
| **9** | The hole shows **a placeholder noun in the blank** — *a person*, *a thing* — so an empty sentence still reads | Our hole is an empty input; the default word only appears in the rendered predictions below it |

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

**7a. The fold, on the do screen.** The mockup keeps all three sizes on screen after one is
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
| 5b | 21 items get three sizes with holes | **yes** — ~42 sentences | a day, plus the reviewer |
| 5c | one content file | **yes** — 15 wording choices | two days, plus the reviewer |
| 5e | the branches go | no | falls out of the above |

**§6 plus 5d answers the founder's actual complaint, in well under a day, with nothing for the
reviewer.** The rest is the job that makes it stay answered.
