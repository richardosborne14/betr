# B3: Hosting and deploy — the page load is the only thing any server ever sees

**Status:** Not started
**Confidence:** —
**Date opened:** 2026-09-01
**Depends on:** B2 (**done 2026-09-02** — `web/` is ready to deploy). Production domain waits on B0 Q1.

**Four things B2 changed about this plan. Read them before writing the workflow:**

1. **The branch is `main`, not `first-100`.** That is this repo, not TrybeUP's.
2. **The hash is not `web/hash.txt` and is not the SHA-256 of `index.html` alone.** It is
   `node tools/build-hash.js --write`, which hashes every file the site serves in a fixed
   order and stamps the result into `<meta name="betr-build">` in `index.html`. Run it after
   the checkout and before the rsync. `web/tests/` is deliberately not part of the hash.
3. **Do not deploy `web/tests/`.** Exclude it in the rsync. It is not in the hash, so serving
   it would make the published number unverifiable by anyone who hashed the served folder.
4. **The CSP header must not carry `'unsafe-inline'` for scripts.** B2 has no inline script at
   all, so the header below is stricter than the one drafted here. The one it should serve,
   matching the meta tag in `index.html` minus the `file:` entries, which exist only so the
   page works when opened off disk:

   `default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; manifest-src 'self'; font-src 'none'; connect-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`

## What to build

A deploy for `web/` that is separate from the TrybeUP web app in every way a reader of
the source or a viewer of the network tab could check.

1. **A job in `.github/workflows/deploy-dev.yml`** that rsyncs `web/` to
   `/var/www/betr-dev/` on the dev droplet, on push to `first-100`. No npm step; there is
   nothing to build. Before the rsync, write `web/hash.txt` with the SHA-256 of
   `index.html` so the page can print it (B2 item 12).
2. **An nginx server block** for `betr.dev.trybeup.com` on the dev droplet with:
   - `add_header Content-Security-Policy "default-src 'self'; connect-src 'none'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; frame-ancestors 'none'" always;`
   - `access_log off;` and `error_log` at `crit` only
   - the usual `X-Content-Type-Options`, `Referrer-Policy: no-referrer`
   - a certificate via the existing `renew-cert.yml` pattern
3. **The sentence on the "what this is" screen** matching what the server does:
   *Loading this page is the only thing any server ever sees, and we keep no record of it.*
   If logs cannot be turned off on the host, the sentence changes, not the other way round.
4. **Production** waits on Q1. When a domain exists, the same block on the production droplet,
   deployed by a `deploy-prod.yml` in this repo. Not a subdomain of `trybeup.com` if avoidable:
   a cookie scoped to the parent domain would be a shared cookie.

## Safety rules

This touches the TrybeUP dev droplet's nginx (SSH alias `le-jibe`, see `CLAUDE.md`). Every write to `/opt/trybeup-dev/` or
`/etc/nginx/` is confirmed with the founder before it runs, read-only checks are not. The
TrybeUP dev site must be unaffected: check `dev.trybeup.com` after every nginx reload.

## Test plan

- `curl -I https://betr.dev.trybeup.com` shows the CSP header and no `Set-Cookie`.
- The browser network tab on a full loop shows one document request and nothing else.
- The hash on the page equals `sha256sum apps/betr/index.html` at the deployed commit.
- `dev.trybeup.com` still serves after the reload.

## Done when

All four checks pass and the task log records the exact nginx block.
