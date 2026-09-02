# B5: Capacitor wrap and store listings — the privacy label is the point

**Status:** Not started
**Confidence:** —
**Date opened:** 2026-09-01
**Depends on:** B2 shipped and stable; B0 Q1 (name, and the legal entity for the listing); Q9 (age).

## Why early, not late

Two reasons from the research, both hard: iPhone Safari evicts a web page's storage after
seven days unused unless it is installed, and only a store app carries Apple's
*Data Not Collected* label and Play's *No data collected* declaration. Those two labels are
the trust claim made by someone other than us.

## What to build

1. **`mobile/`**, a Capacitor shell that loads `web/` from the bundle. Not TrybeUP's
   shell: that one carries its plugins, push, sign-in and Capgo, all of which
   phone home. Betr's shell has **no plugins** beyond what export needs (Filesystem and Share).
   No Capgo, no push, no analytics, no crash reporting.
2. **iOS.** New bundle id. Privacy nutrition label: *Data Not Collected*, which Apple defines as
   nothing transmitted off device. App Review guideline 1.4.1 sentence present ("check with a
   doctor"). Health data not in iCloud (5.1.3): keep the storage out of iCloud backup, and make
   export the only copy path.
3. **Android.** Health apps declaration completed; the Play-required sentence present verbatim
   ("not a medical device and does not diagnose, treat, cure, or prevent any medical
   condition") plus the "consult a healthcare professional" reminder. Data safety: no data
   collected, no data shared.
4. **Age rating** per Q9; recommendation 18+.
5. **Listing copy** uses only the safe column of the scope's wording table. Never "digital
   CBT", never "treats", never a diagnosis, never "improve your mental health". Purpose
   statement identical to the website's.
6. **A test flight to the founder's admin phone**, then review. This is a **new App Store
   release**, by the CLAUDE.md rule, and it is a separate app, so it does not touch TrybeUP's
   listing or Capgo channel.

## Test plan

- Airplane mode on a real iPhone and a real Android phone: full loop, export via Share sheet.
- `Info.plist` and the Android manifest contain no network-permission-requiring plugin.
- The store listing's privacy section reads *Data Not Collected* / *No data collected* before
  submission, and the reviewer sees the disclaimer sentences on the "what this is" screen.

## Done when

Both listings approved with the privacy labels intact, and the task log records every plugin
in the shell (expected: two).
