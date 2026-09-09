# B45: One road in — collapsing three ways of writing a test into one

**Status:** **SCOPED, not started. Blocked on two founder decisions, both in §7.**
**Confidence:** 9/10 in the diagnosis — every number below was measured in a browser today and
every one of them is reproducible in one walk. 6/10 in the shape of the fix, which is where the
founder comes in, and 4/10 on what the content costs, which is the reviewer's.
**Date opened:** 2026-09-09 · **Founder's ask**, after opening the app and not finding the thing
he had asked for.
**Supersedes the shape of:** [`B32`](B32-practice-one-tap-aside.md), [`B37`](B37-the-template-with-holes.md) §3,
[`B41`](B41-a-skeleton-with-holes.md), [`B42`](B42-three-sizes.md) — none of them is wrong; they
were built one at a time and never joined up.
**Depends on:** nothing in code. Everything in §7.

---

## 1. What the founder said

> It's confusing as fuck. We now have three systems all intertwined and nobody will know what
> to do. I wanted the verb constructor thing to be the default, and the current version doesn't
> look like the latest mockups. Let's write a new task to unfuck this thing and make it have a
> COMMON user journey, not three or four different paths that share the same underlying
> architecture.

He is right, and the rest of this file is the evidence rather than an argument.

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

They are **not** two different subjects. *"say no without giving a reason"* is start #01 and
worry `no`; *"ask somebody for help"* is start #15 and worry `help`; *"tell someone I'm
struggling"* is start #03 and worry `strug`. Roughly fifteen of the twenty-one are the same
worry written twice, in two shapes, in two files, feeding two screens, with two sets of wording
that have to be reviewed twice and can drift apart at any time.

**Nobody decided this.** B32 built the free-text road, B19/B20 built the worry road, B41 put a
skeleton on two worries and B42 put sizes on two more. Each one was right on its own day.

---

## 3. The three consequences, each provable in one walk

**3a. The thing the founder asked for is on 2 of 21 worries and cannot be reached from the front
door.** The verb constructor — *If I* `say no to` [ ___ ] `without giving a reason` — exists,
works, and was walked end to end in B43. It is behind: front screen → *Not sure? Try one of
these* → *Going along with things I don't want to do* → *Saying no without giving a reason*.
**Four taps, and only for two of the twenty-one.** Both roads a person is most likely to take
never show it once.

**3b. Nineteen of twenty-one worries hand a person a screen headed *Make it yours* with two
empty boxes and nothing in them.** That is a worse screen than the free-text one, because at
least the free-text one is honestly called *Set up a test* and offers twenty-one verbs. *Make it
yours* offers three finished sentences and no way to build one.

**3c. The dial appears and disappears for reasons nobody can see.** Same person, same app, two
sessions: one gets three named sizes and *Too big? Make it smaller* teaching a dial that is
there; the next gets two loose suggestions and the same link teaching a dial that **is not on
the screen**. B44's teaching screen is correct on one road and lying on the other.

---

## 4. The one journey

**One road, one screen shape, one vocabulary, whatever a person tapped to get there.**

| # | Screen | What it says |
| --- | --- | --- |
| 1 | Front | One finished test, and one big button |
| 2 | **What's going on?** | Six doors, plus *None of these — I'll write my own* |
| 3 | **Which one?** | Four to six things, each with its sentence under it |
| 4 | **The sentence** | *If I* `[printed verb]` **[ your word ]** `[printed rest]` **, then** [ ___ ] — and under it, three predictions with your word already in them |
| 5 | **What will you do today?** | The box, and **three named sizes**, always, with your word in them |
| 6 | Locked in → do it → what happened → still sure? → the ladder | unchanged |

**Step 4 is the verb constructor and it is the default.** Every worry has a printed verb. The
person supplies a noun — a person, a thing, a place — and never a verb, which is B37 §5's rule
and the thing that keeps a suggested test *BETR's* content.

**Step 5 always has three sizes.** No road reaches a do screen without a dial on it.

**The free-text road stops being a separate road and becomes the same road with the verb blank.**
*None of these — I'll write my own* and *Write the whole thing myself* both land on **one wide
blank and no printed verb**, which is right: a person writing their own owns the whole sentence
(rule 4, as loosened on 2026-09-08). It is one screen in two states, not two screens — and
critically, **it is an exit, not the entrance.**

**What disappears:** the second build variant (two empty blanks under *Make it yours*), the
second do variant (two loose suggestions), and the invisible lookup that chooses between them.

---

## 5. What has to change, and it is mostly content

**5a. Every worry gets a skeleton.** 19 more. This is the smallest possible unit of the job:
one line per worry, deciding where the hole goes.

    skeleton: { if: 'ask {person} for help with {thing}', holes: { person: 'somebody', thing: 'something' } }

**Not every worry wants one** — *Sitting still when I feel restless* has nobody in it, and
B37 §6 guessed eight to twelve of the twenty-one would earn a hole. **A worry with no hole still
gets a printed verb**, which is the whole point: `sit still with the restlessness` printed, and
only the *then* blank to fill. **The screen is identical either way.** That is what makes it one
journey rather than two.

**5b. Every worry gets three sizes.** 19 more × 2 sentences = 38. Or — see §6 — they fall
through to `general`'s three, which is what nineteen of them do already and nobody has
complained.

