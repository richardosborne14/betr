# B13: Pairing a computer — the QR, the three words, and taking it back

**Status:** On the shelf — scoped 2026-09-03, not scheduled.
**Gated:** everything in B12's gate applies here first.
**Confidence:** —
**Date opened:** 2026-09-03
**Depends on:** B12.
**Where:** `web/` (the desktop side), the wrap (the camera side), `server/` (a relay that reads
nothing).
**Background:** `docs/research/11-sync-passkeys-and-the-promise.md` §4, §7 Phases 4–5. This is the
thing the founder actually pictured on 2026-09-03.

## Why this shape and not the obvious one

The obvious design is "sign in with your passkey on the PC too". It is worse for two reasons:
passkey PRF over the cross-device QR flow has been the patchy case for years, and it asks someone
to enrol a passkey on a machine that may not be theirs.

So: **the phone is the only holder of the key, and the PC is a window the phone opens.** That is
WhatsApp Web's model, it needs nothing clever on the desktop, and it puts a physical act — pointing
your phone at a screen you are standing in front of — at the moment of trust.

## What to build

### The pairing

1. The PC opens BETR and shows a **QR code**: a one-time public key the PC has just invented,
   plus a pairing code. Nothing about the person is in it.
2. The **phone's camera** reads it and asks, in these words or better: *Let this computer see your
   worries?*
3. The phone seals the vault key so that **only that PC** can open it, and posts the sealed thing
   to the relay. The PC collects it and opens it. **Nothing readable passes through us at any
   point**, and the relay holds it for minutes, not days.
4. **Both screens then show the same three words**, derived from the handshake. If they do not
   match, something is in the middle — and the copy says stop, in those terms. This is WhatsApp's
   security-code idea. It costs almost nothing and it is the difference between a promise and a
   thing a person can check for themselves (§5).
5. The PC then asks: **remember this computer, or forget it when I close the tab?** **Default
   forget.** Where the machine can do it (Windows Hello, Dashlane, 1Password), "remember" is itself
   locked behind that; where it cannot, "remember" is offered with one plain sentence about what it
   means and is not preselected.

### Taking it back

6. The phone lists the paired computers, with when each was added, and can remove one.
7. **Removing must actually mean something, so it rotates the key.** The phone makes a new vault
   key, re-seals every box (seconds — the data is a few kB) and hands the new key to the devices
   that are left. The removed computer's copy stops opening anything.
   **Without this step, "remove" is a lie**, because a symmetric key that has already been handed
   over cannot be un-handed. Rotation is cheap here only because the data is tiny; it is not
   optional and it is not a v2 item.

## Rules this must not break

- **Rule 10.** The desktop is not permission to build a bigger BETR. It shows the same screens,
  the same one big button, the same three doors. No dashboard, no side panel, no "since you're on
  a computer" anything. If the desktop grows a feature the phone does not have, this task has gone
  wrong.
- Rules 5 and 6: the paired-devices list is a list, not a status. No last-seen ticks, no activity,
  no counts.
- A paired computer can do nothing the phone cannot. It cannot invite another device; only the
  phone pairs.
- **Nothing readable ever passes through the relay.** If a design step needs the server to
  understand any part of the payload, the design step is wrong.

## Tests to add

- Full pairing against a stub relay: the PC ends up with the vault key, the relay never held
  anything openable.
- The three words match on both sides, and **differ** if the QR's public key is substituted — a
  test that actually performs the substitution, not one that asserts the happy path.
- The pairing code expires, and is single-use.
- Forget-on-close leaves nothing in the desktop's storage.
- Un-pair → rotate → the removed device's stored key opens nothing, and the remaining devices
  still open everything.
- Rotation with a device offline: it recovers on next sync rather than losing data.

## Open, and for the founder

- **Whether the desktop is a web page at all.** §5's asterisk is the whole problem: on the web
  *we* serve the code that does the decrypting, so "we couldn't look even if we wanted to" is
  weaker there than in a store app. B14 is where that gets addressed honestly. If the answer is
  that the web is not good enough, this task becomes a desktop app and its cost roughly doubles.
- What the copy calls it. "Sync" is a computing word. The founder and Misha own the wording, as
  with everything a person reads.

## Done when

- A phone pairs a real Windows PC, the worries appear, the three words match.
- Un-pairing a computer demonstrably stops it reading anything new **and** anything old.
- Confidence score recorded here.
