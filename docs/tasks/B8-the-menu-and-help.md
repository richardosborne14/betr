# B8: The menu, and Help — three doors from every screen

**Status:** Not started. Written 2026-09-03 from the founder's notes after testing v1
**Confidence:** —
**Date opened:** 2026-09-03
**Depends on:** B2 (done). B1's real words land in the same files. Misha signs off the Help
list before release, the way he signs off the six surface-problem labels (B0 Q2a).
**Where:** `web/` — same stack, no dependencies, no build step.

## Why this exists

The founder walked v1 on 2026-09-03. The loop and the ladder landed. What was missing was any
way to move around: *your worries* was a small grey link at the bottom of two screens, starting
a second worry meant backing out of wherever you were, and everything BETR is careful about —
the crisis lines, what it is and isn't, who made it — was buried behind *What this is*.

Founder, verbatim: *"the only thing that's missing is a slightly more obvious and much more
persistent menu where you can jump between the three things people will care about: My Worries,
Make a new worry (which should be available at all times), help."*

## The four decisions, taken 2026-09-03

| | Decision |
| --- | --- |
| **Shape** | **Three along the bottom of every screen.** Always visible, one tap to anything. |
| **Voice** | **"Your worries"**, not "My worries". The app talks to you in second person everywhere else, and one first-person label would be the only one. |
| **TrybeUP** | **Listed in Help among the other places**, not as a promotion. Founder: *"so it's not an obvious Rickroll."* See the safeguards below — this is a partial amendment to CLAUDE.md rule 9 and it has conditions. |
| **A test on the go** | **It waits for you.** Starting a new worry never silently bins a test you locked in. |

## This amends two rules. Both amendments are recorded in CLAUDE.md

1. **Rule 10 said no tab bar.** A permanent row of three along the bottom is close enough to
   one that a future session would otherwise delete it as drift. The founder overruled their
   own rule on 2026-09-03, knowingly. What the rule still forbids, and what keeps this from
   becoming the thing that was rejected: **plain words, no icons, no selected/highlighted
   state, no badges, no counts, no dot, no fourth item.** It is three doors, not a place you
   live in. If someone proposes a fifth item, the answer is no.
2. **Rule 9 said TrybeUP is not mentioned outside the small print until B6's gate opens.**
   TrybeUP may now appear in Help, under the same heading as everywhere else people can go,
   with these conditions, all of them load-bearing:
   - **Never first in the list**, never a button, never styled differently from its neighbours.
   - **It says we made it, right there**, in the entry itself. Research §4: hidden ownership
     discovered later is the exact betrayal this audience is braced for. That risk is what the
     founder's "not an obvious Rickroll" is about, and disclosure in place is the answer to it.
   - **It says plainly what it is and what it costs**, truthfully, as of the day it ships. If
     private groups are still paywalled when this ships, the entry says so. A person who taps
     it and meets an unexpected paywall is the failure this condition exists to prevent.
   - **No deep link, no campaign parameter, no referral code, ever.** Not now, not at B6.
   - The rest of rule 9 stands: TrybeUP is not on the front screen, not in the loop, not in the
     result, not in the menu.

## What to build

### 1. The menu — a row of three, on every screen

```
┌─────────────────────────────┐
│      Sure it'll go badly?   │
│    [  Pick a worry  →  ]    │
├─────────────────────────────┤
│ Your worries │ New │ Help   │
└─────────────────────────────┘
```

- **Your worries** → the `mine` screen. When there are none, it opens the pick list instead of
  a dead end (or is greyed and unpressable — build it whichever way reads better on a phone;
  the rule is that nothing lands on an empty screen with nothing to do).
- **New worry** → the pick screen (`pick`), which already ends with *Something else* for a
  person's own. Available at all times, including mid-loop. See §3.
- **Help** → the new `help` screen, which absorbs today's *What this is*.
- Fixed to the bottom, above the safe-area inset, on every screen including the loop. It must
  not cover the big button on a small phone: check on the shortest screen we can find.
- The existing small links at the bottom of the start and result screens come out. They are the
  thing this replaces; leaving both is two menus.
- **Not on** the crisis reading of Help itself if it would push the helpline numbers off screen.

### 2. Help — what goes on it

In this order. The order is the point: the person who needs the first block most is the least
able to go looking for it.

1. **If you are in danger or in crisis.** Sentence 7 verbatim, as now: local emergency number,
   988 in the US, Samaritans 116 123 in the UK and Ireland, findahelpline.com for 175+ countries.
   Nothing above it. Nothing that has to be scrolled past to reach it.
2. **What this is.** Today's screen, unchanged: the purpose statement, the nine sentences
   verbatim from research §10, the airplane-mode proof, the counters, export, delete, the build
   hash. None of this text may be edited or summarised into the new layout.
3. **Other places, none of them run by us.** The new part. Three groups, one line each, no
   descriptions that read as recommendations:
   - **Free CBT worksheets and reading** — e.g. Centre for Clinical Interventions (a public
     health service in Western Australia), Getselfhelp.co.uk, NHS Every Mind Matters, Mind.
     *Linking to them is fine and is the correct way to point at their material. Copying their
     wording is not, and never becomes fine — CLAUDE.md rule 8.*
   - **Finding a real therapist** — this one is doing a job the app already promises in
     sentence 3 ("If you can see one, please do"): BABCP's accredited register (UK), ABCT's
     findcbt.org (US), and one international directory. A person who leaves BETR for a
     therapist is a success, not churn, and the copy should not hedge that.
   - **Doing it with other people** — peer support and groups, and TrybeUP among them under the
     conditions above. **This is the group that needs Misha most.** Naming recovery fellowships
     implies a diagnosis about the reader, which is exactly what research §5.4 warns about, so
     the mix must not read as "this app is for addicts" and no entry may be presented as
     suitable for the person based on anything they entered.
