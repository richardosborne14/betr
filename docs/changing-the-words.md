# Changing the words, and getting them onto the phone

For the founder. Nothing here needs a developer, and nothing here can break the live site — see
*The safety net* at the bottom, which is the part worth reading first if you only read one.

---

## The short answer

**Mark up `docs/COPY.md` and hand it over, or just say the change.** That document has every
word BETR can put in front of a person, in the order somebody meets them. Strike a sentence
out, write the better one next to it, and it gets made. That is the intended route and it is
the fastest one.

Everything below is for when you want to do it yourself at eleven at night.

---

## Where the words actually live

Since the redesign (B56, 2026-09-15), **almost every word is in one file**. The stock list, the
doors, the examples, the suggestions and "Why this one sticks" are gone from the app, and so are
the files they lived in.

| If you want to change… | The file |
| --- | --- |
| **Every sentence in the app** — the question on the front screen, the sentence with two blanks, every button, *How it works*, Help, the crisis wording, what a screen reader says | `web/content/strings-en.js` |
| The links on Help | `web/content/places.js` |
| A crisis phone number | `web/content/helplines.js` — **never typed from memory**; see rule 3 at the bottom |
| **The same sentence in French** | `web/content/strings-fr.js` — same names, French words (added 2026-09-16) |

`docs/COPY.md` shows each sentence with its name in that file — `front.title`, `go.yeah` — so
you can go from the thing you crossed out to the line it lives on without hunting.

**About French, since 2026-09-16.** There are now two word files and they work the same way:
the name on the left of each line is identical, only the words differ. To see the app in French,
tap the grey **EN ▾** at the top right of any screen and choose *Français*; it remembers. Two
things to know. **A sentence French has not got yet simply shows the English one** — nothing
breaks, nothing goes blank — though since 2026-09-16 French has every sentence. The links on Help keep their
French right beside the English in `places.js`, under `fr`. And
**changing an English sentence does not change the French one**: reword `front.title` in
`strings-en.js` and the French `front.title` keeps saying what it said. Change both, or ask and it
gets done. **French agrees and English does not:** the French word for a prediction is *pari*,
which is masculine, so a French sentence about one says *le*, *celui-ci*, *écrit*. `docs/COPY.md`
is still English only.

Two files are **never** hand-edited: `web/content/zones.js` (generated from the world's time
zone list) and `docs/COPY.md` itself (generated from the others — editing it changes nothing in
the app).

### The sentence on the front screen

The front screen prints *If I* ___ *, then* ___ *.* — and the person's prediction is built out of
exactly those printed pieces. In `strings-en.js`, under `front`, they are four separate lines:

```
      ifWords: 'If I',
      thenWords: ', then',
      stop: '.',
```

The app joins them like this: `ifWords`, then whatever was written in the first blank, then
`thenWords`, then whatever was written in the second blank, then `stop` (unless the person ended
with their own full stop, question mark or exclamation mark).

So **changing one of these changes how every new prediction is written from then on.** It does
not change the ones already locked in — those keep the words they were locked in with. Keep the
comma at the start of `thenWords`: it is what puts the comma after the first blank.

**A language that puts the sentence in a different order needs a developer.** The order — first
blank, then second blank — is in the app itself, not in this file. A translation that keeps the
same order is only a change of words.

### The three answers

Under `go` are the three answers to *Did it go how you expected?*:

```
      yeah: 'Yeah!',
      sort: 'Sort of',
      not: 'Not really'
```

**These three words also label every result afterwards**, in capitals — **YEAH!**, **SORT OF**,
**NOT REALLY** — on the results screen and on *Your predictions*. Change one here and the label
changes everywhere, including on results kept before the change. That is on purpose.

## Doing it yourself, on github.com

You need no software. This works from a laptop or a phone.

**Until the redesign is merged, the new words are on the `redesign` branch, not on `main`.** The
`strings-en.js` on `main` is still the old app's file. So for now, pick **`redesign`** in the
branch menu at the top left of the repository page before you open the file — or, simpler,
just say the change.

1. Go to the BETR repository on github.com and open the file — for almost everything, that is
   `web` → `content` → `strings-en.js`.
