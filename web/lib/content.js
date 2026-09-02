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

  function byId(fears, id) {
    for (var i = 0; i < fears.length; i++) if (fears[i].id === id) return fears[i];
    return null;
  }

  /* Returns a list of plain-English problems. Empty means the list is shippable. */
  function validateFears(fears) {
    var problems = [];
    var seen = {};

    if (!Array.isArray(fears) || !fears.length) return ['fears.js is empty'];

    if (fears.length > MAX_VISIBLE) {
      problems.push(fears.length + ' items: more than ' + MAX_VISIBLE + ' visible needs a "more" screen (scope §5.3b)');
    }

    fears.forEach(function (f, i) {
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

  function validateDoors(doors, fears) {
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
      if (!Array.isArray(d.fears) || d.fears.length < 2) {
        problems.push(where + ' should open onto at least two fears');
      } else {
        d.fears.forEach(function (id) {
          if (!byId(fears, id)) problems.push(where + ' points at unknown fear "' + id + '"');
        });
      }
      /* A door names a behaviour. It must never itself read as a test. */
      if (/\btry\b|\btest\b|\btoday\b/i.test(d.label)) {
        problems.push(where + ' label reads like an instruction, not something a person would say about themselves');
      }
    });
    return problems;
  }

  return {
    LANES: LANES,
    FIELDS: FIELDS,
    MAX_VISIBLE: MAX_VISIBLE,
    byId: byId,
    validateFears: validateFears,
    validateDoors: validateDoors
  };
});