**5c. `starts.js` and `worries.js` become one file.** Twenty-one things, one shape. The `thens`
become the three `beliefs`; the `dos`/`drops` pairs are either promoted into sizes or dropped.
**This is the part that needs the reviewer**, because it means choosing, for fifteen overlapping
pairs, which of two reviewed-or-unreviewed wordings survives.

**5d. The code shrinks.** `build()` loses a branch, `buildDo()` loses a branch, `sizesFor()`
loses its fallthrough, `chipsFor('dos'|'drops')` goes, and `startFor()` — the invisible lookup
in §3c — goes with it. Every measurement in B39/B42/B44's fold tables gets simpler, not harder,
because there is one version of each screen to measure.

---

## 6. The cheap first move, and it is genuinely cheap

**The founder can have the verb constructor as the default without anybody writing 250
sentences,** because `starts.js` already contains twenty-one verbs. They are its `if` lines, and
they are already printed on the chips a person taps today.

**One edit per item: decide where the hole goes.**

    if: 'say no without giving a reason'
    →  if: 'say no to {person} without giving a reason', holes: { person: 'somebody' }

That is **21 decisions and about 21 short lines**, not 250 sentences — and it is the same
decision B41 already made twice and B43 already walked. The three predictions and the three
sizes keep falling through to what they fall through to today. **Nothing new goes to the CBT
reviewer for this step**, because no new sentence is written: the verbs are already shipped and
already in the reviewer's sheet as `S01-`…`S21-`.

**What that buys, in one move:** every road prints a verb, the free-text road becomes the escape
hatch rather than the entrance, and §3a stops being true. **What it does not buy:** §3c, the
disappearing dial, which needs `starts.js` items to carry sizes (5b) — another 42 sentences, and
those *are* the reviewer's.

**Recommended order:** 6 first, then 5b, then 5c last. Each one is shippable and each one leaves
the app more coherent than it found it.

---

## 7. The founder's call, and B45 does not start until both are answered

**7a. Is there a mockup newer than B36's?** I read the B36 canvas
(https://claude.ai/code/artifact/5b7cf7c8-1905-43f2-823f-f813871acfb5) today. **Its build screen
has two wide blanks and no printed verb** — it does not show the verb constructor at all. And
**its do screen shows the three sizes as three short chips with one explaining line under them**,
where B42 shipped three whole sentences as three buttons. So either there is a newer canvas
nobody has linked in a task file, or the app has drifted from this one in two places. **Which is
it, and where is the current one?** Everything in §4 is drawn from the written specs (B37, B41,
B42) rather than from a picture, and it should be drawn from the picture.

**7b. Sizes: three sentences, or three chips and a line?** B42 shipped sentences deliberately —
*"a size is a step and the leave-out that belongs to it"*, and tapping one fills both boxes. The
B36 mockup shows chips. **Chips are shorter** (worth roughly 150px at 125% text, which is most
of the fold problem B42 and B44 both fought) **and vaguer**; sentences are longer and specific.
One or the other, on every road, and it is the founder's.

**One thing that is not a decision:** whichever is chosen, it appears on **every** road. The
current split is not a design, it is an accident.

---

## 8. What must not be lost

Every one of these is already true and B45 must leave it true. They are listed because a
refactor this size is exactly how a rule gets dropped by accident.

1. **BETR owns the verb, the person owns the nouns** (B37 §5). A hole takes a person, a thing, a
   place. A hole that takes a verb lets somebody compose a sentence BETR appears to be proposing.
2. **BETR never picks.** Three predictions, three sizes, none numbered, greyed, recommended or
   defaulted, and no box pre-filled with one of them (B42).
3. **One worry, one ladder.** `rate.keyOf()` keys by id. Three predictions, three sizes and every
   different word somebody types into a hole share one ladder (rule 5, walked in B43).
4. **The road decides which worry a test belongs to, not the words** (B40). Merging two content
   files must not change one id: a stored result points at it.
5. **The one hard stop stays on every box and every hole** — a sentence about ending it, or
   hurting anyone (rule 4 as amended).
6. **Nothing BETR writes names the habit, food, weight, the body or anyone's safety.** The
   2026-09-08 loosening was about a person's own words and nothing else.
7. **Fixed content a person chooses from is a chapter in a book.** No screen may appear because
   of what somebody typed (B44, research §6).
8. **Three doors on the bottom row, and the interface is one big button per screen** (rule 10).

---

## 9. Done when

- **One build screen with one shape**, drawn identically from every road that reaches it, with
  the printed verb as the default and the wide blank only where somebody asked to write their own
- **One do screen with one shape**, with three sizes on it from every road
- **`startFor()` is gone**, and with it the invisible lookup that decides which do screen a
  person gets
- `docs/journeys.md` **loses J4 and gains one journey**, because there is one road to walk
- The three roads in [`learnings.md`](../learnings.md) B34 §1 become one, and that entry is
  updated rather than left describing an app that no longer exists
- **A person cannot tell, from any screen, which road they came in on** — that is the acceptance
  test, and it is one somebody can check without reading any code

---

## 10. What this costs

| Step | What | Reviewer? | Rough size |
| --- | --- | --- | --- |
| §6 | 21 verbs get a hole | **no** — no new sentence | half a day |
| 5b | 21 items get three sizes | **yes** — 42 sentences | a day, plus the reviewer |
| 5c | one content file | **yes** — 15 wording choices | two days, plus the reviewer |
| 5d | the code branches go | no | falls out of the above |

**§6 alone answers the founder's actual complaint.** The rest is the job that makes it stay
answered.