2. Tap the **pencil** at the top right of the file.
3. Find your sentence and change it. **Keep everything around it exactly as it is**: the
   `lock:` at the front, the `'` quote marks at both ends, and the `,` at the end of the line.
   You are changing what is *between the two quote marks* and nothing else.
4. Scroll down, write one line saying what you changed, and press **Commit changes**.

That is it. There is no separate publish step: a change on `main` publishes itself.

**Two things that trip everybody up.**

- **An apostrophe.** The words use a curly one — `don’t`, not `don't`. If you type a straight
  apostrophe inside a sentence, the line breaks. Copy a curly one from a nearby line. (Or use
  the mark-up route and let it be somebody else's problem.)
- **The commas and quote marks are the plumbing.** If you delete one by accident the build
  will catch it, but you will have had a red email for nothing.

## What happens after you press Commit

**On `main`**, about thirty seconds of machinery, in this order:

1. **Every test runs.**
2. If they all pass, the files are copied to the server.
3. The published page is then checked **from outside**, over the real address: that it loads,
   that it sets no cookie, that it is allowed to make no outbound request of any kind, and
   that the build number printed on the Help screen matches the files that were actually sent.

Once the redesign is merged, it is live at **https://betr.digitalbricks.io**. Hard-refresh on
your phone if you still see the old words.

**Right now (2026-09-16) there are two addresses, for a short while.** The OLD app is still at
betr.trybeup.com, published from `main`. The NEW app, from `redesign`, is at
**https://betr.digitalbricks.io** so you can look at it on your phone — it was put there by hand
and does not update by itself when you change a word on `redesign`; ask for it to be published
again. When you are happy with it, the redesign is merged, `main` publishes to
betr.digitalbricks.io from then on, and the old address is switched off.

You can watch it happen: on GitHub, the **Actions** tab. A green tick means it published; a
red cross means it did not, and nothing changed on the live site.

## The safety net

**You cannot publish something that breaks a rule.** The tests are a gate, not a formality,
and they publish nothing if one fails. Among the things that will stop your change dead:

- the wordmark stops being **BETR**, or anything a person taps starts with a lowercase letter
- a button or a heading says **test** or **worry**. The word is **prediction**, for a hope and a
  worry alike. (A person's own sentence can say anything — it is theirs.)
- a number appears on any screen from the front to the results, or on *Your predictions*: no
  count, no total, no score. A day label like **TUE** is not a number
- any of "digital CBT", "improve your mental health", "reduces symptoms", "tracks your
  anxiety", "irrational" or "streak" appears in the app
- one of the nine frozen sentences goes missing from Help, or the crisis sentence (number 7,
  the one with the helpline numbers in it) is changed by so much as a comma. **The other eight
  and the purpose statement are only partly checked** — a rewording inside the file would not
  be caught, so they are frozen by rule, not by the machine. Don't reword them
- a link appears that is not on the allow-list, or a link turns up anywhere other than Help, or
  anything in the app tries to fetch something
- the stop stops working: a sentence about hurting yourself, in **either** blank, must be
  refused, must show the crisis lines with a number that dials, and must never be saved
- a sentence names something the app asks for that is not in `strings-en.js`, so a person would
  see a blank or a code name instead of words

If the run goes red, the live site is untouched — it is still serving the last good version.
Nobody sees a broken app. The worst case is a red cross and a message.

## Three rules that are not enforced by anything but you

The machine cannot check these, and they are the ones that matter most in this file.

1. **Write it fresh.** Not a line from CCI, Getselfhelp, Therapist Aid, Psychology Tools or the
   Beck Institute. All of them restrict reuse in a product.
2. **A question is never a verdict.** *Did it go how you expected?* asks about the person's own
   prediction, not about them. No wording — and no translation — may turn it into *did you
   pass*, *were you right* or *were you wrong*.
3. **Never write a phone number from memory.** Not yours, not anyone's. Every helpline in
   `helplines.js` was read off the provider's own website on the day recorded next to it. A
   country with no checked number shows no number, on purpose — somebody tries a wrong one
   once and may never try again.

## After a change, one housekeeping job

`docs/COPY.md` is generated, so it goes stale the moment the words change. It is one command
and it is normally done for you — but if you have been editing on github.com for a week, say
so and it gets rebuilt.
