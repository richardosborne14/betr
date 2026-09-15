# Start here

**Last refreshed:** 2026-09-15, 9th session — **the founder set four new directions in one message, and this session answered them with a
mockup and recommendations. Nothing in `web/` changed. 296 tests pass.** Rewritten, never appended to. Cap: 120 lines.

## 1. Where we are

**The founder's four directions, 2026-09-15, in their own words as near as matters.** They are DIRECTIONS, not yet decisions — each has a
recommendation below and waits on the founder's yes. Everything in the earlier task files (B45–B55) is superseded where it conflicts.

1. **Hopeful tests.** Using it for days, the founder wrote *"If I go outside, I'll feel better and stop worrying about work"* — the reverse of a
   fear — and their daughter's first instinct was *"If I tell my BFF how I feel, it'll make things better."* They want both directions welcome,
   the second question reworded or gone, and the after-question to be "how much were you right?" rather than "how sure now?".
   **Finding:** the research ALREADY asks for this. `research/10` §2.3 "Two beliefs, not one" and §11.6 "show the new belief's evidence growing"
   are Padesky's positive data log; the founder's use is the half of the record sheet the app never built. Behavioural activation (predict mood,
   do the thing, record it) is the evidenced sibling, so a feeling-prediction like "I'll feel better" is fine when the person reports it.
2. **Much simpler screens.** Test feedback: too much on every screen — two blanks, chips, several fields, nothing explains what it expects.
   *"Shelve some features and go back to something VERY VERY simple."* `B45` line 33 already said "confusing as fuck; three systems intertwined."
3. **Move off TrybeUP.** Host at **`betr.digitalbricks.io`** on the Hetzner box, drop every TrybeUP reference, make it plainly free and open
   source, no recommendations but the CBT ones.
4. **French, asap**, auto-detected from the phone.

**The mockup:** *BETR, One Sentence* — `https://claude.ai/artifact/Qzjr2ZDLTCTKhPjmDb8jnx` (design canvas; working files were in this session's
scratchpad — re-read the artifact, not the files). Nine screens: front (one sentence, two blanks, two worked examples one each way), written,
locked, what happened, **one tap — *Was that what you expected?* Pretty much / Partly / Not really**, result for a hope and for a fear on the
SAME screen, Your tests, Borrow one. Sticky notes carry the reasoning.

**Facts found this session:**
- **Translation is already built (B15).** `lib/i18n.js` picks from `navigator.languages`, falls back to English per key, uses `Intl.PluralRules`.
  Not i18next, on purpose (dependency rule; CSP blocks a CDN). **French = `content/strings-fr.js`** (248 English strings today, far fewer after
  the cull) + a translated stock list + French-speaking-country helplines read off provider sites by a person + the frozen sentences translated
  and frozen once. **Machine translation is a first draft only; a human signs off** (rule 2). B16 has the full per-language checklist.
- **The Hetzner box:** SSH alias **`nexus`** (not nexus-1; hostname is nexus-1), root@49.12.102.195, key `~/.ssh/nexus_hetzner`. Caddy, no
  Docker. **33 GB disk free, ~3 GB RAM free, load ~0.** Serves `digitalbricks.io` (`/srv/digitalbricks/site`), `nodegx.io`, `todo.digitalbricks.io`,
  `community.nodegx.io`, `nexus.digitalbricks.io` from `/etc/caddy/conf.d/*.caddy`. **`betr.digitalbricks.io` does not resolve yet.**
  `digitalbricks.io` already points at this box. Caddy writes no access log unless told to — good for *"nothing about you is written down."*
- **TrybeUP footprint to remove:** `places.js` (4), `app.js` (9), `strings-en.js` (16), `menu.test.js` (21 — most of the file is rule 9),
  `loop.test.js` (1), `i18n.test.js` (1), `deploy.yml` (10), `web/trybeup-logo.png`, CLAUDE.md rule 9 and the droplet section, scope §1's
  "commercially" paragraph, B6/B7 (dead), `research/10` §11.11 (the bridge as the human-encouragement path — goes, and BETR is honestly unguided).

## 2. The next action

**Nothing is built until the founder answers §3 item 0.** Then, in this order:

1. **The cull (direction 2), one task file `B56`.** Remove from the loop: doors, sizes, the leave-out box, the second question (`plan.expectLabel`),
   the chip row, the skeleton holes, *Why it's written like this* inside the loop. Keep: one sentence with two blanks, harm guard on both boxes,
   the "I am" reframe, *Borrow one* (the twenty stock sentences flat, as full sentences), Help, crisis block, export, delete, the bottom row.
   Replace `sure`/`rate` with the three-word outcome question and the tally; decide whether the ladder survives underneath (§3 item 0c).
   `loop.test.js`, `content.test.js`, `rate.test.js` all change. The `drop` survives INSIDE each stock sentence's if-half, not as a field.
