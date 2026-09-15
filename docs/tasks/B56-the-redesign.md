# B56: The redesign — one prediction, locked in, and your own results read back

**Status:** Built on the branch `redesign`, 2026-09-15 (10th session). **Not merged** — a merge to `main` publishes it to the live address, and it has not been walked on a real phone. Locked in by the founder 2026-09-15 ("the rest of it looks great, let's lock it in").
**Confidence:** 8/10 for what is built and tested; the real-phone walk (iPhone Safari, the contenteditable blanks, the keyboard) is the missing two points.
**Date opened:** 2026-09-15
**Depends on:** nothing. B57 (the move) is independent and can run alongside.
**Where:** `web/` — a rebuild, not an edit. `docs/00-scope.md` and `CLAUDE.md` are rewritten when this ships.
**The design:** the canvas *BETR, Bet on a Hope*, `https://claude.ai/artifact/RcR4SB27nUiW5P6PPJJBDc` (read and extracted on 2026-09-15). **Read it with the
Artifact tool and extract the artboards. Do not draw from memory.** Eight screens; every one of them is in §3.

## 1. Why, in the founder's words

Three rounds on 2026-09-15. The first simplification "felt like it was missing the mark… not enough of the CBT research in there to really
help people progress cleverly… I don't see any value proposition." The brief for the redesign: *"a very clear value prop, tempting someone to
get started, in a way that they don't have any friction or excuse. When I was sitting and thinking sometimes, I actually got excited about
writing a hope down in BETR. I want that for first time users — the first thing they see on the screen, universally touching, heartwarming,
inspires emotion and hope. Let's just try a full redesign, forget everything so far."* And the feedback that started it: *"there's way too
much going on on each screen, with the if then fields, the suggestions, multiple fields per screen when you don't know the system."*

The clinical shape underneath is unchanged and is the reason this is still BETR: a prediction written down BEFORE the thing is done, the thing
done, what happened written the same day, read back later. Research/10 §2.3 (the locked prediction; two beliefs — the founder's hope is Padesky's
"new belief", and the app never built that half before), §11.6 (show the evidence growing — the results list IS that), research/12 §2
(explaining it is the intervention — *How it works*). What is gone is everything that tried to do the therapist's job on the screen.

## 2. What is decided, and by whom

All the founder's, 2026-09-15, unless marked.

| # | Decision | Their words |
| --- | --- | --- |
| 1 | **The word is `prediction`**, for hopes and worries alike. Not test, worry, hope, bet. | "maybe 'prediction' simply for both" |
| 2 | **The front is the writing page.** Headline **`What do you think will happen?`**, the sentence, `Lock it in`. No door, no list, no example card. | "Go with 1b" |
| 3 | **The sentence is `If I ___, then ___.`** No "I hope", no "I'm hoping". | "sounds a bit American… simplicity is king" |
| 4 | **`Lock it in`** is the button. "Bet on it" is dead. | "Bet on it ain't good" |
| 5 | **After the test the question comes first:** `Did it go how you expected?` → **`Yeah!` / `Sort of` / `Not really`** → then `What happened?` | "like a friend being 'SOOOO, how did it go??'" |
| 6 | `Yeah!` is celebratory (marker yellow, a spark); `Sort of` is plain; `Not really` is quieter. | "a kind of celebratory feel… less party… a bit of a sad feel" |
| 7 | **No result screen of its own, no tally, no "Held 3 of 4", no ladder.** After `Keep it` the person lands on their results list. | "smartarsed… they'll be able to put the puzzle together themselves" |
| 8 | **`Same again tomorrow`, then `Done with this one`** underneath, for a one-shot. It puts the prediction away; nothing is deleted. | "a lot of these might be one shot, not repeated" |
| 9 | `New prediction`, `Your predictions`. | "'A new hope' is a bit too Star Wars" |
| 10 | **The look is the terracotta one.** Orange ground, paper cards. | "the 'other looks' second version, with the orangish background, very nice" |
| 11 | **Two voices, two fonts.** The person's words: serif on paper. The app's words: sans on the orange, one question per screen. | "too many font sizes… hard to know what's the title of the hope, what's the input label" |
| 12 | The stock list of twenty worries, the doors, the sizes, the leave-out box, the second question, the borrow list, the chip row: **all gone from the app.** | "shelve some of the features… go back to something VERY VERY simple" |
| 13 | The three-word bar at the bottom is gone; three grey links at the foot. | — (mine, on the canvas; the founder locked the canvas) |
| 14 | **Tally alone** was the answer in round one, and became **no number at all** in round three. | "tally alone looks good" → "smartarsed" |

