/*
  The rules the content has to pass, in one place, so the tests and the app check the same
  thing. B1 will replace the words in web/content/*.js; it may not replace these rules.
*/
(function (root, factory) {
  var api = factory(
    (typeof module === 'object' && module.exports) ? require('./guards.js')
      : (root.Betr && root.Betr.guards)
  );
  if (typeof module === 'object' && module.exports) module.exports = api;
  else (root.Betr = root.Betr || {}).content = api;
})(typeof self !== 'undefined' ? self : this, function (guards) {

  var LANES = ['social', 'assertiveness', 'perfectionism', 'urge-timing', 'rest', 'sleep'];
  var FIELDS = ['id', 'label', 'belief', 'expect', 'test', 'drop', 'lane'];
  var MAX_VISIBLE = 12;

  /*
    A place on the Help screen has three fields and no fourth. The missing fourth is the
    point: there is nowhere to put a lane, a door, a tag or a score, so nothing on that list
    can ever be chosen for the person by anything they entered (research §5.2, B8).
  */
  var PLACE_FIELDS = ['name', 'url', 'what'];

  /*
    "Why this one sticks" has two fields and no third, for the same reason a place has three
    and no fourth: there is nowhere to put a lane, a condition or a second version, so the
    text can never be chosen for the person by anything they did (research §5.2, B18).
  */
  var WHY_FIELDS = ['what', 'why'];
  var OURS = 'trybeup.com';
  var SHORTENERS = ['bit.ly', 't.co', 'tinyurl.com', 'goo.gl', 'ow.ly', 'buff.ly', 'rebrand.ly', 'lnkd.in'];

  function byId(worries, id) {
    for (var i = 0; i < worries.length; i++) if (worries[i].id === id) return worries[i];
    return null;
  }

  /* Returns a list of plain-English problems. Empty means the list is shippable. */
  function validateWorries(worries) {
    var problems = [];
    var seen = {};

    if (!Array.isArray(worries) || !worries.length) return ['worries.js is empty'];

    if (worries.length > MAX_VISIBLE) {
      problems.push(worries.length + ' items: more than ' + MAX_VISIBLE + ' visible needs a "more" screen (scope §5.3b)');
    }

    worries.forEach(function (f, i) {
      var where = 'item ' + i + ' (' + (f && f.id ? f.id : 'no id') + ')';

      FIELDS.forEach(function (field) {
        if (!f || typeof f[field] !== 'string' || !f[field].trim()) {
          problems.push(where + ' is missing ' + field);
        }
      });
      if (!f) return;

      if (seen[f.id]) problems.push(where + ' reuses the id "' + f.id + '"');
      seen[f.id] = true;

      if (typeof f.belief === 'string' && !/^if\b/i.test(f.belief.trim())) {
        problems.push(where + ' belief does not start with "If"');
      }

      if (LANES.indexOf(f.lane) === -1) {
        problems.push(where + ' lane "' + f.lane + '" is not one of: ' + LANES.join(', '));
      }

      /* The rule that never bends: no test, and no drop line, touches the habit itself. */
      ['test', 'drop'].forEach(function (field) {
        if (typeof f[field] !== 'string') return;
        var v = guards.checkTest(f[field]);
        if (!v.ok) problems.push(where + ' ' + field + ' is refused by the guard (' + v.kind + ': "' + v.word + '")');
      });
    });

    return problems;
  }

  function validateDoors(doors, worries) {
    var problems = [];
    if (!doors || !Array.isArray(doors.items) || !doors.items.length) {
      return ['whats-going-on.js is empty'];
    }
    doors.items.forEach(function (d, i) {
      var where = 'door ' + i + ' (' + (d && d.id ? d.id : 'no id') + ')';
      ['id', 'label', 'under'].forEach(function (field) {
        if (!d || typeof d[field] !== 'string' || !d[field].trim()) problems.push(where + ' is missing ' + field);
      });
      if (!d) return;
      if (!Array.isArray(d.worries) || d.worries.length < 2) {
        problems.push(where + ' should open onto at least two worries');
      } else {
        d.worries.forEach(function (id) {
          if (!byId(worries, id)) problems.push(where + ' points at unknown worry "' + id + '"');
        });
      }
      /* A door names a behaviour. It must never itself read as a test. */
      if (/\btry\b|\btest\b|\btoday\b/i.test(d.label)) {
        problems.push(where + ' label reads like an instruction, not something a person would say about themselves');
      }
    });
    return problems;
  }

  /*
    The Help list. Plain https, no parameters, no shorteners, and ours is never first.
    Returns plain-English problems; empty means the list is shippable, once Misha has read it.
  */
  function validatePlaces(places) {
    var problems = [];
    if (!places || !Array.isArray(places.groups) || !places.groups.length) {
      return ['places.js is empty'];
    }
    if (typeof places.intro !== 'string' || !places.intro.trim()) {
      problems.push('places.js has no intro line');
    }
    if (!Array.isArray(places.reading) || !places.reading.length) {
      problems.push('places.js has nothing to read about CBT');
    } else {
      checkItems('reading', places.reading, problems);
    }

    places.groups.forEach(function (grp, gi) {
      var where = 'group ' + gi + ' (' + ((grp && grp.title) || 'no title') + ')';
      if (!grp || typeof grp.title !== 'string' || !grp.title.trim()) {
        problems.push(where + ' is missing a title');
        return;
      }
      if (!Array.isArray(grp.items) || grp.items.length < 2) {
        problems.push(where + ' needs at least two places in it');
        return;
      }
      checkItems(where, grp.items, problems);
    });

    return problems;
  }

  /* Every link on the Help screen goes through this, wherever on the screen it sits. */
  function checkItems(where, items, problems) {
    items.forEach(function (p, i) {
      var at = where + ' item ' + i + ' (' + ((p && p.name) || 'no name') + ')';
      if (!p || typeof p !== 'object') { problems.push(at + ' is not a place'); return; }

      PLACE_FIELDS.forEach(function (field) {
        if (typeof p[field] !== 'string' || !p[field].trim()) problems.push(at + ' is missing ' + field);
      });
      Object.keys(p).forEach(function (field) {
        if (PLACE_FIELDS.indexOf(field) === -1) {
          problems.push(at + ' has an extra field "' + field + '": a place is three fields, so that nothing here can be picked for the person');
        }
      });
      if (typeof p.url !== 'string') return;

      if (!/^https:\/\/[a-z0-9.-]+(\/[A-Za-z0-9\/._-]*)?$/.test(p.url)) {
        problems.push(at + ' url "' + p.url + '" must be plain https with no query string, no fragment and no odd characters');
      }
      SHORTENERS.forEach(function (short) {
        if (p.url.indexOf('//' + short) !== -1) problems.push(at + ' uses a link shortener');
      });

      /* Rule 9, as amended by B8. Ours is listed, never led with, and never disguised. */
      if (p.url.indexOf(OURS) !== -1) {
        if (i === 0) problems.push(at + ' is ours and is first in its group; it may never be first');
        if (!/made by us/i.test(p.what || '')) {
          problems.push(at + ' is ours and does not say so in the entry itself');
        }
        if (!/\bfree\b/i.test(p.what || '') || !/\bpaid\b|\bcosts?\b/i.test(p.what || '')) {
          problems.push(at + ' is ours and does not say plainly what it costs');
        }
        if (/[?#]/.test(p.url)) problems.push(at + ' is ours and carries a parameter');
      }
    });
  }

  /*
    Every stock worry has an explanation, nothing has one that is not a stock worry, and an
    entry has exactly the two fields. The middle rule is what stops a stale entry surviving a
    worry being removed, which is how a person would end up reading about something that is
    no longer on the list.
  */
  function validateWhy(why, worries) {
    var problems = [];
    if (!why || typeof why !== 'object') return ['why.js is empty'];

    var ids = {};
    (worries || []).forEach(function (f) {
      ids[f.id] = true;
      if (!why[f.id]) problems.push('"' + f.id + '" has no explanation in why.js');
    });

    Object.keys(why).forEach(function (id) {
      var at = 'why.js "' + id + '"';
      if (!ids[id]) problems.push(at + ' is not a worry on the list');

      var entry = why[id];
      if (!entry || typeof entry !== 'object') { problems.push(at + ' is not an entry'); return; }

      WHY_FIELDS.forEach(function (field) {
        if (typeof entry[field] !== 'string' || !entry[field].trim()) {
          problems.push(at + ' is missing ' + field);
        }
      });
      Object.keys(entry).forEach(function (field) {
        if (WHY_FIELDS.indexOf(field) === -1) {
          problems.push(at + ' has a field called "' + field + '". Two fields and no third: ' +
            'a third is somewhere to aim this text at a person');
        }
      });
    });

    return problems;
  }

  return {
    LANES: LANES,
    FIELDS: FIELDS,
    PLACE_FIELDS: PLACE_FIELDS,
    MAX_VISIBLE: MAX_VISIBLE,
    byId: byId,
    validateWorries: validateWorries,
    validateDoors: validateDoors,
    validatePlaces: validatePlaces,
    WHY_FIELDS: WHY_FIELDS,
    validateWhy: validateWhy
  };
});