2. **The move (direction 3), `B57`.** DNS A record `betr.digitalbricks.io` → 49.12.102.195 (founder's registrar); `/etc/caddy/conf.d/betr.caddy`
   with `root * /srv/betr/site`, `file_server`, the same security headers, `Cache-Control no-cache` on `index.html`; a `betr-deploy` user
   owning `/srv/betr` and nothing else; `deploy.yml` secrets and path swapped; `views.yml` retired or rewritten for Caddy's log. **Every write on
   `nexus` is confirmed with the founder first, same as the droplet.** Keep `betr.trybeup.com` up until the new address is checked, then a
   redirect there is TrybeUP's repo. Strip TrybeUP (list above); *Who made this* becomes the open-source line and the repo link — **which means
   the repo goes public and needs a licence** (recommend MIT; founder's call).
3. **French (direction 4), `B16` as written.** Draft `strings-fr.js` after the cull, never before; find the French reader; read the French,
   Belgian, Swiss and Québec lines off the provider sites on the day.
4. **Hopeful twins for the stock list** (direction 1's content half) — twenty sentences for the CBT reviewer, not shipped before review.

## 3. Waiting on people, not on code

0. **The founder, on the mockup:** **(a)** is the nine-screen loop the shape — yes/no/what changes; **(b)** *Was that what you expected?* with
   *Pretty much / Partly / Not really* as the one question after a test; **(c)** the number: the tally alone (recommended) or the tally with the
   1–10 ladder kept under it; **(d)** two worked examples on the front, one a hope; **(e)** the bottom row stays three or goes to two; **(f)** the
   licence and making the repo public; **(g)** the DNS record; **(h)** who reads the French.
1. **Misha** — still co-decider on audience and tone; whether that survives the move off TrybeUP is the founder's to say.
2. **The paid CBT reviewer** — now also: hopeful predictions through the same loop, and the twenty twins.
3. **Everything in the 8th session's list** (the robot count, the droplet's port-80 log, B52's firewall) is moot if the move happens; do not
   spend on the droplet until §3 item 0 is answered.

## 4. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, private, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (296 pass); `node tools/copy-sheet.js` rewrites `docs/COPY.md` |
| **Walk it** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · `eval <js>` · `stop`. 390×844 @3x. **Always `stop`** |
| **Live today** | `https://betr.trybeup.com`, TrybeUP droplet (`ssh le-jibe`, container `betr-web`). Every push to `main` touching `web/**` publishes it |
| **The new box** | **`ssh nexus`**. Caddy config in `/etc/caddy/conf.d/`, sites under `/srv/<name>/site`. **Read freely; every write confirmed** |
| **The canvas** | `https://claude.ai/artifact/Qzjr2ZDLTCTKhPjmDb8jnx` — read with the Artifact tool and extract the artboards; do not redraw from memory |
| **The sheet** | `docs/suggestions-review.csv`, 558 rows with the header, **CRLF and a BOM — keep both** |

## 5. Gotchas, live

- **A CONFIG ON DISK IS NOT A CONFIG RUNNING.** On the droplet ask the container; on `nexus` ask Caddy: `caddy validate` then `systemctl reload caddy`.
- **AN ASSET ASKED FOR BY URL MUST BE COMMITTED.** `img-src 'self' data:`, `font-src 'none'`; a remote file never appears, it never fails.
- **`git checkout <file>` RESTORES HEAD.** `cp` to the scratchpad and back.
- **A SCREEN IS WHERE ITS CALLERS SEND YOU.** Grep the callers and walk to it first.
- **AN ABSENCE ASSERTION DIES SILENTLY WHEN THE STRING DOES.** Name something that still exists; mutate the code and watch the test fail.
- **`ch` IS THE WIDTH OF A "0"; anything sized from content needs a `max-width`; check every walk at 200%.**
- **THERE IS ONE CONTENT FILE FOR A WORRY.** `worries.js`. Culled ids are retired, never reused (`phone` `reply` `check` `mist` `cut`).
- **A cull reaches outside the content file.** Grep every string id before deleting it; `build.ifPlaceholder` was load-bearing twice.
- **Every word a person reads is in `web/content/`.** Use `’` and `“ ”`. `zones.js` and `COPY.md` are generated; no number from memory.
- **A crisis number is read off the provider's site on the day, or the country shows none.** This does not loosen for French.
