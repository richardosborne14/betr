/*
  The doors. Since B19 this is the way in, not the side door.

  Founder's call, 2026-09-02 (B0 Q2a), and amended 2026-09-03 (B19) after two people were
  watched using the app. Both stalled on the pick list and neither stalled here: a door gives
  a label *and* a line under it, and that is the shape a person can read. So the front screen's
  one big button now leads here, and the worries behind a door carry their own sentence.

  It is still the one screen in Betr that names a behaviour rather than a worry, and scope
  §5.3a calls that the closest thing here to the regulatory line. That reasoning did not
  change when the door moved to the front; three rules hold exactly as they did:

    1. Every label is what a person would say about themselves in the first person. None is a
       diagnosis, a condition, or a category of person (research §5.4).
    2. Nothing here claims to treat, fix, reduce or track anything. A door opens onto four to
       six worries from the same fixed list; that is all it does.
    3. Nothing here becomes a test. Tapping a surface problem shows worries, and every test
       still comes from worries.js, so no test can touch the thing named on this screen.

  WHAT `under` IS FOR NOW. It used to preview the worries — "usually underneath: what people
  will say if…" — because the worries themselves said almost nothing. They say it themselves
  now, so `under` does the other job: recognition. What this looks like from the inside, so a
  person knows in one line whether this is their door.

  `note` IS A SAFETY LINE AND IT IS ON ONE DOOR (founder, 2026-09-03, option c). The first
  door names drink and drugs, which is the wording people find themselves in fastest and also
  the wording that calls to the person frozen sentence 4 excludes — "or are dependent on
  alcohol or drugs. Those need a person, not an app." So that door says so, in the same words,
  at the one moment it is relevant. It is optional and no other door has one. It is not a
  place to hang anything else: web/lib/content.js allows the four fields and no fifth, for the
  reason a place on the Help screen has three — there must be nowhere to put a rule that shows
  one person different words from another.

  RELEASE CONDITION: Misha signs off all six labels, all six lines and the note before this
  ships to anyone (B0 Q2a). B19 rewrote every one of them, so his read is of six new doors.
  Built, not cleared.
*/
var BETR_DOORS = {
  intro: 'Tap what’s closest. It just points you at the worries that usually sit under it.',
  foot: 'None of these gets tested. The worry underneath does.',
  items: [
    {
      id: 'habit',
      label: 'Something I keep doing more than I mean to',
      under: 'The one you’ve quietly decided to stop more than once, and haven’t — drink, weed, porn, betting. BETR never goes near the thing itself. Only what you think happens if people see you without it.',
      note: 'If you’re dependent on alcohol or drugs, this isn’t the right thing. Help has places that are.',
      worries: ['sit', 'drink', 'early', 'strug', 'no']
    },
    {
      id: 'phone',
      label: 'On my phone more than I want to be',
      under: 'Picking it up without deciding to, and the evening’s gone. Half of it is the scroll. Half is not being able to sit still without it.',
      worries: ['phone', 'feed', 'sit', 'reply']
    },
    {
      id: 'temper',
      label: 'Taking it out on the people closest to me',
      under: 'Snapping, going quiet, talking down to people, not really listening — and knowing it while you’re doing it.',
      worries: ['praise', 'hear', 'angry', 'sorry', 'right', 'joke']
    },
    {
      id: 'secret',
      label: 'Keeping it all to myself',
      under: 'Nobody around you knows the half of it. Not hiding it exactly; it just never seems like the moment.',
      worries: ['care', 'strug', 'low', 'mist', 'help']
    },
    {
      id: 'yes',
      label: 'Going along with things I don’t want to do',
      under: 'Yes when you meant no. Nothing said when something’s annoyed you. An answer sent the second the message lands.',
      worries: ['reply', 'no', 'angry', 'help']
    },
    {
      id: 'work',
      label: 'Never letting myself stop',
      under: 'There’s always something left, so sitting down feels like getting away with something. Nothing you hand over is quite finished either.',
      worries: ['rest', 'enough', 'check', 'mist']
    }
  ]
};

if (typeof module === 'object' && module.exports) module.exports = BETR_DOORS;
else (self.Betr = self.Betr || {}).doors = BETR_DOORS;
