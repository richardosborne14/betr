# Start here

**Last refreshed:** 2026-09-08, after B35 was committed and the tree verified clean.
> What a new session reads to start working. Rewritten, not appended to. Cap: 120 lines.

## 1. Read this before you touch anything

**The tree is clean and `main` is pushed. There is nothing half-built.** The previous handoff
said B35 was uncommitted and blocking every push to `web/`; it went in as `3759f2d` and that
file was never rewritten after. Ignore anything you remember about a blocked push.

**One live item that is not code: the Groq API key pasted into the 2026-09-08 session is burnt
and has not been rotated.** Rotate it at console.groq.com whatever is decided about §3 below.
It was never committed — tree and full history checked clean this session — but it went
through a chat and should be treated as public.

## 2. Where we are

B28–B35 are built and closed. **206 tests green**, `node --test` from the repo root.
Rule 1 re-verified this session: `connect-src 'none'` in `web/index.html` and
`deploy/nginx.conf`, the build-failing check in `.github/workflows/deploy.yml`, and no
`fetch`/XHR/WebSocket/beacon anywhere in `web/` outside a comment.

**B35 (`docs/tasks/B35-the-look-and-the-recap.md`) — two built, one is the founder's.**

- **The recap sentence stopped reading as a caption.** A test somebody wrote is now quoted and
  centred like a borrowed one, 19px, 40ch. The borrowed two-part case is untouched, and held so.
- **Light is the default, with a switch that remembers.** `web/lib/theme.js`; it was the
  phone's `prefers-color-scheme` before and is now a choice.
- **§3 is not built and must not be built until the founder answers** — see below.

**B34 (`docs/tasks/B34-auditing-the-suggestions.md`) fixed two defects** — a chip putting words
in the box other than the ones printed on it, and *Back* throwing the plan away. Its other
findings are all still open and most are somebody's call.

## 3. The one big question, and it is the founder's

**Should BETR call a model at runtime to suggest what you'll do today?** The founder asked for
it, for a good reason: a newbie gets stuck there, and the main road offers them `general.dos` —
two lines that are true of any test and about nobody's sentence.

**The experiment was run offline, from a scratchpad, never from the app.** Full transcript in
`docs/learnings.md` (line ~649). Four of five sentences gave usable raw material. **The fifth
broke rule 4 twice, having been told not to**, proposing a checking-ritual exposure for an OCD
sentence — and `guards.js` cannot catch that, which B34 §6 found independently the same day.

**So: a good writing assistant, an unreliable clinician, and no runtime check that tells the
difference.** B35 §3 lists eight things that follow — the key cannot live in a static app,
frozen sentence 5 and the airplane-mode proof and Apple's *Data Not Collected* all stop being
true, and rule 2's line is the device line. Read it before discussing it; don't re-derive it.

**The alternative is not a consolation prize:** use the model offline as a writing assistant,
generate several hundred candidate `dos`/`drops`, put them through the CBT reviewer who is
already an open release condition, and ship the good ones as fixed content. The newbie gets
unstuck, BETR still never chooses, nothing leaves the phone.

## 4. The next action

Nothing in `web/` is waiting on a developer. **Everything below the first line is waiting on a
person**, so the honest next action is to put the questions in front of them.

1. **The founder, now six things.** §3 above, which is the biggest. Start #19, which proposes a
   checking ritual (*"Lock up once, and walk away"*) — rule 4's half about BETR's own content
   did not loosen on 2026-09-08. Which of the four examples leads the front screen, **and
   whether it is real or an example**. **The purpose statement**, which still says "you pick a
   worry", frozen in five places — candidate in `B29`. **The `HARM` false refusal** (*"end it"*
   refuses a sentence about ending a friendship). **Change the ad, not the app** (B25).
2. **Misha, in one ask:** the four nouns (B23 option b), the door order, and the 21 chips.
3. **The paid CBT reviewer:** `content/starts.js` (~180 sentences), `content/examples.js`, the
   three `worries.js` sentences rewritten on 2026-09-08 (`phone`, `rest`, `low`), three pairs
   still waiting from B1, and **B34 §4's proposal to lengthen `general.thens`**.
4. **A screen-reader pass on a real phone.** The tree was read in B33; nobody has used it, and
   the theme switch and the chips are both new since anyone looked.
5. **Q1 (name, trademark, domain)** is open, blocks release and blocks B5 outright.

**If you want code to do while those sit, B36 is ready:** the **125% text overflow on *What
will you do today?*** — the `do` box clips its own text and *Lock it in* sits under the menu.
Pre-existing, untouched by B35, needs nobody's permission, named by B35 as its own task.

**Unchanged release conditions** beyond those: Misha on `places.signedOff`; J1–J3 on a phone;
an owner for links and helplines.
## 5. Environment facts

| | |
| --- | --- |
| Repo | `github.com/richardosborne14/betr`, private, branch `main` |
| Stack | plain HTML/CSS/JS in `web/`; **tests are `node --test` from the repo root** |
| See it now | `python3 -m http.server 8760 --bind 127.0.0.1` from `web/`, then `http://127.0.0.1:8760/` |
| **Walk it for real** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · **`eval <js>`** · `stop`. Chrome stays alive between commands, 390×844 @3x. **Always `stop`.** |
| Live address | **`https://betr.trybeup.com` — live.** Every push to `main` touching `web/**` publishes it. Cert expires 2026-12-02 |
| TrybeUP's repo | `trybeup/trybeup-prod`, checkout at `~/vscode_projects/trybeup-prod`. Nothing further is owed to it |

## 6. Gotchas, live

- **`walk.js` dies silently, and a dead walker returns a stale page rather than an error.** It
  cost two wrong readings in B34. **If a result surprises you, `start` again and redo it.**
- **The three roads to the build screen offer three different suggestion sets** (B34 §1 has the
  table). Any chip change has to be checked on all three: type-your-own, tap-a-chip,
  borrow-a-worry.
- **The fake DOM in `harness.js` is flat and fires no events.** `parse()` indexes ids and
  `data-` attributes off the whole HTML string, so there is no real nesting: a chipset stub has
  no children, and anything reached by class or traversal is invisible to a test. Live
  behaviour is walked, not unit-tested — the bargain, not an omission.
- **A REGION DELETE NEEDS BOTH ENDS CHECKED.** Cutting between comment banners once swallowed
  the whole build screen out of `app.js`. `learnings.md`.
- **The fold is 785px at 100% and 780px at 125%.** `doors.intro` is one line and must stay one.
  Anything near the bottom needs a `shot` or an `eval`'d rect; `dump` cannot see the fixed menu.
- **Chips are exempt from the capital-letter rule**, narrowly and by class.
- **`rate.keyOf()` keys an own ladder by `id`**, falling back to the sentence when there is
  none — that fallback is somebody's pre-B30 ladder. **v4 migrated no data on purpose.**
- **After editing `web/content/*`, `stop` and `start`** — `open` alone serves a cache.
- **`HABIT`/`BODY` refuse nothing any more** and still hold BETR's own content — and neither
  catches a checking ritual, which rule 4 also forbids BETR to propose.
- **Help's order is three decisions, four tests hold it:** crisis first (B17), proof second
  (B26), frozen sentence 6 third (B33), then CBT, then the nine.
- **Every word a person reads is in `web/content/`**; a sentence back in `app.js` fails
  `i18n.test.js` — and **a literal starting mid-tag reads as prose to that sweep** (B35 tripped
  it with a class name, `' quiet solo'`).
- **`content/zones.js` and `docs/COPY.md` are generated** (`node tools/copy-sheet.js`); never
  hand-edit. **No helpline number is written from memory.**
