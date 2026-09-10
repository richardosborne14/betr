# A bank of finished tests, for the reels

> Written 2026-09-10, for the founder and Misha. **Nothing here is in the app.** It is content
> for posts, and it needs no developer. The "how to post" guide is
> [`posting-on-social.md`](posting-on-social.md); this is the raw material for its Format A.

---

## 0. What you asked, and the answer

**The app's front screen has four.** They live in
[`web/content/examples.js`](../web/content/examples.js) and the app shows **one per open**.

**Fixed 2026-09-10, after you reported it never changed.** It didn't, and there were two
reasons. BETR writes nothing at all for somebody who has never used it — so on a fresh install
the "which one next" count was thrown away every time you closed it, and every open was the
first card. And closing a home-screen app usually doesn't shut it down; the phone hands the same
page back, so nothing runs again anyway. Both are fixed:

- **Close it and open it** — you get the next one, every time, all the way round the four.
- **A phone that has never had a test locked in** opens on a random one of the four.
- **Once you've locked in a test**, it cycles in order, so you can say in advance which is next.
- **Coming back to a test you were halfway through** doesn't swap anything — you get the screen
  you left.

**Four is a deliberate cap, not an accident.** A test in
[`web/tests/content.test.js`](../web/tests/content.test.js) fails the build at five, with the
reason written next to it: *"up to four: more is a gallery, and one per open stops being
predictable."* The front screen is a Present — one worked example somebody watches — and a
scrolling wall of them is a different thing.

**But a reel doesn't have to come from that screen.** So below are **twenty more**, one for each
worry in the app, ready to put on a card. Whether any of them should *also* go in the app is
your call — see §4.

---

## 1. The one rule that makes these safe

Every one of these is **an example, not somebody's result.**

Posted as a real person's outcome, a result card is a **testimonial**, and the MHRA reads a
testimonial as an implied claim that the thing works (research §5.2). That is the line between
a page in a book and a medical device.

So on every card, or in the first line of every caption:

> **What one test looks like**

No name. No "most people". No "in two weeks". No average. The number comes down because that is
what happened *in this example*, and the card never says how far anybody else's will move.

---

## 2. The four already in the app

These are the ones a phone will show you if you just open BETR and film it.

**1.** _If I tell my dad I’m struggling, then he’ll change the subject._  
· Did: Told him one true sentence.  
· Left out: Didn’t add “but I’m fine”.  
· Happened: He went quiet. Then he said “Me too.”  
· Ladder: 10 → 6

**2.** _If I ask for the day off, then my boss will think I’m not committed._  
· Did: Asked for one Friday off.  
· Left out: Didn’t explain why.  
· Happened: She said “fine” and went back to her screen.  
· Ladder: 10 → 7

**3.** _If I say no without giving a reason, then they’ll be off with me for weeks._  
· Did: Said no to one thing.  
· Left out: Didn’t offer to make up for it.  
· Happened: He said “that’s all right” and asked somebody else.  
· Ladder: 10 → 8

**4.** _If I let the silence go on, then they’ll think I’ve got nothing to say._  
· Did: Let one pause run on.  
· Left out: Didn’t fill the gap.  
· Happened: She filled it herself, and told me something she never had before.  
· Ladder: 10 → 7

---

## 3. Twenty more — one for every worry in the app

**Each one uses a prediction the app already carries, word for word.** That matters: you can
open BETR, walk that exact worry, and film the real screen rather than building a card in an
image editor. The worry's name is in brackets so you can find it — it is the label on the
button in *Your worries*.

Each is checked against the same rules as the four in the app: one sentence for the prediction,
one short sentence for what you did, at most two for what happened, nothing naming the drink,
the screen, food, the body, anyone's safety, or a diagnosis, and nothing from the banned-phrase
list. Every phrase is written fresh (rule 8).

### 1. Sitting still when I feel restless  `sit`

> **You expected**  
> ~~If I sit with the restlessness for ten minutes, then it’ll build until I have to do something about it.~~
>
> **What you did**  
> Sat for ten minutes with a timer.  
> **What you left out**  
> Didn’t get up to tidy something.
>
> **What actually happened**  
> It peaked about minute four. Then it just got boring.
>
> **How sure you are it goes badly:** started 10 → now 6

### 2. A day without checking social media  `feed`

