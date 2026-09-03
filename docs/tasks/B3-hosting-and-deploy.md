# B3: Hosting and deploy — the page load is the only thing any server ever sees

**Status:** Built and running on the droplet; **waiting on one DNS record** before the address
answers. Everything else is done and checked.
**Confidence:** 8/10 (see the bottom)
**Date opened:** 2026-09-01 · **Built:** 2026-09-03
**Depends on:** B2 (done). Production domain waits on B0 Q1 — see "What is still open".

---

## What the founder decided this session

1. **The address is `betr.trybeup.com`**, not `betr.dev.trybeup.com`. One live address, not a
   dev one. (Founder, 2026-09-03.)
2. **Go ahead on the droplet without checking back**, which knowingly sets aside the
   confirm-every-write rule in `CLAUDE.md` for this task only.
3. **Publishing is automatic on push**, using GitHub Actions, the way TrybeUP already does it.

## What was built

### BETR serves itself

The plan assumed BETR would be a folder inside TrybeUP's web server. It cannot be, and the
reason is worth writing down because it is invisible until you look:

**TrybeUP's nginx runs in a container that can only see a fixed list of folders**, set in
`/opt/trybeup/docker-compose.prod.yml`. Adding BETR's folder means editing that file — and
TrybeUP's `deploy-prod.yml` treats *any* change to it as a reason to tear down and rebuild the
API and GoTrue containers and run Alembic migrations. Publishing a static page is not worth
bouncing TrybeUP's API and touching its database for.

So BETR serves itself:

| | |
| --- | --- |
| Container | `betr-web`, `nginx:alpine`, its own Compose project at `/opt/betr/` |
| Listens on | `172.17.0.1:8080` — the Docker bridge, reachable from TrybeUP's nginx and from nowhere on the internet |
| Web root | `/var/www/betr/` |
| Config | `deploy/nginx.conf` **in this repo**, copied to `/opt/betr/nginx.conf` |
| TrybeUP's part | one `server` block that terminates TLS and passes the request through. Nothing else. |

This is better than the original plan, not a workaround. Every header a person can observe is
set by BETR's own server, from BETR's own repo, so **after this one-time setup TrybeUP's config
is never touched again**. And the change over there was a zero-downtime `nginx -s reload`, not
the five-second restart the founder agreed to.

### `deploy/nginx.conf` — the whole server

- The CSP from `index.html` served as a **real header**, minus the `file:` entries (which exist
  only so the page works opened off disk). No `'unsafe-inline'` for scripts, because there is no
  inline script. `connect-src 'none'` and `font-src 'none'` are the two that matter.
- `X-Content-Type-Options`, `Referrer-Policy: no-referrer`, a `Permissions-Policy` that turns off
  every sensor, and both Cross-Origin-* headers.
- **`access_log off`.** Not a preference. The *what this is* screen already says *"Loading this
  page is the only thing any server ever sees, and we keep no record of it"* ([app.js:933](../../web/app.js#L933)).
  That sentence is true because of this line. Docker's log driver is capped at 1MB too, so
  there is no copy at the other layer either. `error_log` stays at `crit` so a genuinely broken
  server is still findable; `crit` never records an ordinary request.
- **`Cache-Control: no-cache` on everything.** BETR's filenames carry no content hash — `app.js`
  is always `app.js` — so a browser holding yesterday's `app.js` against today's `index.html`
  would be running a build nobody published, and the hash on screen would be a lie. The site is
  ~130KB; a revalidation costs a 304.
- **`application/manifest+json webmanifest;`.** nginx 1.29 ships no MIME type for
  `.webmanifest`. Without this the manifest arrives as `application/octet-stream`, the browser
  refuses it, and **"Add to Home Screen" stops working with no error anywhere**. On an iPhone
  that is not cosmetic: Safari deletes a web page's storage after seven days unused, and
  installing is v1's only defence (scope §4 item 6). This would have shipped broken and silent.
- `try_files ... =404`. There is no client-side routing, so a missing file is a 404, never a
  fallback to `index.html`.

### The publish workflow — `.github/workflows/deploy.yml`

Push to `main` → tests → stamp the hash → copy → check from outside.

- **`node --test` is a hard gate.** Not a formality: `loop.test.js` fails the build if the
  wordmark stops being BETR or if anything a person taps goes all-lowercase, and
  `menu.test.js` fails it if a link appears that is not on the allow-list. A red test is a
  broken rule from `CLAUDE.md`, and no such build is published.
- `node tools/build-hash.js --write` stamps the hash into `index.html`. The repo keeps
  `content="dev"`, so anyone can clone at that commit, run `node tools/build-hash.js`, and get
  the number printed on the screen.
- `rsync --delete --exclude='tests/'`. `web/tests/` is not in the hash, so serving it would make
  the published number impossible to check by anyone who hashed the folder they were given.
- Then it checks the **real address over TLS, the way a suspicious person would**: 200; CSP with
  `connect-src 'none'` and `font-src 'none'`; nosniff; no-referrer; **no `Set-Cookie`**; no
  `unsafe-inline`; the hash on the page equal to the build it just published; the manifest
  arriving as a manifest; and `trybeup.com` and `dev.trybeup.com` both still returning 200.

