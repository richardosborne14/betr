# B0: Decisions before build — Q1, Q2, Q3

**Status:** Q2 and Q3 answered 2026-09-02. Q1 still open (does not block the build)
**Confidence:** 8/10 on the two build-shaping answers; Q1 unresolved by design
**Date opened:** 2026-09-01
**Owner:** Richard and Misha. Not a build task.

## What this is

Three answers gate B1 and B2. Everything else in the scope can wait for a working v1.
The questions are argued in [`../00-scope.md`](../00-scope.md) §9; this file is the checklist.

## The three answers

- [ ] **Q1 · The name is Betr.** Still needed: a trademark search (UK IPO, USPTO, EUIPO) and a
      domain (`betr.app`, `getbetr.com`, or similar). Misha's read on the "bet" pun for a
      gambling-recovery reader, and whether the pun appears in copy ("Bet it goes badly?") or
      only in the name. Until a production domain exists, B3 deploys to `betr.dev.trybeup.com`.
      **Open.** Does not block B1 or B2: the app carries the name and no pun in copy, and the
      habit-word guard blocks the word "bet" in a person's own test, which is correct either way.

- [x] **Q2 · The stock list.** Founder, 2026-09-02.
      - **(a) Both doors, in v1.** Fears on the first screen, and a second door behind
        *Not sure which? Start from what's going on* listing six everyday surface problems,
        each opening the fears that usually sit under it. Content is
        `web/content/whats-going-on.js`.
        **Release condition:** Misha signs off every one of the six labels before this ships
        to anyone. It is the one screen in Betr that names a behaviour rather than a fear, and
        scope §5.3a calls it the closest thing here to the regulatory line. Built, not cleared.
      - **(b) How many visible:** twelve, all visible, plus *Something else* last.
      - **(c) Order:** as scope §5.1 — saying no, asking for help, admitting I'm struggling
        first, so the first test is the easiest one to succeed at.
      - **(d) "Not drinking at a social thing" stays.** Founder's call: the fear is about being
        noticed, not about the drink. The *test* was reworded so it contains no habit word
        ("order something soft" rather than "go with a soft drink"), which is what the guard
        and the B4 content test check. Misha may still pull it; it is one line to remove.
      - **(e) Who writes and reviews:** Richard drafts, Misha reads for the audience, one
        CBT-trained reviewer reads once. Unchanged, and still outstanding for B1.

- [x] **Q3 · Custom entries: v1.** Founder, 2026-09-02, against the scope's recommendation of
      v1.1. *Something else* is the last button on the pick screen and carries both guards:
      the if/then reframe on the belief, and the habit-word refusal on the test. It is three
      screens of one box each, never a form (CLAUDE.md rule 10).

## What the answers cost

Q2a and Q3 together are the two things scope §8 said would push v1 past "roughly a week of
sessions". They are built in B2. The risk they add is not build risk, it is review risk: the
six surface-problem labels and the two guards are the parts a reviewer will read hardest.

## Done when

Q1 answered and the scope's §9 table updated. Q2 and Q3 are done.
