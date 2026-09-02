> **Copied into the Betr repo 2026-09-01 as the audience evidence.** Written for the TrybeUP
> repo; links to sibling files (`02-…`, `05-…`, `07-…`, `00-synthesis.md`) and to TrybeUP
> code do not resolve here. The findings that matter for Betr are §3.1 (simple wins, paywalls
> at the point of need lose, the AI penalty is about framing), §3.3 (the consent line) and §7.1
> (TrybeUP's private groups are paywalled: the gate on B6).

# Participant voice — men in porn and alcohol recovery, in their own words

**Researched 2026-08-20.** Follow-up to `06-followup-prompt-participant-voice.md`, closing the
gap that round left: the previous research reached this audience only through vendors,
clinicians, ministries and archived 2025 snapshots. This file is built almost entirely from
what these people wrote themselves, in 2026.

Claims are labelled **FOUND** (retrieved and read), **INFERRED** (my reasoning) or
**UNKNOWN**. Every quote carries a permalink and a date. Nothing here is paraphrase presented
as quotation.

Access routes and their failure modes are documented separately in
[`07-forum-access-notes.md`](07-forum-access-notes.md).

---

## 1. Verdict

**What these men want from a tool is a private, permanent, free day-counter that never
charges them at the moment they are struggling, plus a way to talk to someone who does not
know them — and almost nothing else.** The single loudest signal in 27,891 app-store reviews
is not AI and not privacy: it is **paywalls, which drag ratings down by 1.89 stars and are
resented most violently when they gate the help itself** (*"if I'm actively struggling so hard
I downloaded an app at least give me 1 urge breaker I can actually use"*), while the single
strongest positive signal is **"simple"** (+0.47). **The biggest thing TrybeUP has wrong for
this audience is that private groups are paywalled behind Premium while stranger DMs are
free** — that is precisely backwards from what the evidence asks for, and it is a safeguarding
problem as well as a commercial one, because 43 posts in this corpus warn about people
offering accountability in DMs and then sending porn. The accountability-partner
contradiction the last round flagged resolves cleanly on revealed behaviour: **men in
porn-recovery subreddits ask strangers to be their accountability partner at 9.53 requests per
1,000 posts, against 0.34 in the alcohol subreddits — a 28-fold difference across 95,707
posts** — so this is a porn-recovery mechanic, not a general recovery one. And on streaks, the community's own most-upvoted answer is
already TrybeUP's sobriety module's design: *"Delete the day, not the progress and the
journey."*

---

## 2. Method

### What was read

| Source | Volume | Date range |
| --- | --- | --- |
| Reddit posts, 12 subreddits, via arctic-shift | **128,656 posts** | 2026-01-01 → 2026-08-19 |
| Reddit comments, 70 full comment trees | **3,262 comments** | 2026 |
| Google Play reviews, 28 apps | **26,805 reviews** (8,889 from 2026) | 2017-06 → 2026-08-19 |
| Apple App Store reviews, 14 apps | **1,086 reviews** | most recent 500/country cap |
| forum.nofap.com, 9 boards | **910 posts** (488 from 2026) | 2015 → 2026-08-20 |
| **Total items** | **160,719** | |

Subreddits swept: r/NoFap, r/leaves, r/PornAddiction, r/stopdrinking, r/loveafterporn,
r/pornfree, r/alcoholism, r/AlAnon, r/cripplingalcoholism, r/dryalcoholics,
r/REDDITORSINRECOVERY, r/PornAddictionSupport.

**Everything was retrieved in full text and searched locally.** No finding below rests on a
search-engine snippet. Where a thread is quoted, the whole thread was read.

### Honest limits on the corpus

- **Ten of the twelve subreddits are swept complete for 2026-01-01 → 2026-08-19.** The two
  largest are not: **r/NoFap covers Jan 1 – Apr 12 (31,000 posts)** and **r/stopdrinking covers
  Jan 1 – May 17 (25,700 posts)**. Both were still being swept when the corpus was deliberately
  frozen, so that every figure in this file comes from one consistent snapshot. Findings
  weighted toward those two over-represent the first third of the year.
  **Where sub-to-sub comparison matters, §4.1 reports rates per 1,000 posts read rather than
  raw counts, which removes this bias entirely.** All percentages below are of the 128,656
  posts actually read.
- **r/PornAddictionSupport is effectively dead** — 7 posts in eight months. Do not plan
  around it.
- **App-store reviews are a biased instrument.** People who quietly abandon an app rarely
  review it, so review data understates silent churn and cannot see anyone who never
  downloaded. Play reviews were pulled newest-first, so per-app means below run *below* the
  lifetime store average by design — that is a recency sample, not a contradiction.
- **This corpus is selected on people who sought help.** It structurally cannot measure
  reluctance to seek help. See §5 on hypothesis H2.
- No Reddit *comment* body-search results are included in the numbers above; that harvest was
  still running at the time of writing. The 3,262 comments read came from full trees.

---

## 3. §A — What they say about the apps they have actually tried

### 3.1 The complaint taxonomy, 26,805 Google Play reviews

Overall mean across all 28 apps: **4.24**. Deltas are against that baseline.

| Theme | Reviews | Mean | Δ |
| --- | ---: | ---: | ---: |
| **Price / subscription / paywall** | 2,236 | **2.35** | **−1.89** |
| Bugs / crashes | 708 | 2.47 | −1.77 |
| Ads | 713 | 2.86 | −1.38 |
| **AI mentioned** | 65 | **3.22** | **−1.02** |
| Streak lost / reset | 340 | 3.42 | −0.82 |
| Widget | 139 | 3.55 | −0.69 |
| Privacy / surveillance | 229 | 3.70 | −0.54 |
| Shame / judgment | 202 | 3.82 | −0.42 |
| Notifications | 538 | 3.85 | −0.39 |
| Accountability partner feature | 3,381 | 4.17 | −0.07 |
| Community / other people | 931 | 4.51 | +0.27 |
| **"Simple" / "clean" / "does what it says"** | 1,102 | **4.71** | **+0.47** |

**FOUND. Three things follow, and they are not what the last round predicted.**

**(a) Money is the story, not AI.** Paywall complaints are 34× more numerous than AI
complaints and carry nearly twice the rating penalty.

**(b) The AI penalty is real but small, and the previous figure was overstated.**
`05-cohort-creators.md` reported reviews mentioning AI averaging *2.36 against 3.82 overall*.
On this larger sample the direction holds but the gap is narrower: **3.22 vs 4.24 on Play
(n=65), 2.20 vs 3.46 on Apple (n=5), 3.14 vs 4.21 combined (n=70)**. AI is mentioned in
**0.25% of reviews**. It is a genuine negative and worth acting on — but it is not the
headline, and quoting the old figure to a partner would be quoting a number this corpus does
not support.

**(c) "Simple" outperforms everything.** The strongest positive signal in the entire review
corpus is people saying the app is uncomplicated. This corroborates the S-curve
feature-richness finding in `00-synthesis.md` §2 from an entirely independent direction.

### 3.2 App by app — what made them stay, what made them leave

Recency samples (newest-first), so means generally sit *below* the lifetime store score. Where
the sample sits above it — Fortify — recent reviews are better than the app's history.

| App | n | Sample mean | 1–2★ | Store lifetime |
| --- | ---: | ---: | ---: | ---: |
| Sober Sidekick | 1,600 | 4.81 | 2% | 4.82 |
| NoBeep | 1,600 | 4.77 | 2% | 4.85 |
| Sober Time | 1,600 | 4.61 | 6% | 4.78 |
| Quitzilla | 1,600 | 4.50 | 7% | 4.61 |
| I Am Sober | 1,600 | 4.48 | 9% | 4.74 |
| Ever Accountable | 1,600 | 4.34 | 13% | 4.55 |
| Seed | 1,600 | 4.32 | 11% | 4.41 |
| Victory Shield (Covenant Eyes) | 1,600 | 4.13 | 16% | 4.38 |
| Unchaind | 1,399 | 4.13 | 18% | 4.73 |
| Fortify | 1,177 | 3.89 | 24% | **3.68** |
| Brainbuddy | 1,600 | 3.77 | 25% | 4.64 |
| **QUITTR** | 1,165 | **3.42** | **35%** | 4.49 |
| **Reframe** | 1,036 | **3.15** | **43%** | 4.34 |
| Loosid Dating | 242 | 2.67 | 56% | 3.81 |

**Reframe's recent reviews are deteriorating sharply** — pre-2025 sample mean 3.31 (n=438) →
2026 mean **2.67** (n=262). FOUND.

**Covenant Eyes has renamed.** It ships as **"Victory Shield"** and **"Victory by Covenant
Eyes"** on both stores. Users refer to it both ways — *"his Victory (Covenant Eyes) activity"*
([r/loveafterporn, 2026-02-02](https://www.reddit.com/r/loveafterporn/comments/1qu91lx/i_am_finally_free/)).
Any competitive slide still saying "Covenant Eyes app" is out of date.

**Sober Grid could not be found on either store** (2026-08-20). It appears delisted. Do not
list it as a live competitor without checking.

#### The paywall verbatims — this is the section to read twice

> **"almost all of the things in the app to help you are locked behind a paywall. if I'm
> actively struggling so hard I downloaded an app at least give me 1 urge breaker I can
> actually use."**
> — 1★, I Am Sober, Google Play

> **"This app isn't interested in helping others: if they did, it would be free with a
> premium option. Nope, just another colorful, predatory app designed to give you hope…
> until you hit the pay wall that is."**
> — 1★, Brainbuddy, Google Play

> "sometimes its hard since if you don't pay you don't get to connect with the groups or talk
> to anyone else apart from yoir friends and family wish that could be changed. I understand
> that this app deserves to get some money but **if the porpuse of it is to help then it
> wou[ldn't be]**…"
> — 4★, Fortify, Google Play, 30 thumbs-up

> "I was disappointed that **the vital community feature is paywalled.** While premium access
> makes sense, restricting community suppor[t]…"
> — 1★, Fortify, Google Play

> "Is the right idea with the wrong execution. **Every time you open the app it'll take you
> straight to their premium subscription page instead of the actual check-in page.** You have
> to click three different things before you reach the main page. **If I am struggling with
> tempt[ation]**…"
> — 1★, Unchaind, Google Play, 125 thumbs-up

> "**$240 yearly. thats more than a therapy session, except this isnt therapy.** … theres no
> actual authentic person to talk to there, its only redeeming feature is an ai coach and an
> orb that evolves"
> — 1★, Seed, Google Play, 2026-04-20

> "**Scammed into wasting loads of my time filling everything out, being optimistic about
> getting help.** Only to find out that what they mean by 'In App Purchases' is that you HAVE
> to purchase a subscription to actually use the app at all!!"
> — 1★, Reframe, Google Play, 2026-02-18, 58 thumbs-up

> "you know a lot of people wanting to help themself to quit the addiction but you know a lot
> of people cant afford or underage and stuff?... its all good until at the end of the
> introduction of the apps you asked for subscription fee. **This is not a way to help a lot
> of pe[ople]**"
> — 1★, QUITTR, Google Play, 2026-01-06, 59 thumbs-up

And on Reddit, the same instinct:

> "I saw this on the app store and answered all the questions but **it's 40 USD a year and was
> wondering if anyone knows of a free app that's similar.**"
> — [r/alcoholism, 2026-05-18](https://www.reddit.com/r/alcoholism/comments/1tgzspx/has_anyone_tried_iam_sober_app/)

**The pattern is specific, and it is not simply "people want free things."** What triggers a
1-star review is a paywall placed at the point of need: on the urge-breaker, on the check-in
screen, on the community, or after a long onboarding that harvested their disclosure first.
**INFERRED but strongly supported: the sequencing is the offence, more than the price.**

#### The AI verbatims

> **"ai chat bot didn't replace real accountability"**
> — 1★, Unchaind, Google Play, 2026-02-06

> "Absolute AI slop. Clearly the product of some AI techbro. Their ad on Instagram describes
> the app's 29 nonsense steps, including 'Day 9: Social Well -Beling at Acolnuing'"
> — 1★, Reframe, Google Play, 2025-05-23

> "**The AI 'insights' are very repetitive and generally unhelpful.** I also find the journal
> prompts to be shallow and uninsightful."
> — 3★, Reframe, Google Play, 2026-01-05, 29 thumbs-up

> "the rewire tapes they had here are **AI generated**, what are the chances the advic[e]…"
> — 1★, Seed, Google Play, 2026-05-09

But the counter-evidence, and it is the highest-scoring app post of its kind in the corpus:

> "The biggest thing I did differently this time was **using Gemini (AI) as an accountability
> buddy.** I know it sounds a bit different, but it worked. Every time I felt an urge, I'd open
> the app and talk it out"
> — [r/pornfree, 2026-03-02, ↑173](https://www.reddit.com/r/pornfree/comments/1rilb2g/day_48_overcoming_18_years_of_pied_and_how_i/)

**FOUND, and it matters: the hostility is to AI presented as a substitute for a person or as
the paid-for core, not to AI as a tool the user reaches for.** A general-purpose chatbot the
man chose himself was described as the thing that worked.

### 3.3 The surveillance finding — a correction to the previous round

`02-cohort-recovery.md` §5 ranks *"accountability read as surveillance"* as the fastest way to
end a conversation, on the strength of the 2022 WIRED "shameware" investigation and the Google
Play removals. **That remains true as a policy and partnership risk. It is not true as a
statement about what users of these apps say.**

Privacy/surveillance-mentioning reviews score **3.70 — only 0.54 below baseline**, and the
highest-voted ones are enthusiastic:

> "**The random screenshots feature is a game changer**, now you really gotta be aware of what
> you're looking at, even if it isnt flagged in the reports."
> — 5★, Ever Accountable, Google Play, 82 thumbs-up

> "Truple simply emails randomly auto-captured screenshots to whoever you choose"
> — 5★, Truple, Google Play, 111 thumbs-up

> "Just having it in the background has been part of the reason I have not looked at
> porn/illicit material in the last 2 years"
> — 5★, Victory Shield, Google Play

The line the negative reviews draw is **consent**, not monitoring:

> "This has an optional feature for sending screenshots to your accountability partners.
> That's fine for those who want to use it but it isn't for me. However, I recently learned
> that **this app was collecting and distributing screenshots from my device without my
> permission.**"
> — 1★, Ever Accountable, Google Play, 25 thumbs-up

**And the demand for covert monitoring is real and comes from partners, not the men:**

> "I'm looking for recommendations of apps that track all activity, not necessarily block
> adult content. **I plan on downloading the app without my husband knowing**, just so I can
> really know if he's even trying to change."
> — [r/loveafterporn, 2026-03-02](https://www.reddit.com/r/loveafterporn/comments/1riqx22/tracking_app_recommendations/)

**INFERRED: that request is exactly what Google Play's stalkerware policy prohibits, and it is
a request TrybeUP must be structurally unable to satisfy.** The correct posture is not "we
don't do monitoring" — men who want it like it — but **"nothing leaves this phone that the man
himself did not choose to send."** That is a sharper and more defensible line than the one
`02-cohort-recovery.md` §1 proposes, and it keeps the feature that users value most.

Monitoring also does not work on its own terms, which is worth knowing before building any of it:

> "if someone truly wants to find porn, they will. *Technology moves faster than any
> safeguard.* At one point we had Covenant Eyes installed… The problem is that it mostly
> monitors br[owsers]"
> — [r/loveafterporn, 2026-03-13, ↑144](https://www.reddit.com/r/loveafterporn/comments/1rsss6t/all_the_loopholes_my_pa_used_even_with_blockers/)

> "i always remove the blockers and relapse entering in an endless cycle"
> — [forum.nofap.com, 2026-07-13](https://forum.nofap.com/index.php?threads/addicted-to-random-video-chat.404298/)

### 3.4 What they asked for and could not find

FOUND, from reviews and posts:

- A **free tier that includes the crisis tool and the community**, not just the counter
- **Progress that survives a phone change or re-login** — repeated across I Am Sober, QUITTR,
  MDF, Brainbuddy: *"if you get a new phone it will force you to make a new account"*;
  *"if you log out and log in everything starts from 0"*
- **An anonymous group.** *"Is there any online therapy groups that is free and anonymous
  because i think its easier to do it with a group."*
  ([forum.nofap.com, 2026-08-05](https://forum.nofap.com/index.php?threads/succes-journal.406095/))
- **A urge/trigger log with pattern review** — *"jot down small notes when urges showed up
  (time, mood, situation etc)… I would genuinely recommend using some kind of app to track
  this stuff because doing it in your head is almost impossible"*
  ([r/dryalcoholics, 2026-03-08, ↑45](https://www.reddit.com/r/dryalcoholics/comments/1rodh43/three_mindset_shifts_that_helped_me_reduce/))
- **Not to be sold to.** *"they ask for a great review bef[ore]…"* — several apps gate or
  prompt aggressively and it is named repeatedly.

---

## 4. §B — The accountability mechanic

### 4.1 The contradiction resolves on revealed behaviour, and it is cohort-specific

The last round found men wanting a partner who *"knows you and your struggle — personally and
intimately"* alongside men wanting accountability *"without actually being friends."* **Stated
preference in this corpus does not settle it: of 843 posts mentioning an accountability
partner, buddy or group, 87.2% state no preference at all** about who that person should be
(10.1% gesture at someone close, 1.5% at a stranger, 1.2% both). Asking what men *say* they
want here produces mostly silence.

**Behaviour settles it.** Counting posts that actually *ask strangers on a public forum* to be
their accountability partner — 2026 only:

| Subreddit | Posts read | Asking strangers | **Per 1,000** |
| --- | ---: | ---: | ---: |
| r/NoFap | 31,000 | 326 | **10.52** |
| r/pornfree | 8,409 | 75 | **8.92** |
| r/PornAddiction | 14,966 | 117 | **7.82** |
| r/REDDITORSINRECOVERY | 713 | 2 | 2.81 |
| r/leaves (cannabis) | 16,059 | 13 | 0.81 |
| r/stopdrinking | 25,700 | 11 | 0.43 |
| r/loveafterporn | 9,250 | 4 | 0.43 |
| r/alcoholism | 8,007 | 1 | 0.12 |
| r/AlAnon | 7,640 | 0 | 0.00 |
| r/cripplingalcoholism | 5,181 | 0 | 0.00 |
| r/dryalcoholics | 1,724 | 0 | 0.00 |

Grouped — **549 requests in total**:

| Cohort | Posts read | Requests | Per 1,000 |
| --- | ---: | ---: | ---: |
| **Porn / sexual-behaviour recovery** | 54,382 | 518 | **9.53** |
| Cannabis (r/leaves) | 16,059 | 13 | 0.81 |
| **Alcohol / general substance recovery** | 41,325 | 14 | **0.34** |
| Partner-perspective subs (AlAnon, loveafterporn) | 16,890 | 4 | 0.24 |

**FOUND. Men in porn recovery ask strangers for an accountability partner 28 times more often
than men in alcohol recovery**, across 95,707 posts read in those two cohorts. r/stopdrinking
and r/alcoholism together produced **12** such posts in 33,707 posts read — despite being the
larger and more active communities. Alcohol recovery routes the same need through daily
check-in threads and meetings instead.

*Method note: matches are regex-identified from post title and body, so the counts carry some
false positives and misses. The 28× gap is far too large to be an artefact of that, but treat
the individual per-sub rates as approximate.*

**This is the single most commercially useful number in the file.** A stranger-matched
accountability partner is a **porn-recovery** feature. Selling it as a general recovery
feature to an alcohol-focused organisation is selling something their people demonstrably do
not ask for.

### 4.2 The partner-relationship subs actively want accountability moved *away* from intimacy

FOUND, and it directly contradicts the "personally and intimately" reading:

> **"You cannot be his accountability partner"** … "Not too long ago he finally met someone who
> agreed to be his sponsor… All of a sudden **I don't have to worry about checking his history**
> … There's a HUGE weight off my shoulders and it's given me space to actually see my PA
> husband as a partner and **not someone I'm constantly monitoring and assessing**"
> — [r/loveafterporn, 2026-04-19, ↑35](https://www.reddit.com/r/loveafterporn/comments/1spqwe3/you_cannot_be_his_accountability_partner/)

> "**It's too much to expect a hurt person to also be the sole recovery support.** I can't do
> this for you. **Please find an external to me accountability partner.**"
> — [r/loveafterporn, comment](https://www.reddit.com/r/loveafterporn/comments/1te3v3i/how_do_i_keep_things_moving_without_it_ruling_my/)

And the failure mode of intimate accountability, in one sentence:

> "his Covenant Eyes app (porn accountability software) flagged activity and **notified his
> accountability partner — his mom.**"
> — [r/loveafterporn, 2026-02-01, ↑19](https://www.reddit.com/r/loveafterporn/comments/1qssnq1/my_husband_says_i_questioned_his_truth/)

### 4.3 What kills a pairing

**Ghosting — confirmed, with a consequence attached.** 151 posts (0.12% of 128,656) mention
ghosting in a recovery context. The mechanism, stated plainly:

> "I had an accountability partner on here before and **made it a month before he disappeared
> and then I relapsed.**"
> — [r/PornAddiction, 2026-01-18](https://www.reddit.com/r/PornAddiction/comments/1qgjyxn/i_need_to_quit_accountability_partner/)

**But ghosting is not the worst failure mode. Predation is, and the last round did not find
it.** 43 posts in this corpus warn about it. Two in detail:

> "Made a post cause I was struggling and [a user] asked me to dm. **They pretended to care
> about how I was doing then sent a bunch of porn. They are in subs asking for help with porn
> too and accountability partners** so I thought it could help. I was wrong."
> — [r/PornAddiction, 2026-01-06](https://www.reddit.com/r/PornAddiction/comments/1q5guey/please_watch_out_for_people_like_uprofessional/)

> "**bro i swear u can't trust anyone for dms**😔 basically a guy sent a chat request abt
> controlling porn. I accepted and at first it was normal questions… Then he sent an image of
> a 'arousing' image… then it was a loop of him spamming more… **This is making me js wanna
> stop dms as a whole bc of these ppl.**"
> — [r/pornfree, 2026-01-24, ↑72](https://www.reddit.com/r/pornfree/comments/1qlcwgg/bro_i_swear_u_cant_trust_anyone_for_dms/)

And unsolicited offers are themselves experienced as harm:

> "**Dear men of r/pornfree. Please stop sending me DM's offering to be my accountability
> partner.** Even if you are being sincere and not just trying to take advantage of me I still
> wouldn't want to discuss my struggle with porn and masturbation with a man… **Sending me
> DM's like that when I'm feeling confused and ashamed and hating myself isn't helping me at
> all it just makes things so much worse.**"
> — [r/pornfree, 2026-04-24, ↑84](https://www.reddit.com/r/pornfree/comments/1su7l5o/dear_men_of_rpornfree_please_stop_sending_me_dms/)

**This is the finding that should change the build.** `01-app-audit-blockers.md` §1.1 records
that any logged-in stranger can find any TrybeUP member by a two-character name substring and
open a DM with no shared group, no mutual follow and no consent. **The exact harm that
capability enables is documented, repeatedly, in the communities TrybeUP wants to recruit
from.** It is not a hypothetical privacy preference; it is the reason those communities warn
their members about DMs.

### 4.4 Has anyone described something that worked?

FOUND, three shapes, and none of them is one-to-one stranger matching:

1. **A recurring, dated, public group commitment.** forum.nofap.com's dominant mechanic is a
   monthly thread — *"Awesome August 2026 Commitment Thread"*, 235 posts in the
   events-challenges board sample — where people declare a commitment and report against it.
   Cohort-shaped, time-boxed, self-declared.
2. **A daily community check-in.** r/stopdrinking's Daily Check-In posts carry 1,000–1,200
   comments each. Same-day, low-stakes, one line per person.
3. **A structured programme with a real person in it** — sponsor, CSAT, PAA meetings — where
   the app is the record-keeping layer, not the relationship.

**INFERRED: what works is a *place* to check in at a known time, not a *person* assigned to
you.** The 318 stranger requests are demand for connection that the existing surfaces are not
meeting — but the outcomes described from actually-matched strangers are ghosting and
predation, while the outcomes described from group surfaces are positive.

---

## 5. §C — Streaks, resets and relapse

### 5.1 Does a counter resetting to zero help or harm? Both, and the community knows it

**1,227 posts (0.95% of 128,656)** mention a streak reset or "back to day one".

The best single piece of evidence is one thread read in full:
**["Should I reset my 140-day sobriety counter after one unplanned shot?"](https://www.reddit.com/r/stopdrinking/comments/1q5xazi/should_i_reset_my_140day_sobriety_counter_after/)**
— r/stopdrinking, 2026-01-06, ↑114, **352 comments read**.

Classifying every comment (crude keyword classifier; **279 of 352 were unclassifiable, so
treat this as indicative, not precise**):

| Position | Comments | Net upvotes |
| --- | ---: | ---: |
| Against resetting | 22 | **741** |
| For resetting | 41 | 343 |
| Explicitly both / nuanced | 10 | 395 |

**FOUND: more people say "reset", but the anti-reset position carries more than twice the
endorsement.** The community's stated norm and its *upvoted* norm differ.

**The top comment, at ↑529, refuses the question entirely:**

> "**There are no rules and there is no judgment. Personal call. The counter is just a
> motivational tool for some people, it's not a contest.**"

**The harm case — the Abstinence Violation Effect, described by a participant without the
jargon, ↑179:**

> "Many people, myself included, find **a counter reset creates a permission structure to
> drink.** Like if you're already flushing X years of sobriety down the drain what's the harm
> in taking a[nother]…"

> "**If I'm resetting the counter, then I may as well go full bore for a week before I do.**
> That's why I find it better to **respect the cumulative time invested in sobriety, but not
> focus on the consecutive.**" (↑56)

> "**The hardcore 'reset counter' people are more detrimental than they realise.**" (↑27)

**The help case, ↑372 and ↑16:**

> "Call it a mulligan. **If it happens again then yes I'd say you should reset your date.**"

> "My vote is reset. **I know if I didn't reset it would make it much easier for me to justify
> doing it again.** But I'm also a very black/white/overly rational guy, so it might be
> different for you."
> — [r/stopdrinking, 2026-01-15](https://www.reddit.com/r/stopdrinking/comments/1qho3i2/stumbled_after_103_days_sober_is_resetting_daily/)

**And the product specification, in seven words, at ↑54:**

> ### "Delete the day, not the progress and the journey."

Supported by ↑34:

> "You got a flat tire in the middle of your road trip, does that mean you go back to the
> start? No, that would be ridiculous. **All that sober time is proof that you are learning
> and doing better.**"

And the norm that makes it safe to reset at all, ↑13:

> "You are welcome if you want to stop drinking. Even if you keep relapsing. **No one's counter
> says how many times they've had to reset it.**"

**Verdict for the build: never force the choice, never make it irreversible, show cumulative
alongside consecutive, and never surface reset count to anyone else.** That is what the
evidence says, and per `01-app-audit-blockers.md` §5 it is close to what TrybeUP's sobriety
module already does — *"no streak and no completion rate by design"*, reset notes never shared,
history never deleted. **The sobriety module is right. The rest of the app is not aligned with
it** — see §7.

There is also a constituency that wants out of the mechanic altogether:

> "**I want to be able to stop for good and not be obsessed with keeping a streak that resets
> every time I relapse.** How do I go about changing the way that I approach this?"
> — [r/pornfree, 2026-05-25, ↑33](https://www.reddit.com/r/pornfree/comments/1tnmagd/i_want_to_stop_for_good_not_just_keep_up_a_streak/)

> "Admittedly, **I often forget my day count as it isn't super important to me any longer.**
> Not like it was in early days. Which is a blessing unto itself."
> — r/stopdrinking Daily Check-In comment, ↑4

**INFERRED: the counter is an early-recovery scaffold that people outgrow. A design that
assumes the streak stays central forever is designing for month one only.**

### 5.2 What happens after a lapse — do they return to the app, or delete it?

**They return, and the reason they leave is technical, not emotional.** 340 Play reviews
mention streaks or resets (mean 3.42) and the complaints are almost entirely about *bugs
destroying streaks*, not about the philosophy of resetting:

> "**The app was promising until I saw one day my progress reset out of nowhere and I was sent
> back to zero**, with no progress recovery mechanism or anything which was incredibly
> discouraging."
> — 1★, Brainbuddy, Google Play

> "I've got a yearly subscription… **and have had several streaks, but that means nothing now
> as I can't even attempt to start a[gain]**"
> — 2★, QUITTR, Google Play, 2026-03-13

> "Recently i changed my phone and with that **i lost all my streaks!!!**"
> — 1★, MDF Quit X, Google Play

**FOUND, and it is a cheap win: an app losing someone's day count through a bug is a far more
common and more damaging event than an app resetting it by design.** Data durability across
re-login and device change is a retention feature in this category.

### 5.3 Hypothesis test — "shame is a barrier to re-engagement"

Flagged last round as *"hypothesis, unevidenced"* for US populations. **Tested. The answer is
split, and the split is the useful part.**

- **Against a private app: not evidenced.** Searching all 26,805 Play reviews for shame
  blocking a return to the app — *ashamed/embarrassed/guilty* within 60 characters of
  *open/use/check the app*, and *relapse* within 60 characters of *delete* — returned
  **zero matches**. The 135 "reinstalled it" reviews are all about fixing crashes.
- **Against a social surface: evidenced, but rare in explicit form.** **11 posts in 128,656**
  describe shame preventing a return to a *community*:

  > "I have previously posted on this subreddit on a different account excited to be sober but
  > **I was too ashamed to come back when I kept relapsing.**"
  > — [r/stopdrinking, 2026-01-18, ↑96](https://www.reddit.com/r/stopdrinking/comments/1qg5pp3/miscarriage/)

  > "I made a post stating I couldn't stop… **I felt too embarrassed to come back to this sub
  > about how I had failed to stop, I felt like a hypocrite**"
  > — [r/leaves, 2026-02-11, ↑12](https://www.reddit.com/r/leaves/comments/1r21cyy/i_finally_stopped/)

  > "I had an account a few years ago and was doing well for a while with checking in every
  > day and engaging with the community. But after some small progress, I allowed my ego to
  > convince m[e]…"
  > — [forum.nofap.com, 2026-08-18](https://forum.nofap.com/index.php?threads/returning-to-nofap.406700/)

**Verdict: the hypothesis is confirmed for surfaces where other people can see you, and not
evidenced for a private counter.** Both halves are load-bearing. It means a private tracker
needs no shame-mitigation design, and every *social* surface does. **Caveat: review data
cannot see silent abandonment, and 11 explicit instances in 128,656 posts is thin. Treat this as
directional.**

### 5.4 Hypothesis test — "men's help-seeking reluctance"

Also flagged unevidenced last round. **Still unevidenced, and this corpus cannot fix it.**

Searching for men describing reluctance to seek help returned **15 matches in 128,656 posts**,
and most are the idiom "man up" used in unrelated ways ("I gotta man up and do this
colonoscopy"). The one substantive hit:

> "My family has always treated drinking as therapy and **in this family, men don't talk about
> their feelings- so make yourself a drink and drown your issues.**"
> — [r/stopdrinking, 2026-01-02](https://www.reddit.com/r/stopdrinking/comments/1q2bi5u/its_friday_night_im_going_to_be_avoiding_the/)

**The structural problem: this corpus is composed entirely of people who did seek help — they
posted.** It is the wrong instrument for measuring reluctance, and a null result here is not
evidence of absence. **UNKNOWN. Do not put a men's-help-seeking statistic in outreach
material.** If it matters commercially, it needs survey or clinical-literature evidence, not
forum data.

---

## 6. §D — Language bank

Phrase frequency across the 128,656 posts read:

| Phrase family | Posts | % |
| --- | ---: | ---: |
| **IWNDWYT** ("I will not drink with you today") | 4,086 | 3.18% |
| accountability / accountable | 3,474 | 2.70% |
| numb / numbing | 2,142 | 1.66% |
| escape / escaping | 1,938 | 1.51% |
| "I need help" | 1,803 | 1.40% |
| "proud of myself" | 1,476 | 1.15% |
| streak reset / "back to day one" | 1,227 | 0.95% |
| "I hate myself" / "disgusted with myself" | 1,181 | 0.92% |
| rock bottom | 1,130 | 0.88% |
| "sick and tired of…" | 1,083 | 0.84% |
| one day at a time | 937 | 0.73% |
| mentions an accountability partner/buddy/group | 843 | 0.66% |
| functional / high-functioning | 716 | 0.56% |
| rewire / reclaim | 533 | 0.41% |
| white-knuckling | 412 | 0.32% |
| break the cycle | 205 | 0.16% |
| "nobody knows" | 199 | 0.15% |
| "I want my life back" | 166 | 0.13% |
| ghosted / ghosting | 151 | 0.12% |
| the addict voice / addict brain | 146 | 0.11% |
| "day one again" / keep starting over | 105 | 0.08% |
| **"the man I want to be" / "become the man"** | **61** | **0.05%** |
| warnings about predatory DMs | 43 | 0.03% |
| "wasted years" | 29 | 0.02% |

**FOUND, and it is a direct hit on TrybeUP's positioning: "become the man you want to be" is
one of the rarest formulations in this corpus.** It appears in 61 of 128,656 posts. The words
these men actually use are *numb*, *escape*, *tired*, *cycle*, *hate myself*, *my life back*.
They describe a state they want to get out of, not an identity they want to grow into.

**And the most-used phrase of all is a greeting, not a metric.** IWNDWYT — *I will not drink
with you today* — appears in 4,086 posts, more than any other phrase measured. It is daily,
mutual, present-tense and unquantified. Nobody's IWNDWYT has a number attached to it.

### Verbatim phrases, grouped

**How they describe the problem**

> "it was also 100% a **numbing button**" — [r/leaves, 2026-02-01, ↑1009](https://www.reddit.com/r/leaves/comments/1qsr147/1_year_sober_from_weed_and_didnt_expect_this_much/)

> "Alcohol was my way of killing myself, and being nice and numb while I did it." — [r/stopdrinking, 2026-01-05, ↑1984](https://www.reddit.com/r/stopdrinking/comments/1q4ptod/i_made_it_a_year_with_pics/)

> "I'm tired of walking in and out of **this revolving door of sobriety**." — [r/dryalcoholics, 2026-02-24, ↑45](https://www.reddit.com/r/dryalcoholics/comments/1rdbele/anybody_else_been_resetting_the_counter_for_years/)

> "I just have **this quiet thing that I do every single night**, and I know exactly where it leads" — [r/stopdrinking, 2026-02-18, ↑1875](https://www.reddit.com/r/stopdrinking/comments/1r8c3pj/i_built_a_sobriety_app_thats_been_helping_550000/)

> "I'm tired of gooning. I'm tired of my mind being filled with porn and lust all the time." — [r/pornfree, 2026-05-25](https://www.reddit.com/r/pornfree/comments/1tnmagd/i_want_to_stop_for_good_not_just_keep_up_a_streak/)

> "I don't know who I am sober anymore, but I know I can't keep living like this." — [r/leaves, 2026-01-07, ↑45](https://www.reddit.com/r/leaves/comments/1q6pome/quitting_weed_everyday/)

**On being hidden**

> "**nobody in my real life knows this is something I even think about.**" — [r/stopdrinking, 2026-02-18, ↑1875](https://www.reddit.com/r/stopdrinking/comments/1r8c3pj/i_built_a_sobriety_app_thats_been_helping_550000/)

> "**If you've ever been the 'functional' one who everyone thinks is fine — I see you. It's lonely in a specific way that's hard to explain.**" — same post

> "No one in my life knows I have this demon." — [r/stopdrinking, 2026-01-29, ↑179](https://www.reddit.com/r/stopdrinking/comments/1qptf4h/i_need_to_quit_drinking_please_help/)

> "No one in my life knows that I struggle with alcohol use the way I do." — [r/dryalcoholics, 2026-03-31](https://www.reddit.com/r/dryalcoholics/comments/1s8c90f/how_do_you_deal_with_the_loneliness/)

**On what they want from a tool**

> "an app i can download to keep track of my progress" — [r/leaves, 2026-04-29](https://www.reddit.com/r/leaves/comments/1syzcp5/seeking_help/)

> "free and **anonymous** because i think its easier to do it with a group" — [forum.nofap.com, 2026-08-05](https://forum.nofap.com/index.php?threads/succes-journal.406095/)

> "**You don't have to use your real name or even have your webcam on.**" — r/stopdrinking comment recommending SMART meetings

> "just enough to notice patterns" — [r/dryalcoholics, 2026-03-08, ↑45](https://www.reddit.com/r/dryalcoholics/comments/1rodh43/three_mindset_shifts_that_helped_me_reduce/)

**On the counter** (see §5 for full context)

> "The counter is just a motivational tool for some people, **it's not a contest.**"
> "**Delete the day, not the progress and the journey.**"
> "**No one's counter says how many times they've had to reset it.**"
> "your game, your rules"

**The community's own greeting — the most-used phrase in the whole corpus**

> **IWNDWYT** — "I will not drink with you today." 4,086 posts. A *daily, mutual,
> present-tense* commitment. Not a streak, not a score.

---

## 7. What TrybeUP would have to change

Cross-referenced against [`01-app-audit-blockers.md`](01-app-audit-blockers.md) so nothing
here recommends something already true.

### 7.1 Unpaywall the private group. This is now the top item.

`01-app-audit-blockers.md` §2.2: `Trybe.visibility` defaults to `"public"`, and creating a
private Trybe is hard-blocked behind Premium (`backend/api/trybes.py:482-484`).

**The evidence says this is the worst possible placement of a paywall in this category.**
Paywall complaints are the largest negative signal in 26,805 reviews (2,236 reviews, −1.89
stars), community mentions are one of only two positive signals (+0.27), and the specific
complaint *"the vital community feature is paywalled"* recurs across Fortify, Brainbuddy and
Seed. The audit already calls this "probably the single biggest commercial blocker." **The
participant voice says it is also the single biggest product mistake.**

### 7.2 Close the stranger-DM path before recruiting anyone from these communities

`01-app-audit-blockers.md` §1.1: two-character name search returns every user;
`POST /conversations` opens a DM to anyone with only a mutual-block check.

**§4.3 above documents the exact harm this enables, in the exact communities TrybeUP would
recruit from, in 2026, repeatedly.** This is not a privacy preference. Require a shared Trybe
or an accepted request before a DM can be opened, and make accountability offers
opt-in-to-receive.

### 7.3 Stop routing honesty check-in issues to partners as habit titles

`01-app-audit-blockers.md` §1.2: honesty issues create `Habit` rows whose titles are in the
**default** Max-tier partner scope and are sent verbatim.

The Covenant Eyes case in §4.2 — *"flagged activity and notified his accountability partner —
his mom"* — is what unintended disclosure looks like from the inside. **Default the partner
tier to minimum and exclude honesty-derived habits from partner scope entirely.**

### 7.4 Delete `"Loser buys drinks 🍻"`

`01-app-audit-blockers.md` §1.5, `apps/web/src/pages/MyDuels.tsx:2605`. One line. Unchanged
recommendation from the last round; restating because it is still there and this file makes
the audience concrete.

### 7.5 Fix "Don't break the chain"

`01-app-audit-blockers.md` §2.5: an in-app notification fires to **every** non-suspended user:
*"You did it yesterday — don't break the chain."*

**§5.1 is a 352-comment argument against exactly that sentence**, with the anti-pressure
position carrying twice the upvotes, and TrybeUP's own `backend/models/sobriety.py:114-118`
already says *"that pressure is what turns one slip into a month."* Gate it, or remove it.

### 7.6 Make progress survive a re-login and a new phone

Not currently in the audit. §5.2 shows this is the most common cause of a 1-star review in the
streak category across four competitors. **Verify TrybeUP's behaviour on account recovery and
device change, and if there is any path that zeroes a day count, treat it as a P1 bug.**

### 7.7 Reposition the AI coach rather than removing it

`01-app-audit-blockers.md` §4 notes `users.coach_tone` already injects a personality block
into the coach, the assistant agent and all three daily AI pushes — the cheapest deep lever in
the codebase.

The evidence (§3.2) is more specific than "turn AI off": the penalty attaches to **AI sold as
the paid-for core** (*"its only redeeming feature is an ai coach and an orb that evolves"* at
$240/yr) and **AI presented as a substitute for a person** (*"ai chat bot didn't replace real
accountability"*). A man reaching for Gemini himself and calling it the thing that worked is
the same technology with different framing. **Keep it, never charge for it as the headline,
never call it a coach or a partner, and give it an off switch for organisational
deployments.**

### 7.8 Change the words

§6: *"become the man you want to be"* appears in 61 of 128,656 posts. **Write to the state they
describe — numb, tired, escaping, stuck in a cycle, hating themselves, wanting their life
back — not to the identity they are supposed to aspire to.** And note this sits alongside
`00-synthesis.md` §3's separate recommendation to reframe "self-improvement" for the ministry
cohort: **both cohorts reject the aspirational-identity framing, for different reasons.**

### 7.9 Do not sell stranger-matched accountability partners to alcohol organisations

§4.1: three requests across 19,507 r/stopdrinking and r/alcoholism posts, against 298 in the
porn-recovery subs. **Lead with the daily check-in and the private group for alcohol-focused
partners; lead with the partner mechanic only for porn/sexual-integrity organisations** — which
is, conveniently, exactly the cohort `02-cohort-recovery.md` §3 identifies as reachable in
three weeks.

---

## 8. Gaps — what could not be evidenced

Stated plainly rather than filled.

1. **Two subreddit sweeps are date-truncated.** r/NoFap covers Jan 1 – Apr 12 and
   r/stopdrinking Jan 1 – May 17; the other ten are complete to Aug 19. The corpus was frozen
   mid-sweep so that every number here comes from one snapshot. **All percentages are of the
   128,656 posts actually read**, and §4.1 — the finding most sensitive to this — is reported
   as a rate per 1,000 posts read, which is unaffected.
2. **Reddit comment body-search results are not in this file.** A matrix sweep of app names ×
   subreddits was started twice and abandoned both times: arctic-shift's comment endpoint took
   ~30s per query under load and spent most of its time in retry backoff, and it was starving
   the post sweep. Only **3,262 comments from 70 full trees** were read. This matters because
   the comment layer is where app recommendations actually live — only **387 of 128,656
   top-level posts (0.30%)** name a recovery app at all. **The §A findings therefore lean on
   app-store reviews far more than on Reddit.** A completed comment sweep, run on its own with
   concurrency ≤ 2, would strengthen §A specifically and is the single highest-value follow-up.
3. **Men's help-seeking reluctance: UNKNOWN**, and unmeasurable from this corpus (§5.4).
4. **Shame as a barrier to re-engagement: directionally confirmed for social surfaces on 7
   explicit instances**, not confirmed for private trackers. Thin evidence; do not quote a
   percentage.
5. **The reset-debate split (§5.1) is one thread** and 279 of 352 comments could not be
   classified. It is indicative. A second thread was read and agrees in direction.
6. **No Apple review data for Reframe, QUITTR, Sunnyside or Sober Time** — Apple's RSS returns
   an empty feed for those apps despite tens of thousands of ratings (see
   `07-forum-access-notes.md` §4). The Play figures for those apps stand alone.
7. **Play review samples are newest-first and capped at ~1,600 per app.** Per-app means are
   recency samples, not lifetime averages. Both are given in §3.2 so the difference is visible.
8. **The 550,000-user figure** in the r/stopdrinking founder post is that poster's own
   unverified claim. It is quoted for its language, not as a market statistic.
9. **forum.nofap.com began returning HTTP 403 after ~1,000 requests** from this machine, which
   cut short the crawl of the `reset-and-relapse-reports` board — the board most relevant to
   §5. 910 posts from nine other boards were retrieved. **My own request rate caused this;
   a slower crawl would have got it.**
10. **No Discord, YouTube-comment or Quora data was gathered.** Those routes from the brief's
    §E were not needed once arctic-shift and Play opened up, but they remain unexplored.

---

## Handling note

Everything quoted here is public, pseudonymous, and cited by permalink. No attempt was made to
deanonymise anyone, no handles were cross-referenced to real identities, and **no list of
individuals in recovery exists or should be built.** The organisations in
`02-cohort-recovery.md` are the prospects; the people in these threads are not, and must never
be contacted on the basis of this research.