4. **Who made this, and the code.** As now, plus the build hash.

### 3. Tests that are waiting for you — no limit on how many

Today `S.cur` is one slot, so starting a new worry overwrites a locked-in test with no warning.
With **New worry** always one tap away, that stops being an edge case.

**There is no cap.** A first draft of this task capped open tests at three. The founder asked
what the research actually said, and it does not support a cap — it points the other way:

- **The number of experiments completed moderated improvement.** Mindable, the one unguided app
  with behavioural experiments as its core mechanic (n=33, uncontrolled, so weak — but it is the
  closest analogue that exists). Research §3.3. More completed tests is the thing we want.
- **The risk in unguided self-help is stopping, not doing too much.** Cuijpers 2011: dropout
  between 5% and 45%, and in one trial **38% never finished session one**. Research §3.1. Every
  gate, cap and "are you sure?" is on the wrong side of that number.
- **Nothing in the research, or in CBT practice, says one experiment at a time.** A therapist
  usually sets one or two between sessions, but that is the shape of a weekly appointment, not a
  clinical limit. The record sheet is per experiment; a person can run several.
- The safety guard is **what a test is**, never how many there are: rule 4 and the guards in
  `lib/guards.js` are what keep a test small, legal and not about the habit.

**What actually needs protecting is the day, not the number.** The front screen promises *one
tiny thing to do today*. So:

- A test that has been locked in and not yet finished is **kept**, never replaced. Start as many
  as you like.
- **Your worries** is where they all live, each on its card, with **Done it** and **Didn't get
  to it** on any that are open.
- The front screen shows **what is on the go without becoming a tally**. One line if there is
  one. If there are several, a line that opens Your worries — not a stacked list of everything
  you said you would do.
- Nothing about a waiting test is ever a failure, a debt or a number. **No count on the menu, no
  badge, no "3 open", no "overdue", no red, no ordering by how old it is.** Rule 5.
  *INFERRED, not sourced:* a screen tallying things you said you would do and did not is a shame
  surface, and shame-proneness is the trait that predicts substance problems (Dearing, Stuewig &
  Tangney 2005; Luoma's danger zone is the day after a slip — research §4.3). No source says a
  to-do list causes that. It is a judgement about tone, and it is why the rule above is about
  display rather than about permission.

### 4. The wordmark and capitalisation — done 2026-09-03, ahead of this task

The founder also asked for **BETR** in all caps as the wordmark, and for no more all-lowercase
labels (*"very modern but not cool"*). Both are already in `main`: the wordmark is BETR in the
app, the title, the manifest and the export; every label a person taps now starts with a
capital; and `loop.test.js` fails the build if either slips. The menu labels follow the same
rule: **Your worries · New worry · Help**, not `your worries · new · help`.

## Rules this task must not break

- **Nothing leaves the phone.** A link is inert until a person taps it, so links are allowed —
  but **nothing may be fetched to support them**: no favicons, no link previews, no
  availability checking, no analytics on a tap. The airplane-mode proof must survive: with wifi
  off, Help still opens and reads correctly, and the copy says these open in your browser and
  need the internet.
- **In the native wrap (B5), a link opens the system browser**, never an in-app webview. An
  in-app webview is our software watching where someone went.
- **No affiliate links, no tracking parameters, no referral codes, no shortened URLs**, ever,
  including to TrybeUP.
- **The list is identical for everyone.** Nothing on Help may be chosen, ordered, filtered or
  emphasised by anything the person entered. Fixed content is a chapter in a book; content
  chosen for them is a device (research §5.2). The second door's six problems must never be
  wired to this list.
- **No verdicts, no scores, no streaks, no counts on the menu.** Rules 5 and 6 are unchanged.
- **Every phrase written fresh.** Rule 8. Link to CCI and Getselfhelp; take no words from them.

## Tests to add

- The menu is on every screen, and every item on it works from every screen.
- **New worry** mid-loop, with a test locked in, keeps the locked test; it is on the front
  screen and in Your worries afterwards, and finishing it still records one result.
- Help carries sentence 7 verbatim, the crisis numbers, and the nine sentences, and the crisis
  block is above everything else in the markup.
- Every external link is `https://`, has no query string, and appears in a small allow-list in
  the test, so adding a link is a deliberate act that shows up in a diff.
- The existing sweeps still pass: no banned phrase anywhere, no lowercase label, no `Betr ` in
  prose, nothing added up.
- A test that the menu has exactly three items.

## Open, and for the founder or Misha

- **The Help link list itself.** Nobody has written it yet. The groups above are a shape, not a
  list. Misha signs it off before release, and it wants a second read from whoever does B1.
- **How often links are checked.** A dead or sold domain in a mental-health app is a real harm,
  and nothing in BETR can check them at runtime by design. Proposal: a manual check on the
  release checklist, every release. It needs a named owner.
- **Age gate (Q9) is still open** and Help is where it would be explained if the answer is 18+.

## Done when

- The three doors are on every screen and every one of them works from every screen.
- A locked-in test survives starting a new worry, on a phone, across an app restart.
- Help opens with wifi off and reads correctly, crisis lines first.
- Misha has signed off the "other places" list.
- J1 and J2 still walk clean on a phone, and a new J3 walks the menu from every screen.
- `node --test` green from the repo root, and the confidence score recorded here.
