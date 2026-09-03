/*
  "Why this one sticks" — one short explanation per worry, shown after a person has a result.

  B18, 2026-09-03. The app tells somebody what to do and what to leave out, and never says
  why leaving it out is the whole point. This is that, in two short paragraphs each.

  B19, 2026-09-03: twenty-one of them. Ten were written when the list grew, and `cut` was
  deleted with its worry — an explanation may never outlive the worry it explains, or somebody
  reads about something that is no longer on the list. validateWhy() fails the build on it.

  TWO FIELDS AND NO THIRD, and the missing third is the point. An entry is keyed by a worry
  id and by nothing else: everybody who taps that worry reads exactly the same words, forever.
  Fixed content a person chooses to read is a chapter in a book; content picked for somebody
  is a device (research §5.2, scope §5.2). So there is nowhere here to hang the wiring off.

    - nothing in this file may read S.done, a ladder, a rung, a re-rate or a missed test
    - no `lane`, no `forDoor`, no `ifStuck`, no second version for somebody on their fifth go
    - if you are adding a field to route or vary this text, stop. That is the line.

  What each entry does, in order:
    what  what the worry actually is, underneath the situation. Never what the person is
    why   why it holds — which safety behaviour keeps it from being tested, and what dropping
          it finds out. This is the paragraph that earns the screen

  Three things none of them does, and a new one must not either:
    1. It never says what will happen. Predicting the result would answer the experiment
       before the person runs it, and a worry that came true is data too (rule 6).
    2. It never says anything about the reader — no "people who worry about this are…",
       no cause, no history, no condition. It describes a loop, not a person.
    3. It never claims to fix, treat or reduce anything. The frozen sentences on Help say
       what this is; nothing here may say more than they do.

  Every word is ours (rule 8). General CBT explanation is exactly what CCI, Getselfhelp,
  Therapist Aid, Psychology Tools and the Beck Institute publish, and all of them restrict
  reuse. Nothing here is adapted from any of it.

  The closing line is not in this file: it is one frozen sentence in strings-en.js
  (`why.foot`), identical under all of them, so it is written once and translated once.

  It is a .js file for the reason worries.js is: a browser will not fetch JSON off the
  filesystem. Still plain data, no logic.
*/
var BETR_WHY = {

  no: {
    what: 'The worry here isn’t really about the no. It’s about what the no seems to say ' +
      'about you — that you’re difficult, or that you don’t care. The excuse is what makes ' +
      'it feel allowed.',
    why: 'Which is why it never settles. Every time you explain yourself and it goes fine, ' +
      'the explanation gets the credit. The plain no stays untested, so the worry keeps its ' +
      'shape. That’s what dropping the excuse is for: do it once without, and whatever ' +
      'happens is about the no.'
  },

  help: {
    what: 'Underneath this one is usually a rule about what you’re allowed to cost people. ' +
      'Asking feels like spending something you haven’t got, so you either don’t ask, or ' +
      'you ask and immediately pay it back.',
    why: 'Paying it back is the part that keeps it going. Offer something in return and you ' +
      'never find out how the asking landed on its own — only how the trade landed. Ask ' +
      'without the balancing act and whatever comes back is about you asking.'
  },

  reply: {
    what: 'Answering fast can start as being considerate and quietly turn into a rule. Once ' +
      'it’s a rule, a message sitting unanswered stops being a message and starts being ' +
      'evidence of something about you.',
    why: 'The apology at the top of the late reply is what holds it in place. It repairs the ' +
      'silence before anybody has reacted to it, so you never learn whether the silence ' +
      'needed repairing. Leave one, answer plainly, and read what actually comes back.'
  },

  check: {
    what: 'Checking again is rarely about catching mistakes. It’s about the feeling that ' +
      'turns up when you imagine not checking, and the second read is what makes that ' +
      'feeling go away.',
    why: 'So the relief teaches the wrong thing. Nothing went wrong, and the checking gets ' +
      'the credit for it, which is why one more read never feels optional. The only way to ' +
      'find out what it is actually worth is to send one without it.'
  },

  sit: {
    what: 'This one is a prediction about a feeling rather than about people: that ' +
      'restlessness climbs and keeps climbing until you do something. It is the hardest ' +
      'worry on this list to doubt, because standing still long enough to watch is exactly ' +
      'the thing it stops you doing.',
    why: 'Doing something works within seconds, every time — and that is the problem. Fast ' +
      'relief is a very good teacher, and what it teaches is that the feeling was on its way ' +
      'somewhere. Ten minutes of nothing is not endurance. It is the only way to see what ' +
      'the feeling does when it is left alone.'
  },

  phone: {
    what: 'The worry usually isn’t about the phone. It’s about being unreachable — that ' +
      'something will need you in the gap, and that not being there will mean something ' +
      'about you.',
    why: 'Checking once settles it, and settling it is why the question never gets answered. ' +
      'You find out that nothing happened this time, which is not the same as finding out ' +
      'what happens. A whole evening, and a list in the morning of what actually came in, ' +
      'is a real answer either way.'
  },

  strug: {
    what: 'Of everything on this list, this is the one people tend to be surest about: that ' +
      'being seen having a hard time changes what somebody thinks you are. So it stays in, ' +
      'and what stays in gets heavier.',
    why: '“But I’m fine” at the end is the crutch, and it is a good one — it takes the ' +
      'weight out before anybody has to respond to it. Which means what comes back is a ' +
      'response to the lighter version. Say the true thing, keep it small, and then stop.'
  },

  mist: {
    what: 'The dread here is usually about a record rather than a moment. Not that today ' +
      'goes badly, but that it gets written down somewhere and comes back later.',
    why: 'Which is why the fixing and the explaining arrive first. Turn up with it already ' +
      'solved and you find out how people take a solved problem; you learn nothing about ' +
      'how they take you getting something wrong. Say it before it is tidy.'
  },

  angry: {
    what: 'This worry is usually built out of real evidence — arguments that genuinely did ' +
      'go badly. What the evidence doesn’t separate is the annoyance itself from how it ' +
      'arrived: often loud, often late, often carrying four other things with it.',
    why: 'So the belief has never had a clean test. One thing, one sentence, calmly, then ' +
      'stop talking is not a technique for winning. It is the version that finds out whether ' +
      'saying it was the problem, or whether the way it was said was.'
  },

  rest: {
    what: 'This one is a rule about what makes you worth anything, and it rarely feels like ' +
      'a belief at all. It feels like a plain fact about how much there is to do.',
    why: '“I’ll just quickly do this one thing” is what keeps it from ever being checked. ' +
      'The rest never happens on its own terms, so the guilt is never met with two real ' +
      'hours of it. Take the hours first, and notice what the guilt does across them.'
  },

  drink: {
    what: 'The worry is about being looked at, not about what is in the glass. Standing out ' +
      'feels like the cost, and most of that cost is paid in advance, in your head, rather ' +
      'than on the night.',
    why: 'A reason ready at the door, or a glass held as cover, means you never find out. ' +
      'Both work — nobody asks — and both keep the prediction alive. Turn up without either ' +
      'and count what is actually said. Whatever the number is, it is a real one.'
  },

  feed: {
    what: 'Keeping up starts as interest and turns into insurance. Once it is insurance, an hour ' +
      'without looking is not an hour off. It is a gap, and something could be happening in it ' +
      'that you would be the last to hear about.',
    why: 'Every look closes the gap, and closing it is why the question never gets asked. What you ' +
      'learn is that you are up to date right now, which says nothing about what a day away ' +
      'actually costs. A day away, and a list at the end of it, is the first real number there ' +
      'has been.'
  },

  enough: {
    what: 'The standard in this one is rarely about the work. It is about what handing something in ' +
      'seems to say about how much you care — so the last hour of polish is doing a job that has ' +
      'nothing to do with the thing being polished.',
    why: 'And the polish always takes the credit. Nothing goes wrong, so the extra hour looks ' +
      'necessary, and there is no version of the job where you find out what good enough lands ' +
      'like on its own. Stopping once, and writing down the time you stopped, is the only way to ' +
      'see the difference between the two.'
  },

  praise: {
    what: 'Saying something good about somebody puts you slightly in the open. The worry is not ' +
      'usually the compliment. It is the silence after it, and what that silence would seem to ' +
      'say about why you said it.',
    why: 'Which is what the follow-up is for. One about yourself, or a wait for one back, turns a ' +
      'gift into a trade — and a trade cannot land badly, because nothing has been given. Say it, ' +
      'stop, and let the quiet be whatever it is.'
  },

  care: {
    what: 'This one is rarely about the other person at all. It is about being the one who said it: ' +
      'the one who cares more, out loud, with nothing coming the other way.',
    why: 'The joke is the way out, and it is a good one — turn it into a laugh and nothing was ' +
      'risked, so nothing can be lost. It also means what comes back is a response to the joke. ' +
      'Say the plain version, then stop talking, and whatever happens is a response to you.'
  },

  low: {
    what: 'There is a difference between having a hard week and being low, and most people can say ' +
      'the first and not the second. Underneath the second is usually a rule about weight — that ' +
      'a mood is something other people have to carry, and that handing it over costs them.',
    why: '“It’s nothing really” is how that weight gets lifted back off them before anybody has had ' +
      'to hold it. It is quick, it is kind, and it means the sentence is never actually tested. ' +
      'One sentence, no taking it back, and then let them answer.'
  },

  right: {
    what: 'Being right and being any good get welded together somewhere, and after that a conceded ' +
      'point is not a point. It is evidence, going into somebody’s file on whether you know what ' +
      'you are doing.',
    why: 'The “but” is what stops the filing, and it works every time, so the weld holds. Add a ' +
      'counterpoint and the exchange ends level, which teaches nothing about what conceding ' +
      'actually costs. Say the plain agreement, stop there, and find out.'
  },

  hear: {
    what: 'Interrupting gets read as rudeness. Underneath it is more often a worry about being passed ' +
      'over — that a conversation is a queue, and a turn not taken quickly is a turn given away.',
    why: 'Getting in early settles that, and settling it is the problem: whether waiting costs you ' +
      'the turn is not something you can know, because you have never waited. Let one person ' +
      'finish, ask one question first, and the answer arrives on its own.'
  },

  joke: {
    what: 'A joke is a real skill, and it also makes a very good door. Get one in early enough and ' +
      'nobody gets close — which is a fine trade, right up until it stops being a choice and ' +
      'becomes the only way you know how to be in a room.',
    why: 'It works, and that is the trouble. The laugh comes back immediately, the plain version ' +
      'never gets tried, and what people are actually there for stays a guess. One conversation, ' +
      'said straight, is the only way to find out.'
  },

  sorry: {
    what: 'The dread here is about a record rather than a moment. An apology feels like a signed ' +
      'admission, filed somewhere, ready to be produced the next time there is an argument.',
    why: 'So the explanation arrives alongside it — the day you were having, the reason it happened. ' +
      'That softens the admission into something conditional, and what comes back is a response ' +
      'to the conditions. Say the plain one, one sentence, and let it stand.'
  },

  early: {
    what: 'Leaving early feels like a verdict on the evening, and by extension on everybody still in ' +
      'it. The worry is not about being tired. It is about what going home seems to say about how ' +
      'much you wanted to be there.',
    why: 'A reason at the door, or a promise about next time, is what keeps that from being tested. ' +
      'Both work, both end the conversation, and both mean you go home knowing nothing. Decide ' +
      'the time first, say one sentence, and go.'
  }
};

if (typeof module === 'object' && module.exports) module.exports = BETR_WHY;
else (self.Betr = self.Betr || {}).why = BETR_WHY;
