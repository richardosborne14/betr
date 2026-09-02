# Betr

**Sure it'll go badly? Pick a fear. Get one tiny thing to do today. Come back and say what
happened.**

Betr is a free, private, offline, no-account app whose single mechanic is the CBT behavioural
experiment, with a one-big-button interface. It is the gateway product for TrybeUP, reaching
people who will never join a group: those carrying a private shame who might try something that
looks this simple and this private. It is not therapy, not a medical device, and it never
sends anything anywhere.

The name is a bet on what will happen, and it makes you better.

## Start here

| Read, in order | What it is |
| --- | --- |
| [`CLAUDE.md`](CLAUDE.md) | How to work in this repo. Read it before touching anything |
| [`docs/NEXT-SESSION.md`](docs/NEXT-SESSION.md) | Where we are, what's next, what will bite you |
| [`docs/00-scope.md`](docs/00-scope.md) | What it is and isn't, the settled interface, the stock list and its rules, the TrybeUP bridge, the trust story, the open questions |
| [`docs/research/10-cbt-gateway-approach.md`](docs/research/10-cbt-gateway-approach.md) | The clinical, legal and ethical shape. Sourced. Not to be re-argued |
| [`docs/tasks/`](docs/tasks/) | Build tasks B0–B7, one file each |
| [`prototype/index.html`](prototype/index.html) | The approved prototype. Open it in a browser |

## Layout

```
web/         the app: index.html, content/fears.json, lib/, tests/   (B2 builds this)
mobile/      Capacitor shell, two plugins, nothing that phones home   (B5)
prototype/   the reference prototype, frozen
docs/        scope, research, tasks, handoff, learnings
```

## Status

**2026-09-01: scoped, prototyped, not built.** Three decisions gate the build, all the
founder's and Misha's: the name search, the stock list, and whether custom entries are in v1.
See [`docs/tasks/B0-decisions-before-build.md`](docs/tasks/B0-decisions-before-build.md).

Private for now. Open-sourcing is part of the trust story and is a release decision.
