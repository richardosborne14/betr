# Start here

**Last refreshed:** 2026-09-16, 11th session, end — **B56 is BUILT on the branch `redesign` and pushed. Not merged. 124 tests pass.** A merge
to `main` publishes to the live address, and nobody has looked at it on a real phone yet. Rewritten, never appended to. Cap: 120 lines.

**This session was one small thing:** the founder saw the redesign, called it great, and asked for **two subtitles** — the two places a
first-timer is left guessing. Both built, both tested, both on `redesign` (B56 §11). Nothing else moved; §2's next action is unchanged.

## 1. Where we are

**The redesign exists.** `web/` on `redesign` is the eight screens of [`B56`](tasks/B56-the-redesign.md) §3: *What do you think will happen?*
→ `If I ___, then ___.` → `Lock it in` → `LOCKED IN · Go and find out.` → `Done it` → *Did it go how you expected?* (`Yeah!` / `Sort of` /
`Not really`) → *What happened?* → `Keep it` → the results, newest first → `Same again tomorrow` / `Done with this one`. *Your predictions*,
*How it works*, Help. No number anywhere in the loop or the list. app.js is 951 lines (was 3,760); strings-en.js 444 (was 1,076).

**Read B56 §10 before touching anything.** It lists what was built, **ten decisions made while building** (each the founder's to overrule),
and seven gaps. The three that matter most:
- **The old record migrates, and old results get NO tag.** B56 §5's mapping (`a lot less sure` → Yeah!) was backwards for the new question.
  Every word is kept, including the old tapped word, in `was` and in the export. Key is `betr.v2` (the old app only ever wrote `betr.v1`).
- **Contrast is under 4.5:1** as the canvas draws it: paper on the orange 4.25:1, the pink explanation line 2.65:1. Built as locked;
  tokens at the top of `app.css`. The founder's call.
- **Frozen sentence 2 ends "and rate the belief again"** — there is no re-rate any more. Frozen; the founder's call, with B56 §9c.

**The two subtitles, 2026-09-16 (B56 §11), the founder's words and the founder's reason — "if this is the first time they need more help":**
- Front, under the headline: *Right now, later today, some time in your life — whenever.* It answers the question the headline leaves
  open — "in what context?" — and answers it wide, on purpose: the prediction is not owed to today.
- **Locked in**, under *Go and find out.*: *We'll keep it here, in your own words. Come back and say what happened.*
- One CSS class, `.sub`; `loop.test.js` asserts both. Neither proposes anything (rule 4) and neither asks for anything back (rule 5).

On 2026-09-15: `CLAUDE.md` rules 3, 4, 5 and 10 rewritten to B56, and its opening note; `docs/00-scope.md` §1 and §3; `docs/journeys.md` is the
new J1–J3; `docs/changing-the-words.md` and `tools/copy-sheet.js` (→ `docs/COPY.md`) rewritten for the new strings; learnings has four new
entries. **Walked:** J1 end to end plus a refusal and Help in `tools/walk.js` (390×844), and the front and Locked in at 100% and 200%.
**Not walked:** a real phone, J2, J3.

## 2. The next action

1. **Get the founder to look at it on a phone, then merge.** They can open `web/index.html` from the repo while it is on the `redesign`
   branch, or be walked through screenshots. What to watch: typing into the two blanks on iPhone Safari (they are `contenteditable`, flowing
   inside the sentence — the one piece of this that a headless Chrome cannot vouch for), the keyboard's Return key, and Paste.
   Then walk J1–J3 on a real phone, wifi off after load. Then `git checkout main && git merge redesign` and push — **that publishes**.
2. **Ask the founder the three questions in §3 (a–c)** in one go, plainly, with the numbers.
3. **B57 steps 6–8** (strip TrybeUP, *Who made this*, `README.md`) can go on `redesign` before the merge once the founder answers B57 §4a;
   Help's TrybeUP block and the "two counts" sentence were deliberately left as they are for B57.
4. **B58** icons, then **B16** French once the strings settle.

## 3. Waiting on people, not on code

0. **The founder:** **(a)** contrast — keep the canvas colours, or deepen the ground (`#B34A27` gives paper 5.0:1); **the two new
   subtitles are the pink at 2.65:1, and they are the lines aimed at whoever needs the most help, so ask this one first**; **(b)** frozen sentence 2's
   "rate the belief again", and B56 §9c's purpose statement — both frozen, both now describe an app that is gone; **(c)** migrated results —
   no tag (built) or a mapping; **(d)** B58 icon; **(e)** B57 §4a, the name on *Who made this*; **(f)** B57 §4c, no count of opens;
   **(g)** the DNS record; **(h)** B56 §9a, next-step sentences in *How it works* or nowhere.
1. **The paid CBT reviewer:** the `Yeah!`-on-a-worry wrinkle (B56 §9b); "I am" has no road to a reframe on the front screen (B56 §10 gap c); the harm list only knows harm to yourself (gap f);
   *How it works*.
2. **A public-repo check:** `docs/research/08-participant-voice-recovery.md` quotes public Reddit recovery-forum posts with URLs. Founder's call.

## 4. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, public, MIT; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (124 pass on `redesign`) |
| **Branches** | **`redesign`** = the new app, pushed, publishes nothing. **`main`** = the OLD app, and every push touching `web/**` publishes it |
| **Walk it** | `node tools/walk.js start`, then `open` · `dump` · `tap` · `type` · `shot <file>` · `eval <js>` · `stop`. 390×844 @3x. **Always `stop`** |
| **Live today** | `https://betr.trybeup.com` — the OLD app, TrybeUP droplet (`ssh le-jibe`) |
| **The new box** | **`ssh nexus`**. Caddy config in `/etc/caddy/conf.d/`, sites under `/srv/<name>/site`. **Read freely; every write confirmed** |
| **The canvas** | `claude.ai/artifact/RcR4SB27nUiW5P6PPJJBDc` — eight screens + the icon board |
| **Old record fixture** | `web/tests/fixtures/v5-phone.json`, made by the old app's own code; `make-v5-phone.js` says how (`git worktree add … 141de4f`) |

## 5. Gotchas, live

- **A `\u0027` TYPED INTO AN EDIT OR WRITE TOOL CALL ARRIVES AS A PLAIN APOSTROPHE.** Tool parameters are JSON. Write escapes from a script. (learnings, 2026-09-15)
- **CHROME KEEPS THE OLD CSS/JS BETWEEN `open`s.** After editing anything under `web/`, `stop` and `start` the walker.
- **zsh does not split `$w`.** Use a shell function: `w() { node tools/walk.js "$@"; }`.
- **The i18n sweep reads every `'…'` in app.js.** A class list passed on its own (`'paper small'`) reads as English — keep attributes inside a
  tag literal or use `markup()`. A `'` inside a regex starts a fake string — write `\u0027`.
- **The blanks are `contenteditable` and read as `textContent`.** The harness's `type()` sets both `value` and `textContent`.
- **A CONFIG ON DISK IS NOT A CONFIG RUNNING.** `nexus`: `caddy validate` then `systemctl reload caddy`.
- **AN ASSET ASKED FOR BY URL MUST BE COMMITTED.** `img-src 'self' data:`, `font-src 'none'`.
- **`git checkout <file>` RESTORES HEAD.** `cp` to the scratchpad and back.
- **AN ABSENCE ASSERTION DIES SILENTLY WHEN THE STRING DOES.** The no-number test checks the day label exists before stripping it; keep that.
- **Every word a person reads is in `web/content/strings-en.js`.** Use `’` and `“ ”`. Generated: `zones.js`, `docs/COPY.md`.
- **A crisis number is read off the provider's site on the day, or the country shows none.** This does not loosen for French.
- **The auto-mode classifier refuses `sed` on CLAUDE.md.** Edit it with the Edit tool, in the open.
- **The repo is public.** No address, key, or person's name goes into a doc.
- **No ImageMagick, no PIL.** SVG → PNG is `qlmanage -t -s 512 -o <dir> file.svg`; crop is `sips -c`.
