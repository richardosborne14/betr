# BETR

**If I ___, then ___.** Write down what you think will happen. Go and find out. Write down what did.

BETR helps you test unhelpful beliefs in everyday life. It uses one technique from cognitive
behavioural therapy, the behavioural experiment, and nothing else. It is a self-help worksheet,
not therapy, and it is not a medical device.

It is free and open source (MIT), made by Digital Bricks, and it has no account, no analytics and
no AI. Everything a person writes stays on their phone.

**Use it:** [betr.digitalbricks.io](https://betr.digitalbricks.io) — then turn on airplane mode.
It still works.

## Run it yourself

There is nothing to install and nothing to build.

- **The app:** open `web/index.html` in a browser.
- **The tests:** `node --test` from the repository root (Node 22; not `node --test web/tests/`).

`web/` is plain HTML, CSS and JavaScript with no libraries, small enough to read in an evening.
Every sentence the app says is in `web/content/strings-en.js` (and `strings-fr.js`).

## The rules that never bend

Nothing leaves the phone: no account, no request of any kind after the page loads, and the
server's own config (`deploy/betr.caddy`) is tested so it can write nothing about a visitor but
the day of an open. No AI, for anything. No streaks, scores, counts or verdicts. The person writes
their own predictions; BETR proposes nothing. The safety sentences and crisis lines are fixed
wording, and a crisis phone number is only ever one read off the provider's own website. The full
list, with the reasons, is in [`CLAUDE.md`](CLAUDE.md), and the tests fail the build when one is
broken.

## Contributing

Bug reports and fixes to the code are welcome. **New or changed wording is not accepted without
the founder** — the words are the product, and several of them are there for legal and clinical
reasons documented in [`docs/research/10-cbt-gateway-approach.md`](docs/research/10-cbt-gateway-approach.md).

## Where things are

| | |
| --- | --- |
| [`web/`](web/) | the app, its content and its tests |
| [`deploy/`](deploy/) | how the site is served |
| [`docs/00-scope.md`](docs/00-scope.md) | what it is and is not |
| [`docs/NEXT-SESSION.md`](docs/NEXT-SESSION.md) | where the work is today |
| [`docs/tasks/`](docs/tasks/) | one file per piece of work |
| [`prototype/`](prototype/) | the original prototype, frozen |

## Licence

MIT — see [`LICENSE`](LICENSE).
