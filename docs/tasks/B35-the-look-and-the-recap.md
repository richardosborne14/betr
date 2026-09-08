# B35 — The look, the recap, and the question about suggestions

**Status:** two of three built and walked; the third is a decision waiting on the founder.
**Date:** 2026-09-08
**Confidence:** 9/10 on what was built. The third item is not built and should not be until
the founder has read §3.

Three things the founder raised after walking B28–B33 on a phone.

---

## 1. The recap sentence read as a caption (built)

**What they said:** *"The text that recaps what your if then statement is on the confirmation
screen is left aligned and smaller than expected … It looks weird when it's a custom if then
though, kind of 'why is it small and left aligned when the rest is big and centred?'"*

**They were right about the cause.** `worryHead()` draws two different things with one piece
of markup. A borrowed test has a **label** with the sentence quoted under it, and that strip is
small and left-aligned on purpose: a label sitting on top of a quote rule needs its left edge.
A test somebody **wrote** has no label, so B30 promoted the sentence into the label's slot — and
it inherited the label's type. On *What will you do today?*, where the heading below is 2.75rem
and centred, an 17px bold left-aligned sentence reads as a caption on somebody else's screen.

**What changed.** `worryHead()` marks the one-part case `solo`, and `app.css` draws it as what
it is: the sentence, **quoted the way the borrowed one is quoted, centred with the rest of the
screen, 19px rather than 17px** — a size above the body rather than below it. The two-part case
is untouched, and a test holds that it stays untouched.

**One measurement.** 40ch and not the `.sub`'s 34ch. At 34ch the example sentence broke into
three lines and cost 27px on a screen whose *Lock it in* is already below the fold. At 40ch it
is two balanced lines and the page is 1,010px instead of 1,036px.

## 2. Light by default, and a switch (built)

**What they said:** *"I actually liked the light mode in the mockups … can we do light mode by
default or is it phone system default right now? Can we have a simple light dark icon always
floating somewhere easy to click?"*

**It was the phone's.** `@media (prefers-color-scheme: dark)` and nothing else. There was a
`:root:not([data-theme="light"])` guard in the CSS from some earlier session but nothing ever
wrote that attribute, so it did nothing. Now:

- **Light is the default whatever the phone is set to.**
- **One chip, top right, on every screen**, mirroring the Back chip — same size, same shape,
  same type. It says the look you would **get**: in light it reads *☾ Dark*.
- The choice is remembered in a key of its own, `betr.look`.

**Three decisions inside that, and each of them is the reason for a file or a comment.**

**`web/lib/theme.js`, and it is loaded in the `<head>`.** The choice has to be on `<html>`
before `app.css` is asked for, or somebody who chose dark gets a flash of white on the way into
every screen. `app.js` is the last script on the page. It cannot be an inline `<script>`
either: the page's own CSP is `script-src 'self'`, which blocks inline script outright. So it
is a twenty-line file, first on the page, and it writes one attribute and one meta tag. It also
rewrites `<meta name="color-scheme">`, which is what the browser paints the canvas with in the
moment before the stylesheet lands — that is the other half of not flashing.

**A key of its own, not part of the record.** It is not exported, it does not merge, and
**nothing is written until the chip is actually tapped**, so an untouched BETR still stores
nothing at all. It *is* cleared by *Delete everything*, so a wiped phone and a fresh phone are
the same phone byte for byte — `store.js` claims that and `loop.test.js` checks it.

**Tapping it does not repaint.** The colours are CSS variables on `<html>`, so the switch
changes nothing on the page except the one word on the chip. A repaint would move focus to the
heading, read the screen out again, and — the one that matters — throw away a sentence somebody
was half way through typing on the build screen. There is a test for exactly that.

**It is not a fourth door.** Rule 10's bottom row is still three plain words, no icons, no
selected state, no fourth item. This is a corner chip, the pair of the Back chip.

**To go back to following the phone** is two edits and both are commented in place: `DEFAULT`
in `theme.js` becomes `null`, and `:root[data-theme="dark"]` in `app.css` becomes
`@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { … } }`.

## 3. Suggestions for *What will you do today?* — the founder's ask, and what the experiment found

**What they said:** *"All screens for the new custom worry creation are good, easy to use,
EXCEPT the penultimate one where you have to say what you're going to do. I get that the user
really needs to type this themselves, but I think people will get stuck here and not know what
to do. A CBT alumni knows how to construct the experiment by heart, but a newbie won't."*

