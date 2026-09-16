# Start here

**Last refreshed:** 2026-09-16, 11th session, end — **B56 is BUILT on the branch `redesign` and pushed. Not merged. 124 tests pass.** A merge
to `main` publishes to the live address, and nobody has looked at it on a real phone yet. Rewritten, never appended to. Cap: 120 lines.

**Three things happened.** The founder asked for **two subtitles** (B56 §11), then asked to see **French** — so B16 started: the loop is
translated, France's and Switzerland's crisis numbers are read and shipped, and **walking it in French found that the one hard stop did not
exist in French at all** (fixed). Then they reviewed the French: **the elision is built** (« Si je » → « Si j’ » as you type), four
wordings changed, and **two decisions are waiting on them** (§3 item 0a). 130 tests pass. Read §1a before anything else.

## 1a. READ THIS FIRST — the hard stop was broken outside English

The founder's own example, typed into the French app — « Si je me tue, alors tout le monde ira mieux » — **was accepted and locked in.**
`guards.HARM` was eleven English phrases, and `hit()` turned every accented letter into a space before matching, so no accented word could
ever have matched in any language. Both fixed: **one list for every language, never indexed by the interface language**, accents folded with
`\p{Mn}`, the sentence pinned in `guards.test.js` alongside ordinary French going through. **The French harm words are unreviewed — for the
CBT reviewer** (B16 §10a; `docs/learnings.md` has the general version, which is not about French).

**French is NOT shippable.** `frozen`, `crisis`, `where` and `help` are deliberately untranslated and fall back to English, so a French
reader gets the loop in French and Help and the crisis block in English — worst on a refusal, a French sentence followed by an English
crisis block. It is on `redesign`, which publishes nothing. **Do not merge French to `main`.**

## 1. Where we are

**The redesign exists.** `web/` on `redesign` is the eight screens of [`B56`](tasks/B56-the-redesign.md) §3: *What do you think will happen?*
→ `If I ___, then ___.` → `Lock it in` → `LOCKED IN · Go and find out.` → `Done it` → *Did it go how you expected?* (`Yeah!` / `Sort of` /
`Not really`) → *What happened?* → `Keep it` → the results, newest first → `Same again tomorrow` / `Done with this one`. *Your predictions*,
*How it works*, Help. No number anywhere in the loop or the list. app.js is 951 lines (was 3,760); strings-en.js 444 (was 1,076).

