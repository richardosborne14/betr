# Start here

**Last refreshed:** 2026-09-16, 11th session, end. **Branch `redesign`, pushed, not merged. 137 tests pass** (`node --test`, read
2026-09-16 08:51 UTC at `6894326`, 0 French keys missing). A merge to `main` publishes to the live address. Rewritten, never appended to.

**This session:** the founder asked for two subtitles (B56 §11), then French (B16 §10a–g). Both are written. **B16 is not finished:
French is complete in words and not shippable** — what is left is people, not code (§3).

**Done vs. merely written.** *Tested and walked in headless Chrome (`tools/walk.js`, 390×844):* the subtitles; the whole French loop,
elision, crisis block (France, Belgium, UK, Kenya), country list, picker, all of Help, export and delete; the French hard stop firing.
*Never observed:* **anything on a real phone** (the `contenteditable` blanks and the invisible `<select>` over `EN ▾` on iOS Safari are the
two riskiest), **any of the French read by a native speaker**, J2 and J3.

**Settled this session, and where the plan of record was wrong:**
- **B16's plan left `frozen`, `crisis` and `help` in English** pending sign-off. The founder asked for all of it; it is all French now, and
  the frozen block is a faithful DRAFT (rule 7 says so), not a rewrite.
- **The plan assumed the hard stop was language-neutral. It was English-only and could not match an accent** — §1a. Fixed.
- **Rule 3's "not bet" does not bind French:** the word is « pari », the act « Je m’engage » / ENGAGÉ (recorded under rule 3).
- **B15's "picker in Help only" is overturned:** `EN ▾` / `FR ▾` top right of every screen, no flag (recorded under rule 10).
- **15 is not a helpline** and stays out of `helplines.js`; France is 3114. **Country names come from the browser in the reader's
  language**, bare after a colon in French, never with an article.
- The English Locked-in subtitle was changed to match the founder's French, not the other way round.

## 1a. READ THIS FIRST — the hard stop was broken outside English

The founder's own example, typed into the French app — « Si je me tue, alors tout le monde ira mieux » — **was accepted and locked in.**
`guards.HARM` was eleven English phrases, and `hit()` turned every accented letter into a space before matching, so no accented word could
ever have matched in any language. Both fixed: **one list for every language, never indexed by the interface language**, accents folded with
`\p{Mn}`, the sentence pinned in `guards.test.js` alongside ordinary French going through. **The French harm words are unreviewed — for the
CBT reviewer** (B16 §10a; `docs/learnings.md` has the general version, which is not about French).

**French is complete and NOT shippable.** Every sentence is French, but the nine frozen sentences and the purpose are a faithful DRAFT
awaiting the founder's sign-off (rule 7), the French harm words await the CBT reviewer, and B16 §3's jurisdiction look is undone. It is
on `redesign`, which publishes nothing. **Do not merge French to `main`.**

## 1. Where we are

**The redesign exists.** `web/` on `redesign` is the eight screens of [`B56`](tasks/B56-the-redesign.md) §3, and **Read B56 §10 before
touching it** — ten decisions made while building and seven gaps: old records migrate with NO tag (`betr.v2`); contrast is under 4.5:1
(paper 4.25:1, the pink line 2.65:1, tokens top of `app.css`); frozen sentence 2 still says "rate the belief again".