**The diagnosis is right and B34 already found the same hole from the other side.** A person on
the main road — who typed their own sentence — reaches that screen and is offered
`general.dos`, which is **two lines**: *"Do it once today, in the smallest version that still
counts."* and *"Pick the version of it you could do in the next hour."* Both are true and
neither is about their sentence. The 84 hand-written `dos`/`drops` in `starts.js` are only
reachable if the If blank holds one of the 21 starts **word for word** (B34 §1).

**The founder proposed a Groq call at runtime, and offered to update the explainer text.**
This session ran the experiment **offline, from a scratchpad script, never from the app** —
five example sentences to `openai/gpt-oss-120b`. It is fast (~1s) and cheap (~780 tokens).
What it produced, in full, is in `docs/learnings.md`. The short version:

- **Four of five were usable raw material.** *"Ask your boss for Friday off today."* is a fine
  `do`. The voice is wrong — *"Attend the gym class alone and observe reactions"* — but that is
  an editing job, not a thinking job.
- **The fifth broke rule 4, twice, having been told not to in the prompt.** For *"If I leave
  the house without checking the hob three times, then something will happen and it'll be my
  fault"* it proposed **"Leave the house without checking the hob at all."** That is a
  checking-ritual exposure. Rule 4 forbids BETR from proposing one, OCD is an explicit
  exclusion in frozen sentence 3, and **`guards.js` cannot catch it** — B34 §6 found the same
  gap in BETR's own content four hours earlier.
- **Two others shaded into safety behaviours dressed as tests** — *"note your boss's
  response"*, *"observe reactions"* — and one told the person to suppress a thought:
  *"Don't imagine your boss will think you're lazy."*

**So the model is a good writing assistant and an unreliable clinician, and there is no runtime
check that would tell the difference.** That is the finding. What follows from it is the
founder's call, and it is in `docs/NEXT-SESSION.md` §2.

**What the founder should also know before deciding, and none of it is an opinion:**

1. **The API key cannot live in the app.** BETR is static files. Anything the page can read,
   anyone can read. A key in `web/` is public the moment it deploys. Groq at runtime needs a
   server of ours holding the key — that is B12, and it is not an experiment.
2. **The key pasted into the session is burnt** and should be rotated at console.groq.com
   whatever is decided.
3. **The app blocks it in three places, on purpose.** `connect-src 'none'` in `index.html`, the
   same in `deploy/nginx.conf`, and a check in `.github/workflows/deploy.yml` that **fails the
   build** if that line goes missing.
4. **Frozen sentence 5 stops being true.** *"There is no account, no server, and nothing is
   sent to us or anyone else."* It is verbatim in the app, the listing and the purpose
   statement, and changing it goes back through research §10.
5. **The airplane-mode proof stops being whole.** Anyone can turn wifi off today and watch the
   app work. It would become "everything except that screen".
6. **Apple's *Data Not Collected* label stops being true.** What is sent is not identity — it
   is the sentence somebody wrote about their own anxiety, which is the more sensitive half.
7. **Rule 2's line is the device line.** Fixed content a person chooses from is a chapter in a
   book. A system that reads *this* person's belief and generates a behavioural experiment for
   it is doing what a therapist does, and that is the definition a regulator uses.
8. **Groq's retention terms have not been read.** The founder said they don't save calls; that
   may well be right, and nobody here has read it. Writing an unverified claim into the
   explainer is the same failure as writing a helpline number from memory.

**The alternative, and it is not a consolation prize.** Use Groq exactly the way it was used
today — offline, on a laptop, as a writing assistant — to generate several hundred candidate
`dos`/`drops` against the 21 starts and beyond them, put them through the CBT reviewer who is
already an open release condition, and **ship the good ones as fixed content**. The person on
that screen then gets suggestions that fit their sentence, out of a much larger fixed list.
BETR still never chooses, nothing leaves the phone, no sentence unfreezes, and the newbie gets
unstuck — which was the actual ask.

---

## Files

| | |
| --- | --- |
| New | `web/lib/theme.js` |
| Changed | `web/app.js`, `web/app.css`, `web/index.html`, `web/content/strings-en.js` |
| Tests | `web/tests/loop.test.js` (+6), `web/tests/harness.js` (`look()`, and `theme.js` in FILES) |
| Generated | `docs/COPY.md` |

206 tests pass. Walked at 390×844 on both roads, in both looks, at 100% and 125% text.

## Gaps

- The 125% overflow on *What will you do today?* (the `do` box clips its own text, *Lock it in*
  sits under the menu) is **pre-existing and untouched**. It is worth a task of its own.
- Nobody has used the chip with a screen reader. It is a named button with a hidden glyph,
  which is the right shape, but the screen-reader pass is still open from B33.
- §3 is not built and nothing about it should be built until the founder answers.
