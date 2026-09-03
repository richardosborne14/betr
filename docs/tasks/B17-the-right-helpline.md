# B17: The right helpline — country, not language, and never a guess presented as a fact

**Status:** Not started. Written 2026-09-03 from the founder's question about minimising harm.
**First in the reach track — before B15.** It ships no translation and needs none.
**Confidence:** —
**Date opened:** 2026-09-03
**Depends on:** B8 (done — the crisis block and its `tel:` links are in).
**Where:** `web/app.js` (the crisis block), a new `web/content/helplines.js`, a new small
timezone→country map. No dependency, no request, no permission prompt.

## Why this exists, and why it is not part of the translation work

**BETR today shows 988 and Samaritans 116 123 to everybody on earth.** A person in Lagos, Mexico
City, Jakarta or Delhi opening it right now gets two numbers that do not work where they are and
one link that needs the internet. The generic first line — *call your local emergency number* —
is doing all the work, and the two specific numbers are noise at best. At worst they are seconds
spent dialling a dead number by somebody who did not have seconds to spend.

**So this is a live harm in English, with zero languages shipped.** It was invisible because it
was written by, reviewed by and tested by people in the two countries it happens to be right for.

It is also the thing that makes B16 safe rather than dangerous, which is why it comes first: get
the country layer right once, in English, and every language after it inherits it.

## The principle

**Language and country are different questions and must never be coupled.** Choosing Spanish must
not set the country to Spain. There are roughly 40 million Spanish speakers in the United States;
sending them to a Madrid number is exactly the failure this task exists to prevent. Two separate
defaults, two separate switches, neither touching the other.

## How the country is guessed, with no request and no permission

In order, each overriding the one below:

1. **What the person chose**, if they ever chose. Remembered like everything else.
2. **`Intl.DateTimeFormat().resolvedOptions().timeZone`** — the strong signal. It returns
   `America/Mexico_City`, `Africa/Lagos`, `Europe/Madrid`. The IANA database is organised by
   country, so the mapping is well-defined and ships as a small data file (~350 zones, a few kB,
   derived from `zone1970.tab`, checked in as data, not a dependency).
3. **The region subtag in `navigator.languages`** — `es-MX`, `pt-BR`, `fr-CA`. Often absent, but
   free when it is there.
4. **Nothing.** Which is a valid answer, handled below.

**Never the Geolocation API.** It prompts, it is a device sensor, and a private mental-health app
asking for your location is the single most alarming thing it could do. It is off the table
permanently, not deferred.

Every signal above is read on the device at render time. **None of it is stored and none of it is
sent** — there is nowhere to send it. And it is written into *What this is* in plain words, so
nobody discovers it and feels watched: *your phone's time zone is used to guess which country's
helpline to show you. It is read on this device and goes nowhere.*

## The four layers, in this order, always

1. **The line that is always true.** *If you are in danger right now, call your local emergency
   number.* No country needed, works everywhere, needs no data and no signal. This is the floor
   and it never moves from the top. It is what already ships and it stays exactly as it is.
2. **The helpline for where you are** — the country named on screen, its line, dialable. Next to
   it, always visible and never buried: **Not where you are?** One tap to a plain alphabetical
   list of countries. Their choice sticks.
3. **findahelpline.com**, last, labelled honestly as needing the internet. 175+ countries, and it
   does its own country detection, so it is the catch-all that outlives our data.
4. **Silence, where we do not know.** If there is no verified line for the country, **show none**.
   Say so plainly — *we don't have a checked number for Kenya; findahelpline.com covers 175+
   countries* — and let layers 1 and 3 carry it.

**Never guess a neighbour's number. Never fall back to 988 because it is the one we have.** A
wrong number is worse than no number, because a person tries it. Absence, said honestly, costs
them one tap. A dead line costs them the only attempt they were going to make.

## Where the numbers come from — the rule that matters most

**Every number is verified by a person, against the national provider's own website, on the day it
ships, and carries the date it was checked in the data file.**

**No number is ever written from a language model's memory, including mine.** They change: the US
moved to 988 in 2022, providers merge, charities fold, short codes get reassigned. A model's
recollection of a helpline number is exactly the kind of confident, plausible, out-of-date fact
that gets somebody hurt. A session that finds itself typing a phone number it has not read on the
provider's own site that day has made a mistake and must stop.

Nothing in BETR can check a number at runtime — by design, rule 1. So the check is a release
gate with a named owner, the same problem and the same owner as B8's link list, at higher stakes.

## Which countries get a verified line

Not 175. Verifying and re-verifying is real recurring work, and a stale number is the harm this
task exists to prevent. **Start with the countries holding most of the speakers of whatever
languages are shipped, and grow the list deliberately.** Twenty to thirty is a realistic first
list. Everything else falls through to layers 1 and 3, honestly, by design and not by accident.

The data file carries, per country: the ISO code, the line's name in its own language, the number,
whether it is 24/7, whether it is free, the source URL, and the date a human last checked it.
"Whether it is free" matters — for this audience a charged call is a barrier and it must be
visible, not discovered on a bill.

## Rules this must not break

- **Rule 1.** No request, no permission prompt, no geo-IP, ever. Airplane mode: layers 1, 2 and 4
  all work, and layer 3 says it needs the internet.
- **Rule 2 is not engaged by this, and a future session should not think it is.** A person picking
  their own country from a fixed alphabetical list is choosing a chapter, not being profiled — the
  same reasoning that lets the stock list exist (research §5.2). What would cross the line is
  choosing *content* for them based on where they are. Nothing but the helpline block ever varies
  by country. Not the worries, not the tests, not the wording.
- **Rule 7.** The crisis sentence's shape is fixed. This task changes which numbers appear inside
  it, not the sentence that carries them. Sentence 7 stays verbatim; the specific lines are data.
- **Rule 10.** This is not a settings screen. The country sits on the crisis block with one link
  next to it. There is no onboarding question, no first-run picker, no flag.

## Tests to add

- A stub timezone of `America/Mexico_City` yields Mexico; `Europe/Madrid` yields Spain;
  `Africa/Nairobi` yields Kenya. An unknown or absent timezone yields no country and does not throw.
- A country with no verified line renders layers 1, 3 and 4 — and **contains no phone number at
  all**. This is the test that stops a well-meaning fallback creeping in later.
- The person's chosen country beats the timezone, and survives a reload.
- Changing the language does not change the country, and changing the country does not change the
  language. Assert both directions.
- Every entry in `helplines.js` has a source URL and a check date, and the date is not in the
  future. A stale-date warning in the test output, so a release cannot quietly ship old data.
- Airplane mode: the crisis block renders complete, with the directory marked as needing internet.
- Sentence 7 is still byte-identical to its frozen source.

## Open, and for the founder and Misha

- **Who owns the re-checking, and how often.** This is the real cost of the task and it is a
  person, not code. Same owner as B8's links.
- **The first country list.** Misha's read matters: the countries where this audience actually is
  may not be the countries with the most speakers.
- Whether "we don't have a checked number for X" is the right wording. It is honest, and it may
  read as neglect. It needs the same care as the rest of the crisis block.

## Done when

- The crisis block names a country, and one tap changes it, on a real phone.
- A device set to a country with no verified line shows no phone number and reads well.
- Every shipped number has a source URL and a date a person checked it.
- `node --test` green from the repo root. Confidence score recorded here.
