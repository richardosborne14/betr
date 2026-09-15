# Start here

**Last refreshed:** 2026-09-15, 9th session, second half — **the founder rejected the first simplification as "missing the mark", asked for a
ground-up redesign with a clear value proposition, and answered the practical questions. A second canvas was drawn. Nothing in `web/` changed.
296 tests pass. The repo is PUBLIC and MIT from today.** Rewritten, never appended to. Cap: 120 lines.

## 1. Where we are

**The founder's brief for the redesign, 2026-09-15, in their words as near as matters:** *"Forget everything so far. A very clear value prop,
tempting someone to get started with no friction or excuse. When I was sitting and thinking I actually got excited about writing a hope down in
BETR. I want that for first-time users — the first thing they see, universally touching, heartwarming, inspires emotion and hope. And enough of
the CBT research in there to help people progress cleverly."* The first canvas (*BETR, One Sentence*, `claude.ai/artifact/Qzjr2ZDLTCTKhPjmDb8jnx`)
was simpler but had no value proposition; keep it only as the record of what was rejected.

**The second canvas: *BETR, Bet on a Hope* — `https://claude.ai/artifact/RcR4SB27nUiW5P6PPJJBDc`.** Eleven artboards. Read it with the Artifact
tool and extract the artboards; do not redraw from memory. What it proposes:

- **Value proposition, one line, on the front:** *Write down a hope. Find out if it's true.* The front IS the writing page: one worked example
  (somebody's hope and what happened, held 3 of 3), then *If I ___, I'm hoping ___.* and **Bet on it**. Nothing to tap before you can write.
- **The hope is the front door; the fear is still in the method.** Screen 2 has an optional one-line *The worry that's been stopping you*,
  skipped in one tap. Both are locked before the test (Padesky's two beliefs, research/10 §2.3). On the first result the worry is struck
  through and what happened is in marker.
- **After the test:** *What happened?* (one box) → *Did it go how you hoped?* **Pretty much / Partly / Not really** → the result.
- **The number is the tally** (founder's call: "tally alone"): *Held 3 of 4*. **The 1–10 ladder is gone.** Under it, **the evidence log**:
  every *what happened* in the person's own words, newest first, days as labels not a calendar. Research §11.6 and Padesky's positive data log.
- **"Progress cleverly" = fixed next steps, printed by count, written by the person:** after 1 hold → *Same bet tomorrow, the second time is
  where it starts to stick*; after 2–3 → *Raise the bet — same hope, one size bigger, you write it*; after 3+ → *Try it without your safety net*
  (the A/B run, research §2.4, d = 2.49). The app never chooses; it prints the next sentence of the method.
- **How it works:** three fresh sentences (research/12 §2: explaining it is the intervention). The frozen eight and the crisis block stay on Help.
- **Look:** *Paper* — warm off-white, one terracotta accent, a system serif (Georgia / Iowan Old Style) for the person's words, sans for the
  chrome. Still system fonts only (rule 1). Two low-fi alternates beside it: *Night* (navy and gold) and *Poster* (a terracotta flood, nothing but
  the sentence). **The founder has not picked a look.**
- **Chrome:** no three-word bar; three grey links at the foot — *Your hopes · How it works · Help*.

**Decided today, by the founder:** tally alone; **repo public and MIT** (done — `LICENSE` added, `gh repo edit --visibility public`); **the
founder reads the French**; **Misha is no longer a co-decider** (CLAUDE.md updated). **The DNS record is theirs to add:** `betr.digitalbricks.io`
→ **`49.12.102.195`**, an `A` record; they asked for the IP and have it.

**Facts that carry over from the first half (see git history of this file for the long form):** translation is already built (`lib/i18n.js`,
auto-detects the phone's language, per-key English fallback; French is a strings file plus a human check plus helplines read off provider sites);
the Hetzner box is `ssh nexus` (Caddy, `/srv/<name>/site`, `/etc/caddy/conf.d/*.caddy`, 33 GB and 3 GB free; every write confirmed first);
the TrybeUP footprint is ~60 lines across `places.js`, `app.js`, `strings-en.js`, `menu.test.js`, `loop.test.js`, `i18n.test.js`, `deploy.yml`,
plus `web/trybeup-logo.png`, CLAUDE.md rule 9 and the droplet section, scope §1's "commercially" paragraph, B6/B7.

## 2. The next action

1. **Wait for the founder's read of the second canvas** (§3 item 0). If it lands: **open task `B56 — the redesign`** and build it as a NEW
   `web/` rather than editing the old one screen by screen; the old loop is the reference for the guards, store, export, Help, crisis block and
   i18n, all of which survive unchanged. Content files: `hopes.js` (the worked examples, each direction), the twenty stock sentences rewritten
   as hopes with their worry underneath (**reviewer before ship**), `strings-en.js` rewritten small. Tests: rule 3 (conditional, "I am" reframed),
   the harm stop on both boxes, the tally never totalled across hopes, no streak, no "you missed", the banned phrases, BETR all caps.
2. **`B57 — the move`** can start before the redesign lands, because it is independent: Caddy file, deploy user, `deploy.yml` secrets and path,
   strip TrybeUP, *Who made this* → the open-source line and the repo link. Keep `betr.trybeup.com` up until the new address is checked.
3. **French** after the redesign's strings settle, never before.

## 3. Waiting on people, not on code

0. **The founder, on *Bet on a Hope*:** **(a)** does the front hit "touching, heartwarming, no excuse" — if not, what is missing; **(b)** which
   look: Paper, Night or Poster; **(c)** the worked example on the front — the dad one, or one of theirs; **(d)** *Bet on it* as the action word,
   given scope Q1 (the word "bet" and people whose habit is gambling) — this design leans on it harder; **(e)** the optional worry line on
   screen 2, keep or cut; **(f)** the fixed progression (same again → raise it → without the safety net) — right, or too much.
1. **The paid CBT reviewer:** hopes through the loop, the twenty hope/worry pairs, the fixed progression's wording, *How it works*.
2. **A public-repo check the founder should make:** `docs/research/08-participant-voice-recovery.md` quotes public Reddit posts from recovery
   forums with their URLs. They were public and are linked, but the repo is public now too; deleting the file later does not remove it from
   history. Founder's call whether it stays.

## 4. Environment facts

| | |
| --- | --- |
| Repo · stack | `github.com/richardosborne14/betr`, **public, MIT**, `main`; plain HTML/CSS/JS in `web/`; **`node --test` from the repo root** (296 pass) |
| **Walk it** | **`node tools/walk.js start`**, then `open` · `dump` · `tap` · `type` · `shot <file>` · `eval <js>` · `stop`. 390×844 @3x. **Always `stop`** |
| **Live today** | `https://betr.trybeup.com`, TrybeUP droplet (`ssh le-jibe`, container `betr-web`). Every push to `main` touching `web/**` publishes it |
| **The new box** | **`ssh nexus`** (49.12.102.195). Caddy config in `/etc/caddy/conf.d/`, sites under `/srv/<name>/site`. **Read freely; every write confirmed** |
| **The canvases** | Redesign: `claude.ai/artifact/RcR4SB27nUiW5P6PPJJBDc`. Rejected simplification: `claude.ai/artifact/Qzjr2ZDLTCTKhPjmDb8jnx` |

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
