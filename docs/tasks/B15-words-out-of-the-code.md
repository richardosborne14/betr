# B15: Words out of the code — every string translatable, every screen usable by anyone

**Status: BUILT, 2026-09-03.** 125 tests green from the repo root, the whole loop driven in a
real browser at 390×844, and the layout checked mirrored and at 200% text. **Two release
conditions are still open and are at the bottom of this file: a real screen-reader pass on a
real phone, and B16 before any second language ships.**
**Confidence:** 8/10 (reasoning at the bottom)
**Date opened:** 2026-09-03 · **Built:** 2026-09-03
**B8 landed 2026-09-03 (`7e8754e`), 78 tests green — the block is clear.** This task rewrites
nearly every line of `app.js` that renders text, so it must not run while another session has
that file open. Confirm `git status` is clean before starting.
**Depends on:** B8 shipped. B1's words land in the files this task creates, so if B1 is close,
do B1 first and translate once.
**Where:** `web/app.js`, `web/app.css`, `web/index.html`, a new `web/lib/i18n.js`, new
`web/content/strings-en.js`. No new dependency.

## Why this exists

Founder, 2026-09-03: *"We're fucking idiots for not making this an i18next app, and fully
accessible… it should be multilingual and usable by anyone."*

They are right, and the cost of the mistake is time-sensitive rather than large. Both of these
are cheap now and brutal later:

- **Every user-visible sentence is currently a string literal inside `app.js`** (~899 lines,
  around 30 obvious ones plus the eight sentences, the crisis block, and everything in
  `content/`). Every day of new features adds more of them in more places.
- **Every layout rule in `app.css` is physical, not logical** — `text-align:left`, `left:14px`,
  `margin:2px 0 10px 80px`. That is the single thing that decides whether Arabic is a week or a
  month, and it costs nothing to write the other way today.

And the audience argument is stronger than the reach argument. This is a product for people
hiding something, who will not ask anyone for help. That describes a blind person with a
screen reader and a person reading their third language exactly as well as it describes anyone
else, and every one of them is currently excluded by an accident rather than a decision.

## The honest state of accessibility today — audited 2026-09-03

Better than expected in places. **What is already right, and must not be undone:**

- **Reduced motion is handled the best way there is** — `app.css:191` wraps every animation in
  `@media (prefers-reduced-motion: no-preference)`, so motion is opt-in rather than opt-out.
  The pulsing button and the screen transition simply do not exist for someone who asked for
  no motion. Keep this pattern for anything added.
- Real `<button>` elements throughout, not divs. A visible focus ring at `app.css:36`
  (3px, offset 3px). Generous hit targets. A `<noscript>` that says something useful.
  `color-scheme: light dark`. `text-wrap: balance` and `max-width` in `ch` on body text.

**What is missing, in the order it matters:**

1. **Nothing is announced when the screen changes.** `#app` has its `innerHTML` replaced and
   focus is never moved. To a screen reader, tapping the big button does nothing: the focus
   ring is on a button that no longer exists, and the new heading is never read. **This is the
   one that makes BETR unusable rather than awkward**, and it is perhaps twenty lines to fix.
2. **The ladder is a picture to a screen reader.** `.rung .num` renders a number; nothing says
   what it means. The one thing a person is doing this for — watching a belief lose its grip —
   is the least accessible thing in the app.
3. **`<html lang="en">` is hardcoded**, and there is no `dir`. Both must follow the chosen
   language, or every assistive technology mispronounces every word.
4. **Physical CSS properties everywhere.** Arabic and Urdu are impossible until these are
   logical (`margin-inline-start`, `inset-inline-start`, `text-align: start`).
5. **`text-transform: uppercase` on `.kicker` and `.lbl`.** Some screen readers spell out
   uppercase text letter by letter. Uppercase in CSS over sentence-case markup is right; check
   it on a real VoiceOver and TalkBack rather than assuming.
6. **The one accessible name in the app says the wrong thing.** B8 added
   `aria-label="Betr"` on the menu (`app.js:154`). A screen reader reads that aloud, so it is
   somewhere a person *reads* the wordmark — and rule 7 says that is **BETR**. The `aria-hidden`
   on the decorative arrows that B8 added alongside it is exactly right; keep that.
7. **Three `transition` rules sit outside the reduced-motion block** (`app.css:60, 93, 121`).
   Minor next to an infinite animation, but they belong inside it for consistency.
8. **Text scaling.** Headings are `clamp(36px, 8vw, 60px)`; `vw` does not respond to a person's
   text-size setting. Check the whole loop at 200% text and fix what clips.

