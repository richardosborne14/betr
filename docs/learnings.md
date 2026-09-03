# Learnings

Hard-won, non-obvious things. Add an entry when something took more than thirty minutes to
understand or when a decision was reversed.

## 2026-09-01 — the interface

- **The founder rejects anything that has to be learned.** An app with tabs, an index card
  with labelled fields, and a scripted chat were each rejected within a minute. The approved
  shape is one big button that hands the person a pre-written test. When in doubt, remove a
  field, don't add a hint.
- **A chat shape reads as "an AI that wants your secrets" even with no AI in it.** The
  presence of a conversation is the tell, not the technology behind it.
- **Pre-written expectations are what removed the last typing step.** The person edits only
  if they want to. Typing is reserved for after the test, when they have something to say.

## 2026-09-01 — where it lives

- Decided "same repo as TrybeUP" and reversed it within the hour. The reason it reversed:
  "shares nothing with TrybeUP" has to be visible to anyone reading the source, and a folder
  inside another product's monorepo cannot say that.

## 2026-09-02 — building v1

- **A page opened off the filesystem cannot fetch JSON and cannot load an ES module.** Both are
  blocked as cross-origin from a `file://` page. Since the founder sees Betr by opening
  `web/index.html` directly, the content had to be `content/worries.js` rather than
  `worries.json`, and the library files had to be classic scripts with a small export shim
  rather than ES modules. Both the scope and B4's plan had assumed otherwise. It is still one
  plain array with no logic in it, and it is edited exactly as JSON would be.
- **A CSP that says `script-src 'self'` blocks the page's own scripts when it is opened off
  disk**, because `file://` is an opaque origin that `'self'` does not match. Adding `file:`
  to the source lists fixes it and costs nothing, because over https a `file:` URL cannot be
  loaded at all. `connect-src 'none'` is the line that actually matters and has no exception.
- **`node --test web/tests/` does not work on Node 22.** A directory as a positional argument
  is treated as a module path and fails with `MODULE_NOT_FOUND`, which reads like a broken
  test rather than a broken command. `node --test` on its own, from the repo root, finds
  everything. CLAUDE.md and B4 both said the broken form; both are corrected.
- **"Delete everything" was writing an empty record straight back**, because the next tap
  saved the blank state under the same key. Now a state with nothing in it removes the key
  instead of writing. An app that has never been used and an app that has just been wiped both
  leave the browser's storage genuinely empty, which is what the word "everything" promises.
- **The habit guard has to cover the "what will you leave out" line, not just the test.**
  Otherwise the habit walks in the back door: test "go to the party", leave out "don't drink".
  Guarding only the field the scope named would have shipped a hole.
- **Eighty lines of fake DOM in a test file paid for itself immediately.** It found that
  *back*, after repeating a person's own test, dropped them into the half-finished entry
  screens. No unit test could see that, and it would otherwise have been found by a person on
  a phone in the middle of their second loop. It is not a browser and does not replace the
  phone walk in `docs/journeys.md`.
- **Relative words stored as absolute numbers cannot show progress, and nobody notices until
  someone uses it twice.** The re-rate said "a bit less sure" — which only means anything next
  to where you already were — and stored a fixed 55 every time. Three days of honest re-rating
  wrote the same number three days running, so the one thing the product exists to show could
  not appear on any screen, and no test caught it because every test did one loop. Fixed by
  making each word *move* a 1–10 ladder rather than set a value. The general lesson: if the
  label on a control is comparative, what it stores has to be a change, not a state — and at
  least one test has to run the same loop three times.
- **A picture of the same screen twice is worth more than a passing test.** Headless Chrome
  against a seeded copy of the app showed the ladder in light and dark in about a minute
  (`--headless=new`, a `seed.js` that writes `localStorage` before `app.js` runs, served over
  a local http server because `file://` storage is opaque). Note that `--window-size` is not
  the CSS viewport in headless: the layout came out about 110px wider than asked, which looked
  exactly like a CSS overflow bug until the untouched start screen did it too. Check an
  unchanged screen before believing a layout finding from a headless screenshot.
- **A rule the founder set can be overruled by the founder, and the record has to say so.**
  "No tab bar" (CLAUDE.md rule 10) and "TrybeUP only in the small print" (rule 9) were both
  amended on 2026-09-03 by the person who wrote them. Amending the rule in place, with the date
  and the conditions attached, is the only thing that stops a later session deleting the new
  work as drift — or quietly widening the exception. Never leave the amendment only in a task
  file: the rules file is what gets read first.
- **A screenshot is not proof that a browser can save anything.** The ladder rendered perfectly
  from seeded storage long before anything proved a real second loop would keep its number. The
  proof was driving Chrome over CDP — plain `fetch` and `WebSocket` in Node 22, no dependencies
  — clicking through four loops on a real page and reading `localStorage` back. Worth the
  fifteen minutes for anything where the value only appears on the second use.
