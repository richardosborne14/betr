# B11: Sync through the person's own iCloud — Apple family, no server of ours

**Status:** On the shelf — scoped 2026-09-03, not scheduled.
**Confidence:** —
**Date opened:** 2026-09-03
**Depends on:** B5 (the wrap), B9 (the record shape), **B10 (the lock) — see below; this task
changed shape once B5 was re-read.**
**Where:** `mobile/`, the Capacitor shell. Nothing in `web/` except the merge.
**Background:** `docs/research/11-sync-passkeys-and-the-promise.md` §3B, §7. This is the answer
to **Q6** in `00-scope.md` §9 ("own-cloud backup offered or not"), which has been open since
2026-09-01 and was written before any of this was thought through.

## Why this exists

An iPhone and a Mac belonging to the same person can see the same worries with **no server of
ours, no account, no bill and nothing for the person to set up**, by writing to their own private
iCloud. Nothing of ours is involved at any point. It covers a large share of the people who would
ever ask for sync, and it is by a distance the best value-for-effort on the list.

It does not touch Windows, Android, or a browser. Those are B12 and B13, and they cost real money
and a rule change. This one costs neither.

## The correction that reordered this task

The research file first put this **before** the lock (B10), as the free win. Re-reading B5 shows
that is wrong. B5 says, sourced to App Store Review Guideline 5.1.3:

> Health data not in iCloud (5.1.3): keep the storage out of iCloud backup, and make export the
> only copy path.

So there is an existing, deliberate constraint pointing the other way. Two readings are possible
and **the founder does not have to choose between them**, because one move satisfies both:

- The narrow reading: 5.1.3's iCloud sentence is about HealthKit and Clinical Health Records data,
  which BETR does not touch.
- B5's conservative reading: BETR's data is health-adjacent, so keep it out of iCloud regardless.

**The move: put only sealed boxes in iCloud.** If what is written there is ciphertext under the
person's own vault key — a key Apple does not have and we do not have — then it is not health
information stored in iCloud in any reading, and the "can Apple read it?" question disappears at
the same time. That is why **B10 now comes first**: the lock is what makes this task safe rather
than a judgement call in front of App Review.

## What to build

1. The person's data, already one sealed box per worry from B10, written to the app's **private**
   iCloud container (CloudKit private database, or an encrypted file in the app's iCloud Drive
   container — decide on the merge behaviour, not the branding).
2. Merge on read, using B9's rules: join by `rid`, order by `when`, replay the taps. Two devices
   that were both used offline join without a prompt and without losing anything. **There is no
   conflict dialogue.** A person must never be asked which version of their own week to keep.
3. **Off by default**, one switch in Help, plainly worded: *your worries, on your other Apple
   devices, through your own iCloud. Not through us — we never see any of it.*
4. Switching it off removes what was written there. "Delete everything" removes it too, and says
   so before it does it.

## Rules this must not break

- **Rule 1 needs no amendment for this task, and that is the point.** Nothing goes to us, or to
  anyone we have a relationship with. The claim becomes "nothing is sent to us or anyone else" —
  still literally true — with "unless you switch on your own iCloud, which is yours" alongside it.
  Get the founder's read on that sentence before building; it is the whole trust question in one
  line, and it is theirs, not a session's.
- **The *Data Not Collected* label must survive.** Apple's own position is that data in a user's
  private CloudKit database that the developer cannot access is not collected by the developer.
  **Confirm this against Apple's current wording before relying on it** — it is the reason this
  task exists and if it has changed, this task changes with it.
- No plugin that phones anywhere else. B5's shell rule holds; iCloud is Apple's own storage, not a
  third-party SDK, and it must not become the thin end of one.
- Export stays plain readable text and stays the copy path that needs nobody's cloud.

## Tests to add

- Two devices, both used offline, then both online: every result present, none duplicated, ladders
  identical on both, and identical to replaying every tap in time order.
- The same test where both devices tested the same worry on the same day.
- Switch off → the iCloud copy is gone; the device keeps its own.
- "Delete everything" → gone from both, and the app can show that it is.
- Airplane mode: the loop still works with the switch on, and syncs when the network returns.
- The bytes in the container contain no belief, no worry label, no outcome sentence, no rung.

## Open, and for the founder

- **The sentence in the rule above.** Does "nothing leaves the phone" survive being "nothing
  leaves your phone except to your own iCloud"? The founder's call, in writing, before code.
- Whether Android's equivalent is done at the same time or ever. It is the same idea; it is not
  the same amount of work, and Play's declaration is a separate exercise.
- Apple's current wording on private-database data and the privacy label (above).

## Done when

- An iPhone and a Mac show the same worries, having each been used offline first.
- The store listing still reads *Data Not Collected*.
- `node --test` green for the merge logic, which lives in `web/lib/` and is testable without a
  device.
- Confidence score recorded here, and **Q6 marked answered in `00-scope.md` §9.**