> **You expected**  
> ~~If I go a day without opening the apps I scroll, then I’ll be the only one who hasn’t heard something.~~
>
> **What you did**  
> Went one whole day without opening them.  
> **What you left out**  
> Didn’t check last thing at night.
>
> **What actually happened**  
> Nobody mentioned anything I’d missed.
>
> **How sure you are it goes badly:** started 10 → now 5

### 3. Handing something over before it’s perfect  `enough`

> **You expected**  
> ~~If I hand over something at good enough, then it’ll come straight back to me with a list.~~
>
> **What you did**  
> Sent it at good enough.  
> **What you left out**  
> Didn’t read it through a fourth time.
>
> **What actually happened**  
> One typo came back. Nothing else did.
>
> **How sure you are it goes badly:** started 10 → now 5

### 4. Resting when there’s stuff to do  `rest`

> **You expected**  
> ~~If I rest for two hours while there’s still stuff to do, then I won’t start again today.~~
>
> **What you did**  
> Rested two hours in the afternoon.  
> **What you left out**  
> Didn’t set an alarm to cut it short.
>
> **What actually happened**  
> Started again at five and got more done than the morning.
>
> **How sure you are it goes badly:** started 10 → now 4

### 5. Paying someone a compliment  `praise`

> **You expected**  
> ~~If I say one specific good thing to somebody out loud, then it’ll come out wrong and make things awkward.~~
>
> **What you did**  
> Told her the thing I actually meant.  
> **What you left out**  
> Didn’t turn it into a joke after.
>
> **What actually happened**  
> She said thanks and looked pleased. That was it.
>
> **How sure you are it goes badly:** started 10 → now 4

### 6. Telling someone they matter to me  `care`

> **You expected**  
> ~~If I tell somebody one specific thing I’m glad about them, then somebody will wonder what’s brought this on.~~
>
> **What you did**  
> Told my brother one specific thing.  
> **What you left out**  
> Didn’t add “anyway, ignore me”.
>
> **What actually happened**  
> He laughed, then told me one back.
>
> **How sure you are it goes badly:** started 10 → now 5

### 7. Leaving later than I normally would  `ontime`

> **You expected**  
> ~~If I leave ten minutes later than I normally would, then I’ll be late and it’ll look bad.~~
>
> **What you did**  
> Left ten minutes later than usual.  
> **What you left out**  
> Didn’t take the earlier train as backup.
>
> **What actually happened**  
> Got there with four minutes to spare.
>
> **How sure you are it goes badly:** started 10 → now 6

### 8. Saying no without giving a reason  `no`

> **You expected**  
> ~~If I say no to somebody without giving a reason, then somebody will think I’m selfish.~~
>
> **What you did**  
> Said no, and stopped talking.  
> **What you left out**  
> Didn’t explain myself afterwards.
>
> **What actually happened**  
> She said “no worries” and moved on.
>
> **How sure you are it goes badly:** started 10 → now 6

### 9. Asking someone for help  `help`

> **You expected**  
> ~~If I ask somebody for one small, specific favour, then I become a burden to somebody.~~
>
> **What you did**  
> Asked a neighbour to take a parcel in.  
> **What you left out**  
> Didn’t say “only if it’s no trouble”.
>
> **What actually happened**  
> He took it, and asked me to do the same next week.
>
> **How sure you are it goes badly:** started 10 → now 4

### 10. Telling someone I’ve been feeling low  `low`

> **You expected**  
> ~~If I tell somebody I’ve been feeling low lately, then somebody will start worrying about me.~~
>
> **What you did**  
> Told a friend I’d had a flat few weeks.  
> **What you left out**  
> Didn’t finish with “but it’s fine”.
>
> **What actually happened**  
> She said she’d had the same in January.
>
> **How sure you are it goes badly:** started 10 → now 6

### 11. Telling someone I’m struggling  `strug`

> **You expected**  
> ~~If I tell somebody one true thing I’m finding hard, then somebody will think less of me.~~
>
> **What you did**  
> Told my manager one true thing.  
> **What you left out**  
> Didn’t lead with an apology.
>
> **What actually happened**  
> She moved a deadline and never mentioned it again.
>
> **How sure you are it goes badly:** started 10 → now 5

### 12. Telling someone they’ve annoyed me  `angry`

> **You expected**  
> ~~If I tell somebody one thing they’ve done that annoyed me, then it’ll turn into an argument.~~
>
> **What you did**  
> Named the one thing, once.  
> **What you left out**  
> Didn’t soften it into a joke.
>
> **What actually happened**  
> He said he hadn’t realised. It took about a minute.
>
> **How sure you are it goes badly:** started 10 → now 5

