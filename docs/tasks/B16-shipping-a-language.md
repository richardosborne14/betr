# B16: Shipping a language — the repeatable process, and which ones

**Status:** Not started. Written 2026-09-03. **Repeatable: once per language, forever.**
**Confidence:** —
**Date opened:** 2026-09-03
**Depends on:** **B17** (the country layer — no language ships before it) and B15. Also B1 —
translating placeholder words is work done twice.
**Where:** `web/content/strings-<code>.js`, `worries-<code>.js`, the store listings, and a
folder of things that are not code.

## Why this is its own task, and mostly not a coding task

Once B15 lands, adding a language is a few hours of engineering. It is **not** a few hours of
work. Three things make it heavier than it looks, and all three are safety, not polish:

1. **The crisis lines are per country, not per language.** 988 is the United States. Samaritans
   116 123 is the UK and Ireland. Spanish is spoken in twenty countries with twenty different
   numbers. A person in crisis shown a number that does not work where they are has been harmed
   by us. **This is now B17's job, and B17 comes before this task** — it builds the country
   layer once, in English, so every language inherits it. **No language ships until B17 has**,
   and each language records here a decision about helpline coverage in its main countries.
2. **The twelve worries are cultural, not just English.** "Saying no without an excuse",
   "Not being the funny one" and "Not drinking at a social thing" are assumptions about how
   people behave that do not survive the journey to every country that speaks a language.
   §5.2's six rules must be re-applied by someone who lives there. **A translator is not enough;
   this needs a native speaker with CBT training**, the same way B1's English list needs one
   (scope §5.3, Q2e). Some items will need replacing, not translating — that is a correct
   outcome, not a failure of the translation.
3. **A language ships into jurisdictions.** The Play sentence, Apple's 1.4.1 sentence and the
   phrases in rule 7 exist because of specific regulators. Shipping in German means the EU MDR
   framing gets read by someone in the EU. This needs a look before the first non-English
   listing, once, and then a checklist after that.

## Which languages, and why — a recommendation, not a decision

The founder's list on 2026-09-03 was: English, French, Spanish, Portuguese, German, Italian,
Russian, Chinese, Hindi, Japanese, Swahili, and asked what else counts as a lingua franca.

Speaker numbers below are total speakers, first and second language, rounded hard. They are the
right order of magnitude and not more than that.

### The two big omissions

- **Arabic (Modern Standard) — ~400m, 25 countries.** The most significant gap in the list. It
  is a genuine lingua franca across the whole of MENA, and no comparable private, free,
  no-account tool exists in it. It is also **the reason RTL is in B15** even though nothing RTL
  ships there. Caveat worth knowing: MSA is the written standard everyone reads, but nobody's
  mother tongue — plain, simple MSA is essential and a dialect is not the answer.
- **Indonesian — ~250m+.** A lingua franca that was *designed* to be one, deliberately easy,
  spanning a young country of 280m with very high smartphone use and very little competition in
  this space. Close enough to Malay to reach Malaysia with small changes. Probably the single
  best reach-per-hour on this entire list.

### If reach into Africa is a real goal

**Swahili (~80–150m)** is a correct instinct — a real East African lingua franca across
Tanzania, Kenya, Uganda and eastern DRC. Its natural pair is **Hausa (~80m)**, the equivalent
across northern Nigeria and Niger. French already covers much of West and Central Africa, and
Portuguese covers Angola and Mozambique, so those two plus Swahili and Hausa is most of the
continent's lingua-franca coverage.

### The suggested order

| Wave | Languages | Why |
| --- | --- | --- |
| **1** | Spanish, French, **Arabic**, Portuguese | Four languages, ~80 countries. The biggest reach per language on earth, and Arabic forces the RTL work while it is still cheap. |
| **2** | **Indonesian**, Hindi, Russian, German | Enormous single markets plus two more lingua francas (Russian across Central Asia and the Caucasus; German is not one but is a large, close, high-trust market). |
| **3** | Swahili, Japanese, Italian, and Urdu / Bengali / Turkish | Reach or strategy, chosen when there is evidence about who is actually using it. |

### The two on the list I would question

