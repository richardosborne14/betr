# B6: The bridge to TrybeUP — gated, late, and a copy not a move

**Status:** **Closed — will not do** (2026-09-16, B57). The founder moved BETR off TrybeUP: free, open source, a product of nobody's funnel. What follows is history.  
_Was:_ Blocked. **Do not build until the gate below is open.**
**Confidence:** —
**Date opened:** 2026-09-01
**Depends on:** B0 Q4; and the gate.

## The gate

Research [`08-participant-voice-recovery.md`](../research/08-participant-voice-recovery.md)
§7.1: TrybeUP's private groups are paywalled behind Premium while stranger DMs are free,
"precisely backwards", and unchanged on production (free-access mode is dev-only and refused
in prod). Sending a privacy-first person from Betr into a paywall after onboarding is the
sequencing offence the review corpus punishes hardest. **The bridge is not built until the
free tier of TrybeUP is changed on production.** Betr ships without it.

## Where it is built

Items 2–4 below are TrybeUP code and live in the `trybeup-prod` repo, under its own task log;
only item 1 (the mention) is in this repo. Neither side calls the other.

## What to build, once the gate is open

1. **The mention.** Per Q4a: once, after the fifth completed test, dismissible, in these words
   only: *When you want to do this with people who don't know you.* Never again if dismissed.
   Never on the start screen. The "what this is" paragraph stays as is.
2. **The copy across.** A TrybeUP endpoint that accepts Betr's export file and creates a
   "work on" habit with the history intact, described as *copy*, never *move*. Betr keeps
   working afterwards. The person does this from inside TrybeUP after signing up, by pasting
   or sharing the export; Betr never calls TrybeUP.
3. **Attribution.** If a Betr export is imported, TrybeUP records `signup_source_type = betr`
   through the existing set-once attribution (T0). That is the only way we will ever know a
   Betr user became a TrybeUP user, and it only happens with their hand on the button.
4. **Wording on the TrybeUP side** says what changes: *TrybeUP is an account with people in
   it. What you copy across is held on our servers under the privacy policy.* One sentence,
   above the button.

## Test plan

- Backend: `test_betr_import.py` covers a valid export → habit with N entries, a malformed
  export → 400, and an import on an account that already has one → second habit, not a merge.
- Frontend: the mention appears once at test five and never after dismissal (unit test on the
  counter and the dismissed flag).

## Done when

The gate is documented as open in this file with the production change that opened it, and the
three tests pass.
