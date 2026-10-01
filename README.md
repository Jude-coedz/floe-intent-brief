# Floe Intent Loop

A speculative product concept built around the idea shared with Amit Solanki:

> Make Floe's instant-demo experience even more useful for qualifying what a buyer actually cares about while they are exploring.

## The interaction

The prototype demonstrates one small addition to the live demo loop:

1. A buyer asks Floe to show a product capability.
2. Floe shows the relevant part of the product.
3. At the moment of interest, Floe asks one contextual question: **what are you actually trying to validate?**
4. The buyer chooses the outcome that matters to them.
5. Floe immediately changes the next part of the demo around that answer.

The point is not to add another qualification form. The buyer gets a more relevant demo, and Floe gets a cleaner signal as a side effect.

## Example

The representative product is a fictional usage-billing SaaS called Meterly.

A buyer asks: "Can you show me how usage billing works?"

Floe then asks whether the buyer is trying to:
- forecast monthly spend,
- bill customers accurately, or
- control overages.

Each answer produces a different next screen and demo route.

## Product principles used

The build borrows the **process discipline** from the work on Understudy, not its product language or interface:
- start from one clear user job,
- one obvious action at a time,
- remove screens that do not advance the story,
- use normal reading sizes,
- keep motion restrained,
- make the prototype explain itself through interaction,
- avoid generic AI-dashboard decoration.

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

The Meterly product, figures and demo paths are illustrative. This does not use private Floe or customer data.
