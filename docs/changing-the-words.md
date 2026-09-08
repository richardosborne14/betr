# Changing the words, and getting them onto the phone

For Richard. Nothing here needs a developer, and nothing here can break the live site — see
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

Five files, and every word in the app is in one of them. Nothing else in the repo contains a
sentence a person reads.

| If you want to change… | The file |
| --- | --- |
| One of the ready-made tests you can borrow: its name, its card sentence, its three "If I…, then…", the thing to try, the thing to leave out | `web/content/worries.js` |
| The six doors on *What's going on?* | `web/content/whats-going-on.js` |
| "Why this one sticks" — the two paragraphs behind each worry | `web/content/why.js` |
| The links on Help | `web/content/places.js` |
| **Every other sentence in the app** — buttons, headings, the front screen, Help, what a screen reader says | `web/content/strings-en.js` |

`docs/COPY.md` says which file each block came from, so you can go from the thing you crossed
out to the file it lives in without hunting.

Two files are **never** hand-edited: `web/content/zones.js` (generated from the world's time
zone list) and `docs/COPY.md` itself (generated from the five above — editing it changes
nothing in the app).

## Doing it yourself, on github.com

You need no software. This works from a laptop or a phone.

1. Go to **github.com/richardosborne14/betr** and open the file — for a worry, that is
   `web` → `content` → `worries.js`.
2. Tap the **pencil** at the top right of the file.
3. Find your sentence and change it. **Keep everything around it exactly as it is**: the
   `label:` at the front, the `'` quote marks at both ends, and the `,` at the end of the line.
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

About thirty seconds of machinery, in this order:

1. **Every test runs.** 181 of them.
2. If they all pass, the files are copied to the server.
3. The published page is then checked **from outside**, over the real address: that it loads,
   that it sets no cookie, that it is allowed to make no outbound request of any kind, and
   that the build number printed on the Help screen matches the files that were actually sent.
4. It checks TrybeUP is still up, because BETR sits on the same machine.

Then it is live at **https://betr.trybeup.com**. Hard-refresh on your phone if you still see
the old words.

You can watch it happen: on GitHub, the **Actions** tab. A green tick means it published; a
red cross means it did not, and nothing changed on the live site.

## The safety net

**You cannot publish something that breaks a rule.** The tests are a gate, not a formality,
and they publish nothing if one fails. Among the things that will stop your change dead:

- the wordmark stops being **BETR**, or a button starts with a lowercase letter
- one of the ready-made tests, or its "leave out" line, mentions drink, drugs, food, weight
  or self-harm — that rule is about what **BETR** proposes and did not change on 2026-09-08;
  what a person writes for themselves is theirs, and only a sentence about ending it or
  hurting somebody is refused
- a link appears that is not on the allow-list, or anything in the app tries to fetch something
- one of the nine frozen sentences has been reworded
- any of "digital CBT", "improve your mental health", "irrational", "streak", "tracks your
  anxiety" appears anywhere
- one of them ends up with anything other than exactly three "If I…, then…", or two of them
  say the same thing, or one of them does not start with "If"
- one of them stops being behind a door, so nothing in the app leads to it
- a button or a heading calls something a **worry**: since 2026-09-08 the word a person reads
  is **test**. ("Worry" is still allowed where it means the feeling rather than the thing —
  frozen sentence 3, and the two paragraphs of *Why this one sticks*.)

If the run goes red, the live site is untouched — it is still serving the last good version.
Nobody sees a broken app. The worst case is a red cross and a message.

## Three rules that are not enforced by anything but you

The machine cannot check these, and they are the ones that matter most in this file.

1. **Write it fresh.** Not a line from CCI, Getselfhelp, Therapist Aid, Psychology Tools or the
   Beck Institute. All of them restrict reuse in a product.
2. **A prediction has to be able to turn out wrong.** "If I do this, then I'll find it hard" is
   not testable. "If I do this, then they'll go quiet with me" is.
3. **Never write a phone number from memory.** Not yours, not anyone's. Every helpline in
   `helplines.js` was read off the provider's own website on the day recorded next to it. A
   country with no checked number shows no number, on purpose — somebody tries a wrong one
   once and may never try again.

## After a change, one housekeeping job

`docs/COPY.md` is generated, so it goes stale the moment the words change. It is one command
and it is normally done for you — but if you have been editing on github.com for a week, say
so and it gets rebuilt.
