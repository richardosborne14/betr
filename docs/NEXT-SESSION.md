# Start here

**Last refreshed:** 2026-09-08, after B35.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Where we are

**B28–B34 are built and closed. B35 is built and pushed, except its §3, which is a decision.**
207 tests, no dependencies, no build step, nothing requested after load. `main` is clean and
live at `https://betr.trybeup.com`.

**B35, from the founder walking it on a phone** (`docs/tasks/B35-the-look-and-the-recap.md`):

- **The recap sentence stopped reading as a caption.** A test somebody wrote has no label, so
  B30 promoted its sentence into the label's slot and it inherited the label's small bold
  left-aligned type on a screen where everything else is large and centred. `worryHead()` marks
  that case `solo` and it is drawn as the sentence it is: quoted, centred, 19px. The borrowed
  label-and-quote strip is untouched and a test holds that it stays untouched.
- **Light and dark, and the person owns it.** BETR opens as the phone is set; from the moment
  somebody touches the chip in the top corner, their choice wins and the phone is never
  consulted again. `web/lib/theme.js` is loaded in the `<head>` — the choice has to be on
  `<html>` before the stylesheet, and it cannot be an inline script because the page's own CSP
  blocks those. **The media query is gone from `app.css` and must not come back**; one place
  decides, which is the only way a choice can beat the phone.

## 2. The next action

**Nothing is half-built.** The founder asked for LLM-written suggestions on *What will you do
today?* — the diagnosis is right, and B34 §1 found the same hole: a person who typed their own
sentence gets **two** generic `dos`. They set the bar themselves: *"it needs to respect the
prompt … no exposure to risking someone hurting themselves"*. **Four rounds were measured
offline. It does not clear that bar.** Full numbers in `docs/learnings.md`; the line that
matters:

> **The safety gate scored 100% on the sentences it had been shown and 70% on the ones it had
> not.** Held out, it allowed *"walk home past the bridge"*, *"come off the sleeping tablets"*
> and *"stop messaging her to check she's not angry"* — **3 of 3 each**. A blind spot.

**The route taken instead: the model offline as a writing assistant**, candidates through the
CBT reviewer who is already a release condition, the good ones shipped as **fixed content**.
Newbie unstuck, nothing leaves the phone, no frozen sentence unfreezes, BETR never chooses.

**The founder took it on 2026-09-08** — *"yeah I reckon you just generate a bunch of
sentences"* — **so no runtime call is being built, and the first batch exists:
`docs/candidates-suggestions-batch-1.md`**, 91 lines written offline, **unreviewed and not in
the app**. §1 is the part that matters (the `general` set, all the main road offers); §3 argues
**start #19 should come out of `starts.js`**, a checking ritual BETR wrote itself that 206 tests
never had an opinion about; §5 audits the 91 against the three blind spots and **recommends
cutting one of its own**. **Nothing reaches `web/content/` unreviewed.**

**A gap that audit found and nobody owns: `guards.js` has no medication word list** — the
*"sleeping tablets"* miss is the same hole seen from outside.

**Two API keys were pasted into that session — Groq and Anthropic. Both need rotating.**

Everything else open is somebody's reading:

1. **The founder, five things.** Start #19, the checking ritual (B34 §6). Which of the four
   examples leads the front screen and **whether it is real or an example**. **The purpose
   statement**, which still says "you pick a worry", frozen in five places — candidate in
   `B29`. **The `HARM` false refusal** (*"end it"* refuses a sentence about ending a
   friendship). **Change the ad, not the app** (B25).
2. **Misha, in one ask:** the four nouns (B23 option b), the door order, and the 21 chips.
3. **The paid CBT reviewer, now the critical path:** **`candidates-suggestions-batch-1.md`
   (91 lines, K/E/C in the margin)**, `content/starts.js` (~180 sentences),
   `content/examples.js`, the three `worries.js` sentences rewritten on 2026-09-08 (`phone`,
   `rest`, `low`), three pairs from B1, and B34 §4's `general.thens` (batch §1a proposes it).
4. **A screen-reader pass on a real phone.** The tree was read in B33; **nobody has used it**,
   and B35's chip is new and unheard.
5. **Q1 (name, trademark, domain)** is open, blocks release and blocks B5 outright.

**Unchanged release conditions** beyond those: Misha on `places.signedOff`; J1–J3 on a phone;
an owner for links and helplines.

## 3. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | `python3 -m http.server 8760 --bind 127.0.0.1` from `web/`, then `http://127.0.0.1:8760/` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** |
| Live address | **`https://betr.trybeup.com` — live.** Every push to `main` touching `web/**` publishes it. Cert expires 2026-12-02 |
| TrybeUP's repo | `trybeup/trybeup-prod`, checkout at `~/vscode_projects/trybeup-prod`. Nothing further is owed to it |

## 4. Gotchas, live

- **`walk.js` dies silently, and a dead walker returns a stale page rather than an error.** If a
  result surprises you, `start` again and redo it before you believe it or write it down.
- **The walk browser's own system is set to DARK**, so B35 makes BETR open dark there. That is
  correct behaviour, not a bug. `eval` `matchMedia('(prefers-color-scheme: dark)').matches` to
  see what the phone is saying, and `localStorage.getItem('betr.look')` for what the person said.
- **`web/lib/theme.js` is loaded in the `<head>`, before the stylesheet, and has to be.** Later
  is a flash of the wrong colour on every screen. It cannot become an inline script — CSP.
- **Tapping the look chip must never repaint**, or it throws away a sentence somebody is half
  way through typing on the build screen. It swaps its own text in place; there is a test.
- **The three roads to the build screen offer three different suggestion sets** (B34 §1 has the
  table). Any chip change has to be checked on all three.
- **The fake DOM in `harness.js` is flat and fires no events.** Live behaviour is walked, not
  unit-tested — that is the bargain. `boot(seed, {dark: true})` is a dark-mode phone (B35).
- **A REGION DELETE NEEDS BOTH ENDS CHECKED.** Cutting between comment banners once swallowed
  the whole build screen out of `app.js`. `learnings.md`.
- **The fold is 785px at 100% and 780px at 125%.** `doors.intro` is one line and must stay one.
  **Known and untouched: at 125% the `do` box on *What will you do today?* clips its own text
  and *Lock it in* sits under the menu.** Pre-existing; worth a task of its own.
- **Chips are exempt from the capital-letter rule**, narrowly and by class.
- **`rate.keyOf()` keys an own ladder by `id`**, falling back to the sentence when there is
  none — that fallback is somebody's pre-B30 ladder. **v4 migrated no data on purpose.**
- **After editing `web/content/*`, `stop` and `start`** — `open` alone serves a cache.
- **`HABIT`/`BODY` refuse nothing any more** and still hold BETR's own content — and neither
  catches a checking ritual, which rule 4 also forbids BETR to propose.
- **Help's order is three decisions and four tests hold it:** crisis first (B17), proof second
  (B26), frozen sentence 6 third (B33), then CBT, then the nine.
- **Every word a person reads is in `web/content/`**; a sentence back in `app.js` fails
  `i18n.test.js` — and **a string literal that starts mid-tag reads as prose to that sweep**.
- **Use `’` and `“ ”`, never `'` and `"`.** All 723 content strings already do, and since B35
  `content.test.js` fails the build on a typewriter one. It bit the offline batch sixty times:
  anything drafted outside `web/content/` arrives with the wrong quotes.
- **`content/zones.js` and `docs/COPY.md` are generated** (`node tools/copy-sheet.js`); never
  hand-edit. **No helpline number is written from memory.**
