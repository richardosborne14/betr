# B16: Shipping a language — the repeatable process, and which ones

**Status:** **French started 2026-09-16 — the loop is translated, the numbers are read, the elision is built, and it is NOT SHIPPABLE.** See §10 at the
bottom for what was done, what is deliberately missing and the safety hole it found. Written 2026-09-03. **Repeatable: once per language, forever.**
**First language: French, the founder's ask of 2026-09-15 ("asap"). The founder reads and signs off the French themselves.** It starts only
after B56's strings settle — the app will say about thirty things instead of two hundred and fifty, and translating the old ones is work done
twice. The stock list is gone with B56, so item 2 below (`worries-<code>.js`) no longer applies. Item 4 still does, in full: the lines for
France, Belgium, Switzerland and Québec are read off each provider's own site on the day, by a person, or the country shows none.
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

---

## 10. French, first pass — 2026-09-16

The founder asked to see the French. This is what exists now, on the branch `redesign`, which publishes nothing.

### 10a. The safety hole this found, which is the most important thing on this page

**The one hard stop did not exist in French.** The founder's own example of what must always be refused, typed into the French app
— *« Si je me tue, alors tout le monde ira mieux »* — **was accepted and locked in.** Two causes, both in `web/lib/guards.js`:

1. `HARM` was eleven **English** phrases. Nothing in it matched French.
2. `hit()` stripped everything outside `a-z` **after** lowercasing, so an accented letter became a **space** and split the word around it.
   Any language with accents would have had a harm list that could never match, silently, with no test failing.

Both are fixed. The list is now **one list for every language, never indexed by the interface language** — a French speaker whose phone is
in English types French into the blanks, so matching every language every time is the only safe shape. Accents are folded with `\p{Mn}`
(written without a numeric range on purpose: `guards.test.js` fails the build on three digits in a row in that file, and a `\u` escape
looks exactly like a phone number). `guards.test.js` pins the founder's sentence in French and pins five ordinary French sentences going
through, so a stop that refuses everything fails the build too.

**The French words in that list are mine and have not been reviewed.** They mirror the English phrase for phrase. Two can fire on a
sentence that meant nothing of the kind — *en finir* ("en finir avec ce projet") and *me tue* ("si je me tue à lui expliquer") — the same
trade the English *end it* already makes, and the right way round. **For the CBT reviewer, with B56 gap (f)**, which stands in both
languages: this knows harm to yourself, not harm to somebody else.

### 10b. The numbers, read off the providers' own sites on 2026-09-16

| | |
| --- | --- |
| **France** | **3114**, free, 24h/24 7j/7. Number and hours on `https://3114.fr`; the cost sentence — *"Partout en France, l'appel et les services de la ligne 3114 sont gratuits"* — on `https://3114.fr/confidentialite-et-gratuite/`. Run by the Ministère en charge de la santé, métropole and outre-mer. It was in `notShipped` from 2026-09-03 because both pages refused to be read that day; that was the rule working, not failing |
| **Switzerland** | **143**, La Main Tendue, `https://www.143.ch/fr/`. `allHours` true — *"De jour comme de nuit"*. **`free` is null and stays null:** the page does not say the call is free, and Swiss short codes are not always free. Null means the page did not say, and then neither do we |
| **Belgium** | unchanged, **0800 32 123**, Centre de Prévention du Suicide, re-read the same day; `checked` bumped |
| **Québec** | already covered by the existing **CA** entry (9-8-8), which answers in French |

**15 is deliberately NOT in `helplines.js`.** The French state's own page separates numbers to **call in an emergency** (15 SAMU, 17, 18,
112, 114) from numbers to **talk to somebody** (3114 and the rest), and BETR's crisis block already does exactly that: its first line says
to call the local emergency number, and this list is the second thing. 15 is the right number for a medical emergency and is not a
listening line. Source for the split: `https://www.service-public.gouv.fr/particuliers/actualites/A15841`.

**Open, and worth a decision:** BETR's first crisis line never names the emergency number, in any country. In France that is 15 or 112.
Naming it per country is a small change to `helplines.js` and the crisis wording, and B17 deliberately did not do it.

