# B10: The lock — a passkey, a vault key, and nothing sent anywhere

**Status:** On the shelf — scoped 2026-09-03, not scheduled. Do not start this without the
founder asking for it.
**Confidence:** —
**Date opened:** 2026-09-03
**Depends on:** B9 (the record shape). B5 for the native side. Breaks **no** rule — nothing
leaves the phone in this task, and that is deliberate.
**Where:** a new `web/lib/lock.js`, plus a settings entry in Help.
**Background:** `docs/research/11-sync-passkeys-and-the-promise.md` §2, §7 Phase 2.

## Why this exists

Everything in B11–B13 needs one thing first: a key that only the person can produce, made without
an account, an email or a password. That is what a passkey gives us. This task builds only the
key, and uses it only on the device it was made on. **No server, no sync, nothing transmitted.**

It is worth having on its own: someone who picks up an unlocked phone or borrowed laptop cannot
read the worries. And it lets us find out whether passkeys behave on real devices *before* there
is a server whose existence depends on the answer.

## What to build

1. **A passkey with the PRF extension.** In plain terms: you hand the phone a fixed phrase, it
   asks for Face ID, and it hands back the same 32 secret bytes every time — bytes that exist
   nowhere else and cannot be produced by anyone without both the device and the person.
2. **One random 256-bit vault key**, generated once, via `crypto.getRandomValues`. This is the
   only secret that matters. Everything is encrypted with it, AES-256-GCM, fresh nonce per write.
3. **The passkey wraps the vault key; it does not become it.** The PRF bytes go through HKDF to a
   wrapping key, which locks the vault key; the locked copy is what sits in storage.
   **This is the load-bearing choice in the whole plan.** Deriving the vault key straight from the
   passkey would be simpler and would make B12 and B13 impossible without re-encrypting
   everything, because a second device's passkey produces different bytes. Wrapping lets several
   devices each hold their own locked copy of the *same* vault key.
4. **A recovery code.** 256 bits, shown once, as words, that also wraps the vault key. **Offered,
   not forced; off by default.** Without it, "new phone, and iCloud Keychain was off" is total
   loss with nothing we can say to the person. With it, the honest line is that a code is only as
   safe as wherever it is kept.
5. **The switch.** In Help, off by default, plainly worded. On the same screen, in the same size
   type as the good news: **if you lose your passkey and your recovery code, the worries are gone,
   and nobody — including us — can bring them back.**

## Rules this must not break

- **Rule 1 is untouched by this task.** No request of any kind. WebAuthn's ceremony is between the
  browser and the device's own hardware; there is no relying-party server involved for a local
  credential and there must not be one added here. The airplane-mode proof must still pass with
  the lock switched **on**.
- **Rule 10, and this is the real risk.** This puts a lock screen in front of "one big button".
  Off by default. Never in a first-time person's way. A person who never touches this must not be
  able to tell the feature exists except by finding it in Help.
- **Rule 5/6:** the lock is not a status, a badge, a score or a nag. It is not mentioned on the
  front screen, and nothing prompts anyone to turn it on.
- Export and delete stay one tap away, and **export is plain readable text, always.** An encrypted
  export would break the one promise the export exists to keep — that the person can read and keep
  their own history without us.

## The traps, named now

- **Passkeys inside the Capacitor wrap (B5).** A Capacitor webview served from
  `capacitor://localhost` fails WebAuthn's origin check. The fixes are an https origin with
  associated domains, or a native passkey plugin — and **B5's rule is no plugins beyond Filesystem
  and Share**. This is a genuine collision and it is unresolved. Establish which way it goes
  *before* estimating anything downstream; if it forces the iOS Keychain / Secure Enclave route
  natively, the web and native paths diverge and B12 gets harder.
- **PRF support is not universal.** It is in Safari/iOS 18+, in Chrome, and in 1Password and
  Dashlane, but it must be feature-detected on the day, not assumed. Where PRF is missing, the
  switch is not offered at all — never a silently weaker fallback.
- **Losing the wrapped copy is losing everything.** The wrapped vault key is in the same
  `localStorage` that Safari evicts after seven days uninstalled (B5's reason for existing). If
  the lock is on and that key is evicted, the person's data is unreadable rather than merely gone.
  Decide before building: either the lock is offered only in the installed/native app, or the
  eviction case is handled explicitly. **My recommendation: native and installed only.**

## Tests to add

- With the lock off, every existing test passes unchanged and no crypto code runs.
- With the lock on: write, reload, unlock, read back — byte-identical.
- Wrong or absent passkey: the app renders correctly and says plainly what has happened. It never
  shows a blank ladder as if there were no history.
- A recovery code unwraps the same vault key the passkey does.
- The stored blob contains none of: a belief, a worry label, an outcome sentence, a rung.
- Airplane mode, lock on, full loop.
- Feature-detection: on a browser without PRF, the switch is absent, and nothing throws.

## Open, and for the founder

- **Whether to build this at all as a standalone.** Its value alone is modest; its value is mostly
  that B11–B13 need it. If the answer to Q6 is ever "no", this task dies with them.
- The Capacitor/WebAuthn collision above. That is a decision with a cost attached, not a detail.

## Done when

- The lock can be switched on and off on a real phone, with data surviving both.
- Airplane mode passes with it on.
- `node --test` green, with crypto behind an injected interface the way storage already is.
- Confidence score recorded here.