**Read B56 §10 before touching anything** — what was built, **ten decisions made while building** (each the founder's to overrule), seven
gaps. The three that matter most: **old records migrate with NO tag on old results** (§5's mapping was backwards for the new question; every
word is kept in `was` and the export; the key is `betr.v2`); **contrast is under 4.5:1** as the canvas draws it (paper 4.25:1, the pink line
2.65:1, tokens at the top of `app.css`); **frozen sentence 2 still ends "and rate the belief again"** and there is no re-rate (frozen, so
the founder's call, with B56 §9c).

**The two subtitles (B56 §11)**, for "if this is the first time they need more help": the front says when a prediction can be about
(*Right now, later today, some time in your life — whenever*), and **Locked in** says it is kept and asks them back. One CSS class, `.sub`;
`loop.test.js` asserts both. Neither proposes anything (rule 4) and neither asks for anything back (rule 5).

**French, 2026-09-16 (B16 §10), `tu` throughout:** `web/content/strings-fr.js`, about forty-five pieces of wording, loaded by one more
`<script>` line in `index.html` and one in `tests/harness.js`. The language picker in Help draws itself now there are two. `i18n.test.js`
lists the 60 missing keys every run and `FROZEN_STILL_IN_ENGLISH` names French, so a missing frozen block is a decision, not an oversight.

**The elision, built (B16 §10d):** « Si je » → « Si j’ » in front of a vowel, as the person types, with **no French in `app.js`** —
`front.ifWordsElided` (**empty in English, and empty means never**) and `front.noElision`, the aspirated-h list, because there is no rule:
"j’hésite" but "je hurle". Stems are cut not to swallow a mute-h word (`hume` not `hum`, `honn` not `hon`). **`harness.js` now fires
`oninput` from `type()`** — it never did, so nothing the app does mid-word was reachable from a test at all.

**Four wordings changed on the founder's review:** the Locked in subtitle is their own sentence **and the ENGLISH changed to match it**
("…just as you wrote it. Come back and say what happened, in your own words."); « Ça s’est passé comme tu l’avais imaginé ? »;
« Tout à fait ! » for « Ouais ! »; and `copy-sheet.js` leaves the two machinery keys out of `docs/COPY.md`.

**Crisis numbers, read off the providers' own sites (B16 §10b):** **France 3114**, free, 24h/24 (in `notShipped` since 2026-09-03 only
because both pages refused to be read that day — the rule working). **Switzerland 143**, `free` deliberately null: the page does not say.
**Belgium** re-read, unchanged; **Québec** already covered by CA's 9-8-8. **15 is deliberately NOT in the file** — the French state
separates emergency numbers (15, 112) from listening lines (3114), exactly as BETR's crisis block does.

On 2026-09-15: `CLAUDE.md` rules 3, 4, 5, 10 and its opening note rewritten to B56; `docs/00-scope.md` §1 and §3; `docs/journeys.md` is the
new J1–J3; `changing-the-words.md` and `copy-sheet.js` rewritten. **Walked** in `tools/walk.js` (390×844): J1 end to end, a refusal, Help,
the front at 200%, and the whole French loop. **Not walked: a real phone, J2, J3.**

## 2. The next action

0. **The founder is choosing two French words (§3 item 0a). When they answer, apply BOTH with their agreement:** French agrees, so the
   word for a prediction drags `on.sub`, `front.noteLocked`, `on.notToday`, `log.done`, `log.back` and `mine.locked` with it if the new one
   is masculine — and the lock button moves with `mine.locked` and the LOCKED IN label as one family. Then translate `frozen`, `crisis`,
   `where` and `help` — **and the country names, which live in `helplines.js` in English**, or the crisis screen reads "les numéros de the
   United Kingdom". Both move together.
1. **Get the founder to look at it on a phone, then merge — ENGLISH ONLY.** They open `web/index.html` from `redesign`, or screenshots.
   Watch: typing into the two blanks on iPhone Safari (`contenteditable`, flowing inside the sentence — the one piece headless Chrome
   cannot vouch for), the Return key, Paste. Then J1–J3 on a real phone, wifi off after load, then merge and push — **that publishes**.
2. **Ask the founder the three questions in §3 (a–c)** in one go, plainly, with the numbers.
3. **B57 steps 6–8** (strip TrybeUP, *Who made this*, `README.md`) can go on `redesign` before the merge once the founder answers B57 §4a;
   Help's TrybeUP block and the "two counts" sentence were left as they are for B57. Then **B58** icons.

## 3. Waiting on people, not on code

0. **The founder.** **(0a) TWO FRENCH WORDS, ASKED 2026-09-16, NOT YET ANSWERED** — the word for a prediction (« prédiction » reads
   technical, and whatever replaces it changes six other lines through gender agreement) and the lock button, where they raised
   « Engagements », which makes « Je m’engage » its family. B16 §10d has both. **(a)** contrast — canvas colours or a deeper ground
   (`#B34A27` gives paper 5.0:1); **the two subtitles are the pink at 2.65:1 and are aimed at whoever needs the most help, so ask this
   first**; **(b)** frozen sentence 2's "rate the belief again" and B56 §9c's purpose statement, both frozen, both describing an app that is
   gone; **(c)** migrated results — no tag (built) or a mapping; **(d)** B58 icon; **(e)** B57 §4a, the name on *Who made this*;
   **(f)** B57 §4c, no count of opens; **(g)** the DNS record; **(h)** B56 §9a, next-step sentences in *How it works* or nowhere.
1. **The paid CBT reviewer:** **the French harm words in `guards.js`, unreviewed (B16 §10a)**; `Yeah!`-on-a-worry (B56 §9b); "I am" has no
   road to a reframe (B56 §10 gap c); the harm list only knows harm to yourself (gap f); *How it works*.
2. **A public-repo check:** `research/08-participant-voice-recovery.md` quotes public Reddit recovery posts with URLs. Founder's call.

## 4. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, public, MIT; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (130 pass on `redesign`) |
| **Branches** | **`redesign`** = the new app, pushed, publishes nothing. **`main`** = the OLD app, and every push touching `web/**` publishes it |
| **Walk it** | `node tools/walk.js start`, then `open` · `dump` · `tap` · `type` · `shot <file>` · `eval <js>` · `stop`. 390×844 @3x. **Always `stop`** |
| **Live today** | `https://betr.trybeup.com` — the OLD app, TrybeUP droplet (`ssh le-jibe`) |
| **The new box** | **`ssh nexus`**. Caddy config in `/etc/caddy/conf.d/`, sites under `/srv/<name>/site`. **Read freely; every write confirmed** |
| **The canvas** · fixture | `claude.ai/artifact/RcR4SB27nUiW5P6PPJJBDc` — eight screens + icons. `tests/fixtures/v5-phone.json` is the old app's own output (`make-v5-phone.js`, `git worktree add … 141de4f`) |

## 5. Gotchas, live

- **A `\u0027` TYPED INTO AN EDIT OR WRITE TOOL CALL ARRIVES AS A PLAIN APOSTROPHE.** Tool parameters are JSON. Write escapes from a script. (learnings, 2026-09-15)
- **CHROME KEEPS THE OLD CSS/JS BETWEEN `open`s.** After editing anything under `web/`, `stop` and `start` the walker.
- **zsh does not split `$w`.** Use a shell function: `w() { node tools/walk.js "$@"; }`.
- **The i18n sweep reads every `'…'` in app.js.** A class list on its own (`'paper small'`) reads as English — keep attributes inside a tag
  literal or use `markup()`. **A `'` inside a regex starts a fake string — write `\u0027`** (hit again 2026-09-16, in `ifLead`).
- **The blanks are `contenteditable` and read as `textContent`.** The harness's `type()` sets both `value` and `textContent`.
- **A CONFIG ON DISK IS NOT A CONFIG RUNNING.** `nexus`: `caddy validate` then `systemctl reload caddy`. **An asset asked for by URL must be
  committed** (`img-src 'self' data:`, `font-src 'none'`), and **`git checkout <file>` restores HEAD** — `cp` to the scratchpad and back.
- **AN ABSENCE ASSERTION DIES SILENTLY WHEN THE STRING DOES.** The no-number test checks the day label exists before stripping it; keep that.
- **Every word a person reads is in `content/strings-en.js` / `-fr.js`.** Use `’` and `“ ”` — a plain `'` also ENDS the string. Generated:
  `zones.js`, `docs/COPY.md`. **A crisis number is read off the provider's site on the day, or the country shows none.**
- **The auto-mode classifier refuses `sed` on CLAUDE.md.** Edit it with the Edit tool, in the open.
- **The repo is public.** No address, key, or person's name goes into a doc.
- **A RULE WRITTEN AS A WORD LIST ONLY WORKS IN THE LANGUAGE IT WAS WRITTEN IN**, and the tests guarding it are in that language too, so
  they keep passing. Before any new language, hunt every list the code MATCHES against, not every string a person reads. (learnings, 2026-09-16)
- **`\u0300` IS THREE DIGITS IN A ROW**, and `guards.test.js` bans those in `guards.js` because a phone number must never live there. Use
  `\p{Mn}` and similar named escapes in that file.
- **FRENCH AGREES AND ENGLISH DOES NOT.** Change the French noun for a prediction and six other lines change with it. Any French wording
  change gets read for agreement before it is committed. (B16 §10d)
- **Walk the app in a language by tapping Help → the language button** (`[data-lang="fr"]`), then `#where` → `[data-cc="FR"]` for the
  country. The walker always starts in English on `Europe/London`.
- **No ImageMagick, no PIL.** SVG → PNG is `qlmanage -t -s 512 -o <dir> file.svg`; crop is `sips -c`.