### 13. Letting someone else be right  `right`

> **You expected**  
> ~~If I tell somebody they’re right and leave it there, then somebody will talk over me from then on.~~
>
> **What you did**  
> Said “you’re right” and stopped.  
> **What you left out**  
> Didn’t add my own point after it.
>
> **What actually happened**  
> He asked what I thought about the next bit.
>
> **How sure you are it goes badly:** started 10 → now 6

### 14. Letting someone finish without interrupting  `hear`

> **You expected**  
> ~~If I let somebody finish before I say my bit, then I’ll forget what I was going to say.~~
>
> **What you did**  
> Let her finish the whole thing.  
> **What you left out**  
> Didn’t jump in at the pause.
>
> **What actually happened**  
> I still had it when she stopped. She’d answered half of it.
>
> **How sure you are it goes badly:** started 10 → now 6

### 15. Getting through a conversation without a joke  `joke`

> **You expected**  
> ~~If I say the plain thing to somebody where I’d normally reach for the joke, then I’ll be dull and somebody will drift off.~~
>
> **What you did**  
> Said the plain version instead.  
> **What you left out**  
> Didn’t undercut it with a joke.
>
> **What actually happened**  
> The conversation got longer, not shorter.
>
> **How sure you are it goes badly:** started 10 → now 5

### 16. Apologising without explaining myself  `sorry`

> **You expected**  
> ~~If I say sorry to somebody for one specific thing I did, then somebody will hold it over me from now on.~~
>
> **What you did**  
> Said sorry for the one thing.  
> **What you left out**  
> Didn’t explain why I’d done it.
>
> **What actually happened**  
> She said “thank you for saying that”. It never came up again.
>
> **How sure you are it goes badly:** started 10 → now 4

### 17. Turning up and not joining in  `drink`

> **You expected**  
> ~~If I turn up to the next thing and don’t join in, then everyone will notice and ask me why.~~
>
> **What you did**  
> Turned up and stayed two hours.  
> **What you left out**  
> Didn’t line up an excuse to leave early.
>
> **What actually happened**  
> One person asked once. Nobody asked again.
>
> **How sure you are it goes badly:** started 10 → now 5

### 18. Leaving before everyone else does  `early`

> **You expected**  
> ~~If I leave at the time I decided and say plainly that I’m going, then they’ll talk about me once I’ve gone.~~
>
> **What you did**  
> Left at ten, and said so.  
> **What you left out**  
> Didn’t invent somewhere else to be.
>
> **What actually happened**  
> Two people said they should do the same.
>
> **How sure you are it goes badly:** started 10 → now 6

### 19. Asking for what I actually want  `want`

> **You expected**  
> ~~If I ask somebody straight out for what I actually want, then I’ll get a no and feel stupid for asking.~~
>
> **What you did**  
> Asked straight out, in one sentence.  
> **What you left out**  
> Didn’t offer them a way out of it.
>
> **What actually happened**  
> I got a yes. It took about ten seconds.
>
> **How sure you are it goes badly:** started 10 → now 4

### 20. Saying what I actually think  `think`

> **You expected**  
> ~~If I tell somebody what I actually think, then somebody will go quiet with me.~~
>
> **What you did**  
> Said what I actually thought.  
> **What you left out**  
> Didn’t dress it up as a question.
>
> **What actually happened**  
> He disagreed, and we carried on talking.
>
> **How sure you are it goes badly:** started 10 → now 5

---

## 4. Decisions that are not mine

| # | Decision | Whose |
| --- | --- | --- |
| 1 | Whether any of these twenty replace or join the four on the front screen. Joining means raising the cap of four, and the reason for the cap is real — see §0 | Founder |
| 2 | Which of the four leads the front screen, and whether it stays an example or becomes a real result of yours (already open — [`NEXT-SESSION.md`](NEXT-SESSION.md) §3) | Founder |
| 3 | The caption line on the cards — "What one test looks like" is the app's wording, and §1 is why it can't just be dropped | Founder + Misha |
| 4 | Tone. These are written in the app's voice; a reel may want a flatter one | **Misha** |

**What is not a decision:** §1. A card posted without the example framing is a testimonial, and
that is the one thing on this page that isn't a preference.

---

## 5. If you want more

Twenty is one per worry, but the app carries **sixty predictions** — every worry has three, and
each of the other two is another card. Ask and they get written and checked the same way. The
limit is not the supply; it is that each one needs a "what actually happened" written for it,
and that sentence is the whole post.