### 10c. What is translated, and what is deliberately not

`web/content/strings-fr.js`, **`tu` throughout** (the founder's call). The loop, the foot, *Tes prédictions*, *Comment ça marche*, the
refusals, install, export and delete — about forty-five pieces of wording.

**Missing on purpose, falling back to English key by key:** `frozen` (approved once by a named person, then frozen — not mine to draft),
`crisis` and `where` (read by somebody in trouble, and the country NAMES come from `helplines.js`, which is English, so translating the
wording alone produces "les numéros de the United Kingdom" — both move together or neither does), `help` (the whole screen, including
rule 9's three safeguard sentences that `menu.test.js` pins).

`i18n.test.js` prints the 60 missing keys on every run, and `FROZEN_STILL_IN_ENGLISH` names French explicitly so a language with no frozen
block is a decision somebody made rather than something nobody noticed. The test still fails the build on a **half-written** frozen block.

**So a French reader today gets the loop in French and Help and the crisis block in English.** That is visible on screen and it is the
reason this is not shippable. The worst case is the refusal screen: a French sentence saying BETR can't help, and then an English crisis
block. That screenshot is the argument for doing the crisis wording next.

### 10d. Wording decisions for the founder

**Answered 2026-09-16, and built:**

- **The elision is built.** « Si je » becomes « Si j’ » in front of a vowel, as the person types. Two new keys in the content file and
  none of it in `app.js`: `front.ifWordsElided` (« Si j’ »; **empty in English, and empty means never**) and `front.noElision`, the list
  of aspirated-h words that refuse it. **There is no rule for the h** — French elides before a mute h ("j’hésite") and refuses before an
  aspirated one ("je hurle"), and which is which is learnt word by word, so it is a list. Each stem is cut long enough not to swallow a
  mute-h word that starts the same way: `hume` not `hum` (which would catch "humilie"), `honn` not `hon` ("honore"), `heriss` not `her`
  ("hérite"), `hale` not `hal` ("hallucine"). Accents are folded first, so « harcèle » is caught by `harcel` and « écoute » elides.
  Four tests in `loop.test.js`, in French, plus one proving English is untouched.
- **`harness.js` now fires `oninput`** from `type()`. It did not before, so nothing the app does *while somebody is mid-word* — the button
  coming up from 45%, the line under it changing, the elision — was reachable from a test at all. That is a gap that existed since B56.
- **The Locked in subtitle is the founder's own wording, and the ENGLISH was changed to match it**, not the other way round: *"We'll keep it
  here just as you wrote it. Come back and say what happened, in your own words."* The old one put "in your own words" on the keeping, where
  it did not mean much, rather than on the saying.
- **« Ça s’est passé comme tu l’avais imaginé ? »** for *Did it go how you expected?* — the founder's, in the passé composé (« ça se
  passait » would ask how it used to go).
- **« Tout à fait ! »** replaces « Ouais ! », which read too young.

**Answered the same day, and built:**

- **The word is « pari »**, over « prédiction » (technical, a little like fortune-telling), « ce que tu avais prévu » and
  « hypothèse ». **This departs from CLAUDE.md rule 3's "not bet" knowingly:** that ban is about the gambling echo in English,
  and the founder judged it weaker in French, where « je te parie que… » is everyday speech. **Recorded under rule 3** so a later
  session does not correct it back.
- **The act is « s’engager »** — the button is « Je m’engage » and a locked-in pari is tagged ENGAGÉ, on the Locked in screen and
  on its card. The founder raised it from seeing « Verrouillée » on the list. **The two answers met on one line:** the engager option
  offered « Tes engagements » as the list heading, and the pari option offered « Tes paris ». The noun won the list and the foot, the
  verb won the button and the state — the thing is a pari, what you do with it is commit. If the founder wanted « Tes engagements »,
  it is `foot.mine` and `mine.title` and nothing else.
- **« Pari » is masculine, so every agreement flipped:** `on.sub` (« On le garde… écrit »), `front.noteLocked` (« Il reste tel… »),
  `on.notToday` (« Garde-le »), `log.done` (« celui-ci »), `log.back` (« Le reprendre »), `mine.away` (« Rangés », plural),
  `mine.new` (« Nouveau pari »), `refusal.verdict` (« pas un pari »), `nudge.shape` (« le tien tel quel »). And `io.deleteAsk` lost
  a « te la récupérer » that never had a clear antecedent in any gender: now « nous ne pourrons rien récupérer pour toi ».
- **Still for the founder:** the title. They wrote « à ton avis, que va-t-il se passer ? » while explaining how a Francophone talks;
  what is built is « À ton avis, qu’est-ce qui va se passer ? », which is the more spoken of the two. One line, `front.title`.

**Superseded:**

- **`front.ifWords` is « Si je » and French elides** — *si j'appelle*, not *si je appelle*. The app prints `ifWords` then what the person
  typed, so a blank starting with a vowel reads wrong. **No string can fix this.** Two ways out: a `front.ifWordsElided` key the app picks
  when the blank starts with a vowel, or an `ifWords` of « Si » with the person writing "je" themselves. **This is the only code French needs.**
- **« Je la verrouille » for *Lock it in*** — literal, slightly technical, and the load-bearing word on the front screen. Alternatives
  offered: « Je m'engage », « C'est noté ».
- **« prédiction »** leans a little more towards fortune-telling than the English *prediction* does. Rule 3's word, so the founder's.
- `why.method` says *"le morceau que tu peux faire de ton côté"* rather than *"seul"*, which would have to pick a gender.

### 10e. Done / not done

- [x] The loop translated, `tu`, walked end to end in `tools/walk.js` at 390×844 with the app set to French
- [x] France and Switzerland read off the providers' own sites and added; Belgium re-read; France out of `notShipped`
- [x] The hard stop fixed and pinned in both languages; 126 tests pass
- [x] **`crisis`, `where` and the country names in French** (10f), with a language picker top right
- [x] **`frozen` (in draft) and the rest of `help` translated**, and every place on Help (10g)
- [ ] **The founder signs off the French frozen sentences**, and says whether TrybeUP's headline reads right in French
- [ ] French-speaking places on Help (Drogues Info Service, Alcool Info Service, AFTCC), each read on its own site
- [ ] **The founder reads and signs off the French**, which is what B16 says and has not happened
- [ ] **The CBT reviewer on the French harm words**
- [x] **The elision, decided and built** — « Si j’ » in front of a vowel, with the aspirated-h list in the content file
- [x] **The word (« pari ») and the act (« Je m’engage », ENGAGÉ)**, every agreement flipped to masculine, walked in French
- [ ] `docs/COPY.md` is English only; a French sheet to mark up needs `tools/copy-sheet.js` reworked
- [ ] Jurisdiction look before any non-English store listing (§3 above) — untouched

### 10f. The crisis block in French, and a picker top right — 2026-09-16, later the same day

**The founder's asks:** "Can I force it to show me the French version?", "a language dropdown discreetly at the top right", and "do the
crisis stuff in French".

- **The picker.** Two grey letters, `EN ▾` / `FR ▾`, on the wordmark's row of every screen, over an invisible real `<select>` — so a finger
  gets the phone's own picker and a screen reader hears *Langue, Français*. 44×44 tap target, 16px select font so iOS does not zoom. No flag
  (a flag is a country, B17). **On a refusal too**, because somebody who cannot read the crisis block needs it most. B15 had written "never
  a picker on the front screen"; **CLAUDE.md rule 10 now records the founder's change.** The Help block stays, for its sentence that
  choosing a language fetches nothing. One `setLanguage()` serves both.
- **The crisis block, the country list and `a11y.countryChanged` are French.** `tu`, like everything else.
- **Country names come from the browser, in the reader's language.** `where.js` `nameFor`, `inWords` and `list` take a language. The
  hand-written "the United Kingdom" in `helplines.js` is English and only English uses it; French gets *Royaume-Uni* from `Intl.DisplayNames`.
- **No article, on purpose.** French puts a different word before every country — *en France, au Canada, aux États-Unis* — and a template
  cannot know which. So every French sentence takes a bare name after a colon: « France : Appelle le 3114 — … ». Right for all 250.
- **`note: 'in Dutch'` in `helplines.js` became `language: 'nl'`**, named by the browser in the reader's language: "in Dutch" /
  « en néerlandais ». It had printed "in French" to a French reader.
- **Two old bugs found on the way and fixed, both visible in English too:** the country list sorted by code unit, so "Åland Islands" sat after
  Zimbabwe (now `localeCompare`); and a line whose only detail was its language read "…du Suicide. in French." with a lowercase letter
  after the full stop (now capitalised).
- **Two missed agreements from the *pari* change**, caught walking the refusal: « celle-là » in `refusal.harm` and « En écrire une » on
  *Comment ça marche*. Both masculine now. **Lesson: grep for every feminine form, not only the ones you expect.**
- Tests: `helpline.test.js` checks the French block (France/3114, Royaume-Uni, Belgium's two languages, Kenya with no number, no English left)
  and French alphabetical order; `i18n.test.js` checks the picker (top row, name, no flag, on a refusal, switches and remembers, keeps the
  person's own words). `harness.js` has `pick()`. 134 pass.

**Found and NOT changed — for the founder, because it is a trust sentence:** `crisis.howWeKnow` says the phone's time zone is "the only thing
here that has anything to do with where you are". `where.guess()` falls back to the browser's language region (`en-KE` → Kenya) when there
is no time zone. Nothing leaves the phone either way, but the sentence overclaims in that one case, in English and now in French.

**Still English:** the rest of Help, and the nine frozen sentences including sentence 7, the crisis sentence on Help.

**Cosmetic, not fixed:** in French, the EMPTY front sentence wraps as « Si je ____, / alors ____ / . », the full stop alone on a third line,
because « alors » is longer than "then". It goes away as soon as anything is typed.

### 10g. The rest of Help in French — 2026-09-16, the founder's ask

**French now has no gaps at all:** `i18n.test.js` lists zero missing keys. The whole Help screen, export and delete, and every link description.

- **`help.*`**, all of it: the proof section (« adresse IP » rather than « adresse », which reads as where you live; « 0 o » for octets),
  what CBT is (« TCC », « expérience comportementale » — the bolded phrase), who made it, TrybeUP's block, the code.
- **Rule 9's three safeguards are in French and pinned:** « abonnement payant », « coach IA », « Rien de ce que tu écris ici n’y va ».
  `menu.test.js` fails the build if the French loses any of them, and on TrybeUP being named on the French front screen.
- **`help.makerTag` is TrybeUP's own headline, translated** — « Dis-nous un problème. On te donne une chose à faire par jour. » That is
  their line, and the founder should say whether TrybeUP says it that way in French.
- **The frozen block, translated faithfully and in DRAFT** until the founder signs it off (CLAUDE.md rule 7 now says so). Not a rewrite: the
  purpose still says « Tu choisis une inquiétude… BETR te propose une petite chose » and sentence 2 still says « évaluer à nouveau la
  croyance », because the English does — B56 §9c fixes both languages or neither. « dispositif médical » is the EU legal term; the
  jurisdiction look in §3 still comes before any French listing. Sentences 5 and 6 are written to need no gender for the reader.
  Sentence 7 names the US and UK numbers, exactly as the English does; the live crisis block above it gives France's.
- **`places.js` carries French beside the English** — `fr: { what }` on each item, `fr: { title, note }` on a group, `fr: { intro }` at the
  top. Proper names are not translated. `placeText()` in `app.js` falls back to English a field at a time. A test holds `fr` to text
  fields only, never a url. **Nearly every place is English-speaking and in the UK or US, and the French now says so** (« presque tous
  sont en anglais »). **French-speaking places** — Drogues Info Service, Alcool Info Service, the AFTCC therapist register — would be the
  real fix and are NOT added: each must be read on the provider's own site on the day, like every other entry.
- Walked end to end in French in `tools/walk.js`, including export and delete. 137 tests pass.
