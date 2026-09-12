# B54: The lineage, with a logo on it

**Status:** **BUILT AND WALKED, 2026-09-12.** 294 tests pass (292 before). Four mutations, all
caught. Walked on the phone screen in both themes and at 200% text.
**Confidence:** 8/10. The block is small, the safeguards around it are tested, and the two
hard walls it came near — the remote image and the web font — are closed and now have a test
each. The point off: **three of its seven sentences are TrybeUP's marketing in BETR's Help
screen, unread by Misha and unread by the reviewer**, and one of them says the word *AI* in an
app whose second rule is that it has none (§5).
**Date opened:** 2026-09-12 · **Asked for by:** the founder, in one message
**Touches:** rule 1 (nothing leaves the phone), rule 9 (visible lineage), rule 2 by adjacency

---

## 0. What was asked

Word for word: *"I'd like to have a more obvious 'made by TrybeUP' with the logo … and the
logo text … I think the font is Inter from Google weight 600 (taken from the TrybeUP website).
Maybe a little blurb about 'what is trybeup' that leads them to the trybeup.com landing
page?"*, with TrybeUP's own landing copy pasted underneath it — the *Tell us one problem*
headline, the *personal-change app* paragraph, and the three numbered steps.

## 1. What was there before today

Two mentions, both on Help, both text only:

- **Frozen sentence 9**, in the numbered nine: *"This was made by the people behind TrybeUP,
  not by a clinician or a health service…"* Frozen wording (rule 7). **Untouched by this task.**
- **`help.who`**, under *Who made this*: *"This is for doing it alone. The people who made it
  also make TrybeUP…"* **Also untouched** — the new block sits directly under it.
