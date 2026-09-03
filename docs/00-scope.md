# Betr — scope for the gateway product

**Written 2026-09-01.** After the founder and Misha judged men's-group outreach a dead end, and
after four prototypes in one afternoon. This is the scope for the product the fourth one
became. **The name is Betr** (read "better"): you bet on what will happen, and it makes you
better. Founder's call, 2026-09-01. What remains open about it is in Q1.

**Authorities this scope rests on.** The clinical, legal and ethical shape is settled in
[`research/10-cbt-gateway-approach.md`](research/10-cbt-gateway-approach.md)
and is not re-argued here. The audience evidence is
[`research/08-participant-voice-recovery.md`](research/08-participant-voice-recovery.md).
The prototype is [`../prototype/index.html`](../prototype/index.html) (four taps and one sentence).

**Open questions are marked `Q#` and collected in §9.** They are the founder's and Misha's to
answer. Nothing in §9 is a build blocker for a prototype; several are blockers for a release.

---

## 1. What it is, in one paragraph

A free thing on your phone. One big button: *Pick a worry.* You pick one of a short list of
worries about how people will react ("saying no without an excuse", "asking for help"). It hands
you a one-line test to do today, already written, and what you probably expect to happen,
already written. You tap *I'll do it today.* You go and do it. You come back, type one sentence
about what happened, and tap one of four words for how sure you still are. It shows you your
expectation with a line through it, what actually happened underneath, and that belief coming
down a ten-rung ladder test by test — and offers the same test again tomorrow. No account. No
server. No AI. Nothing leaves the phone.

**What it is, clinically:** the CBT behavioural experiment, and only that, run against
conditional assumptions in the social-anxiety, assertiveness and perfectionism lanes. The
record sheet is filled in underneath; the person never sees it as a sheet.

**What it is, commercially:** the top of the funnel for TrybeUP, reaching the people who will
never join a group or email a gatekeeper: those hiding a private shame who might try something
that looks this simple and this private. The bridge to TrybeUP is deliberate, visible, and
never automatic (§6).

## 2. What it is not

- **Not therapy, not a medical device, not "digital CBT".** It carries the nine sentences in
  the research file §10 verbatim, and its purpose statement is identical everywhere it appears.
- **Not a habit tracker, not a sobriety counter, not a journal.** TrybeUP already is those.
- **Not adaptive.** It never scores, personalises, or picks for you. A fixed list you choose
  from is a chapter in a book; a system that chooses for you is a device (research §5.2).
- **Not a chatbot.** Two prototypes went that way and both read as "an AI that wants your
  secrets". The final shape has no conversation and no free text until after the test is done.
- **Not for the substance itself.** No test anywhere in it involves the drink, the screen or
  the habit. That is structural: there is no free-text test field in v1 (Q3 changes this).
- **Not a metrics product.** It sends nothing, so we learn nothing from it directly (Q7).
- **Not part of the First 100 sprint.** It cannot produce attributable signups by 11 September.

## 3. The interface, as decided today

Six screens. Four taps and one sentence for a full loop.

| # | Screen | What's on it | Taps |
| --- | --- | --- | --- |
| 1 | **Start** | Headline *Sure it'll go badly?*, one big button *Pick a worry*, one small line: no account, no AI, nothing leaves your phone. Small links: *your worries*, *what this is*. | 1 |
| 2 | **Pick** | The stock list as big buttons, plain words. One line at the bottom saying what is deliberately absent. | 1 |
| 3 | **Test** | *Today:* the one-line test. The safety behaviour to drop, in bold. *What you expect:* pre-written, with *not quite? change it*. One big button *I'll do it today*. | 1 |
| 4 | **Locked** | *Go and do it.* The test repeated. One big button *Done it. Here's what happened.* Small: *Didn't get to it* · *Pick a different one*. | 1 |
| 5 | **Happened** | One text box. *Just what they said or did. No verdict.* | typing |
| 6 | **Sure?** | The belief, quoted, and the rung it is on now. Four buttons: still sure / a bit less / a lot less / not at all. Small, underneath: *more sure than before*. | 1 |
| 7 | **Result** | Expectation struck through. What happened in marker. **The ladder for this belief**, started → now. Big number of tests done. *Do it again tomorrow* · *Different worry*. | — |
| 8 | **Your worries** | One card per belief tested: its ladder, what you wrote each time, *Test this again*. Nothing combined across cards. | 1 |

