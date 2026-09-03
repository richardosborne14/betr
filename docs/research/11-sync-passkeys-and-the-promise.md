# Sync, passkeys, and what we can honestly promise

**Written 2026-09-03**, from the founder's question: someone uses BETR properly for months, on
multiple worries, and is sad they can't get it onto their PC. Could a passkey give them sync
without an account, an email, or us being able to read anything — the WhatsApp trust story,
using the ideas from the `nexus` project?

**This is research for Q6 (`00-scope.md` §9), not a decision and not a task.** Nothing here is
built. Its purpose is to give the founder and Misha a real set of options, an honest account of
what each one costs, and a clear line between the claims that are true and the ones that aren't.

---

## 1. The short answer

The instinct is right. Two parts of the framing need correcting before anything is built on it.

**Right:** a passkey can produce an encryption key, out of the phone's secure hardware, gated by
Face ID, with no email, no password and no account. Nobody but the person can produce that key,
and we never see it. That is real, it is a published standard, and it is roughly the thing that
makes people trust WhatsApp.

**Correction 1 — a passkey gives you a *key*, not a *sync*.** It answers "how do we lock this
without an account". It does not move a single byte between two devices. Sync needs somewhere
for the bytes to sit: our server, the person's own cloud, or a direct phone-to-PC handshake.
*That* choice, not the passkey, is what decides whether "nothing leaves the phone" survives,
whether Apple's *Data Not Collected* label survives, and whether we become a data controller.

**Correction 2 — drop the blockchain and quantum framing.** It's off-brand (the founder already
said no crypto-bro anything) and, more importantly, it isn't true. Blockchains are not encrypted;
they are public ledgers — that is their whole point. "Encrypted harder than a blockchain" is like
"more waterproof than a window". And nothing here is quantum-proof: the content encryption
(AES-256) would be fine against a quantum computer, but the key exchange around it is ordinary
elliptic curve, which is exactly what a quantum computer would break. **The honest comparison is
WhatsApp and Signal, not blockchain.** It is a better comparison anyway: everybody already has it.

`nexus` is a different tool for a different job, worth being precise about. Nexus uses the passkey
to **sign** — to prove *who did what, and that the record wasn't edited afterwards*. That matters
when strangers trade hours and might lie later. BETR has no strangers, no counterparty and no
dispute; it needs the opposite property, **encryption** — *nobody but you can read this*. Same
piece of hardware, different extension, different guarantee. Nexus's hash-chained log, its Bitcoin
anchoring and its verify page have no use here and would be theatre if we borrowed them.

## 2. How the key part would actually work