**French is [B16](tasks/B16-shipping-a-language.md) §10a–g — read it before touching French.** `content/strings-fr.js` (`tu`); the elision
(`front.ifWordsElided` + the aspirated-h list `front.noElision`, no French in `app.js`); `places.js` carries each link's French under `fr`;
`where.js` names countries per language; crisis numbers read on their own sites (**France 3114**, **Switzerland 143** `free` null,
Belgium re-read, Québec = CA's 9-8-8). `harness.js` now fires `oninput` from `type()` and has `pick()`.

## 2. The next action

0. **French is written; what is left is people:** the founder signs off the frozen French and says if TrybeUP's headline reads right;
   French-speaking places for Help need reading on their own sites (B16 §10g). **« Pari » is masculine:** grep every French string for
   feminine forms after any change. Open for the founder: `front.title`, and `crisis.howWeKnow` overclaiming (§10f), in both languages.
1. **Get the founder to look at it on a phone, then merge — ENGLISH ONLY.** They open `web/index.html` from `redesign`, or screenshots.
   Watch: typing into the two blanks on iPhone Safari (`contenteditable`, flowing inside the sentence — the one piece headless Chrome
   cannot vouch for), the Return key, Paste. Then J1–J3 on a real phone, wifi off after load, then merge and push — **that publishes**.
2. **Ask the founder §3 (a–c)** in one go, plainly, with the numbers.
3. **B57 steps 6–8** (strip TrybeUP, *Who made this*, `README.md`) can go on `redesign` before the merge once the founder answers B57 §4a;
   Help's TrybeUP block and the "two counts" sentence were left as they are for B57. Then **B58** icons.

## 3. Waiting on people, not on code

0. **The founder.** **(0a)** the French title — « qu’est-ce qui va se passer » (built) or their « que va-t-il se passer ». **(a)** contrast — canvas colours or a deeper ground
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
| Repo · stack | `github.com/richardosborne14/betr`, public, MIT; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (137 pass on `redesign`) |
| **Branches** | **`redesign`** = the new app, pushed, publishes nothing. **`main`** = the OLD app, and every push touching `web/**` publishes it |
| **Walk it** | `node tools/walk.js start`, then `open` · `dump` · `tap` · `type` · `shot <file>` · `eval <js>` · `stop`. 390×844 @3x. **Always `stop`** |
| **Live today** | `https://betr.trybeup.com` — the OLD app, TrybeUP droplet (`ssh le-jibe`) |
| **The new box** | **`ssh nexus`**. Caddy config in `/etc/caddy/conf.d/`, sites under `/srv/<name>/site`. **Read freely; every write confirmed** |
| **The canvas** · fixture | `claude.ai/artifact/RcR4SB27nUiW5P6PPJJBDc` — eight screens + icons. `tests/fixtures/v5-phone.json` is the old app's own output (`make-v5-phone.js`, `git worktree add … 141de4f`) |

## 5. Gotchas, live

- **A `\u0027` TYPED INTO AN EDIT OR WRITE TOOL CALL ARRIVES AS A PLAIN APOSTROPHE.** Tool parameters are JSON. Write escapes from a script. (learnings, 2026-09-15)
- **CHROME KEEPS THE OLD CSS/JS BETWEEN `open`s** — after editing under `web/`, `stop` and `start` the walker. **zsh does not split `$w`:**
  use `w() { node tools/walk.js "$@"; }`.
- **The i18n sweep reads every `'…'` in app.js.** A class list on its own (`'paper small'`) reads as English — keep attributes inside a tag
  literal or use `markup()`. **A `'` inside a regex starts a fake string — write `\u0027`** (hit again 2026-09-16, in `ifLead`).
- **The blanks are `contenteditable` and read as `textContent`.** The harness's `type()` sets both `value` and `textContent`.
- **A CONFIG ON DISK IS NOT A CONFIG RUNNING.** `nexus`: `caddy validate` then `systemctl reload caddy`. **An asset asked for by URL must be
  committed** (`img-src 'self' data:`, `font-src 'none'`), and **`git checkout <file>` restores HEAD** — `cp` to the scratchpad and back.
- **AN ABSENCE ASSERTION DIES SILENTLY WHEN THE STRING DOES.** The no-number test checks the day label is there before stripping it.
- **Every word a person reads is in `content/strings-en.js` / `-fr.js`.** Use `’` and `“ ”` — a plain `'` also ENDS the string. Generated:
  `zones.js`, `docs/COPY.md`. **A crisis number is read off the provider's site on the day, or the country shows none.**
- **The auto-mode classifier refuses `sed` on CLAUDE.md.** Edit it with the Edit tool, in the open.
- **The repo is public.** No address, key, or person's name goes into a doc.
- **A RULE WRITTEN AS A WORD LIST ONLY WORKS IN THE LANGUAGE IT WAS WRITTEN IN**, and the tests guarding it are in that language too, so
  they keep passing. Before any new language, hunt every list the code MATCHES against, not every string a person reads. (learnings, 2026-09-16)
- **`\u0300` IS THREE DIGITS IN A ROW**, and `guards.test.js` bans those in `guards.js` because a phone number must never live there. Use
  `\p{Mn}` and similar named escapes in that file.
- **FRENCH AGREES AND ENGLISH DOES NOT.** « Pari » is masculine; ten French lines agree with it. Read any French change for agreement.
- **Walk in French:** `eval "var s=document.querySelector('#lang');s.value='fr';s.dispatchEvent(new Event('change'))"`, or Help →
  `[data-lang="fr"]`. Country: `#where` → `[data-cc="FR"]`. The walker starts in English on `Europe/London`. Tests: `a.pick('#lang','fr')`.
- **No ImageMagick, no PIL.** SVG → PNG is `qlmanage -t -s 512 -o <dir> file.svg`; crop is `sips -c`.
