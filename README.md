# Floe Intent Brief

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJude-coedz%2Ffloe-intent-brief&project-name=floe-intent-brief&repository-name=floe-intent-brief)

A speculative product extension for Floe, built around one question:

> Floe already captures what a buyer wanted, saw and asked. What should the AE see next?

The concept turns one demo session into a compact, evidence-backed handoff designed for the next sales action rather than transcript review.

## Product idea

The prototype demonstrates:

1. **Next move first** — the AE immediately sees the conversation worth having next.
2. **Evidence-backed intent** — every buyer signal can be opened to inspect the exact discovery answer, question, or demo action behind it.
3. **Evaluation path** — the sequence of what the buyer chose to inspect stays visible instead of becoming a flat feature list.
4. **Call preparation** — the handoff ends with what to answer, who to bring, and what not to repeat.

This is intentionally a presentation-layer concept. Floe already captures rich session intelligence, qualification signals, recaps, questions, objections and recommended next steps. The prototype explores a more decision-oriented surface for the AE consuming those signals.

## Design principles

- evidence before inference
- one primary action at a time
- normal reading sizes, no micro-text
- sparse accent colour
- rows and sections over card grids
- uncertainty and representative data labelled explicitly
- no unexplained scores
- short opacity/position motion only
- no decorative gradients, glow, or generic AI dashboard styling

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Motion

## Run

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:43129`.

## Notes

The buyer, company, quotes, timestamps and session are representative data created for this concept. No Floe customer data is used.
