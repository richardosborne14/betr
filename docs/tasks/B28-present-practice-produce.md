# B28: Present · Practice · Produce — the way in, not the engine

**Status:** **Direction chosen by the founder, 2026-09-08. Mockups made; nothing built in `web/`.**
The mockups: https://claude.ai/code/artifact/59278217-cc23-4e17-804e-97a917507497 (seven phone
screens and two notes; the founder can edit the words on them directly)
**Confidence:** 7/10 in the diagnosis, 5/10 in the shape below — one person's account, and
that person is a CBT graduate, not the audience in scope §1
**Date opened:** 2026-09-08 · **Founder's ask**, thinking aloud after two of their own worries
arrived outside the app
**Depends on:** nothing to think about; B19 and B20 to change, Misha for the audience call

## What the founder said

> Driving home, mild road rage behind a slow car, and thought: I could put in a CBT statement
> like "If I don't overtake slow cars, I'll end up late for my appointments" — obviously not
> true on a ten-minute drive, and I'd reduce my belief pretty quickly.
>
> Arguing with my spouse the other night, and thought: I should do an experiment like "If I
> don't get the last word, I'll feel weak", and maybe invite my spouse to take part.
>
> I haven't opened BETR since making it. I don't gel with canned worries, and the custom worry
> builder doesn't make sense to me. Those examples aren't worries; they're me being educated
> about the power of CBT experiments and wanting to do my own. In my language coaching I use
> Present · Practice · Produce: show someone they have a gap in something that matters to them,
> let them practise it low-stakes, then have them produce it with their own issue until they
> are autonomous. The canned list could be the practice; what's missing is the present. Nobody
> is using it and I want to get it right, even if that means a rewrite.

## The assessment given in session

1. **Both examples are exactly what BETR is built to test.** Each is a conditional assumption
   with a checkable prediction, in a green lane (research §6: assertiveness; rules about time
   and productivity from the CCI perfectionism module). The engine — lock the prediction, do it,
   write what happened, re-rate, ladder — is the right engine for them. Nothing in the loop has
   to change.
2. **The way in is wrong, and it is wrong in a way the app already half-knows.** B20's learning
   is that a guess about somebody's worry cannot be disconfirmed. Three predictions was a patch.
   The founder's point generalises the patch: nobody's worry is a stock worry; stock worries are
   *teaching examples*. Today the person's own words are the last button, behind a door, labelled
   as failure to find a match ("None of these"), three screens deep.
3. **The own-words screen rejects the founder's examples on purpose.** `strings-en.js` `own.belief`
   says "make it about people" and "Not the weather, and not your body." The overtaking worry is
   about time, the last-word worry is about a feeling. The research draws the lane wider than the
   copy does: body sensations are blocked (panic), the habit is blocked, reassurance loops are
   blocked; time-and-rules assumptions are green. "About people" was a checkability hint that
   became a wall. That is a content fix regardless of anything else in this file.
4. **Present is the missing step, and in a no-AI, no-person app it can only be fixed content.**
   The founder's own Present was a therapist; a language learner's is a teacher. BETR's has to
   be a *worked example a person watches*: one everyday, unshameful, obviously-false prediction,
   the test, what happened, the ladder dropping one rung — twenty seconds on the front screen,
   before anyone is asked about anything that matters to them. The slow-car worry is a strong
   candidate precisely because it is trivial. This also answers Q10 (whose results are the ad).
   **A "do you have this belief?" quiz is not Present, it is a questionnaire**, and MHRA says a
   questionnaire infers medical purpose on its own (research §5.2). Demonstration, never diagnosis.
5. **Not a rewrite.** The engine, the guards, the ladder, storage, export, Help, helplines, the
   hundred and eighty tests — all stay. What moves is the front screen and the order of the doors.
6. **The real cost is the guards.** With own-words as the main road, `lib/guards.js` stops being
   a side path and becomes the product's safety line. "Never the habit itself" is structural in
   v1 because there is no free-text test on the stock path. Making free text primary puts every
   guard on the critical path, and the HARM over-refusal already flagged in NEXT-SESSION becomes
   a front-door problem. This is the founder's and Misha's call, with the CBT reviewer.