## The decision on i18next — **settled by the founder, 2026-09-03**

**Decided: no i18next. Write the ~60-line `web/lib/i18n.js`.** Founder's answer, 2026-09-03,
taking the recommendation below. This is no longer a question a session has to bring back.

**Recommendation, as it was put to them: don't use i18next. Write a ~60-line `web/lib/i18n.js` instead.**

i18next is a good library and in a normal project I would reach for it. Here it costs three
things BETR is explicitly built not to spend: a dependency (CLAUDE.md — *don't add a
dependency*), a vendored minified file in a repo whose trust story is *"readable by a stranger
in an evening"*, and a licence to carry. **It cannot be loaded from a CDN** — rule 1 forbids it,
and the CSP in `index.html` blocks it outright — so it would have to be checked in as a blob.

What it would buy us is mostly plural rules, and browsers already ship those:
`Intl.PluralRules` is built in, works offline, and is the same CLDR data i18next uses. For an
app with ~150 fixed strings, no user-generated content and no server, the whole of what we need
is: look up a key, fall back to English, interpolate a number, pick a plural form.

**If the founder wants i18next anyway, that is a legitimate call** — it is battle-tested and a
future maintainer will know it — and this task adapts without redesign. The string files below
are shaped so either engine can read them.

## What to build

### 1. `web/content/strings-en.js` — every word a person can read

Same `.js`-not-`.json` reason as `worries.js`: a browser will not fetch JSON from a page opened
off disk, and the founder opens `web/index.html` directly. One plain nested object, no logic.

Covers `app.js`'s literals, the button labels, the four re-rate words, the ladder, the menu, the
export note, and the whole of Help. The twelve worries stay in `worries.js` and the surface
problems in `whats-going-on.js`; those files gain a locale sibling rather than moving.

### 2. `web/lib/i18n.js`

Same UMD wrapper as `store.js` and `rate.js` so the tests can load it in Node. Four jobs: pick
the language (the person's choice first, then `navigator.language`, then English), look up a key,
fall back to English **per key** rather than per file, and expose `plural()` over
`Intl.PluralRules`.

**A missing key falls back to English and is visible in tests, never blank and never a raw key
on screen.** A person must never see `result.ladder.title`.

### 3. The screen-change announcement

On every `go()`: move focus to the new screen's heading (`tabindex="-1"`, focus, and do not
scroll-jump), and announce the screen in a polite live region. The result screen — expectation
struck through, what happened, the ladder — needs a text equivalent that reads as a sentence,
because that screen *is* the product.

### 4. The ladder, in words

`.rung` gets an accessible name that says the belief, the rung out of ten, and which way it
moved. Never a total, never an average, never a trend — rule 5 applies to the accessible name
exactly as it applies to the screen.

### 5. RTL-ready CSS

Every physical property becomes logical. `dir` set from the locale. **No RTL language ships in
this task** — this is only so that shipping one later is a translation job and not a rebuild.

### 6. A language switch

In Help, with the language named in its own language (*Français*, not *French*). Stored with
everything else. English-only until B16 ships a second language, so in this task it is a list
of one and can be hidden until there are two.

## Rules this must not break

- **Rule 1.** No locale is ever fetched. Every language ships in the bundle, and the
  airplane-mode proof passes in every one of them. **No CDN, no font, no geo-IP, nothing that
  looks at where the person is.** The language follows the browser setting or their own choice,
  and nothing else.
- **Rule 7, and this needs care.** *"The wording is fixed. The eight sentences and the crisis
  lines appear verbatim."* In another language "verbatim" has to mean something new: **the
  English stays canonical, and each translation of those sentences is approved once, in B16, and
  then frozen the same way.** They are not ordinary strings and must be marked as such in the
  file so nobody edits one casually.
- **The crisis lines are not a translation problem — they are a country problem.** 988 is the
  United States. Samaritans 116 123 is the UK and Ireland. **A Spanish speaker in Mexico shown
  988 has been actively harmed by this feature.** In this task the crisis block stays exactly as
  it is, in English, in every locale, with `findahelpline.com` (175+ countries) carrying the
  weight. **B16 is where per-country lines are solved, and no language ships without them.**
- **The banned-phrase sweep must run per language.** A translator with good intentions can
  reintroduce "improve your mental health" or "digital CBT" in French without knowing they are
  the two phrases that matter. The sweep needs a per-language list, written with the translator.
- **Rule 10.** A language switch is one line in Help. Not a flag, not a picker on the front
  screen, not a first-run question. The interface is still one big button.
- Rule 8 still applies in every language: every phrase written fresh, from no worksheet.