**Why these choices hold (each is from the research):**

- **Pre-written expectation.** The prediction must be locked before the test and shown
  beside the outcome afterwards. Pre-writing it removes the one step people stall on, and
  *change it* keeps it theirs.
- **The safety behaviour in bold.** Clark and Wells: without dropping it, the person learns the
  crutch saved them, not that the worry was wrong. It is the sentence that makes the test count.
- **"No verdict" on the outcome box.** Observations, not judgements; never "irrational".
- **Four words instead of a 0–100 slider, moving a 1–10 ladder.** The 0–100 scale was the
  single most "learn this first" element of every earlier prototype, so the tap stays four
  words. *Amended 2026-09-02:* the words are relative ("a bit less sure"), so each one now
  moves the belief along a ten-rung ladder from where it already was, instead of writing a
  fixed number. Everything starts at 10 — that is what the front screen says — and nothing
  goes below 1. Founder's own CBT used 1–10 and watching it fall is what kept them going.
  Research §11.6: "show the new belief's evidence growing" is the mechanism and the ad.
- **A fifth, quiet option: *more sure than before*.** A test can go badly and leave someone
  more convinced. A ladder that can only fall is a nicer story than the person's week. It is
  available and deliberately not prominent, in the place *didn't get to it* sits.
- **The word is *worry*, never *fear*.** Founder, 2026-09-02: fear sounds scary. "Worry" is
  already the word in the nine sentences ("manage everyday worry").
- **"Do it again tomorrow" as the primary action.** Mindable found the number of completed
  experiments predicted improvement; CCI says one run "might convince yourself it was luck".
  The product metric is completed tests, never days or streaks.
- **No streak, no red day, no "you missed".** *Didn't get to it* answers "it's still here for
  tomorrow, smaller counts too."

## 4. Decisions carried over from the research (locked)

1. **Conditional beliefs only.** Every stock item is "If I ___, then ___". A custom entry, if
   allowed (Q3), is reframed at the door if it starts "I am".
2. **Fixed content.** No AI, no questionnaire, no score, no personalisation, no recommendation
   engine. Search or filter over the list is fine (MDCG: "simple search" is not device-making).
3. **The nine sentences** in research §10, verbatim, behind *what this is*. Google Play
   requires the "not a medical device" one; Apple requires the "check with a doctor" one.
4. **Crisis lines hard-coded:** 988, Samaritans 116 123, local emergency number, findahelpline.com.
5. **Nothing phones home.** No analytics, no crash reporter, no fonts from a CDN, no third-party
   SDK. This is what earns Apple's *Data Not Collected* label and it fails on the first SDK.
6. **Home-screen install and one-tap export from day one; native wrap early.** iPhone Safari
   evicts a web page's storage after seven days without use. A person who loses three tests
   has been harmed by the privacy design.
7. **Visible lineage.** "Made by the people behind TrybeUP" in the small print from the first
   build. Hidden ownership discovered later is the exact betrayal this audience is braced for.
8. **Every worksheet phrase written fresh.** No CCI, Getselfhelp, Therapist Aid, Psychology
   Tools or Beck Institute wording (all restrict reuse).
9. **The phrase "improve your mental health" never appears.** It sits inside the Illinois
   definition of therapy services.

## 5. The stock list

This is the product. The interface is four taps; the list is what those taps land on.

### 5.1 The twelve