7. **One caution on the founder's second example.** "I'll feel weak" predicts a feeling, which
   only the re-rate can check. The sharper version predicts something outside the head: "If I
   don't get the last word, they'll think they've won." Inviting a spouse is a survey experiment
   (research §2.4), a real type; BETR should not become a two-player thing to hold it.
8. **The founder's not-opening-it is evidence, but of what?** A graduate wants Produce. The
   audience in scope has never done this and needs a first result to happen to them. Both need
   the same engine; only the newcomer needs Present. B21's three walkers did not gel either, so
   the newcomer evidence points the same way.

## The shape, if the founder says yes

- **Present:** the front screen shows one worked example, complete, watchable, fixed content.
  Then one big button: *What's yours?*
- **Produce, as the main road:** two boxes, not three — the situation and the prediction — then
  the test and the drop. "New worry" from a car needs to be under thirty seconds to a lock.
- **Practice, one tap aside:** *Not sure? Here are some* opens the doors and the stock list as
  they are. Optionally the first run walks a trivial stock one, the flute's first simple song.
- **Content fix now, independent of the rest:** widen `own.belief.sub` and `own.belief.only` to
  the research's lane, not "about people".

## Not decided, and whose it is

The whole file. Misha on audience and tone; the founder on the guards trade-off; the CBT reviewer
on Present as a worked example and on the wider own-words lane.

## The founder's decisions, 2026-09-08, later the same day

Two, in their own words, and both overrule rules in `CLAUDE.md` knowingly:

1. **"Free ourselves up a little bit from the constraints."** Few people will use it; a disclaimer
   can say "if it's dangerous, see a doctor". So: **free text is the front door**, the "make it
   about people" line goes, and the habit and body word lists **stop blocking a test** — they
   become one plain line on Help. **The one hard stop stays: a sentence about ending it, or
   hurting anyone** ("If I kill myself everyone will be better off" is the founder's own
   example of what must still be refused). Everything else goes through.
2. **The way in is an If block and a Then block**, each an open field with suggestions (the
   suggestions are the Practice part, for somebody who does not know what to say), then what
   they will do, with suggestions on every part. That is a form. Rule 10 is overruled for this
   screen, by the person who made it.

And one requirement for the front screen: **the first example must be a bloody good one** — a
handful of words, no long text, no link to go and learn; a person reads it and thinks "I wish I
had that courage", then sees that everyone does, in a safe and controlled way. The founder
offered image or video. **Assessment: words, not video** — it works with wifi off, weighs
nothing, needs no actor, reads on a screen reader, and it is the very thing they are about to
make. A video would be the one thing on the screen they cannot do themselves.

The mockup's hero: *If I tell my dad I'm struggling, he'll change the subject.* → *He went
quiet. Then he said "Me too."* 10 → 6. Four alternatives are on the canvas for the founder and
Misha. **Open: real or example.** Shown as a real person's result it is a testimonial, which
the MHRA reads as a claim (research §5.2). The mockup labels it "What one test looks like".

## What building it would touch

- `web/content/strings-en.js` — front screen, the build screen, chip lists. `worries.js` stays
  as the borrow list; its three `beliefs` per worry become Then-suggestions when a person picks
  a stem that matches one.
- `web/lib/guards.js` — `checkTest` drops `HABIT` and `BODY` from refusal; `HARM` stays on both
  guards. `checkBelief`'s conditional-shape rules become structural (the blanks print "If I"
  and "then").
- `web/app.js` — a new build screen replacing `own-belief` / `own-test` / `own-drop`; the front
  screen's worked example with its reveal under `prefers-reduced-motion: no-preference`.
- `CLAUDE.md` rules 3, 4 and 10 and scope §2 — rewritten to say what the founder decided, with
  the date, so the next session does not "restore" them.
- Tests that pin the old rules (`content.test.js`, `guards.test.js`, `loop.test.js`) — changed
  with the rules, not deleted.
