# The gateway tool — how to offer one CBT technique without offering therapy

**Researched 2026-09-01.** Written for the founder and Misha, after the 2026-09-01 decision that
men's-group gatekeeper outreach is a dead end and the pitch moved to a private, offline
"gateway" app whose single mechanic is the CBT **behavioural experiment**: name a belief, predict,
test it in real life, record what actually happened, re-rate the belief.

Four research streams ran in parallel: the theory and structure of behavioural experiments; the
legal and ethical line between a tool and therapy; addiction-specific CBT and shame; and what
already exists. Claims are labelled **FOUND** (source read), **INFERRED** (reasoning) or
**UNKNOWN**, as in [`08-participant-voice-recovery.md`](08-participant-voice-recovery.md). Every FOUND claim carries a URL.

---

## 1. Verdict

**The idea is sound, it is buildable by amateurs without crossing any line, and the gap is real.
But it is a narrower product than the pitch, and the honesty it needs is specific.**

1. **The technique has a canonical published form, and it is a form.** The Bennett-Levy record
   sheet is six columns. Nothing in it needs a machine to write a sentence. **FOUND**
   https://www.get.gg/docs/BErecordsheet2010.pdf
2. **It targets one layer of the model, and the literature says which.** Behavioural experiments
   are for **conditional assumptions** ("If I say no, they'll be angry"), not core beliefs ("I am
   bad"). Padesky says so twice, and says core beliefs need scaffolding a solo tool cannot give.
   That is our clinical boundary and our safety boundary in one rule. **FOUND** §2
3. **The evidence is honest but modest.** Unguided self-help is measurably weaker than guided
   (effect-size gaps of 0.34 to 0.59 across 155 trials). Nobody may claim this tool works; we may
   say CBT works and that this is one of its tools. **FOUND** §3
4. **The line between a wellness tool and a medical device is drawn by wording, not by code.**
   In the UK a text-storing worksheet with fixed content is "low functionality" and not a device
   even if it touches mental health. In the US and EU the intended-purpose statement does all
   the work. The unsafe words are the obvious ones: *treats, reduces symptoms, for people with
   [diagnosis], digital CBT*. **FOUND** §5
5. **Nobody has built this.** Across 98 self-guided CBT apps and every named competitor, the only
   app whose whole product is the behavioural experiment is an unrated Exeter teaching aid for
   adolescents. A May 2025 post on r/CBT asking for exactly this tool got zero replies. **FOUND** §8
6. **Two things in the earlier brainstorm need correcting.** Browser storage on iPhone is
   deleted after seven days without use, so "a web page with no account" must become "a
   home-screen app with export", and the Capacitor wrap moves from later to early. And the
   recovery subreddits remove nearly every "I built an app" post; the ones that survive are free,
   personal, from a member, and un-monetised. **FOUND** §8, §9

---

## 2. What the tool is, in CBT's own terms

### 2.1 The three layers, and the one we touch

Beck's model has core beliefs ("I'm no good"), intermediate beliefs phrased as rules and
assumptions ("If I ask for help, people will see how incompetent I am"), and automatic thoughts.
**FOUND** Beck Institute conceptualisation form,
https://learn.beckinstitute.org/cms/delivery/media/MCPNPP5FFGJVDJ7C74SMXCMM5CWY

**Behavioural experiments are the tool for the middle layer.** Padesky (1994): conditional beliefs
"are often best tested through the use of behavioural experiments. Core beliefs are best suited to
the evaluation methods described here" (continua, data logs, historical tests). **FOUND**
https://www.padesky.com/wp-content/uploads/2012/11/schema_change_article_permissions.pdf
And as practice guidance: "behavioral experiments have the fastest impact on underlying
assumptions … the 'sharpest tool in the box'"; "Core beliefs shift very slowly". **FOUND**
https://www.padesky.com/usethe-sharpest-tool-in-the-box/

**Why this matters for a solo tool.** Padesky on core beliefs: a person whose only self-schema is
"I am bad" will look at a list of contrary evidence and say "Yes, I see this evidence, but I am
still bad." An alternative belief "must be developed before the client will be capable of looking
at the evidence." **FOUND** (1994 paper, above). **INFERRED:** a tool with no therapist must accept
only "If I ___, then ___" statements and refuse or reframe "I am ___". This is the single most
defensible design constraint we have, and it keeps us off the territory even therapists sequence
carefully.

### 2.2 The founder's own case fits the model exactly

The founder's belief was core ("I'm a bad person and must hide it"); the therapy did not attack it.
It tested the assumption sitting on top of it ("If I refuse a request, they'll see it") ten times
with banal requests, recording each outcome. That is the textbook shape: the core belief loses
power because the assumptions that carry it stop predicting reality. The tool reproduces the
part that was done in a notebook, not the part that was done by a therapist.

### 2.3 The record sheet, field by field

Every field below is sourced; none is invented.

| Field | Source |
| --- | --- |
| Belief being tested, rated 0–100 | Bennett-Levy 2010 sheet **FOUND** https://www.get.gg/docs/BErecordsheet2010.pdf |
| **Alternative belief**, rated 0–100 | CCI consumer sheet and Think CBT worksheet **FOUND** https://www.cci.health.wa.gov.au/-/media/CCI/Mental-Health-Professionals/Panic/Panic---Information-Sheets/Panic-Information-Sheet---06---Behavioural-Experiments-for-Negative-Predictions.pdf |
| The experiment: what, when, where, with whom, how long | CCI, above |
| Prediction, written so it can be checked | Bennett-Levy; Harvey procedure step 3 **FOUND** https://www.med.upenn.edu/cbti/assets/user-content/documents/Harvey_BehavioralExperiments.pdf |
| **What safety behaviour am I dropping?** | Clark & Wells: safety behaviours "reduce the individual's opportunity to disconfirm their negative beliefs" **FOUND** https://oxcadatresources.com/wp-content/uploads/2025/07/2025-leigh-clark-chiu.pdf |
| Likely problems and what I'll do | Harvey step 4; CCI "Identify likely problems and how to deal with them" |
| What actually happened (recorded the same day) | Harvey: late recording makes memories "vague and inaccurate … the learning would be greatly reduced" |
| What I learned | Bennett-Levy |
| Re-rate **both** beliefs | CCI; Think CBT |
| Next experiment, if the outcome was ambiguous | Harvey step 7 |

Two design points fall straight out of the sources:

- **Two beliefs, not one.** Every experiment adds a row of evidence to the *new* belief. Padesky &
  Mooney (2012): "it would be more effective to focus on construction of resilient beliefs and
  behaviours rather than the dismantling of beliefs." **FOUND**
  https://i-cbt.org.ua/wp-content/uploads/2017/11/strenght-based-CBT-padeski.pdf
  This is also the answer to the founder's identity fear (§4.3): the old self is not demolished,
  a new one accumulates evidence beside it.
- **The prediction is locked before the experiment.** Written-in-advance predictions shown beside
  the outcome are the only defence a therapist-less tool has against "it only worked because…".
  **INFERRED** from Padesky's discounting finding.

### 2.4 Two experiment types worth building as templates

- **The A/B run.** The same situation done twice, once with safety behaviours and self-focus, once
  without, predictions rated for both before starting. In one trial the "without" condition took
  fear-belief ratings from 66 to 25 (d = 2.49). Largest within-experiment effect found anywhere in
  this research. **FOUND** Leigh, Clark & Chiu 2025, oxcadatresources URL above.
- **The survey.** Observational rather than active: ask five people the question you fear the
  answer to. Bennett-Levy et al. list observational experiments as a first-class type. **FOUND**
  https://www.psychologytools.com/resource/behavioral-experiment

---

## 3. What the evidence lets us say

### 3.1 CBT self-help works less well without a person. Say so.

| Finding | Source |
| --- | --- |
| 155 RCTs, 15,191 people: individual, group, phone and **guided** self-help CBT do not differ from each other; all beat **unguided** self-help by SMD 0.34–0.59 | Cuijpers et al. 2019 **FOUND** https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2730724 |
| Self-guided vs control: d = 0.28 post, 0.23 at 4–12 months; dropout 5% to 45%; in one trial 38% never finished session one | Cuijpers 2011 **FOUND** https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0021274 |
| Guided self-help equals face-to-face (d = −0.02). Guidance is what closes the gap | **FOUND** https://www.cambridge.org/core/journals/psychological-medicine/article/is-guided-selfhelp-as-effective-as-facetoface-psychotherapy-for-depression-and-anxiety-disorders-a-systematic-review-and-metaanalysis-of-comparative-outcome-studies/4C7DA862B658641E1A648299A19186D1 |
| NICE recommends **guided** self-help for less severe depression; unguided is not a listed option | NG222 **FOUND** https://www.nice.org.uk/guidance/ng222/chapter/recommendations |
| Bibliotherapy with "Feeling Good" beat waiting list and held at three years, but with minimal contact, not zero | **FOUND** https://pubmed.ncbi.nlm.nih.gov/7673542/ · https://pubmed.ncbi.nlm.nih.gov/9086697/ |

**INFERRED:** "won't solve it, will help manage it, see a therapist to go the full way" is not a
polite disclaimer. It is what the numbers say. That is good news for an honest product: the
claim we want to make is the one the evidence supports.

### 3.2 Experiments vs thought records: real but soft. Do not market on it.

Bennett-Levy 2003 found experiments "perceived as more powerful and compelling" than thought
records, but on CBT trainees practising on themselves. **FOUND**
https://www.cambridge.org/core/journals/behavioural-and-cognitive-psychotherapy/article/abs/mechanisms-of-change-in-cognitive-therapy-the-case-of-automatic-thought-records-and-behavioural-experiments/3C86569BAE5E5B84D7E4195C2C4661A0
McManus, Van Doorn & Yiend 2012 (n=91, non-clinical) found *both* worked against control.
**FOUND** https://www.sciencedirect.com/science/article/abs/pii/S0005791611000668
McMillan & Lee 2010 review: "methodological limitations … prevented definitive conclusions".
**FOUND** https://www.ncbi.nlm.nih.gov/books/NBK79820/

### 3.3 The one encouraging analogue

"Mindable", an unguided app with behavioural experiments as its core mechanic, n=33, no control:
large pre-post effects, and **the number of experiments completed moderated improvement**.
**FOUND** https://cpe.psychopen.eu/index.php/cpe/article/view/15687
**INFERRED:** the product metric is completed experiments, not opens or streaks.

### 3.4 What single techniques do on their own

Component analysis of 76 internet-CBT trials: behavioural activation helps, relaxation may harm,
cognitive restructuring added nothing measurable, and combining human and automated encouragement
cut dropout (OR 0.32). **FOUND**
https://www.thelancet.com/journals/lanpsy/article/PIIS2215-0366(21)00077-8/abstract
A megastudy of twelve single-session digital interventions (N=7,505): nearly all helped
immediately, only two still did at four weeks. **FOUND** https://pmc.ncbi.nlm.nih.gov/articles/PMC12408015/
**INFERRED:** a behavioural experiment is a *behavioural* technique that happens to carry a belief
rating, which puts it on the right side of that component finding. And the "human encouragement
cuts dropout" line is the argument for the bridge to Trybes.

---

## 4. Shame, addiction and identity: how the prompts must be phrased

### 4.1 Beck's addiction model gives us the belief vocabulary

Three acute belief types drive use: **anticipatory** ("a drink will make this bearable"),
**relief-oriented** ("porn is the only thing that switches my head off"), **permissive** ("I've
had a hard week, I've earned it"). **FOUND** https://pubmed.ncbi.nlm.nih.gov/8289917/ ·
https://beckinstitute.org/blog/treating-substance-misuse-disorders-with-cbt/
**UNKNOWN:** the addiction texts' own list of core beliefs beneath these could not be read. The
founder's "surface habit is a symptom" is the model's *structure*, not a quotable claim.

### 4.2 Never experiment with the substance. This is a standard rule, not our invention.

Marlatt's taxonomy of high-risk situations names **"test of personal control"** as a relapse
trigger in its own right. **FOUND** https://pmc.ncbi.nlm.nih.gov/articles/PMC4080483/
"I'll have one to prove I can stop" is, in Marlatt's terms, a named trigger, and it carries the
worst possible **abstinence violation effect** profile: if it fails, the attribution is "I really
am weak". **FOUND** https://pmc.ncbi.nlm.nih.gov/articles/PMC6760427/
Controlled-drinking work exists (Sobell & Sobell) but is clinician-matched on severity, history
and support. **FOUND** https://www.addiction-ssa.org/features/blog/dangerous-data-drinking-after-dependence-part-6-evidence-accumulates-and-expert-opinion-converges/
**INFERRED:** a lay tool cannot do that matching. **"Only ever experiment with the belief around
the habit, never with the habit itself" is defensible, conservative, and must be enforced in the
product, not just stated.** The urge-tolerance belief is tested by *timing* an urge that arrives,
never by provoking one (VA "urge surfing"). **FOUND**
https://www.vetsrecovery.org/wp-content/uploads/2023/09/CBT-SUD-Therapist-Manual-2023-Rev.-ed-508-compressed.pdf

### 4.3 Shame: disputation lands as another judgement

- Shame-proneness predicts substance *problems*; guilt-proneness protects. **FOUND** Dearing,
  Stuewig & Tangney 2005, https://pubmed.ncbi.nlm.nih.gov/16022935/
- Luoma's meta-analysis: shame predicts use over hours-to-days, not months. **The danger zone is
  the day after a slip.** **FOUND** https://jasonluoma.com/wp-content/uploads/sites/23/2019/03/2019-shame-and-substance-use-review-preprint_3-6-19.pdf
- In Luoma's RCT, *fast* shame reduction in treatment-as-usual predicted *more* use later; the
  acceptance-based group had smaller immediate gains and better outcomes at four months. **FOUND**
  https://pmc.ncbi.nlm.nih.gov/articles/PMC5067156/
- Gilbert on why compassion-focused therapy exists: clients "could grasp, on a logical level, that
  their self-critical thoughts were irrational. Yet, they couldn't feel any different inside."
  **FOUND** https://self-compassion.org/wp-content/uploads/publications/GilbertCFT.pdf

**INFERRED, and converging from three directions: never use the word "irrational". Frame the
belief as understandable ("this belief has been protecting something"). Phrase outcomes as
observations, not verdicts. On a slip, use Marlatt's lapse-not-relapse language and Neff's "what
would you say to a friend", never a re-rate that punishes.**

### 4.4 The identity fear is real and has a named answer

- Young's schema therapy: coping styles are surrender, avoidance and overcompensation; avoidance
  includes "emotional numbing, distraction, substance use"; the styles "reinforce the very schemas
  they were meant to alleviate". **FOUND** https://en.wikipedia.org/wiki/Schema_therapy
  The founder's "coping built into the personality" is this, in the literature's own words:
  the substance is avoidance, people-pleasing is surrender, anger and using friends are
  overcompensation.
- Best et al.'s Social Identity Model of Recovery: recovery is "socially negotiated identity
  transition", a new identity built, not the old one argued away. **FOUND**
  https://research.monash.edu/en/publications/overcoming-alcohol-and-other-drug-addiction-as-a-process-of-socia-3/
- Padesky's answer is the two-column worksheet and the **positive data log**: "a daily log of all
  observations that are consistent with a new, more adaptive schema". **FOUND** (1994 paper).

**INFERRED:** "Who am I without this?" is answered by accumulation, not argument. The tool should
show the new belief's evidence log growing. That is also the screenshot for the ad.

---

## 5. The line between a tool and therapy: it is drawn in words

### 5.1 US

Software "for maintaining or encouraging a healthy lifestyle and … unrelated to the diagnosis,
cure, mitigation, prevention, or treatment of a disease" is not a device by statute. **FOUND**
https://www.law.cornell.edu/uscode/text/21/360j
FDA's general wellness policy (revised January 2026, two-factor test unchanged): allowed topics
include "relaxation or stress management … self-esteem"; allowed example: an app that "may help
living well with anxiety"; **not** allowed: "a claim that a product helps treat an anxiety
disorder". Products must not reference "specific diseases, clinical conditions, or diagnostic
thresholds". **FOUND** https://www.cov.com/en/news-and-insights/insights/2026/01/fda-issues-revised-guidance-on-general-wellness-products
· https://dimesociety.org/wp-content/uploads/General-Wellness-Low-Risk-Digital-Health-Products_DiMe_RegPath.pdf

**Illinois (August 2025)** bans offering "therapy or psychotherapy services" without a licence,
defined as services "to diagnose, treat or improve an individual's mental or behavioral health",
with an explicit exemption for "self-help materials and educational resources that are available
to the public and do not purport to offer therapy". Up to $10,000 per violation. **FOUND**
https://www.orrick.com/en/Insights/2025/08/Illinois-Enacts-Law-Regulating-AI-with-Sweeping-Implications-for-Behavioral-Health-Delivery
**INFERRED:** a no-AI worksheet sits squarely inside the exemption. **Avoid the phrase "improve
your mental health" in marketing**; it is inside the Illinois definition.

### 5.2 UK: the "low functionality" gate is our friend

MHRA's 2025 digital mental health guidance has two gates. A product has a *medical purpose* if it
targets "symptoms of depression", "low mood" or "worrying" in a way that could include diagnosable
people, and **including a PHQ-9 or GAD-7 infers medical purpose on its own**. But
"medical purpose + low functionality = not SaMD", where low functionality is: stores data without
change; communicates it without change; "processes user instruction to show fixed content in a
similar manner to a user choosing a chapter in a digital book"; or does "an easily verifiable
calculation". **FOUND**
https://assets.publishing.service.gov.uk/media/6866572fadfe29730ea3a9d5/MHRA_guidance_on_DMHT_-_Device_characterisation_regulatory_qualification_and_classification.pdf
Also: "General disclaimers … are not acceptable if medical claims are made or implied elsewhere";
"testimonials are considered to be implied claims". **FOUND**
https://assets.publishing.service.gov.uk/media/64a7d22d7a4c230013bba33c/Medical_device_stand-alone_software_including_apps__including_IVDMDs_.pdf

**INFERRED, and this settles the AI question on legal grounds as well as trust grounds:** a
worksheet that stores text, shows a fixed belief library the user browses, and subtracts one 0–100
rating from another is low functionality and not a device even on a strict reading. **The moment
it adapts, personalises, scores a questionnaire, or picks the experiment for you, it is not.** A
fixed library the user chooses from is a chapter in a book. A system that chooses for them is
not.

### 5.3 EU

MDR Recital 19 excludes "life-style and well-being" software; qualification depends on the
manufacturer's intended purpose; there is no low-functionality escape hatch, so the wording does
all the work. **FOUND** https://eur-lex.europa.eu/legal-content/EU/TXT/HTML/?uri=CELEX:32017R0745
· https://health.ec.europa.eu/system/files/2020-09/md_mdcg_2019_11_guidance_en_0.pdf

### 5.4 Safe and unsafe wording (INFERRED from all three regimes)

| Safe | Unsafe |
| --- | --- |
| "helps you test unhelpful beliefs in everyday life" | "treats anxiety", "reduces symptoms of depression" |
| "one worksheet from cognitive behavioural therapy" | "digital CBT", "self-guided therapy", "CBT app" |
| "for everyday stress, worry and self-doubt" | "for people with social anxiety disorder / PTSD" |
| "record what you predicted and what happened" | "tracks your anxiety over time" |
| "may help you build confidence" | "prevents depression", "improves your mental health" |

Keep the purpose statement identical across app, website and every social post. MHRA's worked
example is a product that says "well-being" on its site and "reduces the risk of depression" on
social media: it must regulate or delete the claim.

### 5.5 App stores

- Apple 1.4.1: apps "should remind users to check with a doctor". 5.1.3: health data may not be
  used for advertising and "may not [be stored] in iCloud". **FOUND** https://developer.apple.com/app-store/review/guidelines/
- Google Play requires a disclaimer that the app "is not a medical device and does not diagnose,
  treat, cure, or prevent any medical condition" and a reminder to consult a professional.
  **FOUND** https://support.google.com/googleplay/android-developer/answer/12261419
- Apple's privacy label: "Data that is processed only on device is not 'collected' and does not
  need to be disclosed." **"Data Not Collected" is achievable only with zero analytics, crash
  reporting or third-party SDKs.** **FOUND** https://developer.apple.com/app-store/app-privacy-details/
  One CBT app already carries it: Exeter's *CBT Behavioural Experiments*. **FOUND**
  https://apps.apple.com/us/app/cbt-behavioural-experiments/id1552898592

### 5.6 Intellectual property: write everything fresh

None of the big worksheet sources is free to adapt into an app: CCI, Getselfhelp, Therapist Aid,
Psychology Tools and Beck Institute all restrict reproduction beyond personal or clinical use.
**FOUND** https://www.cci.health.wa.gov.au/Utilities/Copyright-and-Disclaimer ·
https://www.getselfhelp.co.uk/legal-information/ · https://www.therapistaid.com/terms ·
https://www.psychologytools.com/terms-and-conditions/ · https://beckinstitute.org/permission-to-use-beck-institute-materials/
The five-step *method* is not protected expression. Copy no headings, prompts or examples;
write our own. "CBT" is generic (UNKNOWN: no registry search succeeded; no owner found).
"MOODGYM" and "THIS WAY UP" are registered marks. "CBT therapist" is not a protected title in
the UK, but "practitioner psychologist" and similar are, and implying registration is a criminal
offence. **FOUND** https://babcp.com/careers-jobs/careers-in-cbt/ · https://www.hcpc-uk.org/concerns/what-we-investigate/misuse-of-title/
**INFERRED:** describe the tool, never ourselves.

### 5.7 Enforcement precedent: privacy promises must be literally true

BetterHelp paid $7.8M for sharing questionnaire data with Facebook "despite promising consumers"
otherwise; Cerebral $7M; Lumosity $2M for efficacy claims without "competent and reliable
scientific evidence". **FOUND** https://www.ftc.gov/news-events/news/press-releases/2023/07/ftc-gives-final-approval-order-banning-betterhelp-sharing-sensitive-health-data-advertising
· https://www.ftc.gov/news-events/news/press-releases/2016/01/lumosity-pay-2-million-settle-ftc-deceptive-advertising-charges-its-brain-training-program
**INFERRED:** "nothing leaves the device" with a crash reporter in the bundle is the BetterHelp
shape in miniature. Ship nothing that phones home.

---

## 6. Safe lanes for an unguided tool

Drawn from CCI, NHS inform and NICE, which already hand some of these to lay users unsupervised
and explicitly withhold others.

| Lane | Status | Why |
| --- | --- | --- |
| Social anxiety, assertiveness, people-pleasing, perfectionism | **Green** | CCI's consumer modules teach lay users to build a stepladder and run experiments alone **FOUND** https://www.cci.health.wa.gov.au/-/media/CCI/Consumer-Modules/Stepping-out-of-Social-Anxiety/Stepping-out-of-Social-Anxiety---Module-4---Behavioural-Experiment-Stepladders.pdf |
| Urge tolerance, tested by timing an urge that arrives | **Green** | VA manual, §4.2 |
| Mild health worry, sleep habits, rest and productivity rules | **Green** | CCI perfectionism module **FOUND** https://www.cci.health.wa.gov.au/~/media/CCI/Consumer-Modules/Perfectionism-in-Perspective/Perfectionism-in-Perspective---07---Adjusting-unhelpful-rules-and-assumptions.pdf |
| Panic and body sensations | **Blocked** | Interoceptive exposure is contraindicated without medical clearance for cardiac, respiratory, pregnancy, epilepsy **FOUND** https://www.scienceworkshealth.com/post/interoceptive-exposure-panic-disorder |
| Reassurance-seeking loops | **Blocked** | Turns into checking; one-off observation only |
| The substance or compulsion itself | **Blocked** | Marlatt, §4.2 |
| OCD, PTSD, eating disorders, self-harm, suicidality | **Redirect** | Even NICE's lightest OCD and PTSD options are therapist-touched **FOUND** https://www.ocduk.org/overcoming-ocd/nice-guidelines-for-the-treatment-of-ocd/ · https://www.ncbi.nlm.nih.gov/books/NBK542453/ |

Exclusion criteria in a real unguided-CBT trial: active suicidality, bipolar, psychosis,
drug or alcohol *dependence*, and anyone currently in therapy or on psychiatric medication.
**FOUND** https://pmc.ncbi.nlm.nih.gov/articles/PMC12465736/
**INFERRED:** the "not for you right now" list in §10 is that list, in plain words. Note the
tension with the audience: someone *dependent* on alcohol is outside the lane; someone drinking
more than they want to, hiding it, and not yet dependent is the person the tool is for. The
copy has to make that distinction without a questionnaire (§5.2 forbids one).

**Crisis signposting for an offline app (INFERRED):** hard-code 988 (US), Samaritans 116 123 (UK
and Ireland), "your local emergency number", and a link to findahelpline.com, which lists verified
free helplines in over 175 countries. No live geolocation. **FOUND** https://988lifeline.org/ ·
https://www.samaritans.org/how-we-can-help/contact-samaritan/ · https://findahelpline.com/about

---

## 7. The belief library: fifteen candidates

Each is a conditional assumption that plausibly sits under the listed behaviours, testable with an
everyday experiment that never involves the substance or compulsion. Fixed content the user
browses (§5.2), written fresh (§5.6). Sources in the addiction stream's report; the CBT lanes are
CCI's.

| # | Belief | Experiment | Record |
| --- | --- | --- | --- |
| 1 | If I say no without an excuse, people will think I'm selfish | Decline one small request with "No, I can't this time" | Their words, tone, the relationship a week later |
| 2 | If I show I'm struggling, people will think less of me | Tell one trusted person one true, minor difficulty | What they said; did they pull away |
| 3 | If I'm not the funny one, nobody will want me around | One evening listening and asking, no jokes | Who talked to you; were you invited back |
| 4 | If I feel bored or anxious, I can't sit with it without doing something | 10-minute timer, do nothing, rate discomfort every 2 minutes | Peak, time to peak, time to fall |
| 5 | If I don't drink at a social event, people will notice and ask | Attend with a soft drink, count comments | Number of comments, who made them |
| 6 | If I can't have my usual relief tonight, tomorrow will be unbearable | One ordinary evening, a planned alternative, rate the morning | Mood 0–10 next day vs prediction |
| 7 | If I ask for help, I'll be a burden | Ask one person for one small concrete favour | Their response; did they mention it later |
| 8 | If I tell my partner I'm angry calmly, it will turn into a fight | One annoyance in one sentence, no raised voice | How it ended within 30 minutes |
| 9 | If I let someone else pay, drive or decide, they'll resent me | Accept help once without repaying immediately | Any sign of resentment over a week |
| 10 | If I stop doing favours, my friends will drift | Skip one habitual favour for a fortnight | Contact frequency before and after |
| 11 | If I make a mistake at work, it will be held against me | Admit one small error openly | What was actually said |
| 12 | If I rest instead of being productive, I'm worthless | One planned 2-hour rest; rate "worth" before and after | Ratings; what actually happened |
| 13 | If I go to bed without my usual wind-down, I won't sleep | A fixed alternative for three nights | Time to sleep, wake quality |
| 14 | If I'm honest that I'm cutting back, people will lecture or pity me | Tell one person, one sentence, no explanation | Their reply; your pity rating 0–10 |
| 15 | If I don't check my phone tonight, I'll miss something that matters | One evening offline; list what was missed in the morning | Actual missed items |

The prompt rule across all fifteen: every prompt records observations and re-rates two beliefs.
None asks "was your belief irrational?"

---

## 8. What exists, and the gap

| App | Experiment first-class? | Account | Cost | Status |
| --- | --- | --- | --- | --- |
| CBT Behavioural Experiments (Univ. of Exeter) | **Yes, whole product** | UNKNOWN | Free | Unrated; for adolescents "alongside a practitioner"; label "Data Not Collected" **FOUND** https://apps.apple.com/us/app/cbt-behavioural-experiments/id1552898592 |
| MindShift CBT (Anxiety Canada) | One tool among many | Yes | Free | **Orphaned**: Anxiety Canada ceased operations 2025 **FOUND** https://www.anxietycanada.com/resources/mindshift-cbt/ |
| CopingCard | One of ~10 tools | Email required; collects location | $9.99/mo | 3.4★ on 5 ratings; "totally broken" **FOUND** https://apps.apple.com/us/app/copingcard-cbt-mental-health/id1612621383 |
| Quirk → FreeCBT | No (thought record only) | No | Free | Open source; company died, app survived **FOUND** https://github.com/Flaque/quirk · https://github.com/erosson/freecbt |
| Woebot | No | Yes | — | Consumer app shut 30 June 2025 **FOUND** https://www.statnews.com/2025/07/02/woebot-therapy-chatbot-shuts-down-founder-says-ai-moving-faster-than-regulators/ |
| Bloom, Sanvello, Moodnotes, Wysa, Unwindly | No | Mostly yes | Mostly paid | — |

Across 98 self-guided CBT apps: 68% require a login, 82% of privacy policies disclose third-party
sharing, and behavioural experiments were not counted as a separate feature at all. **FOUND**
https://www.ebi.ac.uk/europepmc/webservices/rest/PMC8367167/fullTextXML

**The demand signal, in one post:** r/CBT, May 2025, "Is there any app for android that has
worksheets for behavioral experiments … It would be nice to be able to do them on the phone
instead of on paper." Zero replies. **FOUND** https://reddit.com/r/CBT/comments/1kzwxm0/behavioral_experiment_worksheet_app/

**Gap verdict (INFERRED): no free, no-account, offline, adult-facing app whose whole product is the
behavioural experiment exists.**

**Trust precedent that worked.** Quirk's pitch: "Thoughts are more valuable than passwords, treat
them that way"; storing locally "because it's the correct engineering decision". The fork lives on
at 4.7★ with reviews saying "No subscriptions. No annoying content." **FOUND** (above). Daylio:
no account, local only, optional backup to the user's own iCloud or Drive, 61,000 ratings.
**FOUND** https://daylio.net/faq/docs/daylio-faq/about/how-secure-is-my-data/

---

## 9. Two corrections to the earlier brainstorm

### 9.1 Browser storage is not safe enough on iPhone

Safari deletes all script-writable storage for a site with no user interaction for seven days.
Home-screen installed web apps are exempt, and `navigator.storage.persist()` is granted by
heuristics "like whether the website is opened as a Home Screen Web App". **FOUND**
https://webkit.org/blog/14403/updates-to-storage-policy/ ·
https://www.itnews.com.au/news/apple-cops-flak-for-deleting-local-browser-storage-after-7-days-539833
Quirk's own first principle: the app "must not lose user data, since the entire point of the app is
to record your thoughts". **FOUND** https://github.com/Flaque/quirk

**INFERRED, and it changes the plan:** "a web page, no account" becomes "install it to your home
screen, and export is one tap". The Capacitor wrap moves from *later* to *early*, because on iOS
a real app is the only storage that does not evaporate, and it is also the thing that earns the
"Data Not Collected" label. A user who runs three experiments over a month and finds them gone
has been harmed by the privacy design.

### 9.2 Proving it is local, in ways a suspicious person can check

- A Content-Security-Policy header of `connect-src 'none'` blocks every outbound request, and
  violations print in the browser console. **FOUND** https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/connect-src
- The "do not take our word for it" pattern: a VERIFY page with falsifiable claims and
  instructions to open the network tab. **FOUND** https://github.com/LifetimeLabsDev/PrivacyNotes.app
- The airplane-mode test is already how reviewers verify offline journals. **FOUND**
  https://getdailyvox.com/blog/best-offline-journal-app
- Off Grid hit #1 on Hacker News with the framing "Airplane mode, working". **FOUND**
  https://dev.to/alichherawalla/from-personal-frustration-to-1-on-hacker-news-how-i-built-off-grid-and-hit-425-stars-4989

### 9.3 Distribution: the subreddits remove almost everything

From the Arctic Shift archive of Reddit, which preserves removal status:

- r/stopdrinking has "zero tolerance for any kind of personal or commercial promotion". A
  138-upvote "I built the app I needed on day one" post was removed; commenters guessed why:
  "because you have to pay for it". A free-app post was removed under the promotion rule, first
  comment "Another AI post". **FOUND** https://reddit.com/r/stopdrinking/comments/1tskiiz/ ·
  https://reddit.com/r/stopdrinking/comments/1v2df17/
- r/NoFap removed at least nine "I built an app" posts between March and July 2026. The one that
  survived: "a free anonymous app for when urges hit at night", web, no download, no account,
  30 upvotes, "this is actually genius concept". **FOUND** https://reddit.com/r/NoFap/comments/1r8ofrj/
- r/socialanxiety removed a 14-months-of-work app post. **FOUND** https://reddit.com/r/socialanxiety/comments/1tfayfp/
- The mechanic *is* known there: "What to do if the behavioral experiment comes true?" on
  r/socialanxiety, top reply "Did the world end?" **FOUND** https://reddit.com/r/socialanxiety/comments/1aszr31/

**INFERRED pattern:** survivors are free, story-first, from a member, no paywall, no AI. The
lowest-risk entry is a reply on someone else's request, and r/CBT has one waiting. Posting the
product is the second move, not the first; being a member is the first.

---

## 10. Wording the app can carry verbatim

Drafted against §5 and §6. Every sentence is either required by a store, supported by the
evidence, or protective.

1. "This is a self-help worksheet, not therapy, and it is not a medical device. It does not
   diagnose, treat, cure or prevent any condition."
2. "It uses one technique from cognitive behavioural therapy (CBT), the behavioural experiment:
   write down a belief, predict what will happen, try it, record what actually happened, and rate
   the belief again."
3. "It can help you manage everyday worry and unhelpful beliefs. It will not solve them, and it is
   not a substitute for working with a qualified CBT therapist. If you can see one, please do."
4. "It is not for you right now if you are having thoughts of suicide or self-harm, have been told
   you have psychosis or bipolar disorder, have an eating disorder, PTSD or OCD, or are dependent on
   alcohol or drugs. Those need a person, not an app."
5. "If you are already in therapy, follow your therapist's plan. Use this only if they agree."
6. "Choose experiments that are safe and legal. Never design one that involves the habit you're
   trying to change, self-harm, restricting food, or putting yourself or anyone else at risk."
7. "If you are in danger or in crisis, call your local emergency number. In the US, call or text
   988. In the UK and Ireland, call Samaritans free on 116 123. Elsewhere, findahelpline.com lists
   free helplines in over 175 countries."
8. "Everything you write stays on this device. There is no account, no server, and nothing is sent
   to us or anyone else. If you delete the app without exporting, your entries are gone."
9. "This was made by the people behind TrybeUP, not by a clinician or a health service. Nothing in
   it is medical advice, and using it does not create a therapist–client relationship."

---

## 11. What this means for the product

1. **The record sheet is the product.** Ten fields (§2.3), two beliefs, prediction locked before the
   experiment, outcome recorded the same day, both beliefs re-rated.
2. **Conditional statements only.** "If ___, then ___" is accepted; "I am ___" is reframed at the
   door. This is the clinical boundary, the safety boundary and the legal boundary at once.
3. **Fixed content, no adaptation.** A belief library the user browses is a chapter in a book. A
   system that picks for them is a device. No AI, no questionnaire, no score, no personalisation.
4. **The habit itself is never the experiment.** Enforced, not just stated: the library has no
   such template and the copy says why.
5. **Prompts observe, never judge.** No "irrational". A slip is a lapse, not a relapse, and the
   re-rate after a slip is optional.
6. **Show the new belief's evidence growing.** That log is both the mechanism (Padesky) and the ad.
7. **Home-screen install and one-tap export from day one; native wrap early.** Browser storage
   alone will lose people's work on iPhone.
8. **Nothing phones home.** No analytics, no crash reporter. The "Data Not Collected" label and the
   airplane-mode test are the trust proof, and both fail the moment one SDK is added.
9. **The metric is completed experiments** (Mindable), not opens, streaks or days.
10. **Say what it is, in the words in §10.** The honest claim is the evidenced one.
11. **The bridge to TrybeUP is the "human encouragement" the evidence says cuts dropout.** It only
    works if the door it leads to is not a paywall after onboarding (`08` §7.1, still unchanged on
    production).

---

## 12. What could not be evidenced

1. The Oxford Guide (Bennett-Levy et al. 2004) itself is paywalled; its field set was read via
   the author's own freely distributed 2010 sheet and three derivative worksheets that cite it.
2. The addiction texts' own list of core beliefs beneath addictive behaviour could not be read.
3. No head-to-head trial of disputational vs compassionate framing in addiction was found.
4. No source states "never experiment with the substance" in those words; it is a synthesis of
   Marlatt's "test of personal control" category and the AVE literature.
5. The January 2026 FDA guidance text itself was not readable (fda.gov blocks fetches); the
   two law-firm summaries agree the test is unchanged.
6. No trademark registry search succeeded for "CBT".
7. Subreddit rule text for r/socialanxiety, r/Anxiety, r/CBT, r/leaves and r/pornfree was
   unfetchable; the removal pattern is observed from the archive, not from the rules.
8. Whether MindShift's listing still works after Anxiety Canada's closure is unknown; one report
   read the listing as live, one read the closure notice.

---

## Handling note

This file is the authority for the gateway tool's clinical, legal and ethical shape. It does not
decide whether to build it, what to call it, or how it bridges to TrybeUP. Those are the
founder's and Misha's, and the open questions are: (a) the name and the visible lineage to
TrybeUP; (b) whether the first version is web-plus-home-screen or native from day one, given §9.1;
(c) whether TrybeUP's free tier is fixed before the bridge is built, given §11 item 11.
