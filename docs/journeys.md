# Journeys

Walked by hand, on a real phone, not by a test. A journey is written so that someone who has
never seen the code can follow it and say whether it did what it says.

**Changelog**
- 2026-09-15 — **J1–J5 of the old app were retired for B56**, the redesign. They walked a
  stock list, doors, sizes, a ladder and a tally, and none of those exists any more. Three new
  journeys replace them: **J1** one prediction from the front screen to its results, **J2** the
  same prediction over three days and then *Done with this one*, and **J3** a refusal, Help,
  export, delete and *Not today*. None has been walked on a phone yet.

**One thing is true on every screen in J1 and J2, and it is worth checking every time:** no
screen from *Lock it in* to the results, and nothing on *Your predictions*, shows a number. No
count of predictions, no count of results, no score, no *1 of 3*. A day label such as **TUE**
is a label, not a number. (Help has *0 accounts* on it, and Help is not in the loop.)

---

## J1 · One prediction, start to results

**Why it exists:** this is the whole product. Write down what you think will happen, lock it
in, go and do it, say how it went, and read it back. If this works, BETR works.

**Where:** until the redesign is merged, open `web/index.html` in a browser from a copy of the
repo on the `redesign` branch — on a phone, or in a phone-sized browser window. Nothing is
published from a branch, so **betr.trybeup.com still shows the old app**; do not walk it there.
Once it has loaded, **turn wifi and mobile data off**.

**Before you start:** nothing stored. If this browser has opened BETR before, do J3's *Delete
everything* first, or use a private window.

| # | Do this | You should see |
| --- | --- | --- |
| 1 | Open it | **BETR** small at the top. The question *What do you think will happen?* in big letters. A paper card with *If I* ___ *, then* ___ *.* and two blank spaces in it. A button, **Lock it in**, faded. Under it: *Then go and find out. Nothing leaves your phone.* At the very bottom, three grey underlined words: *Your predictions*, *How it works*, *Help* |
| 2 | Tap **Lock it in** with both blanks empty | Nothing happens. No red, no error message, no new screen |
| 3 | Tap the first blank and type **ask my neighbour to water the plants** | The words appear inside the sentence, after *If I*. The button is still faded |
| 4 | Tap the second blank and type **she’ll say yes** | **Lock it in** is no longer faded, and the line under it now reads *That keeps it as you wrote it, so what happens can’t rewrite it.* |
| 5 | Tap **Lock it in** | **LOCKED IN** in small capitals. Your sentence on a paper card, whole, with a full stop: *If I ask my neighbour to water the plants, then she’ll say yes.* Then *Go and find out.*, a big **Done it**, and under it in grey *Not today. Keep it for tomorrow.* The three grey words are still at the bottom |
| 6 | Go and actually do it. Come back. Tap **Done it** | Your sentence again, a little smaller. The question *Did it go how you expected?* Three rounded buttons: **Yeah!** in yellow with a small spark drawn beside it, **Sort of** on paper, and **Not really** on paper but paler |
| 7 | Tap **Yeah!** | Your sentence at the top. A small yellow **YEAH!** label next to the question *What happened?* One empty paper box, and **Keep it** |
| 8 | Tap **Keep it** with the box empty | You stay on this screen, and the cursor goes into the box. Nothing is saved and nothing scolds you |
| 9 | Type what actually happened, one or two sentences, and tap **Keep it** | Your sentence at the top. Under it, one paper card: **YEAH!**, today’s day in small capitals (for example **TUE**), and what you wrote, in your own words, exactly as you typed them. Then a big **Same again tomorrow**, and in grey **Done with this one**. No number anywhere on the screen, and no screen before this one telling you how you did |
| 10 | Tap **Your predictions** at the bottom | *Your predictions*. One paper card with your sentence and a **YEAH!** label under it. A big **New prediction**. Two grey links: **Export everything** and **Delete everything**. There may also be a small card, *Add this to your home screen.* No number, no total |
| 11 | If the home screen card is there, tap **Got it** or **Not now** | It goes, and does not come back |
| 12 | Tap your prediction’s card | Back to the results from step 9, unchanged |
| 13 | Reload the page | You land on the same screen you were on. Your sentence and what happened are still there |
| 14 | Tap **How it works** at the bottom | *How it works*, two short paragraphs, a quieter line saying *If you’re in a bad place right now, this isn’t the thing. Help has real people.*, and a big **Write one** |
| 15 | Tap **Write one** | The front screen, both blanks empty, ready for a new prediction |
| 16 | Tap **Your predictions**, then **New prediction** | The same front screen. *New prediction* and the front screen are one and the same |
| 17 | With wifi still off, write, lock in and finish a second prediction | Everything works. Nothing is missing, nothing is loading, nothing asks for the internet |

