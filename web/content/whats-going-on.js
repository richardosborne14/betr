/*
  The second door: "Not sure which? Start from what's going on".

  Founder's call, 2026-09-02 (B0 Q2a). It is the one screen in Betr that names a behaviour
  rather than a worry, and scope §5.3a calls that the closest thing here to the regulatory
  line. Three rules held while writing it:

    1. Every label is what a person would say about themselves in the first person. None is a
       diagnosis, a condition, or a category of person. "Drinking more than I mean to", never
       "problem drinking" and never "for people with…" (research §5.4).
    2. Nothing here claims to treat, fix, reduce or track anything. A door opens onto three or
       four worries from the same fixed list; that is all it does.
    3. Nothing here becomes a test. Tapping a surface problem shows worries, and every test still
       comes from worries.js, so no test can touch the thing named on this screen.

  RELEASE CONDITION: Misha signs off all six labels before this ships to anyone (B0 Q2a).
  Built, not cleared.

  Each item: id, label, under (one sentence naming the worries in plain words), worries (ids).
*/
var BETR_DOORS = {
  intro: 'Tap what’s closest. It just points you at the worries that usually sit under it.',
  foot: 'None of these gets tested. The worry underneath does.',
  items: [
    {
      id: 'drinking',
      label: 'Drinking more than I mean to',
      under: 'Usually underneath: what people will say if you don’t join in, if you tell them you’re cutting back, or if you let anyone see it’s hard.',
      worries: ['drink', 'cut', 'strug', 'no']
    },
    {
      id: 'phone',
      label: 'On my phone more than I want to be',
      under: 'Usually underneath: missing something that matters, and not being able to sit still without it.',
      worries: ['phone', 'sit', 'funny']
    },
    {
      id: 'temper',
      label: 'Snapping at people at home',
      under: 'Usually underneath: that saying something calmly won’t work, so it stays in until it doesn’t.',
      worries: ['angry', 'strug', 'help']
    },
    {
      id: 'yes',
      label: 'Saying yes when I mean no',
      under: 'Usually underneath: that saying no, or stopping a favour, costs you the person.',
      worries: ['no', 'favour', 'help']
    },
    {
      id: 'work',
      label: 'Never switching off from work',
      under: 'Usually underneath: that resting makes you worthless, and one mistake gets held against you.',
      worries: ['rest', 'mist', 'no']
    },
    {
      id: 'secret',
      label: 'Something I’m keeping to myself',
      under: 'Usually underneath: that anyone who found out would think less of you.',
      worries: ['strug', 'cut', 'help']
    }
  ]
};

if (typeof module === 'object' && module.exports) module.exports = BETR_DOORS;
else (self.Betr = self.Betr || {}).doors = BETR_DOORS;
