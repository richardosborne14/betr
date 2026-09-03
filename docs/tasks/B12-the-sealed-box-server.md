# B12: The sealed-box server — the first thing BETR has ever sent anywhere

**Status:** On the shelf — scoped 2026-09-03, not scheduled.
**⚠ Gated.** This is the first task in the whole project that breaks a rule that is currently
absolute. **Nothing in this file may be built until the founder has amended CLAUDE.md rule 1 in
writing, in the repo, by their own decision.** A session that starts this without that amendment
is doing the thing the rules exist to prevent.
**Confidence:** —
**Date opened:** 2026-09-03
**Depends on:** B9, B10. B11 should ship and be lived with first — it may turn out to be enough.
**Where:** a new, separate repo or `server/`. Not in `web/`. Not on the TrybeUP droplet in
production (dev only, and only under the CLAUDE.md droplet rule).
**Background:** `docs/research/11-sync-passkeys-and-the-promise.md` §3C, §5, §7 Phase 3.

## Why this exists

B11 covers an iPhone and a Mac. It does not cover the founder's actual question — *my phone and
my Windows PC* — because those two share no cloud. That needs somewhere neutral for the bytes to
sit, and the only honest version is somewhere that holds boxes it cannot open.

## The gate, in full

Rule 1 today: *"Nothing leaves the phone. … The sentence 'nothing is sent to us or anyone else'
must be literally true."* This task makes that false as written. The amendment it needs is
something like:

> Nothing leaves your phone unless you switch on sync. If you do, what leaves is sealed with a
> key only you have, and we cannot open it.

That is a smaller promise than the one BETR ships today, and it is smaller for everyone — including
the people who never switch it on, because the sentence on the front screen changes for them too.
**That trade is the founder's to make, with Misha, and it should be made in front of the research
(§5), not in a task file.** Until then this task does not exist.

## What to build

1. **An account is a random number.** No email, no username, no name, nothing to type. It is
   created by the passkey from B10 and signed in to by Face ID. There is nothing to recover
   because there is nothing to remember.
2. **One sealed box per worry**, three to twelve per person, a few kB each, **padded to a fixed
   size** so the size of a box says nothing about what is in it.
3. **A deliberately stupid server.** Four things: what has changed since X; here is a new box;
   remove a box; delete everything. Ciphertext in, ciphertext out. It never needs to be clever and
   it must never be allowed to become clever.
4. **Hard caps and rate limits** per account, so it cannot be used as free storage by anyone.
5. **Delete everything wipes the server too**, and the app shows the person the server confirming
   it is gone rather than asserting it.
6. **The metadata note, written before the code.** With this built we would be able to see: that
   an account exists; roughly how many boxes it has; when they last changed; and the IP address at
   the moment of syncing. Not one word of content — no worry, no sentence, no rung. **This goes on
   a screen a person can read, in plain words, not only in a policy.** WhatsApp's position on
   metadata is comparable or worse; ours is defensible only if we say it first.

## Rules this must not break

- **Rules 2–10 are untouched.** No AI, no verdicts, no streaks, no scores, no personalisation.
  The server must never learn anything that could feed any of those, and it must never gain an
  endpoint that returns something the person did not put there.
- **No analytics, no error reporting, no logging of anything but what nginx needs to serve a
  request** — and IPs stripped or retained for hours, not months, with the retention written down.
- The server is not a feature surface. No notifications, no email, no "you haven't synced in a
  while", ever.
- **BETR must work entirely with the server down, and with sync off.** Offline is the normal case;
  syncing is the exception. If the server being unreachable produces anything more alarming than a
  quiet line, it is wrong.

## Tests to add

- Every stored row is opaque: a test that greps the database for every worry label, every belief,
  every stock test sentence, and finds none of them.
- Sync off → zero requests. Airplane mode → the full loop, unchanged.
- Server unreachable → the loop works, and the app says so once, quietly.
- Delete everything → the account and every box are gone, and a second request confirms it.
- Rate limits and the size cap actually refuse.
- Replaying a captured request cannot read or write another account's boxes.

## Open, and for the founder

- **The gate above.** Nothing else here matters until it is answered.
- Who owns the server, forever, including on the day it breaks. This is the recurring cost that
  is easy to sign up for and hard to put down.
- Where it lives. **Not** production TrybeUP. The dev droplet is fine for building; a live one
  needs its own home, its own domain and its own backups.
- Data-controller position, privacy policy, breach-notification duty, and the App Store label
  moving off *Data Not Collected*. **Encrypted personal data is still personal data** — encryption
  is a safeguard, not an exemption. This is B14.

## Done when

- A phone syncs to it, and a second phone with the same passkey sees the same worries.
- The opacity test passes against a database with real-shaped data in it.
- Everything still works with the server switched off entirely.
- Confidence score recorded here.