**Result:** _not yet walked._

**Recorded by:** —
**Date:** —
**Notes:** —

---

## J2 · The same prediction, three days running, then done with it

**Why it exists:** the results list is the evidence growing, and it only means something once
there is more than one entry on it. And a lot of predictions are one-shot: *Done with this one*
has to put a prediction away without deleting a word of it.

**Where:** as J1. Takes three days if done honestly. It can be walked in one sitting to check
the screens, in which case every day label reads the same day.

**Before you start:** one prediction locked in and not yet done — J1 steps 1–5 with a new
sentence, for example **If I** *say hello to the person at the bus stop* **, then** *they’ll
ignore me*.

| # | Do this | You should see |
| --- | --- | --- |
| 1 | **Day one.** Tap **Done it**, then **Sort of**, write what happened, tap **Keep it** | The results: one entry, **SORT OF**, today’s day, your words |
| 2 | Tap **Same again tomorrow** | **LOCKED IN**, and **the same sentence, word for word**. It is not a new prediction and nothing asks you to write it again |
| 3 | Tap **Your predictions** | One card for it, with **SORT OF** and then **LOCKED IN** in its row of labels. Not two cards |
| 4 | Close the browser. **Day two:** open it again, and tap the card | It opens on *Your predictions*, where you left it, with the card still showing **LOCKED IN**. Nothing says you are late or have missed anything. The card opens **LOCKED IN** and your sentence |
| 5 | Tap **Done it**, then **Not really**, write what happened, tap **Keep it** | The results: **two** entries, **newest at the top**. The top one is **NOT REALLY** with today’s day; the one under it is **SORT OF** with yesterday’s. Each in your own words |
| 6 | Tap **Same again tomorrow**. **Skip day three entirely.** Open it on day four | It opens on **LOCKED IN**, where you left it, still waiting. No gap, no red day, no *you missed*, nothing counting the days in between |
| 7 | Tap **Done it**, then **Yeah!**, write what happened, tap **Keep it** | **Three** entries, newest first: **YEAH!**, **NOT REALLY**, **SORT OF**, each with its own day label. Still no number on the screen: no *3 results*, no *2 of 3*, nothing added up |
| 8 | Tap **Your predictions** | One card. Its labels read left to right **oldest to newest**: **SORT OF**, **NOT REALLY**, **YEAH!** |
| 9 | Tap the card, then **Done with this one** | *Your predictions*. The card has moved to the bottom, below **New prediction**, under a small grey heading **PUT AWAY** |
| 10 | Tap **Export everything** | A box of text appears with everything BETR has stored. Your sentence is in it with `"putAway": true`, and all three results are there, each with what you wrote under `"happened"`. **Nothing was deleted by putting it away** |
| 11 | Tap the card under **PUT AWAY** | The same three results, untouched. At the bottom, **Same again tomorrow**, and in grey **Bring it back** in place of *Done with this one* |
| 12 | Tap **Bring it back** | *Your predictions*. The card is back above **New prediction**, and the **PUT AWAY** heading has gone |

**Result:** _not yet walked._

**Recorded by:** —
**Date:** —
**Notes:** —

---

## J3 · A refusal; Help; export; delete; Not today

**Why it exists:** one sentence is still refused — one about ending it, or hurting yourself —
and when it is, the person has to be handed a real helpline for the country they are actually
in, without their own words being read back to them. The rest of this journey is the promises
Help makes: the crisis lines first, everything exportable, everything deletable, and a day off
that costs nothing.

**Where:** as J1. **Before you start:** do J1 first, so there is something to export and
delete. **Steps 1–9 are best done on a phone with a UK time zone**; on any other phone, the
country named in steps 3 and 11 is yours instead.