- **Chinese.** 1.1bn speakers, and by far the most complicated. Distributing in mainland China
  means an ICP filing, a licensed app store presence and a regulatory environment in which a
  privacy-first app that sends nothing anywhere is an awkward object rather than a selling
  point. **Shipping Traditional and Simplified for Taiwan, Hong Kong, Singapore and the diaspora
  is straightforward; mainland distribution is a separate project with its own decision.** Don't
  let the headline number pull it up the list.
- **Italian.** ~65m, essentially one high-income country with good English and good existing
  services. It is the weakest reach-per-hour on the founder's list. Worth doing eventually;
  worth doing after Indonesian and Arabic.

### Reach order and safety order are not the same order

The waves above are reach. Ranked instead by *how likely we are to get it right*, the order
changes, and the two things that move it are *how many countries a language spans* and *how well
those countries are served*:

- **Easiest to do safely:** German (three countries, strong services), Japanese (one), Portuguese
  (Brazil dominant and well served). The country layer has few branches and most of them are good.
- **Bigger, more branches, still fine:** Spanish (twenty countries, but the large ones are served),
  French (France, Belgium, Switzerland and Canada are strong; francophone Africa is much thinner —
  one language with two very different realities), Hindi, Indonesian, Russian.
- **Needs the most care:** Arabic — twenty-five countries with wildly varying provision, several
  with no service at all, and the stock list's own content is where it transfers least well.
  Swahili and Hausa, where verified national lines are scarce and the honest-absence path would be
  the normal experience rather than the exception.

**B17 is what reconciles the two orders.** Once *"we don't have a checked number for here"* is a
first-class, well-written state rather than an embarrassment, a language with thin helpline
coverage becomes shippable — it just means layer 4 is the usual experience there, and that is a
decision taken with open eyes instead of a nasty surprise. **Without B17, the low-coverage
languages cannot be shipped safely at all.**

The one change this makes to the waves above: **do Arabic last within wave 1**, after Spanish,
Portuguese and French have proven the process on easier ground. It is still wave 1 — the reach
argument and the RTL argument both hold — but it should not be the one we learn on.

**And the general point: language is not reach.** Ten languages badly localised, with the wrong
crisis numbers and worries that do not fit, is worse than three done properly — for this
audience especially, because the whole product is a claim that somebody thought about them.

## What each language ships with

Nothing here is optional, and the list is the same every time:

1. `strings-<code>.js`, complete, no missing keys.
2. `worries-<code>.js` — translated **and culturally reviewed**, items replaced where §5.2's six
   rules fail, and the safe/unsafe wording table applied fresh.
3. The eight sentences and rule 7's phrases, translated, approved **once**, then frozen the way
   the English ones are. The banned-phrase list for that language, written with the translator.
4. The crisis block: B17's country layer already carries it. What this language adds is verified
   lines for its main countries, or a recorded decision that the directory alone carries them.
   **Numbers are read off the provider's own site by a person, never recalled by a model.**
5. A native speaker with CBT training signs off the list and the eight sentences. Budget a few
   hundred pounds per language and do not skip it.
6. Store listing copy in that language, safe column only, purpose statement identical.
7. The full test suite green in that locale, including the banned-phrase sweep.
8. A real person walking J1 and J2 in that language on a phone.

## Rules this must not break

- **Rule 2: no AI.** Machine translation may be used as a *first draft for a human translator to
  correct*, and never as shipped text. Nothing a person reads was written by a machine.
- Rule 8: every phrase fresh, in every language. Do not translate CCI's or Getselfhelp's
  material into a new language and think the restriction stopped applying.
- Rule 1: every language ships in the bundle. Nothing is fetched, ever.
- Rule 7: the purpose statement is identical everywhere it appears, in each language.

## Open, and for the founder and Misha

- **Which wave 1 actually is**, and whether Arabic and Indonesian go in.
- **Whether any of it happens before there is evidence anyone wants BETR in English.** The honest
  case for doing it early is that B15 makes it cheap and the audience argument is real. The
  honest case against is that translating twelve worries nobody has used yet is guessing in
  eleven languages instead of one. **My recommendation: B15 now, B16 after the first real users.**
- Who finds and pays the reviewers. This is the actual bottleneck, not the code.

## Done when

Per language: everything in "What each language ships with", and the confidence score for that
language recorded in this file under its own heading.