WebAuthn has an extension called **PRF** (built on the authenticator's `hmac-secret`). In plain
terms: you hand the phone a fixed phrase, the phone asks for Face ID, and it hands back the same
32 secret bytes every single time — bytes that exist nowhere else and cannot be computed by anyone
who doesn't have both the phone and the face. Those bytes become the encryption key for the
person's worries.

Three consequences worth knowing before anyone gets attached to it:

- **It survives losing the phone**, because iCloud Keychain (and Google's equivalent on Android)
  syncs the passkey itself to the person's new phone. Same passkey, same phrase, same key, same
  data. This is better than a seed phrase and much better than a password.
- **It does not survive losing the passkey.** If someone turns off iCloud Keychain, or wipes
  everything, the data is unrecoverable, by us or by anyone. That is the point, and it is the one
  sentence that has to be on the screen where they turn sync on — not in a policy.
- **Support needs checking on the day, not assumed.** PRF landed in Safari/iOS 18, in Chrome, and
  in password managers like 1Password and Dashlane, but the awkward case is exactly the founder's:
  PRF over the *cross-device QR* flow (phone acting as the key for a desktop browser) has been
  patchy. §4 designs around that rather than betting on it.

## 3. The part the passkey doesn't solve: where the bytes go

Four options. They are not variations on one thing; they have genuinely different costs.

### A. No sync. Transfer. *(This is what exists today, and it half-works already.)*
*Export* already produces the whole history as text, one tap. Add "put it on my PC" as an
explicit, named thing: show it as a QR code the PC's camera reads, or keep the paste-it route.
- **Costs us:** almost nothing. A few hours.
- **Keeps:** every promise, exactly as written. No server, no policy change, no label change.
- **Doesn't give:** ongoing sync. It's a copy taken on a day, and it goes stale.
- **Honest read:** this covers more of the real need than it sounds like. "I'd like my stuff on my
  laptop" is usually a one-off, not a demand for continuous replication.

### B. The person's own cloud. *(iPhone ↔ Mac, native app only.)*
The native app (B5) writes its data to the person's **private iCloud** — not to us. Their iPhone
and their Mac see the same worries, automatically, with nothing to set up and no passkey involved.
- **Costs us:** small, and only inside the native app. There is no server, no account, no bill.
- **Keeps:** as far as Apple's own rules go, data in a user's private CloudKit database that the
  developer can't read isn't "collected" — so *Data Not Collected* should survive. **Confirm this
  against Apple's current wording before relying on it.**
- **Doesn't give:** anything on Windows, Android, or a browser. It's the Apple family only.
- **Honest read:** the best value-for-effort on the list, and it is what Q6 was originally asking.

### C. Our server, holding only sealed boxes. *(The full idea. iPhone → any PC.)*
The design is in §4. It's the one that delivers what the founder described.
- **Costs us:** a server, a database, uptime, backups, an abuse surface, a bill, a privacy policy,
  an App Store label change, GDPR data-controller status (**encrypted personal data is still
  personal data** — encryption is a safeguard, not an exemption), and a body of security-critical
  code where a bug means either silent data loss or a broken promise.
- **Keeps:** the *spirit* of rule 1, not its letter. "Nothing leaves the phone" would have to
  become "nothing leaves your phone unless you switch on sync — and then only in a form we can't
  open". That is a real amendment to a rule that is currently absolute, and it belongs to the
  founder to make, in the scope, deliberately.
- **Honest read:** buildable, defensible, and genuinely good — for users who don't exist yet.

### D. Sync through something the person already trusts.
Write an encrypted file to their iCloud Drive / Google Drive / Dropbox folder and let their own
sync move it. No server of ours; works cross-platform.
- **Honest read:** conceptually clean, in practice fiddly — file pickers, conflicts when two
  devices write at once, and a first-run experience that is several taps of plumbing. It trades
  our server bill for the person's confusion. Mentioned for completeness; not recommended.

## 4. If C is ever built, this is the shape

Not "log in with a passkey on the PC" — that's the flow with the patchy support, and it's the one
that would need the person to enrol a passkey on a machine that might not be theirs.

**The phone is the only holder of the key. The PC is a window the phone opens.** Exactly the
WhatsApp Web model, which is also the thing the founder already pictured:

1. On the phone, the person switches sync on. Face ID → PRF → the key. The phone starts putting
   sealed boxes on our server, filed under a random ID. We can see that a box arrived and roughly
   how big it is. We cannot open one.
2. On the PC, `betr.app` shows a QR code. The QR carries a one-time public key the PC just made.
3. The phone's camera reads it, shows *Let this computer see your worries?*, and — if yes — sends
   the vault key to the PC, sealed so that only that PC can open it. Nothing readable passes
   through us at any point.
4. The PC pulls the sealed boxes and opens them locally. Any device can be un-paired from the
   phone, immediately, and it goes dark.

Why this shape: it needs PRF only on the phone (where it works well), it needs no account on the
PC, it puts a physical act — pointing your phone at a screen — at the moment of trust, and it
gives the person a revoke button that actually revokes.

## 5. The claim we can make, and the one we can't

This audience is braced for betrayal; the research is unambiguous about that. An overclaim
discovered later does more damage than never having synced at all.

| Claim | Verdict |
| --- | --- |
| "No email, no password, no account" | **True.** Say it. |
| "We can't read your worries" | **True, with one asterisk — see below.** |
| "If you lose your passkey, it's gone, and we can't get it back" | **True, and it must be said as loudly as the good news.** |
| "Encrypted harder than a blockchain" | **False and meaningless.** Never say it. |
| "Not even quantum computers" | **Not defensible.** Drop it. |
| "Even the BETR admins couldn't look" | **True of the design — but see the asterisk.** |

**The asterisk, and it's important.** On a *website*, we serve the code that does the encrypting.
We could, in principle, serve different code tomorrow to one person and take their key. That is
the known, unsolved weakness of end-to-end encryption in a browser, and it is precisely why
WhatsApp ships an app from a store rather than a web page. **So this feature is honest in the
native app and only mostly honest on the web.** That is an argument for sequencing: native app
(B5) first, sync after, never sync-on-the-web-first.

And whatever is claimed, it should come with something **checkable**, the way today's promise
does. "Turn your wifi off — it still works" is worth more than any paragraph. The sync equivalent:
a page that shows a person exactly what one of their sealed boxes looks like on our server —
a screenful of nonsense — next to what it says on their phone.

## 6. What I'd actually do

1. **Not now.** Every hour of this is an hour not spent on the words in the list (B1), which is
   the actual product, and on the native app (B5), which is what stops people losing their history
   in the first place — that risk is live *today*: iOS Safari evicts a web app's storage after
   seven days unused. The nearest answer to "I don't want to lose my progress" is the app, not sync.
2. **Do A now-ish** — name the transfer, make it a QR, make it obvious. It costs a few hours and
   it answers most of the real need.
3. **Do B with the native app** if Apple's label wording confirms it. Free sync for the Apple
   family, no server, no promise broken. **Corrected 2026-09-03, after re-reading B5:** this is
   not quite free, and it does not come first — B5 already rules, from App Store guideline 5.1.3,
   that BETR's data stays out of iCloud. The fix is to put only *sealed boxes* there, which means
   the lock (Phase 2) comes before this. See `docs/tasks/B11-own-cloud-sync.md`.
4. **Keep C on the shelf, designed** (§4), and build it when actual people ask — not before. If it
   is ever built, rule 1 gets amended in the open, in `CLAUDE.md` and the scope, on the founder's
   say-so, and the *Data Not Collected* label and privacy policy change with it.

**What this changes in the docs today: nothing.** Q6 gains this file as its working. Rule 1 stands
as written until the founder decides otherwise.

---

## 7. If we were going to do it: the actual build

Asked 2026-09-03: *what would you do to reach WhatsApp-style encryption of a person's worries,
synced to their PC?* This is that answer — the whole route, in the order I'd take it. Still not a
decision. Phase 0 is the only part I'd argue for doing soon, and it is worth doing whether or not
any of the rest ever happens.

### Phase 0 — make the record mergeable. Half a day, and cheap only if done early.

Sync means two devices each adding results without knowing about the other, and then joining the
two histories. The current record can't survive that, for three small reasons:

- **No result has an id.** `app.js:430` pushes `{id, source, label, belief, x, test, drop, o,
  level, rateLabel, when}`. `id` is the *worry's* id, shared by every test of that worry. So two
  histories can't be joined without either duplicating results or dropping them. **Fix:** a random
  `rid` on every result.
- **The ladder stores where it landed, not what was tapped.** `level: rate.next(at, ch.key)` — the
  resulting rung — is saved; `ch.key` (`still` / `bit` / `lot` / `none` / `more`) is not, only its
  display label. Merge two devices and there are two rungs each claiming to be the latest, and no
  way to work out what the person actually did. **Fix:** store `move: ch.key`. The ladder is then
  just the taps replayed in order, and it recomputes correctly however the results interleave.
  `rate.js` already has everything needed for this; `next()` is the replay step.
- **Order is array position, not time.** `series()` and `levelFor()` both walk `done` in the order
  it happens to be in. **Fix:** sort by `when`.

`rate.keyOf()` — which decides what counts as the same belief — is already merge-safe. Good.

All three are a storage version bump (v2 → v3) of exactly the kind `store.js` was built for, and
old records carry over the way v1's did. Do it before people have months of data, not after.
It also makes two exported files joinable by hand, which is useful on its own.

### Phase 1 — the native app, syncing through the person's own iCloud. No server.

**Order corrected after this section was written: Phase 2 comes first.** B5 already rules BETR's
data out of iCloud, sourced to App Store guideline 5.1.3, so what goes there has to be ciphertext
under the person's own key — which is Phase 2's job. The reasoning is in
`docs/tasks/B11-own-cloud-sync.md`; the task numbering there is the order to trust.

Ships with B5. iPhone, iPad and Mac see the same worries automatically; nothing of ours is
involved; *Data Not Collected* should survive (§3B). Doesn't touch Windows or Android. This alone
answers the question for a large share of the people who'd ask it.

### Phase 2 — the lock, with no sync behind it yet.

*Lock this with Face ID*, opt-in, off by default:

- Create a passkey with the PRF extension.
- Generate **one random 256-bit vault key**. This is the only secret that matters; everything is
  encrypted with it (AES-256-GCM).
- The passkey produces a *second* key, which **wraps** (locks) the vault key. The wrapped copy
  sits on the device. Wrapping rather than deriving the vault key directly is the important
  choice: it's what later lets several devices each hold their own wrapped copy of the *same*
  vault key, so a computer can be added or removed without re-encrypting everything.
- Storage on the device is now ciphertext.

Worth doing even with no sync: someone who picks up an unlocked phone can't read the worries. And
it proves PRF works on real devices before any server exists. **The risk to watch:** this puts a
lock screen in front of "one big button". Off by default, never in a first-time person's way.

### Phase 3 — sealed boxes on a deliberately stupid server.

- **One box per worry, not one big file.** Three to twelve boxes per person, a few kB each, padded
  to a fixed size so the size says nothing. Per-worry granularity keeps merges rare and small.
- **The account is a random number attached to the passkey.** No email, no username, no name,
  nothing to type. Signing in is Face ID.
- **The server does four things:** what's changed since X, here's a new box, remove a box, delete
  everything. Ciphertext in, ciphertext out. Hard size cap and rate limits so it can't be used as
  free storage.
- **What we could still see, and must say out loud:** that an account exists, roughly how many
  boxes it has, when they last changed, and the IP address at the moment of syncing. Not one word
  of content — no worry, no sentence, no rung. WhatsApp's position on metadata is comparable or
  worse; ours is defensible, but only if we state it rather than let someone find it.
- **Delete everything wipes the server too**, and the app shows the person the server confirming
  it's gone.

### Phase 4 — the PC, by QR. (This is the picture in the founder's question.)

1. The PC opens BETR and shows a QR: a one-time key the PC just invented.
2. The phone's camera reads it and asks *Let this computer see your worries?*
3. The phone seals the vault key so that **only that PC** can open it, and posts it. The PC
   collects it and opens it. Nothing readable passes through us at any point.
4. **Both screens then show the same three words.** If they don't match, something is in the
   middle — stop. This is WhatsApp's security-code idea, it costs almost nothing, and it is the
   checkable proof (§5) rather than a paragraph asking to be believed.
5. The PC asks: *remember this computer, or forget it when I close the tab?* **Default forget.**
   Where the machine can (Windows Hello, Dashlane, 1Password), "remember" is itself locked behind
   that.

Note what this avoids: it never needs PRF on the desktop — the flaky case (§2) — and it never asks
someone to enrol a passkey on a machine that might not be theirs. The phone stays the only holder.

### Phase 5 — removing a computer, and getting back in.

- The phone lists the paired computers, with when each was added, and can remove one. Removing has
  to *mean* something, so it also **rotates the key**: the phone makes a new vault key, re-seals
  everything (seconds — the data is tiny) and hands the new key to the devices that are left. The
  removed computer's copy stops opening anything. Without this step, "remove" is a lie.
- **Getting back in** normally needs nothing: the passkey itself returns with the person's new
  phone via iCloud Keychain or Google. If they've turned that off and the phone is gone, the data
  is gone, and we cannot help. That sentence goes on the screen where they switch sync on, in the
  same size type as the good news.
- **One optional escape hatch:** a recovery code, shown once, to write down. Off by default, with
  a plain line that a code is only as safe as where it's kept. Every password manager does this.
  Without it, "new phone, iCloud was off" is a total loss with nothing we can say to them.

### Phase 6 — the proof, and the paperwork.

- **A *show me* screen:** the worry as they wrote it, and beside it the exact bytes we hold — a
  screenful of nonsense. That is the sync equivalent of "turn your wifi off and watch it work".
- **Publish the code.** On the web, publish the hash of the file that does the encrypting, so a
  changed version is at least noticeable. It helps; it does not close the gap of §5. **The
  app-store binary does. So: the app first, the web second — never the web alone.**
- Privacy policy, a data-controller position, breach-notification duty, and the App Store label
  moves off *Data Not Collected* (unless it stays the Apple-only route of Phase 1). Rule 1 in
  `CLAUDE.md` gets amended in the open, by the founder, before a line of Phase 3 is written.

### What it costs

Phase 0 is half a day. Phase 1 comes almost free with the native app and covers every
iPhone-and-Mac person. **Phases 2–6 are roughly three to five focused weeks of build, plus the
policy work, plus a server somebody owns forever** — and a category of bug where being wrong means
either silently losing somebody's history or quietly breaking the exact promise the product is
sold on. That is the number to weigh, and it is why §6 still says: not now.

---

## 8. The tasks

Scoped 2026-09-03, at the founder's request, so that the answer exists if someone asks. **None of
them is scheduled and none is next.** B9 is the only one worth doing before anyone asks for sync.

| Task | What it is | Breaks a rule? | Cost |
| --- | --- | --- | --- |
| **B9** — the mergeable record | Three small changes so two histories can be joined at all | No | Half a day |
| **B10** — the lock | Passkey → a vault key → encrypted on the device. No sync | No | Days |
| **B11** — own-cloud sync | iPhone ↔ Mac through the person's own iCloud. No server of ours | No | Days, with B5 |
| **B12** — the sealed-box server | ⚠ The first thing BETR ever sends anywhere | **Rule 1** | Weeks, then forever |
| **B13** — pairing a computer | The QR, the three words, and un-pairing that means it | Gated by B12 | Weeks |
| **B14** — the proof and the paperwork | The *show me* screen, the policy, the label | Gated by B12 | Weeks, mostly not code |

**The line that matters is between B11 and B12.** Everything up to B11 keeps every promise BETR
makes today, word for word. B12 is where "nothing leaves the phone" stops being true as written,
and it needs the founder to amend rule 1 themselves, in the open, before a line of it is built.

It is entirely legitimate to stop at B11. If that happens, Q6 is answered, the Apple half of the
audience gets sync, the promise is untouched, and B12–B14 are three files nobody had to write
twice. **That is a good outcome, not a failure.**
