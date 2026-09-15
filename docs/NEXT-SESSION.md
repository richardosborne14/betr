# Start here

**Last refreshed:** 2026-09-15, 9th session, third round — **the founder called the redesign "much better, nearly right", picked the terracotta
look, and gave nine corrections; the canvas was redrawn to them. Nothing in `web/` changed. 296 tests pass. The repo is PUBLIC and MIT.**
Rewritten, never appended to. Cap: 120 lines.

## 1. Where we are

**The canvas: *BETR, Bet on a Hope* — `https://claude.ai/artifact/RcR4SB27nUiW5P6PPJJBDc`** (version 2). Read it with the Artifact tool and extract
the artboards; do not redraw from memory. Nine screens. **This is the design to build**, pending §3 item 0.

**The founder's decisions this round, each one now on the canvas:**
- **The look is the terracotta "Poster" one.** Orange ground, paper cards, serif for the person's words, sans for the app's. System fonts only.
- **Type system: two voices, two fonts.** The person's words are ALWAYS the serif on a paper card (the prediction; what happened). The app's words
  are ALWAYS the sans on the orange, one bold 24px question per screen. Small caps labels only to name a state. **The prediction is the paper
  card at the top of every loop screen, same size, same place** — the founder's complaint was that it "hid in a small font at the top".
- **The sentence is `If I ___, then ___.`** — no "I hope", no "I'm hoping" ("sounds American"; "simplicity is king"). One form for both directions.
- **The button is `Lock it in`.** "Bet on it" is dead.
- **After the test, the friend asks first:** `So… how did it go?` → **`Yeah!`** (bright, marker-yellow, a spark) / **`Sort of`** (plain paper) /
  **`Not really`** (quieter) → THEN `What happened?` with the chosen tag beside it → `Keep it`. It asks how it went, not whether you were right,
  so it serves a hope and a worry alike and carries no verdict.
- **No "It held" screen. No tally. No "Held 3 of 4"** ("smartarsed"). After `Keep it` you land on the results: the prediction, then every result
  in the person's own words with its tag and a day label. People put the puzzle together themselves.
- **`Same again tomorrow`, then a quiet `Done with this one`** for one-shot predictions — puts it away, does not delete. Alternatives offered:
  "Put this one away", "That's that one done".
- **`New prediction`, not "A new hope"** (Star Wars). The founder floated **"prediction" as the one word for hopes and worries**; the canvas
  uses it in the chrome (*Your predictions*, *New prediction*) and offers two fronts: **`Write down a hope.`** (warm) and **`What do you think
  will happen?`** (takes a worry as easily). Founder's pick.
- The optional "worry underneath" line from version 1 is **gone** — with "prediction" for both, a worry is just another prediction.
- The fixed progression (same again → raise it → without the safety net) is **off the results screen**; it can live in *How it works*.

**Decided earlier today:** tally alone → now no tally at all; **repo public and MIT** (done); **the founder reads the French**; **Misha is no longer
a co-decider**; **the DNS record is the founder's:** `betr.digitalbricks.io` → `49.12.102.195`, `A` record.

**Facts that carry over:** translation is already built (`lib/i18n.js`, auto-detects the phone's language, per-key English fallback); the Hetzner
box is `ssh nexus` (Caddy, `/srv/<name>/site`, `/etc/caddy/conf.d/*.caddy`; every write confirmed first); the TrybeUP footprint is ~60 lines
across `places.js`, `app.js`, `strings-en.js`, `menu.test.js`, `loop.test.js`, `i18n.test.js`, `deploy.yml`, plus `web/trybeup-logo.png`,
CLAUDE.md rule 9 and the droplet section, scope §1's "commercially" paragraph, B6/B7.

## 2. The next action

1. **Wait for the founder's read of version 2** (§3 item 0). On a yes: **open `B56 — the redesign`** and build it as a NEW `web/` beside the old
   one, not screen-by-screen edits. Survives unchanged from the old loop: the guards (harm stop on both blanks, "I am" reframed), `store.js`,
   export and delete, Help with the frozen sentences and the crisis block, `where.js`, `i18n.js`. New: `strings-en.js` rewritten small (the app
   now says about thirty things), a results record of `{tag, text, day}` per prediction, an "away" flag for *Done with this one*. Tests to
   keep: rule 3, the harm stop, no streak, no "you missed", no total across predictions, the banned phrases, BETR all caps, nothing lowercase
   on a button.
2. **`B57 — the move`** is independent and can start now: Caddy file, deploy user, `deploy.yml` secrets and path, strip TrybeUP, *Who made this*
   → the open-source line and the repo link. Keep `betr.trybeup.com` up until the new address is checked.
3. **French** after the redesign's strings settle, never before.

## 3. Waiting on people, not on code

0. **The founder, on version 2:** **(a)** which front — *Write down a hope.* or *What do you think will happen?*; **(b)** "prediction" as the word,
   yes or something else; **(c)** the type system — is the prediction now findable on every screen; **(d)** `Done with this one` or one of the
   other two wordings; **(e)** whether the next-step sentences (raise it, safety net) go in *How it works* or nowhere.
1. **The paid CBT reviewer:** hopes and worries through the same three-tag loop; the wording of *How it works*.
2. **A public-repo check the founder should make:** `docs/research/08-participant-voice-recovery.md` quotes public Reddit recovery-forum posts with
   their URLs. Founder's call whether it stays; deleting later does not remove it from history.

## 4. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, **public, MIT**, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (296 pass) |
| **Walk it** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · `eval <js>` · `stop`. 390×844 @3x. **Always `stop`** |
| **Live today** | `https://betr.trybeup.com`, TrybeUP droplet (`ssh le-jibe`, container `betr-web`). Every push to `main` touching `web/**` publishes it |
| **The new box** | **`ssh nexus`** (49.12.102.195). Caddy config in `/etc/caddy/conf.d/`, sites under `/srv/<name>/site`. **Read freely; every write confirmed** |
| **The canvases** | Redesign v2: `claude.ai/artifact/RcR4SB27nUiW5P6PPJJBDc`. Rejected simplification: `claude.ai/artifact/Qzjr2ZDLTCTKhPjmDb8jnx` |

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