| # | Do this | You should see |
| --- | --- | --- |
| 1 | Tap **Your predictions**, then **New prediction**. In the first blank type **hurt myself when it gets bad**, in the second **nobody will notice**. Tap **Lock it in** | You stay on the front screen. **Your words are still in both blanks.** Under the sentence, a box that says *BETR can’t help with that one, and it would be wrong to pretend otherwise.* |
| 2 | Read the rest of that box | *If you are in danger right now, call your local emergency number.* Then **the helpline for the country you are in, named, with its number underlined** — on a UK phone, *In the United Kingdom:* and **Samaritans**, *Free, 24 hours*. Then a button, **Not where you are?**, and a line saying findahelpline.com lists free helplines in over 175 countries and is the one thing on this screen that needs the internet |
| 3 | Look for your own words in that box | They are **not** there. The box never repeats what you typed |
| 4 | Tap the helpline number | Your phone’s dialler opens with the number already in. Cancel it. BETR is as you left it |
| 5 | Tap **Your predictions** | That sentence was **not** saved. Only what you had before is there |
| 6 | Tap **New prediction**. The words from step 1 are still in the blanks — they are held on the screen until the page is closed, never saved. Replace them. First blank: **tell my sister how I really feel**. Second blank: **I’ll want to kill myself**. Tap **Lock it in** | The same refusal and the same helpline. The stop works on **either** blank |
| 7 | Tap **Not where you are?** | *Where are you?*, a line saying it is only so the right helpline number is on the screen, and every country in alphabetical order |
| 8 | Tap **Kenya** | Back on the front screen with your words still in the blanks. Tap **Lock it in** again: this time the box says *Your country here is Kenya. Nobody has checked a helpline number for it…* and **shows no phone number at all**. If a number appears here, stop: that is the bug this step exists to find |
| 9 | Replace both blanks with an ordinary prediction and tap **Lock it in** | It is simply taken: **LOCKED IN** and your sentence. The refusal is gone |
| 10 | Tap **Help** at the bottom | A **Back** link, then *If you are in danger or in crisis* **first, above everything else** — you should not need to scroll to reach it. It still says Kenya, from step 8 |
| 11 | Tap **Not where you are?**, then **Go back to guessing from my time zone** | You stay on *Where are you?*, and it now says *Right now we are guessing from your phone’s time zone, which says* your country. Tap **Back**: Help again, with your own country’s line back |
| 12 | Scroll down Help, reading the headings | In this order: *Don’t take our word for it* (it says BETR is free, and describes airplane mode), then **Export everything** and **Delete everything**, *Choosing one that is safe*, *What CBT is, and which bit of it this is*, *What this is* (the purpose and nine numbered sentences), *Other places, none of them run by us*, *Who made this*, *The code* |
| 13 | Tap **Export everything** | A **Copy it** button (and, on a phone that can share, **Send it somewhere**), and a box of text with everything BETR has stored — your predictions, in your words, and what happened each time |
| 14 | Tap **Copy it** | The button now says **Copied**. Paste it into a note to check it really is your data |
| 15 | Tap **Delete everything** | *Delete everything on this phone? There is no copy anywhere else, and we cannot get it back for you.* with **Delete it all** and **Keep it** |
| 16 | Tap **Keep it** | The warning goes. Tap **Your predictions**: everything is still there |
| 17 | Go back to Help, tap **Delete everything**, then **Delete it all** | The front screen, both blanks empty |
| 18 | Tap **Your predictions** | Only the heading, **New prediction**, and the two grey links. No cards, and no *0* |
| 19 | Reload the page | Still empty. Nothing came back |
| 20 | Write a new prediction and tap **Lock it in**, then tap **Not today. Keep it for tomorrow.** | *Your predictions*, with that card on it and a **LOCKED IN** label. Nothing says *missed*, *late*, *overdue* or *behind*, and nothing was recorded as a result. (The *Add this to your home screen* card may be back: deleting everything also forgot that you had closed it) |
| 21 | Close the browser. Open it again the next day | The prediction is still waiting, still **LOCKED IN**. Nothing expired |
| 22 | Tap the card | **LOCKED IN**, your sentence, **Done it** — ready to carry on as if no day had passed |

**Result:** _not yet walked._

**Recorded by:** —
**Date:** —
**Notes:** —
