# B15: Words out of the code — every string translatable, every screen usable by anyone

**Status:** Not started. Written 2026-09-03 at the founder's request. **First in the reach
track — before B9.** See `docs/TRACK-reach.md`.
**Confidence:** —
**Date opened:** 2026-09-03
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

## The decision on i18next — and it is the founder's to overturn

**Recommendation: don't use i18next. Write a ~60-line `web/lib/i18n.js` instead.**

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

- **i18next or the small module** (above). Recommendation is the small module; the founder's call.
- Whether B1's fresh words land before this. Translating placeholder wording twice is the waste.
- Who checks the accessibility work. A real screen-reader pass on a real phone by someone who
  uses one is worth more than every automated check, and it is a few hundred pounds.

## Done when

- No sentence a person can read lives in `app.js`.
- The full loop walks with VoiceOver on an iPhone and TalkBack on Android, hands-free of sight.
- The whole loop is keyboard-only walkable, and readable at 200% text.
- `node --test` green from the repo root, with the sweep above.
- Confidence score recorded here.
