# B57: The move — `betr.digitalbricks.io`, no TrybeUP, plainly free and open source

**Status:** **Built, not switched over** (2026-09-16). The site serves `redesign` at `https://betr.digitalbricks.io` for the founder's phone check; the old address still serves the old app until they say. See §5. Founder's direction 2026-09-15: *"move BETR from TrybeUP to my Digital Bricks domain, betr.digitalbricks.io, on our
nexus-1 VM in Hetzner. Remove any references to TrybeUP and make it a purely OSS, free to use, no strings type app, no recommendations other
than the CBT stuff."* The repo went public under MIT the same day (`LICENSE`).
**Confidence:** 8/10 for what is built (server, pipeline, strip — all observed working from outside); the switch-over is not done.
**Date opened:** 2026-09-15
**Depends on:** **the DNS record, the founder's** (§2 step 1). Independent of B56; the two can run side by side, and this one can ship the OLD
app to the new address first if it is ready first — the address does not care which app it serves.
**Where:** `nexus` (Caddy), `.github/workflows/`, `web/content/places.js`, `strings-en.js`, `app.js`, the tests, `CLAUDE.md`, `docs/00-scope.md`, `README.md`.

## 1. What was found on 2026-09-15 (read-only)

- **The box:** SSH alias **`nexus`** (hostname `nexus-1`, Hetzner cx23, fsn1; address and key in `~/.ssh/config`). Caddy 2, no Docker. 33 GB disk
  free, ~3 GB RAM free, load ~0. Sites are one file each in `/etc/caddy/conf.d/*.caddy`, imported by `/etc/caddy/Caddyfile`, roots under
  `/srv/<name>/site`. Already there: `digitalbricks.io`, `nodegx.io`, `community.nodegx.io`, `todo.digitalbricks.io`, `nexus.digitalbricks.io`.
- **`digitalbricks.io` already points at this box.** `betr.digitalbricks.io` does not resolve.
- **Caddy writes no access log unless a `log` directive says so.** On this host *"Nothing about you is written down"* becomes literally true
  with no work, and the droplet's port-80 log problem (B52 §12) goes away by moving.
- **The TrybeUP footprint in the repo** (lines mentioning it): `web/content/places.js` 4, `web/app.js` 9, `web/content/strings-en.js` 16,
  `web/tests/menu.test.js` 21, `web/tests/loop.test.js` 1, `web/tests/i18n.test.js` 1, `.github/workflows/deploy.yml` 10; the file
  `web/trybeup-logo.png`; `CLAUDE.md` rule 9 and the droplet section; `docs/00-scope.md` §1 "commercially" and §6; `README.md`; tasks B6, B7.
  `web/manifest.webmanifest` and `web/index.html` carry no domain.

## 2. The steps, in order

**Every write on `nexus` is confirmed with the founder first, every time — the same rule as the droplet.** Read-only commands run freely.

1. **DNS — the founder.** An `A` record, name `betr`, value the box's address (given to them 2026-09-15). Check: `dig +short betr.digitalbricks.io`
   must print that address. Nothing below works until it does, because Caddy cannot get a certificate for a name that does not resolve.
2. **A deploy user, on `nexus`.** `betr-deploy`, no password, one SSH key made for this and stored as the GitHub secret; owns `/srv/betr/site`
   and nothing else — not sudo, not the Caddy config. The same shape as the droplet's deploy user (B3), for the same reason: the thing GitHub
   can log into cannot change how the site is served.
3. **The Caddy file, `/etc/caddy/conf.d/betr.caddy`** — checked into this repo as `deploy/betr.caddy` so the way BETR is served is readable by
   the same person who reads the app:
   ```
   betr.digitalbricks.io {
   	root * /srv/betr/site
   	encode zstd gzip
   	file_server
   	header {
   		X-Content-Type-Options nosniff
   		Referrer-Policy no-referrer
   		Strict-Transport-Security "max-age=31536000"
   		-Server
   	}
   	header /index.html Cache-Control "no-cache"
   	header /manifest.webmanifest Cache-Control "no-cache"
   	header /app.js Cache-Control "no-cache"
   }
   ```
   **No `log` directive, on purpose** — that is the promise. The CSP stays as the `<meta>` tag in `index.html`, so it moves with the site.
   Then `caddy validate --config /etc/caddy/Caddyfile`, `systemctl reload caddy`, and **check every other site on the box still answers**
   (`curl -sI https://digitalbricks.io https://nodegx.io https://todo.digitalbricks.io https://community.nodegx.io`).