- and the **plain entry in the places list**, second in *Doing it with other people*, which
  says *"Made by us"* and states the paywall. **Unchanged. It is not the branded block and it
  must keep looking like its neighbours** (B8's conditions, `places.js` rule 6).

## 2. Two things in the ask that cannot be built, and were not

Neither is a judgement call. Both are walls BETR built on purpose and they are in the app's
own policy, in `index.html` and in the header `deploy/nginx.conf` serves:

| Asked for | Why it is impossible | What was built instead |
| --- | --- | --- |
| The logo at `https://trybeup.com/assets/trybeup_logo-L_Is-Cvt.png` | `img-src 'self' data:`. A remote `<img>` is **blocked outright** — the logo would simply not appear — and an attempted request on the one screen that promises none is the airplane-mode proof becoming a lie where it is made (rule 1) | The file was **downloaded once and committed**: `web/trybeup-logo.png`, cropped to the mark and scaled, **6.4 KB**. Nothing is fetched |
| Inter 600 from Google Fonts | `font-src 'none'`. **No web font can load, by anyone**, and a font file in the repo is a dependency and ~100 KB for one word ("don't add a font") | The wordmark is **text in the system font at weight 600** — the weight TrybeUP's site uses. It is `help.makerName`, `TrybeUP™` |

**If the exact Inter letterforms are wanted later**, the only compliant road is an inline SVG
of the word as outlines — glyph paths, no font file, no request. It is a real option; it was
not taken today because nobody asked for it and the system font at 600 reads correctly.

## 3. The amendment to rule 9, and what it does not touch

Rule 9 has said since 2026-09-01 that TrybeUP is *never styled apart*. **This block is styled
apart: a logo, a wordmark, a bordered panel.** The founder amended their own rule on
2026-09-12, in the ask itself — the word was *"more obvious"*. It is recorded in CLAUDE.md
rule 9 and here.

**What did not move, and is still tested:**

- It is **on Help**, under *Who made this*. TrybeUP is still **not on the front screen, not in
  the loop, not in the result, not on the menu** — `menu.test.js` sweeps every other screen
  for the word and B54 did not weaken that test.
- The **places entry is still plain and still second in its group**.
- **Not a button.** One `<a>` to `https://trybeup.com`, already on the allow-list, no query
  string, no campaign parameter, no referral code — not now and not at B6.
- **B6's gate is still shut.** This is a block of prose, not the bridge: no export goes
  anywhere, no endpoint is called, nothing is copied across, and BETR still never calls
  TrybeUP.

## 4. What is on the screen

`docs/shots/b54-trybeup-dark.png` and `b54-trybeup-light.png`.

```
Who made this
This is for doing it alone. The people who made it also make TrybeUP, …

┌────────────────────────────────────────────┐
│  [mark]  TrybeUP™                          │
│  Tell us one problem. We'll give you one   │
│  thing to do a day.                        │
│  TrybeUP is a personal-change app. …       │
│  Habits, workouts, nutrition, an AI coach  │
│  and a community are a tap away …          │
│  Free to start. One-to-one chat is free,   │
│  and the private groups need a paid plan.  │
│  It is an account on their servers, which  │
│  is the opposite of BETR on purpose. …     │
│  TrybeUP.com — their own description …     │
└────────────────────────────────────────────┘
```

Seven strings, all in `web/content/strings-en.js` under `help.maker*`, so the founder can
change any of them on github.com the way `docs/changing-the-words.md` describes.

**The three numbered steps in the pasted copy were left out.** The ask was for *"a little
blurb … that leads them to the trybeup.com landing page"*, and the steps are what the landing
page opens with — printing them here makes the block twice as long and the tap pointless.
**One sentence to change if that is wrong.**

## 5. Three of the seven sentences are safeguards, and one is a live question

They are what keeps a branded block from being a promotion with the honesty taken out, and
B8's conditions are where they come from. `menu.test.js` fails the build if any one is deleted.

1. **`makerCost` — *"Free to start. One-to-one chat is free, and the private groups need a paid
   plan."*** B8's third condition, word for word: it says what it costs **before** the tap.
   Research §7.1 is why — sending a privacy-first person into a paywall after onboarding is
   the sequencing offence the review corpus punishes hardest, and it is the reason B6 is
   gated. `places.js` says the same thing in its own entry. **If TrybeUP's free tier changes,
   both sentences change the same day.**
2. **`makerApart`** draws the line: an account on their servers, nothing written here goes
   there, BETR still sends nothing. Without it a branded panel reads as *"and this app is part
   of that one"*.
3. **`makerAI` — and this is the founder's to confirm.** It names the AI coach, because it is
   in the copy they pasted and because a feature discovered after signing up is the betrayal
   this audience is braced for (research §4). But **BETR's second rule is that it has no AI,
   and it says so**; a reader two paragraphs below *"no AI"* now reads *"an AI coach"*. The
   recommendation is to **keep it** — disclosure in place is the answer to that risk, the same
   answer B8 gave for hidden ownership. **Deleting it is one line in `app.js` and one string.**

Also unread by anybody but us: **`makerTag`**, which is TrybeUP's headline word for word.
*"Tell us one problem"* is an odd sentence to meet inside an app whose whole pitch is that it
is told nothing — it works because it sits under TrybeUP's own logo, where the speaker is not
in doubt. Misha has not seen it.

## 6. Test plan, and it ran

`web/tests/menu.test.js`, two new tests (294 total):

1. **The branded block says what TrybeUP costs, that it has an AI, and where BETR ends.**
   Every one of the seven strings, the order on the screen, and still not a button.
2. **Every image in the app is a file in the folder, and no font is ever fetched.** Sweeps
   every screen for `<img src>`, asserts no scheme and no `//` and that the file exists in
   `web/`; asserts the logo is under 30 KB; asserts `app.css` has no `@font-face`, no
   `@import`, no `fonts.googleapis`; asserts `font-src 'none'` and `img-src 'self' file:
   data:` are still in `index.html`.

**Four mutations, each caught by the right test:** dropped `makerCost`; pointed the `<img>` at
`https://trybeup.com/...`; dropped `makerAI`; added an `@font-face` for Inter. Baseline
re-run afterwards: 294 pass.

**Walked**, 390×844: no sideways scroll at 100% or at 200% text (`scrollWidth` 390 =
`innerWidth` 390 at both), the mark is sized in `em` so it grows with the words (41.8px →
83.7px), both themes read correctly.

## 7. Gaps

1. **Misha has not read the seven strings.** They are TrybeUP's own copy, so he is the
   reviewer who matters most; `docs/COPY.md` is regenerated and they are in it.
2. **The AI sentence (§5.3) is the founder's call** and it is live in the build.
3. **Nobody has seen this on a real phone** — the walk is Chrome at 390×844.
4. **The logo is a raster PNG.** It is crisp to about 28px of height at 3× and the block draws
   it at 42px, so it is fine as drawn and would soften if anybody scales it up. An outline SVG
   of the mark would fix that and would also solve §2's font question; it needs the vector
   from whoever has the TrybeUP artwork, not a trace.
5. **`web/trybeup-logo.png` is a cropped copy of somebody else's asset**, taken off
   trybeup.com on 2026-09-12. It is ours to use — same company — but if the brand changes,
   this file does not change with it and nothing in the app can tell.

## 8. Done when

Built and pushed. Open. The founder's two decisions in §5.3 and §4 (the numbered steps) and
Misha's read of the copy are what is outstanding, and neither blocks the build.