**Superseded 2026-09-03 by B1.** The table below is the prototype's wording and is kept
here only as the record of what the twelve *are* — the situations, the lanes and the order,
which have not changed. **The live words are `web/content/worries.js` and nowhere else.**
Every one of them was rewritten fresh on 2026-09-03; two are worth knowing about here:
*Not drinking at a social thing* is now labelled **Being the only one not joining in**
(Q2d's own reasoning, put on the button), and *rest*'s belief ends "then I'm being lazy"
rather than "I'm worthless". Misha and the CBT reviewer have not read any of it yet.


| Label (what the button says) | Belief underneath | Test, today | Drop |
| --- | --- | --- | --- |
| Saying no without an excuse | If I say no without an excuse, people will think I'm selfish | Say "No, I can't this time" to one small request | Explaining. Apologising |
| Asking for help | If I ask for help, I'll be a burden | Ask one person one small, specific favour | "Sorry to bother you" |
| Admitting I'm struggling | If I show I'm struggling, people will think less of me | Tell one trusted person one true, small hard thing | "But I'm fine" |
| Not being the funny one | If I'm not the funny one, nobody will want me around | One evening: listen and ask. No jokes | Filling silences |
| Not drinking at a social thing | If I don't drink, people will notice and ask | Go with a soft drink; count comments | Holding a drink as a prop |
| Saying I'm annoyed, calmly | If I say I'm annoyed calmly, it'll turn into a fight | One annoyance, one sentence, then stop | Raising voice; a second thing |
| Owning a mistake at work | If I admit a mistake, it'll be held against me | Tell someone about one small mistake before they find it | Burying it in excuses |
| Resting when there's stuff to do | If I rest instead of being productive, I'm worthless | A planned two-hour rest | "Just quickly" one task |
| Sitting with a bad feeling | If I feel bored or anxious, I can't sit with it | 10-minute timer, do nothing, notice the peak | Picking up the phone |
| An evening off my phone | If I don't check tonight, I'll miss something that matters | Phone in a drawer from 8pm; list what you missed | Checking "just once" |
| Skipping a favour I always do | If I stop doing favours, my friends will drift | Skip one; see if anyone mentions it | Offering unasked |
| Saying I'm cutting back | If I say I'm cutting back, people will lecture or pity me | Tell one person, one sentence, change the subject | Explaining why |

### 5.2 Rules any item must pass

Every item, stock or custom, has six parts, and all six must be present:

1. **A label in plain words**, as the button text, describing the *situation* not the diagnosis.
2. **A conditional belief**, "If I ___, then ___", about how people react or how it will feel.
3. **A default expectation**, one sentence, the thing the person is braced for.
4. **A test doable today**, one line, cheap, legal, reversible, and in the person's control.
5. **A safety behaviour to drop**, one line. Without it the item is not a behavioural experiment.
6. **Nothing that touches the habit itself.** No test involves the drink, the screen, the
   substance, food restriction, body sensations, checking rituals, or anyone's safety.

Lanes allowed: social anxiety, assertiveness and people-pleasing, perfectionism, urge tolerance
by *timing* an urge that arrives, rest and productivity rules, mild sleep habits. Lanes refused:
panic and body sensations, reassurance loops, OCD, trauma, eating, self-harm (research §6).

### 5.3 What the list has to decide — Q2

**Q2a. Route by worry, or route by what's going on?** Today the list is worries. The founder's
thesis is that the surface problem (drinking, porn, anger at home, taking advantage of friends)
sits on top of these worries. An alternative entry screen: *What's going on?* with six or seven
surface problems, each opening the three or four worries that most often sit under it. Pros:
meets the person where they think they are; the ad can say "drinking more than you want to?".
Cons: naming a surface problem on the first screen is closer to the regulatory line ("for people
with…") and may feel like a diagnosis at the door. **Recommendation:** worries on the first screen,
and a second, optional entry point *Not sure which? Start from what's going on* that maps
surface problems to worries. Wording of the surface problems needs the safe/unsafe table applied.

**Q2b. How many?** Twelve is a screen and a half on a phone. Twenty is a scroll. Research says
"simple" beats everything; more choice is not more value. Proposal: ten to twelve visible,
the rest behind *more*.

**Q2c. Order.** By how common, by how easy, or by lane? The first three items get most of the
taps. Proposal: easiest and most universal first (saying no, asking for help, admitting
struggling), so the first test succeeds.

**Q2d. Which items are wrong for the audience?** "Not drinking at a social thing" is on the
list because the worry is about *other people noticing*, not about the drink; the test involves
attending sober, which is the standard CBT experiment for it. Misha should say whether it reads
as a substance test to a person in early recovery. If in doubt, it comes out.

**Q2e. Who writes the items and who checks them?** Every phrase must be fresh. Proposal:
Richard drafts from his own history and the research §7 candidates; a CBT-trained reviewer
reads the list once for lane and wording (a few hundred pounds; not a clinical endorsement and
never described as one).

### 5.4 Custom entries — Q3

The founder wants people to be able to add their own. That reintroduces free text before the
test, and with it the two guards from the earlier prototypes:

- **If/then at the door.** "I am a bad person" is reframed: *That's a verdict, not a prediction.
  What do you think would happen because of it?*
- **The habit-word guard on the test.** A custom test mentioning drink, porn, weed, betting and
  so on is refused with the reason, not just warned.

Proposal: **not in v1.** Ship the fixed list, learn what people pick by asking them (Q7), then
add *Something else* as v1.1 with both guards. If custom is in v1, it goes at the bottom of the
list as *Something else*, never as the first screen.

## 6. How it relates to TrybeUP — Q4

The honest framing: Betr is a private, offline, no-account thing, and TrybeUP is a cloud
account with a community. The moment a person crosses from one to the other, the privacy
promise changes. That crossing must be explicit, optional and late.

**Decided:** lineage visible from day one (§4 item 7). The bridge sentence exists only behind
*what this is*: *This is for doing it alone. The people who made it also make TrybeUP, where
the same thing is done in small private groups. Only if and when you want that.*

**Q4a. When, if ever, does Betr mention TrybeUP unprompted?** Options: never (only in the
small print); after a person's fifth completed test, once, dismissible; on the results screen
as a permanent small link. Recommendation: once, after five, with the exact words *When you
want to do this with people who don't know you*, and never again if dismissed.

**Q4b. What moves across?** The export is a JSON file. TrybeUP could import it into a
"work on" habit with the history intact. Whether a person even wants their worries in a cloud
account is not obvious; the research says what they want from a group is anonymity. Proposal:
the import exists, is one tap from the export screen, and is described as *copy* not *move*.
Betr keeps working after.

**Q4c. The prerequisite.** Research file 08 §7.1: TrybeUP's private groups are paywalled and
stranger DMs are free, "precisely backwards", and this is unchanged on production. Sending a
privacy-first person into a paywall after onboarding is the sequencing offence the reviews
punish hardest. **Recommendation: the bridge is not built until the free tier of TrybeUP is
fixed.** Betr can ship before that; the bridge cannot.

**Q4d. One brand or two?** Betr as a sub-brand ("Betr, by TrybeUP") or a sibling ("made by
the people behind TrybeUP"). Sibling is safer for trust and for the regulatory purpose
statement, which must not inherit TrybeUP's marketing copy (`Landing.tsx` still fronts the AI).

## 7. Trust: "how do I know this isn't feeding Amazon ads?" — Q5

This audience will not believe a privacy policy. They may believe things they can check.
The answer is architectural first and verbal second.

**Architectural (decided):**

- **No network, provably.** The web build ships a Content-Security-Policy header of
  `connect-src 'none'`; every outbound attempt is blocked and logged in the browser console.
  No fonts, images or scripts from a CDN either.
- **No SDKs.** No analytics, no crash reporting, no push, no ads, no "share" SDK.
- **Open source**, small enough to read in an evening. The company can die; the app survives
  (Quirk is the precedent).
- **Published build hash.** The served bundle's hash is printed on the *what this is* screen
  and in the repo, so anyone can check the page they loaded is the code they read.
- **Store labels.** Apple *Data Not Collected*; Google Play *No data collected*. Both are
  attestations we have to earn by shipping nothing that phones home.
- **The airplane-mode test**, printed on the screen: *Turn on airplane mode. Everything still
  works.*
- **Export and delete** always one tap away; the data is a file the person can read.

**Verbal (decided):** *Everything you write stays on this device. There is no account, no
server, and nothing is sent to us or anyone else.* That sentence must be literally true. A
crash reporter would make it the BetterHelp shape in miniature.

**Q5a. Hosting the web version.** A page load is the one thing a server ever sees. Options:
a static host with access logs off; GitHub Pages (logs are GitHub's); our own nginx with
logging disabled. Whichever it is, *what this is* should say: *Loading this page is the only
thing any server ever sees, and we keep no record of it.*

**Q5b. Should the web version exist at all, or only the store apps?** The web version is the
zero-friction entry the ad needs and the thing a Reddit reply can link to. The store apps are
what carry the privacy label. Recommendation: both, with the web page pushing *Add to Home
Screen* on first use.

**Q5c. Who is the data controller?** With no personal data processed, GDPR obligations are
minimal, but the store listing needs a legal entity and a contact. Whose?

## 8. Platform and build

- **Web first**, a single static bundle, installable to the home screen; `navigator.storage.persist()`
  requested on install; export prompt after the third result.
- **Capacitor wrap** as the second step, not the tenth, for the store label and durable storage
  on iOS. Optional backup to the person's *own* iCloud or Google Drive (Daylio pattern) — **Q6:**
  is that "leaving the phone"? It goes to the person's own account, never ours, and only when
  they tap it. Recommendation: yes, offered, off by default, described as *your iCloud, not us*.
- **Stack:** plain HTML, CSS and JavaScript, no framework, no build step, so the open-source claim
  is a folder anyone can read. **Lives in `web/` in this repo** (Q8, decided) and imports
  nothing from TrybeUP; the two never share a bundle, a domain or a cookie. **System fonts
  only**: the prototype loads Google Fonts, and v1 may not, because a font request is a request.
- **Size of v1:** the prototype is one file and already does the loop. A shippable v1 is the
  list finalised (§5), the guards, persistence, export, install prompt, *what this is*, the
  CSP header, and a store listing. Roughly a week of sessions once Q1–Q3 are answered.
- **Tests:** the guards (if/then, habit words), persistence and export get unit tests; the
  loop gets a journey in `USER_JOURNEYS.md` if it lives in this repo (Q8).

**Q8 — decided 2026-09-01, revised the same day: its own repo.** Founder's call, after first
choosing the TrybeUP repo. Betr lives at `github.com/richardosborne14/betr` (private for now;
open-sourcing is a release decision). The web app is `web/`, the Capacitor shell will be
`mobile/`, the docs are `docs/`. It shares nothing with the TrybeUP codebase: no bundle, no
domain, no cookie, no dependency. The TrybeUP repo keeps a one-file pointer at
`dev-docs/tasks/marketing-automation-phase/betr/README.md`. Task files: [`tasks/`](tasks/) B0–B7.

## 9. The open questions, collected

| # | Question | Blocks |
| --- | --- | --- |
| Q1 | **The name, Betr.** Needs a trademark and domain search (betr.app, getbetr.com). And a Misha read on one thing: "bet" lands differently for someone whose habit is gambling, and the prototype's habit-word guard currently blocks the word "bet" in tests. Decide whether the pun is used in copy ("Bet it goes badly?") or only in the name. | Release |
| Q2 | **The stock list.** *Answered 2026-09-02:* both doors (worries first, plus "start from what's going on"); twelve visible plus *Something else*; order as §5.1; "Not drinking at a social thing" stays, with its test reworded to contain no habit word. Who writes and reviews is unchanged and still open. The six surface-problem labels need Misha's sign-off before release. | Build — cleared |
| Q3 | **Custom entries.** *Answered 2026-09-02:* in v1, as the last button, three screens of one box each, with both guards. | Build — cleared |
| Q4 | **The TrybeUP bridge**: when it's mentioned, what moves across, whether the free tier is fixed first, one brand or two. | Release of the bridge only |
| Q5 | **Trust**: hosting and logs, web and store or store only, data controller. | Release |
| Q6 | **Own-cloud backup** offered or not. | v1.1 |
| Q7 | **How we learn anything with zero telemetry.** Options: nothing but store download counts; a *tell us* link that opens an email the person writes; asking in the communities. An opt-in "I did a test" ping breaks the promise and is off the table. | Strategy |
| Q8 | **Which repo.** Decided: its own, `richardosborne14/betr`, private for now. | — |
| Q9 | **Age gate.** Unguided self-help trials exclude under-18s; the stores will ask. 18+? | Release |
| Q10 | **The ad.** The results screen is the ad: expectation struck through, what happened in marker. Whose results? Richard's from his twenties, written as they'd appear. Needs Misha's read on tone. | Marketing |

## 10. What happens next

1. Founder and Misha answer Q1–Q3. Everything else can wait for a working v1.
2. The list gets written fresh and reviewed once (§5.3e).
3. v1 is built in `web/` from the prototype (B2), deployed to `betr.dev.trybeup.com` (B3).
4. It is posted as a reply, not a post, in the one place the research found an unanswered
   request for exactly this: r/CBT, May 2025. Then, as a member, in the recovery communities
   whose rules allow free tools with no paywall and no AI.
5. The bridge waits on Q4c.

**Confidence in this scope: 8/10.** The interface is validated by the founder's own reaction
across four iterations; the clinical and legal shape is sourced; the list is the unvalidated
part, and it is the part that matters most.