4. **The workflow.** `deploy.yml`: the name, the secrets (`BETR_SERVER_HOST`, `BETR_SERVER_USER`, `BETR_SSH_PRIVATE_KEY` — new values, the
   old ones deleted from GitHub the day the droplet is switched off), the path `/srv/betr/site/`, and every step about `/opt/betr/nginx.conf`
   and the container removed. **`views.yml` is deleted** — there is no log to count from, and the count was never the point (Q7).
   `tests/deploy.test.js` holds the setting and Help's sentence together; rewrite it to hold *no log directive* and the new sentence together.
5. **Help's sentence about the count.** `strings-en.js` line ~950 says *we keep two counts*. It becomes: *Loading this page is the only thing any
   server ever sees, and it is not written down — not a count, not an address, nothing.* Frozen once it is agreed; the founder reads it.
6. **Strip TrybeUP.** In this order, each with its test: the `places.js` entry (and its allow-list line in `menu.test.js`); the *Who made this*
   block and the byline `Who made this?` (B54, B55) and their 21 test lines; `web/trybeup-logo.png`; the strings; `app.js`'s nine lines;
   `loop.test.js` and `i18n.test.js`'s one each; `deploy.yml`'s ten. Then `grep -rni trybeup web tools .github` must print nothing. **Then
   `CLAUDE.md`:** rule 9 deleted whole, the droplet section deleted, the pointer at the top of the file updated. `docs/00-scope.md` §1's
   "commercially" paragraph and §6 replaced by one sentence: *BETR is free, open source (MIT) and a product of nobody's funnel.* B6 and B7 marked
   **closed — will not do**. The docs that mention TrybeUP as history stay as history.
7. **Who made this, rewritten.** Under *Who made this* on Help, plain, no logo, no link styled apart:
   *BETR is free and open source. It was made by Digital Bricks. Every line of it is at github.com/richardosborne14/betr, and anyone can read it
   and see that nothing in it sends anything anywhere.* Small print at the foot of Help: *Made by Digital Bricks.* — **the founder to confirm
   the name they want on it**, and the link stays plain `https`, no parameter (the `menu.test.js` allow-list survives for this reason).
8. **`README.md`, rewritten for strangers** — it currently opens on "Pick a fear" and "the gateway product for TrybeUP". New: what it is in the
   purpose statement's words (rule 7), how to run it (open `web/index.html`; `node --test` from the root), the rules that never bend in one
   paragraph, the licence, and that it takes no contributions of new copy without the founder (the wording is the product).
9. **Switch over.** Publish to the new address; walk J1 on a phone at `https://betr.digitalbricks.io` **with wifi off after load**; check the
   response headers (`curl -sI`) show no `Server`, the HSTS line, `no-cache` on `index.html`; check `manifest.webmanifest` installs. Only then:
   a `301` from `betr.trybeup.com` to the new address, **in `trybeup/trybeup-prod`, under its own `CLAUDE.md`**, kept for as long as the founder
   wants the old links to work; and the droplet's container, `/var/www/betr`, `/opt/betr` and the old deploy user removed, each confirmed.
10. **`docs/NEXT-SESSION.md`, `CLAUDE.md`'s "tell the founder how to see it" line, `docs/changing-the-words.md`** — the address in each.

## 3. What does not change

- Nothing leaves the phone (rule 1). Caddy serves files; it is not asked to do anything else, and it logs nothing.
- The tests are still the hard gate before anything is copied.
- The build hash still stamps `index.html`, and `web/tests/` is still excluded from the copy.
- The certificate is Caddy's own (Let's Encrypt, renewed by Caddy); there is no expiry to remember.

## 4. Open, for the founder (answered 2026-09-16, §5)

- **4a.** The name on *Who made this*: *Digital Bricks*, the founder's name, or nothing but "free and open source".
- **4b.** How long `betr.trybeup.com` redirects before it is switched off.
- **4c.** Whether any count of opens is wanted at all. Recommendation: none. It costs a log, and the sentence on Help is simpler without it.

