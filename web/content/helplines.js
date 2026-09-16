/*
  The crisis line for the country a person is actually in (B17).

  BETR used to show 988 and Samaritans 116 123 to everybody on earth. Somebody in Lagos,
  Nairobi or Mexico City got two numbers that do not work where they are. That is not a
  translation problem — it exists in English, and it is the reason this file exists.

  ── The rule that matters more than anything else in this file ──────────────────────────

  EVERY NUMBER HERE WAS READ OFF THE PROVIDER'S OWN WEBSITE BY A PERSON, ON THE DAY IN
  `checked`, AND `source` IS THE PAGE THEY READ IT ON.

  No number is ever written from memory — a person's, or a language model's. They change:
  the US moved to 988 in 2022, charities merge, short codes get reassigned. A confident,
  plausible, out-of-date helpline number is exactly the kind of thing that gets somebody
  hurt. If you are about to type a number you have not read on the provider's site today,
  stop. Leaving a country out is the safe answer and the app already handles it.

  ── Why the list is short ───────────────────────────────────────────────────────────────

  Thirteen countries, not 175. Every one of them is recurring work: somebody re-reads these
  pages at each release, and a stale number is the harm this whole file exists to prevent.
  Growing the list is deliberate and cheap — one entry, one source, one date.

  A country that is not here shows NO PHONE NUMBER AT ALL. It says so plainly and it falls
  through to the local emergency number and to findahelpline.com. Never guess a neighbour's
  line. Never fall back to 988 because it is the one we have. A wrong number is worse than
  no number, because a person tries it, and they may only try once.

  ── The fields ──────────────────────────────────────────────────────────────────────────

    country   the country's name as we write it on screen, "the" and all
    name      the line's name as its own provider writes it
    number    the number as the provider prints it, spaces and all
    tel       the same number, digits only, in the national form somebody there would dial.
              Not international: the person reading it is in that country. web/tests holds
              the rule that a tel: link is digits and nothing else.
    text      true if that same number takes text messages
    free      true only if the provider's own page says the call costs nothing. null means
              the page does not say, and then we say nothing either
    allHours  true only if the page says round the clock. null means it does not say
    language  the language the line answers in, as a code ('nl', 'fr'), where one country needs
              two lines. The app asks the browser for its name in the person's own language —
              "in Dutch", « en néerlandais ». It was an English `note` until B16 (2026-09-16),
              which printed "in French" to somebody reading French
    source    the page it was read on
    checked   the day a person read it

  Nothing here is fetched, ever — no link check, no availability ping, no favicon. That is
  the whole point of BETR and it does not bend for this file (CLAUDE.md rule 1). Which is
  also why the re-checking is a person's job on the release checklist, not the app's.
*/
var BETR_HELPLINES = {

  /* Until somebody's name is here, nobody owns the re-check. B17 leaves this open. */
  owner: null,

  countries: {

    US: { country: 'the United States', lines: [{
      name: '988 Suicide & Crisis Lifeline',
      number: '988', tel: 'tel:988', text: true, free: true, allHours: true,
      source: 'https://988lifeline.org', checked: '2026-09-03'
    }] },

    CA: { country: 'Canada', lines: [{
      name: '9-8-8 Suicide Crisis Helpline',
      number: '988', tel: 'tel:988', text: true, free: null, allHours: true,
      source: 'https://988.ca', checked: '2026-09-03'
    }] },

    GB: { country: 'the United Kingdom', lines: [{
      name: 'Samaritans',
      number: '116 123', tel: 'tel:116123', text: false, free: true, allHours: true,
      source: 'https://www.samaritans.org/how-we-can-help/contact-samaritan/', checked: '2026-09-03'
    }] },

    IE: { country: 'Ireland', lines: [{
      name: 'Samaritans',
      number: '116 123', tel: 'tel:116123', text: false, free: true, allHours: true,
      source: 'https://www.samaritans.org/ireland/how-we-can-help/contact-samaritan/', checked: '2026-09-03'
    }] },

    AU: { country: 'Australia', lines: [{
      name: 'Lifeline',
      number: '13 11 14', tel: 'tel:131114', text: false, free: true, allHours: true,
      source: 'https://www.lifeline.org.au/crisis-support/', checked: '2026-09-03'
    }] },

    NZ: { country: 'New Zealand', lines: [{
      name: '1737, Need to talk?',
      number: '1737', tel: 'tel:1737', text: true, free: true, allHours: true,
      source: 'https://1737.org.nz', checked: '2026-09-03'
    }] },

    ZA: { country: 'South Africa', lines: [{
      name: 'the SADAG Suicide Crisis Helpline',
      number: '0800 567 567', tel: 'tel:0800567567', text: false, free: true, allHours: true,
      source: 'https://www.sadag.org', checked: '2026-09-03'
    }] },

    DE: { country: 'Germany', lines: [{
      name: 'TelefonSeelsorge',
      number: '0800 1110111', tel: 'tel:08001110111', text: false, free: true, allHours: true,
      source: 'https://www.telefonseelsorge.de', checked: '2026-09-03'
    }] },

    NL: { country: 'the Netherlands', lines: [{
      name: '113 Zelfmoordpreventie',
      number: '113', tel: 'tel:113', text: false, free: true, allHours: true,
      source: 'https://www.113.nl/ik-denk-aan-zelfmoord', checked: '2026-09-03'
    }] },

    /*
      Two lines, because Belgium answers in two languages and one number does not cover both.
      This is the reason `lines` is a list and not a single line. It is not a place to put a
      second-best number anywhere else.
    */
    BE: { country: 'Belgium', lines: [
      {
        name: 'Zelfmoordlijn 1813',
        number: '1813', tel: 'tel:1813', text: false, free: true, allHours: true,
        language: 'nl',
        source: 'https://www.zelfmoord1813.be', checked: '2026-09-03'
      },
      {
        name: 'Centre de Prévention du Suicide',
        number: '0800 32 123', tel: 'tel:080032123', text: false, free: null, allHours: null,
        language: 'fr',
        source: 'https://www.preventionsuicide.be', checked: '2026-09-16'
      }
    ] },

    /*
      B16, 2026-09-16. France was in `notShipped` from 2026-09-03 because 3114.fr and the
      government page both refused to be read that day. Both were read on 2026-09-16.

        the number   3114, on https://3114.fr — "Appelez le 3114"
        the hours    "Nous sommes là pour vous répondre, 24h/24, 7j/7", on every page of the site
        the cost     "Partout en France, l'appel et les services de la ligne 3114 sont
                     gratuits", on https://3114.fr/confidentialite-et-gratuite/
        who runs it  "Le 3114 est piloté par le Ministère en charge de la santé"
        where        "en métropole et outre-mer", 18 centres, calls routed to the nearest

      NOT 15. The French state's own page separates numbers to CALL IN AN EMERGENCY (15 SAMU,
      17, 18, 112, 114) from numbers to TALK TO SOMEBODY (3114 and the rest), and BETR's
      crisis block does the same: the first line already says to call the local emergency
      number, and this list is the second thing. 15 is the right number for a medical
      emergency and it is not a listening line, so it does not belong in this file.
      Source for that split: https://www.service-public.gouv.fr/particuliers/actualites/A15841
    */
    FR: { country: 'France', lines: [{
      /* Its own site calls it "le 3114, numéro national de prévention du suicide". `name: '3114'`
         made the screen read "Call 3114 — 3114", so the name is the words and not the digits. */
      name: 'Numéro national de prévention du suicide',
      number: '3114', tel: 'tel:3114', text: false, free: true, allHours: true,
      source: 'https://3114.fr/confidentialite-et-gratuite/', checked: '2026-09-16'
    }] },

    /*
      B16, 2026-09-16, added with France because Switzerland is the other country where a
      French speaker is likely to be reading this.

      `free` is null and stays null: 143.ch says "De jour comme de nuit, personnel, anonyme
      et confidentiel" but says NOTHING about the call being free, and Swiss short codes are
      not always free. The convention in this file is that null means the page did not say,
      and then neither do we. Do not fill this in from anywhere but the provider's own page.
    */
    CH: { country: 'Switzerland', lines: [{
      name: 'La Main Tendue',
      number: '143', tel: 'tel:143', text: false, free: null, allHours: true,
      source: 'https://www.143.ch/fr/', checked: '2026-09-16'
    }] },

    ES: { country: 'Spain', lines: [{
      name: 'Línea 024',
      number: '024', tel: 'tel:024', text: false, free: true, allHours: true,
      source: 'https://www.sanidad.gob.es/linea024/home.htm', checked: '2026-09-03'
    }] },

    IT: { country: 'Italy', lines: [{
      name: 'Telefono Amico Italia',
      number: '02 2327 2327', tel: 'tel:0223272327', text: false, free: true, allHours: true,
      source: 'https://www.telefonoamico.it', checked: '2026-09-03'
    }] },

    BR: { country: 'Brazil', lines: [{
      name: 'CVV',
      number: '188', tel: 'tel:188', text: false, free: true, allHours: true,
      source: 'https://www.cvv.org.br', checked: '2026-09-03'
    }] }

  },

  /*
    Read but not shipped on 2026-09-03, and why. Kept so the next person does not spend the
    afternoon finding out the same thing.

      FR  read and shipped on 2026-09-16 (B16). It is above. On 2026-09-03 both 3114.fr and
          the government's page refused to be read, and it was left out rather than typed
          from memory — which is the rule working, not the rule failing.
      IN  telemanas.mohfw.gov.in served a certificate that would not verify.
      SG  sos.org.sg returned 503, mindline.sg returned 403.
      KE  no national provider page could be reached at all.
      NG, PH, MY, PL, SE, PT, JP, MX  not attempted. Real countries, real people, no excuse
          other than time. These are the next entries somebody should add.
  */
  notShipped: ['IN', 'SG', 'KE']
};

if (typeof module === 'object' && module.exports) module.exports = BETR_HELPLINES;
else (self.Betr = self.Betr || {}).helplines = BETR_HELPLINES;
