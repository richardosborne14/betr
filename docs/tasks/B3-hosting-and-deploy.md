# B3: Hosting and deploy — the page load is the only thing any server ever sees

**Status:** Not started
**Confidence:** —
**Date opened:** 2026-09-01
**Depends on:** B2 (a folder to deploy). Production domain waits on B0 Q1.

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