## 5. What was built, 2026-09-16

**The founder's answers (§4):** 4a **Digital Bricks**. 4c **keep a daily count** — against the recommendation, so the tally moved rather
than went, and step 5's sentence did NOT change: Help's "two counts" sentence is still exactly true. 4b **a 301 redirect for six months**
(founder 2026-09-16, changing an earlier "switch it off straight away") — until **2027-03-16**, then off. B58's icon: the founder asked for the canvas link again; not picked yet.
And **the redesign goes to the new address first**, for the phone check, before any merge.

**Built and observed:**
- DNS already resolved (step 1 done by the founder before the session).
- On `nexus`, each write confirmed: user `betr-deploy` (no sudo, key-only, cannot write `/etc/caddy`), `/srv/betr/site`,
  `/var/log/betr` (`caddy:betr-deploy`, 2750), `/etc/caddy/conf.d/betr.caddy` = `deploy/betr.caddy`. Validated, reloaded; the other
  four sites answered 200 before and after.
- **The tally, differently from §2 step 3:** §2's snippet had no `log`. With a count wanted, Caddy writes `people.log` and
  `robots.log`, one `{"ts":"YYYY-MM-DD"}` per open of the page, every other field deleted before disk. Proven locally with the release
  binary first, then read back on the box. Learnings has the three traps.
- The headers match the old nginx (CSP served as a header too, not just the meta tag as §2 assumed), plus HSTS and no `Server`.
- **Secrets are NEW names** — `BETR_DEPLOY_HOST/USER/KEY` — not the old ones overwritten as §2 step 4 said, so `main` keeps publishing
  the old app to the old address until the merge. Delete `BETR_SERVER_*` and `BETR_SSH_PRIVATE_KEY` on switch-off.
- `deploy.yml` and `views.yml` point at the box; `deploy.yml` checks the running Caddy file is the repo's. `nginx.conf` and
  `docker-compose.yml` deleted on `redesign` (still on `main`, where the old pipeline needs them until the merge).
- **Published `redesign` by `gh workflow run deploy.yml --ref redesign`** — every step green, headers and hash checked from outside;
  `views.yml` run the same way read the tally.
- **TrybeUP stripped** from `web/`: places entry, Help block, logo file, strings in both languages, **frozen sentence 9 in both
  languages** ("made by Digital Bricks" — the founder's name choice applied to a frozen sentence; the French is still draft per rule 7).
  New *Who made this*: §7's wording, with the code link, and *Made by Digital Bricks.* at the foot. `menu.test.js` fails the build if the
  name reappears in any file or screen. `grep -rni trybeup web tools .github` prints nothing.
- CLAUDE.md rule 9 rewritten (not deleted, so rule 10's number holds), the droplet section replaced by the box, scope §1/§4.7/§6/Q4/Q5a,
  B6/B7 closed, README rewritten, `changing-the-words.md` and `posting-on-social.md` updated.

**Not done:** J1 on a real phone, wifi off; the merge; step 9's switch-off — the droplet's container, `/var/www/betr`, `/opt/betr`, its
deploy user, the `betr.trybeup.com` block in `trybeup/trybeup-prod`, and the old secrets, each confirmed. The founder chose a 301 for six months, to 2027-03-16:
the redirect goes in first, the droplet's container and files can go the same day, and the nginx block stays until then. Old tally history on the droplet is not copied; ask before deleting `/var/log/betr` there.

## Done when

- [ ] `https://betr.digitalbricks.io` serves the site, headers checked, J1 walked wifi-off on a phone
- [ ] `grep -rni trybeup web tools .github` prints nothing; `node --test` green
- [ ] Help's count sentence and *Who made this* rewritten and read by the founder; `README.md` rewritten
- [ ] `CLAUDE.md` rule 9 and the droplet section gone; scope §1 and §6 rewritten; B6/B7 closed
- [ ] The old address redirects (TrybeUP's repo) or is documented as still serving, by the founder's choice
- [ ] `deploy/betr.caddy` in the repo matches what Caddy is running (`caddy adapt` or read the file back over SSH — a config on disk is not a config running)
- [ ] Confidence ≥ 8/10 recorded here