**Rules that stand, untouched:** 1 (nothing leaves the phone), 2 (no AI), 3's core (conditional only; "I am" is reframed at the door; the
harm stop on both blanks), 5's core (no streaks, no red days, no "you missed", no cap on rest, no number that is a score of the person), 6 (no
verdicts), 7 (the frozen sentences, the banned phrases, BETR in caps, nothing lowercase on a button), 8 (fresh wording). **Rule 4 is moot** — BETR
has no stock content any more, so it cannot propose the habit; the guards' habit and body lists are retired with it. **Rule 9 ends with B57.**
**Rule 10 is replaced by §3 of this file.**

## 3. The screens, one by one

Names are the artboard files. 390×844 is the frame; everything is `rem` and logical properties, as `app.css` already insists.

**The type system, and it is the whole system.** Four sizes, three roles:
- **The person's words** — serif (`Georgia, "Iowan Old Style", "Times New Roman", serif`; system fonts only, rule 1), 24px (1.5rem), on a paper
  card (`#FFF6EE`, ink `#2B1A12`, radius 20px, padding 20px 22px). The prediction. What happened. Never anything the app wrote.
- **The app's words** — sans (the existing system stack), one bold question per screen, 24px/700, `#FFF6EE` on the orange; a line of
  explanation at 17px in `#F2B9A4`.
- **A state label** — 12px caps, letter-spacing .16em, `#F2B9A4`. Used once: `LOCKED IN`.
- **The big button** — paper on orange, 23px/800, radius 20px, padding 22px 30px, a soft shadow. One per screen, always the same shape.
- **Ground** `#C4532E`. Dark mode: the same orange is the ground in both; a paper card is a paper card. (If a dark variant is wanted later it
  is a deeper orange and the same paper — not a black screen.) `theme.js` stays for the chip it draws; the chip may go.

