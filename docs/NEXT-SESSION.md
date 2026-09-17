# Start here

**Last refreshed:** 2026-09-17, 13th session (short: the icon's sun made pure white, founder's ask, republished). **Branch `redesign`, pushed, not merged. 139 tests pass** (`node --test`).
**`redesign` is now LIVE at `https://betr.digitalbricks.io`** for the founder's phone check (published by hand:
`gh workflow run deploy.yml --ref redesign`). `main` still publishes the OLD app to `betr.trybeup.com`. Rewritten, never appended to.

**This session: B57 built, B58 built, a narrow-phone fix.** The founder answered B57 §4: **Digital Bricks** on *Who made this*; **keep a
daily count** (so the tally moved to Caddy, and Help's "two counts" sentence stays true); **a 301 from `betr.trybeup.com` for six months,
to 2027-03-16** (they first said switch off, then changed it); **the redesign goes to the new address first**; **merge after their phone
check**. B58: **C, the sunrise**, squarer and bigger — built ([`B58`](tasks/B58-the-icon.md) §4). Then the founder's screenshots showed the
front sentence breaking below 390px: blanks now size from the card (`cqi`) and carry their punctuation (`.glue`); walked at 320–430 EN/FR.
`BETR_WIDTH=320 node tools/walk.js …` walks a narrow phone. Full record: [`B57`](tasks/B57-the-move-to-digitalbricks.md) §5.

**Done vs. merely written.** *Observed from outside:* the new address over HTTP/2 with every header, the hash, the manifest type, the
tally lines holding only the day, both workflows green, the other four sites on the box still 200. *Walked in headless Chrome:* the new
*Who made this* in EN and FR. *Never observed:* **anything on a real phone**, any French read by a native speaker.

**Settled this session, and where the plan of record was wrong:**
- **B57 §2 assumed no count.** The founder wants one: `deploy/betr.caddy` writes `{"ts":"YYYY-MM-DD"}` per page open to `people.log` /
  `robots.log` and nothing else; `tests/deploy.test.js` holds it. `views.yml` reads it.
- **Secrets are new names (`BETR_DEPLOY_*`)**, not the old ones overwritten, so `main`'s old pipeline keeps working until the merge.
- **Frozen sentence 9 changed** in both languages: "made by Digital Bricks" (the founder's name choice; the French is still draft).
- CLAUDE.md rule 9 is **rewritten, not deleted**, so rule 10 keeps its number. B6 and B7 closed, will not do.

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

1. **The founder looks at `https://betr.digitalbricks.io` on their phone** — typing into the two blanks on iPhone Safari
   (`contenteditable`), Return, Paste, the invisible `<select>` under `EN ▾`, then J1–J3 with wifi off after load. Any word change on
   `redesign` needs `gh workflow run deploy.yml --ref redesign` to reach that address.
2. **B58: install to a home screen** on an iPhone and an Android phone and look at the sunrise (the one thing left in B58).
3. **Merge `redesign` to `main` — ENGLISH ONLY is shippable** (French is not, §1a) — once the founder says. From then `main` publishes to
   the new address. **Resolve deploy files to `redesign`'s versions** (`main` still has nginx.conf / compose).
4. **Redirect the old address (B57 §2 step 9): a 301 to `https://betr.digitalbricks.io` until 2027-03-16,** in `trybeup/trybeup-prod`
   under its own CLAUDE.md; each write confirmed. Once it redirects, remove the droplet's container, `/var/www/betr`, `/opt/betr`, its deploy user, the secrets `BETR_SERVER_*` and
   `BETR_SSH_PRIVATE_KEY`. Ask whether the droplet's old tally is worth keeping before deleting it. **On 2027-03-16** take the redirect
   out; then delete CLAUDE.md's droplet paragraph and the "two addresses" note in `changing-the-words.md`.
5. **French is written; what is left is people:** the founder signs off the frozen French (now including sentence 9's new wording).

## 3. Waiting on people, not on code

0. **The founder.** **(0a)** the French title — « qu’est-ce qui va se passer » (built) or their « que va-t-il se passer ». **(a)** contrast — canvas colours or a deeper ground
   (`#B34A27` gives paper 5.0:1); **the two subtitles are the pink at 2.65:1 and are aimed at whoever needs the most help, so ask this
   first**; **(b)** frozen sentence 2's "rate the belief again" and B56 §9c's purpose statement, both frozen, both describing an app that is
   gone; **(c)** migrated results — no tag (built) or a mapping; **(d)** B58 icon (sun made white 2026-09-17); **(h)** B56 §9a, next-step sentences in *How it works* or nowhere.
1. **The paid CBT reviewer:** **the French harm words in `guards.js`, unreviewed (B16 §10a)**; `Yeah!`-on-a-worry (B56 §9b); "I am" has no
   road to a reframe (B56 §10 gap c); the harm list only knows harm to yourself (gap f); *How it works*.
2. **A public-repo check:** `research/08-participant-voice-recovery.md` quotes public Reddit recovery posts with URLs. Founder's call.

## 4. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, public, MIT; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (137 pass on `redesign`) |
| **Branches** | **`redesign`** = the new app, pushed, publishes nothing. **`main`** = the OLD app, and every push touching `web/**` publishes it |
| **Walk it** | `node tools/walk.js start`, then `open` · `dump` · `tap` · `type` · `shot <file>` · `eval <js>` · `stop`. 390×844 @3x. **Always `stop`** |
| **Live today** | **`https://betr.digitalbricks.io`** = `redesign` (box `ssh nexus`, `deploy/betr.caddy`, `/srv/betr/site`, tally `/var/log/betr`). `https://betr.trybeup.com` = OLD app, droplet `ssh le-jibe`, until switch-off |
| **Box rules** | **Read freely; every write confirmed.** Four other sites on `nexus` — curl all after any Caddy reload |
| **The canvas** · fixture | `claude.ai/artifact/RcR4SB27nUiW5P6PPJJBDc` — eight screens + icons. `tests/fixtures/v5-phone.json` is the old app's own output (`make-v5-phone.js`, `git worktree add … 141de4f`) |

## 5. Gotchas, live

- **A `\u0027` TYPED INTO AN EDIT OR WRITE TOOL CALL ARRIVES AS A PLAIN APOSTROPHE.** Tool parameters are JSON. Write escapes from a script. (learnings, 2026-09-15)
- **CHROME KEEPS THE OLD CSS/JS BETWEEN `open`s** — after editing under `web/`, `stop` and `start` the walker. **zsh does not split `$w`:**
  use `w() { node tools/walk.js "$@"; }`.
- **The i18n sweep reads every `'…'` in app.js.** A class list on its own (`'paper small'`) reads as English — keep attributes inside a tag
  literal or use `markup()`. **A `'` inside a regex starts a fake string — write `\u0027`** (hit again 2026-09-16, in `ifLead`).
- **The blanks are `contenteditable` and read as `textContent`.** The harness's `type()` sets both `value` and `textContent`.
- **A CONFIG ON DISK IS NOT A CONFIG RUNNING.** `nexus`: `caddy validate` then `systemctl reload caddy`. **`caddy validate` as root
  CREATES new log files owned by root** and the reload then fails — `chown caddy` them first (learnings 2026-09-16). **An asset asked for by URL must be
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
- **No ImageMagick, no PIL.** SVG → PNG is `rsvg-convert -w 512 -h 512 file.svg -o out.png` (exact size); crop is `sips -c`.
