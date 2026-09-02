/*
  The re-rate, after the test.

  Four buttons, not a 0–100 slider. The slider was the single most "learn this first" element
  of every rejected prototype; four words are the same re-rating with nothing to learn. The
  numbers exist so a result can be compared with the one before it, and are never shown.

  Nothing here is a score, and nothing is added up. There is no total, no average, no trend.
*/
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else (root.Betr = root.Betr || {}).rate = api;
})(typeof self !== 'undefined' ? self : this, function () {

  var CHOICES = [
    { key: 'still', label: 'Still sure', value: 80 },
    { key: 'bit', label: 'A bit less sure', value: 55 },
    { key: 'lot', label: 'A lot less sure', value: 30 },
    { key: 'none', label: 'Not sure at all', value: 10 }
  ];

  function byKey(key) {
    for (var i = 0; i < CHOICES.length; i++) if (CHOICES[i].key === key) return CHOICES[i];
    return null;
  }

  function valueOf(key) {
    var c = byKey(key);
    return c ? c.value : null;
  }

  return { CHOICES: CHOICES, byKey: byKey, valueOf: valueOf };
});