**1 · Front (`Main`).** Wordmark `BETR` (13px caps). Headline, serif 44px: *What do you think will happen?* The sentence on a paper card:
*If I* ___ *, then* ___ *.* — two `contenteditable` or `textarea` blanks, the printed words in `#8E7A70`. Then `Lock it in`. Under it, 17px:
*Then go and find out. Nothing leaves your phone.* Foot: *Your predictions · How it works · Help*, grey, underlined. **This is also `New
prediction`.** Empty blanks: the button is drawn at 45% and does nothing. **The harm guard runs on both blanks on `Lock it in`**, exactly as
today, and its refusal reads as it reads today (the crisis block, the person's own words never repeated back). **The "I am" reframe runs on the
first blank** as today.

**2 · Written.** The same screen with words in it; the line under the button changes to *That keeps it as you wrote it, so what happens can't
rewrite it.* (research §2.3: the prediction is locked before). Nothing else appears.

**3 · Locked in (`On`).** `LOCKED IN`. The prediction on paper. *Go and find out.* `Done it`. Under it, grey: *Not today. Keep it for
tomorrow.* — which returns to *Your predictions* with nothing recorded, rule 5.

**4 · Did it go how you expected? (`HowDidItGo`).** The prediction on paper (19px on this and every later loop screen — it is context now,
not the thing being written). The question. Three pills, 22px/800, radius 18px: **`Yeah!`** on marker yellow `#FFE58A` with a 22px stroke
spark (inline SVG, no emoji) and a shadow; **`Sort of`** on paper; **`Not really`** on paper at 45% opacity, 700 weight. **Known wrinkle,
for the reviewer, not for re-arguing:** a *worry* that came true is answered `Yeah!`, and the pill is a party. Watch two real people do it.

**5 · What happened? (`Happened`).** The prediction on paper. The chosen tag (small pill, `YEAH!`) beside the question *What happened?* One
paper box, serif, min-height 150px. `Keep it`. **Not skippable** — the words are the evidence and the point.

**6 · Your results (`Log`).** The prediction on paper. Then one paper card listing every result, newest first: tag, day label (`SAT`, 12px caps
— a label, never a calendar, never a gap shown), and the person's words at 17px serif. `Same again tomorrow` — which re-locks the same
prediction and goes to screen 3. Under it, grey: `Done with this one` — sets `away`, returns to the list; **nothing is deleted and the export
still has it**. No number anywhere on this screen.

**7 · Your predictions (`Predictions`).** *Your predictions.* One paper card per prediction: the sentence, then its tags in a row, oldest to
newest (a locked-in one with no result shows `LOCKED IN`). Tap a card → screen 6 (or screen 3 if it is locked in and untested). `New
prediction` → screen 1. Grey: *Export everything · Delete everything*. Predictions that are `away` sit under a grey *Put away* heading at the
bottom, tappable, with `Bring it back` on their results screen instead of `Done with this one`. **No count of predictions, no total of tags.**

**8 · How it works (`Why`).** Three paragraphs, fresh wording, on the canvas. The last line points at Help. `Write one`. **The fixed next
steps from the research (same again → raise it → without the safety net) live here as one short paragraph if the founder wants them at all
(§3 item 0e of NEXT-SESSION was never answered) — they do not go on screen 6.**

**Help.** Unchanged in substance: the eight frozen sentences and the crisis block verbatim, the country chooser and helplines (`where.js`,
`helplines.js`, `zones.js`), the language chooser, export, delete, the build hash, *Who made this* (rewritten in B57). Restyled to the type
system. **`places.js` stays** with its allow-list test. The `why.js` twelve explanations are retired with the worries.

## 4. What survives from the old code, and what goes

| Keep, unchanged in substance | Goes |
| --- | --- |
| `lib/guards.js` — the harm stop and the "I am" reframe. The habit and body lists come out. | `content/worries.js`, `whats-going-on.js`, `examples.js`, `why.js`; `lib/content.js`; `content.test.js` |
| `lib/store.js` — versioned key, try/catch, export, delete. **Version bump with a migration** (§5). | `lib/rate.js` and `rate.test.js` — there is no ladder |
| `lib/where.js`, `content/helplines.js`, `zones.js`, `places.js`, `helpline.test.js`, `menu.test.js` (minus TrybeUP, B57) | The doors, sizes, skeleton holes, `growSaid`, `shrinkSaid`, the chip row, the second question, the plan screen, the repeat screen |
| `lib/i18n.js`, `i18n.test.js` — `strings-en.js` is rewritten and about a tenth of the size | The bottom bar, `paint()`'s header, the worry label header, `Who made this?` byline (B55) |
| `lib/theme.js` | `web/trybeup-logo.png` (B57) |
| `index.html`'s CSP, manifest, icons, `tools/build-hash.js`, `tools/walk.js`, `tools/copy-sheet.js` | `docs/suggestions-review.csv` becomes history, not a live sheet |
| `a11y.test.js`, `hash.test.js`, `store.test.js`, `merge.test.js`, `guards.test.js` — each trimmed to what still exists | |

## 5. The record

```
betr.v5  { predictions: [ { id, sentence, made: <day>, away: false,
                             results: [ { tag: 'yeah'|'sort'|'not', text, day } ] } ], lang, country, theme }
```

`id` is random, never the sentence (rate.js's old reason still holds: fixing a typo must not look like losing your history). `day` is a local
date string, shown as a weekday label. **Migration from `betr.v4`:** each old test becomes a prediction with its `belief` as the sentence; each
old result becomes `{ text: happened, day }` with the tag mapped from the old re-rate — `lot`/`none` → `yeah`, `bit` → `sort`,
`still`/`more` → `not`, and a result with no re-rate → `sort`. **This mapping is a guess and is written down as one in the migration's comment.**
The old ladder values are dropped. `store.test.js` gets a fixture of a real v4 record and asserts the shape after.

## 6. The strings, first draft — every word the app says

`strings-en.js` shrinks to roughly this. Misha does not read them (2026-09-15); the founder does. **Changing a word here is the founder's, on
github.com, per `docs/changing-the-words.md` — keep that file true.**

```
brand            BETR
front.title      What do you think will happen?
front.if         If I            front.then   , then         front.stop  .
front.lock       Lock it in
front.note       Then go and find out. Nothing leaves your phone.
front.noteLocked That keeps it as you wrote it, so what happens can’t rewrite it.
on.kicker        Locked in       on.ask       Go and find out.
on.done          Done it         on.notToday  Not today. Keep it for tomorrow.
go.ask           Did it go how you expected?
go.yeah          Yeah!           go.sort      Sort of        go.not      Not really
happened.ask     What happened?  happened.keep Keep it
log.again        Same again tomorrow
log.done         Done with this one          log.back    Bring it back
mine.title       Your predictions            mine.new    New prediction
mine.away        Put away                    mine.locked Locked in
mine.export      Export everything           mine.delete Delete everything
foot.mine        Your predictions   foot.why  How it works   foot.help  Help
why.title        How it works
why.1            A hope you’ve never tested is a guess. So is a worry. You can carry either for years and never find out.
why.2            Write it down first, go and do it, then write down what happened. Do that a few times and read it back.
                 That’s the whole method, and it’s one piece of a well-studied talking therapy — the piece you can do alone.
why.help         If you’re in a bad place right now, this isn’t the thing. Help has real people.
why.write        Write one
help.*           the frozen sentences, the crisis block, the country and language choosers, export, delete — carried over
refusal.*        carried over; `refusal.habit` and `refusal.body` are retired with their lists
```

The banned phrases (rule 7) still apply to every one of these and to the listing. **"Did it go how you expected?" is not a verdict and must
not become one in translation** — French is B16's first language and the founder reads it.

## 7. Tests, and the rules they hold

- `loop.test.js`, rewritten: the front carries the headline, both blanks and `Lock it in`; empty blanks do not lock; the harm stop refuses on
  either blank and shows the crisis block; "I am" is reframed; `Lock it in` → `LOCKED IN` with the sentence on screen; `Done it` → the three
  pills; a pill → *What happened?* with the tag shown; `Keep it` → the results with the new entry first; `Same again tomorrow` → `LOCKED IN`
  again with the same id; `Done with this one` → the list, the prediction under *Put away*, still in the export; *Not today* records nothing.
- **The prediction is on screen, in the same words, on screens 3–6** (rule 10's one survivor: a loop screen that does not say which prediction
  it belongs to is the bug).
- **No number:** no screen inside the loop or on the list renders a digit that is a count of results or predictions. A day label is not a number.
- BETR in caps everywhere; nothing tappable all-lowercase; the banned phrases absent from every string and from `index.html`.
- `store.test.js`: the v4 → v5 migration on a real fixture; export contains an `away` prediction; delete empties everything.
- `a11y.test.js`: focus lands on the question after each screen change; the three pills are buttons with their text; the spark is `aria-hidden`.
- `i18n.test.js`: `unknownKeys()` empty across every screen — unchanged.
- Journeys: `docs/journeys.md` J1–J5 are the old app's and are retired; **new J1 (one prediction, start to results), J2 (same again, three
  days, then done with it), J3 (a refusal; Help; export; delete; not today)**, each walked on a phone with `tools/walk.js` before this closes.

## 8. How to build it without publishing half of it

Every push to `main` touching `web/**` publishes to `betr.trybeup.com` (until B57). **Build on a branch `redesign`**, push it freely (nothing
deploys from a branch), and merge to `main` in one go once J1–J3 have walked on a phone. This is the one exception to "commit to main
directly", and it lasts exactly as long as this task.

## 9. Gaps and questions, for the founder

- **9a.** The next-step sentences (raise it; without the safety net) — in *How it works*, or nowhere.
- **9b.** A worry that comes true is answered `Yeah!` (§3 screen 4). Live with it, or a fourth word — watch two people first.
- **9c.** The purpose statement in the listing (rule 7) still says "you pick a worry about how people will react". It needs its one rewrite,
  frozen once: candidate — *BETR helps you test what you expect to happen. You write one prediction, lock it in, go and find out, and keep what
  actually happened in your own words.*
- **9d.** Whether the old prototype in `prototype/` stays in the public repo.

## 10. What was built, 2026-09-15

**On the branch `redesign`.** 124 tests pass (`node --test`, from 296 — the stock-content, ladder and merge suites went with what they tested).

- **`web/app.js`** rewritten: the eight screens of §3, Help and the country list carried over, foot of three grey words. 951 lines, from 3,760.
- **`web/content/strings-en.js`** rewritten to §6 — 444 lines from 1,076. The frozen block, crisis, where, Help, io and install blocks were cut out of the old file **byte for byte by a script**, not retyped. Key names differ from §6's draft where a name was a JS keyword or said nothing: `front.ifWords`/`thenWords`, `why.guess`/`method`/`help`/`write`.
- **`web/app.css`** rewritten to the type system; colours are tokens at the top. **`lib/store.js`** rewritten (§5, with the corrections below). **`lib/guards.js`**: HABIT and BODY removed.
- **Deleted:** `worries.js`, `whats-going-on.js`, `examples.js`, `why.js`, `lib/content.js`, `lib/rate.js`, and `content.test.js`, `rate.test.js`, `merge.test.js` (its old-phone checks moved into `store.test.js`).
- **Tests:** `loop.test.js`, `a11y.test.js`, `menu.test.js`, `store.test.js` rewritten; `i18n`, `guards`, `helpline`, `hash` trimmed. **New fixture `tests/fixtures/v5-phone.json`**: the last record the old app wrote, produced by the old app's own code (`make-v5-phone.js` says how).
- `index.html` and the manifest: `theme-color` and `background_color` are the terracotta (B58's icons are still to do). `tools/walk.js` types into a contenteditable.
- **Walked** J1 end to end in `tools/walk.js` at 390×844, plus the refusal and Help, at 100% and the front at 200%. **Not walked on a real phone. J2 and J3 not walked.**

### Decisions made while building (mine, each reversible, each for the founder to overrule)

1. **The key is `betr.v2`, not `betr.v5`.** §5 was wrong about what is on phones: the old app wrote one key, `betr.v1`, and bumped `v` inside it to 5. The new record carries `v: 6`. The old key is removed only after the new one is written successfully.
2. **A `locked` field**, which §5 left out and the screens need: a prediction with results can be locked in again.
3. **An old result gets NO tag.** §5's mapping (`lot` → Yeah!) is backwards for "Did it go how you expected?" — a worry that did *not* come true was "a lot less sure", and would have been printed YEAH! beside it. Turning it round does not rescue it: the re-rate measured how sure a person still felt, not what happened (the v2 fixture has "Still sure" beside "He said fair enough"). So old results show their words and their day, and the old tapped word, what they expected, did and left out are all kept in `was` and in the export. A mapping can be applied later without anyone losing anything.
4. **One prediction per sentence** on migration; a waiting test comes across locked in; an archived ladder comes across put away.
5. **Day labels:** the weekday within the last week (TUE, as drawn), then "12 Sep", then with the year after ~300 days. Five results all labelled SAT was a puzzle.
6. **Filled blanks flow inline** in the sentence; empty ones are the fixed-width lines the canvas draws. Built as the canvas's inline-blocks first, a long answer stranded "If I" on its own line.
7. **Focus lands on the headline, not the first blank** — a keyboard jumping up would cover the first thing anybody sees.
8. **The home-screen note** (Safari wipes storage after ~7 days) is on *Your predictions* once there is something to lose, and nowhere in the loop.
9. **Help:** on a paper sheet (long reading on the orange is hard); the count of "results on this phone" removed (no number); the old guide link removed; a Back link at the top. TrybeUP's block and `help.airplane`'s "two counts" sentence **left as they are for B57**. The theme chip is gone (there is no dark look); `theme.js` stays.
10. **The foot is on the loop screens too**, as drawn. Leaving the loop loses nothing but an unkept *What happened?* box.

### Gaps and questions, found while building

- **(a) Contrast — the founder's.** As drawn: paper text on the orange is 4.25:1, the pink explanation line (`#F2B9A4`) 2.65:1. Small text needs 4.5:1. Built exactly as locked; one token each to change. A deeper ground (`#B34A27`) takes paper to 5.0:1; the pink would need to be near-paper to pass.
- **(b) Frozen sentence 2** still ends "and rate the belief again". There is no re-rate. It is frozen (rule 7) — the founder's call, with 9c.
- **(c) "I am" has no road to the reframe** (§2 and §7 say it runs as today). It did not run on the old build screen either: every sentence made between "If I" and ", then" is a conditional. `checkBelief` still refuses a bare verdict and is tested. For the CBT reviewer.
- **(d)** At 200% text *Lock it in* wraps onto two lines inside its button. Readable; not pretty.
- **(f) The harm stop only knows harm to yourself.** `guards.HARM` is suicide, kill myself, hurt myself, self-harm, overdose and the like; a sentence about hurting somebody else goes through, though rule 3 says "hurting anyone". Unchanged by B56 — the list is as it was. For the founder and the reviewer before words are added.
- **(g) Only sentence 7 is pinned word for word by a test**; the other eight and the purpose statement are drawn from `strings-en.js` and checked for key phrases. Unchanged by B56. A test that pins all nine against research §10 is cheap and worth adding.
- **(e)** `docs/suggestions-review.csv` and `prototype/` are untouched (9d).

## Done when

- [ ] Eight screens built to the canvas, walked on a phone at 100% and 200% text, light and dark — **built; walked in the headless phone only**
- [x] `node --test` green with the rewritten suites; the old content files and their tests deleted, not skipped
- [x] v4 records migrate (two real fixtures); export and delete work — airplane-mode proof: no request code added, CSP unchanged, **not re-checked on a device**
- [x] `docs/00-scope.md` §1 and §3 rewritten; `CLAUDE.md` rules 3, 4, 5, 10 rewritten; `docs/changing-the-words.md` rewritten
- [x] `docs/journeys.md` replaced by the new J1–J3; `docs/NEXT-SESSION.md` rewritten
- [x] Confidence recorded here (8/10)
- [ ] **Merged to `main`** — after the founder has seen it on a phone