## Tests to add

- **No user-visible English remains in `app.js`.** A sweep over the rendered output of every
  screen against the string file — this is the test that stops the problem coming back.
- Key parity: every locale has every key, or falls back visibly. A raw key never reaches a screen.
- The banned phrases, per locale.
- The eight sentences and the crisis block are byte-identical to their frozen source, per locale.
- `<html lang>` and `dir` match the chosen language, and it survives a reload.
- Focus lands on the new heading on every screen change, from every screen.
- The ladder's accessible name contains the rung and the belief and no total.
- Every existing test still passes, and the loop still walks with the language set to English.

## What is not in this task

- **Any second language.** That is B16, and it is mostly not a coding task.
- Automatic translation of anything. Rule 2 — and machine-translated clinical content is exactly
  the failure mode this whole product is arranged to avoid.

## Open, and for the founder

- ~~i18next or the small module.~~ **Answered 2026-09-03: the small module.** Built as
  `web/lib/i18n.js`, 170 lines including its comments, about 90 of code.
- ~~Whether B1's fresh words land before this.~~ **B1 landed first**, so nothing was
  translated twice: the words in `strings-en.js` are B1's words, moved, not rewritten.
- **Still open, and it is the one that matters: who does the real screen-reader pass.** See the
  release conditions below.

---

# BUILT — 2026-09-03

## What was built

**Two new files, and every word in the app moved into one of them.**

| File | What it is |
| --- | --- |
| `web/content/strings-en.js` | Every word a person can read. ~180 keys, one plain nested object, no logic. Its head carries the rules that travel with it: what is frozen, what is banned, and how to add a language. |
| `web/lib/i18n.js` | Pick a language, look a key up, fall back to English **per key**, plurals and ordinals over `Intl.PluralRules`. No dependency, nothing fetched, ~90 lines of code. |

**Where the words came from, and what is left behind:**

- `app.js` — every sentence. The file is now 1,090 lines and **not one of them is prose a
  person reads**; `i18n.test.js` sweeps its string literals and fails the build on any that are.
- `lib/guards.js` — a refusal now carries a **key** (`refusal.harm`), not a sentence. The word
  lists, the matching and the decision all stay. It says nothing a person reads, which also
  means a phone number can never creep back into it (the B17 bug).
- `lib/rate.js` — the five re-rate words are gone; how far each one moves the belief stays.
- `lib/store.js` — the note written into the exported file is handed in by the caller.
- **The twelve worries, the six doors and the Help links did not move.** They are already
  content, and B16 gives them a locale sibling rather than pulling them into this file.

**A language switch** sits in Help, named in its own language, one line, no picker anywhere
else. It **draws nothing at all while English is the only language**, which is today. `S.lang`
went into `store.js` in all three places — `blank()`, `normalise()` **and `isEmpty()`** — which
is the mistake B17 made with `country`.

## The accessibility work, against the audit above

1. **The screen change is announced.** Every screen's first heading is
   `id="top" tabindex="-1"` and `paint()` puts focus on it, so a screen reader reads the new
   screen. Two screens take a box instead — "what do you think will happen?" and "what
   happened?" — and pay for it with `aria-labelledby="top"`, so the box still reads the
   question. This is the one that made BETR unusable rather than awkward, and it is fixed.
   `a11y.test.js` walks all twelve screens and asserts where focus landed on each.
2. **The ladder is words.** The dots and the number are `aria-hidden`; a `.sr` sentence replaces
   them — *"Now: 9 out of 10. Down one rung."* The belief sits on the ladder as a whole
   (`role="group"` with a name), once, rather than on every rung. **No total, no average, no
   trend, no target** — rule 5 applies to the accessible name exactly as it does to the screen,
   and there is a test that says so in those words.
3. **`lang` and `dir` follow the language**, written onto `<html>` at boot and again if the
   language changes.
4. **Every layout property is logical** and there is a test that keeps it that way. Forced to
   `dir="rtl"` in a real browser the whole app mirrors correctly — the Back chip crosses to the
   other side, its arrow turns round, the menu reverses, every panel aligns to the other edge.
5. **`text-transform: uppercase` was left as it is**, deliberately. It is uppercase in CSS over
   sentence-case markup, which is the correct way round. Whether VoiceOver spells it out is a
   question for the real pass below, not for a guess.
6. **The menu's accessible name says BETR**, not "Betr" (rule 7).
7. **The three stray `transition` rules are inside the reduced-motion block** with everything
   else, and the comment above it says any new one belongs there too.
