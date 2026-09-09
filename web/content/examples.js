/*
  The finished test on the front screen (B31, 2026-09-08). One of them, complete, before
  anybody is asked about anything of their own.

  WHY THIS FILE EXISTS. The founder's word for it is Present, from their language coaching:
  Present · Practice · Produce. Show somebody they have a gap in something that matters to
  them, let them practise it low-stakes, then have them produce it with their own material.
  BETR had Practice (the stock list) and Produce (a person's own words) and no Present at all,
  so the front screen described a loop instead of showing one, and the founder's own note on
  2026-09-08 was that they had not opened the app since making it.

  In a no-AI, no-person, nothing-leaves-the-phone app, a Present can only be a worked example
  somebody watches. Twenty seconds. WORDS AND NOT VIDEO, and that was assessed rather than
  assumed: words work with wifi off, weigh nothing, need no actor, read aloud on a screen
  reader, and are the very thing the person is about to make. A video would be the one thing
  on the screen they could not do themselves.

  THE FOUNDER'S BAR, in their own words: a handful of words, no long text, no link to go and
  learn. A person reads it and thinks "I wish I had that courage", then sees that anyone does,
  in a safe and controlled way.

  WHAT IT IS NOT, AND THIS IS THE REGULATORY LINE. It is captioned "What one test looks like",
  which makes it a page in a book. Shown as a real person's result it would be a TESTIMONIAL,
  and the MHRA reads a testimonial as an implied claim (research §5.2). So: no name, no
  "most people", no average, no "in two weeks". The ladder moves because that is what happened
  in this example, and the screen never says how far anybody else's will move (rule 5).

  REAL OR EXAMPLE IS THE FOUNDER'S DECISION AND IT IS NOT MADE. This file builds the second
  one. If the founder chooses to use a real result of their own, the caption changes to say
  whose and the numbers become the real ones — one string and four fields.

  THE SHAPE
    prediction  one sentence, "If I ___, then ___", exactly as a person's own is stored
    did         what they actually did. ONE short sentence, and the whole lesson is in how
                small it is — B38, 2026-09-09. The founder's daughter reached "What will you
                do today?" with no idea what was expected of her and said "OH NO I can't
                actually give her a criticism". The screen that teaches by showing was
                skipping the exact beat she stalled on. A novice reads this line and knows
                what size the thing is: one sentence, not a confession
    dropped     optional, and it is the safety behaviour left out — the bit that makes the
                test a test. Quieter than `did` on the card, because it is the second half
    happened    what actually happened. At most two short sentences: the beat between them is
                most of the effect, and it is the one place two is allowed
    from        where the ladder started. Ten, always — that is the premise (scope §3)
    to          where it landed. Between 1 and 9, and it is THIS example's number

  Every phrase is written fresh (rule 8). Nothing is adapted from CCI, Getselfhelp, Therapist
  Aid, Psychology Tools or Beck Institute material.

  ONE IS SHOWN PER OPEN, in this order, chosen by a counter — never at random, so a tester can
  predict which and so a person who reopens sees the next one rather than a shuffle.

  NOT CHOSEN. The founder and Misha pick which of these leads, and whether it is real or an
  example. Until then the first one is the mockup's, which the founder saw and liked.
*/
var BETR_EXAMPLES = [
  {
    /* The mockup's. Founder saw it on 2026-09-08 and said "I love it" of the screen. */
    prediction: 'If I tell my dad I’m struggling, then he’ll change the subject.',
    did: 'Told him one true sentence.',
    dropped: 'Didn’t add “but I’m fine”.',
    happened: 'He went quiet. Then he said “Me too.”',
    from: 10,
    to: 6
  },
  {
    prediction: 'If I ask for the day off, then my boss will think I’m not committed.',
    did: 'Asked for one Friday off.',
    dropped: 'Didn’t explain why.',
    happened: 'She said “fine” and went back to her screen.',
    from: 10,
    to: 7
  },
  {
    prediction: 'If I say no without giving a reason, then they’ll be off with me for weeks.',
    did: 'Said no to one thing.',
    dropped: 'Didn’t offer to make up for it.',
    happened: 'He said “that’s all right” and asked somebody else.',
    from: 10,
    to: 8
  },
  {
    prediction: 'If I let the silence go on, then they’ll think I’ve got nothing to say.',
    did: 'Let one pause run on.',
    dropped: 'Didn’t fill the gap.',
    happened: 'She filled it herself, and told me something she never had before.',
    from: 10,
    to: 7
  }
];

if (typeof module === 'object' && module.exports) module.exports = BETR_EXAMPLES;
else (self.Betr = self.Betr || {}).examples = BETR_EXAMPLES;
