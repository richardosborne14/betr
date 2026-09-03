# B14: The proof, and the paperwork — the part that decides whether anyone believes it

**Status:** On the shelf — scoped 2026-09-03, not scheduled.
**Gated:** B12's gate applies. This task also **blocks the release** of B12 and B13 — those two
cannot ship without it, in the way B0's Q1 blocks release rather than build.
**Confidence:** —
**Date opened:** 2026-09-03
**Depends on:** B12, B13.
**Where:** `web/` (one screen), the store listings, and documents that are not code.
**Background:** `docs/research/11-sync-passkeys-and-the-promise.md` §5, §7 Phase 6.

## Why this exists

BETR's current privacy claim is trusted because it is **checkable**: turn your wifi off, and it
still works. That proof is worth more than every paragraph we could write, and it is the reason
the promise lands with an audience the research says is braced for betrayal.

Sync replaces a checkable claim with an unverifiable one — "we can't read it" — unless we build
its equivalent. This task is that equivalent, plus the legal changes that come with running a
server, and it is the difference between a feature people trust and a feature that quietly costs
us the thing the product is actually built on.

## What to build

### 1. The *show me* screen

Their worry, as they wrote it, and beside it **the exact bytes we hold for it** — a screenful of
nonsense, fetched from our own server and shown raw. That is the sync equivalent of turning the
wifi off. It should be findable, not buried, and it should not be explained more than it needs to
be: the whole point is that it explains itself.

### 2. The metadata page, in plain words

What we can see with sync switched on: that an account exists, roughly how many boxes it has, when
they last changed, and the IP address at the moment of syncing. What we cannot see: any worry, any
sentence, any rung, any name, any email. Written as sentences a person reads, not a table in a
policy. **We say this first, or somebody else says it about us later.**

### 3. Published code, and a published hash

Publish the client. On the web, publish the hash of the file that does the encrypting, so a changed
version is at least noticeable.

**And say plainly what that does and does not fix.** On a website, we serve the code that does the
encrypting; we could in principle serve different code tomorrow, to one person. That is the known,
unsolved weakness of end-to-end encryption in a browser, and it is exactly why WhatsApp ships an
app from a store instead of a web page. A published hash helps a little. It does not close the gap.

**What does close it: the store binary.** B5's Capacitor shell ships the JavaScript *inside* the
app, and B5 already forbids Capgo — the live-update service that would let us swap that JavaScript
after review. **That rule stops being a preference the moment sync exists and becomes the thing
the whole claim rests on.** It must be written into B5 as such, and never quietly relaxed for
convenience.

So the order is not negotiable: **the app first, the web second, never the web alone.**

### 4. The paperwork

- A privacy policy, which BETR has not needed until now.
- A data-controller position, and a named person holding it.
- Breach-notification duty. **Encrypted personal data is still personal data** — encryption is a
  safeguard, not an exemption, and "we couldn't read it either" is not a defence to failing to
  tell people.
- The App Store label moves off *Data Not Collected* to declaring User Content, not linked to
  identity, not used for tracking — **unless** the only sync that ships is B11's, which keeps it.
  B5 exists because that label is "the trust claim made by someone other than us". Losing it is a
  real cost and it should be counted, not discovered.
- Google Play's Data safety declaration updated to match.
- CLAUDE.md rule 1 amended, and `00-scope.md` §4.5 with it — both in the open, by the founder.

## Rules this must not break

- **Rule 7: the wording is fixed.** The eight sentences and the crisis lines are untouched by any
  of this. The purpose statement stays identical in the app, the listing and every post.
- The banned phrases stay banned, in the new copy as everywhere else.
- **No claim goes out that we cannot defend on the day.** Specifically, and from the research:
  never "encrypted harder than a blockchain" (blockchains are public ledgers, not encrypted),
  never "quantum-proof" (the content encryption would be; the key exchange around it would not),
  never "military-grade". The honest comparison is WhatsApp and Signal — which is the better
  comparison anyway, because everybody already has it.
- Rule 9 still holds: none of this becomes a reason to talk about TrybeUP.

## Tests to add

- A sweep test over all new copy for the banned phrases, and for the three overclaims above by
  name, so that adding one is a deliberate act that shows in a diff.
- The *show me* screen displays bytes actually fetched from the server, not a local re-encryption
  standing in for them. A test that would fail if someone "simplified" it into a fake.
- The published hash matches the served file, checked in CI if there is one and on the release
  checklist if there is not.

## Open, and for the founder and Misha

- **Whether the web version of sync ships at all**, given §5's asterisk. Shipping app-only is a
  defensible and more honest answer, and it is cheaper.
- Who is the data controller, by name.
- Whether the label change is acceptable at all. It is legitimate to decide it is not — and if so,
  B11 is the whole answer to Q6 and B12–B14 never happen. **That is a good outcome, not a
  failure.**

## Done when

- A person can see their own sealed box next to their own worry.
- The metadata page exists and is honest.
- The policy, the controller and the labels are done and signed off.
- Nothing in the app or the listings makes a claim from the "never" list above.