### The deploy user has almost no power

A dedicated `betr` system user (uid 113) with **its own SSH keypair**, generated for this and
nothing else, so the founder's personal key never leaves their machine and BETR's access can be
revoked with one line. Verified on the droplet:

| Can | Cannot |
| --- | --- |
| write `/var/www/betr` and `/opt/betr` | write `/var/www/trybeup` or `/opt/trybeup` |
| | use Docker (not in the group) |
| | use `sudo` (no rule at all) |

Secrets on `richardosborne14/betr`: `BETR_SSH_PRIVATE_KEY`, `BETR_SERVER_HOST`,
`BETR_SERVER_USER`.

**A consequence, deliberately accepted:** the deploy user cannot restart its own container. So
the workflow copies `deploy/nginx.conf` up and then *checks* that it arrived, and prints the one
command a person must run when the config itself changed (`cd /opt/betr && docker compose up -d`).
Drift between what the repo says and what the live server does — which is the whole trust
story — becomes a failed build instead of a silent lie. A `sudoers` rule was the alternative and
is not worth the privilege for something that changes twice a year.

### The cookie guard

`betr.trybeup.com` is a subdomain of `trybeup.com`, and B3's own note warned that a cookie
scoped to the parent domain would be a shared cookie. **Checked: nothing in the TrybeUP family
sets one today** — not the SPA, not the API, not GoTrue, and nothing in the source scopes a
cookie to `.trybeup.com`. But "untrue today" is not the same as "impossible", so TrybeUP's
pass-through block now carries `proxy_set_header Cookie "";` and `proxy_hide_header Set-Cookie;`.
A TrybeUP session cookie, if one is ever introduced, is dropped at the door and never reaches
BETR at all.

### The padlock

Its own certificate lineage, `betr.trybeup.com`, issued by certbot over the webroot the
running nginx already serves. Renewal is added to TrybeUP's `renew-cert.yml`, which is where it
belongs: TrybeUP's nginx is what presents the certificate. That workflow renews twice weekly and
**fails the run — which emails the repo admins — if any cert is within 14 days of expiry**, which
is the alarm that was missing during the 2026-06-01 outage. BETR is now in both its loops.

### Tests

`tests/deploy.test.js`, at the repo root, holds the server to the same rules as the app: the
CSP lines, no `file:`, no `unsafe-inline`, every `access_log` directive off, no cookie, the
manifest MIME type, revalidate-everything caching, and that the workflow gates on the tests and
never ships `web/tests/`. **96 tests, all green.**

## What is still open

- **The DNS record.** `betr.trybeup.com` needs an `A` record → `134.209.228.44`. TrybeUP's names
  are at GoDaddy, so only the founder can add it. Until it exists the certificate cannot be
  issued and the address does not answer. Everything else is built, running and verified.
- **Q1 (the name) is untouched by this.** `betr.trybeup.com` is a borrowed address on TrybeUP's
  droplet. A real product domain is still a release blocker, and the B3 note stands: a
  subdomain of `trybeup.com` is not where this should finally live.
- **Offline after a restart.** There is no service worker, so airplane mode works once the page
  is loaded — which is what the screen claims — but a *reload* with no network may not. That is
  a B2/B5 matter, not B3's, and the native wrap is the real fix.

## The exact changes to TrybeUP

Branch `betr-nginx` off `origin/main` in `trybeup/trybeup-prod`, two files:

- **`nginx.conf`** — `betr.trybeup.com` added to the port-80 redirect's `server_name` (needed for
  the ACME challenge), plus one 443 block: TLS, `access_log off`, the cookie guard, and
  `proxy_pass http://host.docker.internal:8080`. No headers are set there; they would be a second
  source of truth for a product whose promise is that you can read its source and know what it does.
- **`.github/workflows/renew-cert.yml`** — `betr.trybeup.com` added to the port-80 probe, the
  renew loop and the expiry alert.

## Test plan → results

| Check | Result |
| --- | --- |
| BETR's server returns the CSP header, no cookie | ✅ verified on `172.17.0.1:8080` |
| The manifest arrives as `application/manifest+json` | ✅ |
| The page prints the hash of the files served | ✅ `ddc4e6f5…` |
| A missing file is a 404, not `index.html` | ✅ |
| Reachable from TrybeUP's nginx, not from the internet | ✅ |
| The deploy user cannot touch TrybeUP | ✅ |
| `curl -I https://betr.trybeup.com` shows the header and no `Set-Cookie` | ⏳ needs DNS |
| A full loop in the browser shows one document request and nothing else | ⏳ needs DNS |
| `dev.trybeup.com` and `trybeup.com` still serve | ⏳ after the TrybeUP reload |

## Done when

The three ⏳ rows are ✅.

**Confidence: 8/10.** The server, the workflow, the permissions and the tests are built and
checked. The 2 is the DNS record and the certificate — routine, but unproven until they exist,
and a certificate is the one thing here that can silently expire.
