# B21: Three people walk in off Instagram, and we watch where they leave

**Status:** **Done, 2026-09-04.** Three walks run, `tools/walk.js` built, findings in
`docs/journeys-observed.md`. Six tasks came out of it: B22–B27, ordered in
`docs/TRACK-understandable.md`
**Confidence:** 9/10 in the walks as a record of what is on the screen — it is a real browser at
390 wide and every step is a separate command. **3/10 as evidence about people**, and that limit
is written into the first paragraph of the report on purpose
**Date opened:** 2026-09-04 · **Founder's ask, same day**
**Depends on:** B19 (the doors), B20 (three predictions), the 2026-09-04 wording change
(front screen, the blank box, the grammar nudge) — which is uncommitted and is *what this
task exists to test*

## Why

On 2026-09-04 a test user typed **"if I eat gluten, then I'll feel sick"** into the blank box.
He is gluten intolerant. He was answering the question the app asked him, honestly, and every
one of the fifteen screens he had passed had told him nothing about which worries BETR is for.

That was fixed in words the same day. But the fix has only ever been read by the person who
wrote it, which is the same mistake in a different coat. **Nobody has walked BETR from a cold
start while thinking out loud**, and the two test-user sessions that produced B19 and B20 were
both watched by the founder in the room, on worries the founder already knew about.

This task walks it three times, cold, in character, on a phone-sized screen, in a real browser,
recording every thought before every tap — **including the thought that ends with leaving.**

## The entry condition, and why it is not "they opened the app"

Founder's framing, and it is the right one: **they saw someone on Instagram post that they were
at 6/10 on a belief about their anxiety.** That is research §11.6's screenshot — "show the new
belief's evidence growing" is the mechanism *and* the ad — arriving as the ad.

So all three walks start the same way, and it sets up the first thing we are testing:

- They arrive **expecting a number that goes down**, because that is what they saw.
- They arrive **cautious**, not enthusiastic. §3.1: this audience has been burned by paywalls
  (−1.89 stars, 34× more complaints than AI) and reads every new app looking for the catch.
- They arrive **on a phone**, in a browser, one tap from closing the tab. There is no download
  cost sunk and therefore no reason to persist.

**What we are watching for is not "did they finish".** It is: where does the thought stop being
about their own life and start being about the app.

## The three people

Grounded in `research/08-participant-voice-recovery.md` and scope §1, not invented. Each is
picked because they stress a different seam.

### 1. Dan, 34 — the one who has been burned
Downloaded five recovery apps in two years. Every one of them asked for an email, then a
subscription, then a streak he lost. Reads fast, scrolls fast, is scanning for the catch and
will close the tab the moment he finds one. He is in the audience TrybeUP wants and he is the
hardest to keep for exactly that reason.
**Seam:** the promise line, the absence of a signup, and whether anything reads as a sales
funnel. Also the one who will notice the TrybeUP entry on Help.

### 2. Priya, 29 — the one who is in none of the six doors
Came for the anxiety ladder in the screenshot. Does not think of herself as having a habit, a
problem, or anything that belongs in a recovery app. Checks work messages at midnight and
rewrites emails four times. Perfectionism and assertiveness are two of BETR's three lanes
(scope §1) and **the door screen names neither of them in those words.**
**Seam:** the doors, "None of these — I'll write my own", and the blank box — the exact path
the gluten user took. This walk is the direct test of the 2026-09-04 wording.

### 3. Marcus, 41 — the one the product is actually for
Drinks more most nights than he means to. Has never said it out loud to anybody. Would not
join a group, would not email a stranger, and would not have clicked this if it had the word
*alcohol* on it. Reads everything carefully, twice, and is looking for a reason to trust it or
a reason to go.
**Seam:** door one and its safety note, whether "Turning up and not joining in" reads as his,
and whether the loop lands before his patience does.

## How it is walked

**Real browser, real screen.** Headless Chrome driven over CDP, `390 × 844` at dpr 3, set with
`Emulation.setDeviceMetricsOverride` — never `--window-size`, which resizes the window and not
the viewport (`learnings.md`). Time zone `Europe/London`.

**One action per step, decided from what is on the screen and nothing else.** The walker does
not know what the next screen is. A new tool, `tools/walk.js`, keeps a browser alive between
commands so each step is a genuine decision rather than a script written in advance:

```
node tools/walk.js start            launch Chrome and the local server
node tools/walk.js open [path]      clear storage, load, dump the screen
node tools/walk.js dump             what is on screen, and every control that can be tapped
node tools/walk.js tap <sel>        tap it, then dump
node tools/walk.js type <sel> <s>   put words in a box
node tools/walk.js shot <file>      a PNG of the phone screen
node tools/walk.js stop             kill both
```

No dependency: `child_process`, `http`, and Node 22's global `WebSocket`. `/json/new` is a
`PUT`, and the socket handshake is awaited before the first `send()` (`learnings.md`).

**Recorded per step:** what is on screen · what they think · what they do · **or why they
leave.** Thoughts are written before the tap, not after seeing what it led to.

## What comes out

`docs/journeys-observed.md` — the three walks in full, then the findings. Distinct from
`docs/journeys.md`, which is the three journeys BETR is *supposed* to support; this is what
three people did.

Each finding is one of:
- **a leave** — the step where somebody stopped, and the sentence that stopped them
- **a stall** — they carried on but did not understand what they had just done
- **a confirm** — something worked, and it is worth knowing which parts to leave alone

## What this task may not do

- **It may not change any words on its own.** Findings go to the founder; edits are a decision.
- **It is not a substitute for real users.** Three characters written by the person who wrote
  the app is the weakest possible evidence and must be labelled that way wherever it is quoted.
  It catches the gluten class of problem — a screen that fails on sight — and nothing subtler.
- **It may not touch `web/`.** If a walk finds a bug, it is written down, not fixed here.
- **No walk is a real person.** Nothing in the report is a testimonial; MHRA treats a
  testimonial as an implied claim (research §5.2), so the file says what it is in its first line.

## Plan

1. Write `tools/walk.js` and prove it on the front screen at 390 wide.
2. Walk Dan. Walk Priya. Walk Marcus. Screenshot every screen.
3. Write `docs/journeys-observed.md`.
4. Bring the founder the leaves and the stalls, in the order they cost the most.

## What came out

Ten findings, ranked by cost. Three of them are the ones that matter:

1. **Priya nearly left on screen two** — door one leads with *drink, weed, porn, betting* and
   both doors she belongs in are below the fold. → **B23**
2. **Door one's note promises Help has alcohol and drug services and it has none.** → **B24**
3. **The 2026-09-04 headline silently removed the only place the app said why a belief starts
   at 10.** A regression the walk caught and the tests could not. → **B25**

And the finding underneath all of them, which is the founder's own read of the walks: everything
that worked **described the inside of a moment**; everything that nearly lost somebody **named a
kind of person**. → **B22**, which governs the rest.

**One honest failure of the method:** the grammar nudge built the same morning never fired,
because both sentences typed into a box happened to be conditionals. Three characters written by
the author of the app cannot find what the author cannot imagine.