8. **Text scaling: every font size is in `rem`**, including the minimum and maximum of every
   `clamp()`, and there is a test that fails on a px one. At 200% the whole loop reflows and
   nothing clips. One real bug fell out of checking it: **`.stage`'s bottom padding reserved the
   menu's height in px**, so at 200% text the last line of every screen sat behind the menu.
   It is `6rem` now.

## Decisions taken in the build

- **A screen change focuses the heading and says nothing in the live region.** The task asked
  for both. Doing both makes a real screen reader say every heading twice, so the live region
  is used only for what focusing a heading does *not* say: a refusal, a note that appeared in
  place, and the result screen read as a sentence. `a11y.test.js` asserts the live region is
  **empty** on an ordinary screen change, so this stays a decision rather than an oversight.
- **A key that exists in no language comes back blank, not as the key.** The task said "never
  blank and never a raw key". Both cannot be true, and `result.ladder.title` on a screen is
  worse than nothing — so it is blank, it is recorded by `unknownKeys()`, and `i18n.test.js`
  walks every screen and fails the build if the list is not empty. "Visible in tests" is where
  that requirement is kept.
- **Help's headings became `h2` and `h3`** (they were `h3` and `h4`, so the screen began at h3
  with nothing above it — a heading list a screen reader cannot make sense of). Only the
  elements changed; the sizes are the ones they always were.
- **The kicker is a heading element** on `plan`, `result` and each card on Your worries, because
  those screens had no heading at all for focus to land on.
- **One word was fixed in passing:** the second door's footnote said *"and Betr never decides
  which one you are"*. Rule 7 says BETR. It does now.

## Tests

**125 green, up from 96.** Two new files:

- `web/tests/i18n.test.js` — the sweep that stops English coming back into `app.js`; every key
  the app asks for exists; a person never reads a key or an unfilled `{placeholder}`; fallback
  is per key and is recorded; `pick()` in six cases; plurals and ordinals; every language has
  every key; the frozen nine are still nine; the banned phrases per language; the wordmark;
  **choosing a language never changes which helpline is shown**; nothing is fetched; and the
  two stylesheet guards (logical properties, rem font sizes).
- `web/tests/a11y.test.js` — focus on every one of the twelve screens and back out through
  every door; the refusal, the in-place note and the result read aloud; the live region empty
  otherwise; the ladder's words in both directions with no total; `lang`/`dir` surviving a
  reload; the menu's name; every decorative arrow hidden; every box named; Help's heading order.

`guards.test.js` and `rate.test.js` now read the words out of `strings-en.js` instead of
keeping their own copies — the trap in `learnings.md`. `harness.js` gained a real
`Intl.PluralRules`, an `<html>` element to write `lang` and `dir` onto, and a record of what
`focus()` was last called on.

## What is NOT in this task, and must not be assumed done

- **No second language.** That is B16, and it is mostly not a coding task. `LOCALES` in
  `i18n.test.js` has one entry; adding a file there turns the whole suite on for it.
- **The crisis block is unchanged and stays in English in every locale.** A number belongs to a
  country, not to a language (B17). B16 is where per-country lines meet per-language words, and
  no language ships without that being settled.
- **The frozen sentences are frozen in English only.** A translation of one of them is approved
  once, by a named person, in B16, and then frozen the same way.

## Still open — release conditions

- [ ] **A real screen-reader pass on a real phone, by somebody who uses one every day.**
      VoiceOver on an iPhone and TalkBack on Android, the whole loop, hands-free of sight. A
      fake DOM cannot see what a screen reader actually does, and neither can an automated
      checker. A few hundred pounds, and it is worth more than everything above.
- [ ] **A keyboard-only walk**, on a desktop browser, all the way round.
- [ ] The uppercase question in audit item 5, answered on a real device rather than guessed.
- [ ] Whoever owns the string file when a second language exists: a key added to English and
      not to the others shows English, and the test prints the list. Nobody owns that list yet.

## Confidence: 8/10

**What earns it:** 125 tests, and the two that matter most are the ones that stop the problem
coming back — the sweep of `app.js`'s own source, and the stylesheet guard. The whole loop was
driven in a real browser at 390×844, mirrored to `dir="rtl"`, and at 200% text, and it found a
real bug (the menu reserve) that no unit test would have. Nothing was fetched, no dependency
was added, and the airplane-mode proof is untouched.

**What holds it back from 9:** nobody who actually uses a screen reader has touched it. Focus
management and live regions are the two things in accessibility that most often work in theory
and behave differently in VoiceOver, and that is exactly what this task changed. Until that
pass happens this is careful work, not verified work.
