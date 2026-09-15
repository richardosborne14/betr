# Start here

**Last refreshed:** 2026-09-15, 9th session, end — **the founder locked in the redesign. Three task files written: B56 (the redesign), B57
(the move to `betr.digitalbricks.io`), B58 (the icon). Nothing in `web/` changed. 296 tests pass. The repo is PUBLIC and MIT.** Rewritten, never
appended to. Cap: 120 lines.

## 1. Where we are

**Read `CLAUDE.md`'s new first section, then [`B56`](tasks/B56-the-redesign.md) in full.** It holds every decision in the founder's words, the
eight screens, the type system, what survives from the old code, the record and its migration, a first draft of every string, the tests, and
four open questions. The design is the canvas *BETR, Bet on a Hope*, `https://claude.ai/artifact/RcR4SB27nUiW5P6PPJJBDc`, version 4 — read
it with the Artifact tool and extract the artboards; do not draw from memory.

**In one breath:** the word is **prediction**. The front is *What do you think will happen?* over *If I ___, then ___.* and `Lock it in`. Then
`LOCKED IN · Go and find out.` → `Done it` → **`Did it go how you expected?`** with `Yeah!` (marker yellow, a spark) / `Sort of` / `Not really`
→ `What happened?` → `Keep it` → the results list: the prediction, then every result in the person's own words with its tag and a day label.
`Same again tomorrow`, and a quiet `Done with this one` for one-shots. **No tally, no ladder, no number anywhere, no stock list, no doors, no
sizes, no bottom bar.** Two voices, two fonts: the person's words in a serif on paper, the app's in the sans on terracotta.

**Also today:** the repo is public under MIT (`LICENSE`); the founder reads the French (B16 updated); Misha is no longer a co-decider; the
founder has the box's address for the DNS record; server addresses are out of the docs; `CLAUDE.md` and `docs/00-scope.md` carry a note at the
top saying B56/B57 win over the old rules until they ship. [`B57`](tasks/B57-the-move-to-digitalbricks.md) has the Caddy file, the deploy
user, the TrybeUP strip list and *Who made this* rewritten. [`B58`](tasks/B58-the-icon.md) has four icon candidates on the canvas.

## 2. The next action

1. **Build B56.** On a branch **`redesign`** (a push to `main` touching `web/**` still publishes the OLD app to `betr.trybeup.com`; a branch
   publishes nothing). Start with `strings-en.js` from B56 §6 and the store's v5 shape and migration (§5), then the eight screens in order,
   then the tests (§7), then J1–J3 on a phone with `tools/walk.js`. Merge to `main` in one go. **B56 §9's four questions do not block the
   build** — 9a and 9b are wording in *How it works* and a fourth pill nobody has asked for yet; 9c is the listing; 9d is the prototype folder.
2. **B57 step 1 is the founder's** (the DNS record). Steps 2–3 on `nexus` wait on it and on their yes. Steps 6–8 (strip TrybeUP, *Who made
   this*, `README.md`) can be done on the `redesign` branch as part of the rebuild, since the strings are being rewritten anyway.
3. **B58:** the founder picks A/B/C/D on the canvas; then `web/icon.svg`, the PNGs via `qlmanage`, the manifest colours.
4. **French (B16)** after the strings settle.

## 3. Waiting on people, not on code

0. **The founder:** **(a)** B58 — which icon; **(b)** B57 §4a — the name on *Who made this* (Digital Bricks, their own, or none); **(c)** B57
   §4c — no count of opens at all (recommended); **(d)** the DNS record; **(e)** B56 §9c — the purpose statement's one rewrite, frozen once;
   **(f)** B56 §9a — the next-step sentences in *How it works* or nowhere.
1. **The paid CBT reviewer:** hopes and worries through the same three-tag loop; *How it works*; the `Yeah!`-on-a-worry wrinkle (B56 §3 screen 4).
2. **A public-repo check the founder should make:** `docs/research/08-participant-voice-recovery.md` quotes public Reddit recovery-forum posts
   with URLs. Founder's call whether it stays; deleting later does not remove it from history.

## 4. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, **public, MIT**, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (296 pass) |
| **Walk it** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · `eval <js>` · `stop`. 390×844 @3x. **Always `stop`** |
| **Live today** | `https://betr.trybeup.com` — the OLD app, TrybeUP droplet (`ssh le-jibe`, container `betr-web`). Every push to `main` touching `web/**` publishes it |
| **The new box** | **`ssh nexus`**. Caddy config in `/etc/caddy/conf.d/`, sites under `/srv/<name>/site`. **Read freely; every write confirmed** |
| **The canvas** | `claude.ai/artifact/RcR4SB27nUiW5P6PPJJBDc` v4 — eight screens + the icon board. The rejected first simplification: `…/Qzjr2ZDLTCTKhPjmDb8jnx` |

## 5. Gotchas, live

- **A CONFIG ON DISK IS NOT A CONFIG RUNNING.** Droplet: ask the container. `nexus`: `caddy validate` then `systemctl reload caddy`.
- **AN ASSET ASKED FOR BY URL MUST BE COMMITTED.** `img-src 'self' data:`, `font-src 'none'`; a remote file never appears, it never fails.
- **`git checkout <file>` RESTORES HEAD.** `cp` to the scratchpad and back.
- **A SCREEN IS WHERE ITS CALLERS SEND YOU.** Grep the callers and walk to it first.
- **AN ABSENCE ASSERTION DIES SILENTLY WHEN THE STRING DOES.** Name something that still exists; mutate the code and watch the test fail.
- **`ch` IS THE WIDTH OF A "0"; anything sized from content needs a `max-width`; check every walk at 200%.**
- **Every word a person reads is in `web/content/`.** Use `’` and `“ ”`. Generated files: `zones.js`, `COPY.md`. No number from memory.
- **A crisis number is read off the provider's site on the day, or the country shows none.** This does not loosen for French.
- **The auto-mode classifier refuses `sed` on CLAUDE.md.** Edit it with the Edit tool, in the open, and say why in the commit.
- **The repo is public.** No address, key, or person's name goes into a doc from now on; `~/.ssh/config` holds the servers.
- **No ImageMagick, no PIL.** SVG → PNG is `qlmanage -t -s 512 -o <dir> file.svg`, or a 512×512 page and `walk.js shot`.
